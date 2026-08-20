/* =========================================================
   TUTOR DASHBOARD
========================================================= */


/* =========================================================
   SECTION NAVIGATION
========================================================= */

function openSection(sectionId, clickedElement = null) {

    const sections =
        document.querySelectorAll(".page-section");


    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );

    }


    // HOD STYLE SIDEBAR
    const navLinks =
        document.querySelectorAll(".hod-nav");


    navLinks.forEach(link => {

        link.classList.remove("active");

    });


    if (clickedElement) {

        clickedElement.classList.add("active");

    } else {

        const activeLink =
            document.querySelector(
                `.hod-nav[onclick*="openSection('${sectionId}'"]`
            );

        if (activeLink) {
            activeLink.classList.add("active");
        }

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   PLACEMENT DATA
========================================================= */

const placementData = {

    "2025-26": {
        placed: 24,
        interview: 8,
        applied: 11,
        notApplied: 17
    },

    "2024-25": {
        placed: 20,
        interview: 7,
        applied: 12,
        notApplied: 21
    },

    "2023-24": {
        placed: 18,
        interview: 6,
        applied: 10,
        notApplied: 26
    },

    "2022-23": {
        placed: 15,
        interview: 5,
        applied: 9,
        notApplied: 31
    }

};


/* =========================================================
   CHART VARIABLES
========================================================= */

let overviewChart = null;

let yearWiseChart = null;


/* =========================================================
   OVERVIEW DONUT
========================================================= */

function createOverviewChart(
    year = "2025-26"
) {

    const canvas =
        document.getElementById(
            "overviewChart"
        );


    if (!canvas) {
        return;
    }


    const data =
        placementData[year];


    if (overviewChart) {

        overviewChart.destroy();

    }


    overviewChart =
        new Chart(canvas, {

            type: "doughnut",

            data: {

                labels: [

                    "Placed",

                    "Interview",

                    "Applied",

                    "Not Applied"

                ],

                datasets: [{

                    data: [

                        data.placed,

                        data.interview,

                        data.applied,

                        data.notApplied

                    ],

                    backgroundColor: [

                        "#2787e8",

                        "#7445e9",

                        "#19b878",

                        "#f0a42b"

                    ],

                    borderWidth: 0,

                    hoverOffset: 4

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "66%",

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

            },

            plugins: [{

                id: "centerText",

                beforeDraw(chart) {

                    const {
                        ctx,
                        chartArea
                    } = chart;


                    if (!chartArea) {
                        return;
                    }


                    const centerX =
                        (
                            chartArea.left +
                            chartArea.right
                        ) / 2;


                    const centerY =
                        (
                            chartArea.top +
                            chartArea.bottom
                        ) / 2;


                    const total =
                        data.placed +
                        data.interview +
                        data.applied +
                        data.notApplied;


                    ctx.save();


                    ctx.textAlign = "center";

                    ctx.textBaseline = "middle";


                    ctx.font =
                        "bold 16px Segoe UI";

                    ctx.fillStyle =
                        "#17213b";


                    ctx.fillText(
                        total,
                        centerX,
                        centerY - 5
                    );


                    ctx.font =
                        "7px Segoe UI";

                    ctx.fillStyle =
                        "#7c879c";


                    ctx.fillText(
                        "Students",
                        centerX,
                        centerY + 9
                    );


                    ctx.restore();

                }

            }]

        });

}


/* =========================================================
   YEAR WISE CHART
========================================================= */

function createYearWiseChart() {

    const canvas =
        document.getElementById(
            "yearWiseChart"
        );


    if (!canvas) {
        return;
    }


    yearWiseChart =
        new Chart(canvas, {

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

                        15,

                        18,

                        20,

                        24

                    ],

                    backgroundColor: [

                        "#d8ccfc",

                        "#bea7fa",

                        "#9b78ef",

                        "#6b3fe4"

                    ],

                    borderRadius: 6,

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

                        ticks: {

                            color: "#8993a6",

                            font: {
                                size: 8
                            }

                        },

                        grid: {

                            color: "#edf0f5"

                        },

                        title: {

                            display: true,

                            text:
                                "Students Placed",

                            color: "#7d879a",

                            font: {
                                size: 8
                            }

                        }

                    },

                    x: {

                        grid: {
                            display: false
                        },

                        ticks: {

                            color: "#7d879a",

                            font: {
                                size: 8
                            }

                        },

                        title: {

                            display: true,

                            text:
                                "Academic Year",

                            color: "#7d879a",

                            font: {
                                size: 8
                            }

                        }

                    }

                }

            }

        });

}


/* =========================================================
   CHANGE YEAR
========================================================= */

function changeOverviewYear() {

    const select =
        document.getElementById(
            "overviewYear"
        );


    if (!select) {
        return;
    }


    createOverviewChart(
        select.value
    );

}


/* =========================================================
   DARK MODE
========================================================= */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "tutorDarkMode",
        isDark
    );


    updateThemeIcon();

}


/* =========================================================
   THEME ICON
========================================================= */

function updateThemeIcon() {

    const icon =
        document.getElementById(
            "themeIcon"
        );


    if (!icon) {
        return;
    }


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    icon.textContent =
        isDark ? "☀" : "☾";

}


/* =========================================================
   RESTORE THEME
========================================================= */

function restoreDarkMode() {

    const saved =
        localStorage.getItem(
            "tutorDarkMode"
        );


    if (saved === "true") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateThemeIcon();

}


/* =========================================================
   PROFILE CLICK
========================================================= */

function setupProfileClick() {

    const profile =
        document.querySelector(".profile");


    if (!profile) {
        return;
    }


    // Make profile clickable
    profile.style.cursor = "pointer";


    profile.addEventListener(
        "click",
        function() {

            openSection("profile");

        }
    );


    // Keyboard support
    profile.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                openSection("profile");

            }

        }
    );

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


    search.addEventListener(
        "input",
        function() {

            const value =
                search.value
                    .trim()
                    .toLowerCase();


            if (!value) {
                return;
            }


            console.log(
                "Tutor searching:",
                value
            );

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        restoreDarkMode();

        setupSearch();

        setupProfileClick();


        // Set Dashboard as initial active section
        const initialSection =
            document.getElementById(
                "dashboard"
            );


        if (initialSection) {

            openSection(
                "dashboard"
            );

        }


        createOverviewChart(
            "2025-26"
        );


        createYearWiseChart();

    }
);