/* =========================================================
   AUTHORITY — ANNOUNCEMENTS JS
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const announcementSearch =
    document.getElementById(
        "announcementSearch"
    );

const announcementStatusFilter =
    document.getElementById(
        "announcementStatusFilter"
    );

const announcementsList =
    document.getElementById(
        "announcementsList"
    );

const announcementCount =
    document.getElementById(
        "announcementCount"
    );

const createAnnouncementBtn =
    document.getElementById(
        "createAnnouncementBtn"
    );

const announcementModal =
    document.getElementById(
        "announcementModal"
    );

const announcementModalClose =
    document.getElementById(
        "announcementModalClose"
    );

const announcementModalOverlay =
    document.querySelector(
        ".announcement-modal-overlay"
    );

const modalAnnouncementTitle =
    document.getElementById(
        "modalAnnouncementTitle"
    );

const modalAnnouncementText =
    document.getElementById(
        "modalAnnouncementText"
    );

const modalAnnouncementStatus =
    document.getElementById(
        "modalAnnouncementStatus"
    );

const modalAnnouncementAudience =
    document.getElementById(
        "modalAnnouncementAudience"
    );

const modalAnnouncementDate =
    document.getElementById(
        "modalAnnouncementDate"
    );

const modalArchiveBtn =
    document.getElementById(
        "modalArchiveBtn"
    );

const modalEditBtn =
    document.getElementById(
        "modalEditBtn"
    );


/* =========================================================
   GET ITEMS
========================================================= */

function getAnnouncementItems() {

    if (!announcementsList) {
        return [];
    }

    return Array.from(
        announcementsList.querySelectorAll(
            ".announcement-item"
        )
    );

}


/* =========================================================
   FILTER
========================================================= */

function filterAnnouncements() {

    const items =
        getAnnouncementItems();


    const searchValue =
        announcementSearch
            ? announcementSearch.value
                .toLowerCase()
                .trim()
            : "";


    const statusValue =
        announcementStatusFilter
            ? announcementStatusFilter.value
            : "all";


    let visibleCount = 0;


    items.forEach(function (item) {

        const status =
            item.dataset.status || "";


        const searchText =
            item.dataset.search
                ? item.dataset.search.toLowerCase()
                : "";


        const searchMatch =
            searchText.includes(
                searchValue
            );


        const statusMatch =
            statusValue === "all" ||
            status === statusValue;


        if (
            searchMatch &&
            statusMatch
        ) {

            item.style.display = "";

            visibleCount++;

        } else {

            item.style.display = "none";

        }

    });


    updateAnnouncementCount(
        visibleCount
    );

}


/* =========================================================
   COUNT
========================================================= */

function updateAnnouncementCount(
    count
) {

    if (!announcementCount) {
        return;
    }


    announcementCount.textContent =
        `Showing ${count} announcement${count === 1 ? "" : "s"}`;

}


/* =========================================================
   SEARCH
========================================================= */

if (announcementSearch) {

    announcementSearch.addEventListener(
        "input",
        filterAnnouncements
    );

}


/* =========================================================
   STATUS FILTER
========================================================= */

if (announcementStatusFilter) {

    announcementStatusFilter.addEventListener(
        "change",
        filterAnnouncements
    );

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openAnnouncementModal(item) {

    if (
        !announcementModal ||
        !item
    ) {

        return;

    }


    const title =
        item.querySelector(
            ".announcement-item-top h3"
        );

    const description =
        item.querySelector(
            ".announcement-item-content > p"
        );

    const status =
        item.querySelector(
            ".announcement-status"
        );

    const footerSpans =
        item.querySelectorAll(
            ".announcement-item-footer > span"
        );


    if (modalAnnouncementTitle) {

        modalAnnouncementTitle.textContent =
            title
                ? title.textContent.trim()
                : "Announcement";

    }


    if (modalAnnouncementText) {

        modalAnnouncementText.textContent =
            description
                ? description.textContent.trim()
                : "Announcement details.";

    }


    if (modalAnnouncementStatus) {

        modalAnnouncementStatus.textContent =
            status
                ? status.textContent.trim()
                : "—";

    }


    if (modalAnnouncementDate) {

        modalAnnouncementDate.textContent =
            footerSpans[0]
                ? footerSpans[0].textContent.trim()
                : "—";

    }


    if (modalAnnouncementAudience) {

        modalAnnouncementAudience.textContent =
            footerSpans[1]
                ? footerSpans[1].textContent
                    .replace(
                        "Audience:",
                        ""
                    )
                    .trim()
                : "—";

    }


    announcementModal.dataset.currentIndex =
        getAnnouncementItems().indexOf(
            item
        );


    announcementModal.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   VIEW BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".announcement-view-btn"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const item =
                    button.closest(
                        ".announcement-item"
                    );

                openAnnouncementModal(
                    item
                );

            }
        );

    });


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeAnnouncementModal() {

    if (!announcementModal) {
        return;
    }


    announcementModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


if (announcementModalClose) {

    announcementModalClose.addEventListener(
        "click",
        closeAnnouncementModal
    );

}


if (announcementModalOverlay) {

    announcementModalOverlay.addEventListener(
        "click",
        closeAnnouncementModal
    );

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            announcementModal &&
            announcementModal.classList.contains(
                "show"
            )
        ) {

            closeAnnouncementModal();

        }

    }
);


/* =========================================================
   CREATE ANNOUNCEMENT
========================================================= */

if (createAnnouncementBtn) {

    createAnnouncementBtn.addEventListener(
        "click",
        function () {

            alert(
                "Announcement creation will be connected to the database later."
            );

        }
    );

}


/* =========================================================
   ARCHIVE
========================================================= */

if (modalArchiveBtn) {

    modalArchiveBtn.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    announcementModal.dataset.currentIndex
                );


            const items =
                getAnnouncementItems();


            const item =
                items[index];


            if (!item) {
                return;
            }


            item.style.display =
                "none";


            closeAnnouncementModal();

            filterAnnouncements();

        }
    );

}


/* =========================================================
   EDIT
========================================================= */

if (modalEditBtn) {

    modalEditBtn.addEventListener(
        "click",
        function () {

            alert(
                "Announcement editing will be connected to the database later."
            );

        }
    );

}


/* =========================================================
   FEATURED ACTIONS
========================================================= */

document
    .querySelectorAll(
        ".featured-actions button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const action =
                    button.dataset.action;


                if (action === "edit") {

                    alert(
                        "Announcement editing will be connected later."
                    );

                }


                if (action === "archive") {

                    alert(
                        "Featured announcement archived."
                    );

                }

            }
        );

    });


/* =========================================================
   PAGINATION
========================================================= */

document
    .querySelectorAll(
        ".announcement-pagination button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

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
                        ".announcement-pagination button"
                    )
                    .forEach(function (item) {

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


/* =========================================================
   INITIAL LOAD
========================================================= */

filterAnnouncements();