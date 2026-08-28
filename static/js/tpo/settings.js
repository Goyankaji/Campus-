/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - SETTINGS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const navItems =
        document.querySelectorAll(
            ".settings-nav-item"
        );

    const sections =
        document.querySelectorAll(
            ".settings-section"
        );

    const darkModeToggle =
        document.getElementById(
            "settingsDarkMode"
        );

    const changePasswordButton =
        document.getElementById(
            "changePasswordBtn"
        );


    /* =====================================================
       SETTINGS TABS
    ====================================================== */

    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const target =
                    item.dataset.section;


                if (!target) {

                    return;

                }


                /* Remove active from navigation */

                navItems.forEach(
                    function (nav) {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                /* Hide all sections */

                sections.forEach(
                    function (section) {

                        section.classList.remove(
                            "active"
                        );

                    }
                );


                /* Activate selected tab */

                item.classList.add(
                    "active"
                );


                const targetSection =
                    document.querySelector(
                        '[data-section-content="' +
                        target +
                        '"]'
                    );


                if (targetSection) {

                    targetSection.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    /* =====================================================
       PROFILE SAVE
    ====================================================== */

    const profileSaveButton =
        document.querySelector(
            '[data-section-content="profile"] .settings-save-btn'
        );


    if (profileSaveButton) {

        profileSaveButton.addEventListener(
            "click",
            function () {

                showSavedState(
                    profileSaveButton,
                    "Saved"
                );

            }
        );

    }


    /* =====================================================
       DARK MODE
    ====================================================== */

    function applyDarkMode(
        enabled
    ) {

        if (enabled) {

            document.body.classList.add(
                "dark-theme"
            );

        } else {

            document.body.classList.remove(
                "dark-theme"
            );

        }


        localStorage.setItem(
            "tpoDarkMode",
            enabled
                ? "true"
                : "false"
        );

    }


    /* Restore saved theme */

    const savedDarkMode =
        localStorage.getItem(
            "tpoDarkMode"
        );


    if (savedDarkMode === "true") {

        if (darkModeToggle) {

            darkModeToggle.checked =
                true;

        }


        applyDarkMode(
            true
        );

    }


    /* Theme toggle */

    if (darkModeToggle) {

        darkModeToggle.addEventListener(
            "change",
            function () {

                applyDarkMode(
                    darkModeToggle.checked
                );

            }
        );

    }


    /* =====================================================
       ALL SWITCHES
    ====================================================== */

    document
        .querySelectorAll(
            ".settings-switch input"
        )
        .forEach(function (toggle) {

            toggle.addEventListener(
                "change",
                function () {

                    console.log(
                        "Setting changed:",
                        toggle.checked
                    );

                }
            );

        });


    /* =====================================================
       CHANGE PASSWORD
    ====================================================== */

    if (changePasswordButton) {

        changePasswordButton.addEventListener(
            "click",
            function () {

                const securitySection =
                    document.querySelector(
                        '[data-section-content="security"]'
                    );


                if (!securitySection) {

                    return;

                }


                const passwordInputs =
                    securitySection.querySelectorAll(
                        'input[type="password"]'
                    );


                if (
                    passwordInputs.length < 3
                ) {

                    return;

                }


                const currentPassword =
                    passwordInputs[0]
                        .value
                        .trim();


                const newPassword =
                    passwordInputs[1]
                        .value
                        .trim();


                const confirmPassword =
                    passwordInputs[2]
                        .value
                        .trim();


                /* Current password */

                if (!currentPassword) {

                    alert(
                        "Please enter your current password."
                    );

                    passwordInputs[0].focus();

                    return;

                }


                /* New password */

                if (!newPassword) {

                    alert(
                        "Please enter a new password."
                    );

                    passwordInputs[1].focus();

                    return;

                }


                /* Minimum length */

                if (
                    newPassword.length < 8
                ) {

                    alert(
                        "New password must contain at least 8 characters."
                    );

                    passwordInputs[1].focus();

                    return;

                }


                /* Confirm */

                if (!confirmPassword) {

                    alert(
                        "Please confirm your new password."
                    );

                    passwordInputs[2].focus();

                    return;

                }


                /* Match */

                if (
                    newPassword !==
                    confirmPassword
                ) {

                    alert(
                        "New password and confirmation do not match."
                    );

                    passwordInputs[2].focus();

                    return;

                }


                /* Demo frontend success */

                showSavedState(
                    changePasswordButton,
                    "Password Updated"
                );


                passwordInputs.forEach(
                    function (input) {

                        input.value = "";

                    }
                );

            }
        );

    }


    /* =====================================================
       CHANGE PHOTO
    ====================================================== */

    const changePhotoButton =
        document.querySelector(
            ".change-avatar-btn"
        );


    if (changePhotoButton) {

        changePhotoButton.addEventListener(
            "click",
            function () {

                alert(
                    "Profile photo upload will be connected later."
                );

            }
        );

    }


    /* =====================================================
       SAVED STATE
    ====================================================== */

    function showSavedState(
        button,
        text
    ) {

        if (!button) {

            return;

        }


        const originalText =
            button.textContent.trim();


        button.textContent =
            text;


        button.classList.add(
            "saved"
        );


        button.disabled =
            true;


        setTimeout(
            function () {

                button.textContent =
                    originalText;

                button.classList.remove(
                    "saved"
                );

                button.disabled =
                    false;

            },
            1600
        );

    }


    /* =====================================================
       SELECT CHANGE FEEDBACK
    ====================================================== */

    document
        .querySelectorAll(
            ".settings-option select"
        )
        .forEach(function (select) {

            select.addEventListener(
                "change",
                function () {

                    console.log(
                        "Settings selection changed:",
                        select.value
                    );

                }
            );

        });


    /* =====================================================
       COMPACT LAYOUT
    ====================================================== */

    const switches =
        document.querySelectorAll(
            ".settings-switch input"
        );


    /*
     * The Appearance section contains:
     *
     * 1. Dark Mode
     * 2. Compact Layout
     *
     * We identify the second switch specifically.
     */

    if (switches.length >= 2) {

        const compactToggle =
            switches[switches.length - 1];


        compactToggle.addEventListener(
            "change",
            function () {

                document.body.classList.toggle(
                    "compact-mode",
                    compactToggle.checked
                );


                localStorage.setItem(
                    "tpoCompactMode",
                    compactToggle.checked
                        ? "true"
                        : "false"
                );

            }
        );


        const savedCompactMode =
            localStorage.getItem(
                "tpoCompactMode"
            );


        if (
            savedCompactMode ===
            "true"
        ) {

            compactToggle.checked =
                true;


            document.body.classList.add(
                "compact-mode"
            );

        }

    }


    /* =====================================================
       INITIALIZE
    ====================================================== */

    console.log(
        "TPO Settings Page Loaded Successfully"
    );

});