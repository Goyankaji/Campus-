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


    document
        .querySelectorAll(
            "[data-filter-role]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openView("users");


                    if (roleFilter) {

                        roleFilter.value =
                            button.dataset.filterRole;

                        filterUsers();

                    }

                }
            );

        });

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
                row.dataset.role;


            const rowStatus =
                row.dataset.status;


            const matchesSearch =
                text.includes(search);


            const matchesRole =
                role === "All" ||
                rowRole === role;


            const matchesStatus =
                status === "All" ||
                rowStatus === status;


            row.style.display =
                (
                    matchesSearch &&
                    matchesRole &&
                    matchesStatus
                )
                ? ""
                : "none";

        });

}


/* =========================================================
   ADD USER MODAL
========================================================= */

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


    const createButton =
        document.getElementById(
            "createUser"
        );


    if (
        !modal ||
        !openButton
    ) {
        return;
    }


    openButton.addEventListener(
        "click",
        () => {

            modal.classList.add("show");

        }
    );


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


    if (createButton) {

        createButton.addEventListener(
            "click",
            createUser
        );

    }

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


function createUser() {

    const name =
        document.getElementById(
            "newUserName"
        )?.value.trim();


    const email =
        document.getElementById(
            "newUserEmail"
        )?.value.trim();


    const role =
        document.getElementById(
            "newUserRole"
        )?.value;


    const department =
        document.getElementById(
            "newUserDepartment"
        )?.value.trim();


    if (
        !name ||
        !email
    ) {

        alert(
            "Please enter name and email."
        );

        return;

    }


    console.log(
        "New user:",
        {
            name,
            email,
            role,
            department
        }
    );


    alert(
        `${name} created successfully.`
    );


    closeModal();

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
        title: "Student",
        description:
            "Student portal access and placement journey."
    },

    tpo: {
        title: "TPO",
        description:
            "Placement cell management and recruitment operations."
    },

    hod: {
        title: "HOD",
        description:
            "Department-level student monitoring and academic oversight."
    },

    tutor: {
        title: "Tutor",
        description:
            "Assigned student mentoring and progress monitoring."
    },

    authority: {
        title: "Higher Authority",
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


    if (!data || !info) {
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


    grid.innerHTML = "";


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


            grid.appendChild(item);

        }
    );

}