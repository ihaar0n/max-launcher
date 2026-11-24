// Solo para ver la interfaz en un navegador normal. Dentro de la app, window.max lo pone preload.js y esto no hace nada.
if (!window.max) {
  const espera = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
  let cuentas = [
    { accountId: 'a1b2c3d4e5f60718293a4b5c6d7e8f90', nombre: 'axid8913', avatar: null, estado: 'ok', principal: true },
    { accountId: '0f9e8d7c6b5a49382716f5e4d3c2b1a0', nombre: 'MAX Smurf', avatar: null, estado: 'caducada', principal: false },
  ];
  let juego = { carpeta: 'C:\\Program Files\\Epic Games\\Fortnite', instalado: true, enMarcha: false };
  let ajustes = { argumentos: '', pasos: {}, deseos: [{ nombre: 'Reina Neón', id: null, imagen: null }], avisoDeseos: true, avisoPavos: true, segundoPlano: true, inicioWindows: false, cerrarAlJugar: false, autoDiaria: true, atajos: true, ocultas: [], diseno: 'orbita', tema: 'cian', modoJuego: true, autoActualizar: true, compartirEpic: true };
  let graf = { ruta: 'C:\\Users\\tú\\AppData\\Local\\FortniteGame\\Saved\\Config\\WindowsClient\\GameUserSettings.ini', hayCopia: true, fps: 144, ancho: 1920, alto: 1080, pantalla: 0, vsync: false, escala: 100, calidad: 1, distancia: 3, sombras: 0, modo: 'rendimiento' };
  const tipos = ['Trajes', 'Mochilas', 'Picos', 'Alas delta', 'Gestos'];
  const cosmeticos = Array.from({ length: 64 }, (_, i) => ({ id: `cid_${String(i).padStart(3, '0')}_athena_commando`, tipo: tipos[i % 5], favorito: i % 9 === 0, nuevo: i % 13 === 0, imagen: '' }));
  const escuchas = { nueva: [], error: [] };
  function fondoSvg(a, b, mapa) {
    const extra = mapa ? "<circle cx='300' cy='300' r='260' fill='%232e8a4a'/><circle cx='220' cy='240' r='90' fill='%233aa35a'/><circle cx='380' cy='380' r='110' fill='%23287a3f'/>" : '';
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a.replace('#', '%23')}'/><stop offset='1' stop-color='${b.replace('#', '%23')}'/></linearGradient></defs><rect width='600' height='600' fill='url(%23g)'/>${extra}</svg>`;
  }
  const rarezas = ['legendary', 'epic', 'rare', 'uncommon', 'marvelseries', 'iconseries'];
  const cosmeticosMock = ['Renegada', 'Peely', 'Galaxia', 'Jonesy', 'Midas', 'Aura', 'Calamidad', 'Drift', 'Lynx', 'Raven', 'Skye', 'Meowscles'].map((n, i) => ({ id: `cid_${i}`, nombre: n, descripcion: 'Un clásico de la isla.', tipo: 'Traje', rareza: rarezas[i % 6], rarezaId: rarezas[i % 6], imagen: null, icono: null, colores: [], introducido: 'Se introdujo en el Capítulo 1, Temporada ' + ((i % 9) + 1), set: null, historial: ['2026-11-0' + ((i % 9) + 1), '2026-08-12', '2026-05-20'], anadido: null }));
  const premio = (nombre, cantidad = 1) => ({ nombre, cantidad });
  const alertas = {
    pavosHoy: 160,
    alertas: [
      { zona: 'Piedrabuena', emoji: '🌲', tipo: 'Recuperar los datos', lugar: 'Ciudad', poder: 9, pavos: 0, items: [premio('Barra de refuerzo', 4), premio('Manual de entrenamiento', 120)] },
      { zona: 'Piedrabuena', emoji: '🌲', tipo: 'Eliminar y recoger', lugar: 'Bosque', poder: 15, pavos: 50, items: [premio('Pavos', 50), premio('Cerveza de héroe', 2)] },
      { zona: 'Tablas', emoji: '🌾', tipo: 'Construir el radar', lugar: 'Suburbios', poder: 34, pavos: 0, items: [premio('Esquema transformador', 1), premio('Pura gota de lluvia', 3)] },
      { zona: 'Tablas', emoji: '🌾', tipo: 'Lanzar el cohete', lugar: 'Industrial', poder: 46, pavos: 0, items: [premio('Cristal de relámpago', 6)] },
      { zona: 'Valle Latente', emoji: '🏜️', tipo: 'Reparar el refugio', lugar: 'Desierto', poder: 64, pavos: 0, items: [premio('Llama del ojo de tormenta', 2)] },
      { zona: 'Valle Latente', emoji: '🏜️', tipo: 'Recuperar los datos', lugar: 'Ciudad', poder: 76, pavos: 0, items: [premio('Esquema de arma épica', 1)] },
      { zona: 'Picos Gélidos', emoji: '🏔️', tipo: 'Repartir el paquete', lugar: 'Montaña', poder: 108, pavos: 110, items: [premio('Pavos', 110), premio('Gota de tormenta', 20)] },
      { zona: 'Picos Gélidos', emoji: '🏔️', tipo: 'Proteger el generador', lugar: 'Ciudad', poder: 124, pavos: 0, items: [premio('Pequeño ojo de tormenta', 5)] },
    ],
  };
  const obj = (nombre, tipo, precio, colores, extra = {}) => ({ nombre, tipo, rareza: '', precio, antes: 0, imagen: window.__arte ? (window.__arte = window.__arte === 'prueba-arte1.jpg' ? 'prueba-arte2.jpg' : 'prueba-arte1.jpg') : null, colores, nuevo: false, banner: null, sale: false, incluye: [], ...extra });
  const tienda = {
    fecha: new Date().toISOString(),
    total: 64,
    secciones: [
      { nombre: 'Destacados', indice: 0, items: [obj('Reina Neón', 'Traje', 1500, ['#ff2e88', '#8a4dff'], { banner: 'Nuevo' }), obj('Lote Noche Eterna', 'Lote', 2200, ['#3a1c71', '#d76d77'], { antes: 2800 }), obj('Hachas Plasma', 'Pico', 800, ['#33d1ff', '#1b3a7a']), obj('Baile del Faro', 'Gesto', 500, ['#ffc542', '#ff7a00'])] },
      { nombre: 'Leyendas urbanas', indice: 1, items: [obj('Rastreador', 'Traje', 1200, ['#2ee6a0', '#0e4a3a']), obj('Capa Vortex', 'Mochila', 400, ['#8a4dff', '#2a1a5e']), obj('Planeador Aurora', 'Ala delta', 800, ['#33d1ff', '#8a4dff']), obj('Cromo Líquido', 'Envoltorio', 500, ['#c0c0d0', '#505070']), obj('Vigía', 'Traje', 1500, ['#ff4f6d', '#5a0f20'])] },
      { nombre: 'Gestos', indice: 2, items: [obj('Paso Atrás', 'Gesto', 300, ['#3ad6ff', '#2a7bff']), obj('Victoria Real', 'Gesto', 500, ['#ffc542', '#8a5a00']), obj('Saludo MAX', 'Gesto', 200, ['#ff2e88', '#3a0f2a'], { banner: 'Popular' })] },
    ],
  };
  window.max = {
    ventana: () => {},
    alMaximizar: () => {},
    alIr: () => {},
    remoto: {
      estado: async () => window.__remoto ?? { proximamente: [{ id: 'torneos', nombre: 'Torneos', icono: 'trofeo', grupo: 'Battle Royale', despues: 'tienda', texto: '- Torneos semanales de la comunidad\n- Premios en pavos\n- Clasificación en directo', fecha: 'Diciembre' }, { id: 'clips', nombre: 'Clips', icono: 'cohete', grupo: 'Social', despues: '', texto: 'Graba y comparte tus mejores jugadas.', fecha: '' }], activa: true, version: '1.0.0', version_ultima: '1.0.1', version_minima: '0.0.0', actualizar: true, obligatoria: false, notas_version: 'Perfiles de gráficos nuevos y más velocidad.', url_descarga: 'https://example.com', funciones: { graficos: false }, bloqueada: false, anuncios: [{ id: 9, titulo: 'Torneo MAX este sábado', texto: 'Apúntate en el Discord: premios en pavos para el top 3.', tipo: 'novedad', enlace: 'https://discord.com' }, { id: 8, titulo: 'Mantenimiento de Epic el martes', texto: 'Fortnite estará caído de 9:00 a 11:00.', tipo: 'aviso', enlace: null }] },
      alCambiar: (fn) => (window.__alRemoto = fn),
    },
    abrir: (u) => console.log('abrir', u),
    info: async () => ({ version: '1.0.0', cifrado: true }),
    cuentas: {
      listar: async () => structuredClone(cuentas),
      login: async () => {
        setTimeout(() => {
          cuentas.push({ accountId: crypto.randomUUID().replace(/-/g, ''), nombre: 'NuevaCuenta', avatar: null, estado: 'ok', principal: false });
          escuchas.nueva.forEach((f) => f({ nombre: 'NuevaCuenta' }));
        }, 6000);
        return espera(500, { codigo: 'K7M2XQ9P', url: 'https://www.epicgames.com/activate', caduca: 600 });
      },
      cancelar: async () => true,
      principal: async (id) => {
        cuentas = cuentas.map((c) => ({ ...c, principal: c.accountId === id }));
        return true;
      },
      borrar: async (id) => {
        cuentas = cuentas.filter((c) => c.accountId !== id);
        return true;
      },
      comprobar: async () => espera(600, structuredClone(cuentas)),
      alNueva: (f) => escuchas.nueva.push(f),
      alError: (f) => escuchas.error.push(f),
    },
    fortnite: {
      estado: async () => ({ ...juego }),
      lanzar: async () => {
        juego.enMarcha = true;
        return true;
      },
      cerrar: async () => {
        juego.enMarcha = false;
        return true;
      },
      elegirCarpeta: async () => juego.carpeta,
    },
    ajustes: {
      leer: async () => structuredClone(ajustes),
      guardar: async (a) => Object.assign(ajustes, a),
    },
    publico: {
      tienda: () => espera(400, tienda),
      alertas: () => espera(400, alertas),
      servidores: () => espera(300, { estado: 'operational', texto: 'Funciona', servicios: [] }),
      noticias: () => espera(300, [['Temporada nueva', 'Una isla renovada, nuevos lugares y el pase de batalla más grande hasta ahora.', '#3a1c71', '#f868fe'], ['Modo Recarga', 'Partidas rápidas con reaparición en un mapa pequeño. Perfecto para echar un rato.', '#0f3b5a', '#65e7fd'], ['Copa de Pavos', 'Este fin de semana: compite en dúos y gana premios.', '#4d260b', '#e0812c']].map(([titulo, texto, a, b], i) => ({ titulo, texto, etiqueta: ['Novedad', 'Modo', 'Torneo'][i], imagen: fondoSvg(a, b) }))),
      mapa: () => espera(400, { imagen: fondoSvg('#1d5a3a', '#0b2a4a', true), lugares: [['Pueblo Tomate', 30, 35], ['Torres Inclinadas', 45, 50], ['Parque Placentero', 60, 30], ['Fortín', 70, 65], ['Muelle', 25, 70]].map(([nombre, x, y], i) => ({ nombre, x, y, grande: i < 4 })) }),
      buscar: (q) => espera(400, cosmeticosMock.filter((c) => c.nombre.toLowerCase().includes(String(q).toLowerCase()))),
      cosmetico: (id) => espera(300, cosmeticosMock.find((c) => c.id === id) ?? { ...cosmeticosMock[0], historial: ['2026-11-01', '2026-09-12', '2026-07-20', '2026-05-02', '2026-02-14'] }),
      novedades: () => espera(400, { compilacion: '37.10', objetos: cosmeticosMock }),
    },
    perfil: {
      resumen: () => espera(500, { pavos: 2350, nivel: 87, pase: { nivel: 87, comprado: true, temporada: 37 }, victorias: 41, recuento: { Trajes: 13, Mochilas: 13, Picos: 13, 'Alas delta': 13, Gestos: 12 }, cosmeticos, stw: { nivel: 142, dias: 1210, coleccion: 96, investigacion: 480, heroes: 84, esquemas: 211, supervivientes: 312, defensores: 18, recursos: [{ id: 'reagent_c_t01', cantidad: 2400 }, { id: 'voucher_basicpack', cantidad: 12 }, { id: 'reagent_evolverarity_sr', cantidad: 9 }] } }),
      taquillaIds: async () => [],
    },
    social: {
      amigos: () => espera(400, { amigos: ['Zeta', 'Nube', 'Kaio', 'LunaFN', 'Drako', 'Mire', 'Toxic', 'Polar'].map((n, i) => ({ id: String(i), nombre: n, desde: '2023-0' + ((i % 8) + 1) + '-10', favorito: i < 2 })), recibidas: [{ id: 'x', nombre: 'Ghost', desde: null, favorito: false }], enviadas: [], bloqueados: 1 }),
      grupo: () => espera(400, { enGrupo: true, privacidad: 'OPEN', max: 4, miembros: [{ id: '1', nombre: 'axid8913', lider: true, yo: true, imagen: null }, { id: '2', nombre: 'Zeta', lider: false, yo: false, imagen: null }, { id: '3', nombre: 'Nube', lider: false, yo: false, imagen: null }] }),
      checker: () => espera(400, { nombre: 'axid8913', email: 'a•••d@gmail.com', emailVerificado: true, dosPasos: true, pais: 'ES', ultimoAcceso: new Date().toISOString(), cambiosNombre: 2, puedeCambiarNombre: true, plataformas: [{ tipo: 'psn', nombre: 'axid_ps' }, { tipo: 'xbl', nombre: null }], tieneSTW: true, bloqueos: null, reembolsos: 2, regalosPendientes: 1 }),
      regalos: () => espera(400, { recibidos: [{ de: 'Zeta', mensaje: '¡Feliz cumple!', fecha: new Date().toISOString(), objetos: [{ id: 'cid_x', cantidad: 1, imagen: '' }] }], enviados: 3, recibidosTotal: 7 }),
      progreso: () => espera(400, { total: 2350, plataforma: 'EpicPC', pavos: [{ origen: 'Comprados', cantidad: 1500 }, { origen: 'Ganados jugando', cantidad: 650 }, { origen: 'Regalos y eventos', cantidad: 200 }], compras: [{ fecha: '2026-11-02', gastado: 1200, objetos: 3 }, { fecha: '2026-10-14', gastado: 800, objetos: 1 }], xp: { nivel: 87, xp: 41200, nivelCuenta: 1240, pase: 87, temporada: 37, victorias: 41 }, temporadas: [36, 35, 34, 33, 32].map((t) => ({ temporada: t, nivel: 100 + t, pase: 100, victorias: t % 7, comprado: true })) }),
      tiendaSTW: () => espera(400, [{ nombre: 'Tienda semanal de evento', objetos: [{ nombre: 'Llama de héroe legendaria', precio: 4000, moneda: 'oro', limite: 1 }, { nombre: 'Llama de superviviente', precio: 1200, moneda: 'oro', limite: 3 }] }, { nombre: 'Llamas X-Ray', objetos: [{ nombre: 'Llama X-Ray', precio: 50, moneda: 'tickets X-Ray', limite: null }] }]),
      diaria: () => espera(600, [{ id: '1', nombre: 'axid8913', yaReclamada: false }, { id: '2', nombre: 'MAX Smurf', error: 'sin STW' }]),
    },
    update: { estado: async () => (window.__update ?? { estado: 'descargando', version: '1.0.1', progreso: 64, notas: '• Interfaz nueva estilo lobby\n• Arreglos de rendimiento' }), descargar: async () => ({ estado: 'aldia' }), instalar: async () => true, alCambiar: () => {} },
    limpieza: { analizar: async () => [{ id: 'logs', nombre: 'Registros del juego', bytes: 412e6 }, { id: 'crashes', nombre: 'Informes de fallos', bytes: 96e6 }, { id: 'webcache', nombre: 'Caché web del juego', bytes: 230e6 }], limpiar: async () => ({ liberado: 738e6 }) },
    graficos: { leer: async () => ({ ...graf }), guardar: async (c) => Object.assign(graf, c), perfil: async () => graf, restaurar: async () => graf },
  };
}
