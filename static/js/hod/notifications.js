/* =========================================================
   CAMPUS HOD PORTAL
   NOTIFICATIONS JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const list = document.getElementById("notificationList");

    const searchInput =
        document.getElementById("notificationSearch");

    const filterSelect =
        document.getElementById("notificationFilter");

    const clearButton =
        document.getElementById("clearNotificationFilter");

    const markAllButton =
        document.getElementById("markAllRead");

    const totalElement =
        document.getElementById("totalNotifications");

    const unreadElement =
        document.getElementById("unreadNotifications");

    const emptyState =
        document.getElementById("notificationEmpty");


    if (!list) {
        return;
    }


    /* =====================================================
       GET NOTIFICATIONS
    ====================================================== */

    function getNotifications() {

        return Array.from(
            list.querySelectorAll(".notification-item")
        );

    }


    /* =====================================================
       UPDATE COUNTS
    ====================================================== */

    function updateCounts() {

        const notifications =
            getNotifications();

        const unread =
            notifications.filter(function (item) {
                return item.dataset.read === "false";
            }).length;


        if (totalElement) {
            totalElement.textContent =
                notifications.length;
        }


        if (unreadElement) {
            unreadElement.textContent =
                unread;
        }


        if (markAllButton) {

            if (unread === 0) {

                markAllButton.textContent =
                    "✓ All caught up";

                markAllButton.disabled = true;

            } else {

                markAllButton.textContent =
                    "✓ Mark all as read";

                markAllButton.disabled = false;

            }

        }

    }


    /* =====================================================
       FILTER
    ====================================================== */

    function applyFilters() {

        const query =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";

        const filter =
            filterSelect
                ? filterSelect.value
                : "all";


        let visibleCount = 0;


        getNotifications().forEach(function (item) {

            const text =
                item.textContent.toLowerCase();

            const type =
                item.dataset.type || "";

            const isRead =
                item.dataset.read === "true";


            const matchesSearch =
                !query ||
                text.includes(query);


            let matchesFilter = true;


            if (filter === "unread") {

                matchesFilter = !isRead;

            } else if (
                filter === "placement" ||
                filter === "system"
            ) {

                matchesFilter =
                    type === filter;

            }


            const visible =
                matchesSearch &&
                matchesFilter;


            item.hidden = !visible;


            if (visible) {
                visibleCount++;
            }

        });


        if (emptyState) {

            emptyState.hidden =
                visibleCount !== 0;

        }

    }


    /* =====================================================
       MARK SINGLE NOTIFICATION READ
    ====================================================== */

    function markAsRead(item) {

        if (!item) {
            return;
        }


        item.dataset.read = "true";

        item.classList.remove("unread");


        const dot =
            item.querySelector(".unread-dot");

        if (dot) {
            dot.remove();
        }


        const button =
            item.querySelector(
                '[data-action="read"]'
            );


        if (button) {

            button.textContent =
                "Read";

        }


        updateCounts();

    }


    /* =====================================================
       SINGLE MARK READ
    ====================================================== */

    list.addEventListener("click", function (event) {

        const button =
            event.target.closest(
                '[data-action="read"]'
            );


        if (!button) {
            return;
        }


        const item =
            button.closest(".notification-item");


        markAsRead(item);

    });


    /* =====================================================
       MARK ALL READ
    ====================================================== */

    if (markAllButton) {

        markAllButton.addEventListener(
            "click",
            function () {

                getNotifications().forEach(
                    function (item) {

                        markAsRead(item);

                    }
                );

                applyFilters();

            }
        );

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    /* =====================================================
       FILTER
    ====================================================== */

    if (filterSelect) {

        filterSelect.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =====================================================
       CLEAR
    ====================================================== */

    if (clearButton) {

        clearButton.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                }

                if (filterSelect) {
                    filterSelect.value = "all";
                }

                applyFilters();

            }
        );

    }


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    updateCounts();
    applyFilters();

});