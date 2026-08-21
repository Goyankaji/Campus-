/* =========================================================
   CAMPUS — STUDENT PLACEMENT DRIVES JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(
        ".student-drives-tab"
    );

    const cards = document.querySelectorAll(
        ".student-drive-card"
    );

    const searchInput = document.querySelector(
        ".student-drives-search"
    );

    let activeFilter = "all";


    /* =====================================================
       GET APPLICATION STATUS
    ===================================================== */

    function getStatus(card) {

        return (
            card.dataset.status || "not-applied"
        ).toLowerCase();

    }


    /* =====================================================
       FILTER CARDS
    ===================================================== */

    function filterCards() {

        const searchValue = searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

        cards.forEach(function (card) {

            const status = getStatus(card);

            const text =
                card.textContent.toLowerCase();

            const matchesSearch =
                !searchValue ||
                text.includes(searchValue);

            let matchesFilter = true;


            if (activeFilter === "applied") {

                matchesFilter =
                    status === "applied";

            }


            if (activeFilter === "not-applied") {

                matchesFilter =
                    status === "not-applied";

            }


            card.style.display =
                matchesSearch && matchesFilter
                    ? ""
                    : "none";

        });

    }


    /* =====================================================
       TAB CLICK
    ===================================================== */

    tabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                tabs.forEach(function (item) {

                    item.classList.remove("active");

                });

                tab.classList.add("active");


                const filter =
                    tab.dataset.filter;


                if (filter) {

                    activeFilter = filter;

                } else {

                    const label =
                        tab.textContent
                            .trim()
                            .toLowerCase();


                    if (label === "all") {

                        activeFilter = "all";

                    } else if (
                        label === "applied"
                    ) {

                        activeFilter = "applied";

                    } else {

                        activeFilter = "not-applied";

                    }

                }


                filterCards();

            }
        );

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCards
        );

    }


    /* =====================================================
       APPLY BUTTON
    ===================================================== */

    const applyButtons =
        document.querySelectorAll(
            ".student-drive-apply-btn"
        );


    applyButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".student-drive-card"
                    );


                if (!card) {
                    return;
                }


                const currentStatus =
                    getStatus(card);


                if (
                    currentStatus === "applied"
                ) {

                    return;

                }


                const confirmed = confirm(
                    "Are you sure you want to apply for this placement drive?"
                );


                if (!confirmed) {
                    return;
                }


                /* -----------------------------------------
                   UPDATE CARD UI
                ----------------------------------------- */

                card.dataset.status =
                    "applied";


                button.textContent =
                    "Applied";


                button.disabled = true;


                button.style.opacity =
                    "0.65";


                button.style.cursor =
                    "default";


                /* -----------------------------------------
                   ADD APPLIED BADGE
                ----------------------------------------- */

                let badge =
                    card.querySelector(
                        ".student-drive-applied-badge"
                    );


                if (!badge) {

                    badge =
                        document.createElement(
                            "span"
                        );

                    badge.className =
                        "student-drive-applied-badge";

                    badge.textContent =
                        "Applied";

                    const company =
                        card.querySelector(
                            ".student-drive-company"
                        );

                    if (company) {

                        company.appendChild(
                            badge
                        );

                    }

                }


                /* -----------------------------------------
                   REFRESH FILTER
                ----------------------------------------- */

                filterCards();

            }
        );

    });


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterCards();

});