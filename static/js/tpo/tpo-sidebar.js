/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO SIDEBAR JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sidebar =
        document.getElementById("sidebar");

    const menuToggle =
        document.getElementById("menuToggle");

    const navItems =
        document.querySelectorAll(".nav-item");


    /* =====================================================
       MOBILE SIDEBAR TOGGLE
    ====================================================== */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                sidebar.classList.toggle("open");

            }
        );

    }


    /* =====================================================
       NAVIGATION ACTIVE STATE
    ====================================================== */

    navItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                /*
                 * Don't change active state for
                 * placeholder links.
                 */

                const href =
                    item.getAttribute("href");

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                navItems.forEach(
                    function (nav) {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add("active");


                /* Close mobile sidebar */

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
       CLOSE SIDEBAR WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                window.innerWidth <= 900 &&
                sidebar &&
                sidebar.classList.contains("open")
            ) {

                const clickedInsideSidebar =
                    sidebar.contains(event.target);

                const clickedMenu =
                    menuToggle &&
                    menuToggle.contains(event.target);


                if (
                    !clickedInsideSidebar &&
                    !clickedMenu
                ) {

                    sidebar.classList.remove(
                        "open"
                    );

                }

            }

        }
    );


    /* =====================================================
       RESIZE HANDLER
    ====================================================== */

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
        "TPO Sidebar JS Loaded Successfully"
    );

});