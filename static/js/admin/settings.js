document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navItems =
        document.querySelectorAll(
            ".settings-nav-item"
        );

    const sections =
        document.querySelectorAll(
            ".settings-section"
        );

    const saveButton =
        document.getElementById(
            "saveSettings"
        );

    const resetButton =
        document.getElementById(
            "resetSettings"
        );

    const saveIndicator =
        document.getElementById(
            "saveIndicator"
        );


    const passwordModal =
        document.getElementById(
            "passwordModal"
        );

    const changePasswordButton =
        document.getElementById(
            "changePasswordBtn"
        );

    const closePasswordButton =
        document.getElementById(
            "closePasswordModal"
        );

    const cancelPasswordButton =
        document.getElementById(
            "cancelPassword"
        );

    const passwordOverlay =
        document.querySelector(
            ".settings-modal-overlay"
        );

    const passwordForm =
        document.getElementById(
            "passwordForm"
        );


    const logoutButton =
        document.getElementById(
            "logoutSettingsBtn"
        );


    /* =====================================================
       NAVIGATION
    ===================================================== */

    navItems.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const target =
                    this.dataset.section;


                navItems.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                sections.forEach(
                    function (section) {

                        section.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                const targetSection =
                    document.querySelector(
                        `[data-settings-section="${target}"]`
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
       SAVE
    ===================================================== */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                saveButton.disabled = true;

                saveButton.textContent =
                    "Saving...";


                setTimeout(
                    function () {

                        saveButton.disabled =
                            false;

                        saveButton.textContent =
                            "Save Changes";


                        if (saveIndicator) {

                            saveIndicator.innerHTML =
                                `
                                <span></span>
                                Changes saved
                                `;

                        }

                        showToast(
                            "Settings saved successfully."
                        );

                    },
                    700
                );

            }
        );

    }


    /* =====================================================
       RESET
    ===================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    window.confirm(
                        "Reset all settings to their default values?"
                    );


                if (!confirmed) {
                    return;
                }


                resetSettings();

                showToast(
                    "Settings reset to default."
                );

            }
        );

    }


    function resetSettings() {

        const compactSidebar =
            document.getElementById(
                "compactSidebar"
            );

        const confirmDelete =
            document.getElementById(
                "confirmDelete"
            );

        const autoRefresh =
            document.getElementById(
                "autoRefresh"
            );

        const notifyDrive =
            document.getElementById(
                "notifyDrive"
            );

        const notifyFeedback =
            document.getElementById(
                "notifyFeedback"
            );

        const notifyVerification =
            document.getElementById(
                "notifyVerification"
            );

        const notifySystem =
            document.getElementById(
                "notifySystem"
            );

        const loginAlerts =
            document.getElementById(
                "loginAlerts"
            );


        if (compactSidebar) {
            compactSidebar.checked = false;
        }

        if (confirmDelete) {
            confirmDelete.checked = true;
        }

        if (autoRefresh) {
            autoRefresh.checked = false;
        }

        if (notifyDrive) {
            notifyDrive.checked = true;
        }

        if (notifyFeedback) {
            notifyFeedback.checked = true;
        }

        if (notifyVerification) {
            notifyVerification.checked = true;
        }

        if (notifySystem) {
            notifySystem.checked = true;
        }

        if (loginAlerts) {
            loginAlerts.checked = true;
        }


        const academicYear =
            document.getElementById(
                "academicYear"
            );

        const defaultCollege =
            document.getElementById(
                "defaultCollege"
            );

        const notificationFrequency =
            document.getElementById(
                "notificationFrequency"
            );

        const sessionTimeout =
            document.getElementById(
                "sessionTimeout"
            );


        if (academicYear) {
            academicYear.value =
                "2026-27";
        }

        if (defaultCollege) {
            defaultCollege.value =
                "all";
        }

        if (notificationFrequency) {
            notificationFrequency.value =
                "instant";
        }

        if (sessionTimeout) {
            sessionTimeout.value =
                "60";
        }

    }


    /* =====================================================
       PASSWORD MODAL
    ===================================================== */

    function openPasswordModal() {

        passwordModal.classList.add(
            "open"
        );

        passwordModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closePasswordModal() {

        passwordModal.classList.remove(
            "open"
        );

        passwordModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (changePasswordButton) {

        changePasswordButton.addEventListener(
            "click",
            openPasswordModal
        );

    }


    if (closePasswordButton) {

        closePasswordButton.addEventListener(
            "click",
            closePasswordModal
        );

    }


    if (cancelPasswordButton) {

        cancelPasswordButton.addEventListener(
            "click",
            closePasswordModal
        );

    }


    if (passwordOverlay) {

        passwordOverlay.addEventListener(
            "click",
            closePasswordModal
        );

    }


    /* =====================================================
       PASSWORD SUBMIT
    ===================================================== */

    if (passwordForm) {

        passwordForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const currentPassword =
                    document.getElementById(
                        "currentPassword"
                    ).value;


                const newPassword =
                    document.getElementById(
                        "newPassword"
                    ).value;


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value;


                if (
                    !currentPassword ||
                    !newPassword ||
                    !confirmPassword
                ) {

                    showToast(
                        "Please fill all password fields."
                    );

                    return;

                }


                if (
                    newPassword.length < 6
                ) {

                    showToast(
                        "New password must contain at least 6 characters."
                    );

                    return;

                }


                if (
                    newPassword !==
                    confirmPassword
                ) {

                    showToast(
                        "Passwords do not match."
                    );

                    return;

                }


                closePasswordModal();

                passwordForm.reset();


                showToast(
                    "Password updated successfully."
                );

            }
        );

    }


    /* =====================================================
       LOGOUT
    ===================================================== */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    window.confirm(
                        "Do you want to logout from the admin session?"
                    );


                if (!confirmed) {
                    return;
                }


                window.location.href =
                    "/admin/logout";

            }
        );

    }


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                passwordModal.classList.contains(
                    "open"
                )
            ) {

                closePasswordModal();

            }

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        const existing =
            document.querySelector(
                ".settings-toast"
            );


        if (existing) {
            existing.remove();
        }


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "settings-toast";


        toast.textContent =
            message;


        document.body.appendChild(
            toast
        );


        requestAnimationFrame(
            function () {

                toast.classList.add(
                    "show"
                );

            }
        );


        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );


                setTimeout(
                    function () {

                        toast.remove();

                    },
                    250
                );

            },
            2200
        );

    }


});