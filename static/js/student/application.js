/* =========================================================
   CAMPUS — STUDENT APPLICATIONS JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(
        ".student-applications-tab"
    );

    const cards = document.querySelectorAll(
        ".student-application-card"
    );

    const searchInput = document.querySelector(
        ".student-applications-search"
    );

    let activeFilter = "all";


    /* =====================================================
       GET APPLICATION STATUS
    ===================================================== */

    function getStatus(card) {

        return (
            card.dataset.status || "applied"
        ).toLowerCase();

    }


    /* =====================================================
       FILTER APPLICATIONS
    ===================================================== */

    function filterApplications() {

        const searchValue = searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


        cards.forEach(function (card) {

            const status = getStatus(card);

            const cardText =
                card.textContent.toLowerCase();


            const matchesSearch =
                !searchValue ||
                cardText.includes(searchValue);


            let matchesFilter = true;


            if (activeFilter !== "all") {

                matchesFilter =
                    status === activeFilter;

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

                    item.classList.remove(
                        "active"
                    );

                });


                tab.classList.add("active");


                activeFilter =
                    tab.dataset.filter ||
                    "all";


                filterApplications();

            }
        );

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterApplications
        );

    }


    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterApplications();

});