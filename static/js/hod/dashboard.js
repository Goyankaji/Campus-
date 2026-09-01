/* =========================================================
   CAMPUS PLACEMENT PORTAL
   HOD DASHBOARD JAVASCRIPT
========================================================= */


/* =========================================================
   DASHBOARD INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializePerformanceSelector();

        initializeDashboardViewButtons();

        initializeDashboardInteractions();

    }
);


/* =========================================================
   PERFORMANCE YEAR SELECTOR
========================================================= */

function initializePerformanceSelector() {

    const selector =
        document.getElementById(
            "performanceYear"
        );


    if (!selector) {

        return;

    }


    selector.addEventListener(
        "change",
        function () {

            /*
             * STATIC PHASE
             *
             * The chart values will be connected
             * with database data later.
             */

            console.log(
                "Selected performance year:",
                this.value
            );

        }
    );

}


/* =========================================================
   VIEW ALL BUTTONS
========================================================= */

function initializeDashboardViewButtons() {

    const buttons =
        document.querySelectorAll(
            ".hod-view-button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    /*
                     * STATIC PHASE
                     *
                     * Actual page navigation will be
                     * connected when all HOD pages
                     * are created.
                     */

                    console.log(
                        "Dashboard View All clicked"
                    );

                }
            );

        }
    );

}


/* =========================================================
   DASHBOARD INTERACTIONS
========================================================= */

function initializeDashboardInteractions() {

    const kpiCards =
        document.querySelectorAll(
            ".hod-kpi-card"
        );


    kpiCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    this.classList.add(
                        "dashboard-card-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    this.classList.remove(
                        "dashboard-card-hover"
                    );

                }
            );

        }
    );

}


/* =========================================================
   STATIC DASHBOARD DATA
========================================================= */

const HOD_DASHBOARD_DATA = {

    academicYear: "2026-27",

    department:
        "Computer Science & Engineering",

    totalStudents: 180,

    placementEligible: 145,

    studentsPlaced: 82,

    inInterview: 24,

    placementPercentage: 45.56,

    averagePackage: "₹ 6.80 LPA"

};


/* =========================================================
   DEBUG HELPER
========================================================= */

function getHodDashboardData() {

    return HOD_DASHBOARD_DATA;

}