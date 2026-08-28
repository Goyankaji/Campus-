/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO — COMPANIES
   DATABASE CONNECTED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("companySearch");

    const industryFilter =
        document.getElementById("industryFilter");

    const statusFilter =
        document.getElementById("statusFilter");

    const collegeFilter =
        document.getElementById("collegeFilter");

    const resetButton =
        document.getElementById("resetFilters");

    const exportButton =
        document.getElementById("exportCompanies");

    const addCompanyButton =
        document.getElementById("addCompanyBtn");

    const modal =
        document.getElementById("companyModal");

    const closeModal =
        document.getElementById("closeCompanyModal");

    const cancelButton =
        document.getElementById("cancelCompanyBtn");

    const form =
        document.getElementById("addCompanyForm");

    const formMessage =
        document.getElementById("companyFormMessage");

    const tableBody =
        document.getElementById("companyTableBody");

    const companyCount =
        document.getElementById("companyCount");


    /* =====================================================
       FILTER COMPANIES
    ====================================================== */

    function filterCompanies() {

        if (!tableBody) {
            return;
        }


        const rows =
            tableBody.querySelectorAll(
                ".company-row"
            );


        const search =
            (
                searchInput
                    ? searchInput.value
                    : ""
            )
            .trim()
            .toLowerCase();


        const industry =
            industryFilter
                ? industryFilter.value.toLowerCase()
                : "all";


        const status =
            statusFilter
                ? statusFilter.value.toLowerCase()
                : "all";


        const college =
            collegeFilter
                ? collegeFilter.value.toLowerCase()
                : "all";


        let visibleCount = 0;


        rows.forEach(function (row) {

            const company =
                row.dataset.company || "";

            const rowIndustry =
                row.dataset.industry || "";

            const rowStatus =
                row.dataset.status || "";

            const rowCollege =
                row.dataset.college || "";


            const matchesSearch =
                !search ||
                company.includes(search);


            const matchesIndustry =
                industry === "all" ||
                rowIndustry === industry;


            const matchesStatus =
                status === "all" ||
                rowStatus === status;


            const matchesCollege =
                college === "all" ||
                rowCollege
                    .split(",")
                    .map(
                        item =>
                            item.trim()
                    )
                    .includes(college);


            const visible =
                matchesSearch &&
                matchesIndustry &&
                matchesStatus &&
                matchesCollege;


            row.style.display =
                visible
                    ? ""
                    : "none";


            if (visible) {
                visibleCount++;
            }

        });


        if (companyCount) {

            companyCount.textContent =
                "Showing " +
                visibleCount +
                " companies";

        }

    }


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCompanies
        );

    }


    /* =====================================================
       FILTERS
    ====================================================== */

    [
        industryFilter,
        statusFilter,
        collegeFilter
    ]
    .forEach(function (filter) {

        if (filter) {

            filter.addEventListener(
                "change",
                filterCompanies
            );

        }

    });


    /* =====================================================
       RESET
    ====================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                }

                if (industryFilter) {
                    industryFilter.value = "all";
                }

                if (statusFilter) {
                    statusFilter.value = "all";
                }

                if (collegeFilter) {
                    collegeFilter.value = "all";
                }

                filterCompanies();

            }
        );

    }


    /* =====================================================
       MODAL
    ====================================================== */

    function openModal() {

        if (!modal) {
            return;
        }

        modal.style.display = "flex";

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeCompanyModal() {

        if (!modal) {
            return;
        }

        modal.style.display = "none";

        document.body.classList.remove(
            "modal-open"
        );

        if (form) {
            form.reset();
        }

        showFormMessage(
            "",
            false
        );

    }


    if (addCompanyButton) {

        addCompanyButton.addEventListener(
            "click",
            openModal
        );

    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeCompanyModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeCompanyModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target.classList.contains(
                        "company-modal-overlay"
                    )
                ) {

                    closeCompanyModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.style.display === "flex"
            ) {

                closeCompanyModal();

            }

        }
    );


    /* =====================================================
       FORM MESSAGE
    ====================================================== */

    function showFormMessage(
        message,
        error
    ) {

        if (!formMessage) {
            return;
        }


        if (!message) {

            formMessage.style.display =
                "none";

            formMessage.textContent =
                "";

            return;

        }


        formMessage.style.display =
            "block";

        formMessage.textContent =
            message;


        formMessage.style.color =
            error
                ? "#ff8d9c"
                : "#7ee2a8";

    }


    /* =====================================================
       ADD COMPANY
    ====================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const formData =
                    new FormData(form);


                const payload = {

                    company_code:
                        formData.get(
                            "company_code"
                        ),

                    company_name:
                        formData.get(
                            "company_name"
                        ),

                    industry:
                        formData.get(
                            "industry"
                        ),

                    location:
                        formData.get(
                            "location"
                        ),

                    website:
                        formData.get(
                            "website"
                        ),

                    contact_person:
                        formData.get(
                            "contact_person"
                        ),

                    contact_email:
                        formData.get(
                            "contact_email"
                        ),

                    contact_phone:
                        formData.get(
                            "contact_phone"
                        )

                };


                showFormMessage(
                    "Adding company...",
                    false
                );


                try {

                    const response =
                        await fetch(
                            "/tpo/company/add",
                            {

                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        payload
                                    )

                            }
                        );


                    const data =
                        await response.json();


                    if (
                        !response.ok ||
                        !data.success
                    ) {

                        throw new Error(
                            data.message ||
                            "Unable to add company."
                        );

                    }


                    showFormMessage(
                        "Company added successfully.",
                        false
                    );


                    setTimeout(
                        function () {

                            closeCompanyModal();

                            window.location.reload();

                        },
                        700
                    );

                }
                catch (error) {

                    console.error(
                        "ADD COMPANY ERROR:",
                        error
                    );


                    showFormMessage(
                        error.message,
                        true
                    );

                }

            }
        );

    }


    /* =====================================================
       VIEW COMPANY
    ====================================================== */

    document.addEventListener(
        "click",
        async function (event) {

            const button =
                event.target.closest(
                    ".view-company-btn"
                );


            if (!button) {
                return;
            }


            const companyId =
                button.dataset.companyId;


            if (!companyId) {
                return;
            }


            try {

                const response =
                    await fetch(
                        "/tpo/company/" +
                        encodeURIComponent(
                            companyId
                        ),
                        {
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to load company."
                    );

                }


                const company =
                    data.company;


                let message =
                    "Company: " +
                    (
                        company.company_name ||
                        "—"
                    );


                message +=
                    "\nCode: " +
                    (
                        company.company_code ||
                        "—"
                    );


                message +=
                    "\nIndustry: " +
                    (
                        company.industry ||
                        "—"
                    );


                message +=
                    "\nLocation: " +
                    (
                        company.location ||
                        "—"
                    );


                message +=
                    "\nStatus: " +
                    (
                        company.status ||
                        "—"
                    );


                if (
                    company.drives &&
                    company.drives.length
                ) {

                    message +=
                        "\n\nPlacement Drives: " +
                        company.drives.length;

                }


                alert(message);

            }
            catch (error) {

                console.error(
                    "VIEW COMPANY ERROR:",
                    error
                );


                alert(
                    error.message
                );

            }

        }
    );


    /* =====================================================
       TOGGLE COMPANY STATUS
    ====================================================== */

    document.addEventListener(
        "click",
        async function (event) {

            const button =
                event.target.closest(
                    ".toggle-company-btn"
                );


            if (!button) {
                return;
            }


            const companyId =
                button.dataset.companyId;


            if (!companyId) {
                return;
            }


            const confirmed =
                confirm(
                    "Change this company's active status?"
                );


            if (!confirmed) {
                return;
            }


            try {

                const response =
                    await fetch(
                        "/tpo/company/" +
                        encodeURIComponent(
                            companyId
                        ) +
                        "/toggle-status",
                        {

                            method: "POST",

                            headers: {
                                "Accept":
                                    "application/json"
                            }

                        }
                    );


                const data =
                    await response.json();


                if (
                    !response.ok ||
                    !data.success
                ) {

                    throw new Error(
                        data.message ||
                        "Unable to update company status."
                    );

                }


                window.location.reload();

            }
            catch (error) {

                console.error(
                    "TOGGLE COMPANY ERROR:",
                    error
                );


                alert(
                    error.message
                );

            }

        }
    );


    /* =====================================================
       EXPORT CSV
    ====================================================== */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            function () {

                const rows =
                    document.querySelectorAll(
                        "#companyTableBody .company-row"
                    );


                const csv = [];


                csv.push(
                    [
                        "Company",
                        "Code",
                        "Industry",
                        "Location",
                        "College",
                        "Drives",
                        "Selected",
                        "Package",
                        "Status"
                    ]
                    .join(",")
                );


                rows.forEach(function (row) {

                    if (
                        row.style.display === "none"
                    ) {
                        return;
                    }


                    const cells =
                        row.querySelectorAll(
                            "td"
                        );


                    if (cells.length < 9) {
                        return;
                    }


                    const companyName =
                        cells[0]
                            .innerText
                            .replace(/\s+/g, " ")
                            .trim();


                    const code =
                        cells[0]
                            .querySelector("span")
                            ?.innerText
                            .trim() || "";


                    const values = [

                        companyName,

                        code,

                        cells[1]
                            .innerText
                            .trim(),

                        cells[2]
                            .innerText
                            .trim(),

                        cells[3]
                            .innerText
                            .trim(),

                        cells[4]
                            .innerText
                            .trim(),

                        cells[5]
                            .innerText
                            .trim(),

                        cells[6]
                            .innerText
                            .trim(),

                        cells[7]
                            .innerText
                            .trim()

                    ];


                    csv.push(
                        values
                            .map(
                                value =>
                                    '"' +
                                    value
                                        .replace(
                                            /"/g,
                                            '""'
                                        ) +
                                    '"'
                            )
                            .join(",")
                    );

                });


                const blob =
                    new Blob(
                        [
                            csv.join("\n")
                        ],
                        {
                            type:
                                "text/csv;charset=utf-8;"
                        }
                    );


                const url =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    url;

                link.download =
                    "companies.csv";


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                URL.revokeObjectURL(
                    url
                );

            }
        );

    }


    /* =====================================================
       INITIAL FILTER
    ====================================================== */

    filterCompanies();


    console.log(
        "TPO Companies DB JS Loaded"
    );

});
/* =========================================================
   COMPANIES — EXCEL IMPORT PREVIEW
   DATABASE IMPORT WILL BE CONNECTED LATER
========================================================= */

(function () {

    const importButton =
        document.getElementById(
            "importCompanyExcelBtn"
        );

    const fileInput =
        document.getElementById(
            "companyExcelInput"
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

                if (window.XLSX) {

                    resolve(window.XLSX);
                    return;

                }

                const script =
                    document.createElement("script");

                script.src =
                    "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";

                script.onload =
                    function () {

                        if (window.XLSX) {
                            resolve(window.XLSX);
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

                document.head.appendChild(script);

            }
        );

    }


    /* =====================================================
       REQUIRED COMPANY COLUMNS
    ====================================================== */

    const requiredColumns = [

        "company_code",
        "company_name"

    ];


    /* =====================================================
       NORMALIZE HEADER
    ====================================================== */

    function normalizeHeader(value) {

        return String(value || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[().-]/g, "_")
            .replace(/_+/g, "_")
            .replace(/^_|_$/g, "");

    }


    /* =====================================================
       OPEN FILE PICKER
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

                await processCompanyExcel(file);

            }
            catch (error) {

                console.error(
                    "COMPANY EXCEL ERROR:",
                    error
                );

                alert(
                    error.message ||
                    "Unable to read Excel file."
                );

            }
            finally {

                fileInput.value = "";

            }

        }
    );


    /* =====================================================
       PROCESS EXCEL
    ====================================================== */

    async function processCompanyExcel(file) {

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
            ].includes(extension)
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


        const sheet =
            workbook.Sheets[
                workbook.SheetNames[0]
            ];


        const rows =
            XLSX.utils.sheet_to_json(
                sheet,
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


        const normalizedRows =
            rows.map(
                function (row) {

                    const normalized = {};

                    Object.keys(row).forEach(
                        function (key) {

                            normalized[
                                normalizeHeader(key)
                            ] =
                                String(
                                    row[key] ?? ""
                                ).trim();

                        }
                    );

                    return normalized;

                }
            );


        const result =
            validateCompanyRows(
                normalizedRows
            );


        showCompanyImportPreview(
            file.name,
            result
        );

    }


    /* =====================================================
       VALIDATE COMPANY ROWS
    ====================================================== */

    function validateCompanyRows(rows) {

        const valid = [];
        const invalid = [];

        const seenCodes =
            new Set();


        rows.forEach(
            function (row, index) {

                const excelRow =
                    index + 2;

                const companyCode =
                    (
                        row.company_code ||
                        ""
                    )
                    .trim()
                    .toUpperCase();


                const companyName =
                    (
                        row.company_name ||
                        ""
                    )
                    .trim();


                const errors = [];


                /* REQUIRED */

                if (!companyCode) {

                    errors.push(
                        "Company Code missing"
                    );

                }


                if (!companyName) {

                    errors.push(
                        "Company Name missing"
                    );

                }


                /* DUPLICATE IN EXCEL */

                if (
                    companyCode &&
                    seenCodes.has(companyCode)
                ) {

                    errors.push(
                        "Duplicate company code"
                    );

                }


                if (companyCode) {

                    seenCodes.add(
                        companyCode
                    );

                }


                /* EMAIL */

                const email =
                    (
                        row.contact_email ||
                        ""
                    )
                    .trim();


                if (
                    email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        .test(email)
                ) {

                    errors.push(
                        "Invalid contact email"
                    );

                }


                /* PACKAGE */

                if (
                    row.package_lpa !== ""
                    &&
                    row.package_lpa !== undefined
                ) {

                    const packageValue =
                        Number(
                            row.package_lpa
                        );


                    if (
                        Number.isNaN(
                            packageValue
                        )
                        ||
                        packageValue < 0
                    ) {

                        errors.push(
                            "Invalid package LPA"
                        );

                    }

                }


                if (errors.length) {

                    invalid.push({

                        row:
                            excelRow,

                        company:
                            companyName,

                        reason:
                            errors.join(", ")

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

            invalid

        };

    }


    /* =====================================================
       SHOW PREVIEW
    ====================================================== */

    function showCompanyImportPreview(
        filename,
        result
    ) {

        const oldModal =
            document.getElementById(
                "companyExcelPreviewModal"
            );


        if (oldModal) {
            oldModal.remove();
        }


        const modal =
            document.createElement("div");


        modal.id =
            "companyExcelPreviewModal";


        modal.innerHTML = `

            <div class="student-excel-modal-backdrop"></div>


            <div class="student-excel-modal">

                <div class="student-excel-header">

                    <div>

                        <span>
                            COMPANY IMPORT
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
                        id="closeCompanyExcelPreview"
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
                                    .slice(0, 20)
                                    .map(
                                        function(item) {

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
                        id="cancelCompanyExcelImport"
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        class="student-excel-import"
                        id="confirmCompanyExcelImport"
                        ${
                            result.valid.length
                                ? ""
                                : "disabled"
                        }
                    >

                        Import
                        ${result.valid.length}
                        Companies

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        document
            .getElementById(
                "closeCompanyExcelPreview"
            )
            .addEventListener(
                "click",
                function () {

                    modal.remove();

                }
            );


        document
            .getElementById(
                "cancelCompanyExcelImport"
            )
            .addEventListener(
                "click",
                function () {

                    modal.remove();

                }
            );


        document
            .getElementById(
                "confirmCompanyExcelImport"
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

    function escapeHtml(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


})();