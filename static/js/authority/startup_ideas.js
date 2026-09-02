/* =========================================================
   CAMPUS AUTHORITY — STARTUP IDEAS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const state = {
        records: [],
        filteredRecords: [],
        selectedRecord: null
    };


    /* =====================================================
       SAMPLE DATA
    ===================================================== */

    state.records = [
        {
            id: "SI-001",
            student: "Rahul Sharma",
            registration: "21PCECS001",
            branch: "CSE",
            email: "rahul.sharma@student.campus.edu",
            phone: "+91 98765 10001",

            idea: "AI Powered Campus Assistant",
            description:
                "An AI based assistant to help students with academic information, placement updates and campus services.",

            category: "technology",
            categoryLabel: "Technology",
            stage: "mvp",
            stageLabel: "MVP",

            date: "18 Aug 2026",

            tpo: "pending",
            authority: "pending",

            founderRole: "Founder",
            teamSize: "3 Students",
            mentor: "Faculty Mentor — CSE",

            problem:
                "Students spend significant time searching for academic and placement related information.",

            solution:
                "A centralized AI assistant that provides verified campus information through a conversational interface."
        },

        {
            id: "SI-002",
            student: "Priya Verma",
            registration: "21PCEAI014",
            branch: "AIML",
            email: "priya.verma@student.campus.edu",
            phone: "+91 98765 10002",

            idea: "Smart Finance for Students",
            description:
                "A personal finance management platform designed specifically for college students.",

            category: "fintech",
            categoryLabel: "FinTech",
            stage: "prototype",
            stageLabel: "Prototype",

            date: "16 Aug 2026",

            tpo: "approved",
            authority: "pending",

            founderRole: "Co-Founder",
            teamSize: "2 Students",
            mentor: "Faculty Mentor — AIML",

            problem:
                "Students often struggle to track expenses and manage limited monthly budgets.",

            solution:
                "A simple student-focused finance application for expense tracking, budgeting and financial insights."
        },

        {
            id: "SI-003",
            student: "Aman Gupta",
            registration: "21PCEEC022",
            branch: "ECE",
            email: "aman.gupta@student.campus.edu",
            phone: "+91 98765 10003",

            idea: "IoT Based Smart Agriculture",
            description:
                "An IoT solution for monitoring soil conditions and optimizing irrigation.",

            category: "technology",
            categoryLabel: "Technology",
            stage: "prototype",
            stageLabel: "Prototype",

            date: "14 Aug 2026",

            tpo: "pending",
            authority: "approved",

            founderRole: "Founder",
            teamSize: "4 Students",
            mentor: "Faculty Mentor — ECE",

            problem:
                "Traditional irrigation methods can lead to excessive water consumption.",

            solution:
                "IoT sensors monitor soil moisture and environmental conditions to automate irrigation decisions."
        },

        {
            id: "SI-004",
            student: "Neha Singh",
            registration: "21PCEIT031",
            branch: "IT",
            email: "neha.singh@student.campus.edu",
            phone: "+91 98765 10004",

            idea: "Student Mental Wellness Platform",
            description:
                "A digital platform connecting students with wellness resources and support services.",

            category: "healthtech",
            categoryLabel: "HealthTech",
            stage: "early-stage",
            stageLabel: "Early Stage",

            date: "11 Aug 2026",

            tpo: "approved",
            authority: "approved",

            founderRole: "Founder",
            teamSize: "5 Students",
            mentor: "Faculty Mentor — IT",

            problem:
                "Students may find it difficult to access appropriate wellness resources and support.",

            solution:
                "A centralized platform providing verified wellness resources, appointment discovery and support information."
        },

        {
            id: "SI-005",
            student: "Karan Mehta",
            registration: "21PCEME047",
            branch: "ME",
            email: "karan.mehta@student.campus.edu",
            phone: "+91 98765 10005",

            idea: "Affordable EV Conversion Kits",
            description:
                "Low-cost electric conversion kits for small personal vehicles.",

            category: "technology",
            categoryLabel: "Technology",
            stage: "idea",
            stageLabel: "Idea",

            date: "08 Aug 2026",

            tpo: "rejected",
            authority: "pending",

            founderRole: "Founder",
            teamSize: "2 Students",
            mentor: "Faculty Mentor — ME",

            problem:
                "Electric mobility conversion can be expensive for individual vehicle owners.",

            solution:
                "Develop modular conversion kits designed to reduce conversion costs for compatible vehicles."
        },

        {
            id: "SI-006",
            student: "Simran Joshi",
            registration: "21PCECS058",
            branch: "CSE",
            email: "simran.joshi@student.campus.edu",
            phone: "+91 98765 10006",

            idea: "Local Artisan Marketplace",
            description:
                "An online marketplace connecting local artisans directly with customers.",

            category: "social",
            categoryLabel: "Social Impact",
            stage: "idea",
            stageLabel: "Idea",

            date: "05 Aug 2026",

            tpo: "pending",
            authority: "rejected",

            founderRole: "Co-Founder",
            teamSize: "3 Students",
            mentor: "Faculty Mentor — CSE",

            problem:
                "Local artisans often have limited access to digital marketplaces and larger customer groups.",

            solution:
                "A curated marketplace allowing artisans to showcase products and connect directly with customers."
        }
    ];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const elements = {
        total: document.getElementById("totalStartupIdeas"),
        pending: document.getElementById("pendingStartupIdeas"),
        approved: document.getElementById("approvedStartupIdeas"),
        rejected: document.getElementById("rejectedStartupIdeas"),

        search: document.getElementById("startupIdeasSearch"),
        status: document.getElementById("startupIdeasStatus"),
        type: document.getElementById("startupIdeasType"),
        stage: document.getElementById("startupIdeasStage"),
        reset: document.getElementById("startupIdeasReset"),

        tableBody: document.getElementById("startupIdeasTableBody"),
        resultCount: document.getElementById("startupIdeasResultCount"),

        exportButton: document.getElementById("exportStartupIdeas"),

        detailsModal: document.getElementById("startupIdeasDetailsModal"),
        detailsBody: document.getElementById("startupIdeasDetailsBody"),
        closeDetails: document.getElementById("closeStartupIdeasDetails"),
        closeDetailsBottom:
            document.getElementById("closeStartupIdeasDetailsBottom"),

        rejectModal: document.getElementById("startupIdeasRejectModal"),
        rejectReason: document.getElementById("startupIdeasRejectReason"),
        closeReject: document.getElementById("closeStartupIdeasReject"),
        cancelReject: document.getElementById("cancelStartupIdeasReject"),
        confirmReject: document.getElementById("confirmStartupIdeasReject")
    };


    /* =====================================================
       FINAL STATUS
       TPO + AUTHORITY BOTH REQUIRED
    ===================================================== */

    function getFinalStatus(record) {

        if (
            record.tpo === "rejected" ||
            record.authority === "rejected"
        ) {
            return "rejected";
        }

        if (
            record.tpo === "approved" &&
            record.authority === "approved"
        ) {
            return "approved";
        }

        return "pending";
    }


    /* =====================================================
       STATUS LABEL
    ===================================================== */

    function getStatusLabel(status) {

        const labels = {
            pending: "Pending",
            approved: "Approved",
            rejected: "Rejected"
        };

        return labels[status] || status;
    }


    /* =====================================================
       CAPITALIZE
    ===================================================== */

    function capitalize(value) {

        if (!value) {
            return "";
        }

        return value
            .replace(/-/g, " ")
            .replace(/\b\w/g, function (char) {
                return char.toUpperCase();
            });
    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initialize() {

        updateSummary();
        applyFilters();
        bindEvents();

    }


    /* =====================================================
       SUMMARY
    ===================================================== */

    function updateSummary() {

        let pending = 0;
        let approved = 0;
        let rejected = 0;

        state.records.forEach(function (record) {

            const finalStatus = getFinalStatus(record);

            if (finalStatus === "pending") {
                pending++;
            }

            if (finalStatus === "approved") {
                approved++;
            }

            if (finalStatus === "rejected") {
                rejected++;
            }

        });

        if (elements.total) {
            elements.total.textContent = state.records.length;
        }

        if (elements.pending) {
            elements.pending.textContent = pending;
        }

        if (elements.approved) {
            elements.approved.textContent = approved;
        }

        if (elements.rejected) {
            elements.rejected.textContent = rejected;
        }

    }


    /* =====================================================
       FILTERS
    ===================================================== */

    function applyFilters() {

        const searchValue =
            elements.search
                ? elements.search.value.trim().toLowerCase()
                : "";

        const statusValue =
            elements.status
                ? elements.status.value
                : "all";

        const typeValue =
            elements.type
                ? elements.type.value
                : "all";

        const stageValue =
            elements.stage
                ? elements.stage.value
                : "all";


        state.filteredRecords = state.records.filter(function (record) {

            const finalStatus = getFinalStatus(record);


            const matchesSearch =
                !searchValue ||
                record.student.toLowerCase().includes(searchValue) ||
                record.registration.toLowerCase().includes(searchValue) ||
                record.branch.toLowerCase().includes(searchValue) ||
                record.idea.toLowerCase().includes(searchValue) ||
                record.categoryLabel.toLowerCase().includes(searchValue);


            const matchesStatus =
                statusValue === "all" ||
                finalStatus === statusValue;


            const matchesType =
                typeValue === "all" ||
                record.category === typeValue;


            const matchesStage =
                stageValue === "all" ||
                record.stage === stageValue;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesType &&
                matchesStage
            );

        });


        renderTable();

    }


    /* =====================================================
       RENDER TABLE
    ===================================================== */

    function renderTable() {

        if (!elements.tableBody) {
            return;
        }


        if (state.filteredRecords.length === 0) {

            elements.tableBody.innerHTML = `
                <tr>
                    <td colspan="11">
                        <div style="
                            padding: 35px 15px;
                            text-align: center;
                            color: #9ca3af;
                            font-size: 11px;
                        ">
                            No startup ideas found.
                        </div>
                    </td>
                </tr>
            `;

        } else {

            elements.tableBody.innerHTML =
                state.filteredRecords
                    .map(renderRow)
                    .join("");

        }


        if (elements.resultCount) {

            const count = state.filteredRecords.length;

            elements.resultCount.textContent =
                `Showing ${count} ${count === 1 ? "idea" : "ideas"}`;

        }

    }


    /* =====================================================
       RENDER ROW
    ===================================================== */

    function renderRow(record) {

        const finalStatus = getFinalStatus(record);

        const initials = getInitials(record.student);


        return `
            <tr>

                <td>
                    <div class="student-cell">

                        <div class="student-avatar">
                            ${initials}
                        </div>

                        <div class="student-info">

                            <strong>
                                ${escapeHtml(record.student)}
                            </strong>

                            <small>
                                ${escapeHtml(record.email)}
                            </small>

                        </div>

                    </div>
                </td>


                <td>
                    ${escapeHtml(record.registration)}
                </td>


                <td>
                    ${escapeHtml(record.branch)}
                </td>


                <td>

                    <div class="idea-cell">

                        <strong title="${escapeAttribute(record.idea)}">
                            ${escapeHtml(record.idea)}
                        </strong>

                        <small title="${escapeAttribute(record.description)}">
                            ${escapeHtml(record.description)}
                        </small>

                    </div>

                </td>


                <td>

                    <span class="category-badge">
                        ${escapeHtml(record.categoryLabel)}
                    </span>

                </td>


                <td>

                    <span class="stage-badge">
                        ${escapeHtml(record.stageLabel)}
                    </span>

                </td>


                <td>
                    ${escapeHtml(record.date)}
                </td>


                <td>

                    <span class="status-badge ${record.tpo}">
                        ${getStatusLabel(record.tpo)}
                    </span>

                </td>


                <td>

                    <span class="status-badge ${record.authority}">
                        ${getStatusLabel(record.authority)}
                    </span>

                </td>


                <td>

                    <span class="status-badge ${finalStatus}">
                        ${getStatusLabel(finalStatus)}
                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="action-btn"
                        data-action="view"
                        data-id="${escapeAttribute(record.id)}">

                        View

                    </button>

                </td>

            </tr>
        `;

    }


    /* =====================================================
       VIEW DETAILS
    ===================================================== */

    function openDetails(recordId) {

        const record =
            state.records.find(function (item) {
                return item.id === recordId;
            });


        if (!record || !elements.detailsModal) {
            return;
        }


        state.selectedRecord = record;


        const finalStatus = getFinalStatus(record);


        if (elements.detailsBody) {

            elements.detailsBody.innerHTML = `

                <div class="detail-section">

                    <h3>
                        Student Information
                    </h3>

                    <div class="detail-grid">

                        <div class="detail-item">
                            <span>Student Name</span>
                            <strong>${escapeHtml(record.student)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Registration</span>
                            <strong>${escapeHtml(record.registration)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Branch</span>
                            <strong>${escapeHtml(record.branch)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Email</span>
                            <strong>${escapeHtml(record.email)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Phone</span>
                            <strong>${escapeHtml(record.phone)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Submission Date</span>
                            <strong>${escapeHtml(record.date)}</strong>
                        </div>

                    </div>

                </div>


                <div class="detail-section">

                    <h3>
                        Startup Information
                    </h3>

                    <div class="detail-grid">

                        <div class="detail-item">
                            <span>Startup Idea</span>
                            <strong>${escapeHtml(record.idea)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Category</span>
                            <strong>${escapeHtml(record.categoryLabel)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Current Stage</span>
                            <strong>${escapeHtml(record.stageLabel)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Founder Role</span>
                            <strong>${escapeHtml(record.founderRole)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Team Size</span>
                            <strong>${escapeHtml(record.teamSize)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Mentor</span>
                            <strong>${escapeHtml(record.mentor)}</strong>
                        </div>

                    </div>

                </div>


                <div class="detail-section">

                    <h3>
                        Problem & Solution
                    </h3>

                    <div class="detail-grid">

                        <div class="detail-item">
                            <span>Problem Statement</span>
                            <strong>${escapeHtml(record.problem)}</strong>
                        </div>

                        <div class="detail-item">
                            <span>Proposed Solution</span>
                            <strong>${escapeHtml(record.solution)}</strong>
                        </div>

                    </div>

                </div>


                <div class="detail-section">

                    <h3>
                        Approval Status
                    </h3>

                    <div class="approval-grid">

                        <div class="approval-box ${record.tpo}">

                            <span>
                                TPO Decision
                            </span>

                            <strong>
                                ${getStatusLabel(record.tpo)}
                            </strong>

                        </div>


                        <div class="approval-box ${record.authority}">

                            <span>
                                Authority Decision
                            </span>

                            <strong>
                                ${getStatusLabel(record.authority)}
                            </strong>

                        </div>

                    </div>


                    <div class="final-box">

                        <span>
                            Final Status
                        </span>

                        <strong>
                            ${getStatusLabel(finalStatus)}
                        </strong>

                    </div>


                    <div class="approval-rule-note">

                        Final approval requires both TPO and Authority
                        approval. If either side rejects the idea, the
                        final status becomes Rejected.

                    </div>


                    ${
                        finalStatus === "pending"
                            ? `
                                <div class="authority-actions">

                                    <button
                                        type="button"
                                        class="authority-approve-btn"
                                        id="authorityApproveStartupIdea">

                                        Approve Idea

                                    </button>


                                    <button
                                        type="button"
                                        class="authority-reject-btn"
                                        id="authorityRejectStartupIdea">

                                        Reject Idea

                                    </button>

                                </div>
                            `
                            : ""
                    }

                </div>
            `;


            const approveButton =
                document.getElementById(
                    "authorityApproveStartupIdea"
                );


            const rejectButton =
                document.getElementById(
                    "authorityRejectStartupIdea"
                );


            if (approveButton) {

                approveButton.addEventListener(
                    "click",
                    function () {
                        approveAuthority(record.id);
                    }
                );

            }


            if (rejectButton) {

                rejectButton.addEventListener(
                    "click",
                    function () {
                        openRejectModal(record.id);
                    }
                );

            }

        }


        elements.detailsModal.hidden = false;

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       CLOSE DETAILS
    ===================================================== */

    function closeDetailsModal() {

        if (elements.detailsModal) {
            elements.detailsModal.hidden = true;
        }

        document.body.style.overflow = "";

        state.selectedRecord = null;

    }


    /* =====================================================
       AUTHORITY APPROVE
    ===================================================== */

    function approveAuthority(recordId) {

        const record =
            state.records.find(function (item) {
                return item.id === recordId;
            });


        if (!record) {
            return;
        }


        record.authority = "approved";


        closeDetailsModal();

        updateSummary();

        applyFilters();

        showToast(
            "Authority approval recorded successfully."
        );

    }


    /* =====================================================
       OPEN REJECT MODAL
    ===================================================== */

    function openRejectModal(recordId) {

        const record =
            state.records.find(function (item) {
                return item.id === recordId;
            });


        if (!record || !elements.rejectModal) {
            return;
        }


        state.selectedRecord = record;


        if (elements.rejectReason) {
            elements.rejectReason.value = "";
        }


        elements.rejectModal.hidden = false;

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       CLOSE REJECT MODAL
    ===================================================== */

    function closeRejectModal() {

        if (elements.rejectModal) {
            elements.rejectModal.hidden = true;
        }

        document.body.style.overflow = "";

    }


    /* =====================================================
       CONFIRM REJECTION
    ===================================================== */

    function confirmRejection() {

        if (!state.selectedRecord) {
            return;
        }


        const reason =
            elements.rejectReason
                ? elements.rejectReason.value.trim()
                : "";


        if (!reason) {

            showToast(
                "Please enter a rejection reason."
            );

            if (elements.rejectReason) {
                elements.rejectReason.focus();
            }

            return;
        }


        state.selectedRecord.authority = "rejected";

        state.selectedRecord.authorityReason = reason;


        closeRejectModal();

        closeDetailsModal();

        updateSummary();

        applyFilters();


        showToast(
            "Startup idea rejected successfully."
        );

    }


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    function resetFilters() {

        if (elements.search) {
            elements.search.value = "";
        }

        if (elements.status) {
            elements.status.value = "all";
        }

        if (elements.type) {
            elements.type.value = "all";
        }

        if (elements.stage) {
            elements.stage.value = "all";
        }

        applyFilters();

    }


    /* =====================================================
       CSV EXPORT
    ===================================================== */

    function exportReport() {

        if (!state.filteredRecords.length) {

            showToast(
                "No startup ideas available to export."
            );

            return;
        }


        const headers = [
            "Student",
            "Registration",
            "Branch",
            "Startup Idea",
            "Category",
            "Stage",
            "Date",
            "TPO",
            "Authority",
            "Final Status"
        ];


        const rows =
            state.filteredRecords.map(function (record) {

                return [
                    record.student,
                    record.registration,
                    record.branch,
                    record.idea,
                    record.categoryLabel,
                    record.stageLabel,
                    record.date,
                    getStatusLabel(record.tpo),
                    getStatusLabel(record.authority),
                    getStatusLabel(getFinalStatus(record))
                ];

            });


        const csvData = [
            headers,
            ...rows
        ]
            .map(function (row) {

                return row
                    .map(csvEscape)
                    .join(",");

            })
            .join("\n");


        const blob =
            new Blob(
                [csvData],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "authority_startup_ideas_report.csv";


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);


        showToast(
            "Startup Ideas report exported."
        );

    }


    /* =====================================================
       CSV ESCAPE
    ===================================================== */

    function csvEscape(value) {

        const text =
            String(value ?? "");

        return `"${text.replace(/"/g, '""')}"`;

    }


    /* =====================================================
       INITIALS
    ===================================================== */

    function getInitials(name) {

        return name
            .split(" ")
            .slice(0, 2)
            .map(function (part) {
                return part.charAt(0);
            })
            .join("")
            .toUpperCase();

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       ESCAPE ATTRIBUTE
    ===================================================== */

    function escapeAttribute(value) {

        return escapeHtml(value);

    }


    /* =====================================================
       TOAST
    ===================================================== */

    function showToast(message) {

        const existingToast =
            document.querySelector(
                ".authority-startup-ideas-toast"
            );


        if (existingToast) {
            existingToast.remove();
        }


        const toast =
            document.createElement("div");


        toast.className =
            "authority-startup-ideas-toast";


        toast.textContent = message;


        document.body.appendChild(toast);


        setTimeout(function () {

            toast.style.opacity = "0";
            toast.style.transform = "translateY(8px)";

            setTimeout(function () {

                toast.remove();

            }, 180);

        }, 2600);

    }


    /* =====================================================
       EVENT BINDING
    ===================================================== */

    function bindEvents() {

        if (elements.search) {

            elements.search.addEventListener(
                "input",
                applyFilters
            );

        }


        if (elements.status) {

            elements.status.addEventListener(
                "change",
                applyFilters
            );

        }


        if (elements.type) {

            elements.type.addEventListener(
                "change",
                applyFilters
            );

        }


        if (elements.stage) {

            elements.stage.addEventListener(
                "change",
                applyFilters
            );

        }


        if (elements.reset) {

            elements.reset.addEventListener(
                "click",
                resetFilters
            );

        }


        if (elements.exportButton) {

            elements.exportButton.addEventListener(
                "click",
                exportReport
            );

        }


        /* TABLE ACTIONS */

        if (elements.tableBody) {

            elements.tableBody.addEventListener(
                "click",
                function (event) {

                    const button =
                        event.target.closest(
                            "[data-action='view']"
                        );


                    if (!button) {
                        return;
                    }


                    const recordId =
                        button.getAttribute("data-id");


                    openDetails(recordId);

                }
            );

        }


        /* DETAILS CLOSE */

        if (elements.closeDetails) {

            elements.closeDetails.addEventListener(
                "click",
                closeDetailsModal
            );

        }


        if (elements.closeDetailsBottom) {

            elements.closeDetailsBottom.addEventListener(
                "click",
                closeDetailsModal
            );

        }


        /* REJECT CLOSE */

        if (elements.closeReject) {

            elements.closeReject.addEventListener(
                "click",
                closeRejectModal
            );

        }


        if (elements.cancelReject) {

            elements.cancelReject.addEventListener(
                "click",
                closeRejectModal
            );

        }


        if (elements.confirmReject) {

            elements.confirmReject.addEventListener(
                "click",
                confirmRejection
            );

        }


        /* MODAL OVERLAYS */

        if (elements.detailsModal) {

            const overlay =
                elements.detailsModal.querySelector(
                    ".startup-ideas-modal-overlay"
                );


            if (overlay) {

                overlay.addEventListener(
                    "click",
                    closeDetailsModal
                );

            }

        }


        if (elements.rejectModal) {

            const overlay =
                elements.rejectModal.querySelector(
                    ".startup-ideas-modal-overlay"
                );


            if (overlay) {

                overlay.addEventListener(
                    "click",
                    closeRejectModal
                );

            }

        }


        /* ESC KEY */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key !== "Escape") {
                    return;
                }


                if (
                    elements.rejectModal &&
                    !elements.rejectModal.hidden
                ) {

                    closeRejectModal();

                    return;
                }


                if (
                    elements.detailsModal &&
                    !elements.detailsModal.hidden
                ) {

                    closeDetailsModal();

                }

            }
        );

    }


    /* =====================================================
       START
    ===================================================== */

    initialize();

});