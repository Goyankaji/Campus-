/* =========================================================
   CAMPUS ADMIN DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    setupNavigation();
    setupTheme();
    setupSearch();

    setupOverviewYear();
    setupPerformanceChart();

    setupUserManagement();
    setupRoleManagement();

    setupModal();

    createPermissionPanel("student");

});


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    const navItems =
        document.querySelectorAll(".nav-item");

    const viewButtons =
        document.querySelectorAll("[data-view]");

    viewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const view =
                button.dataset.view;

            openView(view);

        });

    });

}


function openView(viewName) {

    document
        .querySelectorAll(".view")
        .forEach(view => {

            view.classList.remove("active");

        });


    const target =
        document.getElementById(
            `view-${viewName}`
        );


    if (target) {

        target.classList.add("active");

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(item => {

            item.classList.remove("active");

            if (
                item.dataset.view === viewName
            ) {

                item.classList.add("active");

            }

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

function setupTheme() {

    const button =
        document.getElementById(
            "themeToggle"
        );


    const saved =
        localStorage.getItem(
            "adminDarkMode"
        );


    if (saved === "true") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateThemeButton();


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const dark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "adminDarkMode",
                dark
            );


            updateThemeButton();

        }
    );

}


function updateThemeButton() {

    const button =
        document.getElementById(
            "themeToggle"
        );


    if (!button) {
        return;
    }


    const dark =
        document.body.classList.contains(
            "dark-mode"
        );


    button.textContent =
        dark ? "☀" : "☾";

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const search =
        document.getElementById(
            "globalSearch"
        );


    if (!search) {
        return;
    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                search.focus();

            }

        }
    );

}


/* =========================================================
   PLACEMENT OVERVIEW
========================================================= */

const placementData = {

    "2025-26": {
        total: 1260,
        placed: 865,
        interview: 215,
        remaining: 180
    },

    "2024-25": {
        total: 1200,
        placed: 790,
        interview: 190,
        remaining: 220
    },

    "2023-24": {
        total: 1080,
        placed: 715,
        interview: 175,
        remaining: 190
    },

    "2022-23": {
        total: 980,
        placed: 620,
        interview: 150,
        remaining: 210
    }

};


function setupOverviewYear() {

    const select =
        document.getElementById(
            "overviewYear"
        );


    if (!select) {
        return;
    }


    updateOverview(
        select.value
    );


    select.addEventListener(
        "change",
        () => {

            updateOverview(
                select.value
            );

        }
    );

}


function updateOverview(year) {

    const data =
        placementData[year];


    if (!data) {
        return;
    }


    const total =
        data.total;


    const placedPercent =
        ((data.placed / total) * 100)
            .toFixed(1);


    const interviewPercent =
        ((data.interview / total) * 100)
            .toFixed(1);


    const remainingPercent =
        ((data.remaining / total) * 100)
            .toFixed(1);


    const totalElement =
        document.getElementById(
            "totalStudents"
        );


    const placedElement =
        document.getElementById(
            "placedValue"
        );


    const interviewElement =
        document.getElementById(
            "interviewValue"
        );


    const remainingElement =
        document.getElementById(
            "remainingValue"
        );


    if (totalElement) {
        totalElement.textContent = total;
    }


    if (placedElement) {

        placedElement.textContent =
            `${data.placed} (${placedPercent}%)`;

    }


    if (interviewElement) {

        interviewElement.textContent =
            `${data.interview} (${interviewPercent}%)`;

    }


    if (remainingElement) {

        remainingElement.textContent =
            `${data.remaining} (${remainingPercent}%)`;

    }


    const donut =
        document.getElementById(
            "placementDonut"
        );


    if (!donut) {
        return;
    }


    const placedAngle =
        data.placed / total * 360;


    const interviewAngle =
        data.interview / total * 360;


    const firstEnd =
        placedAngle;


    const secondEnd =
        placedAngle +
        interviewAngle;


    donut.style.background = `
        conic-gradient(
            #2787e8 0deg ${firstEnd}deg,
            #7445e9 ${firstEnd}deg ${secondEnd}deg,
            #19b878 ${secondEnd}deg 360deg
        )
    `;

}


/* =========================================================
   YEAR-WISE PERFORMANCE CHART
========================================================= */

let performanceChart = null;


function setupPerformanceChart() {

    const canvas =
        document.getElementById(
            "placementPerformanceChart"
        );


    if (
        !canvas ||
        typeof Chart === "undefined"
    ) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    performanceChart =
        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [
                    "2022-23",
                    "2023-24",
                    "2024-25",
                    "2025-26"
                ],

                datasets: [{

                    label:
                        "Students Placed",

                    data: [
                        620,
                        715,
                        790,
                        865
                    ],

                    backgroundColor: [
                        "#d7c9fa",
                        "#b99cf5",
                        "#9870ec",
                        "#6d3ce8"
                    ],

                    borderRadius: 7,

                    borderSkipped: false,

                    barPercentage: .55

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        grid: {
                            color: "#e8ecf2"
                        },

                        ticks: {
                            color: "#8490a6",
                            font: {
                                size: 9
                            }
                        },

                        title: {

                            display: true,

                            text:
                                "Students Placed",

                            color: "#7e899e",

                            font: {
                                size: 9
                            }

                        }

                    },

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {

                            color: "#7e899e",

                            font: {
                                size: 9
                            }

                        },

                        title: {

                            display: true,

                            text:
                                "Academic Year",

                            color: "#7e899e",

                            font: {
                                size: 9
                            }

                        }

                    }

                }

            }

        });


    const range =
        document.getElementById(
            "performanceRange"
        );


    if (!range) {
        return;
    }


    range.addEventListener(
        "change",
        () => {

            updatePerformanceChart(
                Number(range.value)
            );

        }
    );

}


function updatePerformanceChart(yearCount) {

    if (!performanceChart) {
        return;
    }


    let labels;
    let data;


    if (yearCount === 3) {

        labels = [
            "2023-24",
            "2024-25",
            "2025-26"
        ];

        data = [
            715,
            790,
            865
        ];

    }
    else {

        labels = [
            "2022-23",
            "2023-24",
            "2024-25",
            "2025-26"
        ];

        data = [
            620,
            715,
            790,
            865
        ];

    }


    performanceChart.data.labels =
        labels;


    performanceChart.data.datasets[0].data =
        data;


    performanceChart.update();

}


/* =========================================================
   USER MANAGEMENT
========================================================= */

const USER_CREATE_ENDPOINT =
    "/admin/api/users";

let adminUsers = [];


function setupUserManagement() {

    const search =
        document.getElementById(
            "userSearch"
        );


    const roleFilter =
        document.getElementById(
            "userRoleFilter"
        );


    const statusFilter =
        document.getElementById(
            "userStatusFilter"
        );


    const topRoleFilter =
        document.getElementById(
            "topUserRoleFilter"
        );


    const emptyAddUserBtn =
        document.getElementById(
            "emptyAddUserBtn"
        );


    if (search) {

        search.addEventListener(
            "input",
            filterUsers
        );

    }


    if (roleFilter) {

        roleFilter.addEventListener(
            "change",
            filterUsers
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterUsers
        );

    }


    if (topRoleFilter) {

        topRoleFilter.addEventListener(
            "change",
            () => {

                if (roleFilter) {

                    roleFilter.value =
                        topRoleFilter.value;

                }

                filterUsers();

            }
        );

    }


    if (emptyAddUserBtn) {

        emptyAddUserBtn.addEventListener(
            "click",
            openUserModal
        );

    }


    renderUsers();

}


function filterUsers() {

    const search =
        (
            document.getElementById(
                "userSearch"
            )?.value || ""
        )
        .toLowerCase();


    const role =
        document.getElementById(
            "userRoleFilter"
        )?.value || "All";


    const status =
        document.getElementById(
            "userStatusFilter"
        )?.value || "All";


    document
        .querySelectorAll(
            "#usersTable tbody tr"
        )
        .forEach(row => {

            const text =
                row.textContent
                    .toLowerCase();


            const rowRole =
                row.dataset.role || "";


            const rowStatus =
                row.dataset.status || "";


            const matchesSearch =
                text.includes(search);


            const matchesRole =
                role === "All" ||
                rowRole === role;


            const matchesStatus =
                status === "All" ||
                rowStatus === status;


            row.style.display =
                matchesSearch &&
                matchesRole &&
                matchesStatus
                    ? ""
                    : "none";

        });

}


function renderUsers() {

    const tbody =
        document.querySelector(
            "#usersTable tbody"
        );


    const tableWrap =
        document.getElementById(
            "usersTableWrap"
        );


    const emptyState =
        document.getElementById(
            "usersEmptyState"
        );


    if (
        !tbody ||
        !tableWrap ||
        !emptyState
    ) {
        return;
    }


    tbody.innerHTML = "";


    if (!adminUsers.length) {

        tableWrap.style.display =
            "none";

        emptyState.style.display =
            "flex";

        return;

    }


    tableWrap.style.display =
        "block";


    emptyState.style.display =
        "none";


    adminUsers.forEach(user => {

        const tr =
            document.createElement(
                "tr"
            );


        tr.dataset.role =
            user.role;


        tr.dataset.status =
            user.status;


        tr.innerHTML = `

            <td>

                <div class="user-cell">

                    <span class="table-avatar">
                        ${escapeHtml(
                            getInitials(
                                user.name
                            )
                        )}
                    </span>

                    <div>

                        <strong>
                            ${escapeHtml(
                                user.name
                            )}
                        </strong>

                        <small>
                            ${escapeHtml(
                                user.email
                            )}
                        </small>

                    </div>

                </div>

            </td>

            <td>
                ${escapeHtml(
                    user.role
                )}
            </td>

            <td>
                ${escapeHtml(
                    user.department || "-"
                )}
            </td>

            <td>

                <span
                    class="status ${escapeHtml(
                        user.status.toLowerCase()
                    )}"
                >
                    ${escapeHtml(
                        user.status
                    )}
                </span>

            </td>

            <td>
                ${escapeHtml(
                    user.lastActive ||
                    "Just created"
                )}
            </td>

            <td>

                <button
                    class="action-btn"
                    type="button"
                >
                    ⋮
                </button>

            </td>

        `;


        tbody.appendChild(tr);

    });


    filterUsers();

}


function getInitials(name) {

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(
            part =>
                part
                    .charAt(0)
                    .toUpperCase()
        )
        .join("") || "U";

}


function escapeHtml(value) {

    return String(
        value ?? ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   ADD USER MODAL
========================================================= */

let currentUserStep = 1;


function setupModal() {

    const modal =
        document.getElementById(
            "userModal"
        );


    const openButton =
        document.getElementById(
            "addUserBtn"
        );


    const closeButton =
        document.getElementById(
            "closeUserModal"
        );


    const cancelButton =
        document.getElementById(
            "cancelUserModal"
        );


    const continueButton =
        document.getElementById(
            "continueUserStep"
        );


    const backButton =
        document.getElementById(
            "backUserStep"
        );


    const createButton =
        document.getElementById(
            "createUser"
        );


    const roleSelect =
        document.getElementById(
            "newUserRole"
        );


    if (!modal) {
        return;
    }


    if (openButton) {

        openButton.addEventListener(
            "click",
            openUserModal
        );

    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeModal
        );

    }


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            () => {

                if (!validateLoginStep()) {
                    return;
                }


                currentUserStep = 2;


                updateUserModalStep();


                updateRoleProfileForm();

            }
        );

    }


    if (backButton) {

        backButton.addEventListener(
            "click",
            () => {

                currentUserStep = 1;

                updateUserModalStep();

            }
        );

    }


    if (createButton) {

        createButton.addEventListener(
            "click",
            createUser
        );

    }


    if (roleSelect) {

        roleSelect.addEventListener(
            "change",
            updateRoleProfileForm
        );

    }


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );


    updateRoleProfileForm();

}


function openUserModal() {

    const modal =
        document.getElementById(
            "userModal"
        );


    if (!modal) {
        return;
    }


    resetUserForm();


    currentUserStep = 1;


    updateUserModalStep();


    modal.classList.add(
        "show"
    );


    document
        .getElementById(
            "newUserName"
        )
        ?.focus();

}


function closeModal() {

    const modal =
        document.getElementById(
            "userModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


function resetUserForm() {

    document
        .querySelectorAll(
            "#userModal input, #userModal select"
        )
        .forEach(field => {

            if (
                field.type === "checkbox"
            ) {

                field.checked = false;

            }
            else {

                field.value = "";

            }

        });


    const role =
        document.getElementById(
            "newUserRole"
        );


    if (role) {

        role.value =
            "Student";

    }


    updateRoleProfileForm();

}


function updateUserModalStep() {

    const step1 =
        document.getElementById(
            "userStep1"
        );


    const step2 =
        document.getElementById(
            "userStep2"
        );


    const indicator1 =
        document.getElementById(
            "stepIndicator1"
        );


    const indicator2 =
        document.getElementById(
            "stepIndicator2"
        );


    const continueButton =
        document.getElementById(
            "continueUserStep"
        );


    const backButton =
        document.getElementById(
            "backUserStep"
        );


    const createButton =
        document.getElementById(
            "createUser"
        );


    const isStep2 =
        currentUserStep === 2;


    if (step1) {

        step1.classList.toggle(
            "active",
            !isStep2
        );

    }


    if (step2) {

        step2.classList.toggle(
            "active",
            isStep2
        );

    }


    if (indicator1) {

        indicator1.classList.toggle(
            "active",
            !isStep2
        );

    }


    if (indicator2) {

        indicator2.classList.toggle(
            "active",
            isStep2
        );

    }


    if (continueButton) {

        continueButton.style.display =
            isStep2
                ? "none"
                : "inline-flex";

    }


    if (backButton) {

        backButton.style.display =
            isStep2
                ? "inline-flex"
                : "none";

    }


    if (createButton) {

        createButton.style.display =
            isStep2
                ? "inline-flex"
                : "none";

    }

}


function updateRoleProfileForm() {

    const role =
        document.getElementById(
            "newUserRole"
        )?.value ||
        "Student";


    const studentForm =
        document.getElementById(
            "studentProfileForm"
        );


    const staffForm =
        document.getElementById(
            "staffProfileForm"
        );


    const title =
        document.getElementById(
            "profileFormTitle"
        );


    const description =
        document.getElementById(
            "profileFormDescription"
        );


    const roleHelp =
        document.getElementById(
            "roleHelpCard"
        );


    const isStudent =
        role === "Student";


    if (studentForm) {

        studentForm.style.display =
            isStudent
                ? "block"
                : "none";

    }


    if (staffForm) {

        staffForm.style.display =
            isStudent
                ? "none"
                : "block";

    }


    if (title) {

        title.textContent =
            isStudent

                ? "Student Profile Details"

                : `${role} Profile Details`;

    }


    if (description) {

        description.textContent =
            isStudent

                ? "Enter the student's personal, academic and address information."

                : `Enter the professional information for this ${role} account.`;

    }


    if (roleHelp) {

        roleHelp.textContent =
            `${role} is selected. This role will be saved with the login account and can later be controlled through Role Management.`;

    }

}


function validateLoginStep() {

    const name =
        document.getElementById(
            "newUserName"
        )?.value.trim();


    const email =
        document.getElementById(
            "newUserEmail"
        )?.value.trim();


    const password =
        document.getElementById(
            "newUserPassword"
        )?.value;


    const confirmPassword =
        document.getElementById(
            "newUserConfirmPassword"
        )?.value;


    const role =
        document.getElementById(
            "newUserRole"
        )?.value;


    if (
        !name ||
        !email ||
        !password ||
        !confirmPassword ||
        !role
    ) {

        alert(
            "Please fill Name, Email, Password, Confirm Password and Role."
        );

        return false;

    }


    if (
        password.length < 6
    ) {

        alert(
            "Password must contain at least 6 characters."
        );

        return false;

    }


    if (
        password !== confirmPassword
    ) {

        alert(
            "Password and Confirm Password do not match."
        );

        return false;

    }


    return true;

}


function getProfileData(role) {

    if (
        role === "Student"
    ) {

        return {

            first_name:
                document.getElementById(
                    "studentFirstName"
                )?.value.trim() || "",

            last_name:
                document.getElementById(
                    "studentLastName"
                )?.value.trim() || "",

            dob:
                document.getElementById(
                    "studentDob"
                )?.value || "",

            gender:
                document.getElementById(
                    "studentGender"
                )?.value || "",

            phone:
                document.getElementById(
                    "studentPhone"
                )?.value.trim() || "",

            alternate_phone:
                document.getElementById(
                    "studentAltPhone"
                )?.value.trim() || "",

            roll_no:
                document.getElementById(
                    "studentRollNo"
                )?.value.trim() || "",

            department:
                document.getElementById(
                    "studentDepartment"
                )?.value.trim() || "",

            program:
                document.getElementById(
                    "studentProgram"
                )?.value.trim() || "",

            batch:
                document.getElementById(
                    "studentBatch"
                )?.value.trim() || "",

            semester:
                document.getElementById(
                    "studentSemester"
                )?.value || "",

            cgpa:
                document.getElementById(
                    "studentCgpa"
                )?.value || "",

            address:
                document.getElementById(
                    "studentAddress"
                )?.value.trim() || "",

            city:
                document.getElementById(
                    "studentCity"
                )?.value.trim() || "",

            state:
                document.getElementById(
                    "studentState"
                )?.value.trim() || ""

        };

    }


    return {

        full_name:
            document.getElementById(
                "staffFullName"
            )?.value.trim() || "",

        employee_id:
            document.getElementById(
                "staffEmployeeId"
            )?.value.trim() || "",

        department:
            document.getElementById(
                "staffDepartment"
            )?.value.trim() || "",

        designation:
            document.getElementById(
                "staffDesignation"
            )?.value.trim() || "",

        phone:
            document.getElementById(
                "staffPhone"
            )?.value.trim() || "",

        joining_date:
            document.getElementById(
                "staffJoiningDate"
            )?.value || "",

        additional_details:
            document.getElementById(
                "staffAdditionalDetails"
            )?.value.trim() || ""

    };

}


async function createUser() {

    if (!validateLoginStep()) {
        return;
    }


    const name =
        document.getElementById(
            "newUserName"
        )?.value.trim();


    const email =
        document.getElementById(
            "newUserEmail"
        )?.value.trim();


    const password =
        document.getElementById(
            "newUserPassword"
        )?.value;


    const role =
        document.getElementById(
            "newUserRole"
        )?.value;


    const payload = {

        name,

        email,

        password,

        role,

        profile:
            getProfileData(
                role
            )

    };


    const createButton =
        document.getElementById(
            "createUser"
        );


    if (createButton) {

        createButton.disabled =
            true;

        createButton.textContent =
            "Creating...";

    }


    try {

        const response =
            await fetch(
                USER_CREATE_ENDPOINT,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            payload
                        )
                }
            );


        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        const result =
            await response.json();


        adminUsers.push({

            id:
                result.id ||
                crypto.randomUUID(),

            name,

            email,

            role,

            department:
                payload.profile.department ||
                "-",

            status:
                result.status ||
                "Active",

            lastActive:
                "Just created"

        });


        renderUsers();


        closeModal();


        alert(
            "User account and profile created successfully."
        );

    }
    catch (error) {

        console.error(
            "User creation failed:",
            error
        );


        alert(

            "Frontend is ready, but the database/API route is not connected yet.\n\n" +

            `Create this Flask POST route: ${USER_CREATE_ENDPOINT}`

        );

    }
    finally {

        if (createButton) {

            createButton.disabled =
                false;

            createButton.textContent =
                "Create User";

        }

    }

}


/* =========================================================
   ROLE MANAGEMENT
========================================================= */

const rolePermissions = {

    student: [

        ["Dashboard", true],

        ["My Profile", true],

        ["Academics", true],

        ["My Uploads", true],

        ["Placement Drives", true],

        ["My Applications", true],

        ["Interviews", true],

        ["Offers & Joining", true],

        ["Announcements", true],

        ["Settings", true]

    ],


    tpo: [

        ["Dashboard", true],

        ["Student Management", true],

        ["Company Management", true],

        ["Placement Drives", true],

        ["Applications", true],

        ["Placements", true],

        ["Analytics", true],

        ["Announcements", true],

        ["Reports", true],

        ["Settings", true]

    ],


    hod: [

        ["Dashboard", true],

        ["Department Students", true],

        ["Student Academics", true],

        ["Student Placement Status", true],

        ["Department Reports", true],

        ["Announcements", true],

        ["Settings", true]

    ],


    tutor: [

        ["Dashboard", true],

        ["Assigned Students", true],

        ["Student Progress", true],

        ["Attendance", true],

        ["Announcements", true],

        ["Settings", true]

    ],


    authority: [

        ["Dashboard", true],

        ["User Management", true],

        ["Role Management", true],

        ["Companies", true],

        ["Placement Drives", true],

        ["Placements", true],

        ["Analytics", true],

        ["Announcements", true],

        ["Feedback", true],

        ["Settings", true]

    ]

};


const roleInfo = {

    student: {

        title:
            "Student",

        description:
            "Student portal access and placement journey."

    },


    tpo: {

        title:
            "TPO",

        description:
            "Placement cell management and recruitment operations."

    },


    hod: {

        title:
            "HOD",

        description:
            "Department-level student monitoring and academic oversight."

    },


    tutor: {

        title:
            "Tutor",

        description:
            "Assigned student mentoring and progress monitoring."

    },


    authority: {

        title:
            "Higher Authority",

        description:
            "High-level administration and complete system oversight."

    }

};


function setupRoleManagement() {

    document
        .querySelectorAll(
            ".role-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".role-card"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    card.classList.add(
                        "active"
                    );


                    createPermissionPanel(
                        card.dataset.rolePanel
                    );

                }
            );

        });


    const saveButton =
        document.getElementById(
            "savePermissions"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                alert(
                    "Role permissions saved successfully."
                );

            }
        );

    }

}


function createPermissionPanel(role) {

    const data =
        rolePermissions[role];


    const info =
        roleInfo[role];


    if (
        !data ||
        !info
    ) {

        return;

    }


    const title =
        document.getElementById(
            "permissionRoleTitle"
        );


    const description =
        document.getElementById(
            "permissionRoleDescription"
        );


    const grid =
        document.getElementById(
            "permissionGrid"
        );


    if (title) {

        title.textContent =
            info.title;

    }


    if (description) {

        description.textContent =
            info.description;

    }


    if (!grid) {

        return;

    }


    grid.innerHTML =
        "";


    data.forEach(
        ([permission, enabled]) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "permission-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${permission}
                    </strong>

                    <small>
                        Allow ${permission}
                        access
                    </small>

                </div>

                <input
                    type="checkbox"
                    ${enabled ? "checked" : ""}
                >

            `;


            grid.appendChild(
                item
            );

        }
    );

}