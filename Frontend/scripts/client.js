
// document.addEventListener("DOMContentLoaded", () => {
// const addBtn = document.getElementById("addClientBtn");
// const tableBody = document.querySelector(".client-table tbody");

// addBtn.addEventListener("click", () => {
//     // إنشاء صف جديد يحتوي على حقول إدخال
//     const newRow = document.createElement("tr");
//     newRow.innerHTML = `
//     <td><input type="text" class="form-control" placeholder="Client Name"></td>
//     <td><input type="text" class="form-control" placeholder="Company"></td>
//     <td><input type="email" class="form-control" placeholder="Email"></td>
//     <td><input type="text" class="form-control" placeholder="Phone"></td>
//     <td>
//         <select class="form-select">
//         <option value="Active">Active</option>
//         <option value="Pending">Pending</option>
//         <option value="Completed">Completed</option>
//         </select>
//     </td>
//     <td>
//         <button class="btn btn-success btn-sm done-btn">Done</button>
//         <button class="btn btn-danger btn-sm cancel-btn">Cancel</button>
//     </td>
//     `;
//     tableBody.appendChild(newRow);

//     // عند الضغط على "Done"
//     newRow.querySelector(".done-btn").addEventListener("click", () => {
//     const inputs = newRow.querySelectorAll("input, select");
//     const name = inputs[0].value.trim();
//     const company = inputs[1].value.trim();
//     const email = inputs[2].value.trim();
//     const phone = inputs[3].value.trim();
//     const status = inputs[4].value;

//     if (!name || !company || !email || !phone) {
//         alert("⚠️ Please fill all fields before saving!");
//         return;
//     }

//       // إنشاء صف نهائي بالقيم المدخلة
//     const savedRow = document.createElement("tr");
//     let badgeClass =
//         status === "Active" ? "bg-success" :
//         status === "Inactive" ? "bg-secondary" :
//         "bg-warning";

//     savedRow.innerHTML = `
//         <td>${name}</td>
//         <td>${company}</td>
//         <td>${email}</td>
//         <td>${phone}</td>
//         <td><span class="badge ${badgeClass} text-light">${status}</span></td>
//         <td>
//         <button class="btn btn-outline-danger btn-sm delete-btn">Delete</button>
//         </td>
//     `;

//       // استبدال صف الإدخال بالصف المحفوظ
//     tableBody.replaceChild(savedRow, newRow);

//       // حذف الصف عند الضغط على delete
//     savedRow.querySelector(".delete-btn").addEventListener("click", () => {
//         savedRow.remove();
//     });
//     });

//     // عند الضغط على "Cancel"
//     newRow.querySelector(".cancel-btn").addEventListener("click", () => {
//     newRow.remove();
//     });
// });
// });
// // -------- Delete Function --------
//         document.querySelectorAll(".delete-btn").forEach(btn => {
//             btn.addEventListener("click", function () {
//                 const row = this.closest("tr");
//                 const clientName = row.cells[0].textContent;
//                 if (confirm(`Are you sure you want to delete ${clientName}?`)) {
//                     row.remove();
//                 }
//             });
//         });

//         // -------- Edit Function --------
//         document.querySelectorAll(".edit-btn").forEach(btn => {
//             btn.addEventListener("click", function () {
//                 const row = this.closest("tr");
//                 const isEditing = row.classList.contains("editing");

//                 if (!isEditing) {
//                     // Start editing
//                     row.classList.add("editing");
//                     for (let i = 0; i < 5; i++) {
//                         const cell = row.cells[i];
//                         if (i === 3) continue; // skip status badge
//                         const value = cell.textContent.trim();
//                         cell.innerHTML = `<input type="text" value="${value}">`;
//                     }
//                     this.classList.remove("fa-pen-to-square");
//                     this.classList.add("fa-check");
//                     this.style.color = "#16a34a";
//                 } else {
//                     // Save changes
//                     row.classList.remove("editing");
//                     for (let i = 0; i < 5; i++) {
//                         const cell = row.cells[i];
//                         if (i === 3) continue;
//                         const input = cell.querySelector("input");
//                         if (input) cell.textContent = input.value;
//                     }
//                     this.classList.remove("fa-check");
//                     this.classList.add("fa-pen-to-square");
//                     this.style.color = "";
//                 }
//             });
//         });
document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.getElementById("addClientBtn");
const tableBody = document.querySelector(".client-table tbody");

  // 🔹 Add Client Row
addBtn.addEventListener("click", () => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
    <td><input type="text" class="form-control" placeholder="Client Name"></td>
    <td><input type="text" class="form-control" placeholder="Company"></td>
    <td><input type="email" class="form-control" placeholder="Email"></td>
    <td><input type="text" class="form-control" placeholder="Phone"></td>
    <td><input type="number" class="form-control" placeholder="Campaigns"></td>
    <td>
        <select class="form-select">
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        </select>
    </td>
    <td class="actions">
        <i class="fas fa-check done-btn text-success"></i>
        <i class="fas fa-times cancel-btn text-danger"></i>
    </td>
    `;
    tableBody.appendChild(newRow);

    // ✅ Done button
    newRow.querySelector(".done-btn").addEventListener("click", () => {
    const inputs = newRow.querySelectorAll("input, select");
    const [name, company, email, phone, campaigns, statusSelect] = inputs;
    const status = statusSelect.value;

    if (!name.value || !company.value || !email.value || !phone.value || !campaigns.value) {
        alert("⚠️ Please fill all fields before saving!");
        return;
    }

    let badgeClass =
        status === "Active"
        ? "active-client"
        : status === "Completed"
        ? "completed-client"
        : "pending-client";

    const savedRow = document.createElement("tr");
    savedRow.innerHTML = `
        <td>${name.value}</td>
        <td>${company.value}</td>
        <td>${email.value}</td>
        <td>${phone.value}</td>
        <td>${campaigns.value}</td>
        <td><span class="${badgeClass}">${status}</span></td>
        <td class="actions">
        <i class="fas fa-pen edit-btn"></i>
        <i class="fas fa-trash delete-btn"></i>
        </td>
    `;
    newRow.replaceWith(savedRow);
    });

    // ❌ Cancel button
    newRow.querySelector(".cancel-btn").addEventListener("click", () => {
    newRow.remove();
    });
});

  // ✅ استخدام Event Delegation علشان الأزرار الجديدة كمان تشتغل
tableBody.addEventListener("click", (e) => {
    // 🗑️ Delete
    if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    const clientName = row.cells[0].textContent;
    if (confirm(`Are you sure you want to delete ${clientName}?`)) {
        row.remove();
    }
    }

    // ✏️ Edit
    if (e.target.classList.contains("edit-btn")) {
    const row = e.target.closest("tr");
    const isEditing = row.classList.toggle("editing");

    if (isEditing) {
        // استبدل النصوص بـ input
        for (let i = 0; i < 4; i++) {
        const cell = row.cells[i];
        const value = cell.textContent.trim();
        cell.innerHTML = `<input type="text" class="form-control" value="${value}">`;
        }
        e.target.classList.remove("fa-pen");
        e.target.classList.add("fa-check");
        e.target.style.color = "green";
    } else {
        // حفظ التعديلات
        for (let i = 0; i < 4; i++) {
        const input = row.cells[i].querySelector("input");
        if (input) row.cells[i].textContent = input.value;
        }
        e.target.classList.remove("fa-check");
        e.target.classList.add("fa-pen");
        e.target.style.color = "";
    }
    }
});
});
    
