/* =========================================================
   CAMPUS — MENTOR FEEDBACK JS
   VIEW-ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("feedbackSearch");

    const typeFilter =
        document.getElementById(
            "feedbackTypeFilter"
        );

    const resetButton =
        document.getElementById(
            "resetFeedbackFilters"
        );

    const feedbackList =
        document.getElementById("feedbackList");

    const visibleCount =
        document.getElementById(
            "visibleFeedbackCount"
        );

    const noResults =
        document.getElementById(
            "noFeedbackResults"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!feedbackList) {
        return;
    }


    const feedbackCards =
        Array.from(
            feedbackList.querySelectorAll(
                ".feedback-card"
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


        const selectedType =
            normalize(
                typeFilter
                    ? typeFilter.value
                    : "all"
            );


        let count = 0;


        feedbackCards.forEach(
            function (card) {

                const title =
                    normalize(
                        card.dataset.title
                    );

                const content =
                    normalize(
                        card.dataset.content
                    );

                const type =
                    normalize(
                        card.dataset.type
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
                   TYPE FILTER
                ========================================= */

                const matchesType =
                    selectedType === "all" ||
                    type === selectedType;


                const shouldShow =
                    matchesSearch &&
                    matchesType;


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
         * If there are no feedback cards at all,
         * keep the server-side empty state.
         */

        if (feedbackCards.length === 0) {

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


        if (typeFilter) {

            typeFilter.value =
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
            "type"
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


        const type =
            url.searchParams.get(
                "type"
            );


        if (
            search &&
            searchInput
        ) {

            searchInput.value =
                search;

        }


        if (
            type &&
            typeFilter
        ) {

            const normalizedType =
                normalize(type);


            const validOption =
                Array.from(
                    typeFilter.options
                ).some(
                    function (option) {

                        return (
                            normalize(
                                option.value
                            ) ===
                            normalizedType
                        );

                    }
                );


            if (validOption) {

                typeFilter.value =
                    normalizedType;

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
       TYPE FILTER EVENT
    ===================================================== */

    if (typeFilter) {

        typeFilter.addEventListener(
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