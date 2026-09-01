/* =========================================================
   CAMPUS HOD PORTAL
   FEEDBACK JS
   FINAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        const page =
            document.getElementById(
                "hodFeedbackPage"
            );

        if (!page) {
            return;
        }


        /* =====================================================
           ELEMENTS
        ====================================================== */

        const tableBody =
            document.getElementById(
                "feedbackTableBody"
            );

        const searchInput =
            document.getElementById(
                "feedbackSearch"
            );

        const statusSelect =
            document.getElementById(
                "feedbackStatus"
            );

        const sourceSelect =
            document.getElementById(
                "feedbackSource"
            );

        const clearButton =
            document.getElementById(
                "clearFeedbackFilters"
            );

        const resultCount =
            document.getElementById(
                "feedbackResultCount"
            );

        const emptyState =
            document.getElementById(
                "feedbackEmpty"
            );


        /* =====================================================
           ITEMS
        ====================================================== */

        let rows = Array.from(
            tableBody.querySelectorAll(
                ".feedback-row"
            )
        );


        /* =====================================================
           REMOVE DUPLICATE IDS
        ====================================================== */

        const seenIds =
            new Set();


        rows.forEach(
            function (row) {

                const id =
                    row.dataset.id;

                if (!id) {
                    return;
                }


                if (seenIds.has(id)) {

                    row.remove();

                    return;

                }


                seenIds.add(id);

            }
        );


        rows = Array.from(
            tableBody.querySelectorAll(
                ".feedback-row"
            )
        );


        /* =====================================================
           FILTER
        ====================================================== */

        function applyFilters() {

            const search =
                (
                    searchInput?.value || ""
                )
                .trim()
                .toLowerCase();


            const status =
                statusSelect?.value ||
                "all";


            const source =
                sourceSelect?.value ||
                "all";


            let visible =
                0;


            rows.forEach(
                function (row) {


                    const rowText =
                        row.textContent
                            .toLowerCase();


                    const rowStatus =
                        (
                            row.dataset.status ||
                            ""
                        )
                        .toLowerCase();


                    const rowSource =
                        (
                            row.dataset.source ||
                            ""
                        )
                        .toLowerCase();


                    const searchMatch =
                        !search ||
                        rowText.includes(
                            search
                        );


                    const statusMatch =
                        status === "all" ||
                        rowStatus === status;


                    const sourceMatch =
                        source === "all" ||
                        rowSource === source;


                    const show =
                        searchMatch &&
                        statusMatch &&
                        sourceMatch;


                    row.hidden =
                        !show;


                    if (show) {

                        visible++;

                    }

                }
            );


            if (resultCount) {

                resultCount.textContent =
                    visible;

            }


            if (emptyState) {

                emptyState.hidden =
                    visible !== 0;

            }

        }


        /* =====================================================
           CLEAR
        ====================================================== */

        if (clearButton) {

            clearButton.addEventListener(
                "click",
                function () {

                    if (searchInput) {

                        searchInput.value =
                            "";

                    }


                    if (statusSelect) {

                        statusSelect.value =
                            "all";

                    }


                    if (sourceSelect) {

                        sourceSelect.value =
                            "all";

                    }


                    applyFilters();

                }
            );

        }


        /* =====================================================
           LIVE SEARCH
        ====================================================== */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                applyFilters
            );

        }


        if (statusSelect) {

            statusSelect.addEventListener(
                "change",
                applyFilters
            );

        }


        if (sourceSelect) {

            sourceSelect.addEventListener(
                "change",
                applyFilters
            );

        }


        /* =====================================================
           MODAL
        ====================================================== */

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


        const modalAvatar =
            document.getElementById(
                "modalAvatar"
            );

        const modalUser =
            document.getElementById(
                "modalUser"
            );

        const modalSource =
            document.getElementById(
                "modalSource"
            );

        const modalMessage =
            document.getElementById(
                "modalMessage"
            );

        const modalDate =
            document.getElementById(
                "modalDate"
            );


        /* =====================================================
           OPEN MODAL
        ====================================================== */

        document.querySelectorAll(
            ".feedback-view-btn"
        ).forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        const id =
                            button.dataset.feedback;


                        const row =
                            tableBody.querySelector(
                                `[data-id="${id}"]`
                            );


                        if (!row) {
                            return;
                        }


                        const avatar =
                            row.querySelector(
                                ".feedback-avatar"
                            )?.textContent
                                .trim() || "";


                        const user =
                            row.querySelector(
                                ".feedback-user strong"
                            )?.textContent
                                .trim() || "";


                        const source =
                            row.querySelector(
                                ".source-badge"
                            )?.textContent
                                .trim() || "";


                        const message =
                            row.querySelector(
                                ".feedback-message"
                            )?.textContent
                                .trim() || "";


                        const date =
                            row.children[4]
                                ?.textContent
                                .trim() || "";


                        if (modalAvatar) {

                            modalAvatar.textContent =
                                avatar;

                        }


                        if (modalUser) {

                            modalUser.textContent =
                                user;

                        }


                        if (modalSource) {

                            modalSource.textContent =
                                source;

                        }


                        if (modalMessage) {

                            modalMessage.textContent =
                                message;

                        }


                        if (modalDate) {

                            modalDate.textContent =
                                date;

                        }


                        if (modal) {

                            modal.hidden =
                                false;

                            document.body.classList.add(
                                "feedback-modal-open"
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           CLOSE MODAL
        ====================================================== */

        function hideModal() {

            if (!modal) {
                return;
            }


            modal.hidden =
                true;


            document.body.classList.remove(
                "feedback-modal-open"
            );

        }


        if (closeModal) {

            closeModal.addEventListener(
                "click",
                hideModal
            );

        }


        if (closeModalBottom) {

            closeModalBottom.addEventListener(
                "click",
                hideModal
            );

        }


        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        modal
                    ) {

                        hideModal();

                    }

                }
            );

        }


        /* =====================================================
           ESCAPE
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    hideModal();

                }

            }
        );


        /* =====================================================
           INITIAL
        ====================================================== */

        applyFilters();


    }
);