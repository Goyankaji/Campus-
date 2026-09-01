/* =========================================================
   CAMPUS — MENTOR NOTIFICATIONS JS
   VIEW-ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("notificationSearch");

    const notificationFilter =
        document.getElementById("notificationFilter");

    const resetButton =
        document.getElementById(
            "resetNotificationFilters"
        );

    const markAllReadButton =
        document.getElementById(
            "markAllNotificationsRead"
        );

    const notificationsList =
        document.getElementById(
            "notificationsList"
        );

    const visibleCount =
        document.getElementById(
            "visibleNotificationCount"
        );

    const unreadCount =
        document.getElementById(
            "unreadNotificationCount"
        );

    const noResults =
        document.getElementById(
            "noNotificationResults"
        );


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!notificationsList) {
        return;
    }


    const notificationCards =
        Array.from(
            notificationsList.querySelectorAll(
                ".notification-card"
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
       UPDATE UNREAD COUNT
    ===================================================== */

    function updateUnreadCount() {

        if (!unreadCount) {
            return;
        }


        const unreadCards =
            notificationCards.filter(
                function (card) {

                    return card.classList.contains(
                        "unread"
                    );

                }
            );


        unreadCount.textContent =
            unreadCards.length;

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


        const selectedFilter =
            normalize(
                notificationFilter
                    ? notificationFilter.value
                    : "all"
            );


        let count = 0;


        notificationCards.forEach(
            function (card) {

                const title =
                    normalize(
                        card.dataset.title
                    );

                const content =
                    normalize(
                        card.dataset.content
                    );

                const status =
                    normalize(
                        card.dataset.status
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
                   STATUS FILTER
                ========================================= */

                const matchesStatus =
                    selectedFilter === "all" ||
                    status === selectedFilter;


                const shouldShow =
                    matchesSearch &&
                    matchesStatus;


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
       VISIBLE COUNT
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


        if (
            notificationCards.length === 0
        ) {

            noResults.hidden = true;

            return;

        }


        noResults.hidden =
            count !== 0;

    }


    /* =====================================================
       MARK ALL READ
    ===================================================== */

    function markAllAsRead() {

        notificationCards.forEach(
            function (card) {

                card.classList.remove(
                    "unread"
                );

                card.classList.add(
                    "read"
                );


                card.dataset.status =
                    "read";


                const unreadBadge =
                    card.querySelector(
                        ".notification-unread"
                    );


                if (unreadBadge) {

                    unreadBadge.className =
                        "notification-read";

                    unreadBadge.textContent =
                        "Read";

                }

            }
        );


        updateUnreadCount();

        applyFilters();

    }


    /* =====================================================
       RESET
    ===================================================== */

    function resetFilters() {

        if (searchInput) {

            searchInput.value = "";

        }


        if (notificationFilter) {

            notificationFilter.value =
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
            notificationFilter
        ) {

            const normalizedStatus =
                normalize(status);


            const validOption =
                Array.from(
                    notificationFilter.options
                ).some(
                    function (option) {

                        return (
                            normalize(
                                option.value
                            ) ===
                            normalizedStatus
                        );

                    }
                );


            if (validOption) {

                notificationFilter.value =
                    normalizedStatus;

            }

        }


        updateUnreadCount();

        applyFilters();

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    /* =====================================================
       FILTER
    ===================================================== */

    if (notificationFilter) {

        notificationFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =====================================================
       RESET
    ===================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetFilters
        );

    }


    /* =====================================================
       MARK ALL READ
    ===================================================== */

    if (markAllReadButton) {

        markAllReadButton.addEventListener(
            "click",
            markAllAsRead
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