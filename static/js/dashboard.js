/* =========================================================
   STUDENT DASHBOARD JS
========================================================= */


/* =========================
   SECTION NAVIGATION
========================= */

function openSection(sectionId, clickedElement = null) {

    document
        .querySelectorAll(".page-section")
        .forEach(section => {
            section.classList.remove("active-section");
        });


    const section =
        document.getElementById(sectionId);


    if (section) {
        section.classList.add("active-section");
    }


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {
            link.classList.remove("active");
        });


    if (clickedElement) {
        clickedElement.classList.add("active");
    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   OPEN SECTION FROM BUTTON
========================= */

function openSectionById(sectionId) {

    const section =
        document.getElementById(sectionId);


    if (!section) {
        return;
    }


    openSection(sectionId);


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            const clickCode =
                link.getAttribute("onclick") || "";

            if (clickCode.includes(sectionId)) {
                link.classList.add("active");
            }

        });

}


/* =========================
   PROFILE DROPDOWN
========================= */

function toggleProfileMenu() {

    const menu =
        document.getElementById("profileMenu");


    if (!menu) {
        return;
    }


    menu.classList.toggle("show");

}


/* Close profile menu when clicking outside */

document.addEventListener("click", function(event) {

    const wrapper =
        document.getElementById("profileWrapper");

    const menu =
        document.getElementById("profileMenu");


    if (
        wrapper &&
        menu &&
        !wrapper.contains(event.target)
    ) {

        menu.classList.remove("show");

    }

});


/* =========================
   DARK / LIGHT MODE
========================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");


    const isDark =
        document.body.classList.contains("dark-mode");


    localStorage.setItem(
        "studentDarkMode",
        isDark ? "true" : "false"
    );


    updateThemeIcon();

}


/* Change moon/sun icon */

function updateThemeIcon() {

    const icon =
        document.getElementById("themeIcon");


    if (!icon) {
        return;
    }


    const isDark =
        document.body.classList.contains("dark-mode");


    icon.textContent =
        isDark ? "☀" : "☾";

}


/* Restore saved theme */

function restoreTheme() {

    const savedTheme =
        localStorage.getItem("studentDarkMode");


    if (savedTheme === "true") {

        document.body.classList.add("dark-mode");

    }


    updateThemeIcon();

}


/* =========================
   PLACEMENT CHART
========================= */

let placementChart = null;


function createPlacementChart() {

    const canvas =
        document.getElementById("overviewChart");


    if (!canvas) {
        return;
    }


    if (typeof Chart === "undefined") {

        console.error(
            "Chart.js could not be loaded."
        );

        return;

    }


    placementChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [
                    "Placed Students",
                    "In Interview",
                    "Yet to Appear"
                ],

                datasets: [{

                    data: [
                        480,
                        215,
                        565
                    ],

                    backgroundColor: [
                        "#2787e8",
                        "#7445e9",
                        "#19b878"
                    ],

                    borderWidth: 0

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "68%",

                plugins: {

                    legend: {

                        position: "right",

                        labels: {

                            usePointStyle: true,

                            pointStyle: "circle",

                            padding: 9,

                            font: {
                                size: 8
                            }

                        }

                    }

                }

            }

        });

}


/* =========================
   YEAR CHANGE
========================= */

function setupYearSelectors() {

    const academicYear =
        document.getElementById("academicYear");

    const overviewYear =
        document.getElementById("overviewYear");


    if (
        !academicYear ||
        !overviewYear
    ) {
        return;
    }


    academicYear.addEventListener(
        "change",
        function() {

            overviewYear.value =
                academicYear.value;

            updateChartForYear(
                academicYear.value
            );

        }
    );


    overviewYear.addEventListener(
        "change",
        function() {

            academicYear.value =
                overviewYear.value;

            updateChartForYear(
                overviewYear.value
            );

        }
    );

}


/* Change chart data according to year */

function updateChartForYear(year) {

    const yearlyData = {

        "2025-26": {
            placed: 480,
            interview: 215,
            remaining: 565
        },

        "2024-25": {
            placed: 410,
            interview: 190,
            remaining: 620
        },

        "2023-24": {
            placed: 365,
            interview: 170,
            remaining: 685
        }

    };


    const data =
        yearlyData[year] ||
        yearlyData["2025-26"];


    const total =
        data.placed +
        data.interview +
        data.remaining;


    const placedPercent =
        ((data.placed / total) * 100).toFixed(1);


    const interviewPercent =
        ((data.interview / total) * 100).toFixed(1);


    const remainingPercent =
        ((data.remaining / total) * 100).toFixed(1);


    /* =========================
       UPDATE CENTER
    ========================= */

    const totalElement =
        document.getElementById("totalStudents");

    if (totalElement) {

        totalElement.textContent =
            total.toLocaleString();

    }


    /* =========================
       UPDATE LEGEND
    ========================= */

    const placedElement =
        document.getElementById("placedValue");

    if (placedElement) {

        placedElement.textContent =
            `${data.placed} (${placedPercent}%)`;

    }


    const interviewElement =
        document.getElementById("interviewValue");

    if (interviewElement) {

        interviewElement.textContent =
            `${data.interview} (${interviewPercent}%)`;

    }


    const remainingElement =
        document.getElementById("remainingValue");

    if (remainingElement) {

        remainingElement.textContent =
            `${data.remaining} (${remainingPercent}%)`;

    }


    /* =========================
       UPDATE DONUT
    ========================= */

    const donut =
        document.getElementById("placementDonut");

    if (donut) {

        donut.style.background =
            `conic-gradient(
                #287de8 0 ${placedPercent}%,
                #7047e8 ${placedPercent}% ${Number(placedPercent) + Number(interviewPercent)}%,
                #19b36b ${Number(placedPercent) + Number(interviewPercent)}% 100%
            )`;

    }

}


/* =========================
   ADD SKILL
========================= */

function addSkill() {

    const skill =
        prompt("Enter your skill:");


    if (!skill) {
        return;
    }


    const cleanSkill =
        skill.trim();


    if (!cleanSkill) {
        return;
    }


    const list =
        document.getElementById("skillsList");


    if (!list) {
        return;
    }


    const element =
        document.createElement("span");


    element.className = "skill";


    element.innerHTML = `
        ${escapeHTML(cleanSkill)}
        <button onclick="removeSkill(this)">
            ×
        </button>
    `;


    list.appendChild(element);

}


/* =========================
   REMOVE SKILL
========================= */

function removeSkill(button) {

    if (
        confirm("Remove this skill?")
    ) {

        button
            .parentElement
            .remove();

    }

}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent = value;


    return div.innerHTML;

}


/* =========================
   EDIT PROFILE
========================= */

function toggleEditProfile() {

    const inputs =
        document.querySelectorAll(
            ".profile-fields input"
        );


    inputs.forEach(input => {

        input.disabled =
            !input.disabled;

    });

}


/* =========================
   UPLOAD MESSAGE
========================= */

function showUploadMessage() {

    alert(
        "Upload system will be connected with the database soon."
    );

}


/* =========================
   SEARCH SHORTCUT
========================= */

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
        function(event) {

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


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        restoreTheme();

        setupSearch();

        setupYearSelectors();

        createPlacementChart();

    }
);