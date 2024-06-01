const { app, BrowserWindow, screen } = require('electron');

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in renderer process
      zoomFactor: 1 // Set the zoom level to 90%
    },
    resizable: false, // Disable window resizing
    fullscreen: true // Set the window to full-screen mode
  });

  mainWindow.loadURL('http://localhost:3000'); // Load your React app

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
