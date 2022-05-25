const { app, BrowserWindow, Tray, Menu } = require('electron')
const server = require("./server");

let mainWindow;
// let isQuiting;
let tray;

app.on('before-quit', function () {
    isQuiting = true;
  });

  const template = [
    {
      label: "Edit",
      Submenu: [
        {
          role: 'undo'
       },
       {
          role: 'redo'
       },
       {
          type: 'separator'
       },
       {
          role: 'cut'
       },
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.on('ready', () => {
    tray = new Tray('image.ico');
    tray.setToolTip("Tray to electron app");
    tray.on('click', () => {
        mainWindow.isVisible()?mainWindow.hide():mainWindow.show();
    })
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true;
        // BrowserWindow.closable = true;
        app.quit();
        // e.preventDefault();
        

      }
    }
  ]));

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.webContents.openDevTools()

  mainWindow.loadFile('./dist/demo/index.html')
//   mainWindow.loadFile('http://localhost:3000/testing')


})

// const createWindow = () => {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: true
//     }
//   })

//   // and load the index.html of the app.
//   mainWindow.loadFile('./dist/demo/index.html')

//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', () => {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })