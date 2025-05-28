from fastapi.testclient import TestClient
from src.main import app
import pytest
from typing import Dict

client = TestClient(app)

def create_city() -> int:
    # Dummy city creation, adjust if you have a city service
    # For now, use 1 (Addis Ababa) as per DUMMY_CITIES in routes.py
    return 1

def create_operator_user() -> Dict[str, int]:
    city_id = create_city()
    operator_data = {
        "full_name": "Operator User",
        "password": "operatorpass",
        "city_id": city_id
    }
    resp = client.post("/operators/", json=operator_data)
    assert resp.status_code == 200, f"Create operator failed: {resp.text}"
    operator = resp.json()
    return {"operator_id": operator["id"], "user_id": operator["user_id"], "city_id": city_id, "full_name": operator["full_name"]}

def create_driver_user(operator_name: str) -> Dict[str, int]:
    city_id = create_city()
    driver_data = {
        "full_name": "Driver User",
        "password": "driverpass",
        "license_number": "D123456",
        "license_expiry": "2030-01-01T00:00:00",
        "city_id": city_id,
        "operator_name": operator_name
    }
    resp = client.post("/drivers/", json=driver_data)
    assert resp.status_code == 200, f"Create driver failed: {resp.text}"
    driver = resp.json()
    return {"driver_id": driver["id"], "user_id": driver["user_id"], "city_id": city_id, "full_name": driver["full_name"]}

def create_admin_user() -> Dict[str, int]:
    admin_data = {
        "full_name": "Admin User",
        "password": "adminpass",
        "username": "adminuser"
    }
    resp = client.post("/admins/", json=admin_data)
    assert resp.status_code == 200, f"Create admin failed: {resp.text}"
    admin = resp.json()
    return {"admin_id": admin["id"], "user_id": admin["user_id"], "username": admin["username"], "full_name": admin["full_name"]}

def create_passenger_user() -> Dict[str, int]:
    passenger_data = {
        "full_name": "Passenger User",
        "password": "passengerpass"
    }
    resp = client.post("/passengers/", json=passenger_data)
    assert resp.status_code == 200, f"Create passenger failed: {resp.text}"
    passenger = resp.json()
    return {"passenger_id": passenger["id"], "user_id": passenger["user_id"], "full_name": passenger["full_name"]}

# --- ADMIN TESTS ---
def test_admin_crud():
    admin = create_admin_user()
    admin_id = admin["admin_id"]
    user_id = admin["user_id"]
    # Read by id
    resp = client.get(f"/admins/{admin_id}")
    assert resp.status_code == 200
    # Read by user_id
    resp = client.get(f"/admins/by_user/{user_id}")
    assert resp.status_code == 200
    # Update by id
    update_data = {
        "full_name": "Admin User Updated",
        "password": "newadminpass",
        "username": "adminuser2"
    }
    resp = client.put(f"/admins/{admin_id}", json=update_data)
    assert resp.status_code == 200
    # Delete by id
    resp = client.delete(f"/admins/{admin_id}")
    assert resp.status_code == 204
    # Should be gone
    resp = client.get(f"/admins/{admin_id}")
    assert resp.status_code == 404

def test_operator_crud():
    operator = create_operator_user()
    operator_id = operator["operator_id"]
    user_id = operator["user_id"]
    city_id = operator["city_id"]
    # Read by id
    resp = client.get(f"/operators/{operator_id}")
    assert resp.status_code == 200
    # Read by user_id
    resp = client.get(f"/operators/by_user/{user_id}")
    assert resp.status_code == 200
    # Update by id
    update_data = {
        "full_name": "Operator User Updated",
        "password": "newoperatorpass",
        "city_id": city_id
    }
    resp = client.put(f"/operators/{operator_id}", json=update_data)
    assert resp.status_code == 200
    # Update by user_id
    resp = client.put(f"/operators/by_user/{user_id}", json=update_data)
    assert resp.status_code == 200
    # Delete by id
    resp = client.delete(f"/operators/{operator_id}")
    assert resp.status_code == 204
    # Should be gone
    resp = client.get(f"/operators/{operator_id}")
    assert resp.status_code == 404

def test_driver_crud():
    operator = create_operator_user()
    operator_name = operator["full_name"]
    driver = create_driver_user(operator_name)
    driver_id = driver["driver_id"]
    user_id = driver["user_id"]
    city_id = driver["city_id"]
    # Read by id
    resp = client.get(f"/drivers/{driver_id}")
    assert resp.status_code == 200
    # Read by user_id
    resp = client.get(f"/drivers/by_user/{user_id}")
    assert resp.status_code == 200
    # Update by id
    update_data = {
        "full_name": "Driver User Updated",
        "password": "newdriverpass",
        "license_number": "D654321",
        "license_expiry": "2035-01-01T00:00:00",
        "city_id": city_id,
        "operator_name": operator_name
    }
    resp = client.put(f"/drivers/{driver_id}", json=update_data)
    assert resp.status_code == 200
    # Update by user_id
    resp = client.put(f"/drivers/by_user/{user_id}", json=update_data)
    assert resp.status_code == 200
    # Delete by id
    resp = client.delete(f"/drivers/{driver_id}")
    assert resp.status_code == 204
    # Should be gone
    resp = client.get(f"/drivers/{driver_id}")
    assert resp.status_code == 404

def test_passenger_crud():
    passenger = create_passenger_user()
    passenger_id = passenger["passenger_id"]
    user_id = passenger["user_id"]
    # Read by id
    resp = client.get(f"/passengers/{passenger_id}")
    assert resp.status_code == 200
    # Read by user_id
    resp = client.get(f"/passengers/by_user/{user_id}")
    assert resp.status_code == 200
    # Update by id
    update_data = {
        "full_name": "Passenger User Updated",
        "password": "newpassengerpass"
    }
    resp = client.put(f"/passengers/{passenger_id}", json=update_data)
    assert resp.status_code == 200
    # Update by user_id
    resp = client.put(f"/passengers/by_user/{user_id}", json=update_data)
    assert resp.status_code == 200
    # Delete by id
    resp = client.delete(f"/passengers/{passenger_id}")
    assert resp.status_code == 204
    # Should be gone
    resp = client.get(f"/passengers/{passenger_id}")
    assert resp.status_code == 404

def test_users_endpoint_accessible() -> None:
    """
    Test that the /users/ endpoint is accessible.
    """
    response = client.get("/users/")
    assert response.status_code in (200, 404) 