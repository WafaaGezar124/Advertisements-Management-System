let clients = [
  { initials: "AB", name: "Alice Brown", category: "Premium", pricing: 7000, status: "Active" },
  { initials: "JD", name: "John Doe", category: "Standard", pricing: 3500, status: "Pending" },
  { initials: "MC", name: "Mary Clark", category: "Enterprise", pricing: 12000, status: "Completed" },
  { initials: "RT", name: "Robert Taylor", category: "Premium", pricing: 9000, status: "Active" },
];

const tbody = document.querySelector("tbody");
const searchInput = document.querySelector(".search-box input");
const statusSelect = document.querySelector("select");
const addButton = document.querySelector(".add-btn");

function createRow(client) {
  const row = document.createElement("tr");
  row.classList.add("fade-in");

  row.innerHTML = `
    <td><div class="user"><span class="avatar">${client.initials}</span> ${client.name}</div></td>
    <td>${client.category}</td>
    <td>$${client.pricing.toLocaleString()}</td>
    <td><span class="status ${client.status.toLowerCase()}">${client.status}</span></td>
    <td class="actions">
      <i class="fa fa-edit edit-btn" title="Edit"></i>
      <i class="fa fa-trash delete-btn" title="Delete"></i>
    </td>
  `;

  row.querySelector(".delete-btn").addEventListener("click", () => {
    clients = clients.filter(c => c !== client);
    renderTable(clients);
  });

  row.querySelector(".edit-btn").addEventListener("click", () => {
    const popup = document.getElementById("editPopup");
    popup.classList.remove("hidden");

    document.getElementById("editName").value = client.name;
    document.getElementById("editCategory").value = client.category;
    document.getElementById("editPricing").value = client.pricing;
    document.getElementById("editStatus").value = client.status;

    const form = document.getElementById("editForm");
    form.onsubmit = (e) => {
      e.preventDefault();
      client.name = document.getElementById("editName").value.trim();
      client.category = document.getElementById("editCategory").value.trim();
      client.pricing = Number(document.getElementById("editPricing").value);
      client.status = document.getElementById("editStatus").value;
      client.initials = client.name.split(" ").map(n => n[0].toUpperCase()).join("").slice(0,2);

      popup.classList.add("hidden");
      renderTable(clients);
    };

    document.getElementById("cancelEdit").onclick = () => popup.classList.add("hidden");
  });

  return row;
}

function renderTable(list) {
  tbody.innerHTML = "";
  list.forEach(client => tbody.appendChild(createRow(client)));
}

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  renderTable(clients.filter(c => c.name.toLowerCase().includes(term)));
});

statusSelect.addEventListener("change", () => {
  const value = statusSelect.value;
  renderTable(value === "All Status" ? clients : clients.filter(c => c.status.toLowerCase() === value.toLowerCase()));
});

const addPopup = document.getElementById("addPopup");
const saveAddBtn = document.getElementById("saveAddBtn");
const cancelAddBtn = document.getElementById("cancelAddBtn");

addButton.addEventListener("click", () => addPopup.classList.remove("hidden"));
cancelAddBtn.addEventListener("click", () => addPopup.classList.add("hidden"));

saveAddBtn.addEventListener("click", () => {
  const name = document.getElementById("addName").value.trim();
  const category = document.getElementById("addCategory").value.trim() || "Unknown";
  const pricing = Number(document.getElementById("addPricing").value) || 0;
  const status = document.getElementById("addStatus").value;

  if (!name) return alert("Please enter a name.");

  const initials = name.split(" ").map(n => n[0].toUpperCase()).join("").slice(0,2);
  clients.push({ initials, name, category, pricing, status });

  renderTable(clients);
  addPopup.classList.add("hidden");

  document.getElementById("addName").value = "";
  document.getElementById("addCategory").value = "";
  document.getElementById("addPricing").value = "";
  document.getElementById("addStatus").value = "Active";

  addButton.textContent = "Added ✅";
  setTimeout(() => addButton.textContent = "Add client", 1200);
});

renderTable(clients);

// Sidebar toggle
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const mainWrapper = document.querySelector(".main-wrapper");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mainWrapper.classList.toggle("shifted");
});
