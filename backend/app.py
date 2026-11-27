
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import mysql.connector
import os
import uuid
from datetime import date

load_dotenv()

app = Flask(__name__)
CORS(app)


def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST"),
        port=int(os.getenv("MYSQL_PORT", "3306")),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
    )


@app.route("/")
def home():
    return jsonify({
        "message": "Matcha House API is running!"
    })


@app.route("/api/test")
def test():
    return jsonify({
        "success": True,
        "message": "Backend connection is working!"
    })


@app.route("/api/db-test")
def db_test():
    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE()")
        result = cursor.fetchone()

        return jsonify({
            "success": True,
            "database": result[0],
            "message": "MySQL connection is working!"
        })
    except mysql.connector.Error:
        app.logger.exception("Database connection test failed")
        return jsonify({
            "success": False,
            "message": "Could not connect to the database."
        }), 500
    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()


@app.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json(silent=True) or {}

    customer_name = str(data.get("customer_name", "")).strip()
    phone = str(data.get("phone", "")).strip()
    pickup_date = data.get("pickup_date")
    pickup_time = str(data.get("pickup_time", "")).strip()
    items = data.get("items")

    if not customer_name or not phone or not pickup_date or not pickup_time:
        return jsonify({
            "success": False,
            "message": "Please provide all customer and pickup details."
        }), 400

    if not phone.isdigit() or not 10 <= len(phone) <= 15:
        return jsonify({
            "success": False,
            "message": "Enter a valid phone number."
        }), 400

    try:
        parsed_date = date.fromisoformat(pickup_date)
        if parsed_date < date.today():
            return jsonify({
                "success": False,
                "message": "Pickup date cannot be in the past."
            }), 400
    except (TypeError, ValueError):
        return jsonify({
            "success": False,
            "message": "Pickup date must be a valid date."
        }), 400

    allowed_times = {
        "11:00 AM", "11:30 AM", "12:00 PM",
        "12:30 PM", "1:00 PM", "1:30 PM",
        "2:00 PM", "2:30 PM", "3:00 PM"
    }

    if pickup_time not in allowed_times:
        return jsonify({
            "success": False,
            "message": "Please select a valid pickup time."
        }), 400

    if not isinstance(items, list) or not items:
        return jsonify({
            "success": False,
            "message": "Your cart is empty."
        }), 400

    # Validate items and calculate prices on the server.
    # Never trust prices or totals sent by the browser.
    menu = {
        1: ("Chicken Burger", 120.00),
        2: ("Paneer Burger", 110.00),
        3: ("Margherita Pizza", 150.00),
        4: ("Veg Hakka Noodles", 100.00),
        5: ("Chicken Wrap", 130.00),
        6: ("Chicken Rice Bowl", 140.00),
        7: ("Matcha Latte", 90.00),
        8: ("Strawberry Matcha", 110.00),
    }

    validated_items = []
    total_amount = 0

    try:
        for item in items:
            food_id = int(item.get("id"))
            quantity = int(item.get("quantity"))

            if food_id not in menu or not 1 <= quantity <= 50:
                raise ValueError

            food_name, price = menu[food_id]
            validated_items.append((food_id, food_name, quantity, price))
            total_amount += price * quantity

    except (TypeError, ValueError, AttributeError):
        return jsonify({
            "success": False,
            "message": "The cart contains invalid items."
        }), 400

    connection = None
    cursor = None

    try:
        connection = get_db_connection()
        connection.start_transaction()
        cursor = connection.cursor()

        order_number = "MH-" + uuid.uuid4().hex[:10].upper()

        cursor.execute(
            """
            INSERT INTO orders (
                order_number, customer_name, phone,
                pickup_date, pickup_time, total_amount,
                payment_status, order_status
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                order_number, customer_name, phone,
                parsed_date, pickup_time, total_amount,
                "PENDING", "PENDING"
            )
        )

        order_id = cursor.lastrowid

        for food_id, food_name, quantity, price in validated_items:
            cursor.execute(
                """
                INSERT INTO order_items (
                    order_id, food_item_id, food_name,
                    quantity, price
                )
                VALUES (%s, %s, %s, %s, %s)
                """,
                (order_id, food_id, food_name, quantity, price)
            )

        connection.commit()

        return jsonify({
            "success": True,
            "message": "Order saved. Payment is still pending.",
            "order_id": order_id,
            "order_number": order_number,
            "total_amount": round(total_amount, 2),
            "payment_status": "PENDING",
            "order_status": "PENDING"
        }), 201

    except mysql.connector.Error:
        if connection and connection.is_connected():
            connection.rollback()

        app.logger.exception("Could not save order")
        return jsonify({
            "success": False,
            "message": "Could not save the order. Please try again."
        }), 500

    finally:
        if cursor:
            cursor.close()
        if connection and connection.is_connected():
            connection.close()


if __name__ == "__main__":
    app.run(debug=True)
