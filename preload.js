// Puente seguro entre la interfaz y el sistema: solo estas funciones, nada más.
const { contextBridge, ipcRenderer } = require('electron');

const llamar = async (canal, ...args) => {
  const r = await ipcRenderer.invoke(canal, ...args);
  if (!r.ok) throw new Error(r.error);
  return r.datos;
};

contextBridge.exposeInMainWorld('max', {
  ventana: (accion) => ipcRenderer.send('ventana', accion),
  alMaximizar: (fn) => ipcRenderer.on('ventana:max', (_e, v) => fn(v)),
  alIr: (fn) => ipcRenderer.on('ir', (_e, p) => fn(p)),
  update: { estado: () => llamar('update:estado'), descargar: () => llamar('update:descargar'), instalar: () => llamar('update:instalar'), alCambiar: (fn) => ipcRenderer.on('update', (_e, d) => fn(d)) },
  limpieza: { analizar: () => llamar('limpieza:analizar'), limpiar: (ids) => llamar('limpieza:limpiar', ids) },
  remoto: { estado: (forzar) => llamar('remoto:estado', forzar), alCambiar: (fn) => ipcRenderer.on('remoto', (_e, d) => fn(d)) },
  abrir: (url) => llamar('abrir', url),
  info: () => llamar('app:info'),
  cuentas: {
    listar: () => llamar('cuentas:listar'),
    login: () => llamar('cuentas:login'),
    cancelar: () => llamar('cuentas:cancelar'),
    principal: (id) => llamar('cuentas:principal', id),
    borrar: (id) => llamar('cuentas:borrar', id),
    comprobar: () => llamar('cuentas:comprobar'),
    alNueva: (fn) => ipcRenderer.on('cuentas:nueva', (_e, d) => fn(d)),
    alError: (fn) => ipcRenderer.on('cuentas:error', (_e, m) => fn(m)),
  },
  fortnite: {
    estado: () => llamar('fortnite:estado'),
    lanzar: (id) => llamar('fortnite:lanzar', id),
    cerrar: () => llamar('fortnite:cerrar'),
    elegirCarpeta: () => llamar('fortnite:elegirCarpeta'),
  },
  ajustes: { leer: () => llamar('ajustes:leer'), guardar: (c) => llamar('ajustes:guardar', c) },
  publico: { tienda: () => llamar('publico:tienda'), alertas: () => llamar('publico:alertas'), servidores: () => llamar('publico:servidores'), noticias: () => llamar('publico:noticias'), mapa: () => llamar('publico:mapa'), buscar: (q) => llamar('publico:buscar', q), cosmetico: (id) => llamar('publico:cosmetico', id), novedades: () => llamar('publico:novedades') },
  perfil: { resumen: (id, forzar) => llamar('perfil:resumen', id, forzar), taquillaIds: (id) => llamar('perfil:taquillaIds', id) },
  social: {
    amigos: (id) => llamar('social:amigos', id),
    grupo: (id) => llamar('social:grupo', id),
    checker: (id) => llamar('social:checker', id),
    regalos: (id) => llamar('social:regalos', id),
    progreso: (id) => llamar('social:progreso', id),
    tiendaSTW: (id) => llamar('social:tiendaSTW', id),
    diaria: (id) => llamar('social:diaria', id),
  },
  graficos: { leer: () => llamar('graficos:leer'), guardar: (c) => llamar('graficos:guardar', c), perfil: (n) => llamar('graficos:perfil', n), restaurar: () => llamar('graficos:restaurar') },
});
