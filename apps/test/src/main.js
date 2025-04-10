const { app, BrowserWindow } = require('electron');
const path = require('path');
//const MyButton = require('../../framework/components/index');
//import { MyButton } from '../../framework/components/button/my-button';
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, 'renderer.js'),
      openDevTools: true,
    }
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
