// Más datos de la cuenta: amigos, grupo, comprobador, regalos, XP, desglose de pavos, tienda STW y recompensa diaria.
// Todo es de solo lectura salvo "reclamar la recompensa diaria", que es lo mismo que pulsar el botón dentro del juego.
const epic = require('./epic');

const CUENTAS = 'https://account-public-service-prod.ol.epicgames.com/account/api/public/account';
const FN = 'https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api';
const MCP = `${FN}/game/v2/profile`;

const get = (t, url) => epic.peticion(url, { cabeceras: epic.bearer(t) });
const mcp = async (t, id, op, perfil, cuerpo = {}) => (await epic.peticion(`${MCP}/${id}/client/${op}?profileId=${perfil}&rvn=-1`, { metodo: 'POST', cabeceras: epic.bearer(t), json: cuerpo })) ?? {};

// Nombres de varias cuentas a la vez (máx. 100 por petición)
async function nombres(t, ids) {
  const mapa = {};
  for (let i = 0; i < ids.length; i += 100) {
    const lote = ids.slice(i, i + 100);
    if (!lote.length) continue;
    const r = await get(t, `${CUENTAS}?${lote.map((x) => `accountId=${x}`).join('&')}`).catch(() => []);
    for (const c of r ?? []) mapa[c.id] = c.displayName ?? Object.values(c.externalAuths ?? {})[0]?.externalDisplayName ?? null;
  }
  return mapa;
}

async function amigos(cuenta) {
  const t = await epic.sesion(cuenta);
  const r = await get(t, `https://friends-public-service-prod.ol.epicgames.com/friends/api/v1/${cuenta.accountId}/summary`);
  const ids = [...(r.friends ?? []), ...(r.incoming ?? []), ...(r.outgoing ?? [])].map((f) => f.accountId);
  const n = await nombres(t, ids);
  const pasar = (l = []) => l.map((f) => ({ id: f.accountId, nombre: f.alias || n[f.accountId] || 'Sin nombre', desde: f.created ?? null, favorito: Boolean(f.favorite) })).sort((a, b) => b.favorito - a.favorito || a.nombre.localeCompare(b.nombre));
  return { amigos: pasar(r.friends), recibidas: pasar(r.incoming), enviadas: pasar(r.outgoing), bloqueados: (r.blocklist ?? []).length };
}

async function grupo(cuenta) {
  const t = await epic.sesion(cuenta);
  const r = await get(t, `https://party-service-prod.ol.epicgames.com/party/api/v1/Fortnite/user/${cuenta.accountId}`);
  const p = r?.current?.[0];
  if (!p) return { enGrupo: false, invitaciones: (r?.invites ?? []).length };
  const n = await nombres(t, p.members.map((m) => m.account_id));
  const miembros = p.members.map((m) => {
    let traje = null;
    try {
      const loadout = JSON.parse(m.meta?.['Default:AthenaCosmeticLoadout_j'] ?? '{}');
      traje = loadout?.AthenaCosmeticLoadout?.characterPrimaryAssetId?.split(':')[1]?.toLowerCase() ?? null;
    } catch {
      /* metadatos raros: se ignora el traje */
    }
    return { id: m.account_id, nombre: n[m.account_id] ?? 'Jugador', lider: m.role === 'CAPTAIN', yo: m.account_id === cuenta.accountId, imagen: traje ? `https://fortnite-api.com/images/cosmetics/br/${traje}/smallicon.png` : null, unido: m.joined_at };
  });
  return { enGrupo: true, id: p.id, privacidad: p.config?.joinability ?? null, max: p.config?.max_size ?? 16, miembros };
}

// Comprobador de cuenta: lo que conviene saber de cada cuenta de un vistazo
async function checker(cuenta) {
  const t = await epic.sesion(cuenta);
  const [info, externas, core, campaign] = await Promise.all([
    get(t, `${CUENTAS}/${cuenta.accountId}`),
    get(t, `${CUENTAS}/${cuenta.accountId}/externalAuths`).catch(() => []),
    mcp(t, cuenta.accountId, 'QueryProfile', 'common_core').then((r) => r.profileChanges?.[0]?.profile).catch(() => null),
    mcp(t, cuenta.accountId, 'QueryProfile', 'campaign').then((r) => r.profileChanges?.[0]?.profile).catch(() => null),
  ]);
  const ocultar = (e) => (e ? e.replace(/^(.).*(.@.*)$/, (_, a, b) => `${a}•••${b}`) : null);
  const items = Object.values(core?.items ?? {});
  return {
    nombre: info.displayName,
    email: ocultar(info.email),
    emailVerificado: Boolean(info.emailVerified),
    dosPasos: Boolean(info.tfaEnabled),
    pais: info.country ?? null,
    ultimoAcceso: info.lastLogin ?? null,
    cambiosNombre: info.numberOfDisplayNameChanges ?? 0,
    puedeCambiarNombre: Boolean(info.canUpdateDisplayName),
    plataformas: (externas ?? []).map((e) => ({ tipo: e.type, nombre: e.externalDisplayName ?? null })),
    tieneSTW: Boolean(campaign && Object.keys(campaign.items ?? {}).length),
    bloqueos: Object.keys(core?.stats?.attributes?.ban_status ?? {}).length ? core.stats.attributes.ban_status : null,
    reembolsos: core?.stats?.attributes?.mtx_purchase_history?.refundCredits ?? null,
    regalosPendientes: items.filter((i) => i.templateId?.startsWith('GiftBox:')).length,
  };
}

async function regalos(cuenta) {
  const t = await epic.sesion(cuenta);
  const core = (await mcp(t, cuenta.accountId, 'QueryProfile', 'common_core')).profileChanges?.[0]?.profile;
  const lista = Object.values(core?.items ?? {}).filter((i) => i.templateId?.startsWith('GiftBox:'));
  const ids = lista.map((g) => g.attributes?.fromAccountId).filter(Boolean);
  const n = await nombres(t, ids);
  const recibidos = lista.map((g) => ({
    de: n[g.attributes?.fromAccountId] ?? (g.attributes?.fromAccountId ? 'Un amigo' : 'Epic Games'),
    mensaje: g.attributes?.params?.userMessage ?? null,
    fecha: g.attributes?.giftedOn ?? null,
    objetos: (g.attributes?.lootList ?? []).map((l) => {
      const id = l.itemType?.split(':')[1]?.toLowerCase();
      return { id, cantidad: l.quantity ?? 1, imagen: id ? `https://fortnite-api.com/images/cosmetics/br/${id}/smallicon.png` : null };
    }),
  }));
  const h = core?.stats?.attributes?.gift_history ?? {};
  return { recibidos, enviados: h.num_sent ?? 0, recibidosTotal: h.num_received ?? recibidos.length };
}

// Pavos por origen y XP del Battle Royale
async function progreso(cuenta) {
  const t = await epic.sesion(cuenta);
  const [core, athena] = await Promise.all([mcp(t, cuenta.accountId, 'QueryProfile', 'common_core'), mcp(t, cuenta.accountId, 'QueryProfile', 'athena')]).then((r) => r.map((x) => x.profileChanges?.[0]?.profile));
  const ORIGEN = { MtxPurchased: 'Comprados', MtxPurchaseBonus: 'Bonificación de compra', MtxComplimentary: 'Ganados jugando', MtxGiveaway: 'Regalos y eventos', MtxDebt: 'Deuda' };
  const pavos = {};
  for (const it of Object.values(core?.items ?? {})) {
    if (!it.templateId?.startsWith('Currency:Mtx')) continue;
    const k = ORIGEN[it.templateId.split(':')[1]] ?? 'Otros';
    pavos[k] = (pavos[k] ?? 0) + (it.quantity ?? 0);
  }
  const compras = core?.stats?.attributes?.mtx_purchase_history?.purchases ?? [];
  const a = athena?.stats?.attributes ?? {};
  return {
    pavos: Object.entries(pavos).map(([origen, cantidad]) => ({ origen, cantidad })).sort((x, y) => y.cantidad - x.cantidad),
    total: Object.values(pavos).reduce((s, v) => s + v, 0),
    plataforma: core?.stats?.attributes?.current_mtx_platform ?? null,
    compras: compras.slice(-15).reverse().map((c) => ({ fecha: c.purchaseDate, gastado: c.totalMtxPaid, objetos: (c.lootResult ?? []).length })),
    xp: { nivel: a.level ?? 0, xp: a.xp ?? 0, nivelCuenta: a.accountLevel ?? 0, pase: a.book_level ?? 0, temporada: a.season_num ?? null, victorias: a.lifetime_wins ?? 0, estrellas: a.battlestars ?? 0 },
    temporadas: (a.past_seasons ?? []).slice(-8).reverse().map((s) => ({ temporada: s.seasonNumber, nivel: s.seasonLevel, pase: s.bookLevel, victorias: s.numWins, comprado: Boolean(s.purchasedVIP) })),
  };
}

// Tienda de Salvar el Mundo (llamas y objetos de evento). Solo se muestra: comprar se hace en el juego.
async function tiendaSTW(cuenta) {
  const t = await epic.sesion(cuenta);
  const cat = await get(t, `${FN}/storefront/v2/catalog`);
  const NOMBRES = { CardPackStorePreroll: 'Llamas de mejora', CardPackStoreGameplay: 'Llamas de oro', STWRotationalEventStorefront: 'Tienda semanal de evento', STWSpecialEventStorefront: 'Tienda del evento', STWXRayLlamaStorefront: 'Llamas X-Ray' };
  const MONEDA = { 'AccountResource:eventcurrency_scaling': 'oro', 'AccountResource:currency_xrayllama': 'tickets X-Ray', 'AccountResource:campaign_event_currency': 'tickets de evento', 'AccountResource:voucher_basicpack': 'vales' };
  return (cat.storefronts ?? [])
    .filter((s) => NOMBRES[s.name])
    .map((s) => ({
      nombre: NOMBRES[s.name],
      objetos: (s.catalogEntries ?? []).map((e) => {
        const precio = e.prices?.[0] ?? {};
        const limpio = (e.title || e.devName || '').replace(/^\[VIRTUAL\]/, '').replace(/ for .*$/, '').trim();
        return { nombre: limpio || 'Objeto', precio: precio.finalPrice ?? 0, moneda: MONEDA[precio.currencySubType] ?? (precio.currencyType === 'MtxCurrency' ? 'pavos' : 'recursos'), limite: e.requirements?.find((r) => r.requirementType === 'DenyOnFulfillment') ? 1 : e.dailyLimit > 0 ? e.dailyLimit : null };
      }),
    }))
    .filter((s) => s.objetos.length);
}

// Recompensa diaria de Salvar el Mundo
async function reclamarDiaria(cuenta) {
  const t = await epic.sesion(cuenta);
  const r = await mcp(t, cuenta.accountId, 'ClaimLoginReward', 'campaign');
  const n = (r.notifications ?? []).find((x) => x.type === 'daily_rewards');
  return { dias: n?.daysLoggedIn ?? null, premios: (n?.items ?? []).map((i) => ({ id: i.itemType, cantidad: i.quantity ?? 1 })), yaReclamada: !n || !(n.items ?? []).length };
}

module.exports = { amigos, grupo, checker, regalos, progreso, tiendaSTW, reclamarDiaria };
