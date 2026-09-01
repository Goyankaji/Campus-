/* =========================================================
   CAMPUS — MENTOR ANNOUNCEMENTS JS
   VIEW-ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById(
            "announcementSearch"
        );

    const categoryFilter =
        document.getElementById(
            "announcementCategoryFilter"
        );

    const resetButton =
        document.getElementById(
            "resetAnnouncementFilters"
        );

    const announcementsList =
        document.getElementById(
            "announcementsList"
        );

    const visibleCount =
        document.getElementById(
            "visibleAnnouncementCount"
        );

    const noResults =
        document.getElementById(
            "noAnnouncementResults"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!announcementsList) {
        return;
    }


    const announcementCards =
        Array.from(
            announcementsList.querySelectorAll(
                ".announcement-card"
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


        const selectedCategory =
            normalize(
                categoryFilter
                    ? categoryFilter.value
                    : "all"
            );


        let count = 0;


        announcementCards.forEach(
            function (card) {

                const title =
                    normalize(
                        card.dataset.title
                    );

                const content =
                    normalize(
                        card.dataset.content
                    );

                const category =
                    normalize(
                        card.dataset.category
                    );


                /* =========================================
                   SEARCH
                ========================================= */

                const matchesSearch =
                    !searchValue ||
                    title.includes(
                        searchValue
                    ) ||
                    content.includes(
                        searchValue
                    );


                /* =========================================
                   CATEGORY
                ========================================= */

                const matchesCategory =
                    selectedCategory === "all" ||
                    category === selectedCategory;


                const shouldShow =
                    matchesSearch &&
                    matchesCategory;


                if (shouldShow) {

                    card.style.display = "";

                    count++;

                } else {

                    card.style.display =
                        "none";

                }

            }
        );


        updateVisibleCount(count);

        updateEmptyState(count);

    }


    /* =====================================================
       UPDATE COUNT
    ===================================================== */

    function updateVisibleCount(count) {

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


        /*
         * If there are no cards at all, the server-side
         * empty state should remain visible.
         */

        if (
            announcementCards.length === 0
        ) {

            noResults.hidden = true;

            return;

        }


        noResults.hidden =
            count !== 0;

    }


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    function resetFilters() {

        if (searchInput) {

            searchInput.value = "";

        }


        if (categoryFilter) {

            categoryFilter.value =
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
            "category"
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


        const category =
            url.searchParams.get(
                "category"
            );


        if (
            search &&
            searchInput
        ) {

            searchInput.value =
                search;

        }


        if (
            category &&
            categoryFilter
        ) {

            const normalizedCategory =
                normalize(category);


            const validOption =
                Array.from(
                    categoryFilter.options
                ).some(
                    function (option) {

                        return (
                            normalize(
                                option.value
                            ) ===
                            normalizedCategory
                        );

                    }
                );


            if (validOption) {

                categoryFilter.value =
                    normalizedCategory;

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
       CATEGORY EVENT
    ===================================================== */

    if (categoryFilter) {

        categoryFilter.addEventListener(
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
       CTRL + K SEARCH SHORTCUT
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