console.log("✅ reset password.js loaded");

// استهداف الفورم
const resetForm = document.getElementById("resetForm");

if (resetForm) {
    // إنشاء عنصر الرسالة
    const msg = document.createElement("p");
    msg.className = "form-message";
    resetForm.appendChild(msg);

    resetForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newPass = document.getElementById("newPassword").value.trim();
        const confirmPass = document.getElementById("confirmPassword").value.trim();

        // التحقق من طول كلمة المرور
        if (newPass.length < 6) {
            msg.textContent = "Password must be at least 6 characters long!";
            msg.className = "form-message error";
            msg.style.display = "block";
            return;
        }

        // التحقق من التطابق
        if (newPass !== confirmPass) {
            msg.textContent = "Passwords do not match!";
            msg.className = "form-message error";
            msg.style.display = "block";
            return;
        }

        // رسالة نجاح
        msg.textContent = "Password updated successfully!";
        msg.className = "form-message success";
        msg.style.display = "block";

        // إعادة تعيين الفورم بعد 1.5 ثانية
        setTimeout(() => {
            resetForm.reset();
            msg.style.display = "none";
        }, 1500);
    });
}

