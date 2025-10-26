// header.js
// تحديد إذا كنا داخل مجلد pages أو لا
const pathPrefixHeader = window.location.pathname.includes("/pages/") ? "../" : "";

// تحميل الهيدر
fetch(`${pathPrefixHeader}components/header.html`)
    .then(res => res.text())
    .then(data => {
        const headerElem = document.querySelector("header");
        if (headerElem) {
            headerElem.innerHTML = data;
        } else {
            console.warn("⚠️ لا يوجد عنصر <header> في الصفحة!");
        }
    })
    .catch(err => console.error("❌ Error loading header:", err));

