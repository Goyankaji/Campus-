/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - INTERVIEWS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("interviewSearch");

    const dateFilter =
        document.getElementById("interviewDateFilter");

    const companyFilter =
        document.getElementById("interviewCompanyFilter");

    const collegeFilter =
        document.getElementById("interviewCollegeFilter");

    const modeFilter =
        document.getElementById("interviewModeFilter");

    const statusFilter =
        document.getElementById("interviewStatusFilter");

    const resetFilters =
        document.getElementById("resetInterviewFilters");

    const exportButton =
        document.getElementById("exportInterviews");

    const scheduleButton =
        document.getElementById("scheduleInterviewBtn");

    const table =
        document.getElementById("interviewsTable");

    const interviewCount =
        document.getElementById("interviewCount");


    /* =====================================================
       TABLE ROWS
    ====================================================== */

    const rows = table
        ? Array.from(
            table.querySelectorAll("tbody tr")
        )
        : [];


    /* =====================================================
       FILTER INTERVIEWS
    ====================================================== */

    function filterInterviews() {

        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const dateValue =
            dateFilter
                ? dateFilter.value
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


        const modeValue =
            modeFilter
                ? modeFilter.value
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


            const date =
                (
                    row.dataset.date ||
                    ""
                ).toLowerCase();


            const mode =
                (
                    row.dataset.mode ||
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
               DATE
            --------------------------------------------- */

            const matchesDate =
                dateValue === "all" ||
                date === dateValue;


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
               MODE
            --------------------------------------------- */

            const matchesMode =
                modeValue === "all" ||
                mode === modeValue;


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
                matchesDate &&
                matchesCompany &&
                matchesCollege &&
                matchesMode &&
                matchesStatus;


            if (shouldShow) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        updateInterviewCount(
            visibleCount
        );

    }


    /* =====================================================
       UPDATE COUNT
    ====================================================== */

    function updateInterviewCount(
        visibleCount
    ) {

        if (!interviewCount) {

            return;

        }


        const totalRows =
            rows.length;


        if (
            visibleCount ===
            totalRows
        ) {

            interviewCount.textContent =
                "Showing " +
                visibleCount +
                " of " +
                totalRows +
                " interviews";

        } else {

            interviewCount.textContent =
                "Showing " +
                visibleCount +
                " matching interviews";

        }

    }


    /* =====================================================
       SEARCH EVENT
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterInterviews
        );

    }


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    if (dateFilter) {

        dateFilter.addEventListener(
            "change",
            filterInterviews
        );

    }


    if (companyFilter) {

        companyFilter.addEventListener(
            "change",
            filterInterviews
        );

    }


    if (collegeFilter) {

        collegeFilter.addEventListener(
            "change",
            filterInterviews
        );

    }


    if (modeFilter) {

        modeFilter.addEventListener(
            "change",
            filterInterviews
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterInterviews
        );

    }


    /* =====================================================
       RESET
    ====================================================== */

    if (resetFilters) {

        resetFilters.addEventListener(
            "click",
            function () {

                if (searchInput) {

                    searchInput.value = "";

                }


                if (dateFilter) {

                    dateFilter.value = "all";

                }


                if (companyFilter) {

                    companyFilter.value = "all";

                }


                if (collegeFilter) {

                    collegeFilter.value = "all";

                }


                if (modeFilter) {

                    modeFilter.value = "all";

                }


                if (statusFilter) {

                    statusFilter.value = "all";

                }


                filterInterviews();

            }
        );

    }


    /* =====================================================
       SCHEDULE INTERVIEW
    ====================================================== */

    if (scheduleButton) {

        scheduleButton.addEventListener(
            "click",
            function () {

                alert(
                    "Schedule Interview\n\n" +
                    "Interview scheduling form will be connected later."
                );

            }
        );

    }


    /* =====================================================
       VIEW INTERVIEW
    ====================================================== */

    document
        .querySelectorAll(
            ".view-interview-btn"
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


                    const status =
                        row.dataset.status ||
                        "Unknown";


                    alert(
                        "Interview Details\n\n" +
                        "Student: " +
                        student +
                        "\nCompany: " +
                        company +
                        "\nStatus: " +
                        formatText(status)
                    );

                }
            );

        });


    /* =====================================================
       EDIT INTERVIEW
    ====================================================== */

    document
        .querySelectorAll(
            ".edit-interview-btn"
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


                    alert(
                        "Edit Interview\n\n" +
                        student +
                        " — " +
                        company +
                        "\n\n" +
                        "Edit interview form will be connected later."
                    );

                }
            );

        });


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    document
        .querySelectorAll(
            ".more-interview-btn"
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


                    alert(
                        "More Options\n\n" +
                        student +
                        " — " +
                        company +
                        "\n\n" +
                        "Additional interview actions will be added later."
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
            exportVisibleInterviews
        );

    }


    /* =====================================================
       EXPORT VISIBLE INTERVIEWS
    ====================================================== */

    function exportVisibleInterviews() {

        const visibleRows =
            rows.filter(function (row) {

                return row.style.display !== "none";

            });


        if (!visibleRows.length) {

            alert(
                "No interviews available to export."
            );

            return;

        }


        const headers = [

            "Student",

            "College",

            "Company",

            "Job Role",

            "Date",

            "Time",

            "Round",

            "Mode",

            "Interviewer",

            "Status"

        ];


        const csvRows = [

            headers.join(",")

        ];


        visibleRows.forEach(
            function (row) {

                const cells =
                    row.querySelectorAll("td");


                if (cells.length < 10) {

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


                const dateTime =
                    cells[5]
                        .textContent
                        .trim()
                        .split(/\s+/);


                const interviewDate =
                    dateTime
                        .slice(0, 3)
                        .join(" ");


                const interviewTime =
                    dateTime
                        .slice(3)
                        .join(" ");


                const round =
                    cells[6]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const mode =
                    row.dataset.mode || "";


                const interviewer =
                    cells[8]
                        .textContent
                        .trim()
                        .replace(
                            /\s+/g,
                            " "
                        );


                const status =
                    cells[9]
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

                    interviewDate,

                    interviewTime,

                    round,

                    mode,

                    interviewer,

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
            "interviews.csv";


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
       FORMAT TEXT
    ====================================================== */

    function formatText(value) {

        return String(value)
            .replace(
                /[-_]/g,
                " "
            )
            .replace(
                /\b\w/g,
                function (letter) {
                    return letter.toUpperCase();
                }
            );

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
                        "Interview pagination:",
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterInterviews();


    console.log(
        "TPO Interviews Page Loaded Successfully"
    );

});