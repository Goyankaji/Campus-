/* =========================================================
   AUTHORITY — PLACEMENT DRIVES
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {

        initDriveSearch();

        initDriveFilters();

        initDriveModal();

        initDrivePagination();

    }
);



/* =========================================================
   SEARCH
========================================================= */

function initDriveSearch() {

    const searchInput =
        document.getElementById("driveSearch");

    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        applyDriveFilters
    );

}



/* =========================================================
   FILTERS
========================================================= */

function initDriveFilters() {

    const statusFilter =
        document.getElementById("driveStatus");

    const typeFilter =
        document.getElementById("driveType");


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyDriveFilters
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            applyDriveFilters
        );

    }

}



/* =========================================================
   APPLY SEARCH + FILTER
========================================================= */

function applyDriveFilters() {

    const searchInput =
        document.getElementById("driveSearch");

    const statusFilter =
        document.getElementById("driveStatus");

    const typeFilter =
        document.getElementById("driveType");


    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const selectedType =
        typeFilter
            ? typeFilter.value
            : "all";


    const rows =
        document.querySelectorAll(
            "#driveTableBody tr"
        );


    let visibleCount = 0;


    rows.forEach(
        function (row) {

            const companyName =
                row
                    .querySelector(
                        ".drive-company strong"
                    )
                    ?.textContent
                    .toLowerCase() || "";


            const companyDescription =
                row
                    .querySelector(
                        ".drive-company span"
                    )
                    ?.textContent
                    .toLowerCase() || "";


            const driveDate =
                row
                    .querySelector(
                        "td:nth-child(2)"
                    )
                    ?.textContent
                    .toLowerCase() || "";


            const rowStatus =
                row.dataset.status || "";


            const rowType =
                row.dataset.type || "";


            const searchMatch =
                searchValue === "" ||
                companyName.includes(searchValue) ||
                companyDescription.includes(searchValue) ||
                driveDate.includes(searchValue);


            const statusMatch =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;


            const typeMatch =
                selectedType === "all" ||
                rowType === selectedType;


            if (
                searchMatch &&
                statusMatch &&
                typeMatch
            ) {

                row.style.display = "";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        }
    );


    updateDriveCount(
        visibleCount
    );


    updateDriveEmptyState(
        visibleCount
    );

}



/* =========================================================
   COUNT
========================================================= */

function updateDriveCount(
    count
) {

    const countElement =
        document.getElementById(
            "driveCount"
        );


    if (!countElement) {
        return;
    }


    if (count === 0) {

        countElement.textContent =
            "No placement drives found";

        return;

    }


    countElement.textContent =
        "Showing " +
        count +
        " placement drive" +
        (count === 1 ? "" : "s");

}



/* =========================================================
   EMPTY STATE
========================================================= */

function updateDriveEmptyState(
    count
) {

    const emptyState =
        document.getElementById(
            "driveEmpty"
        );


    if (!emptyState) {
        return;
    }


    if (count === 0) {

        emptyState.classList.add(
            "show"
        );

    } else {

        emptyState.classList.remove(
            "show"
        );

    }

}



/* =========================================================
   DRIVE MODAL
========================================================= */

function initDriveModal() {

    const modal =
        document.getElementById(
            "driveModal"
        );

    if (!modal) {
        return;
    }


    const closeButton =
        document.getElementById(
            "modalClose"
        );


    const doneButton =
        document.getElementById(
            "modalDone"
        );


    const overlay =
        document.querySelector(
            ".drive-modal-overlay"
        );


    const viewButtons =
        document.querySelectorAll(
            ".view-drive"
        );


    viewButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const company =
                        button.dataset.drive;

                    openDriveModal(
                        company
                    );

                }
            );

        }
    );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeDriveModal
        );

    }


    if (doneButton) {

        doneButton.addEventListener(
            "click",
            closeDriveModal
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeDriveModal
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {

                closeDriveModal();

            }

        }
    );

}



/* =========================================================
   MODAL DATA
========================================================= */

function openDriveModal(
    company
) {

    const driveData = {

        "TCS": {
            logo: "TCS",
            date: "18 Aug 2026",
            type: "On Campus",
            applicants: "320",
            selected: "82",
            package: "₹ 7.20 LPA",
            status: "Completed"
        },


        "Infosys": {
            logo: "IN",
            date: "12 Aug 2026",
            type: "On Campus",
            applicants: "280",
            selected: "65",
            package: "₹ 6.80 LPA",
            status: "Completed"
        },


        "Wipro": {
            logo: "W",
            date: "22 Aug 2026",
            type: "Off Campus",
            applicants: "245",
            selected: "53",
            package: "₹ 6.20 LPA",
            status: "Ongoing"
        },


        "Accenture": {
            logo: "A",
            date: "28 Aug 2026",
            type: "On Campus",
            applicants: "310",
            selected: "—",
            package: "₹ 7.50 LPA",
            status: "Upcoming"
        },


        "Capgemini": {
            logo: "C",
            date: "04 Aug 2026",
            type: "Off Campus",
            applicants: "210",
            selected: "38",
            package: "₹ 6.30 LPA",
            status: "Completed"
        },


        "Deloitte": {
            logo: "D",
            date: "02 Sep 2026",
            type: "Off Campus",
            applicants: "260",
            selected: "—",
            package: "₹ 8.40 LPA",
            status: "Upcoming"
        },


        "Microsoft": {
            logo: "MS",
            date: "10 Sep 2026",
            type: "On Campus",
            applicants: "420",
            selected: "—",
            package: "₹ 28.00 LPA",
            status: "Upcoming"
        }

    };


    const data =
        driveData[company] || {

            logo:
                company
                    .substring(0, 2)
                    .toUpperCase(),

            date: "—",
            type: "—",
            applicants: "—",
            selected: "—",
            package: "—",
            status: "—"

        };


    const modal =
        document.getElementById(
            "driveModal"
        );


    const modalLogo =
        document.querySelector(
            ".modal-drive-logo"
        );


    const modalName =
        document.getElementById(
            "modalDriveName"
        );


    const modalDate =
        document.getElementById(
            "modalDate"
        );


    const modalType =
        document.getElementById(
            "modalType"
        );


    const modalApplicants =
        document.getElementById(
            "modalApplicants"
        );


    const modalSelected =
        document.getElementById(
            "modalSelected"
        );


    const modalPackage =
        document.getElementById(
            "modalPackage"
        );


    const modalStatus =
        document.getElementById(
            "modalStatus"
        );


    if (modalLogo) {
        modalLogo.textContent =
            data.logo;
    }


    if (modalName) {
        modalName.textContent =
            company;
    }


    if (modalDate) {
        modalDate.textContent =
            data.date;
    }


    if (modalType) {
        modalType.textContent =
            data.type;
    }


    if (modalApplicants) {
        modalApplicants.textContent =
            data.applicants;
    }


    if (modalSelected) {
        modalSelected.textContent =
            data.selected;
    }


    if (modalPackage) {
        modalPackage.textContent =
            data.package;
    }


    if (modalStatus) {
        modalStatus.textContent =
            data.status;
    }


    if (modal) {

        modal.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";

    }

}



/* =========================================================
   CLOSE MODAL
========================================================= */

function closeDriveModal() {

    const modal =
        document.getElementById(
            "driveModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}



/* =========================================================
   PAGINATION UI
========================================================= */

function initDrivePagination() {

    const buttons =
        document.querySelectorAll(
            ".pagination-btn"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        button.disabled ||
                        button.classList.contains(
                            "active"
                        )
                    ) {
                        return;
                    }


                    const number =
                        button.textContent
                            .trim();


                    if (
                        /^[0-9]+$/.test(
                            number
                        )
                    ) {

                        buttons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

}



/* =========================================================
   ACADEMIC YEAR
========================================================= */

const academicYear =
    document.getElementById(
        "academicYear"
    );


if (academicYear) {

    academicYear.addEventListener(
        "change",
        function () {

            console.log(
                "Academic year:",
                academicYear.value
            );

        }
    );

}