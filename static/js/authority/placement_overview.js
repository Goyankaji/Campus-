/* =========================================================
   AUTHORITY PLACEMENT OVERVIEW JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const overviewYear =
    document.getElementById(
        "overviewYear"
    );

const performancePeriod =
    document.getElementById(
        "performancePeriod"
    );

const exportButton =
    document.getElementById(
        "overviewExportBtn"
    );

const performanceColumns =
    document.querySelectorAll(
        ".performance-column"
    );

const overviewCollegeName =
    document.getElementById(
        "overviewCollegeName"
    );


/* =========================================================
   COLLEGE SCOPE
========================================================= */

function getCollegeScope() {

    const collegeName =
        document.body.dataset.collegeName;

    const collegeCode =
        document.body.dataset.collegeCode;


    if (collegeName) {

        return collegeName;

    }


    if (collegeCode) {

        return collegeCode;

    }


    return "College Authority";

}


if (overviewCollegeName) {

    overviewCollegeName.textContent =
        getCollegeScope();

}


/* =========================================================
   ACADEMIC YEAR
========================================================= */

if (overviewYear) {

    const savedYear =
        localStorage.getItem(
            "authorityOverviewYear"
        );


    if (
        savedYear &&
        overviewYear.querySelector(
            `option[value="${savedYear}"]`
        )
    ) {

        overviewYear.value =
            savedYear;

    }


    overviewYear.addEventListener(
        "change",
        function () {

            const year =
                overviewYear.value;


            localStorage.setItem(
                "authorityOverviewYear",
                year
            );


            document.dispatchEvent(
                new CustomEvent(
                    "overviewYearChanged",
                    {
                        detail: {
                            year: year
                        }
                    }
                )
            );

        }
    );

}


/* =========================================================
   PERFORMANCE PERIOD
========================================================= */

function applyPerformancePeriod(
    period
) {

    if (
        !performanceColumns.length
    ) {

        return;

    }


    performanceColumns.forEach(
        function (
            column,
            index
        ) {

            if (
                period === "3" &&
                index < 2
            ) {

                column.style.display =
                    "none";

            } else {

                column.style.display =
                    "flex";

            }

        }
    );

}


if (performancePeriod) {

    const savedPeriod =
        localStorage.getItem(
            "authorityOverviewPeriod"
        );


    if (
        savedPeriod &&
        performancePeriod.querySelector(
            `option[value="${savedPeriod}"]`
        )
    ) {

        performancePeriod.value =
            savedPeriod;

        applyPerformancePeriod(
            savedPeriod
        );

    }


    performancePeriod.addEventListener(
        "change",
        function () {

            const period =
                performancePeriod.value;


            localStorage.setItem(
                "authorityOverviewPeriod",
                period
            );


            applyPerformancePeriod(
                period
            );

        }
    );

}


/* =========================================================
   EXPORT REPORT
========================================================= */

if (exportButton) {

    exportButton.addEventListener(
        "click",
        function () {

            /*
             * Frontend phase:
             * temporary browser print/export.
             *
             * Later this button will call Flask and
             * generate a proper PDF/Excel report.
             */

            window.print();

        }
    );

}


/* =========================================================
   STAT CARD ANIMATION
========================================================= */

function animateStatCards() {

    const cards =
        document.querySelectorAll(
            ".overview-stat-card"
        );


    cards.forEach(
        function (
            card,
            index
        ) {

            card.style.opacity =
                "0";

            card.style.transform =
                "translateY(8px)";


            setTimeout(
                function () {

                    card.style.transition =
                        "opacity 0.35s ease, transform 0.35s ease";

                    card.style.opacity =
                        "1";

                    card.style.transform =
                        "translateY(0)";

                },
                index * 60
            );

        }
    );

}


/* =========================================================
   PERFORMANCE BAR ANIMATION
========================================================= */

function animatePerformanceBars() {

    const bars =
        document.querySelectorAll(
            ".performance-bar"
        );


    bars.forEach(
        function (bar) {

            const originalHeight =
                bar.style.height;


            bar.style.height =
                "0";


            setTimeout(
                function () {

                    bar.style.height =
                        originalHeight;

                },
                250
            );

        }
    );

}


/* =========================================================
   TABLE PROGRESS ANIMATION
========================================================= */

function animateTableProgress() {

    const bars =
        document.querySelectorAll(
            ".table-progress div"
        );


    bars.forEach(
        function (bar) {

            const originalWidth =
                bar.style.width;


            bar.style.width =
                "0";


            setTimeout(
                function () {

                    bar.style.transition =
                        "width 0.7s ease";

                    bar.style.width =
                        originalWidth;

                },
                300
            );

        }
    );

}


/* =========================================================
   YEAR CHANGE EVENT
========================================================= */

document.addEventListener(
    "overviewYearChanged",
    function (event) {

        const year =
            event.detail.year;


        /*
         * Future backend integration point.
         *
         * Later:
         *
         * fetch(
         *   `/authority/api/overview?year=${year}`
         * )
         *
         * Backend will return ONLY the logged-in
         * Authority's college data.
         */


        console.log(
            "Placement Overview year:",
            year
        );

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        animateStatCards();

        animatePerformanceBars();

        animateTableProgress();

    }
);