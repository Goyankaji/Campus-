/* =========================================================
   CAMPUS — STUDENT QUESTION DISCUSSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(
        ".student-discussion-tab"
    );

    const searchInput = document.querySelector(
        ".student-discussion-search"
    );

    const cards = Array.from(
        document.querySelectorAll(
            ".student-discussion-card"
        )
    );

    const emptyState = document.querySelector(
        ".student-discussion-empty"
    );


    /* =====================================================
       FILTER DISCUSSIONS
    ===================================================== */

    function filterDiscussions() {

        const activeTab = document.querySelector(
            ".student-discussion-tab.active"
        );

        const filter = activeTab
            ? activeTab.dataset.filter
            : "all";

        const search = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleCount = 0;


        cards.forEach(function (card) {

            const type =
                card.dataset.type || "";

            const searchText =
                (
                    card.dataset.search ||
                    card.textContent
                ).toLowerCase();


            let matchesFilter = false;

            let matchesSearch = false;


            /* FILTER */

            if (filter === "all") {

                matchesFilter = true;

            } else {

                matchesFilter =
                    type === filter;

            }


            /* SEARCH */

            matchesSearch =
                search === "" ||
                searchText.includes(search);


            /* DISPLAY */

            if (
                matchesFilter &&
                matchesSearch
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        /* EMPTY STATE */

        if (emptyState) {

            emptyState.hidden =
                visibleCount !== 0;

        }

    }


    /* =====================================================
       TAB CLICK
    ===================================================== */

    tabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                tabs.forEach(function (item) {

                    item.classList.remove(
                        "active"
                    );

                });


                tab.classList.add("active");


                filterDiscussions();

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

                filterDiscussions();

            }
        );

    }


    /* =====================================================
       POST COMMENT
    ===================================================== */

    const postButtons =
        document.querySelectorAll(
            "[data-post]"
        );


    postButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".student-discussion-card"
                    );


                if (!card) {
                    return;
                }


                const input =
                    card.querySelector(
                        ".student-discussion-write input"
                    );


                if (!input) {
                    return;
                }


                const text =
                    input.value.trim();


                if (!text) {

                    input.focus();

                    return;

                }


                /*
                 * Temporary UI behaviour.
                 * Database integration will be added later.
                 */

                input.value = "";

                button.textContent = "Posted";


                setTimeout(function () {

                    button.textContent = "Post";

                }, 1200);

            }
        );

    });


    /* =====================================================
       REPLY BUTTON
    ===================================================== */

    const replyButtons =
        document.querySelectorAll(
            "[data-reply]"
        );


    replyButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".student-discussion-card"
                    );


                if (!card) {
                    return;
                }


                const input =
                    card.querySelector(
                        ".student-discussion-write input"
                    );


                if (!input) {
                    return;
                }


                input.placeholder =
                    "Write your reply...";


                input.focus();

            }
        );

    });


    /* =====================================================
       GIVE HINT
    ===================================================== */

    const hintButtons =
        document.querySelectorAll(
            "[data-hint]"
        );


    hintButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".student-discussion-card"
                    );


                if (!card) {
                    return;
                }


                const input =
                    card.querySelector(
                        ".student-discussion-write input"
                    );


                if (!input) {
                    return;
                }


                input.placeholder =
                    "Write your hint...";


                input.focus();

            }
        );

    });


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterDiscussions();

});