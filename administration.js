document.addEventListener('DOMContentLoaded', () => {
    const navToggleBtn = document.getElementById('navToggleBtn');
    const closePanelBtn = document.getElementById('closePanelBtn');
    const sidebarPanel = document.getElementById('sidebarPanel');
    const mainContent = document.getElementById('mainContent');

    // Function to open the sidebar panel safely
    const openSidebar = () => {
        sidebarPanel.classList.add('open');
        mainContent.classList.add('blurred');
        document.body.classList.add('sidebar-active');
    };

    // Function to close the sidebar panel safely
    const closeSidebar = () => {
        sidebarPanel.classList.remove('open');
        mainContent.classList.remove('blurred');
        document.body.classList.remove('sidebar-active');
    };

    // Event listeners capturing triggers
    if (navToggleBtn) {
        navToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSidebar();
        });
    }

    if (closePanelBtn) {
        closePanelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeSidebar();
        });
    }
});
