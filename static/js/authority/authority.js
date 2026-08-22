/* =========================================================
   CAMPUS PLACEMENT PORTAL
   COLLEGE AUTHORITY DASHBOARD
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const sidebar =
    document.getElementById("authoritySidebar");

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebarThemeBtn =
    document.getElementById("sidebarThemeBtn");

const headerThemeBtn =
    document.getElementById("headerThemeBtn");

const sidebarThemeIcon =
    document.getElementById("sidebarThemeIcon");

const sidebarThemeText =
    document.getElementById("sidebarThemeText");

const searchInput =
    document.getElementById("authoritySearch");


/* =========================================================
   ANALYTICS DROPDOWN ELEMENTS
========================================================= */

const analyticsToggle =
    document.getElementById("analyticsToggle");

const analyticsSubmenu =
    document.getElementById("analyticsSubmenu");

const analyticsArrow =
    document.getElementById("analyticsArrow");


/* =========================================================
   ANALYTICS DROPDOWN
========================================================= */

function setAnalyticsState(isOpen) {

    if (!analyticsSubmenu || !analyticsToggle) {
        return;
    }

    if (isOpen) {

        analyticsSubmenu.classList.add("open");

        analyticsToggle.classList.add("analytics-open");

        if (analyticsArrow) {
            analyticsArrow.classList.add("rotate");
        }

        localStorage.setItem(
            "authorityAnalyticsOpen",
            "true"
        );

    } else {

        analyticsSubmenu.classList.remove("open");

        analyticsToggle.classList.remove(
            "analytics-open"
        );

        if (analyticsArrow) {
            analyticsArrow.classList.remove("rotate");
        }

        localStorage.setItem(
            "authorityAnalyticsOpen",
            "false"
        );
    }
}


/* =========================================================
   LOAD ANALYTICS STATE
========================================================= */

if (analyticsToggle && analyticsSubmenu) {

    const savedAnalyticsState =
        localStorage.getItem(
            "authorityAnalyticsOpen"
        );

    /*
        Default = open
        This matches the reference screenshot.
    */

    const shouldOpen =
        savedAnalyticsState !== "false";

    setAnalyticsState(shouldOpen);


    analyticsToggle.addEventListener(
        "click",
        function () {

            const currentlyOpen =
                analyticsSubmenu.classList.contains(
                    "open"
                );

            setAnalyticsState(
                !currentlyOpen
            );

        }
    );

}


/* =========================================================
   ANALYTICS SUBMENU ACTIVE STATE
========================================================= */

document
    .querySelectorAll(".analytics-sub-link")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".analytics-sub-link"
                    )
                    .forEach(function (item) {

                        item.classList.remove(
                            "active"
                        );

                    });

                link.classList.add("active");

            }
        );

    });


/* =========================================================
   THEME
========================================================= */

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-theme"
        );

        if (sidebarThemeIcon) {

            sidebarThemeIcon.textContent =
                "☀";

        }

        if (sidebarThemeText) {

            sidebarThemeText.textContent =
                "Light Mode";

        }

        if (headerThemeBtn) {

            headerThemeBtn.textContent =
                "☀";

        }

        localStorage.setItem(
            "authorityTheme",
            "dark"
        );

    } else {

        document.body.classList.remove(
            "dark-theme"
        );

        if (sidebarThemeIcon) {

            sidebarThemeIcon.textContent =
                "☾";

        }

        if (sidebarThemeText) {

            sidebarThemeText.textContent =
                "Dark Mode";

        }

        if (headerThemeBtn) {

            headerThemeBtn.textContent =
                "☼";

        }

        localStorage.setItem(
            "authorityTheme",
            "light"
        );
    }
}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem(
        "authorityTheme"
    ) || "light";

applyTheme(savedTheme);


/* =========================================================
   SIDEBAR THEME
========================================================= */

if (sidebarThemeBtn) {

    sidebarThemeBtn.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.contains(
                    "dark-theme"
                );

            applyTheme(
                isDark
                    ? "light"
                    : "dark"
            );

        }
    );

}


/* =========================================================
   HEADER THEME
========================================================= */

if (headerThemeBtn) {

    headerThemeBtn.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.contains(
                    "dark-theme"
                );

            applyTheme(
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

if (mobileMenuBtn && sidebar) {

    mobileMenuBtn.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   CLOSE SIDEBAR AFTER CLICK
========================================================= */

document
    .querySelectorAll(
        ".nav-link:not(.analytics-toggle)"
    )
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 950
                ) {

                    if (sidebar) {

                        sidebar.classList.remove(
                            "open"
                        );

                    }

                }

            }
        );

    });


/* =========================================================
   CLOSE SIDEBAR AFTER ANALYTICS SUBLINK CLICK
========================================================= */

document
    .querySelectorAll(
        ".analytics-sub-link"
    )
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 950
                ) {

                    if (sidebar) {

                        sidebar.classList.remove(
                            "open"
                        );

                    }

                }

            }
        );

    });


/* =========================================================
   CTRL + K SEARCH
========================================================= */

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


/* =========================================================
   SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                const value =
                    searchInput.value.trim();

                if (value !== "") {

                    console.log(
                        "Authority search:",
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
            window.innerWidth > 950
        ) {

            if (sidebar) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }

    }
);