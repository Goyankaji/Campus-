/* =========================================================
   AUTHORITY — COMPANY REPORTS
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initCompanyAcademicYear();

        initCompanyPerformanceFilter();

        initCompanyExport();

    }
);


/* =========================================================
   ACADEMIC YEAR
========================================================= */

function initCompanyAcademicYear() {

    const select =
        document.getElementById(
            "companyAcademicYear"
        );


    if (!select) {
        return;
    }


    select.addEventListener(
        "change",
        function () {

            console.log(
                "Company report academic year:",
                select.value
            );

        }
    );

}


/* =========================================================
   PERFORMANCE FILTER
========================================================= */

function initCompanyPerformanceFilter() {

    const select =
        document.getElementById(
            "companyPerformanceFilter"
        );


    if (!select) {
        return;
    }


    const values = {

        selected: [
            82,
            65,
            53,
            41,
            38
        ],

        offers: [
            96,
            78,
            67,
            52,
            45
        ],

        drives: [
            6,
            5,
            4,
            3,
            3
        ]

    };


    const maximum = {

        selected: 82,

        offers: 96,

        drives: 6

    };


    select.addEventListener(
        "change",
        function () {

            const selectedType =
                select.value;


            const currentValues =
                values[selectedType];


            const currentMaximum =
                maximum[selectedType];


            const chartRows =
                document.querySelectorAll(
                    ".company-chart-row"
                );


            chartRows.forEach(
                function (row, index) {

                    const value =
                        currentValues[index];


                    const percentage =
                        (value / currentMaximum) * 100;


                    const fill =
                        row.querySelector(
                            ".company-chart-fill"
                        );


                    const valueElement =
                        row.querySelector(
                            ".company-chart-value"
                        );


                    const label =
                        row.querySelector(
                            ".company-chart-label span"
                        );


                    if (fill) {

                        fill.style.width =
                            percentage + "%";

                    }


                    if (valueElement) {

                        valueElement.textContent =
                            value;

                    }


                    if (label) {

                        if (
                            selectedType ===
                            "selected"
                        ) {

                            label.textContent =
                                value +
                                " students";

                        }

                        else if (
                            selectedType ===
                            "offers"
                        ) {

                            label.textContent =
                                value +
                                " offers";

                        }

                        else {

                            label.textContent =
                                value +
                                " drives";

                        }

                    }

                }
            );

        }
    );

}


/* =========================================================
   EXPORT
========================================================= */

function initCompanyExport() {

    const button =
        document.getElementById(
            "companyExportBtn"
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