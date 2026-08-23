/* =========================================================
   CAMPUS ADMIN
   COMPANIES PAGE
========================================================= */


/* =========================================================
   MOCK COMPANY DATA
   ---------------------------------------------------------
   Temporary frontend data.
   Database integration will replace this later.
========================================================= */

const companiesData = [

    {
        id: 1,
        name: "TCS",
        short: "TCS",
        type: "IT / Software",
        location: "Pune, Maharashtra",
        drives: 3,
        placed: 86,
        status: "active",
        employees: "600,000+",
        contact: "Campus Recruitment Team",
        email: "campus.recruitment@tcs.com"
    },

    {
        id: 2,
        name: "Infosys",
        short: "I",
        type: "IT / Software",
        location: "Bengaluru, Karnataka",
        drives: 2,
        placed: 74,
        status: "active",
        employees: "300,000+",
        contact: "University Relations",
        email: "campus@infosys.com"
    },

    {
        id: 3,
        name: "Wipro",
        short: "W",
        type: "IT / Software",
        location: "Bengaluru, Karnataka",
        drives: 2,
        placed: 61,
        status: "active",
        employees: "230,000+",
        contact: "Early Careers Team",
        email: "campus@wipro.com"
    },

    {
        id: 4,
        name: "Accenture",
        short: "A",
        type: "Consulting",
        location: "Gurugram, Haryana",
        drives: 2,
        placed: 58,
        status: "active",
        employees: "740,000+",
        contact: "Campus Hiring",
        email: "campus@accenture.com"
    },

    {
        id: 5,
        name: "Capgemini",
        short: "C",
        type: "IT / Software",
        location: "Mumbai, Maharashtra",
        drives: 1,
        placed: 46,
        status: "active",
        employees: "350,000+",
        contact: "Talent Acquisition",
        email: "campus@capgemini.com"
    },

    {
        id: 6,
        name: "Cognizant",
        short: "COG",
        type: "IT / Software",
        location: "Chennai, Tamil Nadu",
        drives: 1,
        placed: 42,
        status: "active",
        employees: "340,000+",
        contact: "Campus Relations",
        email: "campus@cognizant.com"
    },

    {
        id: 7,
        name: "Deloitte",
        short: "D",
        type: "Consulting",
        location: "Gurugram, Haryana",
        drives: 1,
        placed: 37,
        status: "active",
        employees: "460,000+",
        contact: "Talent Team",
        email: "campus@deloitte.com"
    },

    {
        id: 8,
        name: "Tech Mahindra",
        short: "TM",
        type: "IT / Software",
        location: "Pune, Maharashtra",
        drives: 1,
        placed: 32,
        status: "active",
        employees: "145,000+",
        contact: "Campus Hiring Team",
        email: "campus@techmahindra.com"
    },

    {
        id: 9,
        name: "Larsen & Toubro",
        short: "L&T",
        type: "Core Engineering",
        location: "Mumbai, Maharashtra",
        drives: 0,
        placed: 28,
        status: "active",
        employees: "50,000+",
        contact: "Graduate Recruitment",
        email: "campus@larsentoubro.com"
    },

    {
        id: 10,
        name: "Reliance Industries",
        short: "RIL",
        type: "Core Engineering",
        location: "Mumbai, Maharashtra",
        drives: 0,
        placed: 22,
        status: "active",
        employees: "390,000+",
        contact: "Campus Relations",
        email: "careers@ril.com"
    },

    {
        id: 11,
        name: "HDFC Bank",
        short: "HDFC",
        type: "Finance",
        location: "Mumbai, Maharashtra",
        drives: 0,
        placed: 19,
        status: "active",
        employees: "170,000+",
        contact: "Campus Hiring",
        email: "campus@hdfcbank.com"
    },

    {
        id: 12,
        name: "Zomato",
        short: "Z",
        type: "Startup",
        location: "Gurugram, Haryana",
        drives: 1,
        placed: 14,
        status: "active",
        employees: "5,000+",
        contact: "Talent Acquisition",
        email: "careers@zomato.com"
    },

    {
        id: 13,
        name: "Amazon",
        short: "AMZ",
        type: "IT / Software",
        location: "Bengaluru, Karnataka",
        drives: 1,
        placed: 13,
        status: "active",
        employees: "1,500,000+",
        contact: "University Hiring",
        email: "campus@amazon.com"
    },

    {
        id: 14,
        name: "Microsoft",
        short: "MS",
        type: "IT / Software",
        location: "Hyderabad, Telangana",
        drives: 0,
        placed: 9,
        status: "inactive",
        employees: "220,000+",
        contact: "University Recruiting",
        email: "campus@microsoft.com"
    }

];


/* =========================================================
   STATE
========================================================= */

let filteredCompanies = [...companiesData];

let currentPage = 1;

const companiesPerPage = 8;


/* =========================================================
   DOM
========================================================= */

const tableBody =
    document.getElementById("companiesTableBody");

const searchInput =
    document.getElementById("companySearch");

const statusFilter =
    document.getElementById("companyStatusFilter");

const typeFilter =
    document.getElementById("companyTypeFilter");

const driveFilter =
    document.getElementById("companyDriveFilter");

const resultCount =
    document.getElementById("companyResultCount");

const paginationInfo =
    document.getElementById("paginationInfo");

const prevPageBtn =
    document.getElementById("prevPageBtn");

const nextPageBtn =
    document.getElementById("nextPageBtn");

const clearFiltersBtn =
    document.getElementById("clearFiltersBtn");

const companyModal =
    document.getElementById("companyModal");

const companyModalContent =
    document.getElementById("companyModalContent");

const closeCompanyModal =
    document.getElementById("closeCompanyModal");

const companyModalOverlay =
    document.getElementById("companyModalOverlay");

const addCompanyBtn =
    document.getElementById("addCompanyBtn");

const addCompanyModal =
    document.getElementById("addCompanyModal");

const addCompanyForm =
    document.getElementById("addCompanyForm");

const exportCompaniesBtn =
    document.getElementById("exportCompaniesBtn");


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCompanies();

        setupPagination();

        setupFilters();

        setupModals();

        setupAddCompany();

        setupExport();

    }
);


/* =========================================================
   RENDER COMPANIES
========================================================= */

function renderCompanies() {

    if (!tableBody) {
        return;
    }


    const start =
        (currentPage - 1) *
        companiesPerPage;

    const end =
        start +
        companiesPerPage;

    const pageCompanies =
        filteredCompanies.slice(
            start,
            end
        );


    tableBody.innerHTML = "";


    if (pageCompanies.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:45px;
                    "
                >

                    <div class="admin-empty-state">

                        <div class="admin-empty-state-icon">
                            ◇
                        </div>

                        <h3>
                            No companies found
                        </h3>

                        <p>
                            Try changing your search or filter options.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        updatePagination();

        return;
    }


    pageCompanies.forEach(
        company => {

            const row =
                document.createElement("tr");


            const driveActive =
                company.drives > 0;


            row.innerHTML = `

                <td>

                    <div class="company-cell">

                        <div class="company-logo">
                            ${escapeHtml(company.short)}
                        </div>

                        <div>

                            <span class="company-cell-name">
                                ${escapeHtml(company.name)}
                            </span>

                            <span class="company-cell-meta">
                                Company ID: CMP-${String(company.id).padStart(3, "0")}
                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    <span class="company-type">
                        ${escapeHtml(company.type)}
                    </span>

                </td>


                <td>

                    <span class="company-location">
                        ${escapeHtml(company.location)}
                    </span>

                </td>


                <td>

                    <span class="drive-count">

                        <span
                            class="drive-dot ${driveActive ? "" : "inactive"}"
                        ></span>

                        ${company.drives}
                        ${company.drives === 1 ? "Drive" : "Drives"}

                    </span>

                </td>


                <td>

                    <span class="placed-count">
                        ${company.placed}
                    </span>

                </td>


                <td>

                    <span
                        class="
                            company-status
                            ${company.status}
                        "
                    >
                        ${capitalize(company.status)}
                    </span>

                </td>


                <td>

                    <button
                        type="button"
                        class="company-action-btn"
                        data-company-id="${company.id}"
                        title="View company"
                    >
                        →
                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );


    attachCompanyActions();

    updatePagination();

}


/* =========================================================
   COMPANY ACTIONS
========================================================= */

function attachCompanyActions() {

    const buttons =
        document.querySelectorAll(
            ".company-action-btn"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.companyId
                        );

                    openCompanyDetails(id);

                }
            );

        }
    );

}


/* =========================================================
   COMPANY DETAILS
========================================================= */

function openCompanyDetails(id) {

    const company =
        companiesData.find(
            item => item.id === id
        );


    if (!company) {
        return;
    }


    companyModalContent.innerHTML = `

        <div class="company-detail-header">

            <div class="company-detail-logo">
                ${escapeHtml(company.short)}
            </div>

            <div>

                <h2>
                    ${escapeHtml(company.name)}
                </h2>

                <p>
                    ${escapeHtml(company.type)}
                    ·
                    ${escapeHtml(company.location)}
                </p>

            </div>

        </div>


        <div class="company-detail-stats">

            <div class="detail-stat">

                <span>
                    Active Drives
                </span>

                <strong>
                    ${company.drives}
                </strong>

            </div>


            <div class="detail-stat">

                <span>
                    Students Placed
                </span>

                <strong>
                    ${company.placed}
                </strong>

            </div>


            <div class="detail-stat">

                <span>
                    Status
                </span>

                <strong>
                    ${capitalize(company.status)}
                </strong>

            </div>

        </div>


        <div class="company-detail-info">

            <div class="detail-info-item">

                <span>
                    Company Type
                </span>

                <strong>
                    ${escapeHtml(company.type)}
                </strong>

            </div>


            <div class="detail-info-item">

                <span>
                    Location
                </span>

                <strong>
                    ${escapeHtml(company.location)}
                </strong>

            </div>


            <div class="detail-info-item">

                <span>
                    Workforce
                </span>

                <strong>
                    ${escapeHtml(company.employees)}
                </strong>

            </div>


            <div class="detail-info-item">

                <span>
                    Contact Person
                </span>

                <strong>
                    ${escapeHtml(company.contact)}
                </strong>

            </div>


            <div class="detail-info-item">

                <span>
                    Contact Email
                </span>

                <strong>
                    ${escapeHtml(company.email)}
                </strong>

            </div>


            <div class="detail-info-item">

                <span>
                    Company ID
                </span>

                <strong>
                    CMP-${String(company.id).padStart(3, "0")}
                </strong>

            </div>

        </div>

    `;


    openModal(companyModal);

}


/* =========================================================
   FILTERS
========================================================= */

function setupFilters() {

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    if (driveFilter) {

        driveFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    if (clearFiltersBtn) {

        clearFiltersBtn.addEventListener(
            "click",
            clearFilters
        );

    }

}


/* =========================================================
   APPLY FILTERS
========================================================= */

function applyFilters() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    const status =
        statusFilter.value;

    const type =
        typeFilter.value;

    const drive =
        driveFilter.value;


    filteredCompanies =
        companiesData.filter(
            company => {

                const matchesSearch =

                    !search ||

                    company.name
                        .toLowerCase()
                        .includes(search) ||

                    company.type
                        .toLowerCase()
                        .includes(search) ||

                    company.location
                        .toLowerCase()
                        .includes(search);


                const matchesStatus =

                    status === "all" ||

                    company.status === status;


                const matchesType =

                    type === "all" ||

                    companyTypeMatch(
                        company.type,
                        type
                    );


                const matchesDrive =

                    drive === "all" ||

                    (
                        drive === "active" &&
                        company.drives > 0
                    ) ||

                    (
                        drive === "none" &&
                        company.drives === 0
                    );


                return (

                    matchesSearch &&
                    matchesStatus &&
                    matchesType &&
                    matchesDrive

                );

            }
        );


    currentPage = 1;

    renderCompanies();

}


/* =========================================================
   TYPE MATCH
========================================================= */

function companyTypeMatch(
    companyType,
    filterType
) {

    const map = {

        it:
            "IT / Software",

        core:
            "Core Engineering",

        consulting:
            "Consulting",

        finance:
            "Finance",

        startup:
            "Startup"

    };


    return companyType === map[filterType];

}


/* =========================================================
   CLEAR FILTERS
========================================================= */

function clearFilters() {

    searchInput.value = "";

    statusFilter.value = "all";

    typeFilter.value = "all";

    driveFilter.value = "all";

    filteredCompanies =
        [...companiesData];

    currentPage = 1;

    renderCompanies();

}


/* =========================================================
   PAGINATION
========================================================= */

function setupPagination() {

    prevPageBtn.addEventListener(
        "click",
        () => {

            if (currentPage > 1) {

                currentPage--;

                renderCompanies();

            }

        }
    );


    nextPageBtn.addEventListener(
        "click",
        () => {

            const totalPages =
                Math.ceil(
                    filteredCompanies.length /
                    companiesPerPage
                );


            if (currentPage < totalPages) {

                currentPage++;

                renderCompanies();

            }

        }
    );


    document
        .querySelectorAll(
            ".pagination-page"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const page =
                            Number(
                                button.dataset.page
                            );

                        const totalPages =
                            Math.ceil(
                                filteredCompanies.length /
                                companiesPerPage
                            );


                        if (
                            page <= totalPages
                        ) {

                            currentPage =
                                page;

                            renderCompanies();

                        }

                    }
                );

            }
        );

}


/* =========================================================
   UPDATE PAGINATION
========================================================= */

function updatePagination() {

    const total =
        filteredCompanies.length;

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                total /
                companiesPerPage
            )
        );


    const start =
        total === 0
            ? 0
            : ((currentPage - 1) *
                companiesPerPage) + 1;


    const end =
        Math.min(
            currentPage *
            companiesPerPage,
            total
        );


    paginationInfo.textContent =
        `Showing ${start}–${end} of ${total} companies`;


    resultCount.textContent =
        `${total} ${total === 1 ? "company" : "companies"}`;


    prevPageBtn.disabled =
        currentPage <= 1;


    nextPageBtn.disabled =
        currentPage >= totalPages;


    document
        .querySelectorAll(
            ".pagination-page"
        )
        .forEach(
            button => {

                const page =
                    Number(
                        button.dataset.page
                    );

                button.classList.toggle(
                    "active",
                    page === currentPage
                );

                button.style.display =
                    page <= totalPages
                        ? "flex"
                        : "none";

            }
        );

}


/* =========================================================
   MODALS
========================================================= */

function setupModals() {

    closeCompanyModal.addEventListener(
        "click",
        () => closeModal(companyModal)
    );


    companyModalOverlay.addEventListener(
        "click",
        () => closeModal(companyModal)
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeModal(companyModal);

                closeModal(addCompanyModal);

            }

        }
    );

}


/* =========================================================
   OPEN / CLOSE MODAL
========================================================= */

function openModal(modal) {

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";

}


function closeModal(modal) {

    if (!modal) {
        return;
    }


    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    if (
        !companyModal.classList.contains("open") &&
        !addCompanyModal.classList.contains("open")
    ) {

        document.body.style.overflow =
            "";

    }

}


/* =========================================================
   ADD COMPANY
========================================================= */

function setupAddCompany() {

    addCompanyBtn.addEventListener(
        "click",
        () => {

            addCompanyForm.reset();

            openModal(
                addCompanyModal
            );

        }
    );


    document
        .querySelectorAll(
            "[data-close-add-company]"
        )
        .forEach(
            element => {

                element.addEventListener(
                    "click",
                    () => {

                        closeModal(
                            addCompanyModal
                        );

                    }
                );

            }
        );


    addCompanyForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "newCompanyName"
                    )
                    .value
                    .trim();


            const type =
                document
                    .getElementById(
                        "newCompanyType"
                    )
                    .value;


            const location =
                document
                    .getElementById(
                        "newCompanyLocation"
                    )
                    .value
                    .trim();


            const contact =
                document
                    .getElementById(
                        "newCompanyContact"
                    )
                    .value
                    .trim();


            const email =
                document
                    .getElementById(
                        "newCompanyEmail"
                    )
                    .value
                    .trim();


            if (!name || !type || !location) {

                return;

            }


            const newCompany = {

                id:
                    companiesData.length + 1,

                name:
                    name,

                short:
                    createShortName(name),

                type:
                    type,

                location:
                    location,

                drives:
                    0,

                placed:
                    0,

                status:
                    "active",

                employees:
                    "Not available",

                contact:
                    contact || "Not provided",

                email:
                    email || "Not provided"

            };


            companiesData.unshift(
                newCompany
            );


            filteredCompanies =
                [...companiesData];


            currentPage = 1;


            renderCompanies();

            closeModal(
                addCompanyModal
            );


            showToast(
                "Company added successfully."
            );

        }
    );

}


/* =========================================================
   EXPORT
========================================================= */

function setupExport() {

    exportCompaniesBtn.addEventListener(
        "click",
        () => {

            const headers = [

                "Company",
                "Type",
                "Location",
                "Drives",
                "Students Placed",
                "Status"

            ];


            const rows =
                filteredCompanies.map(
                    company => [

                        company.name,
                        company.type,
                        company.location,
                        company.drives,
                        company.placed,
                        company.status

                    ]
                );


            const csv = [

                headers,
                ...rows

            ]
                .map(
                    row =>
                        row
                            .map(
                                value =>
                                    `"${String(value).replace(
                                        /"/g,
                                        '""'
                                    )}"`
                            )
                            .join(",")
                )
                .join("\n");


            const blob =
                new Blob(
                    [csv],
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


            link.href = url;

            link.download =
                "campus-companies.csv";


            document
                .body
                .appendChild(link);


            link.click();

            link.remove();


            URL.revokeObjectURL(url);


            showToast(
                "Company data exported."
            );

        }
    );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const existing =
        document.querySelector(
            ".companies-toast"
        );


    if (existing) {
        existing.remove();
    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "companies-toast";


    toast.textContent =
        message;


    Object.assign(
        toast.style,
        {

            position: "fixed",

            right: "24px",

            bottom: "24px",

            zIndex: "1200",

            padding: "11px 15px",

            border:
                "1px solid rgba(124,58,237,.35)",

            borderRadius: "9px",

            background: "#172642",

            color: "#ffffff",

            fontSize: "10px",

            fontWeight: "700",

            boxShadow:
                "0 12px 35px rgba(0,0,0,.35)"

        }
    );


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },
        2400
    );

}


/* =========================================================
   HELPERS
========================================================= */

function capitalize(value) {

    return value
        .charAt(0)
        .toUpperCase() +
        value.slice(1);

}


function createShortName(name) {

    const words =
        name
            .split(" ")
            .filter(Boolean);


    if (words.length === 1) {

        return words[0]
            .slice(0, 3)
            .toUpperCase();

    }


    return words
        .slice(0, 3)
        .map(
            word =>
                word.charAt(0)
        )
        .join("")
        .toUpperCase();

}


function escapeHtml(value) {

    return String(value)

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