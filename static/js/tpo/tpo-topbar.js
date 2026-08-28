 /* =========================================================
    CAMPUS PLACEMENT PORTAL
    TPO TOPBAR JS
 ========================================================= */

 document.addEventListener("DOMContentLoaded", function () {


     /* =====================================================
        PROFILE DROPDOWN
     ====================================================== */

     const profileWrapper =
         document.getElementById(
             "userProfileWrapper"
         );

     const profileButton =
         document.getElementById(
             "userProfileButton"
         );

     const profileDropdown =
         document.getElementById(
             "profileDropdown"
         );

     const profileArrow =
         document.getElementById(
             "profileArrow"
         );


     function openProfileDropdown() {

         if (!profileWrapper) {
             return;
         }

         profileWrapper.classList.add(
             "open"
         );


         if (profileButton) {

             profileButton.setAttribute(
                 "aria-expanded",
                 "true"
             );

         }


         if (profileDropdown) {

             profileDropdown.setAttribute(
                 "aria-hidden",
                 "false"
             );

         }


         if (profileArrow) {

             profileArrow.style.transform =
                 "rotate(180deg)";

         }

     }


     function closeProfileDropdown() {

         if (!profileWrapper) {
             return;
         }


         profileWrapper.classList.remove(
             "open"
         );


         if (profileButton) {

             profileButton.setAttribute(
                 "aria-expanded",
                 "false"
             );

         }


         if (profileDropdown) {

             profileDropdown.setAttribute(
                 "aria-hidden",
                 "true"
             );

         }


         if (profileArrow) {

             profileArrow.style.transform =
                 "";

         }

     }


     if (
         profileButton &&
         profileWrapper &&
         profileDropdown
     ) {

         profileButton.addEventListener(
             "click",
             function (event) {

                 event.stopPropagation();


                 if (
                     profileWrapper.classList.contains(
                         "open"
                     )
                 ) {

                     closeProfileDropdown();

                 } else {

                     openProfileDropdown();

                 }

             }
         );


         profileDropdown.addEventListener(
             "click",
             function (event) {

                 event.stopPropagation();

             }
         );

     }



     /* =====================================================
        GLOBAL SEARCH ELEMENTS
     ====================================================== */

     const searchWrapper =
         document.getElementById(
             "searchWrapper"
         );

     const searchInput =
         document.getElementById(
             "tpoSearch"
         );

     const searchResults =
         document.getElementById(
             "searchResults"
         );

     const searchResultsList =
         document.getElementById(
             "searchResultsList"
         );

     const searchResultsHeader =
         document.getElementById(
             "searchResultsHeader"
         );

     const searchNoResults =
         document.getElementById(
             "searchNoResults"
         );



     /* =====================================================
        TPO SEARCH DATA
     ====================================================== */

     const searchPages = [

         {
             title: "Dashboard",

             description:
                 "TPO dashboard and placement summary.",

             keywords: [
                 "dashboard",
                 "home",
                 "main",
                 "overview"
             ],

             icon: "⌂",

             url: "/tpo/dashboard"
         },


         {
             title: "Placement Overview",

             description:
                 "Placement statistics and overall placement performance.",

             keywords: [
                 "placement",
                 "overview",
                 "statistics",
                 "analytics",
                 "placement overview"
             ],

             icon: "◉",

             url: "/tpo/placement-overview"
         },


         {
             title: "Students",

             description:
                 "View and manage student placement information.",

             keywords: [
                 "student",
                 "students",
                 "student list",
                 "student management"
             ],

             icon: "♙",

             url: "/tpo/students"
         },


         {
             title: "Companies",

             description:
                 "Recruiters and company information.",

             keywords: [
                 "company",
                 "companies",
                 "recruiter",
                 "recruiters",
                 "organization"
             ],

             icon: "▣",

             url: "/tpo/companies"
         },


         {
             title: "Placement Drives",

             description:
                 "Manage campus placement and recruitment drives.",

             keywords: [
                 "drive",
                 "drives",
                 "placement drive",
                 "placement drives",
                 "recruitment"
             ],

             icon: "▤",

             url: "/tpo/placement-drives"
         },


         {
             title: "Applications",

             description:
                 "View student placement applications.",

             keywords: [
                 "application",
                 "applications",
                 "apply",
                 "student applications"
             ],

             icon: "▤",

             url: "/tpo/applications"
         },


         {
             title: "Shortlisted Students",

             description:
                 "Students shortlisted by recruiters.",

             keywords: [
                 "shortlisted",
                 "shortlist",
                 "selected",
                 "selected students"
             ],

             icon: "◇",

             url: "/tpo/shortlisted-students"
         },


         {
             title: "Interviews",

             description:
                 "Interview schedules and interview status.",

             keywords: [
                 "interview",
                 "interviews",
                 "schedule",
                 "interview schedule"
             ],

             icon: "◷",

             url: "/tpo/interviews"
         },


         {
             title: "Offers & Joining",

             description:
                 "Placement offers and joining information.",

             keywords: [
                 "offer",
                 "offers",
                 "joining",
                 "offer letter",
                 "joining status"
             ],

             icon: "✓",

             url: "/tpo/offers"
         },


         {
             title: "Preparation Materials",

             description:
                 "Placement preparation resources and PYQs.",

             keywords: [
                 "preparation",
                 "materials",
                 "material",
                 "pyq",
                 "pyqs",
                 "aptitude",
                 "coding",
                 "resume",
                 "interview preparation",
                 "group discussion",
                 "gd"
             ],

             icon: "◆",

             url: "/tpo/preparation"
         },


         {
             title: "Placed Students",

             description:
                 "Students successfully placed.",

             keywords: [
                 "placed",
                 "placed students",
                 "placement results",
                 "placement status"
             ],

             icon: "★",

             url: "/tpo/placed-students"
         },


         {
             title: "Reports",

             description:
                 "Placement reports and performance analytics.",

             keywords: [
                 "report",
                 "reports",
                 "placement report",
                 "analytics",
                 "statistics"
             ],

             icon: "▥",

             url: "/tpo/reports"
         },


         {
             title: "Notifications",

             description:
                 "View system and placement notifications.",

             keywords: [
                 "notification",
                 "notifications",
                 "alert",
                 "alerts"
             ],

             icon: "♢",

             url: "/tpo/notifications"
         },


         {
             title: "Announcements",

             description:
                 "Placement announcements and important notices.",

             keywords: [
                 "announcement",
                 "announcements",
                 "notice",
                 "notices",
                 "updates"
             ],

             icon: "◇",

             url: "/tpo/announcements"
         },


         {
             title: "Settings",

             description:
                 "TPO profile, account and portal settings.",

             keywords: [
                 "setting",
                 "settings",
                 "profile",
                 "account",
                 "preferences"
             ],

             icon: "⚙",

             url: "/tpo/settings"
         }

     ];



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
        HIGHLIGHT SEARCH TEXT
     ====================================================== */

     function highlightSearchText(
         text,
         query
     ) {

         const safeText =
             escapeHTML(text);


         if (!query) {
             return safeText;
         }


         const escapedQuery =
             query.replace(
                 /[.*+?^${}()|[\]\\]/g,
                 "\\$&"
             );


         return safeText.replace(
             new RegExp(
                 "(" +
                 escapedQuery +
                 ")",
                 "gi"
             ),
             "<mark>$1</mark>"
         );

     }



     /* =====================================================
        CREATE SEARCH RESULT
     ====================================================== */

     function createSearchResult(
         item,
         query
     ) {

         const result =
             document.createElement(
                 "a"
             );


         result.className =
             "search-result-item";


         result.href =
             item.url;


         result.innerHTML = `

             <span class="search-result-icon">
                 ${escapeHTML(item.icon)}
             </span>


             <span class="search-result-content">

                 <strong>
                     ${highlightSearchText(
                         item.title,
                         query
                     )}
                 </strong>

                 <small>
                     ${escapeHTML(
                         item.description
                     )}
                 </small>

             </span>


             <span class="search-result-arrow">
                 →
             </span>

         `;


         return result;

     }



     /* =====================================================
        RENDER QUICK NAVIGATION
     ====================================================== */

     function renderQuickNavigation() {

         if (
             !searchResultsList ||
             !searchResultsHeader
         ) {
             return;
         }


         searchResultsList.innerHTML = "";


         searchResultsHeader.textContent =
             "Quick Navigation";


         if (searchNoResults) {

             searchNoResults.style.display =
                 "none";

         }


         searchPages
             .slice(
                 0,
                 6
             )
             .forEach(
                 function (item) {

                     searchResultsList.appendChild(
                         createSearchResult(
                             item,
                             ""
                         )
                     );

                 }
             );

     }



     /* =====================================================
        PERFORM SEARCH
     ====================================================== */

     function performSearch() {

         if (
             !searchInput ||
             !searchResults ||
             !searchResultsList
         ) {
             return;
         }


         const query =
             searchInput.value
                 .trim()
                 .toLowerCase();


         searchResultsList.innerHTML =
             "";


         /* ================================================
            EMPTY SEARCH
         ================================================= */

         if (!query) {

             renderQuickNavigation();


             searchResults.classList.add(
                 "show"
             );


             return;

         }


         /* ================================================
            FILTER SEARCH DATA
         ================================================= */

         const results =
             searchPages.filter(
                 function (item) {

                     const searchableText =
                         (
                             item.title +
                             " " +
                             item.description +
                             " " +
                             item.keywords.join(
                                 " "
                             )
                         ).toLowerCase();


                     return searchableText.includes(
                         query
                     );

                 }
             );


         /* ================================================
            HEADER
         ================================================= */

         if (searchResultsHeader) {

             searchResultsHeader.textContent =
                 results.length +
                 (
                     results.length === 1
                         ? " result found"
                         : " results found"
                 );

         }


         /* ================================================
            RESULTS FOUND
         ================================================= */

         if (
             results.length > 0
         ) {

             if (searchNoResults) {

                 searchNoResults.style.display =
                     "none";

             }


             results.forEach(
                 function (item) {

                     searchResultsList.appendChild(
                         createSearchResult(
                             item,
                             query
                         )
                     );

                 }
             );

         }


         /* ================================================
            NO RESULTS
         ================================================= */

         else {

             if (searchNoResults) {

                 searchNoResults.style.display =
                     "flex";

             }

         }


         searchResults.classList.add(
             "show"
         );

     }



     /* =====================================================
        SEARCH INPUT
     ====================================================== */

     if (searchInput) {

         searchInput.addEventListener(
             "input",
             function () {

                 performSearch();

             }
         );


         searchInput.addEventListener(
             "focus",
             function () {

                 performSearch();

             }
         );


         /* ================================================
            ENTER → FIRST RESULT
         ================================================= */

         searchInput.addEventListener(
             "keydown",
             function (event) {

                 if (
                     event.key === "Enter"
                 ) {

                     event.preventDefault();


                     const firstResult =
                         searchResultsList
                             ? searchResultsList.querySelector(
                                 ".search-result-item"
                             )
                             : null;


                     if (firstResult) {

                         window.location.href =
                             firstResult.getAttribute(
                                 "href"
                             );

                     }

                 }

             }
         );

     }



     /* =====================================================
        CTRL + K
     ====================================================== */

     document.addEventListener(
         "keydown",
         function (event) {

             if (
                 (event.ctrlKey ||
                  event.metaKey) &&
                 event.key.toLowerCase() === "k"
             ) {

                 event.preventDefault();


                 if (searchInput) {

                     searchInput.focus();

                     performSearch();

                 }

             }

         }
     );



     /* =====================================================
        SEARCH OUTSIDE CLICK
     ====================================================== */

     document.addEventListener(
         "click",
         function (event) {

             if (
                 searchWrapper &&
                 !searchWrapper.contains(
                     event.target
                 )
             ) {

                 if (searchResults) {

                     searchResults.classList.remove(
                         "show"
                     );

                 }

             }

         }
     );



     /* =====================================================
        PROFILE OUTSIDE CLICK
     ====================================================== */

     document.addEventListener(
         "click",
         function () {

             closeProfileDropdown();

         }
     );



     /* =====================================================
        ESCAPE
     ====================================================== */

     document.addEventListener(
         "keydown",
         function (event) {

             if (
                 event.key === "Escape"
             ) {

                 closeProfileDropdown();


                 if (searchResults) {

                     searchResults.classList.remove(
                         "show"
                     );

                 }

             }

         }
     );



     /* =====================================================
        DARK / LIGHT MODE
     ====================================================== */

     const topThemeToggle =
         document.getElementById(
             "topThemeToggle"
         );

     const sidebarThemeToggle =
         document.getElementById(
             "themeToggle"
         );

     const themeIcon =
         document.getElementById(
             "themeIcon"
         );

     const themeText =
         document.getElementById(
             "themeText"
         );



     /* =====================================================
        APPLY THEME
     ====================================================== */

     function applyTheme(
         isDark
     ) {

         if (isDark) {

             document.body.classList.add(
                 "dark-theme"
             );


             if (themeIcon) {

                 themeIcon.textContent =
                     "☀";

             }


             if (themeText) {

                 themeText.textContent =
                     "Light Mode";

             }


             if (topThemeToggle) {

                 topThemeToggle.textContent =
                     "☀";

                 topThemeToggle.setAttribute(
                     "title",
                     "Switch to light mode"
                 );

             }

         }

         else {

             document.body.classList.remove(
                 "dark-theme"
             );


             if (themeIcon) {

                 themeIcon.textContent =
                     "☾";

             }


             if (themeText) {

                 themeText.textContent =
                     "Dark Mode";

             }


             if (topThemeToggle) {

                 topThemeToggle.textContent =
                     "☼";

                 topThemeToggle.setAttribute(
                     "title",
                     "Switch to dark mode"
                 );

             }

         }

     }



     /* =====================================================
        LOAD SAVED THEME
     ====================================================== */

     const savedTheme =
         localStorage.getItem(
             "tpoTheme"
         );


     if (
         savedTheme === "dark"
     ) {

         applyTheme(
             true
         );

     }

     else {

         applyTheme(
             false
         );

     }



     /* =====================================================
        TOGGLE THEME
     ====================================================== */

     function toggleTheme() {

         const currentlyDark =
             document.body.classList.contains(
                 "dark-theme"
             );


         const newDarkState =
             !currentlyDark;


         applyTheme(
             newDarkState
         );


         localStorage.setItem(
             "tpoTheme",
             newDarkState
                 ? "dark"
                 : "light"
         );

     }



     /* =====================================================
        TOPBAR THEME BUTTON
     ====================================================== */

     if (topThemeToggle) {

         topThemeToggle.addEventListener(
             "click",
             function (event) {

                 event.preventDefault();

                 event.stopPropagation();


                 toggleTheme();

             }
         );

     }



     /* =====================================================
        SIDEBAR THEME BUTTON
     ====================================================== */

     if (sidebarThemeToggle) {

         sidebarThemeToggle.addEventListener(
             "click",
             function (event) {

                 event.preventDefault();

                 event.stopPropagation();


                 toggleTheme();

             }
         );

     }



     /* =====================================================
        MOBILE MENU
     ====================================================== */

     const menuToggle =
         document.getElementById(
             "menuToggle"
         );

     const sidebar =
         document.getElementById(
             "sidebar"
         );


     if (
         menuToggle &&
         sidebar
     ) {

         menuToggle.addEventListener(
             "click",
             function (event) {

                 event.stopPropagation();


                 sidebar.classList.toggle(
                     "open"
                 );

             }
         );

     }



     /* =====================================================
        MOBILE SIDEBAR LINK CLOSE
     ====================================================== */

     if (sidebar) {

         sidebar
             .querySelectorAll(
                 "a"
             )
             .forEach(
                 function (link) {

                     link.addEventListener(
                         "click",
                         function () {

                             if (
                                 window.innerWidth <=
                                 768
                             ) {

                                 sidebar.classList.remove(
                                     "open"
                                 );

                             }

                         }
                     );

                 }
             );

     }



     /* =====================================================
        INITIAL SEARCH STATE
     ====================================================== */

     if (
         searchResults &&
         searchResultsList
     ) {

         searchResults.classList.remove(
             "show"
         );

     }



     /* =====================================================
        INITIALIZE
     ====================================================== */

     console.log(
         "TPO Topbar initialized successfully"
     );

 });