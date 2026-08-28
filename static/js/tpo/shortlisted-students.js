/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - SHORTLISTED STUDENTS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("shortlistedSearch");

    const companyFilter =
        document.getElementById("shortlistedCompanyFilter");

    const collegeFilter =
        document.getElementById("shortlistedCollegeFilter");

    const interviewFilter =
        document.getElementById("shortlistedInterviewFilter");

    const statusFilter =
        document.getElementById("shortlistedStatusFilter");

    const resetFilters =
        document.getElementById("resetShortlistedFilters");

    const exportButton =
        document.getElementById("exportShortlisted");

    const table =
        document.getElementById("shortlistedTable");

    const shortlistedCount =
        document.getElementById("shortlistedCount");


    /* =====================================================
       TABLE ROWS
    ====================================================== */

    const rows = table
        ? Array.from(
            table.querySelectorAll("tbody tr")
        )
        : [];


    /* =====================================================
       FILTER SHORTLISTED STUDENTS
    ====================================================== */

    function filterShortlistedStudents() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


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


        const interviewValue =
            interviewFilter
                ? interviewFilter.value
                    .trim()
                    .toLowerCase()
                : "all";


        const statusValue =
            statusFilter
                ? statusFilter.value
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


            const interview =
                (
                    row.dataset.interview ||
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
               INTERVIEW
            --------------------------------------------- */

            const matchesInterview =
                interviewValue === "all" ||
                interview === interviewValue;


            /* ---------------------------------------------
               STATUS
            --------------------------------------------- */

            const matchesStatus =
                statusValue === "all" ||
                status === statusValue;


            /* ---------------------------------------------
               FINAL RESULT
            --------------------------------------------- */

            const shouldShow =
                matchesSearch &&
                matchesCompany &&
                matchesCollege &&
                matchesInterview &&
                matchesStatus;


            if (shouldShow) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        updateShortlistedCount(
            visibleCount
        );

    }


    /* =====================================================
       UPDATE COUNT
    ====================================================== */

    function updateShortlistedCount(
        visibleCount
    ) {

        if (!shortlistedCount) {

            return;

        }


        const totalRows =
            rows.length;


        if (
            visibleCount ===
            totalRows
        ) {

            shortlistedCount.textContent =
                "Showing " +
                visibleCount +
                " of " +
                totalRows +
                " shortlisted students";

        } else {

            shortlistedCount.textContent =
                "Showing " +
                visibleCount +
                " matching shortlisted students";

        }

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterShortlistedStudents
        );

    }


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    if (companyFilter) {

        companyFilter.addEventListener(
            "change",
            filterShortlistedStudents
        );

    }


    if (collegeFilter) {

        collegeFilter.addEventListener(
            "change",
            filterShortlistedStudents
        );

    }


    if (interviewFilter) {

        interviewFilter.addEventListener(
            "change",
            filterShortlistedStudents
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterShortlistedStudents
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


                if (companyFilter) {

                    companyFilter.value = "all";

                }


                if (collegeFilter) {

                    collegeFilter.value = "all";

                }


                if (interviewFilter) {

                    interviewFilter.value = "all";

                }


                if (statusFilter) {

                    statusFilter.value = "all";

                }


                filterShortlistedStudents();

            }
        );

    }


    /* =====================================================
       VIEW STUDENT
    ====================================================== */

    document
        .querySelectorAll(
            ".view-shortlisted-btn"
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
                        "View shortlisted student:",
                        student,
                        company
                    );


                    alert(
                        "Shortlisted Student\n\n" +
                        "Student: " +
                        student +
                        "\nCompany: " +
                        company +
                        "\n\n" +
                        "Student detail page will be connected later."
                    );

                }
            );

        });


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    document
        .querySelectorAll(
            ".more-shortlisted-btn"
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
                        "More options:",
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
       EXPORT
    ====================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportVisibleShortlisted
        );

    }


    /* =====================================================
       EXPORT VISIBLE STUDENTS
    ====================================================== */

    function exportVisibleShortlisted() {

        const visibleRows =
            rows.filter(function (row) {

                return row.style.display !== "none";

            });


        if (!visibleRows.length) {

            alert(
                "No shortlisted students available to export."
            );

            return;

        }


        const headers = [

            "Student",

            "College",

            "Company",

            "Job Role",

            "Package",

            "Applied Date",

            "Interview Status",

            "Selection Status"

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


                const packageValue =
                    cells[5]
                        .textContent
                        .trim();


                const appliedDate =
                    cells[6]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const interviewStatus =
                    cells[7]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const selectionStatus =
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

                    packageValue,

                    appliedDate,

                    interviewStatus,

                    selectionStatus

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
            "shortlisted_students.csv";


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
                        "Shortlisted pagination:",
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterShortlistedStudents();


    console.log(
        "TPO Shortlisted Students Page Loaded Successfully"
    );

});