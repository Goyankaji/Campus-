/* =========================================================
   CAMPUS — STUDENT COMMON JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       DARK / LIGHT THEME
    ===================================================== */

    const themeToggle = document.querySelector(
        "[data-theme-toggle]"
    );

    const savedTheme = localStorage.getItem("campus-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "campus-theme",
                isDark ? "dark" : "light"
            );

        });

    }


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const sidebar = document.querySelector(
        ".student-sidebar"
    );

    const sidebarToggle = document.querySelector(
        "[data-sidebar-toggle]"
    );

    const sidebarOverlay = document.querySelector(
        ".student-sidebar-overlay"
    );

    if (sidebarToggle && sidebar) {

        sidebarToggle.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

                if (sidebarOverlay) {
                    sidebarOverlay.classList.toggle("show");
                }

            }
        );

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            function () {

                sidebar.classList.remove("open");

                sidebarOverlay.classList.remove("show");

            }
        );

    }


    /* =====================================================
       PROFILE DROPDOWN
    ===================================================== */

    const profileButton = document.querySelector(
        "[data-profile-toggle]"
    );

    const profileDropdown = document.querySelector(
        "[data-profile-dropdown]"
    );

    if (profileButton && profileDropdown) {

        profileButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                profileDropdown.classList.toggle("show");

            }
        );


        document.addEventListener(
            "click",
            function () {

                profileDropdown.classList.remove("show");

            }
        );

    }


    /* =====================================================
       NOTIFICATION DROPDOWN
    ===================================================== */

    const notificationButton = document.querySelector(
        "[data-notification-toggle]"
    );

    const notificationDropdown = document.querySelector(
        "[data-notification-dropdown]"
    );

    if (
        notificationButton &&
        notificationDropdown
    ) {

        notificationButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                notificationDropdown.classList.toggle(
                    "show"
                );

            }
        );


        document.addEventListener(
            "click",
            function () {

                notificationDropdown.classList.remove(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       CLOSE SIDEBAR AFTER NAVIGATION — MOBILE
    ===================================================== */

    const sidebarLinks = document.querySelectorAll(
        ".student-sidebar a"
    );

    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 800 &&
                    sidebar
                ) {

                    sidebar.classList.remove("open");

                    if (sidebarOverlay) {
                        sidebarOverlay.classList.remove(
                            "show"
                        );
                    }

                }

            }
        );

    });


    /* =====================================================
       GLOBAL ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                if (profileDropdown) {
                    profileDropdown.classList.remove(
                        "show"
                    );
                }

                if (notificationDropdown) {
                    notificationDropdown.classList.remove(
                        "show"
                    );
                }

                if (sidebar) {
                    sidebar.classList.remove("open");
                }

                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove("show");
                }

            }

        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    document.querySelectorAll(
        "[data-current-year]"
    ).forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       LOGOUT BUTTON
    ===================================================== */

    const logoutButtons = document.querySelectorAll(
        "[data-logout]"
    );

    logoutButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const confirmed = confirm(
                    "Are you sure you want to logout?"
                );

                if (confirmed) {

                    window.location.href = "/";

                }

            }
        );

    });

});