/* =========================================================
   CAMPUS — MENTOR COMMON JS
   Shared functionality for Mentor Portal

   FIX:
   - Dark mode flash prevention
   - Mobile sidebar
   - Global search
   - Saved sidebar state
========================================================= */


/* =========================================================
   1. INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeMobileSidebar();

    initializeSavedThemeState();

    initializeGlobalSearch();

    initializeSavedSidebarState();

});


/* =========================================================
   2. MOBILE SIDEBAR
========================================================= */

function initializeMobileSidebar() {

    const sidebar =
        document.getElementById("mentorSidebar");

    const toggle =
        document.getElementById("mobileSidebarToggle");


    if (!sidebar || !toggle) {
        return;
    }


    /* -----------------------------------------------------
       CREATE OVERLAY
    ----------------------------------------------------- */

    let overlay =
        document.querySelector(".sidebar-overlay");


    if (!overlay) {

        overlay =
            document.createElement("div");

        overlay.className =
            "sidebar-overlay";

        document.body.appendChild(
            overlay
        );

    }


    /* -----------------------------------------------------
       OPEN SIDEBAR
    ----------------------------------------------------- */

    function openSidebar() {

        sidebar.classList.add(
            "mobile-open"
        );

        overlay.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";

    }


    /* -----------------------------------------------------
       CLOSE SIDEBAR
    ----------------------------------------------------- */

    function closeSidebar() {

        sidebar.classList.remove(
            "mobile-open"
        );

        overlay.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    /* -----------------------------------------------------
       TOGGLE
    ----------------------------------------------------- */

    toggle.addEventListener(
        "click",
        function () {

            if (
                sidebar.classList.contains(
                    "mobile-open"
                )
            ) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );


    /* -----------------------------------------------------
       OVERLAY CLICK
    ----------------------------------------------------- */

    overlay.addEventListener(
        "click",
        closeSidebar
    );


    /* -----------------------------------------------------
       NAVIGATION CLICK
    ----------------------------------------------------- */

    const navigationLinks =
        sidebar.querySelectorAll(
            ".mentor-nav"
        );


    navigationLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 768
                    ) {

                        closeSidebar();

                    }

                }
            );

        }
    );


    /* -----------------------------------------------------
       RESIZE
    ----------------------------------------------------- */

    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth > 768
            ) {

                closeSidebar();

            }

        }
    );

}


/* =========================================================
   3. THEME
========================================================= */

function initializeSavedThemeState() {

    const savedTheme =
        localStorage.getItem(
            "mentorTheme"
        );


    /*
     * Apply the theme to BOTH html and body.
     *
     * html class is important because it is already
     * available before body styling is completed.
     */

    if (
        savedTheme === "dark"
    ) {

        document.documentElement.classList.add(
            "dark-mode"
        );

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.documentElement.classList.remove(
            "dark-mode"
        );

        document.body.classList.remove(
            "dark-mode"
        );

    }


    updateThemeButton();

}


/* =========================================================
   4. TOGGLE DARK MODE
========================================================= */

function toggleDarkMode() {

    const isDark =
        document.body.classList.toggle(
            "dark-mode"
        );


    /*
     * Keep html and body synchronized.
     */

    document.documentElement.classList.toggle(
        "dark-mode",
        isDark
    );


    /* -----------------------------------------------------
       SAVE PREFERENCE
    ----------------------------------------------------- */

    localStorage.setItem(
        "mentorTheme",
        isDark
            ? "dark"
            : "light"
    );


    updateThemeButton();

}


/* =========================================================
   5. UPDATE THEME BUTTON
========================================================= */

function updateThemeButton() {

    const themeIcon =
        document.getElementById(
            "themeIcon"
        );

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    const isDark =
        document.documentElement.classList.contains(
            "dark-mode"
        );


    /* -----------------------------------------------------
       ICON
    ----------------------------------------------------- */

    if (themeIcon) {

        themeIcon.textContent =
            isDark
                ? "☀"
                : "☾";

    }


    /* -----------------------------------------------------
       ACCESSIBILITY
    ----------------------------------------------------- */

    if (themeToggle) {

        themeToggle.setAttribute(
            "aria-label",
            isDark
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

    }

}


/* =========================================================
   6. GLOBAL SEARCH
========================================================= */

function initializeGlobalSearch() {

    const searchInput =
        document.getElementById(
            "globalSearch"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Enter"
            ) {

                return;

            }


            const value =
                searchInput.value
                    .trim()
                    .toLowerCase();


            if (!value) {
                return;
            }


            const studentsPath =
                getMentorStudentsPath();


            window.location.href =
                studentsPath +
                "?search=" +
                encodeURIComponent(
                    value
                );

        }
    );

}


/* =========================================================
   7. GET MENTOR STUDENTS PATH
========================================================= */

function getMentorStudentsPath() {

    const studentLink =
        document.querySelector(
            '.mentor-nav[href*="/mentor/students"]'
        );


    if (
        studentLink &&
        studentLink.getAttribute("href")
    ) {

        return studentLink.getAttribute(
            "href"
        );

    }


    return "/mentor/students";

}


/* =========================================================
   8. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        const sidebar =
            document.getElementById(
                "mentorSidebar"
            );

        const overlay =
            document.querySelector(
                ".sidebar-overlay"
            );


        if (sidebar) {

            sidebar.classList.remove(
                "mobile-open"
            );

        }


        if (overlay) {

            overlay.classList.remove(
                "active"
            );

        }


        document.body.style.overflow =
            "";

    }
);


/* =========================================================
   9. SAVED SIDEBAR STATE
========================================================= */

function initializeSavedSidebarState() {

    const compact =
        localStorage.getItem(
            "mentorCompactSidebar"
        );


    if (
        compact === "true"
    ) {

        document.body.classList.add(
            "mentor-sidebar-compact"
        );

    }

}


/* =========================================================
   10. EXPOSE THEME FUNCTION
========================================================= */

window.toggleDarkMode =
    toggleDarkMode;