document.addEventListener("DOMContentLoaded", function () {

    const academicYear =
        document.getElementById("academicYear");

    const companyStatus =
        document.getElementById("companyStatus");

    const companySearch =
        document.getElementById("companySearch");

    const tableBody =
        document.getElementById("companyTableBody");

    const footerYear =
        document.getElementById("footerYear");

    const exportCompanyReport =
        document.getElementById("exportCompanyReport");


    /* ============================= */
    /* ACADEMIC YEAR */
    /* ============================= */

    if (academicYear) {

        academicYear.addEventListener("change", function () {

            if (footerYear) {
                footerYear.textContent =
                    academicYear.value;
            }

        });

    }


    /* ============================= */
    /* STATUS FILTER */
    /* ============================= */

    if (companyStatus) {

        companyStatus.addEventListener(
            "change",
            filterCompanies
        );

    }


    /* ============================= */
    /* SEARCH */
    /* ============================= */

    if (companySearch) {

        companySearch.addEventListener(
            "input",
            filterCompanies
        );

    }


    /* ============================= */
    /* FILTER COMPANIES */
    /* ============================= */

    function filterCompanies() {

        if (!tableBody) {
            return;
        }

        const searchValue =
            companySearch
                ? companySearch.value.trim().toLowerCase()
                : "";

        const selectedStatus =
            companyStatus
                ? companyStatus.value
                : "all";


        const rows =
            tableBody.querySelectorAll("tr");


        rows.forEach(function (row) {

            const company =
                (row.dataset.company || "")
                    .toLowerCase();

            const status =
                (row.dataset.status || "")
                    .toLowerCase();


            const matchesSearch =
                company.includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;


            row.style.display =
                matchesSearch && matchesStatus
                    ? ""
                    : "none";

        });

    }


    /* ============================= */
    /* EXPORT COMPANY REPORT */
    /* ============================= */

    if (exportCompanyReport) {

        exportCompanyReport.addEventListener(
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

            alert("No company data available to export.");

            return;

        }


        const headers = [
            "Company",
            "Type",
            "Drives",
            "Students Selected",
            "Average Package",
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

            const type =
                cells[1]
                    ? cells[1].innerText.trim()
                    : "";

            const drives =
                cells[2]
                    ? cells[2].innerText.trim()
                    : "";

            const students =
                cells[3]
                    ? cells[3].innerText.trim()
                    : "";

            const packageValue =
                cells[4]
                    ? cells[4].innerText.trim()
                    : "";

            const status =
                cells[5]
                    ? cells[5].innerText.trim()
                    : "";


            csvRows.push([
                company,
                type,
                drives,
                students,
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
                    type: "text/csv;charset=utf-8;"
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
            `Company_Report_${year}.csv`;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    }


    /* ============================= */
    /* CSV ESCAPE */
    /* ============================= */

    function csvEscape(value) {

        const text =
            String(value || "")
                .replace(/\r?\n|\r/g, " ")
                .trim();


        return `"${text.replace(/"/g, '""')}"`;

    }

});