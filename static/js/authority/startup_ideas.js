/* =========================================================
   AUTHORITY — STARTUP IDEAS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const startupSearch =
    document.getElementById("startupSearch");

const startupStatusFilter =
    document.getElementById("startupStatusFilter");

const startupTableBody =
    document.getElementById("startupTableBody");

const startupCount =
    document.getElementById("startupCount");

const startupModal =
    document.getElementById("startupModal");

const startupModalClose =
    document.getElementById("startupModalClose");

const startupModalOverlay =
    document.querySelector(
        ".startup-modal-overlay"
    );

const modalIdeaName =
    document.getElementById("modalIdeaName");

const modalFounder =
    document.getElementById("modalFounder");

const modalCategory =
    document.getElementById("modalCategory");

const modalStage =
    document.getElementById("modalStage");

const modalScore =
    document.getElementById("modalScore");

const startupShortlistBtn =
    document.getElementById(
        "startupShortlistBtn"
    );

const startupRejectBtn =
    document.getElementById(
        "startupRejectBtn"
    );

const startupAddBtn =
    document.getElementById(
        "startupAddBtn"
    );


/* =========================================================
   FILTER TABLE
========================================================= */

function filterStartupTable() {

    if (!startupTableBody) {
        return;
    }


    const searchValue =
        startupSearch
            ? startupSearch.value
                .toLowerCase()
                .trim()
            : "";


    const statusValue =
        startupStatusFilter
            ? startupStatusFilter.value
            : "all";


    const rows =
        startupTableBody.querySelectorAll("tr");


    let visibleCount = 0;


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

            visibleCount++;

        } else {

            row.style.display = "none";

        }

    });


    updateStartupCount(
        visibleCount
    );

}


/* =========================================================
   COUNT
========================================================= */

function updateStartupCount(count) {

    if (!startupCount) {
        return;
    }


    startupCount.textContent =
        `Showing ${count} startup idea${count === 1 ? "" : "s"}`;

}


/* =========================================================
   SEARCH
========================================================= */

if (startupSearch) {

    startupSearch.addEventListener(
        "input",
        filterStartupTable
    );

}


/* =========================================================
   STATUS FILTER
========================================================= */

if (startupStatusFilter) {

    startupStatusFilter.addEventListener(
        "change",
        filterStartupTable
    );

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openStartupModal(row) {

    if (!startupModal || !row) {
        return;
    }


    const idea =
        row.querySelector(
            ".idea-cell strong"
        );

    const founder =
        row.children[1];

    const category =
        row.children[2];

    const stage =
        row.querySelector(
            ".idea-status"
        );

    const score =
        row.querySelector(
            ".idea-score"
        );


    if (modalIdeaName) {

        modalIdeaName.textContent =
            idea
                ? idea.textContent.trim()
                : "Startup Idea";

    }


    if (modalFounder) {

        modalFounder.textContent =
            founder
                ? founder.textContent.trim()
                : "—";

    }


    if (modalCategory) {

        modalCategory.textContent =
            category
                ? category.textContent.trim()
                : "—";

    }


    if (modalStage) {

        modalStage.textContent =
            stage
                ? stage.textContent.trim()
                : "—";

    }


    if (modalScore) {

        modalScore.textContent =
            score
                ? score.textContent.trim()
                : "—";

    }


    startupModal.dataset.currentRow =
        Array.from(
            startupTableBody.querySelectorAll("tr")
        ).indexOf(row);


    startupModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   VIEW BUTTONS
========================================================= */

document
    .querySelectorAll(".idea-view-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");

                openStartupModal(row);

            }
        );

    });


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeStartupModal() {

    if (!startupModal) {
        return;
    }


    startupModal.classList.remove("show");

    document.body.style.overflow = "";

}


if (startupModalClose) {

    startupModalClose.addEventListener(
        "click",
        closeStartupModal
    );

}


if (startupModalOverlay) {

    startupModalOverlay.addEventListener(
        "click",
        closeStartupModal
    );

}


/* =========================================================
   ESC
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            startupModal &&
            startupModal.classList.contains("show")
        ) {

            closeStartupModal();

        }

    }
);


/* =========================================================
   SHORTLIST
========================================================= */

if (startupShortlistBtn) {

    startupShortlistBtn.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    startupModal.dataset.currentRow
                );


            const rows =
                startupTableBody
                    ? startupTableBody.querySelectorAll("tr")
                    : [];


            const row =
                rows[index];


            if (!row) {
                return;
            }


            row.dataset.status =
                "shortlisted";


            const status =
                row.querySelector(
                    ".idea-status"
                );


            if (status) {

                status.textContent =
                    "Shortlisted";

                status.className =
                    "idea-status shortlisted";

            }


            closeStartupModal();

            filterStartupTable();

        }
    );

}


/* =========================================================
   REJECT
========================================================= */

if (startupRejectBtn) {

    startupRejectBtn.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    startupModal.dataset.currentRow
                );


            const rows =
                startupTableBody
                    ? startupTableBody.querySelectorAll("tr")
                    : [];


            const row =
                rows[index];


            if (!row) {
                return;
            }


            row.dataset.status =
                "rejected";


            const status =
                row.querySelector(
                    ".idea-status"
                );


            if (status) {

                status.textContent =
                    "Rejected";

                status.className =
                    "idea-status rejected";

            }


            closeStartupModal();

            filterStartupTable();

        }
    );

}


/* =========================================================
   ADD IDEA
========================================================= */

if (startupAddBtn) {

    startupAddBtn.addEventListener(
        "click",
        function () {

            alert(
                "Startup idea creation will be connected to the database later."
            );

        }
    );

}


/* =========================================================
   PAGINATION DEMO
========================================================= */

document
    .querySelectorAll(".startup-pagination button")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (
                    button.textContent === "‹" ||
                    button.textContent === "›"
                ) {

                    return;

                }


                document
                    .querySelectorAll(
                        ".startup-pagination button"
                    )
                    .forEach(function (item) {

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


/* =========================================================
   INITIAL LOAD
========================================================= */

filterStartupTable();