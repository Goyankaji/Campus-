/* =========================================================
   CAMPUS — MENTOR STUDENT DETAIL JS
   VIEW-ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeStudentDetail();

});


/* =========================================================
   1. INITIALIZE
========================================================= */

function initializeStudentDetail() {

    initializeBackNavigation();
    initializeDocumentLinks();
    initializeKeyboardNavigation();

}


/* =========================================================
   2. BACK TO STUDENTS
========================================================= */

function initializeBackNavigation() {

    const backButton =
        document.querySelector(
            ".back-students-button"
        );


    if (!backButton) {
        return;
    }


    backButton.addEventListener(
        "click",
        function (event) {

            const href =
                backButton.getAttribute(
                    "href"
                );


            if (!href) {

                event.preventDefault();

                return;

            }

        }
    );

}


/* =========================================================
   3. DOCUMENT LINKS
   Documents are VIEW-ONLY
========================================================= */

function initializeDocumentLinks() {

    const documentLinks =
        document.querySelectorAll(
            ".document-view"
        );


    documentLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#" ||
                        href === "None"
                    ) {

                        event.preventDefault();

                    }

                }
            );

        }
    );

}


/* =========================================================
   4. KEYBOARD NAVIGATION
========================================================= */

function initializeKeyboardNavigation() {

    document.addEventListener(
        "keydown",
        function (event) {

            /*
             * ALT + LEFT
             * Go back to My Students
             */

            if (
                event.altKey &&
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                const backButton =
                    document.querySelector(
                        ".back-students-button"
                    );


                if (backButton) {

                    const href =
                        backButton.getAttribute(
                            "href"
                        );


                    if (href) {

                        window.location.href =
                            href;

                    }

                }

            }

        }
    );

}


/* =========================================================
   5. EXPOSE FUNCTION
========================================================= */

window.initializeStudentDetail =
    initializeStudentDetail;