document.addEventListener("DOMContentLoaded", function () {

    const academicYear =
        document.getElementById("academicYear");

    const footerYear =
        document.getElementById("footerYear");

    const exportButton =
        document.getElementById("exportReportBtn");

    const performanceFilter =
        document.getElementById("performanceFilter");


    /* =========================================
       ACADEMIC YEAR
       ========================================= */

    if (academicYear) {

        academicYear.addEventListener("change", function () {

            if (footerYear) {
                footerYear.textContent = academicYear.value;
            }

        });

    }


    /* =========================================
       PERFORMANCE FILTER
       ========================================= */

    if (performanceFilter) {

        performanceFilter.addEventListener(
            "change",
            function () {

                const selectedValue =
                    performanceFilter.value;

                console.log(
                    "Placement performance filter:",
                    selectedValue
                );

            }
        );

    }


    /* =========================================
       EXPORT REPORT
       ========================================= */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            function () {

                window.print();

            }
        );

    }


    /* =========================================
       BAR ANIMATION
       ========================================= */

    const bars =
        document.querySelectorAll(".chart-bar");

    bars.forEach(function (bar) {

        const finalHeight =
            bar.style.height;

        bar.style.height = "0";

        setTimeout(function () {

            bar.style.height = finalHeight;

        }, 150);

    });


    /* =========================================
       PROGRESS ANIMATION
       ========================================= */

    const progressBars =
        document.querySelectorAll(
            ".status-fill, .progress-track > div"
        );

    progressBars.forEach(function (bar) {

        const finalWidth =
            bar.style.width;

        bar.style.width = "0";

        setTimeout(function () {

            bar.style.width = finalWidth;

        }, 150);

    });

});