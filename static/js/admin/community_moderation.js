/* =========================================================
   CAMPUS ADMIN — COMMUNITY MODERATION JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           STATUS FILTER
        ===================================================== */

        const statusSelect =
            document.querySelector(
                "#moderationStatus"
            );


        if (statusSelect) {

            statusSelect.addEventListener(
                "change",
                function () {

                    const status =
                        this.value;


                    const url =
                        new URL(
                            window.location.href
                        );


                    url.searchParams.set(
                        "status",
                        status
                    );


                    window.location.href =
                        url.toString();

                }
            );

        }


        /* =====================================================
           APPROVE CONFIRMATION
        ===================================================== */

        document
            .querySelectorAll(
                "[data-approve]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            const confirmed =
                                window.confirm(
                                    "Approve this post and publish it to students?"
                                );


                            if (!confirmed) {

                                event.preventDefault();

                                return;

                            }


                            button.disabled =
                                true;


                            button.textContent =
                                "Approving...";

                        }
                    );

                }
            );


        /* =====================================================
           REJECT MODAL
        ===================================================== */

        const modal =
            document.querySelector(
                "#rejectModal"
            );


        const rejectForm =
            document.querySelector(
                "#rejectForm"
            );


        const reasonInput =
            document.querySelector(
                "#rejectionReason"
            );


        const openRejectButtons =
            document.querySelectorAll(
                "[data-open-reject]"
            );


        const closeRejectButtons =
            document.querySelectorAll(
                "[data-close-reject]"
            );


        function openRejectModal(
            postId
        ) {

            if (!modal || !rejectForm) {
                return;
            }


            rejectForm.action =
                "/admin/community/"
                +
                encodeURIComponent(
                    postId
                )
                +
                "/review";


            modal.classList.add(
                "open"
            );


            document.body.style.overflow =
                "hidden";


            if (reasonInput) {

                reasonInput.value =
                    "";

                setTimeout(
                    function () {

                        reasonInput.focus();

                    },
                    100
                );

            }

        }


        function closeRejectModal() {

            if (!modal) {
                return;
            }


            modal.classList.remove(
                "open"
            );


            document.body.style.overflow =
                "";

        }


        openRejectButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const postId =
                            button.getAttribute(
                                "data-post-id"
                            );


                        if (!postId) {
                            return;
                        }


                        openRejectModal(
                            postId
                        );

                    }
                );

            }
        );


        closeRejectButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        closeRejectModal();

                    }
                );

            }
        );


        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target.classList.contains(
                            "moderation-modal-backdrop"
                        )
                    ) {

                        closeRejectModal();

                    }

                }
            );

        }


        /* =====================================================
           REJECT FORM
        ===================================================== */

        if (rejectForm) {

            rejectForm.addEventListener(
                "submit",
                function (event) {

                    if (
                        !reasonInput ||
                        !reasonInput.value.trim()
                    ) {

                        event.preventDefault();

                        if (reasonInput) {

                            reasonInput.focus();

                        }

                        return;

                    }


                    const submitButton =
                        rejectForm.querySelector(
                            'button[type="submit"]'
                        );


                    if (submitButton) {

                        submitButton.disabled =
                            true;

                        submitButton.textContent =
                            "Rejecting...";

                    }

                }
            );

        }


        /* =====================================================
           ESCAPE
        ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeRejectModal();

                }

            }
        );


        /* =====================================================
           CLEANUP
        ===================================================== */

        window.addEventListener(
            "beforeunload",
            function () {

                document.body.style.overflow =
                    "";

            }
        );

    }
);