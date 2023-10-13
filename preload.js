const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    saveEntry: async (entryText) => {
        try {
            await ipcRenderer.invoke('save-entry', entryText);
            // Emit a custom event to notify the renderer process that the entry was saved successfully.
            window.dispatchEvent(new Event('entry-saved'));
        } catch (err) {
            console.error(err);
            alert('An error occurred while saving the entry.');
        }
    },
});



















