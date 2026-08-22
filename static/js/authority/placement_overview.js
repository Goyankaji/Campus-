/* =========================================================
   AUTHORITY
   PLACEMENT OVERVIEW JS
   ========================================================= */


/* =========================================================
   ACADEMIC SESSION
   ========================================================= */

const academicSession =
    document.getElementById("academicSession");


if (academicSession) {

    academicSession.addEventListener(
        "change",
        function () {

            const selectedSession =
                this.value;

            console.log(
                "Academic session selected:",
                selectedSession
            );

        }
    );

}


/* =========================================================
   COMPANY PROGRESS ANIMATION
   ========================================================= */

function animateProgressBars() {

    const bars =
        document.querySelectorAll(
            ".company-progress span"
        );


    bars.forEach(
        function (bar) {

            const finalWidth =
                bar.style.width;

            bar.style.width = "0";


            setTimeout(
                function () {

                    bar.style.width =
                        finalWidth;

                },
                150
            );

        }
    );

}


/* =========================================================
   AVERAGE PACKAGE PROGRESS
   ========================================================= */

function animateAveragePackageBars() {

    const bars =
        document.querySelectorAll(
            ".average-progress span"
        );


    bars.forEach(
        function (bar) {

            const finalWidth =
                bar.style.width;

            bar.style.width = "0";


            setTimeout(
                function () {

                    bar.style.width =
                        finalWidth;

                },
                200
            );

        }
    );

}


/* =========================================================
   DEPARTMENT PROGRESS
   ========================================================= */

function animateDepartmentBars() {

    const bars =
        document.querySelectorAll(
            ".department-progress span"
        );


    bars.forEach(
        function (bar) {

            const finalWidth =
                bar.style.width;

            bar.style.width = "0";


            setTimeout(
                function () {

                    bar.style.width =
                        finalWidth;

                },
                250
            );

        }
    );

}


/* =========================================================
   TREND BAR TOOLTIP
   ========================================================= */

function initTrendBars() {

    const bars =
        document.querySelectorAll(
            ".trend-bar"
        );


    bars.forEach(
        function (bar) {

            bar.addEventListener(
                "mouseenter",
                function () {

                    const value =
                        this.dataset.value;

                    console.log(
                        "Placed students:",
                        value
                    );

                }
            );

        }
    );

}


/* =========================================================
   PAGE LOAD
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        animateProgressBars();

        animateAveragePackageBars();

        animateDepartmentBars();

        initTrendBars();

        console.log(
            "Authority Placement Overview loaded."
        );

    }
);