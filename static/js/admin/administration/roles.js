/* =========================================================
   CAMPUS ADMIN
   ROLE MANAGEMENT JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const roleSearch =
        document.getElementById("roleSearch");

    const roleStatus =
        document.getElementById("roleStatus");

    const rolesTable =
        document.getElementById("rolesTableBody");

    const rolesEmpty =
        document.getElementById("rolesEmpty");


    const roleModal =
        document.getElementById("roleModal");

    const addRoleModal =
        document.getElementById("addRoleModal");

    const addRoleBtn =
        document.getElementById("addRoleBtn");

    const addRoleForm =
        document.getElementById("addRoleForm");

    const savePermissions =
        document.getElementById(
            "saveRolePermissions"
        );


    /* =====================================================
       ROLE DATA
    ====================================================== */

    const roleData = {

        admin: {
            name: "Admin",
            icon: "AD",
            users: "3 Users",
            description:
                "Full platform administration access."
        },

        tpo: {
            name: "TPO",
            icon: "TP",
            users: "8 Users",
            description:
                "Placement operations and management access."
        },

        hod: {
            name: "HOD",
            icon: "HD",
            users: "16 Users",
            description:
                "Department-level student and placement access."
        },

        mentor: {
            name: "Mentor",
            icon: "MT",
            users: "27 Users",
            description:
                "Assigned student monitoring and guidance."
        },

        student: {
            name: "Student",
            icon: "ST",
            users: "126 Users",
            description:
                "Student profile and placement activities."
        },

        authority: {
            name: "Authority",
            icon: "AU",
            users: "6 Users",
            description:
                "Institution-level placement monitoring access."
        }

    };


    /* =====================================================
       FILTER TABLE
    ====================================================== */

    function filterRoles() {

        const query =
            String(roleSearch.value)
                .trim()
                .toLowerCase();


        const selectedStatus =
            roleStatus.value
                .trim()
                .toLowerCase();


        const rows =
            Array.from(
                rolesTable.querySelectorAll("tr")
            );


        let visible =
            0;


        rows.forEach(row => {

            const role =
                String(
                    row.dataset.role || ""
                ).toLowerCase();


            const status =
                String(
                    row.dataset.status || ""
                ).toLowerCase();


            const searchMatch =
                !query ||
                role.includes(query);


            const statusMatch =
                selectedStatus === "all" ||
                status === selectedStatus;


            const show =
                searchMatch &&
                statusMatch;


            row.style.display =
                show ? "" : "none";


            if (show) {
                visible++;
            }

        });


        rolesEmpty.hidden =
            visible !== 0;

    }


    /* =====================================================
       OPEN ROLE MODAL
    ====================================================== */

    function openRoleModal(role) {

        const data =
            roleData[role];


        if (!data) {
            return;
        }


        document.getElementById(
            "modalRoleName"
        ).textContent =
            data.name;


        document.getElementById(
            "modalRoleDescription"
        ).textContent =
            data.description;


        document.getElementById(
            "modalRoleIcon"
        ).textContent =
            data.icon;


        document.getElementById(
            "modalRoleUsers"
        ).textContent =
            data.users;


        roleModal.hidden =
            false;


        document.body.classList.add(
            "modal-open"
        );

    }


    /* =====================================================
       ROLE CARD CLICK
    ====================================================== */

    document
        .querySelectorAll(
            "[data-role-view]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".role-card"
                        );


                    if (!card) {
                        return;
                    }


                    const role =
                        card.dataset.role;


                    openRoleModal(role);

                }
            );

        });


    /* =====================================================
       CLOSE ROLE MODAL
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-role]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    roleModal.hidden =
                        true;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       SAVE PERMISSIONS
    ====================================================== */

    savePermissions.addEventListener(
        "click",
        () => {

            /*
             * Phase-1 UI only.
             * Actual permission persistence
             * will be connected with DB later.
             */

            alert(
                "Role permissions updated successfully."
            );


            roleModal.hidden =
                true;

            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       ADD ROLE MODAL
    ====================================================== */

    addRoleBtn.addEventListener(
        "click",
        () => {

            addRoleModal.hidden =
                false;

            document.body.classList.add(
                "modal-open"
            );


            setTimeout(() => {

                document.getElementById(
                    "newRoleName"
                ).focus();

            }, 100);

        }
    );


    /* =====================================================
       CLOSE ADD ROLE
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-add-role]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    addRoleModal.hidden =
                        true;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       ADD ROLE
    ====================================================== */

    addRoleForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const roleName =
                document.getElementById(
                    "newRoleName"
                ).value.trim();


            if (!roleName) {
                return;
            }


            /*
             * Phase-1 only.
             */

            alert(
                `${roleName} role is ready to be created.`
            );


            addRoleForm.reset();


            addRoleModal.hidden =
                true;

            document.body.classList.remove(
                "modal-open"
            );

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


            roleModal.hidden =
                true;

            addRoleModal.hidden =
                true;

            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       EVENTS
    ====================================================== */

    roleSearch.addEventListener(
        "input",
        filterRoles
    );

    roleStatus.addEventListener(
        "change",
        filterRoles
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterRoles();

});