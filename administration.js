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

    // Event listeners capturing triggers for sidebar
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

    // --- NEW: Dropdown Menu Functionality ---
    // Select all buttons intended to toggle dropdowns
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevents page jump if using <a> tags
            e.stopPropagation(); // Prevents click from closing the sidebar accidentally

            // Find the parent menu item container
            const parentItem = btn.closest('.menu-item');

            if (parentItem) {
                // Toggle a class to show/hide the nested dropdown menu
                parentItem.classList.toggle('show-dropdown');
                
                // Optional: If you want accordion-style (closing others when one opens), uncomment below:
                /*
                dropdownBtns.forEach(otherBtn => {
                    const otherParent = otherBtn.closest('.menu-item');
                    if (otherParent !== parentItem) {
                        otherParent.classList.remove('show-dropdown');
                    }
                });
                */
            }
        });
    });
});
