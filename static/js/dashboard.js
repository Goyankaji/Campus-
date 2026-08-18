/* =========================================================
   CAMPUS PLACEMENT PORTAL
   STUDENT DASHBOARD
========================================================= */


/*
   IMPORTANT:
   Prevent dashboard.js from initializing twice.
*/

if (!window.studentDashboardInitialized) {

    window.studentDashboardInitialized = true;


    document.addEventListener("DOMContentLoaded", function () {


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const themeToggle =
            document.getElementById("themeToggle");

        const topThemeToggle =
            document.getElementById("topThemeToggle");

        const themeIcon =
            document.getElementById("themeIcon");

        const themeText =
            document.getElementById("themeText");

        const sidebar =
            document.getElementById("sidebar");

        const menuToggle =
            document.getElementById("menuToggle");

        const searchInput =
            document.getElementById("dashboardSearch");


        /* =====================================================
           THEME FUNCTION
        ===================================================== */

        function setTheme(theme) {

            if (theme === "dark") {

                document.body.classList.add("dark-theme");

                if (themeIcon) {
                    themeIcon.textContent = "☀";
                }

                if (themeText) {
                    themeText.textContent =
                        "Switch to Light Mode";
                }

                if (topThemeToggle) {
                    topThemeToggle.textContent = "☀";
                }

                localStorage.setItem(
                    "campusTheme",
                    "dark"
                );

            }

            else {

                document.body.classList.remove(
                    "dark-theme"
                );

                if (themeIcon) {
                    themeIcon.textContent = "☾";
                }

                if (themeText) {
                    themeText.textContent =
                        "Switch to Dark Mode";
                }

                if (topThemeToggle) {
                    topThemeToggle.textContent = "☼";
                }

                localStorage.setItem(
                    "campusTheme",
                    "light"
                );
            }
        }


        /* =====================================================
           LOAD SAVED THEME
        ===================================================== */

        const savedTheme =
            localStorage.getItem("campusTheme");

        if (savedTheme === "dark") {

            setTheme("dark");

        } else {

            setTheme("light");

        }


        /* =====================================================
           SIDEBAR THEME BUTTON
        ===================================================== */

        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    const dark =
                        document.body.classList.contains(
                            "dark-theme"
                        );

                    setTheme(
                        dark ? "light" : "dark"
                    );

                }
            );

        }


        /* =====================================================
           TOP HEADER THEME BUTTON
        ===================================================== */

        if (topThemeToggle) {

            topThemeToggle.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    const dark =
                        document.body.classList.contains(
                            "dark-theme"
                        );

                    setTheme(
                        dark ? "light" : "dark"
                    );

                }
            );

        }


        /* =====================================================
           MOBILE SIDEBAR
        ===================================================== */

        if (menuToggle && sidebar) {

            menuToggle.addEventListener(
                "click",
                function () {

                    sidebar.classList.toggle("open");

                }
            );

        }


        /* =====================================================
           MOBILE NAVIGATION
        ===================================================== */

        document
            .querySelectorAll(".nav-item")
            .forEach(function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        if (
                            window.innerWidth <= 900 &&
                            sidebar
                        ) {

                            sidebar.classList.remove(
                                "open"
                            );

                        }

                    }
                );

            });


        /* =====================================================
           SEARCH
        ===================================================== */

        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        const value =
                            searchInput.value.trim();

                        if (value !== "") {

                            console.log(
                                "Searching for:",
                                value
                            );

                        }

                    }

                }
            );

        }


        /* =====================================================
           CTRL + K
        ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    (event.ctrlKey || event.metaKey) &&
                    event.key.toLowerCase() === "k"
                ) {

                    event.preventDefault();

                    if (searchInput) {
                        searchInput.focus();
                    }

                }

            }
        );


        /* =====================================================
           VIEW ALL
        ===================================================== */

        document
            .querySelectorAll(".view-all")
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const heading =
                            button
                                .parentElement
                                ?.querySelector("h2");

                        console.log(
                            "View All:",
                            heading
                                ? heading.textContent
                                : ""
                        );

                    }
                );

            });


        /* =====================================================
           PREPARATION
        ===================================================== */

        document
            .querySelectorAll(".prep-item")
            .forEach(function (item) {

                item.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        const title =
                            item.querySelector("strong");

                        console.log(
                            "Preparation:",
                            title
                                ? title.textContent
                                : ""
                        );

                    }
                );

            });


        /* =====================================================
           NOTIFICATIONS
        ===================================================== */

        const notificationButton =
            document.querySelector(
                ".notification-button"
            );

        if (notificationButton) {

            notificationButton.addEventListener(
                "click",
                function () {

                    console.log(
                        "Notifications clicked"
                    );

                }
            );

        }


        /* =====================================================
           WINDOW RESIZE
        ===================================================== */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 900 &&
                    sidebar
                ) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }
        );


        /* =====================================================
           CONFIRM JS
        ===================================================== */

        console.log(
            "Student Dashboard JS Loaded Successfully - ONE TIME"
        );

    });

}