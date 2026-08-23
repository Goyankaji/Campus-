/* =========================================================
   CAMPUS ADMIN
   ADMIN COMMON JS
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       DOM READY
    ====================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initTheme();
            initAcademicYear();
            initGlobalSearch();

        }
    );


    /* =====================================================
       THEME
    ====================================================== */

    function initTheme() {

        const toggle =
            document.getElementById(
                "adminThemeToggle"
            );


        if (!toggle) {
            return;
        }


        const savedTheme =
            localStorage.getItem(
                "campus-admin-theme"
            );


        if (savedTheme === "light") {

            document.body.classList.add(
                "admin-light"
            );

        } else {

            document.body.classList.remove(
                "admin-light"
            );

        }


        toggle.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "admin-light"
                );


                const isLight =
                    document.body.classList.contains(
                        "admin-light"
                    );


                localStorage.setItem(
                    "campus-admin-theme",
                    isLight
                        ? "light"
                        : "dark"
                );

            }
        );

    }


    /* =====================================================
       ACADEMIC YEAR
    ====================================================== */

    function initAcademicYear() {

        const selector =
            document.getElementById(
                "adminAcademicYear"
            );


        if (!selector) {
            return;
        }


        const savedYear =
            localStorage.getItem(
                "campus-admin-year"
            );


        if (savedYear) {

            const option =
                selector.querySelector(
                    `option[value="${savedYear}"]`
                );


            if (option) {

                selector.value =
                    savedYear;

            }

        }


        selector.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "campus-admin-year",
                    selector.value
                );


                document.dispatchEvent(
                    new CustomEvent(
                        "adminAcademicYearChanged",
                        {
                            detail: {
                                year:
                                    selector.value
                            }
                        }
                    )
                );

            }
        );

    }


    /* =====================================================
       GLOBAL SEARCH
    ====================================================== */

    function initGlobalSearch() {

        const search =
            document.getElementById(
                "adminGlobalSearch"
            );


        if (!search) {
            return;
        }


        let searchTimer = null;


        search.addEventListener(
            "input",
            function () {

                clearTimeout(
                    searchTimer
                );


                const query =
                    search.value.trim();


                searchTimer =
                    setTimeout(
                        function () {

                            if (!query) {
                                return;
                            }


                            document.dispatchEvent(
                                new CustomEvent(
                                    "adminGlobalSearch",
                                    {
                                        detail: {
                                            query:
                                                query
                                        }
                                    }
                                )
                            );

                        },
                        250
                    );

            }
        );

    }


})();