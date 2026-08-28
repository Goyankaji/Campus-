/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - NOTIFICATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const notificationList =
        document.getElementById("notificationList");

    const searchInput =
        document.getElementById("notificationSearch");

    const emptyState =
        document.getElementById("notificationEmpty");

    const countText =
        document.getElementById("notificationCount");

    const totalNotifications =
        document.getElementById("totalNotifications");

    const unreadNotifications =
        document.getElementById("unreadNotifications");

    const readNotifications =
        document.getElementById("readNotifications");

    const markAllButton =
        document.getElementById("markAllRead");


    /* =====================================================
       FILTER BUTTONS
    ====================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".notification-filter-btn"
        );


    let activeFilter = "all";


    /* =====================================================
       GET NOTIFICATION ITEMS
    ====================================================== */

    function getItems() {

        if (!notificationList) {

            return [];

        }

        return Array.from(
            notificationList.querySelectorAll(
                ".notification-item"
            )
        );

    }


    /* =====================================================
       UPDATE COUNTS
    ====================================================== */

    function updateCounts() {

        const items =
            getItems();


        let unread = 0;
        let read = 0;


        items.forEach(function (item) {

            if (
                item.dataset.status ===
                "unread"
            ) {

                unread++;

            } else {

                read++;

            }

        });


        if (totalNotifications) {

            totalNotifications.textContent =
                items.length;

        }


        if (unreadNotifications) {

            unreadNotifications.textContent =
                unread;

        }


        if (readNotifications) {

            readNotifications.textContent =
                read;

        }

    }


    /* =====================================================
       UPDATE LIST
    ====================================================== */

    function updateList() {

        const items =
            getItems();


        const searchValue =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let visibleCount = 0;


        items.forEach(function (item) {

            const status =
                item.dataset.status ||
                "read";


            const searchText =
                (
                    item.dataset.search ||
                    item.textContent ||
                    ""
                ).toLowerCase();


            const matchesFilter =
                activeFilter === "all" ||
                status === activeFilter;


            const matchesSearch =
                !searchValue ||
                searchText.includes(
                    searchValue
                );


            const shouldShow =
                matchesFilter &&
                matchesSearch;


            item.style.display =
                shouldShow
                    ? ""
                    : "flex";


            if (shouldShow) {

                visibleCount++;

            }

        });


        updateFooter(
            visibleCount
        );


        updateEmptyState(
            visibleCount
        );


        updateCounts();

    }


    /* =====================================================
       FOOTER COUNT
    ====================================================== */

    function updateFooter(
        visibleCount
    ) {

        if (!countText) {

            return;

        }


        const total =
            getItems().length;


        if (
            visibleCount ===
            total
        ) {

            countText.textContent =
                "Showing " +
                total +
                " notifications";

        } else {

            countText.textContent =
                "Showing " +
                visibleCount +
                " matching notifications";

        }

    }


    /* =====================================================
       EMPTY STATE
    ====================================================== */

    function updateEmptyState(
        visibleCount
    ) {

        if (!emptyState) {

            return;

        }


        emptyState.style.display =
            visibleCount === 0
                ? "flex"
                : "none";

    }


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    filterButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    activeFilter =
                        button.dataset.filter ||
                        "all";


                    updateList();

                }
            );

        }
    );


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            updateList
        );

    }


    /* =====================================================
       MARK AS READ
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".mark-read-btn"
                );


            if (!button) {

                return;

            }


            const item =
                button.closest(
                    ".notification-item"
                );


            if (!item) {

                return;

            }


            markAsRead(
                item
            );

        }
    );


    /* =====================================================
       MARK AS UNREAD
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".mark-unread-btn"
                );


            if (!button) {

                return;

            }


            const item =
                button.closest(
                    ".notification-item"
                );


            if (!item) {

                return;

            }


            markAsUnread(
                item
            );

        }
    );


    /* =====================================================
       MARK AS READ FUNCTION
    ====================================================== */

    function markAsRead(
        item
    ) {

        item.dataset.status =
            "read";


        item.classList.remove(
            "unread"
        );


        const dot =
            item.querySelector(
                ".notification-dot"
            );


        if (dot) {

            dot.remove();

        }


        const button =
            item.querySelector(
                ".mark-read-btn"
            );


        if (button) {

            button.classList.remove(
                "mark-read-btn"
            );

            button.classList.add(
                "mark-unread-btn"
            );

            button.title =
                "Mark as unread";

            button.textContent =
                "↺";

        }


        item.classList.add(
            "just-read"
        );


        setTimeout(
            function () {

                item.classList.remove(
                    "just-read"
                );

            },
            400
        );


        updateList();

    }


    /* =====================================================
       MARK AS UNREAD FUNCTION
    ====================================================== */

    function markAsUnread(
        item
    ) {

        item.dataset.status =
            "unread";


        item.classList.add(
            "unread"
        );


        const titleRow =
            item.querySelector(
                ".notification-title-row"
            );


        if (
            titleRow &&
            !titleRow.querySelector(
                ".notification-dot"
            )
        ) {

            const dot =
                document.createElement(
                    "span"
                );


            dot.className =
                "notification-dot";


            titleRow.appendChild(
                dot
            );

        }


        const button =
            item.querySelector(
                ".mark-unread-btn"
            );


        if (button) {

            button.classList.remove(
                "mark-unread-btn"
            );

            button.classList.add(
                "mark-read-btn"
            );

            button.title =
                "Mark as read";

            button.textContent =
                "✓";

        }


        updateList();

    }


    /* =====================================================
       MARK ALL AS READ
    ====================================================== */

    if (markAllButton) {

        markAllButton.addEventListener(
            "click",
            function () {

                const items =
                    getItems();


                items.forEach(
                    function (item) {

                        if (
                            item.dataset.status ===
                            "unread"
                        ) {

                            markItemReadOnly(
                                item
                            );

                        }

                    }
                );


                updateList();

            }
        );

    }


    /* =====================================================
       MARK ITEM READ WITHOUT REFRESH
    ====================================================== */

    function markItemReadOnly(
        item
    ) {

        item.dataset.status =
            "read";


        item.classList.remove(
            "unread"
        );


        const dot =
            item.querySelector(
                ".notification-dot"
            );


        if (dot) {

            dot.remove();

        }


        const button =
            item.querySelector(
                ".mark-read-btn"
            );


        if (button) {

            button.classList.remove(
                "mark-read-btn"
            );

            button.classList.add(
                "mark-unread-btn"
            );

            button.title =
                "Mark as unread";

            button.textContent =
                "↺";

        }

    }


    /* =====================================================
       DELETE NOTIFICATION
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".delete-notification-btn"
                );


            if (!button) {

                return;

            }


            const item =
                button.closest(
                    ".notification-item"
                );


            if (!item) {

                return;

            }


            item.classList.add(
                "removing"
            );


            setTimeout(
                function () {

                    item.remove();

                    updateList();

                },
                220
            );

        }
    );


    /* =====================================================
       PAGINATION
    ====================================================== */

    const paginationButtons =
        document.querySelectorAll(
            ".notification-pagination button"
        );


    paginationButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        button.disabled ||
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        return;

                    }


                    paginationButtons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    console.log(
                        "Notification page:",
                        button.textContent.trim()
                    );

                }
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    updateCounts();

    updateList();


    console.log(
        "TPO Notifications Page Loaded Successfully"
    );

});