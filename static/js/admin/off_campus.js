/* =========================================================
   CAMPUS ADMIN
   OFF-CAMPUS JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById("offSearch");

    const college =
        document.getElementById("offCollege");

    const status =
        document.getElementById("offStatus");

    const sessionFilter =
        document.getElementById("offSession");

    const tableBody =
        document.getElementById("offTableBody");

    const empty =
        document.getElementById("offEmpty");

    const recordCount =
        document.getElementById("offRecordCount");

    const footerCount =
        document.getElementById("offFooterCount");

    const clearFilters =
        document.getElementById("clearOffFilters");


    /* =====================================================
       MODALS
    ====================================================== */

    const detailsModal =
        document.getElementById("offDetailsModal");

    const addModal =
        document.getElementById("addOffModal");

    const addButton =
        document.getElementById("addOffCampusBtn");

    const addForm =
        document.getElementById("addOffForm");


    /* =====================================================
       NORMALIZE
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       FILTER
    ====================================================== */

    function filterRecords() {

        const searchValue =
            normalize(search.value);

        const collegeValue =
            normalize(college.value);

        const statusValue =
            normalize(status.value);


        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            );


        let visibleCount = 0;


        rows.forEach(row => {

            const name =
                normalize(row.dataset.name);

            const company =
                normalize(row.dataset.company);

            const role =
                normalize(row.dataset.role);

            const rowCollege =
                normalize(row.dataset.college);

            const rowStatus =
                normalize(row.dataset.status);


            const matchesSearch =
                !searchValue ||
                name.includes(searchValue) ||
                company.includes(searchValue) ||
                role.includes(searchValue);


            const matchesCollege =
                collegeValue === "all" ||
                rowCollege === collegeValue;


            const matchesStatus =
                statusValue === "all" ||
                rowStatus === statusValue;


            const shouldShow =
                matchesSearch &&
                matchesCollege &&
                matchesStatus;


            row.style.display =
                shouldShow ? "" : "none";


            if (shouldShow) {
                visibleCount++;
            }

        });


        recordCount.textContent =
            visibleCount;

        footerCount.textContent =
            visibleCount;

        empty.hidden =
            visibleCount !== 0;

    }


    /* =====================================================
       CLEAR FILTERS
    ====================================================== */

    function resetFilters() {

        search.value = "";
        college.value = "all";
        status.value = "all";
        sessionFilter.value = "2025-26";

        filterRecords();

    }


    /* =====================================================
       TEXT FORMAT
    ====================================================== */

    function titleCase(value) {

        return String(value)
            .split(" ")
            .map(word => {

                if (!word) {
                    return "";
                }

                return (
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
                );

            })
            .join(" ");

    }


    /* =====================================================
       SHOW DETAILS
    ====================================================== */

    function showDetails(row) {

        const cells =
            row.querySelectorAll("td");


        const name =
            row.dataset.name;

        const company =
            row.dataset.company;

        const role =
            row.dataset.role;

        const rowCollege =
            row.dataset.college;

        const rowStatus =
            row.dataset.status;


        document.getElementById(
            "modalOffStudent"
        ).textContent =
            titleCase(name);


        document.getElementById(
            "modalOffCompany"
        ).textContent =
            titleCase(company);


        document.getElementById(
            "modalOffRole"
        ).textContent =
            titleCase(role);


        document.getElementById(
            "modalOffCompanyRole"
        ).textContent =
            `${titleCase(role)} · ${titleCase(company)}`;


        document.getElementById(
            "modalOffCollege"
        ).textContent =
            rowCollege.toUpperCase();


        document.getElementById(
            "modalOffPackage"
        ).textContent =
            cells[4]?.textContent.trim() || "—";


        document.getElementById(
            "modalOffDate"
        ).textContent =
            cells[5]?.textContent.trim() || "—";


        let formattedStatus =
            "Confirmed";


        if (rowStatus === "joined") {
            formattedStatus = "Joined";
        }

        if (rowStatus === "pending") {
            formattedStatus = "Offer Pending";
        }


        document.getElementById(
            "modalOffStatus"
        ).textContent =
            formattedStatus;


        const initials =
            titleCase(name)
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();


        document.getElementById(
            "modalOffAvatar"
        ).textContent =
            initials;


        detailsModal.hidden = false;

        document.body.classList.add(
            "modal-open"
        );

    }


    /* =====================================================
       TABLE VIEW
    ====================================================== */

    tableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".off-view-btn"
                );


            if (!button) {
                return;
            }


            const row =
                button.closest("tr");


            if (row) {
                showDetails(row);
            }

        }
    );


    /* =====================================================
       CLOSE DETAILS
    ====================================================== */

    document
        .querySelectorAll("[data-close-off]")
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    detailsModal.hidden =
                        true;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       OPEN ADD MODAL
    ====================================================== */

    addButton.addEventListener(
        "click",
        () => {

            addModal.hidden = false;

            document.body.classList.add(
                "modal-open"
            );


            setTimeout(() => {

                document.getElementById(
                    "newOffStudent"
                ).focus();

            }, 100);

        }
    );


    /* =====================================================
       CLOSE ADD MODAL
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-add-off]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    addModal.hidden =
                        true;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       ADD FORM
    ====================================================== */

    addForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const studentName =
                document.getElementById(
                    "newOffStudent"
                ).value.trim();


            if (!studentName) {
                return;
            }


            /*
             * PHASE-1
             * Frontend only.
             * Database insertion will be added later.
             */

            alert(
                `${studentName} off-campus record is ready to be saved.`
            );


            addForm.reset();

            addModal.hidden = true;

            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       PAGINATION UI
    ====================================================== */

    document
        .querySelectorAll(".off-page-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        button.classList.contains(
                            "disabled"
                        )
                    ) {
                        return;
                    }


                    const value =
                        button.textContent.trim();


                    if (
                        value === "‹" ||
                        value === "›"
                    ) {
                        return;
                    }


                    document
                        .querySelectorAll(
                            ".off-page-btn"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );

                }
            );

        });


    /* =====================================================
       KEYBOARD
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            detailsModal.hidden = true;

            addModal.hidden = true;

            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       EVENTS
    ====================================================== */

    search.addEventListener(
        "input",
        filterRecords
    );

    college.addEventListener(
        "change",
        filterRecords
    );

    status.addEventListener(
        "change",
        filterRecords
    );

    sessionFilter.addEventListener(
        "change",
        filterRecords
    );

    clearFilters.addEventListener(
        "click",
        resetFilters
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterRecords();

});