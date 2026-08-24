/* =========================================================
   AUTHORITY DASHBOARD JS
========================================================= */


/* =========================================================
   1. ELEMENTS
========================================================= */

const academicYear =
    document.getElementById(
        "academicYear"
    );

const trendPeriod =
    document.getElementById(
        "trendPeriod"
    );

const trendColumns =
    document.querySelectorAll(
        ".trend-column"
    );

const dashboardCollegeName =
    document.getElementById(
        "dashboardCollegeName"
    );


/* =========================================================
   2. COLLEGE NAME
   ---------------------------------------------------------
   For now this uses the session values exposed by Flask
   through data attributes if available later.
========================================================= */

function getAuthorityCollegeName() {

    const collegeCode =
        document.body.dataset.collegeCode;

    const collegeName =
        document.body.dataset.collegeName;


    if (collegeName) {

        return collegeName;

    }


    if (collegeCode) {

        return collegeCode;

    }


    return "College Authority";

}


if (dashboardCollegeName) {

    /*
     * If backend later adds data-college-name / data-college-code
     * to body, this will automatically use it.
     */

    const college =
        getAuthorityCollegeName();


    dashboardCollegeName.textContent =
        college;

}


/* =========================================================
   3. ACADEMIC YEAR
========================================================= */

if (academicYear) {

    academicYear.addEventListener(
        "change",
        function () {

            const selectedYear =
                academicYear.value;


            /*
             * UI phase:
             * Store selection locally.
             *
             * Database/API filtering will be connected
             * later in the Flask + DB phase.
             */

            localStorage.setItem(
                "authorityAcademicYear",
                selectedYear
            );


            updateDashboardForYear(
                selectedYear
            );

        }
    );


    const savedYear =
        localStorage.getItem(
            "authorityAcademicYear"
        );


    if (
        savedYear &&
        academicYear.querySelector(
            `option[value="${savedYear}"]`
        )
    ) {

        academicYear.value =
            savedYear;

    }

}


/* =========================================================
   4. UPDATE DASHBOARD FOR YEAR
========================================================= */

function updateDashboardForYear(
    selectedYear
) {

    /*
     * This function is intentionally lightweight
     * during UI development.
     *
     * Later:
     *
     * selectedYear
     *      ↓
     * Flask route/API
     *      ↓
     * database
     *      ↓
     * PCE / PIET / PU / JIET scoped data
     */


    document.dispatchEvent(
        new CustomEvent(
            "authorityDashboardYearChange",
            {
                detail: {
                    year: selectedYear
                }
            }
        )
    );

}


/* =========================================================
   5. TREND PERIOD
========================================================= */

if (trendPeriod) {

    trendPeriod.addEventListener(
        "change",
        function () {

            const period =
                trendPeriod.value;


            updateTrendPeriod(
                period
            );

        }
    );

}


function updateTrendPeriod(
    period
) {

    /*
     * Demo UI currently uses five years.
     *
     * Later this will receive real data from backend.
     */


    if (
        !trendColumns.length
    ) {

        return;

    }


    if (period === "3") {

        trendColumns.forEach(
            function (
                column,
                index
            ) {

                if (index < 2) {

                    column.style.display =
                        "none";

                } else {

                    column.style.display =
                        "flex";

                }

            }
        );

    } else {

        trendColumns.forEach(
            function (column) {

                column.style.display =
                    "flex";

            }
        );

    }

}


/* =========================================================
   6. KPI CARD ANIMATION
========================================================= */

function animateDashboardCards() {

    const cards =
        document.querySelectorAll(
            ".dashboard-kpi-card"
        );


    cards.forEach(
        function (
            card,
            index
        ) {

            card.style.opacity = "0";

            card.style.transform =
                "translateY(8px)";


            setTimeout(
                function () {

                    card.style.transition =
                        "opacity 0.35s ease, transform 0.35s ease";

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                },
                index * 55
            );

        }
    );

}


/* =========================================================
   7. BRANCH BAR ANIMATION
========================================================= */

function animateBranchBars() {

    const bars =
        document.querySelectorAll(
            ".branch-progress-fill"
        );


    bars.forEach(
        function (bar) {

            const targetWidth =
                bar.style.width;


            bar.style.width = "0";


            setTimeout(
                function () {

                    bar.style.width =
                        targetWidth;

                },
                250
            );

        }
    );

}


/* =========================================================
   8. TREND BAR ANIMATION
========================================================= */

function animateTrendBars() {

    const bars =
        document.querySelectorAll(
            ".trend-bar"
        );


    bars.forEach(
        function (bar) {

            const originalHeight =
                getComputedStyle(
                    bar
                ).getPropertyValue(
                    "--bar-height"
                );


            bar.style.setProperty(
                "--bar-height",
                "0"
            );


            setTimeout(
                function () {

                    bar.style.setProperty(
                        "--bar-height",
                        originalHeight
                    );

                },
                300
            );

        }
    );

}


/* =========================================================
   9. QUICK ACTION FEEDBACK
========================================================= */

document
    .querySelectorAll(
        ".quick-action"
    )
    .forEach(
        function (action) {

            action.addEventListener(
                "click",
                function () {

                    /*
                     * Navigation is handled by Flask.
                     * No preventDefault here.
                     */

                }
            );

        }
    );


/* =========================================================
   10. CUSTOM DASHBOARD EVENT
========================================================= */

document.addEventListener(
    "authorityDashboardYearChange",
    function (event) {

        const year =
            event.detail.year;


        /*
         * Future DB/API integration point.
         *
         * Example later:
         *
         * fetch(
         *   `/authority/api/dashboard?year=${year}`
         * )
         */


        console.log(
            "Dashboard academic year changed:",
            year
        );

    }
);


/* =========================================================
   11. INITIALIZE DASHBOARD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        animateDashboardCards();

        animateBranchBars();

        animateTrendBars();

        /*
         * Apply saved trend period if required.
         */

        if (trendPeriod) {

            const savedPeriod =
                localStorage.getItem(
                    "authorityTrendPeriod"
                );


            if (
                savedPeriod &&
                trendPeriod.querySelector(
                    `option[value="${savedPeriod}"]`
                )
            ) {

                trendPeriod.value =
                    savedPeriod;

                updateTrendPeriod(
                    savedPeriod
                );

            }

        }

    }
);


/* =========================================================
   12. SAVE TREND PERIOD
========================================================= */

if (trendPeriod) {

    trendPeriod.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                "authorityTrendPeriod",
                trendPeriod.value
            );

        }
    );

}