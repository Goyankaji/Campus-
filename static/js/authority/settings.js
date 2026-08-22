/* =========================================================
   AUTHORITY — SETTINGS JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const settingsNavItems =
    document.querySelectorAll(
        ".settings-nav-item"
    );

const settingsSections =
    document.querySelectorAll(
        ".settings-section"
    );

const settingsToast =
    document.getElementById(
        "settingsToast"
    );


/* =========================================================
   SHOW TOAST
========================================================= */

function showSettingsToast(
    message = "Your changes have been saved successfully."
) {

    if (!settingsToast) {
        return;
    }


    const strong =
        settingsToast.querySelector(
            "strong"
        );

    const small =
        settingsToast.querySelector(
            "small"
        );


    if (strong) {

        strong.textContent =
            "Settings saved";

    }


    if (small) {

        small.textContent =
            message;

    }


    settingsToast.classList.add(
        "show"
    );


    clearTimeout(
        window.settingsToastTimer
    );


    window.settingsToastTimer =
        setTimeout(
            function () {

                settingsToast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   SETTINGS NAVIGATION
========================================================= */

settingsNavItems.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const sectionName =
                    button.dataset.section;


                settingsNavItems.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                settingsSections.forEach(
                    function (section) {

                        section.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const targetSection =
                    document.getElementById(
                        `settings-${sectionName}`
                    );


                if (targetSection) {

                    targetSection.classList.add(
                        "active"
                    );

                }


                localStorage.setItem(
                    "authoritySettingsSection",
                    sectionName
                );

            }
        );

    }
);


/* =========================================================
   RESTORE LAST SETTINGS SECTION
========================================================= */

const savedSettingsSection =
    localStorage.getItem(
        "authoritySettingsSection"
    );


if (savedSettingsSection) {

    const savedButton =
        document.querySelector(
            `.settings-nav-item[data-section="${savedSettingsSection}"]`
        );


    if (savedButton) {

        savedButton.click();

    }

}


/* =========================================================
   ACCOUNT SAVE
========================================================= */

const accountSaveBtn =
    document.getElementById(
        "accountSaveBtn"
    );


if (accountSaveBtn) {

    accountSaveBtn.addEventListener(
        "click",
        function () {

            const name =
                document.getElementById(
                    "authorityName"
                );

            const designation =
                document.getElementById(
                    "authorityDesignation"
                );


            if (
                name &&
                !name.value.trim()
            ) {

                alert(
                    "Please enter your name."
                );

                name.focus();

                return;

            }


            if (
                designation &&
                !designation.value.trim()
            ) {

                alert(
                    "Please enter your designation."
                );

                designation.focus();

                return;

            }


            showSettingsToast(
                "Your account information has been updated."
            );

        }
    );

}


/* =========================================================
   ACCOUNT RESET
========================================================= */

const accountResetBtn =
    document.getElementById(
        "accountResetBtn"
    );


if (accountResetBtn) {

    accountResetBtn.addEventListener(
        "click",
        function () {

            const name =
                document.getElementById(
                    "authorityName"
                );

            const designation =
                document.getElementById(
                    "authorityDesignation"
                );

            const email =
                document.getElementById(
                    "authorityEmail"
                );

            const phone =
                document.getElementById(
                    "authorityPhone"
                );


            if (name) {

                name.value =
                    "College Authority";

            }


            if (designation) {

                designation.value =
                    "Principal / Director";

            }


            if (email) {

                email.value =
                    "authority@poornima.org";

            }


            if (phone) {

                phone.value =
                    "+91 98765 43210";

            }


            showSettingsToast(
                "Account fields have been reset."
            );

        }
    );

}


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

document
    .querySelectorAll(
        ".password-toggle"
    )
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const targetId =
                        button.dataset.target;


                    const input =
                        document.getElementById(
                            targetId
                        );


                    if (!input) {
                        return;
                    }


                    if (
                        input.type ===
                        "password"
                    ) {

                        input.type =
                            "text";

                        button.textContent =
                            "◌";

                    } else {

                        input.type =
                            "password";

                        button.textContent =
                            "◉";

                    }

                }
            );

        }
    );


/* =========================================================
   CHANGE PASSWORD
========================================================= */

const changePasswordBtn =
    document.getElementById(
        "changePasswordBtn"
    );


if (changePasswordBtn) {

    changePasswordBtn.addEventListener(
        "click",
        function () {

            const currentPassword =
                document.getElementById(
                    "currentPassword"
                );

            const newPassword =
                document.getElementById(
                    "newPassword"
                );

            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                );


            if (
                !currentPassword.value
            ) {

                alert(
                    "Please enter your current password."
                );

                currentPassword.focus();

                return;

            }


            if (
                !newPassword.value
            ) {

                alert(
                    "Please enter a new password."
                );

                newPassword.focus();

                return;

            }


            if (
                newPassword.value.length < 8
            ) {

                alert(
                    "New password must contain at least 8 characters."
                );

                newPassword.focus();

                return;

            }


            if (
                newPassword.value !==
                confirmPassword.value
            ) {

                alert(
                    "New password and confirmation password do not match."
                );

                confirmPassword.focus();

                return;

            }


            showSettingsToast(
                "Password update request completed."
            );


            currentPassword.value =
                "";

            newPassword.value =
                "";

            confirmPassword.value =
                "";

        }
    );

}


/* =========================================================
   NOTIFICATION SAVE
========================================================= */

const notificationSaveBtn =
    document.getElementById(
        "notificationSaveBtn"
    );


if (notificationSaveBtn) {

    notificationSaveBtn.addEventListener(
        "click",
        function () {

            showSettingsToast(
                "Notification preferences have been saved."
            );

        }
    );

}


/* =========================================================
   THEME OPTIONS
========================================================= */

const themeOptions =
    document.querySelectorAll(
        ".theme-option"
    );


function updateThemeOptionState(
    theme
) {

    themeOptions.forEach(
        function (button) {

            button.classList.toggle(
                "active",
                button.dataset.themeOption ===
                theme
            );

        }
    );

}


let currentAuthorityTheme =
    document.body.classList.contains(
        "dark-theme"
    )
        ? "dark"
        : "light";


updateThemeOptionState(
    currentAuthorityTheme
);


themeOptions.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedTheme =
                    button.dataset.themeOption;


                if (
                    typeof applyAuthorityTheme ===
                    "function"
                ) {

                    applyAuthorityTheme(
                        selectedTheme
                    );

                } else {

                    if (
                        selectedTheme ===
                        "dark"
                    ) {

                        document.body.classList.add(
                            "dark-theme"
                        );

                    } else {

                        document.body.classList.remove(
                            "dark-theme"
                        );

                    }

                    localStorage.setItem(
                        "authorityTheme",
                        selectedTheme
                    );

                }


                updateThemeOptionState(
                    selectedTheme
                );


                showSettingsToast(
                    `${selectedTheme === "dark" ? "Dark" : "Light"} theme selected.`
                );

            }
        );

    }
);


/* =========================================================
   COMPACT MODE
========================================================= */

const compactModeToggle =
    document.getElementById(
        "compactModeToggle"
    );


if (compactModeToggle) {

    const savedCompactMode =
        localStorage.getItem(
            "authorityCompactMode"
        ) === "true";


    compactModeToggle.checked =
        savedCompactMode;


    document.body.classList.toggle(
        "compact-settings-mode",
        savedCompactMode
    );


    compactModeToggle.addEventListener(
        "change",
        function () {

            const enabled =
                compactModeToggle.checked;


            document.body.classList.toggle(
                "compact-settings-mode",
                enabled
            );


            localStorage.setItem(
                "authorityCompactMode",
                enabled
            );

        }
    );

}


/* =========================================================
   ANIMATIONS
========================================================= */

const animationsToggle =
    document.getElementById(
        "animationsToggle"
    );


if (animationsToggle) {

    const savedAnimations =
        localStorage.getItem(
            "authorityAnimations"
        );


    if (savedAnimations !== null) {

        animationsToggle.checked =
            savedAnimations === "true";

    }


    animationsToggle.addEventListener(
        "change",
        function () {

            const enabled =
                animationsToggle.checked;


            localStorage.setItem(
                "authorityAnimations",
                enabled
            );


            document.body.classList.toggle(
                "disable-authority-animations",
                !enabled
            );

        }
    );

}


/* =========================================================
   PORTAL SAVE
========================================================= */

const portalSaveBtn =
    document.getElementById(
        "portalSaveBtn"
    );


if (portalSaveBtn) {

    portalSaveBtn.addEventListener(
        "click",
        function () {

            const academicYear =
                document.getElementById(
                    "academicYear"
                );

            const dashboardView =
                document.getElementById(
                    "dashboardView"
                );

            const notificationView =
                document.getElementById(
                    "notificationView"
                );

            const recordsPerPage =
                document.getElementById(
                    "recordsPerPage"
                );


            localStorage.setItem(
                "authorityAcademicYear",
                academicYear.value
            );

            localStorage.setItem(
                "authorityDashboardView",
                dashboardView.value
            );

            localStorage.setItem(
                "authorityNotificationView",
                notificationView.value
            );

            localStorage.setItem(
                "authorityRecordsPerPage",
                recordsPerPage.value
            );


            showSettingsToast(
                "Portal preferences have been saved."
            );

        }
    );

}


/* =========================================================
   RESTORE PORTAL SETTINGS
========================================================= */

const academicYear =
    document.getElementById(
        "academicYear"
    );

const dashboardView =
    document.getElementById(
        "dashboardView"
    );

const notificationView =
    document.getElementById(
        "notificationView"
    );

const recordsPerPage =
    document.getElementById(
        "recordsPerPage"
    );


const savedAcademicYear =
    localStorage.getItem(
        "authorityAcademicYear"
    );

const savedDashboardView =
    localStorage.getItem(
        "authorityDashboardView"
    );

const savedNotificationView =
    localStorage.getItem(
        "authorityNotificationView"
    );

const savedRecordsPerPage =
    localStorage.getItem(
        "authorityRecordsPerPage"
    );


if (
    academicYear &&
    savedAcademicYear
) {

    academicYear.value =
        savedAcademicYear;

}


if (
    dashboardView &&
    savedDashboardView
) {

    dashboardView.value =
        savedDashboardView;

}


if (
    notificationView &&
    savedNotificationView
) {

    notificationView.value =
        savedNotificationView;

}


if (
    recordsPerPage &&
    savedRecordsPerPage
) {

    recordsPerPage.value =
        savedRecordsPerPage;

}


/* =========================================================
   RESET PORTAL
========================================================= */

const resetPortalBtn =
    document.getElementById(
        "resetPortalBtn"
    );


if (resetPortalBtn) {

    resetPortalBtn.addEventListener(
        "click",
        function () {

            const confirmed =
                confirm(
                    "Are you sure you want to reset portal preferences?"
                );


            if (!confirmed) {
                return;
            }


            localStorage.removeItem(
                "authorityAcademicYear"
            );

            localStorage.removeItem(
                "authorityDashboardView"
            );

            localStorage.removeItem(
                "authorityNotificationView"
            );

            localStorage.removeItem(
                "authorityRecordsPerPage"
            );


            if (academicYear) {

                academicYear.selectedIndex =
                    0;

            }


            if (dashboardView) {

                dashboardView.selectedIndex =
                    0;

            }


            if (notificationView) {

                notificationView.selectedIndex =
                    0;

            }


            if (recordsPerPage) {

                recordsPerPage.selectedIndex =
                    0;

            }


            showSettingsToast(
                "Portal preferences have been reset."
            );

        }
    );

}