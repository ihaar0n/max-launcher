// MAX — interfaz
const $ = (s, r = document) => r.querySelector(s);
const h = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const fmt = (n) => Number(n).toLocaleString('de-DE'); // de-DE agrupa también los miles (2.350); es-ES no lo hace con 4 cifras

const I = {
  inicio: '<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  cuentas: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.9.7 3.1 2.4 3.5 5.2"/>',
  alertas: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  perfil: '<path d="M12 3 4 7v6c0 4 3.4 7.2 8 8 4.6-.8 8-4 8-8V7z"/>',
  tienda: '<path d="M4 7h16l-1.4 11.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8z"/><path d="M9 7a3 3 0 0 1 6 0"/>',
  taquilla: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M12 3v18M9 11h.01M15 11h.01"/>',
  lanzar: '<path d="M5 19c2-6 5-11 14-14-3 9-8 12-14 14z"/><path d="M5 19l4-4M14.5 9.5h.01"/>',
  graficos: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  discord: '<path d="M8 6.5c-2 .5-3.4 1.3-3.4 1.3S2.8 11 3 16c1.5 1.6 3.8 2 3.8 2l.9-1.6M16 6.5c2 .5 3.4 1.3 3.4 1.3s1.8 3.2 1.6 8.2c-1.5 1.6-3.8 2-3.8 2l-.9-1.6M8 6.5a14 14 0 0 1 8 0M7.5 15.5c2.7 1.3 6.3 1.3 9 0"/><circle cx="9.3" cy="12" r="1"/><circle cx="14.7" cy="12" r="1"/>',
  bot: '<rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01"/>',
  ajustes: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  tiendastw: '<path d="M4 9h16l-1 11H5z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/><path d="M10 14h4"/>',
  progreso: '<path d="M4 19V5M4 19h16"/><path d="m7 15 4-4 3 3 5-6"/>',
  regalos: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8S10 3 7.5 4.5 9 8 12 8zm0 0s2-5 4.5-3.5S15 8 12 8z"/>',
  amigos: '<circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M2.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5M13.5 15c.8-.3 1.6-.5 2.5-.5 2.7 0 4.9 1.5 5.5 4.5"/>',
  grupo: '<circle cx="12" cy="7" r="3"/><circle cx="5" cy="11" r="2.2"/><circle cx="19" cy="11" r="2.2"/><path d="M7 20c.6-3.4 2.6-5 5-5s4.4 1.6 5 5M1.5 19c.3-2 1.6-3.2 3.5-3.2M22.5 19c-.3-2-1.6-3.2-3.5-3.2"/>',
  checker: '<path d="M9 11l2 2 4-4"/><path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z"/>',
  automatico: '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="3"/>',
  teclado: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
  cosmeticos: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8M8 10.5h5M10.5 8v5"/>',
  mapa: '<path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5z"/><path d="M9 4v13M15 6.5v13"/>',
  reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cohete: '<path d="M5 19c2-6 5-11 14-14-3 9-8 12-14 14z"/><path d="M5 19l4-4M14.5 9.5h.01"/>',
  trofeo: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a2 2 0 0 0 2 4h1M16 6h3a2 2 0 0 1-2 4h-1M12 13v4M8 21h8M10 17h4v4h-4z"/>',
  calendario: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  escoba: '<path d="M14 4 20 10M12 6l6 6-7 7H5v-6z"/><path d="M8 13l3 3"/>',
  limpieza: '<path d="M14 4 20 10M12 6l6 6-7 7H5v-6z"/><path d="M8 13l3 3"/>',
  descarga: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
  escudo: '<path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  flecha: '<path d="m6 9 6 6 6-6"/>',
  play: '<path d="M7 4.5v15l12-7.5z" fill="currentColor"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  recargar: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
  estrella: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  basura: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  carpeta: '<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  corazon: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  servidor: '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  campana: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  candado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
};
const ico = (n) => `<svg viewBox="0 0 24 24">${I[n] ?? ''}</svg>`;
const DISCORD = 'https://discord.com/channels/1573024503246888960';

// Páginas del menú (las "pronto" enseñan lo que viene)
const MENU = [
  { titulo: null, items: [['inicio', 'Inicio'], ['cuentas', 'Cuentas']] },
  { titulo: 'Salvar el Mundo', items: [['alertas', 'Alertas y pavos'], ['tiendastw', 'Tienda STW'], ['perfil', 'Perfil STW']] },
  { titulo: 'Battle Royale', items: [['tienda', 'Tienda de objetos'], ['cosmeticos', 'Buscador de cosméticos'], ['mapa', 'Mapa'], ['taquilla', 'Taquilla'], ['progreso', 'Pavos y XP'], ['regalos', 'Regalos']] },
  { titulo: 'Social', items: [['amigos', 'Amigos'], ['grupo', 'Grupo']] },
  { titulo: 'Herramientas', items: [['lanzar', 'Lanzamiento'], ['graficos', 'Gráficos'], ['checker', 'Checker'], ['limpieza', 'Limpieza'], ['automatico', 'Automático']] },
  { titulo: 'Comunidad', items: [['discord', 'Servidor de Discord'], ['bot', 'Panel del bot', true]] },
];
const FIJAS = ['inicio', 'cuentas'];
const NOMBRES = Object.fromEntries(MENU.flatMap((g) => g.items.map(([id, n]) => [id, n])).concat([['ajustes', 'Ajustes']]));

const estado = { pagina: 'inicio', cuentas: [], juego: { enMarcha: false, instalado: false }, ajustes: {}, alertas: null, tienda: null, desplegable: false, servidores: null, perfiles: {}, tengo: null };
const principal = () => estado.cuentas.find((c) => c.principal) ?? estado.cuentas[0] ?? null;
const avatarGrande = (c) => c?.avatar?.replace('smallicon.png', 'featured.png') ?? null;

// ---------- Avisos ----------
function aviso(texto, tipo = 'bien') {
  const d = document.createElement('div');
  d.className = `aviso ${tipo}`;
  d.setAttribute('role', tipo === 'mal' ? 'alert' : 'status');
  d.innerHTML = `<span class="aviso-icono">${tipo === 'mal' ? '!' : ico('check')}</span><div class="aviso-texto">${h(texto)}</div><i class="aviso-tiempo"></i>`;
  $('#avisos').append(d);
  sonido(tipo === 'mal' ? 'error' : 'ok');
  // Se cierra solo; pasar el ratón lo pausa
  let queda = 4500;
  let desde = Date.now();
  let t = setTimeout(cerrar, queda);
  function cerrar() {
    d.classList.add('saliendo');
    setTimeout(() => d.remove(), 220);
  }
  d.addEventListener('mouseenter', () => {
    clearTimeout(t);
    queda -= Date.now() - desde;
    d.classList.add('pausado');
  });
  d.addEventListener('mouseleave', () => {
    desde = Date.now();
    t = setTimeout(cerrar, Math.max(800, queda));
    d.classList.remove('pausado');
  });
  d.addEventListener('click', cerrar);
}
function esqueleto(tipo) {
  const b = (clase, n) => Array.from({ length: n }, () => `<i class="esq ${clase}"></i>`).join('');
  if (tipo === 'tienda') return `<div class="esq-titulo esq"></div><div class="objetos">${b('esq-objeto', 8)}</div>`;
  if (tipo === 'zonas') return `<div class="rejilla datos3" style="margin-bottom:14px">${b('esq-dato', 3)}</div><div class="zonas">${b('esq-zona', 4)}</div>`;
  if (tipo === 'filas') return `<div class="panel">${b('esq-fila', 6)}</div>`;
  return `<div class="rejilla datos4">${b('esq-dato', 4)}</div><div class="rejilla" style="grid-template-columns:1fr 1fr;margin-top:14px">${b('esq-bloque', 2)}</div>`;
}

// ---------- Sonidos de interfaz (opcionales, sintetizados: sin archivos) ----------
let audio = null;
function sonido(tipo) {
  if (!estado?.ajustes?.sonidos) return;
  try {
    audio ??= new AudioContext();
    const o = audio.createOscillator();
    const g = audio.createGain();
    const ahora = audio.currentTime;
    const notas = { clic: [880, 0.04], ok: [660, 0.12, 990], error: [220, 0.18, 160], jugar: [520, 0.25, 1040], aviso: [740, 0.22, 1180] }[tipo] ?? [700, 0.05];
    o.type = tipo === 'error' ? 'triangle' : 'sine';
    o.frequency.setValueAtTime(notas[0], ahora);
    if (notas[2]) o.frequency.exponentialRampToValueAtTime(notas[2], ahora + notas[1]);
    g.gain.setValueAtTime(0.0001, ahora);
    g.gain.exponentialRampToValueAtTime(0.06, ahora + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ahora + notas[1]);
    o.connect(g).connect(audio.destination);
    o.start(ahora);
    o.stop(ahora + notas[1] + 0.02);
  } catch {
    /* sin audio: no pasa nada */
  }
}

// ---------- Celebración: chispas de neón desde un punto ----------
function celebrar(x = innerWidth / 2, y = innerHeight / 2) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const lienzo = document.createElement('canvas');
  lienzo.className = 'celebracion';
  lienzo.width = innerWidth;
  lienzo.height = innerHeight;
  document.body.append(lienzo);
  const cx = lienzo.getContext('2d');
  const colores = ['#65e7fd', '#c878ff', '#f868fe', '#ffffff'];
  const p = Array.from({ length: 70 }, () => {
    const a = Math.random() * Math.PI * 2;
    const v = 3 + Math.random() * 6;
    return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 3, r: 1.5 + Math.random() * 2.5, c: colores[(Math.random() * 4) | 0], vida: 1 };
  });
  const paso = () => {
    cx.clearRect(0, 0, lienzo.width, lienzo.height);
    let vivas = 0;
    for (const q of p) {
      if (q.vida <= 0) continue;
      vivas++;
      q.x += q.vx;
      q.y += q.vy;
      q.vy += 0.18;
      q.vx *= 0.985;
      q.vida -= 0.016;
      cx.globalAlpha = Math.max(0, q.vida);
      cx.fillStyle = q.c;
      cx.shadowColor = q.c;
      cx.shadowBlur = 10;
      cx.beginPath();
      cx.arc(q.x, q.y, q.r, 0, Math.PI * 2);
      cx.fill();
    }
    vivas ? requestAnimationFrame(paso) : lienzo.remove();
  };
  requestAnimationFrame(paso);
}

async function intentar(fn, ok) {
  try {
    const r = await fn();
    if (ok) aviso(typeof ok === 'function' ? ok(r) : ok);
    return r;
  } catch (e) {
    aviso(e.message, 'mal');
    return null;
  }
}

// ---------- Menú ----------
function pintarMenu() {
  const ocultas = [...(estado.ajustes.ocultas ?? []), ...funcionesApagadas()];
  $('#menu').innerHTML = menuConProximamente()
    .map((g) => {
      const items = g.items.filter(([id]) => !ocultas.includes(id));
      if (!items.length) return '';
      return `<div class="grupo">${g.titulo ? `<div class="grupo-titulo">${h(g.titulo)}</div>` : ''}${items
        .map(([id, n, pronto, icono]) => `<button class="enlace-menu${estado.pagina === id ? ' activo' : ''}" data-ir="${id}" data-nombre="${h(n)}${pronto ? ' · Próximamente' : ''}" ${pronto ? 'data-pronto' : ''} type="button">${ico(icono ?? id)}<span>${h(n)}</span>${pronto ? '<em class="pronto">Pronto</em>' : ''}</button>`)
        .join('')}</div>`;
    })
    .join('');
  document.body.classList.toggle('orbita', (estado.ajustes.diseno ?? 'orbita') === 'orbita');
  document.querySelectorAll('.lateral-pie .enlace-menu').forEach((b) => b.classList.toggle('activo', b.dataset.ir === estado.pagina));
}

function ir(pagina) {
  if (funcionesApagadas().includes(pagina)) {
    aviso('Esta función está desactivada temporalmente. Vuelve a intentarlo más tarde.', 'mal');
    pagina = 'inicio';
  }
  estado.pagina = pagina;
  document.body.dataset.pagina = pagina;
  estado.desplegable = false;
  pintarMenu();
  pintarBarra();
  const c = $('#contenido');
  c.scrollTop = 0;
  if (pagina.startsWith('pronto-')) return paginaProxima(c, pagina);
  (PAGINAS[pagina] ?? PAGINAS.inicio)(c);
}

// ---------- Barra superior ----------
function avatarHtml(c, clase = 'avatar') {
  return `<span class="${clase}">${c?.avatar ? `<img src="${h(c.avatar)}" alt="" data-quitar>` : h((c?.nombre ?? '?')[0]?.toUpperCase())}</span>`;
}

function pintarBarra() {
  const c = principal();
  $('#selectorCuenta').innerHTML = `
    <button class="cuenta-boton" id="botonCuenta" type="button" aria-expanded="${estado.desplegable}">
      ${avatarHtml(c)}<span class="nombre">${c ? h(c.nombre) : 'Sin cuenta'}</span>${c?.estado === 'caducada' ? '<span class="etiqueta mala">Caducada</span>' : ''}${ico('flecha')}
    </button>
    ${
      estado.desplegable
        ? `<div class="desplegable">${estado.cuentas
            .map((x) => `<button type="button" data-cuenta="${x.accountId}">${avatarHtml(x)}<span style="flex:1">${h(x.nombre)}</span>${x.principal ? '<span class="etiqueta">Principal</span>' : ''}</button>`)
            .join('')}${estado.cuentas.length ? '<div class="sep"></div>' : ''}<button type="button" data-accion="login">${ico('mas')}<span>Añadir cuenta</span></button></div>`
        : ''
    }`;
  const j = estado.juego;
  $('#estadoJuego').innerHTML = `
    <button class="boton mini primario" type="button" data-accion="jugar" ${!c || j.enMarcha ? 'disabled' : ''}>${ico('play')}Jugar</button>
    ${j.enMarcha ? `<button class="boton mini peligro" type="button" data-accion="cerrarJuego">${ico('stop')}Cerrar Fortnite</button>` : ''}
    <span class="suave" style="display:flex;align-items:center;gap:7px;font-size:12.5px;margin-left:6px"><i class="punto ${j.enMarcha ? 'vivo' : ''}"></i>${j.enMarcha ? 'Fortnite abierto' : j.instalado ? 'Fortnite cerrado' : 'Fortnite no encontrado'}</span>
    ${estado.servidores ? `<span class="servidores ${estado.servidores.estado}" title="Servidores de Fortnite">${ico('servidor')}Servidores: ${h(estado.servidores.texto)}</span>` : ''}`;
}

// ---------- Acciones ----------
async function cargarCuentas() {
  estado.cuentas = (await intentar(() => max.cuentas.listar())) ?? [];
}
async function refrescarJuego() {
  estado.juego = (await max.fortnite.estado().catch(() => null)) ?? estado.juego;
  // Modo juego: con Fortnite abierto, MAX quita animaciones y desenfoques para no restar FPS
  document.body.classList.toggle('modo-juego', Boolean(estado.juego.enMarcha && estado.ajustes.modoJuego !== false));
  pintarBarra();
}

async function jugar(id) {
  if (funcionesApagadas().includes('jugar')) return aviso('El botón Jugar está desactivado temporalmente.', 'mal');
  const c = id ? estado.cuentas.find((x) => x.accountId === id) : principal();
  if (!c) return ir('cuentas');
  aviso(`Abriendo Fortnite con ${c.nombre}…`);
  sonido('jugar');
  const r = await intentar(() => max.fortnite.lanzar(c.accountId));
  if (r) setTimeout(refrescarJuego, 8000);
}

function abrirLogin() {
  estado.desplegable = false;
  pintarBarra();
  const caja = $('#modalCaja');
  caja.innerHTML = `<h2>Añadir cuenta de Epic</h2><p class="suave">Preparando el inicio de sesión…</p><div class="espera"><i class="giro"></i>Conectando con Epic Games</div>`;
  $('#modal').hidden = false;
  max.cuentas
    .login()
    .then((d) => {
      caja.innerHTML = `
        <h2>Añadir cuenta de Epic</h2>
        <p class="suave">Se ha abierto la web oficial de Epic Games. Inicia sesión allí y confirma este código:</p>
        <div class="codigo">${h(d.codigo)}</div>
        <div class="espera"><i class="giro"></i>Esperando a que confirmes en el navegador…</div>
        <p class="tenue" style="font-size:12.5px;margin:14px 0 0">MAX nunca ve tu contraseña. Solo guarda una llave cifrada en este PC para no tener que volver a entrar.</p>
        <div class="pie"><button class="boton" type="button" data-accion="abrirWebEpic" data-url="${h(d.url)}">Abrir la web otra vez</button><button class="boton" type="button" data-accion="cancelarLogin">Cancelar</button></div>`;
    })
    .catch((e) => {
      caja.innerHTML = `<h2>No se pudo conectar</h2><p class="suave">${h(e.message)}</p><div class="pie"><button class="boton" data-accion="cancelarLogin" type="button">Cerrar</button></div>`;
    });
}
function cerrarModal() {
  $('#modal').hidden = true;
  $('#modalCaja').className = 'modal';
}

// Desplaza solo el contenido (scrollIntoView movería también la ventana entera)
function desplazarA(sel) {
  const el = $(sel);
  const c = $('#contenido');
  if (el && c) c.scrollTo({ top: el.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop - 20, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

// ---------- Efectos ----------
const sinMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Cifras que suben desde 0 al aparecer
function contar(el, fin) {
  if (!el) return;
  if (sinMovimiento || !fin) return void (el.textContent = fmt(fin));
  const t0 = performance.now();
  const paso = (t) => {
    const k = Math.min(1, (t - t0) / 900);
    el.textContent = fmt(Math.round(fin * (1 - Math.pow(1 - k, 3))));
    if (k < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}
// Nombre flotante de cada icono en el diseño Órbita
const etiquetaFlotante = Object.assign(document.createElement('div'), { className: 'etiqueta-flotante' });
document.body.append(etiquetaFlotante);
document.addEventListener('pointerover', (e) => {
  const b = e.target.closest?.('.enlace-menu, .buscar');
  if (!b || !document.body.classList.contains('orbita')) return etiquetaFlotante.classList.remove('ver');
  const r = b.getBoundingClientRect();
  etiquetaFlotante.textContent = b.dataset.nombre ?? b.textContent.trim().replace(/Ctrl K$/, '').trim();
  etiquetaFlotante.style.left = `${r.right + 10}px`;
  etiquetaFlotante.style.top = `${r.top + r.height / 2 - 15}px`;
  etiquetaFlotante.classList.add('ver');
});
// Foco de luz que sigue al ratón en paneles y objetos, e inclinación 3D en los objetos de la tienda
document.addEventListener('pointermove', (e) => {
  const el = e.target.closest?.('.panel, .objeto, .escenario');
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
  if (!sinMovimiento && el.classList.contains('objeto')) {
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-3px)`;
  }
});
document.addEventListener('pointerout', (e) => {
  const el = e.target.closest?.('.objeto');
  if (el && !el.contains(e.relatedTarget)) el.style.transform = '';
});

// ---------- Utilidades de tiempo ----------
function siguienteReinicio() {
  const d = new Date();
  d.setUTCHours(24, 0, 0, 0);
  return d;
}
function cuentaAtras(fin) {
  const ms = Math.max(0, fin - Date.now());
  const hh = Math.floor(ms / 3.6e6);
  const mm = Math.floor((ms % 3.6e6) / 6e4);
  return `${hh} h ${String(mm).padStart(2, '0')} min`;
}

// ---------- Páginas ----------
const PAGINAS = {
  async inicio(c) {
    const p = principal();
    const fin = siguienteReinicio();
    const pct = 100 - ((fin - Date.now()) / 8.64e7) * 100;
    c.innerHTML = `<div class="pagina">
      <section class="escenario">
        <div class="escenario-texto">
          <div class="escenario-saludo">${saludo()}${p ? `, ${h(p.nombre)}` : ''}<span class="chip-pavos" id="pavosCuenta" hidden></span></div>
          <h1>${p ? (estado.juego.enMarcha ? 'En partida' : 'Listo para jugar') : 'Añade tu cuenta'}</h1>
          <p>${p ? (estado.juego.enMarcha ? 'Fortnite está abierto con tu cuenta. MAX se queda en segundo plano gastando lo mínimo.' : 'Entra con tu cuenta sin contraseña. Cambia de cuenta arriba a la izquierda.') : 'Inicia sesión con Epic Games una sola vez y abre Fortnite con un clic. Puedes tener todas las cuentas que quieras.'}</p>
          <div class="escenario-botones">${
            p
              ? `<button class="boton primario jugar" type="button" data-accion="jugar" ${estado.juego.enMarcha ? 'disabled' : ''}>${ico('play')}<span>JUGAR</span></button>
                 ${estado.juego.enMarcha ? `<button class="boton peligro" type="button" data-accion="cerrarJuego">${ico('stop')}Cerrar Fortnite</button>` : `<button class="boton fantasma" type="button" data-accion="login">${ico('mas')}Otra cuenta</button>`}`
              : `<button class="boton primario jugar" type="button" data-accion="login">${ico('mas')}<span>AÑADIR CUENTA</span></button>`
          }</div>
        </div>
        <div class="vitrina" id="vitrina"><button class="vitrina-etiqueta" type="button" id="destacado" hidden></button></div>
        <div class="hud">
          <div class="hud-dato"><span class="hud-titulo">Reinicio diario</span><b class="hud-cifra" id="cuentaAtras">${cuentaAtras(fin)}</b><span class="hud-pie">Cambian la tienda y las alertas</span><div class="barra-progreso"><i style="width:${pct.toFixed(1)}%"></i></div></div>
          <button class="hud-dato" type="button" data-ir="alertas"><span class="hud-titulo">Pavos en alertas</span><b class="hud-cifra pavos" id="pavosHoy">…</b><span class="hud-pie" id="pavosTexto">Mirando Salvar el Mundo</span></button>
          <button class="hud-dato" type="button" data-ir="tienda"><span class="hud-titulo">Tienda de hoy</span><b class="hud-cifra" id="tiendaTotal">…</b><span class="hud-pie">objetos a la venta</span><img class="hud-mini" id="tiendaMini" alt="" hidden></button>
          <div class="hud-dato"><span class="hud-titulo">Recompensa diaria</span><b class="hud-cifra" id="diariaCifra">${estado.diaria ? `${estado.diaria.ok}/${estado.diaria.total}` : '—'}</b><span class="hud-pie" id="diariaTexto">${estado.ajustes.autoDiaria ? 'Se recoge sola cada día' : 'Recógela de todas tus cuentas'}</span>
            <button class="boton mini" type="button" data-accion="diaria" ${estado.cuentas.length ? '' : 'disabled'}>${ico('regalos')}Recoger</button></div>
        </div>
      </section>
      ${bannersRemotos()}
      <h2 class="subtitulo" id="tituloEstante" hidden>En la tienda hoy <button class="boton mini" type="button" data-ir="tienda">Ver toda la tienda</button></h2>
      <div class="estante" id="estante"></div>
      <section class="noticias" id="noticias" hidden></section>
      <div class="rejilla" style="grid-template-columns:1.4fr 1fr;margin-top:14px">
        <div class="panel pasos"><h2>Primeros pasos</h2><ul>${pasos()}</ul></div>
        <div class="panel"><h2>Servidores de Fortnite</h2><div id="panelServidores"><div class="espera"><i class="giro"></i>Comprobando…</div></div>
          <div class="sep-panel"></div><p class="suave" style="margin:0 0 10px">Únete al servidor de MAX: tienda diaria, avisos de pavos y soporte.</p><button class="boton mini" type="button" data-accion="discord">${ico('discord')}Abrir el Discord</button></div>
      </div></div>`;
    const reloj = setInterval(() => {
      const el = $('#cuentaAtras');
      if (!el) return clearInterval(reloj);
      el.textContent = cuentaAtras(siguienteReinicio());
    }, 30000);
    cargarAlertas().then((a) => {
      if (!a || !$('#pavosHoy')) return;
      const pavos = a.alertas.reduce((n, x) => n + x.pavos, 0);
      contar($('#pavosHoy'), pavos);
      $('#pavosTexto').textContent = pavos ? `en ${a.alertas.filter((x) => x.pavos).length} misiones de alerta` : 'Hoy no hay misiones de pavos';
    });
    cargarServidores().then(pintarServidores);
    max.publico.noticias().then(pintarNoticias).catch(() => null);
    if (p) cargarPerfil(p.accountId).then((r) => {
      const el = $('#pavosCuenta');
      if (!r || !el) return;
      el.innerHTML = `<i class="moneda"></i>${fmt(r.pavos)} pavos`;
      el.hidden = false;
    });
    cargarTienda().then((t) => {
      if (!t || !$('#tiendaTotal')) return;
      contar($('#tiendaTotal'), t.total);
      const todos = t.secciones.flatMap((s) => s.items).filter((i) => i.imagen);
      const primero = todos[0];
      if (primero) {
        Object.assign($('#tiendaMini'), { src: primero.imagen, hidden: false });
        // El escenario y el telón de toda la app usan el arte del objeto destacado de hoy
        const url = `url("${primero.imagen.replace(/["\\]/g, '')}")`;
        $('.escenario')?.style.setProperty('--fondo-dia', url);
        $('.escenario')?.classList.add('con-arte');
        ponerTelon(primero.imagen);
        const d = $('#destacado');
        if (d) {
          d.innerHTML = `Destacado hoy · <b>${h(primero.nombre)}</b> <i class="moneda"></i>${fmt(primero.precio)}`;
          d.dataset.accion = 'ficha';
          d.dataset.nombre = primero.nombre;
          d.hidden = false;
        }
      }
      const est = $('#estante');
      if (est && todos.length) {
        est.innerHTML = todos.slice(0, 14).map(objeto).join('');
        $('#tituloEstante').hidden = false;
      }
    });
  },

  async cuentas(c) {
    c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Cuentas</h1><p>Tus cuentas de Epic Games en este PC. Elige la principal para el botón Jugar.</p></div>
      <div class="acciones"><button class="boton" type="button" data-accion="comprobar">${ico('recargar')}Comprobar</button><button class="boton primario" type="button" data-accion="login">${ico('mas')}Añadir cuenta</button></div></div>
      <div id="listaCuentas"></div></div>`;
    pintarCuentas();
  },

  async alertas(c) {
    c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Alertas y pavos</h1><p>Misiones de alerta de Salvar el Mundo de hoy, con sus recompensas. Cambian a las 01:00 (hora de España).</p></div>
      <div class="acciones"><button class="boton" type="button" data-accion="recargarAlertas">${ico('recargar')}Actualizar</button></div></div><div id="cuerpoAlertas">${esqueleto('zonas')}</div></div>`;
    const a = await cargarAlertas();
    const cuerpo = $('#cuerpoAlertas');
    if (!cuerpo) return;
    if (!a) {
      cuerpo.innerHTML = `<div class="error-caja">No se pudieron cargar las alertas. Comprueba tu conexión y pulsa Actualizar.</div>`;
      return;
    }
    const conPavos = a.alertas.filter((x) => x.pavos);
    const total = conPavos.reduce((n, x) => n + x.pavos, 0);
    const zonas = new Map();
    for (const x of a.alertas) zonas.set(x.zona, [...(zonas.get(x.zona) ?? []), x]);
    cuerpo.innerHTML = `
      <div class="resumen-stw">
        <div class="panel dato"><div class="suave">Misiones de pavos</div><div class="cifra oro">${total ? fmt(total) : 'Ninguna'}</div><div class="tenue">${total ? `en ${conPavos.length} alertas` : 'Hoy no hay pavos en las alertas'}</div></div>
        <div class="panel dato"><div class="suave">Alertas activas</div><div class="cifra">${a.alertas.length}</div><div class="tenue">en ${zonas.size} zonas</div></div>
        <div class="panel dato"><div class="suave">Cambian en</div><div class="cifra">${cuentaAtras(siguienteReinicio())}</div><div class="tenue">a las 00:00 UTC</div></div>
      </div>
      <div class="zonas">${[...zonas.entries()]
        .map(
          ([zona, lista]) => `<div class="panel"><div class="zona-cab"><span style="font-size:20px">${lista[0].emoji}</span><h2>${h(zona)}</h2><span class="tenue">${lista.length}</span></div>
          ${lista
            .map(
              (m) => `<div class="mision${m.pavos ? ' con-pavos' : ''}"><div class="poder">${m.poder}<small>poder</small></div><div><b>${h(m.tipo.replace(/ · ⚡\d+$/, ''))}</b>${m.lugar ? `<div class="lugar">${h(m.lugar)}</div>` : ''}
              <div class="premios">${m.items.map((i) => `<span class="premio${/Pavos/.test(i.nombre) ? ' pavos' : ''}">${h(i.nombre)}${i.cantidad > 1 ? ` ×${fmt(i.cantidad)}` : ''}</span>`).join('')}</div></div></div>`,
            )
            .join('')}</div>`,
        )
        .join('')}</div>`;
  },

  async tienda(c) {
    c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Tienda de objetos</h1><p>Todo lo que hay hoy en la tienda de Battle Royale, por secciones.</p></div></div>
      <div class="filtros"><input class="campo" id="buscarObjeto" placeholder="Buscar en la tienda…"><span id="chipsTipo"></span></div>
      <div id="cuerpoTienda">${esqueleto('tienda')}</div></div>`;
    const t = await cargarTienda();
    if (!$('#cuerpoTienda')) return;
    if (!t) {
      $('#cuerpoTienda').innerHTML = `<div class="error-caja">No se pudo cargar la tienda. Comprueba tu conexión.</div>`;
      return;
    }
    const tipos = ['Todo', 'Mi lista', 'Lote', 'Traje', 'Gesto', 'Pico', 'Mochila', 'Ala delta', 'Envoltorio'];
    let filtro = { texto: '', tipo: 'Todo' };
    if (principal() && !estado.tengo) max.perfil.taquillaIds().then((ids) => {
      estado.tengo = new Set(ids);
      if ($('#cuerpoTienda') && ids.length) pintar();
    }).catch(() => null);
    const pintar = () => {
      $('#chipsTipo').innerHTML = tipos.map((x) => `<button class="chip${filtro.tipo === x ? ' activo' : ''}" type="button" data-tipo="${x}">${x}</button>`).join(' ');
      const html = t.secciones
        .map((s) => {
          const items = s.items.filter((i) => (filtro.tipo === 'Todo' || i.tipo === filtro.tipo || (filtro.tipo === 'Mi lista' && esDeseo(i))) && i.nombre.toLowerCase().includes(filtro.texto));
          if (!items.length) return '';
          return `<section class="seccion-tienda"><h2>${h(s.nombre)}</h2><div class="objetos">${items.map(objeto).join('')}</div></section>`;
        })
        .join('');
      $('#cuerpoTienda').innerHTML = html || (filtro.tipo === 'Mi lista' ? `<div class="vacio">${ico('corazon')}<h2>Nada de tu lista hoy</h2><p>Pulsa el corazón de cualquier objeto. Cuando salga en la tienda, MAX te avisará con una notificación aunque tengas la ventana cerrada.</p></div>` : `<div class="vacio"><h2>Nada por aquí</h2><p>No hay objetos con ese filtro.</p></div>`);
    };
    repintarTienda = pintar;
    pintar();
    $('#buscarObjeto').addEventListener('input', (e) => {
      filtro.texto = e.target.value.trim().toLowerCase();
      pintar();
    });
    $('#chipsTipo').addEventListener('click', (e) => {
      const b = e.target.closest('[data-tipo]');
      if (!b) return;
      filtro.tipo = b.dataset.tipo;
      pintar();
    });
  },

  async lanzar(c) {
    await refrescarJuego();
    estado.ajustes = (await intentar(() => max.ajustes.leer())) ?? {};
    const j = estado.juego;
    c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Lanzamiento</h1><p>Dónde está Fortnite y cómo se abre desde MAX.</p></div></div>
      <div class="panel">
        <div class="fila">${ico('carpeta')}<div class="texto"><b>Carpeta de Fortnite</b><div class="ruta">${h(j.carpeta ?? 'No encontrada')}</div></div><button class="boton mini" type="button" data-accion="elegirCarpeta">Cambiar</button></div>
        <div class="fila"><i class="punto ${j.enMarcha ? 'vivo' : ''}"></i><div class="texto"><b>${j.enMarcha ? 'Fortnite está abierto' : 'Fortnite está cerrado'}</b><span>${j.instalado ? 'Instalación encontrada' : 'Instala Fortnite con Epic Games o elige su carpeta'}</span></div>
          ${j.enMarcha ? `<button class="boton mini peligro" type="button" data-accion="cerrarJuego">${ico('stop')}Cerrar Fortnite</button>` : `<button class="boton mini primario" type="button" data-accion="jugar" ${principal() ? '' : 'disabled'}>${ico('play')}Jugar</button>`}</div>
        <div class="fila"><div class="texto"><b>Argumentos extra</b><span>Opciones avanzadas al abrir el juego, por ejemplo <code>-NOTEXTURESTREAMING</code></span></div><input class="campo" id="argumentos" value="${h(estado.ajustes.argumentos)}" style="min-width:300px" placeholder="Opcional"></div>
      </div></div>`;
    $('#argumentos').addEventListener('change', (e) => intentar(() => max.ajustes.guardar({ argumentos: e.target.value.trim() }), 'Argumentos guardados'));
  },

  async discord(c) {
    c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Servidor de Discord</h1><p>MAX vive también en Discord. Todo lo que ves aquí se publica allí de forma automática.</p></div></div>
      <div class="rejilla" style="grid-template-columns:repeat(3,1fr)">
        ${[['tienda', 'Tienda diaria', 'Se publica sola en ▸🛒tienda cada vez que cambia.'], ['alertas', 'Avisos de pavos', 'En ▸💰pavos te avisamos cuando hay misiones de pavos.'], ['bot', 'Soporte', 'Reporta fallos y sugiere mejoras con los botones de ▸reportes y ▸sugerencias.']]
          .map(([i, t, d]) => `<div class="panel">${ico(i)}<h2 style="margin-top:10px">${t}</h2><p class="suave" style="margin:0">${d}</p></div>`)
          .join('')}
      </div>
      <div style="margin-top:18px"><button class="boton primario" type="button" data-accion="discord">${ico('discord')}Abrir el servidor</button></div></div>`;
  },

  async ajustes(c) {
    estado.ajustes = (await max.ajustes.leer().catch(() => null)) ?? estado.ajustes;
    const info = await max.info().catch(() => ({}));
    c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Ajustes</h1><p>Información de la app y de tu privacidad.</p></div></div>
      <div class="panel">
        <div class="fila">${ico('candado')}<div class="texto"><b>Tus cuentas están cifradas</b><span>${info.cifrado ? 'Las llaves de Epic se guardan cifradas con Windows: solo tu usuario de este PC puede leerlas.' : 'El cifrado de Windows no está disponible en este equipo.'}</span></div></div>
        <div class="fila">${ico('carpeta')}<div class="texto"><b>Carpeta de Fortnite</b><span>Se detecta sola. Puedes cambiarla en Lanzamiento.</span></div><button class="boton mini" type="button" data-ir="lanzar">Ir</button></div>
        <div class="fila">${ico('servidor')}<div class="texto"><b>Conexión con MAX</b><span>Para avisarte de actualizaciones y novedades, MAX envía un número aleatorio de esta instalación, la versión y tu Windows. Ni tu IP, ni tu correo, ni tus contraseñas. Tu nombre de Epic solo si lo permites en Privacidad.</span></div></div>
        <div class="fila"><img src="../recursos/icono-256.png" width="24" height="24" style="border-radius:7px" alt=""><div class="texto"><b>MAX ${h(info.version ?? '')}</b><span>Hecho por ax¡d</span></div></div>
      </div>
      <div class="panel" style="margin-top:14px"><h2>Avisos y segundo plano</h2>
        ${[
          ['avisoDeseos', 'Avisarme cuando salga algo de mi lista', 'Una notificación de Windows cuando un objeto con corazón está en la tienda'],
          ['avisoPavos', 'Avisarme de las misiones de pavos', 'Una vez al día, si hay pavos en las alertas de Salvar el Mundo'],
          ['segundoPlano', 'Seguir en la bandeja al cerrar', 'Cerrar la ventana no apaga MAX, así te siguen llegando los avisos'],
          ['inicioWindows', 'Abrir MAX al encender el PC', 'Empieza escondido en la bandeja, sin molestar'],
          ['cerrarAlJugar', 'Esconder MAX al abrir Fortnite', 'La ventana se va a la bandeja cuando empieza el juego'],
          ['sonidos', 'Sonidos de la interfaz', 'Clics y avisos suaves, hechos por MAX (sin archivos de audio)'],
          ['modoJuego', 'Modo juego', 'Con Fortnite abierto, MAX quita animaciones y efectos para no restarte FPS'],
          ['autoActualizar', 'Actualizar MAX solo', 'Cuando salga una versión nueva te avisa, la descarga y se instala al cerrar'],
        ]
          .map(([k, t, d]) => `<div class="fila"><div class="texto"><b>${t}</b><span>${d}</span></div><button class="interruptor" type="button" role="switch" aria-checked="${Boolean(estado.ajustes[k])}" aria-label="${t}" data-accion="interruptor" data-clave="${k}"></button></div>`)
          .join('')}
      </div>
      <div class="panel" style="margin-top:14px"><h2>${ico('escudo')}Privacidad</h2>
        <div class="fila"><div class="texto"><b>Compartir mi nombre de Epic con MAX</b><span>Solo el nombre de usuario y su número público, para soporte y para frenar abusos. Nunca contraseñas ni llaves. Si lo quitas, se borra al momento.</span></div><button class="interruptor" type="button" role="switch" aria-checked="${estado.ajustes.compartirEpic === true}" aria-label="Compartir mi nombre de Epic" data-accion="interruptor" data-clave="compartirEpic"></button></div>
      </div>
      <div class="panel" style="margin-top:14px"><h2>Color de acento</h2><p class="suave" style="margin-top:-4px">El fondo cambia cada día con el arte de la tienda; esto es el color de los botones y lo seleccionado.</p>
        <div class="temas">${[['cian', '#3fd8ff', 'Azul MAX'], ['blanco', '#ffffff', 'Blanco'], ['magenta', '#ff6ad5', 'Magenta'], ['oro', '#ffcf4a', 'Oro'], ['verde', '#55f0a6', 'Verde'], ['rojo', '#ff6b78', 'Rojo']].map(([id, col, n]) => `<button class="tema${(estado.ajustes.tema ?? 'cian') === id ? ' activo' : ''}" type="button" style="--c:${col}" title="${n}" aria-label="Color ${n}" data-accion="tema" data-tema="${id}"></button>`).join('')}</div>
      </div>
      <div class="panel" style="margin-top:14px"><h2>${ico('descarga')}Actualizaciones</h2>
        <div class="fila"><div class="texto"><b>MAX ${h(info.version ?? '')}</b><span>${estado.update?.estado === 'lista' ? `La versión ${h(estado.update.version)} está lista para instalar` : 'MAX mira si hay versión nueva al abrirse y cada 30 minutos'}</span></div>${estado.update?.estado === 'lista' ? `<button class="boton primario mini" type="button" data-accion="instalarUpdate">Reiniciar y actualizar</button>` : `<button class="boton mini" type="button" data-accion="buscarUpdate">Buscar ahora</button>`}</div>
      </div>
      <div class="panel" style="margin-top:14px"><h2>Diseño de la interfaz</h2><div class="disenos">
        ${[['orbita', 'Órbita', 'Barra de iconos estrecha y más espacio para el contenido'], ['clasico', 'Clásico', 'Menú lateral con los nombres de cada página']].map(([id, t, d]) => `<button class="diseno-op${(estado.ajustes.diseno ?? 'orbita') === id ? ' activo' : ''}" type="button" data-accion="diseno" data-diseno="${id}"><span class="mini-ui ${id}"><i></i><i></i></span><b>${t}</b><span>${d}</span></button>`).join('')}
      </div></div>
      <div class="panel" style="margin-top:14px" id="paginas"><h2>Páginas del menú</h2><p class="suave" style="margin-top:-4px">Esconde las que no uses. Siempre puedes llegar a ellas con Ctrl + K.</p><div class="paginas-op">
        ${MENU.flatMap((g) => g.items).filter(([id]) => !FIJAS.includes(id)).map(([id, n]) => `<button class="chip${(estado.ajustes.ocultas ?? []).includes(id) ? '' : ' activo'}" type="button" data-accion="ocultar" data-id="${id}">${ico(id)}${n}</button>`).join('')}
      </div></div></div>`;
  },
};

// ---------- Páginas de cuenta (taquilla, STW) y gráficos ----------
async function cargarPerfil(id, forzar) {
  if (!id) return null;
  if (!forzar && estado.perfiles[id]) return estado.perfiles[id];
  try {
    estado.perfiles[id] = await max.perfil.resumen(id, forzar);
    if (estado.perfiles[id]) estado.tengo = null;
  } catch (e) {
    estado.perfiles[id] = { error: e.message };
  }
  return estado.perfiles[id];
}
async function cargarServidores() {
  estado.servidores = await max.publico.servidores().catch(() => null);
  pintarBarra();
  return estado.servidores;
}
function pintarServidores(s) {
  const el = $('#panelServidores');
  if (!el) return;
  if (!s) {
    el.innerHTML = '<p class="tenue" style="margin:0">No se pudo comprobar ahora mismo.</p>';
    return;
  }
  el.innerHTML = `<div class="servidores grande ${s.estado}">${ico('servidor')}${s.estado === 'operational' ? 'Todo funciona con normalidad' : h(s.texto)}</div>
    ${s.servicios.filter((x) => x.estado !== 'operational').map((x) => `<div class="tenue" style="font-size:12.5px;margin-top:6px">${h(x.nombre)}: ${h(x.texto)}</div>`).join('')}`;
}

// Selector de cuenta dentro de una página (si hay varias)
function cuentaVista() {
  return estado.cuentas.find((c) => c.accountId === estado.verCuenta) ?? principal();
}
function selectorCuentas() {
  if (estado.cuentas.length < 2) return '';
  const actual = cuentaVista();
  return `<div class="filtros">${estado.cuentas.map((c) => `<button class="chip${c.accountId === actual?.accountId ? ' activo' : ''}" type="button" data-accion="verCuenta" data-id="${c.accountId}">${h(c.nombre)}</button>`).join(' ')}</div>`;
}
function sinCuenta(c, titulo, texto) {
  c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>${titulo}</h1></div></div><div class="vacio">${ico('cuentas')}<h2>Añade una cuenta</h2><p>${texto}</p><button class="boton primario" type="button" data-accion="login">${ico('mas')}Añadir cuenta</button></div></div>`;
}
async function paginaCuenta(c, titulo, desc, cuerpo) {
  const cu = cuentaVista();
  if (!cu) return sinCuenta(c, titulo, 'Inicia sesión con Epic Games y MAX te enseñará estos datos de tu cuenta.');
  c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>${titulo}</h1><p>${desc}</p></div>
    <div class="acciones"><button class="boton" type="button" data-accion="recargarPerfil" data-id="${cu.accountId}">${ico('recargar')}Actualizar</button></div></div>
    ${selectorCuentas()}<div id="cuerpoPerfil">${esqueleto('datos')}</div></div>`;
  const r = await cargarPerfil(cu.accountId);
  const el = $('#cuerpoPerfil');
  if (!el) return;
  if (!r || r.error) {
    el.innerHTML = `<div class="error-caja">No se pudo leer la cuenta${r?.error ? `: ${h(r.error)}` : ''}. Si la sesión ha caducado, vuelve a entrar desde Cuentas.</div>`;
    return;
  }
  cuerpo(el, r, cu);
}

PAGINAS.taquilla = (c) =>
  paginaCuenta(c, 'Taquilla y pavos', 'Tus pavos, tu nivel y todo lo que tienes. Solo lectura: MAX nunca compra ni cambia nada.', (el, r) => {
    const tipos = ['Todo', ...Object.keys(r.recuento)];
    let filtro = { tipo: 'Trajes', texto: '' };
    if (!r.recuento.Trajes) filtro.tipo = 'Todo';
    const deseos = estado.ajustes.deseos ?? [];
    el.innerHTML = `
      <div class="rejilla datos4">
        <div class="panel dato"><div class="suave">Pavos</div><div class="cifra oro"><i class="moneda grande"></i>${fmt(r.pavos)}</div><div class="tenue">comprados, ganados y regalados</div></div>
        <div class="panel dato"><div class="suave">Nivel de la temporada</div><div class="cifra">${fmt(r.nivel)}</div><div class="tenue">${r.pase.temporada ? `Temporada ${r.pase.temporada}` : '&nbsp;'}</div></div>
        <div class="panel dato"><div class="suave">Pase de batalla</div><div class="cifra">${r.pase.comprado ? 'Comprado' : 'Gratis'}</div><div class="tenue">${r.pase.comprado ? 'Tienes el pase de esta temporada' : 'No tienes el pase de pago'}</div></div>
        <div class="panel dato"><div class="suave">Objetos en la taquilla</div><div class="cifra">${fmt(r.cosmeticos.length)}</div><div class="tenue">${fmt(r.recuento.Trajes ?? 0)} trajes</div></div>
      </div>
      ${deseos.length ? `<div class="panel" style="margin-top:14px"><h2>${ico('corazon')} Mi lista de deseos</h2><p class="suave" style="margin-top:-4px">Te aviso cuando salgan en la tienda.</p><div class="deseos">${deseos.map((d) => `<div class="deseo">${d.imagen ? `<img src="${h(d.imagen)}" alt="">` : ''}<span>${h(d.nombre)}</span></div>`).join('')}</div></div>` : ''}
      <div class="filtros" style="margin-top:22px"><input class="campo" id="buscarTaquilla" placeholder="Buscar por código (ej. cid_028)…"><span id="chipsTaquilla"></span></div>
      <div id="rejillaTaquilla"></div>`;
    const pintar = () => {
      $('#chipsTaquilla').innerHTML = tipos.map((t) => `<button class="chip${filtro.tipo === t ? ' activo' : ''}" type="button" data-tipot="${t}">${t}${t !== 'Todo' ? ` <span class="tenue">${r.recuento[t]}</span>` : ''}</button>`).join(' ');
      const lista = r.cosmeticos.filter((x) => (filtro.tipo === 'Todo' || x.tipo === filtro.tipo) && x.id.includes(filtro.texto)).sort((a, b) => b.favorito - a.favorito);
      const limite = 400;
      $('#rejillaTaquilla').innerHTML = `<div class="cosmeticos">${lista.slice(0, limite).map((x) => `<div class="cosmetico${x.favorito ? ' fav' : ''}" title="${h(x.id)}"><img src="${h(x.imagen)}" alt="" loading="lazy" data-sin>${x.favorito ? ico('estrella') : ''}${x.nuevo ? '<i class="nuevo"></i>' : ''}</div>`).join('')}</div>${lista.length > limite ? `<p class="tenue">Y ${fmt(lista.length - limite)} más. Usa el buscador o los filtros.</p>` : ''}`;
    };
    pintar();
    $('#chipsTaquilla').addEventListener('click', (e) => {
      const b = e.target.closest('[data-tipot]');
      if (b) ((filtro.tipo = b.dataset.tipot), pintar());
    });
    $('#buscarTaquilla').addEventListener('input', (e) => ((filtro.texto = e.target.value.trim().toLowerCase()), pintar()));
  });

const RECURSOS_ES = {
  campaign_event_currency: 'Tickets de evento',
  eventcurrency_scaling: 'Oro',
  currency_xrayllama: 'Tickets de llama X-Ray',
  voucher_basicpack: 'Llamas de mejora',
  voucher_cardpack_bronze: 'Llamas mini',
  heroxp: 'Experiencia de héroe',
  personnelxp: 'Experiencia de superviviente',
  schematicxp: 'Experiencia de esquema',
  phoenixxp: 'Experiencia de Venture',
  reagent_c_t01: 'Manual de entrenamiento',
  reagent_c_t02: 'Manual de entrenamiento avanzado',
  reagent_c_t03: 'Manual de entrenamiento experto',
  reagent_c_t04: 'Manual de entrenamiento maestro',
  reagent_people: 'Manuales de entrenamiento',
  reagent_weapons: 'Manuales de armas',
  reagent_traps: 'Manuales de trampas',
  reagent_alteration_upgrade_uc: 'Mejora de alteración',
  reagent_evolverarity_r: 'Gota de lluvia pura',
  reagent_evolverarity_vr: 'Relámpago en una botella',
  reagent_evolverarity_sr: 'Ojo de tormenta',
};
PAGINAS.perfil = (c) =>
  paginaCuenta(c, 'Perfil de Salvar el Mundo', 'Tu progreso en Salvar el Mundo de un vistazo.', (el, r) => {
    if (!r.stw) {
      el.innerHTML = `<div class="vacio">${ico('perfil')}<h2>Esta cuenta no tiene Salvar el Mundo</h2><p>Si lo compras o te lo regalan, aquí verás tu nivel de comandante, tu colección y tus recursos.</p></div>`;
      return;
    }
    const s = r.stw;
    el.innerHTML = `
      <div class="rejilla datos4">
        <div class="panel dato"><div class="suave">Nivel de comandante</div><div class="cifra" style="color:var(--cian)">${fmt(s.nivel)}</div><div class="tenue">sube jugando misiones</div></div>
        <div class="panel dato"><div class="suave">Días conectado</div><div class="cifra">${fmt(s.dias)}</div><div class="tenue">recompensa diaria</div></div>
        <div class="panel dato"><div class="suave">Libro de colección</div><div class="cifra">${fmt(s.coleccion)}</div><div class="tenue">nivel máximo alcanzado</div></div>
        <div class="panel dato"><div class="suave">Investigación</div><div class="cifra">${fmt(s.investigacion)}</div><div class="tenue">niveles en total</div></div>
      </div>
      <div class="rejilla" style="grid-template-columns:1fr 1.3fr;margin-top:14px">
        <div class="panel"><h2>Tu equipo</h2>${[['Héroes', s.heroes], ['Esquemas', s.esquemas], ['Supervivientes', s.supervivientes], ['Defensores', s.defensores]].map(([n, v]) => `<div class="fila"><div class="texto"><b>${n}</b></div><span class="cifra-mini">${fmt(v)}</span></div>`).join('')}</div>
        <div class="panel"><h2>Recursos</h2>${s.recursos.length ? s.recursos.slice(0, 12).map((x) => `<div class="fila"><div class="texto"><b>${h(RECURSOS_ES[x.id] ?? x.id.replace(/_/g, ' '))}</b></div><span class="cifra-mini">${fmt(x.cantidad)}</span></div>`).join('') : '<p class="tenue">Sin recursos guardados.</p>'}</div>
      </div>`;
  });

PAGINAS.graficos = async (c) => {
  c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Gráficos y rendimiento</h1><p>Cambia los ajustes de Fortnite sin entrar al juego. Se aplican la próxima vez que lo abras.</p></div></div><div id="cuerpoGraf">${esqueleto('filas')}</div></div>`;
  let g;
  try {
    g = await max.graficos.leer();
  } catch (e) {
    $('#cuerpoGraf').innerHTML = `<div class="error-caja">${h(e.message)}</div>`;
    return;
  }
  const perfiles = [
    ['competitivo', 'Competitivo', 'Modo rendimiento, FPS sin límite y sin sombras. Lo que usan los pros.', 'alertas'],
    ['equilibrado', 'Equilibrado', 'DirectX 11, 144 FPS y calidad baja. Fluido y se ve bien.', 'graficos'],
    ['calidad', 'Calidad', 'DirectX 12, todo al máximo y 60 FPS con sincronización vertical.', 'estrella'],
    ['patata', 'PC flojo', 'Modo rendimiento, resolución interna al 75 % y todo al mínimo.', 'lanzar'],
  ];
  const sel = (clave, opciones) => `<select class="campo selector" data-graf="${clave}">${opciones.map(([v, t]) => `<option value="${v}"${String(g[clave]) === String(v) ? ' selected' : ''}>${t}</option>`).join('')}</select>`;
  const niveles = [[0, 'Bajo'], [1, 'Medio'], [2, 'Alto'], [3, 'Épico']];
  const resoluciones = [[1280, 720], [1600, 900], [1680, 1050], [1920, 1080], [2560, 1440], [3440, 1440], [3840, 2160]];
  if (!resoluciones.some(([w, hh]) => w === g.ancho && hh === g.alto)) resoluciones.unshift([g.ancho, g.alto]);
  $('#cuerpoGraf').innerHTML = `
    <div class="perfiles">${perfiles.map(([id, t, d, i]) => `<button class="panel perfil-graf" type="button" data-accion="grafPerfil" data-perfil="${id}" data-titulo="${t}">${ico(i)}<b>${t}</b><span>${d}</span></button>`).join('')}</div>
    <div class="panel" style="margin-top:14px"><h2>Ajustes a mano</h2>
      <div class="fila"><div class="texto"><b>Modo de renderizado</b><span>El modo rendimiento da muchos más FPS en PCs normales</span></div>${sel('modo', [['rendimiento', 'Rendimiento'], ['dx11', 'DirectX 11'], ['dx12', 'DirectX 12']])}</div>
      <div class="fila"><div class="texto"><b>Límite de FPS</b><span>Pon el de tu monitor o sin límite</span></div>${sel('fps', [[30, '30'], [60, '60'], [120, '120'], [144, '144'], [165, '165'], [240, '240'], [360, '360'], [0, 'Sin límite']])}</div>
      <div class="fila"><div class="texto"><b>Resolución</b><span>La de tu pantalla suele ser la mejor</span></div><select class="campo selector" data-graf="resolucion">${resoluciones.map(([w, hh]) => `<option value="${w}x${hh}"${w === g.ancho && hh === g.alto ? ' selected' : ''}>${w} × ${hh}</option>`).join('')}</select></div>
      <div class="fila"><div class="texto"><b>Pantalla</b></div>${sel('pantalla', [[0, 'Pantalla completa'], [1, 'Ventana sin bordes'], [2, 'Ventana']])}</div>
      <div class="fila"><div class="texto"><b>Escala de resolución 3D</b><span>Bajarla da FPS pero se ve más borroso</span></div><span class="cifra-mini" id="valorEscala">${Math.round(g.escala)} %</span><input type="range" min="50" max="100" step="5" value="${Math.round(g.escala)}" data-graf="escala" class="deslizador"></div>
      <div class="fila"><div class="texto"><b>Calidad general</b><span>Texturas, efectos, posprocesado y suavizado</span></div>${sel('calidad', niveles)}</div>
      <div class="fila"><div class="texto"><b>Distancia de visión</b><span>Alta o épica para ver a los rivales de lejos</span></div>${sel('distancia', niveles)}</div>
      <div class="fila"><div class="texto"><b>Sombras</b><span>Quitarlas es lo que más FPS da</span></div>${sel('sombras', niveles)}</div>
      <div class="fila"><div class="texto"><b>Sincronización vertical</b><span>Quita el tearing pero añade retraso</span></div><button class="interruptor" type="button" role="switch" aria-checked="${g.vsync}" aria-label="Sincronización vertical" data-graf-sw="vsync"></button></div>
    </div>
    <div class="panel" style="margin-top:14px"><div class="fila"><div class="texto"><b>Copia de seguridad</b><span>${g.hayCopia ? 'MAX guardó tus ajustes originales la primera vez que los cambió.' : 'Se creará sola la primera vez que cambies algo.'}</span><div class="ruta">${h(g.ruta)}</div></div>${g.hayCopia ? `<button class="boton mini" type="button" data-accion="grafRestaurar">${ico('recargar')}Restaurar originales</button>` : ''}</div></div>`;
  const guardar = (cambio) => intentar(() => max.graficos.guardar(cambio), 'Guardado');
  $('#cuerpoGraf').addEventListener('change', (e) => {
    const k = e.target.dataset.graf;
    if (!k) return;
    if (k === 'resolucion') {
      const [ancho, alto] = e.target.value.split('x').map(Number);
      return guardar({ ancho, alto });
    }
    guardar({ [k]: k === 'modo' ? e.target.value : Number(e.target.value) });
  });
  $('#cuerpoGraf').addEventListener('input', (e) => {
    if (e.target.dataset.graf === 'escala') $('#valorEscala').textContent = `${e.target.value} %`;
  });
  $('#cuerpoGraf').addEventListener('click', (e) => {
    const b = e.target.closest('[data-graf-sw]');
    if (!b) return;
    const v = b.getAttribute('aria-checked') !== 'true';
    b.setAttribute('aria-checked', String(v));
    guardar({ [b.dataset.grafSw]: v });
  });
};

// ---------- Páginas nuevas: STW, progreso, regalos, social, checker, automático ----------
const fecha = (f) => (f ? new Date(f).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
// Página que carga datos de una cuenta con una función de max.social
async function paginaSocial(c, titulo, desc, fn, pintar, extra = '') {
  const cu = cuentaVista();
  if (!cu) return sinCuenta(c, titulo, 'Inicia sesión con Epic Games para ver esta página.');
  c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>${titulo}</h1><p>${desc}</p></div><div class="acciones">${extra}<button class="boton" type="button" data-accion="recargarPagina">${ico('recargar')}Actualizar</button></div></div>
    ${selectorCuentas()}<div id="cuerpoSocial">${esqueleto('datos')}</div></div>`;
  try {
    const r = await fn(cu.accountId);
    if ($('#cuerpoSocial')) pintar($('#cuerpoSocial'), r, cu);
  } catch (e) {
    if ($('#cuerpoSocial')) $('#cuerpoSocial').innerHTML = `<div class="error-caja">No se pudo cargar: ${h(e.message)}. Si la sesión ha caducado, vuelve a entrar desde Cuentas.</div>`;
  }
}

PAGINAS.tiendastw = (c) =>
  paginaSocial(c, 'Tienda de Salvar el Mundo', 'Llamas y tiendas de evento de hoy. Para comprar, entra al juego: MAX solo te enseña lo que hay.', (id) => max.social.tiendaSTW(id), (el, secciones) => {
    if (!secciones.length) return void (el.innerHTML = `<div class="vacio">${ico('tiendastw')}<h2>Nada a la venta</h2><p>Esta cuenta no tiene tiendas de Salvar el Mundo ahora mismo.</p></div>`);
    el.innerHTML = secciones
      .map((s) => `<section class="seccion-tienda"><h2>${h(s.nombre)}</h2><div class="lista-llamas">${s.objetos
        .map((o) => `<div class="panel llama"><div class="llama-icono">${ico('tiendastw')}</div><div class="texto"><b>${h(o.nombre)}</b><span class="tenue">${o.limite ? `Límite: ${o.limite}` : 'Sin límite'}</span></div><div class="precio-llama">${fmt(o.precio)} <small>${h(o.moneda)}</small></div></div>`)
        .join('')}</div></section>`)
      .join('');
  });

PAGINAS.progreso = (c) =>
  paginaSocial(c, 'Pavos y XP', 'De dónde vienen tus pavos, tus últimas compras y tu progreso por temporada.', (id) => max.social.progreso(id), (el, r) => {
    const maxPavos = Math.max(1, ...r.pavos.map((p) => p.cantidad));
    el.innerHTML = `
      <div class="rejilla datos4">
        <div class="panel dato"><div class="suave">Pavos totales</div><div class="cifra oro" id="cPavos">0</div><div class="tenue">${r.plataforma ? `Plataforma: ${h(r.plataforma)}` : '&nbsp;'}</div></div>
        <div class="panel dato"><div class="suave">Nivel de temporada</div><div class="cifra" id="cNivel">0</div><div class="tenue">${fmt(r.xp.xp)} XP en este nivel</div></div>
        <div class="panel dato"><div class="suave">Nivel de cuenta</div><div class="cifra" id="cCuenta">0</div><div class="tenue">sumando todas las temporadas</div></div>
        <div class="panel dato"><div class="suave">Victorias</div><div class="cifra" id="cVict">0</div><div class="tenue">en toda la vida de la cuenta</div></div>
      </div>
      <div class="rejilla" style="grid-template-columns:1fr 1fr;margin-top:14px">
        <div class="panel"><h2>De dónde vienen tus pavos</h2>${r.pavos.length ? r.pavos.map((p) => `<div class="barra-dato"><div class="texto"><b>${h(p.origen)}</b><span>${fmt(p.cantidad)}</span></div><div class="barra-progreso"><i style="width:${(p.cantidad / maxPavos) * 100}%"></i></div></div>`).join('') : '<p class="tenue">No hay pavos en esta cuenta.</p>'}</div>
        <div class="panel"><h2>Últimas compras</h2>${r.compras.length ? r.compras.map((x) => `<div class="fila"><div class="texto"><b>${fmt(x.gastado)} pavos</b><span>${x.objetos} objeto(s)</span></div><span class="tenue">${fecha(x.fecha)}</span></div>`).join('') : '<p class="tenue">Sin compras registradas.</p>'}</div>
      </div>
      ${r.temporadas.length ? `<div class="panel" style="margin-top:14px"><h2>Temporadas anteriores</h2><div class="temporadas">${r.temporadas.map((t) => `<div class="temporada"><span class="tenue">T${t.temporada}</span><b>${t.nivel}</b><small>${t.victorias} victorias${t.comprado ? ' · pase' : ''}</small></div>`).join('')}</div></div>` : ''}`;
    contar($('#cPavos'), r.total);
    contar($('#cNivel'), r.xp.nivel);
    contar($('#cCuenta'), r.xp.nivelCuenta);
    contar($('#cVict'), r.xp.victorias);
  });

PAGINAS.regalos = (c) =>
  paginaSocial(c, 'Regalos', 'Los regalos que te han hecho y que aún no has abierto en el juego.', (id) => max.social.regalos(id), (el, r) => {
    el.innerHTML = `<div class="rejilla" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">
        <div class="panel dato"><div class="suave">Sin abrir</div><div class="cifra">${r.recibidos.length}</div></div>
        <div class="panel dato"><div class="suave">Recibidos en total</div><div class="cifra">${fmt(r.recibidosTotal)}</div></div>
        <div class="panel dato"><div class="suave">Enviados</div><div class="cifra">${fmt(r.enviados)}</div></div></div>
      ${r.recibidos.length ? r.recibidos.map((g) => `<div class="panel regalo"><div class="regalo-cab">${ico('regalos')}<div class="texto"><b>De ${h(g.de)}</b><span class="tenue">${fecha(g.fecha)}</span></div></div>${g.mensaje ? `<p class="regalo-msg">“${h(g.mensaje)}”</p>` : ''}<div class="cosmeticos">${g.objetos.map((o) => `<div class="cosmetico" title="${h(o.id)}"><img src="${h(o.imagen)}" alt="" data-sin></div>`).join('')}</div></div>`).join('') : `<div class="vacio">${ico('regalos')}<h2>No hay regalos sin abrir</h2><p>Cuando un amigo te regale algo, aparecerá aquí antes incluso de que abras Fortnite.</p></div>`}`;
  });

PAGINAS.amigos = (c) =>
  paginaSocial(c, 'Amigos', 'Tu lista de amigos de Epic y las solicitudes pendientes.', (id) => max.social.amigos(id), (el, r) => {
    let q = '';
    const fila = (a) => `<div class="amigo">${avatarHtml({ nombre: a.nombre })}<div class="texto"><b>${h(a.nombre)}</b>${a.favorito ? ' <span class="etiqueta">Favorito</span>' : ''}<span class="tenue">${a.desde ? `Amigos desde ${fecha(a.desde)}` : ''}</span></div></div>`;
    const pintar = () => {
      const l = r.amigos.filter((a) => a.nombre.toLowerCase().includes(q));
      $('#listaAmigos').innerHTML = l.map(fila).join('') || '<p class="tenue">Nadie con ese nombre.</p>';
    };
    el.innerHTML = `<div class="rejilla" style="grid-template-columns:repeat(4,1fr);margin-bottom:14px">
        <div class="panel dato"><div class="suave">Amigos</div><div class="cifra" id="cAmigos">0</div></div>
        <div class="panel dato"><div class="suave">Solicitudes recibidas</div><div class="cifra">${r.recibidas.length}</div></div>
        <div class="panel dato"><div class="suave">Solicitudes enviadas</div><div class="cifra">${r.enviadas.length}</div></div>
        <div class="panel dato"><div class="suave">Bloqueados</div><div class="cifra">${r.bloqueados}</div></div></div>
      ${r.recibidas.length ? `<div class="panel" style="margin-bottom:14px"><h2>Te quieren agregar</h2><div class="amigos">${r.recibidas.map(fila).join('')}</div><p class="tenue" style="margin:10px 0 0">Acéptalas desde Fortnite o la app de Epic.</p></div>` : ''}
      <div class="filtros"><input class="campo" id="buscarAmigo" placeholder="Buscar amigo…"></div>
      <div class="amigos" id="listaAmigos"></div>`;
    contar($('#cAmigos'), r.amigos.length);
    pintar();
    $('#buscarAmigo').addEventListener('input', (e) => ((q = e.target.value.trim().toLowerCase()), pintar()));
  });

PAGINAS.grupo = (c) =>
  paginaSocial(c, 'Grupo', 'Quién está en tu grupo ahora mismo y con qué traje.', (id) => max.social.grupo(id), (el, r) => {
    if (!r.enGrupo) return void (el.innerHTML = `<div class="vacio">${ico('grupo')}<h2>No estás en ningún grupo</h2><p>Abre Fortnite y aquí verás a tu grupo en directo.${r.invitaciones ? ` Tienes ${r.invitaciones} invitación(es) pendiente(s).` : ''}</p><button class="boton primario" type="button" data-accion="jugar">${ico('play')}Jugar</button></div>`);
    el.innerHTML = `<div class="grupo-cab"><span class="etiqueta">${r.miembros.length}/${r.max}</span><span class="tenue">${r.privacidad === 'OPEN' ? 'Grupo público' : r.privacidad === 'INVITE_AND_FORMER' ? 'Solo invitación' : 'Grupo privado'}</span></div>
      <div class="miembros">${r.miembros.map((m) => `<div class="miembro${m.lider ? ' lider' : ''}"><div class="miembro-foto"><span>${h(m.nombre[0]?.toUpperCase() ?? '?')}</span>${m.imagen ? `<img src="${h(m.imagen)}" alt="" data-quitar>` : ''}</div><b>${h(m.nombre)}</b><span class="tenue">${m.lider ? 'Líder' : 'Miembro'}${m.yo ? ' · tú' : ''}</span></div>`).join('')}</div>`;
  });

PAGINAS.checker = (c) =>
  paginaSocial(c, 'Checker de cuenta', 'Revisa la seguridad y el estado de tu cuenta. Los datos sensibles salen ocultos.', (id) => max.social.checker(id), (el, r) => {
    const ok = (v, si, no) => `<span class="estado-check ${v ? 'bien' : 'mal'}">${v ? ico('check') : '!'}${v ? si : no}</span>`;
    el.innerHTML = `<div class="rejilla" style="grid-template-columns:1.2fr 1fr">
      <div class="panel"><h2>Seguridad</h2>
        <div class="fila"><div class="texto"><b>Verificación en dos pasos</b><span>Protege la cuenta si alguien consigue tu contraseña</span></div>${ok(r.dosPasos, 'Activada', 'Desactivada')}</div>
        <div class="fila"><div class="texto"><b>Correo verificado</b><span>${h(r.email ?? 'Oculto')}</span></div>${ok(r.emailVerificado, 'Sí', 'No')}</div>
        <div class="fila"><div class="texto"><b>Estado de la cuenta</b><span>Restricciones de Epic</span></div>${ok(!r.bloqueos, 'Sin restricciones', 'Con restricciones')}</div>
        ${r.dosPasos ? '' : `<button class="boton primario" type="button" data-accion="abrirEpic2fa" style="margin-top:10px">${ico('candado')}Activar 2FA en Epic</button>`}
      </div>
      <div class="panel"><h2>Datos</h2>
        <div class="fila"><div class="texto"><b>Nombre</b></div><span>${h(r.nombre)}</span></div>
        <div class="fila"><div class="texto"><b>País</b></div><span>${h(r.pais ?? '—')}</span></div>
        <div class="fila"><div class="texto"><b>Último acceso</b></div><span>${fecha(r.ultimoAcceso)}</span></div>
        <div class="fila"><div class="texto"><b>Cambios de nombre</b></div><span>${r.cambiosNombre}${r.puedeCambiarNombre ? ' · puedes cambiarlo' : ''}</span></div>
        <div class="fila"><div class="texto"><b>Salvar el Mundo</b></div><span>${r.tieneSTW ? 'Lo tiene' : 'No'}</span></div>
        <div class="fila"><div class="texto"><b>Reembolsos disponibles</b></div><span>${r.reembolsos ?? '—'}</span></div>
        <div class="fila"><div class="texto"><b>Regalos sin abrir</b></div><span>${r.regalosPendientes}</span></div>
      </div></div>
      <div class="panel" style="margin-top:14px"><h2>Plataformas vinculadas</h2><div class="plataformas">${r.plataformas.length ? r.plataformas.map((p) => `<span class="plataforma"><b>${h(p.tipo)}</b>${p.nombre ? ` ${h(p.nombre)}` : ''}</span>`).join('') : '<span class="tenue">Ninguna</span>'}</div></div>`;
  });

PAGINAS.automatico = async (c) => {
  estado.ajustes = (await max.ajustes.leer().catch(() => null)) ?? estado.ajustes;
  const sw = (k, t, d) => `<div class="fila"><div class="texto"><b>${t}</b><span>${d}</span></div><button class="interruptor" type="button" role="switch" aria-checked="${Boolean(estado.ajustes[k])}" aria-label="${t}" data-accion="interruptor" data-clave="${k}"></button></div>`;
  c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Sistemas automáticos</h1><p>Lo que MAX hace por ti en segundo plano. Nada de esto se salta las reglas de Epic: es lo mismo que harías tú a mano.</p></div></div>
    <div class="panel"><h2>${ico('regalos')} Recompensas</h2>${sw('autoDiaria', 'Recoger la recompensa diaria de Salvar el Mundo', 'Cada día, en todas tus cuentas que tengan STW')}
      <div class="fila"><div class="texto"><b>Recoger ahora</b><span>En todas las cuentas a la vez</span></div><button class="boton mini" type="button" data-accion="diaria">${ico('regalos')}Recoger</button></div></div>
    <div class="panel" style="margin-top:14px"><h2>${ico('campana')} Avisos</h2>${sw('avisoPavos', 'Misiones de pavos', 'Notificación cuando hay pavos en las alertas')}${sw('avisoDeseos', 'Lista de deseos', 'Notificación cuando sale en la tienda algo que marcaste')}</div>
    <div class="panel" style="margin-top:14px" id="atajos"><h2>${ico('teclado')} Atajos de teclado</h2>${sw('atajos', 'Activar atajos globales', 'Funcionan aunque MAX esté escondido en la bandeja')}
      ${[['Ctrl + Alt + J', 'Abrir Fortnite con la cuenta principal'], ['Ctrl + Alt + K', 'Cerrar Fortnite'], ['Ctrl + Alt + M', 'Mostrar MAX'], ['Ctrl + K', 'Buscar una página (dentro de MAX)']].map(([k, d]) => `<div class="fila"><div class="texto"><b>${d}</b></div><kbd class="tecla">${k}</kbd></div>`).join('')}</div></div>`;
  if (!estado.ajustes.pasos?.atajos) max.ajustes.guardar({ pasos: { ...(estado.ajustes.pasos ?? {}), atajos: true } }).catch(() => null);
};

// Secciones "Próximamente" que pone el equipo desde MAX Panel, en el grupo y la posición que elijan
const ICONOS_PRONTO = ['estrella', 'cohete', 'trofeo', 'calendario', 'chat', 'regalos', 'mapa', 'tienda', 'grupo', 'graficos', 'alertas', 'perfil', 'bot', 'cosmeticos'];
function proximas() {
  return (estado.remoto?.proximamente ?? [])
    .filter((x) => x && typeof x.nombre === 'string' && /^[a-z0-9-]{1,30}$/.test(x.id ?? ''))
    .slice(0, 12);
}
function menuConProximamente() {
  const grupos = MENU.map((g) => ({ titulo: g.titulo, items: g.items.map((x) => [...x]) }));
  for (const x of proximas()) {
    const item = [`pronto-${x.id}`, x.nombre.slice(0, 30), true, ICONOS_PRONTO.includes(x.icono) ? x.icono : 'estrella'];
    let g = grupos.find((gr) => (gr.titulo ?? 'Inicio') === x.grupo);
    if (!g) {
      g = { titulo: String(x.grupo || 'Próximamente').slice(0, 30), items: [] };
      grupos.splice(grupos.length - 1, 0, g);
    }
    const i = g.items.findIndex(([id]) => id === x.despues);
    if (x.despues === '__inicio') g.items.unshift(item);
    else if (i >= 0) g.items.splice(i + 1, 0, item);
    else g.items.push(item);
  }
  return grupos;
}
function paginaProxima(c, id) {
  const x = proximas().find((p) => `pronto-${p.id}` === id);
  if (!x) return ir('inicio');
  const puntos = String(x.texto ?? '').split('\n').map((l) => l.replace(/^[-•]\s*/, '').trim()).filter(Boolean);
  const intro = puntos.length > 1 ? '' : puntos[0] ?? '';
  c.innerHTML = `<div class="pagina pronto-pagina"><div class="icono-grande">${ico(ICONOS_PRONTO.includes(x.icono) ? x.icono : 'estrella')}</div>
    <h1>${h(x.nombre)}</h1><p>${h(intro || 'Estamos preparando esta sección. Llegará en una próxima actualización de MAX.')}</p>
    ${puntos.length > 1 ? `<ul>${puntos.map((l) => `<li>${h(l)}</li>`).join('')}</ul>` : ''}
    ${x.fecha ? `<div class="pronto-fecha">${ico('calendario')}Llega: ${h(x.fecha)}</div>` : ''}</div>`;
}

const PRONTO = {
  bot: ['bot', 'Panel del bot', 'Lo de MAX Panel, dentro de esta app (solo para admins).', ['Estado del bot y mantenimiento', 'Anuncios a todos los servidores', 'Estadísticas y registros']],
};
for (const [id, [icono, titulo, texto, lista]] of Object.entries(PRONTO)) {
  PAGINAS[id] = (c) => {
    c.innerHTML = `<div class="pagina pronto-pagina"><div class="icono-grande">${ico(icono)}</div><h1>${titulo}</h1><p>${texto} Llega en la próxima actualización de MAX.</p><ul>${lista.map((x) => `<li>${x}</li>`).join('')}</ul></div>`;
  };
}

let repintarTienda = () => {};
const esDeseo = (i) => (estado.ajustes.deseos ?? []).some((d) => d.nombre === i.nombre || (d.id && i.ids?.includes(d.id)));
const loTengo = (i) => Boolean(estado.tengo && i.ids?.length && i.ids.every((id) => estado.tengo.has(id)));
async function alternarDeseo(nombre) {
  const t = estado.tienda;
  const i = t?.secciones.flatMap((s) => s.items).find((x) => x.nombre === nombre);
  const lista = estado.ajustes.deseos ?? [];
  const ya = lista.some((d) => d.nombre === nombre);
  const nueva = ya ? lista.filter((d) => d.nombre !== nombre) : [...lista, { nombre, id: i?.ids?.[0] ?? null, imagen: i?.imagen ?? null }];
  await intentar(() => max.ajustes.guardar({ deseos: nueva }), ya ? `${nombre} quitado de tu lista` : `${nombre} añadido a tu lista. Te avisaré cuando vuelva.`);
  estado.ajustes.deseos = nueva;
}

function objeto(i) {
  const fondo = i.colores.length ? `background:linear-gradient(160deg, ${i.colores[0]}, ${i.colores[1] ?? i.colores[0]} 60%, ${i.colores[2] ?? '#120f1e'})` : '';
  return `<article class="objeto" style="${fondo}" title="${h(i.nombre)}" data-accion="ficha" data-nombre="${h(i.nombre)}" tabindex="0">
    ${i.imagen ? `<img src="${h(i.imagen)}" alt="" loading="lazy">` : ''}
    ${loTengo(i) ? '<span class="banner tengo">Ya lo tienes</span>' : i.banner ? `<span class="banner">${h(i.banner)}</span>` : ''}
    <button class="corazon${esDeseo(i) ? ' activo' : ''}" type="button" data-accion="deseo" data-nombre="${h(i.nombre)}" aria-label="Lista de deseos" title="${esDeseo(i) ? 'Quitar de mi lista' : 'Avisarme cuando vuelva'}">${ico('corazon')}</button>
    <div class="pie-obj"><div class="tipo-obj">${h(i.tipo)}</div><div class="nombre-obj">${h(i.nombre)}</div>
    <div class="precio"><i class="moneda"></i>${fmt(i.precio)}${i.antes ? ` <s>${fmt(i.antes)}</s>` : ''}</div></div></article>`;
}

function pintarCuentas() {
  const cont = $('#listaCuentas');
  if (!cont) return;
  if (!estado.cuentas.length) {
    cont.innerHTML = `<div class="vacio">${ico('cuentas')}<h2>Todavía no hay cuentas</h2><p>Inicia sesión con Epic Games y podrás abrir Fortnite con un clic, sin volver a escribir la contraseña.</p><button class="boton primario" type="button" data-accion="login">${ico('mas')}Añadir cuenta</button></div>`;
    return;
  }
  cont.innerHTML = `<div class="lista-cuentas">${estado.cuentas
    .map(
      (x) => `<div class="panel cuenta">${avatarHtml(x)}<div class="info"><b>${h(x.nombre)}</b> ${x.principal ? '<span class="etiqueta">Principal</span>' : ''} ${x.estado === 'caducada' ? '<span class="etiqueta mala">Sesión caducada</span>' : ''}<div class="meta">ID ${h(x.accountId)}</div></div>
      ${x.estado === 'caducada' ? `<button class="boton mini" type="button" data-accion="login">Volver a entrar</button>` : `<button class="boton mini primario" type="button" data-accion="jugar" data-id="${x.accountId}">${ico('play')}Jugar</button>`}
      ${x.principal ? '' : `<button class="boton mini icono" type="button" title="Hacer principal" aria-label="Hacer principal" data-accion="principal" data-id="${x.accountId}">${ico('estrella')}</button>`}
      <button class="boton mini icono peligro" type="button" title="Quitar cuenta" aria-label="Quitar cuenta" data-accion="borrar" data-id="${x.accountId}">${ico('basura')}</button></div>`,
    )
    .join('')}</div>`;
}

function saludo() {
  const hr = new Date().getHours();
  return hr < 6 ? 'Buenas noches' : hr < 14 ? 'Buenos días' : hr < 21 ? 'Buenas tardes' : 'Buenas noches';
}
function pasos() {
  const lista = [
    [estado.cuentas.length > 0, 'Añade tu cuenta de Epic', 'Para abrir Fortnite sin contraseña', 'login', 'Añadir'],
    [estado.juego.instalado, 'Fortnite encontrado', 'MAX sabe dónde está instalado', 'irLanzar', 'Revisar'],
    [Boolean(estado.ajustes.pasos?.discord), 'Únete al servidor de Discord', 'Avisos de pavos y tienda diaria', 'discordPaso', 'Abrir'],
    [Boolean(estado.ajustes.pasos?.atajos), 'Prueba los atajos de teclado', 'Ctrl+Alt+J abre Fortnite desde cualquier sitio', 'irAtajos', 'Ver'],
    [Boolean(estado.ajustes.pasos?.paginas), 'Personaliza tu menú', 'Esconde las páginas que no uses', 'irPaginas', 'Elegir'],
  ];
  return lista
    .map(([hecho, t, d, accion, boton]) => `<li><span class="check${hecho ? ' hecho' : ''}">${hecho ? ico('check') : ''}</span><div class="texto"><b>${t}</b><span class="tenue">${d}</span></div>${hecho ? '' : `<button class="boton mini" type="button" data-accion="${accion}">${boton}</button>`}</li>`)
    .join('');
}

async function cargarAlertas(forzar) {
  if (estado.alertas && !forzar) return estado.alertas;
  estado.alertas = await max.publico.alertas().catch(() => null);
  return estado.alertas;
}
async function cargarTienda() {
  if (estado.tienda) return estado.tienda;
  estado.tienda = await max.publico.tienda().catch(() => null);
  return estado.tienda;
}

// ---------- Buscador (Ctrl+K) ----------
const ACCIONES = [
  ['Jugar con la cuenta principal', 'jugar'],
  ['Añadir cuenta de Epic', 'login'],
  ['Cerrar Fortnite', 'cerrarJuego'],
];
let seleccion = 0;
function abrirBuscador() {
  $('#buscador').hidden = false;
  $('#buscadorTexto').value = '';
  seleccion = 0;
  filtrarBuscador();
  $('#buscadorTexto').focus();
}
function resultados() {
  const q = $('#buscadorTexto').value.trim().toLowerCase();
  const pags = Object.entries(NOMBRES).map(([id, n]) => ({ texto: n, tipo: 'Página', ir: id }));
  const acc = ACCIONES.map(([t, a]) => ({ texto: t, tipo: 'Acción', accion: a }));
  return [...pags, ...acc].filter((x) => x.texto.toLowerCase().includes(q));
}
function filtrarBuscador() {
  const r = resultados();
  seleccion = Math.min(seleccion, Math.max(0, r.length - 1));
  $('#buscadorLista').innerHTML = r.map((x, i) => `<li class="${i === seleccion ? 'sel' : ''}" data-i="${i}">${ico(x.ir ?? 'lanzar')}${h(x.texto)}<small>${x.tipo}</small></li>`).join('') || '<li>Sin resultados</li>';
}
function elegirBuscador(i) {
  const x = resultados()[i];
  $('#buscador').hidden = true;
  if (!x) return;
  if (x.ir) ir(x.ir);
  else accion(x.accion);
}

// ---------- Eventos ----------
async function accion(a, el) {
  const id = el?.dataset.id;
  switch (a) {
    case 'jugar':
      return jugar(id);
    case 'cerrarJuego':
      await intentar(() => max.fortnite.cerrar(), 'Fortnite cerrado');
      return setTimeout(refrescarJuego, 1500);
    case 'login':
      return abrirLogin();
    case 'cancelarLogin':
      max.cuentas.cancelar().catch(() => null);
      return cerrarModal();
    case 'abrirEnlace':
      return max.abrir(el.dataset.url);
    case 'abrirWebEpic':
      return max.abrir(el.dataset.url);
    case 'principal':
      await intentar(() => max.cuentas.principal(id), 'Cuenta principal cambiada');
      await cargarCuentas();
      pintarBarra();
      return pintarCuentas();
    case 'borrar': {
      const c = estado.cuentas.find((x) => x.accountId === id);
      if (!confirm(`¿Quitar la cuenta ${c?.nombre} de este PC? Podrás volver a añadirla cuando quieras.`)) return;
      await intentar(() => max.cuentas.borrar(id), 'Cuenta quitada');
      await cargarCuentas();
      pintarBarra();
      return pintarCuentas();
    }
    case 'comprobar': {
      const r = await intentar(() => max.cuentas.comprobar());
      if (r) {
        estado.cuentas = r;
        const malas = r.filter((x) => x.estado === 'caducada').length;
        aviso(malas ? `${malas} cuenta(s) necesitan volver a entrar` : 'Todas las cuentas funcionan', malas ? 'mal' : 'bien');
        pintarBarra();
        pintarCuentas();
      }
      return;
    }
    case 'elegirCarpeta': {
      const r = await intentar(() => max.fortnite.elegirCarpeta());
      if (r) {
        aviso('Carpeta de Fortnite guardada');
        ir('lanzar');
      }
      return;
    }
    case 'descargarMax':
      return estado.remoto?.url_descarga ? max.abrir(estado.remoto.url_descarga) : aviso('Todavía no hay enlace de descarga. Mira el Discord de MAX.', 'mal');
    case 'reintentarRemoto': {
      el.disabled = true;
      const r = await max.remoto.estado(true).catch(() => null);
      aplicarRemoto(r);
      if (r && !$('#pantallaRemota').hidden) aviso('Sigue igual. Prueba en un rato.', 'mal');
      return;
    }
    case 'cerrarAnuncio': {
      const vistos = anunciosCerrados();
      vistos.add(Number(el.dataset.id));
      try {
        localStorage.setItem('maxAnunciosCerrados', JSON.stringify([...vistos].slice(-60)));
      } catch {
        /* sin almacenamiento: se cierra solo hasta reiniciar */
      }
      estado.anunciosCerradosMem = vistos;
      el.closest('.anuncio-max')?.remove();
      return;
    }
    case 'compartirEpic': {
      const v = el.dataset.valor === 'si';
      estado.ajustes.compartirEpic = v;
      cerrarModal();
      await intentar(() => max.ajustes.guardar({ compartirEpic: v }), v ? 'Gracias. Puedes cambiarlo en Ajustes.' : 'Vale, no se comparte nada.');
      if (estado.pagina === 'ajustes') ir('ajustes');
      return;
    }
    case 'tema':
      estado.ajustes.tema = el.dataset.tema;
      aplicarTema();
      document.querySelectorAll('.tema').forEach((t) => t.classList.toggle('activo', t === el));
      return intentar(() => max.ajustes.guardar({ tema: el.dataset.tema }));
    case 'limpiar': {
      const ids = [...document.querySelectorAll('[data-zona]:checked')].map((x) => x.dataset.zona);
      if (!ids.length) return aviso('Marca al menos una cosa para limpiar.', 'mal');
      const r = await intentar(() => max.limpieza.limpiar(ids));
      if (r) {
        aviso(`Listo: ${tamanoBonito(r.liberado)} liberados`);
        celebrar();
        ir('limpieza');
      }
      return;
    }
    case 'abrirAjustesUpdate': {
      ir('ajustes');
      setTimeout(() => desplazarA('[data-accion="buscarUpdate"]'), 250);
      return;
    }
    case 'buscarUpdate': {
      el.disabled = true;
      const r = await intentar(() => max.update.descargar());
      el.disabled = false;
      if (r?.estado === 'aldia') aviso('Tienes la última versión de MAX.');
      return;
    }
    case 'instalarUpdate':
      return intentar(() => max.update.instalar());
    case 'cerrarUpdate':
      $('#tarjetaUpdate').innerHTML = '';
      estado.updateCerrada = true;
      return;
    case 'ficha':
      return abrirFicha(el.dataset.nombre);
    case 'fichaCosmetico':
      return abrirFichaCosmetico(el.dataset.id);
    case 'cerrarModal':
      return cerrarModal();
    case 'noticia':
      return mostrarNoticia(Number(el.dataset.i));
    case 'diaria': {
      aviso('Recogiendo la recompensa diaria…');
      const r = await intentar(() => max.social.diaria());
      if (!r) return;
      const nuevas = r.filter((x) => !x.error && !x.yaReclamada).length;
      const conSTW = r.filter((x) => !x.error).length;
      estado.diaria = { ok: conSTW, total: r.length };
      if (nuevas && el) {
        const r0 = el.getBoundingClientRect();
        celebrar(r0.left + r0.width / 2, r0.top);
      }
      aviso(nuevas ? `Recogida en ${nuevas} cuenta(s)` : conSTW ? 'Ya estaba recogida en todas las cuentas' : 'Ninguna cuenta tiene Salvar el Mundo', nuevas || conSTW ? 'bien' : 'mal');
      if (estado.pagina === 'inicio') ir('inicio');
      return;
    }
    case 'buscador':
      return abrirBuscador();
    case 'irAtajos':
      ir('automatico');
      return setTimeout(() => desplazarA('#atajos'), 150);
    case 'irPaginas':
      max.ajustes.guardar({ pasos: { ...(estado.ajustes.pasos ?? {}), paginas: true } }).catch(() => null);
      estado.ajustes.pasos = { ...(estado.ajustes.pasos ?? {}), paginas: true };
      ir('ajustes');
      return setTimeout(() => desplazarA('#paginas'), 200);
    case 'ocultar': {
      const lista = new Set(estado.ajustes.ocultas ?? []);
      lista.has(id) ? lista.delete(id) : lista.add(id);
      estado.ajustes.ocultas = [...lista];
      el.classList.toggle('activo', !lista.has(id));
      await intentar(() => max.ajustes.guardar({ ocultas: estado.ajustes.ocultas }));
      return pintarMenu();
    }
    case 'diseno':
      estado.ajustes.diseno = el.dataset.diseno;
      await intentar(() => max.ajustes.guardar({ diseno: estado.ajustes.diseno }), `Diseño ${el.dataset.diseno === 'orbita' ? 'Órbita' : 'Clásico'} activado`);
      return ir('ajustes');
    case 'recargarPagina':
      return ir(estado.pagina);
    case 'abrirEpic2fa':
      return max.abrir('https://www.epicgames.com/account/password');
    case 'deseo':
      await alternarDeseo(el.dataset.nombre);
      if (!$('#modal').hidden && $('#modalCaja').classList.contains('modal-grande')) abrirFicha(el.dataset.nombre);
      return repintarTienda();
    case 'interruptor': {
      const k = el.dataset.clave;
      const v = el.getAttribute('aria-checked') !== 'true';
      el.setAttribute('aria-checked', String(v));
      estado.ajustes[k] = v;
      if (k === 'modoJuego') refrescarJuego();
      return intentar(() => max.ajustes.guardar({ [k]: v }), k === 'compartirEpic' ? (v ? 'Gracias: se comparte tu nombre de Epic.' : 'Dejado de compartir y borrado del servidor.') : undefined);
    }
    case 'recargarPerfil':
      return cargarPerfil(el.dataset.id, true).then(() => ir(estado.pagina));
    case 'verCuenta':
      estado.verCuenta = id;
      return ir(estado.pagina);
    case 'grafPerfil': {
      const r = await intentar(() => max.graficos.perfil(el.dataset.perfil), `Perfil ${el.dataset.titulo} aplicado. Se nota la próxima vez que abras Fortnite.`);
      if (r) ir('graficos');
      return;
    }
    case 'grafRestaurar': {
      if (!confirm('¿Volver a los gráficos que tenías antes de usar MAX?')) return;
      const r = await intentar(() => max.graficos.restaurar(), 'Gráficos restaurados');
      if (r) ir('graficos');
      return;
    }
    case 'recargarAlertas':
      estado.alertas = null;
      return ir('alertas');
    case 'irLanzar':
      return ir('lanzar');
    case 'discord':
      return max.abrir(DISCORD);
    case 'discordPaso':
      max.abrir(DISCORD);
      await max.ajustes.guardar({ pasos: { ...(estado.ajustes.pasos ?? {}), discord: true } }).catch(() => null);
      estado.ajustes.pasos = { ...(estado.ajustes.pasos ?? {}), discord: true };
      return estado.pagina === 'inicio' && ir('inicio');
  }
}

document.addEventListener('pointerdown', (e) => {
  if (e.target.closest('button')) sonido('clic');
});
document.addEventListener('click', (e) => {
  const v = e.target.closest('[data-ventana]');
  if (v) return max.ventana(v.dataset.ventana);
  if (e.target.closest('#botonCuenta')) {
    estado.desplegable = !estado.desplegable;
    return pintarBarra();
  }
  const cu = e.target.closest('[data-cuenta]');
  if (cu) {
    estado.desplegable = false;
    return accion('principal', { dataset: { id: cu.dataset.cuenta } });
  }
  const a = e.target.closest('[data-accion]');
  if (a) {
    if (estado.desplegable && !a.closest('.desplegable')) estado.desplegable = false;
    return accion(a.dataset.accion, a);
  }
  const p = e.target.closest('[data-ir]');
  if (p) return ir(p.dataset.ir);
  if (estado.desplegable && !e.target.closest('.selector-cuenta')) {
    estado.desplegable = false;
    pintarBarra();
  }
  if (e.target.id === 'buscador') $('#buscador').hidden = true;
  if (e.target.id === 'modal' && $('#modalCaja').classList.contains('modal-grande')) cerrarModal();
  const li = e.target.closest('#buscadorLista li[data-i]');
  if (li) elegirBuscador(Number(li.dataset.i));
});
$('#abrirBuscador').addEventListener('click', abrirBuscador);
// Imágenes que no cargan (la CSP no deja usar onerror en el HTML)
document.addEventListener(
  'error',
  (e) => {
    const img = e.target;
    if (img.tagName !== 'IMG') return;
    if ('quitar' in img.dataset) img.remove();
    else if (img.dataset.respaldo && img.src !== img.dataset.respaldo) img.src = img.dataset.respaldo;
    else if ('sin' in img.dataset) img.parentNode.classList.add('sin');
    else if ('respaldo' in img.dataset) img.remove();
  },
  true,
);
$('#buscadorTexto').addEventListener('input', () => {
  seleccion = 0;
  filtrarBuscador();
});
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches?.('[tabindex][data-accion]')) {
    e.preventDefault();
    return e.target.click();
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    return abrirBuscador();
  }
  if (!$('#buscador').hidden) {
    if (e.key === 'Escape') $('#buscador').hidden = true;
    if (e.key === 'ArrowDown') (seleccion++, filtrarBuscador());
    if (e.key === 'ArrowUp') (seleccion = Math.max(0, seleccion - 1), filtrarBuscador());
    if (e.key === 'Enter') elegirBuscador(seleccion);
  } else if (e.key === 'Escape' && !$('#modal').hidden) {
    if ($('#modalCaja').classList.contains('modal-grande')) return cerrarModal();
    accion('cancelarLogin');
  }
});

max.cuentas.alNueva(async ({ nombre, preguntarCompartir }) => {
  cerrarModal();
  aviso(`Cuenta ${nombre} añadida`);
  celebrar();
  await cargarCuentas();
  ir(estado.pagina);
  if (preguntarCompartir) preguntarCompartirEpic();
});
// Permiso claro antes de compartir nada: la persona elige y puede cambiarlo cuando quiera en Ajustes
function preguntarCompartirEpic() {
  const caja = $('#modalCaja');
  caja.className = 'modal';
  caja.innerHTML = `<h2>¿Compartir tu nombre de Epic con MAX?</h2>
    <p>Nos ayuda a darte soporte si algo falla y a frenar a quien abuse del launcher. Tú decides.</p>
    <div class="privacidad">
      <div>${ico('check')}<span><b>Solo se comparte</b> tu nombre de usuario de Epic y su número público.</span></div>
      <div class="no">${ico('candado')}<span><b>Nunca</b> tu contraseña, tu correo ni la llave de tu cuenta: esas no salen de este PC.</span></div>
      <div>${ico('ajustes')}<span>Puedes dejar de compartirlo en Ajustes cuando quieras y <b>se borra al momento</b>.</span></div>
    </div>
    <div class="pie"><button class="boton" type="button" data-accion="compartirEpic" data-valor="no">No, gracias</button><button class="boton primario" type="button" data-accion="compartirEpic" data-valor="si">Compartir</button></div>`;
  $('#modal').hidden = false;
}
max.alIr?.((p) => ir(p));
max.cuentas.alError((m) => {
  cerrarModal();
  aviso(m, 'mal');
});

// ---------- Arranque ----------
(async () => {
  await cargarCuentas();
  estado.ajustes = (await max.ajustes.leer().catch(() => ({}))) ?? {};
  aplicarTema();
  await refrescarJuego();
  ir('inicio');
  max.update?.estado().then(pintarUpdate).catch(() => null);
  max.update?.alCambiar(pintarUpdate);
  setInterval(refrescarJuego, 15000);
  cargarServidores();
  setInterval(cargarServidores, 3 * 60 * 1000);
  // Comprobar en segundo plano que las sesiones siguen valiendo
  max.cuentas.comprobar().then((r) => {
    estado.cuentas = r;
    pintarBarra();
    if (estado.pagina === 'cuentas') pintarCuentas();
  }).catch(() => null);
})();

// ---------- Mando (Gamepad): MAX se puede usar entero con un mando de Xbox o PlayStation ----------
// Cruceta/stick: moverse · A/✕: aceptar · B/○: volver o cerrar · LB/RB: página anterior/siguiente · Start: Jugar
(() => {
  let activo = false;
  let previo = [];
  let ultimoMov = 0;
  const enfocables = () => [...document.querySelectorAll('#modal:not([hidden]) button, #buscador:not([hidden]) li, .lateral .enlace-menu, .barra button, .contenido button, .contenido input, .contenido select, .contenido [data-ir]')].filter((el) => el.offsetParent !== null && !el.disabled);
  function mover(dir) {
    const lista = enfocables();
    if (!lista.length) return;
    const actual = document.activeElement;
    let i = lista.indexOf(actual);
    if (i < 0) i = dir > 0 ? -1 : 0;
    const sig = lista[(i + dir + lista.length) % lista.length];
    sig.focus({ preventScroll: true });
    // Desplazar solo el contenido para que el elemento quede a la vista
    const c = $('#contenido');
    if (c.contains(sig)) {
      const r = sig.getBoundingClientRect();
      const rc = c.getBoundingClientRect();
      if (r.top < rc.top + 20) c.scrollTop -= rc.top + 20 - r.top;
      else if (r.bottom > rc.bottom - 20) c.scrollTop += r.bottom - rc.bottom + 20;
    }
    document.body.classList.add('con-mando');
    sonido('clic');
  }
  function paginaRelativa(dir) {
    const ids = [...document.querySelectorAll('#menu .enlace-menu')].map((b) => b.dataset.ir);
    const i = ids.indexOf(estado.pagina);
    ir(ids[(i + dir + ids.length) % ids.length]);
  }
  const ACCIONES = {
    0: () => document.activeElement?.click(), // A
    1: () => (!$('#modal').hidden ? accion('cancelarLogin') : !$('#buscador').hidden ? ($('#buscador').hidden = true) : ir('inicio')), // B
    4: () => paginaRelativa(-1), // LB
    5: () => paginaRelativa(1), // RB
    9: () => accion('jugar'), // Start
    12: () => mover(-1),
    13: () => mover(1),
    14: () => mover(-1),
    15: () => mover(1),
  };
  function bucle() {
    const pad = [...(navigator.getGamepads?.() ?? [])].find(Boolean);
    if (!pad) return void (activo = false);
    pad.buttons.forEach((b, i) => {
      if (b.pressed && !previo[i] && ACCIONES[i]) ACCIONES[i]();
      previo[i] = b.pressed;
    });
    const y = pad.axes[1] ?? 0;
    if (Math.abs(y) > 0.6 && performance.now() - ultimoMov > 180) {
      ultimoMov = performance.now();
      mover(y > 0 ? 1 : -1);
    }
    requestAnimationFrame(bucle);
  }
  addEventListener('gamepadconnected', (e) => {
    aviso(`Mando conectado: ${e.gamepad.id.replace(/\(.*\)/, '').trim() || 'mando'}. A para aceptar, B para volver, LB/RB para cambiar de página.`);
    if (!activo) ((activo = true), requestAnimationFrame(bucle));
  });
  addEventListener('gamepaddisconnected', () => aviso('Mando desconectado', 'mal'));
  addEventListener('pointermove', () => document.body.classList.remove('con-mando'), { passive: true });
})();

// ---------- Noticias (carrusel del inicio) ----------
let noticiasLista = [];
let noticiaActual = 0;
let relojNoticias = null;
function pintarNoticias(lista) {
  const el = $('#noticias');
  if (!el || !lista?.length) return;
  noticiasLista = lista.slice(0, 6);
  el.hidden = false;
  el.innerHTML = `<div class="noticias-pista">${noticiasLista.map((n, i) => `<article class="noticia${i === 0 ? ' activa' : ''}" style="--img:url(&quot;${h((n.imagen ?? '').replace(/["\\]/g, ''))}&quot;)"><div class="noticia-texto">${n.etiqueta ? `<span class="etiqueta">${h(n.etiqueta)}</span>` : ''}<h2>${h(n.titulo)}</h2><p>${h(n.texto)}</p></div></article>`).join('')}</div>
    <div class="noticias-puntos">${noticiasLista.map((_, i) => `<button type="button" class="${i === 0 ? 'activo' : ''}" data-accion="noticia" data-i="${i}" aria-label="Noticia ${i + 1}"><i></i></button>`).join('')}</div>`;
  noticiaActual = 0;
  clearInterval(relojNoticias);
  relojNoticias = setInterval(() => {
    if (!$('#noticias')) return clearInterval(relojNoticias);
    if (!$('#noticias').matches(':hover')) mostrarNoticia((noticiaActual + 1) % noticiasLista.length);
  }, 7000);
}
function mostrarNoticia(i) {
  noticiaActual = i;
  document.querySelectorAll('.noticia').forEach((n, k) => n.classList.toggle('activa', k === i));
  document.querySelectorAll('.noticias-puntos button').forEach((b, k) => b.classList.toggle('activo', k === i));
}

// ---------- Ficha de un objeto ----------
function tiempoRestante(fecha) {
  if (!fecha) return null;
  const ms = new Date(fecha) - Date.now();
  if (ms <= 0) return 'Se va en el próximo reinicio';
  const d = Math.floor(ms / 8.64e7);
  const hh = Math.floor((ms % 8.64e7) / 3.6e6);
  return d ? `Se va en ${d} d ${hh} h` : `Se va en ${hh} h ${Math.floor((ms % 3.6e6) / 6e4)} min`;
}
const haceDias = (f) => {
  const d = Math.floor((Date.now() - new Date(f)) / 8.64e7);
  return d <= 0 ? 'hoy' : d === 1 ? 'ayer' : `hace ${fmt(d)} días`;
};
function fichaHtml(o, extra = '') {
  const c = o.colores?.length ? o.colores : ['#2a2b35', '#16171d'];
  return `<div class="ficha" style="--c1:${h(c[0])};--c2:${h(c[1] ?? c[0])}">
    <div class="ficha-imagen">${o.imagen ? `<img src="${h(o.imagen)}" alt="" data-quitar>` : ''}<i class="ficha-brillo"></i></div>
    <div class="ficha-info">
      <span class="ficha-tipo">${h(o.tipo)}${o.rareza ? ` · ${h(o.rareza)}` : ''}</span>
      <h2>${h(o.nombre)}</h2>
      ${o.descripcion ? `<p class="suave">${h(o.descripcion)}</p>` : ''}
      ${extra}
      <div id="fichaHistorial"></div>
      <div class="pie"><button class="boton" type="button" data-accion="cerrarModal">Cerrar</button></div>
    </div></div>`;
}
function abrirModalGrande(html) {
  const caja = $('#modalCaja');
  caja.className = 'modal modal-grande';
  caja.innerHTML = html;
  $('#modal').hidden = false;
}
function pintarHistorial(hist, tienda) {
  const el = $('#fichaHistorial');
  if (!el) return;
  if (!hist?.length) return void (el.innerHTML = tienda ? '<p class="tenue">Es la primera vez que sale en la tienda.</p>' : '<p class="tenue">Nunca ha salido en la tienda (puede ser del pase o de un evento).</p>');
  const ultima = hist.find((f) => new Date(f) < new Date(Date.now() - 8.64e7)) ?? hist[hist.length - 1];
  const huecos = [];
  for (let k = 0; k < Math.min(hist.length - 1, 12); k++) huecos.push((new Date(hist[k]) - new Date(hist[k + 1])) / 8.64e7);
  const media = huecos.length ? Math.round(huecos.reduce((a, b) => a + b, 0) / huecos.length) : null;
  el.innerHTML = `<div class="ficha-datos">
      <div><b>${fmt(hist.length)}</b><span>veces en la tienda</span></div>
      <div><b>${tienda ? haceDias(ultima) : haceDias(hist[0])}</b><span>${tienda ? 'la vez anterior' : 'la última vez'}</span></div>
      ${media ? `<div><b>~${fmt(media)} días</b><span>suele tardar en volver</span></div>` : ''}
    </div>
    <div class="ficha-linea">${hist.slice(0, 24).reverse().map((f) => `<i title="${fecha(f)}"></i>`).join('')}</div>`;
}
async function abrirFicha(nombre) {
  const i = estado.tienda?.secciones.flatMap((s) => s.items).find((x) => x.nombre === nombre);
  if (!i) return;
  const resto = tiempoRestante(i.sale);
  abrirModalGrande(
    fichaHtml(
      { ...i, colores: i.colores },
      `<div class="ficha-precio"><i class="moneda grande"></i>${fmt(i.precio)}${i.antes ? ` <s>${fmt(i.antes)}</s>` : ''}</div>
      ${resto ? `<div class="ficha-reloj">${ico('reloj')}${resto}</div>` : ''}
      ${loTengo(i) ? '<div class="estado-check bien">' + ico('check') + 'Ya lo tienes</div>' : ''}
      ${i.incluye?.length ? `<p class="tenue">Incluye: ${i.incluye.map(h).join(', ')}</p>` : ''}
      <button class="boton ${esDeseo(i) ? '' : 'primario'}" type="button" data-accion="deseo" data-nombre="${h(i.nombre)}">${ico('corazon')}${esDeseo(i) ? 'Quitar de mi lista' : 'Avisarme cuando vuelva'}</button>`,
    ),
  );
  if (i.ids?.[0]) max.publico.cosmetico(i.ids[0]).then((d) => pintarHistorial(d.historial, true)).catch(() => pintarHistorial(null, true));
}
async function abrirFichaCosmetico(id) {
  abrirModalGrande(`<div class="cargando"><i class="giro"></i>Cargando…</div>`);
  try {
    const o = await max.publico.cosmetico(id);
    abrirModalGrande(fichaHtml(o, `${o.introducido ? `<p class="tenue">${h(o.introducido)}${o.set ? ` · ${h(o.set)}` : ''}</p>` : ''}${estado.tengo?.has(o.id) ? '<div class="estado-check bien">' + ico('check') + 'Ya lo tienes</div>' : ''}`));
    pintarHistorial(o.historial, false);
  } catch (e) {
    abrirModalGrande(`<h2>No se pudo cargar</h2><p class="suave">${h(e.message)}</p><div class="pie"><button class="boton" type="button" data-accion="cerrarModal">Cerrar</button></div>`);
  }
}

// ---------- Buscador de cosméticos ----------
PAGINAS.cosmeticos = async (c) => {
  c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Buscador de cosméticos</h1><p>Busca cualquier traje, gesto o pico de Fortnite: cuántas veces ha salido, cuándo fue la última y cada cuánto suele volver.</p></div></div>
    <div class="buscador-grande">${ico('cosmeticos')}<input id="textoCosm" placeholder="Escribe un nombre: Renegada, Peely, Galaxia…" autocomplete="off"></div>
    <h2 class="subtitulo" id="tituloCosm">Novedades de esta actualización</h2><div id="cuerpoCosm">${esqueleto('tienda').replace('<div class="esq-titulo esq"></div>', '')}</div></div>`;
  const pintar = (lista) => {
    const el = $('#cuerpoCosm');
    if (!el) return;
    el.innerHTML = lista.length
      ? `<div class="cosmeticos grandes">${lista.map((o) => `<button class="cosmetico-carta r-${h(o.rarezaId || 'comun')}" type="button" data-accion="fichaCosmetico" data-id="${h(o.id)}" title="${h(o.nombre)}"><img src="${h(o.icono ?? '')}" alt="" loading="lazy" data-sin>${estado.tengo?.has(o.id) ? '<i class="tengo-punto" title="Ya lo tienes"></i>' : ''}<span>${h(o.nombre)}</span><small>${h(o.tipo)}${o.historial.length ? ` · ${haceDias(o.historial[0])}` : ''}</small></button>`).join('')}</div>`
      : `<div class="vacio">${ico('cosmeticos')}<h2>Nada con ese nombre</h2><p>Prueba con otra palabra o con parte del nombre.</p></div>`;
  };
  max.publico.novedades().then((n) => !$('#textoCosm')?.value && pintar(n.objetos)).catch(() => ($('#cuerpoCosm') ? ($('#cuerpoCosm').innerHTML = '<div class="error-caja">No se pudieron cargar las novedades.</div>') : null));
  let t;
  $('#textoCosm').addEventListener('input', (e) => {
    clearTimeout(t);
    const q = e.target.value.trim();
    t = setTimeout(async () => {
      if (q.length < 2) return;
      $('#tituloCosm').textContent = `Resultados para «${q}»`;
      $('#cuerpoCosm').innerHTML = esqueleto('tienda').replace('<div class="esq-titulo esq"></div>', '');
      pintar(await max.publico.buscar(q).catch(() => []));
    }, 350);
  });
  $('#textoCosm').focus();
};

// ---------- Mapa ----------
PAGINAS.mapa = async (c) => {
  c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Mapa de la temporada</h1><p>El mapa actual con todos sus lugares. Rueda del ratón para acercar, arrastra para moverte.</p></div>
    <div class="acciones"><input class="campo" id="buscarLugar" placeholder="Buscar lugar…" style="min-width:200px"><button class="boton" type="button" id="mapaCentrar">${ico('recargar')}Centrar</button></div></div>
    <div class="mapa" id="mapa"><div class="cargando"><i class="giro"></i>Cargando el mapa…</div></div></div>`;
  let d;
  try {
    d = await max.publico.mapa();
  } catch (e) {
    if ($('#mapa')) $('#mapa').innerHTML = `<div class="error-caja">No se pudo cargar el mapa: ${h(e.message)}</div>`;
    return;
  }
  const caja = $('#mapa');
  if (!caja) return;
  caja.innerHTML = `<div class="mapa-lienzo" id="mapaLienzo"><img src="${h(d.imagen)}" alt="Mapa de Fortnite" draggable="false">${d.lugares.map((l) => `<span class="lugar-mapa${l.grande ? ' grande' : ''}" style="left:${l.x}%;top:${l.y}%"><i></i><b>${h(l.nombre)}</b></span>`).join('')}</div>`;
  const lienzo = $('#mapaLienzo');
  let z = 1, x = 0, y = 0, arr = null;
  const aplicar = () => {
    lienzo.style.transform = `translate(${x}px, ${y}px) scale(${z})`;
    lienzo.style.setProperty('--z', z);
  };
  caja.addEventListener('wheel', (e) => {
    e.preventDefault();
    const r = caja.getBoundingClientRect();
    const mx = e.clientX - r.left - x, my = e.clientY - r.top - y;
    const nz = Math.min(5, Math.max(1, z * (e.deltaY < 0 ? 1.15 : 0.87)));
    x -= mx * (nz / z - 1);
    y -= my * (nz / z - 1);
    z = nz;
    if (z === 1) x = y = 0;
    aplicar();
  }, { passive: false });
  caja.addEventListener('pointerdown', (e) => ((arr = { x: e.clientX - x, y: e.clientY - y }), caja.setPointerCapture(e.pointerId)));
  caja.addEventListener('pointermove', (e) => arr && ((x = e.clientX - arr.x), (y = e.clientY - arr.y), aplicar()));
  caja.addEventListener('pointerup', () => (arr = null));
  $('#mapaCentrar').addEventListener('click', () => ((z = 1), (x = y = 0), aplicar()));
  $('#buscarLugar').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    lienzo.querySelectorAll('.lugar-mapa').forEach((l) => l.classList.toggle('resaltado', q.length > 1 && l.textContent.toLowerCase().includes(q)));
  });
};

// ---------- Intro de arranque ----------
const menosMovimiento = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
(() => {
  const intro = $('#intro');
  if (!intro) return;
  let hecho = false;
  const quitar = () => {
    if (hecho) return;
    hecho = true;
    intro.classList.add('fuera');
    document.body.classList.add('entrando');
    setTimeout(() => {
      intro.remove();
      document.body.classList.remove('entrando');
      estado.introFuera = true;
      mostrarSiguienteFlotante();
    }, 700);
  };
  // Con "menos animaciones" en Windows sale una versión tranquila: aparece y se desvanece, sin movimiento
  if (menosMovimiento()) intro.classList.add('tranquila');
  intro.addEventListener('click', quitar);
  setTimeout(quitar, menosMovimiento() ? 1400 : 2350);
})();

// ---------- Anuncios flotantes (lo que se manda desde MAX Panel) ----------
// Cada anuncio nuevo aparece grande arriba del todo, se queda el tiempo justo para leerlo
// (más largo cuanto más texto tiene, y se para si pasas el ratón por encima) y luego se va.
// Solo sale una vez por anuncio; después sigue en la lista del inicio.
const colaFlotantes = [];
let flotanteActual = null;
function flotantesVistos() {
  try {
    return new Set(JSON.parse(localStorage.getItem('maxFlotantesVistos') ?? '[]'));
  } catch {
    return new Set(estado.flotantesVistosMem ?? []);
  }
}
function marcarFlotanteVisto(clave) {
  const v = flotantesVistos();
  v.add(clave);
  estado.flotantesVistosMem = [...v].slice(-100);
  try {
    localStorage.setItem('maxFlotantesVistos', JSON.stringify(estado.flotantesVistosMem));
  } catch {
    /* sin almacenamiento: se recuerda hasta cerrar la app */
  }
}
function encolarFlotantes(r) {
  const vistos = flotantesVistos();
  const yaEnCola = new Set(colaFlotantes.map((x) => x.clave).concat(flotanteActual ? [flotanteActual.clave] : []));
  const nuevos = [];
  if (r.actualizar && !r.obligatoria && r.version_ultima) {
    nuevos.push({ clave: 'v' + r.version_ultima, tipo: 'actualizar', etiqueta: 'Nueva versión', titulo: `MAX ${r.version_ultima} ya está aquí`, texto: r.notas_version || 'Trae mejoras y arreglos. Se instalará sola al cerrar MAX.' });
  }
  const ETIQ = { info: 'Anuncio', novedad: 'Novedad', aviso: 'Aviso', urgente: 'Urgente' };
  for (const a of [...(r.anuncios ?? [])].sort((x, y) => x.id - y.id)) {
    nuevos.push({ clave: 'a' + a.id, id: a.id, tipo: a.tipo, etiqueta: ETIQ[a.tipo] ?? 'Anuncio', titulo: a.titulo, texto: a.texto, enlace: a.enlace });
  }
  for (const n of nuevos) if (!vistos.has(n.clave) && !yaEnCola.has(n.clave)) colaFlotantes.push(n);
  mostrarSiguienteFlotante();
}
function mostrarSiguienteFlotante() {
  if (flotanteActual || !colaFlotantes.length || !estado.introFuera) return;
  if (!$('#pantallaRemota')?.hidden) return; // en mantenimiento/bloqueo no se tapa la pantalla
  const a = (flotanteActual = colaFlotantes.shift());
  marcarFlotanteVisto(a.clave);
  const ICO = { info: 'i', novedad: '✦', aviso: '!', urgente: '!', actualizar: '↑' };
  // Tiempo para leerlo con calma: unos 4 s + lo que se tarda en leer el texto (entre 8 y 25 s)
  const letras = (a.titulo + ' ' + a.texto).length;
  let restante = Math.min(25000, Math.max(8000, 4000 + letras * 60));
  const caja = document.createElement('div');
  caja.className = `flotante ${a.tipo}`;
  caja.setAttribute('role', a.tipo === 'urgente' ? 'alert' : 'status');
  caja.style.setProperty('--dura', restante + 'ms');
  caja.innerHTML = `<div class="flotante-ico">${ICO[a.tipo] ?? 'i'}</div>
    <div class="flotante-cuerpo"><div class="flotante-etiqueta">${h(a.etiqueta)} · MAX</div><h2 class="flotante-titulo">${h(a.titulo)}</h2><p class="flotante-texto">${h(a.texto)}</p>
    ${a.enlace || a.tipo === 'actualizar' ? `<div class="flotante-botones">${a.enlace ? `<button class="boton primario mini" type="button" data-accion="abrirEnlace" data-url="${h(a.enlace)}">Abrir</button>` : ''}${a.tipo === 'actualizar' ? '<button class="boton primario mini" type="button" data-accion="abrirAjustesUpdate">Ver la actualización</button>' : ''}</div>` : ''}</div>
    ${colaFlotantes.length ? `<span class="flotante-cola">+${colaFlotantes.length}</span>` : ''}
    <button class="flotante-cerrar" type="button" aria-label="Cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
    <div class="flotante-tiempo"><i></i></div>`;
  $('#flotantes').append(caja);
  sonido('aviso');
  let inicio = Date.now();
  let reloj = setTimeout(cerrar, restante);
  caja.addEventListener('mouseenter', () => {
    clearTimeout(reloj);
    restante -= Date.now() - inicio;
  });
  caja.addEventListener('mouseleave', () => {
    inicio = Date.now();
    reloj = setTimeout(cerrar, Math.max(1500, restante));
  });
  caja.querySelector('.flotante-cerrar').addEventListener('click', cerrar);
  caja.addEventListener('click', (e) => {
    if (e.target.closest('[data-accion]')) setTimeout(cerrar, 150);
  });
  function cerrar() {
    if (caja.classList.contains('sale')) return;
    clearTimeout(reloj);
    caja.classList.add('sale');
    setTimeout(
      () => {
        caja.remove();
        flotanteActual = null;
        setTimeout(mostrarSiguienteFlotante, 400);
      },
      menosMovimiento() ? 0 : 450,
    );
  }
}

// ---------- Telón (fondo de toda la app) y tema ----------
function ponerTelon(url) {
  const t = $('#telon');
  if (!t || !url) return;
  const img = new Image();
  img.onload = () => {
    t.style.setProperty('--imagen-telon', `url("${url.replace(/["\\]/g, '')}")`);
    t.classList.add('listo');
  };
  img.src = url;
}
function aplicarTema() {
  document.body.dataset.tema = estado.ajustes.tema ?? 'cian';
}

// ---------- Control desde MAX Panel ----------
function funcionesApagadas() {
  const f = estado.remoto?.funciones ?? {};
  return Object.keys(f).filter((k) => f[k] === false);
}
function anunciosCerrados() {
  if (estado.anunciosCerradosMem) return estado.anunciosCerradosMem;
  try {
    return new Set(JSON.parse(localStorage.getItem('maxAnunciosCerrados') ?? '[]'));
  } catch {
    return new Set();
  }
}
function bannersRemotos() {
  const r = estado.remoto;
  if (!r) return '';
  const cerrados = anunciosCerrados();
  const ICO = { info: 'ℹ', novedad: '✦', aviso: '!', urgente: '!' };
  const actualizacion = r.actualizar && !r.obligatoria
    ? `<div class="anuncio-max actualizar"><span class="anuncio-ico">↑</span><div class="texto"><b>MAX ${h(r.version_ultima)} ya está disponible</b><span>${h(r.notas_version ?? 'Nueva versión con mejoras.')}</span></div><button class="boton primario mini" type="button" data-accion="descargarMax">Descargar</button></div>`
    : '';
  const anuncios = (r.anuncios ?? [])
    .filter((a) => !cerrados.has(a.id))
    .map((a) => `<div class="anuncio-max ${h(a.tipo)}"><span class="anuncio-ico">${ICO[a.tipo] ?? 'ℹ'}</span><div class="texto"><b>${h(a.titulo)}</b><span>${h(a.texto)}</span></div>${a.enlace ? `<button class="boton mini" type="button" data-accion="abrirEnlace" data-url="${h(a.enlace)}">Abrir</button>` : ''}<button class="boton icono mini" type="button" aria-label="Cerrar anuncio" data-accion="cerrarAnuncio" data-id="${a.id}">✕</button></div>`)
    .join('');
  return actualizacion || anuncios ? `<div class="anuncios-max">${actualizacion}${anuncios}</div>` : '';
}
function aplicarRemoto(r) {
  if (!r) return;
  const antes = JSON.stringify(funcionesApagadas());
  estado.remoto = r;
  const pantalla = $('#pantallaRemota');
  let html = '';
  if (r.bloqueada) {
    html = `<div class="remota-caja"><div class="remota-ico mal">⛔</div><h1>Este launcher está bloqueado</h1><p>${h(r.motivo || 'El equipo de MAX ha bloqueado esta instalación.')}</p><p class="tenue">Si crees que es un error, escríbenos en el Discord de MAX.</p><div class="remota-botones"><button class="boton" type="button" data-accion="discord">${ico('discord')}Abrir el Discord</button></div></div>`;
  } else if (r.obligatoria) {
    html = `<div class="remota-caja"><div class="remota-ico">↑</div><h1>Actualiza MAX para seguir</h1><p>Tienes la versión ${h(r.version)} y hace falta al menos la ${h(r.version_minima)}.</p>${r.notas_version ? `<div class="remota-notas">${h(r.notas_version)}</div>` : ''}<div class="remota-botones"><button class="boton primario" type="button" data-accion="descargarMax">Descargar MAX ${h(r.version_ultima)}</button><button class="boton" type="button" data-accion="reintentarRemoto">Ya he actualizado</button></div></div>`;
  } else if (!r.activa) {
    html = `<div class="remota-caja"><div class="remota-anillo"><i class="portal-halo"></i><i class="portal-anillo"></i></div><h1>MAX está en mantenimiento</h1><p>${h(r.mensaje || 'Estamos mejorando MAX. Vuelve en un rato.')}</p><div class="remota-botones"><button class="boton primario" type="button" data-accion="reintentarRemoto">${ico('recargar')}Comprobar otra vez</button><button class="boton" type="button" data-accion="discord">${ico('discord')}Discord</button></div></div>`;
  }
  if (html) html = `<div class="remota-controles"><button type="button" aria-label="Minimizar" data-ventana="min"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button><button type="button" aria-label="Cerrar" data-ventana="cerrar" class="cerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>${html}`;
  pantalla.innerHTML = html;
  pantalla.hidden = !html;
  if (JSON.stringify(funcionesApagadas()) !== antes) {
    pintarMenu();
    if (funcionesApagadas().includes(estado.pagina)) ir('inicio');
  }
  if (!html) encolarFlotantes(r);
  if (estado.pagina === 'inicio' && !html) {
    const zona = document.querySelector('.anuncios-max');
    const nuevo = bannersRemotos();
    if (zona) zona.outerHTML = nuevo || '';
    else if (nuevo) $('#noticias')?.insertAdjacentHTML('beforebegin', nuevo);
  }
}
max.remoto?.alCambiar(aplicarRemoto);
max.remoto?.estado().then(aplicarRemoto).catch(() => null);


// ---------- Actualizaciones automáticas ----------
function pintarUpdate(u) {
  if (!u || u.estado === 'nada' || u.estado === 'aldia') return;
  estado.update = u;
  const zona = $('#tarjetaUpdate');
  if (!zona || (estado.updateCerrada && u.estado !== 'lista')) return;
  const titulo = { disponible: `MAX ${h(u.version)} está aquí`, descargando: `Descargando MAX ${h(u.version)}`, lista: `MAX ${h(u.version)} listo para instalar`, error: 'No se pudo descargar la actualización' }[u.estado] ?? '';
  const sub = { disponible: 'Se va a descargar sola', descargando: `${u.progreso ?? 0} %`, lista: 'Se instala al cerrar MAX o ahora mismo', error: h(u.error ?? 'Revisa tu conexión') }[u.estado] ?? '';
  zona.innerHTML = `<div class="tarjeta-update" role="status">
    <div class="cab"><img src="../recursos/icono-256.png" alt=""><div style="flex:1"><b>${titulo}</b><span>${sub}</span></div><button class="boton mini icono" type="button" aria-label="Ocultar" data-accion="cerrarUpdate">✕</button></div>
    ${u.notas ? `<div class="notas">${h(u.notas)}</div>` : '<div style="height:12px"></div>'}
    ${u.estado === 'descargando' || u.estado === 'disponible' ? `<div class="barra-progreso"><i style="width:${u.progreso ?? 0}%"></i></div>` : ''}
    <div class="pie">${u.estado === 'lista' ? `<button class="boton primario" type="button" data-accion="instalarUpdate">${ico('descarga')}Reiniciar y actualizar</button>` : u.estado === 'error' ? `<button class="boton" type="button" data-accion="buscarUpdate">Reintentar</button>` : ''}</div>
  </div>`;
}

// ---------- Limpieza ----------
function tamanoBonito(b) {
  if (b < 1024) return `${b} B`;
  if (b < 1048576) return `${(b / 1024).toFixed(0)} KB`;
  if (b < 1073741824) return `${(b / 1048576).toFixed(1)} MB`;
  return `${(b / 1073741824).toFixed(2)} GB`;
}
PAGINAS.limpieza = async (c) => {
  c.innerHTML = `<div class="pagina"><div class="cabecera"><div><h1>Limpieza de Fortnite</h1><p>Borra registros, informes de fallos y la caché web que Fortnite va acumulando. Nunca toca el juego, tus partidas ni tus ajustes.</p></div></div><div id="cuerpoLimpieza">${esqueleto('filas')}</div></div>`;
  let zonas;
  try {
    zonas = await max.limpieza.analizar();
  } catch (e) {
    $('#cuerpoLimpieza').innerHTML = `<div class="error-caja">${h(e.message)}</div>`;
    return;
  }
  const total = zonas.reduce((n, z) => n + z.bytes, 0);
  $('#cuerpoLimpieza').innerHTML = `<div class="rejilla" style="grid-template-columns:1fr 1.6fr">
      <div class="panel"><h2>${ico('escoba')}Se puede liberar</h2><div class="limpieza-total">${tamanoBonito(total)}</div><p class="tenue">Cierra Fortnite antes de limpiar.</p>
        <button class="boton primario" type="button" data-accion="limpiar" ${total ? '' : 'disabled'}>${ico('escoba')}Limpiar lo marcado</button></div>
      <div class="panel"><h2>Qué se borra</h2>${zonas
        .map((z) => `<label class="fila" style="cursor:pointer"><input type="checkbox" data-zona="${z.id}" ${z.bytes ? 'checked' : 'disabled'} style="accent-color:var(--acento);width:18px;height:18px"><div class="texto"><b>${h(z.nombre)}</b><span>${z.id === 'logs' ? 'Archivos de texto que el juego escribe en cada partida' : z.id === 'crashes' ? 'Informes que se guardan cuando el juego se cierra de golpe' : 'Páginas e imágenes del menú que se vuelven a descargar solas'}</span></div><span class="cifra-mini">${tamanoBonito(z.bytes)}</span></label>`)
        .join('')}</div></div>`;
};
