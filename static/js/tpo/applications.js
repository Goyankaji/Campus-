/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - APPLICATIONS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("applicationSearch");

    const statusFilter =
        document.getElementById("applicationStatusFilter");

    const companyFilter =
        document.getElementById("applicationCompanyFilter");

    const collegeFilter =
        document.getElementById("applicationCollegeFilter");

    const resetFilters =
        document.getElementById("resetApplicationFilters");

    const exportButton =
        document.getElementById("exportApplications");

    const table =
        document.getElementById("applicationsTable");

    const applicationCount =
        document.getElementById("applicationCount");


    /* =====================================================
       TABLE ROWS
    ====================================================== */

    const rows = table
        ? Array.from(
            table.querySelectorAll("tbody tr")
        )
        : [];


    /* =====================================================
       FILTER APPLICATIONS
    ====================================================== */

    function filterApplications() {

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


        let visibleCount = 0;


        rows.forEach(function (row) {

            const student =
                (
                    row.dataset.student ||
                    ""
                ).toLowerCase();


            const company =
                (
                    row.dataset.company ||
                    ""
                ).toLowerCase();


            const college =
                (
                    row.dataset.college ||
                    ""
                ).toLowerCase();


            const status =
                (
                    row.dataset.status ||
                    ""
                ).toLowerCase();


            /* ---------------------------------------------
               SEARCH
            --------------------------------------------- */

            const matchesSearch =
                !searchValue ||
                student.includes(searchValue) ||
                company.includes(searchValue);


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
                college === collegeValue;


            /* ---------------------------------------------
               FINAL RESULT
            --------------------------------------------- */

            const shouldShow =
                matchesSearch &&
                matchesStatus &&
                matchesCompany &&
                matchesCollege;


            if (shouldShow) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        updateApplicationCount(
            visibleCount
        );

    }


    /* =====================================================
       UPDATE COUNT
    ====================================================== */

    function updateApplicationCount(
        visibleCount
    ) {

        if (!applicationCount) {

            return;

        }


        const totalRows =
            rows.length;


        if (
            visibleCount ===
            totalRows
        ) {

            applicationCount.textContent =
                "Showing " +
                visibleCount +
                " of " +
                totalRows +
                " applications";

        } else {

            applicationCount.textContent =
                "Showing " +
                visibleCount +
                " matching applications";

        }

    }


    /* =====================================================
       SEARCH EVENT
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterApplications
        );

    }


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterApplications
        );

    }


    if (companyFilter) {

        companyFilter.addEventListener(
            "change",
            filterApplications
        );

    }


    if (collegeFilter) {

        collegeFilter.addEventListener(
            "change",
            filterApplications
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


                filterApplications();

            }
        );

    }


    /* =====================================================
       VIEW APPLICATION
    ====================================================== */

    document
        .querySelectorAll(
            ".view-application-btn"
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


                    const student =
                        row.dataset.student ||
                        "Student";


                    const company =
                        row.dataset.company ||
                        "Company";


                    console.log(
                        "View application:",
                        student,
                        company
                    );


                    alert(
                        "Application Details\n\n" +
                        "Student: " +
                        student +
                        "\nCompany: " +
                        company +
                        "\n\n" +
                        "Application detail page will be connected later."
                    );

                }
            );

        });


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    document
        .querySelectorAll(
            ".more-application-btn"
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


                    const student =
                        row.dataset.student ||
                        "Student";


                    const company =
                        row.dataset.company ||
                        "Company";


                    console.log(
                        "More application options:",
                        student,
                        company
                    );


                    alert(
                        "More Options\n\n" +
                        student +
                        " — " +
                        company +
                        "\n\n" +
                        "Additional actions will be added later."
                    );

                }
            );

        });


    /* =====================================================
       EXPORT APPLICATIONS
    ====================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportVisibleApplications
        );

    }


    /* =====================================================
       EXPORT FUNCTION
    ====================================================== */

    function exportVisibleApplications() {

        const visibleRows =
            rows.filter(function (row) {

                return row.style.display !== "none";

            });


        if (!visibleRows.length) {

            alert(
                "No applications available to export."
            );

            return;

        }


        const headers = [

            "Student",

            "College",

            "Company",

            "Job Role",

            "Applied Date",

            "Package",

            "Interview Status",

            "Application Status"

        ];


        const csvRows = [

            headers.join(",")

        ];


        visibleRows.forEach(
            function (row) {

                const cells =
                    row.querySelectorAll("td");


                if (cells.length < 9) {

                    return;

                }


                const student =
                    row.dataset.student || "";


                const college =
                    row.dataset.college || "";


                const company =
                    row.dataset.company || "";


                const jobRole =
                    cells[4]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const appliedDate =
                    cells[5]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const packageValue =
                    cells[6]
                        .textContent
                        .trim();


                const interviewStatus =
                    cells[7]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const applicationStatus =
                    cells[8]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const data = [

                    student,

                    college,

                    company,

                    jobRole,

                    appliedDate,

                    packageValue,

                    interviewStatus,

                    applicationStatus

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
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;


        link.download =
            "applications.csv";


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
                        "Application pagination:",
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterApplications();


    console.log(
        "TPO Applications Page Loaded Successfully"
    );

});