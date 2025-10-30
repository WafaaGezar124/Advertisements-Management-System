let packages = [
  { name: "Starter Pack", influencer: "Sarah Johnson", pricing: 500, status: "Active" },
  { name: "Pro Pack", influencer: "Mike Chen", pricing: 1000, status: "Active" },
  { name: "Lifestyle Pack", influencer: "Emma Davis", pricing: 750, status: "Pending" },
  { name: "Gaming Pack", influencer: "Alex Turner", pricing: 1200, status: "Completed" },
];

const tbody = document.getElementById("packagesTbody");
const searchInput = document.querySelector(".search-box input");
const statusFilter = document.getElementById("statusFilter");
const addBtn = document.getElementById("addBtn");
const packagePopup = document.getElementById("packagePopup");
const popupTitle = document.getElementById("popupTitle");
const packageNameInput = document.getElementById("packageName");
const packageInfluencerInput = document.getElementById("packageInfluencer");
const packagePricingInput = document.getElementById("packagePricing");
const packageStatusSelect = document.getElementById("packageStatus");
const savePackageBtn = document.getElementById("savePackageBtn");
const cancelPackageBtn = document.getElementById("cancelPackageBtn");

let editIndex = null;

// ===== Render Table =====
function renderTable(list) {
  tbody.innerHTML = "";
  list.forEach((pkg, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.name}</td>
      <td>${pkg.influencer}</td>
      <td>$${pkg.pricing.toLocaleString()}</td>
      <td><span class="status ${pkg.status.toLowerCase()}">${pkg.status}</span></td>
      <td>
        <i class="fa fa-edit edit-btn" title="Edit"></i>
        <i class="fa fa-trash delete-btn" title="Delete"></i>
      </td>
    `;

    // Delete package
    row.querySelector(".delete-btn").addEventListener("click", () => {
      packages.splice(index, 1);
      renderTable(packages);
    });

    // Edit package
    row.querySelector(".edit-btn").addEventListener("click", () => {
      editIndex = index;
      popupTitle.textContent = "Edit Package";
      packageNameInput.value = pkg.name;
      packageInfluencerInput.value = pkg.influencer;
      packagePricingInput.value = pkg.pricing;
      packageStatusSelect.value = pkg.status;
      packagePopup.classList.remove("hidden");
    });

    tbody.appendChild(row);
  });
}

// ===== Add Package =====
addBtn.addEventListener("click", () => {
  editIndex = null;
  popupTitle.textContent = "Add Package";
  packageNameInput.value = "";
  packageInfluencerInput.value = "";
  packagePricingInput.value = "";
  packageStatusSelect.value = "Active";
  packagePopup.classList.remove("hidden");
});

// ===== Save Package =====
savePackageBtn.addEventListener("click", () => {
  const name = packageNameInput.value.trim();
  const influencer = packageInfluencerInput.value.trim();
  const pricing = Number(packagePricingInput.value);
  const status = packageStatusSelect.value;

  if (!name || !influencer || isNaN(pricing)) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (editIndex !== null) {
    // Update existing
    packages[editIndex] = { name, influencer, pricing, status };
  } else {
    // Add new
    packages.push({ name, influencer, pricing, status });
  }

  packagePopup.classList.add("hidden");
  renderTable(packages);
});

// ===== Cancel Popup =====
cancelPackageBtn.addEventListener("click", () => {
  packagePopup.classList.add("hidden");
});

// ===== Search =====
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(term) ||
    pkg.influencer.toLowerCase().includes(term)
  );
  renderTable(filtered);
});

// ===== Filter by Status =====
statusFilter.addEventListener("change", () => {
  const status = statusFilter.value;
  if (status === "All Status") {
    renderTable(packages);
  } else {
    const filtered = packages.filter(pkg => pkg.status === status);
    renderTable(filtered);
  }
});

// ===== Sidebar Toggle =====
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const mainWrapper = document.querySelector(".main-wrapper");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  mainWrapper.classList.toggle("shifted");
});

// ===== Initial Render =====
renderTable(packages);
