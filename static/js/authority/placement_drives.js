document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("driveSearch");

    const statusFilter =
        document.getElementById("statusFilter");

    const typeFilter =
        document.getElementById("typeFilter");

    const clearFilters =
        document.getElementById("clearFilters");

    const tableBody =
        document.getElementById("drivesTableBody");

    const emptyState =
        document.getElementById("emptyState");

    const resultsCount =
        document.getElementById("resultsCount");

    const academicYear =
        document.getElementById("academicYear");


    /* =====================================================
       FILTER
    ====================================================== */

    function filterDrives() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();

        const status =
            statusFilter.value;

        const type =
            typeFilter.value;

        const rows =
            Array.from(
                tableBody.querySelectorAll(
                    ".drive-row"
                )
            );


        let visible = 0;


        rows.forEach(function (row) {

            const company =
                (
                    row.dataset.company || ""
                ).toLowerCase();

            const rowStatus =
                row.dataset.status || "";

            const rowType =
                row.dataset.type || "";


            const searchMatch =
                company.includes(search);

            const statusMatch =
                status === "all"
                || rowStatus === status;

            const typeMatch =
                type === "all"
                || rowType === type;


            if (
                searchMatch
                && statusMatch
                && typeMatch
            ) {

                row.style.display = "";
                visible++;

            } else {

                row.style.display = "none";

            }

        });


        updateResults(visible);

    }


    /* =====================================================
       RESULTS
    ====================================================== */

    function updateResults(count) {

        resultsCount.textContent =
            `Showing ${count} placement ${
                count === 1
                    ? "drive"
                    : "drives"
            }`;


        if (count === 0) {

            emptyState.classList.add("show");

        } else {

            emptyState.classList.remove("show");

        }

    }


    /* =====================================================
       CLEAR
    ====================================================== */

    clearFilters.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            statusFilter.value = "all";

            typeFilter.value = "all";

            filterDrives();

        }
    );


    /* =====================================================
       EVENTS
    ====================================================== */

    searchInput.addEventListener(
        "input",
        filterDrives
    );

    statusFilter.addEventListener(
        "change",
        filterDrives
    );

    typeFilter.addEventListener(
        "change",
        filterDrives
    );


    academicYear.addEventListener(
        "change",
        function () {

            console.log(
                "Selected academic year:",
                academicYear.value
            );

        }
    );


    /* =====================================================
       MODAL
    ====================================================== */

    const modal =
        document.getElementById("driveModal");

    const modalBackdrop =
        document.getElementById("modalBackdrop");

    const modalClose =
        document.getElementById("modalClose");


    const modalLogo =
        document.getElementById("modalLogo");

    const modalCompany =
        document.getElementById("modalCompany");

    const modalSubtitle =
        document.getElementById("modalSubtitle");

    const modalDate =
        document.getElementById("modalDate");

    const modalType =
        document.getElementById("modalType");

    const modalApplicants =
        document.getElementById("modalApplicants");

    const modalSelected =
        document.getElementById("modalSelected");

    const modalPackage =
        document.getElementById("modalPackage");

    const modalStatus =
        document.getElementById("modalStatus");


    const driveDetails = {

        Wipro: {
            logo: "W",
            subtitle: "Wipro Limited",
            date: "22 Aug 2026",
            type: "Off Campus",
            applicants: "245",
            selected: "53",
            package: "₹6.20 LPA",
            status: "Ongoing"
        },

        TCS: {
            logo: "T",
            subtitle: "Tata Consultancy Services",
            date: "18 Jul 2026",
            type: "On Campus",
            applicants: "310",
            selected: "82",
            package: "₹7.20 LPA",
            status: "Completed"
        },

        Infosys: {
            logo: "I",
            subtitle: "Infosys Limited",
            date: "12 Jul 2026",
            type: "On Campus",
            applicants: "285",
            selected: "65",
            package: "₹6.80 LPA",
            status: "Completed"
        },

        Capgemini: {
            logo: "C",
            subtitle: "Capgemini Technology",
            date: "04 Aug 2026",
            type: "Off Campus",
            applicants: "210",
            selected: "38",
            package: "₹6.30 LPA",
            status: "Completed"
        },

        Deloitte: {
            logo: "D",
            subtitle: "Deloitte India",
            date: "02 Sep 2026",
            type: "Off Campus",
            applicants: "260",
            selected: "—",
            package: "₹8.40 LPA",
            status: "Upcoming"
        },

        Accenture: {
            logo: "A",
            subtitle: "Accenture India",
            date: "18 Sep 2026",
            type: "On Campus",
            applicants: "275",
            selected: "—",
            package: "₹7.50 LPA",
            status: "Upcoming"
        }

    };


    /* =====================================================
       OPEN MODAL
    ====================================================== */

    function openModal(company) {

        const data =
            driveDetails[company];

        if (!data) {
            return;
        }


        modalLogo.textContent =
            data.logo;

        modalCompany.textContent =
            company;

        modalSubtitle.textContent =
            data.subtitle;

        modalDate.textContent =
            data.date;

        modalType.textContent =
            data.type;

        modalApplicants.textContent =
            data.applicants;

        modalSelected.textContent =
            data.selected;

        modalPackage.textContent =
            data.package;

        modalStatus.textContent =
            data.status;


        modal.classList.add("show");

        document.body.style.overflow =
            "hidden";

    }


    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    function closeModal() {

        modal.classList.remove("show");

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       VIEW BUTTONS
    ====================================================== */

    document
        .querySelectorAll(".view-drive")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    openModal(
                        button.dataset.company
                    );

                }
            );

        });


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modalBackdrop.addEventListener(
        "click",
        closeModal
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
                && modal.classList.contains("show")
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    filterDrives();

});