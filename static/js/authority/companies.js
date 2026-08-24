/* =========================================================
   AUTHORITY COMPANIES JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const companiesYear =
    document.getElementById(
        "companiesYear"
    );

const companySearch =
    document.getElementById(
        "companySearch"
    );

const industryFilter =
    document.getElementById(
        "industryFilter"
    );

const companyStatusFilter =
    document.getElementById(
        "companyStatusFilter"
    );

const companySort =
    document.getElementById(
        "companySort"
    );

const clearFiltersBtn =
    document.getElementById(
        "clearFiltersBtn"
    );

const filterToggleBtn =
    document.getElementById(
        "filterToggleBtn"
    );

const companyFilters =
    document.getElementById(
        "companyFilters"
    );

const companyTableBody =
    document.getElementById(
        "companyTableBody"
    );

const companyEmptyState =
    document.getElementById(
        "companyEmptyState"
    );

const companyResultCount =
    document.getElementById(
        "companyResultCount"
    );

const exportCompaniesBtn =
    document.getElementById(
        "exportCompaniesBtn"
    );

const companiesCollegeName =
    document.getElementById(
        "companiesCollegeName"
    );


/* =========================================================
   COLLEGE SCOPE
========================================================= */

function getAuthorityCollege() {

    const collegeName =
        document.body.dataset.collegeName;

    const collegeCode =
        document.body.dataset.collegeCode;


    if (collegeName) {

        return collegeName;

    }


    if (collegeCode) {

        return collegeCode;

    }


    return "College Authority";

}


if (companiesCollegeName) {

    companiesCollegeName.textContent =
        getAuthorityCollege();

}


/* =========================================================
   COMPANY ROWS
========================================================= */

function getCompanyRows() {

    return Array.from(
        document.querySelectorAll(
            ".company-row"
        )
    );

}


/* =========================================================
   FILTER COMPANIES
========================================================= */

function filterCompanies() {

    const searchValue =
        companySearch
            ? companySearch.value
                .trim()
                .toLowerCase()
            : "";

    const industryValue =
        industryFilter
            ? industryFilter.value
            : "all";

    const statusValue =
        companyStatusFilter
            ? companyStatusFilter.value
            : "all";


    const rows =
        getCompanyRows();


    let visibleCount = 0;


    rows.forEach(
        function (row) {

            const name =
                row.dataset.name || "";

            const industry =
                row.dataset.industry || "";

            const status =
                row.dataset.status || "";


            const matchesSearch =
                !searchValue ||
                name.includes(
                    searchValue
                );


            const matchesIndustry =
                industryValue === "all" ||
                industry === industryValue;


            const matchesStatus =
                statusValue === "all" ||
                status === statusValue;


            const shouldShow =
                matchesSearch &&
                matchesIndustry &&
                matchesStatus;


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


    updateCompanyResult(
        visibleCount
    );

}


/* =========================================================
   UPDATE RESULT COUNT
========================================================= */

function updateCompanyResult(
    count
) {

    if (!companyResultCount) {

        return;

    }


    companyResultCount.textContent =
        `Showing ${count} companies`;


    if (
        companyEmptyState
    ) {

        if (count === 0) {

            companyEmptyState.style.display =
                "flex";

        } else {

            companyEmptyState.style.display =
                "none";

        }

    }

}


/* =========================================================
   SEARCH
========================================================= */

if (companySearch) {

    companySearch.addEventListener(
        "input",
        function () {

            filterCompanies();

        }
    );

}


/* =========================================================
   INDUSTRY FILTER
========================================================= */

if (industryFilter) {

    industryFilter.addEventListener(
        "change",
        function () {

            filterCompanies();

        }
    );

}


/* =========================================================
   STATUS FILTER
========================================================= */

if (companyStatusFilter) {

    companyStatusFilter.addEventListener(
        "change",
        function () {

            filterCompanies();

        }
    );

}


/* =========================================================
   SORT
========================================================= */

function sortCompanies() {

    if (
        !companyTableBody ||
        !companySort
    ) {

        return;

    }


    const rows =
        getCompanyRows();


    const sortType =
        companySort.value;


    rows.sort(
        function (
            rowA,
            rowB
        ) {

            if (
                sortType === "name"
            ) {

                return (
                    rowA.dataset.name
                        .localeCompare(
                            rowB.dataset.name
                        )
                );

            }


            if (
                sortType === "offers"
            ) {

                return (
                    Number(
                        rowB.dataset.offers
                    ) -
                    Number(
                        rowA.dataset.offers
                    )
                );

            }


            if (
                sortType === "package"
            ) {

                return (
                    Number(
                        rowB.dataset.package
                    ) -
                    Number(
                        rowA.dataset.package
                    )
                );

            }


            if (
                sortType === "drives"
            ) {

                return (
                    Number(
                        rowB.dataset.drives
                    ) -
                    Number(
                        rowA.dataset.drives
                    )
                );

            }


            return 0;

        }
    );


    rows.forEach(
        function (row) {

            companyTableBody.appendChild(
                row
            );

        }
    );


    filterCompanies();

}


if (companySort) {

    companySort.addEventListener(
        "change",
        function () {

            sortCompanies();

        }
    );

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

if (clearFiltersBtn) {

    clearFiltersBtn.addEventListener(
        "click",
        function () {

            if (companySearch) {

                companySearch.value =
                    "";

            }


            if (industryFilter) {

                industryFilter.value =
                    "all";

            }


            if (companyStatusFilter) {

                companyStatusFilter.value =
                    "all";

            }


            if (companySort) {

                companySort.value =
                    "name";

            }


            sortCompanies();

        }
    );

}


/* =========================================================
   FILTER TOGGLE
========================================================= */

if (
    filterToggleBtn &&
    companyFilters
) {

    filterToggleBtn.addEventListener(
        "click",
        function () {

            companyFilters.classList.toggle(
                "filters-hidden"
            );


            const hidden =
                companyFilters.classList.contains(
                    "filters-hidden"
                );


            filterToggleBtn.textContent =
                hidden
                    ? "⚙ Filters"
                    : "✕ Hide Filters";

        }
    );

}


/* =========================================================
   ACADEMIC YEAR
========================================================= */

if (companiesYear) {

    const savedYear =
        localStorage.getItem(
            "authorityCompaniesYear"
        );


    if (
        savedYear &&
        companiesYear.querySelector(
            `option[value="${savedYear}"]`
        )
    ) {

        companiesYear.value =
            savedYear;

    }


    companiesYear.addEventListener(
        "change",
        function () {

            const year =
                companiesYear.value;


            localStorage.setItem(
                "authorityCompaniesYear",
                year
            );


            document.dispatchEvent(
                new CustomEvent(
                    "companiesYearChanged",
                    {
                        detail: {
                            year: year
                        }
                    }
                )
            );

        }
    );

}


/* =========================================================
   EXPORT
========================================================= */

if (exportCompaniesBtn) {

    exportCompaniesBtn.addEventListener(
        "click",
        function () {

            /*
             * UI phase:
             * browser print dialog.
             *
             * Later:
             * Flask will generate proper
             * Excel/PDF export.
             */

            window.print();

        }
    );

}


/* =========================================================
   YEAR CHANGE EVENT
========================================================= */

document.addEventListener(
    "companiesYearChanged",
    function (event) {

        const year =
            event.detail.year;


        /*
         * Future backend/API integration point.
         *
         * The selected year will eventually be sent to
         * Flask, which will return only the companies
         * belonging to the logged-in Authority's college.
         */


        console.log(
            "Companies academic year:",
            year
        );

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        sortCompanies();

        filterCompanies();

    }
);