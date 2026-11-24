// MAX — app de escritorio (Electron)
const { app, BrowserWindow, ipcMain, shell, safeStorage, dialog, nativeTheme, Tray, Menu, Notification, nativeImage, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const epic = require('./nucleo/epic');
const fortnite = require('./nucleo/fortnite');
const publico = require('./nucleo/publico');
const perfil = require('./nucleo/perfil');
const graficos = require('./nucleo/graficos');
const social = require('./nucleo/social');
const remoto = require('./nucleo/remoto');
const limpieza = require('./nucleo/limpieza');
let autoUpdater = null;
try {
  ({ autoUpdater } = require('electron-updater'));
} catch {
  /* sin electron-updater (modo desarrollo): no hay actualizaciones automáticas */
}

app.setAppUserModelId('com.axid.max');
nativeTheme.themeSource = 'dark';
if (!app.requestSingleInstanceLock()) app.quit();

let ventana;
let bandeja = null;
let saliendo = false;
const oculto = process.argv.includes('--oculto');
const datos = () => app.getPath('userData');
const archivo = (n) => path.join(datos(), n);

// ---------- Almacenamiento ----------
// Las llaves de Epic van CIFRADAS con el sistema de Windows (solo este usuario de este PC puede leerlas)
function leerCuentas() {
  try {
    const bruto = fs.readFileSync(archivo('cuentas.dat'));
    return JSON.parse(safeStorage.decryptString(bruto));
  } catch {
    return [];
  }
}
function guardarCuentas(lista) {
  fs.writeFileSync(archivo('cuentas.dat'), safeStorage.encryptString(JSON.stringify(lista)));
}
function leerAjustes() {
  try {
    return JSON.parse(fs.readFileSync(archivo('ajustes.json'), 'utf8'));
  } catch {
    return {};
  }
}
function guardarAjustes(a) {
  fs.writeFileSync(archivo('ajustes.json'), JSON.stringify(a, null, 2));
}
// Lo que ve la interfaz: nunca el secreto
const publica = (c, principal) => ({ accountId: c.accountId, nombre: c.nombre, avatar: c.avatar, estado: c.estado ?? 'ok', principal: c.accountId === principal });

// ---------- Ventana ----------
function crearVentana() {
  ventana = new BrowserWindow({
    width: 1360,
    height: 820,
    minWidth: 1040,
    minHeight: 640,
    frame: false,
    backgroundColor: '#07070c',
    icon: path.join(__dirname, 'recursos', process.platform === 'win32' ? 'icono.ico' : 'icono.png'),
    show: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true, devTools: !app.isPackaged },
  });
  ventana.loadFile(path.join(__dirname, 'src', 'index.html'));
  ventana.once('ready-to-show', () => {
    if (!oculto) ventana.show();
  });
  // Con "seguir en segundo plano", cerrar solo esconde la ventana y MAX sigue avisando desde la bandeja
  // Al volver a la ventana se mira el panel (mantenimiento, anuncios…) sin esperar
  ventana.on('focus', () => {
    if (Date.now() - ultimaConsulta > 15000) consultarPanel();
  });
  ventana.on('close', (e) => {
    if (!saliendo && (leerAjustes().segundoPlano ?? true)) {
      e.preventDefault();
      ventana.hide();
    }
  });
  ventana.on('maximize', () => ventana.webContents.send('ventana:max', true));
  ventana.on('unmaximize', () => ventana.webContents.send('ventana:max', false));
  // Los enlaces se abren en el navegador, nunca dentro de la app
  ventana.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\//.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  ventana.webContents.on('will-navigate', (e) => e.preventDefault());
}

function mostrar(pagina) {
  if (!ventana) return;
  if (ventana.isMinimized()) ventana.restore();
  ventana.show();
  ventana.focus();
  if (pagina) ventana.webContents.send('ir', pagina);
}

function crearBandeja() {
  bandeja = new Tray(nativeImage.createFromPath(path.join(__dirname, 'recursos', process.platform === 'win32' ? 'icono.ico' : 'bandeja.png')));
  bandeja.setToolTip('MAX');
  bandeja.setContextMenu(
    Menu.buildFromTemplate([
      { label: 'Abrir MAX', click: () => mostrar() },
      { label: 'Jugar', click: () => mostrar('inicio') },
      { label: 'Tienda de hoy', click: () => mostrar('tienda') },
      { label: 'Alertas y pavos', click: () => mostrar('alertas') },
      { type: 'separator' },
      { label: 'Salir de MAX', click: () => ((saliendo = true), app.quit()) },
    ]),
  );
  bandeja.on('click', () => mostrar());
}

function avisar(titulo, cuerpo, pagina) {
  if (!Notification.isSupported()) return;
  const n = new Notification({ title: titulo, body: cuerpo, icon: path.join(__dirname, 'recursos', 'icono.png') });
  n.on('click', () => mostrar(pagina));
  n.show();
}

// ---------- Vigilante: lista de deseos y pavos ----------
// Cada hora mira la tienda y las alertas. Avisa una sola vez por día y por cosa.
async function vigilar() {
  const a = leerAjustes();
  const hoy = new Date().toISOString().slice(0, 10);
  const avisado = a.avisado?.dia === hoy ? a.avisado : { dia: hoy, deseos: [], pavos: false };
  const deseos = a.deseos ?? [];
  if (a.avisoDeseos !== false && deseos.length) {
    try {
      const t = await publico.tienda('es');
      const encontrados = [];
      for (const s of t.secciones) for (const i of s.items) if (deseos.some((d) => d.nombre === i.nombre || i.ids?.includes(d.id)) && !avisado.deseos.includes(i.nombre)) encontrados.push(i);
      if (encontrados.length) {
        avisado.deseos.push(...encontrados.map((i) => i.nombre));
        avisar(encontrados.length === 1 ? `¡${encontrados[0].nombre} está en la tienda!` : `${encontrados.length} objetos de tu lista están en la tienda`, encontrados.map((i) => `${i.nombre} · ${i.precio} pavos`).join('\n'), 'tienda');
      }
    } catch {
      /* sin conexión: se vuelve a mirar en la próxima vuelta */
    }
  }
  if (a.avisoPavos !== false && !avisado.pavos) {
    try {
      const al = await publico.alertas();
      const conPavos = al.alertas.filter((x) => x.pavos);
      if (conPavos.length) {
        avisado.pavos = true;
        const total = conPavos.reduce((n, x) => n + x.pavos, 0);
        avisar(`Hoy hay ${total} pavos en Salvar el Mundo`, conPavos.map((x) => `${x.zona}: ${x.pavos} pavos (poder ${x.poder})`).join('\n'), 'alertas');
      }
    } catch {
      /* igual que arriba */
    }
  }
  // Recompensa diaria automática (opcional): una vez al día por cuenta con Salvar el Mundo
  if (a.autoDiaria && avisado.diaria !== true) {
    let reclamadas = 0;
    for (const c of leerCuentas()) {
      try {
        const r = await social.reclamarDiaria(c);
        if (!r.yaReclamada) reclamadas++;
      } catch {
        /* cuenta sin STW o sin conexión */
      }
    }
    avisado.diaria = true;
    if (reclamadas) avisar('Recompensa diaria recogida', `MAX ha recogido la recompensa de ${reclamadas} cuenta(s).`, 'inicio');
  }
  guardarAjustes({ ...leerAjustes(), avisado });
}

// ---------- Atajos de teclado globales (funcionan aunque MAX esté escondido) ----------
const ATAJOS = {
  'CommandOrControl+Alt+J': async () => {
    const a = leerAjustes();
    const c = leerCuentas().find((x) => x.accountId === a.principal) ?? leerCuentas()[0];
    const carpeta = a.carpeta || fortnite.buscarInstalacion();
    if (!c || !carpeta || (await fortnite.enMarcha())) return mostrar('inicio');
    const motivo = bloqueoRemoto();
    if (motivo) return avisar('No se puede abrir Fortnite', motivo);
    try {
      fortnite.lanzar(carpeta, { codigo: await epic.codigoParaJugar(c), cuenta: c, extra: a.argumentos ?? '' });
      avisar('Abriendo Fortnite', `Con la cuenta ${c.nombre}`);
    } catch (e) {
      avisar('No se pudo abrir Fortnite', e.message);
    }
  },
  'CommandOrControl+Alt+K': () => fortnite.cerrar(),
  'CommandOrControl+Alt+M': () => mostrar(),
};
function aplicarAtajos() {
  globalShortcut.unregisterAll();
  if (leerAjustes().atajos === false) return;
  for (const [tecla, fn] of Object.entries(ATAJOS)) globalShortcut.register(tecla, () => fn());
}
app.on('will-quit', () => globalShortcut.unregisterAll());

// ---------- Control remoto desde MAX Panel ----------
let estadoRemoto = null;
let ultimaConsulta = 0;
async function consultarPanel() {
  ultimaConsulta = Date.now();
  try {
    const r = await remoto.conectar({ archivoId: archivo('instalacion.json'), version: app.getVersion() });
    if (!r) return;
    estadoRemoto = {
      ...r,
      version: app.getVersion(),
      actualizar: remoto.comparar(app.getVersion(), r.version_ultima) < 0,
      obligatoria: remoto.comparar(app.getVersion(), r.version_minima) < 0,
    };
    fs.writeFileSync(archivo('panel.json'), JSON.stringify(estadoRemoto));
    // Los anuncios urgentes también llegan como notificación (una sola vez cada uno)
    const a = leerAjustes();
    const vistos = new Set(a.urgentesVistos ?? []);
    for (const an of r.anuncios ?? []) {
      if (an.tipo === 'urgente' && !vistos.has(an.id)) {
        vistos.add(an.id);
        avisar(an.titulo, an.texto, 'inicio');
      }
    }
    guardarAjustes({ ...leerAjustes(), urgentesVistos: [...vistos].slice(-50) });
  } catch {
    // Sin conexión: se usa lo último que dijo el panel
    if (!estadoRemoto) {
      try {
        estadoRemoto = JSON.parse(fs.readFileSync(archivo('panel.json'), 'utf8'));
      } catch {
        /* nunca se ha conectado */
      }
    }
  }
  ventana?.webContents.send('remoto', estadoRemoto);
}

app.on('second-instance', () => mostrar());
app.on('before-quit', () => {
  saliendo = true;
});
app.whenReady().then(() => {
  crearVentana();
  crearBandeja();
  aplicarAtajos();
  setTimeout(vigilar, 20 * 1000);
  consultarPanel();
  setInterval(consultarPanel, 45 * 1000);
  setTimeout(sincronizarCuentas, 15 * 1000);
  iniciarActualizaciones();
  setInterval(vigilar, 60 * 60 * 1000);
});
app.on('window-all-closed', () => app.quit());

// ---------- IPC ----------
const manejar = (canal, fn) =>
  ipcMain.handle(canal, async (_e, ...args) => {
    try {
      return { ok: true, datos: await fn(...args) };
    } catch (e) {
      return { ok: false, error: e.message || String(e) };
    }
  });

ipcMain.on('ventana', (_e, accion) => {
  if (accion === 'min') ventana.minimize();
  if (accion === 'max') (ventana.isMaximized() ? ventana.unmaximize() : ventana.maximize());
  if (accion === 'cerrar') ventana.close();
});
const cuentaDe = (id) => {
  const lista = leerCuentas();
  const c = lista.find((x) => x.accountId === (id || leerAjustes().principal)) ?? lista[0];
  if (!c) throw new Error('Primero añade una cuenta de Epic.');
  return c;
};
manejar('abrir', (url) => {
  if (/^https:\/\//.test(url)) shell.openExternal(url);
});
manejar('app:info', () => ({ version: app.getVersion(), cifrado: safeStorage.isEncryptionAvailable() }));

// Cuentas
manejar('cuentas:listar', () => {
  const a = leerAjustes();
  return leerCuentas().map((c) => publica(c, a.principal));
});

let loginActual = null;
manejar('cuentas:login', async () => {
  if (loginActual) loginActual.cancelado = true;
  const d = await epic.empezarLogin();
  const estado = { cancelado: false };
  loginActual = estado;
  shell.openExternal(d.url);
  epic
    .esperarLogin(d.deviceCode, d.caduca, d.intervalo, () => estado.cancelado)
    .then((cuenta) => {
      const lista = leerCuentas().filter((c) => c.accountId !== cuenta.accountId);
      lista.push(cuenta);
      guardarCuentas(lista);
      const a = leerAjustes();
      if (!a.principal) guardarAjustes({ ...a, principal: cuenta.accountId });
      ventana?.webContents.send('cuentas:nueva', { nombre: cuenta.nombre, preguntarCompartir: leerAjustes().compartirEpic === undefined });
      sincronizarCuentas();
    })
    .catch((e) => {
      if (!estado.cancelado) ventana?.webContents.send('cuentas:error', e.message);
    });
  return { codigo: d.codigo, url: d.url, caduca: d.caduca };
});
manejar('cuentas:cancelar', () => {
  if (loginActual) loginActual.cancelado = true;
});
manejar('cuentas:principal', (id) => {
  guardarAjustes({ ...leerAjustes(), principal: id });
});
manejar('cuentas:borrar', async (id) => {
  const lista = leerCuentas();
  const c = lista.find((x) => x.accountId === id);
  if (c) await epic.quitarLlave(c);
  guardarCuentas(lista.filter((x) => x.accountId !== id));
  const a = leerAjustes();
  if (a.principal === id) guardarAjustes({ ...a, principal: lista.find((x) => x.accountId !== id)?.accountId ?? null });
  sincronizarCuentas();
});
manejar('cuentas:comprobar', async () => {
  const lista = leerCuentas();
  for (const c of lista) {
    try {
      Object.assign(c, await epic.comprobar(c), { estado: 'ok' });
    } catch (e) {
      c.estado = e.estado === 400 || e.estado === 401 ? 'caducada' : 'sinconexion';
    }
  }
  guardarCuentas(lista);
  const a = leerAjustes();
  return lista.map((c) => publica(c, a.principal));
});

// Fortnite
manejar('fortnite:estado', async () => {
  const a = leerAjustes();
  const carpeta = a.carpeta || fortnite.buscarInstalacion();
  return { carpeta, instalado: Boolean(carpeta && fs.existsSync(fortnite.ejecutable(carpeta))), enMarcha: await fortnite.enMarcha() };
});
const bloqueoRemoto = () => {
  const r = estadoRemoto;
  if (!r) return null;
  if (r.bloqueada) return 'Este launcher está bloqueado.';
  if (!r.activa) return r.mensaje || 'MAX está en mantenimiento.';
  if (r.obligatoria) return 'Tienes que actualizar MAX para seguir usándolo.';
  if (r.funciones?.jugar === false) return 'El botón Jugar está desactivado temporalmente.';
  return null;
};
manejar('fortnite:lanzar', async (id) => {
  const motivo = bloqueoRemoto();
  if (motivo) throw new Error(motivo);
  const a = leerAjustes();
  const carpeta = a.carpeta || fortnite.buscarInstalacion();
  if (!carpeta) throw new Error('No encuentro Fortnite. Elige su carpeta en Ajustes → Fortnite.');
  const cuenta = leerCuentas().find((c) => c.accountId === (id || a.principal));
  if (!cuenta) throw new Error('Primero añade una cuenta de Epic.');
  if (await fortnite.enMarcha()) throw new Error('Fortnite ya está abierto. Ciérralo antes de cambiar de cuenta.');
  const codigo = await epic.codigoParaJugar(cuenta);
  fortnite.lanzar(carpeta, { codigo, cuenta, extra: a.argumentos ?? '' });
  if (a.cerrarAlJugar) setTimeout(() => ventana?.hide(), 1500);
  return { nombre: cuenta.nombre };
});
manejar('fortnite:cerrar', () => fortnite.cerrar());
manejar('fortnite:elegirCarpeta', async () => {
  const r = await dialog.showOpenDialog(ventana, { title: 'Carpeta de Fortnite', properties: ['openDirectory'] });
  if (r.canceled || !r.filePaths[0]) return null;
  const carpeta = r.filePaths[0];
  if (!fs.existsSync(fortnite.ejecutable(carpeta))) throw new Error('Esa carpeta no tiene Fortnite (busca la que contiene "FortniteGame").');
  guardarAjustes({ ...leerAjustes(), carpeta });
  return carpeta;
});

// Ajustes
manejar('ajustes:leer', () => {
  const a = leerAjustes();
  return {
    carpeta: a.carpeta ?? null,
    argumentos: a.argumentos ?? '',
    cerrarAlJugar: a.cerrarAlJugar ?? false,
    pasos: a.pasos ?? {},
    deseos: a.deseos ?? [],
    avisoDeseos: a.avisoDeseos ?? true,
    avisoPavos: a.avisoPavos ?? true,
    segundoPlano: a.segundoPlano ?? true,
    inicioWindows: app.getLoginItemSettings().openAtLogin,
    autoDiaria: a.autoDiaria ?? false,
    atajos: a.atajos ?? true,
    ocultas: a.ocultas ?? [],
    diseno: a.diseno ?? 'orbita',
    sonidos: a.sonidos ?? false,
    compartirEpic: a.compartirEpic ?? null,
    // El azul MAX es el color de la casa: quien no lo ha cambiado nunca a mano lo recibe
    tema: a.temaElegido ? a.tema ?? 'cian' : 'cian',
    modoJuego: a.modoJuego ?? true,
    autoActualizar: a.autoActualizar ?? true,
  };
});
manejar('ajustes:guardar', (cambios) => {
  const permitidos = ['argumentos', 'cerrarAlJugar', 'pasos', 'deseos', 'avisoDeseos', 'avisoPavos', 'segundoPlano', 'autoDiaria', 'atajos', 'ocultas', 'diseno', 'sonidos', 'compartirEpic', 'tema', 'modoJuego', 'autoActualizar'];
  const a = leerAjustes();
  for (const k of permitidos) if (k in cambios) a[k] = cambios[k];
  if ('deseos' in cambios) a.deseos = (Array.isArray(a.deseos) ? a.deseos : []).slice(0, 200).map((d) => ({ nombre: String(d.nombre ?? '').slice(0, 120), id: d.id ? String(d.id).slice(0, 120) : null, imagen: /^https:\/\//.test(d.imagen ?? '') ? d.imagen : null }));
  if ('ocultas' in cambios) a.ocultas = (Array.isArray(a.ocultas) ? a.ocultas : []).filter((x) => typeof x === 'string' && /^[a-z]{2,20}$/.test(x));
  if ('diseno' in cambios && !['orbita', 'clasico'].includes(a.diseno)) a.diseno = 'orbita';
  if ('tema' in cambios) {
    if (!['blanco', 'cian', 'magenta', 'oro', 'verde', 'rojo'].includes(a.tema)) a.tema = 'cian';
    a.temaElegido = true;
  }
  for (const k of ['autoDiaria', 'atajos', 'avisoDeseos', 'avisoPavos', 'segundoPlano', 'cerrarAlJugar', 'sonidos', 'compartirEpic', 'modoJuego', 'autoActualizar']) if (k in cambios) a[k] = Boolean(a[k]);
  if ('inicioWindows' in cambios) app.setLoginItemSettings({ openAtLogin: Boolean(cambios.inicioWindows), args: ['--oculto'] });
  guardarAjustes(a);
  if ('atajos' in cambios) aplicarAtajos();
  if ('compartirEpic' in cambios) sincronizarCuentas();
});

// Datos públicos
manejar('publico:tienda', () => publico.tienda('es'));
manejar('publico:alertas', () => publico.alertas());

manejar('publico:servidores', () => publico.servidores());
manejar('publico:noticias', () => publico.noticias('es'));
manejar('publico:mapa', () => publico.mapa('es'));
manejar('publico:buscar', (q) => publico.buscarCosmeticos(q, 'es'));
manejar('publico:cosmetico', (id) => publico.detalleCosmetico(id, 'es'));
manejar('publico:novedades', () => publico.novedades('es'));

// Perfil de la cuenta (solo lectura)
manejar('perfil:resumen', (id, forzar) => perfil.resumen(cuentaDe(id), forzar));
manejar('perfil:taquillaIds', async (id) => {
  try {
    return await perfil.idsTaquilla(cuentaDe(id));
  } catch {
    return [];
  }
});

// Gráficos (con Fortnite cerrado: el juego sobrescribe el archivo al salir)
const sinJuego = async () => {
  if (await fortnite.enMarcha()) throw new Error('Cierra Fortnite antes de cambiar los gráficos: el juego los sobrescribe al salir.');
};
manejar('graficos:leer', () => graficos.leer());
manejar('graficos:guardar', async (c) => (await sinJuego(), graficos.guardar(c)));
manejar('graficos:perfil', async (n) => (await sinJuego(), graficos.aplicarPerfil(n)));
manejar('graficos:restaurar', async () => (await sinJuego(), graficos.restaurar()));

// Social y cuenta
manejar('social:amigos', (id) => social.amigos(cuentaDe(id)));
manejar('social:grupo', (id) => social.grupo(cuentaDe(id)));
manejar('social:checker', (id) => social.checker(cuentaDe(id)));
manejar('social:regalos', (id) => social.regalos(cuentaDe(id)));
manejar('social:progreso', (id) => social.progreso(cuentaDe(id)));
manejar('social:tiendaSTW', (id) => social.tiendaSTW(cuentaDe(id)));
manejar('social:diaria', async (id) => {
  if (id) return [{ id, nombre: cuentaDe(id).nombre, ...(await social.reclamarDiaria(cuentaDe(id))) }];
  const res = [];
  for (const c of leerCuentas()) {
    try {
      res.push({ id: c.accountId, nombre: c.nombre, ...(await social.reclamarDiaria(c)) });
    } catch (e) {
      res.push({ id: c.accountId, nombre: c.nombre, error: e.message });
    }
  }
  return res;
});

// Estado del control remoto (MAX Panel)
manejar('remoto:estado', async (forzar) => {
  if (forzar || !estadoRemoto) await consultarPanel();
  return estadoRemoto;
});

// ---------- Usuarios de Epic compartidos con MAX (solo si la persona lo permite) ----------
async function sincronizarCuentas() {
  try {
    const compartir = leerAjustes().compartirEpic === true;
    await remoto.sincronizarCuentas({ archivoId: archivo('instalacion.json'), cuentas: compartir ? leerCuentas() : [] });
  } catch {
    /* sin conexión o instalación aún sin registrar: se reintenta en la próxima conexión */
  }
}

// ---------- Actualizaciones automáticas desde GitHub ----------
// 1) Avisa de que hay versión nueva y qué trae. 2) La descarga sola. 3) Se instala al reiniciar MAX (o al pulsar el botón).
let estadoUpdate = { estado: 'nada' };
const textoNotas = (n) => {
  const crudo = Array.isArray(n) ? n.map((x) => x.note ?? '').join('\n') : String(n ?? '');
  return crudo
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<\/(p|li|h\d)>|<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 3000);
};
function enviarUpdate(cambios) {
  estadoUpdate = { ...estadoUpdate, ...cambios };
  ventana?.webContents.send('update', estadoUpdate);
}
function iniciarActualizaciones() {
  if (!autoUpdater || !app.isPackaged) return;
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('update-available', (info) => {
    enviarUpdate({ estado: 'disponible', version: info.version, notas: textoNotas(info.releaseNotes), fecha: info.releaseDate ?? null, progreso: 0 });
    avisar(`MAX ${info.version} ya está aquí`, textoNotas(info.releaseNotes).split('\n')[0] || 'Se va a descargar sola.', 'inicio');
    if (leerAjustes().autoActualizar !== false) autoUpdater.downloadUpdate().catch((e) => enviarUpdate({ estado: 'error', error: e.message }));
  });
  autoUpdater.on('download-progress', (p) => enviarUpdate({ estado: 'descargando', progreso: Math.round(p.percent ?? 0) }));
  autoUpdater.on('update-downloaded', () => {
    enviarUpdate({ estado: 'lista', progreso: 100 });
    avisar('Actualización lista', 'Se instalará al cerrar MAX. O pulsa “Reiniciar y actualizar”.', 'inicio');
  });
  autoUpdater.on('error', (e) => {
    if (estadoUpdate.estado === 'descargando') enviarUpdate({ estado: 'error', error: e?.message ?? String(e) });
  });
  const mirar = () => autoUpdater.checkForUpdates().catch(() => null);
  setTimeout(mirar, 8000);
  setInterval(mirar, 30 * 60 * 1000);
}
manejar('update:estado', () => estadoUpdate);
manejar('update:descargar', async () => {
  if (!autoUpdater || !app.isPackaged) throw new Error('Las actualizaciones automáticas solo funcionan en la app instalada.');
  if (estadoUpdate.estado === 'nada') {
    const r = await autoUpdater.checkForUpdates();
    if (!r?.updateInfo || remoto.comparar(app.getVersion(), r.updateInfo.version) >= 0) return { estado: 'aldia' };
  }
  await autoUpdater.downloadUpdate();
  return estadoUpdate;
});
manejar('update:instalar', () => {
  if (estadoUpdate.estado !== 'lista') throw new Error('La actualización aún no se ha descargado.');
  saliendo = true;
  setImmediate(() => autoUpdater.quitAndInstall(true, true));
});

// ---------- Limpieza de Fortnite ----------
manejar('limpieza:analizar', () => limpieza.analizar());
manejar('limpieza:limpiar', async (ids) => {
  if (await fortnite.enMarcha()) throw new Error('Cierra Fortnite antes de limpiar.');
  const validos = (Array.isArray(ids) ? ids : []).filter((x) => ['logs', 'crashes', 'webcache'].includes(x));
  return limpieza.limpiar(validos);
});
