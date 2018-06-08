/* Electron imports */
const electron = require('electron')
const {app, BrowserWindow, Menu, globalShortcut, session} = electron;

const path = require('path')
const url = require('url')

var mainWindow

/* Toggle development mode */
process.env.NODE_ENV = 'development'


/* Create the window */
function createWindow () {

    /* Create the window */
    mainWindow = new BrowserWindow({center: true, icon: './assets/icons/512x512.png', webPreferences: {plugins: true}})
    mainWindow.on('closed', function () {
        mainWindow = null
    })

    /* Load the home page */
    setPage('ui/index.html')

    /* Add a custom menu bar */
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
}

/* Set the page */
function setPage(name) {
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, name),
        protocol: 'file:',
        slashes: true
    }))
}

/* Create the menu bar */
const menuTemplate = [
{
    label: 'File',
    submenu: [
    {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click() {forceQuit()}
    }
    ]
},
{
    label: 'Something Sweat',
    submenu: [
    {
        label: 'Tanner Drew Walton',
        accelerator: 'Alt+W',
        click() {tannerWalton()}
    }
    ]
}
];

function tannerWalton() {
    console.log('e');
}

/* Add developer tools if in development mode*/
if(process.env.NODE_ENV !== 'production') {
    menuTemplate.push({
        label: 'Dev',
        submenu: [
        {
            label:'Toggle Developer Tools',
            accelerator: 'CmdOrCtrl+I',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools()
            }
        },
        {
            role: 'reload'
        }
        ]
    });
}

/* Create the window when ready */
app.on('ready', createWindow)

/* Safely quit on exit */
app.on('window-all-closed', function () {
    forceQuit()
})

/* Quit safely */
function forceQuit() {
    console.log('Quitting safely.')
    globalShortcut.unregisterAll()
    app.quit()
}
