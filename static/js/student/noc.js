/* =========================================================
   CAMPUS PLACEMENT PORTAL
   AUTHORITY — NOC REQUESTS
   FRONTEND VERSION
   TWO-SIDED APPROVAL WORKFLOW
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           DEMO NOC DATA
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
                    "Student has received an external opportunity and requires NOC for joining process.",

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
                    "Student requires NOC for higher education admission.",

                requestDate:
                    "24 Aug 2026",

                tpoStatus:
                    "approved",

                authorityStatus:
                    "pending",

                finalStatus:
                    "pending",

                tpoRemarks:
                    "TPO approved the request.",

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
                    "Student has received an external placement opportunity.",

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
                    "Student requested NOC for an external engagement.",

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
                "authorityNocTableBody"
            );


        const searchInput =
            document.getElementById(
                "authorityNocSearch"
            );


        const statusFilter =
            document.getElementById(
                "authorityNocFilter"
            );


        const resetButton =
            document.getElementById(
                "authorityNocReset"
            );


        const totalElement =
            document.getElementById(
                "authorityTotalNoc"
            );


        const pendingElement =
            document.getElementById(
                "authorityPendingNoc"
            );


        const approvedElement =
            document.getElementById(
                "authorityApprovedNoc"
            );


        const rejectedElement =
            document.getElementById(
                "authorityRejectedNoc"
            );


        const countElement =
            document.getElementById(
                "authorityNocCount"
            );


        /* =====================================================
           DETAILS MODAL
        ====================================================== */

        const detailsModal =
            document.getElementById(
                "authorityNocDetailsModal"
            );


        const detailsBody =
            document.getElementById(
                "authorityNocDetailsBody"
            );


        const closeDetails =
            document.getElementById(
                "closeAuthorityNocDetails"
            );


        const closeDetailsBottom =
            document.getElementById(
                "closeAuthorityNocDetailsBottom"
            );


        /* =====================================================
           REJECT MODAL
        ====================================================== */

        const rejectModal =
            document.getElementById(
                "authorityNocRejectModal"
            );


        const rejectReason =
            document.getElementById(
                "authorityNocRejectReason"
            );


        const closeReject =
            document.getElementById(
                "closeAuthorityNocReject"
            );


        const cancelReject =
            document.getElementById(
                "cancelAuthorityNocReject"
            );


        const confirmReject =
            document.getElementById(
                "confirmAuthorityNocReject"
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


            const requests =
                getFilteredRequests();


            tableBody.innerHTML =
                "";


            if (!requests.length) {

                tableBody.innerHTML = `

                    <tr>

                        <td
                            colspan="9"
                            style="
                                text-align:center;
                                padding:40px;
                                opacity:.55;
                            "
                        >

                            No NOC requests found.

                        </td>

                    </tr>

                `;

            }
            else {

                requests.forEach(
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
           CREATE ROW
        ====================================================== */

        function createRequestRow(
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

                <td>

                    <div
                        class="authority-noc-student"
                    >

                        <div
                            class="authority-noc-avatar"
                        >
                            ${initials}
                        </div>

                        <div>

                            <strong>
                                ${escapeHtml(
                                    request.studentName
                                )}
                            </strong>

                            <small>
                                ${escapeHtml(
                                    request.campus
                                )}
                                ·
                                ${escapeHtml(
                                    request.branch
                                )}
                                ·
                                ${escapeHtml(
                                    request.section
                                )}
                            </small>

                        </div>

                    </div>

                </td>


                <td>

                    ${escapeHtml(
                        request.registrationNo
                    )}

                </td>


                <td>

                    <span
                        class="authority-noc-purpose"
                    >
                        ${escapeHtml(
                            request.purpose
                        )}
                    </span>

                </td>


                <td>

                    ${escapeHtml(
                        request.organization
                    )}

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

                    <div
                        class="authority-noc-actions"
                    >

                        <button
                            type="button"
                            class="authority-noc-view"
                            data-id="${request.id}"
                        >
                            View
                        </button>


                        ${
                            request.authorityStatus ===
                            "pending" &&
                            request.finalStatus !==
                            "rejected"

                            ?

                            `

                            <button
                                type="button"
                                class="
                                    authority-noc-approve
                                "
                                data-id="${request.id}"
                            >
                                Approve
                            </button>


                            <button
                                type="button"
                                class="
                                    authority-noc-reject
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
                        authority-noc-status
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
           FILTERED REQUESTS
        ====================================================== */

        function getFilteredRequests() {

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


                    const searchMatch =
                        !search ||
                        searchable.includes(
                            search
                        );


                    let statusMatch =
                        true;


                    if (
                        status ===
                        "pending"
                    ) {

                        statusMatch =
                            request.authorityStatus ===
                            "pending";

                    }
                    else if (
                        status ===
                        "approved"
                    ) {

                        statusMatch =
                            request.authorityStatus ===
                            "approved";

                    }
                    else if (
                        status ===
                        "rejected"
                    ) {

                        statusMatch =
                            request.finalStatus ===
                            "rejected";

                    }


                    return (
                        searchMatch &&
                        statusMatch
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
           FILTER
        ====================================================== */

        if (statusFilter) {

            statusFilter.addEventListener(
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
                            ".authority-noc-view"
                        );


                    const approveButton =
                        event.target.closest(
                            ".authority-noc-approve"
                        );


                    const rejectButton =
                        event.target.closest(
                            ".authority-noc-reject"
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
           AUTHORITY APPROVE
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
                request.authorityStatus !==
                "pending"
            ) {

                return;

            }


            const confirmed =
                window.confirm(

                    "Approve the NOC request from " +
                    request.studentName +
                    "?"

                );


            if (!confirmed) {
                return;
            }


            /*
             * TEMPORARY FRONTEND UPDATE
             */

            request.authorityStatus =
                "approved";


            request.authorityRemarks =
                "Approved by Authority.";


            /*
             * FINAL STATUS LOGIC
             *
             * Both TPO and Authority must approve.
             */

            updateFinalStatus(
                request
            );


            renderRequests();


            showToast(
                request.finalStatus ===
                "approved"

                    ?

                    "NOC approved. Both TPO and Authority have approved."

                    :

                    "Authority approved. Waiting for TPO approval."
            );

        }


        /* =====================================================
           FINAL STATUS
        ====================================================== */

        function updateFinalStatus(
            request
        ) {

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
                        rejectReason
                            ? rejectReason.value
                                .trim()
                            : "";


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


                    /*
                     * TEMPORARY FRONTEND UPDATE
                     */

                    request.authorityStatus =
                        "rejected";


                    request.authorityRemarks =
                        reason;


                    request.finalStatus =
                        "rejected";


                    closeRejectModal();


                    renderRequests();


                    showToast(
                        "NOC request rejected by Authority."
                    );

                }
            );

        }


        /* =====================================================
           DETAILS
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
                !detailsModal ||
                !detailsBody
            ) {

                return;

            }


            detailsBody.innerHTML = `

                <div
                    class="authority-noc-detail-grid"
                >


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Student
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.studentName
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Registration No.
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.registrationNo
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Enrollment No.
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.enrollmentNo
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Campus
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.campus
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Course
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.course
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Branch
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.branch
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Section
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.section
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Purpose
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.purpose
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Organization
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.organization
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Position / Course
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.position
                            )}
                        </strong>

                    </div>


                    <div
                        class="
                            authority-noc-detail
                            authority-noc-detail-full
                        "
                    >

                        <span>
                            Student Reason
                        </span>

                        <strong>
                            ${escapeHtml(
                                request.reason
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            TPO Status
                        </span>

                        <strong>
                            ${statusBadge(
                                request.tpoStatus
                            )}
                        </strong>

                    </div>


                    <div
                        class="authority-noc-detail"
                    >

                        <span>
                            Authority Status
                        </span>

                        <strong>
                            ${statusBadge(
                                request.authorityStatus
                            )}
                        </strong>

                    </div>


                    <div
                        class="
                            authority-noc-detail
                            authority-noc-detail-full
                        "
                    >

                        <span>
                            Final Status
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

                        <div
                            class="
                                authority-noc-detail
                                authority-noc-detail-full
                            "
                        >

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


                    ${
                        request.authorityRemarks

                        ?

                        `

                        <div
                            class="
                                authority-noc-detail
                                authority-noc-detail-full
                            "
                        >

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
           OVERLAY CLICK
        ====================================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "authority-noc-modal-overlay"
                    )
                ) {

                    closeDetailsModal();

                    closeRejectModal();

                }

            }
        );


        /* =====================================================
           ESCAPE
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

            if (totalElement) {

                totalElement.textContent =
                    nocRequests.length;

            }


            if (pendingElement) {

                pendingElement.textContent =
                    nocRequests.filter(
                        function (request) {

                            return (
                                request.authorityStatus ===
                                "pending" &&
                                request.finalStatus !==
                                "rejected"
                            );

                        }
                    ).length;

            }


            if (approvedElement) {

                approvedElement.textContent =
                    nocRequests.filter(
                        function (request) {

                            return (
                                request.authorityStatus ===
                                "approved"
                            );

                        }
                    ).length;

            }


            if (rejectedElement) {

                rejectedElement.textContent =
                    nocRequests.filter(
                        function (request) {

                            return (
                                request.finalStatus ===
                                "rejected"
                            );

                        }
                    ).length;

            }


            if (countElement) {

                const filtered =
                    getFilteredRequests();


                countElement.textContent =

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

            const old =
                document.getElementById(
                    "authorityNocToast"
                );


            if (old) {
                old.remove();
            }


            const toast =
                document.createElement(
                    "div"
                );


            toast.id =
                "authorityNocToast";


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


            toast.style.border =
                "1px solid rgba(124,58,237,.35)";


            toast.style.color =
                "#ffffff";


            toast.style.fontSize =
                "11px";


            toast.style.fontWeight =
                "700";


            toast.style.boxShadow =
                "0 15px 40px rgba(0,0,0,.28)";


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
           GLOBAL DEBUG OBJECT
        ====================================================== */

        window.authorityNocRequests =
            nocRequests;


        console.log(
            "Authority NOC frontend loaded."
        );

    }
);