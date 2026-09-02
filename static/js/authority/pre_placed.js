/* =========================================================
   CAMPUS AUTHORITY — PRE-PLACED STUDENTS
   Two-Party Approval
   TPO + Authority = Final Approved
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. SAMPLE DATA
    ===================================================== */

    let prePlacedData = [

        {
            id: "PP-001",
            student: "Rahul Sharma",
            registration: "21PCE001",
            branch: "CSE",
            type: "Job",
            company: "Microsoft",
            package: "18 LPA",
            date: "2026-08-10",

            tpoStatus: "pending",
            authorityStatus: "pending",

            tpoReason: "",
            authorityReason: ""
        },

        {
            id: "PP-002",
            student: "Priya Verma",
            registration: "21PCE014",
            branch: "AIML",
            type: "Job",
            company: "Infosys",
            package: "9 LPA",
            date: "2026-08-12",

            tpoStatus: "approved",
            authorityStatus: "pending",

            tpoReason: "",
            authorityReason: ""
        },

        {
            id: "PP-003",
            student: "Aman Gupta",
            registration: "21PCE027",
            branch: "ECE",
            type: "Job",
            company: "L&T",
            package: "8.5 LPA",
            date: "2026-08-14",

            tpoStatus: "pending",
            authorityStatus: "approved",

            tpoReason: "",
            authorityReason: ""
        },

        {
            id: "PP-004",
            student: "Neha Singh",
            registration: "21PCE041",
            branch: "IT",
            type: "Internship",
            company: "Accenture",
            package: "45K/month",
            date: "2026-08-16",

            tpoStatus: "approved",
            authorityStatus: "approved",

            tpoReason: "",
            authorityReason: ""
        },

        {
            id: "PP-005",
            student: "Karan Mehta",
            registration: "21PCE055",
            branch: "ME",
            type: "Job",
            company: "Mahindra",
            package: "7.5 LPA",
            date: "2026-08-18",

            tpoStatus: "rejected",
            authorityStatus: "pending",

            tpoReason: "Placement declaration documents were incomplete.",
            authorityReason: ""
        },

        {
            id: "PP-006",
            student: "Simran Joshi",
            registration: "21PCE063",
            branch: "CSE",
            type: "Job",
            company: "TCS",
            package: "10 LPA",
            date: "2026-08-20",

            tpoStatus: "pending",
            authorityStatus: "rejected",

            tpoReason: "",
            authorityReason: "Company verification documents require clarification."
        }
    ];


    /* =====================================================
       2. DOM ELEMENTS
    ===================================================== */

    const tableBody =
        document.getElementById("prePlacedTableBody");

    const searchInput =
        document.getElementById("prePlacedSearch");

    const statusFilter =
        document.getElementById("prePlacedStatus");

    const typeFilter =
        document.getElementById("prePlacedType");

    const resetButton =
        document.getElementById("prePlacedReset");

    const totalElement =
        document.getElementById("totalPrePlaced");

    const pendingElement =
        document.getElementById("pendingPrePlaced");

    const approvedElement =
        document.getElementById("approvedPrePlaced");

    const rejectedElement =
        document.getElementById("rejectedPrePlaced");

    const resultCount =
        document.getElementById("prePlacedResultCount");

    const detailsModal =
        document.getElementById("prePlacedDetailsModal");

    const detailsBody =
        document.getElementById("prePlacedDetailsBody");

    const closeDetails =
        document.getElementById("closePrePlacedDetails");

    const closeDetailsBottom =
        document.getElementById("closePrePlacedDetailsBottom");

    const rejectModal =
        document.getElementById("prePlacedRejectModal");

    const rejectReason =
        document.getElementById("prePlacedRejectReason");

    const closeReject =
        document.getElementById("closePrePlacedReject");

    const cancelReject =
        document.getElementById("cancelPrePlacedReject");

    const confirmReject =
        document.getElementById("confirmPrePlacedReject");

    const exportButton =
        document.getElementById("exportPrePlaced");


    let selectedRecordId = null;


    /* =====================================================
       3. FINAL STATUS LOGIC

       FINAL APPROVED:
       TPO = APPROVED
       AND
       AUTHORITY = APPROVED

       FINAL REJECTED:
       Either one is REJECTED

       OTHERWISE:
       PENDING
    ===================================================== */

    function getFinalStatus(record) {

        /*
         * Rejection has highest priority.
         */

        if (
            record.tpoStatus === "rejected" ||
            record.authorityStatus === "rejected"
        ) {
            return "rejected";
        }


        /*
         * BOTH approvals are mandatory.
         */

        if (
            record.tpoStatus === "approved" &&
            record.authorityStatus === "approved"
        ) {
            return "approved";
        }


        /*
         * One or both approvals are still pending.
         */

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


        prePlacedData.forEach(record => {

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
                prePlacedData.length;
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

        const typeValue =
            typeFilter
                ? typeFilter.value
                : "all";


        return prePlacedData.filter(record => {

            const finalStatus =
                getFinalStatus(record);


            /* SEARCH */

            const searchableText = [
                record.id,
                record.student,
                record.registration,
                record.branch,
                record.type,
                record.company,
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
                record.type.toLowerCase() !==
                typeValue.toLowerCase()
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
                        colspan="11"
                        class="empty-state"
                    >
                        No pre-placed student records found.
                    </td>
                </tr>
            `;


            if (resultCount) {
                resultCount.textContent =
                    "Showing 0 students";
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
                    <span class="type-badge">
                        ${escapeHTML(record.type)}
                    </span>
                </td>


                <td>
                    <strong>
                        ${escapeHTML(record.company)}
                    </strong>
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
                        onclick="viewPrePlacedRecord('${record.id}')"
                    >
                        View
                    </button>

                </td>
            `;


            tableBody.appendChild(row);
        });


        if (resultCount) {

            resultCount.textContent =
                `Showing ${filteredData.length} of ${prePlacedData.length} students`;
        }
    }


    /* =====================================================
       9. VIEW RECORD
    ===================================================== */

    window.viewPrePlacedRecord = function (recordId) {

        const record =
            prePlacedData.find(
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
                        <span>Record ID</span>

                        <strong>
                            ${escapeHTML(record.id)}
                        </strong>
                    </div>

                </div>

            </div>


            <div class="detail-section">

                <div class="detail-title">
                    Pre-Placement Declaration
                </div>

                <div class="detail-grid">

                    <div class="detail-item">
                        <span>Placement Type</span>

                        <strong>
                            ${escapeHTML(record.type)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>Company</span>

                        <strong>
                            ${escapeHTML(record.company)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>Package / Stipend</span>

                        <strong>
                            ${escapeHTML(record.package)}
                        </strong>
                    </div>


                    <div class="detail-item">
                        <span>Declaration Date</span>

                        <strong>
                            ${escapeHTML(record.date)}
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
                    Final Approval Rule
                </strong>

                <p>
                    Final approval requires
                    <strong>both TPO and Authority approval</strong>.
                    If either TPO or Authority rejects the
                    declaration, the final status becomes
                    Rejected.
                </p>

            </div>


            <div class="authority-actions">

                ${
                    finalStatus !== "rejected" &&
                    record.authorityStatus !== "approved"
                    ? `

                        <button
                            type="button"
                            class="authority-approve-btn"
                            onclick="approvePrePlacedRecord('${record.id}')"
                        >
                            ✓ Approve
                        </button>


                        <button
                            type="button"
                            class="authority-reject-btn"
                            onclick="openPrePlacedReject('${record.id}')"
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

       Authority approval alone does NOT make final approved.
    ===================================================== */

    window.approvePrePlacedRecord = function (recordId) {

        const record =
            prePlacedData.find(
                item => item.id === recordId
            );


        if (!record) {
            return;
        }


        /*
         * Existing rejection cannot be overridden.
         */

        if (
            record.tpoStatus === "rejected" ||
            record.authorityStatus === "rejected"
        ) {

            showToast(
                "This declaration has already been rejected.",
                "error"
            );

            return;
        }


        /*
         * Already approved by Authority.
         */

        if (
            record.authorityStatus === "approved"
        ) {

            showToast(
                "Authority has already approved this declaration.",
                "info"
            );

            return;
        }


        record.authorityStatus =
            "approved";

        record.authorityReason =
            "";


        const finalStatus =
            getFinalStatus(record);


        updateSummary();
        renderTable();


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


        closeDetailsModal();
    };


    /* =====================================================
       11. OPEN REJECT MODAL
    ===================================================== */

    window.openPrePlacedReject = function (recordId) {

        const record =
            prePlacedData.find(
                item => item.id === recordId
            );


        if (!record) {
            return;
        }


        if (
            record.tpoStatus === "rejected" ||
            record.authorityStatus === "rejected"
        ) {

            showToast(
                "This declaration is already rejected.",
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
                    prePlacedData.find(
                        item =>
                            item.id === selectedRecordId
                    );


                if (!record) {
                    return;
                }


                /*
                 * Cannot override an existing rejection.
                 */

                if (
                    record.tpoStatus === "rejected" ||
                    record.authorityStatus === "rejected"
                ) {

                    showToast(
                        "This declaration is already rejected.",
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
                    "Pre-placed declaration rejected by Authority.",
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


    /* Details overlay */

    if (detailsModal) {

        const overlay =
            detailsModal.querySelector(
                ".pre-placed-modal-overlay"
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
                ".pre-placed-modal-overlay"
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
       17. TYPE FILTER
    ===================================================== */

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            renderTable
        );
    }


    /* =====================================================
       18. RESET
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
       19. EXPORT CSV
    ===================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            exportPrePlacedReport
        );
    }


    function exportPrePlacedReport() {

        const rows =
            getFilteredData();


        if (!rows.length) {

            showToast(
                "No pre-placed records available for export.",
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
            "Company",
            "Package",
            "Date",
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
                record.type,
                record.company,
                record.package,
                record.date,
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


        link.href =
            url;


        link.download =
            `pre-placed-report-${new Date()
                .toISOString()
                .slice(0, 10)}.csv`;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);


        showToast(
            "Pre-placed report exported successfully.",
            "success"
        );
    }


    /* =====================================================
       20. HTML ESCAPE
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
       21. TOAST
    ===================================================== */

    function showToast(
        message,
        type = "info"
    ) {

        let toast =
            document.getElementById(
                "authorityPrePlacedToast"
            );


        if (!toast) {

            toast =
                document.createElement("div");

            toast.id =
                "authorityPrePlacedToast";

            toast.className =
                "authority-pre-placed-toast";

            document.body.appendChild(toast);
        }


        toast.className =
            `authority-pre-placed-toast ${type}`;


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
       22. ESC KEY
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
       23. INITIAL LOAD
    ===================================================== */

    updateSummary();
    renderTable();

});