/* =========================================================
   CAMPUS PLACEMENT PORTAL
   AUTHORITY COMMON JS
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const authoritySidebar =
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

const analyticsToggle =
    document.getElementById("analyticsToggle");

const analyticsMenu =
    document.getElementById("analyticsMenu");

const analyticsArrow =
    document.getElementById("analyticsArrow");

const notificationTopbarBtn =
    document.getElementById("notificationTopbarBtn");


/* =========================================================
   THEME
   ========================================================= */

function applyAuthorityTheme(theme) {

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

    }


    localStorage.setItem(
        "authorityTheme",
        theme
    );

}


/* =========================================================
   LOAD SAVED THEME
   ========================================================= */

const savedAuthorityTheme =
    localStorage.getItem(
        "authorityTheme"
    ) || "light";


applyAuthorityTheme(
    savedAuthorityTheme
);


/* =========================================================
   THEME TOGGLE FUNCTION
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
   SIDEBAR THEME BUTTON
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
   HEADER THEME BUTTON
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
   MOBILE SIDEBAR
   ========================================================= */

if (
    mobileMenuBtn &&
    authoritySidebar
) {

    mobileMenuBtn.addEventListener(
        "click",
        function () {

            authoritySidebar.classList.toggle(
                "open"
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE SIDEBAR
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
                        authoritySidebar
                    ) {

                        authoritySidebar.classList.remove(
                            "open"
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   ANALYTICS DROPDOWN
   ========================================================= */

if (
    analyticsToggle &&
    analyticsMenu
) {

    analyticsToggle.addEventListener(
        "click",
        function () {

            const isExpanded =
                analyticsMenu.classList.contains(
                    "expanded"
                );


            analyticsMenu.classList.toggle(
                "expanded",
                !isExpanded
            );


            if (analyticsArrow) {

                analyticsArrow.classList.toggle(
                    "rotate",
                    !isExpanded
                );

            }

        }
    );

}


/* =========================================================
   AUTO OPEN ANALYTICS
   WHEN ANALYTICS PAGE IS ACTIVE
   ========================================================= */

const activeAnalyticsLink =
    document.querySelector(
        ".analytics-sub-link.active"
    );


if (
    activeAnalyticsLink &&
    analyticsMenu
) {

    analyticsMenu.classList.add(
        "expanded"
    );


    if (analyticsArrow) {

        analyticsArrow.classList.add(
            "rotate"
        );

    }

}


/* =========================================================
   CTRL + K SEARCH
   ========================================================= */

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

                searchInput.select();

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

            if (
                event.key === "Enter"
            ) {

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
   NOTIFICATION BUTTON
   ========================================================= */

if (notificationTopbarBtn) {

    notificationTopbarBtn.addEventListener(
        "click",
        function () {

            /*
                Notifications page ka route
                baad mein add hoga.

                Abhi button intentionally
                non-navigational hai.
            */

            console.log(
                "Authority notifications clicked"
            );

        }
    );

}


/* =========================================================
   CLOSE SIDEBAR ON OUTSIDE CLICK
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            window.innerWidth > 950 ||
            !authoritySidebar ||
            !authoritySidebar.classList.contains(
                "open"
            )
        ) {

            return;

        }


        const clickedInsideSidebar =
            authoritySidebar.contains(
                event.target
            );


        const clickedMenuButton =
            mobileMenuBtn &&
            mobileMenuBtn.contains(
                event.target
            );


        if (
            !clickedInsideSidebar &&
            !clickedMenuButton
        ) {

            authoritySidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            authoritySidebar
        ) {

            authoritySidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 950 &&
            authoritySidebar
        ) {

            authoritySidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
            Common Authority shell is ready.
        */

        console.log(
            "Authority common system loaded."
        );

    }
);