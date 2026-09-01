/* =========================================================
   CAMPUS — MENTOR SETTINGS JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const compactSidebarToggle =
        document.getElementById(
            "compactSidebarToggle"
        );

    const rememberPageToggle =
        document.getElementById(
            "rememberPageToggle"
        );

    const notificationBadgeToggle =
        document.getElementById(
            "notificationBadgeToggle"
        );

    const changePasswordButton =
        document.getElementById(
            "changePasswordButton"
        );


    /* =====================================================
       STORAGE HELPERS
    ===================================================== */

    function getPreference(key, fallback) {

        const value =
            localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return value === "true";

    }


    function savePreference(key, value) {

        localStorage.setItem(
            key,
            value ? "true" : "false"
        );

    }


    /* =====================================================
       COMPACT SIDEBAR
    ===================================================== */

    if (compactSidebarToggle) {

        compactSidebarToggle.checked =
            getPreference(
                "mentorCompactSidebar",
                false
            );


        compactSidebarToggle.addEventListener(
            "change",
            function () {

                const enabled =
                    compactSidebarToggle.checked;


                savePreference(
                    "mentorCompactSidebar",
                    enabled
                );


                document.body.classList.toggle(
                    "mentor-sidebar-compact",
                    enabled
                );

            }
        );


        if (
            compactSidebarToggle.checked
        ) {

            document.body.classList.add(
                "mentor-sidebar-compact"
            );

        }

    }


    /* =====================================================
       REMEMBER LAST PAGE
    ===================================================== */

    if (rememberPageToggle) {

        rememberPageToggle.checked =
            getPreference(
                "mentorRememberPage",
                true
            );


        rememberPageToggle.addEventListener(
            "change",
            function () {

                savePreference(
                    "mentorRememberPage",
                    rememberPageToggle.checked
                );

            }
        );

    }


    /* =====================================================
       NOTIFICATION BADGE
    ===================================================== */

    if (notificationBadgeToggle) {

        notificationBadgeToggle.checked =
            getPreference(
                "mentorNotificationBadge",
                true
            );


        notificationBadgeToggle.addEventListener(
            "change",
            function () {

                const enabled =
                    notificationBadgeToggle.checked;


                savePreference(
                    "mentorNotificationBadge",
                    enabled
                );


                document
                    .querySelectorAll(
                        ".mentor-navigation .badge"
                    )
                    .forEach(
                        function (badge) {

                            badge.style.display =
                                enabled
                                    ? ""
                                    : "none";

                        }
                    );

            }
        );


        if (
            !notificationBadgeToggle.checked
        ) {

            document
                .querySelectorAll(
                    ".mentor-navigation .badge"
                )
                .forEach(
                    function (badge) {

                        badge.style.display =
                            "none";

                    }
                );

        }

    }


    /* =====================================================
       CHANGE PASSWORD
    ===================================================== */

    if (changePasswordButton) {

        changePasswordButton.addEventListener(
            "click",
            function () {

                /*
                 * Password change should eventually
                 * be handled by a secure Flask route.
                 *
                 * Do not collect or store passwords
                 * inside localStorage.
                 */

                const passwordRoute =
                    changePasswordButton.dataset.route;


                if (passwordRoute) {

                    window.location.href =
                        passwordRoute;

                    return;

                }


                alert(
                    "Password change is managed by the secure account system."
                );

            }
        );

    }


    /* =====================================================
       REMEMBER CURRENT MENTOR PAGE
    ===================================================== */

    function rememberCurrentPage() {

        const enabled =
            getPreference(
                "mentorRememberPage",
                true
            );


        if (!enabled) {
            return;
        }


        const currentPath =
            window.location.pathname;


        if (
            currentPath.startsWith(
                "/mentor/"
            )
        ) {

            localStorage.setItem(
                "mentorLastPage",
                currentPath
            );

        }

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    rememberCurrentPage();

});