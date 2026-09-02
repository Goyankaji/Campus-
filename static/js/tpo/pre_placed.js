/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO — PRE-PLACED STUDENTS

   FRONTEND / UI ONLY

   APPROVAL WORKFLOW

   Student Request
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
           DEMO DATA
        ====================================================== */

        let preplacedRequests = [

            {
                id: "PP001",

                studentName: "Aarav Sharma",

                registrationNo: "PCE2027001",

                enrollmentNo: "ENR2027001",

                campus: "PCE",

                course: "B.Tech",

                branch: "CSE",

                section: "A",

                company: "Tata Consultancy Services",

                designation: "Software Engineer",

                type: "Job Offer",

                package: "₹7.5 LPA",

                joiningDate: "15 Jul 2027",

                submittedDate: "30 Aug 2026",

                tpoStatus: "pending",

                authorityStatus: "pending",

                finalStatus: "pending",

                tpoRemarks: "",

                authorityRemarks: "",

                details:
                    "Student has received an employment offer and is declaring the placement before participating in further campus placement activities."

            },


            {
                id: "PP002",

                studentName: "Priya Mehta",

                registrationNo: "PCE2027003",

                enrollmentNo: "ENR2027003",

                campus: "PCE",

                course: "B.Tech",

                branch: "ECE",

                section: "A",

                company: "Infosys",

                designation: "Systems Engineer",

                type: "Job Offer",

                package: "₹6.5 LPA",

                joiningDate: "20 Jul 2027",

                submittedDate: "28 Aug 2026",

                tpoStatus: "approved",

                authorityStatus: "pending",

                finalStatus: "pending",

                tpoRemarks:
                    "Offer details verified and approved by TPO.",

                authorityRemarks: "",

                details:
                    "Student has submitted a valid employment offer received through an external recruitment process."

            },


            {
                id: "PP003",

                studentName: "Rahul Kumar",

                registrationNo: "PCE2027002",

                enrollmentNo: "ENR2027002",

                campus: "PCET",

                course: "B.Tech",

                branch: "IT",

                section: "B",

                company: "Amazon",

                designation: "SDE Intern",

                type: "PPO",

                package: "₹12 LPA",

                joiningDate: "01 Aug 2027",

                submittedDate: "26 Aug 2026",

                tpoStatus: "pending",

                authorityStatus: "approved",

                finalStatus: "pending",

                tpoRemarks: "",

                authorityRemarks:
                    "PPO details reviewed and approved by Authority.",

                details:
                    "Student has received a pre-placement offer following an internship program."

            },


            {
                id: "PP004",

                studentName: "Karan Singh",

                registrationNo: "PCE2027004",

                enrollmentNo: "ENR2027004",

                campus: "PCET",

                course: "B.Tech",

                branch: "ME",

                section: "C",

                company: "Mahindra & Mahindra",

                designation: "Graduate Engineer Trainee",

                type: "Job Offer",

                package: "₹8 LPA",

                joiningDate: "10 Jul 2027",

                submittedDate: "24 Aug 2026",

                tpoStatus: "approved",

                authorityStatus: "approved",

                finalStatus: "approved",

                tpoRemarks:
                    "Offer verified and approved by TPO.",

                authorityRemarks:
                    "Offer approved by Authority.",

                details:
                    "Student has received an employment offer and completed the required pre-placement declaration."

            },


            {
                id: "PP005",

                studentName: "Neha Verma",

                registrationNo: "PCE2027005",

                enrollmentNo: "ENR2027005",

                campus: "PCE",

                course: "B.Tech",

                branch: "CSE",

                section: "A",

                company: "Family Business",

                designation: "Business Operations",

                type: "Family Business",

                package: "Self Managed",

                joiningDate: "01 Jul 2027",

                submittedDate: "21 Aug 2026",

                tpoStatus: "rejected",

                authorityStatus: "approved",

                finalStatus: "rejected",

                tpoRemarks:
                    "Additional supporting documents are required.",

                authorityRemarks:
                    "Reviewed and approved by Authority.",

                details:
                    "Student has declared an intention to join an existing family business after graduation."

            },


            {
                id: "PP006",

                studentName: "Riya Gupta",

                registrationNo: "PCE2027006",

                enrollmentNo: "ENR2027006",

                campus: "PCE",

                course: "B.Tech",

                branch: "ECE",

                section: "B",

                company: "TechNova Solutions",

                designation: "Software Developer",

                type: "Internship",

                package: "₹35,000 / Month",

                joiningDate: "01 Jun 2027",

                submittedDate: "18 Aug 2026",

                tpoStatus: "pending",

                authorityStatus: "pending",

                finalStatus: "pending",

                tpoRemarks: "",

                authorityRemarks: "",

                details:
                    "Student has declared a full-time internship opportunity that may lead to a future employment offer."

            }

        ];



        /* =====================================================
           ELEMENTS
        ====================================================== */

        const tableBody =
            document.getElementById(
                "preplacedTableBody"
            );


        const searchInput =
            document.getElementById(
                "preplacedSearch"
            );


        const statusFilter =
            document.getElementById(
                "preplacedStatusFilter"
            );


        const typeFilter =
            document.getElementById(
                "preplacedTypeFilter"
            );


        const resetButton =
            document.getElementById(
                "resetPreplacedFilters"
            );


        const totalPreplaced =
            document.getElementById(
                "totalPreplaced"
            );


        const tpoPendingPreplaced =
            document.getElementById(
                "tpoPendingPreplaced"
            );


        const authorityPendingPreplaced =
            document.getElementById(
                "authorityPendingPreplaced"
            );


        const approvedPreplaced =
            document.getElementById(
                "approvedPreplaced"
            );


        const preplacedCount =
            document.getElementById(
                "preplacedCount"
            );



        /* =====================================================
           DETAILS MODAL
        ====================================================== */

        const detailsModal =
            document.getElementById(
                "preplacedDetailsModal"
            );


        const detailsBody =
            document.getElementById(
                "preplacedDetailsBody"
            );


        const closeDetails =
            document.getElementById(
                "closePreplacedDetails"
            );


        const closeDetailsBottom =
            document.getElementById(
                "closePreplacedDetailsBottom"
            );



        /* =====================================================
           REJECT MODAL
        ====================================================== */

        const rejectModal =
            document.getElementById(
                "preplacedRejectModal"
            );


        const rejectReason =
            document.getElementById(
                "preplacedRejectReason"
            );


        const closeReject =
            document.getElementById(
                "closePreplacedReject"
            );


        const cancelReject =
            document.getElementById(
                "cancelPreplacedReject"
            );


        const confirmReject =
            document.getElementById(
                "confirmPreplacedReject"
            );


        let selectedRequestId =
            null;



        /* =====================================================
           INITIAL RENDER
        ====================================================== */

        renderRequests();



        /* =====================================================
           RENDER TABLE
        ====================================================== */

        function renderRequests() {

            if (!tableBody) {
                return;
            }


            const filtered =
                getFilteredRequests();


            tableBody.innerHTML = "";


            if (filtered.length === 0) {

                tableBody.innerHTML = `

                    <tr>

                        <td colspan="10">

                            <div class="preplaced-empty-state">

                                <div>
                                    ◆
                                </div>

                                <strong>
                                    No pre-placement requests found
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
                            createRequestRow(
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

        function createRequestRow(
            request
        ) {

            const row =
                document.createElement(
                    "tr"
                );


            row.dataset.id =
                request.id;


            row.innerHTML = `

                <!-- STUDENT -->

                <td>

                    <div class="preplaced-student">

                        <div class="preplaced-avatar">

                            ${getInitials(
                                request.studentName
                            )}

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



                <!-- COMPANY -->

                <td>

                    <div class="preplaced-company">

                        <strong>
                            ${escapeHtml(
                                request.company
                            )}
                        </strong>

                        <span>
                            ${escapeHtml(
                                request.designation
                            )}
                        </span>

                    </div>

                </td>



                <!-- TYPE -->

                <td>

                    <span class="preplaced-type">

                        ${escapeHtml(
                            request.type
                        )}

                    </span>

                </td>



                <!-- PACKAGE -->

                <td>

                    <strong class="preplaced-package">

                        ${escapeHtml(
                            request.package
                        )}

                    </strong>

                </td>



                <!-- SUBMITTED -->

                <td>

                    ${escapeHtml(
                        request.submittedDate
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

                    <div class="preplaced-actions">


                        <button
                            type="button"
                            class="
                                preplaced-action-btn
                                preplaced-view-btn
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
                                    preplaced-action-btn
                                    preplaced-approve-btn
                                "
                                data-action="approve"
                                data-id="${request.id}"
                            >
                                Approve
                            </button>


                            <button
                                type="button"
                                class="
                                    preplaced-action-btn
                                    preplaced-reject-btn
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
                        preplaced-status
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
           FILTER
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


            const type =
                typeFilter
                    ?
                    typeFilter.value
                    :
                    "all";


            return preplacedRequests.filter(
                function (request) {


                    /* -----------------------------------------
                       SEARCH
                    ------------------------------------------ */

                    const searchableText = [

                        request.studentName,

                        request.registrationNo,

                        request.enrollmentNo,

                        request.company,

                        request.designation,

                        request.type,

                        request.branch,

                        request.campus

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
                       TYPE
                    ------------------------------------------ */

                    const matchesType =
                        type === "all" ||
                        request.type === type;


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
           TYPE FILTER
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
                        searchInput.value = "";
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
           TPO APPROVE
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

                    "Approve the pre-placement request of " +
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


            renderRequests();


            if (
                request.authorityStatus ===
                "approved"
            ) {

                showToast(
                    "Both approvals completed. Request is finally approved."
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
               REJECTION BY EITHER SIDE
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
                        "Pre-placement request rejected by TPO."
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

                    <div class="preplaced-detail-grid">


                        <div class="preplaced-detail-item">

                            <span>
                                STUDENT
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.studentName
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                REGISTRATION NO.
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.registrationNo
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                ENROLLMENT NO.
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.enrollmentNo
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                CAMPUS
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.campus
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                COURSE
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.course
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                BRANCH
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.branch
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                COMPANY / ORGANIZATION
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.company
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                DESIGNATION
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.designation
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                TYPE
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.type
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                PACKAGE
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.package
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                JOINING DATE
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.joiningDate
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                SUBMITTED
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.submittedDate
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item full">

                            <span>
                                DECLARATION / DETAILS
                            </span>

                            <strong>
                                ${escapeHtml(
                                    request.details
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                TPO STATUS
                            </span>

                            <strong>
                                ${statusBadge(
                                    request.tpoStatus
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

                            <span>
                                AUTHORITY STATUS
                            </span>

                            <strong>
                                ${statusBadge(
                                    request.authorityStatus
                                )}
                            </strong>

                        </div>


                        <div class="preplaced-detail-item">

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

                            <div class="preplaced-detail-item full">

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

                            <div class="preplaced-detail-item full">

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
           OVERLAY
        ====================================================== */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "preplaced-modal-overlay"
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

            if (totalPreplaced) {

                totalPreplaced.textContent =
                    preplacedRequests.length;

            }


            if (tpoPendingPreplaced) {

                tpoPendingPreplaced.textContent =
                    preplacedRequests.filter(
                        function (request) {

                            return (
                                request.tpoStatus ===
                                "pending"
                            );

                        }
                    ).length;

            }


            if (authorityPendingPreplaced) {

                authorityPendingPreplaced.textContent =
                    preplacedRequests.filter(
                        function (request) {

                            return (
                                request.authorityStatus ===
                                "pending"
                            );

                        }
                    ).length;

            }


            if (approvedPreplaced) {

                approvedPreplaced.textContent =
                    preplacedRequests.filter(
                        function (request) {

                            return (
                                request.finalStatus ===
                                "approved"
                            );

                        }
                    ).length;

            }


            if (preplacedCount) {

                const count =
                    getFilteredRequests().length;


                preplacedCount.textContent =

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
           FIND REQUEST
        ====================================================== */

        function findRequest(
            requestId
        ) {

            return preplacedRequests.find(
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
                    "preplacedToast"
                );


            if (oldToast) {
                oldToast.remove();
            }


            const toast =
                document.createElement(
                    "div"
                );


            toast.id =
                "preplacedToast";


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

        window.tpoPreplacedRequests =
            preplacedRequests;


        console.log(
            "TPO Pre-Placed frontend loaded successfully."
        );

    }
);