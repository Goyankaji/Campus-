/* =========================================================
   CAMPUS ADMIN
   STUDENT MANAGEMENT JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById("studentSearch");

    const college =
        document.getElementById("studentCollege");

    const department =
        document.getElementById("studentDepartment");

    const status =
        document.getElementById("studentStatus");

    const batch =
        document.getElementById("studentBatch");

    const tableBody =
        document.getElementById("studentsTableBody");

    const emptyState =
        document.getElementById("studentsEmpty");

    const recordCount =
        document.getElementById("studentRecordCount");

    const footerCount =
        document.getElementById("studentFooterCount");

    const clearFilters =
        document.getElementById("clearStudentFilters");


    /* =====================================================
       MODALS
    ====================================================== */

    const detailsModal =
        document.getElementById(
            "studentDetailsModal"
        );

    const addModal =
        document.getElementById(
            "addStudentModal"
        );

    const addStudentBtn =
        document.getElementById(
            "addStudentBtn"
        );

    const addStudentForm =
        document.getElementById(
            "addStudentForm"
        );


    /* =====================================================
       NORMALIZE
    ====================================================== */

    function normalize(value) {

        return String(value || "")
            .trim()
            .toLowerCase();

    }


    /* =====================================================
       FILTER STUDENTS
    ====================================================== */

    function filterStudents() {

        const searchValue =
            normalize(search.value);

        const collegeValue =
            normalize(college.value);

        const departmentValue =
            normalize(department.value);

        const statusValue =
            normalize(status.value);

        const batchValue =
            normalize(batch.value);


        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            );


        let visibleCount = 0;


        rows.forEach(row => {

            const name =
                normalize(row.dataset.name);

            const roll =
                normalize(row.dataset.roll);

            const email =
                normalize(row.dataset.email);

            const rowCollege =
                normalize(row.dataset.college);

            const rowDepartment =
                normalize(row.dataset.department);

            const rowStatus =
                normalize(row.dataset.status);

            const rowBatch =
                normalize(row.dataset.batch);


            const matchesSearch =
                !searchValue ||
                name.includes(searchValue) ||
                roll.includes(searchValue) ||
                email.includes(searchValue);


            const matchesCollege =
                collegeValue === "all" ||
                rowCollege === collegeValue;


            const matchesDepartment =
                departmentValue === "all" ||
                rowDepartment === departmentValue;


            const matchesStatus =
                statusValue === "all" ||
                rowStatus === statusValue;


            const matchesBatch =
                batchValue === "all" ||
                rowBatch === batchValue;


            const shouldShow =
                matchesSearch &&
                matchesCollege &&
                matchesDepartment &&
                matchesStatus &&
                matchesBatch;


            row.style.display =
                shouldShow ? "" : "none";


            if (shouldShow) {
                visibleCount++;
            }

        });


        recordCount.textContent =
            visibleCount;

        footerCount.textContent =
            visibleCount;

        emptyState.hidden =
            visibleCount !== 0;

    }


    /* =====================================================
       CLEAR FILTERS
    ====================================================== */

    function resetFilters() {

        search.value = "";
        college.value = "all";
        department.value = "all";
        status.value = "all";
        batch.value = "all";

        filterStudents();

    }


    /* =====================================================
       GET ROW DETAILS
    ====================================================== */

    function getStudentDetails(row) {

        const cells =
            row.querySelectorAll("td");


        return {

            name:
                row.dataset.name,

            roll:
                cells[2]?.textContent.trim() || "—",

            college:
                row.dataset.college,

            department:
                row.dataset.department,

            batch:
                row.dataset.batch,

            cgpa:
                cells[5]?.textContent.trim() || "—",

            placement:
                cells[6]?.textContent.trim() || "—",

            status:
                row.dataset.status,

            email:
                row.dataset.email

        };

    }


    /* =====================================================
       FORMAT TEXT
    ====================================================== */

    function titleCase(value) {

        return String(value)
            .split(" ")
            .map(word => {

                if (!word) {
                    return "";
                }

                return (
                    word.charAt(0).toUpperCase() +
                    word.slice(1)
                );

            })
            .join(" ");

    }


    /* =====================================================
       SHOW STUDENT DETAILS
    ====================================================== */

    function showStudentDetails(row) {

        const student =
            getStudentDetails(row);


        document.getElementById(
            "modalStudentName"
        ).textContent =
            titleCase(student.name);


        document.getElementById(
            "modalStudentEmail"
        ).textContent =
            student.email;


        document.getElementById(
            "modalStudentRoll"
        ).textContent =
            student.roll;


        document.getElementById(
            "modalStudentCollege"
        ).textContent =
            student.college.toUpperCase();


        document.getElementById(
            "modalStudentDepartment"
        ).textContent =
            student.department === "me"
                ? "Mechanical"
                : student.department.toUpperCase();


        document.getElementById(
            "modalStudentBatch"
        ).textContent =
            student.batch;


        document.getElementById(
            "modalStudentCgpa"
        ).textContent =
            student.cgpa;


        document.getElementById(
            "modalStudentStatus"
        ).textContent =
            student.status === "pending"
                ? "Verification Pending"
                : student.status === "inactive"
                    ? "Inactive"
                    : "Active";


        document.getElementById(
            "modalPlacementStatus"
        ).textContent =
            student.placement;


        const initials =
            titleCase(student.name)
                .split(" ")
                .map(word => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();


        document.getElementById(
            "modalStudentAvatar"
        ).textContent =
            initials;


        detailsModal.hidden = false;

        document.body.classList.add(
            "modal-open"
        );

    }


    /* =====================================================
       TABLE VIEW CLICK
    ====================================================== */

    tableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".student-view-btn"
                );


            if (!button) {
                return;
            }


            const row =
                button.closest("tr");


            if (row) {
                showStudentDetails(row);
            }

        }
    );


    /* =====================================================
       CLOSE DETAILS
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-student]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    detailsModal.hidden =
                        true;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       OPEN ADD STUDENT
    ====================================================== */

    addStudentBtn.addEventListener(
        "click",
        () => {

            addModal.hidden = false;

            document.body.classList.add(
                "modal-open"
            );

            const nameInput =
                document.getElementById(
                    "newStudentName"
                );

            setTimeout(() => {
                nameInput.focus();
            }, 100);

        }
    );


    /* =====================================================
       CLOSE ADD STUDENT
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-add-student]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {

                    addModal.hidden =
                        true;

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        });


    /* =====================================================
       ADD STUDENT FORM
    ====================================================== */

    addStudentForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "newStudentName"
                ).value.trim();


            if (!name) {
                return;
            }


            /*
             * DB CONNECTION LATER
             *
             * For Phase-1 this is only
             * a frontend confirmation.
             */

            alert(
                `${name} student profile is ready to be created.`
            );


            addStudentForm.reset();

            addModal.hidden =
                true;

            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       KEYBOARD
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            if (!detailsModal.hidden) {

                detailsModal.hidden =
                    true;

            }


            if (!addModal.hidden) {

                addModal.hidden =
                    true;

            }


            document.body.classList.remove(
                "modal-open"
            );

        }
    );


    /* =====================================================
       PAGINATION UI
    ====================================================== */

    document
        .querySelectorAll(
            ".student-page-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        button.classList.contains(
                            "disabled"
                        )
                    ) {
                        return;
                    }


                    const value =
                        button.textContent.trim();


                    if (
                        value === "‹" ||
                        value === "›"
                    ) {
                        return;
                    }


                    document
                        .querySelectorAll(
                            ".student-page-btn"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );

                }
            );

        });


    /* =====================================================
       EVENTS
    ====================================================== */

    search.addEventListener(
        "input",
        filterStudents
    );

    college.addEventListener(
        "change",
        filterStudents
    );

    department.addEventListener(
        "change",
        filterStudents
    );

    status.addEventListener(
        "change",
        filterStudents
    );

    batch.addEventListener(
        "change",
        filterStudents
    );

    clearFilters.addEventListener(
        "click",
        resetFilters
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    filterStudents();

});