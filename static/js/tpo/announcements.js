/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - ANNOUNCEMENTS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const createButton =
        document.getElementById(
            "createAnnouncementBtn"
        );

    const modal =
        document.getElementById(
            "announcementModal"
        );

    const modalOverlay =
        document.getElementById(
            "announcementModalOverlay"
        );

    const closeModalButton =
        document.getElementById(
            "closeAnnouncementModal"
        );

    const cancelButton =
        document.getElementById(
            "cancelAnnouncement"
        );

    const form =
        document.getElementById(
            "announcementForm"
        );

    const modalTitle =
        document.getElementById(
            "announcementModalTitle"
        );

    const titleInput =
        document.getElementById(
            "announcementTitle"
        );

    const audienceInput =
        document.getElementById(
            "announcementAudience"
        );

    const typeInput =
        document.getElementById(
            "announcementType"
        );

    const messageInput =
        document.getElementById(
            "announcementMessage"
        );

    const saveDraftButton =
        document.getElementById(
            "saveAnnouncementDraft"
        );

    const searchInput =
        document.getElementById(
            "announcementSearch"
        );

    const emptyState =
        document.getElementById(
            "announcementEmpty"
        );

    const countText =
        document.getElementById(
            "announcementCount"
        );

    const totalText =
        document.getElementById(
            "totalAnnouncements"
        );

    const publishedText =
        document.getElementById(
            "publishedAnnouncements"
        );

    const draftText =
        document.getElementById(
            "draftAnnouncements"
        );


    /* =====================================================
       FILTER
    ====================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".announcement-filter-btn"
        );


    let activeFilter = "all";

    let editingItem = null;


    /* =====================================================
       GET ITEMS
    ====================================================== */

    function getItems() {

        const list =
            document.getElementById(
                "announcementList"
            );


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
       OPEN MODAL
    ====================================================== */

    function openModal(
        editItem = null
    ) {

        if (!modal) {

            return;

        }


        editingItem =
            editItem;


        if (editItem) {

            modalTitle.textContent =
                "Edit Announcement";


            const title =
                editItem.querySelector(
                    ".announcement-title-row h3"
                );


            const message =
                editItem.querySelector(
                    ".announcement-info p"
                );


            const meta =
                editItem.querySelector(
                    ".announcement-meta"
                );


            titleInput.value =
                title
                    ? title.textContent.trim()
                    : "";


            messageInput.value =
                message
                    ? message.textContent.trim()
                    : "";


            /*
             * Existing demo data is used only
             * for frontend editing.
             */

            audienceInput.value =
                "Students";


            typeInput.value =
                "general";


            const status =
                editItem.dataset.status;


            if (
                status === "draft"
            ) {

                saveDraftButton.style.display =
                    "inline-flex";

            } else {

                saveDraftButton.style.display =
                    "none";

            }

        } else {

            modalTitle.textContent =
                "Create Announcement";


            form.reset();


            audienceInput.value =
                "Students";


            typeInput.value =
                "general";


            saveDraftButton.style.display =
                "inline-flex";

        }


        modal.classList.add(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        setTimeout(
            function () {

                titleInput.focus();

            },
            100
        );

    }


    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    function closeModal() {

        if (!modal) {

            return;

        }


        modal.classList.remove(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        editingItem =
            null;


        if (form) {

            form.reset();

        }

    }


    /* =====================================================
       CREATE BUTTON
    ====================================================== */

    if (createButton) {

        createButton.addEventListener(
            "click",
            function () {

                openModal();

            }
        );

    }


    /* =====================================================
       CLOSE EVENTS
    ====================================================== */

    if (closeModalButton) {

        closeModalButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("open")
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       FORM SUBMIT — PUBLISH
    ====================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (
                    !titleInput.value.trim() ||
                    !messageInput.value.trim()
                ) {

                    alert(
                        "Please enter both title and message."
                    );

                    return;

                }


                if (editingItem) {

                    updateAnnouncement(
                        editingItem,
                        "published"
                    );

                } else {

                    createAnnouncement(
                        "published"
                    );

                }


                closeModal();

            }
        );

    }


    /* =====================================================
       SAVE DRAFT
    ====================================================== */

    if (saveDraftButton) {

        saveDraftButton.addEventListener(
            "click",
            function () {

                if (
                    !titleInput.value.trim()
                ) {

                    alert(
                        "Please enter an announcement title."
                    );

                    return;

                }


                if (editingItem) {

                    updateAnnouncement(
                        editingItem,
                        "draft"
                    );

                } else {

                    createAnnouncement(
                        "draft"
                    );

                }


                closeModal();

            }
        );

    }


    /* =====================================================
       CREATE ANNOUNCEMENT
    ====================================================== */

    function createAnnouncement(
        status
    ) {

        const list =
            document.getElementById(
                "announcementList"
            );


        if (!list) {

            return;

        }


        const title =
            titleInput.value.trim();


        const message =
            messageInput.value.trim();


        const audience =
            audienceInput.value;


        const type =
            typeInput.value;


        const item =
            document.createElement(
                "article"
            );


        item.className =
            "announcement-item";


        item.dataset.status =
            status;


        item.dataset.search =
            (
                title +
                " " +
                message +
                " " +
                audience
            ).toLowerCase();


        item.innerHTML = `

            <div class="announcement-icon ${getIconClass(type)}">
                ${getIcon(type)}
            </div>

            <div class="announcement-info">

                <div class="announcement-title-row">

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                    <span class="announcement-status ${status}">
                        ${status === "published"
                            ? "Published"
                            : "Draft"}
                    </span>

                </div>

                <p>
                    ${escapeHTML(message)}
                </p>

                <div class="announcement-meta">

                    <span>
                        ${status === "published"
                            ? "Posted just now"
                            : "Saved just now"}
                    </span>

                    <span>
                        •
                    </span>

                    <span>
                        Audience: ${escapeHTML(audience)}
                    </span>

                </div>

            </div>

            <div class="announcement-actions">

                <button
                    type="button"
                    class="announcement-action edit-announcement-btn"
                    title="Edit"
                >
                    ✎
                </button>

                <button
                    type="button"
                    class="announcement-action delete-announcement-btn"
                    title="Delete"
                >
                    ×
                </button>

            </div>
        `;


        list.insertBefore(
            item,
            list.firstChild
        );


        updateAll();

    }


    /* =====================================================
       UPDATE ANNOUNCEMENT
    ====================================================== */

    function updateAnnouncement(
        item,
        status
    ) {

        if (!item) {

            return;

        }


        const title =
            titleInput.value.trim();


        const message =
            messageInput.value.trim();


        const audience =
            audienceInput.value;


        const type =
            typeInput.value;


        const titleElement =
            item.querySelector(
                ".announcement-title-row h3"
            );


        const messageElement =
            item.querySelector(
                ".announcement-info p"
            );


        const statusElement =
            item.querySelector(
                ".announcement-status"
            );


        const metaElements =
            item.querySelectorAll(
                ".announcement-meta span"
            );


        const icon =
            item.querySelector(
                ".announcement-icon"
            );


        if (titleElement) {

            titleElement.textContent =
                title;

        }


        if (messageElement) {

            messageElement.textContent =
                message;

        }


        if (statusElement) {

            statusElement.className =
                "announcement-status " +
                status;

            statusElement.textContent =
                status === "published"
                    ? "Published"
                    : "Draft";

        }


        if (metaElements.length >= 3) {

            metaElements[0].textContent =
                status === "published"
                    ? "Posted just now"
                    : "Saved just now";


            metaElements[2].textContent =
                "Audience: " +
                audience;

        }


        if (icon) {

            icon.className =
                "announcement-icon " +
                getIconClass(type);

            icon.textContent =
                getIcon(type);

        }


        item.dataset.status =
            status;


        item.dataset.search =
            (
                title +
                " " +
                message +
                " " +
                audience
            ).toLowerCase();


        updateAll();

    }


    /* =====================================================
       EDIT
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".edit-announcement-btn"
                );


            if (!button) {

                return;

            }


            const item =
                button.closest(
                    ".announcement-item"
                );


            if (!item) {

                return;

            }


            openModal(
                item
            );

        }
    );


    /* =====================================================
       DELETE
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".delete-announcement-btn"
                );


            if (!button) {

                return;

            }


            const item =
                button.closest(
                    ".announcement-item"
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

                    updateAll();

                },
                220
            );

        }
    );


    /* =====================================================
       FILTER
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


                    updateAll();

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
            updateAll
        );

    }


    /* =====================================================
       UPDATE ALL
    ====================================================== */

    function updateAll() {

        updateList();

        updateCounts();

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


        items.forEach(
            function (item) {

                const status =
                    item.dataset.status ||
                    "published";


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


                const show =
                    matchesFilter &&
                    matchesSearch;


                item.style.display =
                    show
                        ? "flex"
                        : "none";


                if (show) {

                    visibleCount++;

                }

            }
        );


        if (countText) {

            if (
                visibleCount ===
                items.length
            ) {

                countText.textContent =
                    "Showing " +
                    visibleCount +
                    " announcements";

            } else {

                countText.textContent =
                    "Showing " +
                    visibleCount +
                    " matching announcements";

            }

        }


        if (emptyState) {

            emptyState.style.display =
                visibleCount === 0
                    ? "flex"
                    : "none";

        }

    }


    /* =====================================================
       COUNTS
    ====================================================== */

    function updateCounts() {

        const items =
            getItems();


        let published = 0;
        let drafts = 0;


        items.forEach(
            function (item) {

                if (
                    item.dataset.status ===
                    "draft"
                ) {

                    drafts++;

                } else {

                    published++;

                }

            }
        );


        if (totalText) {

            totalText.textContent =
                items.length;

        }


        if (publishedText) {

            publishedText.textContent =
                published;

        }


        if (draftText) {

            draftText.textContent =
                drafts;

        }

    }


    /* =====================================================
       ICON HELPERS
    ====================================================== */

    function getIconClass(
        type
    ) {

        switch (type) {

            case "drive":

                return "purple";


            case "interview":

                return "blue";


            case "important":

                return "orange";


            default:

                return "purple";

        }

    }


    function getIcon(
        type
    ) {

        switch (type) {

            case "drive":

                return "▣";


            case "interview":

                return "◷";


            case "important":

                return "!";


            default:

                return "◇";

        }

    }


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(
        value
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            value;


        return div.innerHTML;

    }


    /* =====================================================
       PAGINATION UI
    ====================================================== */

    document
        .querySelectorAll(
            ".announcement-pagination button"
        )
        .forEach(
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


                        document
                            .querySelectorAll(
                                ".announcement-pagination button"
                            )
                            .forEach(
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
                            "Announcement page:",
                            button.textContent.trim()
                        );

                    }
                );

            }
        );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    updateAll();


    console.log(
        "TPO Announcements Page Loaded Successfully"
    );

});