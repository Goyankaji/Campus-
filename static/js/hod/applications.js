/* =========================================================
   CAMPUS HOD PORTAL
   APPLICATIONS
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const searchInput =
            document.getElementById(
                "applicationSearch"
            );

        const statusFilter =
            document.getElementById(
                "applicationStatusFilter"
            );

        const stageFilter =
            document.getElementById(
                "applicationStageFilter"
            );

        const clearButton =
            document.getElementById(
                "clearApplicationFilters"
            );

        const emptyClearButton =
            document.getElementById(
                "emptyClearFilters"
            );

        const tableBody =
            document.getElementById(
                "applicationsTableBody"
            );

        const filteredEmpty =
            document.getElementById(
                "filteredEmpty"
            );

        const visibleCount =
            document.getElementById(
                "visibleApplicationCount"
            );


        if (!tableBody) {
            return;
        }


        /* =================================================
           ROWS
        ================================================= */

        const applicationRows =
            Array.from(
                tableBody.querySelectorAll(
                    ".application-row"
                )
            );


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
           FILTER
        ================================================= */

        function filterApplications() {

            const searchValue =
                normalize(
                    searchInput
                        ? searchInput.value
                        : ""
                );


            const selectedStatus =
                statusFilter
                    ? String(
                        statusFilter.value
                    )
                        .trim()
                        .toUpperCase()
                    : "";


            const selectedStage =
                stageFilter
                    ? String(
                        stageFilter.value
                    )
                        .trim()
                        .toUpperCase()
                    : "";


            let matchedRows = 0;


            applicationRows.forEach(
                function (row) {


                    const rowSearch =
                        normalize(
                            row.dataset.search
                        );


                    const rowStatus =
                        String(
                            row.dataset.status ||
                            ""
                        )
                            .trim()
                            .toUpperCase();


                    const rowStage =
                        String(
                            row.dataset.stage ||
                            ""
                        )
                            .trim()
                            .toUpperCase();


                    const searchMatch =
                        !searchValue ||
                        rowSearch.includes(
                            searchValue
                        );


                    const statusMatch =
                        !selectedStatus ||
                        rowStatus ===
                            selectedStatus;


                    const stageMatch =
                        !selectedStage ||
                        rowStage ===
                            selectedStage;


                    const shouldShow =
                        searchMatch &&
                        statusMatch &&
                        stageMatch;


                    row.hidden =
                        !shouldShow;


                    if (shouldShow) {
                        matchedRows++;
                    }

                }
            );


            updateCount(
                matchedRows
            );


            updateEmptyState(
                matchedRows
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
            matchedRows
        ) {

            if (!filteredEmpty) {
                return;
            }


            const hasFilters =
                Boolean(
                    searchInput &&
                    searchInput.value.trim()
                ) ||
                Boolean(
                    statusFilter &&
                    statusFilter.value
                ) ||
                Boolean(
                    stageFilter &&
                    stageFilter.value
                );


            if (
                hasFilters &&
                matchedRows === 0
            ) {

                filteredEmpty.hidden =
                    false;

            } else {

                filteredEmpty.hidden =
                    true;

            }

        }


        /* =================================================
           CLEAR
        ================================================= */

        function clearFilters() {

            if (searchInput) {
                searchInput.value = "";
            }


            if (statusFilter) {
                statusFilter.value = "";
            }


            if (stageFilter) {
                stageFilter.value = "";
            }


            applicationRows.forEach(
                function (row) {

                    row.hidden = false;

                }
            );


            updateCount(
                applicationRows.length
            );


            if (filteredEmpty) {

                filteredEmpty.hidden =
                    true;

            }

        }


        /* =================================================
           SEARCH
        ================================================= */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                filterApplications
            );

        }


        /* =================================================
           STATUS FILTER
        ================================================= */

        if (statusFilter) {

            statusFilter.addEventListener(
                "change",
                filterApplications
            );

        }


        /* =================================================
           STAGE FILTER
        ================================================= */

        if (stageFilter) {

            stageFilter.addEventListener(
                "change",
                filterApplications
            );

        }


        /* =================================================
           CLEAR BUTTON
        ================================================= */

        if (clearButton) {

            clearButton.addEventListener(
                "click",
                clearFilters
            );

        }


        /* =================================================
           EMPTY CLEAR BUTTON
        ================================================= */

        if (emptyClearButton) {

            emptyClearButton.addEventListener(
                "click",
                clearFilters
            );

        }


        /* =================================================
           VIEW APPLICATION
        ================================================= */

        document
            .querySelectorAll(
                ".application-view-btn"
            )
            .forEach(
                function (button) {


                    button.addEventListener(
                        "click",
                        function () {


                            const applicationId =
                                this.dataset
                                    .applicationId;


                            if (!applicationId) {
                                return;
                            }


                            /*
                             * Detail page will be
                             * connected when the
                             * application detail
                             * module is created.
                             */

                            console.log(
                                "HOD Application:",
                                applicationId
                            );

                        }
                    );

                }
            );


        /* =================================================
           INITIALIZE
        ================================================= */

        updateCount(
            applicationRows.length
        );


    }
);