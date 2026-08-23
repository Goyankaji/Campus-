document.addEventListener("DOMContentLoaded", function () {

    const yearSelect =
        document.getElementById("companyYear");

    const exportButton =
        document.getElementById("exportCompany");

    const searchInput =
        document.getElementById("companySearch");

    const tableBody =
        document.getElementById("companyTableBody");


    /* =====================================================
       YEAR CHANGE
    ===================================================== */

    if (yearSelect) {

        yearSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "Selected company year:",
                    this.value
                );

                // Database/API integration later
            }
        );

    }


    /* =====================================================
       COMPANY SEARCH
    ===================================================== */

    if (searchInput && tableBody) {

        searchInput.addEventListener(
            "input",
            function () {

                const query =
                    this.value
                        .trim()
                        .toLowerCase();


                const rows =
                    tableBody.querySelectorAll("tr");


                rows.forEach(function (row) {

                    const company =
                        row
                            .querySelector("td")
                            ?.textContent
                            .trim()
                            .toLowerCase() || "";


                    row.style.display =
                        company.includes(query)
                            ? ""
                            : "none";

                });

            }
        );

    }


    /* =====================================================
       EXPORT COMPANY REPORT
    ===================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            function () {

                const year =
                    yearSelect
                        ? yearSelect.value
                        : "2026";


                const reportData = [

                    ["COMPANY ANALYTICS REPORT"],
                    [`Academic Year,${year}`],
                    [""],

                    ["COMPANY OVERVIEW"],
                    ["Metric", "Value", "Description"],

                    [
                        "Total Companies",
                        "142",
                        "Participating companies"
                    ],

                    [
                        "Hiring Companies",
                        "97",
                        "Companies that hired students"
                    ],

                    [
                        "Average Package",
                        "6.42 LPA",
                        "Across all selections"
                    ],

                    [
                        "Highest Package",
                        "18.5 LPA",
                        "Highest offer recorded"
                    ],

                    [""],

                    ["COMPANY TYPE"],
                    ["Company Type", "Companies"],

                    ["IT / Software", "62"],
                    ["Core", "34"],
                    ["Finance", "21"],
                    ["Consulting", "15"],
                    ["Others", "10"],

                    [""],

                    ["TOP HIRING COMPANIES"],
                    ["Company", "Students Selected"],

                    ["TCS", "86"],
                    ["Infosys", "74"],
                    ["Accenture", "61"],
                    ["Capgemini", "48"],
                    ["Cognizant", "41"],

                    [""],

                    ["PACKAGE RANGE"],
                    ["Package Range", "Companies"],

                    ["3-5 LPA", "54"],
                    ["5-8 LPA", "46"],
                    ["8-12 LPA", "25"],
                    ["12-18 LPA", "12"],
                    ["18+ LPA", "5"],

                    [""],

                    ["COMPANY PERFORMANCE"],
                    [
                        "Company",
                        "Industry",
                        "Selections",
                        "Average Package",
                        "Highest Package",
                        "Colleges"
                    ],

                    [
                        "TCS",
                        "IT / Software",
                        "86",
                        "6.8 LPA",
                        "9.2 LPA",
                        "4"
                    ],

                    [
                        "Infosys",
                        "IT / Software",
                        "74",
                        "6.1 LPA",
                        "8.5 LPA",
                        "4"
                    ],

                    [
                        "Accenture",
                        "IT / Consulting",
                        "61",
                        "7.2 LPA",
                        "10.4 LPA",
                        "3"
                    ],

                    [
                        "Capgemini",
                        "IT / Consulting",
                        "48",
                        "5.8 LPA",
                        "8.1 LPA",
                        "4"
                    ],

                    [
                        "Cognizant",
                        "IT / Software",
                        "41",
                        "5.9 LPA",
                        "8.4 LPA",
                        "3"
                    ]

                ];


                downloadCSV(
                    reportData,
                    `company_analytics_${year}.csv`
                );

            }
        );

    }


    /* =====================================================
       CSV DOWNLOAD
    ===================================================== */

    function downloadCSV(data, filename) {

        const csvContent =
            data
                .map(function (row) {

                    return row
                        .map(function (value) {

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


        const blob =
            new Blob(
                [
                    "\uFEFF" + csvContent
                ],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;
        link.download = filename;

        link.style.display = "none";


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);


        setTimeout(function () {

            URL.revokeObjectURL(url);

        }, 100);

    }

});