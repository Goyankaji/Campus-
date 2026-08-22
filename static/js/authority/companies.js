/* =========================================================
   AUTHORITY — COMPANIES PAGE
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initCompanySearch();

        initCompanyFilters();

        initCompanyModal();

        initPagination();

    }
);



/* =========================================================
   SEARCH
========================================================= */

function initCompanySearch() {

    const searchInput =
        document.getElementById("companySearch");

    const rows =
        document.querySelectorAll(
            "#companyTableBody tr"
        );

    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            filterCompanies(
                searchInput.value.trim().toLowerCase()
            );

        }
    );


    function filterCompanies(searchValue) {

        let visibleCount = 0;


        rows.forEach(
            function (row) {

                const companyName =
                    row
                        .querySelector(".company-name strong")
                        ?.textContent
                        .toLowerCase() || "";

                const companyDescription =
                    row
                        .querySelector(".company-name span")
                        ?.textContent
                        .toLowerCase() || "";


                const matches =
                    companyName.includes(searchValue) ||
                    companyDescription.includes(searchValue);


                if (matches) {

                    row.style.display = "";

                    visibleCount++;

                } else {

                    row.style.display = "none";

                }

            }
        );


        updateCompanyCount(
            visibleCount
        );

        updateEmptyState(
            visibleCount
        );

    }

}



/* =========================================================
   FILTERS
========================================================= */

function initCompanyFilters() {

    const statusFilter =
        document.getElementById("companyStatus");

    const typeFilter =
        document.getElementById("companyType");

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    function applyFilters() {

        const selectedStatus =
            statusFilter
                ? statusFilter.value
                : "all";

        const selectedType =
            typeFilter
                ? typeFilter.value
                : "all";


        const rows =
            document.querySelectorAll(
                "#companyTableBody tr"
            );


        let visibleCount = 0;


        rows.forEach(
            function (row) {

                const rowStatus =
                    row.dataset.status || "";

                const rowType =
                    row.dataset.type || "";


                const statusMatch =
                    selectedStatus === "all" ||
                    rowStatus === selectedStatus;


                const typeMatch =
                    selectedType === "all" ||
                    rowType === selectedType;


                if (
                    statusMatch &&
                    typeMatch
                ) {

                    row.style.display = "";

                    visibleCount++;

                } else {

                    row.style.display = "none";

                }

            }
        );


        updateCompanyCount(
            visibleCount
        );

        updateEmptyState(
            visibleCount
        );

    }

}



/* =========================================================
   COUNT
========================================================= */

function updateCompanyCount(
    count
) {

    const countElement =
        document.getElementById(
            "companyCount"
        );

    if (!countElement) {
        return;
    }


    if (count === 0) {

        countElement.textContent =
            "No companies found";

    } else {

        countElement.textContent =
            "Showing " +
            count +
            " compan" +
            (count === 1 ? "y" : "ies");

    }

}



/* =========================================================
   EMPTY STATE
========================================================= */

function updateEmptyState(
    count
) {

    const emptyState =
        document.getElementById(
            "companyEmpty"
        );

    if (!emptyState) {
        return;
    }


    if (count === 0) {

        emptyState.classList.add(
            "show"
        );

    } else {

        emptyState.classList.remove(
            "show"
        );

    }

}



/* =========================================================
   COMPANY MODAL
========================================================= */

function initCompanyModal() {

    const modal =
        document.getElementById(
            "companyModal"
        );

    const closeButton =
        document.getElementById(
            "modalClose"
        );

    const doneButton =
        document.getElementById(
            "modalDone"
        );

    const overlay =
        document.querySelector(
            ".company-modal-overlay"
        );


    const viewButtons =
        document.querySelectorAll(
            ".view-company"
        );


    if (!modal) {
        return;
    }


    viewButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const company =
                        button.dataset.company ||
                        "Company";

                    openCompanyModal(
                        company
                    );

                }
            );

        }
    );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeCompanyModal
        );

    }


    if (doneButton) {

        doneButton.addEventListener(
            "click",
            closeCompanyModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeCompanyModal
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {

                closeCompanyModal();

            }

        }
    );


    function openCompanyModal(
        company
    ) {

        const modalName =
            document.getElementById(
                "modalCompanyName"
            );

        const modalLogo =
            document.querySelector(
                ".modal-company-logo"
            );

        const modalDrives =
            document.getElementById(
                "modalDrives"
            );

        const modalSelected =
            document.getElementById(
                "modalSelected"
            );

        const modalPackage =
            document.getElementById(
                "modalPackage"
            );


        const companyData = {

            "TCS": {
                logo: "TCS",
                drives: "6",
                selected: "82",
                package: "₹ 7.20 LPA"
            },

            "Infosys": {
                logo: "IN",
                drives: "5",
                selected: "65",
                package: "₹ 6.80 LPA"
            },

            "Wipro": {
                logo: "W",
                drives: "4",
                selected: "53",
                package: "₹ 6.20 LPA"
            },

            "Accenture": {
                logo: "A",
                drives: "3",
                selected: "41",
                package: "₹ 7.50 LPA"
            },

            "Capgemini": {
                logo: "C",
                drives: "3",
                selected: "38",
                package: "₹ 6.30 LPA"
            },

            "Deloitte": {
                logo: "D",
                drives: "2",
                selected: "29",
                package: "₹ 8.40 LPA"
            }

        };


        const data =
            companyData[company] || {

                logo: company
                    .substring(0, 2)
                    .toUpperCase(),

                drives: "—",

                selected: "—",

                package: "—"

            };


        if (modalName) {

            modalName.textContent =
                company;

        }


        if (modalLogo) {

            modalLogo.textContent =
                data.logo;

        }


        if (modalDrives) {

            modalDrives.textContent =
                data.drives;

        }


        if (modalSelected) {

            modalSelected.textContent =
                data.selected;

        }


        if (modalPackage) {

            modalPackage.textContent =
                data.package;

        }


        modal.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";

    }


    function closeCompanyModal() {

        modal.classList.remove(
            "show"
        );

        document.body.style.overflow =
            "";

    }

}



/* =========================================================
   PAGINATION UI
========================================================= */

function initPagination() {

    const buttons =
        document.querySelectorAll(
            ".pagination-btn"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        button.disabled ||
                        button.classList.contains("active")
                    ) {
                        return;
                    }


                    buttons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    if (
                        /^[0-9]+$/.test(
                            button.textContent.trim()
                        )
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

}



/* =========================================================
   ACADEMIC YEAR
========================================================= */

const academicYear =
    document.getElementById(
        "academicYear"
    );


if (academicYear) {

    academicYear.addEventListener(
        "change",
        function () {

            console.log(
                "Academic year changed:",
                academicYear.value
            );

        }
    );

}