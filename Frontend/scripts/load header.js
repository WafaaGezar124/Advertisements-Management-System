// تحديد إذا كنا داخل مجلد pages أو لا
const pathPrefix = window.location.pathname.includes("/pages/") ? "../" : "";

// تحميل الهيدر
fetch(`${pathPrefix}components/header.html`)
    .then(r => r.text())
    .then(d => {
        document.querySelector("header").innerHTML = d;
    })
    .catch(err => console.error("❌ Error loading header:", err));

// تحميل الفوتر
fetch(`${pathPrefix}components/footer.html`)
    .then(res => res.text())
    .then(data => {
        document.querySelector("footer").innerHTML = data;

        // تحديد الصفحة الحالية
        const page = window.location.pathname.toLowerCase();

        // تحديد نوع CSS المستخدم
        let cssFile = `${pathPrefix}styles/footer.css`;

        if (page.includes("login") || page.includes("signup") || page.includes("forget") || page.includes("reset")) {
            cssFile = `${pathPrefix}styles/footer_auth.css`;
        }

        // إضافة <link> لتحميل CSS المناسب
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssFile;
        document.head.appendChild(link);
    })
    .catch(err => console.error("❌ Error loading footer:", err));
