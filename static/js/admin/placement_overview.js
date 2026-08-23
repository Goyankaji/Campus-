/* =========================================================
   CAMPUS ADMIN
   PLACEMENT OVERVIEW JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const academicYearFilter =
        document.getElementById("academicYearFilter");

    const yearRangeFilter =
        document.getElementById("yearRangeFilter");

    const refreshButton =
        document.getElementById("refreshOverview");

    const exportButton =
        document.getElementById("exportOverview");

    const collegeDetailsButton =
        document.getElementById("collegeDetailsBtn");

    const companiesButton =
        document.getElementById("companiesBtn");

    const drivesButton =
        document.getElementById("drivesBtn");


    /* =====================================================
       ACADEMIC YEAR
    ====================================================== */

    if (academicYearFilter) {

        academicYearFilter.addEventListener(
            "change",
            function () {

                const selectedYear =
                    this.value;

                showToast(
                    `Showing placement overview for ${selectedYear}`
                );

            }
        );

    }


    /* =====================================================
       YEAR RANGE
    ====================================================== */

    if (yearRangeFilter) {

        yearRangeFilter.addEventListener(
            "change",
            function () {

                const range =
                    parseInt(this.value, 10);

                updateYearChart(range);

            }
        );

    }


    /* =====================================================
       REFRESH
    ====================================================== */

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                const originalHTML =
                    this.innerHTML;

                this.disabled = true;

                this.innerHTML = `
                    <svg viewBox="0 0 24 24"
                         style="
                            animation: poSpin 0.8s linear infinite;
                         ">
                        <path d="M20 11a8.1 8.1 0 0 0-15.5-2"></path>
                        <path d="M4 5v4h4"></path>
                    </svg>
                    Refreshing
                `;

                setTimeout(() => {

                    this.disabled = false;

                    this.innerHTML =
                        originalHTML;

                    showToast(
                        "Placement overview refreshed."
                    );

                }, 900);

            }
        );

    }


    /* =====================================================
       EXPORT
    ====================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            function () {

                exportPlacementReport();

            }
        );

    }


    /* =====================================================
       COLLEGE DETAILS
    ====================================================== */

    if (collegeDetailsButton) {

        collegeDetailsButton.addEventListener(
            "click",
            function () {

                showToast(
                    "College analytics module will open here."
                );

            }
        );

    }


    /* =====================================================
       COMPANY DETAILS
    ====================================================== */

    if (companiesButton) {

        companiesButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Company management module will open here."
                );

            }
        );

    }


    /* =====================================================
       DRIVE DETAILS
    ====================================================== */

    if (drivesButton) {

        drivesButton.addEventListener(
            "click",
            function () {

                showToast(
                    "Placement drive management will open here."
                );

            }
        );

    }


    /* =====================================================
       BAR HOVER
    ====================================================== */

    const bars =
        document.querySelectorAll(".po-bar");

    bars.forEach(function (bar) {

        bar.addEventListener(
            "mouseenter",
            function () {

                const value =
                    this.dataset.value;

                if (!value) {
                    return;
                }

                this.setAttribute(
                    "title",
                    `${value} students placed`
                );

            }
        );

    });


    /* =====================================================
       YEAR CHART
    ====================================================== */

    function updateYearChart(range) {

        const columns =
            document.querySelectorAll(
                ".po-bar-column"
            );

        if (!columns.length) {
            return;
        }

        const datasets = {

            4: [
                {
                    year: "2022-23",
                    value: 610,
                    height: 61
                },
                {
                    year: "2023-24",
                    value: 710,
                    height: 71
                },
                {
                    year: "2024-25",
                    value: 790,
                    height: 79
                },
                {
                    year: "2025-26",
                    value: 865,
                    height: 86.5
                }
            ],

            3: [
                {
                    year: "2023-24",
                    value: 710,
                    height: 71
                },
                {
                    year: "2024-25",
                    value: 790,
                    height: 79
                },
                {
                    year: "2025-26",
                    value: 865,
                    height: 86.5
                }
            ],

            2: [
                {
                    year: "2024-25",
                    value: 790,
                    height: 79
                },
                {
                    year: "2025-26",
                    value: 865,
                    height: 86.5
                }
            ]

        };


        const data =
            datasets[range] || datasets[4];


        columns.forEach(
            function (column, index) {

                const item =
                    data[index];

                if (!item) {

                    column.style.display =
                        "none";

                    return;

                }


                column.style.display =
                    "flex";


                const bar =
                    column.querySelector(
                        ".po-bar"
                    );

                const label =
                    column.querySelector(
                        "small"
                    );

                const value =
                    column.querySelector(
                        "span"
                    );


                if (bar) {

                    bar.style.height =
                        `${item.height}%`;

                    bar.dataset.value =
                        item.value;

                }


                if (label) {

                    label.textContent =
                        item.year;

                }


                if (value) {

                    value.textContent =
                        item.value;

                }

            }
        );


        showToast(
            `Showing last ${range} years`
        );

    }


    /* =====================================================
       EXPORT REPORT
    ====================================================== */

    function exportPlacementReport() {

        const academicYear =
            academicYearFilter
                ? academicYearFilter.value
                : "2025-26";


        const reportData = [

            [
                "Placement Overview",
                academicYear
            ],

            [],

            [
                "Metric",
                "Value"
            ],

            [
                "Total Students",
                "1260"
            ],

            [
                "Students Placed",
                "865"
            ],

            [
                "Placement Rate",
                "68.7%"
            ],

            [
                "Recruiting Companies",
                "42"
            ],

            [
                "Active Placement Drives",
                "18"
            ],

            [
                "Offers Received",
                "910"
            ],

            [],

            [
                "College",
                "Placement Rate"
            ],

            [
                "PCE",
                "74.5%"
            ],

            [
                "PIET",
                "70.2%"
            ],

            [
                "PU",
                "66.8%"
            ],

            [
                "JIET",
                "61.7%"
            ]

        ];


        const csvContent =
            reportData
                .map(
                    row =>
                        row
                            .map(
                                cell =>
                                    `"${String(cell).replace(
                                        /"/g,
                                        '""'
                                    )}"`
                            )
                            .join(",")
                )
                .join("\n");


        const blob =
            new Blob(
                [csvContent],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            `placement-overview-${academicYear}.csv`;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);


        showToast(
            "Placement report exported successfully."
        );

    }


    /* =====================================================
       TOAST
    ====================================================== */

    function showToast(message) {

        const existingToast =
            document.querySelector(
                ".po-toast"
            );


        if (existingToast) {

            existingToast.remove();

        }


        const toast =
            document.createElement("div");


        toast.className =
            "po-toast";


        toast.innerHTML = `

            <span class="po-toast-dot"></span>

            <span>
                ${message}
            </span>

        `;


        document.body.appendChild(toast);


        requestAnimationFrame(
            function () {

                toast.classList.add(
                    "show"
                );

            }
        );


        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

                setTimeout(
                    function () {

                        toast.remove();

                    },
                    250
                );

            },
            2200
        );

    }


    /* =====================================================
       INJECT JS-ONLY STYLES
    ====================================================== */

    const style =
        document.createElement("style");


    style.textContent = `

        @keyframes poSpin {

            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }

        }


        .po-toast {

            position: fixed;

            right: 24px;

            bottom: 24px;

            z-index: 9999;

            display: flex;

            align-items: center;

            gap: 9px;

            padding: 11px 15px;

            border:
                1px solid
                rgba(139, 92, 246, 0.24);

            border-radius: 10px;

            background:
                #121d35;

            color:
                #eef2ff;

            box-shadow:
                0 15px 40px
                rgba(0, 0, 0, 0.25);

            font-family: inherit;

            font-size: 9px;

            font-weight: 650;

            opacity: 0;

            transform:
                translateY(10px);

            transition:
                opacity 0.25s ease,
                transform 0.25s ease;

        }


        .po-toast.show {

            opacity: 1;

            transform:
                translateY(0);

        }


        .po-toast-dot {

            width: 7px;

            height: 7px;

            border-radius: 50%;

            background:
                #19c98b;

            box-shadow:
                0 0 0 4px
                rgba(25, 201, 139, 0.08);

        }

    `;


    document.head.appendChild(style);

});