/* =========================================================
   CAMPUS — BLOG DETAIL JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const likeButton =
            document.querySelector(
                "[data-detail-like]"
            );


        if (!likeButton) {
            return;
        }


        likeButton.addEventListener(
            "click",
            async function () {

                const postId =
                    likeButton.getAttribute(
                        "data-detail-like"
                    );


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
                                method: "POST",

                                headers: {
                                    "X-Requested-With":
                                        "XMLHttpRequest"
                                }
                            }
                        );


                    const data =
                        await response.json();


                    if (!data.success) {

                        return;

                    }


                    const count =
                        document.querySelector(
                            "[data-detail-like-count]"
                        );


                    if (count) {

                        count.textContent =
                            data.count;

                    }


                    likeButton.classList.toggle(
                        "liked",
                        data.liked
                    );

                }

                catch (error) {

                    console.error(
                        "Like error:",
                        error
                    );

                }

            }
        );

    }
);
/* =========================================================
   CAMPUS — STUDENT BLOG DETAIL JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           LIKE
        ===================================================== */

        const likeButton =
            document.querySelector(
                "[data-like-post]"
            );


        if (likeButton) {

            let likeRequestRunning =
                false;


            likeButton.addEventListener(
                "click",
                async function (event) {

                    event.preventDefault();


                    if (likeRequestRunning) {
                        return;
                    }


                    const postId =
                        likeButton.getAttribute(
                            "data-like-post"
                        );


                    if (!postId) {
                        return;
                    }


                    likeRequestRunning =
                        true;


                    likeButton.disabled =
                        true;


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
                                    method: "POST",

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


                        if (!response.ok) {

                            throw new Error(
                                "Like request failed"
                            );

                        }


                        const data =
                            await response.json();


                        if (
                            !data ||
                            !data.success
                        ) {

                            throw new Error(
                                data.message ||
                                "Unable to update like."
                            );

                        }


                        const count =
                            document.querySelector(
                                "[data-like-count]"
                            );


                        if (count) {

                            count.textContent =
                                data.count;

                        }


                        likeButton.classList.toggle(
                            "liked",
                            Boolean(
                                data.liked
                            )
                        );


                    }

                    catch (error) {

                        console.error(
                            "Blog Like Error:",
                            error
                        );

                    }

                    finally {

                        likeRequestRunning =
                            false;

                        likeButton.disabled =
                            false;

                    }

                }
            );

        }


        /* =====================================================
           EDIT MODAL
        ===================================================== */

        const editModal =
            document.querySelector(
                "[data-edit-modal]"
            );


        const openEditButton =
            document.querySelector(
                "[data-open-edit]"
            );


        const closeEditButtons =
            document.querySelectorAll(
                "[data-close-edit]"
            );


        function openEditModal() {

            if (!editModal) {
                return;
            }


            editModal.classList.add(
                "open"
            );


            document.body.style.overflow =
                "hidden";


            const titleInput =
                editModal.querySelector(
                    'input[name="title"]'
                );


            if (titleInput) {

                setTimeout(
                    function () {

                        titleInput.focus();

                    },
                    100
                );

            }

        }


        function closeEditModal() {

            if (!editModal) {
                return;
            }


            editModal.classList.remove(
                "open"
            );


            document.body.style.overflow =
                "";

        }


        if (openEditButton) {

            openEditButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    openEditModal();

                }
            );

        }


        closeEditButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        closeEditModal();

                    }
                );

            }
        );


        if (editModal) {

            editModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target.classList.contains(
                            "community-modal-backdrop"
                        )
                    ) {

                        closeEditModal();

                    }

                }
            );

        }


        /* =====================================================
           EDIT FORM
        ===================================================== */

        const editForm =
            document.querySelector(
                "[data-edit-form]"
            );


        if (editForm) {

            editForm.addEventListener(
                "submit",
                function (event) {

                    const submitButton =
                        editForm.querySelector(
                            'button[type="submit"]'
                        );


                    if (!submitButton) {
                        return;
                    }


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


                    submitButton.textContent =
                        "Saving...";


                    submitButton.style.opacity =
                        "0.7";


                    submitButton.style.cursor =
                        "wait";

                }
            );

        }


        /* =====================================================
           DELETE CONFIRMATION
        ===================================================== */

        const deleteForm =
            document.querySelector(
                "[data-delete-post]"
            );


        if (deleteForm) {

            deleteForm.addEventListener(
                "submit",
                function (event) {

                    const confirmed =
                        window.confirm(
                            "Are you sure you want to delete this post? This action cannot be undone."
                        );


                    if (!confirmed) {

                        event.preventDefault();

                        return;

                    }


                    const deleteButton =
                        deleteForm.querySelector(
                            'button[type="submit"]'
                        );


                    if (deleteButton) {

                        deleteButton.disabled =
                            true;

                        deleteButton.textContent =
                            "Deleting...";

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

                    closeEditModal();

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