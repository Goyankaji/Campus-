/* =========================================================
   CAMPUS AUTHORITY — OFF-CAMPUS MANAGEMENT
   Two-Party Approval:
   TPO + Authority = Final Approved
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. SAMPLE DATA
    ===================================================== */

    let offCampusData = [
        {
            id: "OFF-001",
            student: "Rahul Sharma",
            registration: "21PCE001",
            branch: "CSE",
            type: "Job",
            organization: "TCS",
            package: "7.2 LPA",
            date: "2026-08-12",

            tpoStatus: "pending",
            authorityStatus: "pending",

            tpoReason: "",
            authorityReason: ""
        },
        {
            id: "OFF-002",
            student: "Priya Verma",
            registration: "21PCE014",
            branch: "AIML",
            type: "Job",
            organization: "Infosys",
            package: "6.5 LPA",
            date: "2026-08-15",

            tpoStatus: "approved",
            authorityStatus: "pending",

            tpoReason: "",
            authorityReason: ""
        },
        {
            id: "OFF-003",
            student: "Aman Gupta",
            registration: "21PCE027",
            branch: "ECE",
            type: "Job",
            organization: "L&T",
            package: "8.0 LPA",
            date: "2026-08-18",

            tpoStatus: "pending",
            authorityStatus: "approved",

            tpoReason: "",
            authorityReason: ""
        },
        {
            id: "OFF-004",
            student: "Neha Singh",
            registration: "21PCE041",
            branch: "IT",
            type: "Internship",
            organization: "Accenture",
            package: "35K/month",
            date: "2026-08-20",

            tpoStatus: "approved",
            authorityStatus: "approved",

            tpoReason: "",
            authorityReason: ""
        },
        {
            id: "OFF-005",
            student: "Karan Mehta",
            registration: "21PCE055",
            branch: "ME",
            type: "Job",
            organization: "Mahindra",
            package: "6.8 LPA",
            date: "2026-08-21",

            tpoStatus: "rejected",
            authorityStatus: "pending",

            tpoReason: "Required placement verification documents were not submitted.",
            authorityReason: ""
        },
        {
            id: "OFF-006",
            student: "Simran Joshi",
            registration: "21PCE063",
            branch: "CSE",
            type: "Higher Studies",
            organization: "University Application",
            package: "—",
            date: "2026-08-23",

            tpoStatus: "pending",
            authorityStatus: "rejected",

            tpoReason: "",
            authorityReason: "Supporting documents require verification."
        }
    ];


    /* =====================================================
       2. DOM ELEMENTS
    ===================================================== */

    const tableBody = document.getElementById("offCampusTableBody");

    const searchInput = document.getElementById("offCampusSearch");
    const statusFilter = document.getElementById("offCampusStatus");
    const typeFilter = document.getElementById("offCampusType");
    const resetButton = document.getElementById("offCampusReset");

    const totalElement = document.getElementById("totalOffCampus");
    const pendingElement = document.getElementById("pendingOffCampus");
    const approvedElement = document.getElementById("approvedOffCampus");
    const rejectedElement = document.getElementById("rejectedOffCampus");

    const resultCount = document.getElementById("offCampusResultCount");

    const detailsModal = document.getElementById("offCampusDetailsModal");
    const detailsBody = document.getElementById("offCampusDetailsBody");

    const closeDetails = document.getElementById("closeOffCampusDetails");
    const closeDetailsBottom = document.getElementById("closeOffCampusDetailsBottom");

    const rejectModal = document.getElementById("offCampusRejectModal");
    const rejectReason = document.getElementById("offCampusRejectReason");

    const closeReject = document.getElementById("closeOffCampusReject");
    const cancelReject = document.getElementById("cancelOffCampusReject");
    const confirmReject = document.getElementById("confirmOffCampusReject");

    const exportButton = document.getElementById("exportOffCampus");


    let selectedRecordId = null;


    /* =====================================================
       3. FINAL STATUS LOGIC

       IMPORTANT:

       TPO APPROVED + AUTHORITY APPROVED
                    ↓
              FINAL APPROVED

       Any rejection
                    ↓
              FINAL REJECTED

       Otherwise
                    ↓
              FINAL PENDING
    ===================================================== */

    function getFinalStatus(record) {

        if (
            record.tpoStatus === "rejected" ||
            record.authorityStatus === "rejected"
        ) {
            return "rejected";
        }

        if (
            record.tpoStatus === "approved" &&
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

        let total = offCampusData.length;
        let pending = 0;
        let approved = 0;
        let rejected = 0;

        offCampusData.forEach(record => {

            const finalStatus = getFinalStatus(record);

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
            totalElement.textContent = total;
        }

        if (pendingElement) {
            pendingElement.textContent = pending;
        }

        if (approvedElement) {
            approvedElement.textContent = approved;
        }

        if (rejectedElement) {
            rejectedElement.textContent = rejected;
        }
    }


    /* =====================================================
       7. FILTER DATA
    ===================================================== */

    function getFilteredData() {

        const searchValue = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const statusValue = statusFilter
            ? statusFilter.value
            : "all";

        const typeValue = typeFilter
            ? typeFilter.value
            : "all";


        return offCampusData.filter(record => {

            const finalStatus = getFinalStatus(record);


            /* SEARCH */

            const searchableText = [
                record.id,
                record.student,
                record.registration,
                record.branch,
                record.type,
                record.organization,
                record.package
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


            /* TYPE */

            if (
                typeValue !== "all" &&
                record.type.toLowerCase() !== typeValue.toLowerCase()
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

        const filteredData = getFilteredData();

        tableBody.innerHTML = "";


        if (filteredData.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="11" class="empty-state">
                        No off-campus records found.
                    </td>
                </tr>
            `;

            if (resultCount) {
                resultCount.textContent = "Showing 0 records";
            }

            return;
        }


        filteredData.forEach(record => {

            const finalStatus = getFinalStatus(record);

            const row = document.createElement("tr");


            row.innerHTML = `
                <td>
                    <div class="student-cell">
                        <strong>${escapeHTML(record.student)}</strong>
                        <span>${escapeHTML(record.id)}</span>
                    </div>
                </td>

                <td>
                    ${escapeHTML(record.registration)}
                </td>

                <td>
                    ${escapeHTML(record.branch)}
                </td>

                <td>
                    <span class="type-badge">
                        ${escapeHTML(record.type)}
                    </span>
                </td>

                <td>
                    <strong>${escapeHTML(record.organization)}</strong>
                </td>

                <td>
                    ${escapeHTML(record.package)}
                </td>

                <td>
                    ${escapeHTML(record.date)}
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
                        onclick="viewOffCampusRecord('${record.id}')"
                    >
                        View
                    </button>
                </td>
            `;


            tableBody.appendChild(row);
        });


        if (resultCount) {

            resultCount.textContent =
                `Showing ${filteredData.length} of ${offCampusData.length} records`;
        }
    }


    /* =====================================================
       9. VIEW RECORD
    ===================================================== */

    window.viewOffCampusRecord = function (recordId) {

        const record = offCampusData.find(
            item => item.id === recordId
        );

        if (!record || !detailsModal || !detailsBody) {
            return;
        }

        selectedRecordId = recordId;

        const finalStatus = getFinalStatus(record);


        detailsBody.innerHTML = `

            <div class="detail-section">

                <div class="detail-title">
                    Student Information
                </div>

                <div class="detail-grid">

                    <div class="detail-item">
                        <span>Student</span>
                        <strong>${escapeHTML(record.student)}</strong>
                    </div>

                    <div class="detail-item">
                        <span>Registration</span>
                        <strong>${escapeHTML(record.registration)}</strong>
                    </div>

                    <div class="detail-item">
                        <span>Branch</span>
                        <strong>${escapeHTML(record.branch)}</strong>
                    </div>

                    <div class="detail-item">
                        <span>Placement Type</span>
                        <strong>${escapeHTML(record.type)}</strong>
                    </div>

                </div>

            </div>


            <div class="detail-section">

                <div class="detail-title">
                    Placement Information
                </div>

                <div class="detail-grid">

                    <div class="detail-item">
                        <span>Organization</span>
                        <strong>${escapeHTML(record.organization)}</strong>
                    </div>

                    <div class="detail-item">
                        <span>Package / Stipend</span>
                        <strong>${escapeHTML(record.package)}</strong>
                    </div>

                    <div class="detail-item">
                        <span>Declaration Date</span>
                        <strong>${escapeHTML(record.date)}</strong>
                    </div>

                    <div class="detail-item">
                        <span>Record ID</span>
                        <strong>${escapeHTML(record.id)}</strong>
                    </div>

                </div>

            </div>


            <div class="detail-section">

                <div class="detail-title">
                    Approval Status
                </div>

                <div class="approval-grid">

                    <div class="approval-box">

                        <span>TPO Status</span>

                        ${statusBadge(record.tpoStatus)}

                        ${
                            record.tpoReason
                            ? `<small>${escapeHTML(record.tpoReason)}</small>`
                            : ""
                        }

                    </div>


                    <div class="approval-box">

                        <span>Authority Status</span>

                        ${statusBadge(record.authorityStatus)}

                        ${
                            record.authorityReason
                            ? `<small>${escapeHTML(record.authorityReason)}</small>`
                            : ""
                        }

                    </div>


                    <div class="approval-box final-box">

                        <span>Final Status</span>

                        ${statusBadge(finalStatus)}

                    </div>

                </div>

            </div>


            <div class="approval-rule-note">

                <strong>Final Approval Rule</strong>

                <p>
                    Final approval is granted only when
                    <strong>both TPO and Authority approve</strong>
                    the off-campus placement.
                    If either party rejects the declaration,
                    the final status becomes Rejected.
                </p>

            </div>


            <div class="authority-actions">

                ${
                    finalStatus !== "rejected"
                    && record.authorityStatus !== "approved"
                    ? `
                        <button
                            type="button"
                            class="authority-approve-btn"
                            onclick="approveOffCampusRecord('${record.id}')"
                        >
                            ✓ Approve
                        </button>

                        <button
                            type="button"
                            class="authority-reject-btn"
                            onclick="openOffCampusReject('${record.id}')"
                        >
                            ✕ Reject
                        </button>
                    `
                    : ""
                }

            </div>
        `;


        detailsModal.hidden = false;

        document.body.classList.add("modal-open");
    };


    /* =====================================================
       10. AUTHORITY APPROVE

       Authority approval alone NEVER makes final approved.
    ===================================================== */

    window.approveOffCampusRecord = function (recordId) {

        const record = offCampusData.find(
            item => item.id === recordId
        );

        if (!record) {
            return;
        }


        /* Existing rejection cannot be overridden */

        if (
            record.tpoStatus === "rejected" ||
            record.authorityStatus === "rejected"
        ) {
            return;
        }


        record.authorityStatus = "approved";
        record.authorityReason = "";


        const finalStatus = getFinalStatus(record);


        if (finalStatus === "approved") {

            showToast(
                "Authority approved. TPO is also approved — Final Approved.",
                "success"
            );

        } else {

            showToast(
                "Authority approved. Final approval is still pending TPO approval.",
                "info"
            );
        }


        updateSummary();
        renderTable();

        closeDetailsModal();
    };


    /* =====================================================
       11. OPEN REJECT MODAL
    ===================================================== */

    window.openOffCampusReject = function (recordId) {

        selectedRecordId = recordId;

        if (!rejectModal) {
            return;
        }

        if (rejectReason) {
            rejectReason.value = "";
        }

        rejectModal.hidden = false;

        document.body.classList.add("modal-open");


        setTimeout(() => {

            if (rejectReason) {
                rejectReason.focus();
            }

        }, 100);
    };


    /* =====================================================
       12. CONFIRM AUTHORITY REJECTION
    ===================================================== */

    if (confirmReject) {

        confirmReject.addEventListener("click", function () {

            const reason = rejectReason
                ? rejectReason.value.trim()
                : "";


            if (!reason) {

                if (rejectReason) {
                    rejectReason.focus();
                }

                showToast(
                    "Please enter a rejection reason.",
                    "error"
                );

                return;
            }


            const record = offCampusData.find(
                item => item.id === selectedRecordId
            );


            if (!record) {
                return;
            }


            record.authorityStatus = "rejected";
            record.authorityReason = reason;


            updateSummary();
            renderTable();

            closeRejectModal();
            closeDetailsModal();


            showToast(
                "Off-campus declaration rejected by Authority.",
                "success"
            );
        });
    }


    /* =====================================================
       13. CLOSE DETAILS MODAL
    ===================================================== */

    function closeDetailsModal() {

        if (detailsModal) {
            detailsModal.hidden = true;
        }

        document.body.classList.remove("modal-open");

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


    /* Overlay click */

    if (detailsModal) {

        const overlay =
            detailsModal.querySelector(
                ".off-campus-modal-overlay"
            );

        if (overlay) {

            overlay.addEventListener(
                "click",
                closeDetailsModal
            );
        }
    }


    /* =====================================================
       14. CLOSE REJECT MODAL
    ===================================================== */

    function closeRejectModal() {

        if (rejectModal) {
            rejectModal.hidden = true;
        }

        if (rejectReason) {
            rejectReason.value = "";
        }

        document.body.classList.remove("modal-open");
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


    if (rejectModal) {

        const overlay =
            rejectModal.querySelector(
                ".off-campus-modal-overlay"
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
       16. FILTERS
    ===================================================== */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            renderTable
        );
    }


    if (typeFilter) {

        typeFilter.addEventListener(
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

                if (typeFilter) {
                    typeFilter.value = "all";
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
            exportOffCampusCSV
        );
    }


    function exportOffCampusCSV() {

        const rows = getFilteredData();

        if (!rows.length) {

            showToast(
                "No records available for export.",
                "error"
            );

            return;
        }


        const header = [
            "Record ID",
            "Student",
            "Registration",
            "Branch",
            "Placement Type",
            "Organization",
            "Package",
            "Date",
            "TPO Status",
            "Authority Status",
            "Final Status"
        ];


        const csvRows = [header];


        rows.forEach(record => {

            csvRows.push([
                record.id,
                record.student,
                record.registration,
                record.branch,
                record.type,
                record.organization,
                record.package,
                record.date,
                statusLabel(record.tpoStatus),
                statusLabel(record.authorityStatus),
                statusLabel(getFinalStatus(record))
            ]);
        });


        const csvContent = csvRows
            .map(row =>
                row
                    .map(value =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");


        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download =
            `off-campus-report-${new Date().toISOString().slice(0, 10)}.csv`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);


        showToast(
            "Off-campus report exported successfully.",
            "success"
        );
    }


    /* =====================================================
       19. ESC KEY
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
       20. TOAST
    ===================================================== */

    function showToast(message, type = "info") {

        let toast =
            document.getElementById("authorityOffCampusToast");


        if (!toast) {

            toast = document.createElement("div");

            toast.id =
                "authorityOffCampusToast";

            toast.className =
                "authority-off-campus-toast";

            document.body.appendChild(toast);
        }


        toast.className =
            `authority-off-campus-toast ${type}`;

        toast.textContent = message;

        toast.classList.add("show");


        clearTimeout(
            toast._timeout
        );


        toast._timeout =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 3500);
    }


    /* =====================================================
       21. HTML ESCAPE
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
       22. INITIAL LOAD
    ===================================================== */

    updateSummary();
    renderTable();

});