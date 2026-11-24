// Conexión con Epic Games (igual que hacen los launchers de la comunidad):
//  1. Inicio de sesión con "código de dispositivo": se abre la web oficial de Epic y la persona entra allí.
//     MAX nunca ve ni guarda la contraseña.
//  2. Se crea un "device auth" (llave de este PC) para no tener que volver a entrar. Se guarda CIFRADO.
//  3. Para jugar, se pide un código de un solo uso y se abre Fortnite ya con la sesión iniciada.
const CLIENTES = {
  switch: '98f7e42c2e3a4f86a74eb43fbb41ed39:0a2449a2-001a-451e-afec-3e812901c4d7',
  android: '3f69e56c7649492c8cc29f1af08a8a12:b51ee9cb12234f50a69efa67ef53812e',
  launcher: '34a02cf8f4414e29b15921876da36f9a:daafbccc737745039dffe53d94fc76cf',
};
const CUENTAS_API = 'https://account-public-service-prod.ol.epicgames.com/account/api';

const basic = (c) => `basic ${Buffer.from(CLIENTES[c]).toString('base64')}`;

async function peticion(url, { metodo = 'GET', cabeceras = {}, formulario, json } = {}) {
  const opciones = { method: metodo, headers: { ...cabeceras }, signal: AbortSignal.timeout(20000) };
  if (formulario) {
    opciones.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    opciones.body = new URLSearchParams(formulario).toString();
  } else if (json) {
    opciones.headers['Content-Type'] = 'application/json';
    opciones.body = JSON.stringify(json);
  }
  const res = await fetch(url, opciones);
  const texto = await res.text();
  let datos = null;
  try {
    datos = texto ? JSON.parse(texto) : null;
  } catch {
    datos = texto;
  }
  if (!res.ok) {
    const e = new Error(datos?.errorMessage || `Epic respondió ${res.status}`);
    e.codigo = datos?.errorCode;
    e.estado = res.status;
    throw e;
  }
  return datos;
}

const token = (cliente, formulario) => peticion(`${CUENTAS_API}/oauth/token`, { metodo: 'POST', cabeceras: { Authorization: basic(cliente) }, formulario: { token_type: 'eg1', ...formulario } });
const bearer = (t) => ({ Authorization: `bearer ${t.access_token}` });
const exchange = async (t) => (await peticion(`${CUENTAS_API}/oauth/exchange`, { cabeceras: bearer(t) })).code;

// ---------- Inicio de sesión ----------
async function empezarLogin() {
  const cliente = await token('switch', { grant_type: 'client_credentials' });
  const d = await peticion(`${CUENTAS_API}/oauth/deviceAuthorization`, { metodo: 'POST', cabeceras: bearer(cliente), formulario: { prompt: 'login' } });
  return { codigo: d.user_code, url: d.verification_uri_complete, deviceCode: d.device_code, caduca: Date.now() + d.expires_in * 1000, intervalo: (d.interval || 5) * 1000 };
}

// Espera a que la persona acepte en la web de Epic. Devuelve la cuenta lista para guardar.
async function esperarLogin(deviceCode, caduca, intervalo, cancelado = () => false) {
  while (Date.now() < caduca) {
    if (cancelado()) throw new Error('Cancelado');
    await new Promise((r) => setTimeout(r, intervalo));
    try {
      const sw = await token('switch', { grant_type: 'device_code', device_code: deviceCode });
      return await crearLlave(sw);
    } catch (e) {
      if (/authorization_pending|slow_down/.test(e.codigo ?? '')) continue;
      throw e;
    }
  }
  throw new Error('El código ha caducado. Vuelve a intentarlo.');
}

async function crearLlave(tokenSwitch) {
  const android = await token('android', { grant_type: 'exchange_code', exchange_code: await exchange(tokenSwitch) });
  const da = await peticion(`${CUENTAS_API}/public/account/${android.account_id}/deviceAuth`, { metodo: 'POST', cabeceras: bearer(android) });
  const avatar = await avatarDe(android, android.account_id).catch(() => null);
  return { accountId: android.account_id, nombre: android.displayName, deviceId: da.deviceId, secret: da.secret, avatar, creada: Date.now() };
}

// ---------- Sesiones ----------
async function sesion(cuenta) {
  return token('android', { grant_type: 'device_auth', account_id: cuenta.accountId, device_id: cuenta.deviceId, secret: cuenta.secret });
}

async function avatarDe(t, accountId) {
  const r = await peticion(`https://avatar-service-prod.identity.live.on.epicgames.com/v1/avatar/fortnite/ids?accountIds=${accountId}`, { cabeceras: bearer(t) });
  const id = r?.[0]?.avatarId?.split(':')[1];
  return id ? `https://fortnite-api.com/images/cosmetics/br/${id.toLowerCase()}/smallicon.png` : null;
}

// Comprueba que la llave sigue valiendo y trae nombre y avatar actualizados
async function comprobar(cuenta) {
  const t = await sesion(cuenta);
  const info = await peticion(`${CUENTAS_API}/public/account/${cuenta.accountId}`, { cabeceras: bearer(t) }).catch(() => null);
  const avatar = await avatarDe(t, cuenta.accountId).catch(() => cuenta.avatar);
  return { nombre: info?.displayName ?? cuenta.nombre, avatar };
}

// Código de un solo uso para abrir Fortnite con la sesión iniciada
async function codigoParaJugar(cuenta) {
  const android = await sesion(cuenta);
  const lanzador = await token('launcher', { grant_type: 'exchange_code', exchange_code: await exchange(android) });
  return exchange(lanzador);
}

async function quitarLlave(cuenta) {
  const t = await sesion(cuenta).catch(() => null);
  if (!t) return;
  await peticion(`${CUENTAS_API}/public/account/${cuenta.accountId}/deviceAuth/${cuenta.deviceId}`, { metodo: 'DELETE', cabeceras: bearer(t) }).catch(() => null);
}

module.exports = { empezarLogin, esperarLogin, comprobar, codigoParaJugar, quitarLlave, sesion, peticion, bearer };
