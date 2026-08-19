/* =========================================================
   ADMIN DASHBOARD JS
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


    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );

    });


    if (clickedElement) {

        clickedElement.classList.add(
            "active"
        );

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

        placed: 865,

        interview: 215,

        yetToAppear: 180

    },

    "2024-25": {

        placed: 790,

        interview: 190,

        yetToAppear: 160

    },

    "2023-24": {

        placed: 715,

        interview: 175,

        yetToAppear: 145

    },

    "2022-23": {

        placed: 620,

        interview: 150,

        yetToAppear: 130

    }

};


/* =========================================================
   CHART VARIABLES
========================================================= */

let overviewChart = null;

let yearWiseChart = null;


/* =========================================================
   PLACEMENT OVERVIEW CHART
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

                    "Placed Students",

                    "In Interview",

                    "Yet to Appear"

                ],

                datasets: [{

                    data: [

                        data.placed,

                        data.interview,

                        data.yetToAppear

                    ],

                    backgroundColor: [

                        "#2787e8",

                        "#7445e9",

                        "#19b878"

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

                            padding: 10,

                            font: {

                                size: 8

                            }

                        }

                    }

                }

            },

            plugins: [

                {

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
                            data.yetToAppear;


                        ctx.save();


                        ctx.textAlign =
                            "center";

                        ctx.textBaseline =
                            "middle";


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

                            "Total Students",

                            centerX,

                            centerY + 9

                        );


                        ctx.restore();

                    }

                }

            ]

        });

}


/* =========================================================
   YEAR-WISE PLACEMENT CHART
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

                        620,

                        715,

                        790,

                        865

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

                        grid: {

                            color:
                                "#edf0f5"

                        },

                        ticks: {

                            color:
                                "#8993a6",

                            font: {

                                size: 8

                            }

                        },

                        title: {

                            display: true,

                            text:
                                "Students Placed",

                            color:
                                "#7d879a",

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

                            color:
                                "#7d879a",

                            font: {

                                size: 8

                            }

                        },

                        title: {

                            display: true,

                            text:
                                "Academic Year",

                            color:
                                "#7d879a",

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
   CHANGE OVERVIEW YEAR
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
        "adminDarkMode",
        isDark
    );


    updateThemeIcon();

}


/* =========================================================
   UPDATE THEME ICON
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


    if (isDark) {

        icon.textContent = "☀";

    }
    else {

        icon.textContent = "☾";

    }

}


/* =========================================================
   RESTORE THEME
========================================================= */

function restoreDarkMode() {

    const saved =
        localStorage.getItem(
            "adminDarkMode"
        );


    if (saved === "true") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateThemeIcon();

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


    /* Ctrl + K */

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
                "Searching:",
                value
            );

        }
    );

}


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        restoreDarkMode();

        setupSearch();

        createOverviewChart(
            "2025-26"
        );

        createYearWiseChart();

    }
);