
let influencers = [
  { initials: "SJ", name: "Sarah Johnson", category: "Fashion", pricing: 5000, status: "Active" },
  { initials: "MC", name: "Mike Chen", category: "Tech", pricing: 3500, status: "Active" },
  { initials: "ED", name: "Emma Davis", category: "Lifestyle", pricing: 4200, status: "Pending" },
  { initials: "AT", name: "Alex Turner", category: "Gaming", pricing: 6000, status: "Completed" },
];


const tbody = document.querySelector("tbody");
const searchInput = document.querySelector(".search-box input");
const statusSelect = document.querySelector("select");
const addButton = document.querySelector(".add-btn");


function createRow(inf) {
  const row = document.createElement("tr");
  row.classList.add("fade-in");

  row.innerHTML = `
    <td><div class="user"><span class="avatar">${inf.initials}</span> ${inf.name}</div></td>
    <td>${inf.category}</td>
    <td>$${inf.pricing.toLocaleString()}</td>
    <td><span class="status ${inf.status.toLowerCase()}">${inf.status}</span></td>
    <td class="actions">
      <i class="fa fa-edit edit-btn" title="Edit"></i>
      <i class="fa fa-trash delete-btn" title="Delete"></i>
    </td>
  `;


row.querySelector(".delete-btn").addEventListener("click", () => {
  influencers = influencers.filter((i) => i !== inf);
  renderTable(influencers);
});


row.querySelector(".edit-btn").addEventListener("click", () => {
  
  const popup = document.getElementById("editPopup");
  popup.classList.remove("hidden");

 
  document.getElementById("editName").value = inf.name;
  document.getElementById("editCategory").value = inf.category;
  document.getElementById("editPricing").value = inf.pricing;
  document.getElementById("editStatus").value = inf.status;

  
  const form = document.getElementById("editForm");
  form.onsubmit = (e) => {
    e.preventDefault();

    inf.name = document.getElementById("editName").value.trim();
    inf.category = document.getElementById("editCategory").value.trim();
    inf.pricing = Number(document.getElementById("editPricing").value);
    inf.status = document.getElementById("editStatus").value;
    inf.initials = inf.name.split(" ").map(n => n[0].toUpperCase()).join("");

    popup.classList.add("hidden");
    renderTable(influencers);
  };

  
  document.getElementById("cancelEdit").onclick = () => {
    popup.classList.add("hidden");
  };
});


  return row;
}


function renderTable(list) {
  tbody.innerHTML = "";
  list.forEach((inf) => tbody.appendChild(createRow(inf)));
}


searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = influencers.filter((inf) =>
    inf.name.toLowerCase().includes(term)
  );
  renderTable(filtered);
});


statusSelect.addEventListener("change", () => {
  const value = statusSelect.value;
  if (value === "All Status") {
    renderTable(influencers);
  } else {
    const filtered = influencers.filter(
      (inf) => inf.status.toLowerCase() === value.toLowerCase()
    );
    renderTable(filtered);
  }
});


const addPopup = document.getElementById("addPopup");
const saveAddBtn = document.getElementById("saveAddBtn");
const cancelAddBtn = document.getElementById("cancelAddBtn");

addButton.addEventListener("click", () => {
  addPopup.classList.remove("hidden"); // يظهر البوب أب
});

cancelAddBtn.addEventListener("click", () => {
  addPopup.classList.add("hidden"); // يقفل البوب أب
});


saveAddBtn.addEventListener("click", () => {
  const name = document.getElementById("addName").value.trim();
  const category = document.getElementById("addCategory").value.trim() || "Unknown";
  const pricing = Number(document.getElementById("addPricing").value) || 0;
  const status = document.getElementById("addStatus").value;

  if (!name) {
    alert("Please enter a name.");
    return;
  }

  const initials = name.split(" ").map(n => n[0].toUpperCase()).join("").slice(0, 2);
  const newInf = { initials, name, category, pricing, status };

  influencers.push(newInf);
  renderTable(influencers);


  addPopup.classList.add("hidden");
  document.getElementById("addName").value = "";
  document.getElementById("addCategory").value = "";
  document.getElementById("addPricing").value = "";
  document.getElementById("addStatus").value = "Active";

  addButton.textContent = "Added ✅";
  setTimeout(() => (addButton.textContent = "Add influencer"), 1200);
});


renderTable(influencers);

// ===== Sidebar Toggle =====
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const mainWrapper = document.querySelector(".main-wrapper");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mainWrapper.classList.toggle("shifted");
});
