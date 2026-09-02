/* =========================================================
   CAMPUS — STUDENT STARTUP JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================================
           ELEMENTS
        ===================================================== */

        const modal =
            document.querySelector(
                "[data-startup-modal]"
            );

        const startupForm =
            document.querySelector(
                "[data-startup-form]"
            );

        const modalTitle =
            document.querySelector(
                "[data-startup-modal-title]"
            );

        const startupIdInput =
            document.querySelector(
                "[data-startup-id-input]"
            );

        const submitButton =
            document.querySelector(
                "[data-startup-submit]"
            );

        const withdrawForm =
            document.querySelector(
                "[data-withdraw-form]"
            );


        /* =====================================================
           FORM FIELDS
        ===================================================== */

        const fields = {

            startup_name:
                document.querySelector(
                    '[data-startup-field="startup_name"]'
                ),

            founder_name:
                document.querySelector(
                    '[data-startup-field="founder_name"]'
                ),

            team_members:
                document.querySelector(
                    '[data-startup-field="team_members"]'
                ),

            startup_category:
                document.querySelector(
                    '[data-startup-field="startup_category"]'
                ),

            startup_stage:
                document.querySelector(
                    '[data-startup-field="startup_stage"]'
                ),

            website_url:
                document.querySelector(
                    '[data-startup-field="website_url"]'
                ),

            problem_statement:
                document.querySelector(
                    '[data-startup-field="problem_statement"]'
                ),

            proposed_solution:
                document.querySelector(
                    '[data-startup-field="proposed_solution"]'
                ),

            description:
                document.querySelector(
                    '[data-startup-field="description"]'
                )

        };


        /* =====================================================
           OPEN / CLOSE MODAL
        ===================================================== */

        function openModal() {

            if (!modal) {
                return;
            }

            modal.classList.add("open");

            document.body.style.overflow = "hidden";

        }


        function closeModal() {

            if (!modal) {
                return;
            }

            modal.classList.remove("open");

            document.body.style.overflow = "";

            resetCreateForm();

        }


        /* =====================================================
           RESET CREATE FORM
        ===================================================== */

        function resetCreateForm() {

            if (!startupForm) {
                return;
            }

            startupForm.reset();

            startupForm.action =
                startupForm.dataset.createAction ||
                "/student/startup";


            if (startupIdInput) {

                startupIdInput.value = "";

            }


            if (modalTitle) {

                modalTitle.textContent =
                    "Submit Your Startup";

            }


            if (submitButton) {

                submitButton.disabled = false;

                submitButton.dataset.submitting =
                    "false";

                submitButton.innerHTML =
                    `
                        Submit Application
                        <i class="fa-solid fa-arrow-right"></i>
                    `;

            }

        }


        /* =====================================================
           NEW APPLICATION BUTTON
        ===================================================== */

        document
            .querySelectorAll(
                "[data-open-startup-form]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            resetCreateForm();

                            openModal();

                        }
                    );

                }
            );


        /* =====================================================
           CLOSE BUTTONS
        ===================================================== */

        document
            .querySelectorAll(
                "[data-close-startup-form]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            closeModal();

                        }
                    );

                }
            );


        /* =====================================================
           EDIT APPLICATION
        ===================================================== */

        document
            .querySelectorAll(
                "[data-edit-startup]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            if (!startupForm) {
                                return;
                            }


                            const startupId =
                                button.dataset.startupId;


                            if (!startupId) {
                                return;
                            }


                            /* ---------------------------------
                               SET EDIT ACTION
                            --------------------------------- */

                            startupForm.action =
                                "/student/startup/" +
                                encodeURIComponent(
                                    startupId
                                ) +
                                "/edit";


                            /* ---------------------------------
                               APPLICATION ID
                            --------------------------------- */

                            if (startupIdInput) {

                                startupIdInput.value =
                                    startupId;

                            }


                            /* ---------------------------------
                               FILL FIELDS
                            --------------------------------- */

                            setField(
                                fields.startup_name,
                                button.dataset.startupName
                            );


                            setField(
                                fields.founder_name,
                                button.dataset.founderName
                            );


                            setField(
                                fields.team_members,
                                button.dataset.teamMembers
                            );


                            setField(
                                fields.startup_category,
                                button.dataset.category
                            );


                            setField(
                                fields.startup_stage,
                                button.dataset.stage
                            );


                            setField(
                                fields.website_url,
                                button.dataset.website
                            );


                            setField(
                                fields.problem_statement,
                                button.dataset.problem
                            );


                            setField(
                                fields.proposed_solution,
                                button.dataset.solution
                            );


                            setField(
                                fields.description,
                                button.dataset.description
                            );


                            /* ---------------------------------
                               CHANGE MODAL TITLE
                            --------------------------------- */

                            if (modalTitle) {

                                modalTitle.textContent =
                                    "Edit Startup Application";

                            }


                            /* ---------------------------------
                               CHANGE SUBMIT BUTTON
                            --------------------------------- */

                            if (submitButton) {

                                submitButton.disabled = false;

                                submitButton.dataset.submitting =
                                    "false";

                                submitButton.innerHTML =
                                    `
                                        Save Changes
                                        <i class="fa-solid fa-check"></i>
                                    `;

                            }


                            openModal();

                        }
                    );

                }
            );


        /* =====================================================
           SET FIELD VALUE
        ===================================================== */

        function setField(
            field,
            value
        ) {

            if (!field) {
                return;
            }

            field.value =
                value || "";

        }


        /* =====================================================
           WITHDRAW APPLICATION
        ===================================================== */

        document
            .querySelectorAll(
                "[data-withdraw-startup]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const startupId =
                                button.dataset.startupId;


                            if (!startupId) {
                                return;
                            }


                            const confirmed =
                                window.confirm(
                                    "Are you sure you want to withdraw this startup application? This action cannot be undone."
                                );


                            if (!confirmed) {
                                return;
                            }


                            if (!withdrawForm) {

                                console.error(
                                    "Withdraw form not found."
                                );

                                return;

                            }


                            /* ---------------------------------
                               SET ACTION
                            --------------------------------- */

                            withdrawForm.action =
                                "/student/startup/" +
                                encodeURIComponent(
                                    startupId
                                ) +
                                "/withdraw";


                            /* ---------------------------------
                               SUBMIT
                            --------------------------------- */

                            button.disabled = true;

                            button.innerHTML =
                                `
                                    <i class="fa-solid fa-spinner fa-spin"></i>
                                    Withdrawing...
                                `;


                            withdrawForm.submit();

                        }
                    );

                }
            );


        /* =====================================================
           FORM SUBMIT
        ===================================================== */

        if (startupForm) {

            startupForm.addEventListener(
                "submit",
                function (event) {

                    const startupName =
                        fields.startup_name;


                    const description =
                        fields.description;


                    /* ---------------------------------
                       REQUIRED VALIDATION
                    --------------------------------- */

                    if (
                        startupName &&
                        !startupName.value.trim()
                    ) {

                        event.preventDefault();

                        startupName.focus();

                        return;

                    }


                    if (
                        description &&
                        !description.value.trim()
                    ) {

                        event.preventDefault();

                        description.focus();

                        return;

                    }


                    /* ---------------------------------
                       PREVENT DOUBLE SUBMIT
                    --------------------------------- */

                    if (
                        submitButton &&
                        submitButton.dataset.submitting ===
                        "true"
                    ) {

                        event.preventDefault();

                        return;

                    }


                    if (submitButton) {

                        submitButton.dataset.submitting =
                            "true";

                        submitButton.disabled =
                            true;


                        const isEdit =
                            startupIdInput &&
                            startupIdInput.value;


                        submitButton.innerHTML =
                            isEdit
                                ?
                                `
                                    <i class="fa-solid fa-spinner fa-spin"></i>
                                    Saving...
                                `
                                :
                                `
                                    <i class="fa-solid fa-spinner fa-spin"></i>
                                    Submitting...
                                `;

                    }

                }
            );

        }


        /* =====================================================
           ESCAPE KEY
        ===================================================== */

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
           BACKDROP CLICK
        ===================================================== */

        if (modal) {

            modal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target.classList.contains(
                            "student-startup-modal-backdrop"
                        )
                    ) {

                        closeModal();

                    }

                }
            );

        }


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