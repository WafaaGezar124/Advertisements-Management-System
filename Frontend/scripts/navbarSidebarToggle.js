document.addEventListener("DOMContentLoaded", () => {
    const waitForSidebar = setInterval(() => {
        const toggleBtn = document.getElementById("toggleSidebar");
        const sidebar = document.querySelector("#sidebar .sidebar");
        const mainContent = document.querySelector(".main-content");

        if (toggleBtn && sidebar) {
            clearInterval(waitForSidebar);
            toggleBtn.addEventListener("click", () => {
                sidebar.classList.toggle("collapsed");
                mainContent?.classList.toggle("expanded");

                const icon = toggleBtn.querySelector("i");
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            });
        }
    }, 200);
});
