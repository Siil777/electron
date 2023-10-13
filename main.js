const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile(path.join(__dirname, 'DiaryOne.html'));
}

// Register an IPC handler for 'save-entry' channel
ipcMain.on('save-entry', async (event, entryText) => {
    const filePath = path.join(__dirname, 'SavedDiary.txt');
    try {
        await fs.appendFile(filePath, entryText + '\n');
        console.log('Entry saved successfully.');
        event.reply('entry-saved');
    } catch (err) {
        console.error(err);
        dialog.showErrorBox('Error', 'An error occurred while saving the entry.');
    }
});

// Register an IPC handler for 'load-entries' channel
ipcMain.on('load-entries', async (event) => {
    const filePath = path.join(__dirname, 'SavedDiary.txt'); // Update the file path accordingly
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const entries = data.split('\n').filter(entry => entry.trim() !== '');
        event.reply('entries-loaded', entries);
    } catch (err) {
        console.error(err);
        event.reply('entries-loaded', []);
    }
});

app.whenReady().then(createWindow);















