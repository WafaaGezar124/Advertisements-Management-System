let campaigns = [
  { name: "Restaurant Promo", client: "ABC Restaurant", budget: 5000, status: "Ongoing" },
  { name: "Clothing Launch", client: "XYZ Clothing", budget: 3500, status: "Waiting for Payment" },
  { name: "Gaming Event", client: "GameWorld", budget: 4200, status: "Completed" },
];

const tbody = document.querySelector("tbody");
const searchInput = document.querySelector(".search-box input");
const statusSelect = document.querySelector("select");
const addButton = document.querySelector(".add-btn");

function createRow(campaign) {
  const row = document.createElement("tr");
  row.classList.add("fade-in");

  let statusClass = "active";
  if (campaign.status.toLowerCase() === "waiting for payment") statusClass = "pending";
  if (campaign.status.toLowerCase() === "completed") statusClass = "completed";

  row.innerHTML = `
    <td>${campaign.name}</td>
    <td>${campaign.client}</td>
    <td>$${campaign.budget.toLocaleString()}</td>
    <td><span class="status ${statusClass}">${campaign.status}</span></td>
    <td class="actions">
      <i class="fa fa-edit edit-btn" title="Edit"></i>
      <i class="fa fa-trash delete-btn" title="Delete"></i>
    </td>
  `;

  // حذف
  row.querySelector(".delete-btn").addEventListener("click", () => {
    campaigns = campaigns.filter(c => c !== campaign);
    renderTable(campaigns);
  });

  // تعديل
  row.querySelector(".edit-btn").addEventListener("click", () => {
    const popup = document.getElementById("editPopup");
    popup.classList.remove("hidden");

    document.getElementById("editName").value = campaign.name;
    document.getElementById("editClient").value = campaign.client;
    document.getElementById("editBudget").value = campaign.budget;
    document.getElementById("editStatus").value = campaign.status;

    const form = document.getElementById("editForm");
    form.onsubmit = (e) => {
      e.preventDefault();
      campaign.name = document.getElementById("editName").value.trim();
      campaign.client = document.getElementById("editClient").value.trim();
      campaign.budget = Number(document.getElementById("editBudget").value);
      campaign.status = document.getElementById("editStatus").value;
      popup.classList.add("hidden");
      renderTable(campaigns);
    };

    document.getElementById("cancelEdit").onclick = () => popup.classList.add("hidden");
  });

  return row;
}

function renderTable(list) {
  tbody.innerHTML = "";
  list.forEach(c => tbody.appendChild(createRow(c)));
}

// البحث
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = campaigns.filter(c => c.name.toLowerCase().includes(term));
  renderTable(filtered);
});

// فلتر الحالة
statusSelect.addEventListener("change", () => {
  const value = statusSelect.value;
  if (value === "All Status") renderTable(campaigns);
  else renderTable(campaigns.filter(c => c.status.toLowerCase() === value.toLowerCase()));
});

// إضافة Campaign
const addPopup = document.getElementById("addPopup");
const saveAddBtn = document.getElementById("saveAddBtn");
const cancelAddBtn = document.getElementById("cancelAddBtn");

addButton.addEventListener("click", () => addPopup.classList.remove("hidden"));
cancelAddBtn.addEventListener("click", () => addPopup.classList.add("hidden"));

saveAddBtn.addEventListener("click", () => {
  const name = document.getElementById("addName").value.trim();
  const client = document.getElementById("addClient").value.trim() || "Unknown";
  const budget = Number(document.getElementById("addBudget").value) || 0;
  const status = document.getElementById("addStatus").value;

  if (!name) return alert("Please enter a campaign name.");

  const newCampaign = { name, client, budget, status };
  campaigns.push(newCampaign);
  renderTable(campaigns);

  addPopup.classList.add("hidden");
  document.getElementById("addName").value = "";
  document.getElementById("addClient").value = "";
  document.getElementById("addBudget").value = "";
  document.getElementById("addStatus").value = "Ongoing";

  addButton.textContent = "Added ✅";
  setTimeout(() => (addButton.textContent = "Add campaign"), 1200);
});

renderTable(campaigns);

// Sidebar toggle
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const mainWrapper = document.querySelector(".main-wrapper");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mainWrapper.classList.toggle("shifted");
});
