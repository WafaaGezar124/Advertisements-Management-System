// footer.js
// تحديد إذا كنا داخل مجلد pages أو لا
const pathPrefixFooter = window.location.pathname.includes("/pages/") ? "../" : "";

// تحميل الفوتر
fetch(`${pathPrefixFooter}components/footer.html`)
    .then(res => res.text())
    .then(data => {
        const footerElem = document.querySelector("footer");
        if (footerElem) {
            footerElem.innerHTML = data;

            // تحديد الصفحة الحالية
            const page = window.location.pathname.toLowerCase();

            // تحديد نوع CSS المناسب للفوتر
            let cssFile = `${pathPrefixFooter}styles/footer.css`;

            if (page.includes("login") || page.includes("signup") || page.includes("forget") || page.includes("reset")) {
                cssFile = `${pathPrefixFooter}styles/footer_auth.css`;
            }

            // إضافة <link> لتحميل CSS المناسب
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssFile;
            document.head.appendChild(link);
        } else {
            console.warn("⚠️ لا يوجد عنصر <footer> في الصفحة!");
        }
    })
    .catch(err => console.error("❌ Error loading footer:", err));
