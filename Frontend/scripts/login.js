// ✅ Check that JS is loaded
console.log("✅ login.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    const msg = loginForm.querySelector(".form-message");

    // =================== Form Validation ===================
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        if (!email || !password || !role) {
            msg.textContent = "Please fill in all fields!";
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

        if (password.length < 6) {
            msg.textContent = "Password must be at least 6 characters!";
            msg.className = "form-message error";
            msg.style.display = "block";
            return;
        }

        msg.textContent = "Login successful (simulation).";
        msg.className = "form-message success";
        msg.style.display = "block";

        setTimeout(() => {
            loginForm.reset();
            msg.style.display = "none";
        }, 1500);
    });
});