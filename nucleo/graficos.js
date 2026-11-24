// Ajustes gráficos de Fortnite: lee y escribe GameUserSettings.ini (el mismo archivo que cambia el menú del juego).
// Antes de escribir se guarda una copia de seguridad, y solo se cambian las claves conocidas.
const fs = require('fs');
const path = require('path');

const RUTA = path.join(process.env.LOCALAPPDATA || '', 'FortniteGame', 'Saved', 'Config', 'WindowsClient', 'GameUserSettings.ini');
const COPIA = `${RUTA}.max-copia`;
const S_JUEGO = '/Script/FortniteGame.FortGameUserSettings';
const S_CALIDAD = 'ScalabilityGroups';
const S_RHI = 'D3DRHIPreference';
const CALIDADES = ['sg.ViewDistanceQuality', 'sg.AntiAliasingQuality', 'sg.ShadowQuality', 'sg.PostProcessQuality', 'sg.TextureQuality', 'sg.EffectsQuality', 'sg.FoliageQuality', 'sg.ShadingQuality'];

// INI sencillo que respeta el orden y las claves que no tocamos
function leerIni(texto) {
  const secciones = [];
  let actual = { nombre: null, lineas: [] };
  secciones.push(actual);
  for (const linea of texto.split(/\r?\n/)) {
    const m = linea.match(/^\[(.+)\]\s*$/);
    if (m) {
      actual = { nombre: m[1], lineas: [] };
      secciones.push(actual);
    } else actual.lineas.push(linea);
  }
  return secciones;
}
const obtener = (ini, sec, clave) => {
  const s = ini.find((x) => x.nombre === sec);
  const l = s?.lineas.find((x) => x.startsWith(`${clave}=`));
  return l ? l.slice(clave.length + 1) : undefined;
};
function poner(ini, sec, clave, valor) {
  let s = ini.find((x) => x.nombre === sec);
  if (!s) {
    s = { nombre: sec, lineas: [''] };
    ini.push(s);
  }
  const i = s.lineas.findIndex((x) => x.startsWith(`${clave}=`));
  if (i >= 0) s.lineas[i] = `${clave}=${valor}`;
  else {
    const vacia = s.lineas.length && s.lineas[s.lineas.length - 1] === '' ? s.lineas.length - 1 : s.lineas.length;
    s.lineas.splice(vacia, 0, `${clave}=${valor}`);
  }
}
const escribirIni = (ini) => ini.map((s) => (s.nombre === null ? s.lineas : [`[${s.nombre}]`, ...s.lineas]).join('\r\n')).filter((x, i) => i > 0 || x).join('\r\n');

function cargar() {
  if (!fs.existsSync(RUTA)) throw new Error('No encuentro los ajustes de Fortnite. Abre el juego una vez y vuelve a intentarlo.');
  return leerIni(fs.readFileSync(RUTA, 'utf8'));
}

function leer() {
  const ini = cargar();
  const n = (s, k, d) => {
    const v = parseFloat(obtener(ini, s, k));
    return Number.isFinite(v) ? v : d;
  };
  const rhi = (obtener(ini, S_RHI, 'PreferredRHI') ?? 'dx11').toLowerCase();
  const nivel = (obtener(ini, S_RHI, 'PreferredFeatureLevel') ?? '').toLowerCase();
  return {
    ruta: RUTA,
    hayCopia: fs.existsSync(COPIA),
    fps: n(S_JUEGO, 'FrameRateLimit', 0),
    ancho: n(S_JUEGO, 'ResolutionSizeX', 1920),
    alto: n(S_JUEGO, 'ResolutionSizeY', 1080),
    pantalla: n(S_JUEGO, 'FullscreenMode', 0),
    vsync: obtener(ini, S_JUEGO, 'bUseVSync') === 'True',
    escala: n(S_CALIDAD, 'sg.ResolutionQuality', 100),
    calidad: n(S_CALIDAD, 'sg.TextureQuality', 3),
    distancia: n(S_CALIDAD, 'sg.ViewDistanceQuality', 3),
    sombras: n(S_CALIDAD, 'sg.ShadowQuality', 3),
    modo: nivel === 'es31' ? 'rendimiento' : rhi === 'dx12' ? 'dx12' : 'dx11',
    soloLectura: (() => {
      try {
        return !(fs.statSync(RUTA).mode & 0o200);
      } catch {
        return false;
      }
    })(),
  };
}

function guardar(c) {
  const ini = cargar();
  if (!fs.existsSync(COPIA)) fs.copyFileSync(RUTA, COPIA);
  const f6 = (v) => Number(v).toFixed(6);
  if ('fps' in c) poner(ini, S_JUEGO, 'FrameRateLimit', f6(c.fps));
  if ('ancho' in c && 'alto' in c) {
    for (const k of ['ResolutionSizeX', 'LastUserConfirmedResolutionSizeX', 'DesiredScreenWidth', 'LastUserConfirmedDesiredScreenWidth']) poner(ini, S_JUEGO, k, Math.round(c.ancho));
    for (const k of ['ResolutionSizeY', 'LastUserConfirmedResolutionSizeY', 'DesiredScreenHeight', 'LastUserConfirmedDesiredScreenHeight']) poner(ini, S_JUEGO, k, Math.round(c.alto));
  }
  if ('pantalla' in c) for (const k of ['FullscreenMode', 'LastConfirmedFullscreenMode', 'PreferredFullscreenMode']) poner(ini, S_JUEGO, k, c.pantalla);
  if ('vsync' in c) poner(ini, S_JUEGO, 'bUseVSync', c.vsync ? 'True' : 'False');
  if ('escala' in c) poner(ini, S_CALIDAD, 'sg.ResolutionQuality', f6(c.escala));
  if ('calidad' in c) for (const k of ['sg.AntiAliasingQuality', 'sg.PostProcessQuality', 'sg.TextureQuality', 'sg.EffectsQuality', 'sg.FoliageQuality', 'sg.ShadingQuality']) poner(ini, S_CALIDAD, k, c.calidad);
  if ('distancia' in c) poner(ini, S_CALIDAD, 'sg.ViewDistanceQuality', c.distancia);
  if ('sombras' in c) poner(ini, S_CALIDAD, 'sg.ShadowQuality', c.sombras);
  if ('modo' in c) {
    poner(ini, S_RHI, 'PreferredRHI', c.modo === 'dx12' ? 'dx12' : 'dx11');
    poner(ini, S_RHI, 'PreferredFeatureLevel', c.modo === 'rendimiento' ? 'es31' : 'sm5');
  }
  fs.writeFileSync(RUTA, escribirIni(ini));
  return leer();
}

const PERFILES = {
  competitivo: { modo: 'rendimiento', fps: 0, vsync: false, escala: 100, calidad: 0, distancia: 2, sombras: 0 },
  equilibrado: { modo: 'dx11', fps: 144, vsync: false, escala: 100, calidad: 1, distancia: 3, sombras: 1 },
  calidad: { modo: 'dx12', fps: 60, vsync: true, escala: 100, calidad: 3, distancia: 3, sombras: 3 },
  patata: { modo: 'rendimiento', fps: 60, vsync: false, escala: 75, calidad: 0, distancia: 0, sombras: 0 },
};
const aplicarPerfil = (nombre) => {
  if (!PERFILES[nombre]) throw new Error('Perfil desconocido');
  return guardar(PERFILES[nombre]);
};

function restaurar() {
  if (!fs.existsSync(COPIA)) throw new Error('No hay copia de seguridad todavía.');
  fs.copyFileSync(COPIA, RUTA);
  return leer();
}

module.exports = { leer, guardar, aplicarPerfil, restaurar, CALIDADES, _ini: { leerIni, escribirIni, poner, obtener } };
