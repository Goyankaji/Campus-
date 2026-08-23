document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const notificationList =
        document.getElementById(
            "notificationList"
        );

    const searchInput =
        document.getElementById(
            "notificationSearch"
        );

    const typeFilter =
        document.getElementById(
            "notificationType"
        );

    const statusFilter =
        document.getElementById(
            "notificationStatus"
        );

    const markAllRead =
        document.getElementById(
            "markAllRead"
        );

    const clearAll =
        document.getElementById(
            "clearAllNotifications"
        );

    const totalCount =
        document.getElementById(
            "totalNotifications"
        );

    const unreadCount =
        document.getElementById(
            "unreadNotifications"
        );

    const readCount =
        document.getElementById(
            "readNotifications"
        );

    const emptyState =
        document.getElementById(
            "notificationEmpty"
        );


    /* =====================================================
       GET NOTIFICATIONS
    ===================================================== */

    function getNotifications() {

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
    ===================================================== */

    function updateCounts() {

        const notifications =
            getNotifications();


        const total =
            notifications.length;


        const unread =
            notifications.filter(
                function (item) {

                    return item.dataset.status ===
                        "unread";

                }
            ).length;


        const read =
            total - unread;


        if (totalCount) {
            totalCount.textContent = total;
        }

        if (unreadCount) {
            unreadCount.textContent = unread;
        }

        if (readCount) {
            readCount.textContent = read;
        }

    }


    /* =====================================================
       FILTER
    ===================================================== */

    function applyFilters() {

        const query =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        const selectedType =
            typeFilter
                ? typeFilter.value
                : "all";


        const selectedStatus =
            statusFilter
                ? statusFilter.value
                : "all";


        const notifications =
            getNotifications();


        let visibleCount = 0;


        notifications.forEach(
            function (item) {

                const title =
                    item.querySelector(
                        "h3"
                    )?.textContent
                        .toLowerCase() || "";


                const description =
                    item.querySelector(
                        "p"
                    )?.textContent
                        .toLowerCase() || "";


                const type =
                    item.dataset.type || "";


                const status =
                    item.dataset.status || "";


                const matchesSearch =
                    !query ||
                    title.includes(query) ||
                    description.includes(query);


                const matchesType =
                    selectedType === "all" ||
                    type === selectedType;


                const matchesStatus =
                    selectedStatus === "all" ||
                    status === selectedStatus;


                const visible =
                    matchesSearch &&
                    matchesType &&
                    matchesStatus;


                item.style.display =
                    visible ? "" : "none";


                if (visible) {
                    visibleCount++;
                }

            }
        );


        if (emptyState) {

            emptyState.style.display =
                visibleCount === 0
                    ? "flex"
                    : "none";

        }

    }


    /* =====================================================
       MARK ONE AS READ / UNREAD
    ===================================================== */

    function toggleRead(item) {

        const isUnread =
            item.dataset.status === "unread";


        if (isUnread) {

            item.dataset.status = "read";

            item.classList.remove(
                "unread"
            );


            const dot =
                item.querySelector(
                    ".unread-dot"
                );


            if (dot) {
                dot.remove();
            }


            const button =
                item.querySelector(
                    ".notification-read-btn"
                );


            if (button) {

                button.textContent = "○";

                button.title =
                    "Mark as unread";

            }

        } else {

            item.dataset.status = "unread";

            item.classList.add(
                "unread"
            );


            const actions =
                item.querySelector(
                    ".notification-item-actions"
                );


            if (
                actions &&
                !actions.querySelector(
                    ".unread-dot"
                )
            ) {

                const dot =
                    document.createElement(
                        "span"
                    );

                dot.className =
                    "unread-dot";


                actions.insertBefore(
                    dot,
                    actions.firstChild
                );

            }


            const button =
                item.querySelector(
                    ".notification-read-btn"
                );


            if (button) {

                button.textContent = "✓";

                button.title =
                    "Mark as read";

            }

        }


        updateCounts();

        applyFilters();

    }


    /* =====================================================
       READ BUTTON
    ===================================================== */

    if (notificationList) {

        notificationList.addEventListener(
            "click",
            function (event) {

                const readButton =
                    event.target.closest(
                        ".notification-read-btn"
                    );


                if (readButton) {

                    const item =
                        readButton.closest(
                            ".notification-item"
                        );


                    if (item) {
                        toggleRead(item);
                    }

                    return;
                }


                /* =================================================
                   DELETE
                ================================================= */

                const deleteButton =
                    event.target.closest(
                        ".notification-delete-btn"
                    );


                if (deleteButton) {

                    const item =
                        deleteButton.closest(
                            ".notification-item"
                        );


                    if (!item) {
                        return;
                    }


                    item.style.opacity = "0";


                    item.style.transform =
                        "translateX(15px)";


                    setTimeout(
                        function () {

                            item.remove();

                            updateCounts();

                            applyFilters();

                        },
                        180
                    );

                }

            }
        );

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
       TYPE FILTER
    ===================================================== */

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =====================================================
       STATUS FILTER
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =====================================================
       MARK ALL AS READ
    ===================================================== */

    if (markAllRead) {

        markAllRead.addEventListener(
            "click",
            function () {

                const notifications =
                    getNotifications();


                notifications.forEach(
                    function (item) {

                        item.dataset.status =
                            "read";


                        item.classList.remove(
                            "unread"
                        );


                        const dot =
                            item.querySelector(
                                ".unread-dot"
                            );


                        if (dot) {
                            dot.remove();
                        }


                        const button =
                            item.querySelector(
                                ".notification-read-btn"
                            );


                        if (button) {

                            button.textContent =
                                "○";

                            button.title =
                                "Mark as unread";

                        }

                    }
                );


                updateCounts();

                applyFilters();

            }
        );

    }


    /* =====================================================
       CLEAR ALL
    ===================================================== */

    if (clearAll) {

        clearAll.addEventListener(
            "click",
            function () {

                const notifications =
                    getNotifications();


                if (
                    notifications.length === 0
                ) {
                    return;
                }


                const confirmed =
                    window.confirm(
                        "Clear all notifications?"
                    );


                if (!confirmed) {
                    return;
                }


                notifications.forEach(
                    function (item) {

                        item.remove();

                    }
                );


                updateCounts();

                applyFilters();

            }
        );

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCounts();

    applyFilters();

});