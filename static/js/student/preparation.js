/* =========================================================
   CAMPUS — STUDENT PREPARATION JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(
        ".student-preparation-tab"
    );

    const cards = document.querySelectorAll(
        ".student-preparation-card"
    );

    const searchInput = document.querySelector(
        ".student-preparation-search"
    );

    const pyqSection = document.querySelector(
        ".student-pyq-section"
    );

    const pyqItems = document.querySelectorAll(
        ".student-pyq-item"
    );


    let activeFilter = "all";


    /* =====================================================
       FILTER MATERIAL + PYQ SECTION
    ===================================================== */

    function filterPreparation() {

        const searchValue = searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


        /* =================================================
           MATERIAL CARDS
        ================================================= */

        cards.forEach(function (card) {

            const categories = (
                card.dataset.category || ""
            )
            .toLowerCase()
            .split(/\s+/);


            const cardText =
                card.textContent.toLowerCase();


            const matchesSearch =
                searchValue === "" ||
                cardText.includes(searchValue);


            const matchesFilter =
                activeFilter === "all" ||
                categories.includes(activeFilter);


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });


        /* =================================================
           PYQ SECTION
        ================================================= */

        if (pyqSection) {

            /*
             * PYQ section is visible on:
             *
             * All
             * PYQs
             */

            if (
                activeFilter === "all" ||
                activeFilter === "pyq"
            ) {

                pyqSection.style.display = "";

            } else {

                pyqSection.style.display = "none";

            }

        }


        /* =================================================
           PYQ SEARCH
        ================================================= */

        if (pyqSection) {

            pyqItems.forEach(function (item) {

                const itemText =
                    item.textContent.toLowerCase();


                const matchesSearch =
                    searchValue === "" ||
                    itemText.includes(searchValue);


                if (matchesSearch) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        }

    }


    /* =====================================================
       TAB CLICK
    ===================================================== */

    tabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /* Remove active */

                tabs.forEach(function (item) {

                    item.classList.remove(
                        "active"
                    );

                });


                /* Add active */

                tab.classList.add("active");


                /* Get selected filter */

                activeFilter = (
                    tab.dataset.filter ||
                    "all"
                )
                .trim()
                .toLowerCase();


                /* Apply */

                filterPreparation();

            }
        );

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterPreparation();

            }
        );

    }


    /* =====================================================
       MATERIAL BUTTONS
    ===================================================== */

    const materialButtons =
        document.querySelectorAll(
            ".student-preparation-btn"
        );


    materialButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".student-preparation-card"
                    );


                if (!card) {
                    return;
                }


                const titleElement =
                    card.querySelector("h3");


                const title =
                    titleElement
                        ? titleElement.textContent.trim()
                        : "Preparation Material";


                /*
                 * Temporary action.
                 *
                 * Actual material routes can be
                 * connected later.
                 */

                console.log(
                    "Opening preparation material:",
                    title
                );

            }
        );

    });


    /* =====================================================
       PYQ OPEN BUTTONS
    ===================================================== */

    const pyqButtons =
        document.querySelectorAll(
            ".student-pyq-open"
        );


    pyqButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const item =
                    button.closest(
                        ".student-pyq-item"
                    );


                if (!item) {
                    return;
                }


                const titleElement =
                    item.querySelector(
                        ".student-pyq-info strong"
                    );


                const title =
                    titleElement
                        ? titleElement.textContent.trim()
                        : "PYQ";


                console.log(
                    "Opening PYQ:",
                    title
                );

            }
        );

    });


    /* =====================================================
       VIEW ALL PYQ
    ===================================================== */

    const viewAllPYQ =
        document.querySelector(
            ".student-pyq-view-all"
        );


    if (viewAllPYQ) {

        viewAllPYQ.addEventListener(
            "click",
            function () {

                /*
                 * Activate PYQ tab
                 */

                const pyqTab =
                    document.querySelector(
                        '.student-preparation-tab[data-filter="pyq"]'
                    );


                if (pyqTab) {

                    pyqTab.click();

                }

            }
        );

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    filterPreparation();

});