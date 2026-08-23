/* =========================================================
   CAMPUS ADMIN
   COMMON JS
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
    ====================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initSidebar();
            initProfileMenu();
            initSearchShortcut();
            initMobileOverlay();
            initCommonKeyboardEvents();

        }
    );


    /* =====================================================
       SIDEBAR
    ====================================================== */

    function initSidebar() {

        const sidebar =
            document.getElementById("adminSidebar");

        const menuButton =
            document.getElementById("adminMenuBtn");


        if (!sidebar || !menuButton) {
            return;
        }


        menuButton.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle("open");

                updateMenuButtonState();

                if (sidebar.classList.contains("open")) {
                    createOverlay();
                } else {
                    removeOverlay();
                }

            }
        );


        const navLinks =
            sidebar.querySelectorAll(".admin-nav-link");


        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (
                            window.innerWidth <= 950
                        ) {

                            sidebar.classList.remove("open");

                            removeOverlay();

                            updateMenuButtonState();

                        }

                    }
                );

            }
        );


        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 950) {

                    sidebar.classList.remove("open");

                    removeOverlay();

                    updateMenuButtonState();

                }

            }
        );


        setActiveNavigation();

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    function setActiveNavigation() {

        const currentPath =
            window.location.pathname;


        const links =
            document.querySelectorAll(
                "[data-admin-nav]"
            );


        let matched = false;


        links.forEach(
            function (link) {

                const navPath =
                    link.dataset.adminNav;


                if (
                    currentPath === navPath
                    ||
                    (
                        navPath !== "/admin/dashboard"
                        &&
                        currentPath.startsWith(navPath)
                    )
                ) {

                    link.classList.add("active");

                    matched = true;

                } else {

                    link.classList.remove("active");

                }

            }
        );


        if (!matched) {

            const dashboardLink =
                document.querySelector(
                    '[data-admin-nav="/admin/dashboard"]'
                );


            if (dashboardLink) {

                dashboardLink.classList.add("active");

            }

        }

    }


    /* =====================================================
       MENU BUTTON STATE
    ====================================================== */

    function updateMenuButtonState() {

        const sidebar =
            document.getElementById("adminSidebar");

        const menuButton =
            document.getElementById("adminMenuBtn");


        if (!sidebar || !menuButton) {
            return;
        }


        const isOpen =
            sidebar.classList.contains("open");


        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    }


    /* =====================================================
       MOBILE OVERLAY
    ====================================================== */

    function createOverlay() {

        let overlay =
            document.getElementById(
                "adminSidebarOverlay"
            );


        if (overlay) {
            overlay.classList.add("active");
            return;
        }


        overlay =
            document.createElement("div");


        overlay.id =
            "adminSidebarOverlay";


        overlay.className =
            "admin-sidebar-overlay active";


        document.body.appendChild(overlay);


        overlay.addEventListener(
            "click",
            function () {

                const sidebar =
                    document.getElementById(
                        "adminSidebar"
                    );


                if (sidebar) {
                    sidebar.classList.remove("open");
                }


                removeOverlay();

            }
        );

    }


    function removeOverlay() {

        const overlay =
            document.getElementById(
                "adminSidebarOverlay"
            );


        if (overlay) {

            overlay.remove();

        }

    }


    /* =====================================================
       PROFILE MENU
    ====================================================== */

    function initProfileMenu() {

        const profile =
            document.getElementById(
                "adminProfile"
            );


        const menu =
            document.getElementById(
                "adminProfileMenu"
            );


        if (!profile || !menu) {
            return;
        }


        profile.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                menu.classList.toggle("open");

            }
        );


        profile.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                    ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    menu.classList.toggle("open");

                }

            }
        );


        document.addEventListener(
            "click",
            function () {

                menu.classList.remove("open");

            }
        );


        menu.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /* =====================================================
       SEARCH SHORTCUT
    ====================================================== */

    function initSearchShortcut() {

        const search =
            document.getElementById(
                "adminGlobalSearch"
            );


        if (!search) {
            return;
        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    (event.ctrlKey || event.metaKey)
                    &&
                    event.key.toLowerCase() === "k"
                ) {

                    event.preventDefault();

                    search.focus();

                    search.select();

                }

            }
        );

    }


    /* =====================================================
       COMMON KEYBOARD EVENTS
    ====================================================== */

    function initCommonKeyboardEvents() {

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    const menu =
                        document.getElementById(
                            "adminProfileMenu"
                        );


                    if (menu) {

                        menu.classList.remove(
                            "open"
                        );

                    }


                    const sidebar =
                        document.getElementById(
                            "adminSidebar"
                        );


                    if (
                        sidebar
                        &&
                        window.innerWidth <= 950
                    ) {

                        sidebar.classList.remove(
                            "open"
                        );

                        removeOverlay();

                    }

                }

            }
        );

    }


})();