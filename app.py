from flask import Flask, render_template, request, redirect, flash, url_for
app = Flask(__name__)


# =========================================================
# COMMON STUDENT DATA
# =========================================================

def get_student_data():

    return {
        "name": "Student Name",
        "student_id": "22CSE01234",
        "profile_photo": None,

        # Personal Information
        "email": "student.email@college.edu.in",
        "phone": "+91 98765 43210",
        "dob": "12 May 2004",
        "gender": "Male",
        "address": "Jaipur, Rajasthan, India",
        "blood_group": "B+",

        # Academic Information
        "program": "B.Tech Computer Science & Engineering",
        "department": "Computer Science & Engineering",
        "batch": "2022 - 2026",
        "current_year": "3rd Year",
        "current_semester": "5th Semester",
        "enrollment_no": "22CSE01234",
        "cgpa": "8.42 / 10.00",

        # About
        "about": (
            "Passionate Computer Science student with strong "
            "problem-solving skills and interest in full-stack "
            "development. Always eager to learn new technologies "
            "and build innovative solutions that make a difference."
        ),

        "about_updated_at": "18 Aug 2026",

        # Professional Links
        "links": [
            {
                "platform": "LinkedIn",
                "url": "https://linkedin.com/in/studentname",
                "icon": "in"
            },
            {
                "platform": "GitHub",
                "url": "https://github.com/studentname",
                "icon": "●"
            },
            {
                "platform": "Portfolio",
                "url": "https://studentname.dev",
                "icon": "◎"
            },
            {
                "platform": "LeetCode",
                "url": "https://leetcode.com/u/studentname",
                "icon": "⌘"
            },
            {
                "platform": "HackerRank",
                "url": "https://hackerrank.com/studentname",
                "icon": "H"
            }
        ]
    }


# =========================================================
# PROFILE COMPLETION
# =========================================================

def get_profile_completion():
    return 80


# =========================================================
# LOGIN
# =========================================================

@app.route("/")
def index():
    return render_template("login/login.html")


# =========================================================
# STUDENT DASHBOARD
# =========================================================

@app.route("/student/dashboard")
def student_dashboard():

    student = get_student_data()
    profile_completion = get_profile_completion()

    return render_template(
        "students/dashboard.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT PROFILE
# =========================================================

@app.route("/student/profile")
def student_profile():

    student = get_student_data()
    profile_completion = get_profile_completion()

    return render_template(
        "students/profile.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT ACADEMICS
# =========================================================

@app.route("/student/academics")
def student_academics():

    student = get_student_data()

    return render_template(
        "students/academics.html",
        student=student
    )


# =========================================================
# STUDENT PLACEMENT DRIVES
# =========================================================

@app.route("/student/placement-drives")
def placement_drives():

    student = get_student_data()

    return render_template(
        "students/placement_drives.html",
        student=student
    )

# =========================================================
# STUDENT APPLICATION
# =========================================================
@app.route("/student/applications")
def student_applications():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/applications.html",
        student=student,
        profile_completion=profile_completion
    )

# =========================================================
# STUDENT INTERVIEW
# =========================================================
@app.route("/student/interviews")
def student_interviews():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/interviews.html",
        student=student,
        profile_completion=profile_completion
    )

# =========================================================
# STUDENT PREPARATION
# =========================================================
@app.route("/student/preparation")
def student_preparation():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/preparation.html",
        student=student,
        profile_completion=profile_completion
    )
# =========================================================
# STUDENT PYQ
# =========================================================
@app.route("/student/preparation/pyq/<company>")
def student_pyq(company):

    student = get_student_data()
    profile_completion = get_profile_completion()

    pyq_data = {

        "tcs": {
            "company": "TCS",
            "title": "TCS Placement Paper 2025",
            "type": "Aptitude · Technical · Coding",
            "questions": 40,
            "year": "2025",
            "difficulty": "Moderate"
        },

        "infosys": {
            "company": "Infosys",
            "title": "Infosys Placement Paper 2025",
            "type": "Aptitude · Logical Reasoning",
            "questions": 35,
            "year": "2025",
            "difficulty": "Moderate"
        },

        "amazon": {
            "company": "Amazon",
            "title": "Amazon SDE Assessment",
            "type": "DSA · Coding · Problem Solving",
            "questions": 30,
            "year": "2025",
            "difficulty": "Advanced"
        }

    }

    pyq = pyq_data.get(company.lower())

    if not pyq:
        return "PYQ not found", 404

    return render_template(
        "students/pyq_detail.html",
        student=student,
        profile_completion=profile_completion,
        pyq=pyq
    )
# =========================================================
# STUDENT MY UPLOADS
# =========================================================

@app.route("/student/my-uploads")
def student_my_uploads():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/my_uploads.html",
        student=student,
        profile_completion=profile_completion
    )
# =========================================================
# STUDENT ACCOUNCEMENTS
# =========================================================
@app.route("/student/announcements")
def student_announcements():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/announcements.html",
        student=student,
        profile_completion=profile_completion
    )
# =========================================================
# STUDENT SETTING
# =========================================================
@app.route("/student/settings")
def student_settings():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/settings.html",
        student=student,
        profile_completion=profile_completion
    )

# =========================================================
# STUDENT OFFERS & JOINING
# =========================================================

@app.route("/student/offers-joining")
def student_offers_joining():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/offers_joining.html",
        student=student,
        profile_completion=profile_completion
    )

# # =========================================================
# # STUDENT HELP
# # =========================================================

# @app.route("/student/help")
# def student_help():

#     student = get_student_data()

#     profile_completion = get_profile_completion()

#     return render_template(
#         "students/help.html",
#         student=student,
#         profile_completion=profile_completion
#     )

# =========================================================
# STUDENT HELP & SUPPORT
# =========================================================

@app.route("/student/help", methods=["GET", "POST"])
def student_help():

    student = get_student_data()
    profile_completion = get_profile_completion()


    # =====================================================
    # SUBMIT COMPLAINT
    # =====================================================

    if request.method == "POST":

        category = request.form.get(
            "category",
            ""
        ).strip()

        subject = request.form.get(
            "subject",
            ""
        ).strip()

        description = request.form.get(
            "description",
            ""
        ).strip()


        # -----------------------------------------------
        # VALIDATION
        # -----------------------------------------------

        if not category:

            flash(
                "Please select an issue category.",
                "error"
            )

            return render_template(
                "students/help.html",
                student=student,
                profile_completion=profile_completion
            )


        if not subject:

            flash(
                "Please enter a subject.",
                "error"
            )

            return render_template(
                "students/help.html",
                student=student,
                profile_completion=profile_completion
            )


        if not description:

            flash(
                "Please describe your issue.",
                "error"
            )

            return render_template(
                "students/help.html",
                student=student,
                profile_completion=profile_completion
            )


        # -----------------------------------------------
        # TEMPORARY COMPLAINT DATA
        # -----------------------------------------------

        complaint = {

            "category": category,

            "subject": subject,

            "description": description,

            "status": "Submitted"

        }


        print(
            "STUDENT COMPLAINT:",
            complaint
        )


        # -----------------------------------------------
        # SUCCESS
        # -----------------------------------------------

        flash(
            "Your complaint has been submitted successfully.",
            "success"
        )


        return redirect(
            url_for("student_help")
        )


    # =====================================================
    # GET
    # =====================================================

    return render_template(
        "students/help.html",
        student=student,
        profile_completion=profile_completion
    )
# =========================================================
# STUDENT QUESTION DISCUSSION
# =========================================================

@app.route("/student/discussion")
def student_discussion():

    student = get_student_data()
    profile_completion = get_profile_completion()

    return render_template(
        "students/discussion.html",
        student=student,
        profile_completion=profile_completion
    )
# =========================================================
# AUTHORITY
# =========================================================

@app.route("/authority/dashboard")
def authority_dashboard():

    return render_template(
        "authority/dashboard.html"
    )


# =========================================================
# TPO
# =========================================================

@app.route("/tpo/dashboard")
def tpo_dashboard():

    return render_template(
        "tpo/dashboard.html"
    )


# =========================================================
# HOD
# =========================================================

@app.route("/hod/dashboard")
def hod_dashboard():

    return render_template(
        "hod/dashboard.html"
    )


# =========================================================
# ADMIN
# =========================================================

@app.route("/admin/dashboard")
def admin_dashboard():

    return render_template(
        "admin/dashboard.html"
    )


# =========================================================
# TUTOR
# =========================================================

@app.route("/tutor/dashboard")
def tutor_dashboard():

    return render_template(
        "tutor/dashboard.html"
    )


# =========================================================
# RUN APP
# =========================================================

if __name__ == "__main__":
    app.run(debug=True)