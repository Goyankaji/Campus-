/* =========================================================
   CAMPUS — MENTOR SHORTLISTED STUDENTS JS
   VIEW-ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("shortlistedSearch");

    const companyFilter =
        document.getElementById(
            "shortlistedCompanyFilter"
        );

    const resetButton =
        document.getElementById(
            "resetShortlistedFilters"
        );

    const tableBody =
        document.getElementById(
            "shortlistedTableBody"
        );

    const visibleCount =
        document.getElementById(
            "visibleShortlistedCount"
        );

    const noResults =
        document.getElementById(
            "noShortlistedResults"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!tableBody) {
        return;
    }


    const rows =
        Array.from(
            tableBody.querySelectorAll(
                ".shortlisted-row"
            )
        );


    /* =====================================================
       NORMALIZE
    ===================================================== */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       APPLY FILTERS
    ===================================================== */

    function applyFilters() {

        const searchValue =
            normalize(
                searchInput
                    ? searchInput.value
                    : ""
            );


        const selectedCompany =
            normalize(
                companyFilter
                    ? companyFilter.value
                    : "all"
            );


        let count = 0;


        rows.forEach(function (row) {

            const student =
                normalize(
                    row.dataset.student
                );

            const company =
                normalize(
                    row.dataset.company
                );

            const role =
                normalize(
                    row.dataset.role
                );


            /* =============================================
               SEARCH
            ============================================= */

            const matchesSearch =
                !searchValue ||
                student.includes(
                    searchValue
                ) ||
                company.includes(
                    searchValue
                ) ||
                role.includes(
                    searchValue
                );


            /* =============================================
               COMPANY
            ============================================= */

            const matchesCompany =
                selectedCompany === "all" ||
                company === selectedCompany;


            const shouldShow =
                matchesSearch &&
                matchesCompany;


            if (shouldShow) {

                row.style.display = "";

                count++;

            } else {

                row.style.display =
                    "none";

            }

        });


        updateCount(count);

        updateEmptyState(count);

    }


    /* =====================================================
       UPDATE COUNT
    ===================================================== */

    function updateCount(count) {

        if (!visibleCount) {
            return;
        }

        visibleCount.textContent =
            count;

    }


    /* =====================================================
       EMPTY STATE
    ===================================================== */

    function updateEmptyState(count) {

        if (!noResults) {
            return;
        }


        if (rows.length === 0) {

            noResults.hidden = true;

            return;

        }


        noResults.hidden =
            count !== 0;

    }


    /* =====================================================
       RESET
    ===================================================== */

    function resetFilters() {

        if (searchInput) {

            searchInput.value =
                "";

        }


        if (companyFilter) {

            companyFilter.value =
                "all";

        }


        const url =
            new URL(
                window.location.href
            );


        url.searchParams.delete(
            "search"
        );

        url.searchParams.delete(
            "company"
        );


        window.history.replaceState(
            {},
            "",
            url
        );


        applyFilters();

    }


    /* =====================================================
       LOAD URL FILTERS
    ===================================================== */

    function loadUrlFilters() {

        const url =
            new URL(
                window.location.href
            );


        const search =
            url.searchParams.get(
                "search"
            );


        const company =
            url.searchParams.get(
                "company"
            );


        if (
            search &&
            searchInput
        ) {

            searchInput.value =
                search;

        }


        if (
            company &&
            companyFilter
        ) {

            const normalizedCompany =
                normalize(company);


            const validOption =
                Array.from(
                    companyFilter.options
                ).some(
                    function (option) {

                        return (
                            normalize(
                                option.value
                            ) ===
                            normalizedCompany
                        );

                    }
                );


            if (validOption) {

                companyFilter.value =
                    normalizedCompany;

            }

        }


        applyFilters();

    }


    /* =====================================================
       SEARCH EVENT
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    /* =====================================================
       COMPANY EVENT
    ===================================================== */

    if (companyFilter) {

        companyFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =====================================================
       RESET EVENT
    ===================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetFilters
        );

    }


    /* =====================================================
       CTRL + K
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                (event.ctrlKey ||
                 event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                if (searchInput) {

                    searchInput.focus();

                    searchInput.select();

                }

            }

        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    loadUrlFilters();

});