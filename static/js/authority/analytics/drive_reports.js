document.addEventListener("DOMContentLoaded", function () {

    const academicYear =
        document.getElementById("academicYear");

    const driveType =
        document.getElementById("driveType");

    const companySearch =
        document.getElementById("companySearch");

    const tableBody =
        document.getElementById("driveTableBody");

    const footerYear =
        document.getElementById("footerYear");

    const exportDriveReport =
        document.getElementById("exportDriveReport");


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
       DRIVE TYPE
       ===================================================== */

    if (driveType) {

        driveType.addEventListener(
            "change",
            filterTable
        );

    }


    /* =====================================================
       COMPANY SEARCH
       ===================================================== */

    if (companySearch) {

        companySearch.addEventListener(
            "input",
            filterTable
        );

    }


    /* =====================================================
       FILTER TABLE
       ===================================================== */

    function filterTable() {

        const searchValue =
            companySearch
                ? companySearch.value
                    .trim()
                    .toLowerCase()
                : "";


        const selectedType =
            driveType
                ? driveType.value
                : "all";


        const rows =
            tableBody
                ? tableBody.querySelectorAll("tr")
                : [];


        rows.forEach(function (row) {

            const company =
                (
                    row.dataset.company || ""
                ).toLowerCase();


            const typeElement =
                row.querySelector(".type-badge");


            const typeText =
                typeElement
                    ? typeElement.textContent
                        .trim()
                        .toLowerCase()
                    : "";


            const searchMatch =
                company.includes(searchValue);


            let typeMatch = true;


            if (selectedType === "on-campus") {

                typeMatch =
                    typeText === "on campus";

            }


            if (selectedType === "off-campus") {

                typeMatch =
                    typeText === "off campus";

            }


            row.style.display =
                searchMatch && typeMatch
                    ? ""
                    : "none";

        });

    }


    /* =====================================================
       EXPORT DRIVE REPORT
       ===================================================== */

    if (exportDriveReport) {

        exportDriveReport.addEventListener(
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
                "No drive data available to export."
            );

            return;

        }


        const headers = [
            "Company",
            "Date",
            "Type",
            "Applicants",
            "Shortlisted",
            "Selected",
            "Package",
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


            const company =
                cells[0]
                    ? cells[0].innerText.trim()
                    : "";


            const date =
                cells[1]
                    ? cells[1].innerText.trim()
                    : "";


            const type =
                cells[2]
                    ? cells[2].innerText.trim()
                    : "";


            const applicants =
                cells[3]
                    ? cells[3].innerText.trim()
                    : "";


            const shortlisted =
                cells[4]
                    ? cells[4].innerText.trim()
                    : "";


            const selected =
                cells[5]
                    ? cells[5].innerText.trim()
                    : "";


            const packageValue =
                cells[6]
                    ? cells[6].innerText.trim()
                    : "";


            const status =
                cells[7]
                    ? cells[7].innerText.trim()
                    : "";


            csvRows.push([
                company,
                date,
                type,
                applicants,
                shortlisted,
                selected,
                packageValue,
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
            `Drive_Report_${year}.csv`;


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