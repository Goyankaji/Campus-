/* =========================================================
   CAMPUS PLACEMENT PORTAL
   HOD COMMON JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeHodTheme();

        initializeHodSidebar();

        initializeHodSearch();

        initializeHodNotifications();

        initializeHodLogout();

    }
);


/* =========================================================
   THEME
========================================================= */

function initializeHodTheme() {

    const savedTheme =
        localStorage.getItem("hodTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    updateHodThemeIcon();


    const themeButton =
        document.getElementById(
            "hodThemeToggle"
        );


    if (!themeButton) {

        return;

    }


    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "hodTheme",
                isDark ? "dark" : "light"
            );


            updateHodThemeIcon();

        }
    );

}


/* =========================================================
   UPDATE THEME ICON
========================================================= */

function updateHodThemeIcon() {

    const button =
        document.getElementById(
            "hodThemeToggle"
        );


    if (!button) {

        return;

    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    button.textContent =
        isDark ? "☀" : "☼";

}


/* =========================================================
   SIDEBAR
========================================================= */

function initializeHodSidebar() {

    const sidebar =
        document.getElementById(
            "hodSidebar"
        );


    const menu =
        document.getElementById(
            "hodMobileMenu"
        );


    const overlay =
        document.getElementById(
            "hodSidebarOverlay"
        );


    if (
        !sidebar ||
        !menu
    ) {

        return;

    }


    menu.addEventListener(
        "click",
        function () {

            toggleHodSidebar();

        }
    );


    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeHodSidebar();

            }
        );

    }


    document
        .querySelectorAll(".hod-nav")
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        setActiveHodNavigation(
                            this
                        );


                        closeHodSidebar();

                    }
                );

            }
        );

}


/* =========================================================
   OPEN / CLOSE SIDEBAR
========================================================= */

function toggleHodSidebar() {

    const sidebar =
        document.getElementById(
            "hodSidebar"
        );


    const overlay =
        document.getElementById(
            "hodSidebarOverlay"
        );


    if (!sidebar) {

        return;

    }


    sidebar.classList.toggle("open");


    if (overlay) {

        overlay.classList.toggle(
            "active",
            sidebar.classList.contains("open")
        );

    }

}


function closeHodSidebar() {

    const sidebar =
        document.getElementById(
            "hodSidebar"
        );


    const overlay =
        document.getElementById(
            "hodSidebarOverlay"
        );


    if (sidebar) {

        sidebar.classList.remove(
            "open"
        );

    }


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function setActiveHodNavigation(
    selectedLink
) {

    document
        .querySelectorAll(".hod-nav")
        .forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );

            }
        );


    if (selectedLink) {

        selectedLink.classList.add(
            "active"
        );

    }

}


/* =========================================================
   SEARCH
========================================================= */

function initializeHodSearch() {

    const search =
        document.getElementById(
            "hodGlobalSearch"
        );


    if (!search) {

        return;

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                search.focus();

            }

        }
    );


    search.addEventListener(
        "input",
        function () {

            const value =
                this.value
                    .trim()
                    .toLowerCase();


            if (!value) {

                return;

            }


            /*
             * STATIC PHASE
             *
             * Search functionality will be
             * connected to actual student data
             * during the dynamic/database phase.
             */

            console.log(
                "HOD Search:",
                value
            );

        }
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

function initializeHodNotifications() {

    const button =
        document.getElementById(
            "hodNotificationButton"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        function () {

            /*
             * STATIC PHASE
             *
             * Notification panel will be
             * connected later.
             */

            console.log(
                "HOD notifications opened"
            );

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

function initializeHodLogout() {

    const logout =
        document.getElementById(
            "hodLogout"
        );


    if (!logout) {

        return;

    }


    logout.addEventListener(
        "click",
        function (event) {

            /*
             * STATIC PHASE
             *
             * Actual logout route will be
             * connected during Flask integration.
             */

            event.preventDefault();

            console.log(
                "HOD logout clicked"
            );

        }
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeHodSidebar();

        }

    }
);