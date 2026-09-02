/* =========================================================
   CAMPUS AUTHORITY — NOC MANAGEMENT
   Authority College Scope
   First Decision Wins
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. SAMPLE DATA
    ===================================================== */

    let nocData = [
        {
            id: "NOC-001",
            student: "Rahul Sharma",
            registration: "21PCE001",
            branch: "CSE",
            requestType: "Off-Campus Job",
            organization: "TCS",
            requestDate: "2026-08-10",

            tpoStatus: "pending",
            authorityStatus: "pending",

            tpoReason: "",
            authorityReason: ""
        },

        {
            id: "NOC-002",
            student: "Priya Verma",
            registration: "21PCE014",
            branch: "AIML",
            requestType: "Off-Campus Job",
            organization: "Infosys",
            requestDate: "2026-08-12",

            tpoStatus: "approved",
            authorityStatus: "pending",

            tpoReason: "",
            authorityReason: ""
        },

        {
            id: "NOC-003",
            student: "Aman Gupta",
            registration: "21PCE027",
            branch: "ECE",
            requestType: "Higher Studies",
            organization: "University Application",
            requestDate: "2026-08-14",

            tpoStatus: "pending",
            authorityStatus: "approved",

            tpoReason: "",
            authorityReason: ""
        },

        {
            id: "NOC-004",
            student: "Neha Singh",
            registration: "21PCE041",
            branch: "IT",
            requestType: "Off-Campus Internship",
            organization: "Accenture",
            requestDate: "2026-08-16",

            tpoStatus: "approved",
            authorityStatus: "pending",

            tpoReason: "",
            authorityReason: ""
        },

        {
            id: "NOC-005",
            student: "Karan Mehta",
            registration: "21PCE055",
            branch: "ME",
            requestType: "Off-Campus Job",
            organization: "Mahindra",
            requestDate: "2026-08-18",

            tpoStatus: "rejected",
            authorityStatus: "pending",

            tpoReason: "Required documents were not submitted.",
            authorityReason: ""
        },

        {
            id: "NOC-006",
            student: "Simran Joshi",
            registration: "21PCE063",
            branch: "CSE",
            requestType: "Higher Studies",
            organization: "University Application",
            requestDate: "2026-08-20",

            tpoStatus: "pending",
            authorityStatus: "rejected",

            tpoReason: "",
            authorityReason: "Supporting documents require verification."
        }
    ];


    /* =====================================================
       2. DOM ELEMENTS
    ===================================================== */

    const tableBody =
        document.getElementById("nocTableBody");

    const searchInput =
        document.getElementById("nocSearch");

    const statusFilter =
        document.getElementById("nocStatus");

    const resetButton =
        document.getElementById("nocReset");

    const totalElement =
        document.getElementById("totalNoc");

    const pendingElement =
        document.getElementById("pendingNoc");

    const approvedElement =
        document.getElementById("approvedNoc");

    const rejectedElement =
        document.getElementById("rejectedNoc");

    const resultCount =
        document.getElementById("nocResultCount");

    const detailsModal =
        document.getElementById("nocDetailsModal");

    const detailsBody =
        document.getElementById("nocDetailsBody");

    const closeDetails =
        document.getElementById("closeNocDetails");

    const closeDetailsBottom =
        document.getElementById("closeNocDetailsBottom");

    const rejectModal =
        document.getElementById("nocRejectModal");

    const rejectReason =
        document.getElementById("nocRejectReason");

    const closeReject =
        document.getElementById("closeNocReject");

    const cancelReject =
        document.getElementById("cancelNocReject");

    const confirmReject =
        document.getElementById("confirmNocReject");

    const exportButton =
        document.getElementById("exportNocReport");


    let selectedRecordId = null;


    /* =====================================================
       3. FINAL STATUS

       NOC = FIRST DECISION WINS

       TPO Approved       → Final Approved
       Authority Approved → Final Approved

       TPO Rejected       → Final Rejected
       Authority Rejected → Final Rejected

       Otherwise          → Pending
    ===================================================== */

    function getFinalStatus(record) {

        if (
            record.tpoStatus === "rejected" ||
            record.authorityStatus === "rejected"
        ) {
            return "rejected";
        }

        if (
            record.tpoStatus === "approved" ||
            record.authorityStatus === "approved"
        ) {
            return "approved";
        }

        return "pending";
    }


    /* =====================================================
       4. STATUS LABEL
    ===================================================== */

    function statusLabel(status) {

        if (status === "approved") {
            return "Approved";
        }

        if (status === "rejected") {
            return "Rejected";
        }

        return "Pending";
    }


    /* =====================================================
       5. STATUS BADGE
    ===================================================== */

    function statusBadge(status) {

        return `
            <span class="status-badge ${status}">
                ${statusLabel(status)}
            </span>
        `;
    }


    /* =====================================================
       6. UPDATE SUMMARY
    ===================================================== */

    function updateSummary() {

        let pending = 0;
        let approved = 0;
        let rejected = 0;

        nocData.forEach(record => {

            const finalStatus =
                getFinalStatus(record);

            if (finalStatus === "pending") {
                pending++;
            }

            else if (finalStatus === "approved") {
                approved++;
            }

            else if (finalStatus === "rejected") {
                rejected++;
            }
        });


        if (totalElement) {
            totalElement.textContent =
                nocData.length;
        }

        if (pendingElement) {
            pendingElement.textContent =
                pending;
        }

        if (approvedElement) {
            approvedElement.textContent =
                approved;
        }

        if (rejectedElement) {
            rejectedElement.textContent =
                rejected;
        }
    }


    /* =====================================================
       7. FILTER DATA
    ===================================================== */

    function getFilteredData() {

        const searchValue =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

        const statusValue =
            statusFilter
                ? statusFilter.value
                : "all";


        return nocData.filter(record => {

            const finalStatus =
                getFinalStatus(record);


            /* SEARCH */

            const searchableText = [
                record.id,
                record.student,
                record.registration,
                record.branch,
                record.requestType,
                record.organization
            ]
                .join(" ")
                .toLowerCase();


            if (
                searchValue &&
                !searchableText.includes(searchValue)
            ) {
                return false;
            }


            /* STATUS */

            if (
                statusValue !== "all" &&
                finalStatus !== statusValue
            ) {
                return false;
            }


            return true;
        });
    }


    /* =====================================================
       8. RENDER TABLE
    ===================================================== */

    function renderTable() {

        if (!tableBody) {
            return;
        }


        const filteredData =
            getFilteredData();


        tableBody.innerHTML = "";


        if (filteredData.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td
                        colspan="10"
                        class="empty-state"
                    >
                        No NOC applications found.
                    </td>
                </tr>
            `;


            if (resultCount) {
                resultCount.textContent =
                    "Showing 0 applications";
            }

            return;
        }


        filteredData.forEach(record => {

            const finalStatus =
                getFinalStatus(record);


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <div class="student-cell">
                        <strong>
                            ${escapeHTML(record.student)}
                        </strong>

                        <span>
                            ${escapeHTML(record.id)}
                        </span>
                    </div>
                </td>

                <td>
                    ${escapeHTML(record.registration)}
                </td>

                <td>
                    ${escapeHTML(record.branch)}
                </td>

                <td>
                    ${escapeHTML(record.requestType)}
                </td>

                <td>
                    <strong>
                        ${escapeHTML(record.organization)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(record.requestDate)}
                </td>

                <td>
                    ${statusBadge(record.tpoStatus)}
                </td>

                <td>
                    ${statusBadge(record.authorityStatus)}
                </td>

                <td>
                    ${statusBadge(finalStatus)}
                </td>

                <td>
                    <button
                        type="button"
                        class="action-btn"
                        onclick="viewNocRecord('${record.id}')"
                    >
                        View
                    </button>
                </td>
            `;


            tableBody.appendChild(row);
        });


        if (resultCount) {

            resultCount.textContent =
                `Showing ${filteredData.length} of ${nocData.length} applications`;
        }
    }


    /* =====================================================
       9. VIEW NOC
    ===================================================== */

    window.viewNocRecord = function (recordId) {

        const record =
            nocData.find(
                item => item.id === recordId
            );


        if (
            !record ||
            !detailsModal ||
            !detailsBody
        ) {
            return;
        }


        selectedRecordId =
            recordId;


        const finalStatus =
            getFinalStatus(record);


        detailsBody.innerHTML = `

            <div class="detail-section">

                <div class="detail-title">
                    Student Information
                </div>

                <div class="detail-grid">

                    <div class="detail-item">
                        <span>Student</span>

                        <strong>
                            ${escapeHTML(record.student)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>Registration</span>

                        <strong>
                            ${escapeHTML(record.registration)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>Branch</span>

                        <strong>
                            ${escapeHTML(record.branch)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>NOC ID</span>

                        <strong>
                            ${escapeHTML(record.id)}
                        </strong>
                    </div>

                </div>

            </div>


            <div class="detail-section">

                <div class="detail-title">
                    NOC Request
                </div>

                <div class="detail-grid">

                    <div class="detail-item">
                        <span>Request Type</span>

                        <strong>
                            ${escapeHTML(record.requestType)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>Organization</span>

                        <strong>
                            ${escapeHTML(record.organization)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>Request Date</span>

                        <strong>
                            ${escapeHTML(record.requestDate)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>College</span>

                        <strong>
                            PCE
                        </strong>
                    </div>

                </div>

            </div>


            <div class="detail-section">

                <div class="detail-title">
                    Approval Status
                </div>

                <div class="approval-grid">

                    <div class="approval-box">

                        <span>
                            TPO Status
                        </span>

                        ${statusBadge(record.tpoStatus)}

                        ${
                            record.tpoReason
                            ? `
                                <small>
                                    ${escapeHTML(record.tpoReason)}
                                </small>
                            `
                            : ""
                        }

                    </div>


                    <div class="approval-box">

                        <span>
                            Authority Status
                        </span>

                        ${statusBadge(record.authorityStatus)}

                        ${
                            record.authorityReason
                            ? `
                                <small>
                                    ${escapeHTML(record.authorityReason)}
                                </small>
                            `
                            : ""
                        }

                    </div>


                    <div class="approval-box final-box">

                        <span>
                            Final Status
                        </span>

                        ${statusBadge(finalStatus)}

                    </div>

                </div>

            </div>


            <div class="approval-rule-note">

                <strong>
                    NOC Decision Rule
                </strong>

                <p>
                    NOC follows a first-decision-wins workflow.
                    Approval by either TPO or Authority makes
                    the NOC approved. Rejection by either party
                    makes the NOC rejected.
                </p>

            </div>


            <div class="authority-actions">

                ${
                    finalStatus === "pending"
                    ? `
                        <button
                            type="button"
                            class="authority-approve-btn"
                            onclick="approveNocRecord('${record.id}')"
                        >
                            ✓ Approve
                        </button>

                        <button
                            type="button"
                            class="authority-reject-btn"
                            onclick="openNocReject('${record.id}')"
                        >
                            ✕ Reject
                        </button>
                    `
                    : ""
                }

            </div>
        `;


        detailsModal.hidden = false;

        document.body.classList.add(
            "modal-open"
        );
    };


    /* =====================================================
       10. AUTHORITY APPROVE
    ===================================================== */

    window.approveNocRecord = function (recordId) {

        const record =
            nocData.find(
                item => item.id === recordId
            );


        if (!record) {
            return;
        }


        /* First decision already exists */

        if (
            record.tpoStatus !== "pending" ||
            record.authorityStatus !== "pending"
        ) {

            showToast(
                "This NOC already has a final decision.",
                "error"
            );

            return;
        }


        record.authorityStatus =
            "approved";

        record.authorityReason = "";


        updateSummary();
        renderTable();

        closeDetailsModal();


        showToast(
            "NOC approved by Authority.",
            "success"
        );
    };


    /* =====================================================
       11. OPEN REJECT MODAL
    ===================================================== */

    window.openNocReject = function (recordId) {

        const record =
            nocData.find(
                item => item.id === recordId
            );


        if (!record) {
            return;
        }


        if (
            record.tpoStatus !== "pending" ||
            record.authorityStatus !== "pending"
        ) {

            showToast(
                "This NOC already has a final decision.",
                "error"
            );

            return;
        }


        selectedRecordId =
            recordId;


        if (rejectReason) {
            rejectReason.value = "";
        }


        if (rejectModal) {
            rejectModal.hidden = false;
        }


        document.body.classList.add(
            "modal-open"
        );


        setTimeout(() => {

            if (rejectReason) {
                rejectReason.focus();
            }

        }, 100);
    };


    /* =====================================================
       12. CONFIRM REJECTION
    ===================================================== */

    if (confirmReject) {

        confirmReject.addEventListener(
            "click",
            function () {

                const reason =
                    rejectReason
                        ? rejectReason.value.trim()
                        : "";


                if (!reason) {

                    showToast(
                        "Please enter a rejection reason.",
                        "error"
                    );

                    if (rejectReason) {
                        rejectReason.focus();
                    }

                    return;
                }


                const record =
                    nocData.find(
                        item =>
                            item.id === selectedRecordId
                    );


                if (!record) {
                    return;
                }


                /* First decision already exists */

                if (
                    record.tpoStatus !== "pending" ||
                    record.authorityStatus !== "pending"
                ) {

                    showToast(
                        "This NOC already has a final decision.",
                        "error"
                    );

                    closeRejectModal();

                    return;
                }


                record.authorityStatus =
                    "rejected";

                record.authorityReason =
                    reason;


                updateSummary();
                renderTable();

                closeRejectModal();
                closeDetailsModal();


                showToast(
                    "NOC rejected by Authority.",
                    "success"
                );
            }
        );
    }


    /* =====================================================
       13. CLOSE DETAILS
    ===================================================== */

    function closeDetailsModal() {

        if (detailsModal) {
            detailsModal.hidden = true;
        }

        document.body.classList.remove(
            "modal-open"
        );

        selectedRecordId = null;
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


    /* Overlay */

    if (detailsModal) {

        const overlay =
            detailsModal.querySelector(
                ".noc-modal-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeDetailsModal
            );
        }
    }


    /* =====================================================
       14. CLOSE REJECT
    ===================================================== */

    function closeRejectModal() {

        if (rejectModal) {
            rejectModal.hidden = true;
        }


        if (rejectReason) {
            rejectReason.value = "";
        }


        document.body.classList.remove(
            "modal-open"
        );
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


    /* Reject overlay */

    if (rejectModal) {

        const overlay =
            rejectModal.querySelector(
                ".noc-modal-overlay"
            );


        if (overlay) {

            overlay.addEventListener(
                "click",
                closeRejectModal
            );
        }
    }


    /* =====================================================
       15. SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            renderTable
        );
    }


    /* =====================================================
       16. STATUS FILTER
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            renderTable
        );
    }


    /* =====================================================
       17. RESET
    ===================================================== */

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


                renderTable();
            }
        );
    }


    /* =====================================================
       18. EXPORT CSV
    ===================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportNocReport
        );
    }


    function exportNocReport() {

        const rows =
            getFilteredData();


        if (!rows.length) {

            showToast(
                "No NOC records available for export.",
                "error"
            );

            return;
        }


        const header = [
            "NOC ID",
            "Student",
            "Registration",
            "Branch",
            "Request Type",
            "Organization",
            "Request Date",
            "TPO Status",
            "Authority Status",
            "Final Status"
        ];


        const csvRows = [
            header
        ];


        rows.forEach(record => {

            csvRows.push([
                record.id,
                record.student,
                record.registration,
                record.branch,
                record.requestType,
                record.organization,
                record.requestDate,
                statusLabel(record.tpoStatus),
                statusLabel(record.authorityStatus),
                statusLabel(getFinalStatus(record))
            ]);
        });


        const csvContent =
            csvRows
                .map(row =>
                    row
                        .map(value =>
                            `"${String(value)
                                .replace(/"/g, '""')}"`
                        )
                        .join(",")
                )
                .join("\n");


        const blob =
            new Blob(
                [csvContent],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;


        link.download =
            `noc-report-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);


        showToast(
            "NOC report exported successfully.",
            "success"
        );
    }


    /* =====================================================
       19. ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       20. TOAST
    ===================================================== */

    function showToast(
        message,
        type = "info"
    ) {

        let toast =
            document.getElementById(
                "authorityNocToast"
            );


        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "authorityNocToast";

            toast.className =
                "authority-noc-toast";

            document.body.appendChild(toast);
        }


        toast.className =
            `authority-noc-toast ${type}`;


        toast.textContent =
            message;


        toast.classList.add("show");


        clearTimeout(
            toast._timeout
        );


        toast._timeout =
            setTimeout(() => {

                toast.classList.remove(
                    "show"
                );

            }, 3500);
    }


    /* =====================================================
       21. ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            closeDetailsModal();
            closeRejectModal();
        }
    );


    /* =====================================================
       22. INITIAL LOAD
    ===================================================== */

    updateSummary();
    renderTable();

});