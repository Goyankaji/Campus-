/* =========================================================
   CAMPUS HOD PORTAL
   SHORTLISTED STUDENTS
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const searchInput =
            document.getElementById(
                "shortlistedSearch"
            );

        const companyFilter =
            document.getElementById(
                "companyFilter"
            );

        const stageFilter =
            document.getElementById(
                "stageFilter"
            );

        const clearButton =
            document.getElementById(
                "clearShortlistedFilters"
            );

        const emptyClearButton =
            document.getElementById(
                "emptyClearButton"
            );

        const emptyState =
            document.getElementById(
                "shortlistedEmpty"
            );

        const visibleCount =
            document.getElementById(
                "visibleShortlistedCount"
            );

        const rows =
            Array.from(
                document.querySelectorAll(
                    ".shortlisted-row"
                )
            );


        if (!rows.length) {
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
           FILTER
        ================================================= */

        function filterStudents() {


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


            const stage =
                normalize(
                    stageFilter
                        ? stageFilter.value
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


                    const rowStage =
                        normalize(
                            row.dataset.stage
                        );


                    const searchMatch =
                        !search ||
                        rowSearch.includes(
                            search
                        );


                    const companyMatch =
                        !company ||
                        rowCompany === company;


                    const stageMatch =
                        !stage ||
                        rowStage === stage;


                    const show =
                        searchMatch &&
                        companyMatch &&
                        stageMatch;


                    row.hidden =
                        !show;


                    if (show) {
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
           EMPTY
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
                    stageFilter &&
                    stageFilter.value
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


            if (stageFilter) {
                stageFilter.value = "";
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
                filterStudents
            );

        }


        /* =================================================
           COMPANY
        ================================================= */

        if (companyFilter) {

            companyFilter.addEventListener(
                "change",
                filterStudents
            );

        }


        /* =================================================
           STAGE
        ================================================= */

        if (stageFilter) {

            stageFilter.addEventListener(
                "change",
                filterStudents
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
           VIEW STUDENT
        ================================================= */

        document
            .querySelectorAll(
                ".view-student-btn"
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
                             * Student detail route
                             * will be connected later.
                             */

                            console.log(
                                "HOD shortlisted student:",
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