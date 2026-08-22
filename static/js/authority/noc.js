/* =========================================================
   AUTHORITY NOC PAGE JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const nocSearch =
    document.getElementById("nocSearch");

const nocStatusFilter =
    document.getElementById("nocStatusFilter");

const nocTableBody =
    document.getElementById("nocTableBody");

const nocRefreshBtn =
    document.getElementById("nocRefreshBtn");

const nocSession =
    document.getElementById("nocSession");

const nocModal =
    document.getElementById("nocModal");

const nocModalClose =
    document.getElementById("nocModalClose");

const nocModalOverlay =
    document.querySelector(".noc-modal-overlay");

const modalStudentName =
    document.getElementById("modalStudentName");

const modalCompany =
    document.getElementById("modalCompany");

const modalPurpose =
    document.getElementById("modalPurpose");

const modalStatus =
    document.getElementById("modalStatus");

const modalApproveBtn =
    document.getElementById("modalApproveBtn");

const modalRejectBtn =
    document.getElementById("modalRejectBtn");


/* =========================================================
   TABLE FILTER
========================================================= */

function filterNocTable() {

    if (!nocTableBody) {
        return;
    }

    const searchValue =
        nocSearch
            ? nocSearch.value.toLowerCase().trim()
            : "";

    const statusValue =
        nocStatusFilter
            ? nocStatusFilter.value
            : "all";

    const rows =
        nocTableBody.querySelectorAll("tr");

    let visibleRows = 0;


    rows.forEach(function (row) {

        const rowStatus =
            row.dataset.status || "";

        const rowSearch =
            row.dataset.search
                ? row.dataset.search.toLowerCase()
                : "";


        const searchMatch =
            rowSearch.includes(searchValue);

        const statusMatch =
            statusValue === "all" ||
            rowStatus === statusValue;


        if (
            searchMatch &&
            statusMatch
        ) {

            row.style.display = "";

            visibleRows++;

        } else {

            row.style.display = "none";

        }

    });


    updateTableCount(visibleRows);

}


/* =========================================================
   TABLE COUNT
========================================================= */

function updateTableCount(count) {

    const footerText =
        document.querySelector(
            ".noc-table-footer > span"
        );

    if (!footerText) {
        return;
    }

    footerText.textContent =
        `Showing ${count} NOC request${count === 1 ? "" : "s"}`;

}


/* =========================================================
   SEARCH
========================================================= */

if (nocSearch) {

    nocSearch.addEventListener(
        "input",
        filterNocTable
    );

}


/* =========================================================
   STATUS FILTER
========================================================= */

if (nocStatusFilter) {

    nocStatusFilter.addEventListener(
        "change",
        filterNocTable
    );

}


/* =========================================================
   QUICK ACTION FILTERS
========================================================= */

document
    .querySelectorAll(".noc-action")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    button.dataset.filter;

                if (!nocStatusFilter) {
                    return;
                }


                if (filter === "pending") {

                    nocStatusFilter.value =
                        "pending";

                }

                else if (filter === "review") {

                    nocStatusFilter.value =
                        "review";

                }

                else if (filter === "approved") {

                    nocStatusFilter.value =
                        "approved";

                }


                filterNocTable();


                const table =
                    document.querySelector(
                        ".noc-table-card"
                    );

                if (table) {

                    table.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


/* =========================================================
   MODAL OPEN
========================================================= */

function openNocModal(row) {

    if (!nocModal || !row) {
        return;
    }


    const student =
        row.querySelector(
            ".student-cell strong"
        );

    const company =
        row.children[1];

    const purpose =
        row.children[4];

    const status =
        row.querySelector(
            ".noc-status"
        );


    if (modalStudentName) {

        modalStudentName.textContent =
            student
                ? student.textContent.trim()
                : "Student";

    }


    if (modalCompany) {

        modalCompany.textContent =
            company
                ? company.textContent.trim()
                : "—";

    }


    if (modalPurpose) {

        modalPurpose.textContent =
            purpose
                ? purpose.textContent.trim()
                : "—";

    }


    if (modalStatus) {

        modalStatus.textContent =
            status
                ? status.textContent.trim()
                : "—";

    }


    nocModal.dataset.currentRow =
        Array.from(
            nocTableBody.querySelectorAll("tr")
        ).indexOf(row);


    nocModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   VIEW BUTTONS
========================================================= */

document
    .querySelectorAll(".noc-view-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");

                openNocModal(row);

            }
        );

    });


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeNocModal() {

    if (!nocModal) {
        return;
    }

    nocModal.classList.remove("show");

    document.body.style.overflow =
        "";

}


if (nocModalClose) {

    nocModalClose.addEventListener(
        "click",
        closeNocModal
    );

}


if (nocModalOverlay) {

    nocModalOverlay.addEventListener(
        "click",
        closeNocModal
    );

}


/* =========================================================
   ESC CLOSE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            nocModal &&
            nocModal.classList.contains("show")
        ) {

            closeNocModal();

        }

    }
);


/* =========================================================
   APPROVE
========================================================= */

if (modalApproveBtn) {

    modalApproveBtn.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    nocModal.dataset.currentRow
                );


            const rows =
                nocTableBody
                    ? nocTableBody.querySelectorAll("tr")
                    : [];


            const row =
                rows[index];


            if (!row) {
                return;
            }


            row.dataset.status =
                "approved";


            const statusBadge =
                row.querySelector(
                    ".noc-status"
                );


            if (statusBadge) {

                statusBadge.textContent =
                    "Approved";

                statusBadge.className =
                    "noc-status approved";

            }


            closeNocModal();

            filterNocTable();

        }
    );

}


/* =========================================================
   REJECT
========================================================= */

if (modalRejectBtn) {

    modalRejectBtn.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    nocModal.dataset.currentRow
                );


            const rows =
                nocTableBody
                    ? nocTableBody.querySelectorAll("tr")
                    : [];


            const row =
                rows[index];


            if (!row) {
                return;
            }


            row.dataset.status =
                "rejected";


            const statusBadge =
                row.querySelector(
                    ".noc-status"
                );


            if (statusBadge) {

                statusBadge.textContent =
                    "Rejected";

                statusBadge.className =
                    "noc-status rejected";

            }


            closeNocModal();

            filterNocTable();

        }
    );

}


/* =========================================================
   REFRESH
========================================================= */

if (nocRefreshBtn) {

    nocRefreshBtn.addEventListener(
        "click",
        function () {

            nocRefreshBtn.disabled =
                true;

            nocRefreshBtn.textContent =
                "↻ Refreshing...";


            setTimeout(
                function () {

                    nocRefreshBtn.disabled =
                        false;

                    nocRefreshBtn.textContent =
                        "↻ Refresh";

                    filterNocTable();

                },
                600
            );

        }
    );

}


/* =========================================================
   SESSION CHANGE
========================================================= */

if (nocSession) {

    nocSession.addEventListener(
        "change",
        function () {

            console.log(
                "NOC session changed:",
                nocSession.value
            );

        }
    );

}


/* =========================================================
   INITIAL LOAD
========================================================= */

filterNocTable();