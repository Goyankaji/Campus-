```javascript
/* =========================================================
   CAMPUS PLACEMENT PORTAL
   STUDENT DASHBOARD JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const themeToggle = document.getElementById("themeToggle");
const topThemeToggle = document.getElementById("topThemeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");


/* =========================================================
   THEME
========================================================= */

function setTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-theme");

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }

        if (themeText) {
            themeText.textContent = "Switch to Light Mode";
        }

        if (topThemeToggle) {
            topThemeToggle.textContent = "☀";
        }

        localStorage.setItem("campusTheme", "dark");

    } else {

        document.body.classList.remove("dark-theme");

        if (themeIcon) {
            themeIcon.textContent = "☾";
        }

        if (themeText) {
            themeText.textContent = "Switch to Dark Mode";
        }

        if (topThemeToggle) {
            topThemeToggle.textContent = "☼";
        }

        localStorage.setItem("campusTheme", "light");
    }
}


/* =========================================================
   LOAD SAVED THEME
========================================================= */

const savedTheme =
    localStorage.getItem("campusTheme") || "light";

setTheme(savedTheme);


/* =========================================================
   SIDEBAR THEME BUTTON
========================================================= */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.body.classList.contains("dark-theme")
                ? "dark"
                : "light";

        setTheme(
            currentTheme === "dark"
                ? "light"
                : "dark"
        );

    });

}


/* =========================================================
   HEADER THEME BUTTON
========================================================= */

if (topThemeToggle) {

    topThemeToggle.addEventListener("click", () => {

        const currentTheme =
            document.body.classList.contains("dark-theme")
                ? "dark"
                : "light";

        setTheme(
            currentTheme === "dark"
                ? "light"
                : "dark"
        );

    });

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}


/* =========================================================
   CLOSE MOBILE SIDEBAR AFTER NAVIGATION
========================================================= */

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", () => {

        if (window.innerWidth <= 900) {
            sidebar.classList.remove("open");
        }

    });

});


/* =========================================================
   SEARCH
========================================================= */

const searchInput =
    document.getElementById("dashboardSearch");


if (searchInput) {

    searchInput.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            const searchValue =
                searchInput.value.trim();

            if (searchValue !== "") {

                console.log(
                    "Searching for:",
                    searchValue
                );

                /*
                    Later this will connect to Flask
                    and search real companies,
                    drives and roles.
                */

            }

        }

    });

}


/* =========================================================
   CTRL + K SEARCH SHORTCUT
========================================================= */

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        if (searchInput) {
            searchInput.focus();
        }

    }

});


/* =========================================================
   VIEW ALL BUTTONS
========================================================= */

document.querySelectorAll(".view-all").forEach(button => {

    button.addEventListener("click", () => {

        console.log(
            "View All clicked:",
            button.parentElement?.querySelector("h2")?.textContent
        );

        /*
            Later these buttons will redirect
            to their respective Flask routes.
        */

    });

});


/* =========================================================
   PREPARATION ITEMS
========================================================= */

document.querySelectorAll(".prep-item").forEach(item => {

    item.addEventListener("click", event => {

        event.preventDefault();

        const title =
            item.querySelector("strong")?.textContent;

        console.log(
            "Preparation selected:",
            title
        );

        /*
            Later:
            /student/preparation/<topic>
        */

    });

});


/* =========================================================
   NOTIFICATION BUTTON
========================================================= */

const notificationButton =
    document.querySelector(".notification-button");

if (notificationButton) {

    notificationButton.addEventListener("click", () => {

        console.log("Notifications clicked");

        /*
            Later this will open:
            Student Notifications page.
        */

    });

}


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener("resize", () => {

    if (window.innerWidth > 900) {

        sidebar.classList.remove("open");

    }

});
```
