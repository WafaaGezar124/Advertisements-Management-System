console.log("✅ contact.js loaded successfully!");

// نختار الفورم
const contactForm = document.querySelector(".contact-form");
const msg = document.querySelector(".form-message");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // نمنع إعادة تحميل الصفحة

        // نجمع القيم من الفورم
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const job = contactForm.querySelector('input[name="job"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // 🔴 التحقق من أن كل الحقول الأساسية متعبيه
        if (!name || !email || !phone || !job || !message) {
            showMessage("⚠️ Please fill in all required fields!", "error");
            return;
        }

        // 📧 تحقق من صحة الإيميل
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage("❌ Please enter a valid email address!", "error");
            return;
        }

        // ☎️ تحقق من رقم الهاتف
        const phoneRegex = /^\+?\d{10,15}$/;
        if (!phoneRegex.test(phone)) {
            showMessage("📞 Please enter a valid phone number!", "error");
            return;
        }

        // 📝 تحقق من طول الرسالة
        if (message.length < 10) {
            showMessage("✏️ Your message is too short. Please write more details.", "error");
            return;
        }

        // ✅ لو كل حاجة تمام
        showMessage("✅ Thank you for contacting us! We’ll get back to you soon.", "success");

        // تفريغ الفورم بعد ثانيتين
        setTimeout(() => {
            contactForm.reset();
        }, 2000);
    });
}

/* 🔧 دالة عرض الرسائل */
function showMessage(text, type) {
    msg.textContent = text;
    msg.className = `form-message ${type}`;
    msg.style.display = "block";

    // نضيف حركة بسيطة
    msg.style.opacity = 0;
    setTimeout(() => {
        msg.style.transition = "opacity 0.5s";
        msg.style.opacity = 1;
    }, 100);
}
