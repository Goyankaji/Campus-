/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO — STARTUP IDEAS
   FRONTEND UI ONLY

   APPROVAL WORKFLOW

   Student Submission
          ↓
     ┌────┴────┐
     ↓         ↓
    TPO     Authority
     ↓         ↓
     └────┬────┘
          ↓
   Both Approved
          ↓
    FINAL APPROVED

   Database connectivity will be added later.
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           DEMO STARTUP DATA
        ====================================================== */

        let startupRequests = [

            {
                id: "ST001",

                studentName: "Aarav Sharma",

                registrationNo: "PCE2027001",

                enrollmentNo: "ENR2027001",

                campus: "PCE",

                course: "B.Tech",

                branch: "CSE",

                section: "A",

                startupName: "EduBridge",

                ideaTitle: "AI Based Personalized Learning Platform",

                problem:
                    "Students often struggle to identify learning resources according to their individual academic needs.",

                solution:
                    "An AI-powered platform that recommends personalized study material, practice questions and learning paths.",

                businessModel:
                    "Freemium model with premium institutional plans.",

                targetMarket:
                    "College students and educational institutions.",

                stage: "Prototype",

                teamMembers:
                    "Aarav Sharma, Rohan Jain",

                submissionDate: "30 Aug 2026",

                tpoStatus: "pending",

                authorityStatus: "pending",

                finalStatus: "pending",

                tpoRemarks: "",

                authorityRemarks: ""

            },


            {
                id: "ST002",

                studentName: "Priya Mehta",

                registrationNo: "PCE2027003",

                enrollmentNo: "ENR2027003",

                campus: "PCE",

                course: "B.Tech",

                branch: "ECE",

                section: "A",

                startupName: "GreenGrid",

                ideaTitle: "Smart Energy Monitoring System",

                problem:
                    "Small businesses and households have limited visibility into unnecessary energy consumption.",

                solution:
                    "IoT-based energy monitoring with real-time usage analytics and optimization recommendations.",

                businessModel:
                    "Hardware sales with monthly analytics subscription.",

                targetMarket:
                    "Small businesses, hostels and households.",

                stage: "MVP",

                teamMembers:
                    "Priya Mehta, Ananya Gupta",

                submissionDate: "28 Aug 2026",

                tpoStatus: "approved",

                authorityStatus: "pending",

                finalStatus: "pending",

                tpoRemarks:
                    "Startup concept reviewed and approved by TPO.",

                authorityRemarks: ""

            },


            {
                id: "ST003",

                studentName: "Rahul Kumar",

                registrationNo: "PCE2027002",

                enrollmentNo: "ENR2027002",

                campus: "PCET",

                course: "B.Tech",

                branch: "IT",

                section: "B",

                startupName: "CampusCart",

                ideaTitle: "Student Focused Local Commerce Platform",

                problem:
                    "Students find it difficult to discover affordable products and services around campus.",

                solution:
                    "A campus-focused marketplace connecting students with verified local sellers.",

                businessModel:
                    "Transaction commission from participating sellers.",

                targetMarket:
                    "College students and nearby businesses.",

                stage: "Idea",

                teamMembers:
                    "Rahul Kumar",

                submissionDate: "26 Aug 2026",

                tpoStatus: "pending",

                authorityStatus: "approved",

                finalStatus: "pending",

                tpoRemarks: "",

                authorityRemarks:
                    "Reviewed and approved by Authority."

            },


            {
                id: "ST004",

                studentName: "Karan Singh",

                registrationNo: "PCE2027004",

                enrollmentNo: "ENR2027004",

                campus: "PCET",

                course: "B.Tech",

                branch: "ME",

                section: "C",

                startupName: "AgriSense",

                ideaTitle: "Smart Crop Monitoring Solution",

                problem:
                    "Farmers need affordable tools to monitor crop conditions and irrigation requirements.",

                solution:
                    "Low-cost sensors combined with analytics to monitor soil moisture and crop conditions.",

                businessModel:
                    "Device sales and agricultural subscription services.",

                targetMarket:
                    "Small and medium agricultural farms.",

                stage: "Early Stage",

                teamMembers:
                    "Karan Singh, Mohit Verma",

                submissionDate: "24 Aug 2026",

                tpoStatus: "approved",

                authorityStatus: "approved",

                finalStatus: "approved",

                tpoRemarks:
                    "Approved by TPO.",

                authorityRemarks:
                    "Approved by Authority."

            },


            {
                id: "ST005",

                studentName: "Neha Verma",

                registrationNo: "PCE2027005",

                enrollmentNo: "ENR2027005",

                campus: "PCE",

                course: "B.Tech",

                branch: "CSE",

                section: "A",

                startupName: "HealthTrack",

                ideaTitle: "Student Wellness Tracking Platform",

                problem:
                    "Students lack a centralized platform for maintaining healthy routines and wellness activities.",

                solution:
                    "A digital wellness platform providing habit tracking, reminders and campus wellness resources.",

                businessModel:
                    "Premium subscriptions and institutional partnerships.",

                targetMarket:
                    "Students and educational institutions.",

                stage: "Idea",

                teamMembers:
                    "Neha Verma",

                submissionDate: "21 Aug 2026",

                tpoStatus: "rejected",

                authorityStatus: "approved",

                finalStatus: "rejected",

                tpoRemarks:
                    "Additional feasibility details are required before approval.",

                authorityRemarks:
                    "Approved by Authority."

            }

        ];


        /* =====================================================
           ELEMENT REFERENCES
        ====================================================== */

        const tableBody =
            document.getElementById(
                "startupTableBody"
            );


        const searchInput =
            document.getElementById(
                "startupSearch"
            );


        const statusFilter =
            document.getElementById(
                "startupStatusFilter"
            );


        const stageFilter =
            document.getElementById(
                "startupStageFilter"
            );


        const resetButton =
            document.getElementById(
                "resetStartupFilters"
            );


        const totalStartups =
            document.getElementById(
                "totalStartups"
            );


        const tpoPendingStartups =
            document.getElementById(
                "tpoPendingStartups"
            );


        const authorityPendingStartups =
            document.getElementById(
                "authorityPendingStartups"
            );


        const approvedStartups =
            document.getElementById(
                "approvedStartups"
            );


        const startupCount =
            document.getElementById(
                "startupCount"
            );


        /* =====================================================
           DETAILS MODAL
        ====================================================== */

        const detailsModal =
            document.getElementById(
                "startupDetailsModal"
            );


        const detailsBody =
            document.getElementById(
                "startupDetailsBody"
            );


        const closeDetails =
            document.getElementById(
                "closeStartupDetails"
            );


        const closeDetailsBottom =
            document.getElementById(
                "closeStartupDetailsBottom"
            );


        /* =====================================================
           REJECT MODAL
        ====================================================== */

        const rejectModal =
            document.getElementById(
                "startupRejectModal"
            );


        const rejectReason =
            document.getElementById(
                "startupRejectReason"
            );


        const closeReject =
            document.getElementById(
                "closeStartupReject"
            );


        const cancelReject =
            document.getElementById(
                "cancelStartupReject"
            );


        const confirmReject =
            document.getElementById(
                "confirmStartupReject"
            );


        let selectedRequestId = null;


        /* =====================================================
           INITIAL RENDER
        ====================================================== */

        renderStartups();


        /* =====================================================
           RENDER STARTUPS
        ====================================================== */

        function renderStartups() {

            if (!tableBody) {
                return;
            }


            const filtered =
                getFilteredStartups();


            tableBody.innerHTML = "";


            if (filtered.length === 0) {

                tableBody.innerHTML = `

                    <tr class="startup-empty-row">

                        <td colspan="9">

                            <div class="startup-empty-state">

                                <div class="startup-empty-icon">
                                    ◆
                                </div>

                                <strong>
                                    No startup submissions found
                                </strong>

                                <span>
                                    Try changing your search
                                    or filters.
                                </span>

                            </div>

                        </td>

                    </tr>

                `;

            }
            else {

                filtered.forEach(
                    function (request) {

                        tableBody.appendChild(
                            createStartupRow(
                                request
                            )
                        );

                    }
                );

            }


            updateStatistics();

        }


        /* =====================================================
           CREATE TABLE ROW
        ====================================================== */

        function createStartupRow(
            request
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.dataset.id =
                request.id;


            const initials =
                getInitials(
                    request.studentName
                );


            row.innerHTML = `

                <!-- STUDENT -->

                <td>

                    <div class="startup-student">

                        <div class="startup-avatar">
                            ${initials}
                        </div>

                        <div>

                            <strong>
                                ${escapeHtml(
                                    request.studentName
                                )}
                            </strong>

                            <span>
                                ${escapeHtml(
                                    request.campus
                                )}
                                ·
                                ${escapeHtml(
                                    request.branch
                                )}
                            </span>

                        </div>

                    </div>

                </td>


                <!-- REGISTRATION -->

                <td>
                    ${escapeHtml(
                        request.registrationNo
                    )}
                </td>


                <!-- STARTUP -->

                <td>

                    <div class="startup-name">

                        <strong>
                            ${escapeHtml(
                                request.startupName
                            )}
                        </strong>

                        <span>
                            ${escapeHtml(
                                request.ideaTitle
                            )}
                        </span>

                    </div>

                </td>


                <!-- STAGE -->

                <td>

                    <span class="startup-stage">
                        ${escapeHtml(
                            request.stage
                        )}
                    </span>

                </td>


                <!-- DATE -->

                <td>
                    ${escapeHtml(
                        request.submissionDate
                    )}
                </td>


                <!-- TPO -->

                <td>
                    ${statusBadge(
                        request.tpoStatus
                    )}
                </td>


                <!-- AUTHORITY -->

                <td>
                    ${statusBadge(
                        request.authorityStatus
                    )}
                </td>


                <!-- FINAL -->

                <td>
                    ${statusBadge(
                        request.finalStatus
                    )}
                </td>


                <!-- ACTIONS -->

                <td>

                    <div class="startup-actions">

                        <button
                            type="button"
                            class="
                                startup-action-btn
                                startup-view-btn
                            "
                            data-action="view"
                            data-id="${request.id}"
                        >
                            View
                        </button>


                        ${
                            request.tpoStatus ===
                            "pending"

                            ?

                            `

                            <button
                                type="button"
                                class="
                                    startup-action-btn
                                    startup-approve-btn
                                "
                                data-action="approve"
                                data-id="${request.id}"
                            >
                                Approve
                            </button>

                            <button
                                type="button"
                                class="
                                    startup-action-btn
                                    startup-reject-btn
                                "
                                data-action="reject"
                                data-id="${request.id}"
                            >
                                Reject
                            </button>

                            `

                            :

                            ""

                        }

                    </div>

                </td>

            `;


            return row;

        }


        /* =====================================================
           STATUS BADGE
        ====================================================== */

        function statusBadge(
            status
        ) {

            const labels = {

                pending:
                    "Pending",

                approved:
                    "Approved",

                rejected:
                    "Rejected"

            };


            return `

                <span
                    class="
                        startup-status
                        ${status}
                    "
                >

                    ${
                        labels[status] ||
                        "Pending"
                    }

                </span>

            `;

        }


        /* =====================================================
           FILTERING
        ====================================================== */

        function getFilteredStartups() {

            const search =
                searchInput
                    ?
                    searchInput.value
                        .trim()
                        .toLowerCase()
                    :
                    "";


            const status =
                statusFilter
                    ?
                    statusFilter.value
                    :
                    "all";


            const stage =
                stageFilter
                    ?
                    stageFilter.value
                    :
                    "all";


            return startupRequests.filter(
                function (request) {


                    /* -----------------------------------------
                       SEARCH
                    ------------------------------------------ */

                    const searchableText = [

                        request.studentName,

                        request.registrationNo,

                        request.enrollmentNo,

                        request.startupName,

                        request.ideaTitle,

                        request.campus,

                        request.branch,

                        request.stage

                    ]
                    .join(" ")
                    .toLowerCase();


                    const matchesSearch =
                        !search ||
                        searchableText.includes(
                            search
                        );


                    /* -----------------------------------------
                       STATUS
                    ------------------------------------------ */

                    let matchesStatus =
                        true;


                    if (
                        status ===
                        "pending_tpo"
                    ) {

                        matchesStatus =
                            request.tpoStatus ===
                            "pending";

                    }


                    else if (
                        status ===
                        "pending_authority"
                    ) {

                        matchesStatus =
                            request.authorityStatus ===
                            "pending";

                    }


                    else if (
                        status ===
                        "approved"
                    ) {

                        matchesStatus =
                            request.finalStatus ===
                            "approved";

                    }


                    else if (
                        status ===
                        "rejected"
                    ) {

                        matchesStatus =
                            request.finalStatus ===
                            "rejected";

                    }


                    /* -----------------------------------------
                       STAGE
                    ------------------------------------------ */

                    const matchesStage =
                        stage === "all" ||
                        request.stage ===
                            stage;


                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesStage
                    );

                }
            );

        }


        /* =====================================================
           SEARCH
        ====================================================== */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                renderStartups
            );

        }


        /* =====================================================
           STATUS FILTER
        ====================================================== */

        if (statusFilter) {

            statusFilter.addEventListener(
                "change",
                renderStartups
            );

        }


        /* =====================================================
           STAGE FILTER
        ====================================================== */

        if (stageFilter) {

            stageFilter.addEventListener(
                "change",
                renderStartups
            );

        }


        /* =====================================================
           RESET
        ====================================================== */

        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function () {

                    if (searchInput) {
                        searchInput.value = "";
                    }

                    if (statusFilter) {
                        statusFilter.value = "all";
                    }

                    if (stageFilter) {
                        stageFilter.value = "all";
                    }

                    renderStartups();

                }
            );

        }


        /* =====================================================
           TABLE ACTIONS
        ====================================================== */

        if (tableBody) {

            tableBody.addEventListener(
                "click",
                function (event) {

                    const button =
                        event.target.closest(
                            "[data-action]"
                        );


                    if (!button) {
                        return;
                    }


                    const action =
                        button.dataset.action;


                    const requestId =
                        button.dataset.id;


                    if (
                        action ===
                        "view"
                    ) {

                        openDetails(
                            requestId
                        );

                    }


                    else if (
                        action ===
                        "approve"
                    ) {

                        approveStartup(
                            requestId
                        );

                    }


                    else if (
                        action ===
                        "reject"
                    ) {

                        openRejectModal(
                            requestId
                        );

                    }

                }
            );

        }


        /* =====================================================
           TPO APPROVE
        ====================================================== */

        function approveStartup(
            requestId
        ) {

            const request =
                findStartup(
                    requestId
                );


            if (!request) {
                return;
            }


            if (
                request.tpoStatus !==
                "pending"
            ) {

                showToast(
                    "This startup has already been processed by TPO."
                );

                return;

            }


            const confirmed =
                window.confirm(

                    "Approve startup idea submitted by " +
                    request.studentName +
                    "?"

                );


            if (!confirmed) {
                return;
            }


            request.tpoStatus =
                "approved";


            request.tpoRemarks =
                "Approved by TPO.";


            calculateFinalStatus(
                request
            );


            renderStartups();


            if (
                request.authorityStatus ===
                "approved"
            ) {

                showToast(
                    "Both approvals completed. Startup is finally approved."
                );

            }
            else {

                showToast(
                    "TPO approved. Waiting for Authority approval."
                );

            }

        }


        /* =====================================================
           FINAL STATUS CALCULATION
        ====================================================== */

        function calculateFinalStatus(
            request
        ) {


            /* ---------------------------------------------
               ANY REJECTION
            ---------------------------------------------- */

            if (
                request.tpoStatus ===
                "rejected" ||

                request.authorityStatus ===
                "rejected"
            ) {

                request.finalStatus =
                    "rejected";

                return;

            }


            /* ---------------------------------------------
               BOTH APPROVED
            ---------------------------------------------- */

            if (
                request.tpoStatus ===
                "approved" &&

                request.authorityStatus ===
                "approved"
            ) {

                request.finalStatus =
                    "approved";

                return;

            }


            /* ---------------------------------------------
               OTHERWISE PENDING
            ---------------------------------------------- */

            request.finalStatus =
                "pending";

        }


        /* =====================================================
           REJECT MODAL
        ====================================================== */

        function openRejectModal(
            requestId
        ) {

            selectedRequestId =
                requestId;


            if (rejectReason) {

                rejectReason.value =
                    "";

            }


            if (rejectModal) {

                rejectModal.style.display =
                    "block";

            }

        }


        function closeRejectModal() {

            selectedRequestId =
                null;


            if (rejectModal) {

                rejectModal.style.display =
                    "none";

            }

        }


        if (closeReject) {

            closeReject.addEventListener(
                "click",
                closeRejectModal
            );

        }


        if (cancelReject) {

            cancelReject.addEventListener(
                "click",
                closeRejectModal
            );

        }


        /* =====================================================
           CONFIRM REJECT
        ====================================================== */

        if (confirmReject) {

            confirmReject.addEventListener(
                "click",
                function () {


                    if (!selectedRequestId) {
                        return;
                    }


                    const reason =
                        rejectReason
                            ?
                            rejectReason.value
                                .trim()
                            :
                            "";


                    if (!reason) {

                        alert(
                            "Please enter a rejection reason."
                        );

                        return;

                    }


                    const request =
                        findStartup(
                            selectedRequestId
                        );


                    if (!request) {

                        closeRejectModal();

                        return;

                    }


                    request.tpoStatus =
                        "rejected";


                    request.tpoRemarks =
                        reason;


                    calculateFinalStatus(
                        request
                    );


                    closeRejectModal();


                    renderStartups();


                    showToast(
                        "Startup idea rejected by TPO."
                    );

                }
            );

        }


        /* =====================================================
           DETAILS MODAL
        ====================================================== */

        function openDetails(
            requestId
        ) {

            const request =
                findStartup(
                    requestId
                );


            if (
                !request ||
                !detailsModal
            ) {

                return;

            }


            if (detailsBody) {

                detailsBody.innerHTML = `

                    <div class="startup-detail-grid">


                        <div class="startup-detail-item">

                            <span>
                                STUDENT
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.studentName
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                REGISTRATION NO.
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.registrationNo
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                ENROLLMENT NO.
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.enrollmentNo
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                CAMPUS
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.campus
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                COURSE
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.course
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                BRANCH
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.branch
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                STARTUP NAME
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.startupName
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                STAGE
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.stage
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item full">

                            <span>
                                IDEA TITLE
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.ideaTitle
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item full">

                            <span>
                                PROBLEM STATEMENT
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.problem
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item full">

                            <span>
                                PROPOSED SOLUTION
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.solution
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item full">

                            <span>
                                BUSINESS MODEL
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.businessModel
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item full">

                            <span>
                                TARGET MARKET
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.targetMarket
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item full">

                            <span>
                                TEAM MEMBERS
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.teamMembers
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                SUBMISSION DATE
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.submissionDate
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                TPO STATUS
                            </span>

                            <strong>
                                ${statusBadge(
                                    request.tpoStatus
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                AUTHORITY STATUS
                            </span>

                            <strong>
                                ${statusBadge(
                                    request.authorityStatus
                                )}
                            </strong>

                        </div>


                        <div class="startup-detail-item">

                            <span>
                                FINAL STATUS
                            </span>

                            <strong>
                                ${statusBadge(
                                    request.finalStatus
                                )}
                            </strong>

                        </div>


                        ${
                            request.tpoRemarks

                            ?

                            `

                            <div class="startup-detail-item full">

                                <span>
                                    TPO REMARKS
                                </span>

                                <strong>
                                    ${escapeHtml(
                                        request.tpoRemarks
                                    )}
                                </strong>

                            </div>

                            `

                            :

                            ""

                        }


                        ${
                            request.authorityRemarks

                            ?

                            `

                            <div class="startup-detail-item full">

                                <span>
                                    AUTHORITY REMARKS
                                </span>

                                <strong>
                                    ${escapeHtml(
                                        request.authorityRemarks
                                    )}
                                </strong>

                            </div>

                            `

                            :

                            ""

                        }

                    </div>

                `;

            }


            detailsModal.style.display =
                "block";

        }


        /* =====================================================
           CLOSE DETAILS
        ====================================================== */

        function closeDetailsModal() {

            if (detailsModal) {

                detailsModal.style.display =
                    "none";

            }

        }


        if (closeDetails) {

            closeDetails.addEventListener(
                "click",
                closeDetailsModal
            );

        }


        if (closeDetailsBottom) {

            closeDetailsBottom.addEventListener(
                "click",
                closeDetailsModal
            );

        }


        /* =====================================================
           MODAL OVERLAY
        ====================================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "startup-modal-overlay"
                    )
                ) {

                    closeDetailsModal();

                    closeRejectModal();

                }

            }
        );


        /* =====================================================
           ESCAPE KEY
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeDetailsModal();

                    closeRejectModal();

                }

            }
        );


        /* =====================================================
           STATISTICS
        ====================================================== */

        function updateStatistics() {

            if (totalStartups) {

                totalStartups.textContent =
                    startupRequests.length;

            }


            if (tpoPendingStartups) {

                tpoPendingStartups.textContent =
                    startupRequests.filter(
                        function (request) {

                            return (
                                request.tpoStatus ===
                                "pending"
                            );

                        }
                    ).length;

            }


            if (authorityPendingStartups) {

                authorityPendingStartups.textContent =
                    startupRequests.filter(
                        function (request) {

                            return (
                                request.authorityStatus ===
                                "pending"
                            );

                        }
                    ).length;

            }


            if (approvedStartups) {

                approvedStartups.textContent =
                    startupRequests.filter(
                        function (request) {

                            return (
                                request.finalStatus ===
                                "approved"
                            );

                        }
                    ).length;

            }


            if (startupCount) {

                const count =
                    getFilteredStartups().length;


                startupCount.textContent =

                    "Showing " +
                    count +
                    " request" +
                    (
                        count === 1
                            ? ""
                            : "s"
                    );

            }

        }


        /* =====================================================
           FIND STARTUP
        ====================================================== */

        function findStartup(
            requestId
        ) {

            return startupRequests.find(
                function (request) {

                    return (
                        request.id ===
                        requestId
                    );

                }
            );

        }


        /* =====================================================
           INITIALS
        ====================================================== */

        function getInitials(
            name
        ) {

            return String(
                name || "NA"
            )
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(
                function (part) {

                    return part
                        .charAt(0)
                        .toUpperCase();

                }
            )
            .join("");

        }


        /* =====================================================
           ESCAPE HTML
        ====================================================== */

        function escapeHtml(
            value
        ) {

            return String(
                value ?? ""
            )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

        }


        /* =====================================================
           TOAST
        ====================================================== */

        function showToast(
            message
        ) {

            const oldToast =
                document.getElementById(
                    "startupToast"
                );


            if (oldToast) {
                oldToast.remove();
            }


            const toast =
                document.createElement(
                    "div"
                );


            toast.id =
                "startupToast";


            toast.textContent =
                message;


            toast.style.position =
                "fixed";

            toast.style.right =
                "24px";

            toast.style.bottom =
                "24px";

            toast.style.zIndex =
                "999999";

            toast.style.maxWidth =
                "400px";

            toast.style.padding =
                "13px 17px";

            toast.style.borderRadius =
                "9px";

            toast.style.background =
                "#171c30";

            toast.style.color =
                "#ffffff";

            toast.style.border =
                "1px solid rgba(124,58,237,.35)";

            toast.style.boxShadow =
                "0 15px 40px rgba(0,0,0,.25)";

            toast.style.fontSize =
                "11px";

            toast.style.fontWeight =
                "700";


            document.body.appendChild(
                toast
            );


            setTimeout(
                function () {

                    toast.remove();

                },
                3500
            );

        }


        /* =====================================================
           DEBUG ACCESS
        ====================================================== */

        window.tpoStartupRequests =
            startupRequests;


        console.log(
            "TPO Startup Ideas frontend loaded successfully."
        );

    }
);