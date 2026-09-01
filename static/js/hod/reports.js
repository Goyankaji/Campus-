/* =========================================================
   HOD PORTAL — REPORTS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const reportType =
            document.getElementById("reportType");

        const reportSession =
            document.getElementById("reportSession");

        const reportStatus =
            document.getElementById("reportStatus");

        const reportSearch =
            document.getElementById("reportSearch");

        const generateBtn =
            document.getElementById("generateReportBtn");

        const resetBtn =
            document.getElementById("resetReportBtn");

        const exportBtn =
            document.getElementById("exportReportBtn");

        const tableBody =
            document.getElementById("reportTableBody");

        const emptyState =
            document.getElementById("reportsEmpty");

        const recordCount =
            document.getElementById("recordCount");

        const reportTitle =
            document.getElementById("reportTitle");

        const reportSubtitle =
            document.getElementById("reportSubtitle");

        const headerSession =
            document.getElementById("headerSession");

        const footerSession =
            document.getElementById("footerSession");


        if (!tableBody) {
            return;
        }


        /* =================================================
           REPORT NAMES
        ================================================= */

        const titles = {

            placement:
                "Placement Summary",

            student:
                "Student Placement Report",

            company:
                "Company-wise Placement Report",

            package:
                "Package Report",

            drive:
                "Placement Drive Report"

        };


        /* =================================================
           UPDATE HEADING
        ================================================= */

        function updateHeading() {

            const type =
                reportType.value;

            const session =
                reportSession.value;

            reportTitle.textContent =
                titles[type] ||
                "Placement Summary";

            reportSubtitle.textContent =
                "Department placement performance for academic session " +
                session +
                ".";

            headerSession.textContent =
                session;

            footerSession.textContent =
                session;
        }


        /* =================================================
           FILTER
        ================================================= */

        function filterRows() {

            const search =
                reportSearch.value
                    .trim()
                    .toLowerCase();

            const status =
                reportStatus.value;

            const rows =
                tableBody.querySelectorAll("tr");

            let visible = 0;


            rows.forEach(
                function (row) {

                    const text =
                        row.textContent
                            .toLowerCase();

                    const rowStatus =
                        row.dataset.status ||
                        "";


                    const matchesSearch =
                        !search ||
                        text.includes(search);


                    let matchesStatus = true;


                    if (status === "joined") {

                        matchesStatus =
                            rowStatus === "joined";

                    }


                    if (status === "placed") {

                        matchesStatus =
                            rowStatus === "placed" ||
                            rowStatus === "joined";

                    }


                    if (status === "not-placed") {

                        matchesStatus =
                            rowStatus === "not-placed";

                    }


                    const show =
                        matchesSearch &&
                        matchesStatus;


                    row.style.display =
                        show ? "" : "none";


                    if (show) {
                        visible++;
                    }

                }
            );


            recordCount.textContent =
                visible;


            emptyState.classList.toggle(
                "visible",
                visible === 0
            );

        }


        /* =================================================
           GENERATE
        ================================================= */

        generateBtn.addEventListener(
            "click",
            function () {

                updateHeading();

                filterRows();

                const oldText =
                    generateBtn.textContent;

                generateBtn.textContent =
                    "Report Generated";

                setTimeout(
                    function () {

                        generateBtn.textContent =
                            oldText;

                    },
                    1200
                );

            }
        );


        /* =================================================
           LIVE SEARCH
        ================================================= */

        reportSearch.addEventListener(
            "input",
            filterRows
        );


        reportStatus.addEventListener(
            "change",
            filterRows
        );


        reportType.addEventListener(
            "change",
            updateHeading
        );


        reportSession.addEventListener(
            "change",
            updateHeading
        );


        /* =================================================
           RESET
        ================================================= */

        resetBtn.addEventListener(
            "click",
            function () {

                reportType.value =
                    "placement";

                reportSession.value =
                    "2026-27";

                reportStatus.value =
                    "all";

                reportSearch.value =
                    "";

                updateHeading();

                filterRows();

            }
        );


        /* =================================================
           EXPORT REPORT
        ================================================= */

        exportBtn.addEventListener(
            "click",
            function () {

                const rows =
                    Array.from(
                        tableBody.querySelectorAll("tr")
                    )
                    .filter(
                        row =>
                            row.style.display !== "none"
                    );


                if (!rows.length) {

                    alert(
                        "There are no records to export."
                    );

                    return;

                }


                let csv =
                    "No,Student,Registration No,Company,Job Role,Package,Offer Date,Status\n";


                rows.forEach(
                    function (row) {

                        const cells =
                            row.querySelectorAll("td");

                        const values =
                            Array.from(cells)
                                .map(
                                    cell =>
                                        '"' +
                                        cell.innerText
                                            .replace(/\s+/g, " ")
                                            .trim()
                                            .replace(/"/g, '""') +
                                        '"'
                                );

                        csv +=
                            values.join(",") +
                            "\n";

                    }
                );


                const blob =
                    new Blob(
                        [csv],
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


                link.download =
                    "IT_Department_Report_" +
                    reportSession.value +
                    ".csv";


                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);


                const oldText =
                    exportBtn.textContent;

                exportBtn.textContent =
                    "✓ Exported";

                setTimeout(
                    function () {

                        exportBtn.textContent =
                            oldText;

                    },
                    1300
                );

            }
        );


        /* =================================================
           INITIAL
        ================================================= */

        updateHeading();

        filterRows();

    }
);