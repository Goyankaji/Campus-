document.addEventListener("DOMContentLoaded", function () {

    const notificationFilter =
        document.getElementById("notificationFilter");

    const notificationList =
        document.getElementById("notificationList");

    const markAllRead =
        document.getElementById("markAllRead");

    const unreadCount =
        document.getElementById("unreadCount");

    const readCount =
        document.getElementById("readCount");


    /* =====================================================
       FILTER
       ===================================================== */

    if (notificationFilter) {

        notificationFilter.addEventListener(
            "change",
            filterNotifications
        );

    }


    function filterNotifications() {

        if (!notificationList) {
            return;
        }


        const selectedFilter =
            notificationFilter
                ? notificationFilter.value
                : "all";


        const notifications =
            notificationList.querySelectorAll(
                ".notification-item"
            );


        notifications.forEach(function (notification) {

            const status =
                notification.dataset.status || "";

            const type =
                notification.dataset.type || "";


            let showNotification = true;


            if (selectedFilter === "unread") {

                showNotification =
                    status === "unread";

            }


            if (selectedFilter === "placement") {

                showNotification =
                    type === "placement";

            }


            if (selectedFilter === "system") {

                showNotification =
                    type === "system";

            }


            if (selectedFilter === "announcement") {

                showNotification =
                    type === "announcement";

            }


            notification.style.display =
                showNotification
                    ? ""
                    : "flex";

        });

    }


    /* =====================================================
       MARK SINGLE AS READ
       ===================================================== */

    if (notificationList) {

        notificationList.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(".read-btn");


                if (!button) {
                    return;
                }


                const notification =
                    button.closest(
                        ".notification-item"
                    );


                if (!notification) {
                    return;
                }


                markAsRead(notification);

            }
        );

    }


    function markAsRead(notification) {

        if (
            notification.dataset.status !==
            "unread"
        ) {
            return;
        }


        notification.dataset.status =
            "read";


        notification.classList.remove(
            "unread"
        );


        notification.classList.add(
            "read"
        );


        const button =
            notification.querySelector(
                ".read-btn"
            );


        if (button) {
            button.remove();
        }


        updateCounts();

    }


    /* =====================================================
       MARK ALL READ
       ===================================================== */

    if (markAllRead) {

        markAllRead.addEventListener(
            "click",
            function () {

                if (!notificationList) {
                    return;
                }


                const unreadNotifications =
                    notificationList.querySelectorAll(
                        ".notification-item.unread"
                    );


                unreadNotifications.forEach(
                    function (notification) {

                        markAsRead(notification);

                    }
                );

            }
        );

    }


    /* =====================================================
       COUNTS
       ===================================================== */

    function updateCounts() {

        if (!notificationList) {
            return;
        }


        const notifications =
            notificationList.querySelectorAll(
                ".notification-item"
            );


        let unread = 0;
        let read = 0;


        notifications.forEach(
            function (notification) {

                if (
                    notification.dataset.status ===
                    "unread"
                ) {

                    unread++;

                } else {

                    read++;

                }

            }
        );


        if (unreadCount) {

            unreadCount.textContent =
                unread;

        }


        if (readCount) {

            readCount.textContent =
                read;

        }

    }


    updateCounts();

});