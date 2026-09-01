/* =========================================================
   CAMPUS PLACEMENT PORTAL
   HOD — STUDENTS PAGE JS
========================================================= */


/* =========================================================
   HOD STUDENT CONTEXT
========================================================= */

const HOD_STUDENT_CONTEXT = {

    college:
        "Poornima College of Engineering",

    collegeCode:
        "PCE",

    department:
        "Information Technology",

    branch:
        "IT"

};


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeStudentSearch();

        initializeStudentFilters();

        initializeClearButton();

        initializeAddStudent();

        initializeExcelImport();

        initializeModalControls();

        initializeStudentView();

        initializePagination();

    }
);


/* =========================================================
   SEARCH
========================================================= */

function initializeStudentSearch() {

    const search =
        document.getElementById(
            "studentSearch"
        );


    if (!search) {
        return;
    }


    search.addEventListener(
        "input",
        applyStudentFilters
    );

}


/* =========================================================
   FILTERS
========================================================= */

function initializeStudentFilters() {

    const filters =
        document.querySelectorAll(
            ".student-filter"
        );


    filters.forEach(
        function (filter) {

            filter.addEventListener(
                "change",
                applyStudentFilters
            );

        }
    );

}


/* =========================================================
   APPLY FILTERS
========================================================= */

function applyStudentFilters() {

    const search =
        document.getElementById(
            "studentSearch"
        );


    const batch =
        document.getElementById(
            "batchFilter"
        );


    const placement =
        document.getElementById(
            "placementFilter"
        );


    const searchValue =
        search
            ? search.value
                .trim()
                .toLowerCase()
            : "";


    const batchValue =
        batch
            ? batch.value
            : "";


    const placementValue =
        placement
            ? placement.value
            : "";


    const rows =
        document.querySelectorAll(
            "#studentsTable tbody tr"
        );


    let visibleRows = 0;


    rows.forEach(
        function (row) {

            const rowText =
                row.textContent
                    .trim()
                    .toLowerCase();


            const rowBatch =
                row.dataset.batch || "";


            const rowPlacement =
                row.dataset.placement || "";


            const matchesSearch =
                !searchValue ||
                rowText.includes(
                    searchValue
                );


            const matchesBatch =
                !batchValue ||
                rowBatch === batchValue;


            const matchesPlacement =
                !placementValue ||
                rowPlacement === placementValue;


            const shouldShow =
                matchesSearch &&
                matchesBatch &&
                matchesPlacement;


            row.style.display =
                shouldShow
                    ? ""
                    : "none";


            if (shouldShow) {

                visibleRows++;

            }

        }
    );


    updateEmptyState(
        visibleRows
    );


    updateShowingText(
        visibleRows
    );

}


/* =========================================================
   EMPTY STATE
========================================================= */

function updateEmptyState(
    visibleRows
) {

    const empty =
        document.getElementById(
            "studentsEmptyState"
        );


    if (!empty) {
        return;
    }


    if (visibleRows === 0) {

        empty.classList.add(
            "show"
        );

    } else {

        empty.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   SHOWING TEXT
========================================================= */

function updateShowingText(
    visibleRows
) {

    const element =
        document.getElementById(
            "studentsShowingText"
        );


    if (!element) {
        return;
    }


    if (visibleRows === 0) {

        element.textContent =
            "No matching students";

        return;

    }


    element.textContent =
        `Showing ${visibleRows} matching student${
            visibleRows === 1
                ? ""
                : "s"
        }`;

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function initializeClearButton() {

    const button =
        document.getElementById(
            "clearFiltersBtn"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        function () {

            const search =
                document.getElementById(
                    "studentSearch"
                );


            const batch =
                document.getElementById(
                    "batchFilter"
                );


            const placement =
                document.getElementById(
                    "placementFilter"
                );


            if (search) {
                search.value = "";
            }


            if (batch) {
                batch.value = "";
            }


            if (placement) {
                placement.value = "";
            }


            applyStudentFilters();

        }
    );

}


/* =========================================================
   ADD STUDENT
========================================================= */

function initializeAddStudent() {

    const button =
        document.getElementById(
            "addStudentBtn"
        );


    const form =
        document.getElementById(
            "addStudentForm"
        );


    if (button) {

        button.addEventListener(
            "click",
            function () {

                openModal(
                    "addStudentModal"
                );

            }
        );

    }


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const registration =
                form.elements
                    .registration_no
                    .value
                    .trim();


            /*
             * STATIC PHASE
             *
             * Real database duplicate
             * validation will be connected
             * later.
             */


            if (
                checkDuplicateRegistration(
                    registration
                )
            ) {

                alert(
                    "A student with this registration number already exists."
                );

                return;

            }


            alert(
                "Student details validated successfully. Database integration will be connected later."
            );


            form.reset();


            restoreFixedFields();


            closeModal(
                "addStudentModal"
            );

        }
    );

}


/* =========================================================
   FIXED COLLEGE + BRANCH
========================================================= */

function restoreFixedFields() {

    const college =
        document.querySelector(
            '#addStudentForm [name="college"]'
        );


    const branch =
        document.querySelector(
            '#addStudentForm [name="branch"]'
        );


    if (college) {

        college.value =
            HOD_STUDENT_CONTEXT.college;

    }


    if (branch) {

        branch.value =
            HOD_STUDENT_CONTEXT.department;

    }

}


/* =========================================================
   DUPLICATE REGISTRATION CHECK
========================================================= */

function checkDuplicateRegistration(
    registration
) {

    if (!registration) {
        return false;
    }


    const rows =
        document.querySelectorAll(
            "#studentsTable tbody tr"
        );


    const normalized =
        registration
            .toLowerCase();


    for (
        const row of rows
    ) {

        const cells =
            row.querySelectorAll(
                "td"
            );


        if (!cells[2]) {
            continue;
        }


        const existing =
            cells[2]
                .textContent
                .trim()
                .toLowerCase();


        if (
            existing === normalized
        ) {

            return true;

        }

    }


    return false;

}


/* =========================================================
   EXCEL IMPORT
========================================================= */

function initializeExcelImport() {

    const openButton =
        document.getElementById(
            "importExcelBtn"
        );


    const browseButton =
        document.getElementById(
            "browseExcelBtn"
        );


    const fileInput =
        document.getElementById(
            "studentExcelFile"
        );


    const removeButton =
        document.getElementById(
            "removeExcelFile"
        );


    const continueButton =
        document.getElementById(
            "continueExcelBtn"
        );


    if (openButton) {

        openButton.addEventListener(
            "click",
            function () {

                openModal(
                    "importExcelModal"
                );

            }
        );

    }


    if (
        browseButton &&
        fileInput
    ) {

        browseButton.addEventListener(
            "click",
            function () {

                fileInput.click();

            }
        );


        fileInput.addEventListener(
            "change",
            function () {

                handleExcelFile(
                    this.files[0]
                );

            }
        );

    }


    if (removeButton) {

        removeButton.addEventListener(
            "click",
            clearExcelFile
        );

    }


    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                if (
                    !fileInput ||
                    !fileInput.files.length
                ) {

                    return;

                }


                alert(
                    "Excel file selected successfully. Preview, validation and database import will be connected later."
                );

            }
        );

    }

}


/* =========================================================
   HANDLE EXCEL
========================================================= */

function handleExcelFile(file) {

    if (!file) {
        return;
    }


    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();


    const allowed =
        [
            "xlsx",
            "xls"
        ];


    if (
        !allowed.includes(
            extension
        )
    ) {

        alert(
            "Please select a valid Excel file (.xlsx or .xls)."
        );

        clearExcelFile();

        return;

    }


    const selected =
        document.getElementById(
            "selectedExcelFile"
        );


    const name =
        document.getElementById(
            "selectedFileName"
        );


    const size =
        document.getElementById(
            "selectedFileSize"
        );


    const continueButton =
        document.getElementById(
            "continueExcelBtn"
        );


    if (name) {

        name.textContent =
            file.name;

    }


    if (size) {

        size.textContent =
            formatFileSize(
                file.size
            );

    }


    if (selected) {

        selected.classList.add(
            "show"
        );

    }


    if (continueButton) {

        continueButton.disabled =
            false;

    }

}


/* =========================================================
   FORMAT FILE SIZE
========================================================= */

function formatFileSize(
    bytes
) {

    if (!bytes) {
        return "0 KB";
    }


    const kb =
        bytes / 1024;


    if (kb < 1024) {

        return (
            Math.round(kb) +
            " KB"
        );

    }


    return (
        (kb / 1024)
            .toFixed(2) +
        " MB"
    );

}


/* =========================================================
   CLEAR EXCEL
========================================================= */

function clearExcelFile() {

    const input =
        document.getElementById(
            "studentExcelFile"
        );


    const selected =
        document.getElementById(
            "selectedExcelFile"
        );


    const name =
        document.getElementById(
            "selectedFileName"
        );


    const size =
        document.getElementById(
            "selectedFileSize"
        );


    const continueButton =
        document.getElementById(
            "continueExcelBtn"
        );


    if (input) {
        input.value = "";
    }


    if (selected) {

        selected.classList.remove(
            "show"
        );

    }


    if (name) {

        name.textContent =
            "No file selected";

    }


    if (size) {

        size.textContent =
            "—";

    }


    if (continueButton) {

        continueButton.disabled =
            true;

    }

}


/* =========================================================
   MODAL CONTROLS
========================================================= */

function initializeModalControls() {

    document
        .querySelectorAll(
            "[data-close-modal]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        closeModal(
                            this.dataset.closeModal
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".students-modal-overlay"
        )
        .forEach(
            function (overlay) {

                overlay.addEventListener(
                    "click",
                    function () {

                        const modal =
                            this.closest(
                                ".students-modal"
                            );


                        if (modal) {

                            closeModal(
                                modal.id
                            );

                        }

                    }
                );

            }
        );


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {
                return;
            }


            const modal =
                document.querySelector(
                    ".students-modal.show"
                );


            if (modal) {

                closeModal(
                    modal.id
                );

            }

        }
    );

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openModal(
    modalId
) {

    const modal =
        document.getElementById(
            modalId
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(
    modalId
) {

    const modal =
        document.getElementById(
            modalId
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "show"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        !document.querySelector(
            ".students-modal.show"
        )
    ) {

        document.body.style.overflow =
            "";

    }


    if (
        modalId ===
        "importExcelModal"
    ) {

        clearExcelFile();

    }

}


/* =========================================================
   VIEW STUDENT
========================================================= */

function initializeStudentView() {

    document
        .querySelectorAll(
            ".view-student-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const row =
                            this.closest(
                                "tr"
                            );


                        if (!row) {
                            return;
                        }


                        const name =
                            row.querySelector(
                                ".student-details strong"
                            );


                        const registration =
                            row
                                .querySelectorAll(
                                    "td"
                                )[2];


                        if (!name) {
                            return;
                        }


                        alert(
                            `Student: ${name.textContent.trim()}\nRegistration: ${
                                registration
                                    ? registration.textContent.trim()
                                    : ""
                            }`
                        );

                    }
                );

            }
        );

}


/* =========================================================
   PAGINATION
========================================================= */

function initializePagination() {

    document
        .querySelectorAll(
            ".pagination-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        if (
                            this.disabled ||
                            this.classList.contains(
                                "active"
                            )
                        ) {

                            return;

                        }


                        /*
                         * Static phase.
                         * Actual server-side pagination
                         * will be connected later.
                         */

                        console.log(
                            "Selected page:",
                            this.textContent.trim()
                        );

                    }
                );

            }
        );

}