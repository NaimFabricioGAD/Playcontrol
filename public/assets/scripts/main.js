document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Solo corre este código si estamos en la página de login
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const emailInput = document.getElementById("loginEmail");
            const passwordInput = document.getElementById("loginPassword");
            const errorBox = document.getElementById("loginError");

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validaciones básicas
            if (!email || !password) {
                errorBox.textContent = "Por favor, completa todos los campos.";
                return;
            }

            if (password.length < 6) {
                errorBox.textContent = "La contraseña debe tener al menos 6 caracteres.";
                return;
            }

            // *** LÓGICA DEMO ***
            // Para el curso, no tenemos backend; simulamos un usuario.
            const demoEmail = "user@playcontrol.app";
            const demoPassword = "PlayControl123";

            if (email === demoEmail && password === demoPassword) {
                errorBox.textContent = "";
                alert("Inicio de sesión exitoso. ¡Bienvenido a PlayControl!");

                // Después de "loguear", redirigimos a la landing principal
                window.location.href = "index.html";
            } else {
                errorBox.textContent = "Correo o contraseña incorrectos (demo).";
            }
        });
    }
});