from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import check_password_hash
import mysql.connector
from functools import wraps


app = Flask(__name__)

# =========================
# App Configuration
# =========================

app.secret_key = "campus-placement-secret-key"


# =========================
# Database Connection
# =========================

def get_db_connection():

    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="arpit@2467",
        database="campus_placement_manager",
        port=3306
    )

    return connection


# =========================
# Login Required
# =========================

def login_required(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):

        if "user_id" not in session:

            flash("Please login first.")

            return redirect(url_for("index"))

        return f(*args, **kwargs)

    return decorated_function


# =========================
# Role Required
# =========================

def role_required(required_role):

    def decorator(f):

        @wraps(f)
        def decorated_function(*args, **kwargs):

            # User not logged in
            if "user_id" not in session:

                flash("Please login first.")

                return redirect(url_for("index"))


            # Wrong role
            if session.get("role_id") != required_role:

                flash(
                    "You are not authorized to access this page."
                )

                return redirect(url_for("index"))


            return f(*args, **kwargs)

        return decorated_function

    return decorator


# =========================
# Login Page
# =========================

@app.route("/")
def index():

    return render_template(
        "login/login.html"
    )


# =========================
# Login Processing
# =========================

@app.route("/login", methods=["POST"])
def login():

    email = request.form.get(
        "email",
        ""
    ).strip().lower()

    password = request.form.get(
        "password",
        ""
    )


    # =========================
    # Basic Validation
    # =========================

    if not email or not password:

        flash(
            "Please enter email and password."
        )

        return redirect(
            url_for("index")
        )


    # =========================
    # Poornima Email Validation
    # =========================

    if not email.endswith(
        "@poornima.org"
    ):

        flash(
            "Only @poornima.org email addresses are allowed."
        )

        return redirect(
            url_for("index")
        )


    connection = None
    cursor = None


    try:

        # =========================
        # Connect Database
        # =========================

        connection = get_db_connection()

        cursor = connection.cursor(
            dictionary=True
        )


        # =========================
        # Find User
        # =========================

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
            """,
            (email,)
        )

        user = cursor.fetchone()


        # =========================
        # User Not Found
        # =========================

        if not user:

            flash(
                "Invalid email or password."
            )

            return redirect(
                url_for("index")
            )


        # =========================
        # Password Verification
        # =========================

        if not check_password_hash(
            user["password_hash"],
            password
        ):

            flash(
                "Invalid email or password."
            )

            return redirect(
                url_for("index")
            )


        # =========================
        # Account Status
        # =========================

        if user["account_status"] != "ACTIVE":

            flash(
                "Your account is not active yet."
            )

            return redirect(
                url_for("index")
            )


        # =========================
        # Create Session
        # =========================

        session["user_id"] = user["user_id"]

        session["username"] = user["username"]

        session["email"] = user["email"]

        session["role_id"] = user["role_id"]


        # =========================
        # Role Based Redirect
        # =========================

        if user["role_id"] == "1":

            return redirect(
                url_for("admin_dashboard")
            )


        elif user["role_id"] == "2":

            return redirect(
                url_for("student_dashboard")
            )


        elif user["role_id"] == "3":

            return redirect(
                url_for("tutor_dashboard")
            )


        elif user["role_id"] == "4":

            return redirect(
                url_for("hod_dashboard")
            )


        elif user["role_id"] == "5":

            return redirect(
                url_for("tpo_dashboard")
            )


        elif user["role_id"] == "6":

            return redirect(
                url_for("authority_dashboard")
            )


        # =========================
        # Invalid Role
        # =========================

        session.clear()

        flash(
            "Invalid user role."
        )

        return redirect(
            url_for("index")
        )


    # =========================
    # Database Error
    # =========================

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
            "Unable to connect to the database."
        )

        return redirect(
            url_for("index")
        )


    # =========================
    # Close Database
    # =========================

    finally:

        if cursor:

            cursor.close()


        if connection and connection.is_connected():

            connection.close()


# =========================
# Logout
# =========================

@app.route("/logout")
@login_required
def logout():

    session.clear()

    flash(
        "You have been logged out."
    )

    return redirect(
        url_for("index")
    )


# =========================
# Student Dashboard
# =========================

@app.route("/student/dashboard")
@login_required
@role_required("2")
def student_dashboard():

    return render_template(
        "students/dashboard.html"
    )


# =========================
# Authority Dashboard
# =========================

@app.route("/authority/dashboard")
@login_required
@role_required("6")
def authority_dashboard():

    return render_template(
        "authority/dashboard.html"
    )


# =========================
# TPO Dashboard
# =========================

@app.route("/tpo/dashboard")
@login_required
@role_required("5")
def tpo_dashboard():

    return render_template(
        "tpo/dashboard.html"
    )


# =========================
# HOD Dashboard
# =========================

@app.route("/hod/dashboard")
@login_required
@role_required("4")
def hod_dashboard():

    return render_template(
        "hod/dashboard.html"
    )


# =========================
# Admin Dashboard
# =========================

@app.route("/admin/dashboard")
@login_required
@role_required("1")
def admin_dashboard():

    return render_template(
        "admin/dashboard.html"
    )


# =========================
# Tutor Dashboard
# =========================

@app.route("/tutor/dashboard")
@login_required
@role_required("3")
def tutor_dashboard():

    return render_template(
        "tutor/dashboard.html"
    )


# =========================
# Run Application
# =========================

if __name__ == "__main__":

    app.run(
        debug=True
    )