document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const list =
        document.getElementById(
            "feedbackList"
        );

    const search =
        document.getElementById(
            "feedbackSearch"
        );

    const categoryFilter =
        document.getElementById(
            "feedbackCategory"
        );

    const statusFilter =
        document.getElementById(
            "feedbackStatus"
        );

    const priorityFilter =
        document.getElementById(
            "feedbackPriority"
        );

    const emptyState =
        document.getElementById(
            "feedbackEmpty"
        );


    const modal =
        document.getElementById(
            "feedbackModal"
        );

    const closeModal =
        document.getElementById(
            "closeFeedbackModal"
        );

    const closeModalBottom =
        document.getElementById(
            "closeFeedbackModalBottom"
        );

    const modalOverlay =
        document.querySelector(
            ".feedback-modal-overlay"
        );


    const modalTitle =
        document.getElementById(
            "feedbackModalTitle"
        );

    const detailUser =
        document.getElementById(
            "detailUser"
        );

    const detailCategory =
        document.getElementById(
            "detailCategory"
        );

    const detailPriority =
        document.getElementById(
            "detailPriority"
        );

    const detailStatus =
        document.getElementById(
            "detailStatus"
        );

    const detailMessage =
        document.getElementById(
            "detailMessage"
        );


    const totalCount =
        document.getElementById(
            "totalFeedback"
        );

    const pendingCount =
        document.getElementById(
            "pendingFeedback"
        );

    const resolvedCount =
        document.getElementById(
            "resolvedFeedback"
        );


    /* =====================================================
       GET ITEMS
    ===================================================== */

    function getItems() {

        if (!list) {
            return [];
        }

        return Array.from(
            list.querySelectorAll(
                ".feedback-item"
            )
        );

    }


    /* =====================================================
       UPDATE COUNTS
    ===================================================== */

    function updateCounts() {

        const items =
            getItems();


        const total =
            items.length;


        const pending =
            items.filter(
                function (item) {

                    return item.dataset.status ===
                        "pending";

                }
            ).length;


        const resolved =
            items.filter(
                function (item) {

                    return item.dataset.status ===
                        "resolved";

                }
            ).length;


        if (totalCount) {
            totalCount.textContent =
                total;
        }

        if (pendingCount) {
            pendingCount.textContent =
                pending;
        }

        if (resolvedCount) {
            resolvedCount.textContent =
                resolved;
        }

    }


    /* =====================================================
       FILTER
    ===================================================== */

    function applyFilters() {

        const query =
            search
                ? search.value
                    .trim()
                    .toLowerCase()
                : "";


        const category =
            categoryFilter
                ? categoryFilter.value
                : "all";


        const status =
            statusFilter
                ? statusFilter.value
                : "all";


        const priority =
            priorityFilter
                ? priorityFilter.value
                : "all";


        const items =
            getItems();


        let visible =
            0;


        items.forEach(
            function (item) {

                const title =
                    item.querySelector("h3")
                        ?.textContent
                        .toLowerCase() || "";


                const message =
                    item.querySelector("p")
                        ?.textContent
                        .toLowerCase() || "";


                const user =
                    item.querySelector(
                        ".feedback-user"
                    )
                    ?.textContent
                    .toLowerCase() || "";


                const itemCategory =
                    item.dataset.category || "";


                const itemStatus =
                    item.dataset.status || "";


                const itemPriority =
                    item.dataset.priority || "";


                const matchesSearch =
                    !query ||
                    title.includes(query) ||
                    message.includes(query) ||
                    user.includes(query);


                const matchesCategory =
                    category === "all" ||
                    itemCategory === category;


                const matchesStatus =
                    status === "all" ||
                    itemStatus === status;


                const matchesPriority =
                    priority === "all" ||
                    itemPriority === priority;


                const show =
                    matchesSearch &&
                    matchesCategory &&
                    matchesStatus &&
                    matchesPriority;


                item.style.display =
                    show ? "" : "none";


                if (show) {
                    visible++;
                }

            }
        );


        if (emptyState) {

            emptyState.style.display =
                visible === 0
                    ? "flex"
                    : "none";

        }

    }


    /* =====================================================
       OPEN DETAIL MODAL
    ===================================================== */

    function openModal(item) {

        if (!item) {
            return;
        }


        const title =
            item.querySelector("h3")
                ?.textContent
                .trim() || "-";


        const user =
            item.querySelector(
                ".feedback-user"
            )
            ?.textContent
            .trim() || "-";


        const message =
            item.querySelector("p")
                ?.textContent
                .trim() || "-";


        const category =
            item.dataset.category || "-";


        const priority =
            item.dataset.priority || "-";


        const status =
            item.dataset.status || "-";


        if (modalTitle) {
            modalTitle.textContent =
                title;
        }


        if (detailUser) {
            detailUser.textContent =
                user;
        }


        if (detailCategory) {
            detailCategory.textContent =
                capitalize(category);
        }


        if (detailPriority) {
            detailPriority.textContent =
                capitalize(priority);
        }


        if (detailStatus) {
            detailStatus.textContent =
                capitalize(status);
        }


        if (detailMessage) {
            detailMessage.textContent =
                message;
        }


        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeFeedbackModal() {

        modal.classList.remove(
            "open"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       ITEM ACTIONS
    ===================================================== */

    if (list) {

        list.addEventListener(
            "click",
            function (event) {

                const item =
                    event.target.closest(
                        ".feedback-item"
                    );


                if (!item) {
                    return;
                }


                /* VIEW */

                if (
                    event.target.closest(
                        ".feedback-view-btn"
                    )
                ) {

                    openModal(item);

                    return;

                }


                /* DELETE */

                if (
                    event.target.closest(
                        ".feedback-delete-btn"
                    )
                ) {

                    const confirmed =
                        window.confirm(
                            "Delete this feedback?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    item.style.opacity =
                        "0";


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


                    return;

                }


                /* STATUS */

                if (
                    event.target.closest(
                        ".feedback-status-btn"
                    )
                ) {

                    updateStatus(item);

                }

            }
        );

    }


    /* =====================================================
       UPDATE STATUS
    ===================================================== */

    function updateStatus(item) {

        const current =
            item.dataset.status;


        let next;


        if (current === "pending") {

            next = "reviewed";

        } else if (current === "reviewed") {

            next = "resolved";

        } else {

            next = "pending";

        }


        item.dataset.status =
            next;


        const badge =
            item.querySelector(
                ".feedback-status"
            );


        const button =
            item.querySelector(
                ".feedback-status-btn"
            );


        if (badge) {

            badge.textContent =
                capitalize(next);


            badge.className =
                `feedback-status ${next}`;

        }


        if (button) {

            button.textContent =
                next === "resolved"
                    ? "↻"
                    : "✓";

        }


        updateCounts();

        applyFilters();

    }


    /* =====================================================
       CLOSE EVENTS
    ===================================================== */

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeFeedbackModal
        );

    }


    if (closeModalBottom) {

        closeModalBottom.addEventListener(
            "click",
            closeFeedbackModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeFeedbackModal
        );

    }


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeFeedbackModal();

            }

        }
    );


    /* =====================================================
       FILTER EVENTS
    ===================================================== */

    if (search) {

        search.addEventListener(
            "input",
            applyFilters
        );

    }


    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    if (priorityFilter) {

        priorityFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =====================================================
       CAPITALIZE
    ===================================================== */

    function capitalize(value) {

        if (!value) {
            return "-";
        }

        return value.charAt(0).toUpperCase() +
            value.slice(1);

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCounts();

    applyFilters();

});