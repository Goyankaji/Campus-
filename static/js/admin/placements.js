/* =========================================================
   CAMPUS ADMIN
   PLACEMENTS JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const search =
        document.getElementById("placementSearch");

    const status =
        document.getElementById("placementStatus");

    const college =
        document.getElementById("placementCollege");

    const sessionFilter =
        document.getElementById("placementSession");

    const tableBody =
        document.getElementById(
            "placementsTableBody"
        );

    const empty =
        document.getElementById(
            "placementsEmpty"
        );

    const recordCount =
        document.getElementById(
            "recordCount"
        );

    const footerCount =
        document.getElementById(
            "footerRecordCount"
        );

    const clearBtn =
        document.getElementById(
            "clearPlacementFilters"
        );

    const refreshBtn =
        document.getElementById(
            "refreshPlacements"
        );

    const modal =
        document.getElementById(
            "placementDetailsModal"
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
       FILTER
    ====================================================== */

    function filterPlacements() {

        const searchValue =
            normalize(search.value);

        const statusValue =
            normalize(status.value);

        const collegeValue =
            normalize(college.value);


        const rows =
            Array.from(
                tableBody.querySelectorAll("tr")
            );


        let visible = 0;


        rows.forEach(row => {

            const student =
                normalize(
                    row.dataset.student
                );

            const company =
                normalize(
                    row.dataset.company
                );

            const role =
                normalize(
                    row.dataset.role
                );

            const rowCollege =
                normalize(
                    row.dataset.college
                );

            const rowStatus =
                normalize(
                    row.dataset.status
                );


            const matchesSearch =
                !searchValue ||
                student.includes(searchValue) ||
                company.includes(searchValue) ||
                role.includes(searchValue);


            const matchesStatus =
                statusValue === "all" ||
                rowStatus === statusValue;


            const matchesCollege =
                collegeValue === "all" ||
                rowCollege === collegeValue;


            const show =
                matchesSearch &&
                matchesStatus &&
                matchesCollege;


            row.style.display =
                show ? "" : "none";


            if (show) {
                visible++;
            }

        });


        recordCount.textContent = visible;
        footerCount.textContent = visible;

        empty.hidden = visible !== 0;

    }


    /* =====================================================
       CLEAR
    ====================================================== */

    function clearFilters() {

        search.value = "";
        status.value = "all";
        college.value = "all";
        sessionFilter.value = "2025-26";

        filterPlacements();

    }


    /* =====================================================
       VIEW DETAILS
    ====================================================== */

    function showDetails(row) {

        const student =
            row.dataset.student;

        const company =
            row.dataset.company;

        const role =
            row.dataset.role;

        const collegeName =
            row.dataset.college;

        const statusName =
            row.dataset.status;


        const cells =
            row.querySelectorAll("td");


        document.getElementById(
            "modalStudentName"
        ).textContent =
            student
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");


        document.getElementById(
            "modalCompany"
        ).textContent =
            company
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");


        document.getElementById(
            "modalRole"
        ).textContent =
            role
                .split(" ")
                .map(
                    word =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");


        document.getElementById(
            "modalCollege"
        ).textContent =
            collegeName.toUpperCase();


        document.getElementById(
            "modalStudentRole"
        ).textContent =
            `${document.getElementById("modalRole").textContent} · ${document.getElementById("modalCompany").textContent}`;


        const avatar =
            student
                .split(" ")
                .map(word => word[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();


        document.getElementById(
            "modalAvatar"
        ).textContent = avatar;


        document.getElementById(
            "modalPackage"
        ).textContent =
            cells[4]
                ?.textContent
                .trim() || "—";


        document.getElementById(
            "modalDate"
        ).textContent =
            cells[5]
                ?.textContent
                .trim() || "—";


        document.getElementById(
            "modalStatus"
        ).textContent =
            statusName === "joining"
                ? "Joining Pending"
                : statusName.charAt(0).toUpperCase() +
                  statusName.slice(1);


        document.getElementById(
            "modalJoining"
        ).textContent =
            statusName === "placed"
                ? "Joined / Confirmed"
                : statusName === "joining"
                    ? "Joining Pending"
                    : "Selection Process";


        modal.hidden = false;

    }


    /* =====================================================
       TABLE CLICK
    ====================================================== */

    tableBody.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".placement-view-btn"
                );


            if (!button) {
                return;
            }


            const row =
                button.closest("tr");


            if (row) {
                showDetails(row);
            }

        }
    );


    /* =====================================================
       CLOSE MODAL
    ====================================================== */

    document
        .querySelectorAll(
            "[data-close-placement]"
        )
        .forEach(element => {

            element.addEventListener(
                "click",
                () => {
                    modal.hidden = true;
                }
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                modal.hidden = true;
            }

        }
    );


    /* =====================================================
       REFRESH
    ====================================================== */

    refreshBtn.addEventListener(
        "click",
        () => {

            const oldText =
                refreshBtn.innerHTML;

            refreshBtn.disabled = true;

            refreshBtn.innerHTML =
                "<span>↻</span> Refreshing...";


            setTimeout(() => {

                refreshBtn.disabled = false;

                refreshBtn.innerHTML =
                    oldText;

                filterPlacements();

            }, 500);

        }
    );


    /* =====================================================
       EVENTS
    ====================================================== */

    search.addEventListener(
        "input",
        filterPlacements
    );

    status.addEventListener(
        "change",
        filterPlacements
    );

    college.addEventListener(
        "change",
        filterPlacements
    );

    sessionFilter.addEventListener(
        "change",
        filterPlacements
    );

    clearBtn.addEventListener(
        "click",
        clearFilters
    );


    /* =====================================================
       PAGINATION UI
    ====================================================== */

    document
        .querySelectorAll(".page-btn")
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


                    const text =
                        button.textContent.trim();


                    if (
                        text === "‹" ||
                        text === "›"
                    ) {
                        return;
                    }


                    document
                        .querySelectorAll(".page-btn")
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );

                }
            );

        });


    /* =====================================================
       INITIAL
    ====================================================== */

    filterPlacements();

});