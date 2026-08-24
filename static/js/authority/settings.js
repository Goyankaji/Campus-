document.addEventListener("DOMContentLoaded", function () {

    const saveProfile =
        document.getElementById("saveProfile");

    const savePreferences =
        document.getElementById("savePreferences");


    /* =====================================================
       LOAD SAVED PREFERENCES
       ===================================================== */

    loadPreferences();


    function loadPreferences() {

        const savedAcademicYear =
            localStorage.getItem(
                "authority_default_academic_year"
            );


        const savedReportView =
            localStorage.getItem(
                "authority_default_report_view"
            );


        const savedPlacementNotifications =
            localStorage.getItem(
                "authority_placement_notifications"
            );


        const savedNocNotifications =
            localStorage.getItem(
                "authority_noc_notifications"
            );


        const savedAnnouncementNotifications =
            localStorage.getItem(
                "authority_announcement_notifications"
            );


        const savedSystemNotifications =
            localStorage.getItem(
                "authority_system_notifications"
            );


        if (savedAcademicYear) {

            const element =
                document.getElementById(
                    "defaultAcademicYear"
                );

            if (element) {
                element.value =
                    savedAcademicYear;
            }

        }


        if (savedReportView) {

            const element =
                document.getElementById(
                    "defaultReportView"
                );

            if (element) {
                element.value =
                    savedReportView;
            }

        }


        setCheckbox(
            "placementNotifications",
            savedPlacementNotifications
        );


        setCheckbox(
            "nocNotifications",
            savedNocNotifications
        );


        setCheckbox(
            "announcementNotifications",
            savedAnnouncementNotifications
        );


        setCheckbox(
            "systemNotifications",
            savedSystemNotifications
        );

    }


    function setCheckbox(id, value) {

        if (value === null) {
            return;
        }


        const element =
            document.getElementById(id);


        if (!element) {
            return;
        }


        element.checked =
            value === "true";

    }


    /* =====================================================
       SAVE PROFILE
       ===================================================== */

    if (saveProfile) {

        saveProfile.addEventListener(
            "click",
            function () {

                const name =
                    document.getElementById(
                        "authorityName"
                    );


                const email =
                    document.getElementById(
                        "authorityEmail"
                    );


                if (!name || !email) {
                    return;
                }


                if (
                    name.value.trim() === "" ||
                    email.value.trim() === ""
                ) {

                    alert(
                        "Please fill in the required profile details."
                    );

                    return;

                }


                alert(
                    "Profile changes saved successfully."
                );

            }
        );

    }


    /* =====================================================
       SAVE PREFERENCES
       ===================================================== */

    if (savePreferences) {

        savePreferences.addEventListener(
            "click",
            function () {

                const academicYear =
                    document.getElementById(
                        "defaultAcademicYear"
                    );


                const reportView =
                    document.getElementById(
                        "defaultReportView"
                    );


                const placementNotifications =
                    document.getElementById(
                        "placementNotifications"
                    );


                const nocNotifications =
                    document.getElementById(
                        "nocNotifications"
                    );


                const announcementNotifications =
                    document.getElementById(
                        "announcementNotifications"
                    );


                const systemNotifications =
                    document.getElementById(
                        "systemNotifications"
                    );


                if (academicYear) {

                    localStorage.setItem(
                        "authority_default_academic_year",
                        academicYear.value
                    );

                }


                if (reportView) {

                    localStorage.setItem(
                        "authority_default_report_view",
                        reportView.value
                    );

                }


                if (placementNotifications) {

                    localStorage.setItem(
                        "authority_placement_notifications",
                        placementNotifications.checked
                    );

                }


                if (nocNotifications) {

                    localStorage.setItem(
                        "authority_noc_notifications",
                        nocNotifications.checked
                    );

                }


                if (announcementNotifications) {

                    localStorage.setItem(
                        "authority_announcement_notifications",
                        announcementNotifications.checked
                    );

                }


                if (systemNotifications) {

                    localStorage.setItem(
                        "authority_system_notifications",
                        systemNotifications.checked
                    );

                }


                alert(
                    "Preferences saved successfully."
                );

            }
        );

    }

});