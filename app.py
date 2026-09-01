from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash,
    jsonify
)

from werkzeug.security import (
    check_password_hash,
    generate_password_hash
)

import mysql.connector
from functools import wraps
import os


# =========================================================
# CAMPUS PLACEMENT PORTAL — FINAL COMBINED APP
# =========================================================
#
# Role IDs:
# 1 = ADMIN
# 2 = STUDENT
# 3 = MENTOR
# 4 = HOD
# 5 = TPO
# 6 = AUTHORITY
#
# This file combines:
# - Main Student / Admin / TPO / Authority application
# - HOD scoped application
# - Student community/blog moderation
#
# =========================================================


app = Flask(__name__)

app.secret_key = os.getenv(
    "CAMPUS_SECRET_KEY",
    "campus-placement-secret-key"
)


# =========================================================
# DATABASE CONFIGURATION
# =========================================================
#
# Set CAMPUS_DB_PASSWORD in your environment.
#
# Windows CMD example:
#   set CAMPUS_DB_PASSWORD=YOUR_MYSQL_PASSWORD
#
# =========================================================

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "Tonu567890@",
    "database": "campus_placement_manager",
    "port": 3306
}


# =========================================================
# DATABASE CONNECTION
# =========================================================

def get_db_connection():

    return mysql.connector.connect(
        host=DB_CONFIG["host"],
        user=DB_CONFIG["user"],
        password=DB_CONFIG["password"],
        database=DB_CONFIG["database"],
        port=DB_CONFIG["port"]
    )


# =========================================================
# AUTH HELPERS
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

            if str(
                session.get("role_id")
            ) != str(required_role):

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


def hod_required(f):

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

        if str(
            session.get("role_id")
        ) != "4":

            flash(
                "You are not authorized to access the HOD portal.",
                "error"
            )

            return redirect(
                url_for("index")
            )

        return f(*args, **kwargs)

    return decorated_function


def admin_required(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):

        if (
            session.get("admin_logged_in") is True
        ):
            return f(*args, **kwargs)

        if (
            "user_id" in session
            and
            str(session.get("role_id")) == "1"
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
# COMMON DATA
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
            "development."
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


def get_profile_completion():

    return 80


def get_authority_college():

    campus_id = session.get(
        "campus_id"
    )

    if not campus_id:

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
                campus_code,
                campus_name
            FROM campuses
            WHERE campus_id = %s
            LIMIT 1
            """,
            (campus_id,)
        )

        campus = cursor.fetchone()

        if campus:

            return {
                "code": campus["campus_code"],
                "name": campus["campus_name"]
            }

    except Exception as error:

        print(
            "AUTHORITY CAMPUS ERROR:",
            error
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

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
# HOD CONTEXT
# =========================================================

def get_hod_context():

    context = {

        "department_id": None,

        "department_name":
            "Information Technology",

        "department_code":
            "IT",

        "campus_id":
            session.get("campus_id"),

        "campus_name":
            "Poornima College of Engineering",

        "academic_year":
            "2026-27",

        "hod_name":
            session.get(
                "username",
                "HOD"
            )

    }

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        # -------------------------------------------------
        # FIRST: FACULTY RECORD
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT

                f.faculty_id,
                f.department_id,
                f.campus_id,
                f.faculty_type,
                f.designation,

                d.department_name,
                d.department_code,

                c.campus_name

            FROM faculty f

            LEFT JOIN departments d
                ON d.department_id =
                   f.department_id

            LEFT JOIN campuses c
                ON c.campus_id =
                   f.campus_id

            WHERE f.user_id = %s

            LIMIT 1
            """,
            (
                session.get("user_id"),
            )
        )

        faculty = cursor.fetchone()

        if faculty:

            context["department_id"] = \
                faculty["department_id"]

            context["campus_id"] = \
                faculty["campus_id"]

            if faculty.get(
                "department_name"
            ):
                context["department_name"] = \
                    faculty["department_name"]

            if faculty.get(
                "department_code"
            ):
                context["department_code"] = \
                    faculty["department_code"]

            if faculty.get(
                "campus_name"
            ):
                context["campus_name"] = \
                    faculty["campus_name"]

            if faculty.get(
                "designation"
            ):
                context["hod_name"] = \
                    session.get(
                        "username",
                        faculty["designation"]
                    )

            return context

        # -------------------------------------------------
        # FALLBACK: departments.hod_user_id
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT

                d.department_id,
                d.department_name,
                d.department_code,
                d.campus_id,

                c.campus_name

            FROM departments d

            LEFT JOIN campuses c
                ON c.campus_id =
                   d.campus_id

            WHERE d.hod_user_id = %s

            LIMIT 1
            """,
            (
                session.get("user_id"),
            )
        )

        department = cursor.fetchone()

        if department:

            context["department_id"] = \
                department["department_id"]

            context["campus_id"] = \
                department["campus_id"]

            context["department_name"] = \
                department["department_name"]

            context["department_code"] = \
                department["department_code"]

            if department.get(
                "campus_name"
            ):
                context["campus_name"] = \
                    department["campus_name"]

    except Exception as error:

        print(
            "HOD CONTEXT ERROR:",
            error
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

    return context


# =========================================================
# LOGIN PAGE
# =========================================================

@app.route("/")
def index():

    return render_template(
        "login/login.html"
    )


# =========================================================
# LOGIN
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

        if str(
            user["account_status"]
        ).upper() != "ACTIVE":

            flash(
                "Your account is not active yet.",
                "error"
            )

            return redirect(
                url_for("index")
            )

        session.clear()

        session["user_id"] = \
            user["user_id"]

        session["username"] = \
            user["username"]

        session["email"] = \
            user["email"]

        session["role_id"] = \
            user["role_id"]

        session["campus_id"] = \
            user["campus_id"]

        role_id = str(
            user["role_id"]
        )

        role_names = {
            "1": "ADMIN",
            "2": "STUDENT",
            "3": "MENTOR",
            "4": "HOD",
            "5": "TPO",
            "6": "AUTHORITY"
        }

        session["role_name"] = \
            role_names.get(
                role_id,
                ""
            )

        if role_id == "1":
            return redirect(
                url_for("admin_dashboard")
            )

        if role_id == "2":
            return redirect(
                url_for("student_dashboard")
            )

        if role_id == "3":
            return redirect(
                url_for("mentor_dashboard")
            )

        if role_id == "4":
            return redirect(
                url_for("hod_dashboard")
            )

        if role_id == "5":
            return redirect(
                url_for("tpo_dashboard")
            )

        if role_id == "6":

            college = \
                get_authority_college()

            session["college_code"] = \
                college["code"]

            session["college_name"] = \
                college["name"]

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
            "DATABASE ERROR:",
            error
        )

        flash(
            "Unable to connect to the database.",
            "error"
        )

        return redirect(
            url_for("index")
        )

    except Exception as error:

        print(
            "LOGIN ERROR:",
            error
        )

        flash(
            "Something went wrong while logging in.",
            "error"
        )

        return redirect(
            url_for("index")
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# TEST LOGINS
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


@app.route("/authority/test-login")
def authority_test_login():

    session.clear()

    session["user_id"] = "AUTHORITY-TEST"
    session["username"] = "College Authority"
    session["email"] = "authority@poornima.org"
    session["role_id"] = 6
    session["role_name"] = "AUTHORITY"
    session["college_code"] = "PCE"
    session["college_name"] = \
        "Poornima College of Engineering"

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
# STUDENT ROUTES
# =========================================================

def render_student_page(template):

    student = get_student_data()

    return render_template(
        template,
        student=student,
        profile_completion=
            get_profile_completion()
    )


@app.route("/student/dashboard")
@login_required
@role_required("2")
def student_dashboard():

    return render_student_page(
        "students/dashboard.html"
    )


@app.route("/student/profile")
@login_required
@role_required("2")
def student_profile():

    return render_student_page(
        "students/profile.html"
    )


@app.route("/student/academics")
@login_required
@role_required("2")
def student_academics():

    return render_student_page(
        "students/academics.html"
    )


@app.route("/student/placement-drives")
@login_required
@role_required("2")
def placement_drives():

    return render_student_page(
        "students/placement_drives.html"
    )


@app.route("/student/applications")
@login_required
@role_required("2")
def student_applications():

    return render_student_page(
        "students/applications.html"
    )


@app.route("/student/interviews")
@login_required
@role_required("2")
def student_interviews():

    return render_student_page(
        "students/interviews.html"
    )


@app.route("/student/preparation")
@login_required
@role_required("2")
def student_preparation():

    return render_student_page(
        "students/preparation.html"
    )


@app.route("/student/noc")
@login_required
@role_required("2")
def student_noc():

    return render_student_page(
        "students/noc.html"
    )


@app.route("/student/my-uploads")
@login_required
@role_required("2")
def student_my_uploads():

    return render_student_page(
        "students/my_uploads.html"
    )


@app.route("/student/announcements")
@login_required
@role_required("2")
def student_announcements():

    return render_student_page(
        "students/announcements.html"
    )


@app.route("/student/settings")
@login_required
@role_required("2")
def student_settings():

    return render_student_page(
        "students/settings.html"
    )


@app.route("/student/offers-joining")
@login_required
@role_required("2")
def student_offers_joining():

    return render_student_page(
        "students/offers_joining.html"
    )


@app.route(
    "/student/help",
    methods=["GET", "POST"]
)
@login_required
@role_required("2")
def student_help():

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

            return render_student_page(
                "students/help.html"
            )

        if not subject:

            flash(
                "Please enter a subject.",
                "error"
            )

            return render_student_page(
                "students/help.html"
            )

        if not description:

            flash(
                "Please describe your issue.",
                "error"
            )

            return render_student_page(
                "students/help.html"
            )

        print(
            "STUDENT COMPLAINT:",
            {
                "category": category,
                "subject": subject,
                "description": description
            }
        )

        flash(
            "Your complaint has been submitted successfully.",
            "success"
        )

        return redirect(
            url_for("student_help")
        )

    return render_student_page(
        "students/help.html"
    )


@app.route("/student/discussion")
@login_required
@role_required("2")
def student_discussion():

    return render_student_page(
        "students/discussion.html"
    )


@app.route(
    "/student/preparation/pyq/<company>"
)
@login_required
@role_required("2")
def student_pyq(company):

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
        student=get_student_data(),
        profile_completion=
            get_profile_completion(),
        pyq=pyq
    )


# =========================================================
# STUDENT COMMUNITY TABLES
# =========================================================

def ensure_community_tables():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor()

        cursor.execute(
            """
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
            """
        )

        cursor.execute(
            """
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
            """
        )

        cursor.execute(
            """
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
            """
        )

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

        if user_id:

            conditions.append(
                """
                (
                    p.status = 'APPROVED'
                    OR p.user_id = %s
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

        if search:

            conditions.append(
                """
                (
                    p.title LIKE %s
                    OR p.content LIKE %s
                    OR COALESCE(p.tags, '') LIKE %s
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
                ON l.post_id = p.post_id

            LEFT JOIN (
                SELECT
                    post_id,
                    COUNT(*) AS comment_count
                FROM student_post_comments
                WHERE status = 'APPROVED'
                GROUP BY post_id
            ) c
                ON c.post_id = p.post_id

            LEFT JOIN student_post_likes ul
                ON ul.post_id = p.post_id
                AND ul.user_id = %s

            WHERE {where_sql}

            ORDER BY p.created_at DESC
            """,
            tuple(
                [current_user_id] +
                params
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

    return render_template(
        "students/blog.html",
        student=get_student_data(),
        profile_completion=
            get_profile_completion(),
        posts=get_community_posts(
            user_id=session.get("user_id"),
            category=category,
            search=search
        ),
        active_category=category,
        search=search
    )


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

    if post_type not in (
        "QUESTION",
        "DISCUSSION",
        "INFORMATION"
    ):

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
                    session.get("user_id")
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


@app.route(
    "/student/blog/<int:post_id>"
)
@login_required
@role_required("2")
def student_blog_detail(post_id):

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

                p.*,

                COALESCE(
                    (
                        SELECT COUNT(*)
                        FROM student_post_likes l
                        WHERE l.post_id = p.post_id
                    ),
                    0
                ) AS like_count

            FROM student_posts p

            WHERE

                p.post_id = %s

                AND

                (
                    p.status = 'APPROVED'
                    OR p.user_id = %s
                )

            LIMIT 1
            """,
            (
                post_id,
                str(
                    session.get("user_id")
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
                AND status = 'APPROVED'
            ORDER BY created_at ASC
            """,
            (post_id,)
        )

        comments = cursor.fetchall()

        return render_template(
            "students/blog_detail.html",
            student=get_student_data(),
            profile_completion=
                get_profile_completion(),
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


@app.route(
    "/student/blog/<int:post_id>/comment",
    methods=["POST"]
)
@login_required
@role_required("2")
def student_blog_comment(post_id):

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
                AND status = 'APPROVED'
            LIMIT 1
            """,
            (post_id,)
        )

        if not cursor.fetchone():

            flash(
                "This discussion is not available.",
                "error"
            )

            return redirect(
                url_for("student_blog")
            )

        cursor.execute(
            """
            INSERT INTO student_post_comments
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
                    session.get("user_id")
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


@app.route(
    "/student/blog/<int:post_id>/like",
    methods=["POST"]
)
@login_required
@role_required("2")
def student_blog_like(post_id):

    ensure_community_tables()

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        user_id = str(
            session.get("user_id")
        )

        cursor.execute(
            """
            SELECT like_id
            FROM student_post_likes
            WHERE
                post_id = %s
                AND user_id = %s
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
                WHERE like_id = %s
                """,
                (
                    existing["like_id"],
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
                    AND status = 'APPROVED'
                LIMIT 1
                """,
                (post_id,)
            )

            if not cursor.fetchone():

                return {
                    "success": False,
                    "message": "Post unavailable."
                }, 404

            cursor.execute(
                """
                INSERT INTO student_post_likes
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
            WHERE post_id = %s
            """,
            (post_id,)
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
            "message": "Unable to update like."
        }, 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


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

    if post_type not in (
        "QUESTION",
        "DISCUSSION",
        "INFORMATION"
    ):

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

    if not title or not content:

        flash(
            "Title and content are required.",
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
            session.get("user_id")
        )

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
                AND user_id = %s
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
                "You are not allowed to edit this post.",
                "error"
            )

            return redirect(
                url_for("student_blog")
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

        cursor = connection.cursor()

        cursor.execute(
            """
            DELETE FROM student_posts
            WHERE
                post_id = %s
                AND user_id = %s
            """,
            (
                post_id,
                str(
                    session.get("user_id")
                )
            )
        )

        if cursor.rowcount != 1:

            connection.rollback()

            flash(
                "You are not allowed to delete this post.",
                "error"
            )

            return redirect(
                url_for("student_blog")
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
        url_for("student_blog")
    )


# =========================================================
# ADMIN COMMUNITY MODERATION
# =========================================================

@app.route("/admin/community")
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
                SELECT *
                FROM student_posts
                ORDER BY
                    CASE status
                        WHEN 'PENDING' THEN 1
                        WHEN 'APPROVED' THEN 2
                        ELSE 3
                    END,
                    created_at DESC
                """
            )

        else:

            cursor.execute(
                """
                SELECT *
                FROM student_posts
                WHERE status = %s
                ORDER BY created_at DESC
                """,
                (status,)
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

        stats = cursor.fetchone() or {}

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


@app.route(
    "/admin/community/<int:post_id>/review",
    methods=["POST"]
)
@admin_required
def admin_community_review(post_id):

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
            url_for("admin_community")
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
            url_for("admin_community")
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
                    status = 'APPROVED',
                    rejection_reason = NULL,
                    reviewed_at = CURRENT_TIMESTAMP,
                    reviewed_by = %s
                WHERE post_id = %s
                """,
                (
                    reviewer,
                    post_id
                )
            )

            message = \
                "Post approved successfully."

        else:

            cursor.execute(
                """
                UPDATE student_posts
                SET
                    status = 'REJECTED',
                    rejection_reason = %s,
                    reviewed_at = CURRENT_TIMESTAMP,
                    reviewed_by = %s
                WHERE post_id = %s
                """,
                (
                    rejection_reason,
                    reviewer,
                    post_id
                )
            )

            message = "Post rejected."

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
        url_for("admin_community")
    )


# =========================================================
# AUTHORITY ROUTES
# =========================================================

def render_authority_page(template):

    return render_template(
        template,
        college=get_authority_college()
    )


@app.route("/authority/dashboard")
@login_required
@role_required("6")
def authority_dashboard():

    return render_authority_page(
        "authority/dashboard.html"
    )


@app.route("/authority/placement-overview")
@login_required
@role_required("6")
def authority_placement_overview():

    return render_authority_page(
        "authority/placement_overview.html"
    )


@app.route("/authority/companies")
@login_required
@role_required("6")
def authority_companies():

    return render_authority_page(
        "authority/companies.html"
    )


@app.route("/authority/placement-drives")
@login_required
@role_required("6")
def authority_placement_drives():

    return render_authority_page(
        "authority/placement_drives.html"
    )


@app.route("/authority/placement-pipeline")
@login_required
@role_required("6")
def authority_placement_pipeline():

    return render_authority_page(
        "authority/placement_pipeline.html"
    )


@app.route("/authority/analytics/branch-reports")
@login_required
@role_required("6")
def authority_branch_reports():

    return render_authority_page(
        "authority/analytics/branch_reports.html"
    )


@app.route("/authority/analytics/placement-reports")
@login_required
@role_required("6")
def authority_placement_reports():

    return render_authority_page(
        "authority/analytics/placement_reports.html"
    )


@app.route("/authority/analytics/drive-reports")
@login_required
@role_required("6")
def authority_drive_reports():

    return render_authority_page(
        "authority/analytics/drive_reports.html"
    )


@app.route("/authority/analytics/company-reports")
@login_required
@role_required("6")
def authority_company_reports():

    return render_authority_page(
        "authority/analytics/company_reports.html"
    )


@app.route("/authority/off-campus")
@login_required
@role_required("6")
def authority_off_campus():

    return render_authority_page(
        "authority/off_campus.html"
    )


@app.route("/authority/pre-placed")
@login_required
@role_required("6")
def authority_pre_placed():

    return render_authority_page(
        "authority/pre_placed.html"
    )


@app.route("/authority/noc")
@login_required
@role_required("6")
def authority_noc():

    return render_authority_page(
        "authority/noc.html"
    )


@app.route("/authority/startup-ideas")
@login_required
@role_required("6")
def authority_startup_ideas():

    return render_authority_page(
        "authority/startup_ideas.html"
    )


@app.route("/authority/notifications")
@login_required
@role_required("6")
def authority_notifications():

    return render_authority_page(
        "authority/notifications.html"
    )


@app.route("/authority/announcements")
@login_required
@role_required("6")
def authority_announcements():

    return render_authority_page(
        "authority/announcements.html"
    )


@app.route("/authority/settings")
@login_required
@role_required("6")
def authority_settings():

    return render_authority_page(
        "authority/settings.html"
    )


# =========================================================
# ADMIN ROUTES
# =========================================================

@app.route("/admin/dashboard")
@admin_required
def admin_dashboard():

    return render_template(
        "admin/dashboard.html"
    )


@app.route("/admin/placement-overview")
@admin_required
def placement_overview():

    return render_template(
        "admin/placement_overview.html"
    )


@app.route("/admin/companies")
@admin_required
def admin_companies():

    return render_template(
        "admin/companies.html"
    )


@app.route("/admin/placement-drives")
@admin_required
def admin_drives():

    return render_template(
        "admin/placement_drives.html"
    )


@app.route("/admin/placements")
@admin_required
def admin_placements():

    return render_template(
        "admin/placements.html"
    )


@app.route("/admin/analytics")
@admin_required
def admin_analytics():

    return render_template(
        "admin/analytics/placement_analytics.html"
    )


@app.route("/admin/analytics/placement")
@admin_required
def admin_placement_analytics():

    return render_template(
        "admin/analytics/placement_analytics.html"
    )


@app.route("/admin/analytics/company")
@admin_required
def admin_company_analytics():

    return render_template(
        "admin/analytics/company_analytics.html"
    )


@app.route("/admin/analytics/college")
@admin_required
def admin_college_analytics():

    return render_template(
        "admin/analytics/college_analytics.html"
    )


@app.route("/admin/students")
@admin_required
def admin_students():

    return render_template(
        "admin/students.html"
    )


@app.route("/admin/off-campus")
@admin_required
def admin_off_campus():

    return render_template(
        "admin/off_campus.html"
    )


@app.route("/admin/noc")
@admin_required
def admin_noc():

    return render_template(
        "admin/noc.html"
    )


@app.route("/admin/pre-placed")
@admin_required
def admin_pre_placed():

    return render_template(
        "admin/pre_placed.html"
    )


@app.route("/admin/startup-students")
@admin_required
def admin_startup_students():

    return render_template(
        "admin/startup_students.html"
    )


@app.route("/admin/users")
@admin_required
def admin_users():

    return render_template(
        "admin/users.html"
    )


@app.route("/admin/roles")
@admin_required
def admin_roles():

    return render_template(
        "admin/roles.html"
    )


@app.route("/admin/verification")
@admin_required
def admin_verification():

    return render_template(
        "admin/verification.html"
    )


@app.route("/admin/notifications")
@admin_required
def admin_notifications():

    return render_template(
        "admin/notifications.html"
    )


@app.route("/admin/feedback")
@admin_required
def admin_feedback():

    return render_template(
        "admin/feedback.html"
    )


@app.route("/admin/announcements")
@admin_required
def admin_announcements():

    return render_template(
        "admin/announcements.html"
    )


@app.route("/admin/settings")
@admin_required
def admin_settings():

    return render_template(
        "admin/settings.html"
    )


# =========================================================
# TPO — COMMON ROUTES
# =========================================================

@app.route("/tpo/dashboard")
@login_required
@role_required("5")
def tpo_dashboard():

    return render_template(
        "tpo/dashboard.html"
    )


@app.route("/tpo/placement-drives")
@login_required
@role_required("5")
def tpo_placement_drives():

    return render_template(
        "tpo/placement_drives.html"
    )


@app.route("/tpo/applications")
@login_required
@role_required("5")
def tpo_applications():

    return render_template(
        "tpo/applications.html"
    )


@app.route("/tpo/shortlisted-students")
@login_required
@role_required("5")
def tpo_shortlisted_students():

    return render_template(
        "tpo/shortlisted_students.html"
    )


@app.route("/tpo/interviews")
@login_required
@role_required("5")
def tpo_interviews():

    return render_template(
        "tpo/interviews.html"
    )


@app.route("/tpo/offers")
@login_required
@role_required("5")
def tpo_offers():

    return render_template(
        "tpo/offers.html"
    )


@app.route("/tpo/placed-students")
@login_required
@role_required("5")
def tpo_placed_students():

    return render_template(
        "tpo/placed_students.html"
    )


@app.route("/tpo/preparation")
@login_required
@role_required("5")
def tpo_preparation():

    return render_template(
        "tpo/preparation.html"
    )


@app.route("/tpo/reports")
@login_required
@role_required("5")
def tpo_reports():

    return render_template(
        "tpo/reports.html"
    )


@app.route("/tpo/notifications")
@login_required
@role_required("5")
def tpo_notifications():

    return render_template(
        "tpo/notifications.html"
    )


@app.route("/tpo/announcements")
@login_required
@role_required("5")
def tpo_announcements():

    return render_template(
        "tpo/announcements.html"
    )


@app.route("/tpo/settings")
@login_required
@role_required("5")
def tpo_settings():

    return render_template(
        "tpo/settings.html"
    )


@app.route("/tpo/noc")
@login_required
@role_required("5")
def tpo_noc():

    return render_template(
        "tpo/noc.html"
    )


# =========================================================
# TPO STUDENTS — DATABASE CONNECTED
# =========================================================

@app.route("/tpo/students")
@login_required
@role_required("5")
def tpo_students():

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        user_id = session.get(
            "user_id"
        )

        campus_id = session.get(
            "campus_id"
        )

        if not campus_id and user_id:

            cursor.execute(
                """
                SELECT campus_id
                FROM users
                WHERE user_id = %s
                LIMIT 1
                """,
                (user_id,)
            )

            user = cursor.fetchone()

            if user:

                campus_id = \
                    user["campus_id"]

                session["campus_id"] = \
                    campus_id

        search = request.args.get(
            "search",
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
                search=search,
                selected_college="",
                selected_course=selected_course,
                selected_branch=selected_branch,
                selected_section=selected_section,
                selected_batch=selected_batch,
                selected_eligibility=selected_eligibility,
                selected_placement=selected_placement
            )

        # -------------------------------------------------
        # FILTER OPTIONS
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
            (campus_id,)
        )

        colleges = cursor.fetchall()

        cursor.execute(
            """
            SELECT
                course_id,
                course_code,
                course_name
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
            SELECT DISTINCT
                a.session_id,
                a.session_name,
                a.start_date
            FROM students s
            INNER JOIN academic_sessions a
                ON s.session_id = a.session_id
            WHERE s.campus_id = %s
            ORDER BY a.start_date DESC
            """,
            (campus_id,)
        )

        batches = cursor.fetchall()

        # -------------------------------------------------
        # STUDENT CONDITIONS
        # -------------------------------------------------

        conditions = [
            "s.campus_id = %s"
        ]

        params = [
            campus_id
        ]

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

            value = f"%{search}%"

            params.extend(
                [
                    value,
                    value,
                    value,
                    value,
                    value
                ]
            )

        if selected_course:

            conditions.append(
                "s.course_id = %s"
            )

            params.append(
                selected_course
            )

        if selected_branch:

            conditions.append(
                "s.branch_id = %s"
            )

            params.append(
                selected_branch
            )

        if selected_section:

            conditions.append(
                "s.section_id = %s"
            )

            params.append(
                selected_section
            )

        if selected_batch:

            conditions.append(
                "s.session_id = %s"
            )

            params.append(
                selected_batch
            )

        if selected_eligibility == "eligible":

            conditions.append(
                """
                s.cgpa IS NOT NULL
                AND s.backlogs IS NOT NULL
                AND s.backlogs <= 0
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
                    OR s.backlogs IS NULL
                    OR s.backlogs > 0
                )
                """
            )

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
                    AND UPPER(
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
                    AND UPPER(
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

        where_clause = " AND ".join(
            conditions
        )

        # -------------------------------------------------
        # STUDENTS
        # -------------------------------------------------

        cursor.execute(
            f"""
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
                ON s.campus_id = c.campus_id

            LEFT JOIN courses co
                ON s.course_id = co.course_id

            LEFT JOIN branches b
                ON s.branch_id = b.branch_id

            LEFT JOIN sections sec
                ON s.section_id = sec.section_id

            LEFT JOIN academic_sessions a
                ON s.session_id = a.session_id

            WHERE {where_clause}

            ORDER BY s.created_at DESC
            """,
            tuple(params)
        )

        students = cursor.fetchall()

        # -------------------------------------------------
        # STATS
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT

                COUNT(*) AS total_students,

                COALESCE(
                    SUM(
                        CASE
                            WHEN
                                cgpa IS NOT NULL
                                AND backlogs IS NOT NULL
                                AND backlogs <= 0
                            THEN 1
                            ELSE 0
                        END
                    ),
                    0
                ) AS eligible_students

            FROM students

            WHERE campus_id = %s
            """,
            (campus_id,)
        )

        stats = cursor.fetchone() or {}

        total_students = \
            stats.get(
                "total_students",
                0
            )

        eligible_students = \
            stats.get(
                "eligible_students",
                0
            )

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
            AND UPPER(
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

        placed_result = \
            cursor.fetchone() or {}

        placed_students = \
            placed_result.get(
                "placed_students",
                0
            )

        placement_percentage = (

            round(
                (
                    placed_students /
                    total_students
                ) * 100,
                2
            )

            if total_students
            else 0
        )

        return render_template(
            "tpo/students.html",

            students=students,

            total_students=
                total_students,

            eligible_students=
                eligible_students,

            placed_students=
                placed_students,

            placement_percentage=
                placement_percentage,

            colleges=colleges,
            courses=courses,
            branches=branches,
            sections=sections,
            batches=batches,

            search=search,

            selected_college="",
            selected_course=
                selected_course,

            selected_branch=
                selected_branch,

            selected_section=
                selected_section,

            selected_batch=
                selected_batch,

            selected_eligibility=
                selected_eligibility,

            selected_placement=
                selected_placement
        )

    except Exception as error:

        print(
            "TPO STUDENTS ERROR:",
            error
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
        ), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# TPO STUDENT OPTIONS
# =========================================================

@app.route("/tpo/student/options")
@login_required
@role_required("5")
def tpo_student_options():

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

                campus_id = \
                    user["campus_id"]

                session["campus_id"] = \
                    campus_id

        if not campus_id:

            return {
                "success": False,
                "message":
                    "TPO campus is not configured."
            }, 400

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
            (campus_id,)
        )

        campus = cursor.fetchone()

        cursor.execute(
            """
            SELECT
                course_id,
                course_code,
                course_name
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

        print(
            "TPO STUDENT OPTIONS ERROR:",
            error
        )

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
# TPO ADD STUDENT
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

        cursor = connection.cursor(
            dictionary=True
        )

        tpo_user_id = session.get(
            "user_id"
        )

        campus_id = session.get(
            "campus_id"
        )

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

            tpo_user = \
                cursor.fetchone()

            if tpo_user:

                campus_id = \
                    tpo_user["campus_id"]

                session["campus_id"] = \
                    campus_id

        if not campus_id:

            return {
                "success": False,
                "message":
                    "TPO campus is not configured."
            }, 400

        # -------------------------------------------------
        # FORM DATA
        # -------------------------------------------------

        registration_no = request.form.get(
            "registration_no",
            ""
        ).strip()

        enrollment_no = request.form.get(
            "enrollment_no",
            ""
        ).strip()

        first_name = request.form.get(
            "first_name",
            ""
        ).strip()

        middle_name = request.form.get(
            "middle_name",
            ""
        ).strip()

        last_name = request.form.get(
            "last_name",
            ""
        ).strip()

        email = request.form.get(
            "email",
            ""
        ).strip().lower()

        phone = request.form.get(
            "phone",
            ""
        ).strip()

        date_of_birth = request.form.get(
            "date_of_birth",
            ""
        ).strip() or None

        gender = request.form.get(
            "gender",
            ""
        ).strip() or None

        address = request.form.get(
            "address",
            ""
        ).strip()

        city = request.form.get(
            "city",
            ""
        ).strip()

        state = request.form.get(
            "state",
            ""
        ).strip()

        course_id = request.form.get(
            "course_id",
            ""
        ).strip()

        branch_id = request.form.get(
            "branch_id",
            ""
        ).strip()

        section_id = request.form.get(
            "section_id",
            ""
        ).strip()

        session_id = request.form.get(
            "session_id",
            ""
        ).strip()

        tenth_percentage = request.form.get(
            "tenth_percentage",
            ""
        ).strip() or None

        twelfth_percentage = request.form.get(
            "twelfth_percentage",
            ""
        ).strip() or None

        cgpa = request.form.get(
            "cgpa",
            ""
        ).strip() or None

        backlogs = request.form.get(
            "backlogs",
            "0"
        ).strip() or "0"

        password = request.form.get(
            "password",
            ""
        ).strip()

        if not password:

            password = registration_no

        required = {

            "registration_no":
                registration_no,

            "enrollment_no":
                enrollment_no,

            "first_name":
                first_name,

            "email":
                email,

            "course_id":
                course_id,

            "branch_id":
                branch_id,

            "section_id":
                section_id,

            "session_id":
                session_id

        }

        missing = [

            field

            for field, value
            in required.items()

            if not value

        ]

        if missing:

            return {
                "success": False,
                "message":
                    "Please fill required fields: "
                    + ", ".join(missing)
            }, 400

        # -------------------------------------------------
        # RELATION VALIDATION
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT course_id
            FROM courses
            WHERE
                course_id = %s
                AND campus_id = %s
            LIMIT 1
            """,
            (
                course_id,
                campus_id
            )
        )

        if not cursor.fetchone():

            return {
                "success": False,
                "message":
                    "Invalid course for this campus."
            }, 400

        cursor.execute(
            """
            SELECT b.branch_id
            FROM branches b
            INNER JOIN courses co
                ON b.course_id = co.course_id
            WHERE
                b.branch_id = %s
                AND b.course_id = %s
                AND co.campus_id = %s
            LIMIT 1
            """,
            (
                branch_id,
                course_id,
                campus_id
            )
        )

        if not cursor.fetchone():

            return {
                "success": False,
                "message":
                    "Invalid branch for selected course."
            }, 400

        cursor.execute(
            """
            SELECT sec.section_id
            FROM sections sec
            INNER JOIN branches b
                ON sec.branch_id = b.branch_id
            INNER JOIN courses co
                ON b.course_id = co.course_id
            WHERE
                sec.section_id = %s
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

        if not cursor.fetchone():

            return {
                "success": False,
                "message":
                    "Invalid section for selected branch and batch."
            }, 400

        cursor.execute(
            """
            SELECT session_id
            FROM academic_sessions
            WHERE
                session_id = %s
                AND campus_id = %s
            LIMIT 1
            """,
            (
                session_id,
                campus_id
            )
        )

        if not cursor.fetchone():

            return {
                "success": False,
                "message":
                    "Invalid batch/session for this campus."
            }, 400

        # -------------------------------------------------
        # DUPLICATES
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT user_id
            FROM users
            WHERE email = %s
            LIMIT 1
            """,
            (email,)
        )

        if cursor.fetchone():

            return {
                "success": False,
                "message":
                    "Email is already registered."
            }, 409

        cursor.execute(
            """
            SELECT student_id
            FROM students
            WHERE
                registration_no = %s
                OR enrollment_no = %s
            LIMIT 1
            """,
            (
                registration_no,
                enrollment_no
            )
        )

        if cursor.fetchone():

            return {
                "success": False,
                "message":
                    "Registration number or enrollment number already exists."
            }, 409

        # -------------------------------------------------
        # STUDENT ID
        # -------------------------------------------------

        cursor.execute(
            """
            SELECT CONCAT(
                'STU',
                LPAD(
                    COALESCE(
                        MAX(
                            CAST(
                                SUBSTRING(
                                    student_id,
                                    4
                                ) AS UNSIGNED
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

        student_id = \
            cursor.fetchone()["next_id"]

        user_id = student_id

        password_hash = \
            generate_password_hash(
                password,
                method="scrypt"
            )

        username = \
            registration_no.lower()

        # -------------------------------------------------
        # USER
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
        # STUDENT
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
            "message":
                "Student added successfully.",
            "student_id":
                student_id,
            "user_id":
                user_id,
            "registration_no":
                registration_no,
            "default_password":
                password
        }, 201

    except mysql.connector.IntegrityError as error:

        if connection:
            connection.rollback()

        print(
            "TPO ADD STUDENT INTEGRITY ERROR:",
            error
        )

        return {
            "success": False,
            "message":
                "Duplicate or invalid student data.",
            "error":
                str(error)
        }, 409

    except Exception as error:

        if connection:
            connection.rollback()

        print(
            "TPO ADD STUDENT ERROR:",
            error
        )

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
# TPO STUDENT DETAIL
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

        cursor.execute(
            """
            SELECT

                s.*,

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
                AND s.campus_id = %s

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

            placements = \
                cursor.fetchall()

        except Exception as error:

            print(
                "PLACEMENT DETAILS ERROR:",
                error
            )

        return render_template(
            "tpo/student_detail.html",
            student=student,
            placements=placements,
            registration_no=registration_no
        )

    except Exception as error:

        print(
            "TPO STUDENT DETAIL ERROR:",
            error
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

                campus_id = \
                    user["campus_id"]

                session["campus_id"] = \
                    campus_id

        if not campus_id:

            return render_template(
                "tpo/companies.html",
                companies=[],
                total_companies=0,
                active_companies=0,
                placement_drives=0,
                offers_generated=0,
                industries=[],
                db_error=
                    "TPO campus is not configured."
            )

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
                    MAX(pd.package_lpa),
                    0
                ) AS package_lpa

            FROM companies co

            INNER JOIN placement_drives pd
                ON pd.company_id =
                   co.company_id
                AND pd.campus_id =
                    %s

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
                co.company_name
            """,
            (campus_id,)
        )

        companies = cursor.fetchall()

        total_companies = len(
            companies
        )

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

        cursor.execute(
            """
            SELECT COUNT(*) AS total
            FROM placement_drives
            WHERE campus_id = %s
            """,
            (campus_id,)
        )

        placement_drives = (
            cursor.fetchone() or {}
        ).get(
            "total",
            0
        )

        cursor.execute(
            """
            SELECT COUNT(
                DISTINCT pl.placement_id
            ) AS total

            FROM placements pl

            INNER JOIN placement_drives pd
                ON pd.drive_id =
                   pl.drive_id

            WHERE
                pd.campus_id = %s
            AND UPPER(
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
            (campus_id,)
        )

        offers_generated = (
            cursor.fetchone() or {}
        ).get(
            "total",
            0
        )

        cursor.execute(
            """
            SELECT DISTINCT
                industry
            FROM companies
            WHERE
                industry IS NOT NULL
                AND TRIM(industry) <> ''
            ORDER BY industry
            """
        )

        industries = cursor.fetchall()

        return render_template(
            "tpo/companies.html",

            companies=companies,

            total_companies=
                total_companies,

            active_companies=
                active_companies,

            placement_drives=
                placement_drives,

            offers_generated=
                offers_generated,

            industries=industries,

            campus_id=campus_id
        )

    except Exception as error:

        print(
            "TPO COMPANIES ERROR:",
            error
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
        ), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# TPO PLACEMENT OVERVIEW
# =========================================================

@app.route("/tpo/placement-overview")
@login_required
@role_required("5")
def tpo_placement_overview():

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

                campus_id = \
                    user["campus_id"]

                session["campus_id"] = \
                    campus_id

        if not campus_id:

            return render_template(
                "tpo/placement_overview.html",
                campus=None,
                total_students=0,
                eligible_students=0,
                placed_students=0,
                placement_rate=0,
                recruiting_companies=0,
                average_package=0,
                highest_package=0
            )

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
            (campus_id,)
        )

        campus = cursor.fetchone()

        cursor.execute(
            """
            SELECT COUNT(*) AS total_students
            FROM students
            WHERE campus_id = %s
            """,
            (campus_id,)
        )

        total_students = (
            cursor.fetchone() or {}
        ).get(
            "total_students",
            0
        )

        cursor.execute(
            """
            SELECT COUNT(*) AS eligible_students
            FROM students
            WHERE
                campus_id = %s
                AND cgpa IS NOT NULL
                AND backlogs IS NOT NULL
                AND backlogs <= 0
            """,
            (campus_id,)
        )

        eligible_students = (
            cursor.fetchone() or {}
        ).get(
            "eligible_students",
            0
        )

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

            AND UPPER(
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

        placed_students = (
            cursor.fetchone() or {}
        ).get(
            "placed_students",
            0
        )

        placement_rate = (

            round(
                (
                    placed_students /
                    total_students
                ) * 100,
                2
            )

            if total_students
            else 0
        )

        cursor.execute(
            """
            SELECT COUNT(
                DISTINCT pd.company_id
            ) AS company_count

            FROM placement_drives pd

            INNER JOIN placement_applications pa
                ON pd.drive_id =
                   pa.drive_id

            INNER JOIN students s
                ON pa.student_id =
                   s.student_id

            WHERE s.campus_id = %s
            """,
            (campus_id,)
        )

        recruiting_companies = (
            cursor.fetchone() or {}
        ).get(
            "company_count",
            0
        )

        return render_template(
            "tpo/placement_overview.html",

            campus=campus,

            total_students=
                total_students,

            eligible_students=
                eligible_students,

            placed_students=
                placed_students,

            placement_rate=
                placement_rate,

            recruiting_companies=
                recruiting_companies,

            average_package=0,
            highest_package=0
        )

    except Exception as error:

        print(
            "TPO PLACEMENT OVERVIEW ERROR:",
            error
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
        ), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# =========================================================
# HOD ROUTES
# =========================================================

@app.route("/hod/dashboard")
@login_required
@hod_required
def hod_dashboard():

    context = get_hod_context()

    return render_template(
        "hod/dashboard.html",
        **context
    )


@app.route("/hod/students")
@login_required
@hod_required
def hod_students():

    context = get_hod_context()

    return render_template(
        "hod/students.html",
        **context
    )


@app.route(
    "/hod/students/<student_id>"
)
@login_required
@hod_required
def hod_student_detail(student_id):

    context = get_hod_context()

    connection = None
    cursor = None
    student = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )

        # HOD can only open students
        # belonging to the HOD department.

        cursor.execute(
            """
            SELECT

                s.*,

                c.course_name,
                b.branch_name,
                sec.section_name,
                a.session_name

            FROM students s

            LEFT JOIN courses c
                ON c.course_id =
                   s.course_id

            LEFT JOIN branches b
                ON b.branch_id =
                   s.branch_id

            LEFT JOIN sections sec
                ON sec.section_id =
                   s.section_id

            LEFT JOIN academic_sessions a
                ON a.session_id =
                   s.session_id

            WHERE

                s.student_id = %s

                AND

                s.department_id = %s

            LIMIT 1
            """,
            (
                student_id,
                context["department_id"]
            )
        )

        student = cursor.fetchone()

    except Exception as error:

        print(
            "HOD STUDENT DETAIL ERROR:",
            error
        )

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()

    if not student:

        flash(
            "Student not found in your department.",
            "error"
        )

        return redirect(
            url_for("hod_students")
        )

    return render_template(
        "hod/student_detail.html",
        student=student,
        **context
    )


@app.route("/hod/placement-drives")
@login_required
@hod_required
def hod_placement_drives():

    return render_template(
        "hod/placement_drives.html",
        **get_hod_context()
    )


@app.route("/hod/applications")
@login_required
@hod_required
def hod_applications():

    return render_template(
        "hod/applications.html",
        **get_hod_context()
    )


@app.route("/hod/shortlisted-students")
@login_required
@hod_required
def hod_shortlisted_students():

    return render_template(
        "hod/shortlisted_students.html",
        **get_hod_context()
    )


@app.route("/hod/offers-joining")
@login_required
@hod_required
def hod_offers_joining():

    return render_template(
        "hod/offers_joining.html",
        **get_hod_context()
    )


@app.route("/hod/placed-students")
@login_required
@hod_required
def hod_placed_students():

    return render_template(
        "hod/placed_students.html",
        **get_hod_context()
    )


@app.route("/hod/placement-statistics")
@login_required
@hod_required
def hod_placement_statistics():

    return render_template(
        "hod/placement_statistics.html",
        **get_hod_context()
    )


@app.route("/hod/reports")
@login_required
@hod_required
def hod_reports():

    return render_template(
        "hod/reports.html",
        **get_hod_context()
    )


@app.route("/hod/notifications")
@login_required
@hod_required
def hod_notifications():

    return render_template(
        "hod/notifications.html",
        **get_hod_context()
    )


@app.route("/hod/announcements")
@login_required
@hod_required
def hod_announcements():

    return render_template(
        "hod/announcements.html",
        **get_hod_context()
    )


@app.route("/hod/feedback")
@login_required
@hod_required
def hod_feedback():

    return render_template(
        "hod/feedback.html",
        **get_hod_context()
    )


@app.route("/hod/settings")
@login_required
@hod_required
def hod_settings():

    return render_template(
        "hod/settings.html",
        **get_hod_context()
    )


@app.route("/hod/api/context")
@login_required
@hod_required
def hod_context_api():

    context = get_hod_context()

    return jsonify(
        {
            "success": True,

            "department": {
                "id":
                    context["department_id"],

                "code":
                    context["department_code"],

                "name":
                    context["department_name"]
            },

            "campus": {
                "id":
                    context["campus_id"],

                "name":
                    context["campus_name"]
            },

            "academic_year":
                context["academic_year"],

            "hod_name":
                context["hod_name"]
        }
    )


# =========================================================
# =========================================================
# MENTOR
# =========================================================
# =========================================================


# =========================================================
# MENTOR BRANCH SCOPE
# =========================================================

def get_mentor_scope():

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

                f.faculty_id,
                f.user_id,
                f.employee_id,
                f.campus_id,
                f.branch_id,

                f.faculty_type,
                f.designation,
                f.status,

                b.branch_code,
                b.branch_name,

                co.course_id,
                co.course_code,
                co.course_name

            FROM faculty f

            INNER JOIN branches b
                ON f.branch_id = b.branch_id

            INNER JOIN courses co
                ON b.course_id = co.course_id

            WHERE

                f.user_id = %s

                AND f.faculty_type = 'MENTOR'

                AND f.status = 'ACTIVE'

                AND b.status = 'ACTIVE'

            LIMIT 1
            """,
            (
                session.get("user_id"),
            )
        )

        mentor = cursor.fetchone()

        return mentor

    except Exception as error:

        print(
            "MENTOR SCOPE ERROR:",
            error
        )

        return None

    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =========================================================
# MENTOR DASHBOARD
# =========================================================

@app.route("/mentor/dashboard")
@login_required
@role_required("3")
def mentor_dashboard():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
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


        # =================================================
        # TOTAL STUDENTS
        # =================================================

        cursor.execute(
            """
            SELECT
                COUNT(*) AS total_students
            FROM students
            WHERE
                campus_id = %s
                AND branch_id = %s
            """,
            (
                mentor["campus_id"],
                mentor["branch_id"]
            )
        )

        result = cursor.fetchone()

        total_students = (
            result["total_students"]
            if result
            else 0
        )


        # =================================================
        # ACTIVE STUDENTS
        # =================================================

        cursor.execute(
            """
            SELECT
                COUNT(*) AS active_students
            FROM students
            WHERE
                campus_id = %s
                AND branch_id = %s
                AND UPPER(
                    COALESCE(status, '')
                ) = 'ACTIVE'
            """,
            (
                mentor["campus_id"],
                mentor["branch_id"]
            )
        )

        result = cursor.fetchone()

        active_students = (
            result["active_students"]
            if result
            else 0
        )


        # =================================================
        # PLACEMENT READY STUDENTS
        # =================================================
        # Current project rule:
        # CGPA >= 6 and no backlogs
        # =================================================

        cursor.execute(
            """
            SELECT
                COUNT(*) AS placement_ready
            FROM students
            WHERE
                campus_id = %s
                AND branch_id = %s

                AND UPPER(
                    COALESCE(status, '')
                ) = 'ACTIVE'

                AND cgpa IS NOT NULL
                AND cgpa >= 6

                AND COALESCE(backlogs, 0) = 0
            """,
            (
                mentor["campus_id"],
                mentor["branch_id"]
            )
        )

        result = cursor.fetchone()

        placement_ready = (
            result["placement_ready"]
            if result
            else 0
        )


        # =================================================
        # STUDENTS WITH BACKLOGS
        # =================================================

        cursor.execute(
            """
            SELECT
                COUNT(*) AS backlog_students
            FROM students
            WHERE
                campus_id = %s
                AND branch_id = %s
                AND COALESCE(backlogs, 0) > 0
            """,
            (
                mentor["campus_id"],
                mentor["branch_id"]
            )
        )

        result = cursor.fetchone()

        backlog_students = (
            result["backlog_students"]
            if result
            else 0
        )


        # =================================================
        # PLACED STUDENTS
        # =================================================

        placed_students = 0

        try:

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

                    AND s.branch_id = %s

                    AND UPPER(
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
                    mentor["campus_id"],
                    mentor["branch_id"]
                )
            )

            result = cursor.fetchone()

            placed_students = (
                result["placed_students"]
                if result
                else 0
            )

        except Exception as placement_error:

            print(
                "MENTOR PLACED STUDENTS ERROR:",
                placement_error
            )

            placed_students = 0


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
        # RECENT STUDENTS
        # =================================================

        cursor.execute(
            """
            SELECT

                s.student_id,
                s.registration_no,
                s.enrollment_no,

                s.first_name,
                s.middle_name,
                s.last_name,

                s.email,

                s.cgpa,
                s.backlogs,

                s.status,

                co.course_name,

                b.branch_code,
                b.branch_name,

                sec.section_name,

                a.session_name

            FROM students s

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

                s.campus_id = %s

                AND s.branch_id = %s

            ORDER BY
                s.created_at DESC

            LIMIT 5
            """,
            (
                mentor["campus_id"],
                mentor["branch_id"]
            )
        )

        recent_students = cursor.fetchall()


        # =================================================
        # DEBUG
        # =================================================

        print(
            "===================================="
        )

        print(
            "MENTOR DASHBOARD"
        )

        print(
            "MENTOR:",
            mentor["user_id"]
        )

        print(
            "CAMPUS:",
            mentor["campus_id"]
        )

        print(
            "BRANCH:",
            mentor["branch_code"]
        )

        print(
            "TOTAL STUDENTS:",
            total_students
        )

        print(
            "ACTIVE STUDENTS:",
            active_students
        )

        print(
            "PLACEMENT READY:",
            placement_ready
        )

        print(
            "BACKLOG STUDENTS:",
            backlog_students
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
        # RENDER DASHBOARD
        # =================================================

        return render_template(

            "mentor/dashboard.html",

            mentor=mentor,

            total_students=total_students,

            active_students=active_students,

            placement_ready=placement_ready,

            backlog_students=backlog_students,

            placed_students=placed_students,

            placement_percentage=
                placement_percentage,

            recent_students=
                recent_students

        )


    except Exception as error:

        print(
            "===================================="
        )

        print(
            "MENTOR DASHBOARD ERROR:",
            error
        )

        print(
            "===================================="
        )

        flash(
            "Unable to load mentor dashboard.",
            "error"
        )

        return render_template(

            "mentor/dashboard.html",

            mentor=mentor,

            total_students=0,

            active_students=0,

            placement_ready=0,

            backlog_students=0,

            placed_students=0,

            placement_percentage=0,

            recent_students=[],

            db_error=str(error)

        )


    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =========================================================
# MENTOR MY STUDENTS
# =========================================================

@app.route("/mentor/students")
@login_required
@role_required("3")
def mentor_students():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )


    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # =================================================
        # STUDENTS OF MENTOR'S BRANCH ONLY
        # =================================================

        cursor.execute(
            """
            SELECT

                s.student_id,
                s.user_id,

                s.registration_no,
                s.enrollment_no,

                s.first_name,
                s.middle_name,
                s.last_name,

                s.email,
                s.phone,

                s.cgpa,
                s.backlogs,

                s.status,

                s.course_id,
                s.branch_id,
                s.section_id,
                s.session_id,

                b.branch_code,
                b.branch_name,

                co.course_code,
                co.course_name,

                sec.section_name,

                a.session_name

            FROM students s

            LEFT JOIN branches b
                ON s.branch_id =
                   b.branch_id

            LEFT JOIN courses co
                ON s.course_id =
                   co.course_id

            LEFT JOIN sections sec
                ON s.section_id =
                   sec.section_id

            LEFT JOIN academic_sessions a
                ON s.session_id =
                   a.session_id

            WHERE

                s.campus_id = %s

                AND s.branch_id = %s

            ORDER BY

                s.first_name ASC,

                s.last_name ASC

            """,

            (
                mentor["campus_id"],
                mentor["branch_id"]
            )
        )


        students = cursor.fetchall()


        # =================================================
        # STATISTICS
        # =================================================

        total_students = len(
            students
        )

        active_students = sum(

            1

            for student in students

            if str(
                student.get(
                    "status",
                    ""
                )
            ).upper() == "ACTIVE"

        )

        placement_ready = sum(

            1

            for student in students

            if (
                str(
                    student.get(
                        "status",
                        ""
                    )
                ).upper() == "ACTIVE"

                and

                student.get("cgpa") is not None

                and

                float(
                    student.get(
                        "cgpa"
                    )
                ) >= 6

                and

                int(
                    student.get(
                        "backlogs"
                    ) or 0
                ) == 0
            )

        )

        backlog_students = sum(

            1

            for student in students

            if int(
                student.get(
                    "backlogs"
                ) or 0
            ) > 0

        )


        # =================================================
        # RENDER
        # =================================================

        return render_template(

            "mentor/students.html",

            mentor=mentor,

            students=students,

            total_students=
                total_students,

            active_students=
                active_students,

            placement_ready=
                placement_ready,

            backlog_students=
                backlog_students

        )


    except Exception as error:

        print(
            "MENTOR STUDENTS ERROR:",
            error
        )

        flash(
            "Unable to load students.",
            "error"
        )

        return render_template(

            "mentor/students.html",

            mentor=mentor,

            students=[],

            total_students=0,

            active_students=0,

            placement_ready=0,

            backlog_students=0,

            db_error=str(error)

        )


    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =========================================================
# MENTOR STUDENT DETAIL — VIEW ONLY
# =========================================================

@app.route(
    "/mentor/students/<student_id>"
)
@login_required
@role_required("3")
def mentor_student_detail(
    student_id
):

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )


    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # =================================================
        # IMPORTANT
        # =================================================
        # Student can ONLY be opened when the student
        # belongs to the mentor's campus + branch.
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

                s.student_id = %s

                AND s.campus_id = %s

                AND s.branch_id = %s

            LIMIT 1
            """,

            (
                student_id,
                mentor["campus_id"],
                mentor["branch_id"]
            )
        )


        student = cursor.fetchone()


        # =================================================
        # SECURITY
        # =================================================

        if not student:

            flash(
                "Student not found or you are not authorized to view this student.",
                "error"
            )

            return redirect(
                url_for("mentor_students")
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
                    pl.package_lpa
                        AS placed_package,

                    pl.joining_date
                        AS placed_joining_date

                FROM placement_applications pa

                INNER JOIN placement_drives pd
                    ON pa.drive_id =
                       pd.drive_id

                INNER JOIN companies co
                    ON pd.company_id =
                       co.company_id

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
                "MENTOR PLACEMENT DETAILS ERROR:",
                placement_error
            )

            placements = []


        # =================================================
        # RENDER VIEW-ONLY DETAIL
        # =================================================

        return render_template(

            "mentor/student_detail.html",

            mentor=mentor,

            student=student,

            placements=placements

        )


    except Exception as error:

        print(
            "===================================="
        )

        print(
            "MENTOR STUDENT DETAIL ERROR:",
            error
        )

        print(
            "===================================="
        )

        flash(
            "Unable to load student details.",
            "error"
        )

        return redirect(
            url_for("mentor_students")
        )


    finally:

        if cursor:
            cursor.close()

        if connection and connection.is_connected():
            connection.close()


# =========================================================
# MENTOR PLACEMENT DRIVES
# =========================================================

@app.route("/mentor/placement-drives")
@login_required
@role_required("3")
def mentor_placement_drives():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )

    return render_template(
        "mentor/placement_drives.html",
        mentor=mentor
    )


# =========================================================
# MENTOR APPLICATIONS
# =========================================================

@app.route("/mentor/applications")
@login_required
@role_required("3")
def mentor_applications():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )

    return render_template(
        "mentor/applications.html",
        mentor=mentor
    )


# =========================================================
# MENTOR SHORTLISTED STUDENTS
# =========================================================

@app.route("/mentor/shortlisted-students")
@login_required
@role_required("3")
def mentor_shortlisted_students():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )

    return render_template(
        "mentor/shortlisted_students.html",
        mentor=mentor
    )


# =========================================================
# MENTOR PLACED STUDENTS
# =========================================================

@app.route("/mentor/placed-students")
@login_required
@role_required("3")
def mentor_placed_students():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )

    return render_template(
        "mentor/placed_students.html",
        mentor=mentor
    )


# =========================================================
# MENTOR ANNOUNCEMENTS
# =========================================================

@app.route("/mentor/announcements")
@login_required
@role_required("3")
def mentor_announcements():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )

    return render_template(
        "mentor/announcements.html",
        mentor=mentor
    )


# =========================================================
# MENTOR NOTIFICATIONS
# =========================================================

@app.route("/mentor/notifications")
@login_required
@role_required("3")
def mentor_notifications():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )

    return render_template(
        "mentor/notifications.html",
        mentor=mentor
    )


# =========================================================
# MENTOR FEEDBACK
# =========================================================

@app.route("/mentor/feedback")
@login_required
@role_required("3")
def mentor_feedback():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )

    return render_template(
        "mentor/feedback.html",
        mentor=mentor
    )


# =========================================================
# MENTOR SETTINGS
# =========================================================

@app.route("/mentor/settings")
@login_required
@role_required("3")
def mentor_settings():

    mentor = get_mentor_scope()

    if not mentor:

        flash(
            "Mentor branch assignment not found.",
            "error"
        )

        return redirect(
            url_for("mentor_dashboard")
        )

    return render_template(
        "mentor/settings.html",
        mentor=mentor
    )


# =========================================================
# ERROR HANDLERS
# =========================================================

@app.errorhandler(404)
def page_not_found(error):

    return (
        render_template(
            "login/login.html"
        ),
        404
    )


@app.errorhandler(500)
def internal_server_error(error):

    print(
        "INTERNAL SERVER ERROR:",
        error
    )

    return (
        "Internal server error.",
        500
    )


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    app.run(
        debug=True
    )
