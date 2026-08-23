/* =========================================================
   CAMPUS ADMIN
   VERIFICATION JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById(
            "verificationSearch"
        );

    const college =
        document.getElementById(
            "verificationCollege"
        );

    const type =
        document.getElementById(
            "verificationType"
        );

    const status =
        document.getElementById(
            "verificationStatus"
        );

    const tableBody =
        document.getElementById(
            "verificationTableBody"
        );

    const empty =
        document.getElementById(
            "verificationEmpty"
        );

    const count =
        document.getElementById(
            "verificationCount"
        );

    const footerCount =
        document.getElementById(
            "verificationFooterCount"
        );


    const modal =
        document.getElementById(
            "verificationModal"
        );


    const approveButton =
        document.getElementById(
            "approveVerification"
        );

    const rejectButton =
        document.getElementById(
            "rejectVerification"
        );

    const changesButton =
        document.getElementById(
            "requestChanges"
        );

    const refreshButton =
        document.getElementById(
            "refreshVerification"
        );


    let currentRow = null;


    /* =====================================================
       HELPERS
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    function typeText(value) {

        const types = {

            profile: "Profile",
            document: "Document",
            placement: "Placement",
            noc: "NOC"

        };

        return types[value] || value;

    }


    function statusText(value) {

        const statuses = {

            pending: "Pending",
            verified: "Verified",
            rejected: "Rejected",
            changes: "Changes Required"

        };

        return statuses[value] || value;

    }


    /* =====================================================
       FILTER
    ====================================================== */

    function filterVerification() {

        const query =
            normalize(search.value);

        const selectedCollege =
            normalize(college.value);

        const selectedType =
            normalize(type.value);

        const selectedStatus =
            normalize(status.value);


        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            );


        let visible = 0;


        rows.forEach(row => {

            const name =
                normalize(
                    row.dataset.name
                );

            const enrollment =
                normalize(
                    row.dataset.enrollment
                );

            const email =
                normalize(
                    row.dataset.email
                );

            const rowCollege =
                normalize(
                    row.dataset.college
                );

            const rowType =
                normalize(
                    row.dataset.type
                );

            const rowStatus =
                normalize(
                    row.dataset.status
                );


            const searchMatch =
                !query ||
                name.includes(query) ||
                enrollment.includes(query) ||
                email.includes(query);


            const collegeMatch =
                selectedCollege === "all" ||
                rowCollege === selectedCollege;


            const typeMatch =
                selectedType === "all" ||
                rowType === selectedType;


            const statusMatch =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;


            const show =
                searchMatch &&
                collegeMatch &&
                typeMatch &&
                statusMatch;


            row.style.display =
                show ? "" : "none";


            if (show) {
                visible++;
            }

        });


        count.textContent =
            visible;

        footerCount.textContent =
            visible;

        empty.hidden =
            visible !== 0;

    }


    /* =====================================================
       OPEN MODAL
    ====================================================== */

    function openVerification(row) {

        currentRow = row;


        const name =
            row.dataset.name;

        const enrollment =
            row.dataset.enrollment;

        const email =
            row.dataset.email;

        const rowCollege =
            row.dataset.college;

        const rowType =
            row.dataset.type;

        const rowDocuments =
            row.dataset.documents;


        const displayName =
            name
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");


        document.getElementById(
            "modalStudentName"
        ).textContent =
            displayName;


        document.getElementById(
            "modalStudentId"
        ).textContent =
            enrollment.toUpperCase();


        document.getElementById(
            "modalAvatar"
        ).textContent =
            displayName
                .split(" ")
                .map(
                    word =>
                        word.charAt(0)
                )
                .join("")
                .substring(0,2)
                .toUpperCase();


        document.getElementById(
            "modalCollege"
        ).textContent =
            rowCollege.toUpperCase();


        document.getElementById(
            "modalEmail"
        ).textContent =
            email;


        document.getElementById(
            "modalEnrollment"
        ).textContent =
            enrollment.toUpperCase();


        document.getElementById(
            "modalCollegeDetail"
        ).textContent =
            rowCollege.toUpperCase();


        document.getElementById(
            "modalType"
        ).textContent =
            typeText(rowType);


        document.getElementById(
            "modalDocuments"
        ).textContent =
            `${rowDocuments} Files`;


        document.getElementById(
            "verificationRemark"
        ).value = "";


        modal.hidden =
            false;

        document.body.classList.add(
            "modal-open"
        );

    }


    /* =====================================================
       REVIEW BUTTON
    ====================================================== */

    tableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-verification-view]"
                );


            if (!button) {
                return;
            }


            const row =
                button.closest("tr");


            if (row) {
                openVerification(row);
            }

        }
    );


    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-verification]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    modal.hidden =
                        true;

                    currentRow =
                        null;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       UPDATE STATUS
    ====================================================== */

    function updateVerificationStatus(
        newStatus
    ) {

        if (!currentRow) {
            return;
        }


        currentRow.dataset.status =
            newStatus;


        const statusElement =
            currentRow.querySelector(
                ".verification-status"
            );


        if (statusElement) {

            statusElement.className =
                `verification-status ${newStatus}`;

            statusElement.textContent =
                statusText(newStatus);

        }


        const actionButton =
            currentRow.querySelector(
                "[data-verification-view]"
            );


        if (actionButton) {

            actionButton.textContent =
                newStatus === "pending"
                    ? "Review"
                    : "View";

        }


        filterVerification();


        modal.hidden =
            true;

        currentRow =
            null;

        document.body.classList.remove(
            "modal-open"
        );

    }


    /* =====================================================
       APPROVE
    ====================================================== */

    approveButton.addEventListener(
        "click",
        () => {

            updateVerificationStatus(
                "verified"
            );

        }
    );


    /* =====================================================
       REJECT
    ====================================================== */

    rejectButton.addEventListener(
        "click",
        () => {

            const remark =
                document.getElementById(
                    "verificationRemark"
                ).value.trim();


            if (!remark) {

                alert(
                    "Please add a verification remark before rejecting."
                );

                return;

            }


            updateVerificationStatus(
                "rejected"
            );

        }
    );


    /* =====================================================
       REQUEST CHANGES
    ====================================================== */

    changesButton.addEventListener(
        "click",
        () => {

            const remark =
                document.getElementById(
                    "verificationRemark"
                ).value.trim();


            if (!remark) {

                alert(
                    "Please add a remark explaining the required changes."
                );

                return;

            }


            updateVerificationStatus(
                "changes"
            );

        }
    );


    /* =====================================================
       REFRESH
    ====================================================== */

    refreshButton.addEventListener(
        "click",
        () => {

            refreshButton.disabled =
                true;

            refreshButton.textContent =
                "↻ Refreshing...";


            setTimeout(() => {

                refreshButton.disabled =
                    false;

                refreshButton.textContent =
                    "↻ Refresh";

                filterVerification();

            }, 500);

        }
    );


    /* =====================================================
       ESCAPE
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            modal.hidden =
                true;

            currentRow =
                null;

            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       EVENTS
    ====================================================== */

    search.addEventListener(
        "input",
        filterVerification
    );

    college.addEventListener(
        "change",
        filterVerification
    );

    type.addEventListener(
        "change",
        filterVerification
    );

    status.addEventListener(
        "change",
        filterVerification
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterVerification();

});