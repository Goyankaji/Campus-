/* =========================================================
   CAMPUS — STUDENT COMMUNITY / BLOG JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           CREATE POST MODAL
        ===================================================== */

        const modal =
            document.querySelector(
                "[data-create-modal]"
            );

        const openButtons =
            document.querySelectorAll(
                "[data-open-create]"
            );

        const closeButtons =
            document.querySelectorAll(
                "[data-close-create]"
            );

        const createForm =
            document.querySelector(
                ".community-form"
            );


        let modalOpen = false;


        /* -----------------------------------------------------
           OPEN MODAL
        ----------------------------------------------------- */

        function openModal() {

            if (!modal) {
                return;
            }

            modal.classList.add(
                "open"
            );

            document.body.style.overflow =
                "hidden";

            modalOpen = true;


            /* Focus first useful field */

            const firstInput =
                modal.querySelector(
                    "input, select, textarea"
                );

            if (firstInput) {

                setTimeout(
                    function () {

                        firstInput.focus();

                    },
                    100
                );

            }

        }


        /* -----------------------------------------------------
           CLOSE MODAL
        ----------------------------------------------------- */

        function closeModal() {

            if (!modal) {
                return;
            }

            modal.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

            modalOpen = false;

        }


        /* -----------------------------------------------------
           OPEN BUTTONS
        ----------------------------------------------------- */

        openButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        openModal();

                    }
                );

            }
        );


        /* -----------------------------------------------------
           CLOSE BUTTONS
        ----------------------------------------------------- */

        closeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        closeModal();

                    }
                );

            }
        );


        /* -----------------------------------------------------
           CLOSE WHEN CLICKING BACKDROP
        ----------------------------------------------------- */

        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target.classList.contains(
                            "community-modal-backdrop"
                        )
                    ) {

                        closeModal();

                    }

                }
            );

        }


        /* -----------------------------------------------------
           ESCAPE KEY
        ----------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    modalOpen
                ) {

                    closeModal();

                }

            }
        );


        /* =====================================================
           CREATE POST FORM
        ===================================================== */

        if (createForm) {

            createForm.addEventListener(
                "submit",
                function () {

                    const submitButton =
                        createForm.querySelector(
                            'button[type="submit"]'
                        );


                    if (!submitButton) {
                        return;
                    }


                    /* Prevent duplicate submission */

                    if (
                        submitButton.dataset.submitted ===
                        "true"
                    ) {

                        event.preventDefault();

                        return;

                    }


                    submitButton.dataset.submitted =
                        "true";


                    submitButton.disabled =
                        true;


                    submitButton.style.opacity =
                        "0.7";


                    submitButton.style.cursor =
                        "wait";


                    submitButton.textContent =
                        "Submitting...";

                }
            );

        }


        /* =====================================================
           LIKE SYSTEM
        ===================================================== */

        const likeButtons =
            document.querySelectorAll(
                "[data-like-post]"
            );


        likeButtons.forEach(
            function (button) {

                let requestRunning =
                    false;


                button.addEventListener(
                    "click",
                    async function (event) {

                        event.preventDefault();


                        /* Prevent duplicate requests */

                        if (requestRunning) {
                            return;
                        }


                        const postId =
                            button.getAttribute(
                                "data-like-post"
                            );


                        if (!postId) {
                            return;
                        }


                        requestRunning =
                            true;


                        button.disabled =
                            true;


                        button.style.opacity =
                            "0.65";


                        try {

                            const response =
                                await fetch(
                                    "/student/blog/"
                                    +
                                    encodeURIComponent(
                                        postId
                                    )
                                    +
                                    "/like",
                                    {
                                        method:
                                            "POST",

                                        headers: {
                                            "X-Requested-With":
                                                "XMLHttpRequest",

                                            "Accept":
                                                "application/json"
                                        },

                                        credentials:
                                            "same-origin"
                                    }
                                );


                            /* ---------------------------------
                               HTTP ERROR
                            --------------------------------- */

                            if (
                                !response.ok
                            ) {

                                throw new Error(
                                    "Like request failed"
                                );

                            }


                            const data =
                                await response.json();


                            /* ---------------------------------
                               SERVER RESPONSE ERROR
                            --------------------------------- */

                            if (
                                !data ||
                                !data.success
                            ) {

                                throw new Error(
                                    data &&
                                    data.message
                                        ? data.message
                                        : "Unable to update like"
                                );

                            }


                            /* ---------------------------------
                               UPDATE COUNT
                            --------------------------------- */

                            const count =
                                document.querySelector(
                                    '[data-like-count="'
                                    +
                                    postId
                                    +
                                    '"]'
                                );


                            if (count) {

                                count.textContent =
                                    data.count;

                            }


                            /* ---------------------------------
                               UPDATE LIKE STATE
                            --------------------------------- */

                            button.classList.toggle(
                                "liked",
                                Boolean(
                                    data.liked
                                )
                            );


                            /* Accessibility */

                            button.setAttribute(
                                "aria-pressed",
                                data.liked
                                    ? "true"
                                    : "false"
                            );

                        }


                        catch (error) {

                            console.error(
                                "Campus Blog Like Error:",
                                error
                            );

                        }


                        finally {

                            requestRunning =
                                false;


                            button.disabled =
                                false;


                            button.style.opacity =
                                "";

                        }

                    }
                );

            }
        );


        /* =====================================================
           INITIAL LIKE ACCESSIBILITY STATE
        ===================================================== */

        likeButtons.forEach(
            function (button) {

                button.setAttribute(
                    "aria-pressed",
                    button.classList.contains(
                        "liked"
                    )
                        ? "true"
                        : "false"
                );

            }
        );


        /* =====================================================
           PREVENT MODAL SCROLL LEAK
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