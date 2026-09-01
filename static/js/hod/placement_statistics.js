/* =========================================================
   CAMPUS HOD PORTAL
   PLACEMENT STATISTICS JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initPlacementStatistics();

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

function initPlacementStatistics() {

    setupProgressBars();

    setupCardHover();

    setupResponsiveTable();

}


/* =========================================================
   PROGRESS BARS
========================================================= */

function setupProgressBars() {

    const progressBars =
        document.querySelectorAll(
            ".ps-progress-fill"
        );


    progressBars.forEach(
        function (bar) {

            const targetWidth =
                bar.style.width;


            bar.style.width = "0";


            requestAnimationFrame(
                function () {

                    setTimeout(
                        function () {

                            bar.style.width =
                                targetWidth;

                        },
                        100
                    );

                }
            );

        }
    );

}


/* =========================================================
   CARD HOVER
========================================================= */

function setupCardHover() {

    const cards =
        document.querySelectorAll(
            ".ps-kpi-card"
        );


    cards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "is-hovered"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "is-hovered"
                    );

                }
            );

        }
    );

}


/* =========================================================
   RESPONSIVE TABLE SUPPORT
========================================================= */

function setupResponsiveTable() {

    const companyRows =
        document.querySelectorAll(
            ".ps-company-row"
        );


    if (!companyRows.length) {
        return;
    }


    function updateRows() {

        const compact =
            window.innerWidth <= 900;


        companyRows.forEach(
            function (row) {

                if (compact) {

                    row.classList.add(
                        "compact"
                    );

                } else {

                    row.classList.remove(
                        "compact"
                    );

                }

            }
        );

    }


    updateRows();


    window.addEventListener(
        "resize",
        updateRows
    );

}


/* =========================================================
   OPTIONAL REFRESH HOOK
========================================================= */

function refreshPlacementStatistics() {

    setupProgressBars();

}


/* =========================================================
   PREVENT DUPLICATE INITIALIZATION
========================================================= */

window.placementStatisticsLoaded =
    true;