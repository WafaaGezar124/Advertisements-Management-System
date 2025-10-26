// ✅ Check that JS is loaded
console.log("✅ forgot password.js loaded");

// استهداف الفورم
const forgotForm = document.getElementById("forgotForm");

if (forgotForm) {
    // إنشاء عنصر الرسالة
    const msg = document.createElement("p");
    msg.className = "form-message";
    forgotForm.appendChild(msg);

    // إضافة حدث عند الإرسال
    forgotForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        // التحقق من صحة البريد
        if (!email) {
            msg.textContent = "Please enter your email!";
            msg.className = "form-message error";
            msg.style.display = "block";
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            msg.textContent = "Please enter a valid email!";
            msg.className = "form-message error";
            msg.style.display = "block";
            return;
        }

        // رسالة نجاح (محاكاة إرسال الرابط)
        msg.textContent = "If this email exists, a reset link has been sent to your inbox.";
        msg.className = "form-message success";
        msg.style.display = "block";

        // إعادة تعيين الفورم بعد ثانيتين
        setTimeout(() => {
            forgotForm.reset();
            msg.style.display = "none";
        }, 2000);
    });
}
