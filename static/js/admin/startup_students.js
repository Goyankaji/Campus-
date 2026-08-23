/* =========================================================
   CAMPUS ADMIN
   STARTUP STUDENTS JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById("startupSearch");

    const college =
        document.getElementById("startupCollege");

    const status =
        document.getElementById("startupStatus");

    const sector =
        document.getElementById("startupSector");

    const tableBody =
        document.getElementById("startupTableBody");

    const empty =
        document.getElementById("startupEmpty");

    const recordCount =
        document.getElementById(
            "startupRecordCount"
        );

    const footerCount =
        document.getElementById(
            "startupFooterCount"
        );

    const clearFilters =
        document.getElementById(
            "clearStartupFilters"
        );


    /* =====================================================
       MODALS
    ====================================================== */

    const detailsModal =
        document.getElementById(
            "startupDetailsModal"
        );

    const addModal =
        document.getElementById(
            "addStartupModal"
        );

    const addButton =
        document.getElementById(
            "addStartupBtn"
        );

    const addForm =
        document.getElementById(
            "addStartupForm"
        );


    /* =====================================================
       HELPERS
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


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


    function sectorText(value) {

        const map = {

            "technology":
                "Technology",

            "fintech":
                "FinTech",

            "edtech":
                "EdTech",

            "healthcare":
                "Healthcare",

            "ecommerce":
                "E-Commerce"

        };

        return map[value] || value;

    }


    function statusText(value) {

        const map = {

            "active":
                "Active",

            "incubated":
                "Incubated",

            "funded":
                "Funded",

            "closed":
                "Closed"

        };

        return map[value] || value;

    }


    /* =====================================================
       FILTER RECORDS
    ====================================================== */

    function filterRecords() {

        const searchValue =
            normalize(search.value);

        const collegeValue =
            normalize(college.value);

        const statusValue =
            normalize(status.value);

        const sectorValue =
            normalize(sector.value);


        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            );


        let visibleCount = 0;


        rows.forEach(row => {

            const name =
                normalize(row.dataset.name);

            const startup =
                normalize(row.dataset.startup);

            const rowSector =
                normalize(row.dataset.sector);

            const rowCollege =
                normalize(row.dataset.college);

            const rowStatus =
                normalize(row.dataset.status);


            const matchesSearch =
                !searchValue ||
                name.includes(searchValue) ||
                startup.includes(searchValue) ||
                rowSector.includes(searchValue);


            const matchesCollege =
                collegeValue === "all" ||
                rowCollege === collegeValue;


            const matchesStatus =
                statusValue === "all" ||
                rowStatus === statusValue;


            const matchesSector =
                sectorValue === "all" ||
                rowSector === sectorValue;


            const show =
                matchesSearch &&
                matchesCollege &&
                matchesStatus &&
                matchesSector;


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

        college.value =
            "all";

        status.value =
            "all";

        sector.value =
            "all";


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

        const startup =
            row.dataset.startup;

        const rowSector =
            row.dataset.sector;

        const rowCollege =
            row.dataset.college;

        const rowStatus =
            row.dataset.status;


        /*
         * Stage and founded year
         * are read directly from table.
         */

        const stage =
            cells[4]?.textContent.trim() || "—";

        const founded =
            cells[5]?.textContent.trim() || "—";


        document.getElementById(
            "modalStartupStudent"
        ).textContent =
            titleCase(name);


        document.getElementById(
            "modalStartupCompany"
        ).textContent =
            titleCase(startup);


        document.getElementById(
            "modalStartupName"
        ).textContent =
            titleCase(startup);


        document.getElementById(
            "modalStartupNameDetail"
        ).textContent =
            titleCase(startup);


        document.getElementById(
            "modalStartupStudentDetail"
        ).textContent =
            titleCase(name);


        document.getElementById(
            "modalStartupCollege"
        ).textContent =
            rowCollege.toUpperCase();


        document.getElementById(
            "modalStartupSector"
        ).textContent =
            sectorText(rowSector);


        document.getElementById(
            "modalStartupStage"
        ).textContent =
            stage;


        document.getElementById(
            "modalStartupFounded"
        ).textContent =
            founded;


        document.getElementById(
            "modalStartupStatus"
        ).textContent =
            statusText(rowStatus);


        const initials =
            titleCase(name)
                .split(" ")
                .map(
                    word =>
                        word.charAt(0)
                )
                .join("")
                .substring(0, 2)
                .toUpperCase();


        document.getElementById(
            "modalStartupAvatar"
        ).textContent =
            initials;


        detailsModal.hidden =
            false;

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
                    "[data-view-startup]"
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
       CLOSE DETAILS MODAL
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-startup]"
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

            addModal.hidden =
                false;

            document.body.classList.add(
                "modal-open"
            );


            setTimeout(() => {

                document.getElementById(
                    "newStartupStudent"
                ).focus();

            }, 100);

        }
    );


    /* =====================================================
       CLOSE ADD MODAL
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-add-startup]"
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
       ADD STARTUP
    ====================================================== */

    addForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const student =
                document.getElementById(
                    "newStartupStudent"
                ).value.trim();


            if (!student) {
                return;
            }


            /*
             * PHASE-1 ONLY
             * Database integration later.
             */

            alert(
                `${student} startup record is ready to be saved.`
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
            ".startup-page-btn"
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
                            ".startup-page-btn"
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
       ESCAPE KEY
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

    sector.addEventListener(
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