document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const yearSelect =
        document.getElementById("collegeYear");

    const exportButton =
        document.getElementById("exportCollege");

    const searchInput =
        document.getElementById("collegeSearch");

    const tableBody =
        document.getElementById("collegeTableBody");


    /* =====================================================
       YEAR CHANGE
    ===================================================== */

    if (yearSelect) {

        yearSelect.addEventListener(
            "change",
            function () {

                console.log(
                    "College analytics year:",
                    this.value
                );

                /*
                 * Database/API integration later.
                 */
            }
        );

    }


    /* =====================================================
       COLLEGE SEARCH
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

                    const firstCell =
                        row.querySelector("td");


                    if (!firstCell) {
                        return;
                    }


                    const collegeName =
                        firstCell.textContent
                            .trim()
                            .toLowerCase();


                    row.style.display =
                        collegeName.includes(query)
                            ? ""
                            : "none";

                });

            }
        );

    }


    /* =====================================================
       EXPORT COLLEGE REPORT
    ===================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();


                const year =
                    yearSelect
                        ? yearSelect.value
                        : "2026";


                const reportData = [

                    [
                        "COLLEGE ANALYTICS REPORT"
                    ],

                    [
                        "Academic Year",
                        year
                    ],

                    [""],


                    /* OVERVIEW */

                    [
                        "COLLEGE OVERVIEW"
                    ],

                    [
                        "Metric",
                        "Value",
                        "Description"
                    ],

                    [
                        "Total Students",
                        "1248",
                        "Across PCE, PIET, PU and JIET"
                    ],

                    [
                        "Total Placed",
                        "684",
                        "Students placed"
                    ],

                    [
                        "Overall Placement Rate",
                        "54.8%",
                        "Combined placement rate"
                    ],

                    [
                        "Highest Placement Rate",
                        "68%",
                        "PCE"
                    ],

                    [""],


                    /* COLLEGE PERFORMANCE */

                    [
                        "COLLEGE PERFORMANCE"
                    ],

                    [
                        "College",
                        "Students",
                        "Placed",
                        "Placement Rate",
                        "Average Package",
                        "Highest Package",
                        "Companies"
                    ],


                    [
                        "PCE",
                        "420",
                        "286",
                        "68%",
                        "6.8 LPA",
                        "18.5 LPA",
                        "72"
                    ],

                    [
                        "PIET",
                        "318",
                        "194",
                        "61%",
                        "6.3 LPA",
                        "16.2 LPA",
                        "61"
                    ],

                    [
                        "PU",
                        "292",
                        "158",
                        "54%",
                        "5.9 LPA",
                        "14.8 LPA",
                        "54"
                    ],

                    [
                        "JIET",
                        "218",
                        "103",
                        "47%",
                        "5.4 LPA",
                        "12.6 LPA",
                        "43"
                    ],

                    [""],


                    /* PACKAGE */

                    [
                        "PACKAGE COMPARISON"
                    ],

                    [
                        "College",
                        "Average Package",
                        "Highest Package"
                    ],

                    [
                        "PCE",
                        "6.8 LPA",
                        "18.5 LPA"
                    ],

                    [
                        "PIET",
                        "6.3 LPA",
                        "16.2 LPA"
                    ],

                    [
                        "PU",
                        "5.9 LPA",
                        "14.8 LPA"
                    ],

                    [
                        "JIET",
                        "5.4 LPA",
                        "12.6 LPA"
                    ],

                    [""],


                    /* TOP COLLEGE */

                    [
                        "PERFORMANCE SUMMARY"
                    ],

                    [
                        "Rank",
                        "College",
                        "Placement Rate"
                    ],

                    [
                        "1",
                        "PCE",
                        "68%"
                    ],

                    [
                        "2",
                        "PIET",
                        "61%"
                    ],

                    [
                        "3",
                        "PU",
                        "54%"
                    ],

                    [
                        "4",
                        "JIET",
                        "47%"
                    ]

                ];


                downloadCSV(
                    reportData,
                    `college_analytics_${year}.csv`
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
                                String(
                                    value ?? ""
                                );


                            return `"${text.replace(
                                /"/g,
                                '""'
                            )}"`;

                        })
                        .join(",");

                })
                .join("\r\n");


        const blob =
            new Blob(
                [
                    "\uFEFF",
                    csvContent
                ],
                {
                    type:
                        "text/csv;charset=utf-8"
                }
            );


        const url =
            window.URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download = filename;

        link.style.display = "none";


        document.body.appendChild(link);


        link.click();


        document.body.removeChild(link);


        setTimeout(function () {

            window.URL.revokeObjectURL(url);

        }, 1000);

    }

});