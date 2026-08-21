/* =========================================================
   CAMPUS — STUDENT INTERVIEWS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // IMPORTANT:
    // HTML class = student-interview-tab
    const tabs = document.querySelectorAll(
        ".student-interview-tab"
    );

    const cards = document.querySelectorAll(
        ".student-interview-card"
    );

    const searchInput = document.querySelector(
        ".student-interviews-search"
    );

    let activeFilter = "all";


    /* =====================================================
       FILTER INTERVIEWS
    ===================================================== */

    function filterInterviews() {

        const searchValue = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


        cards.forEach(function (card) {

            const category = (
                card.dataset.category || ""
            ).toLowerCase();


            const cardText =
                card.textContent.toLowerCase();


            /* SEARCH MATCH */

            const matchesSearch =
                searchValue === "" ||
                cardText.includes(searchValue);


            /* FILTER MATCH */

            let matchesFilter = true;


            if (activeFilter !== "all") {

                matchesFilter =
                    category === activeFilter;

            }


            /* SHOW / HIDE */

            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }


    /* =====================================================
       TAB CLICK
    ===================================================== */

    tabs.forEach(function (tab) {

        tab.addEventListener(
            "click",
            function () {

                /* Remove active from all */

                tabs.forEach(function (item) {

                    item.classList.remove(
                        "active"
                    );

                });


                /* Add active to clicked tab */

                tab.classList.add("active");


                /* Get selected filter */

                activeFilter =
                    tab.dataset.filter || "all";


                /* Apply filter */

                filterInterviews();

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

                filterInterviews();

            }
        );

    }


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    filterInterviews();

});