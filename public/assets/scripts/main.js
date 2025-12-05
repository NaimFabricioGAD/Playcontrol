// Utilidades para manejar usuarios en localStorage
function loadUsers() {
    const raw = localStorage.getItem("playcontrolUsers");
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("playcontrolUsers", JSON.stringify(users));
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // ---------- REGISTRO ----------
    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const fullNameInput = document.getElementById("fullName");
            const emailInput = document.getElementById("email");
            const phoneInput = document.getElementById("phone");
            const usernameInput = document.getElementById("username");
            const passwordInput = document.getElementById("password");
            const errorBox = document.getElementById("registerError");

            const fullName = fullNameInput.value.trim();
            const email = emailInput.value.trim().toLowerCase();
            const phone = phoneInput.value.trim();
            const username = usernameInput.value.trim().toLowerCase();
            const password = passwordInput.value.trim();

            // Validaciones básicas
            if (!fullName || !email || !phone || !username || !password) {
                errorBox.textContent = "Por favor, completa todos los campos.";
                return;
            }

            if (password.length < 6) {
                errorBox.textContent = "La contraseña debe tener al menos 6 caracteres.";
                return;
            }

            const users = loadUsers();

            // Verificar duplicados
            const emailExists = users.some((u) => u.email === email);
            const userExists = users.some((u) => u.username === username);

            if (emailExists) {
                errorBox.textContent = "Este correo ya está registrado.";
                return;
            }
            if (userExists) {
                errorBox.textContent = "Este nombre de usuario ya existe.";
                return;
            }

            // Crear usuario (nota: en un sistema real la contraseña NO se guarda en texto plano)
            const newUser = {
                fullName,
                email,
                phone,
                username,
                password,
            };

            users.push(newUser);
            saveUsers(users);

            // Guardamos el usuario actual solo como demo
            localStorage.setItem("playcontrolCurrentUser", JSON.stringify(newUser));

            errorBox.textContent = "";
            alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");

            // Redirigir a login
            window.location.href = "login.html";
        });
    }

    // ---------- LOGIN ----------
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const idInput = document.getElementById("loginId");
            const passwordInput = document.getElementById("loginPassword");
            const errorBox = document.getElementById("loginError");

            const id = idInput.value.trim().toLowerCase();
            const password = passwordInput.value.trim();

            if (!id || !password) {
                errorBox.textContent = "Por favor, completa todos los campos.";
                return;
            }

            const users = loadUsers();

            // Buscar por correo O por nombre de usuario
            const user = users.find(
                (u) =>
                    (u.email === id || u.username === id) && u.password === password
            );

            if (user) {
                errorBox.textContent = "";
                localStorage.setItem(
                    "playcontrolCurrentUser",
                    JSON.stringify(user)
                );
                alert(
                    `Inicio de sesión exitoso. ¡Bienvenido/a, ${user.fullName}!`
                );
                // Ir a la landing
                window.location.href = "index.html";
            } else {
                errorBox.textContent =
                    "Datos incorrectos. Verifica tu correo/usuario y contraseña.";
            }
        });
    }
});