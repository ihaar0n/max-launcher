// Datos de la cuenta de Fortnite (solo lectura): pavos, nivel, taquilla y Salvar el Mundo.
// Usa la misma llave cifrada que el botón Jugar. Nunca compra ni cambia nada.
const epic = require('./epic');

const MCP = 'https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile';
const cache = new Map();

async function perfil(t, accountId, profileId) {
  const r = await epic.peticion(`${MCP}/${accountId}/client/QueryProfile?profileId=${profileId}&rvn=-1`, { metodo: 'POST', cabeceras: epic.bearer(t), json: {} });
  return r?.profileChanges?.[0]?.profile ?? null;
}

const TIPOS = {
  AthenaCharacter: 'Trajes',
  AthenaBackpack: 'Mochilas',
  AthenaPickaxe: 'Picos',
  AthenaGlider: 'Alas delta',
  AthenaDance: 'Gestos',
  AthenaItemWrap: 'Envoltorios',
  AthenaSkyDiveContrail: 'Estelas',
  AthenaLoadingScreen: 'Pantallas de carga',
  AthenaMusicPack: 'Música',
};
const imagenDe = (id) => `https://fortnite-api.com/images/cosmetics/br/${id}/smallicon.png`;

async function resumen(cuenta, forzar = false) {
  const previo = cache.get(cuenta.accountId);
  if (!forzar && previo && Date.now() - previo.t < 5 * 60 * 1000) return previo.v;
  const t = await epic.sesion(cuenta);
  const [core, athena, campaign] = await Promise.all([
    perfil(t, cuenta.accountId, 'common_core'),
    perfil(t, cuenta.accountId, 'athena'),
    perfil(t, cuenta.accountId, 'campaign').catch(() => null),
  ]);

  // Pavos: se suman todos los montones de moneda (comprados, ganados, regalados)
  let pavos = 0;
  for (const it of Object.values(core?.items ?? {})) if (it.templateId?.startsWith('Currency:Mtx')) pavos += it.quantity ?? 0;

  // Taquilla
  const cosmeticos = [];
  const recuento = {};
  for (const it of Object.values(athena?.items ?? {})) {
    const [tipo, id] = (it.templateId ?? '').split(':');
    if (!TIPOS[tipo] || !id) continue;
    recuento[TIPOS[tipo]] = (recuento[TIPOS[tipo]] ?? 0) + 1;
    cosmeticos.push({ id: id.toLowerCase(), tipo: TIPOS[tipo], favorito: Boolean(it.attributes?.favorite), nuevo: it.attributes?.item_seen === false, imagen: imagenDe(id.toLowerCase()) });
  }
  const a = athena?.stats?.attributes ?? {};

  // Salvar el Mundo (si la cuenta lo tiene)
  let stw = null;
  if (campaign && Object.keys(campaign.items ?? {}).length) {
    const c = campaign.stats?.attributes ?? {};
    const contar = (pref) => Object.values(campaign.items).filter((i) => i.templateId?.startsWith(pref)).length;
    const recursos = Object.values(campaign.items)
      .filter((i) => i.templateId?.startsWith('AccountResource:'))
      .map((i) => ({ id: i.templateId.split(':')[1], cantidad: i.quantity ?? 0 }))
      .sort((x, y) => y.cantidad - x.cantidad);
    stw = {
      nivel: c.level ?? 0,
      dias: c.daily_rewards?.totalDaysLoggedIn ?? 0,
      coleccion: c.collection_book?.maxBookXpLevelAchieved ?? 0,
      investigacion: Object.values(c.research_levels ?? {}).reduce((n, v) => n + v, 0),
      heroes: contar('Hero:'),
      esquemas: contar('Schematic:'),
      supervivientes: contar('Worker:'),
      defensores: contar('Defender:'),
      recursos,
    };
  }

  const v = {
    pavos,
    nivel: a.level ?? 0,
    pase: { nivel: a.book_level ?? 0, comprado: Boolean(a.book_purchased), temporada: a.season_num ?? null },
    victorias: a.lifetime_wins ?? 0,
    recuento,
    cosmeticos,
    stw,
    actualizado: Date.now(),
  };
  cache.set(cuenta.accountId, { t: Date.now(), v });
  return v;
}

// Solo los ids de lo que tiene, para marcar "Ya lo tienes" en la tienda
async function idsTaquilla(cuenta) {
  const r = await resumen(cuenta);
  return r.cosmeticos.map((c) => c.id);
}

module.exports = { resumen, idsTaquilla };
