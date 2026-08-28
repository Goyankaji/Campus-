/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - PLACED STUDENTS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("placedSearch");

    const companyFilter =
        document.getElementById("placedCompanyFilter");

    const collegeFilter =
        document.getElementById("placedCollegeFilter");

    const packageFilter =
        document.getElementById("placedPackageFilter");

    const joiningFilter =
        document.getElementById("placedJoiningFilter");

    const resetButton =
        document.getElementById("resetPlacedFilters");

    const exportButton =
        document.getElementById("exportPlacedStudents");

    const table =
        document.getElementById("placedStudentsTable");

    const countText =
        document.getElementById("placedCount");


    /* =====================================================
       TABLE ROWS
    ====================================================== */

    const rows = table
        ? Array.from(
            table.querySelectorAll("tbody tr")
        )
        : [];


    /* =====================================================
       PACKAGE CHECK
    ====================================================== */

    function matchesPackage(
        packageValue,
        selectedPackage
    ) {

        if (
            selectedPackage === "all"
        ) {

            return true;

        }


        const value =
            parseFloat(packageValue);


        if (Number.isNaN(value)) {

            return false;

        }


        switch (selectedPackage) {

            case "0-5":

                return value < 5;


            case "5-8":

                return value >= 5 &&
                       value < 8;


            case "8-12":

                return value >= 8 &&
                       value < 12;


            case "12+":

                return value >= 12;


            default:

                return true;

        }

    }


    /* =====================================================
       FILTER STUDENTS
    ====================================================== */

    function filterPlacedStudents() {

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


        const packageValue =
            packageFilter
                ? packageFilter.value
                    .trim()
                    .toLowerCase()
                : "all";


        const joiningValue =
            joiningFilter
                ? joiningFilter.value
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


            const packageAmount =
                row.dataset.package ||
                "";


            const joiningStatus =
                (
                    row.dataset.joining ||
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
               PACKAGE
            --------------------------------------------- */

            const matchesPackageFilter =
                matchesPackage(
                    packageAmount,
                    packageValue
                );


            /* ---------------------------------------------
               JOINING
            --------------------------------------------- */

            const matchesJoining =
                joiningValue === "all" ||
                joiningStatus === joiningValue;


            /* ---------------------------------------------
               FINAL
            --------------------------------------------- */

            const shouldShow =
                matchesSearch &&
                matchesCompany &&
                matchesCollege &&
                matchesPackageFilter &&
                matchesJoining;


            if (shouldShow) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        updateCount(
            visibleCount
        );

    }


    /* =====================================================
       UPDATE COUNT
    ====================================================== */

    function updateCount(
        visibleCount
    ) {

        if (!countText) {

            return;

        }


        if (
            visibleCount ===
            rows.length
        ) {

            countText.textContent =
                "Showing " +
                visibleCount +
                " of " +
                rows.length +
                " placed students";

        } else {

            countText.textContent =
                "Showing " +
                visibleCount +
                " matching placed students";

        }

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterPlacedStudents
        );

    }


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    if (companyFilter) {

        companyFilter.addEventListener(
            "change",
            filterPlacedStudents
        );

    }


    if (collegeFilter) {

        collegeFilter.addEventListener(
            "change",
            filterPlacedStudents
        );

    }


    if (packageFilter) {

        packageFilter.addEventListener(
            "change",
            filterPlacedStudents
        );

    }


    if (joiningFilter) {

        joiningFilter.addEventListener(
            "change",
            filterPlacedStudents
        );

    }


    /* =====================================================
       RESET
    ====================================================== */

    if (resetButton) {

        resetButton.addEventListener(
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


                if (packageFilter) {

                    packageFilter.value = "all";

                }


                if (joiningFilter) {

                    joiningFilter.value = "all";

                }


                filterPlacedStudents();

            }
        );

    }


    /* =====================================================
       VIEW STUDENT
    ====================================================== */

    document
        .querySelectorAll(
            ".view-placed-btn"
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


                    const college =
                        row.dataset.college ||
                        "-";


                    const packageAmount =
                        row.dataset.package ||
                        "-";


                    const joiningStatus =
                        row.dataset.joining ||
                        "-";


                    alert(
                        "Placement Details\n\n" +

                        "Student: " +
                        student +

                        "\nCollege: " +
                        college +

                        "\nCompany: " +
                        company +

                        "\nPackage: ₹" +
                        packageAmount +
                        " LPA" +

                        "\nJoining Status: " +
                        formatText(
                            joiningStatus
                        )
                    );

                }
            );

        });


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    document
        .querySelectorAll(
            ".more-placed-btn"
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

                        "Additional placement actions will be added later."
                    );

                }
            );

        });


    /* =====================================================
       EXPORT CSV
    ====================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportPlacedStudents
        );

    }


    /* =====================================================
       EXPORT FUNCTION
    ====================================================== */

    function exportPlacedStudents() {

        const visibleRows =
            rows.filter(function (row) {

                return row.style.display !== "none";

            });


        if (!visibleRows.length) {

            alert(
                "No placed students available to export."
            );

            return;

        }


        const headers = [

            "Student",

            "Registration No",

            "College",

            "Company",

            "Job Role",

            "Package",

            "Offer Date",

            "Joining Date",

            "Joining Status"

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


                const registrationNo =
                    cells[1]
                        .querySelector(
                            ".placed-student-info span"
                        )
                        ?.textContent
                        .trim() || "";


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


                const packageAmount =
                    row.dataset.package
                    ? "₹" +
                      row.dataset.package +
                      " LPA"
                    : "";


                const offerDate =
                    cells[6]
                        .textContent
                        .trim();


                const joiningDate =
                    cells[7]
                        .textContent
                        .trim();


                const joiningStatus =
                    row.dataset.joining || "";


                const data = [

                    student,

                    registrationNo,

                    college,

                    company,

                    jobRole,

                    packageAmount,

                    offerDate,

                    joiningDate,

                    formatText(
                        joiningStatus
                    )

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
            "placed_students.csv";


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
       PAGINATION
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
                        "Placed students pagination:",
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterPlacedStudents();


    console.log(
        "TPO Placed Students Page Loaded Successfully"
    );

});