document.addEventListener("DOMContentLoaded", function () {

    const academicYear =
        document.getElementById("academicYear");

    const ideaStatus =
        document.getElementById("ideaStatus");

    const ideaSearch =
        document.getElementById("ideaSearch");

    const tableBody =
        document.getElementById("startupTableBody");

    const footerYear =
        document.getElementById("footerYear");

    const exportStartupReport =
        document.getElementById("exportStartupReport");


    /* =====================================================
       ACADEMIC YEAR
       ===================================================== */

    if (academicYear) {

        academicYear.addEventListener(
            "change",
            function () {

                if (footerYear) {

                    footerYear.textContent =
                        academicYear.value;

                }

            }
        );

    }


    /* =====================================================
       STATUS FILTER
       ===================================================== */

    if (ideaStatus) {

        ideaStatus.addEventListener(
            "change",
            filterIdeas
        );

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    if (ideaSearch) {

        ideaSearch.addEventListener(
            "input",
            filterIdeas
        );

    }


    /* =====================================================
       FILTER IDEAS
       ===================================================== */

    function filterIdeas() {

        if (!tableBody) {
            return;
        }


        const searchValue =
            ideaSearch
                ? ideaSearch.value
                    .trim()
                    .toLowerCase()
                : "";


        const selectedStatus =
            ideaStatus
                ? ideaStatus.value
                : "all";


        const rows =
            tableBody.querySelectorAll("tr");


        rows.forEach(function (row) {

            const rowStatus =
                (
                    row.dataset.status || ""
                ).toLowerCase();


            const rowSearch =
                (
                    row.dataset.search || ""
                ).toLowerCase();


            const searchMatch =
                rowSearch.includes(searchValue);


            const statusMatch =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;


            row.style.display =
                searchMatch && statusMatch
                    ? ""
                    : "none";

        });

    }


    /* =====================================================
       EXPORT
       ===================================================== */

    if (exportStartupReport) {

        exportStartupReport.addEventListener(
            "click",
            exportReport
        );

    }


    function exportReport() {

        if (!tableBody) {
            return;
        }


        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            ).filter(function (row) {

                return row.style.display !== "none";

            });


        if (rows.length === 0) {

            alert(
                "No startup ideas available to export."
            );

            return;

        }


        const headers = [
            "Startup Idea",
            "Team Lead",
            "Branch",
            "Team",
            "Category",
            "Submitted",
            "Status"
        ];


        const csvRows = [];


        csvRows.push(
            headers.map(csvEscape).join(",")
        );


        rows.forEach(function (row) {

            const cells =
                Array.from(
                    row.querySelectorAll("td")
                );


            if (cells.length === 0) {
                return;
            }


            const idea =
                cells[0]
                    ? cells[0].innerText.trim()
                    : "";


            const teamLead =
                cells[1]
                    ? cells[1].innerText.trim()
                    : "";


            const branch =
                cells[2]
                    ? cells[2].innerText.trim()
                    : "";


            const team =
                cells[3]
                    ? cells[3].innerText.trim()
                    : "";


            const category =
                cells[4]
                    ? cells[4].innerText.trim()
                    : "";


            const submitted =
                cells[5]
                    ? cells[5].innerText.trim()
                    : "";


            const status =
                cells[6]
                    ? cells[6].innerText.trim()
                    : "";


            csvRows.push([
                idea,
                teamLead,
                branch,
                team,
                category,
                submitted,
                status
            ].map(csvEscape).join(","));

        });


        const csvContent =
            "\uFEFF" + csvRows.join("\n");


        const blob =
            new Blob(
                [csvContent],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        const year =
            academicYear
                ? academicYear.value
                : "2026-27";


        link.href = url;


        link.download =
            `Startup_Ideas_Report_${year}.csv`;


        document.body.appendChild(link);


        link.click();


        document.body.removeChild(link);


        URL.revokeObjectURL(url);

    }


    /* =====================================================
       CSV ESCAPE
       ===================================================== */

    function csvEscape(value) {

        const text =
            String(value || "")
                .replace(/\r?\n|\r/g, " ")
                .trim();


        return `"${text.replace(/"/g, '""')}"`;

    }

});