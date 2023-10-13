// Handle the click event of the "Save Entry" button
function saveEntry() {
    const entryText = document.getElementById('entry').value;

    if (!entryText) {
        alert('Please enter a diary entry.');
        return;
    }

    // Use the exposed electron.saveEntry function to save the entry
    window.api.send('save-entry', entryText);


    // Display a success message
    alert('Entry saved successfully.');

    // Optionally, clear the textarea after saving
    document.getElementById('entry').value = '';
}

// Send a message to the main process on button click
document.getElementById('save-button').addEventListener('click', () => {
    saveEntry();
});

// Load and display saved entries when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Send a message to the main process to load entries
    window.api.send('load-entries');
});

// Handle the loaded entries
window.api.receive('entries-loaded', (entries) => {
    const entryList = document.getElementById('entry-list');
    entryList.innerHTML = ''; // Clear the existing entries

    // Loop through the loaded entries and create list items with Bootstrap Icons
    entries.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('fa', 'paragraph'); // Add Bootstrap Icon classes
        listItem.textContent = entry;
        entryList.appendChild(listItem);
    });
});


















