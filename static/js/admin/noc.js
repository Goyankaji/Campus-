/* =========================================================
   CAMPUS ADMIN
   NOC MANAGEMENT JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById("nocSearch");

    const college =
        document.getElementById("nocCollege");

    const status =
        document.getElementById("nocStatus");

    const type =
        document.getElementById("nocType");

    const tableBody =
        document.getElementById("nocTableBody");

    const empty =
        document.getElementById("nocEmpty");

    const recordCount =
        document.getElementById("nocRecordCount");

    const footerCount =
        document.getElementById("nocFooterCount");

    const clearFilters =
        document.getElementById("clearNocFilters");


    /* =====================================================
       MODALS
    ====================================================== */

    const detailsModal =
        document.getElementById("nocDetailsModal");

    const addModal =
        document.getElementById("addNocModal");

    const addButton =
        document.getElementById("addNocBtn");

    const addForm =
        document.getElementById("addNocForm");


    let currentRow = null;


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
       STATUS TEXT
    ====================================================== */

    function getStatusText(statusValue) {

        if (statusValue === "approved") {
            return "Approved";
        }

        if (statusValue === "rejected") {
            return "Rejected";
        }

        return "Pending";

    }


    /* =====================================================
       PURPOSE TEXT
    ====================================================== */

    function getPurposeText(value) {

        if (value === "off-campus") {
            return "Off-Campus";
        }

        if (value === "higher-studies") {
            return "Higher Studies";
        }

        return "Other";

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

        const typeValue =
            normalize(type.value);


        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            );


        let visibleCount = 0;


        rows.forEach(row => {

            const name =
                normalize(row.dataset.name);

            const roll =
                normalize(row.dataset.roll);

            const rowCollege =
                normalize(row.dataset.college);

            const purpose =
                normalize(row.dataset.purpose);

            const rowStatus =
                normalize(row.dataset.status);


            const matchesSearch =
                !searchValue ||
                name.includes(searchValue) ||
                roll.includes(searchValue) ||
                purpose.includes(searchValue);


            const matchesCollege =
                collegeValue === "all" ||
                rowCollege === collegeValue;


            const matchesStatus =
                statusValue === "all" ||
                rowStatus === statusValue;


            const matchesType =
                typeValue === "all" ||
                purpose === typeValue;


            const show =
                matchesSearch &&
                matchesCollege &&
                matchesStatus &&
                matchesType;


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
        type.value = "all";

        filterRecords();

    }


    /* =====================================================
       SHOW DETAILS
    ====================================================== */

    function showDetails(row) {

        currentRow = row;


        const name =
            row.dataset.name;

        const roll =
            row.dataset.roll;

        const rowCollege =
            row.dataset.college;

        const purpose =
            row.dataset.purpose;

        const rowStatus =
            row.dataset.status;


        const cells =
            row.querySelectorAll("td");


        const submitted =
            cells[4]?.textContent.trim() || "—";


        document.getElementById(
            "modalNocStudent"
        ).textContent =
            titleCase(name);


        document.getElementById(
            "modalNocRoll"
        ).textContent =
            roll.toUpperCase();


        document.getElementById(
            "modalNocName"
        ).textContent =
            titleCase(name);


        document.getElementById(
            "modalNocRollDetail"
        ).textContent =
            roll.toUpperCase();


        document.getElementById(
            "modalNocCollege"
        ).textContent =
            rowCollege.toUpperCase();


        document.getElementById(
            "modalNocPurpose"
        ).textContent =
            getPurposeText(purpose);


        document.getElementById(
            "modalNocType"
        ).textContent =
            getPurposeText(purpose);


        document.getElementById(
            "modalNocDate"
        ).textContent =
            submitted;


        document.getElementById(
            "modalNocStatus"
        ).textContent =
            getStatusText(rowStatus);


        const initials =
            titleCase(name)
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();


        document.getElementById(
            "modalNocAvatar"
        ).textContent =
            initials;


        /*
         * Only show approval/rejection
         * actions for pending requests.
         */

        const approveButton =
            document.getElementById(
                "approveNocBtn"
            );

        const rejectButton =
            document.getElementById(
                "rejectNocBtn"
            );


        if (rowStatus === "pending") {

            approveButton.style.display =
                "inline-flex";

            rejectButton.style.display =
                "inline-flex";

        } else {

            approveButton.style.display =
                "none";

            rejectButton.style.display =
                "none";

        }


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
                    "[data-view-noc]"
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
            "[data-close-noc]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    detailsModal.hidden =
                        true;

                    currentRow =
                        null;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       APPROVE NOC
    ====================================================== */

    document
        .getElementById("approveNocBtn")
        .addEventListener(
            "click",
            () => {

                if (!currentRow) {
                    return;
                }


                currentRow.dataset.status =
                    "approved";


                const statusBadge =
                    currentRow.querySelector(
                        ".noc-status"
                    );


                statusBadge.className =
                    "noc-status approved";


                statusBadge.textContent =
                    "Approved";


                document.getElementById(
                    "modalNocStatus"
                ).textContent =
                    "Approved";


                document.getElementById(
                    "approveNocBtn"
                ).style.display =
                    "none";


                document.getElementById(
                    "rejectNocBtn"
                ).style.display =
                    "none";


                /*
                 * DB UPDATE WILL BE ADDED LATER.
                 */

                alert(
                    "NOC request approved successfully."
                );

            }
        );


    /* =====================================================
       REJECT NOC
    ====================================================== */

    document
        .getElementById("rejectNocBtn")
        .addEventListener(
            "click",
            () => {

                if (!currentRow) {
                    return;
                }


                currentRow.dataset.status =
                    "rejected";


                const statusBadge =
                    currentRow.querySelector(
                        ".noc-status"
                    );


                statusBadge.className =
                    "noc-status rejected";


                statusBadge.textContent =
                    "Rejected";


                document.getElementById(
                    "modalNocStatus"
                ).textContent =
                    "Rejected";


                document.getElementById(
                    "approveNocBtn"
                ).style.display =
                    "none";


                document.getElementById(
                    "rejectNocBtn"
                ).style.display =
                    "none";


                /*
                 * DB UPDATE WILL BE ADDED LATER.
                 */

                alert(
                    "NOC request rejected."
                );

            }
        );


    /* =====================================================
       OPEN CREATE NOC
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
                    "newNocStudent"
                ).focus();

            }, 100);

        }
    );


    /* =====================================================
       CLOSE CREATE MODAL
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-add-noc]"
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
       CREATE NOC FORM
    ====================================================== */

    addForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const student =
                document.getElementById(
                    "newNocStudent"
                ).value.trim();


            if (!student) {
                return;
            }


            /*
             * PHASE-1 ONLY
             * Database insertion later.
             */

            alert(
                `NOC request for ${student} is ready to be created.`
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
            ".noc-page-btn"
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
                            ".noc-page-btn"
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

            currentRow =
                null;

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

    type.addEventListener(
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