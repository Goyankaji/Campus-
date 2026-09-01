/* =========================================================
   CAMPUS — MENTOR PLACEMENT DRIVES JS
   VIEW-ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("driveSearch");

    const statusFilter =
        document.getElementById("driveStatusFilter");

    const resetButton =
        document.getElementById("resetDriveFilters");

    const drivesList =
        document.getElementById("drivesList");

    const visibleDriveCount =
        document.getElementById("visibleDriveCount");

    const noDriveResults =
        document.getElementById("noDriveResults");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!drivesList) {
        return;
    }


    const driveCards =
        Array.from(
            drivesList.querySelectorAll(".drive-card")
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

    function applyDriveFilters() {

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


        let visibleCount = 0;


        driveCards.forEach(function (card) {

            const company =
                normalize(
                    card.dataset.company
                );

            const title =
                normalize(
                    card.dataset.title
                );

            const status =
                normalize(
                    card.dataset.status
                );


            /* =============================================
               SEARCH
            ============================================= */

            const matchesSearch =
                !searchValue ||
                company.includes(searchValue) ||
                title.includes(searchValue);


            /* =============================================
               STATUS
            ============================================= */

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;


            const shouldShow =
                matchesSearch &&
                matchesStatus;


            if (shouldShow) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        updateVisibleCount(
            visibleCount
        );


        updateEmptyState(
            visibleCount
        );

    }


    /* =====================================================
       UPDATE COUNT
    ===================================================== */

    function updateVisibleCount(count) {

        if (!visibleDriveCount) {
            return;
        }

        visibleDriveCount.textContent =
            count;

    }


    /* =====================================================
       EMPTY STATE
    ===================================================== */

    function updateEmptyState(count) {

        if (!noDriveResults) {
            return;
        }


        noDriveResults.hidden =
            count !== 0;

    }


    /* =====================================================
       RESET
    ===================================================== */

    function resetDriveFilters() {

        if (searchInput) {

            searchInput.value =
                "";

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


        applyDriveFilters();

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

            const normalizedStatus =
                normalize(status);


            const validOption =
                Array.from(
                    statusFilter.options
                ).some(
                    function (option) {

                        return normalize(
                            option.value
                        ) === normalizedStatus;

                    }
                );


            if (validOption) {

                statusFilter.value =
                    normalizedStatus;

            }

        }


        applyDriveFilters();

    }


    /* =====================================================
       SEARCH EVENT
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyDriveFilters
        );

    }


    /* =====================================================
       STATUS EVENT
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyDriveFilters
        );

    }


    /* =====================================================
       RESET EVENT
    ===================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetDriveFilters
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