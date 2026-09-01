/* =========================================================
   CAMPUS HOD PORTAL
   ANNOUNCEMENTS JS
   FINAL VERSION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           ELEMENTS
        ====================================================== */

        const page =
            document.getElementById(
                "hodAnnouncementsPage"
            );

        if (!page) {
            return;
        }


        const list =
            document.getElementById(
                "announcementList"
            );

        const searchInput =
            document.getElementById(
                "announcementSearch"
            );

        const categorySelect =
            document.getElementById(
                "announcementCategory"
            );

        const statusSelect =
            document.getElementById(
                "announcementStatus"
            );

        const clearButton =
            document.getElementById(
                "clearAnnouncementFilters"
            );

        const markAllButton =
            document.getElementById(
                "markAllReadBtn"
            );

        const resultCount =
            document.getElementById(
                "announcementResultCount"
            );

        const emptyState =
            document.getElementById(
                "announcementEmpty"
            );


        if (!list) {
            return;
        }


        /* =====================================================
           ANNOUNCEMENT ITEMS
        ====================================================== */

        let items = Array.from(
            list.querySelectorAll(
                ".announcement-item"
            )
        );


        /* =====================================================
           REMOVE DUPLICATES
           Uses data-id as unique identifier.
        ====================================================== */

        const uniqueIds =
            new Set();

        items.forEach(
            function (item) {

                const id =
                    item.dataset.id;

                if (!id) {
                    return;
                }

                if (uniqueIds.has(id)) {

                    item.remove();

                    return;
                }

                uniqueIds.add(id);

            }
        );


        items = Array.from(
            list.querySelectorAll(
                ".announcement-item"
            )
        );


        /* =====================================================
           UPDATE ITEM STATUS
        ====================================================== */

        function updateItemStatus(
            item,
            status
        ) {

            if (!item) {
                return;
            }


            item.dataset.status =
                status;


            if (status === "read") {

                item.classList.remove(
                    "unread"
                );

            } else {

                item.classList.add(
                    "unread"
                );

            }


            const button =
                item.querySelector(
                    ".announcement-action"
                );


            if (!button) {
                return;
            }


            if (status === "read") {

                button.textContent =
                    "Read";

                button.classList.add(
                    "read-action"
                );

            } else {

                button.textContent =
                    "Mark read";

                button.classList.remove(
                    "read-action"
                );

            }

        }


        /* =====================================================
           FILTER
        ====================================================== */

        function applyFilters() {

            const search =
                (
                    searchInput
                    ? searchInput.value
                    : ""
                )
                .trim()
                .toLowerCase();


            const category =
                categorySelect
                ? categorySelect.value
                : "all";


            const status =
                statusSelect
                ? statusSelect.value
                : "all";


            let visibleCount = 0;


            items.forEach(
                function (item) {

                    const title =
                        (
                            item.querySelector(
                                "h3"
                            )?.textContent || ""
                        )
                        .toLowerCase();


                    const description =
                        (
                            item.querySelector(
                                ".announcement-description"
                            )?.textContent || ""
                        )
                        .toLowerCase();


                    const itemCategory =
                        (
                            item.dataset.category ||
                            ""
                        )
                        .toLowerCase();


                    const itemStatus =
                        (
                            item.dataset.status ||
                            "read"
                        )
                        .toLowerCase();


                    const matchesSearch =
                        !search ||
                        title.includes(search) ||
                        description.includes(search);


                    const matchesCategory =
                        category === "all" ||
                        itemCategory === category;


                    const matchesStatus =
                        status === "all" ||
                        itemStatus === status;


                    const visible =
                        matchesSearch &&
                        matchesCategory &&
                        matchesStatus;


                    if (visible) {

                        item.hidden = false;

                        visibleCount++;

                    } else {

                        item.hidden = true;

                    }

                }
            );


            if (resultCount) {

                resultCount.textContent =
                    visibleCount;

            }


            if (emptyState) {

                emptyState.hidden =
                    visibleCount !== 0;

            }

        }


        /* =====================================================
           MARK SINGLE AS READ
        ====================================================== */

        items.forEach(
            function (item) {

                const button =
                    item.querySelector(
                        ".announcement-action"
                    );


                if (!button) {
                    return;
                }


                button.addEventListener(
                    "click",
                    function () {

                        if (
                            item.dataset.status ===
                            "read"
                        ) {
                            return;
                        }


                        updateItemStatus(
                            item,
                            "read"
                        );


                        applyFilters();

                    }
                );

            }
        );


        /* =====================================================
           MARK ALL AS READ
        ====================================================== */

        if (markAllButton) {

            markAllButton.addEventListener(
                "click",
                function () {

                    items.forEach(
                        function (item) {

                            updateItemStatus(
                                item,
                                "read"
                            );

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
           CATEGORY
        ====================================================== */

        if (categorySelect) {

            categorySelect.addEventListener(
                "change",
                applyFilters
            );

        }


        /* =====================================================
           STATUS
        ====================================================== */

        if (statusSelect) {

            statusSelect.addEventListener(
                "change",
                applyFilters
            );

        }


        /* =====================================================
           CLEAR FILTERS
        ====================================================== */

        if (clearButton) {

            clearButton.addEventListener(
                "click",
                function () {


                    if (searchInput) {

                        searchInput.value =
                            "";

                    }


                    if (categorySelect) {

                        categorySelect.value =
                            "all";

                    }


                    if (statusSelect) {

                        statusSelect.value =
                            "all";

                    }


                    applyFilters();

                }
            );

        }


        /* =====================================================
           INITIAL STATE
        ====================================================== */

        applyFilters();


    }
);