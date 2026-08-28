/* =========================================================
   CAMPUS PLACEMENT PORTAL
   TPO - PREPARATION MATERIALS
   STATIC FRONTEND VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const categoryButtons =
        document.querySelectorAll(
            ".material-category"
        );

    const materialCards =
        document.querySelectorAll(
            ".material-card"
        );

    const searchInput =
        document.getElementById(
            "materialSearch"
        );

    const typeFilter =
        document.getElementById(
            "materialTypeFilter"
        );

    const collegeFilter =
        document.getElementById(
            "materialCollegeFilter"
        );

    const materialGrid =
        document.getElementById(
            "materialGrid"
        );

    const emptyState =
        document.getElementById(
            "materialsEmpty"
        );

    const materialsCount =
        document.getElementById(
            "materialsCount"
        );

    const totalMaterials =
        document.getElementById(
            "totalMaterials"
        );


    /* =====================================================
       MODAL ELEMENTS
    ====================================================== */

    const addMaterialBtn =
        document.getElementById(
            "addMaterialBtn"
        );

    const materialModal =
        document.getElementById(
            "materialModal"
        );

    const modalOverlay =
        document.getElementById(
            "materialModalOverlay"
        );

    const closeMaterialModal =
        document.getElementById(
            "closeMaterialModal"
        );

    const cancelMaterial =
        document.getElementById(
            "cancelMaterial"
        );

    const materialForm =
        document.getElementById(
            "materialForm"
        );


    /* =====================================================
       STATE
    ====================================================== */

    let selectedCategory = "all";

    let searchValue = "";

    let selectedType = "all";

    let selectedCollege = "all";


    /* =====================================================
       OPEN MODAL
    ====================================================== */

    function openMaterialModal() {

        if (!materialModal) {
            return;
        }

        materialModal.classList.add(
            "open"
        );

        materialModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";


        const titleInput =
            document.getElementById(
                "materialTitle"
            );

        if (titleInput) {

            setTimeout(
                function () {

                    titleInput.focus();

                },
                100
            );

        }

    }


    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    function closeModal() {

        if (!materialModal) {
            return;
        }

        materialModal.classList.remove(
            "open"
        );

        materialModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    /* =====================================================
       MODAL EVENTS
    ====================================================== */

    if (addMaterialBtn) {

        addMaterialBtn.addEventListener(
            "click",
            openMaterialModal
        );

    }


    if (closeMaterialModal) {

        closeMaterialModal.addEventListener(
            "click",
            closeModal
        );

    }


    if (cancelMaterial) {

        cancelMaterial.addEventListener(
            "click",
            closeModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeModal
        );

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                materialModal &&
                materialModal.classList.contains(
                    "open"
                )
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       CATEGORY FILTER
    ====================================================== */

    categoryButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    categoryButtons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    selectedCategory =
                        button.dataset.category ||
                        "all";


                    filterMaterials();

                }
            );

        }
    );


    /* =====================================================
       SEARCH
    ====================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                searchValue =
                    searchInput.value
                        .trim()
                        .toLowerCase();


                filterMaterials();

            }
        );

    }


    /* =====================================================
       TYPE FILTER
    ====================================================== */

    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            function () {

                selectedType =
                    typeFilter.value;


                filterMaterials();

            }
        );

    }


    /* =====================================================
       COLLEGE FILTER
    ====================================================== */

    if (collegeFilter) {

        collegeFilter.addEventListener(
            "change",
            function () {

                selectedCollege =
                    collegeFilter.value;


                filterMaterials();

            }
        );

    }


    /* =====================================================
       FILTER MATERIALS
    ====================================================== */

    function filterMaterials() {

        let visibleCount = 0;


        materialCards.forEach(
            function (card) {

                const category =
                    (
                        card.dataset.category ||
                        ""
                    ).toLowerCase();


                const type =
                    (
                        card.dataset.type ||
                        ""
                    ).toLowerCase();


                const college =
                    (
                        card.dataset.college ||
                        "all"
                    ).toLowerCase();


                const searchableText =
                    (
                        card.dataset.search ||
                        card.textContent ||
                        ""
                    ).toLowerCase();


                const categoryMatch =
                    selectedCategory ===
                    "all" ||
                    category ===
                    selectedCategory;


                const typeMatch =
                    selectedType ===
                    "all" ||
                    type ===
                    selectedType;


                const collegeMatch =
                    selectedCollege ===
                    "all" ||
                    college ===
                    selectedCollege.toLowerCase();


                const searchMatch =
                    !searchValue ||
                    searchableText.includes(
                        searchValue
                    );


                const visible =
                    categoryMatch &&
                    typeMatch &&
                    collegeMatch &&
                    searchMatch;


                if (visible) {

                    card.style.display =
                        "";

                    visibleCount++;

                } else {

                    card.style.display =
                        "none";

                }

            }
        );


        updateMaterialCount(
            visibleCount
        );


        if (emptyState) {

            emptyState.style.display =
                visibleCount === 0
                    ? "flex"
                    : "none";

        }


        if (materialGrid) {

            materialGrid.style.display =
                visibleCount === 0
                    ? "none"
                    : "grid";

        }

    }


    /* =====================================================
       UPDATE COUNT
    ====================================================== */

    function updateMaterialCount(
        count
    ) {

        if (!materialsCount) {
            return;
        }


        const materialWord =
            count === 1
                ? "material"
                : "materials";


        materialsCount.textContent =
            "Showing " +
            count +
            " " +
            materialWord;


        if (totalMaterials) {

            totalMaterials.textContent =
                materialCards.length;

        }

    }


    /* =====================================================
       VIEW MATERIAL
    ====================================================== */

    document
        .querySelectorAll(
            ".material-view-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const card =
                            button.closest(
                                ".material-card"
                            );


                        if (!card) {
                            return;
                        }


                        const title =
                            card.querySelector(
                                "h3"
                            );


                        const materialTitle =
                            title
                                ? title.textContent.trim()
                                : "Material";


                        const type =
                            card.dataset.type ||
                            "resource";


                        let action =
                            "open";


                        if (type === "pdf") {

                            action =
                                "view";

                        } else if (
                            type === "video"
                        ) {

                            action =
                                "watch";

                        }


                        alert(
                            materialTitle +
                            " — " +
                            action +
                            " action will be connected when resources are uploaded."
                        );

                    }
                );

            }
        );


    /* =====================================================
       ADD MATERIAL
    ====================================================== */

    if (materialForm) {

        materialForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const titleInput =
                    document.getElementById(
                        "materialTitle"
                    );

                const categoryInput =
                    document.getElementById(
                        "materialCategory"
                    );

                const typeInput =
                    document.getElementById(
                        "materialType"
                    );

                const descriptionInput =
                    document.getElementById(
                        "materialDescription"
                    );

                const collegeInput =
                    document.getElementById(
                        "materialCollege"
                    );


                const title =
                    titleInput
                        ? titleInput.value.trim()
                        : "";


                const category =
                    categoryInput
                        ? categoryInput.value
                        : "aptitude";


                const type =
                    typeInput
                        ? typeInput.value
                        : "pdf";


                const description =
                    descriptionInput
                        ? descriptionInput.value.trim()
                        : "";


                const college =
                    collegeInput
                        ? collegeInput.value
                        : "all";


                if (!title) {

                    alert(
                        "Please enter a material title."
                    );

                    if (titleInput) {
                        titleInput.focus();
                    }

                    return;

                }


                /*
                 * Static mode:
                 * create the card in frontend only.
                 */

                addMaterialCard({
                    title,
                    category,
                    type,
                    description,
                    college
                });


                materialForm.reset();

                closeModal();

                filterMaterials();


                alert(
                    "Preparation material added successfully."
                );

            }
        );

    }


    /* =====================================================
       ADD MATERIAL CARD
    ====================================================== */

    function addMaterialCard(
        data
    ) {

        if (!materialGrid) {
            return;
        }


        const card =
            document.createElement(
                "article"
            );


        card.className =
            "material-card";


        card.dataset.category =
            data.category;


        card.dataset.type =
            data.type;


        card.dataset.college =
            data.college;


        card.dataset.search =
            (
                data.title +
                " " +
                data.description
            ).toLowerCase();


        const categoryName =
            getCategoryName(
                data.category
            );


        const typeLabel =
            data.type.toUpperCase();


        const iconClass =
            data.type === "video"
                ? "video"
                : data.type === "link"
                    ? "link"
                    : "pdf";


        const iconText =
            data.type === "video"
                ? "▶"
                : data.type === "link"
                    ? "↗"
                    : "PDF";


        card.innerHTML = `

            <div class="material-card-top">

                <div class="material-file-icon ${iconClass}">
                    ${iconText}
                </div>

                <span class="material-category-tag">
                    ${categoryName}
                </span>

            </div>


            <h3>
                ${escapeHTML(data.title)}
            </h3>


            <p>
                ${escapeHTML(
                    data.description ||
                    "Placement preparation resource."
                )}
            </p>


            <div class="material-meta">

                <span>
                    ${typeLabel}
                </span>

                <span>
                    •
                </span>

                <span>
                    New
                </span>

                <span>
                    •
                </span>

                <span>
                    0 downloads
                </span>

            </div>


            <div class="material-card-footer">

                <span>
                    Added just now
                </span>

                <button
                    type="button"
                    class="material-view-btn"
                >
                    ${
                        data.type === "video"
                            ? "Watch"
                            : data.type === "link"
                                ? "Open"
                                : "View"
                    }
                </button>

            </div>

        `;


        materialGrid.prepend(
            card
        );


        /*
         * Attach view event to newly
         * created card.
         */

        const viewButton =
            card.querySelector(
                ".material-view-btn"
            );


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                function () {

                    alert(
                        data.title +
                        " — resource action will be connected later."
                    );

                }
            );

        }


        /*
         * Refresh NodeList because
         * original query is static.
         */

        refreshMaterialCards();

    }


    /* =====================================================
       MATERIAL CARD REFERENCE
    ====================================================== */

    let currentMaterialCards =
        Array.from(
            document.querySelectorAll(
                ".material-card"
            )
        );


    function refreshMaterialCards() {

        currentMaterialCards =
            Array.from(
                document.querySelectorAll(
                    ".material-card"
                )
            );

    }


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(
        value
    ) {

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


    /* =====================================================
       CATEGORY NAME
    ====================================================== */

    function getCategoryName(
        category
    ) {

        const names = {

            aptitude:
                "Aptitude",

            coding:
                "Coding",

            interview:
                "Interview",

            resume:
                "Resume",

            gd:
                "Group Discussion",

            pyq:
                "PYQs"

        };


        return (
            names[category] ||
            "Preparation"
        );

    }


    /* =====================================================
       PAGINATION — STATIC
    ====================================================== */

    document
        .querySelectorAll(
            ".materials-pagination button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        if (
                            button.disabled ||
                            button.classList.contains(
                                "active"
                            )
                        ) {

                            return;

                        }


                        alert(
                            "Pagination will be connected when materials are loaded dynamically."
                        );

                    }
                );

            }
        );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    refreshMaterialCards();

    filterMaterials();


    console.log(
        "TPO Preparation Materials Loaded Successfully"
    );

});