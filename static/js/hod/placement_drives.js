/* =========================================================
   CAMPUS HOD PORTAL
   PLACEMENT DRIVES JS
   STATIC VERSION
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           STATIC DRIVE DATA
        ================================================== */

        const drives = [

            {
                id: 1,
                company: "Tata Consultancy Services",
                shortName: "TCS",
                role: "Software Engineer",
                location: "Jaipur",
                driveDate: "2026-08-25",
                deadline: "2026-08-22",
                mode: "on-campus",
                modeLabel: "On Campus",
                eligible: 120,
                applicants: 82,
                package: "₹ 6.20 LPA",
                status: "active",
                statusLabel: "Active"
            },


            {
                id: 2,
                company: "Infosys",
                shortName: "INF",
                role: "System Engineer",
                location: "Jaipur",
                driveDate: "2026-08-30",
                deadline: "2026-08-27",
                mode: "on-campus",
                modeLabel: "On Campus",
                eligible: 105,
                applicants: 74,
                package: "₹ 6.50 LPA",
                status: "active",
                statusLabel: "Active"
            },


            {
                id: 3,
                company: "Wipro",
                shortName: "WIP",
                role: "Project Engineer",
                location: "Jaipur",
                driveDate: "2026-09-02",
                deadline: "2026-08-30",
                mode: "hybrid",
                modeLabel: "Hybrid",
                eligible: 98,
                applicants: 61,
                package: "₹ 5.80 LPA",
                status: "upcoming",
                statusLabel: "Upcoming"
            },


            {
                id: 4,
                company: "Accenture",
                shortName: "ACC",
                role: "Associate Software Engineer",
                location: "Online",
                driveDate: "2026-09-05",
                deadline: "2026-09-02",
                mode: "online",
                modeLabel: "Online",
                eligible: 115,
                applicants: 69,
                package: "₹ 7.10 LPA",
                status: "upcoming",
                statusLabel: "Upcoming"
            },


            {
                id: 5,
                company: "Deloitte",
                shortName: "DEL",
                role: "Analyst",
                location: "Gurugram",
                driveDate: "2026-09-08",
                deadline: "2026-09-05",
                mode: "on-campus",
                modeLabel: "On Campus",
                eligible: 92,
                applicants: 48,
                package: "₹ 7.50 LPA",
                status: "upcoming",
                statusLabel: "Upcoming"
            },


            {
                id: 6,
                company: "Cognizant",
                shortName: "COG",
                role: "Programmer Analyst",
                location: "Jaipur",
                driveDate: "2026-08-18",
                deadline: "2026-08-15",
                mode: "on-campus",
                modeLabel: "On Campus",
                eligible: 110,
                applicants: 88,
                package: "₹ 5.40 LPA",
                status: "completed",
                statusLabel: "Completed"
            },


            {
                id: 7,
                company: "Capgemini",
                shortName: "CAP",
                role: "Analyst",
                location: "Pune",
                driveDate: "2026-08-12",
                deadline: "2026-08-09",
                mode: "hybrid",
                modeLabel: "Hybrid",
                eligible: 100,
                applicants: 72,
                package: "₹ 5.75 LPA",
                status: "completed",
                statusLabel: "Completed"
            },


            {
                id: 8,
                company: "Tech Mahindra",
                shortName: "TM",
                role: "Software Associate",
                location: "Jaipur",
                driveDate: "2026-08-10",
                deadline: "2026-08-07",
                mode: "on-campus",
                modeLabel: "On Campus",
                eligible: 86,
                applicants: 57,
                package: "₹ 4.50 LPA",
                status: "completed",
                statusLabel: "Completed"
            },


            {
                id: 9,
                company: "HCLTech",
                shortName: "HCL",
                role: "Graduate Engineer",
                location: "Noida",
                driveDate: "2026-09-12",
                deadline: "2026-09-09",
                mode: "online",
                modeLabel: "Online",
                eligible: 90,
                applicants: 41,
                package: "₹ 5.00 LPA",
                status: "upcoming",
                statusLabel: "Upcoming"
            },


            {
                id: 10,
                company: "IBM",
                shortName: "IBM",
                role: "Associate Developer",
                location: "Bengaluru",
                driveDate: "2026-09-15",
                deadline: "2026-09-12",
                mode: "online",
                modeLabel: "Online",
                eligible: 76,
                applicants: 35,
                package: "₹ 7.20 LPA",
                status: "upcoming",
                statusLabel: "Upcoming"
            },


            {
                id: 11,
                company: "Persistent Systems",
                shortName: "PS",
                role: "Software Engineer",
                location: "Pune",
                driveDate: "2026-08-28",
                deadline: "2026-08-25",
                mode: "hybrid",
                modeLabel: "Hybrid",
                eligible: 82,
                applicants: 55,
                package: "₹ 6.00 LPA",
                status: "active",
                statusLabel: "Active"
            },


            {
                id: 12,
                company: "LTIMindtree",
                shortName: "LTI",
                role: "Graduate Engineer Trainee",
                location: "Mumbai",
                driveDate: "2026-08-29",
                deadline: "2026-08-26",
                mode: "on-campus",
                modeLabel: "On Campus",
                eligible: 94,
                applicants: 62,
                package: "₹ 5.50 LPA",
                status: "active",
                statusLabel: "Active"
            }

        ];


        /* =================================================
           ELEMENTS
        ================================================== */

        const tableBody =
            document.getElementById(
                "drivesTableBody"
            );


        const searchInput =
            document.getElementById(
                "driveSearch"
            );


        const statusFilter =
            document.getElementById(
                "driveStatusFilter"
            );


        const modeFilter =
            document.getElementById(
                "driveModeFilter"
            );


        const clearButton =
            document.getElementById(
                "clearDriveFilters"
            );


        const refreshButton =
            document.getElementById(
                "refreshDrivesBtn"
            );


        const emptyState =
            document.getElementById(
                "drivesEmptyState"
            );


        const visibleCount =
            document.getElementById(
                "visibleDriveCount"
            );


        const footerText =
            document.getElementById(
                "driveFooterText"
            );


        /* =================================================
           MODAL
        ================================================== */

        const modal =
            document.getElementById(
                "driveModal"
            );


        const modalOverlay =
            document.getElementById(
                "driveModalOverlay"
            );


        const closeModalButton =
            document.getElementById(
                "closeDriveModal"
            );


        const modalCompany =
            document.getElementById(
                "modalCompany"
            );


        const modalRole =
            document.getElementById(
                "modalRole"
            );


        const modalStatus =
            document.getElementById(
                "modalStatus"
            );


        const modalDriveDate =
            document.getElementById(
                "modalDriveDate"
            );


        const modalDeadline =
            document.getElementById(
                "modalDeadline"
            );


        const modalMode =
            document.getElementById(
                "modalMode"
            );


        const modalLocation =
            document.getElementById(
                "modalLocation"
            );


        const modalEligible =
            document.getElementById(
                "modalEligible"
            );


        const modalApplicants =
            document.getElementById(
                "modalApplicants"
            );


        const modalPackage =
            document.getElementById(
                "modalPackage"
            );


        /* =================================================
           SAFE HTML
        ================================================== */

        function escapeHTML(value) {

            return String(value)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        }


        /* =================================================
           DATE FORMAT
        ================================================== */

        function formatDate(dateString) {

            if (!dateString) {
                return "-";
            }

            const date =
                new Date(
                    dateString + "T00:00:00"
                );


            return date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        }


        /* =================================================
           RENDER
        ================================================== */

        function renderDrives() {

            const search =
                searchInput
                    ? searchInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const status =
                statusFilter
                    ? statusFilter.value
                    : "all";


            const mode =
                modeFilter
                    ? modeFilter.value
                    : "all";


            const filtered =
                drives.filter(
                    drive => {

                        const matchesSearch =
                            !search ||
                            drive.company
                                .toLowerCase()
                                .includes(search) ||
                            drive.role
                                .toLowerCase()
                                .includes(search);


                        const matchesStatus =
                            status === "all" ||
                            drive.status === status;


                        const matchesMode =
                            mode === "all" ||
                            drive.mode === mode;


                        return (
                            matchesSearch &&
                            matchesStatus &&
                            matchesMode
                        );

                    }
                );


            tableBody.innerHTML = "";


            filtered.forEach(
                (drive, index) => {

                    const row =
                        document.createElement(
                            "tr"
                        );


                    row.innerHTML = `

                        <td>
                            ${String(index + 1)
                                .padStart(2, "0")}
                        </td>


                        <td>

                            <div class="drive-company">

                                <div class="company-logo">
                                    ${escapeHTML(
                                        drive.shortName
                                    )}
                                </div>

                                <div>

                                    <strong>
                                        ${escapeHTML(
                                            drive.company
                                        )}
                                    </strong>

                                    <small>
                                        IT Department
                                    </small>

                                </div>

                            </div>

                        </td>


                        <td>

                            <div class="drive-role">

                                <strong>
                                    ${escapeHTML(
                                        drive.role
                                    )}
                                </strong>

                                <small>
                                    ${escapeHTML(
                                        drive.location
                                    )}
                                </small>

                            </div>

                        </td>


                        <td>

                            <strong>
                                ${formatDate(
                                    drive.driveDate
                                )}
                            </strong>

                        </td>


                        <td>

                            <span>
                                ${formatDate(
                                    drive.deadline
                                )}
                            </span>

                        </td>


                        <td>

                            <span
                                class="drive-mode ${escapeHTML(
                                    drive.mode
                                )}"
                            >
                                ${escapeHTML(
                                    drive.modeLabel
                                )}
                            </span>

                        </td>


                        <td>

                            <strong>
                                ${drive.eligible}
                            </strong>

                        </td>


                        <td>

                            <strong>
                                ${drive.applicants}
                            </strong>

                        </td>


                        <td>

                            <strong>
                                ${escapeHTML(
                                    drive.package
                                )}
                            </strong>

                        </td>


                        <td>

                            <span
                                class="drive-status ${escapeHTML(
                                    drive.status
                                )}"
                            >
                                ${escapeHTML(
                                    drive.statusLabel
                                )}
                            </span>

                        </td>


                        <td>

                            <button
                                type="button"
                                class="drive-view-btn"
                                data-drive-id="${drive.id}"
                            >
                                View
                            </button>

                        </td>

                    `;


                    tableBody.appendChild(
                        row
                    );

                }
            );


            if (visibleCount) {

                visibleCount.textContent =
                    filtered.length;

            }


            if (footerText) {

                footerText.textContent =
                    filtered.length === 0
                        ? "No placement drives found"
                        : `Showing ${filtered.length} placement drive${filtered.length === 1 ? "" : "s"}`;

            }


            if (emptyState) {

                emptyState.classList.toggle(
                    "show",
                    filtered.length === 0
                );

            }

        }


        /* =================================================
           MODAL OPEN
        ================================================== */

        function openDriveModal(
            driveId
        ) {

            const drive =
                drives.find(
                    item =>
                        item.id ===
                        Number(driveId)
                );


            if (!drive || !modal) {
                return;
            }


            modalCompany.textContent =
                drive.company;


            modalRole.textContent =
                drive.role;


            modalStatus.textContent =
                drive.statusLabel;


            modalDriveDate.textContent =
                formatDate(
                    drive.driveDate
                );


            modalDeadline.textContent =
                formatDate(
                    drive.deadline
                );


            modalMode.textContent =
                drive.modeLabel;


            modalLocation.textContent =
                drive.location;


            modalEligible.textContent =
                drive.eligible;


            modalApplicants.textContent =
                drive.applicants;


            modalPackage.textContent =
                drive.package;


            modal.classList.add(
                "show"
            );


            document.body.style.overflow =
                "hidden";

        }


        /* =================================================
           MODAL CLOSE
        ================================================== */

        function closeDriveModal() {

            if (!modal) {
                return;
            }


            modal.classList.remove(
                "show"
            );


            document.body.style.overflow =
                "";

        }


        /* =================================================
           TABLE ACTION
        ================================================== */

        tableBody.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        ".drive-view-btn"
                    );


                if (!button) {
                    return;
                }


                openDriveModal(
                    button.dataset.driveId
                );

            }
        );


        /* =================================================
           FILTERS
        ================================================== */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                renderDrives
            );

        }


        if (statusFilter) {

            statusFilter.addEventListener(
                "change",
                renderDrives
            );

        }


        if (modeFilter) {

            modeFilter.addEventListener(
                "change",
                renderDrives
            );

        }


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                function () {

                    if (searchInput) {
                        searchInput.value = "";
                    }

                    if (statusFilter) {
                        statusFilter.value = "all";
                    }

                    if (modeFilter) {
                        modeFilter.value = "all";
                    }

                    renderDrives();

                }
            );

        }


        /* =================================================
           REFRESH
           STATIC PAGE = RE-RENDER
        ================================================== */

        if (refreshButton) {

            refreshButton.addEventListener(
                "click",
                function () {

                    const originalHTML =
                        refreshButton.innerHTML;


                    refreshButton.disabled =
                        true;


                    refreshButton.innerHTML =
                        `
                        <span>↻</span>
                        Refreshing...
                        `;


                    setTimeout(
                        function () {

                            renderDrives();


                            refreshButton.disabled =
                                false;


                            refreshButton.innerHTML =
                                originalHTML;

                        },
                        350
                    );

                }
            );

        }


        /* =================================================
           MODAL EVENTS
        ================================================== */

        if (closeModalButton) {

            closeModalButton.addEventListener(
                "click",
                closeDriveModal
            );

        }


        if (modalOverlay) {

            modalOverlay.addEventListener(
                "click",
                closeDriveModal
            );

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    modal &&
                    modal.classList.contains("show")
                ) {

                    closeDriveModal();

                }

            }
        );


        /* =================================================
           INITIALIZE
        ================================================== */

        renderDrives();

    }
);