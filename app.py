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
        password="Tonu567890@",
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
# ADMIN LOGIN REQUIRED
# =========================================================
# Used for Admin UI test-login mode.
#
# Later, when normal DB login is being used, Admin pages
# can use @login_required + @role_required("1").
# =========================================================

def admin_required(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):

        # Allow Admin test session
        if session.get("admin_logged_in") is True:
            return f(*args, **kwargs)

        # Also allow real DB Admin session
        if (
            "user_id" in session
            and str(session.get("role_id")) == "1"
        ):
            return f(*args, **kwargs)

        flash(
            "Please login as Admin first.",
            "error"
        )

        return redirect(
            url_for("index")
        )

    return decorated_function


# =========================================================
# AUTHORITY COLLEGE SCOPE
# =========================================================

def get_authority_college():

    return {
        "code": session.get(
            "college_code",
            "PCE"
        ),

        "name": session.get(
            "college_name",
            "Poornima College of Engineering"
        )
    }


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
                campus_id,
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
        session["campus_id"] = user["campus_id"]

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

            session["role_name"] = "AUTHORITY"
            session["college_code"] = "PCE"
            session["college_name"] = (
                "Poornima College of Engineering"
            )

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

    session["role_id"] = 6
    session["role_name"] = "AUTHORITY"

    session["college_code"] = "PCE"
    session["college_name"] = (
        "Poornima College of Engineering"
    )

    return redirect(
        url_for("authority_dashboard")
    )


# =========================================================
# ADMIN TEST LOGIN
# =========================================================
# Keeps Admin UI test mode available without DB.
# =========================================================

@app.route("/admin/test-login")
def admin_test_login():

    session.clear()

    session["admin_logged_in"] = True

    session["user_id"] = "ADMIN-TEST-001"
    session["username"] = "Admin"
    session["email"] = "admin@poornima.org"

    session["role_id"] = 1
    session["role_name"] = "ADMIN"

    return redirect(
        url_for("admin_dashboard")
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
# ADMIN LOGOUT
# =========================================================
# Kept separately because the Admin UI currently uses
# /admin/logout.
# =========================================================

@app.route("/admin/logout")
def admin_logout():

    session.clear()

    flash(
        "Admin session ended.",
        "success"
    )

    return redirect(
        url_for("index")
    )


# =========================================================
# =========================================================
# STUDENT
# =========================================================
# =========================================================


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

@app.route("/student/noc")
def student_noc():
    return render_template(
        "students/noc.html",
        profile_completion=80
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

    college = get_authority_college()

    return render_template(
        "authority/dashboard.html",
        college=college
    )


# =========================================================
# AUTHORITY PLACEMENT OVERVIEW
# =========================================================

@app.route("/authority/placement-overview")
@login_required
@role_required("6")
def authority_placement_overview():

    college = get_authority_college()

    return render_template(
        "authority/placement_overview.html",
        college=college
    )


# =========================================================
# AUTHORITY COMPANIES
# =========================================================

@app.route("/authority/companies")
@login_required
@role_required("6")
def authority_companies():

    college = get_authority_college()

    return render_template(
        "authority/companies.html",
        college=college
    )


# =========================================================
# AUTHORITY PLACEMENT DRIVES
# =========================================================

@app.route("/authority/placement-drives")
@login_required
@role_required("6")
def authority_placement_drives():

    college = get_authority_college()

    return render_template(
        "authority/placement_drives.html",
        college=college
    )


# =========================================================
# AUTHORITY PLACEMENT PIPELINE
# =========================================================

@app.route("/authority/placement-pipeline")
@login_required
@role_required("6")
def authority_placement_pipeline():

    college = get_authority_college()

    return render_template(
        "authority/placement_pipeline.html",
        college=college
    )


# =========================================================
# AUTHORITY BRANCH-WISE REPORTS
# =========================================================

@app.route("/authority/analytics/branch-reports")
@login_required
@role_required("6")
def authority_branch_reports():

    college = get_authority_college()

    return render_template(
        "authority/analytics/branch_reports.html",
        college=college
    )


# =========================================================
# AUTHORITY OFF-CAMPUS PLACEMENTS
# =========================================================

@app.route("/authority/off-campus")
@login_required
@role_required("6")
def authority_off_campus():

    college = get_authority_college()

    return render_template(
        "authority/off_campus.html",
        college=college
    )


# =========================================================
# AUTHORITY PRE-PLACED STUDENTS
# =========================================================

@app.route("/authority/pre-placed")
@login_required
@role_required("6")
def authority_pre_placed():

    college = get_authority_college()

    return render_template(
        "authority/pre_placed.html",
        college=college
    )



# =========================================================
# AUTHORITY ANALYTICS — PLACEMENT REPORTS
# =========================================================

@app.route(
    "/authority/analytics/placement-reports"
)
@login_required
@role_required("6")
def authority_placement_reports():

    college = get_authority_college()

    return render_template(
        "authority/analytics/placement_reports.html",
        college=college
    )


# =========================================================
# AUTHORITY ANALYTICS — DRIVE REPORTS
# =========================================================

@app.route(
    "/authority/analytics/drive-reports"
)
@login_required
@role_required("6")
def authority_drive_reports():

    college = get_authority_college()

    return render_template(
        "authority/analytics/drive_reports.html",
        college=college
    )


# =========================================================
# AUTHORITY ANALYTICS — COMPANY REPORTS
# =========================================================

@app.route(
    "/authority/analytics/company-reports"
)
@login_required
@role_required("6")
def authority_company_reports():

    college = get_authority_college()

    return render_template(
        "authority/analytics/company_reports.html",
        college=college
    )


# =========================================================
# AUTHORITY NOC
# =========================================================

@app.route("/authority/noc")
@login_required
@role_required("6")
def authority_noc():

    college = get_authority_college()

    return render_template(
        "authority/noc.html",
        college=college
    )


# =========================================================
# AUTHORITY STARTUP IDEAS
# =========================================================

@app.route("/authority/startup-ideas")
@login_required
@role_required("6")
def authority_startup_ideas():

    college = get_authority_college()

    return render_template(
        "authority/startup_ideas.html",
        college=college
    )


# =========================================================
# AUTHORITY NOTIFICATIONS
# =========================================================

@app.route("/authority/notifications")
@login_required
@role_required("6")
def authority_notifications():

    college = get_authority_college()

    return render_template(
        "authority/notifications.html",
        college=college
    )


# =========================================================
# AUTHORITY ANNOUNCEMENTS
# =========================================================

@app.route("/authority/announcements")
@login_required
@role_required("6")
def authority_announcements():

    college = get_authority_college()

    return render_template(
        "authority/announcements.html",
        college=college
    )


# =========================================================
# AUTHORITY SETTINGS
# =========================================================

@app.route("/authority/settings")
@login_required
@role_required("6")
def authority_settings():

    college = get_authority_college()

    return render_template(
        "authority/settings.html",
        college=college
    )


# =========================================================
# =========================================================
# ADMIN
# =========================================================
# =========================================================


# =========================================================
# ADMIN DASHBOARD
# =========================================================

@app.route("/admin/dashboard")
@admin_required
def admin_dashboard():

    return render_template(
        "admin/dashboard.html"
    )


# =========================================================
# PLACEMENT MANAGEMENT
# =========================================================


# =========================================================
# PLACEMENT OVERVIEW
# =========================================================

@app.route("/admin/placement-overview")
@admin_required
def placement_overview():

    return render_template(
        "admin/placement_overview.html"
    )


# =========================================================
# COMPANIES
# =========================================================

@app.route("/admin/companies")
@admin_required
def admin_companies():

    return render_template(
        "admin/companies.html"
    )


# =========================================================
# PLACEMENT DRIVES
# =========================================================

@app.route("/admin/placement-drives")
@admin_required
def admin_drives():

    return render_template(
        "admin/placement_drives.html"
    )


# =========================================================
# PLACEMENTS
# =========================================================

@app.route("/admin/placements")
@admin_required
def admin_placements():

    return render_template(
        "admin/placements.html"
    )


# =========================================================
# ANALYTICS
# =========================================================


# =========================================================
# ANALYTICS MAIN
# =========================================================

@app.route("/admin/analytics")
@admin_required
def admin_analytics():

    return render_template(
        "admin/analytics/placement_analytics.html"
    )


# =========================================================
# PLACEMENT ANALYTICS
# =========================================================

@app.route("/admin/analytics/placement")
@admin_required
def admin_placement_analytics():

    return render_template(
        "admin/analytics/placement_analytics.html"
    )


# =========================================================
# COMPANY ANALYTICS
# =========================================================

@app.route("/admin/analytics/company")
@admin_required
def admin_company_analytics():

    return render_template(
        "admin/analytics/company_analytics.html"
    )


# =========================================================
# COLLEGE ANALYTICS
# =========================================================

@app.route("/admin/analytics/college")
@admin_required
def admin_college_analytics():

    return render_template(
        "admin/analytics/college_analytics.html"
    )


# =========================================================
# STUDENT MANAGEMENT
# =========================================================


# =========================================================
# STUDENTS
# =========================================================

@app.route("/admin/students")
@admin_required
def admin_students():

    return render_template(
        "admin/students.html"
    )


# =========================================================
# OFF-CAMPUS
# =========================================================

@app.route("/admin/off-campus")
@admin_required
def admin_off_campus():

    return render_template(
        "admin/off_campus.html"
    )


# =========================================================
# NOC
# =========================================================

@app.route("/admin/noc")
@admin_required
def admin_noc():

    return render_template(
        "admin/noc.html"
    )


# =========================================================
# PRE-PLACED
# =========================================================

@app.route("/admin/pre-placed")
@admin_required
def admin_pre_placed():

    return render_template(
        "admin/pre_placed.html"
    )


# =========================================================
# STARTUP STUDENTS
# =========================================================

@app.route("/admin/startup-students")
@admin_required
def admin_startup_students():

    return render_template(
        "admin/startup_students.html"
    )


# =========================================================
# ADMINISTRATION
# =========================================================


# =========================================================
# USERS
# =========================================================

@app.route("/admin/users")
@admin_required
def admin_users():

    return render_template(
        "admin/users.html"
    )


# =========================================================
# ROLES
# =========================================================

@app.route("/admin/roles")
@admin_required
def admin_roles():

    return render_template(
        "admin/roles.html"
    )


# =========================================================
# VERIFICATION
# =========================================================

@app.route("/admin/verification")
@admin_required
def admin_verification():

    return render_template(
        "admin/verification.html"
    )


# =========================================================
# SYSTEM
# =========================================================


# =========================================================
# NOTIFICATIONS
# =========================================================

@app.route("/admin/notifications")
@admin_required
def admin_notifications():

    return render_template(
        "admin/notifications.html"
    )


# =========================================================
# FEEDBACK
# =========================================================

@app.route("/admin/feedback")
@admin_required
def admin_feedback():

    return render_template(
        "admin/feedback.html"
    )


# =========================================================
# ANNOUNCEMENTS
# =========================================================

@app.route("/admin/announcements")
@admin_required
def admin_announcements():

    return render_template(
        "admin/announcements.html"
    )


# =========================================================
# SETTINGS
# =========================================================

@app.route("/admin/settings")
@admin_required
def admin_settings():

    return render_template(
        "admin/settings.html"
    )

# =========================================================
# STUDENT COMMUNITY / BLOG
# =========================================================

def ensure_community_tables():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()
        cursor = connection.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS student_posts (

                post_id BIGINT AUTO_INCREMENT PRIMARY KEY,

                user_id VARCHAR(100) NOT NULL,

                author_name VARCHAR(150) NOT NULL,

                post_type ENUM(
                    'QUESTION',
                    'DISCUSSION',
                    'INFORMATION'
                ) NOT NULL DEFAULT 'QUESTION',

                title VARCHAR(220) NOT NULL,

                content TEXT NOT NULL,

                tags VARCHAR(500),

                status ENUM(
                    'PENDING',
                    'APPROVED',
                    'REJECTED'
                ) NOT NULL DEFAULT 'PENDING',

                rejection_reason VARCHAR(500),

                created_at TIMESTAMP
                    NOT NULL DEFAULT CURRENT_TIMESTAMP,

                reviewed_at TIMESTAMP NULL,

                reviewed_by VARCHAR(100),

                INDEX idx_posts_status(status),

                INDEX idx_posts_user(user_id),

                INDEX idx_posts_created(created_at)

            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS student_post_comments (

                comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,

                post_id BIGINT NOT NULL,

                user_id VARCHAR(100) NOT NULL,

                author_name VARCHAR(150) NOT NULL,

                content TEXT NOT NULL,

                status ENUM(
                    'PENDING',
                    'APPROVED',
                    'REJECTED'
                ) NOT NULL DEFAULT 'APPROVED',

                created_at TIMESTAMP
                    NOT NULL DEFAULT CURRENT_TIMESTAMP,

                INDEX idx_comments_post(post_id),

                CONSTRAINT fk_comments_post
                    FOREIGN KEY(post_id)
                    REFERENCES student_posts(post_id)
                    ON DELETE CASCADE

            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS student_post_likes (

                like_id BIGINT AUTO_INCREMENT PRIMARY KEY,

                post_id BIGINT NOT NULL,

                user_id VARCHAR(100) NOT NULL,

                created_at TIMESTAMP
                    NOT NULL DEFAULT CURRENT_TIMESTAMP,

                UNIQUE KEY uq_post_user_like(
                    post_id,
                    user_id
                ),

                INDEX idx_likes_post(post_id),

                CONSTRAINT fk_likes_post
                    FOREIGN KEY(post_id)
                    REFERENCES student_posts(post_id)
                    ON DELETE CASCADE

            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
        """)

        connection.commit()

        return True

    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "COMMUNITY TABLE ERROR:",
            error
        )

        return False

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# GET COMMUNITY POSTS
# =========================================================

def get_community_posts(
    user_id=None,
    category="ALL",
    search=""
):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        conditions = []
        params = []

        # Student can see approved posts
        # and his/her own pending/rejected posts.

        if user_id:

            conditions.append(
                """
                (
                    p.status = 'APPROVED'

                    OR

                    p.user_id = %s
                )
                """
            )

            params.append(
                str(user_id)
            )

        else:

            conditions.append(
                "p.status = 'APPROVED'"
            )

        # -------------------------------------------------
        # CATEGORY
        # -------------------------------------------------

        if category in (
            "QUESTION",
            "DISCUSSION",
            "INFORMATION"
        ):

            conditions.append(
                "p.post_type = %s"
            )

            params.append(
                category
            )

        # -------------------------------------------------
        # SEARCH
        # -------------------------------------------------

        if search:

            conditions.append(
                """
                (
                    p.title LIKE %s

                    OR p.content LIKE %s

                    OR COALESCE(
                        p.tags,
                        ''
                    ) LIKE %s

                    OR p.author_name LIKE %s
                )
                """
            )

            value = f"%{search}%"

            params.extend(
                [
                    value,
                    value,
                    value,
                    value
                ]
            )

        where_sql = " AND ".join(
            conditions
        )

        current_user_id = str(
            user_id or ""
        )

        cursor.execute(
            f"""
            SELECT

                p.post_id,

                p.user_id,

                p.author_name,

                p.post_type,

                p.title,

                p.content,

                p.tags,

                p.status,

                p.rejection_reason,

                p.created_at,

                p.reviewed_at,

                COALESCE(
                    l.like_count,
                    0
                ) AS like_count,

                COALESCE(
                    c.comment_count,
                    0
                ) AS comment_count,

                CASE

                    WHEN ul.like_id IS NULL
                    THEN 0

                    ELSE 1

                END AS liked_by_me

            FROM student_posts p

            LEFT JOIN (

                SELECT

                    post_id,

                    COUNT(*) AS like_count

                FROM student_post_likes

                GROUP BY post_id

            ) l

                ON l.post_id =
                   p.post_id

            LEFT JOIN (

                SELECT

                    post_id,

                    COUNT(*) AS comment_count

                FROM student_post_comments

                WHERE status =
                    'APPROVED'

                GROUP BY post_id

            ) c

                ON c.post_id =
                   p.post_id

            LEFT JOIN student_post_likes ul

                ON ul.post_id =
                   p.post_id

                AND ul.user_id =
                    %s

            WHERE {where_sql}

            ORDER BY
                p.created_at DESC
            """,
            tuple(
                [current_user_id]
                + params
            )
        )

        return cursor.fetchall()

    except Exception as error:

        print(
            "COMMUNITY POSTS ERROR:",
            error
        )

        return []

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# STUDENT BLOG
# =========================================================

@app.route("/student/blog")
@login_required
@role_required("2")
def student_blog():

    ensure_community_tables()

    category = request.args.get(
        "category",
        "ALL"
    ).upper()

    search = request.args.get(
        "search",
        ""
    ).strip()

    if category not in (
        "ALL",
        "QUESTION",
        "DISCUSSION",
        "INFORMATION"
    ):

        category = "ALL"

    student = get_student_data()

    profile_completion = (
        get_profile_completion()
    )

    posts = get_community_posts(

        user_id=session.get(
            "user_id"
        ),

        category=category,

        search=search
    )

    return render_template(

        "students/blog.html",

        student=student,

        profile_completion=
            profile_completion,

        posts=posts,

        active_category=
            category,

        search=search

    )


# =========================================================
# CREATE BLOG POST
# =========================================================

@app.route(
    "/student/blog/create",
    methods=["POST"]
)
@login_required
@role_required("2")
def student_blog_create():

    ensure_community_tables()

    post_type = request.form.get(
        "post_type",
        "QUESTION"
    ).strip().upper()

    title = request.form.get(
        "title",
        ""
    ).strip()

    content = request.form.get(
        "content",
        ""
    ).strip()

    tags = request.form.get(
        "tags",
        ""
    ).strip()

    allowed_types = {
        "QUESTION",
        "DISCUSSION",
        "INFORMATION"
    }

    if post_type not in allowed_types:

        flash(
            "Invalid post type.",
            "error"
        )

        return redirect(
            url_for("student_blog")
        )

    if not title:

        flash(
            "Please enter a title.",
            "error"
        )

        return redirect(
            url_for("student_blog")
        )

    if len(title) > 220:

        flash(
            "Title is too long.",
            "error"
        )

        return redirect(
            url_for("student_blog")
        )

    if not content:

        flash(
            "Please enter your question or message.",
            "error"
        )

        return redirect(
            url_for("student_blog")
        )

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
            INSERT INTO student_posts
            (
                user_id,
                author_name,
                post_type,
                title,
                content,
                tags,
                status
            )

            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s,
                %s,
                'PENDING'
            )
            """,

            (
                str(
                    session.get(
                        "user_id"
                    )
                ),

                session.get(
                    "username",
                    "Student"
                ),

                post_type,

                title,

                content,

                tags or None

            )
        )

        connection.commit()

        flash(
            "Your post has been submitted for admin review.",
            "success"
        )

    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "COMMUNITY CREATE ERROR:",
            error
        )

        flash(
            "Unable to submit your post right now.",
            "error"
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

    return redirect(
        url_for("student_blog")
    )


# =========================================================
# BLOG DETAIL
# =========================================================

@app.route(
    "/student/blog/<int:post_id>"
)
@login_required
@role_required("2")
def student_blog_detail(
    post_id
):

    ensure_community_tables()

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

                p.post_id,

                p.user_id,

                p.author_name,

                p.post_type,

                p.title,

                p.content,

                p.tags,

                p.status,

                p.rejection_reason,

                p.created_at,

                COALESCE(
                    (
                        SELECT COUNT(*)

                        FROM student_post_likes l

                        WHERE
                            l.post_id =
                            p.post_id

                    ),
                    0
                ) AS like_count

            FROM student_posts p

            WHERE

                p.post_id = %s

                AND

                (
                    p.status =
                        'APPROVED'

                    OR

                    p.user_id = %s
                )

            LIMIT 1
            """,

            (
                post_id,

                str(
                    session.get(
                        "user_id"
                    )
                )

            )
        )

        post = cursor.fetchone()

        if not post:

            return (
                "Post not found",
                404
            )

        cursor.execute(
            """
            SELECT

                comment_id,

                author_name,

                content,

                created_at

            FROM student_post_comments

            WHERE

                post_id = %s

                AND

                status = 'APPROVED'

            ORDER BY
                created_at ASC
            """,

            (
                post_id,
            )
        )

        comments = cursor.fetchall()

        student = get_student_data()

        profile_completion = (
            get_profile_completion()
        )

        return render_template(

            "students/blog_detail.html",

            student=student,

            profile_completion=
                profile_completion,

            post=post,

            comments=comments

        )

    except Exception as error:

        print(
            "COMMUNITY DETAIL ERROR:",
            error
        )

        return (
            "Unable to load post.",
            500
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# BLOG COMMENT
# =========================================================

@app.route(
    "/student/blog/<int:post_id>/comment",
    methods=["POST"]
)
@login_required
@role_required("2")
def student_blog_comment(
    post_id
):

    ensure_community_tables()

    content = request.form.get(
        "content",
        ""
    ).strip()

    if not content:

        flash(
            "Please write a reply.",
            "error"
        )

        return redirect(
            url_for(
                "student_blog_detail",
                post_id=post_id
            )
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
            SELECT post_id

            FROM student_posts

            WHERE

                post_id = %s

                AND

                status = 'APPROVED'

            LIMIT 1
            """,

            (
                post_id,
            )
        )

        if not cursor.fetchone():

            flash(
                "This discussion is not available.",
                "error"
            )

            return redirect(
                url_for(
                    "student_blog"
                )
            )

        cursor.execute(
            """
            INSERT INTO
                student_post_comments
            (
                post_id,
                user_id,
                author_name,
                content,
                status
            )

            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                'APPROVED'
            )
            """,

            (
                post_id,

                str(
                    session.get(
                        "user_id"
                    )
                ),

                session.get(
                    "username",
                    "Student"
                ),

                content

            )
        )

        connection.commit()

        flash(
            "Your reply has been added.",
            "success"
        )

    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "COMMUNITY COMMENT ERROR:",
            error
        )

        flash(
            "Unable to add your reply.",
            "error"
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

    return redirect(
        url_for(
            "student_blog_detail",
            post_id=post_id
        )
    )


# =========================================================
# BLOG LIKE
# =========================================================

@app.route(
    "/student/blog/<int:post_id>/like",
    methods=["POST"]
)
@login_required
@role_required("2")
def student_blog_like(
    post_id
):

    ensure_community_tables()

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        user_id = str(
            session.get(
                "user_id"
            )
        )

        cursor.execute(
            """
            SELECT like_id

            FROM student_post_likes

            WHERE

                post_id = %s

                AND

                user_id = %s

            LIMIT 1
            """,

            (
                post_id,
                user_id
            )
        )

        existing = cursor.fetchone()

        if existing:

            cursor.execute(
                """
                DELETE FROM student_post_likes

                WHERE
                    like_id = %s
                """,

                (
                    existing[
                        "like_id"
                    ],
                )
            )

            liked = False

        else:

            cursor.execute(
                """
                SELECT post_id

                FROM student_posts

                WHERE

                    post_id = %s

                    AND

                    status = 'APPROVED'

                LIMIT 1
                """,

                (
                    post_id,
                )
            )

            if not cursor.fetchone():

                return {
                    "success": False,
                    "message":
                        "Post unavailable."
                }, 404

            cursor.execute(
                """
                INSERT INTO
                    student_post_likes
                (
                    post_id,
                    user_id
                )

                VALUES
                (
                    %s,
                    %s
                )
                """,

                (
                    post_id,
                    user_id
                )
            )

            liked = True

        connection.commit()

        cursor.execute(
            """
            SELECT COUNT(*) AS total

            FROM student_post_likes

            WHERE
                post_id = %s
            """,

            (
                post_id,
            )
        )

        result = cursor.fetchone()

        return {

            "success": True,

            "liked": liked,

            "count":
                result["total"]
                if result
                else 0

        }

    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "COMMUNITY LIKE ERROR:",
            error
        )

        return {

            "success": False,

            "message":
                "Unable to update like."

        }, 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

# =========================================================
# EDIT BLOG POST
# =========================================================

@app.route(
    "/student/blog/<int:post_id>/edit",
    methods=["POST"]
)
@login_required
@role_required("2")
def student_blog_edit(post_id):

    ensure_community_tables()

    post_type = request.form.get(
        "post_type",
        "QUESTION"
    ).strip().upper()

    title = request.form.get(
        "title",
        ""
    ).strip()

    content = request.form.get(
        "content",
        ""
    ).strip()

    tags = request.form.get(
        "tags",
        ""
    ).strip()

    allowed_types = {
        "QUESTION",
        "DISCUSSION",
        "INFORMATION"
    }

    # -----------------------------------------------------
    # VALIDATION
    # -----------------------------------------------------

    if post_type not in allowed_types:

        flash(
            "Invalid post type.",
            "error"
        )

        return redirect(
            url_for(
                "student_blog_detail",
                post_id=post_id
            )
        )

    if not title:

        flash(
            "Please enter a title.",
            "error"
        )

        return redirect(
            url_for(
                "student_blog_detail",
                post_id=post_id
            )
        )

    if len(title) > 220:

        flash(
            "Title is too long.",
            "error"
        )

        return redirect(
            url_for(
                "student_blog_detail",
                post_id=post_id
            )
        )

    if not content:

        flash(
            "Please enter your question or message.",
            "error"
        )

        return redirect(
            url_for(
                "student_blog_detail",
                post_id=post_id
            )
        )


    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        current_user_id = str(
            session.get(
                "user_id"
            )
        )


        # -------------------------------------------------
        # VERIFY OWNERSHIP
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                post_id,
                user_id,
                status
            FROM student_posts
            WHERE
                post_id = %s
                AND user_id = %s
            LIMIT 1
            """,
            (
                post_id,
                current_user_id
            )
        )

        post = cursor.fetchone()


        if not post:

            flash(
                "You are not allowed to edit this post.",
                "error"
            )

            return redirect(
                url_for(
                    "student_blog"
                )
            )


        # -------------------------------------------------
        # UPDATE
        # -------------------------------------------------

        cursor.execute(
            """
            UPDATE student_posts

            SET

                post_type = %s,

                title = %s,

                content = %s,

                tags = %s,

                status = 'PENDING',

                rejection_reason = NULL,

                reviewed_at = NULL,

                reviewed_by = NULL

            WHERE

                post_id = %s

                AND

                user_id = %s
            """,
            (
                post_type,
                title,
                content,
                tags or None,
                post_id,
                current_user_id
            )
        )


        if cursor.rowcount != 1:

            connection.rollback()

            flash(
                "Post could not be updated.",
                "error"
            )

            return redirect(
                url_for(
                    "student_blog_detail",
                    post_id=post_id
                )
            )


        connection.commit()


        flash(
            "Post updated and sent for admin review.",
            "success"
        )


    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "COMMUNITY EDIT ERROR:",
            error
        )

        flash(
            "Unable to update your post.",
            "error"
        )


    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


    return redirect(
        url_for(
            "student_blog_detail",
            post_id=post_id
        )
    )


# =========================================================
# DELETE BLOG POST
# =========================================================

@app.route(
    "/student/blog/<int:post_id>/delete",
    methods=["POST"]
)
@login_required
@role_required("2")
def student_blog_delete(post_id):

    ensure_community_tables()

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        current_user_id = str(
            session.get(
                "user_id"
            )
        )


        # -------------------------------------------------
        # VERIFY OWNERSHIP
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                post_id,
                user_id
            FROM student_posts
            WHERE
                post_id = %s
                AND user_id = %s
            LIMIT 1
            """,
            (
                post_id,
                current_user_id
            )
        )

        post = cursor.fetchone()


        if not post:

            flash(
                "You are not allowed to delete this post.",
                "error"
            )

            return redirect(
                url_for(
                    "student_blog"
                )
            )


        # -------------------------------------------------
        # DELETE
        # -------------------------------------------------

        cursor.execute(
            """
            DELETE FROM student_posts

            WHERE

                post_id = %s

                AND

                user_id = %s
            """,
            (
                post_id,
                current_user_id
            )
        )


        if cursor.rowcount != 1:

            connection.rollback()

            flash(
                "Post could not be deleted.",
                "error"
            )

            return redirect(
                url_for(
                    "student_blog_detail",
                    post_id=post_id
                )
            )


        connection.commit()


        flash(
            "Your post has been deleted.",
            "success"
        )


    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "COMMUNITY DELETE ERROR:",
            error
        )

        flash(
            "Unable to delete your post.",
            "error"
        )


    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


    return redirect(
        url_for(
            "student_blog"
        )
    )
# =========================================================
# ADMIN COMMUNITY MODERATION
# =========================================================

@app.route(
    "/admin/community"
)
@admin_required
def admin_community():

    ensure_community_tables()

    status = request.args.get(
        "status",
        "PENDING"
    ).upper()

    if status not in (
        "PENDING",
        "APPROVED",
        "REJECTED",
        "ALL"
    ):

        status = "PENDING"

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        if status == "ALL":

            cursor.execute(
                """
                SELECT

                    post_id,

                    user_id,

                    author_name,

                    post_type,

                    title,

                    content,

                    tags,

                    status,

                    rejection_reason,

                    created_at,

                    reviewed_at,

                    reviewed_by

                FROM student_posts

                ORDER BY

                    CASE status

                        WHEN 'PENDING'
                        THEN 1

                        WHEN 'APPROVED'
                        THEN 2

                        ELSE 3

                    END,

                    created_at DESC
                """
            )

        else:

            cursor.execute(
                """
                SELECT

                    post_id,

                    user_id,

                    author_name,

                    post_type,

                    title,

                    content,

                    tags,

                    status,

                    rejection_reason,

                    created_at,

                    reviewed_at,

                    reviewed_by

                FROM student_posts

                WHERE
                    status = %s

                ORDER BY
                    created_at DESC
                """,

                (
                    status,
                )
            )

        posts = cursor.fetchall()

        cursor.execute(
            """
            SELECT

                COUNT(*) AS total,

                SUM(
                    status = 'PENDING'
                ) AS pending,

                SUM(
                    status = 'APPROVED'
                ) AS approved,

                SUM(
                    status = 'REJECTED'
                ) AS rejected

            FROM student_posts
            """
        )

        stats = (
            cursor.fetchone()
            or {}
        )

        return render_template(

            "admin/community_moderation.html",

            posts=posts,

            active_status=status,

            stats=stats

        )

    except Exception as error:

        print(
            "ADMIN COMMUNITY ERROR:",
            error
        )

        return render_template(

            "admin/community_moderation.html",

            posts=[],

            active_status=status,

            stats={},

            db_error=str(error)

        ), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# ADMIN REVIEW POST
# =========================================================

@app.route(
    "/admin/community/<int:post_id>/review",
    methods=["POST"]
)
@admin_required
def admin_community_review(
    post_id
):

    ensure_community_tables()

    action = request.form.get(
        "action",
        ""
    ).strip().upper()

    rejection_reason = request.form.get(
        "rejection_reason",
        ""
    ).strip()

    if action not in (
        "APPROVE",
        "REJECT"
    ):

        flash(
            "Invalid moderation action.",
            "error"
        )

        return redirect(
            url_for(
                "admin_community"
            )
        )

    if (
        action == "REJECT"
        and
        not rejection_reason
    ):

        flash(
            "Please provide a rejection reason.",
            "error"
        )

        return redirect(
            url_for(
                "admin_community"
            )
        )

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor()

        reviewer = str(
            session.get(
                "user_id",
                "ADMIN"
            )
        )

        if action == "APPROVE":

            cursor.execute(
                """
                UPDATE student_posts

                SET

                    status =
                        'APPROVED',

                    rejection_reason =
                        NULL,

                    reviewed_at =
                        CURRENT_TIMESTAMP,

                    reviewed_by =
                        %s

                WHERE
                    post_id = %s
                """,

                (
                    reviewer,
                    post_id
                )
            )

            message = (
                "Post approved successfully."
            )

        else:

            cursor.execute(
                """
                UPDATE student_posts

                SET

                    status =
                        'REJECTED',

                    rejection_reason =
                        %s,

                    reviewed_at =
                        CURRENT_TIMESTAMP,

                    reviewed_by =
                        %s

                WHERE
                    post_id = %s
                """,

                (
                    rejection_reason,

                    reviewer,

                    post_id
                )
            )

            message = (
                "Post rejected."
            )

        connection.commit()

        flash(
            message,
            "success"
        )

    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "ADMIN COMMUNITY REVIEW ERROR:",
            error
        )

        flash(
            "Unable to update post status.",
            "error"
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

    return redirect(
        url_for(
            "admin_community"
        )
    )
# =========================================================
# =========================================================
# OTHER DASHBOARDS
# =========================================================
# =========================================================


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
# TPO STUDENTS — DATABASE + SEARCH + FILTERS
# =========================================================

@app.route("/tpo/students")
@login_required
@role_required("5")
def tpo_students():

    connection = None
    cursor = None

    try:

        # =================================================
        # DATABASE CONNECTION
        # =================================================

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # =================================================
        # CURRENT TPO
        # =================================================

        user_id = session.get("user_id")
        campus_id = session.get("campus_id")


        print("TPO USER ID:", user_id)
        print("TPO SESSION CAMPUS:", campus_id)


        # =================================================
        # FALLBACK CAMPUS FROM USERS TABLE
        # =================================================

        if not campus_id and user_id:

            cursor.execute(
                """
                SELECT
                    user_id,
                    campus_id,
                    role_id,
                    username,
                    email
                FROM users
                WHERE user_id = %s
                LIMIT 1
                """,
                (user_id,)
            )

            current_user = cursor.fetchone()


            if current_user:

                campus_id = current_user["campus_id"]

                session["campus_id"] = campus_id
                session["role_id"] = current_user["role_id"]
                session["username"] = current_user["username"]
                session["email"] = current_user["email"]


        print(
            "TPO FINAL CAMPUS ID:",
            campus_id
        )


        # =================================================
        # NO CAMPUS
        # =================================================

        if not campus_id:

            return render_template(
                "tpo/students.html",

                students=[],

                total_students=0,
                eligible_students=0,
                placed_students=0,
                placement_percentage=0,

                colleges=[],
                courses=[],
                branches=[],
                sections=[],
                batches=[],

                search="",
                selected_college="",
                selected_course="",
                selected_branch="",
                selected_section="",
                selected_batch="",
                selected_eligibility="",
                selected_placement=""
            )


        # =================================================
        # FILTER VALUES
        # =================================================

        search = request.args.get(
            "search",
            ""
        ).strip()


        selected_college = request.args.get(
            "college",
            ""
        ).strip()


        selected_batch = request.args.get(
            "batch",
            ""
        ).strip()


        selected_eligibility = request.args.get(
            "eligibility",
            ""
        ).strip()


        selected_placement = request.args.get(
            "placement",
            ""
        ).strip()

        selected_course = request.args.get(
            "course",
            ""
        ).strip()

        selected_branch = request.args.get(
            "branch",
            ""
        ).strip()

        selected_section = request.args.get(
            "section",
            ""
        ).strip()


        # =================================================
        # NORMALIZE ALL VALUES
        # =================================================

        if search.lower() == "all":

            search = ""


        if selected_college.lower() in (
            "all",
            "all_colleges",
            "all-colleges"
        ):

            selected_college = ""


        if selected_batch.lower() in (
            "all",
            "all_batches",
            "all-batches"
        ):

            selected_batch = ""


        if selected_eligibility.lower() in (
            "all",
            "all_eligibility",
            "all-eligibility"
        ):

            selected_eligibility = ""


        if selected_placement.lower() in (
            "all",
            "all_status",
            "all-status"
        ):

            selected_placement = ""

        if selected_course.lower() in (
            "all",
            "all_courses",
            "all-courses"
        ):
            selected_course = ""

        if selected_branch.lower() in (
            "all",
            "all_branches",
            "all-branches"
        ):
            selected_branch = ""

        if selected_section.lower() in (
            "all",
            "all_sections",
            "all-sections"
        ):
            selected_section = ""


        print("SEARCH:", search)
        print("COLLEGE:", selected_college)
        print("BATCH:", selected_batch)
        print("ELIGIBILITY:", selected_eligibility)
        print("PLACEMENT:", selected_placement)


        # =================================================
        # COLLEGE OPTIONS
        # =================================================

        cursor.execute(
            """
            SELECT

                c.campus_id,
                c.campus_code,
                c.campus_name

            FROM campuses c

            WHERE
                c.campus_id = %s

            LIMIT 1
            """,
            (campus_id,)
        )

        colleges = cursor.fetchall()


        # =================================================
        # COURSE OPTIONS
        # =================================================

        cursor.execute(
            """
            SELECT
                co.course_id,
                co.course_code,
                co.course_name
            FROM courses co
            WHERE co.campus_id = %s
            ORDER BY co.course_name
            """,
            (campus_id,)
        )

        courses = cursor.fetchall()


        # =================================================
        # BRANCH OPTIONS
        # =================================================

        cursor.execute(
            """
            SELECT
                b.branch_id,
                b.course_id,
                b.branch_code,
                b.branch_name
            FROM branches b
            INNER JOIN courses co
                ON b.course_id = co.course_id
            WHERE co.campus_id = %s
            ORDER BY co.course_name, b.branch_name
            """,
            (campus_id,)
        )

        branches = cursor.fetchall()


        # =================================================
        # SECTION OPTIONS
        # =================================================

        cursor.execute(
            """
            SELECT
                sec.section_id,
                sec.branch_id,
                sec.session_id,
                sec.section_name
            FROM sections sec
            INNER JOIN branches b
                ON sec.branch_id = b.branch_id
            INNER JOIN courses co
                ON b.course_id = co.course_id
            WHERE co.campus_id = %s
            ORDER BY sec.session_id, sec.section_name
            """,
            (campus_id,)
        )

        sections = cursor.fetchall()


        # =================================================
        # BATCH OPTIONS
        # =================================================

        cursor.execute(
            """
            SELECT DISTINCT

                a.session_id,
                a.session_name,
                a.start_date

            FROM students s

            INNER JOIN academic_sessions a
                ON s.session_id = a.session_id

            WHERE
                s.campus_id = %s

            ORDER BY
                a.start_date DESC
            """,
            (campus_id,)
        )

        batches = cursor.fetchall()


        # =================================================
        # BUILD STUDENT CONDITIONS
        # =================================================

        conditions = [
            "s.campus_id = %s"
        ]

        params = [
            campus_id
        ]


        # =================================================
        # SEARCH
        # =================================================

        if search:

            conditions.append(
                """
                (
                    CONCAT(
                        COALESCE(s.first_name, ''),
                        ' ',
                        COALESCE(s.middle_name, ''),
                        ' ',
                        COALESCE(s.last_name, '')
                    ) LIKE %s

                    OR s.registration_no LIKE %s

                    OR s.enrollment_no LIKE %s

                    OR s.email LIKE %s

                    OR s.phone LIKE %s
                )
                """
            )


            search_value = f"%{search}%"


            params.extend(
                [
                    search_value,
                    search_value,
                    search_value,
                    search_value,
                    search_value
                ]
            )


        # =================================================
        # COLLEGE FILTER
        # =================================================

        if selected_college:

            conditions.append(
                """
                s.campus_id = %s
                """
            )

            params.append(
                selected_college
            )


        # =================================================
        # COURSE FILTER
        # =================================================

        if selected_course:
            conditions.append("s.course_id = %s")
            params.append(selected_course)


        # =================================================
        # BRANCH FILTER
        # =================================================

        if selected_branch:
            conditions.append("s.branch_id = %s")
            params.append(selected_branch)


        # =================================================
        # SECTION FILTER
        # =================================================

        if selected_section:
            conditions.append("s.section_id = %s")
            params.append(selected_section)


        # =================================================
        # BATCH FILTER
        # =================================================

        if selected_batch:

            conditions.append(
                """
                s.session_id = %s
                """
            )

            params.append(
                selected_batch
            )


        # =================================================
        # ELIGIBILITY FILTER
        # =================================================

        if selected_eligibility == "eligible":

            conditions.append(
                """
                s.cgpa IS NOT NULL

                AND

                s.backlogs IS NOT NULL

                AND

                s.backlogs <= 0
                """
            )


        elif selected_eligibility in (
            "not_eligible",
            "not-eligible"
        ):

            conditions.append(
                """
                (
                    s.cgpa IS NULL

                    OR

                    s.backlogs IS NULL

                    OR

                    s.backlogs > 0
                )
                """
            )


        # =================================================
        # PLACEMENT FILTER
        # =================================================

        if selected_placement == "placed":

            conditions.append(
                """
                EXISTS (

                    SELECT 1

                    FROM placement_applications pa_filter

                    INNER JOIN placements pl_filter
                        ON pa_filter.application_id =
                           pl_filter.application_id

                    WHERE

                        pa_filter.student_id =
                        s.student_id

                        AND

                        UPPER(
                            COALESCE(
                                pl_filter.placement_status,
                                ''
                            )
                        ) IN (
                            'SELECTED',
                            'PLACED',
                            'JOINED'
                        )
                )
                """
            )


        elif selected_placement == "not_placed":

            conditions.append(
                """
                NOT EXISTS (

                    SELECT 1

                    FROM placement_applications pa_filter

                    INNER JOIN placements pl_filter
                        ON pa_filter.application_id =
                           pl_filter.application_id

                    WHERE

                        pa_filter.student_id =
                        s.student_id

                        AND

                        UPPER(
                            COALESCE(
                                pl_filter.placement_status,
                                ''
                            )
                        ) IN (
                            'SELECTED',
                            'PLACED',
                            'JOINED'
                        )
                )
                """
            )


        # =================================================
        # FINAL WHERE CLAUSE
        # =================================================

        where_clause = " AND ".join(
            conditions
        )


        # =================================================
        # STUDENTS QUERY
        # =================================================

        student_query = f"""
            SELECT

                s.student_id,
                s.user_id,
                s.campus_id,

                s.registration_no,
                s.enrollment_no,

                s.first_name,
                s.middle_name,
                s.last_name,

                s.gender,
                s.phone,
                s.email,

                s.session_id,
                s.course_id,
                s.branch_id,
                s.section_id,

                s.tenth_percentage,
                s.twelfth_percentage,

                s.cgpa,
                s.backlogs,

                s.status,

                c.campus_code,
                c.campus_name,

                co.course_code,
                co.course_name,

                b.branch_code,
                b.branch_name,

                sec.section_name,

                a.session_name

            FROM students s

            LEFT JOIN campuses c
                ON s.campus_id =
                   c.campus_id

            LEFT JOIN courses co
                ON s.course_id =
                   co.course_id

            LEFT JOIN branches b
                ON s.branch_id =
                   b.branch_id

            LEFT JOIN sections sec
                ON s.section_id =
                   sec.section_id

            LEFT JOIN academic_sessions a
                ON s.session_id =
                   a.session_id

            WHERE
                {where_clause}

            ORDER BY
                s.created_at DESC
        """


        print(
            "TPO STUDENTS QUERY:",
            student_query
        )


        # =================================================
        # EXECUTE STUDENTS QUERY
        # =================================================

        cursor.execute(
            student_query,
            tuple(params)
        )


        students = cursor.fetchall()


        print(
            "TPO STUDENTS FOUND:",
            len(students)
        )


        # =================================================
        # CAMPUS STATISTICS
        # =================================================

        cursor.execute(
            """
            SELECT

                COUNT(*) AS total_students,

                COALESCE(
                    SUM(
                        CASE

                            WHEN
                                cgpa IS NOT NULL

                                AND

                                backlogs IS NOT NULL

                                AND

                                backlogs <= 0

                            THEN 1

                            ELSE 0

                        END
                    ),
                    0
                ) AS eligible_students

            FROM students

            WHERE
                campus_id = %s
            """,
            (campus_id,)
        )


        stats = cursor.fetchone()


        total_students = (
            stats["total_students"]
            if stats
            else 0
        )


        eligible_students = (
            stats["eligible_students"]
            if stats
            else 0
        )


        # =================================================
        # PLACED STUDENTS
        # =================================================

        cursor.execute(
            """
            SELECT

                COUNT(
                    DISTINCT pa.student_id
                ) AS placed_students

            FROM placement_applications pa

            INNER JOIN placements pl

                ON pa.application_id =
                   pl.application_id

            INNER JOIN students s

                ON pa.student_id =
                   s.student_id

            WHERE

                s.campus_id = %s

                AND

                UPPER(
                    COALESCE(
                        pl.placement_status,
                        ''
                    )
                ) IN (
                    'SELECTED',
                    'PLACED',
                    'JOINED'
                )
            """,
            (campus_id,)
        )


        placed_result = cursor.fetchone()


        placed_students = (
            placed_result["placed_students"]
            if placed_result
            else 0
        )


        # =================================================
        # PLACEMENT PERCENTAGE
        # =================================================

        if total_students > 0:

            placement_percentage = round(
                (
                    placed_students
                    / total_students
                ) * 100,
                2
            )

        else:

            placement_percentage = 0


        # =================================================
        # FINAL DEBUG
        # =================================================

        print(
            "===================================="
        )

        print(
            "TPO STUDENTS FOUND:",
            len(students)
        )

        print(
            "TOTAL STUDENTS:",
            total_students
        )

        print(
            "ELIGIBLE STUDENTS:",
            eligible_students
        )

        print(
            "PLACED STUDENTS:",
            placed_students
        )

        print(
            "PLACEMENT PERCENTAGE:",
            placement_percentage
        )

        print(
            "===================================="
        )


        # =================================================
        # RENDER PAGE
        # =================================================

        return render_template(

            "tpo/students.html",

            students=students,

            total_students=total_students,

            eligible_students=eligible_students,

            placed_students=placed_students,

            placement_percentage=placement_percentage,

            colleges=colleges,

            courses=courses,
            branches=branches,
            sections=sections,

            batches=batches,

            search=search,

            selected_college=selected_college,
            selected_course=selected_course,
            selected_branch=selected_branch,
            selected_section=selected_section,

            selected_batch=selected_batch,

            selected_eligibility=selected_eligibility,

            selected_placement=selected_placement

        )


    # =====================================================
    # ERROR HANDLING
    # =====================================================

    except Exception as error:

        print(
            "===================================="
        )

        print(
            "TPO STUDENTS FILTER ERROR:"
        )

        print(
            error
        )

        print(
            "===================================="
        )


        return render_template(

            "tpo/students.html",

            students=[],

            total_students=0,

            eligible_students=0,

            placed_students=0,

            placement_percentage=0,

            colleges=[],

            courses=[],
            branches=[],
            sections=[],

            batches=[],

            search="",

            selected_college="",
            selected_course="",
            selected_branch="",
            selected_section="",

            selected_batch="",

            selected_eligibility="",

            selected_placement="",

            db_error=str(error)

        )


    # =====================================================
    # CLOSE DATABASE
    # =====================================================

    finally:

        if cursor:

            cursor.close()


        if connection:

            connection.close()
# =========================================================
# TPO STUDENT OPTIONS — DATABASE CONNECTED
# =========================================================

@app.route("/tpo/student/options")
@login_required
@role_required("5")
def tpo_student_options():

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        campus_id = session.get("campus_id")

        if not campus_id:
            cursor.execute(
                """
                SELECT campus_id
                FROM users
                WHERE user_id = %s
                LIMIT 1
                """,
                (session.get("user_id"),)
            )
            user = cursor.fetchone()

            if user:
                campus_id = user["campus_id"]
                session["campus_id"] = campus_id

        if not campus_id:
            return {
                "success": False,
                "message": "TPO campus is not configured."
            }, 400

        cursor.execute(
            """
            SELECT campus_id, campus_code, campus_name
            FROM campuses
            WHERE campus_id = %s
            LIMIT 1
            """,
            (campus_id,)
        )
        campus = cursor.fetchone()

        cursor.execute(
            """
            SELECT course_id, course_code, course_name
            FROM courses
            WHERE campus_id = %s
            ORDER BY course_name
            """,
            (campus_id,)
        )
        courses = cursor.fetchall()

        cursor.execute(
            """
            SELECT
                b.branch_id,
                b.course_id,
                b.branch_code,
                b.branch_name
            FROM branches b
            INNER JOIN courses co
                ON b.course_id = co.course_id
            WHERE co.campus_id = %s
            ORDER BY co.course_name, b.branch_name
            """,
            (campus_id,)
        )
        branches = cursor.fetchall()

        cursor.execute(
            """
            SELECT
                sec.section_id,
                sec.branch_id,
                sec.session_id,
                sec.section_name
            FROM sections sec
            INNER JOIN branches b
                ON sec.branch_id = b.branch_id
            INNER JOIN courses co
                ON b.course_id = co.course_id
            WHERE co.campus_id = %s
            ORDER BY sec.session_id, sec.section_name
            """,
            (campus_id,)
        )
        sections = cursor.fetchall()

        cursor.execute(
            """
            SELECT
                session_id,
                session_name,
                start_date,
                end_date
            FROM academic_sessions
            WHERE campus_id = %s
            ORDER BY start_date DESC
            """,
            (campus_id,)
        )
        batches = cursor.fetchall()

        return {
            "success": True,
            "campus": campus,
            "courses": courses,
            "branches": branches,
            "sections": sections,
            "batches": batches
        }

    except Exception as error:
        print("TPO STUDENT OPTIONS ERROR:", error)

        return {
            "success": False,
            "message": str(error)
        }, 500

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# TPO ADD STUDENT — DATABASE CONNECTED
# =========================================================

@app.route(
    "/tpo/student/add",
    methods=["POST"]
)
@login_required
@role_required("5")
def tpo_add_student():

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)

        tpo_user_id = session.get("user_id")
        campus_id = session.get("campus_id")

        # Never trust campus_id from the browser.
        if not campus_id:
            cursor.execute(
                """
                SELECT campus_id
                FROM users
                WHERE user_id = %s
                LIMIT 1
                """,
                (tpo_user_id,)
            )
            tpo_user = cursor.fetchone()

            if tpo_user:
                campus_id = tpo_user["campus_id"]
                session["campus_id"] = campus_id

        if not campus_id:
            return {
                "success": False,
                "message": "TPO campus is not configured."
            }, 400

        # -------------------------------------------------
        # FORM DATA
        # -------------------------------------------------

        registration_no = request.form.get(
            "registration_no", ""
        ).strip()

        enrollment_no = request.form.get(
            "enrollment_no", ""
        ).strip()

        first_name = request.form.get(
            "first_name", ""
        ).strip()

        middle_name = request.form.get(
            "middle_name", ""
        ).strip()

        last_name = request.form.get(
            "last_name", ""
        ).strip()

        email = request.form.get(
            "email", ""
        ).strip().lower()

        phone = request.form.get(
            "phone", ""
        ).strip()

        date_of_birth = request.form.get(
            "date_of_birth", ""
        ).strip() or None

        gender = request.form.get(
            "gender", ""
        ).strip() or None

        address = request.form.get(
            "address", ""
        ).strip()

        city = request.form.get(
            "city", ""
        ).strip()

        state = request.form.get(
            "state", ""
        ).strip()

        course_id = request.form.get(
            "course_id", ""
        ).strip()

        branch_id = request.form.get(
            "branch_id", ""
        ).strip()

        section_id = request.form.get(
            "section_id", ""
        ).strip()

        session_id = request.form.get(
            "session_id", ""
        ).strip()

        tenth_percentage = request.form.get(
            "tenth_percentage", ""
        ).strip() or None

        twelfth_percentage = request.form.get(
            "twelfth_percentage", ""
        ).strip() or None

        cgpa = request.form.get(
            "cgpa", ""
        ).strip() or None

        backlogs = request.form.get(
            "backlogs", "0"
        ).strip() or "0"

        password = request.form.get(
            "password", ""
        ).strip()

        # -------------------------------------------------
        # REQUIRED FIELDS
        # -------------------------------------------------

        required = {
            "registration_no": registration_no,
            "enrollment_no": enrollment_no,
            "first_name": first_name,
            "email": email,
            "course_id": course_id,
            "branch_id": branch_id,
            "section_id": section_id,
            "session_id": session_id
        }

        missing = [
            field
            for field, value in required.items()
            if not value
        ]

        if missing:
            return {
                "success": False,
                "message": (
                    "Please fill required fields: "
                    + ", ".join(missing)
                )
            }, 400

        if not password:
            password = registration_no

        # -------------------------------------------------
        # VERIFY COURSE BELONGS TO TPO CAMPUS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT course_id
            FROM courses
            WHERE course_id = %s
              AND campus_id = %s
            LIMIT 1
            """,
            (course_id, campus_id)
        )

        course = cursor.fetchone()

        if not course:
            return {
                "success": False,
                "message": "Invalid course for this campus."
            }, 400

        # -------------------------------------------------
        # VERIFY BRANCH BELONGS TO COURSE
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT b.branch_id
            FROM branches b
            INNER JOIN courses co
                ON b.course_id = co.course_id
            WHERE b.branch_id = %s
              AND b.course_id = %s
              AND co.campus_id = %s
            LIMIT 1
            """,
            (branch_id, course_id, campus_id)
        )

        branch = cursor.fetchone()

        if not branch:
            return {
                "success": False,
                "message": "Invalid branch for selected course."
            }, 400

        # -------------------------------------------------
        # VERIFY SECTION BELONGS TO BRANCH + SESSION
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT sec.section_id
            FROM sections sec
            INNER JOIN branches b
                ON sec.branch_id = b.branch_id
            INNER JOIN courses co
                ON b.course_id = co.course_id
            WHERE sec.section_id = %s
              AND sec.branch_id = %s
              AND sec.session_id = %s
              AND co.campus_id = %s
            LIMIT 1
            """,
            (
                section_id,
                branch_id,
                session_id,
                campus_id
            )
        )

        section = cursor.fetchone()

        if not section:
            return {
                "success": False,
                "message": (
                    "Invalid section for selected "
                    "branch and batch."
                )
            }, 400

        # -------------------------------------------------
        # VERIFY SESSION BELONGS TO CAMPUS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT session_id
            FROM academic_sessions
            WHERE session_id = %s
              AND campus_id = %s
            LIMIT 1
            """,
            (session_id, campus_id)
        )

        academic_session = cursor.fetchone()

        if not academic_session:
            return {
                "success": False,
                "message": "Invalid batch/session for this campus."
            }, 400

        # -------------------------------------------------
        # DUPLICATE CHECK
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT user_id, email
            FROM users
            WHERE email = %s
            LIMIT 1
            """,
            (email,)
        )

        existing_user = cursor.fetchone()

        if existing_user:
            return {
                "success": False,
                "message": "Email is already registered."
            }, 409

        cursor.execute(
            """
            SELECT student_id
            FROM students
            WHERE registration_no = %s
               OR enrollment_no = %s
            LIMIT 1
            """,
            (registration_no, enrollment_no)
        )

        existing_student = cursor.fetchone()

        if existing_student:
            return {
                "success": False,
                "message": (
                    "Registration number or enrollment "
                    "number already exists."
                )
            }, 409

        # -------------------------------------------------
        # GENERATE IDS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT CONCAT(
                'STU',
                LPAD(
                    COALESCE(
                        MAX(
                            CAST(
                                SUBSTRING(student_id, 4)
                                AS UNSIGNED
                            )
                        ),
                        0
                    ) + 1,
                    3,
                    '0'
                )
            ) AS next_id
            FROM students
            WHERE student_id REGEXP '^STU[0-9]+$'
            """
        )

        student_id = cursor.fetchone()["next_id"]

        user_id = student_id

        # -------------------------------------------------
        # PASSWORD HASH
        # -------------------------------------------------

        from werkzeug.security import generate_password_hash

        password_hash = generate_password_hash(
            password,
            method="scrypt"
        )

        username = registration_no.lower()

        # -------------------------------------------------
        # CREATE USER
        # -------------------------------------------------

        cursor.execute(
            """
            INSERT INTO users
            (
                user_id,
                campus_id,
                username,
                email,
                password_hash,
                role_id,
                account_status
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s,
                %s,
                '2',
                'ACTIVE'
            )
            """,
            (
                user_id,
                campus_id,
                username,
                email,
                password_hash
            )
        )

        # -------------------------------------------------
        # CREATE STUDENT
        # -------------------------------------------------

        cursor.execute(
            """
            INSERT INTO students
            (
                student_id,
                user_id,
                campus_id,

                course_id,
                branch_id,
                section_id,

                registration_no,
                enrollment_no,

                first_name,
                middle_name,
                last_name,

                date_of_birth,
                gender,

                phone,
                email,

                address,
                city,
                state,

                session_id,

                tenth_percentage,
                twelfth_percentage,

                cgpa,
                backlogs,

                status,
                created_by
            )
            VALUES
            (
                %s,
                %s,
                %s,

                %s,
                %s,
                %s,

                %s,
                %s,

                %s,
                %s,
                %s,

                %s,
                %s,

                %s,
                %s,

                %s,
                %s,
                %s,

                %s,

                %s,
                %s,

                %s,
                %s,

                'ACTIVE',
                %s
            )
            """,
            (
                student_id,
                user_id,
                campus_id,

                course_id,
                branch_id,
                section_id,

                registration_no,
                enrollment_no,

                first_name,
                middle_name or None,
                last_name or None,

                date_of_birth,
                gender,

                phone or None,
                email,

                address or None,
                city or None,
                state or None,

                session_id,

                tenth_percentage,
                twelfth_percentage,

                cgpa,
                backlogs,

                tpo_user_id
            )
        )

        connection.commit()

        return {
            "success": True,
            "message": "Student added successfully.",
            "student_id": student_id,
            "user_id": user_id,
            "registration_no": registration_no,
            "default_password": password
        }, 201

    except mysql.connector.IntegrityError as error:
        if connection:
            connection.rollback()

        print("TPO ADD STUDENT INTEGRITY ERROR:", error)

        return {
            "success": False,
            "message": "Duplicate or invalid student data.",
            "error": str(error)
        }, 409

    except Exception as error:
        if connection:
            connection.rollback()

        print("TPO ADD STUDENT ERROR:", error)

        return {
            "success": False,
            "message": str(error)
        }, 500

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# TPO STUDENT DETAIL — DATABASE CONNECTED
# =========================================================

@app.route(
    "/tpo/student/<registration_no>"
)
@login_required
@role_required("5")
def tpo_student_detail(
    registration_no
):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        campus_id = session.get(
            "campus_id"
        )


        # =================================================
        # STUDENT BASIC DETAILS
        # =================================================

        cursor.execute(
            """
            SELECT

                s.student_id,
                s.user_id,
                s.campus_id,

                s.registration_no,
                s.enrollment_no,

                s.first_name,
                s.middle_name,
                s.last_name,

                s.date_of_birth,
                s.gender,

                s.phone,
                s.email,

                s.address,
                s.city,
                s.state,

                s.session_id,
                s.course_id,
                s.branch_id,
                s.section_id,

                s.tenth_percentage,
                s.twelfth_percentage,

                s.cgpa,
                s.backlogs,

                s.resume_file,
                s.certificate_files,

                s.internship_details,
                s.internship_files,

                s.status,

                c.campus_code,
                c.campus_name,

                co.course_code,
                co.course_name,

                b.branch_code,
                b.branch_name,

                sec.section_name,

                a.session_name

            FROM students s

            LEFT JOIN campuses c
                ON s.campus_id = c.campus_id

            LEFT JOIN courses co
                ON s.course_id = co.course_id

            LEFT JOIN branches b
                ON s.branch_id = b.branch_id

            LEFT JOIN sections sec
                ON s.section_id = sec.section_id

            LEFT JOIN academic_sessions a
                ON s.session_id = a.session_id

            WHERE

                s.registration_no = %s

                AND

                s.campus_id = %s

            LIMIT 1
            """,

            (
                registration_no,
                campus_id
            )
        )


        student = cursor.fetchone()


        if not student:

            return (
                "Student not found",
                404
            )


        # =================================================
        # PLACEMENT DETAILS
        # =================================================

        placements = []


        try:

            cursor.execute(
                """
                SELECT

                    pa.application_id,
                    pa.application_status,
                    pa.applied_at,

                    pd.drive_id,
                    pd.drive_name,
                    pd.job_role,
                    pd.package_lpa,

                    co.company_id,
                    co.company_name,

                    pp.stage,
                    pp.status AS progress_status,

                    pp.score,
                    pp.scheduled_at,

                    pp.offer_package_lpa,
                    pp.joining_date,

                    pl.placement_status,
                    pl.package_lpa AS placed_package,
                    pl.joining_date AS placed_joining_date

                FROM placement_applications pa

                INNER JOIN placement_drives pd
                    ON pa.drive_id = pd.drive_id

                INNER JOIN companies co
                    ON pd.company_id = co.company_id

                LEFT JOIN placement_progress pp
                    ON pa.application_id =
                       pp.application_id

                LEFT JOIN placements pl
                    ON pa.application_id =
                       pl.application_id

                WHERE
                    pa.student_id = %s

                ORDER BY
                    pa.applied_at DESC
                """,

                (
                    student["student_id"],
                )
            )


            placements = cursor.fetchall()


        except Exception as placement_error:

            print(
                "PLACEMENT DETAILS ERROR:",
                placement_error
            )


        return render_template(

            "tpo/student_detail.html",

            student=student,

            placements=placements,

            registration_no=registration_no

        )


    except Exception as error:

        print(
            "===================================="
        )

        print(
            "TPO STUDENT DETAIL ERROR:"
        )

        print(
            error
        )

        print(
            "===================================="
        )


        return (
            "Database error: " +
            str(error),
            500
        )


    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()
# =========================================================
# TPO COMPANIES
# =========================================================

@app.route("/tpo/companies")
@login_required
@role_required("5")
def tpo_companies():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        campus_id = session.get(
            "campus_id"
        )

        # -------------------------------------------------
        # FALLBACK CAMPUS
        # -------------------------------------------------

        if not campus_id:

            cursor.execute(
                """
                SELECT campus_id
                FROM users
                WHERE user_id = %s
                LIMIT 1
                """,
                (
                    session.get("user_id"),
                )
            )

            user = cursor.fetchone()

            if user:

                campus_id = user["campus_id"]

                session["campus_id"] = campus_id


        if not campus_id:

            return render_template(
                "tpo/companies.html",

                companies=[],

                total_companies=0,
                active_companies=0,
                placement_drives=0,
                offers_generated=0,

                industries=[],

                db_error="TPO campus is not configured."
            )


        # -------------------------------------------------
        # COMPANIES
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT

                co.company_id,
                co.company_code,
                co.company_name,

                co.industry,
                co.website,
                co.location,

                co.contact_person,
                co.contact_email,
                co.contact_phone,

                co.status,

                COUNT(
                    DISTINCT pd.drive_id
                ) AS drives,

                COALESCE(
                    MAX(
                        pd.package_lpa
                    ),
                    0
                ) AS package_lpa,

                GROUP_CONCAT(
                    DISTINCT c.campus_code
                    ORDER BY c.campus_code
                    SEPARATOR ', '
                ) AS colleges

            FROM companies co

            INNER JOIN placement_drives pd

                ON pd.company_id =
                   co.company_id

                AND pd.campus_id =
                    %s

            LEFT JOIN campuses c

                ON c.campus_id =
                   pd.campus_id

            GROUP BY

                co.company_id,
                co.company_code,
                co.company_name,

                co.industry,
                co.website,
                co.location,

                co.contact_person,
                co.contact_email,
                co.contact_phone,

                co.status

            ORDER BY
                co.company_name ASC
            """,

            (
                campus_id,
            )
        )


        companies = cursor.fetchall()


        # -------------------------------------------------
        # TOTAL COMPANIES
        # -------------------------------------------------

        total_companies = len(
            companies
        )


        # -------------------------------------------------
        # ACTIVE COMPANIES
        # -------------------------------------------------

        active_companies = sum(

            1

            for company in companies

            if str(
                company.get(
                    "status",
                    ""
                )
            ).upper() == "ACTIVE"

        )


        # -------------------------------------------------
        # PLACEMENT DRIVES
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                COUNT(*) AS total
            FROM placement_drives
            WHERE campus_id = %s
            """,

            (
                campus_id,
            )
        )


        result = cursor.fetchone()


        placement_drives = (

            result["total"]

            if result

            else 0

        )


        # -------------------------------------------------
        # OFFERS GENERATED
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                COUNT(
                    DISTINCT pl.placement_id
                ) AS total

            FROM placements pl

            INNER JOIN placement_drives pd

                ON pd.drive_id =
                   pl.drive_id

            WHERE

                pd.campus_id = %s

                AND

                UPPER(
                    COALESCE(
                        pl.placement_status,
                        ''
                    )
                ) IN (
                    'SELECTED',
                    'PLACED',
                    'JOINED',
                    'CONFIRMED'
                )
            """,

            (
                campus_id,
            )
        )


        result = cursor.fetchone()


        offers_generated = (

            result["total"]

            if result

            else 0

        )


        # -------------------------------------------------
        # INDUSTRIES
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT DISTINCT
                industry

            FROM companies

            WHERE

                industry IS NOT NULL

                AND

                TRIM(industry) <> ''

            ORDER BY
                industry
            """
        )


        industries = cursor.fetchall()


        # -------------------------------------------------
        # RENDER
        # -------------------------------------------------

        return render_template(

            "tpo/companies.html",

            companies=companies,

            total_companies=total_companies,

            active_companies=active_companies,

            placement_drives=placement_drives,

            offers_generated=offers_generated,

            industries=industries,

            campus_id=campus_id

        )


    except Exception as error:

        print(
            "===================================="
        )

        print(
            "TPO COMPANIES ERROR:",
            error
        )

        print(
            "===================================="
        )


        return render_template(

            "tpo/companies.html",

            companies=[],

            total_companies=0,

            active_companies=0,

            placement_drives=0,

            offers_generated=0,

            industries=[],

            db_error=str(error)

        )


    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# TPO PLACEMENT DRIVES
# =========================================================

@app.route("/tpo/placement-drives")
@login_required
@role_required("5")
def tpo_placement_drives():

    return render_template(
        "tpo/placement_drives.html"
    )

# =========================================================
# TPO NOC
# =========================================================

@app.route("/tpo/noc")
def tpo_noc():

    return render_template(
        "tpo/noc.html"
    )

# =========================================================
# TPO APPLICATIONS
# =========================================================

@app.route("/tpo/applications")
@login_required
@role_required("5")
def tpo_applications():

    return render_template(
        "tpo/applications.html"
    )


# =========================================================
# TPO SHORTLISTED STUDENTS
# =========================================================

@app.route("/tpo/shortlisted-students")
@login_required
@role_required("5")
def tpo_shortlisted_students():

    return render_template(
        "tpo/shortlisted_students.html"
    )


# =========================================================
# TPO INTERVIEWS
# =========================================================

@app.route("/tpo/interviews")
@login_required
@role_required("5")
def tpo_interviews():

    return render_template(
        "tpo/interviews.html"
    )


# =========================================================
# TPO OFFERS
# =========================================================

@app.route("/tpo/offers")
@login_required
@role_required("5")
def tpo_offers():

    return render_template(
        "tpo/offers.html"
    )


# =========================================================
# TPO PLACED STUDENTS
# =========================================================

@app.route("/tpo/placed-students")
@login_required
@role_required("5")
def tpo_placed_students():

    return render_template(
        "tpo/placed_students.html"
    )

@app.route("/tpo/placement-overview")
@login_required
@role_required("5")
def tpo_placement_overview():
    connection = None
    cursor = None
    try:
        connection = get_db_connection()
        cursor =  connection.cursor(
            dictionary=True
        )
        campus_id = session.get(
            "campus_id"
        )
        #=========================
        #FALLBACK CAMPUS
        #=========================
        if not campus_id:
            cursor.execute(
                """
                SELECT campus_id
                FROM users
                WHERE user_id = %s
                LIMIT 1
                """,
                (
                    session.get("user_id"),
                )
            )
            user = cursor.fetchone()
            if user:
                campus_id = user["campus_id"]
                session.get("user_id"),
        if not campus_id:
            return render_template(
                "tpo/placement_overview.html",
                total_students=0,
                eligible_students=0,
                placed_students=0,
                placement_rate=0,
                recruiting_companies=0,
                average_package=0,
                highest_package=0,
                campus=None
            )
        # -------------------------------------------------
        # CAMPUS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                campus_id,
                campus_code,
                campus_name
            FROM campuses
            WHERE campus_id = %s
            LIMIT 1
            """,
            (
                campus_id,
            )
        )

        campus = cursor.fetchone()
        # -------------------------------------------------
        # TOTAL STUDENTS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT COUNT(*) AS total_students
            FROM students
            WHERE campus_id = %s
            """,
            (
                campus_id,
            )
        )

        result = cursor.fetchone()

        total_students = (
            result["total_students"]
            if result
            else 0
        )
         # -------------------------------------------------
        # ELIGIBLE STUDENTS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT COUNT(*) AS eligible_students
            FROM students
            WHERE campus_id = %s

              AND cgpa IS NOT NULL

              AND backlogs IS NOT NULL

              AND backlogs <= 0
            """,
            (
                campus_id,
            )
        )

        result = cursor.fetchone()

        eligible_students = (
            result["eligible_students"]
            if result
            else 0
        )
        # -------------------------------------------------
        # PLACED STUDENTS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT
                COUNT(
                    DISTINCT pa.student_id
                ) AS placed_students

            FROM placement_applications pa

            INNER JOIN placements pl
                ON pa.application_id =
                   pl.application_id

            INNER JOIN students s
                ON pa.student_id =
                   s.student_id

            WHERE
                s.campus_id = %s

                AND

                UPPER(
                    COALESCE(
                        pl.placement_status,
                        ''
                    )
                ) IN (
                    'SELECTED',
                    'PLACED',
                    'JOINED'
                )
            """,
            (
                campus_id,
            )
        )

        result = cursor.fetchone()

        placed_students = (
            result["placed_students"]
            if result
            else 0
        )


        # -------------------------------------------------
        # PLACEMENT RATE
        # -------------------------------------------------

        if total_students > 0:

            placement_rate = round(
                (
                    placed_students
                    / total_students
                ) * 100,
                2
            )

        else:

            placement_rate = 0


        # -------------------------------------------------
        # RECRUITING COMPANIES
        # -------------------------------------------------

        recruiting_companies = 0

        try:

            cursor.execute(
                """
                SELECT
                    COUNT(
                        DISTINCT pd.company_id
                    ) AS company_count

                FROM placement_drives pd

                INNER JOIN placement_applications pa
                    ON pd.drive_id =
                       pa.drive_id

                INNER JOIN students s
                    ON pa.student_id =
                       s.student_id

                WHERE
                    s.campus_id = %s
                """,
                (
                    campus_id,
                )
            )

            result = cursor.fetchone()

            recruiting_companies = (
                result["company_count"]
                if result
                else 0
            )

        except Exception as error:

            print(
                "RECRUITING COMPANY ERROR:",
                error
            )


        # -------------------------------------------------
        # DEBUG
        # -------------------------------------------------

        print(
            "===================================="
        )

        print(
            "TPO PLACEMENT OVERVIEW"
        )

        print(
            "CAMPUS:",
            campus_id
        )

        print(
            "TOTAL STUDENTS:",
            total_students
        )

        print(
            "ELIGIBLE:",
            eligible_students
        )

        print(
            "PLACED:",
            placed_students
        )

        print(
            "PLACEMENT RATE:",
            placement_rate
        )

        print(
            "COMPANIES:",
            recruiting_companies
        )

        print(
            "===================================="
        )


        # -------------------------------------------------
        # RENDER
        # -------------------------------------------------

        return render_template(

            "tpo/placement_overview.html",

            campus=campus,

            total_students=total_students,

            eligible_students=eligible_students,

            placed_students=placed_students,

            placement_rate=placement_rate,

            recruiting_companies=recruiting_companies,

            average_package=0,

            highest_package=0

        )


    except Exception as error:

        print(
            "===================================="
        )

        print(
            "TPO PLACEMENT OVERVIEW ERROR:",
            error
        )

        print(
            "===================================="
        )


        return render_template(

            "tpo/placement_overview.html",

            campus=None,

            total_students=0,

            eligible_students=0,

            placed_students=0,

            placement_rate=0,

            recruiting_companies=0,

            average_package=0,

            highest_package=0,

            overview_error=str(error)

        )


    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

@app.route("/tpo/preparation")
@login_required
@role_required("5")
def tpo_preparation():
    return render_template(
        "tpo/preparation.html"
    )
# =========================================================
# TPO REPORTS
# =========================================================

@app.route("/tpo/reports")
@login_required
@role_required("5")
def tpo_reports():

    return render_template(
        "tpo/reports.html"
    )


# =========================================================
# TPO NOTIFICATIONS
# =========================================================

@app.route("/tpo/notifications")
@login_required
@role_required("5")
def tpo_notifications():

    return render_template(
        "tpo/notifications.html"
    )


# =========================================================
# TPO ANNOUNCEMENTS
# =========================================================

@app.route("/tpo/announcements")
@login_required
@role_required("5")
def tpo_announcements():

    return render_template(
        "tpo/announcements.html"
    )


# =========================================================
# TPO SETTINGS
# =========================================================

@app.route("/tpo/settings")
@login_required
@role_required("5")
def tpo_settings():

    return render_template(
        "tpo/settings.html"
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