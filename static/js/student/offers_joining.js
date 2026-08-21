document.addEventListener("DOMContentLoaded", function () {

    console.log("Offers & Joining JS loaded");


    const tabs = document.querySelectorAll(
        ".student-offer-tab"
    );

    const cards = document.querySelectorAll(
        ".student-offer-card"
    );

    const searchInput = document.querySelector(
        ".student-offers-search"
    );


    console.log("Tabs:", tabs.length);
    console.log("Cards:", cards.length);


    function filterOffers(filter) {

        const search =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";


        cards.forEach(function (card) {

            const categories =
                (
                    card.dataset.category || ""
                )
                .toLowerCase()
                .split(/\s+/);


            const text =
                card.textContent.toLowerCase();


            const categoryMatch =
                filter === "all" ||
                categories.includes(filter);


            const searchMatch =
                search === "" ||
                text.includes(search);


            if (
                categoryMatch &&
                searchMatch
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }


    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            console.log(
                "Clicked:",
                tab.dataset.filter
            );


            tabs.forEach(function (item) {

                item.classList.remove("active");

            });


            tab.classList.add("active");


            const filter =
                tab.dataset.filter || "all";


            filterOffers(filter);

        });

    });


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const activeTab =
                    document.querySelector(
                        ".student-offer-tab.active"
                    );


                const filter =
                    activeTab
                        ? activeTab.dataset.filter
                        : "all";


                filterOffers(filter);

            }
        );

    }


    filterOffers("all");

});