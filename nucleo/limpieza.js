// Limpieza segura de Fortnite: solo borra registros, informes de fallos y la caché web del juego.
// Nunca toca la instalación, las partidas ni los ajustes.
const fs = require('fs');
const path = require('path');

const base = () => path.join(process.env.LOCALAPPDATA || '', 'FortniteGame', 'Saved');
const ZONAS = [
  { id: 'logs', nombre: 'Registros del juego', ruta: () => path.join(base(), 'Logs') },
  { id: 'crashes', nombre: 'Informes de fallos', ruta: () => path.join(base(), 'Crashes') },
  { id: 'webcache', nombre: 'Caché web del juego', ruta: () => base(), filtro: (n) => /^webcache/i.test(n) },
];

function tamano(ruta) {
  let total = 0;
  try {
    const st = fs.lstatSync(ruta);
    if (st.isSymbolicLink()) return 0;
    if (st.isFile()) return st.size;
    for (const n of fs.readdirSync(ruta)) total += tamano(path.join(ruta, n));
  } catch {
    /* no existe o sin permiso */
  }
  return total;
}
const objetivos = (z) => {
  const r = z.ruta();
  if (!z.filtro) return fs.existsSync(r) ? fs.readdirSync(r).map((n) => path.join(r, n)) : [];
  try {
    return fs.readdirSync(r).filter(z.filtro).map((n) => path.join(r, n));
  } catch {
    return [];
  }
};

function analizar() {
  return ZONAS.map((z) => ({ id: z.id, nombre: z.nombre, bytes: objetivos(z).reduce((s, p) => s + tamano(p), 0) }));
}
function limpiar(ids) {
  let liberado = 0;
  for (const z of ZONAS.filter((x) => ids.includes(x.id))) {
    for (const p of objetivos(z)) {
      const b = tamano(p);
      try {
        fs.rmSync(p, { recursive: true, force: true });
        liberado += b;
      } catch {
        /* archivo en uso: se deja */
      }
    }
  }
  return { liberado, zonas: analizar() };
}
module.exports = { analizar, limpiar };
