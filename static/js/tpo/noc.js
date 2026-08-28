/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO — NOC
   FRONTEND PREVIEW
   DATABASE CONNECTION WILL BE ADDED LATER

   WORKFLOW:
   Student
      ↓
   TPO Approval
      ↓
   Authority Approval
      ↓
   Final NOC Approval

   IMPORTANT:
   Both TPO and Authority statuses remain visible.
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================================
           DEMO DATA
        ====================================================== */

        let nocRequests = [

            {
                id: "NOC001",

                studentName: "Aarav Sharma",

                registrationNo: "PCE2027001",

                enrollmentNo: "ENR2027001",

                campus: "PCE",

                course: "B.Tech",

                branch: "CS",

                section: "A",

                purpose: "Off Campus",

                organization:
                    "Tata Consultancy Services",

                position:
                    "Software Engineer",

                reason:
                    "Student has received an external opportunity and requires NOC for the joining process.",

                requestDate:
                    "25 Aug 2026",

                tpoStatus:
                    "pending",

                authorityStatus:
                    "pending",

                finalStatus:
                    "pending",

                tpoRemarks:
                    "",

                authorityRemarks:
                    ""

            },


            {
                id: "NOC002",

                studentName: "Rahul Kumar",

                registrationNo: "PCE2027002",

                enrollmentNo: "ENR2027002",

                campus: "PCE",

                course: "B.Tech",

                branch: "IT",

                section: "B",

                purpose: "Higher Studies",

                organization:
                    "University Admission",

                position:
                    "M.Tech",

                reason:
                    "Student has requested NOC for higher education admission.",

                requestDate:
                    "24 Aug 2026",

                tpoStatus:
                    "approved",

                authorityStatus:
                    "pending",

                finalStatus:
                    "pending",

                tpoRemarks:
                    "Approved by TPO.",

                authorityRemarks:
                    ""

            },


            {
                id: "NOC003",

                studentName: "Priya Mehta",

                registrationNo: "PCE2027003",

                enrollmentNo: "ENR2027003",

                campus: "PCE",

                course: "B.Tech",

                branch: "ECE",

                section: "A",

                purpose: "Off Campus",

                organization:
                    "Infosys",

                position:
                    "Systems Engineer",

                reason:
                    "Request for participation in an external placement opportunity.",

                requestDate:
                    "22 Aug 2026",

                tpoStatus:
                    "approved",

                authorityStatus:
                    "approved",

                finalStatus:
                    "approved",

                tpoRemarks:
                    "Approved by TPO.",

                authorityRemarks:
                    "Approved by Authority."

            },


            {
                id: "NOC004",

                studentName: "Karan Singh",

                registrationNo: "PCE2027004",

                enrollmentNo: "ENR2027004",

                campus: "PCE",

                course: "B.Tech",

                branch: "ME",

                section: "C",

                purpose: "Other",

                organization:
                    "External Organization",

                position:
                    "Internship",

                reason:
                    "Student requested an NOC for an external engagement.",

                requestDate:
                    "20 Aug 2026",

                tpoStatus:
                    "rejected",

                authorityStatus:
                    "pending",

                finalStatus:
                    "rejected",

                tpoRemarks:
                    "Request does not meet placement policy requirements.",

                authorityRemarks:
                    ""

            }

        ];


        /* =====================================================
           ELEMENTS
        ====================================================== */

        const tableBody =
            document.getElementById(
                "nocTableBody"
            );

        const searchInput =
            document.getElementById(
                "nocSearch"
            );

        const statusFilter =
            document.getElementById(
                "nocStatusFilter"
            );

        const typeFilter =
            document.getElementById(
                "nocTypeFilter"
            );

        const resetButton =
            document.getElementById(
                "resetNocFilters"
            );

        const totalNoc =
            document.getElementById(
                "totalNoc"
            );

        const pendingNoc =
            document.getElementById(
                "pendingNoc"
            );

        const approvedNoc =
            document.getElementById(
                "approvedNoc"
            );

        const rejectedNoc =
            document.getElementById(
                "rejectedNoc"
            );

        const nocCount =
            document.getElementById(
                "nocCount"
            );


        /* =====================================================
           DETAILS MODAL
        ====================================================== */

        const detailsModal =
            document.getElementById(
                "nocDetailsModal"
            );

        const detailsBody =
            document.getElementById(
                "nocDetailsBody"
            );

        const closeDetails =
            document.getElementById(
                "closeNocDetails"
            );

        const closeDetailsBottom =
            document.getElementById(
                "closeNocDetailsBottom"
            );


        /* =====================================================
           REJECT MODAL
        ====================================================== */

        const rejectModal =
            document.getElementById(
                "nocRejectModal"
            );

        const closeReject =
            document.getElementById(
                "closeNocReject"
            );

        const cancelReject =
            document.getElementById(
                "cancelNocReject"
            );

        const confirmReject =
            document.getElementById(
                "confirmNocReject"
            );

        const rejectReason =
            document.getElementById(
                "nocRejectReason"
            );


        let selectedRequestId =
            null;


        /* =====================================================
           INITIAL RENDER
        ====================================================== */

        renderRequests();


        /* =====================================================
           RENDER REQUESTS
        ====================================================== */

        function renderRequests() {

            if (!tableBody) {
                return;
            }


            const filtered =
                getFilteredRequests();


            tableBody.innerHTML =
                "";


            if (!filtered.length) {

                tableBody.innerHTML = `

                    <tr class="noc-empty-row">

                        <td colspan="9">

                            <div class="noc-empty-state">

                                <div class="noc-empty-icon">
                                    ◈
                                </div>

                                <strong>
                                    No matching NOC requests
                                </strong>

                                <span>
                                    Try changing your search or filters.
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
                            createRequestRow(
                                request
                            )
                        );

                    }
                );

            }


            updateStats();

        }


        /* =====================================================
           CREATE TABLE ROW
        ====================================================== */

        function createRequestRow(
            request
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.className =
                "noc-request-row";


            row.dataset.id =
                request.id;


            const initials =
                getInitials(
                    request.studentName
                );


            row.innerHTML = `

                <td>

                    <div class="noc-student-info">

                        <div class="noc-student-avatar">
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
                                    request.course
                                )}
                                ·
                                ${escapeHtml(
                                    request.branch
                                )}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <strong>
                        ${escapeHtml(
                            request.registrationNo
                        )}
                    </strong>

                </td>


                <td>

                    <span class="noc-purpose-badge">

                        ${escapeHtml(
                            request.purpose
                        )}

                    </span>

                </td>


                <td>

                    <div class="noc-organization">

                        ${escapeHtml(
                            request.organization
                        )}

                    </div>

                </td>


                <td>

                    ${escapeHtml(
                        request.requestDate
                    )}

                </td>


                <td>

                    ${statusBadge(
                        request.tpoStatus
                    )}

                </td>


                <td>

                    ${statusBadge(
                        request.authorityStatus
                    )}

                </td>


                <td>

                    ${statusBadge(
                        request.finalStatus
                    )}

                </td>


                <td>

                    <div class="noc-actions">

                        <button
                            type="button"
                            class="
                                noc-action-btn
                                view-noc-btn
                            "
                            data-id="${request.id}"
                        >
                            View
                        </button>


                        ${
                            request.tpoStatus === "pending"

                            ?

                            `

                            <button
                                type="button"
                                class="
                                    noc-action-btn
                                    approve
                                    approve-noc-btn
                                "
                                data-id="${request.id}"
                            >
                                Approve
                            </button>


                            <button
                                type="button"
                                class="
                                    noc-action-btn
                                    reject
                                    reject-noc-btn
                                "
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
                        noc-status
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
           FILTER DATA
        ====================================================== */

        function getFilteredRequests() {

            const search =
                (
                    searchInput
                        ? searchInput.value
                        : ""
                )
                .trim()
                .toLowerCase();


            const status =
                statusFilter
                    ? statusFilter.value
                    : "all";


            const type =
                typeFilter
                    ? typeFilter.value
                    : "all";


            return nocRequests.filter(
                function (request) {


                    const searchable = [

                        request.studentName,

                        request.registrationNo,

                        request.enrollmentNo,

                        request.organization,

                        request.campus,

                        request.course,

                        request.branch,

                        request.purpose

                    ]
                    .join(" ")
                    .toLowerCase();


                    const matchesSearch =
                        !search ||
                        searchable.includes(
                            search
                        );


                    const matchesStatus =
                        status === "all" ||
                        request.tpoStatus === status;


                    const normalizedPurpose =
                        request.purpose
                            .toLowerCase()
                            .replace(
                                /\s+/g,
                                "_"
                            );


                    const matchesType =
                        type === "all" ||
                        normalizedPurpose === type;


                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesType
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
                renderRequests
            );

        }


        /* =====================================================
           STATUS FILTER
        ====================================================== */

        if (statusFilter) {

            statusFilter.addEventListener(
                "change",
                renderRequests
            );

        }


        /* =====================================================
           PURPOSE FILTER
        ====================================================== */

        if (typeFilter) {

            typeFilter.addEventListener(
                "change",
                renderRequests
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

                        searchInput.value =
                            "";

                    }


                    if (statusFilter) {

                        statusFilter.value =
                            "all";

                    }


                    if (typeFilter) {

                        typeFilter.value =
                            "all";

                    }


                    renderRequests();

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


                    const viewButton =
                        event.target.closest(
                            ".view-noc-btn"
                        );


                    const approveButton =
                        event.target.closest(
                            ".approve-noc-btn"
                        );


                    const rejectButton =
                        event.target.closest(
                            ".reject-noc-btn"
                        );


                    if (viewButton) {

                        openDetails(
                            viewButton.dataset.id
                        );

                        return;

                    }


                    if (approveButton) {

                        approveRequest(
                            approveButton.dataset.id
                        );

                        return;

                    }


                    if (rejectButton) {

                        openRejectModal(
                            rejectButton.dataset.id
                        );

                    }

                }
            );

        }


        /* =====================================================
           APPROVE REQUEST
        ====================================================== */

        function approveRequest(
            requestId
        ) {

            const request =
                findRequest(
                    requestId
                );


            if (!request) {
                return;
            }


            if (
                request.tpoStatus !==
                "pending"
            ) {

                return;

            }


            const confirmed =
                window.confirm(

                    "Approve NOC request from " +
                    request.studentName +
                    "?"

                );


            if (!confirmed) {
                return;
            }


            /* ---------------------------------------------
               TPO APPROVAL
            ---------------------------------------------- */

            request.tpoStatus =
                "approved";


            request.tpoRemarks =
                "Approved by TPO.";


            /* ---------------------------------------------
               FINAL STATUS
               
               Authority must also approve.
            ---------------------------------------------- */

            calculateFinalStatus(
                request
            );


            renderRequests();


            if (
                request.authorityStatus ===
                "approved"
            ) {

                showToast(
                    "Both TPO and Authority have approved. NOC is finally approved."
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

            /*
             * If either side rejects,
             * final NOC is rejected.
             */

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


            /*
             * Both must approve.
             */

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


            /*
             * Otherwise still pending.
             */

            request.finalStatus =
                "pending";

        }


        /* =====================================================
           OPEN REJECT MODAL
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


        /* =====================================================
           CLOSE REJECT MODAL
        ====================================================== */

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
                        (
                            rejectReason
                                ? rejectReason.value
                                : ""
                        )
                        .trim();


                    if (!reason) {

                        alert(
                            "Please enter a rejection reason."
                        );

                        return;

                    }


                    const request =
                        findRequest(
                            selectedRequestId
                        );


                    if (!request) {

                        closeRejectModal();

                        return;

                    }


                    /* -----------------------------------------
                       TPO REJECTION
                    ------------------------------------------ */

                    request.tpoStatus =
                        "rejected";


                    request.tpoRemarks =
                        reason;


                    request.finalStatus =
                        "rejected";


                    closeRejectModal();


                    renderRequests();


                    showToast(
                        "NOC request rejected by TPO."
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
                findRequest(
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

                    <div class="noc-detail-grid">


                        <div class="noc-detail-item">

                            <span>
                                Student
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.studentName
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Registration No.
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.registrationNo
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Enrollment No.
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.enrollmentNo
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Campus
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.campus
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Course
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.course
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Branch
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.branch
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Section
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.section
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Purpose
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.purpose
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Organization
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.organization
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item">

                            <span>
                                Position / Course
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.position
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item full">

                            <span>
                                Request Date
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.requestDate
                                )}
                            </strong>

                        </div>


                        <div class="noc-detail-item full">

                            <span>
                                Student Reason
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.reason
                                )}
                            </strong>

                        </div>


                        <!-- TPO STATUS -->

                        <div class="noc-detail-item">

                            <span>
                                TPO Status
                            </span>

                            <strong>
                                ${statusBadge(
                                    request.tpoStatus
                                )}
                            </strong>

                        </div>


                        <!-- AUTHORITY STATUS -->

                        <div class="noc-detail-item">

                            <span>
                                Authority Status
                            </span>

                            <strong>
                                ${statusBadge(
                                    request.authorityStatus
                                )}
                            </strong>

                        </div>


                        <!-- FINAL STATUS -->

                        <div class="noc-detail-item full">

                            <span>
                                Final NOC Status
                            </span>

                            <strong>
                                ${statusBadge(
                                    request.finalStatus
                                )}
                            </strong>

                        </div>


                        <!-- TPO REMARKS -->

                        ${
                            request.tpoRemarks

                            ?

                            `

                            <div class="noc-detail-item full">

                                <span>
                                    TPO Remarks
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


                        <!-- AUTHORITY REMARKS -->

                        ${
                            request.authorityRemarks

                            ?

                            `

                            <div class="noc-detail-item full">

                                <span>
                                    Authority Remarks
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
                        "noc-modal-overlay"
                    )
                ) {

                    closeDetailsModal();

                    closeRejectModal();

                }

            }
        );


        /* =====================================================
           ESC KEY
        ====================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !==
                    "Escape"
                ) {

                    return;

                }


                closeDetailsModal();

                closeRejectModal();

            }
        );


        /* =====================================================
           STATS
        ====================================================== */

        function updateStats() {

            if (totalNoc) {

                totalNoc.textContent =
                    nocRequests.length;

            }


            if (pendingNoc) {

                pendingNoc.textContent =
                    nocRequests.filter(
                        function (request) {

                            return (
                                request.tpoStatus ===
                                "pending"
                            );

                        }
                    ).length;

            }


            if (approvedNoc) {

                approvedNoc.textContent =
                    nocRequests.filter(
                        function (request) {

                            return (
                                request.tpoStatus ===
                                "approved"
                            );

                        }
                    ).length;

            }


            if (rejectedNoc) {

                rejectedNoc.textContent =
                    nocRequests.filter(
                        function (request) {

                            return (
                                request.finalStatus ===
                                "rejected"
                            );

                        }
                    ).length;

            }


            if (nocCount) {

                const filtered =
                    getFilteredRequests();


                nocCount.textContent =

                    "Showing " +
                    filtered.length +
                    " request" +
                    (
                        filtered.length === 1
                            ? ""
                            : "s"
                    );

            }

        }


        /* =====================================================
           FIND REQUEST
        ====================================================== */

        function findRequest(
            requestId
        ) {

            return nocRequests.find(
                function (request) {

                    return (
                        request.id ===
                        requestId
                    );

                }
            );

        }


        /* =====================================================
           GET INITIALS
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
                    "nocToast"
                );


            if (oldToast) {

                oldToast.remove();

            }


            const toast =
                document.createElement(
                    "div"
                );


            toast.id =
                "nocToast";


            toast.textContent =
                message;


            toast.style.position =
                "fixed";


            toast.style.right =
                "24px";


            toast.style.bottom =
                "24px";


            toast.style.zIndex =
                "99999";


            toast.style.maxWidth =
                "390px";


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
           DEBUG
        ====================================================== */

        window.tpoNocRequests =
            nocRequests;


        console.log(
            "TPO NOC frontend loaded successfully."
        );

    }
);