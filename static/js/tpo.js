/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO DASHBOARD JAVASCRIPT
========================================================= */


/* Prevent duplicate initialization */

if (!window.tpoDashboardInitialized) {

    window.tpoDashboardInitialized = true;


    document.addEventListener(
        "DOMContentLoaded",
        function () {


            /* =================================================
               ELEMENTS
            ================================================= */

            const themeToggle =
                document.getElementById(
                    "themeToggle"
                );


            const topThemeToggle =
                document.getElementById(
                    "topThemeToggle"
                );


            const themeIcon =
                document.getElementById(
                    "themeIcon"
                );


            const themeText =
                document.getElementById(
                    "themeText"
                );


            const sidebar =
                document.getElementById(
                    "sidebar"
                );


            const menuToggle =
                document.getElementById(
                    "menuToggle"
                );


            const searchInput =
                document.getElementById(
                    "tpoSearch"
                );


            /* =================================================
               THEME
            ================================================= */

            function setTheme(theme) {


                if (theme === "dark") {

                    document.body.classList.add(
                        "dark-theme"
                    );


                    if (themeIcon) {

                        themeIcon.textContent =
                            "☀";

                    }


                    if (themeText) {

                        themeText.textContent =
                            "Light Mode";

                    }


                    if (topThemeToggle) {

                        topThemeToggle.textContent =
                            "☀";

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

                        themeIcon.textContent =
                            "☾";

                    }


                    if (themeText) {

                        themeText.textContent =
                            "Dark Mode";

                    }


                    if (topThemeToggle) {

                        topThemeToggle.textContent =
                            "☼";

                    }


                    localStorage.setItem(
                        "campusTheme",
                        "light"
                    );

                }

            }


            /* =================================================
               LOAD SAVED THEME
            ================================================= */

            const savedTheme =
                localStorage.getItem(
                    "campusTheme"
                ) || "light";


            setTheme(savedTheme);


            /* =================================================
               SIDEBAR THEME
            ================================================= */

            if (themeToggle) {

                themeToggle.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const isDark =
                            document.body.classList.contains(
                                "dark-theme"
                            );


                        setTheme(
                            isDark
                                ? "light"
                                : "dark"
                        );

                    }
                );

            }


            /* =================================================
               HEADER THEME
            ================================================= */

            if (topThemeToggle) {

                topThemeToggle.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const isDark =
                            document.body.classList.contains(
                                "dark-theme"
                            );


                        setTheme(
                            isDark
                                ? "light"
                                : "dark"
                        );

                    }
                );

            }


            /* =================================================
               MOBILE SIDEBAR
            ================================================= */

            if (
                menuToggle &&
                sidebar
            ) {

                menuToggle.addEventListener(
                    "click",
                    function () {

                        sidebar.classList.toggle(
                            "open"
                        );

                    }
                );

            }


            /* =================================================
               NAVIGATION
            ================================================= */

            document
                .querySelectorAll(".nav-item")
                .forEach(function (item) {

                    item.addEventListener(
                        "click",
                        function () {

                            document
                                .querySelectorAll(
                                    ".nav-item"
                                )
                                .forEach(
                                    function (nav) {

                                        nav.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                            item.classList.add(
                                "active"
                            );


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


            /* =================================================
               SEARCH
            ================================================= */

            if (searchInput) {

                searchInput.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter"
                        ) {

                            const value =
                                searchInput.value.trim();


                            if (value !== "") {

                                console.log(
                                    "TPO Search:",
                                    value
                                );

                            }

                        }

                    }
                );

            }


            /* =================================================
               CTRL + K
            ================================================= */

            document.addEventListener(
                "keydown",
                function (event) {

                    if (
                        (event.ctrlKey ||
                         event.metaKey) &&
                        event.key.toLowerCase() === "k"
                    ) {

                        event.preventDefault();


                        if (searchInput) {

                            searchInput.focus();

                        }

                    }

                }
            );


            /* =================================================
               VIEW ALL
            ================================================= */

            document
                .querySelectorAll(".view-all")
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const heading =
                                button
                                    .closest(
                                        ".dashboard-card"
                                    )
                                    ?.querySelector(
                                        "h2"
                                    );


                            console.log(
                                "View All:",
                                heading
                                    ? heading.textContent
                                    : ""
                            );

                        }
                    );

                });


            /* =================================================
               QUICK ACTIONS
            ================================================= */

            document
                .querySelectorAll(
                    ".quick-action"
                )
                .forEach(function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const action =
                                button.querySelector(
                                    "strong"
                                );


                            console.log(
                                "Quick Action:",
                                action
                                    ? action.textContent
                                    : ""
                            );

                        }
                    );

                });


            /* =================================================
               WINDOW RESIZE
            ================================================= */

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


            console.log(
                "TPO Dashboard JS Loaded Successfully"
            );

        }
    );

}