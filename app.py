from flask import Flask, render_template

app = Flask(__name__)


# LOGIN
@app.route("/")
def login():
    return render_template("login/login.html")


# STUDENT DASHBOARD
@app.route("/student/dashboard")
def student_dashboard():
    return render_template("students/dashboard.html")


# AUTHORITY DASHBOARD
@app.route("/authority/dashboard")
def authority_dashboard():
    return render_template("authority/dashboard.html")


if __name__ == "__main__":
    app.run(debug=True)