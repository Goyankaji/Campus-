/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO STUDENTS
   ADD NEW STUDENT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("TPO STUDENTS JS LOADED");


    /* =====================================================
       EXISTING HTML ELEMENTS
    ===================================================== */

    const addStudentBtn =
        document.getElementById("addStudentBtn");

    const modal =
        document.getElementById("studentModal");

    const closeBtn =
        document.getElementById("closeStudentModal");

    const cancelBtn =
        document.getElementById("cancelStudentModal");

    const form =
        document.getElementById("addStudentForm");

    const courseSelect =
        document.getElementById("studentCourse");

    const branchSelect =
        document.getElementById("studentBranch");

    const sessionSelect =
        document.getElementById("studentSession");

    const sectionSelect =
        document.getElementById("studentSection");

    const campusName =
        document.getElementById("studentCampusName");

    const message =
        document.getElementById("studentFormMessage");

    const saveBtn =
        document.getElementById("saveStudentBtn");


    if (
        !addStudentBtn ||
        !modal ||
        !form ||
        !courseSelect ||
        !branchSelect ||
        !sessionSelect ||
        !sectionSelect
    ) {

        console.error(
            "TPO ADD STUDENT: Required elements missing."
        );

        return;
    }


    let optionsData = {

        campus: null,
        courses: [],
        branches: [],
        sections: [],
        batches: []

    };


    /* =====================================================
       MESSAGE
    ===================================================== */

    function showMessage(
        text,
        type
    ) {

        if (!message) {
            return;
        }

        message.hidden = false;

        message.textContent =
            text;

        message.className =
            "tpo-form-message " +
            (type || "");

    }


    function clearMessage() {

        if (!message) {
            return;
        }

        message.hidden = true;

        message.textContent =
            "";

        message.className =
            "tpo-form-message";

    }


    /* =====================================================
       RESET BRANCH
    ===================================================== */

    function resetBranches() {

        branchSelect.innerHTML =
            `
            <option value="">
                Select Branch
            </option>
            `;

        branchSelect.disabled =
            true;

    }


    /* =====================================================
       RESET SECTION
    ===================================================== */

    function resetSections() {

        sectionSelect.innerHTML =
            `
            <option value="">
                Select Section
            </option>
            `;

        sectionSelect.disabled =
            true;

    }


    /* =====================================================
       LOAD OPTIONS
    ===================================================== */

    async function loadOptions() {

        try {

            console.log(
                "Loading student options..."
            );


            const response =
                await fetch(
                    "/tpo/student/options",
                    {
                        method: "GET",

                        headers: {
                            "Accept":
                                "application/json"
                        },

                        cache:
                            "no-store"
                    }
                );


            const data =
                await response.json();


            console.log(
                "STUDENT OPTIONS:",
                data
            );


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Unable to load student options."
                );

            }


            optionsData =
                data;


            /* =============================================
               CAMPUS
            ============================================== */

            if (
                data.campus &&
                campusName
            ) {

                campusName.value =
                    data.campus.campus_name ||
                    "";

            }


            /* =============================================
               COURSES
            ============================================== */

            courseSelect.innerHTML =
                `
                <option value="">
                    Select Course
                </option>
                `;


            (
                data.courses ||
                []
            ).forEach(
                function (course) {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        course.course_id;


                    option.textContent =
                        course.course_name +
                        (
                            course.course_code
                                ? " (" +
                                  course.course_code +
                                  ")"
                                : ""
                        );


                    courseSelect.appendChild(
                        option
                    );

                }
            );


            /* =============================================
               BATCH
            ============================================== */

            sessionSelect.innerHTML =
                `
                <option value="">
                    Select Batch
                </option>
                `;


            (
                data.batches ||
                []
            ).forEach(
                function (batch) {

                    const option =
                        document.createElement(
                            "option"
                        );


                    option.value =
                        batch.session_id;


                    option.textContent =
                        batch.session_name;


                    sessionSelect.appendChild(
                        option
                    );

                }
            );


            resetBranches();

            resetSections();


        }
        catch (error) {

            console.error(
                "STUDENT OPTIONS ERROR:",
                error
            );


            showMessage(
                error.message,
                "error"
            );

        }

    }


    /* =====================================================
       COURSE → BRANCH
    ===================================================== */

    function updateBranches() {

        const courseId =
            courseSelect.value;


        resetBranches();

        resetSections();


        if (!courseId) {

            return;

        }


        const branches =
            (
                optionsData.branches ||
                []
            ).filter(
                function (branch) {

                    return String(
                        branch.course_id
                    ) === String(
                        courseId
                    );

                }
            );


        branches.forEach(
            function (branch) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    branch.branch_id;


                option.textContent =
                    branch.branch_name +
                    (
                        branch.branch_code
                            ? " (" +
                              branch.branch_code +
                              ")"
                            : ""
                    );


                branchSelect.appendChild(
                    option
                );

            }
        );


        branchSelect.disabled =
            branches.length === 0;


        if (
            branches.length === 0
        ) {

            showMessage(
                "No branches found for this course.",
                "error"
            );

        }

    }


    /* =====================================================
       BRANCH + BATCH → SECTION
    ===================================================== */

    function updateSections() {

        const branchId =
            branchSelect.value;

        const sessionId =
            sessionSelect.value;


        resetSections();


        if (
            !branchId ||
            !sessionId
        ) {

            return;

        }


        const sections =
            (
                optionsData.sections ||
                []
            ).filter(
                function (section) {

                    return (

                        String(
                            section.branch_id
                        ) === String(
                            branchId
                        )

                        &&

                        String(
                            section.session_id
                        ) === String(
                            sessionId
                        )

                    );

                }
            );


        sections.forEach(
            function (section) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    section.section_id;


                option.textContent =
                    section.section_name;


                sectionSelect.appendChild(
                    option
                );

            }
        );


        sectionSelect.disabled =
            sections.length === 0;


        if (
            sections.length === 0
        ) {

            showMessage(
                "No section found for selected branch and batch.",
                "error"
            );

        }

    }


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    addStudentBtn.addEventListener(
        "click",
        async function () {

            console.log(
                "ADD STUDENT BUTTON CLICKED"
            );


            form.reset();

            clearMessage();

            resetBranches();

            resetSections();


            modal.classList.add(
                "open"
            );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";


            await loadOptions();

        }
    );


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeModal() {

        modal.classList.remove(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    if (closeBtn) {

        closeBtn.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelBtn) {

        cancelBtn.addEventListener(
            "click",
            closeModal
        );

    }


    const backdrop =
        modal.querySelector(
            "[data-close-student-modal]"
        );


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeModal
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("open")
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       DROPDOWN EVENTS
    ===================================================== */

    courseSelect.addEventListener(
        "change",
        updateBranches
    );


    branchSelect.addEventListener(
        "change",
        updateSections
    );


    sessionSelect.addEventListener(
        "change",
        updateSections
    );


    /* =====================================================
       SUBMIT
    ===================================================== */

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            clearMessage();


            if (
                !form.checkValidity()
            ) {

                form.reportValidity();

                return;

            }


            if (
                !courseSelect.value
            ) {

                showMessage(
                    "Please select a course.",
                    "error"
                );

                return;

            }


            if (
                !branchSelect.value
            ) {

                showMessage(
                    "Please select a branch.",
                    "error"
                );

                return;

            }


            if (
                !sessionSelect.value
            ) {

                showMessage(
                    "Please select a batch.",
                    "error"
                );

                return;

            }


            if (
                !sectionSelect.value
            ) {

                showMessage(
                    "Please select a section.",
                    "error"
                );

                return;

            }


            saveBtn.disabled =
                true;


            saveBtn.textContent =
                "Creating...";


            try {

                const formData =
                    new FormData(
                        form
                    );


                console.log(
                    "SUBMITTING STUDENT"
                );


                const response =
                    await fetch(
                        "/tpo/student/add",
                        {
                            method:
                                "POST",

                            body:
                                formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "ADD STUDENT RESPONSE:",
                    data
                );


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        data.error ||
                        "Unable to create student."
                    );

                }


                showMessage(
                    "Student created successfully.",
                    "success"
                );


                setTimeout(
                    function () {

                        window.location.href =
                            "/tpo/students";

                    },
                    900
                );


            }
            catch (error) {

                console.error(
                    "ADD STUDENT ERROR:",
                    error
                );


                showMessage(
                    error.message,
                    "error"
                );


                saveBtn.disabled =
                    false;


                saveBtn.textContent =
                    "Create Student";

            }

        }
    );

});
/* =========================================================
   STUDENTS — EXCEL IMPORT PREVIEW
   DATABASE IMPORT WILL BE CONNECTED LATER
========================================================= */

(function () {

    const importButton =
        document.getElementById(
            "importStudentExcelBtn"
        );

    const fileInput =
        document.getElementById(
            "studentExcelInput"
        );


    if (!importButton || !fileInput) {
        return;
    }


    /* =====================================================
       LOAD SHEETJS
    ====================================================== */

    function loadSheetJS() {

        return new Promise(
            function (resolve, reject) {

                if (
                    window.XLSX
                ) {

                    resolve(
                        window.XLSX
                    );

                    return;

                }


                const script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";


                script.onload =
                    function () {

                        if (
                            window.XLSX
                        ) {

                            resolve(
                                window.XLSX
                            );

                        }
                        else {

                            reject(
                                new Error(
                                    "Excel library could not be loaded."
                                )
                            );

                        }

                    };


                script.onerror =
                    function () {

                        reject(
                            new Error(
                                "Unable to load Excel reader."
                            )
                        );

                    };


                document.head.appendChild(
                    script
                );

            }
        );

    }


    /* =====================================================
       EXPECTED COLUMNS
    ====================================================== */

    const expectedColumns = [

        "registration_no",
        "enrollment_no",

        "first_name",
        "middle_name",
        "last_name",

        "gender",
        "phone",
        "email",

        "course_id",
        "branch_id",
        "section_id",
        "session_id",

        "tenth_percentage",
        "twelfth_percentage",

        "cgpa",
        "backlogs"

    ];


    /* =====================================================
       NORMALIZE HEADER
    ====================================================== */

    function normalizeHeader(
        value
    ) {

        return String(
            value || ""
        )
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[().-]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "");

    }


    /* =====================================================
       OPEN FILE
    ====================================================== */

    importButton.addEventListener(
        "click",
        function () {

            fileInput.click();

        }
    );


    /* =====================================================
       FILE SELECTED
    ====================================================== */

    fileInput.addEventListener(
        "change",
        async function () {

            const file =
                fileInput.files[0];


            if (!file) {
                return;
            }


            try {

                await loadSheetJS();


                await processExcel(
                    file
                );

            }
            catch (error) {

                console.error(
                    "STUDENT EXCEL ERROR:",
                    error
                );


                alert(
                    error.message ||
                    "Unable to read Excel file."
                );

            }
            finally {

                fileInput.value =
                    "";

            }

        }
    );


    /* =====================================================
       PROCESS EXCEL
    ====================================================== */

    async function processExcel(
        file
    ) {

        const extension =
            file.name
                .split(".")
                .pop()
                .toLowerCase();


        if (
            ![
                "xlsx",
                "xls",
                "csv"
            ].includes(
                extension
            )
        ) {

            throw new Error(
                "Please select an Excel or CSV file."
            );

        }


        const buffer =
            await file.arrayBuffer();


        const workbook =
            XLSX.read(
                buffer,
                {
                    type: "array"
                }
            );


        const firstSheet =
            workbook.Sheets[
                workbook.SheetNames[0]
            ];


        const rows =
            XLSX.utils.sheet_to_json(
                firstSheet,
                {
                    defval: "",
                    raw: false
                }
            );


        if (!rows.length) {

            throw new Error(
                "The selected Excel file is empty."
            );

        }


        const originalHeaders =
            Object.keys(
                rows[0]
            );


        const normalizedRows =
            rows.map(
                function (row) {

                    const normalized = {};


                    Object.keys(row)
                        .forEach(
                            function (key) {

                                normalized[
                                    normalizeHeader(
                                        key
                                    )
                                ] =
                                    String(
                                        row[key] ??
                                        ""
                                    ).trim();

                            }
                        );


                    return normalized;

                }
            );


        const validation =
            validateRows(
                normalizedRows
            );


        showImportPreview(
            file.name,
            validation
        );

    }


    /* =====================================================
       VALIDATE
    ====================================================== */

    function validateRows(
        rows
    ) {

        const valid = [];

        const invalid = [];

        const duplicates = [];

        const seenRegistration =
            new Set();

        const seenEnrollment =
            new Set();


        rows.forEach(
            function (
                row,
                index
            ) {

                const excelRow =
                    index + 2;


                const registration =
                    (
                        row.registration_no ||
                        ""
                    )
                    .trim()
                    .toUpperCase();


                const enrollment =
                    (
                        row.enrollment_no ||
                        ""
                    )
                    .trim()
                    .toUpperCase();


                const firstName =
                    (
                        row.first_name ||
                        ""
                    )
                    .trim();


                const email =
                    (
                        row.email ||
                        ""
                    )
                    .trim();


                const errors = [];


                /* REQUIRED */

                if (!registration) {

                    errors.push(
                        "Registration No. missing"
                    );

                }


                if (!enrollment) {

                    errors.push(
                        "Enrollment No. missing"
                    );

                }


                if (!firstName) {

                    errors.push(
                        "First Name missing"
                    );

                }


                if (!email) {

                    errors.push(
                        "Email missing"
                    );

                }


                /* EMAIL */

                if (
                    email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email)
                ) {

                    errors.push(
                        "Invalid email"
                    );

                }


                /* DUPLICATE IN EXCEL */

                if (
                    registration &&
                    seenRegistration.has(
                        registration
                    )
                ) {

                    errors.push(
                        "Duplicate registration number"
                    );

                }


                if (
                    enrollment &&
                    seenEnrollment.has(
                        enrollment
                    )
                ) {

                    errors.push(
                        "Duplicate enrollment number"
                    );

                }


                if (registration) {

                    seenRegistration.add(
                        registration
                    );

                }


                if (enrollment) {

                    seenEnrollment.add(
                        enrollment
                    );

                }


                /* CGPA */

                if (
                    row.cgpa !== "" &&
                    (
                        Number(row.cgpa) < 0 ||
                        Number(row.cgpa) > 10 ||
                        Number.isNaN(
                            Number(row.cgpa)
                        )
                    )
                ) {

                    errors.push(
                        "CGPA must be between 0 and 10"
                    );

                }


                /* BACKLOG */

                if (
                    row.backlogs !== "" &&
                    (
                        Number(row.backlogs) < 0 ||
                        Number.isNaN(
                            Number(row.backlogs)
                        )
                    )
                ) {

                    errors.push(
                        "Invalid backlog value"
                    );

                }


                if (errors.length) {

                    invalid.push({

                        row:
                            excelRow,

                        registration,

                        reason:
                            errors.join(
                                ", "
                            )

                    });

                }
                else {

                    valid.push({
                        row:
                            excelRow,

                        data:
                            row

                    });

                }

            }
        );


        return {

            total:
                rows.length,

            valid,

            invalid,

            duplicates

        };

    }


    /* =====================================================
       PREVIEW MODAL
    ====================================================== */

    function showImportPreview(
        filename,
        result
    ) {

        const existing =
            document.getElementById(
                "studentExcelPreviewModal"
            );


        if (existing) {
            existing.remove();
        }


        const modal =
            document.createElement(
                "div"
            );


        modal.id =
            "studentExcelPreviewModal";


        modal.innerHTML = `

            <div class="student-excel-modal-backdrop"></div>

            <div class="student-excel-modal">

                <div class="student-excel-header">

                    <div>

                        <span>
                            STUDENT IMPORT
                        </span>

                        <h2>
                            Excel Preview
                        </h2>

                        <p>
                            ${escapeHtml(filename)}
                        </p>

                    </div>


                    <button
                        type="button"
                        class="student-excel-close"
                        id="closeStudentExcelPreview"
                    >
                        ×
                    </button>

                </div>


                <div class="student-excel-summary">

                    <div>
                        <strong>
                            ${result.total}
                        </strong>
                        <span>
                            Total Rows
                        </span>
                    </div>


                    <div class="success">

                        <strong>
                            ${result.valid.length}
                        </strong>

                        <span>
                            Valid Rows
                        </span>

                    </div>


                    <div class="danger">

                        <strong>
                            ${result.invalid.length}
                        </strong>

                        <span>
                            Invalid Rows
                        </span>

                    </div>

                </div>


                ${
                    result.invalid.length
                    ?

                    `

                    <div class="student-excel-errors">

                        <h3>
                            Invalid Rows
                        </h3>


                        <div class="student-excel-error-list">

                            ${

                                result.invalid
                                    .slice(
                                        0,
                                        20
                                    )
                                    .map(
                                        function (
                                            item
                                        ) {

                                            return `

                                                <div>

                                                    <strong>
                                                        Row ${item.row}
                                                    </strong>

                                                    <span>
                                                        ${escapeHtml(
                                                            item.reason
                                                        )}
                                                    </span>

                                                </div>

                                            `;

                                        }
                                    )
                                    .join("")

                            }

                        </div>

                    </div>

                    `

                    :

                    `

                    <div class="student-excel-success">

                        ✓ All rows passed basic validation.

                    </div>

                    `
                }


                <div class="student-excel-actions">

                    <button
                        type="button"
                        class="student-excel-cancel"
                        id="cancelStudentExcelImport"
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        class="student-excel-import"
                        id="confirmStudentExcelImport"
                        ${
                            result.valid.length
                                ? ""
                                : "disabled"
                        }
                    >

                        Import
                        ${result.valid.length}
                        Students

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        addPreviewStyles();


        document
            .getElementById(
                "closeStudentExcelPreview"
            )
            .addEventListener(
                "click",
                function () {

                    modal.remove();

                }
            );


        document
            .getElementById(
                "cancelStudentExcelImport"
            )
            .addEventListener(
                "click",
                function () {

                    modal.remove();

                }
            );


        document
            .getElementById(
                "confirmStudentExcelImport"
            )
            .addEventListener(
                "click",
                function () {

                    alert(
                        "Excel validation complete. Database import will be connected after the final database structure is locked."
                    );

                }
            );

    }


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHtml(
        value
    ) {

        return String(
            value || ""
        )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

    }


    /* =====================================================
       PREVIEW STYLES
    ====================================================== */

    function addPreviewStyles() {

        if (
            document.getElementById(
                "studentExcelPreviewStyles"
            )
        ) {

            return;

        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "studentExcelPreviewStyles";


        style.textContent = `

            .student-excel-modal-backdrop {

                position: fixed;
                inset: 0;

                background:
                    rgba(5, 8, 20, .72);

                backdrop-filter:
                    blur(5px);

            }


            .student-excel-modal {

                position: fixed;

                top: 50%;
                left: 50%;

                transform:
                    translate(-50%, -50%);

                width:
                    min(760px, 94vw);

                max-height:
                    88vh;

                overflow:
                    auto;

                z-index: 10001;

                background:
                    var(--card-bg, #ffffff);

                border:
                    1px solid
                    rgba(124,58,237,.18);

                border-radius:
                    18px;

                box-shadow:
                    0 30px 80px
                    rgba(0,0,0,.35);

            }


            .student-excel-header {

                display:
                    flex;

                justify-content:
                    space-between;

                gap:
                    20px;

                padding:
                    22px 24px;

                border-bottom:
                    1px solid
                    rgba(120,120,140,.15);

            }


            .student-excel-header span {

                font-size:
                    10px;

                font-weight:
                    800;

                letter-spacing:
                    .12em;

                color:
                    #7c3aed;

            }


            .student-excel-header h2 {

                margin:
                    5px 0;

                font-size:
                    23px;

            }


            .student-excel-header p {

                margin:
                    0;

                font-size:
                    12px;

                opacity:
                    .6;

            }


            .student-excel-close {

                border:
                    0;

                background:
                    transparent;

                font-size:
                    28px;

                cursor:
                    pointer;

            }


            .student-excel-summary {

                display:
                    grid;

                grid-template-columns:
                    repeat(3, 1fr);

                gap:
                    12px;

                padding:
                    20px 24px;

            }


            .student-excel-summary > div {

                padding:
                    16px;

                border-radius:
                    12px;

                background:
                    rgba(124,58,237,.07);

                text-align:
                    center;

            }


            .student-excel-summary strong {

                display:
                    block;

                font-size:
                    24px;

            }


            .student-excel-summary span {

                display:
                    block;

                margin-top:
                    4px;

                font-size:
                    11px;

                opacity:
                    .65;

            }


            .student-excel-summary .success {

                background:
                    rgba(16,185,129,.10);

            }


            .student-excel-summary .danger {

                background:
                    rgba(239,68,68,.10);

            }


            .student-excel-errors {

                padding:
                    0 24px 20px;

            }


            .student-excel-errors h3 {

                font-size:
                    13px;

                margin:
                    0 0 10px;

            }


            .student-excel-error-list {

                max-height:
                    220px;

                overflow:
                    auto;

                border:
                    1px solid
                    rgba(239,68,68,.18);

                border-radius:
                    10px;

            }


            .student-excel-error-list div {

                display:
                    flex;

                gap:
                    12px;

                padding:
                    10px 12px;

                font-size:
                    12px;

                border-bottom:
                    1px solid
                    rgba(120,120,140,.10);

            }


            .student-excel-error-list div:last-child {

                border-bottom:
                    0;

            }


            .student-excel-error-list strong {

                min-width:
                    55px;

                color:
                    #dc2626;

            }


            .student-excel-success {

                margin:
                    0 24px 20px;

                padding:
                    12px 14px;

                border-radius:
                    9px;

                background:
                    rgba(16,185,129,.10);

                color:
                    #047857;

                font-size:
                    13px;

                font-weight:
                    600;

            }


            .student-excel-actions {

                display:
                    flex;

                justify-content:
                    flex-end;

                gap:
                    10px;

                padding:
                    18px 24px;

                border-top:
                    1px solid
                    rgba(120,120,140,.15);

            }


            .student-excel-cancel,
            .student-excel-import {

                border:
                    0;

                border-radius:
                    9px;

                padding:
                    11px 18px;

                font-weight:
                    700;

                cursor:
                    pointer;

            }


            .student-excel-cancel {

                background:
                    #eeeeef;

                color:
                    #333;

            }


            .student-excel-import {

                background:
                    #7c3aed;

                color:
                    #fff;

            }


            .student-excel-import:disabled {

                opacity:
                    .45;

                cursor:
                    not-allowed;

            }


            @media(max-width:600px) {

                .student-excel-summary {

                    grid-template-columns:
                        1fr;

                }

            }

        `;


        document.head.appendChild(
            style
        );

    }

})();