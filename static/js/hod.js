/* =========================================================
   HOD DASHBOARD
========================================================= */


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function openSection(sectionId, clickedElement = null) {

    const sections =
        document.querySelectorAll(".hod-page-section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }

    const navLinks =
        document.querySelectorAll(".hod-nav");

    navLinks.forEach(link => {
        link.classList.remove("active");
    });

    if (clickedElement) {

        clickedElement.classList.add("active");

    } else {

        const activeLink =
            document.querySelector(
                `.hod-nav[href="#${sectionId}"]`
            );

        if (activeLink) {
            activeLink.classList.add("active");
        }

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function setupMobileMenu() {

    const menu =
        document.getElementById("mobileMenu");

    const sidebar =
        document.getElementById("hodSidebar");

    if (!menu || !sidebar) {
        return;
    }

    menu.addEventListener("click", function () {

        sidebar.classList.toggle("open");

    });


    // Close sidebar after selecting a menu item
    document.querySelectorAll(".hod-nav").forEach(link => {

        link.addEventListener("click", function () {

            sidebar.classList.remove("open");

        });

    });

}


/* =========================================================
   DARK MODE
========================================================= */

function toggleHodDarkMode() {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "hodDarkMode",
        isDark ? "true" : "false"
    );

    updateHodThemeIcon();

}


/* =========================================================
   THEME ICON
========================================================= */

function updateHodThemeIcon() {

    const button =
        document.getElementById("hodThemeToggle");

    if (!button) {
        return;
    }

    const isDark =
        document.body.classList.contains("dark-mode");

    button.textContent =
        isDark ? "☀" : "☼";

}


/* =========================================================
   RESTORE DARK MODE
========================================================= */

function restoreHodDarkMode() {

    const saved =
        localStorage.getItem("hodDarkMode");

    if (saved === "true") {

        document.body.classList.add("dark-mode");

    }

    updateHodThemeIcon();

}


/* =========================================================
   SEARCH
========================================================= */

function setupHodSearch() {

    const search =
        document.getElementById("hodSearch");

    if (!search) {
        return;
    }

    // CTRL + K
    document.addEventListener(
        "keydown",
        function(event) {

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
        function() {

            const value =
                search.value
                    .trim()
                    .toLowerCase();

            if (!value) {
                return;
            }

            console.log(
                "HOD searching:",
                value
            );

        }
    );

}


/* =========================================================
   PROFILE
========================================================= */

function setupHodProfile() {

    const profile =
        document.getElementById("hodProfile");

    if (!profile) {
        return;
    }


    // CLICK PROFILE
    profile.addEventListener(
        "click",
        function() {

            openSection("profile");

        }
    );


    // ENTER / SPACE
    profile.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openSection("profile");

            }

        }
    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

function setupHodNotification() {

    const notification =
        document.getElementById(
            "hodNotification"
        );

    if (!notification) {
        return;
    }


    notification.addEventListener(
        "click",
        function() {

            console.log(
                "HOD notifications clicked"
            );

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        restoreHodDarkMode();

        setupMobileMenu();

        setupHodSearch();

        setupHodProfile();

        setupHodNotification();


        const theme =
            document.getElementById(
                "hodThemeToggle"
            );


        if (theme) {

            theme.addEventListener(
                "click",
                toggleHodDarkMode
            );

        }


        // Dashboard is the default section
        openSection("dashboard");

    }
);