document.addEventListener("DOMContentLoaded", function () {

    const academicYear =
        document.getElementById("academicYear");

    const branchFilter =
        document.getElementById("branchFilter");

    const branchSearch =
        document.getElementById("branchSearch");

    const tableBody =
        document.getElementById("branchTableBody");

    const footerYear =
        document.getElementById("footerYear");

    const exportBranchReport =
        document.getElementById("exportBranchReport");


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
       BRANCH FILTER
       ===================================================== */

    if (branchFilter) {

        branchFilter.addEventListener(
            "change",
            filterBranches
        );

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    if (branchSearch) {

        branchSearch.addEventListener(
            "input",
            filterBranches
        );

    }


    /* =====================================================
       FILTER BRANCHES
       ===================================================== */

    function filterBranches() {

        if (!tableBody) {
            return;
        }


        const searchValue =
            branchSearch
                ? branchSearch.value
                    .trim()
                    .toLowerCase()
                : "";


        const selectedBranch =
            branchFilter
                ? branchFilter.value
                : "all";


        const rows =
            tableBody.querySelectorAll("tr");


        rows.forEach(function (row) {

            const branch =
                (
                    row.dataset.branch || ""
                ).toLowerCase();


            const branchName =
                row.querySelector("td")
                    ? row.querySelector("td")
                        .innerText
                        .toLowerCase()
                    : "";


            const searchMatch =
                branchName.includes(searchValue);


            const branchMatch =
                selectedBranch === "all" ||
                branch === selectedBranch;


            row.style.display =
                searchMatch && branchMatch
                    ? ""
                    : "none";

        });

    }


    /* =====================================================
       EXPORT BRANCH REPORT
       ===================================================== */

    if (exportBranchReport) {

        exportBranchReport.addEventListener(
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
                "No branch data available to export."
            );

            return;

        }


        const headers = [
            "Branch",
            "Students",
            "Eligible",
            "Appeared",
            "Selected",
            "Placement %",
            "Average Package",
            "Highest Package"
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


            const branch =
                cells[0]
                    ? cells[0].innerText.trim()
                    : "";


            const students =
                cells[1]
                    ? cells[1].innerText.trim()
                    : "";


            const eligible =
                cells[2]
                    ? cells[2].innerText.trim()
                    : "";


            const appeared =
                cells[3]
                    ? cells[3].innerText.trim()
                    : "";


            const selected =
                cells[4]
                    ? cells[4].innerText.trim()
                    : "";


            const placementRate =
                cells[5]
                    ? cells[5].innerText.trim()
                    : "";


            const averagePackage =
                cells[6]
                    ? cells[6].innerText.trim()
                    : "";


            const highestPackage =
                cells[7]
                    ? cells[7].innerText.trim()
                    : "";


            csvRows.push([
                branch,
                students,
                eligible,
                appeared,
                selected,
                placementRate,
                averagePackage,
                highestPackage
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
            `Branch_Wise_Report_${year}.csv`;


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