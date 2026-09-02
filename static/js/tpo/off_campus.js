document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================================
           DEMO DATA
        ====================================================== */

        let offCampusRequests = [

            {
                id: "OC001",

                studentName:
                    "Aarav Sharma",

                registrationNo:
                    "PCE2027001",

                enrollmentNo:
                    "ENR2027001",

                campus:
                    "PCE",

                course:
                    "B.Tech",

                branch:
                    "CS",

                section:
                    "A",

                company:
                    "Tata Consultancy Services",

                position:
                    "Software Engineer",

                package:
                    "8.5 LPA",

                joiningDate:
                    "15 July 2027",

                requestDate:
                    "28 Aug 2026",

                reason:
                    "Student has received an off-campus placement opportunity and requires approval for the placement record.",

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
                id: "OC002",

                studentName:
                    "Rahul Kumar",

                registrationNo:
                    "PCE2027002",

                enrollmentNo:
                    "ENR2027002",

                campus:
                    "PCE",

                course:
                    "B.Tech",

                branch:
                    "IT",

                section:
                    "B",

                company:
                    "Infosys",

                position:
                    "Systems Engineer",

                package:
                    "7.2 LPA",

                joiningDate:
                    "20 July 2027",

                requestDate:
                    "26 Aug 2026",

                reason:
                    "Student received an external offer through an off-campus recruitment process.",

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
                id: "OC003",

                studentName:
                    "Priya Mehta",

                registrationNo:
                    "PCE2027003",

                enrollmentNo:
                    "ENR2027003",

                campus:
                    "PCE",

                course:
                    "B.Tech",

                branch:
                    "ECE",

                section:
                    "A",

                company:
                    "Deloitte",

                position:
                    "Analyst",

                package:
                    "9.0 LPA",

                joiningDate:
                    "01 August 2027",

                requestDate:
                    "24 Aug 2026",

                reason:
                    "Student has secured an off-campus opportunity and submitted the placement details for approval.",

                tpoStatus:
                    "pending",

                authorityStatus:
                    "approved",

                finalStatus:
                    "pending",

                tpoRemarks:
                    "",

                authorityRemarks:
                    "Approved by Authority."

            },


            {
                id: "OC004",

                studentName:
                    "Karan Singh",

                registrationNo:
                    "PCE2027004",

                enrollmentNo:
                    "ENR2027004",

                campus:
                    "PCET",

                course:
                    "B.Tech",

                branch:
                    "ME",

                section:
                    "C",

                company:
                    "L&T",

                position:
                    "Graduate Engineer Trainee",

                package:
                    "6.5 LPA",

                joiningDate:
                    "10 July 2027",

                requestDate:
                    "22 Aug 2026",

                reason:
                    "External placement request submitted by student.",

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
                id: "OC005",

                studentName:
                    "Neha Verma",

                registrationNo:
                    "PCE2027005",

                enrollmentNo:
                    "ENR2027005",

                campus:
                    "PCET",

                course:
                    "B.Tech",

                branch:
                    "CSE",

                section:
                    "A",

                company:
                    "Startup Technologies",

                position:
                    "Frontend Developer",

                package:
                    "5.8 LPA",

                joiningDate:
                    "05 August 2027",

                requestDate:
                    "20 Aug 2026",

                reason:
                    "Student submitted an external employment opportunity for approval.",

                tpoStatus:
                    "rejected",

                authorityStatus:
                    "approved",

                finalStatus:
                    "rejected",

                tpoRemarks:
                    "Offer details do not satisfy the current placement policy.",

                authorityRemarks:
                    "Approved by Authority."

            }

        ];


        /* =====================================================
           ELEMENT REFERENCES
        ====================================================== */

        const tableBody =
            document.getElementById(
                "offCampusTableBody"
            );


        const searchInput =
            document.getElementById(
                "offCampusSearch"
            );


        const statusFilter =
            document.getElementById(
                "offCampusStatusFilter"
            );


        const campusFilter =
            document.getElementById(
                "offCampusCampusFilter"
            );


        const resetButton =
            document.getElementById(
                "resetOffCampusFilters"
            );


        const totalRequests =
            document.getElementById(
                "totalOffCampus"
            );


        const tpoPending =
            document.getElementById(
                "tpoPendingOffCampus"
            );


        const authorityPending =
            document.getElementById(
                "authorityPendingOffCampus"
            );


        const finalApproved =
            document.getElementById(
                "approvedOffCampus"
            );


        const requestCount =
            document.getElementById(
                "offCampusCount"
            );


        /* =====================================================
           DETAILS MODAL
        ====================================================== */

        const detailsModal =
            document.getElementById(
                "offCampusDetailsModal"
            );


        const detailsBody =
            document.getElementById(
                "offCampusDetailsBody"
            );


        const closeDetails =
            document.getElementById(
                "closeOffCampusDetails"
            );


        const closeDetailsBottom =
            document.getElementById(
                "closeOffCampusDetailsBottom"
            );


        /* =====================================================
           REJECT MODAL
        ====================================================== */

        const rejectModal =
            document.getElementById(
                "offCampusRejectModal"
            );


        const rejectReason =
            document.getElementById(
                "offCampusRejectReason"
            );


        const closeReject =
            document.getElementById(
                "closeOffCampusReject"
            );


        const cancelReject =
            document.getElementById(
                "cancelOffCampusReject"
            );


        const confirmReject =
            document.getElementById(
                "confirmOffCampusReject"
            );


        let selectedRequestId =
            null;


        /* =====================================================
           INITIAL RENDER
        ====================================================== */

        renderRequests();


        /* =====================================================
           RENDER
        ====================================================== */

        function renderRequests() {

            if (!tableBody) {
                return;
            }


            const filteredRequests =
                getFilteredRequests();


            tableBody.innerHTML =
                "";


            if (
                filteredRequests.length === 0
            ) {

                tableBody.innerHTML = `

                    <tr
                        class="off-campus-empty-row"
                    >

                        <td colspan="10">

                            <div
                                class="
                                    off-campus-empty-state
                                "
                            >

                                <div
                                    class="
                                        off-campus-empty-icon
                                    "
                                >
                                    ◈
                                </div>

                                <strong>
                                    No matching requests
                                </strong>

                                <span>
                                    Try changing your
                                    search or filters.
                                </span>

                            </div>

                        </td>

                    </tr>

                `;

            }
            else {

                filteredRequests.forEach(
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


            const initials =
                getInitials(
                    request.studentName
                );


            row.dataset.id =
                request.id;


            row.innerHTML = `

                <!-- STUDENT -->

                <td>

                    <div
                        class="
                            off-campus-student-info
                        "
                    >

                        <div
                            class="
                                off-campus-student-avatar
                            "
                        >
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


                <!-- REGISTRATION -->

                <td>

                    ${escapeHtml(
                        request.registrationNo
                    )}

                </td>


                <!-- COMPANY -->

                <td>

                    <div
                        class="
                            off-campus-company
                        "
                    >

                        <strong>
                            ${escapeHtml(
                                request.company
                            )}
                        </strong>

                        <span>
                            ${escapeHtml(
                                request.campus
                            )}
                        </span>

                    </div>

                </td>


                <!-- POSITION -->

                <td>

                    ${escapeHtml(
                        request.position
                    )}

                </td>


                <!-- PACKAGE -->

                <td>

                    <span
                        class="
                            off-campus-package
                        "
                    >
                        ${escapeHtml(
                            request.package
                        )}
                    </span>

                </td>


                <!-- REQUEST DATE -->

                <td>

                    ${escapeHtml(
                        request.requestDate
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


                <!-- ACTION -->

                <td>

                    <div
                        class="
                            off-campus-actions
                        "
                    >

                        <button
                            type="button"
                            class="
                                off-campus-action-btn
                                off-campus-view-btn
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
                                    off-campus-action-btn
                                    off-campus-approve-btn
                                "
                                data-action="approve"
                                data-id="${request.id}"
                            >
                                Approve
                            </button>


                            <button
                                type="button"
                                class="
                                    off-campus-action-btn
                                    off-campus-reject-btn
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
                        off-campus-status
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

        function getFilteredRequests() {

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


            const campus =
                campusFilter
                    ?
                    campusFilter.value
                    :
                    "all";


            return offCampusRequests.filter(
                function (request) {


                    /* -----------------------------------------
                       SEARCH
                    ------------------------------------------ */

                    const searchableText = [

                        request.studentName,

                        request.registrationNo,

                        request.enrollmentNo,

                        request.company,

                        request.position,

                        request.campus,

                        request.course,

                        request.branch

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
                       CAMPUS
                    ------------------------------------------ */

                    const matchesCampus =
                        campus === "all" ||
                        request.campus ===
                            campus;


                    return (
                        matchesSearch &&
                        matchesStatus &&
                        matchesCampus
                    );

                }
            );

        }


        /* =====================================================
           SEARCH EVENT
        ====================================================== */

        if (searchInput) {

            searchInput.addEventListener(
                "input",
                renderRequests
            );

        }


        /* =====================================================
           STATUS EVENT
        ====================================================== */

        if (statusFilter) {

            statusFilter.addEventListener(
                "change",
                renderRequests
            );

        }


        /* =====================================================
           CAMPUS EVENT
        ====================================================== */

        if (campusFilter) {

            campusFilter.addEventListener(
                "change",
                renderRequests
            );

        }


        /* =====================================================
           RESET FILTERS
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


                    if (campusFilter) {

                        campusFilter.value =
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

                        approveRequest(
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
           APPROVE
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

                showToast(
                    "This request has already been processed by TPO."
                );

                return;

            }


            const confirmed =
                window.confirm(

                    "Approve off-campus request from " +
                    request.studentName +
                    "?"

                );


            if (!confirmed) {
                return;
            }


            /* ---------------------------------------------
               TPO APPROVES
            ---------------------------------------------- */

            request.tpoStatus =
                "approved";


            request.tpoRemarks =
                "Approved by TPO.";


            calculateFinalStatus(
                request
            );


            renderRequests();


            if (
                request.authorityStatus ===
                "approved"
            ) {

                showToast(
                    "Both approvals completed. Off-campus placement is finally approved."
                );

            }
            else {

                showToast(
                    "TPO approved. Waiting for Authority approval."
                );

            }

        }


        /* =====================================================
           FINAL STATUS
        ====================================================== */

        function calculateFinalStatus(
            request
        ) {


            /* ---------------------------------------------
               ANY REJECTION = FINAL REJECTED
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
               BOTH APPROVED = FINAL APPROVED
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
                        findRequest(
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


                    renderRequests();


                    showToast(
                        "Off-campus request rejected by TPO."
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
                !detailsModal
            ) {

                return;

            }


            if (detailsBody) {

                detailsBody.innerHTML = `

                    <div
                        class="
                            off-campus-detail-grid
                        "
                    >


                        <div
                            class="
                                off-campus-detail-item
                            "
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
                            class="
                                off-campus-detail-item
                            "
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
                            class="
                                off-campus-detail-item
                            "
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
                            class="
                                off-campus-detail-item
                            "
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
                            class="
                                off-campus-detail-item
                            "
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
                            class="
                                off-campus-detail-item
                            "
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
                            class="
                                off-campus-detail-item
                            "
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
                            class="
                                off-campus-detail-item
                            "
                        >

                            <span>
                                Company
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.company
                                )}
                            </strong>

                        </div>


                        <div
                            class="
                                off-campus-detail-item
                            "
                        >

                            <span>
                                Position
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.position
                                )}
                            </strong>

                        </div>


                        <div
                            class="
                                off-campus-detail-item
                            "
                        >

                            <span>
                                Package
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.package
                                )}
                            </strong>

                        </div>


                        <div
                            class="
                                off-campus-detail-item
                            "
                        >

                            <span>
                                Joining Date
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.joiningDate
                                )}
                            </strong>

                        </div>


                        <div
                            class="
                                off-campus-detail-item
                            "
                        >

                            <span>
                                Request Date
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.requestDate
                                )}
                            </strong>

                        </div>


                        <div
                            class="
                                off-campus-detail-item
                                full
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
                            class="
                                off-campus-detail-item
                            "
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
                            class="
                                off-campus-detail-item
                            "
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
                                off-campus-detail-item
                                full
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
                                    off-campus-detail-item
                                    full
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
                                    off-campus-detail-item
                                    full
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
           OVERLAY
        ====================================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "off-campus-modal-overlay"
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
                    event.key ===
                    "Escape"
                ) {

                    closeDetailsModal();

                    closeRejectModal();

                }

            }
        );


        /* =====================================================
           STATS
        ====================================================== */

        function updateStats() {

            if (totalRequests) {

                totalRequests.textContent =
                    offCampusRequests.length;

            }


            if (tpoPending) {

                tpoPending.textContent =
                    offCampusRequests.filter(
                        function (request) {

                            return (
                                request.tpoStatus ===
                                "pending"
                            );

                        }
                    ).length;

            }


            if (authorityPending) {

                authorityPending.textContent =
                    offCampusRequests.filter(
                        function (request) {

                            return (
                                request.authorityStatus ===
                                "pending"
                            );

                        }
                    ).length;

            }


            if (finalApproved) {

                finalApproved.textContent =
                    offCampusRequests.filter(
                        function (request) {

                            return (
                                request.finalStatus ===
                                "approved"
                            );

                        }
                    ).length;

            }


            if (requestCount) {

                requestCount.textContent =

                    "Showing " +
                    getFilteredRequests().length +
                    " request" +
                    (
                        getFilteredRequests().length ===
                        1
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

            return offCampusRequests.find(
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
                    "offCampusToast"
                );


            if (oldToast) {

                oldToast.remove();

            }


            const toast =
                document.createElement(
                    "div"
                );


            toast.id =
                "offCampusToast";


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
           DEBUG
        ====================================================== */

        window.tpoOffCampusRequests =
            offCampusRequests;


        console.log(
            "TPO Off Campus frontend loaded successfully."
        );

    }
);