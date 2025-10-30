// Sidebar toggle
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const mainWrapper = document.querySelector(".main-wrapper");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mainWrapper.classList.toggle("shifted");
});
// ===== Analytics JS =====
const searchInput = document.querySelector(".search-box input");
const tableRows = document.querySelectorAll("tbody tr");

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();

  tableRows.forEach(row => {
    const name = row.querySelector("td:first-child").textContent.toLowerCase();
    if (name.includes(term)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
