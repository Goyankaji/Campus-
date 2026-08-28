/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - PLACEMENT OVERVIEW
   DATABASE CONNECTED VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const yearSelect =
        document.getElementById("overviewYear");

    const collegeSelect =
        document.getElementById("overviewCollege");

    const reportButton =
        document.querySelector(".view-report-btn");


    let selectedYear =
        yearSelect
            ? yearSelect.value
            : "";

    let selectedCollege =
        collegeSelect
            ? collegeSelect.value
            : "All Colleges";


    /* =====================================================
       HELPERS
    ====================================================== */

    function number(value) {

        const n = Number(value);

        return Number.isFinite(n)
            ? n
            : 0;
    }


    function formatNumber(value) {

        return number(value)
            .toLocaleString("en-IN");

    }


    function setKpi(index, value) {

        const cards =
            document.querySelectorAll(
                ".placement-kpi-card"
            );


        if (!cards[index]) {
            return;
        }


        const element =
            cards[index].querySelector(
                ".placement-kpi-value"
            );


        if (element) {

            element.textContent =
                value;

        }

    }


    /* =====================================================
       LOAD REAL DATABASE DATA
    ====================================================== */

    async function loadOverview() {

        try {

            const params =
                new URLSearchParams();


            if (selectedYear) {

                params.set(
                    "year",
                    selectedYear
                );

            }


            if (
                selectedCollege &&
                selectedCollege !== "All Colleges"
            ) {

                params.set(
                    "college",
                    selectedCollege
                );

            }


            const url =
                "/tpo/placement-overview/data" +
                (
                    params.toString()
                        ? "?" + params.toString()
                        : ""
                );


            console.log(
                "PLACEMENT OVERVIEW API:",
                url
            );


            const response =
                await fetch(
                    url,
                    {
                        method: "GET",

                        headers: {
                            "Accept":
                                "application/json"
                        },

                        cache:
                            "no-store"
                    }
                );


            const data =
                await response.json();


            console.log(
                "PLACEMENT OVERVIEW DATA:",
                data
            );


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Unable to load placement overview."
                );

            }


            const summary =
                data.summary || {};


            /* =================================================
               KPI 1 — TOTAL STUDENTS
            ================================================= */

            setKpi(
                0,
                formatNumber(
                    summary.total_students
                )
            );


            /* =================================================
               KPI 2 — PLACED STUDENTS
            ================================================= */

            setKpi(
                1,
                formatNumber(
                    summary.placed_students
                )
            );


            /* =================================================
               KPI 3 — PLACEMENT RATE
            ================================================= */

            setKpi(
                2,
                number(
                    summary.placement_rate
                ).toFixed(2) + "%"
            );


            /* =================================================
               KPI 4 — RECRUITING COMPANIES
            ================================================= */

            setKpi(
                3,
                formatNumber(
                    summary.recruiting_companies
                )
            );


            updateHeaderState();

            updateChart();


        }
        catch (error) {

            console.error(
                "TPO PLACEMENT OVERVIEW ERROR:",
                error
            );

        }

    }


    /* =====================================================
       YEAR CHANGE
    ====================================================== */

    if (yearSelect) {

        yearSelect.addEventListener(
            "change",
            function () {

                selectedYear =
                    yearSelect.value;


                loadOverview();

            }
        );

    }


    /* =====================================================
       COLLEGE CHANGE
    ====================================================== */

    if (collegeSelect) {

        collegeSelect.addEventListener(
            "change",
            function () {

                selectedCollege =
                    collegeSelect.value;


                loadOverview();

            }
        );

    }


    /* =====================================================
       HEADER STATE
    ====================================================== */

    function updateHeaderState() {

        const header =
            document.querySelector(
                ".placement-overview-header h1"
            );


        if (!header) {
            return;
        }


        header.setAttribute(
            "data-year",
            selectedYear
        );


        header.setAttribute(
            "data-college",
            selectedCollege
        );

    }


    /* =====================================================
       CHART
    ====================================================== */

    function updateChart() {

        const labels =
            document.querySelectorAll(
                ".chart-column > span"
            );


        if (!labels.length) {
            return;
        }


        document
            .querySelectorAll(
                ".chart-column"
            )
            .forEach(
                function (column) {

                    column.classList.remove(
                        "current"
                    );

                }
            );


        labels.forEach(
            function (label) {

                const column =
                    label.closest(
                        ".chart-column"
                    );


                if (!column) {
                    return;
                }


                if (
                    label.textContent.trim() ===
                    selectedYear
                ) {

                    column.classList.add(
                        "current"
                    );

                }

            }
        );

    }


    /* =====================================================
       REPORT BUTTON
    ====================================================== */

    if (reportButton) {

        reportButton.addEventListener(
            "click",
            function () {

                const params =
                    new URLSearchParams();


                if (selectedYear) {

                    params.set(
                        "year",
                        selectedYear
                    );

                }


                if (
                    selectedCollege &&
                    selectedCollege !== "All Colleges"
                ) {

                    params.set(
                        "college",
                        selectedCollege
                    );

                }


                console.log(
                    "Placement report requested:",
                    params.toString()
                );


                alert(
                    "Placement report for " +
                    (
                        selectedYear ||
                        "current session"
                    ) +
                    " is not connected yet."
                );

            }
        );

    }


    /* =====================================================
       CHART HOVER
    ====================================================== */

    document
        .querySelectorAll(
            ".chart-bar"
        )
        .forEach(
            function (bar) {

                bar.addEventListener(
                    "mouseenter",
                    function () {

                        bar.style.transform =
                            "scaleY(1.02)";

                        bar.style.transformOrigin =
                            "bottom";

                    }
                );


                bar.addEventListener(
                    "mouseleave",
                    function () {

                        bar.style.transform =
                            "";

                    }
                );

            }
        );


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    loadOverview();


    console.log(
        "TPO Placement Overview DB JS Loaded"
    );

});