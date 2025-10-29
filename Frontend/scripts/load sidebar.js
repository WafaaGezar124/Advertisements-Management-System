
fetch('../components/sidebar.html')
    .then(response => response.text())
    .then(data => {
        const sidebarContainer = document.getElementById('sidebar');
        if (sidebarContainer) {
            sidebarContainer.innerHTML = data;
        }
    })
    .catch(error => console.error('Error loading sidebar:', error));