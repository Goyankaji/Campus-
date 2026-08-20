document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const loginForm =
        document.getElementById("loginForm");

    const email =
        document.getElementById("email");

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

    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            () => {

                const eyeIcon =
                    document.getElementById("eyeIcon");


                if (password.type === "password") {

                    password.type = "text";

                    togglePassword.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    eyeIcon.innerHTML = `

                        <path d="M3 3L21 21"/>

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

                else {

                    password.type = "password";

                    togglePassword.setAttribute(
                        "aria-label",
                        "Show password"
                    );

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

    }


    /* =====================================================
       LOGIN FORM VALIDATION
    ===================================================== */

    loginForm.addEventListener(
        "submit",
        (event) => {

            clearErrors();

            const emailValue =
                email.value.trim().toLowerCase();

            const passwordValue =
                password.value;


            let isValid = true;


            /* =========================================
               EMAIL VALIDATION
            ========================================== */

            if (!emailValue) {

                showError(
                    "email",
                    "Please enter your email address."
                );

                isValid = false;

            }

            else if (
                !emailValue.endsWith("@poornima.org")
            ) {

                showError(
                    "email",
                    "Only @poornima.org email addresses are allowed."
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
               STOP INVALID FORM
            ========================================== */

            if (!isValid) {

                event.preventDefault();

                return;

            }


            /* =========================================
               REAL FLASK SUBMISSION
               
               IMPORTANT:
               We DO NOT use preventDefault here.
               
               Browser will submit:
               
               POST /login
               
               Flask will verify:
               - email
               - password
               - account status
               - role
            ========================================== */

            loginButton.classList.add(
                "loading"
            );

            loginButton
                .querySelector("span")
                .textContent =
                "Signing in...";

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
                "Password recovery will be available soon.";

            loginMessage.style.color =
                "#64748b";

        }
    );


    /* =====================================================
       CLEAR EMAIL ERROR
    ===================================================== */

    email.addEventListener(
        "input",
        () => {

            removeError("email");

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

        removeError("email");

        removeError("password");

        loginMessage.textContent = "";

    }

});