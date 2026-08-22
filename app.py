from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash
)

from werkzeug.security import check_password_hash

import mysql.connector

from functools import wraps


# =========================================================
# APP
# =========================================================

app = Flask(__name__)

app.secret_key = "campus-placement-secret-key"


# =========================================================
# DATABASE CONNECTION
# =========================================================

def get_db_connection():

    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="arpit@2467",
        database="campus_placement_manager",
        port=3306
    )


# =========================================================
# LOGIN REQUIRED
# =========================================================

def login_required(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):

        if "user_id" not in session:

            flash(
                "Please login first.",
                "error"
            )

            return redirect(
                url_for("index")
            )

        return f(*args, **kwargs)

    return decorated_function


# =========================================================
# ROLE REQUIRED
# =========================================================

def role_required(required_role):

    def decorator(f):

        @wraps(f)
        def decorated_function(*args, **kwargs):

            if "user_id" not in session:

                flash(
                    "Please login first.",
                    "error"
                )

                return redirect(
                    url_for("index")
                )

            if str(session.get("role_id")) != str(required_role):

                flash(
                    "You are not authorized to access this page.",
                    "error"
                )

                return redirect(
                    url_for("index")
                )

            return f(*args, **kwargs)

        return decorated_function

    return decorator


# =========================================================
# COMMON STUDENT DATA
# =========================================================

def get_student_data():

    return {

        "name": "Student Name",
        "student_id": "22CSE01234",
        "profile_photo": None,

        "email": "student.email@college.edu.in",
        "phone": "+91 98765 43210",
        "dob": "12 May 2004",
        "gender": "Male",
        "address": "Jaipur, Rajasthan, India",
        "blood_group": "B+",

        "program": "B.Tech Computer Science & Engineering",
        "department": "Computer Science & Engineering",
        "batch": "2022 - 2026",
        "current_year": "3rd Year",
        "current_semester": "5th Semester",
        "enrollment_no": "22CSE01234",
        "cgpa": "8.42 / 10.00",

        "about": (
            "Passionate Computer Science student with strong "
            "problem-solving skills and interest in full-stack "
            "development. Always eager to learn new technologies "
            "and build innovative solutions that make a difference."
        ),

        "about_updated_at": "18 Aug 2026",

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
# LOGIN PAGE
# =========================================================

@app.route("/")
def index():

    return render_template(
        "login/login.html"
    )


# =========================================================
# LOGIN PROCESSING
# =========================================================

@app.route(
    "/login",
    methods=["POST"]
)
def login():

    email = request.form.get(
        "email",
        ""
    ).strip().lower()

    password = request.form.get(
        "password",
        ""
    )

    if not email or not password:

        flash(
            "Please enter email and password.",
            "error"
        )

        return redirect(
            url_for("index")
        )

    if not email.endswith(
        "@poornima.org"
    ):

        flash(
            "Only @poornima.org email addresses are allowed.",
            "error"
        )

        return redirect(
            url_for("index")
        )


    connection = None
    cursor = None


    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        cursor.execute(
            """
            SELECT
                user_id,
                username,
                email,
                password_hash,
                role_id,
                account_status
            FROM users
            WHERE email = %s
            LIMIT 1
            """,
            (email,)
        )

        user = cursor.fetchone()


        if not user:

            flash(
                "Invalid email or password.",
                "error"
            )

            return redirect(
                url_for("index")
            )


        if not check_password_hash(
            user["password_hash"],
            password
        ):

            flash(
                "Invalid email or password.",
                "error"
            )

            return redirect(
                url_for("index")
            )


        if user["account_status"] != "ACTIVE":

            flash(
                "Your account is not active yet.",
                "error"
            )

            return redirect(
                url_for("index")
            )


        session.clear()

        session["user_id"] = user["user_id"]
        session["username"] = user["username"]
        session["email"] = user["email"]
        session["role_id"] = user["role_id"]


        role_id = str(
            user["role_id"]
        )


        if role_id == "1":

            return redirect(
                url_for("admin_dashboard")
            )

        elif role_id == "2":

            return redirect(
                url_for("student_dashboard")
            )

        elif role_id == "3":

            return redirect(
                url_for("tutor_dashboard")
            )

        elif role_id == "4":

            return redirect(
                url_for("hod_dashboard")
            )

        elif role_id == "5":

            return redirect(
                url_for("tpo_dashboard")
            )

        elif role_id == "6":

            return redirect(
                url_for("authority_dashboard")
            )


        session.clear()

        flash(
            "Invalid user role.",
            "error"
        )

        return redirect(
            url_for("index")
        )


    except mysql.connector.Error as error:

        print(
            "===================================="
        )

        print(
            "DATABASE ERROR:",
            error
        )

        print(
            "===================================="
        )

        flash(
            "Unable to connect to the database.",
            "error"
        )

        return redirect(
            url_for("index")
        )


    finally:

        if cursor:

            cursor.close()

        if connection and connection.is_connected():

            connection.close()


# =========================================================
# AUTHORITY TEST LOGIN
# =========================================================

@app.route("/authority/test-login")
def authority_test_login():

    session.clear()

    session["user_id"] = "AUTHORITY-TEST"
    session["username"] = "College Authority"
    session["email"] = "authority@poornima.org"

    # Authority role ID
    session["role_id"] = 6

    session["role_name"] = "AUTHORITY"

    return redirect(
        url_for("authority_dashboard")
    )


# =========================================================
# LOGOUT
# =========================================================

@app.route("/logout")
@login_required
def logout():

    session.clear()

    flash(
        "You have been logged out.",
        "success"
    )

    return redirect(
        url_for("index")
    )


# =========================================================
# STUDENT DASHBOARD
# =========================================================

@app.route("/student/dashboard")
@login_required
@role_required("2")
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
@login_required
@role_required("2")
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
@login_required
@role_required("2")
def student_academics():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/academics.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT PLACEMENT DRIVES
# =========================================================

@app.route("/student/placement-drives")
@login_required
@role_required("2")
def placement_drives():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/placement_drives.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT APPLICATIONS
# =========================================================

@app.route("/student/applications")
@login_required
@role_required("2")
def student_applications():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/applications.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT INTERVIEWS
# =========================================================

@app.route("/student/interviews")
@login_required
@role_required("2")
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
@login_required
@role_required("2")
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

@app.route(
    "/student/preparation/pyq/<company>"
)
@login_required
@role_required("2")
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


    pyq = pyq_data.get(
        company.lower()
    )


    if not pyq:

        return (
            "PYQ not found",
            404
        )


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
@login_required
@role_required("2")
def student_my_uploads():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/my_uploads.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT ANNOUNCEMENTS
# =========================================================

@app.route("/student/announcements")
@login_required
@role_required("2")
def student_announcements():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/announcements.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT SETTINGS
# =========================================================

@app.route("/student/settings")
@login_required
@role_required("2")
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
@login_required
@role_required("2")
def student_offers_joining():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/offers_joining.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT HELP
# =========================================================

@app.route(
    "/student/help",
    methods=["GET", "POST"]
)
@login_required
@role_required("2")
def student_help():

    student = get_student_data()

    profile_completion = get_profile_completion()


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


        print(
            "STUDENT COMPLAINT:",
            {
                "category": category,
                "subject": subject,
                "description": description,
                "status": "Submitted"
            }
        )


        flash(
            "Your complaint has been submitted successfully.",
            "success"
        )


        return redirect(
            url_for("student_help")
        )


    return render_template(
        "students/help.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# STUDENT DISCUSSION
# =========================================================

@app.route("/student/discussion")
@login_required
@role_required("2")
def student_discussion():

    student = get_student_data()

    profile_completion = get_profile_completion()

    return render_template(
        "students/discussion.html",
        student=student,
        profile_completion=profile_completion
    )


# =========================================================
# =========================================================
# AUTHORITY
# =========================================================
# =========================================================


# =========================================================
# AUTHORITY DASHBOARD
# =========================================================

@app.route("/authority/dashboard")
@login_required
@role_required("6")
def authority_dashboard():

    return render_template(
        "authority/dashboard.html"
    )


# =========================================================
# PLACEMENT OVERVIEW
# =========================================================

@app.route("/authority/placement-overview")
@login_required
@role_required("6")
def authority_placement_overview():

    return render_template(
        "authority/placement_overview.html"
    )


# =========================================================
# COMPANIES
# =========================================================

@app.route("/authority/companies")
@login_required
@role_required("6")
def authority_companies():

    return render_template(
        "authority/companies.html"
    )


# =========================================================
# PLACEMENT DRIVES
# =========================================================

@app.route("/authority/placement-drives")
@login_required
@role_required("6")
def authority_placement_drives():

    return render_template(
        "authority/placement_drives.html"
    )


# =========================================================
# ANALYTICS — PLACEMENT REPORTS
# =========================================================

@app.route(
    "/authority/analytics/placement-reports"
)
@login_required
@role_required("6")
def authority_placement_reports():

    return render_template(
        "authority/analytics/placement_reports.html"
    )


# =========================================================
# ANALYTICS — DRIVE REPORTS
# =========================================================

@app.route(
    "/authority/analytics/drive-reports"
)
@login_required
@role_required("6")
def authority_drive_reports():

    return render_template(
        "authority/analytics/drive_reports.html"
    )


# =========================================================
# ANALYTICS — COMPANY REPORTS
# =========================================================

@app.route(
    "/authority/analytics/company-reports"
)
@login_required
@role_required("6")
def authority_company_reports():

    return render_template(
        "authority/analytics/company_reports.html"
    )


# =========================================================
# NOC
# =========================================================

@app.route("/authority/noc")
@login_required
@role_required("6")
def authority_noc():

    return render_template(
        "authority/noc.html"
    )


# =========================================================
# STARTUP IDEAS
# =========================================================

@app.route("/authority/startup-ideas")
@login_required
@role_required("6")
def authority_startup_ideas():

    return render_template(
        "authority/startup_ideas.html"
    )


# =========================================================
# NOTIFICATIONS
# =========================================================

@app.route("/authority/notifications")
@login_required
@role_required("6")
def authority_notifications():

    return render_template(
        "authority/notifications.html"
    )


# =========================================================
# ANNOUNCEMENTS
# =========================================================

@app.route("/authority/announcements")
@login_required
@role_required("6")
def authority_announcements():

    return render_template(
        "authority/announcements.html"
    )


# =========================================================
# SETTINGS
# =========================================================

@app.route("/authority/settings")
@login_required
@role_required("6")
def authority_settings():

    return render_template(
        "authority/settings.html"
    )


# =========================================================
# =========================================================
# OTHER DASHBOARDS
# =========================================================
# =========================================================


# =========================================================
# ADMIN
# =========================================================

@app.route("/admin/dashboard")
@login_required
@role_required("1")
def admin_dashboard():

    return render_template(
        "admin/dashboard.html"
    )


# =========================================================
# TPO
# =========================================================

@app.route("/tpo/dashboard")
@login_required
@role_required("5")
def tpo_dashboard():

    return render_template(
        "tpo/dashboard.html"
    )


# =========================================================
# HOD
# =========================================================

@app.route("/hod/dashboard")
@login_required
@role_required("4")
def hod_dashboard():

    return render_template(
        "hod/dashboard.html"
    )


# =========================================================
# MENTOR
# =========================================================

@app.route("/mentor/dashboard")
@login_required
@role_required("3")
def mentor_dashboard():

    return render_template(
        "tutor/dashboard.html"
    )


# =========================================================
# OLD TUTOR URL
# =========================================================

@app.route("/tutor/dashboard")
@login_required
@role_required("3")
def tutor_dashboard():

    return render_template(
        "tutor/dashboard.html"
    )


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )