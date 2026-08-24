document.addEventListener("DOMContentLoaded", function () {

    const filter =
        document.getElementById("announcementFilter");

    const search =
        document.getElementById("announcementSearch");

    const tableBody =
        document.getElementById("announcementTableBody");

    const emptyState =
        document.getElementById("emptyState");

    const resultCount =
        document.getElementById("resultCount");


    const addBtn =
        document.getElementById("addAnnouncementBtn");

    const modal =
        document.getElementById("announcementModal");

    const closeBtn =
        document.getElementById("closeAnnouncementModal");

    const cancelBtn =
        document.getElementById("cancelAnnouncement");

    const form =
        document.getElementById("announcementForm");

    const status =
        document.getElementById("announcementStatus");

    const scheduleGroup =
        document.getElementById("scheduleGroup");


    /* =====================================================
       FILTER
       ===================================================== */

    function filterAnnouncements() {

        if (!tableBody) {
            return;
        }

        const selectedStatus =
            filter
                ? filter.value
                : "all";

        const searchValue =
            search
                ? search.value
                    .trim()
                    .toLowerCase()
                : "";


        const rows =
            tableBody.querySelectorAll("tr");


        let visibleRows = 0;


        rows.forEach(function (row) {

            const rowStatus =
                (
                    row.dataset.status || ""
                ).toLowerCase();


            const rowSearch =
                (
                    row.dataset.search || ""
                ).toLowerCase();


            const statusMatch =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;


            const searchMatch =
                rowSearch.includes(
                    searchValue
                );


            if (
                statusMatch &&
                searchMatch
            ) {

                row.style.display = "";

                visibleRows++;

            } else {

                row.style.display = "none";

            }

        });


        if (emptyState) {

            emptyState.style.display =
                visibleRows === 0
                    ? "flex"
                    : "none";

        }


        if (resultCount) {

            resultCount.textContent =
                visibleRows === 0
                    ? "No announcements found"
                    : `Showing ${visibleRows} announcements`;

        }

    }


    if (filter) {

        filter.addEventListener(
            "change",
            filterAnnouncements
        );

    }


    if (search) {

        search.addEventListener(
            "input",
            filterAnnouncements
        );

    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    if (addBtn && modal) {

        addBtn.addEventListener(
            "click",
            function () {

                modal.classList.add("show");

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        document.body.style.overflow = "";

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


    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    closeModal();

                }

            }
        );

    }


    /* =====================================================
       ESC KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("show")
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       SCHEDULE FIELD
       ===================================================== */

    if (status && scheduleGroup) {

        status.addEventListener(
            "change",
            function () {

                if (
                    status.value === "scheduled"
                ) {

                    scheduleGroup.classList.add(
                        "show"
                    );

                } else {

                    scheduleGroup.classList.remove(
                        "show"
                    );

                }

            }
        );

    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const titleInput =
                    document.getElementById(
                        "announcementTitle"
                    );

                const descriptionInput =
                    document.getElementById(
                        "announcementDescription"
                    );

                const audienceInput =
                    document.getElementById(
                        "announcementAudience"
                    );

                const statusInput =
                    document.getElementById(
                        "announcementStatus"
                    );

                const dateInput =
                    document.getElementById(
                        "announcementDate"
                    );


                const title =
                    titleInput.value.trim();

                const description =
                    descriptionInput.value.trim();

                const audience =
                    audienceInput.value;

                const announcementStatus =
                    statusInput.value;

                const date =
                    dateInput.value;


                if (
                    title === "" ||
                    description === ""
                ) {

                    alert(
                        "Please enter title and description."
                    );

                    return;

                }


                if (
                    announcementStatus === "scheduled" &&
                    date === ""
                ) {

                    alert(
                        "Please select schedule date."
                    );

                    return;

                }


                const row =
                    document.createElement("tr");


                row.dataset.status =
                    announcementStatus;


                row.dataset.search =
                    (
                        title +
                        " " +
                        description
                    ).toLowerCase();


                let iconClass = "purple";

                if (
                    announcementStatus === "published"
                ) {

                    iconClass = "green";

                } else if (
                    announcementStatus === "scheduled"
                ) {

                    iconClass = "orange";

                }


                let statusText = "Draft";

                if (
                    announcementStatus === "published"
                ) {

                    statusText = "Published";

                } else if (
                    announcementStatus === "scheduled"
                ) {

                    statusText = "Scheduled";

                }


                let displayDate = "—";

                if (
                    announcementStatus === "published"
                ) {

                    displayDate = "Today";

                } else if (
                    announcementStatus === "scheduled"
                ) {

                    displayDate = date;

                }


                let audienceText = "Students";

                if (
                    audience === "authority"
                ) {

                    audienceText = "Authority";

                } else if (
                    audience === "all"
                ) {

                    audienceText = "Everyone";

                }


                let audienceClass =
                    audience === "authority"
                        ? "authority"
                        : "students";


                row.innerHTML = `

                    <td>

                        <div class="announcement-title">

                            <div class="announcement-icon ${iconClass}">
                                ◈
                            </div>

                            <div>

                                <strong>
                                    ${escapeHTML(title)}
                                </strong>

                                <small>
                                    ${escapeHTML(description)}
                                </small>

                            </div>

                        </div>

                    </td>


                    <td>

                        <span class="audience-badge ${audienceClass}">
                            ${audienceText}
                        </span>

                    </td>


                    <td>

                        <span class="status-badge ${announcementStatus}">
                            ${statusText}
                        </span>

                    </td>


                    <td>
                        ${displayDate}
                    </td>


                    <td>
                        College Authority
                    </td>


                    <td>

                        <button
                            type="button"
                            class="action-btn"
                        >
                            ⋮
                        </button>

                    </td>

                `;


                tableBody.prepend(row);


                form.reset();


                if (scheduleGroup) {

                    scheduleGroup.classList.remove(
                        "show"
                    );

                }


                closeModal();


                filterAnnouncements();


                alert(
                    "Announcement created successfully."
                );

            }
        );

    }


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    filterAnnouncements();

});