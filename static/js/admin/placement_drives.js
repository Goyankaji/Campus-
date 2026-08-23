/* =========================================================
   CAMPUS ADMIN
   PLACEMENT DRIVES JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const searchInput =
        document.getElementById("driveSearch");

    const statusFilter =
        document.getElementById("driveStatusFilter");

    const modeFilter =
        document.getElementById("driveModeFilter");

    const collegeFilter =
        document.getElementById("driveCollegeFilter");

    const tableBody =
        document.getElementById("driveTableBody");

    const emptyState =
        document.getElementById("driveEmptyState");

    const visibleCount =
        document.getElementById("visibleDriveCount");

    const footerCount =
        document.getElementById("footerDriveCount");

    const clearFiltersBtn =
        document.getElementById("clearDriveFilters");

    const refreshBtn =
        document.getElementById("refreshDrivesBtn");

    const addDriveBtn =
        document.getElementById("openAddDriveBtn");

    const addDriveModal =
        document.getElementById("addDriveModal");

    const detailsModal =
        document.getElementById("driveDetailsModal");

    const addDriveForm =
        document.getElementById("addDriveForm");


    /* =====================================================
       HELPERS
    ====================================================== */

    function getRows() {

        return Array.from(
            tableBody.querySelectorAll("tr")
        );

    }


    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       FILTER DRIVES
    ====================================================== */

    function filterDrives() {

        const search =
            normalize(searchInput.value);

        const status =
            normalize(statusFilter.value);

        const mode =
            normalize(modeFilter.value);

        const college =
            normalize(collegeFilter.value);

        let count = 0;


        getRows().forEach(row => {

            const company =
                normalize(
                    row.dataset.company
                );

            const role =
                normalize(
                    row.dataset.role
                );

            const rowStatus =
                normalize(
                    row.dataset.status
                );

            const rowMode =
                normalize(
                    row.dataset.mode
                );

            const colleges =
                normalize(
                    row.dataset.colleges
                );


            const matchesSearch =
                !search ||
                company.includes(search) ||
                role.includes(search);


            const matchesStatus =
                status === "all" ||
                rowStatus === status;


            const matchesMode =
                mode === "all" ||
                rowMode === mode;


            const matchesCollege =
                college === "all" ||
                colleges
                    .split(",")
                    .map(item => item.trim())
                    .includes(college);


            const visible =
                matchesSearch &&
                matchesStatus &&
                matchesMode &&
                matchesCollege;


            row.style.display =
                visible ? "" : "none";


            if (visible) {
                count++;
            }

        });


        visibleCount.textContent = count;
        footerCount.textContent = count;

        emptyState.hidden = count !== 0;

    }


    /* =====================================================
       CLEAR FILTERS
    ====================================================== */

    function clearFilters() {

        searchInput.value = "";
        statusFilter.value = "all";
        modeFilter.value = "all";
        collegeFilter.value = "all";

        filterDrives();

    }


    /* =====================================================
       REFRESH
    ====================================================== */

    function refreshDrives() {

        refreshBtn.disabled = true;

        const original =
            refreshBtn.innerHTML;

        refreshBtn.innerHTML =
            `<span class="btn-icon">↻</span> Refreshing...`;


        setTimeout(() => {

            refreshBtn.disabled = false;
            refreshBtn.innerHTML = original;

            filterDrives();

        }, 550);

    }


    /* =====================================================
       MODAL HELPERS
    ====================================================== */

    function openModal(modal) {

        if (!modal) return;

        modal.hidden = false;

        document.body.classList.add(
            "admin-modal-open"
        );

    }


    function closeModal(modal) {

        if (!modal) return;

        modal.hidden = true;

        if (
            addDriveModal.hidden &&
            detailsModal.hidden
        ) {

            document.body.classList.remove(
                "admin-modal-open"
            );

        }

    }


    /* =====================================================
       ADD DRIVE
    ====================================================== */

    addDriveBtn.addEventListener(
        "click",
        () => {

            openModal(addDriveModal);

        }
    );


    /* =====================================================
       CLOSE MODALS
    ====================================================== */

    document
        .querySelectorAll("[data-close-modal]")
        .forEach(element => {

            element.addEventListener(
                "click",
                () => closeModal(addDriveModal)
            );

        });


    document
        .querySelectorAll("[data-close-details]")
        .forEach(element => {

            element.addEventListener(
                "click",
                () => closeModal(detailsModal)
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

            closeModal(addDriveModal);
            closeModal(detailsModal);

        }
    );


    /* =====================================================
       DRIVE DETAILS
    ====================================================== */

    function showDriveDetails(row) {

        const company =
            row.dataset.company || "Company";

        const role =
            row.dataset.role || "Placement Role";


        const companyElement =
            document.getElementById(
                "detailsCompany"
            );

        const roleElement =
            document.getElementById(
                "detailsRole"
            );


        companyElement.textContent =
            company
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");


        roleElement.textContent =
            role
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");


        const cells =
            row.querySelectorAll("td");


        if (cells.length >= 8) {

            document.getElementById(
                "detailsDate"
            ).textContent =
                cells[2]
                    .querySelector("strong")
                    ?.textContent ||
                "—";


            document.getElementById(
                "detailsDeadline"
            ).textContent =
                cells[3]
                    .textContent
                    .trim() ||
                "—";


            document.getElementById(
                "detailsApplicants"
            ).textContent =
                cells[6]
                    .querySelector("strong")
                    ?.textContent ||
                "0";


            const colleges =
                Array.from(
                    cells[5].querySelectorAll(
                        ".college-tags span"
                    )
                ).map(
                    item => item.textContent.trim()
                );


            const collegeContainer =
                document.getElementById(
                    "detailsColleges"
                );


            collegeContainer.innerHTML = "";


            colleges.forEach(college => {

                const span =
                    document.createElement("span");

                span.textContent =
                    college;

                collegeContainer.appendChild(span);

            });

        }


        openModal(detailsModal);

    }


    /* =====================================================
       ACTION BUTTONS
    ====================================================== */

    tableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".drive-action-btn"
                );


            if (!button) {
                return;
            }


            const row =
                button.closest("tr");


            if (!row) {
                return;
            }


            showDriveDetails(row);

        }
    );


    /* =====================================================
       ADD DRIVE FORM
    ====================================================== */

    addDriveForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(addDriveForm);


            const company =
                formData.get("company");


            if (!company) {
                return;
            }


            /*
             * DB integration will replace this
             * client-side mock behaviour later.
             */

            const submitButton =
                addDriveForm.querySelector(
                    'button[type="submit"]'
                );


            const originalText =
                submitButton.textContent;


            submitButton.disabled = true;
            submitButton.textContent =
                "Creating...";


            setTimeout(() => {

                submitButton.disabled = false;
                submitButton.textContent =
                    originalText;


                addDriveForm.reset();


                addDriveModal.hidden = true;


                document.body.classList.remove(
                    "admin-modal-open"
                );


                /*
                 * Temporary UI feedback.
                 * Actual drive will be inserted
                 * through backend/database later.
                 */

                alert(
                    "Placement drive created successfully."
                );

            }, 500);

        }
    );


    /* =====================================================
       FILTER EVENTS
    ====================================================== */

    searchInput.addEventListener(
        "input",
        filterDrives
    );

    statusFilter.addEventListener(
        "change",
        filterDrives
    );

    modeFilter.addEventListener(
        "change",
        filterDrives
    );

    collegeFilter.addEventListener(
        "change",
        filterDrives
    );

    clearFiltersBtn.addEventListener(
        "click",
        clearFilters
    );

    refreshBtn.addEventListener(
        "click",
        refreshDrives
    );


    /* =====================================================
       PAGINATION DEMO
    ====================================================== */

    document
        .querySelectorAll(".pagination-btn")
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


                    document
                        .querySelectorAll(
                            ".pagination-btn"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    if (
                        button.textContent.trim() !==
                        "‹" &&
                        button.textContent.trim() !==
                        "›"
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );

        });


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterDrives();

});