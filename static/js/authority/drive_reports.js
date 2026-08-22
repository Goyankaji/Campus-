/* =========================================================
   AUTHORITY — DRIVE REPORTS
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initDriveAcademicYear();

        initDriveTrendFilter();

        initDriveExport();

    }
);


/* =========================================================
   ACADEMIC YEAR
========================================================= */

function initDriveAcademicYear() {

    const select =
        document.getElementById(
            "driveAcademicYear"
        );


    if (!select) {
        return;
    }


    select.addEventListener(
        "change",
        function () {

            console.log(
                "Drive report academic year:",
                select.value
            );

        }
    );

}


/* =========================================================
   TREND FILTER
========================================================= */

function initDriveTrendFilter() {

    const select =
        document.getElementById(
            "driveTrendFilter"
        );


    if (!select) {
        return;
    }


    select.addEventListener(
        "change",
        function () {

            const values =
                document.querySelectorAll(
                    ".drive-bar span"
                );


            if (select.value === "selected") {

                const selectedValues = [
                    "210",
                    "280",
                    "365",
                    "420",
                    "480"
                ];


                values.forEach(
                    function (item, index) {

                        item.textContent =
                            selectedValues[index];

                    }
                );

            } else {

                const driveValues = [
                    "24",
                    "29",
                    "36",
                    "42",
                    "48"
                ];


                values.forEach(
                    function (item, index) {

                        item.textContent =
                            driveValues[index];

                    }
                );

            }

        }
    );

}


/* =========================================================
   EXPORT
========================================================= */

function initDriveExport() {

    const button =
        document.getElementById(
            "driveExportBtn"
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