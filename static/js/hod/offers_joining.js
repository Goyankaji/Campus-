/* =========================================================
   CAMPUS HOD PORTAL
   OFFERS & JOINING
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const searchInput =
            document.getElementById(
                "offerSearch"
            );

        const companyFilter =
            document.getElementById(
                "offerCompanyFilter"
            );

        const joiningFilter =
            document.getElementById(
                "joiningStatusFilter"
            );

        const clearButton =
            document.getElementById(
                "clearOfferFilters"
            );

        const emptyClearButton =
            document.getElementById(
                "emptyClearOfferFilters"
            );

        const emptyState =
            document.getElementById(
                "offersEmpty"
            );

        const visibleCount =
            document.getElementById(
                "visibleOfferCount"
            );

        const rows =
            Array.from(
                document.querySelectorAll(
                    ".offer-row"
                )
            );


        /* =================================================
           NO DATA
        ================================================= */

        if (!rows.length) {

            if (visibleCount) {
                visibleCount.textContent = "0";
            }

            return;

        }


        /* =================================================
           NORMALIZE
        ================================================= */

        function normalize(value) {

            return String(
                value || ""
            )
                .trim()
                .toLowerCase()
                .replace(
                    /\s+/g,
                    " "
                );

        }


        /* =================================================
           FILTER RECORDS
        ================================================= */

        function filterOffers() {


            const search =
                normalize(
                    searchInput
                        ? searchInput.value
                        : ""
                );


            const company =
                normalize(
                    companyFilter
                        ? companyFilter.value
                        : ""
                );


            const joining =
                normalize(
                    joiningFilter
                        ? joiningFilter.value
                        : ""
                );


            let matched = 0;


            rows.forEach(
                function (row) {


                    const rowSearch =
                        normalize(
                            row.dataset.search
                        );


                    const rowCompany =
                        normalize(
                            row.dataset.company
                        );


                    const rowStatus =
                        normalize(
                            row.dataset.status
                        );


                    const searchMatch =
                        !search ||
                        rowSearch.includes(
                            search
                        );


                    const companyMatch =
                        !company ||
                        rowCompany === company;


                    const statusMatch =
                        !joining ||
                        rowStatus === joining;


                    const shouldShow =
                        searchMatch &&
                        companyMatch &&
                        statusMatch;


                    row.hidden =
                        !shouldShow;


                    if (shouldShow) {
                        matched++;
                    }

                }
            );


            updateCount(
                matched
            );


            updateEmptyState(
                matched
            );

        }


        /* =================================================
           COUNT
        ================================================= */

        function updateCount(
            count
        ) {

            if (!visibleCount) {
                return;
            }

            visibleCount.textContent =
                count;

        }


        /* =================================================
           EMPTY STATE
        ================================================= */

        function updateEmptyState(
            count
        ) {


            if (!emptyState) {
                return;
            }


            const hasFilter =
                Boolean(
                    searchInput &&
                    searchInput.value.trim()
                ) ||
                Boolean(
                    companyFilter &&
                    companyFilter.value
                ) ||
                Boolean(
                    joiningFilter &&
                    joiningFilter.value
                );


            if (
                hasFilter &&
                count === 0
            ) {

                emptyState.hidden =
                    false;

            } else {

                emptyState.hidden =
                    true;

            }

        }


        /* =================================================
           CLEAR FILTERS
        ================================================= */

        function clearFilters() {


            if (searchInput) {
                searchInput.value = "";
            }


            if (companyFilter) {
                companyFilter.value = "";
            }


            if (joiningFilter) {
                joiningFilter.value = "";
            }


            rows.forEach(
                function (row) {

                    row.hidden = false;

                }
            );


            updateCount(
                rows.length
            );


            if (emptyState) {

                emptyState.hidden =
                    true;

            }

        }


        /* =================================================
           SEARCH
        ================================================= */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                filterOffers
            );

        }


        /* =================================================
           COMPANY
        ================================================= */

        if (companyFilter) {

            companyFilter.addEventListener(
                "change",
                filterOffers
            );

        }


        /* =================================================
           JOINING
        ================================================= */

        if (joiningFilter) {

            joiningFilter.addEventListener(
                "change",
                filterOffers
            );

        }


        /* =================================================
           CLEAR
        ================================================= */

        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearFilters
            );

        }


        if (emptyClearButton) {

            emptyClearButton.addEventListener(
                "click",
                clearFilters
            );

        }


        /* =================================================
           VIEW OFFER
        ================================================= */

        document
            .querySelectorAll(
                ".view-offer-btn"
            )
            .forEach(
                function (button) {


                    button.addEventListener(
                        "click",
                        function () {


                            const studentId =
                                this.dataset.student;


                            if (!studentId) {
                                return;
                            }


                            /*
                             * Offer detail route
                             * will be connected later.
                             */

                            console.log(
                                "HOD offer record:",
                                studentId
                            );

                        }
                    );

                }
            );


        /* =================================================
           INITIAL COUNT
        ================================================= */

        updateCount(
            rows.length
        );

    }
);