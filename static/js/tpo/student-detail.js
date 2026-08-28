/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - STUDENT DETAIL PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const backBtn =
        document.getElementById("backBtn");

    const editStudentBtn =
        document.getElementById(
            "editStudentBtn"
        );


    /* =====================================================
       BACK BUTTON
    ====================================================== */

    if (backBtn) {

        backBtn.addEventListener(
            "click",
            function () {

                /*
                 * Go back to the Students page.
                 * Using history first keeps filters/search
                 * intact when the browser supports it.
                 */

                if (
                    document.referrer &&
                    document.referrer.includes(
                        "/tpo"
                    )
                ) {

                    window.history.back();

                } else {

                    window.location.href =
                        "/tpo/students";

                }

            }
        );

    }


    /* =====================================================
       EDIT STUDENT
    ====================================================== */

    if (editStudentBtn) {

        editStudentBtn.addEventListener(
            "click",
            function () {

                const registrationNo =
                    getRegistrationNumber();


                if (!registrationNo) {

                    alert(
                        "Student registration number not found."
                    );

                    return;

                }


                /*
                 * Backend edit route will be connected
                 * later.
                 */

                const editUrl =
                    "/tpo/students/" +
                    encodeURIComponent(
                        registrationNo
                    ) +
                    "/edit";


                /*
                 * Temporary behaviour until
                 * Flask edit route is created.
                 */

                console.log(
                    "Edit student:",
                    registrationNo
                );


                alert(
                    "Edit Student\n\n" +
                    "Registration No.: " +
                    registrationNo +
                    "\n\n" +
                    "Edit form will be connected here."
                );

                /*
                 * Later replace the alert with:
                 *
                 * window.location.href = editUrl;
                 */

            }
        );

    }


    /* =====================================================
       GET REGISTRATION NUMBER
    ====================================================== */

    function getRegistrationNumber() {

        const registrationElement =
            document.querySelector(
                ".profile-basic p strong"
            );


        if (!registrationElement) {

            return "";

        }


        return registrationElement
            .textContent
            .trim();

    }


    /* =====================================================
       DOCUMENT VIEW BUTTONS
    ====================================================== */

    const documentButtons =
        document.querySelectorAll(
            ".document-item button"
        );


    documentButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const documentItem =
                        button.closest(
                            ".document-item"
                        );


                    if (!documentItem) {

                        return;

                    }


                    const documentName =
                        documentItem
                            .querySelector(
                                "strong"
                            );


                    const name =
                        documentName
                            ? documentName
                                .textContent
                                .trim()
                            : "Document";


                    /*
                     * Document URLs will be supplied
                     * from Flask/database later.
                     */

                    console.log(
                        "View document:",
                        name
                    );


                    alert(
                        name +
                        "\n\n" +
                        "Document viewer will be connected later."
                    );

                }
            );

        }
    );


    /* =====================================================
       APPLICATION "VIEW ALL"
    ====================================================== */

    const viewAllApplications =
        document.querySelector(
            ".detail-card-header a"
        );


    if (viewAllApplications) {

        viewAllApplications.addEventListener(
            "click",
            function (event) {

                /*
                 * Applications page will be
                 * connected later.
                 */

                event.preventDefault();


                const registrationNo =
                    getRegistrationNumber();


                console.log(
                    "Applications for:",
                    registrationNo
                );


                /*
                 * Future route:
                 *
                 * /tpo/applications?student=<reg_no>
                 */

                alert(
                    "Student Applications\n\n" +
                    "Applications page will be connected here."
                );

            }
        );

    }


    /* =====================================================
       PROFILE DATA HELPERS
    ====================================================== */

    function getProfileData() {

        const nameElement =
            document.querySelector(
                ".profile-basic h1"
            );


        const name =
            nameElement
                ? nameElement.textContent.trim()
                : "";


        const registrationNo =
            getRegistrationNumber();


        return {

            name: name,

            registrationNo:
                registrationNo

        };

    }


    /* =====================================================
       KEYBOARD SHORTCUTS
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {


            /* ESC = Back */

            if (
                event.key === "Escape"
            ) {

                if (
                    document.activeElement &&
                    (
                        document.activeElement.tagName ===
                        "INPUT" ||
                        document.activeElement.tagName ===
                        "TEXTAREA"
                    )
                ) {

                    return;

                }


                if (backBtn) {

                    backBtn.click();

                }

            }


            /* E = Edit */

            if (
                event.key.toLowerCase() === "e" &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.altKey
            ) {

                if (
                    document.activeElement &&
                    (
                        document.activeElement.tagName ===
                        "INPUT" ||
                        document.activeElement.tagName ===
                        "TEXTAREA"
                    )
                ) {

                    return;

                }


                if (editStudentBtn) {

                    editStudentBtn.click();

                }

            }

        }
    );


    /* =====================================================
       INITIAL LOAD
    ====================================================== */

    const profile =
        getProfileData();


    console.log(
        "TPO Student Detail Loaded Successfully",
        profile
    );

});