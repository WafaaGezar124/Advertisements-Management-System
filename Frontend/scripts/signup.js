console.log("✅ SignUp.js loaded");

// استهداف الفورم
const signupForm = document.querySelector("form");

if (signupForm) {
    // إنشاء عنصر الرسالة
    const msg = document.createElement("p");
    msg.className = "form-message";
    signupForm.appendChild(msg);

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
        const role = document.getElementById("role").value;

        // التحقق من كل الحقول
        if (!name || !email || !password || !confirmPassword || !role) {
            msg.textContent = "Please fill in all fields!";
            msg.className = "form-message error";
            return;
        }

        // التحقق من الايميل
        if (!email.includes("@")) {
            msg.textContent = "Please enter a valid email!";
            msg.className = "form-message error";
            return;
        }

        // التحقق من طول الباسورد
        if (password.length < 6) {
            msg.textContent = "Password must be at least 6 characters long!";
            msg.className = "form-message error";
            return;
        }

        // التحقق من التطابق
        if (password !== confirmPassword) {
            msg.textContent = "Passwords do not match!";
            msg.className = "form-message error";
            return;
        }

        // رسالة نجاح
        msg.textContent = "Account created successfully!";
        msg.className = "form-message success";

        // إعادة تعيين الفورم وتوجيه لل Login بعد 1.5 ثانية
        signupForm.reset();
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}


