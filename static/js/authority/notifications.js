/* =========================================================
   AUTHORITY — NOTIFICATIONS JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const notificationSearch =
    document.getElementById(
        "notificationSearch"
    );

const notificationFilter =
    document.getElementById(
        "notificationFilter"
    );

const notificationList =
    document.getElementById(
        "notificationList"
    );

const notificationEmpty =
    document.getElementById(
        "notificationEmpty"
    );

const notificationCount =
    document.getElementById(
        "notificationCount"
    );

const unreadCount =
    document.getElementById(
        "unreadCount"
    );

const readCount =
    document.getElementById(
        "readCount"
    );

const markAllReadBtn =
    document.getElementById(
        "markAllReadBtn"
    );


/* =========================================================
   GET NOTIFICATION ITEMS
========================================================= */

function getNotificationItems() {

    if (!notificationList) {
        return [];
    }

    return Array.from(
        notificationList.querySelectorAll(
            ".notification-item"
        )
    );

}


/* =========================================================
   UPDATE SUMMARY
========================================================= */

function updateNotificationSummary() {

    const items =
        getNotificationItems();


    let unread = 0;
    let read = 0;


    items.forEach(function (item) {

        if (
            item.classList.contains("unread")
        ) {

            unread++;

        } else {

            read++;

        }

    });


    if (unreadCount) {

        unreadCount.textContent =
            String(unread).padStart(2, "0");

    }


    if (readCount) {

        readCount.textContent =
            String(read).padStart(2, "0");

    }

}


/* =========================================================
   FILTER NOTIFICATIONS
========================================================= */

function filterNotifications() {

    const items =
        getNotificationItems();


    const searchValue =
        notificationSearch
            ? notificationSearch.value
                .toLowerCase()
                .trim()
            : "";


    const filterValue =
        notificationFilter
            ? notificationFilter.value
            : "all";


    let visibleCount = 0;


    items.forEach(function (item) {

        const status =
            item.dataset.status || "";


        const important =
            item.dataset.important === "true";


        const searchText =
            item.dataset.search
                ? item.dataset.search.toLowerCase()
                : "";


        const searchMatch =
            searchText.includes(
                searchValue
            );


        let filterMatch = true;


        if (filterValue === "unread") {

            filterMatch =
                item.classList.contains(
                    "unread"
                );

        }


        else if (filterValue === "read") {

            filterMatch =
                item.classList.contains(
                    "read"
                );

        }


        else if (filterValue === "important") {

            filterMatch =
                important;

        }


        if (
            searchMatch &&
            filterMatch
        ) {

            item.style.display = "";

            visibleCount++;

        } else {

            item.style.display = "none";

        }

    });


    updateNotificationCount(
        visibleCount
    );


    if (notificationEmpty) {

        if (visibleCount === 0) {

            notificationEmpty.classList.add(
                "show"
            );

        } else {

            notificationEmpty.classList.remove(
                "show"
            );

        }

    }


    updateNotificationSummary();

}


/* =========================================================
   UPDATE COUNT
========================================================= */

function updateNotificationCount(
    count
) {

    if (!notificationCount) {
        return;
    }


    notificationCount.textContent =
        `Showing ${count} notification${count === 1 ? "" : "s"}`;

}


/* =========================================================
   SEARCH
========================================================= */

if (notificationSearch) {

    notificationSearch.addEventListener(
        "input",
        filterNotifications
    );

}


/* =========================================================
   FILTER
========================================================= */

if (notificationFilter) {

    notificationFilter.addEventListener(
        "change",
        filterNotifications
    );

}


/* =========================================================
   MARK SINGLE NOTIFICATION READ
========================================================= */

function markNotificationRead(
    item
) {

    if (!item) {
        return;
    }


    item.classList.remove(
        "unread"
    );

    item.classList.add(
        "read"
    );


    item.dataset.status =
        "read";


    const button =
        item.querySelector(
            ".notification-menu-btn"
        );


    if (button) {

        button.title =
            "Mark as unread";

    }


    filterNotifications();

}


/* =========================================================
   MARK SINGLE NOTIFICATION UNREAD
========================================================= */

function markNotificationUnread(
    item
) {

    if (!item) {
        return;
    }


    item.classList.remove(
        "read"
    );

    item.classList.add(
        "unread"
    );


    item.dataset.status =
        "unread";


    const button =
        item.querySelector(
            ".notification-menu-btn"
        );


    if (button) {

        button.title =
            "Mark as read";

    }


    filterNotifications();

}


/* =========================================================
   MENU BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".notification-menu-btn"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const item =
                    button.closest(
                        ".notification-item"
                    );


                if (!item) {
                    return;
                }


                if (
                    item.classList.contains(
                        "unread"
                    )
                ) {

                    markNotificationRead(
                        item
                    );

                } else {

                    markNotificationUnread(
                        item
                    );

                }

            }
        );

    });


/* =========================================================
   MARK ALL READ
========================================================= */

if (markAllReadBtn) {

    markAllReadBtn.addEventListener(
        "click",
        function () {

            const items =
                getNotificationItems();


            items.forEach(function (item) {

                item.classList.remove(
                    "unread"
                );

                item.classList.add(
                    "read"
                );

                item.dataset.status =
                    "read";


                const button =
                    item.querySelector(
                        ".notification-menu-btn"
                    );


                if (button) {

                    button.title =
                        "Mark as unread";

                }

            });


            markAllReadBtn.textContent =
                "✓ All notifications read";


            setTimeout(
                function () {

                    markAllReadBtn.textContent =
                        "✓ Mark all as read";

                },
                1500
            );


            filterNotifications();

        }
    );

}


/* =========================================================
   PAGINATION
========================================================= */

document
    .querySelectorAll(
        ".notification-pagination button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const value =
                    button.textContent.trim();


                if (
                    value === "‹" ||
                    value === "›"
                ) {

                    return;

                }


                document
                    .querySelectorAll(
                        ".notification-pagination button"
                    )
                    .forEach(function (item) {

                        item.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );

            }
        );

    });


/* =========================================================
   INITIAL LOAD
========================================================= */

filterNotifications();