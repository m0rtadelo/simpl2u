/* eslint-disable no-undef */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

ipcMain.handle('get-locale', () => {
  return app.getLocale(); // e.g., "en-US"
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      openDevTools: true,
    }
  });

  win.loadFile('index.html');
  win.autoHideMenuBar = true;
  win.setMenuBarVisibility(false);
  //win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
