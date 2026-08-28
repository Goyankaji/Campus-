/* =========================================================
   USER MANAGEMENT JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initUserSearch();
    initUserFilters();
    initAddUserForm();
    initPagination();

});


/* =========================================================
   SEARCH USERS
   ========================================================= */

function initUserSearch() {

    const searchInput =
        document.getElementById("userSearch");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", function () {

        filterUsers();

    });

}


/* =========================================================
   FILTERS
   ========================================================= */

function initUserFilters() {

    const roleFilter =
        document.getElementById("tableRoleFilter");

    const statusFilter =
        document.getElementById("tableStatusFilter");


    if (roleFilter) {

        roleFilter.addEventListener(
            "change",
            function () {

                const mainRoleFilter =
                    document.getElementById("roleFilter");

                if (mainRoleFilter) {
                    mainRoleFilter.value =
                        this.value;
                }

                filterUsers();

            }
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            function () {

                const mainStatusFilter =
                    document.getElementById("statusFilter");

                if (mainStatusFilter) {
                    mainStatusFilter.value =
                        this.value;
                }

                filterUsers();

            }
        );

    }


    const mainRoleFilter =
        document.getElementById("roleFilter");

    if (mainRoleFilter) {

        mainRoleFilter.addEventListener(
            "change",
            function () {

                const tableRoleFilter =
                    document.getElementById(
                        "tableRoleFilter"
                    );

                if (tableRoleFilter) {
                    tableRoleFilter.value =
                        this.value;
                }

                filterUsers();

            }
        );

    }


    const mainStatusFilter =
        document.getElementById("statusFilter");

    if (mainStatusFilter) {

        mainStatusFilter.addEventListener(
            "change",
            function () {

                const tableStatusFilter =
                    document.getElementById(
                        "tableStatusFilter"
                    );

                if (tableStatusFilter) {
                    tableStatusFilter.value =
                        this.value;
                }

                filterUsers();

            }
        );

    }

}


/* =========================================================
   FILTER FUNCTION
   ========================================================= */

function filterUsers() {

    const searchInput =
        document.getElementById("userSearch");

    const roleFilter =
        document.getElementById("tableRoleFilter");

    const statusFilter =
        document.getElementById("tableStatusFilter");


    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedRole =
        roleFilter
            ? roleFilter.value
            : "all";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const rows =
        document.querySelectorAll(
            "#usersTableBody tr"
        );


    let visibleCount = 0;


    rows.forEach(function (row) {

        const role =
            row.dataset.role || "";

        const status =
            row.dataset.status || "";


        const rowText =
            row.textContent.toLowerCase();


        const matchesSearch =
            searchValue === "" ||
            rowText.includes(searchValue);


        const matchesRole =
            selectedRole === "all" ||
            role === selectedRole;


        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (
            matchesSearch &&
            matchesRole &&
            matchesStatus
        ) {

            row.style.display = "";

            visibleCount++;

        } else {

            row.style.display = "none";

        }

    });


    updateUserCount(visibleCount);

}


/* =========================================================
   USER COUNT
   ========================================================= */

function updateUserCount(count) {

    const countElement =
        document.getElementById("userCount");

    if (!countElement) {
        return;
    }


    if (count === 0) {

        countElement.textContent =
            "No users found";

        return;
    }


    countElement.textContent =
        `Showing 1 to ${count} of ${count} users`;

}


/* =========================================================
   ADD USER MODAL
   ========================================================= */

function openAddUserModal() {

    const modal =
        document.getElementById("addUserModal");

    if (!modal) {
        return;
    }


    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeAddUserModal() {

    const modal =
        document.getElementById("addUserModal");

    if (!modal) {
        return;
    }


    modal.classList.remove("show");

    document.body.style.overflow = "";

}


/* =========================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("addUserModal");

        if (!modal) {
            return;
        }


        if (
            event.target === modal
        ) {

            closeAddUserModal();

        }

    }
);


/* =========================================================
   ESCAPE TO CLOSE MODAL
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAddUserModal();

        }

    }
);


/* =========================================================
   ADD USER FORM
   ========================================================= */

function initAddUserForm() {

    const modal =
        document.getElementById("addUserModal");

    if (!modal) {
        return;
    }


    const form =
        modal.querySelector("form");

    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*
             * Database integration will be added later.
             * For now we simply close the modal.
             */

            closeAddUserModal();

            console.log(
                "Add User form submitted"
            );

        }
    );

}


/* =========================================================
   ACTION MENU
   ========================================================= */

function toggleUserMenu(button) {

    /*
     * Temporary action menu.
     * Database actions will be connected later.
     */

    const existingMenu =
        document.querySelector(
            ".user-action-menu"
        );


    if (existingMenu) {
        existingMenu.remove();
    }


    const menu =
        document.createElement("div");

    menu.className =
        "user-action-menu";


    menu.innerHTML = `

        <button type="button"
                onclick="editUser(this)">
            Edit User
        </button>

        <button type="button"
                onclick="viewUser(this)">
            View User
        </button>

        <button type="button"
                onclick="toggleUserStatus(this)">
            Change Status
        </button>

        <button type="button"
                class="danger-action"
                onclick="deleteUser(this)">
            Delete User
        </button>

    `;


    document.body.appendChild(menu);


    const rect =
        button.getBoundingClientRect();


    menu.style.position = "fixed";

    menu.style.top =
        `${rect.bottom + 5}px`;

    menu.style.left =
        `${rect.left - 120}px`;

    menu.style.zIndex = "10000";

}


/* =========================================================
   CLOSE ACTION MENU
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                ".user-action"
            ) &&
            !event.target.closest(
                ".user-action-menu"
            )
        ) {

            const menu =
                document.querySelector(
                    ".user-action-menu"
                );

            if (menu) {
                menu.remove();
            }

        }

    }
);


/* =========================================================
   ACTIONS
   ========================================================= */

function editUser(button) {

    closeActionMenu();

    console.log(
        "Edit user clicked"
    );

}


function viewUser(button) {

    closeActionMenu();

    console.log(
        "View user clicked"
    );

}


function toggleUserStatus(button) {

    closeActionMenu();

    console.log(
        "Change user status clicked"
    );

}


function deleteUser(button) {

    closeActionMenu();

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this user?"
        );


    if (confirmed) {

        console.log(
            "Delete user confirmed"
        );

    }

}


function closeActionMenu() {

    const menu =
        document.querySelector(
            ".user-action-menu"
        );

    if (menu) {
        menu.remove();
    }

}


/* =========================================================
   PAGINATION
   ========================================================= */

function initPagination() {

    const buttons =
        document.querySelectorAll(
            ".pagination button"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                /*
                 * UI only for now.
                 * Real pagination will be connected
                 * with database data later.
                 */

                if (
                    this.textContent.trim() === "←" ||
                    this.textContent.trim() === "→"
                ) {
                    return;
                }


                buttons.forEach(function (item) {

                    item.classList.remove(
                        "active"
                    );

                });


                this.classList.add("active");

            }
        );

    });

}