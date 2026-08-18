from flask import Flask, render_template

app = Flask(__name__)


# =========================================================
# LOGIN PAGE
# =========================================================

@app.route("/")
def login():
    return render_template("login/login.html")


# =========================================================
# STUDENT DASHBOARD
# =========================================================

@app.route("/student/dashboard")
def student_dashboard():
    return render_template("students/dashboard.html")


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":
    app.run(debug=True)