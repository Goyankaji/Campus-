/* =========================================================
   CAMPUS HOD PORTAL
   PLACED STUDENTS JS
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initPlacedSearch();

        initCompanyFilter();

        initJoiningFilter();

        initClearFilters();

        initViewButtons();

        updatePlacedRecordCount();

    }
);



/* =========================================================
   GET ROWS
========================================================= */

function getPlacedRows() {

    return document.querySelectorAll(
        ".placed-student-row"
    );

}



/* =========================================================
   SEARCH
========================================================= */

function initPlacedSearch() {

    const searchInput =
        document.getElementById(
            "placedSearch"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            applyPlacedFilters();

        }
    );

}



/* =========================================================
   COMPANY FILTER
========================================================= */

function initCompanyFilter() {

    const companyFilter =
        document.getElementById(
            "companyFilter"
        );


    if (!companyFilter) {
        return;
    }


    companyFilter.addEventListener(
        "change",
        function () {

            applyPlacedFilters();

        }
    );

}



/* =========================================================
   JOINING FILTER
========================================================= */

function initJoiningFilter() {

    const joiningFilter =
        document.getElementById(
            "joiningFilter"
        );


    if (!joiningFilter) {
        return;
    }


    joiningFilter.addEventListener(
        "change",
        function () {

            applyPlacedFilters();

        }
    );

}



/* =========================================================
   APPLY FILTERS
========================================================= */

function applyPlacedFilters() {

    const searchInput =
        document.getElementById(
            "placedSearch"
        );


    const companyFilter =
        document.getElementById(
            "companyFilter"
        );


    const joiningFilter =
        document.getElementById(
            "joiningFilter"
        );


    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedCompany =
        companyFilter
            ? companyFilter.value
            : "all";


    const selectedStatus =
        joiningFilter
            ? joiningFilter.value
            : "all";


    const rows =
        getPlacedRows();


    let visibleCount = 0;


    rows.forEach(
        function (row) {

            const rowText =
                row.textContent
                    .trim()
                    .toLowerCase();


            const rowCompany =
                (
                    row.dataset.company
                    || ""
                )
                    .trim()
                    .toLowerCase();


            const rowStatus =
                (
                    row.dataset.status
                    || ""
                )
                    .trim()
                    .toLowerCase();


            const searchMatch =
                !searchValue
                ||
                rowText.includes(
                    searchValue
                );


            const companyMatch =
                selectedCompany === "all"
                ||
                rowCompany === selectedCompany;


            const statusMatch =
                selectedStatus === "all"
                ||
                rowStatus === selectedStatus;


            const shouldShow =
                searchMatch
                &&
                companyMatch
                &&
                statusMatch;


            if (shouldShow) {

                row.style.display =
                    "";

                visibleCount++;

            } else {

                row.style.display =
                    "none";

            }

        }
    );


    updatePlacedRecordCount(
        visibleCount
    );


    updatePlacedEmptyState(
        visibleCount
    );

}



/* =========================================================
   RECORD COUNT
========================================================= */

function updatePlacedRecordCount(
    count = null
) {

    const countElement =
        document.getElementById(
            "placedRecordCount"
        );


    if (!countElement) {
        return;
    }


    if (count === null) {

        const rows =
            getPlacedRows();

        count =
            rows.length;

    }


    countElement.textContent =
        count;

}



/* =========================================================
   EMPTY STATE
========================================================= */

function updatePlacedEmptyState(
    visibleCount
) {

    const emptyState =
        document.getElementById(
            "placedEmptyState"
        );


    if (!emptyState) {
        return;
    }


    emptyState.hidden =
        visibleCount !== 0;

}



/* =========================================================
   CLEAR FILTERS
========================================================= */

function initClearFilters() {

    const clearButton =
        document.getElementById(
            "clearPlacedFilters"
        );


    if (!clearButton) {
        return;
    }


    clearButton.addEventListener(
        "click",
        function () {

            const searchInput =
                document.getElementById(
                    "placedSearch"
                );


            const companyFilter =
                document.getElementById(
                    "companyFilter"
                );


            const joiningFilter =
                document.getElementById(
                    "joiningFilter"
                );


            if (searchInput) {

                searchInput.value =
                    "";

            }


            if (companyFilter) {

                companyFilter.value =
                    "all";

            }


            if (joiningFilter) {

                joiningFilter.value =
                    "all";

            }


            applyPlacedFilters();

        }
    );

}



/* =========================================================
   VIEW BUTTONS
========================================================= */

function initViewButtons() {

    const buttons =
        document.querySelectorAll(
            ".view-btn"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const student =
                        button.dataset.student
                        || "Student";


                    /*
                     * Static stage only.
                     * Detailed student view will be
                     * connected with backend later.
                     */

                    console.log(
                        "View placed student:",
                        student
                    );

                }
            );

        }
    );

}