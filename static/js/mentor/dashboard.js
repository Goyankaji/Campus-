/* =========================================================
   CAMPUS — MENTOR DASHBOARD JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeDashboardChart();
    initializeCounters();

});


/* =========================================================
   1. PLACEMENT DOUGHNUT CHART
========================================================= */

function initializeDashboardChart() {

    const canvas =
        document.getElementById("placementChart");

    if (!canvas) {
        return;
    }

    if (typeof Chart === "undefined") {

        console.warn(
            "Chart.js is not loaded."
        );

        return;
    }


    /* =====================================================
       GET DATA FROM HTML
    ===================================================== */

    const placed =
        parseInt(
            canvas.dataset.placed || "0",
            10
        );

    const inProcess =
        parseInt(
            canvas.dataset.inProcess || "0",
            10
        );

    const notPlaced =
        parseInt(
            canvas.dataset.notPlaced || "0",
            10
        );


    const total =
        placed +
        inProcess +
        notPlaced;


    /* =====================================================
       CENTER TEXT PLUGIN
    ===================================================== */

    const centerTextPlugin = {

        id: "mentorCenterText",

        afterDraw(chart) {

            const ctx =
                chart.ctx;

            const meta =
                chart.getDatasetMeta(0);

            if (
                !meta ||
                !meta.data ||
                !meta.data.length
            ) {
                return;
            }


            const centerX =
                meta.data[0].x;

            const centerY =
                meta.data[0].y;


            ctx.save();


            /* Main number */

            ctx.font =
                "800 28px Inter, Segoe UI, Arial";

            ctx.fillStyle =
                getComputedStyle(
                    document.body
                )
                .getPropertyValue(
                    "--mentor-text"
                )
                .trim() ||
                "#172033";

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "middle";


            ctx.fillText(
                placed,
                centerX,
                centerY - 7
            );


            /* Label */

            ctx.font =
                "700 9px Inter, Segoe UI, Arial";

            ctx.fillStyle =
                getComputedStyle(
                    document.body
                )
                .getPropertyValue(
                    "--mentor-text-muted"
                )
                .trim() ||
                "#98a2b3";


            ctx.fillText(
                "PLACED",
                centerX,
                centerY + 16
            );


            ctx.restore();

        }

    };


    /* =====================================================
       CREATE CHART
    ===================================================== */

    new Chart(
        canvas,
        {

            type: "doughnut",

            data: {

                labels: [
                    "Placed",
                    "Placement Ready",
                    "Remaining"
                ],

                datasets: [

                    {

                        data: [
                            placed,
                            inProcess,
                            notPlaced
                        ],

                        borderWidth: 0,

                        spacing: 3,

                        hoverOffset: 4

                    }

                ]

            },


            plugins: [
                centerTextPlugin
            ],


            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "70%",


                animation: {

                    duration: 700

                },


                plugins: {

                    legend: {

                        display: false

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                function (
                                    context
                                ) {

                                    const value =
                                        context.raw;

                                    const percentage =
                                        total > 0
                                            ? (
                                                value /
                                                total
                                            ) * 100
                                            : 0;

                                    return (
                                        " " +
                                        value +
                                        " (" +
                                        percentage.toFixed(1) +
                                        "%)"
                                    );

                                }

                        }

                    }

                }

            }

        }
    );

}


/* =========================================================
   2. STAT COUNTERS
========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            ".stat-number[data-count]"
        );


    if (!counters.length) {
        return;
    }


    counters.forEach(
        function (counter) {

            const target =
                parseInt(
                    counter.dataset.count ||
                    "0",
                    10
                );


            animateCounter(
                counter,
                target
            );

        }
    );

}


/* =========================================================
   3. COUNTER ANIMATION
========================================================= */

function animateCounter(
    element,
    target
) {

    if (!element) {
        return;
    }


    if (
        Number.isNaN(target)
    ) {

        element.textContent =
            "0";

        return;

    }


    const duration =
        650;

    const start =
        performance.now();


    function update(
        currentTime
    ) {

        const elapsed =
            currentTime -
            start;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.round(
                target * eased
            );


        element.textContent =
            value;


        if (
            progress < 1
        ) {

            requestAnimationFrame(
                update
            );

        }

    }


    requestAnimationFrame(
        update
    );

}


/* =========================================================
   4. DASHBOARD REFRESH
========================================================= */

function refreshMentorDashboard() {

    window.location.reload();

}


/* =========================================================
   5. EXPOSE FUNCTION
========================================================= */

window.refreshMentorDashboard =
    refreshMentorDashboard;