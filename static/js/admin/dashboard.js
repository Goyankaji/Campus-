/* =========================================================
   CAMPUS ADMIN
   DASHBOARD JS
========================================================= */

(function () {

    "use strict";


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initDashboardYear();

            initCollegeFilter();

            initCollegeMetric();

            initDashboardActions();

        }
    );


    /* =====================================================
       ACADEMIC YEAR
    ====================================================== */

    function initDashboardYear() {

        const selector =
            document.getElementById(
                "dashboardYear"
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
                        "adminDashboardYearChanged",
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
       COLLEGE FILTER
    ====================================================== */

    function initCollegeFilter() {

        const selector =
            document.getElementById(
                "dashboardCollege"
            );


        if (!selector) {
            return;
        }


        selector.addEventListener(
            "change",
            function () {

                const selectedCollege =
                    selector.value;


                const rows =
                    document.querySelectorAll(
                        ".college-row"
                    );


                rows.forEach(
                    function (row) {

                        if (
                            selectedCollege === "all"
                        ) {

                            row.style.display =
                                "grid";

                            return;

                        }


                        if (
                            row.dataset.college
                            ===
                            selectedCollege
                        ) {

                            row.style.display =
                                "grid";

                        } else {

                            row.style.display =
                                "none";

                        }

                    }
                );


                updateCollegeTotal(
                    selectedCollege
                );

            }
        );

    }


    /* =====================================================
       COLLEGE TOTAL
    ====================================================== */

    function updateCollegeTotal(
        selectedCollege
    ) {

        const totalElement =
            document.querySelector(
                ".college-total strong"
            );


        if (!totalElement) {
            return;
        }


        const totals = {

            all: "436",

            pce: "142",

            piet: "118",

            pu: "104",

            jiet: "72"

        };


        totalElement.textContent =
            totals[selectedCollege]
            || totals.all;

    }


    /* =====================================================
       COLLEGE METRIC
    ====================================================== */

    function initCollegeMetric() {

        const selector =
            document.getElementById(
                "collegeMetric"
            );


        if (!selector) {
            return;
        }


        selector.addEventListener(
            "change",
            function () {

                const metric =
                    selector.value;


                const values = {

                    placed: {

                        pce: "142",
                        piet: "118",
                        pu: "104",
                        jiet: "72"

                    },

                    rate: {

                        pce: "48%",
                        piet: "42%",
                        pu: "39%",
                        jiet: "31%"

                    },

                    package: {

                        pce: "₹7.4",
                        piet: "₹6.8",
                        pu: "₹6.2",
                        jiet: "₹5.9"

                    }

                };


                const selectedValues =
                    values[metric];


                if (!selectedValues) {
                    return;
                }


                document
                    .querySelectorAll(
                        ".college-row"
                    )
                    .forEach(
                        function (row) {

                            const college =
                                row.dataset.college;


                            const value =
                                row.querySelector(
                                    "strong"
                                );


                            if (
                                value
                                &&
                                selectedValues[college]
                            ) {

                                value.textContent =
                                    selectedValues[
                                        college
                                    ];

                            }

                        }
                    );

            }
        );

    }


    /* =====================================================
       DASHBOARD ACTIONS
    ====================================================== */

    function initDashboardActions() {

        const actionButtons =
            document.querySelectorAll(
                ".panel-action"
            );


        actionButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        const text =
                            button.textContent
                                .trim()
                                .toLowerCase();


                        /*
                         * These buttons are currently
                         * UI-only.
                         *
                         * Actual page routes will be
                         * connected in later phases.
                         */

                        if (
                            text.includes(
                                "view details"
                            )
                        ) {

                            console.log(
                                "Placement funnel details"
                            );

                        }


                        if (
                            text.includes(
                                "full report"
                            )
                        ) {

                            console.log(
                                "Branch report"
                            );

                        }


                        if (
                            text.includes(
                                "view activity"
                            )
                        ) {

                            console.log(
                                "Recent activity"
                            );

                        }

                    }
                );

            }
        );

    }


})();