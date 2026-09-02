import mysql.connector
from werkzeug.security import generate_password_hash


# =========================
# Database Connection
# =========================

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="******",
    database="campus_placement_manager",
    port=3306
)


# =========================
# Generate Password Hash
# =========================

password = "Test@123"

password_hash = generate_password_hash(password)


# =========================
# Update All Dummy Users
# =========================

cursor = connection.cursor()

cursor.execute(
    """
    UPDATE users
    SET password_hash = %s
    WHERE user_id IN (
        'ADMIN001',
        'AUTH001',
        'FAC001',
        'HOD001',
        'STUD001',
        'TPO001'
    )
    """,
    (password_hash,)
)

connection.commit()


print("Password hashes updated successfully.")
print("All dummy users password: Test@123")


# =========================
# Close Connection
# =========================

cursor.close()
connection.close()