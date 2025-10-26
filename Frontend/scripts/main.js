// ✅ Check that JS is loaded
console.log("✅ main.js connected successfully!");

// =================== PASSWORD TOGGLE (مشترك بين الصفحات) ===================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-password').forEach(span => {
        span.addEventListener('click', () => {
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
