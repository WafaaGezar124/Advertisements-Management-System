// ✅ Check that JS is loaded
console.log("✅ main.js connected successfully!");

// =================== LOGIN PAGE ===================
const loginForm = document.querySelector("form");
if (loginForm && document.title.includes("Login")) {
    const msg = document.createElement("p");
    msg.className = "form-message";
    loginForm.appendChild(msg);

    loginForm.addEventListener("submit", (e) => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        if (!email || !password || !role) {
            e.preventDefault();
            msg.textContent = "Please fill in all fields!";
            msg.className = "form-message error";
            return;
        }

        msg.textContent = "Login successful (simulation).";
        msg.className = "form-message success";
    });
}

// =================== SIGN UP PAGE ===================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    const msg = document.createElement("p");
    msg.className = "form-message";
    signupForm.appendChild(msg);

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const role = document.getElementById("role").value;

        if (!name || !email || !password || !confirmPassword || !role) {
            msg.textContent = "Please fill in all fields!";
            msg.className = "form-message error";
            return;
        }
        if (!email.includes("@")) {
            msg.textContent = "Please enter a valid email!";
            msg.className = "form-message error";
            return;
        }
        if (password.length < 6) {
            msg.textContent = "Password must be at least 6 characters long!";
            msg.className = "form-message error";
            return;
        }
        if (password !== confirmPassword) {
            msg.textContent = "Passwords do not match!";
            msg.className = "form-message error";
            return;
        }

        msg.textContent = "Account created successfully!";
        msg.className = "form-message success";
        signupForm.reset();
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    });
}

// =================== FORGOT PASSWORD PAGE ===================
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
    const msg = document.createElement("p");
    msg.className = "form-message";
    forgotForm.appendChild(msg);

    forgotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();

        if (!email || !email.includes("@")) {
            msg.textContent = "Please enter a valid email!";
            msg.className = "form-message error";
            return;
        }

        msg.textContent = "If this email exists, a reset link has been sent to your inbox.";
        msg.className = "form-message success";
    });
}

// =================== RESET PASSWORD PAGE ===================
const resetForm = document.getElementById("resetForm");
if (resetForm) {
    const msg = document.createElement("p");
    msg.className = "form-message";
    resetForm.appendChild(msg);

    resetForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newPass = document.getElementById("newPassword").value.trim();
        const confirmPass = document.getElementById("confirmPassword").value.trim();

        if (newPass.length < 6) {
            msg.textContent = "Password must be at least 6 characters long!";
            msg.className = "form-message error";
            return;
        }
        if (newPass !== confirmPass) {
            msg.textContent = "Passwords do not match!";
            msg.className = "form-message error";
            return;
        }

        msg.textContent = "Password updated successfully!";
        msg.className = "form-message success";
        resetForm.reset();
    });
}

// =================== CONTACT PAGE ===================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    const msg = document.createElement("p");
    msg.className = "form-message";
    contactForm.appendChild(msg);

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            msg.textContent = "Please fill in all fields!";
            msg.className = "form-message error";
            return;
        }
        if (!email.includes("@")) {
            msg.textContent = "Please enter a valid email!";
            msg.className = "form-message error";
            return;
        }
        if (message.length < 10) {
            msg.textContent = "Your message is too short!";
            msg.className = "form-message error";
            return;
        }

        msg.textContent = "Thank you for contacting us!";
        msg.className = "form-message success";
        contactForm.reset();
    });
}
// Robust toggle for all password fields
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-password').forEach(span => {
        span.addEventListener('click', () => {
            // find the closest wrapper then the input inside it
            const wrapper = span.closest('.password-wrapper');
            if (!wrapper) return;
            const input = wrapper.querySelector('input[type="password"], input[type="text"]');
            if (!input) return;

            const icon = span.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                if (icon) {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            } else {
                input.type = 'password';
                if (icon) {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            }
        });
    });
});
