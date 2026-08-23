document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const list =
        document.getElementById(
            "announcementList"
        );

    const search =
        document.getElementById(
            "announcementSearch"
        );

    const categoryFilter =
        document.getElementById(
            "announcementCategory"
        );

    const statusFilter =
        document.getElementById(
            "announcementStatus"
        );

    const emptyState =
        document.getElementById(
            "announcementEmpty"
        );


    const modal =
        document.getElementById(
            "announcementModal"
        );

    const createButton =
        document.getElementById(
            "createAnnouncementBtn"
        );

    const closeModal =
        document.getElementById(
            "closeAnnouncementModal"
        );

    const cancelButton =
        document.getElementById(
            "cancelAnnouncement"
        );

    const modalOverlay =
        document.querySelector(
            ".announcement-modal-overlay"
        );

    const form =
        document.getElementById(
            "announcementForm"
        );


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    const titleInput =
        document.getElementById(
            "announcementTitle"
        );

    const categoryInput =
        document.getElementById(
            "announcementFormCategory"
        );

    const statusInput =
        document.getElementById(
            "announcementFormStatus"
        );

    const audienceInput =
        document.getElementById(
            "announcementAudience"
        );

    const messageInput =
        document.getElementById(
            "announcementMessage"
        );


    const totalCount =
        document.getElementById(
            "totalAnnouncements"
        );

    const publishedCount =
        document.getElementById(
            "publishedAnnouncements"
        );

    const draftCount =
        document.getElementById(
            "draftAnnouncements"
        );

    const viewsCount =
        document.getElementById(
            "announcementViews"
        );


    let editingItem = null;


    /* =====================================================
       GET ITEMS
    ===================================================== */

    function getItems() {

        if (!list) {
            return [];
        }

        return Array.from(
            list.querySelectorAll(
                ".announcement-item"
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


        const published =
            items.filter(
                function (item) {

                    return item.dataset.status ===
                        "published";

                }
            ).length;


        const drafts =
            items.filter(
                function (item) {

                    return item.dataset.status ===
                        "draft";

                }
            ).length;


        let views = 0;


        items.forEach(
            function (item) {

                const meta =
                    item.querySelector(
                        ".announcement-meta"
                    );


                if (!meta) {
                    return;
                }


                const text =
                    meta.textContent;


                const match =
                    text.match(
                        /([\d,]+)\s*views/
                    );


                if (match) {

                    views += parseInt(
                        match[1].replace(
                            /,/g,
                            ""
                        ),
                        10
                    );

                }

            }
        );


        if (totalCount) {
            totalCount.textContent = total;
        }

        if (publishedCount) {
            publishedCount.textContent =
                published;
        }

        if (draftCount) {
            draftCount.textContent =
                drafts;
        }

        if (viewsCount) {
            viewsCount.textContent =
                views.toLocaleString();
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


        const selectedCategory =
            categoryFilter
                ? categoryFilter.value
                : "all";


        const selectedStatus =
            statusFilter
                ? statusFilter.value
                : "all";


        const items =
            getItems();


        let visible = 0;


        items.forEach(
            function (item) {

                const title =
                    item.querySelector("h3")
                        ?.textContent
                        .toLowerCase() || "";


                const description =
                    item.querySelector("p")
                        ?.textContent
                        .toLowerCase() || "";


                const category =
                    item.dataset.category || "";


                const status =
                    item.dataset.status || "";


                const matchesSearch =
                    !query ||
                    title.includes(query) ||
                    description.includes(query);


                const matchesCategory =
                    selectedCategory === "all" ||
                    category === selectedCategory;


                const matchesStatus =
                    selectedStatus === "all" ||
                    status === selectedStatus;


                const show =
                    matchesSearch &&
                    matchesCategory &&
                    matchesStatus;


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
       OPEN MODAL
    ===================================================== */

    function openModal(item = null) {

        editingItem = item;


        if (item) {

            modalTitle.textContent =
                "Edit Announcement";


            titleInput.value =
                item.querySelector("h3")
                    ?.textContent
                    .trim() || "";


            categoryInput.value =
                item.dataset.category;


            statusInput.value =
                item.dataset.status;


            messageInput.value =
                item.querySelector("p")
                    ?.textContent
                    .trim() || "";


        } else {

            modalTitle.textContent =
                "Create Announcement";


            form.reset();


            categoryInput.value =
                "placement";


            statusInput.value =
                "published";


            audienceInput.value =
                "all";

        }


        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        setTimeout(
            function () {

                titleInput.focus();

            },
            50
        );

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeAnnouncementModal() {

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        editingItem = null;

    }


    /* =====================================================
       CREATE
    ===================================================== */

    if (createButton) {

        createButton.addEventListener(
            "click",
            function () {

                openModal();

            }
        );

    }


    /* =====================================================
       CLOSE
    ===================================================== */

    if (closeModal) {
        closeModal.addEventListener(
            "click",
            closeAnnouncementModal
        );
    }


    if (cancelButton) {
        cancelButton.addEventListener(
            "click",
            closeAnnouncementModal
        );
    }


    if (modalOverlay) {
        modalOverlay.addEventListener(
            "click",
            closeAnnouncementModal
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

                closeAnnouncementModal();

            }

        }
    );


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const title =
                    titleInput.value.trim();


                const category =
                    categoryInput.value;


                const status =
                    statusInput.value;


                const message =
                    messageInput.value.trim();


                if (!title || !message) {
                    return;
                }


                /* =========================================
                   EDIT EXISTING
                ========================================= */

                if (editingItem) {

                    const heading =
                        editingItem.querySelector(
                            "h3"
                        );


                    const paragraph =
                        editingItem.querySelector(
                            "p"
                        );


                    const statusBadge =
                        editingItem.querySelector(
                            ".announcement-status"
                        );


                    const categoryBadge =
                        editingItem.querySelector(
                            ".announcement-category"
                        );


                    heading.textContent =
                        title;


                    paragraph.textContent =
                        message;


                    editingItem.dataset.category =
                        category;


                    editingItem.dataset.status =
                        status;


                    statusBadge.textContent =
                        status === "published"
                            ? "Published"
                            : "Draft";


                    statusBadge.className =
                        `announcement-status ${status}`;


                    categoryBadge.textContent =
                        category.charAt(0)
                            .toUpperCase() +
                        category.slice(1);


                    categoryBadge.className =
                        `announcement-category ${category}`;


                    editingItem.classList.toggle(
                        "draft-item",
                        status === "draft"
                    );


                } else {

                    /* =====================================
                       CREATE NEW
                    ===================================== */

                    const item =
                        createAnnouncementItem(
                            title,
                            category,
                            status,
                            message
                        );


                    list.prepend(item);

                }


                closeAnnouncementModal();

                updateCounts();

                applyFilters();

            }
        );

    }


    /* =====================================================
       CREATE ITEM
    ===================================================== */

    function createAnnouncementItem(
        title,
        category,
        status,
        message
    ) {

        const item =
            document.createElement("article");


        item.className =
            "announcement-item";


        if (status === "draft") {
            item.classList.add(
                "draft-item"
            );
        }


        item.dataset.category =
            category;


        item.dataset.status =
            status;


        const iconMap = {
            placement: "◉",
            deadline: "!",
            event: "◇",
            general: "i"
        };


        const categoryName =
            category.charAt(0)
                .toUpperCase() +
            category.slice(1);


        item.innerHTML = `

            <div
                class="announcement-type-icon ${category}"
            >
                ${iconMap[category] || "◇"}
            </div>


            <div class="announcement-content">

                <div class="announcement-title-row">

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                    <span
                        class="announcement-status ${status}"
                    >
                        ${
                            status === "published"
                                ? "Published"
                                : "Draft"
                        }
                    </span>

                </div>


                <p>
                    ${escapeHTML(message)}
                </p>


                <div class="announcement-meta">

                    <span
                        class="announcement-category ${category}"
                    >
                        ${categoryName}
                    </span>

                    <span>
                        Just now
                    </span>

                </div>

            </div>


            <div class="announcement-actions">

                <button
                    type="button"
                    class="announcement-edit"
                    title="Edit"
                >
                    ✎
                </button>


                <button
                    type="button"
                    class="announcement-toggle"
                    title="${
                        status === "published"
                            ? "Unpublish"
                            : "Publish"
                    }"
                >
                    ${
                        status === "published"
                            ? "●"
                            : "▶"
                    }
                </button>


                <button
                    type="button"
                    class="announcement-delete"
                    title="Delete"
                >
                    ×
                </button>

            </div>

        `;


        return item;

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
                        ".announcement-item"
                    );


                if (!item) {
                    return;
                }


                /* EDIT */

                if (
                    event.target.closest(
                        ".announcement-edit"
                    )
                ) {

                    openModal(item);

                    return;

                }


                /* DELETE */

                if (
                    event.target.closest(
                        ".announcement-delete"
                    )
                ) {

                    const confirmed =
                        window.confirm(
                            "Delete this announcement?"
                        );


                    if (!confirmed) {
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


                    return;

                }


                /* PUBLISH / UNPUBLISH */

                if (
                    event.target.closest(
                        ".announcement-toggle"
                    )
                ) {

                    const isPublished =
                        item.dataset.status ===
                        "published";


                    item.dataset.status =
                        isPublished
                            ? "draft"
                            : "published";


                    item.classList.toggle(
                        "draft-item",
                        !isPublished
                    );


                    const badge =
                        item.querySelector(
                            ".announcement-status"
                        );


                    const toggle =
                        item.querySelector(
                            ".announcement-toggle"
                        );


                    if (badge) {

                        badge.textContent =
                            isPublished
                                ? "Draft"
                                : "Published";


                        badge.className =
                            `announcement-status ${
                                isPublished
                                    ? "draft"
                                    : "published"
                            }`;

                    }


                    if (toggle) {

                        toggle.textContent =
                            isPublished
                                ? "▶"
                                : "●";


                        toggle.title =
                            isPublished
                                ? "Publish"
                                : "Unpublish";

                    }


                    updateCounts();

                    applyFilters();

                }

            }
        );

    }


    /* =====================================================
       SEARCH + FILTER
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


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");


        div.textContent =
            value;


        return div.innerHTML;

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCounts();

    applyFilters();

});