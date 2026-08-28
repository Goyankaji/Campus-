document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ROLE DATA
       ===================================================== */

    const roleData = {

        admin: {
            name: "Admin",
            description: "System Administrator",
            id: "1",
            initial: "A",
            color: "#6d35e8"
        },

        student: {
            name: "Student",
            description: "Student User",
            id: "2",
            initial: "S",
            color: "#2d82e5"
        },

        mentor: {
            name: "Mentor",
            description: "Student Mentor",
            id: "3",
            initial: "M",
            color: "#f5a623"
        },

        hod: {
            name: "HOD",
            description: "Head of Department",
            id: "4",
            initial: "H",
            color: "#18a86b"
        },

        tpo: {
            name: "TPO",
            description: "Placement Officer",
            id: "5",
            initial: "T",
            color: "#6d35e8"
        },

        authority: {
            name: "Higher Authority",
            description: "Higher Authority",
            id: "6",
            initial: "H",
            color: "#e62e68"
        }

    };


    /* =====================================================
       ROLE SELECTION
       ===================================================== */

    const roleItems =
        document.querySelectorAll(".role-list-item");

    const roleName =
        document.getElementById("selectedRoleName");

    const roleDescription =
        document.getElementById("selectedRoleDescription");

    const roleId =
        document.getElementById("roleId");

    const roleIcon =
        document.querySelector(".selected-role-icon");


    roleItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const roleKey =
                this.dataset.role;

            const role =
                roleData[roleKey];

            if (!role) {
                return;
            }


            /* Active item */

            roleItems.forEach(function (button) {
                button.classList.remove("active");
            });

            this.classList.add("active");


            /* Update details */

            roleName.textContent =
                role.name;

            roleDescription.textContent =
                role.description;

            roleId.textContent =
                role.id;

            roleIcon.textContent =
                role.initial;

            roleIcon.style.background =
                role.color;

        });

    });


    /* =====================================================
       TABS
       ===================================================== */

    const tabs =
        document.querySelectorAll(".role-tab");

    const tabContents =
        document.querySelectorAll(".role-tab-content");


    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const target =
                this.dataset.tab;


            tabs.forEach(function (button) {
                button.classList.remove("active");
            });


            tabContents.forEach(function (content) {
                content.classList.remove("active");
            });


            this.classList.add("active");


            const targetContent =
                document.getElementById(
                    target + "Tab"
                );

            if (targetContent) {
                targetContent.classList.add("active");
            }

        });

    });


    /* =====================================================
       RESET
       ===================================================== */

    const resetButton =
        document.getElementById("resetRoleBtn");


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                const checkboxes =
                    document.querySelectorAll(
                        ".permission-toggle input"
                    );

                checkboxes.forEach(function (checkbox) {
                    checkbox.checked = true;
                });

            }
        );

    }


    /* =====================================================
       SAVE
       ===================================================== */

    const saveButton =
        document.getElementById("saveRoleBtn");


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                const originalText =
                    this.innerHTML;

                this.innerHTML =
                    "✓ &nbsp; Saved";

                setTimeout(() => {

                    this.innerHTML =
                        originalText;

                }, 1500);

            }
        );

    }


    /* =====================================================
       ADD ROLE
       ===================================================== */

    const addRoleButton =
        document.getElementById("addRoleBtn");


    if (addRoleButton) {

        addRoleButton.addEventListener(
            "click",
            function () {

                alert(
                    "Create Role functionality will be added next."
                );

            }
        );

    }


    /* =====================================================
       COPY ROLE ID
       ===================================================== */

    const copyButton =
        document.querySelector(".copy-role-btn");


    if (copyButton) {

        copyButton.addEventListener(
            "click",
            function () {

                const id =
                    roleId.textContent;

                navigator.clipboard
                    ?.writeText(id);

            }
        );

    }

});