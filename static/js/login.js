document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginMessage = document.getElementById("loginMessage");
    const forgotPassword = document.getElementById("forgotPassword");


    /* =========================
       SHOW / HIDE PASSWORD
    ========================= */

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.textContent = "Hide";

            togglePassword.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            passwordInput.type = "password";

            togglePassword.textContent = "Show";

            togglePassword.setAttribute(
                "aria-label",
                "Show password"
            );
        }
    });


    /* =========================
       LOGIN FORM
    ========================= */

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const role = document.getElementById("role").value;
        const username = document.getElementById("username").value.trim();
        const password = passwordInput.value;


        if (!role) {
            showMessage("Please select your role.");
            return;
        }


        if (!username) {
            showMessage("Please enter your username or email.");
            return;
        }


        if (!password) {
            showMessage("Please enter your password.");
            return;
        }


        /*
         * Backend authentication will be connected here later.
         */

        showMessage(
            "Login form is ready. Backend authentication will be connected next."
        );
    });


    /* =========================
       FORGOT PASSWORD
    ========================= */

    forgotPassword.addEventListener("click", function (event) {

        event.preventDefault();

        showMessage(
            "Password recovery will be available after backend setup."
        );
    });


    /* =========================
       MESSAGE FUNCTION
    ========================= */

    function showMessage(message) {

        loginMessage.textContent = message;

        loginMessage.style.color = "#1e3a8a";
    }

});