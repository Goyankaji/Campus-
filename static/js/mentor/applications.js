/* =========================================================
   CAMPUS — MENTOR STUDENT APPLICATIONS JS
   VIEW-ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("applicationSearch");

    const statusFilter =
        document.getElementById(
            "applicationStatusFilter"
        );

    const resetButton =
        document.getElementById(
            "resetApplicationFilters"
        );

    const tableBody =
        document.getElementById(
            "applicationsTableBody"
        );

    const visibleCount =
        document.getElementById(
            "visibleApplicationCount"
        );

    const noResults =
        document.getElementById(
            "noApplicationResults"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!tableBody) {
        return;
    }


    const applicationRows =
        Array.from(
            tableBody.querySelectorAll(
                ".application-row"
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


        const selectedStatus =
            normalize(
                statusFilter
                    ? statusFilter.value
                    : "all"
            );


        let count = 0;


        applicationRows.forEach(
            function (row) {

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

                const status =
                    normalize(
                        row.dataset.status
                    );


                /* =========================================
                   SEARCH
                ========================================= */

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


                /* =========================================
                   STATUS
                ========================================= */

                const matchesStatus =
                    selectedStatus === "all" ||
                    status === selectedStatus;


                const shouldShow =
                    matchesSearch &&
                    matchesStatus;


                if (shouldShow) {

                    row.style.display = "";

                    count++;

                } else {

                    row.style.display =
                        "none";

                }

            }
        );


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


        if (
            applicationRows.length === 0
        ) {

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

            searchInput.value = "";

        }


        if (statusFilter) {

            statusFilter.value =
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
            "status"
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


        const status =
            url.searchParams.get(
                "status"
            );


        if (
            search &&
            searchInput
        ) {

            searchInput.value =
                search;

        }


        if (
            status &&
            statusFilter
        ) {

            const normalized =
                normalize(status);


            const valid =
                Array.from(
                    statusFilter.options
                ).some(
                    function (option) {

                        return (
                            normalize(
                                option.value
                            ) === normalized
                        );

                    }
                );


            if (valid) {

                statusFilter.value =
                    normalized;

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
       STATUS EVENT
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
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