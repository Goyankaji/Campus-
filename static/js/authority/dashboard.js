/* =========================================================
   AUTHORITY DASHBOARD JS
   ========================================================= */


/* =========================================================
   ACADEMIC YEAR
   ========================================================= */

const academicYear =
    document.getElementById("academicYear");


if (academicYear) {

    academicYear.addEventListener(
        "change",
        function () {

            console.log(
                "Academic year selected:",
                this.value
            );

        }
    );

}


/* =========================================================
   TREND FILTER
   ========================================================= */

const trendSelect =
    document.getElementById("trendSelect");


if (trendSelect) {

    trendSelect.addEventListener(
        "change",
        function () {

            console.log(
                "Trend filter:",
                this.value
            );

        }
    );

}


/* =========================================================
   STAT CARD DETAILS
   ========================================================= */

document
    .querySelectorAll(".stat-link")
    .forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const stat =
                        this.dataset.stat;

                    console.log(
                        "Dashboard stat clicked:",
                        stat
                    );

                }
            );

        }
    );


/* =========================================================
   DASHBOARD READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Authority dashboard loaded."
        );

    }
);