/* =========================================================
   CAMPUS — STUDENT PREPARATION JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           PREPARATION TABS
        ===================================================== */

        const tabs =
            document.querySelectorAll(
                ".student-preparation-tab"
            );


        const sections =
            document.querySelectorAll(
                ".student-preparation-section"
            );


        function activatePreparationTab(
            selectedTab
        ) {

            if (!selectedTab) {
                return;
            }


            const target =
                (
                    selectedTab.getAttribute(
                        "data-preparation-tab"
                    ) || "core"
                )
                .trim()
                .toLowerCase();


            /* ---------------------------------------------
               UPDATE TABS
            --------------------------------------------- */

            tabs.forEach(
                function (tab) {

                    const tabTarget =
                        (
                            tab.getAttribute(
                                "data-preparation-tab"
                            ) || ""
                        )
                        .trim()
                        .toLowerCase();


                    tab.classList.toggle(
                        "active",
                        tabTarget === target
                    );

                }
            );


            /* ---------------------------------------------
               UPDATE SECTIONS
            --------------------------------------------- */

            sections.forEach(
                function (section) {

                    const sectionTarget =
                        (
                            section.getAttribute(
                                "data-preparation-section"
                            ) || ""
                        )
                        .trim()
                        .toLowerCase();


                    section.classList.toggle(
                        "active",
                        sectionTarget === target
                    );

                }
            );


            /* ---------------------------------------------
               REMEMBER ACTIVE TAB
            --------------------------------------------- */

            try {

                localStorage.setItem(
                    "campus-preparation-tab",
                    target
                );

            } catch (error) {

                console.warn(
                    "Unable to save preparation tab:",
                    error
                );

            }

        }


        /* =====================================================
           TAB CLICK
        ===================================================== */

        tabs.forEach(
            function (tab) {

                tab.addEventListener(
                    "click",
                    function () {

                        activatePreparationTab(
                            tab
                        );

                    }
                );

            }
        );


        /* =====================================================
           RESTORE LAST TAB
        ===================================================== */

        let savedTab = "core";


        try {

            const storedTab =
                localStorage.getItem(
                    "campus-preparation-tab"
                );


            if (
                storedTab === "core" ||
                storedTab === "practice"
            ) {

                savedTab =
                    storedTab;

            }

        } catch (error) {

            console.warn(
                "Unable to read preparation tab:",
                error
            );

        }


        const savedTabElement =
            document.querySelector(
                '.student-preparation-tab[data-preparation-tab="' +
                savedTab +
                '"]'
            );


        if (savedTabElement) {

            activatePreparationTab(
                savedTabElement
            );

        }


        /* =====================================================
           CORE SUBJECT BUTTONS
        ===================================================== */

        const subjectButtons =
            document.querySelectorAll(
                "[data-subject]"
            );


        subjectButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const subject =
                            button.getAttribute(
                                "data-subject"
                            );


                        if (!subject) {
                            return;
                        }


                        /*
                         * Core subject route will be connected
                         * when subject-wise academic content
                         * is added to the backend.
                         */

                        console.log(
                            "Opening core subject:",
                            subject
                        );

                    }
                );

            }
        );


        /* =====================================================
           MOODLE BUTTON
        ===================================================== */

        const moodleButton =
            document.querySelector(
                "[data-moodle-open]"
            );


        if (moodleButton) {

            moodleButton.addEventListener(
                "click",
                function () {

                    /*
                     * IMPORTANT:
                     *
                     * Do not put a fake Moodle URL here.
                     * Actual Moodle URL/API configuration
                     * will be connected after the Moodle
                     * server details are available.
                     */


                    const moodleUrl =
                        moodleButton.getAttribute(
                            "data-moodle-url"
                        );


                    if (
                        moodleUrl &&
                        moodleUrl.trim() !== ""
                    ) {

                        window.open(
                            moodleUrl,
                            "_blank",
                            "noopener,noreferrer"
                        );

                        return;

                    }


                    /*
                     * Moodle is not configured yet.
                     */

                    alert(
                        "Moodle practice is not configured yet. It will be connected here once the Moodle server is configured."
                    );

                }
            );

        }


        /* =====================================================
           PREVENT DOUBLE CLICK
        ===================================================== */

        subjectButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        if (
                            button.dataset.processing ===
                            "true"
                        ) {

                            return;

                        }


                        button.dataset.processing =
                            "true";


                        setTimeout(
                            function () {

                                button.dataset.processing =
                                    "false";

                            },
                            500
                        );

                    }
                );

            }
        );


        /* =====================================================
           KEYBOARD ACCESS
        ===================================================== */

        tabs.forEach(
            function (tab) {

                tab.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            activatePreparationTab(
                                tab
                            );

                        }

                    }
                );

            }
        );


    }
);