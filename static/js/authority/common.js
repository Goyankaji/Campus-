/* =========================================================
   CAMPUS PLACEMENT PORTAL
   AUTHORITY COMMON JS
   ---------------------------------------------------------
   Applies to:
   - sidebar.html
   - topbar.html
   - base.html
========================================================= */


/* =========================================================
   1. DOM ELEMENTS
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

const analyticsMenu =
    document.getElementById("analyticsMenu");

const analyticsToggle =
    document.getElementById("analyticsToggle");

const analyticsArrow =
    document.getElementById("analyticsArrow");

const authorityProfile =
    document.getElementById("authorityProfile");

const profileArrow =
    document.getElementById("profileArrow");

const authorityProfileMenu =
    document.getElementById(
        "authorityProfileMenu"
    );

const headerNotificationBtn =
    document.getElementById(
        "headerNotificationBtn"
    );


/* =========================================================
   2. THEME
========================================================= */

function applyAuthorityTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add(
            "dark-theme"
        );


        /* Sidebar */

        if (sidebarThemeIcon) {

            sidebarThemeIcon.textContent = "☀";

        }


        if (sidebarThemeText) {

            sidebarThemeText.textContent =
                "Light Mode";

        }


        /* Header */

        if (headerThemeBtn) {

            headerThemeBtn.textContent = "☀";

        }

    } else {

        document.body.classList.remove(
            "dark-theme"
        );


        /* Sidebar */

        if (sidebarThemeIcon) {

            sidebarThemeIcon.textContent = "☾";

        }


        if (sidebarThemeText) {

            sidebarThemeText.textContent =
                "Dark Mode";

        }


        /* Header */

        if (headerThemeBtn) {

            headerThemeBtn.textContent = "☼";

        }

    }


    localStorage.setItem(
        "authorityTheme",
        theme
    );

}


/* =========================================================
   3. LOAD SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem(
        "authorityTheme"
    ) || "light";


applyAuthorityTheme(
    savedTheme
);


/* =========================================================
   4. THEME TOGGLE HELPER
========================================================= */

function toggleAuthorityTheme() {

    const isDark =
        document.body.classList.contains(
            "dark-theme"
        );


    applyAuthorityTheme(
        isDark ? "light" : "dark"
    );

}


/* =========================================================
   5. SIDEBAR THEME BUTTON
========================================================= */

if (sidebarThemeBtn) {

    sidebarThemeBtn.addEventListener(
        "click",
        function () {

            toggleAuthorityTheme();

        }
    );

}


/* =========================================================
   6. HEADER THEME BUTTON
========================================================= */

if (headerThemeBtn) {

    headerThemeBtn.addEventListener(
        "click",
        function () {

            toggleAuthorityTheme();

        }
    );

}


/* =========================================================
   7. MOBILE SIDEBAR
========================================================= */

if (
    mobileMenuBtn &&
    sidebar
) {

    mobileMenuBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   8. ANALYTICS DROPDOWN
========================================================= */

function openAnalytics() {

    if (!analyticsMenu) {
        return;
    }


    analyticsMenu.classList.add(
        "expanded"
    );


    if (analyticsArrow) {

        analyticsArrow.classList.add(
            "rotate"
        );

    }

}


function closeAnalytics() {

    if (!analyticsMenu) {
        return;
    }


    analyticsMenu.classList.remove(
        "expanded"
    );


    if (analyticsArrow) {

        analyticsArrow.classList.remove(
            "rotate"
        );

    }

}


function toggleAnalytics() {

    if (!analyticsMenu) {
        return;
    }


    const isExpanded =
        analyticsMenu.classList.contains(
            "expanded"
        );


    if (isExpanded) {

        closeAnalytics();

    } else {

        openAnalytics();

    }

}


if (
    analyticsToggle &&
    analyticsMenu
) {

    analyticsToggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            toggleAnalytics();

        }
    );

}


/* =========================================================
   9. ANALYTICS INITIAL STATE
   ---------------------------------------------------------
   If a report page is currently active, the sidebar
   already receives "expanded" from Jinja.
========================================================= */

if (
    analyticsMenu &&
    analyticsMenu.classList.contains(
        "expanded"
    )
) {

    openAnalytics();

}


/* =========================================================
   10. PROFILE DROPDOWN
========================================================= */

function openProfileMenu() {

    if (!authorityProfileMenu) {
        return;
    }


    authorityProfileMenu.classList.add(
        "open"
    );


    if (profileArrow) {

        profileArrow.style.transform =
            "rotate(180deg)";

    }

}


function closeProfileMenu() {

    if (!authorityProfileMenu) {
        return;
    }


    authorityProfileMenu.classList.remove(
        "open"
    );


    if (profileArrow) {

        profileArrow.style.transform =
            "rotate(0deg)";

    }

}


function toggleProfileMenu() {

    if (!authorityProfileMenu) {
        return;
    }


    const isOpen =
        authorityProfileMenu.classList.contains(
            "open"
        );


    if (isOpen) {

        closeProfileMenu();

    } else {

        openProfileMenu();

    }

}


if (authorityProfile) {

    authorityProfile.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            toggleProfileMenu();

        }
    );

}


/* =========================================================
   11. NOTIFICATION BUTTON
========================================================= */

if (headerNotificationBtn) {

    headerNotificationBtn.addEventListener(
        "click",
        function () {

            /*
             * Notification page is already available.
             * For now clicking the bell opens the
             * Authority Notifications page.
             */

            const notificationUrl =
                headerNotificationBtn.dataset.url;


            if (notificationUrl) {

                window.location.href =
                    notificationUrl;

            } else {

                window.location.href =
                    "/authority/notifications";

            }

        }
    );

}


/* =========================================================
   12. CTRL + K SEARCH SHORTCUT
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

                searchInput.select();

            }

        }

    }
);


/* =========================================================
   13. SEARCH INPUT
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                searchInput.value = "";

                searchInput.blur();

            }

        }
    );

}


/* =========================================================
   14. CLOSE SIDEBAR AFTER NAVIGATION
========================================================= */

document
    .querySelectorAll(
        ".nav-link, .analytics-sub-link"
    )
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 950 &&
                        sidebar
                    ) {

                        sidebar.classList.remove(
                            "open"
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   15. OUTSIDE CLICK
========================================================= */

document.addEventListener(
    "click",
    function (event) {


        /* -----------------------------------------
           Profile dropdown
        ----------------------------------------- */

        if (
            authorityProfileMenu &&
            authorityProfile &&
            !authorityProfile.contains(
                event.target
            ) &&
            !authorityProfileMenu.contains(
                event.target
            )
        ) {

            closeProfileMenu();

        }


        /* -----------------------------------------
           Mobile sidebar
        ----------------------------------------- */

        if (
            window.innerWidth <= 950 &&
            sidebar &&
            sidebar.classList.contains(
                "open"
            ) &&
            !sidebar.contains(
                event.target
            ) &&
            mobileMenuBtn &&
            !mobileMenuBtn.contains(
                event.target
            )
        ) {

            sidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   16. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeProfileMenu();

        }

    }
);


/* =========================================================
   17. WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 950 &&
            sidebar
        ) {

            sidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   18. PREVENT PROFILE MENU CLICK FROM CLOSING ITSELF
========================================================= */

if (authorityProfileMenu) {

    authorityProfileMenu.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

}


/* =========================================================
   19. PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Re-check saved theme after DOM is ready.
         */

        const currentTheme =
            localStorage.getItem(
                "authorityTheme"
            ) || "light";


        applyAuthorityTheme(
            currentTheme
        );


        /*
         * Keep Analytics open on report pages.
         */

        if (
            analyticsMenu &&
            analyticsMenu.classList.contains(
                "expanded"
            )
        ) {

            openAnalytics();

        }

    }
);