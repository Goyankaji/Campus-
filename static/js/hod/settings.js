/* =========================================================
   CAMPUS HOD PORTAL
   SETTINGS JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navItems =
            document.querySelectorAll(
                ".settings-nav"
            );

        const sections =
            document.querySelectorAll(
                ".settings-section"
            );

        const toast =
            document.getElementById(
                "settingsToast"
            );


        /* =====================================================
           SECTION SWITCHING
        ====================================================== */

        navItems.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const target =
                            button.dataset.section;


                        navItems.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        sections.forEach(
                            function (section) {

                                section.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        const targetSection =
                            document.getElementById(
                                "settings-" + target
                            );


                        if (targetSection) {

                            targetSection.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           TOAST
        ====================================================== */

        let toastTimer = null;


        function showToast(message) {

            if (!toast) {
                return;
            }


            toast.textContent =
                message;


            toast.classList.add(
                "show"
            );


            clearTimeout(
                toastTimer
            );


            toastTimer =
                setTimeout(
                    function () {

                        toast.classList.remove(
                            "show"
                        );

                    },
                    2200
                );

        }


        /* =====================================================
           SAVE BUTTONS
        ====================================================== */

        document
            .querySelectorAll(
                "[data-save]"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            showToast(
                                "Settings saved successfully."
                            );

                        }
                    );

                }
            );


        /* =====================================================
           COMPACT TABLE
        ====================================================== */

        const compactTables =
            document.getElementById(
                "compactTables"
            );


        if (compactTables) {

            const savedCompact =
                localStorage.getItem(
                    "hodCompactTables"
                );


            if (
                savedCompact ===
                "true"
            ) {

                compactTables.checked =
                    true;

                document.body.classList.add(
                    "settings-compact-tables"
                );

            }


            compactTables.addEventListener(
                "change",
                function () {

                    document.body.classList.toggle(
                        "settings-compact-tables",
                        compactTables.checked
                    );


                    localStorage.setItem(
                        "hodCompactTables",
                        compactTables.checked
                    );

                }
            );

        }


        /* =====================================================
           NOTIFICATION PREFERENCES
        ====================================================== */

        const notificationIds = [
            "notifyApplications",
            "notifyShortlisting",
            "notifyOffers",
            "notifyAnnouncements"
        ];


        notificationIds.forEach(
            function (id) {

                const checkbox =
                    document.getElementById(
                        id
                    );


                if (!checkbox) {
                    return;
                }


                const saved =
                    localStorage.getItem(
                        "hod_" + id
                    );


                if (
                    saved ===
                    "true"
                ) {

                    checkbox.checked =
                        true;

                }

                else if (
                    saved ===
                    "false"
                ) {

                    checkbox.checked =
                        false;

                }


                checkbox.addEventListener(
                    "change",
                    function () {

                        localStorage.setItem(
                            "hod_" + id,
                            checkbox.checked
                        );

                    }
                );

            }
        );


        /* =====================================================
           PASSWORD
        ====================================================== */

        const updatePassword =
            document.getElementById(
                "updatePassword"
            );


        if (updatePassword) {

            updatePassword.addEventListener(
                "click",
                function () {

                    const current =
                        document.getElementById(
                            "currentPassword"
                        )?.value.trim();


                    const newPassword =
                        document.getElementById(
                            "newPassword"
                        )?.value.trim();


                    const confirm =
                        document.getElementById(
                            "confirmPassword"
                        )?.value.trim();


                    if (
                        !current ||
                        !newPassword ||
                        !confirm
                    ) {

                        showToast(
                            "Please fill all password fields."
                        );

                        return;

                    }


                    if (
                        newPassword.length <
                        8
                    ) {

                        showToast(
                            "New password must contain at least 8 characters."
                        );

                        return;

                    }


                    if (
                        newPassword !==
                        confirm
                    ) {

                        showToast(
                            "New passwords do not match."
                        );

                        return;

                    }


                    /*
                     * Frontend validation only.
                     *
                     * Real password update should be
                     * connected to Flask/database later.
                     */

                    showToast(
                        "Password details validated successfully."
                    );

                }
            );

        }


        /* =====================================================
           ACADEMIC SESSION
        ====================================================== */

        const academicSession =
            document.getElementById(
                "academicSession"
            );


        if (academicSession) {

            const savedSession =
                localStorage.getItem(
                    "hodAcademicSession"
                );


            if (savedSession) {

                academicSession.value =
                    savedSession;

            }


            academicSession.addEventListener(
                "change",
                function () {

                    localStorage.setItem(
                        "hodAcademicSession",
                        academicSession.value
                    );

                }
            );

        }

    }
);