/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - OFFERS & JOINING
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("offerSearch");

    const companyFilter =
        document.getElementById("offerCompanyFilter");

    const collegeFilter =
        document.getElementById("offerCollegeFilter");

    const offerStatusFilter =
        document.getElementById("offerStatusFilter");

    const joiningStatusFilter =
        document.getElementById("joiningStatusFilter");

    const resetFilters =
        document.getElementById("resetOfferFilters");

    const exportButton =
        document.getElementById("exportOffers");

    const addOfferButton =
        document.getElementById("addOfferBtn");

    const table =
        document.getElementById("offersTable");

    const offerCount =
        document.getElementById("offerCount");


    /* =====================================================
       TABLE ROWS
    ====================================================== */

    const rows = table
        ? Array.from(
            table.querySelectorAll("tbody tr")
        )
        : [];


    /* =====================================================
       FILTER OFFERS
    ====================================================== */

    function filterOffers() {

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


        const offerStatusValue =
            offerStatusFilter
                ? offerStatusFilter.value
                    .trim()
                    .toLowerCase()
                : "all";


        const joiningStatusValue =
            joiningStatusFilter
                ? joiningStatusFilter.value
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


            const offerStatus =
                (
                    row.dataset.offerStatus ||
                    ""
                ).toLowerCase();


            const joiningStatus =
                (
                    row.dataset.joiningStatus ||
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
               OFFER STATUS
            --------------------------------------------- */

            const matchesOfferStatus =
                offerStatusValue === "all" ||
                offerStatus === offerStatusValue;


            /* ---------------------------------------------
               JOINING STATUS
            --------------------------------------------- */

            const matchesJoiningStatus =
                joiningStatusValue === "all" ||
                joiningStatus === joiningStatusValue;


            /* ---------------------------------------------
               FINAL RESULT
            --------------------------------------------- */

            const shouldShow =
                matchesSearch &&
                matchesCompany &&
                matchesCollege &&
                matchesOfferStatus &&
                matchesJoiningStatus;


            if (shouldShow) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        updateOfferCount(
            visibleCount
        );

    }


    /* =====================================================
       UPDATE COUNT
    ====================================================== */

    function updateOfferCount(
        visibleCount
    ) {

        if (!offerCount) {

            return;

        }


        const totalRows =
            rows.length;


        if (
            visibleCount ===
            totalRows
        ) {

            offerCount.textContent =
                "Showing " +
                visibleCount +
                " of " +
                totalRows +
                " offers";

        } else {

            offerCount.textContent =
                "Showing " +
                visibleCount +
                " matching offers";

        }

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterOffers
        );

    }


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    if (companyFilter) {

        companyFilter.addEventListener(
            "change",
            filterOffers
        );

    }


    if (collegeFilter) {

        collegeFilter.addEventListener(
            "change",
            filterOffers
        );

    }


    if (offerStatusFilter) {

        offerStatusFilter.addEventListener(
            "change",
            filterOffers
        );

    }


    if (joiningStatusFilter) {

        joiningStatusFilter.addEventListener(
            "change",
            filterOffers
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


                if (offerStatusFilter) {

                    offerStatusFilter.value = "all";

                }


                if (joiningStatusFilter) {

                    joiningStatusFilter.value = "all";

                }


                filterOffers();

            }
        );

    }


    /* =====================================================
       ADD OFFER
    ====================================================== */

    if (addOfferButton) {

        addOfferButton.addEventListener(
            "click",
            function () {

                alert(
                    "Add Offer\n\n" +
                    "Offer creation form will be connected later."
                );

            }
        );

    }


    /* =====================================================
       VIEW OFFER
    ====================================================== */

    document
        .querySelectorAll(
            ".view-offer-btn"
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


                    const offerStatus =
                        row.dataset.offerStatus ||
                        "-";


                    const joiningStatus =
                        row.dataset.joiningStatus ||
                        "-";


                    alert(
                        "Offer Details\n\n" +

                        "Student: " +
                        student +

                        "\nCollege: " +
                        college +

                        "\nCompany: " +
                        company +

                        "\nOffer Status: " +
                        formatText(
                            offerStatus
                        ) +

                        "\nJoining Status: " +
                        formatText(
                            joiningStatus
                        )
                    );

                }
            );

        });


    /* =====================================================
       EDIT OFFER
    ====================================================== */

    document
        .querySelectorAll(
            ".edit-offer-btn"
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
                        "Edit Offer\n\n" +

                        student +
                        " — " +
                        company +

                        "\n\n" +

                        "Offer editing form will be connected later."
                    );

                }
            );

        });


    /* =====================================================
       MORE OPTIONS
    ====================================================== */

    document
        .querySelectorAll(
            ".more-offer-btn"
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

                        "Additional offer actions will be added later."
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
            exportVisibleOffers
        );

    }


    /* =====================================================
       EXPORT VISIBLE OFFERS
    ====================================================== */

    function exportVisibleOffers() {

        const visibleRows =
            rows.filter(function (row) {

                return row.style.display !== "none";

            });


        if (!visibleRows.length) {

            alert(
                "No offers available to export."
            );

            return;

        }


        const headers = [

            "Student",

            "College",

            "Company",

            "Job Role",

            "Package",

            "Offer Date",

            "Joining Date",

            "Offer Status",

            "Joining Status"

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


                const offerDate =
                    cells[6]
                        .textContent
                        .trim();


                const joiningDate =
                    cells[7]
                        .textContent
                        .trim();


                const offerStatus =
                    row.dataset.offerStatus || "";


                const joiningStatus =
                    row.dataset.joiningStatus || "";


                const data = [

                    student,

                    college,

                    company,

                    jobRole,

                    packageValue,

                    offerDate,

                    joiningDate,

                    formatText(
                        offerStatus
                    ),

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
            "offers_and_joining.csv";


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
                        "Offers pagination:",
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterOffers();


    console.log(
        "TPO Offers & Joining Page Loaded Successfully"
    );

});