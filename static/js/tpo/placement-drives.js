/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - PLACEMENT DRIVES PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("driveSearch");

    const statusFilter =
        document.getElementById("driveStatusFilter");

    const companyFilter =
        document.getElementById("driveCompanyFilter");

    const collegeFilter =
        document.getElementById("driveCollegeFilter");

    const typeFilter =
        document.getElementById("driveTypeFilter");

    const resetFilters =
        document.getElementById("resetDriveFilters");

    const exportButton =
        document.getElementById("exportDrives");

    const createDriveButton =
        document.getElementById("createDriveBtn");

    const table =
        document.getElementById("drivesTable");

    const driveCount =
        document.getElementById("driveCount");


    /* =====================================================
       TABLE ROWS
    ====================================================== */

    const rows = table
        ? Array.from(
            table.querySelectorAll(
                "tbody tr"
            )
        )
        : [];


    /* =====================================================
       FILTER DRIVES
    ====================================================== */

    function filterDrives() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const statusValue =
            statusFilter
                ? statusFilter.value
                    .trim()
                    .toLowerCase()
                : "all";


        const companyValue =
            companyFilter
                ? companyFilter.value
                    .trim()
                    .toLowerCase()
                : "all";


        const collegeValue =
            collegeFilter
                ? collegeFilter.value
                    .trim()
                    .toLowerCase()
                : "all";


        const typeValue =
            typeFilter
                ? typeFilter.value
                    .trim()
                    .toLowerCase()
                : "all";


        let visibleCount = 0;


        rows.forEach(function (row) {

            const company =
                (
                    row.dataset.company ||
                    ""
                ).toLowerCase();


            const role =
                (
                    row.dataset.role ||
                    ""
                ).toLowerCase();


            const status =
                (
                    row.dataset.status ||
                    ""
                ).toLowerCase();


            const colleges =
                (
                    row.dataset.college ||
                    ""
                ).toLowerCase();


            const driveType =
                (
                    row.dataset.type ||
                    ""
                ).toLowerCase();


            /* ---------------------------------------------
               SEARCH
            --------------------------------------------- */

            const matchesSearch =
                !searchValue ||
                company.includes(searchValue) ||
                role.includes(searchValue);


            /* ---------------------------------------------
               STATUS
            --------------------------------------------- */

            const matchesStatus =
                statusValue === "all" ||
                status === statusValue;


            /* ---------------------------------------------
               COMPANY
            --------------------------------------------- */

            const matchesCompany =
                companyValue === "all" ||
                company === companyValue;


            /* ---------------------------------------------
               COLLEGE
            --------------------------------------------- */

            const matchesCollege =
                collegeValue === "all" ||
                colleges.includes(collegeValue);


            /* ---------------------------------------------
               DRIVE TYPE
            --------------------------------------------- */

            const matchesType =
                typeValue === "all" ||
                driveType === typeValue;


            /* ---------------------------------------------
               FINAL RESULT
            --------------------------------------------- */

            const shouldShow =
                matchesSearch &&
                matchesStatus &&
                matchesCompany &&
                matchesCollege &&
                matchesType;


            if (shouldShow) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        updateDriveCount(
            visibleCount
        );

    }


    /* =====================================================
       UPDATE COUNT
    ====================================================== */

    function updateDriveCount(
        visibleCount
    ) {

        if (!driveCount) {

            return;

        }


        const totalDrives =
            rows.length;


        if (
            visibleCount ===
            totalDrives
        ) {

            driveCount.textContent =
                "Showing " +
                visibleCount +
                " of " +
                totalDrives +
                " drives";

        } else {

            driveCount.textContent =
                "Showing " +
                visibleCount +
                " matching drives";

        }

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterDrives
        );

    }


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterDrives
        );

    }


    if (companyFilter) {

        companyFilter.addEventListener(
            "change",
            filterDrives
        );

    }


    if (collegeFilter) {

        collegeFilter.addEventListener(
            "change",
            filterDrives
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            filterDrives
        );

    }


    /* =====================================================
       RESET FILTERS
    ====================================================== */

    if (resetFilters) {

        resetFilters.addEventListener(
            "click",
            function () {

                if (searchInput) {

                    searchInput.value = "";

                }


                if (statusFilter) {

                    statusFilter.value = "all";

                }


                if (companyFilter) {

                    companyFilter.value = "all";

                }


                if (collegeFilter) {

                    collegeFilter.value = "all";

                }


                if (typeFilter) {

                    typeFilter.value = "all";

                }


                filterDrives();

            }
        );

    }


    /* =====================================================
       CREATE DRIVE
    ====================================================== */

    if (createDriveButton) {

        createDriveButton.addEventListener(
            "click",
            function () {

                /*
                 * Create Drive form will be connected
                 * later with Flask.
                 */

                alert(
                    "Create Placement Drive\n\n" +
                    "Drive creation form will be connected here."
                );

            }
        );

    }


    /* =====================================================
       VIEW DRIVE
    ====================================================== */

    document
        .querySelectorAll(
            ".view-drive-btn"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        button.closest("tr");

                    if (!row) {

                        return;

                    }


                    const company =
                        row.dataset.company ||
                        "Company";


                    const role =
                        row.dataset.role ||
                        "Role";


                    console.log(
                        "View drive:",
                        company,
                        role
                    );


                    alert(
                        "Placement Drive\n\n" +
                        company +
                        " — " +
                        role +
                        "\n\n" +
                        "Drive detail page will be connected later."
                    );

                }
            );

        });


    /* =====================================================
       EDIT DRIVE
    ====================================================== */

    document
        .querySelectorAll(
            ".edit-drive-btn"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        button.closest("tr");

                    if (!row) {

                        return;

                    }


                    const company =
                        row.dataset.company ||
                        "Company";


                    const role =
                        row.dataset.role ||
                        "Role";


                    console.log(
                        "Edit drive:",
                        company,
                        role
                    );


                    alert(
                        "Edit Placement Drive\n\n" +
                        company +
                        " — " +
                        role +
                        "\n\n" +
                        "Edit form will be connected later."
                    );

                }
            );

        });


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    document
        .querySelectorAll(
            ".more-drive-btn"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        button.closest("tr");

                    if (!row) {

                        return;

                    }


                    const company =
                        row.dataset.company ||
                        "Company";


                    console.log(
                        "More options:",
                        company
                    );


                    alert(
                        "More Options\n\n" +
                        company +
                        "\n\n" +
                        "Additional drive actions will be added here."
                    );

                }
            );

        });


    /* =====================================================
       EXPORT
    ====================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportVisibleDrives
        );

    }


    /* =====================================================
       EXPORT VISIBLE DRIVES
    ====================================================== */

    function exportVisibleDrives() {

        const visibleRows =
            rows.filter(function (row) {

                return row.style.display !== "none";

            });


        if (!visibleRows.length) {

            alert(
                "No placement drives available to export."
            );

            return;

        }


        const headers = [

            "Company",

            "Job Role",

            "Drive Date",

            "Registration Deadline",

            "Colleges",

            "Eligibility",

            "Package",

            "Applicants",

            "Selected",

            "Status"

        ];


        const csvRows = [

            headers.join(",")

        ];


        visibleRows.forEach(
            function (row) {

                const cells =
                    row.querySelectorAll("td");


                if (cells.length < 11) {

                    return;

                }


                const company =
                    row.dataset.company || "";


                const role =
                    row.dataset.role || "";


                const driveDate =
                    cells[3]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const deadline =
                    cells[4]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const colleges =
                    row.dataset.college || "";


                const eligibility =
                    cells[6]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const packageValue =
                    cells[7]
                        .textContent
                        .trim();


                const applicants =
                    cells[8]
                        .textContent
                        .trim();


                const selected =
                    cells[9]
                        .textContent
                        .trim();


                const status =
                    cells[10]
                        .textContent
                        .trim();


                const data = [

                    company,

                    role,

                    driveDate,

                    deadline,

                    colleges,

                    eligibility,

                    packageValue,

                    applicants,

                    selected,

                    status

                ];


                csvRows.push(

                    data
                        .map(csvEscape)
                        .join(",")

                );

            }
        );


        const csvContent =
            csvRows.join("\n");


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


        link.download =
            "placement_drives.csv";


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

        const stringValue =
            String(value)
                .replace(
                    /"/g,
                    '""'
                );


        return '"' +
            stringValue +
            '"';

    }


    /* =====================================================
       PAGINATION UI
    ====================================================== */

    const paginationButtons =
        document.querySelectorAll(
            ".pagination button"
        );


    paginationButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        button.disabled ||
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        return;

                    }


                    paginationButtons
                        .forEach(function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    console.log(
                        "Drive pagination:",
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterDrives();


    console.log(
        "TPO Placement Drives Page Loaded Successfully"
    );

});