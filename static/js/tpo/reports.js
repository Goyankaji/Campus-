/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - PLACEMENT REPORTS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const yearSelect =
        document.getElementById("reportYear");

    const exportButton =
        document.getElementById("exportReport");

    const companyTable =
        document.getElementById("companyReportTable");


    /* =====================================================
       ACADEMIC YEAR
    ====================================================== */

    if (yearSelect) {

        yearSelect.addEventListener(
            "change",
            function () {

                const selectedYear =
                    yearSelect.value;

                console.log(
                    "Selected academic year:",
                    selectedYear
                );

                /*
                 * Backend/database integration
                 * will be added later.
                 *
                 * For now the report UI
                 * remains static.
                 */

            }
        );

    }


    /* =====================================================
       MAIN REPORT EXPORT
    ====================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            function () {

                exportCompanyReport();

            }
        );

    }


    /* =====================================================
       DOWNLOAD REPORT CARDS
    ====================================================== */

    document
        .querySelectorAll(
            ".download-report-card"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const reportType =
                        button.dataset.report ||
                        "report";


                    switch (reportType) {

                        case "placement-summary":

                            downloadPlacementSummary();

                            break;


                        case "college-wise":

                            downloadCollegeReport();

                            break;


                        case "company-wise":

                            downloadCompanyReport();

                            break;


                        case "placed-students":

                            downloadPlacedStudents();

                            break;


                        default:

                            alert(
                                "Report type not available."
                            );

                    }

                }
            );

        });


    /* =====================================================
       PLACEMENT SUMMARY
    ====================================================== */

    function downloadPlacementSummary() {

        const selectedYear =
            yearSelect
                ? yearSelect.value
                : "2026-27";


        const rows = [

            [
                "Placement Summary"
            ],

            [
                "Academic Year",
                selectedYear
            ],

            [],

            [
                "Metric",
                "Value"
            ],

            [
                "Total Students",
                "1248"
            ],

            [
                "Students Placed",
                "142"
            ],

            [
                "Placement Rate",
                "78.4%"
            ],

            [
                "Average Package",
                "₹9.40 LPA"
            ],

            [
                "Highest Package",
                "₹24.00 LPA"
            ]

        ];


        downloadCSV(
            rows,
            "placement_summary_" +
            selectedYear +
            ".csv"
        );

    }


    /* =====================================================
       COLLEGE-WISE REPORT
    ====================================================== */

    function downloadCollegeReport() {

        const selectedYear =
            yearSelect
                ? yearSelect.value
                : "2026-27";


        const rows = [

            [
                "College-wise Placement Report"
            ],

            [
                "Academic Year",
                selectedYear
            ],

            [],

            [
                "College",
                "Students Placed",
                "Placement Rate"
            ],

            [
                "PCE",
                "48",
                "86%"
            ],

            [
                "PIET",
                "39",
                "79%"
            ],

            [
                "PU",
                "31",
                "72%"
            ],

            [
                "JIET",
                "24",
                "68%"
            ]

        ];


        downloadCSV(
            rows,
            "college_wise_report_" +
            selectedYear +
            ".csv"
        );

    }


    /* =====================================================
       COMPANY-WISE REPORT
    ====================================================== */

    function downloadCompanyReport() {

        if (!companyTable) {

            alert(
                "Company report table not found."
            );

            return;

        }


        const rows = [

            [
                "Company-wise Placement Report"
            ],

            [],

            [
                "Company",
                "Students Placed",
                "Average Package",
                "Highest Package",
                "Status"
            ]

        ];


        const tableRows =
            companyTable.querySelectorAll(
                "tbody tr"
            );


        tableRows.forEach(
            function (row) {

                const cells =
                    row.querySelectorAll("td");


                if (cells.length < 6) {

                    return;

                }


                rows.push([

                    cells[1]
                        .textContent
                        .trim(),

                    cells[2]
                        .textContent
                        .trim(),

                    cells[3]
                        .textContent
                        .trim(),

                    cells[4]
                        .textContent
                        .trim(),

                    cells[5]
                        .textContent
                        .trim()

                ]);

            }
        );


        downloadCSV(
            rows,
            "company_wise_report.csv"
        );

    }


    /* =====================================================
       PLACED STUDENTS REPORT
    ====================================================== */

    function downloadPlacedStudents() {

        const rows = [

            [
                "Placed Students Report"
            ],

            [],

            [
                "Student",
                "College",
                "Company",
                "Job Role",
                "Package",
                "Joining Status"
            ],

            [
                "Aarav Sharma",
                "PCE",
                "TCS",
                "Software Engineer",
                "₹8.50 LPA",
                "Confirmed"
            ],

            [
                "Priya Mehta",
                "PIET",
                "Infosys",
                "System Engineer",
                "₹7.20 LPA",
                "Upcoming"
            ],

            [
                "Rohan Verma",
                "PU",
                "Amazon",
                "SDE I",
                "₹14.00 LPA",
                "Pending"
            ],

            [
                "Neha Gupta",
                "JIET",
                "Capgemini",
                "Software Analyst",
                "₹9.10 LPA",
                "Confirmed"
            ],

            [
                "Kunal Singh",
                "PCE",
                "Deloitte",
                "Analyst",
                "₹8.80 LPA",
                "Upcoming"
            ],

            [
                "Ananya Joshi",
                "PIET",
                "TCS",
                "Software Engineer",
                "₹8.50 LPA",
                "Confirmed"
            ]

        ];


        downloadCSV(
            rows,
            "placed_students_report.csv"
        );

    }


    /* =====================================================
       EXPORT COMPANY TABLE
    ====================================================== */

    function exportCompanyReport() {

        if (!companyTable) {

            alert(
                "Company report table not found."
            );

            return;

        }


        const rows = [

            [
                "Top Recruiting Companies"
            ],

            [],

            [
                "#",
                "Company",
                "Students Placed",
                "Average Package",
                "Highest Package",
                "Status"
            ]

        ];


        const tableRows =
            companyTable.querySelectorAll(
                "tbody tr"
            );


        tableRows.forEach(
            function (row) {

                const cells =
                    row.querySelectorAll("td");


                if (cells.length < 6) {

                    return;

                }


                rows.push([

                    cells[0]
                        .textContent
                        .trim(),

                    cells[1]
                        .textContent
                        .trim(),

                    cells[2]
                        .textContent
                        .trim(),

                    cells[3]
                        .textContent
                        .trim(),

                    cells[4]
                        .textContent
                        .trim(),

                    cells[5]
                        .textContent
                        .trim()

                ]);

            }
        );


        downloadCSV(
            rows,
            "top_recruiting_companies.csv"
        );

    }


    /* =====================================================
       GENERIC CSV DOWNLOAD
    ====================================================== */

    function downloadCSV(
        rows,
        filename
    ) {

        const csvContent =
            rows
                .map(function (row) {

                    return row
                        .map(csvEscape)
                        .join(",");

                })
                .join("\n");


        const blob =
            new Blob(
                [csvContent],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement("a");


        link.href = url;

        link.download = filename;


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        URL.revokeObjectURL(
            url
        );

    }


    /* =====================================================
       CSV ESCAPE
    ====================================================== */

    function csvEscape(value) {

        const text =
            String(value ?? "")
                .replace(
                    /"/g,
                    '""'
                );


        return '"' +
            text +
            '"';

    }


    /* =====================================================
       REPORT CARD FEEDBACK
    ====================================================== */

    document
        .querySelectorAll(
            ".download-report-card"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    button.classList.add(
                        "report-download-success"
                    );


                    setTimeout(
                        function () {

                            button.classList.remove(
                                "report-download-success"
                            );

                        },
                        900
                    );

                }
            );

        });


    /* =====================================================
       INITIALIZATION
    ====================================================== */

    console.log(
        "TPO Reports Page Loaded Successfully"
    );

});