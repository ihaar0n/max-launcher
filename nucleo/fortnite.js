// Fortnite en este PC: dónde está instalado, abrirlo con una cuenta y cerrarlo.
const fs = require('fs');
const path = require('path');
const { spawn, execFile } = require('child_process');

const PROCESOS = ['FortniteClient-Win64-Shipping.exe', 'FortniteClient-Win64-Shipping_EAC_EOS.exe', 'FortniteClient-Win64-Shipping_BE.exe', 'FortniteLauncher.exe', 'EasyAntiCheat_EOS.exe'];

function buscarInstalacion() {
  const dat = path.join(process.env.ProgramData || 'C:\\ProgramData', 'Epic', 'UnrealEngineLauncher', 'LauncherInstalled.dat');
  try {
    const lista = JSON.parse(fs.readFileSync(dat, 'utf8')).InstallationList ?? [];
    const fn = lista.find((x) => x.AppName === 'Fortnite');
    if (fn?.InstallLocation && fs.existsSync(fn.InstallLocation)) return fn.InstallLocation;
  } catch {
    /* no hay Epic Games Launcher o el archivo no existe */
  }
  for (const p of ['C:\\Program Files\\Epic Games\\Fortnite', 'D:\\Epic Games\\Fortnite', 'D:\\Fortnite', 'E:\\Epic Games\\Fortnite']) {
    if (fs.existsSync(path.join(p, 'FortniteGame'))) return p;
  }
  return null;
}

const ejecutable = (carpeta) => path.join(carpeta, 'FortniteGame', 'Binaries', 'Win64', 'FortniteLauncher.exe');

function lanzar(carpeta, { codigo, cuenta, extra = '' }) {
  const exe = ejecutable(carpeta);
  if (!fs.existsSync(exe)) throw new Error('No encuentro FortniteLauncher.exe en esa carpeta.');
  const args = [
    '-AUTH_LOGIN=unused',
    `-AUTH_PASSWORD=${codigo}`,
    '-AUTH_TYPE=exchangecode',
    '-epicapp=Fortnite',
    '-epicenv=Prod',
    '-EpicPortal',
    `-epicusername=${cuenta.nombre}`,
    `-epicuserid=${cuenta.accountId}`,
    '-epiclocale=es-ES',
    ...extra.split(' ').filter(Boolean),
  ];
  const p = spawn(exe, args, { cwd: path.dirname(exe), detached: true, stdio: 'ignore' });
  p.unref();
}

function enMarcha() {
  return new Promise((resolve) => {
    execFile('tasklist', ['/FO', 'CSV', '/NH'], { windowsHide: true }, (err, salida) => {
      if (err) return resolve(false);
      resolve(PROCESOS.slice(0, 3).some((p) => salida.includes(p)));
    });
  });
}

function cerrar() {
  return Promise.all(
    PROCESOS.map(
      (p) => new Promise((r) => execFile('taskkill', ['/F', '/IM', p], { windowsHide: true }, () => r())),
    ),
  );
}

module.exports = { buscarInstalacion, ejecutable, lanzar, enMarcha, cerrar };
