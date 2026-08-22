/* =========================================================
   AUTHORITY — PLACEMENT REPORTS
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initAcademicYear();

        initTrendFilter();

        initExportButton();

    }
);



/* =========================================================
   ACADEMIC YEAR
========================================================= */

function initAcademicYear() {

    const yearSelect =
        document.getElementById(
            "academicYear"
        );


    if (!yearSelect) {
        return;
    }


    yearSelect.addEventListener(
        "change",
        function () {

            console.log(
                "Academic year changed:",
                yearSelect.value
            );

        }
    );

}



/* =========================================================
   TREND FILTER
========================================================= */

function initTrendFilter() {

    const filter =
        document.getElementById(
            "trendFilter"
        );


    if (!filter) {
        return;
    }


    filter.addEventListener(
        "change",
        function () {

            const bars =
                document.querySelectorAll(
                    ".chart-bar span"
                );


            if (filter.value === "rate") {

                const rates = [
                    "52.1%",
                    "58.7%",
                    "63.4%",
                    "68.7%"
                ];


                bars.forEach(
                    function (bar, index) {

                        bar.textContent =
                            rates[index];

                    }
                );

            } else {

                const values = [
                    "520",
                    "630",
                    "780",
                    "865"
                ];


                bars.forEach(
                    function (bar, index) {

                        bar.textContent =
                            values[index];

                    }
                );

            }

        }
    );

}



/* =========================================================
   EXPORT
========================================================= */

function initExportButton() {

    const button =
        document.getElementById(
            "exportReportBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            button.textContent =
                "✓ Report Ready";


            setTimeout(
                function () {

                    button.textContent =
                        "↓ Export Report";

                },
                1800
            );

        }
    );

}