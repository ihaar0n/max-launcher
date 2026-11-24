// Conexión con MAX Panel: el launcher avisa de que está abierto y recibe lo que decides desde el panel
// (mantenimiento, versión mínima, funciones apagadas, anuncios y bloqueos).
// Solo se envía: un número aleatorio de esta instalación, la versión de MAX y el sistema operativo.
// La clave es la "publicable" de Supabase: es pública por diseño y solo deja llamar a app_conectar().
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

let config = {};
try {
  config = require('../config.json');
} catch {
  /* sin configurar: el launcher funciona igual, sin control remoto */
}

function idInstalacion(archivo) {
  try {
    const d = JSON.parse(fs.readFileSync(archivo, 'utf8'));
    if (/^[0-9a-f-]{36}$/.test(d.id)) return d.id;
  } catch {
    /* primera vez */
  }
  const id = crypto.randomUUID();
  fs.writeFileSync(archivo, JSON.stringify({ id, creado: new Date().toISOString() }));
  return id;
}

async function conectar({ archivoId, version }) {
  const url = (config.supabaseUrl || '').replace(/\/$/, '');
  if (!url || !config.supabaseKey) return null;
  const so = `${os.type() === 'Windows_NT' ? 'Windows' : os.type()} ${os.release().split('.').slice(0, 2).join('.')}`;
  const res = await fetch(`${url}/rest/v1/rpc/app_conectar`, {
    method: 'POST',
    headers: { apikey: config.supabaseKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_id: idInstalacion(archivoId), p_version: version, p_so: so }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Servidor de MAX: ${res.status}`);
  return res.json();
}

// 1.10.0 > 1.9.3
const comparar = (a, b) => {
  const x = String(a).split('.').map(Number);
  const y = String(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) - (y[i] || 0);
  return 0;
};

module.exports = { conectar, comparar };

// Comparte con el panel los nombres de Epic que la persona ha permitido (lista vacía = borrar)
async function sincronizarCuentas({ archivoId, cuentas }) {
  const url = (config.supabaseUrl || '').replace(/\/$/, '');
  if (!url || !config.supabaseKey) return;
  const res = await fetch(`${url}/rest/v1/rpc/app_cuentas_sync`, {
    method: 'POST',
    headers: { apikey: config.supabaseKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_id: idInstalacion(archivoId), p_cuentas: cuentas.slice(0, 10).map((c) => ({ id: c.accountId, nombre: c.nombre })) }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Servidor de MAX: ${res.status}`);
}

module.exports.sincronizarCuentas = sincronizarCuentas;
