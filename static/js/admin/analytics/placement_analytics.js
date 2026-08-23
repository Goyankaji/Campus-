document.addEventListener("DOMContentLoaded", function () {

    const yearSelect = document.getElementById("placementYear");
    const exportButton = document.getElementById("exportPlacement");


    /* =====================================================
       YEAR CHANGE
    ===================================================== */

    if (yearSelect) {

        yearSelect.addEventListener("change", function () {

            console.log(
                "Selected placement year:",
                this.value
            );

            // Database/API integration later
        });

    }


    /* =====================================================
       EXPORT PLACEMENT REPORT
    ===================================================== */

    if (exportButton) {

        exportButton.addEventListener("click", function () {

            const year = yearSelect
                ? yearSelect.value
                : "2026";


            const reportData = [

                ["PLACEMENT ANALYTICS REPORT"],
                [`Academic Year,${year}`],
                [""],

                ["PLACEMENT OVERVIEW"],
                ["Metric", "Value", "Description"],

                [
                    "Total Students",
                    "1248",
                    "Registered for placements"
                ],

                [
                    "Placed Students",
                    "684",
                    "54.8% placement rate"
                ],

                [
                    "Highest Package",
                    "18.5 LPA",
                    "Current placement season"
                ],

                [
                    "Average Package",
                    "6.42 LPA",
                    "Across placed students"
                ],

                [""],

                ["COLLEGE PERFORMANCE"],
                ["College", "Placement Rate"],

                ["PCE", "68%"],
                ["PIET", "61%"],
                ["PU", "54%"],
                ["JIET", "47%"],

                [""],

                ["PACKAGE DISTRIBUTION"],
                ["Package Range", "Students"],

                ["3-5 LPA", "284"],
                ["5-8 LPA", "216"],
                ["8-12 LPA", "121"],
                ["12-18 LPA", "49"],
                ["18+ LPA", "14"],

                [""],

                ["STUDENT STATUS"],
                ["Status", "Students"],

                ["Placed", "684"],
                ["In Process", "214"],
                ["Eligible", "238"],
                ["Not Placed", "112"],

                [""],

                ["TOP PLACEMENT COMPANIES"],
                [
                    "Company",
                    "Students Selected",
                    "Package",
                    "College Coverage"
                ],

                [
                    "TCS",
                    "86",
                    "7.2 LPA",
                    "4 Colleges"
                ],

                [
                    "Infosys",
                    "74",
                    "6.5 LPA",
                    "4 Colleges"
                ],

                [
                    "Accenture",
                    "61",
                    "7.8 LPA",
                    "3 Colleges"
                ],

                [
                    "Capgemini",
                    "48",
                    "6.1 LPA",
                    "4 Colleges"
                ]

            ];


            downloadCSV(
                reportData,
                `placement_analytics_${year}.csv`
            );

        });

    }


    /* =====================================================
       CSV DOWNLOAD FUNCTION
    ===================================================== */

    function downloadCSV(data, filename) {

        const csvContent = data
            .map(row => {

                return row
                    .map(value => {

                        const text =
                            String(value ?? "");

                        return `"${text.replace(
                            /"/g,
                            '""'
                        )}"`;

                    })
                    .join(",");

            })
            .join("\n");


        const blob = new Blob(
            [
                "\uFEFF" + csvContent
            ],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    }

});