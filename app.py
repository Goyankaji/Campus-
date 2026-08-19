from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("login/login.html")


@app.route("/student/dashboard")
def student_dashboard():
    return render_template("students/dashboard.html")


@app.route("/authority/dashboard")
def authority_dashboard():
    return render_template("authority/dashboard.html")


@app.route("/tpo/dashboard")
def tpo_dashboard():
    return render_template("tpo/dashboard.html")


@app.route("/hod/dashboard")
def hod_dashboard():
    return render_template("hod/dashboard.html")

@app.route("/admin/dashboard")
def admin_dashboard():
    return render_template("admin/dashboard.html")

@app.route("/tutor/dashboard")
def tutor_dashboard():
    return render_template("tutor/dashboard.html")
if __name__ == "__main__":
    app.run(debug=True)