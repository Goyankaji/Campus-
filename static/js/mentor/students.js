/* =========================================================
   CAMPUS — MENTOR MY STUDENTS JS
   VIEW-ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("studentSearch");

    const courseFilter =
        document.getElementById("courseFilter");

    const sessionFilter =
        document.getElementById("sessionFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const resetButton =
        document.getElementById("resetStudentFilters");

    const tableBody =
        document.getElementById("studentsTableBody");

    const visibleStudentCount =
        document.getElementById("visibleStudentCount");

    const noSearchResults =
        document.getElementById("noSearchResults");


    /* =====================================================
       SAFETY CHECK
    ===================================================== */

    if (!tableBody) {
        return;
    }


    const studentRows =
        Array.from(
            tableBody.querySelectorAll(".student-row")
        );


    /* =====================================================
       NORMALIZE VALUE
    ===================================================== */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       APPLY FILTERS
    ===================================================== */

    function applyStudentFilters() {

        const searchValue =
            normalize(
                searchInput
                    ? searchInput.value
                    : ""
            );


        const selectedCourse =
            normalize(
                courseFilter
                    ? courseFilter.value
                    : "all"
            );


        const selectedSession =
            normalize(
                sessionFilter
                    ? sessionFilter.value
                    : "all"
            );


        const selectedStatus =
            normalize(
                statusFilter
                    ? statusFilter.value
                    : "all"
            );


        let visibleCount = 0;


        studentRows.forEach(function (row) {

            const name =
                normalize(
                    row.dataset.name
                );

            const registration =
                normalize(
                    row.dataset.registration
                );

            const enrollment =
                normalize(
                    row.dataset.enrollment
                );

            const course =
                normalize(
                    row.dataset.course
                );

            const session =
                normalize(
                    row.dataset.session
                );

            const status =
                normalize(
                    row.dataset.status
                );


            /* =============================================
               SEARCH
            ============================================= */

            const matchesSearch =
                !searchValue ||
                name.includes(searchValue) ||
                registration.includes(searchValue) ||
                enrollment.includes(searchValue);


            /* =============================================
               COURSE
            ============================================= */

            const matchesCourse =
                selectedCourse === "all" ||
                course === selectedCourse;


            /* =============================================
               SESSION
            ============================================= */

            const matchesSession =
                selectedSession === "all" ||
                session === selectedSession;


            /* =============================================
               STATUS
            ============================================= */

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;


            const shouldShow =
                matchesSearch &&
                matchesCourse &&
                matchesSession &&
                matchesStatus;


            if (shouldShow) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        updateVisibleCount(
            visibleCount
        );


        updateEmptyState(
            visibleCount
        );

    }


    /* =====================================================
       UPDATE COUNT
    ===================================================== */

    function updateVisibleCount(count) {

        if (!visibleStudentCount) {
            return;
        }

        visibleStudentCount.textContent =
            count;

    }


    /* =====================================================
       EMPTY SEARCH STATE
    ===================================================== */

    function updateEmptyState(count) {

        if (!noSearchResults) {
            return;
        }


        if (studentRows.length === 0) {

            noSearchResults.hidden =
                true;

            return;

        }


        noSearchResults.hidden =
            count !== 0;

    }


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    function resetFilters() {

        if (searchInput) {
            searchInput.value = "";
        }

        if (courseFilter) {
            courseFilter.value = "all";
        }

        if (sessionFilter) {
            sessionFilter.value = "all";
        }

        if (statusFilter) {
            statusFilter.value = "all";
        }


        /*
         * Remove search parameter from URL
         */

        const url =
            new URL(
                window.location.href
            );

        url.searchParams.delete(
            "search"
        );

        window.history.replaceState(
            {},
            "",
            url
        );


        applyStudentFilters();

    }


    /* =====================================================
       READ SEARCH FROM URL
    ===================================================== */

    function loadUrlSearch() {

        if (!searchInput) {
            return;
        }


        const url =
            new URL(
                window.location.href
            );


        const urlSearch =
            url.searchParams.get(
                "search"
            );


        if (!urlSearch) {
            return;
        }


        searchInput.value =
            urlSearch;


        applyStudentFilters();

    }


    /* =====================================================
       SEARCH EVENT
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyStudentFilters
        );

    }


    /* =====================================================
       COURSE EVENT
    ===================================================== */

    if (courseFilter) {

        courseFilter.addEventListener(
            "change",
            applyStudentFilters
        );

    }


    /* =====================================================
       SESSION EVENT
    ===================================================== */

    if (sessionFilter) {

        sessionFilter.addEventListener(
            "change",
            applyStudentFilters
        );

    }


    /* =====================================================
       STATUS EVENT
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyStudentFilters
        );

    }


    /* =====================================================
       RESET EVENT
    ===================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetFilters
        );

    }


    /* =====================================================
       VIEW STUDENT
       VIEW ONLY
    ===================================================== */

    const viewButtons =
        document.querySelectorAll(
            ".view-student-button"
        );


    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const href =
                    button.getAttribute(
                        "href"
                    );


                if (!href) {

                    event.preventDefault();

                }

            }
        );

    });


    /* =====================================================
       CTRL + K SEARCH
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                (event.ctrlKey ||
                 event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();


                if (searchInput) {

                    searchInput.focus();

                    searchInput.select();

                }

            }

        }
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    applyStudentFilters();

    loadUrlSearch();

});