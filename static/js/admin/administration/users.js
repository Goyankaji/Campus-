/* =========================================================
   CAMPUS ADMIN
   USER MANAGEMENT JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById("usersSearch");

    const role =
        document.getElementById("usersRole");

    const college =
        document.getElementById("usersCollege");

    const status =
        document.getElementById("usersStatus");

    const tableBody =
        document.getElementById("usersTableBody");

    const empty =
        document.getElementById("usersEmpty");

    const count =
        document.getElementById("usersCount");

    const footerCount =
        document.getElementById("usersFooterCount");

    const clear =
        document.getElementById("clearUsersFilters");


    const detailsModal =
        document.getElementById("userDetailsModal");

    const addModal =
        document.getElementById("addUserModal");

    const addButton =
        document.getElementById("addUserBtn");

    const addForm =
        document.getElementById("addUserForm");

    const toggleButton =
        document.getElementById("toggleUserStatus");


    let currentRow = null;


    /* =====================================================
       HELPERS
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    function titleCase(value) {

        return String(value)
            .split(" ")
            .map(word => {

                if (!word) return "";

                return (
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
                );

            })
            .join(" ");

    }


    function roleText(value) {

        const roles = {

            admin: "Admin",
            tpo: "TPO",
            hod: "HOD",
            mentor: "Mentor",
            student: "Student",
            authority: "Authority"

        };

        return roles[value] || value;

    }


    function collegeText(value) {

        const colleges = {

            pce: "PCE",
            piet: "PIET",
            pu: "PU",
            jiet: "JIET",
            central: "Central"

        };

        return colleges[value] || value;

    }


    function statusText(value) {

        const statuses = {

            active: "Active",
            pending: "Pending",
            inactive: "Inactive"

        };

        return statuses[value] || value;

    }


    /* =====================================================
       FILTER
    ====================================================== */

    function filterUsers() {

        const query =
            normalize(search.value);

        const roleValue =
            normalize(role.value);

        const collegeValue =
            normalize(college.value);

        const statusValue =
            normalize(status.value);


        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            );


        let visible = 0;


        rows.forEach(row => {

            const name =
                normalize(row.dataset.name);

            const email =
                normalize(row.dataset.email);

            const userId =
                normalize(row.dataset.userid);

            const rowRole =
                normalize(row.dataset.role);

            const rowCollege =
                normalize(row.dataset.college);

            const rowStatus =
                normalize(row.dataset.status);


            const searchMatch =
                !query ||
                name.includes(query) ||
                email.includes(query) ||
                userId.includes(query);


            const roleMatch =
                roleValue === "all" ||
                rowRole === roleValue;


            const collegeMatch =
                collegeValue === "all" ||
                rowCollege === collegeValue;


            const statusMatch =
                statusValue === "all" ||
                rowStatus === statusValue;


            const visibleRow =
                searchMatch &&
                roleMatch &&
                collegeMatch &&
                statusMatch;


            row.style.display =
                visibleRow ? "" : "none";


            if (visibleRow) {
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
       CLEAR
    ====================================================== */

    function clearFilters() {

        search.value = "";
        role.value = "all";
        college.value = "all";
        status.value = "all";

        filterUsers();

    }


    /* =====================================================
       OPEN DETAILS
    ====================================================== */

    function openDetails(row) {

        currentRow = row;


        const name =
            row.dataset.name;

        const email =
            row.dataset.email;

        const userId =
            row.dataset.userid;

        const rowRole =
            row.dataset.role;

        const rowCollege =
            row.dataset.college;

        const rowStatus =
            row.dataset.status;


        const displayName =
            titleCase(name);


        document.getElementById(
            "modalUserName"
        ).textContent =
            displayName;


        document.getElementById(
            "modalUserId"
        ).textContent =
            userId;


        document.getElementById(
            "modalUserRole"
        ).textContent =
            roleText(rowRole);


        document.getElementById(
            "modalUserCollege"
        ).textContent =
            collegeText(rowCollege);


        document.getElementById(
            "modalDetailId"
        ).textContent =
            userId;


        document.getElementById(
            "modalDetailRole"
        ).textContent =
            roleText(rowRole);


        document.getElementById(
            "modalDetailCollege"
        ).textContent =
            collegeText(rowCollege);


        document.getElementById(
            "modalDetailStatus"
        ).textContent =
            statusText(rowStatus);


        document.getElementById(
            "modalDetailEmail"
        ).textContent =
            email;


        const initials =
            displayName
                .split(" ")
                .map(
                    word => word.charAt(0)
                )
                .join("")
                .substring(0,2)
                .toUpperCase();


        document.getElementById(
            "modalUserAvatar"
        ).textContent =
            initials;


        const accessText =
            document.getElementById(
                "modalAccessText"
            );


        if (rowRole === "admin") {

            accessText.textContent =
                "Full system access";

        }
        else if (
            rowRole === "tpo"
        ) {

            accessText.textContent =
                "Placement management access";

        }
        else if (
            rowRole === "hod"
        ) {

            accessText.textContent =
                "Department and student access";

        }
        else if (
            rowRole === "mentor"
        ) {

            accessText.textContent =
                "Assigned student access";

        }
        else if (
            rowRole === "student"
        ) {

            accessText.textContent =
                "Student portal access";

        }
        else {

            accessText.textContent =
                "Authority portal access";

        }


        toggleButton.textContent =
            rowStatus === "active"
                ? "Deactivate User"
                : "Activate User";


        detailsModal.hidden =
            false;

        document.body.classList.add(
            "modal-open"
        );

    }


    /* =====================================================
       VIEW
    ====================================================== */

    tableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-user-view]"
                );


            if (!button) return;


            const row =
                button.closest("tr");


            if (row) {
                openDetails(row);
            }

        }
    );


    /* =====================================================
       CLOSE DETAILS
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-user-modal]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    detailsModal.hidden =
                        true;

                    document.body.classList.remove(
                        "modal-open"
                    );

                    currentRow = null;

                }
            );

        });


    /* =====================================================
       TOGGLE USER
    ====================================================== */

    toggleButton.addEventListener(
        "click",
        () => {

            if (!currentRow) {
                return;
            }


            const oldStatus =
                currentRow.dataset.status;


            const newStatus =
                oldStatus === "active"
                    ? "inactive"
                    : "active";


            currentRow.dataset.status =
                newStatus;


            const statusElement =
                currentRow.querySelector(
                    ".users-status"
                );


            if (statusElement) {

                statusElement.className =
                    `users-status ${newStatus}`;

                statusElement.textContent =
                    statusText(newStatus);

            }


            toggleButton.textContent =
                newStatus === "active"
                    ? "Deactivate User"
                    : "Activate User";


            document.getElementById(
                "modalDetailStatus"
            ).textContent =
                statusText(newStatus);


            filterUsers();

        }
    );


    /* =====================================================
       ADD USER MODAL
    ====================================================== */

    addButton.addEventListener(
        "click",
        () => {

            addModal.hidden =
                false;

            document.body.classList.add(
                "modal-open"
            );


            setTimeout(() => {

                document.getElementById(
                    "newUserName"
                ).focus();

            },100);

        }
    );


    document
        .querySelectorAll(
            "[data-close-add-user]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    addModal.hidden =
                        true;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       ADD USER
    ====================================================== */

    addForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "newUserName"
                ).value.trim();


            if (!name) {
                return;
            }


            /*
             * Phase-1 UI only.
             * Database integration later.
             */

            alert(
                `${name} user account is ready to be saved.`
            );


            addForm.reset();

            addModal.hidden =
                true;

            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       PAGINATION UI
    ====================================================== */

    document
        .querySelectorAll(
            ".users-page-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        button.classList.contains(
                            "disabled"
                        )
                    ) {
                        return;
                    }


                    const value =
                        button.textContent.trim();


                    if (
                        value === "‹" ||
                        value === "›"
                    ) {
                        return;
                    }


                    document
                        .querySelectorAll(
                            ".users-page-btn"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );

                }
            );

        });


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


            detailsModal.hidden =
                true;

            addModal.hidden =
                true;

            document.body.classList.remove(
                "modal-open"
            );

            currentRow = null;

        }
    );


    /* =====================================================
       EVENTS
    ====================================================== */

    search.addEventListener(
        "input",
        filterUsers
    );

    role.addEventListener(
        "change",
        filterUsers
    );

    college.addEventListener(
        "change",
        filterUsers
    );

    status.addEventListener(
        "change",
        filterUsers
    );

    clear.addEventListener(
        "click",
        clearFilters
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterUsers();

});