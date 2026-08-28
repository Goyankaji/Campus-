/* =========================================================
   ADMIN ANALYTICS JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initAnalyticsReportDownload();
    initAnalyticsActions();

});


/* =========================================================
   DOWNLOAD REPORT
========================================================= */

function initAnalyticsReportDownload() {

    const button =
        document.getElementById("downloadReport");

    if (!button) {
        return;
    }


    button.addEventListener("click", function () {

        const year =
            document.getElementById("academicYear");


        const selectedYear =
            year
                ? year.value
                : "Academic Year 2025-26";


        const report = [
            ["CAMPUS PLACEMENT PORTAL"],
            ["PLACEMENT ANALYTICS"],
            [selectedYear],
            [],
            ["KEY METRICS"],
            ["Total Students", "1240"],
            ["Students Placed", "865"],
            ["Placement Rate", "69.7%"],
            ["Average Package", "8.4 LPA"],
            [],
            ["BRANCH PLACEMENT"],
            ["CSE", "78%"],
            ["IT", "72%"],
            ["ECE", "64%"],
            ["ME", "58%"],
            [],
            ["TOP RECRUITING COMPANIES"],
            ["TCS", "128 placements"],
            ["Infosys", "96 placements"],
            ["Accenture", "82 placements"],
            ["Deloitte", "64 placements"],
            ["Wipro", "52 placements"],
            [],
            ["PACKAGE STATISTICS"],
            ["Highest Package", "24 LPA"],
            ["Average Package", "8.4 LPA"],
            ["Median Package", "7.2 LPA"],
            ["Lowest Package", "3.6 LPA"],
            [],
            ["RECRUITMENT SUMMARY"],
            [
                "Company",
                "Students Placed",
                "Eligible Students",
                "Placement Rate",
                "Average Package",
                "Highest Package",
                "Status"
            ],
            [
                "TCS",
                "128",
                "150",
                "85.33%",
                "8.2 LPA",
                "14 LPA",
                "Active"
            ],
            [
                "Infosys",
                "96",
                "130",
                "73.85%",
                "7.1 LPA",
                "12 LPA",
                "Active"
            ],
            [
                "Accenture",
                "82",
                "110",
                "74.55%",
                "9.4 LPA",
                "18 LPA",
                "Active"
            ],
            [
                "Deloitte",
                "64",
                "90",
                "71.11%",
                "6.8 LPA",
                "11 LPA",
                "Active"
            ],
            [
                "Wipro",
                "52",
                "80",
                "65.00%",
                "6.2 LPA",
                "10 LPA",
                "Active"
            ]
        ];


        const csv =
            report
                .map(function (row) {

                    return row
                        .map(function (cell) {

                            const value =
                                String(cell ?? "")
                                    .replace(/"/g, '""');

                            return '"' + value + '"';

                        })
                        .join(",");

                })
                .join("\n");


        const blob =
            new Blob(
                [csv],
                {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            "placement-analytics-report.csv";


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);


        showAnalyticsToast(
            "Analytics report downloaded successfully."
        );

    });

}


/* =========================================================
   ACTION BUTTONS
========================================================= */

function initAnalyticsActions() {

    document
        .querySelectorAll(".table-action")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const row =
                        button.closest("tr");

                    if (!row) {
                        return;
                    }

                    const company =
                        row
                            .querySelector("td")
                            ?.innerText
                            .trim();


                    showAnalyticsToast(
                        "Viewing " +
                        company +
                        " analytics."
                    );

                }
            );

        });

}


/* =========================================================
   TOAST
========================================================= */

function showAnalyticsToast(message) {

    let toast =
        document.getElementById(
            "analyticsToast"
        );


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "analyticsToast";


        toast.style.position =
            "fixed";

        toast.style.right =
            "24px";

        toast.style.bottom =
            "24px";

        toast.style.zIndex =
            "99999";

        toast.style.padding =
            "12px 18px";

        toast.style.borderRadius =
            "9px";

        toast.style.background =
            "#7433ed";

        toast.style.color =
            "#ffffff";

        toast.style.fontSize =
            "13px";

        toast.style.fontWeight =
            "600";

        toast.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.3)";

        toast.style.transition =
            "opacity .25s ease";

        document.body.appendChild(toast);

    }


    toast.textContent =
        message;

    toast.style.opacity =
        "1";


    clearTimeout(
        toast._timer
    );


    toast._timer =
        setTimeout(function () {

            toast.style.opacity =
                "0";

        }, 2200);

}