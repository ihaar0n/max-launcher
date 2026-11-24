// Datos públicos de Fortnite (no necesitan cuenta):
//  - Tienda de objetos: fortnite-api.com
//  - Alertas de Salvar el Mundo: freethevbucks.com (las mismas que usa el bot MAX)
const ZONAS_WEB = {
  STONEWOOD: { nombre: 'Bosquepiedra', emoji: '🌲', orden: 1 },
  PLANKERTON: { nombre: 'Tablópolis', emoji: '🏙️', orden: 2 },
  'CANNY VALLEY': { nombre: 'Valle Latoso', emoji: '🏜️', orden: 3 },
  'TWINE PEAKS': { nombre: 'Picos Leñosos', emoji: '🏔️', orden: 4 },
};
const MISIONES_ES = {
  'ride the lightning': 'Cabalgar el rayo',
  'retrieve the data': 'Recuperar los datos',
  'fight the storm': 'Lucha contra la tormenta',
  'category 1 storm': 'Tormenta categoría 1',
  'category 2 storm': 'Tormenta categoría 2',
  'category 3 storm': 'Tormenta categoría 3',
  'category 4 storm': 'Tormenta categoría 4',
  'evacuate the shelter': 'Evacuar el refugio',
  'repair the shelter': 'Reparar el refugio',
  'launch the rocket': 'Lanzar el cohete',
  'launch the balloon': 'Lanzar el globo meteorológico',
  'destroy the encampments': 'Destruir los campamentos',
  'build the radar grid': 'Construir la red de radares',
  'deliver the bomb': 'Entregar la bomba',
  'refuel the homebase': 'Repostar la base',
  'resupply': 'Reabastecimiento',
  'eliminate and collect': 'Eliminar y recoger',
  'rescue the survivors': 'Rescatar a los supervivientes',
  'hunt the titan': 'Cazar al titán',
};
const PREMIOS_ES = [
  [/v-?bucks?/i, '💰 Pavos'],
  [/x-?ray tickets?/i, '🎟️ Tickets X-Ray'],
  [/pure drop of rain/i, '💧 Gota de lluvia pura'],
  [/lightning in a bottle/i, '⚡ Rayo en una botella'],
  [/eye of the storm/i, '👁️ Ojo de la tormenta'],
  [/storm in a bottle/i, '🌪️ Tormenta en una botella'],
  [/legendary perk-?up/i, '🟧 PERK-UP! legendario'],
  [/epic perk-?up/i, '🟪 PERK-UP! épico'],
  [/rare perk-?up/i, '🟦 PERK-UP! raro'],
  [/uncommon perk-?up/i, '🟩 PERK-UP! poco común'],
  [/re-?perk/i, '🔁 RE-PERK!'],
  [/perk-?up/i, '⬆️ PERK-UP!'],
  [/legendary flux/i, '🟧 Flujo legendario'],
  [/epic flux/i, '🟪 Flujo épico'],
  [/rare flux/i, '🟦 Flujo raro'],
  [/survivor/i, '👤 Superviviente'],
  [/lead survivor|manager/i, '🎖️ Superviviente líder'],
  [/defender/i, '🛡️ Defensor'],
  [/hero/i, '🦸 Héroe'],
  [/schematic/i, '📜 Esquema'],
  [/gold/i, '🪙 Oro'],
];
const RAREZA_ES = { common: 'común', uncommon: 'poco común', rare: 'raro', epic: 'épico', legendary: 'legendario', mythic: 'mítico' };

function decodificar(t) {
  return t.replace(/&amp;/g, '&').replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
}

function premioEs(texto) {
  const m = texto.match(/^(.*?)\s*(?:\(x?(\d[\d.,]*)\))?$/i);
  let nombre = m?.[1]?.trim() ?? texto;
  const cantidad = Number((m?.[2] ?? '1').replace(/[.,]/g, '')) || 1;
  const rar = nombre.match(/\((common|uncommon|rare|epic|legendary|mythic)\)/i);
  const base = nombre.replace(/\((common|uncommon|rare|epic|legendary|mythic)\)/i, '').trim();
  const trad = PREMIOS_ES.find(([re]) => re.test(base));
  let final = trad ? trad[1] : `🎁 ${base}`;
  // Héroes/defensores con nombre propio: conservar el nombre
  if (trad && /hero|defender|survivor/i.test(base) && !/^(\w+ )?(survivor|defender|hero)$/i.test(base)) final = `${trad[1].split(' ')[0]} ${base}`;
  const arma = base.match(/^(melee|assault|pistol|shotgun|sniper)\s+defender$/i);
  if (arma) final = `🛡️ Defensor de ${({ melee: 'cuerpo a cuerpo', assault: 'asalto', pistol: 'pistola', shotgun: 'escopeta', sniper: 'francotirador' })[arma[1].toLowerCase()]}`;
  if (rar) final += ` (${RAREZA_ES[rar[1].toLowerCase()]})`;
  return { nombre: final, cantidad, pavos: /v-?bucks?/i.test(base) ? cantidad : 0, original: texto };
}

function analizarWeb(html) {
  const ini = html.indexOf('id="missions"');
  const zonaHtml = ini >= 0 ? html.slice(ini) : html;
  const fin = zonaHtml.search(/<\/div><\/div><\/div>\s*<\/div>/);
  const bloque = fin > 0 ? zonaHtml.slice(0, fin + 30) : zonaHtml.slice(0, 60000);
  const alertas = [];
  const limpio = bloque.replace(/title='[^']*'/g, ''); // quitar los tooltips (llevan HTML dentro)
  const partes = limpio.split(/<p class="jrfont"[^>]*>/).slice(1);
  for (const parte of partes) {
    const nombreZona = decodificar(parte.slice(0, parte.indexOf('<'))).toUpperCase();
    const zona = ZONAS_WEB[nombreZona];
    if (!zona) continue;
    for (const fila of parte.matchAll(/<img[^>]*?title="([^"]+)"[^>]*>\s*<b>(\d+)<\/b>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/g)) {
      const [misionEn, lugar] = decodificar(fila[1]).split(' - ');
      const poder = Number(fila[2]);
      const visible = decodificar(fila[3].replace(/<[^>]+>/g, ''));
      const premios = visible.split(/,\s+(?![^(]*\))/).filter(Boolean).map(premioEs);
      if (!premios.length) continue;
      const pavos = premios.reduce((n, p) => n + p.pavos, 0);
      alertas.push({
        zona: zona.nombre,
        emoji: zona.emoji,
        orden: zona.orden,
        aventura: false,
        tipo: `${MISIONES_ES[(misionEn ?? '').toLowerCase()] ?? misionEn ?? 'Misión'} · ⚡${poder}`,
        lugar: lugar ?? null,
        poder,
        items: premios.map((p) => ({ nombre: p.nombre, cantidad: p.cantidad })),
        hasta: null,
        pavos,
      });
    }
  }
  // Pavos de hoy según el resumen de la web (por si alguna fila no se pudo leer)
  const hoy = html.match(/TODAY<\/p>[\s\S]{0,400}?>(\d+)<\/span>/);
  const cuenta = html.match(/(\d+)h (\d+)m (\d+)s<\/span><\/b> to new/);
  const proxima = cuenta ? Date.now() + ((+cuenta[1] * 60 + +cuenta[2]) * 60 + +cuenta[3]) * 1000 : null;
  for (const a of alertas) a.hasta = proxima;
  alertas.sort((a, b) => a.orden - b.orden || a.poder - b.poder);
  return { alertas, aventuras: [], pavosHoy: hoy ? Number(hoy[1]) : alertas.reduce((n, a) => n + a.pavos, 0), proxima, fuente: 'freethevbucks.com', actualizado: Date.now() };
}


const cache = {};
async function conCache(clave, ms, fn) {
  if (cache[clave] && Date.now() - cache[clave].t < ms) return cache[clave].v;
  const v = await fn();
  cache[clave] = { t: Date.now(), v };
  return v;
}

function alertas() {
  return conCache('alertas', 5 * 60 * 1000, async () => {
    const res = await fetch('https://freethevbucks.com/timed-missions/', { headers: { 'User-Agent': 'Mozilla/5.0 (MAX app)' }, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`freethevbucks.com respondió ${res.status}`);
    return analizarWeb(await res.text());
  });
}

function tienda(idioma = 'es') {
  return conCache(`tienda:${idioma}`, 10 * 60 * 1000, async () => {
    const res = await fetch(`https://fortnite-api.com/v2/shop?language=${idioma}`, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`fortnite-api.com respondió ${res.status}`);
    const { data } = await res.json();
    const secciones = new Map();
    for (const e of data?.entries ?? []) {
      const it = e.brItems?.[0];
      const pista = e.tracks?.[0];
      const otro = e.instruments?.[0] ?? e.cars?.[0] ?? e.legoKits?.[0];
      const nombre = e.bundle?.name ?? it?.name ?? (pista ? `${pista.title} — ${pista.artist}` : otro?.name);
      if (!nombre) continue;
      const imagen = e.newDisplayAsset?.renderImages?.[0]?.image ?? e.bundle?.image ?? it?.images?.featured ?? it?.images?.icon ?? pista?.albumArt ?? otro?.images?.large ?? null;
      const col = e.colors ?? {};
      const item = {
        nombre,
        tipo: e.bundle ? 'Lote' : it?.type?.displayValue ?? (pista ? 'Pista' : otro?.type?.displayValue ?? 'Objeto'),
        rareza: it?.series?.value ?? it?.rarity?.displayValue ?? null,
        precio: e.finalPrice,
        antes: e.regularPrice > e.finalPrice ? e.regularPrice : null,
        imagen,
        colores: [col.color1, col.color2, col.color3].filter(Boolean).map((c) => `#${c.slice(0, 6)}`),
        nuevo: Boolean(e.banner?.backendValue === 'New' || /nuevo|new/i.test(e.banner?.value ?? '')),
        banner: e.banner?.value ?? null,
        sale: e.outDate ?? null,
        incluye: (e.brItems ?? []).length > 1 ? e.brItems.map((b) => b.name) : [],
        ids: (e.brItems ?? []).map((b) => b.id.toLowerCase()),
        descripcion: it?.description ?? e.bundle?.info ?? null,
        introducido: it?.introduction?.text ?? null,
        visto: it?.shopHistory?.length ?? null,
        clave: e.offerId ?? `${nombre}:${e.finalPrice}`,
      };
      const sec = e.layout?.name ?? 'Más objetos';
      const s = secciones.get(sec) ?? { nombre: sec, indice: e.layout?.index ?? 999, items: [] };
      s.items.push(item);
      secciones.set(sec, s);
    }
    const lista = [...secciones.values()].sort((a, b) => a.indice - b.indice);
    return { fecha: data?.date, total: lista.reduce((n, s) => n + s.items.length, 0), secciones: lista };
  });
}

// Estado de los servidores de Fortnite (página pública de estado de Epic)
function servidores() {
  return conCache('servidores', 2 * 60 * 1000, async () => {
    const res = await fetch('https://status.epicgames.com/api/v2/components.json', { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`status.epicgames.com respondió ${res.status}`);
    const { components = [] } = await res.json();
    const grupo = components.find((c) => c.group && /^fortnite$/i.test(c.name));
    const hijos = components.filter((c) => grupo && c.group_id === grupo.id);
    const TRAD = { operational: 'Funciona', degraded_performance: 'Lento', partial_outage: 'Caída parcial', major_outage: 'Caído', under_maintenance: 'Mantenimiento' };
    const lista = hijos.map((c) => ({ nombre: c.name, estado: c.status, texto: TRAD[c.status] ?? c.status }));
    const peor = ['major_outage', 'under_maintenance', 'partial_outage', 'degraded_performance'].find((s) => lista.some((c) => c.estado === s) || grupo?.status === s) ?? 'operational';
    return { estado: peor, texto: TRAD[peor], servicios: lista };
  });
}

// ---------- fortnite-api.com (público, sin clave) ----------
async function fapi(ruta) {
  const res = await fetch(`https://fortnite-api.com${ruta}`, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`fortnite-api.com respondió ${res.status}`);
  return (await res.json()).data;
}
const cosmetico = (c) => ({
  id: c.id.toLowerCase(),
  nombre: c.name,
  descripcion: c.description ?? null,
  tipo: c.type?.displayValue ?? 'Objeto',
  rareza: c.series?.value ?? c.rarity?.displayValue ?? null,
  rarezaId: (c.series?.backendValue ?? c.rarity?.value ?? '').toLowerCase(),
  imagen: c.images?.featured ?? c.images?.icon ?? c.images?.smallIcon ?? null,
  icono: c.images?.smallIcon ?? c.images?.icon ?? null,
  colores: c.series?.colors?.map((x) => `#${x.slice(0, 6)}`) ?? [],
  introducido: c.introduction?.text ?? null,
  set: c.set?.text ?? null,
  historial: (c.shopHistory ?? []).slice().sort().reverse(),
  anadido: c.added ?? null,
});

function noticias(idioma = 'es') {
  return conCache(`noticias:${idioma}`, 30 * 60 * 1000, async () => {
    const d = await fapi(`/v2/news/br?language=${idioma}`);
    return (d?.motds ?? []).filter((m) => !m.hidden).map((m) => ({ titulo: m.title, texto: m.body, imagen: m.image ?? m.tileImage, etiqueta: m.tabTitle ?? null }));
  });
}

function mapa(idioma = 'es') {
  return conCache(`mapa:${idioma}`, 60 * 60 * 1000, async () => {
    const d = await fapi(`/v1/map?language=${idioma}`);
    // Las coordenadas del juego van de -135000 a 135000 aprox.: se pasan a porcentaje sobre la imagen
    const pct = (v) => Math.max(0, Math.min(100, ((v + 135000) / 270000) * 100));
    const lugares = (d?.pois ?? [])
      .filter((p) => p.name && !/^[A-Z_\d]+$/.test(p.name))
      .map((p) => ({ nombre: p.name, x: pct(p.location.y), y: 100 - pct(p.location.x), grande: !/Landmark/i.test(p.id) }));
    return { imagen: d?.images?.blank ?? d?.images?.pois, lugares };
  });
}

async function buscarCosmeticos(texto, idioma = 'es') {
  const q = String(texto ?? '').trim().slice(0, 60);
  if (q.length < 2) return [];
  return conCache(`buscar:${idioma}:${q.toLowerCase()}`, 30 * 60 * 1000, async () => {
    const res = await fetch(`https://fortnite-api.com/v2/cosmetics/br/search/all?name=${encodeURIComponent(q)}&matchMethod=contains&language=${idioma}&searchLanguage=${idioma}`, { signal: AbortSignal.timeout(20000) });
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`fortnite-api.com respondió ${res.status}`);
    return ((await res.json()).data ?? []).slice(0, 60).map(cosmetico);
  });
}

function detalleCosmetico(id, idioma = 'es') {
  const limpio = String(id ?? '').replace(/[^a-z0-9_]/gi, '').slice(0, 80);
  return conCache(`cosm:${idioma}:${limpio}`, 60 * 60 * 1000, async () => cosmetico(await fapi(`/v2/cosmetics/br/${limpio}?language=${idioma}`)));
}

function novedades(idioma = 'es') {
  return conCache(`nuevos:${idioma}`, 60 * 60 * 1000, async () => {
    const d = await fapi(`/v2/cosmetics/new?language=${idioma}`);
    return { compilacion: d?.build ?? null, objetos: (d?.items?.br ?? []).slice(0, 80).map(cosmetico) };
  });
}

module.exports = { alertas, tienda, servidores, noticias, mapa, buscarCosmeticos, detalleCosmetico, novedades };
