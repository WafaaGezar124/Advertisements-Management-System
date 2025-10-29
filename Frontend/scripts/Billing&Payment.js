let invoiceCounter = 1;

// ===== OPEN & CLOSE POPUPS =====
function openPopup(id) {
 document.getElementById(id).classList.remove("hidden");
  document.getElementById(id).style.display = "flex";
  document.querySelector(".main-content").classList.add("blur-bg");
}

function closePopup(id) {
 document.getElementById(id).classList.add("hidden");
  document.getElementById(id).style.display = "none";
  document.querySelector(".main-content").classList.remove("blur-bg");
}

document.querySelectorAll(".action-btn").forEach((btn) => {
  if (btn.textContent.includes("Invoice")) {
    btn.addEventListener("click", () => openPopup("invoicePopup"));
  } else if (btn.textContent.includes("Record Payment")) {
    btn.addEventListener("click", () => openPopup("paymentPopup"));
  } else if (btn.textContent.includes("Influencer")) {
    btn.addEventListener("click", () => openPopup("influencerPopup"));
  }
});



// ===== SAVE NEW INVOICE =====
function saveInvoice() {
  const client = document.getElementById("invoiceClient").value.trim();
  const amount = document.getElementById("invoiceAmount").value.trim();
  const date = document.getElementById("invoiceDate").value;
  const status = document.getElementById("invoiceStatus").value;

  if (!client || !amount || !date) {
    alert("Please fill all fields.");
    return;
  }

  const table = document.querySelector(".invoice-table tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
   <td>INV-${invoiceCounter.toString().padStart(3, "0")}</td>
    <td>${client}</td>
    <td>$${amount}</td>
    <td>${date}</td>
    <td><span class="badge ${status.toLowerCase()}">${status}</span></td>
  `;

  table.appendChild(newRow);
  invoiceCounter++;

  closePopup("invoicePopup");

  // clear inputs
  document.getElementById("invoiceClient").value = "";
  document.getElementById("invoiceAmount").value = "";
  document.getElementById("invoiceDate").value = "";
  document.getElementById("invoiceStatus").value = "Paid";
}

// ===== SAVE CLIENT PAYMENT =====
function savePayment() {
  const client = document.getElementById("paymentClient").value.trim();
  const amount = document.getElementById("paymentAmount").value.trim();
  const date = document.getElementById("paymentDate").value;
  const method = document.getElementById("paymentMethod").value.trim();

  if (!client || !amount || !date || !method) {
    alert("Please fill all fields.");
    return;
  }

  const table = document.querySelector(".card:nth-of-type(2) tbody");
  const newRow = document.createElement("tr");

const formattedAmount = amount.startsWith('-') ? `-$${amount.slice(1)}` : `+$${amount}`;
const amountClass = amount.startsWith('-') ? 'red-text' : 'green-text';

newRow.innerHTML = `
  <td>${client}</td>
  <td class="${amountClass}">${formattedAmount}</td>
  <td>${date}</td>
  <td>${method}</td>
`;

  table.appendChild(newRow);
  closePopup("paymentPopup");

  // clear inputs
  document.getElementById("paymentClient").value = "";
  document.getElementById("paymentAmount").value = "";
  document.getElementById("paymentDate").value = "";
  document.getElementById("paymentMethod").value = "";
}

// ===== SAVE INFLUENCER PAYMENT =====
function saveInfluencerPayment() {
  const influencer = document.getElementById("influencerName").value.trim();
  const campaign = document.getElementById("influencerCampaign").value.trim();
  const amount = document.getElementById("influencerAmount").value.trim();
  const status = document.getElementById("influencerStatus").value;


  if (!influencer || !campaign || !amount || !status ) {
    alert("Please fill all fields.");
    return;
  }

  const formattedAmount = amount.startsWith('-') ? `-$${amount.slice(1)}` : `+$${amount}`;
  const amountClass = amount.startsWith('-') ? 'red-text' : 'green-text';

  const table = document.querySelector(".influencer-table tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
    <td>${influencer}</td>
    <td>${campaign}</td>
    <td class="${amountClass}">${formattedAmount}</td>
    <td><span class="badge ${status.toLowerCase()}">${status}</span></td>
  `;

  table.appendChild(newRow);
  closePopup("influencerPopup");

  // تفريغ الحقول
  document.getElementById("influencerName").value = "";
  document.getElementById("influencerCampaign").value = "";
  document.getElementById("influencerAmount").value = "";
  document.getElementById("influencerStatus").value = "Completed";
}
