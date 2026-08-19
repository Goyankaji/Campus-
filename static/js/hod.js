/* =========================================================
   CAMPUS PLACEMENT PORTAL
   HOD DASHBOARD JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const hodThemeToggle =
    document.getElementById("hodThemeToggle");

const mobileMenu =
    document.getElementById("mobileMenu");

const hodSidebar =
    document.getElementById("hodSidebar");

const hodSearch =
    document.getElementById("hodSearch");


/* =========================================================
   THEME
========================================================= */

function applyHodTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        if (hodThemeToggle) {
            hodThemeToggle.textContent = "☀";
        }

        localStorage.setItem(
            "hodTheme",
            "dark"
        );

    } else {

        document.body.classList.remove("dark-mode");

        if (hodThemeToggle) {
            hodThemeToggle.textContent = "☾";
        }

        localStorage.setItem(
            "hodTheme",
            "light"
        );
    }
}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedHodTheme =
    localStorage.getItem("hodTheme") || "light";

applyHodTheme(savedHodTheme);


/* =========================================================
   THEME TOGGLE
========================================================= */

if (hodThemeToggle) {

    hodThemeToggle.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );

            applyHodTheme(
                isDark
                    ? "light"
                    : "dark"
            );

        }
    );

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

if (mobileMenu) {

    mobileMenu.addEventListener(
        "click",
        function () {

            hodSidebar.classList.toggle("open");

        }
    );

}


/* =========================================================
   CLOSE MOBILE SIDEBAR
========================================================= */

document
    .querySelectorAll(".hod-nav")
    .forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                if (window.innerWidth <= 900) {

                    hodSidebar.classList.remove(
                        "open"
                    );

                }

            }
        );

    });


/* =========================================================
   SEARCH SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (hodSearch) {
                hodSearch.focus();
            }

        }

    }
);


/* =========================================================
   SEARCH
========================================================= */

if (hodSearch) {

    hodSearch.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                const value =
                    hodSearch.value.trim();

                if (value !== "") {

                    console.log(
                        "HOD searching for:",
                        value
                    );

                }

            }

        }
    );

}


/* =========================================================
   RESPONSIVE SIDEBAR
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 900 &&
            hodSidebar
        ) {

            hodSidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   QUICK ACTIONS
========================================================= */

document
    .querySelectorAll(".quick-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                console.log(
                    "HOD Quick Action:",
                    button.textContent.trim()
                );

                /*
                    Later Flask routes can be connected here.

                    Example:

                    View Students
                    -> /hod/students

                    View Placement Data
                    -> /hod/placement-statistics

                    View Placed Students
                    -> /hod/placed-students

                    Generate Report
                    -> /hod/reports
                */

            }
        );

    });


/* =========================================================
   VIEW ALL BUTTONS
========================================================= */

document
    .querySelectorAll(".card-heading button")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                console.log(
                    "View All clicked"
                );

            }
        );

    });


/* =========================================================
   NAVIGATION PLACEHOLDER
========================================================= */

document
    .querySelectorAll(".hod-nav")
    .forEach(function (item) {

        item.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                document
                    .querySelectorAll(".hod-nav")
                    .forEach(function (nav) {

                        nav.classList.remove(
                            "active"
                        );

                    });

                item.classList.add("active");

            }
        );

    });


console.log(
    "HOD Dashboard JS Loaded Successfully"
);