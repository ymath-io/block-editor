const { app, BrowserWindow, Menu } = require('electron')

const isMac = process.platform === 'darwin';

const windows = new Set();

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  //win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      /*{
        label: 'New File',
        accelerator:'CommandOrControl+Shift+N',
        click(item, focusedWindow) {
          //const win = require('electron').remote.getCurrentWindow();
          focusedWindow.webContents.executeJavaScript(`makeCourse;`);
          
        }
      },*/
      {
        label: 'Generate Course',
        accelerator:'CommandOrControl+Enter',
        click(item, focusedWindow) {
          focusedWindow.webContents.executeJavaScript(`makeCourse();`);
                      
        }
      },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
      
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        //{ role: 'pasteAndMatchStyle' },
        //{ role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    label: 'Insert',
    submenu: [
      {
        label: 'Text Box',
        accelerator:'CommandOrControl+T',
        click(item, focusedWindow) {
          //const win = require('electron').remote.getCurrentWindow();
          focusedWindow.webContents.executeJavaScript(`addText();`);
          
        }
      },
      {
        label: 'Inline equation',
        accelerator:'CommandOrControl+E',
        click(item, focusedWindow) {
          //const win = require('electron').remote.getCurrentWindow();
          focusedWindow.webContents.executeJavaScript(`addEquation();`);
          
        }
      },
      {
        label: 'Display equation',
        accelerator:'CommandOrControl+D',
        click(item, focusedWindow) {
          //const win = require('electron').remote.getCurrentWindow();
          focusedWindow.webContents.executeJavaScript(`addDisplayEquation();`);
          
        }
      },
      {
        label: 'Line break',
        accelerator:'CommandOrControl+L',
        click(item, focusedWindow) {
          //const win = require('electron').remote.getCurrentWindow();
          focusedWindow.webContents.executeJavaScript(`addBreak();`);
          
        }
      },
      {
        label: 'Practice problem',
        accelerator:'CommandOrControl+P',
        click(item, focusedWindow) {
          //const win = require('electron').remote.getCurrentWindow();
          focusedWindow.webContents.executeJavaScript(`addProblem();`);
          
        }
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);