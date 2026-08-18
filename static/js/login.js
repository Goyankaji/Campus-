document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");


    const role =
        document.getElementById("role");


    const username =
        document.getElementById("username");


    const password =
        document.getElementById("password");


    const togglePassword =
        document.getElementById("togglePassword");


    const forgotPassword =
        document.getElementById("forgotPassword");


    const loginButton =
        document.getElementById("loginButton");


    const loginMessage =
        document.getElementById("loginMessage");



    /* =====================================================
       SHOW / HIDE PASSWORD
    ===================================================== */

    togglePassword.addEventListener(
        "click",
        () => {


            const eyeIcon =
                document.getElementById("eyeIcon");



            /* =========================================
               SHOW PASSWORD
            ========================================== */

            if (password.type === "password") {


                password.type = "text";


                togglePassword.setAttribute(
                    "aria-label",
                    "Hide password"
                );


                /* Eye with slash */

                eyeIcon.innerHTML = `

                    <path
                        d="M3 3L21 21"/>


                    <path
                        d="M10.6 10.6
                           A2 2 0 0 0
                           13.4 13.4"/>


                    <path
                        d="M9.2 4.2
                           C10.1 3.9
                           11 3.7
                           12 3.7
                           C18 3.7
                           21.5 9
                           22 12
                           C21.5 14
                           20.4 15.7
                           19 17"/>


                    <path
                        d="M6.1 6.1
                           C3.8 7.7
                           2.5 10.2
                           2 12
                           C2.8 14.5
                           6.5 20.3
                           12 20.3
                           C13.2 20.3
                           14.4 20.1
                           15.5 19.7"/>

                `;


            }


            /* =========================================
               HIDE PASSWORD
            ========================================== */

            else {


                password.type = "password";


                togglePassword.setAttribute(
                    "aria-label",
                    "Show password"
                );


                /* Normal Eye */

                eyeIcon.innerHTML = `

                    <path
                        d="M2 12
                           C4.5 7.5
                           8 5.5
                           12 5.5
                           C16 5.5
                           19.5 7.5
                           22 12
                           C19.5 16.5
                           16 18.5
                           12 18.5
                           C8 18.5
                           4.5 16.5
                           2 12Z"/>


                    <circle
                        cx="12"
                        cy="12"
                        r="3"/>

                `;

            }

        }
    );



    /* =====================================================
       LOGIN FORM SUBMIT
    ===================================================== */

    loginForm.addEventListener(
        "submit",
        async (event) => {


            event.preventDefault();


            clearErrors();



            /* =========================================
               GET VALUES
            ========================================== */

            const roleValue =
                role.value;


            const usernameValue =
                username.value.trim();


            const passwordValue =
                password.value;



            let isValid = true;



            /* =========================================
               ROLE VALIDATION
            ========================================== */

            if (!roleValue) {


                showError(
                    "role",
                    "Please select your role."
                );


                isValid = false;

            }



            /* =========================================
               USERNAME VALIDATION
            ========================================== */

            if (!usernameValue) {


                showError(
                    "username",
                    "Please enter your email or username."
                );


                isValid = false;

            }



            /* =========================================
               PASSWORD VALIDATION
            ========================================== */

            if (!passwordValue) {


                showError(
                    "password",
                    "Please enter your password."
                );


                isValid = false;

            }



            /* =========================================
               STOP IF INVALID
            ========================================== */

            if (!isValid) {

                return;

            }



            /* =========================================
               TEMPORARY LOGIN
            ========================================== */

            loginButton.classList.add(
                "loading"
            );


            loginButton
                .querySelector("span")
                .textContent =
                "Signing in...";



            /*
             * REAL FLASK LOGIN WILL BE CONNECTED HERE.
             *
             * Later:
             *
             * fetch("/login", {
             *     method: "POST",
             *     headers: {
             *         "Content-Type": "application/json"
             *     },
             *     body: JSON.stringify({
             *         role: roleValue,
             *         username: usernameValue,
             *         password: passwordValue
             *     })
             * });
             */



            setTimeout(() => {


                loginButton.classList.remove(
                    "loading"
                );


                loginButton
                    .querySelector("span")
                    .textContent =
                    "Login";


                loginMessage.textContent =
                    "Login interface is ready.";


                loginMessage.style.color =
                    "#1769e0";


            }, 700);

        }
    );



    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    forgotPassword.addEventListener(
        "click",
        (event) => {


            event.preventDefault();


            loginMessage.textContent =
                "Password recovery will be connected later.";


            loginMessage.style.color =
                "#64748b";

        }
    );



    /* =====================================================
       CLEAR ROLE ERROR
    ===================================================== */

    role.addEventListener(
        "change",
        () => {

            removeError("role");

        }
    );



    /* =====================================================
       CLEAR USERNAME ERROR
    ===================================================== */

    username.addEventListener(
        "input",
        () => {

            removeError("username");

        }
    );



    /* =====================================================
       CLEAR PASSWORD ERROR
    ===================================================== */

    password.addEventListener(
        "input",
        () => {

            removeError("password");

        }
    );



    /* =====================================================
       SHOW ERROR
    ===================================================== */

    function showError(field, message) {


        const input =
            document.getElementById(field);


        const error =
            document.getElementById(
                field + "Error"
            );


        input
            .closest(".input-box")
            .classList
            .add("input-error");


        error.textContent =
            message;

    }



    /* =====================================================
       REMOVE ERROR
    ===================================================== */

    function removeError(field) {


        const input =
            document.getElementById(field);


        const error =
            document.getElementById(
                field + "Error"
            );


        input
            .closest(".input-box")
            .classList
            .remove("input-error");


        error.textContent = "";

    }



    /* =====================================================
       CLEAR ALL ERRORS
    ===================================================== */

    function clearErrors() {


        removeError("role");


        removeError("username");


        removeError("password");


        loginMessage.textContent = "";

    }

});