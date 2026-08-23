/* =========================================================
   CAMPUS ADMIN
   PRE-PLACED STUDENTS JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById("preplacedSearch");

    const college =
        document.getElementById("preplacedCollege");

    const status =
        document.getElementById("preplacedStatus");

    const year =
        document.getElementById("preplacedYear");

    const tableBody =
        document.getElementById("preplacedTableBody");

    const empty =
        document.getElementById("preplacedEmpty");

    const recordCount =
        document.getElementById(
            "preplacedRecordCount"
        );

    const footerCount =
        document.getElementById(
            "preplacedFooterCount"
        );

    const clearFilters =
        document.getElementById(
            "clearPreplacedFilters"
        );


    /* =====================================================
       MODALS
    ====================================================== */

    const detailsModal =
        document.getElementById(
            "preplacedDetailsModal"
        );

    const addModal =
        document.getElementById(
            "addPreplacedModal"
        );

    const addButton =
        document.getElementById(
            "addPreplacedBtn"
        );

    const addForm =
        document.getElementById(
            "addPreplacedForm"
        );


    /* =====================================================
       NORMALIZE
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       TITLE CASE
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
       STATUS
    ====================================================== */

    function statusText(value) {

        if (value === "confirmed") {
            return "Confirmed";
        }

        if (value === "joined") {
            return "Joined";
        }

        return "Joining Pending";

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


            const show =
                matchesSearch &&
                matchesCollege &&
                matchesStatus;


            row.style.display =
                show ? "" : "none";


            if (show) {
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
        year.value = "2025-26";

        filterRecords();

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
            "modalPreplacedStudent"
        ).textContent =
            titleCase(name);


        document.getElementById(
            "modalPreplacedCompanyRole"
        ).textContent =
            `${titleCase(role)} · ${titleCase(company)}`;


        document.getElementById(
            "modalPreplacedCompany"
        ).textContent =
            titleCase(company);


        document.getElementById(
            "modalPreplacedRole"
        ).textContent =
            titleCase(role);


        document.getElementById(
            "modalPreplacedCollege"
        ).textContent =
            rowCollege.toUpperCase();


        document.getElementById(
            "modalPreplacedPackage"
        ).textContent =
            cells[4]?.textContent.trim() || "—";


        document.getElementById(
            "modalPreplacedDate"
        ).textContent =
            cells[5]?.textContent.trim() || "—";


        document.getElementById(
            "modalPreplacedStatus"
        ).textContent =
            statusText(rowStatus);


        const initials =
            titleCase(name)
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();


        document.getElementById(
            "modalPreplacedAvatar"
        ).textContent =
            initials;


        detailsModal.hidden = false;

        document.body.classList.add(
            "modal-open"
        );

    }


    /* =====================================================
       VIEW BUTTON
    ====================================================== */

    tableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-view-preplaced]"
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
        .querySelectorAll(
            "[data-close-preplaced]"
        )
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
                    "newPreplacedStudent"
                ).focus();

            }, 100);

        }
    );


    /* =====================================================
       CLOSE ADD MODAL
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-add-preplaced]"
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
       ADD RECORD
    ====================================================== */

    addForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const student =
                document.getElementById(
                    "newPreplacedStudent"
                ).value.trim();


            if (!student) {
                return;
            }


            /*
             * PHASE-1 ONLY
             * Database integration will come later.
             */

            alert(
                `${student} pre-placed record is ready to be saved.`
            );


            addForm.reset();

            addModal.hidden =
                true;

            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       PAGINATION UI
    ====================================================== */

    document
        .querySelectorAll(
            ".preplaced-page-btn"
        )
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
                            ".preplaced-page-btn"
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
       ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            detailsModal.hidden =
                true;

            addModal.hidden =
                true;

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

    year.addEventListener(
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