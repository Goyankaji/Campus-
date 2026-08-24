document.addEventListener("DOMContentLoaded", function () {

    const academicYear =
        document.getElementById("academicYear");

    if (!academicYear) {
        return;
    }

    academicYear.addEventListener("change", function () {

        console.log(
            "Academic Year:",
            academicYear.value
        );

    });

});