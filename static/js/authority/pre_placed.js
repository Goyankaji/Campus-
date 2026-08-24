document.addEventListener("DOMContentLoaded", function () {

    const academicYear =
        document.getElementById("academicYear");

    const placementStatus =
        document.getElementById("placementStatus");

    const studentSearch =
        document.getElementById("studentSearch");

    const tableBody =
        document.getElementById("studentTableBody");

    const footerYear =
        document.getElementById("footerYear");

    const exportPrePlacedReport =
        document.getElementById("exportPrePlacedReport");


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

    if (placementStatus) {

        placementStatus.addEventListener(
            "change",
            filterStudents
        );

    }


    /* =====================================================
       SEARCH
       ===================================================== */

    if (studentSearch) {

        studentSearch.addEventListener(
            "input",
            filterStudents
        );

    }


    /* =====================================================
       FILTER STUDENTS
       ===================================================== */

    function filterStudents() {

        if (!tableBody) {
            return;
        }


        const searchValue =
            studentSearch
                ? studentSearch.value
                    .trim()
                    .toLowerCase()
                : "";


        const selectedStatus =
            placementStatus
                ? placementStatus.value
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

    if (exportPrePlacedReport) {

        exportPrePlacedReport.addEventListener(
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
                "No pre-placed student records available to export."
            );

            return;

        }


        const headers = [
            "Student",
            "Branch",
            "Roll No.",
            "Company",
            "Package",
            "Placed On",
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


            const student =
                cells[0]
                    ? cells[0].innerText.trim()
                    : "";


            const branch =
                cells[1]
                    ? cells[1].innerText.trim()
                    : "";


            const rollNo =
                cells[2]
                    ? cells[2].innerText.trim()
                    : "";


            const company =
                cells[3]
                    ? cells[3].innerText.trim()
                    : "";


            const packageValue =
                cells[4]
                    ? cells[4].innerText.trim()
                    : "";


            const placedOn =
                cells[5]
                    ? cells[5].innerText.trim()
                    : "";


            const status =
                cells[6]
                    ? cells[6].innerText.trim()
                    : "";


            csvRows.push([
                student,
                branch,
                rollNo,
                company,
                packageValue,
                placedOn,
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
            `Pre_Placed_Students_${year}.csv`;


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