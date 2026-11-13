import urllib.request
import urllib.error
import json
import sys

BASE_URL = "http://localhost:3005"

def log_test(name, passed, detail=""):
    status = "✓ PASS" if passed else "✗ FAIL"
    print(f"[{status}] {name} {detail}")

def run_tests():
    print("=== PACE ITS Phase 4 Backend & Admin CMS Verification ===\n")
    all_passed = True

    # 1. Test Public Routes
    try:
        req = urllib.request.Request(f"{BASE_URL}/")
        with urllib.request.urlopen(req) as resp:
            log_test("Public Homepage (/) Status 200", resp.status == 200)
    except Exception as e:
        log_test("Public Homepage (/) Status 200", False, str(e))
        all_passed = False

    # 2. Test Admin Login Page
    try:
        req = urllib.request.Request(f"{BASE_URL}/admin/login")
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8')
            has_branding = "PACE ITS Admin Portal" in content or "admin" in content.lower()
            log_test("Admin Login Portal (/admin/login)", resp.status == 200 and has_branding)
    except Exception as e:
        log_test("Admin Login Portal (/admin/login)", False, str(e))
        all_passed = False

    # 3. Test Invalid Login
    try:
        req = urllib.request.Request(
            f"{BASE_URL}/api/auth/login",
            data=json.dumps({"email": "admin@pace.ac.in", "password": "WrongPassword!"}).encode('utf-8'),
            headers={"Content-Type": "application/json"}
        )
        urllib.request.urlopen(req)
        log_test("Invalid Login Returns 401", False, "Expected 401 but got 200")
        all_passed = False
    except urllib.error.HTTPError as e:
        log_test("Invalid Login Rejected with 401", e.code == 401)
    except Exception as e:
        log_test("Invalid Login Rejected with 401", False, str(e))
        all_passed = False

    # 4. Test Valid Admin Login
    admin_token = ""
    try:
        req = urllib.request.Request(
            f"{BASE_URL}/api/auth/login",
            data=json.dumps({"email": "admin@pace.ac.in", "password": "PaceAdmin@2026!"}).encode('utf-8'),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            admin_token = data.get("token", "")
            roles = data.get("user", {}).get("roles", [])
            valid = resp.status == 200 and "SUPER_ADMIN" in roles and len(admin_token) > 20
            log_test("Super Admin Authentication & JWT Generation", valid, f"Roles: {roles}")
            if not valid: all_passed = False
    except Exception as e:
        log_test("Super Admin Authentication & JWT Generation", False, str(e))
        all_passed = False

    # 5. Test Protected Overview API without Token (Must fail 401)
    try:
        req = urllib.request.Request(f"{BASE_URL}/api/admin/overview")
        urllib.request.urlopen(req)
        log_test("Protected Overview Rejects Unauthenticated", False, "Got 200 instead of 401")
        all_passed = False
    except urllib.error.HTTPError as e:
        log_test("Protected Overview Rejects Unauthenticated with 401", e.code == 401)
    except Exception as e:
        log_test("Protected Overview Rejects Unauthenticated with 401", False, str(e))
        all_passed = False

    # 6. Test Protected Overview API with Token
    if admin_token:
        try:
            req = urllib.request.Request(
                f"{BASE_URL}/api/admin/overview",
                headers={"Authorization": f"Bearer {admin_token}"}
            )
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                metrics = data.get("metrics", {})
                pages_total = metrics.get("pages", {}).get("total", 0)
                depts_total = metrics.get("departments", {}).get("total", 0)
                valid = resp.status == 200 and pages_total >= 343 and depts_total >= 19
                log_test("Protected Admin Overview API Metrics", valid, f"Pages: {pages_total}, Depts: {depts_total}")
                if not valid: all_passed = False
        except Exception as e:
            log_test("Protected Admin Overview API Metrics", False, str(e))
            all_passed = False

    # 7. Test Public Application Submission (/api/admissions/apply)
    test_app_no = ""
    try:
        payload = {
            "candidateName": "Ananya Sharma",
            "fatherName": "Ramesh Sharma",
            "dob": "2008-05-18",
            "gender": "Female",
            "category": "OC",
            "phone": "+91 98888 77777",
            "email": "ananya.sharma@gmail.com",
            "address": "4-15, Court Road, Ongole, AP",
            "marksPercent": "95.8%",
            "entranceRank": "EAPCET: 12,450",
            "programType": "B.Tech",
            "branchPref1": "Computer Science and Engineering (CSE)",
            "branchPref2": "Artificial Intelligence and Data Science (AIDS)",
            "branchPref3": "Information Technology (IT)"
        }
        req = urllib.request.Request(
            f"{BASE_URL}/api/admissions/apply",
            data=json.dumps(payload).encode('utf-8'),
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            test_app_no = data.get("applicationNo", "")
            valid = resp.status == 201 and "PACE-2026-BTECH" in test_app_no
            log_test("Public Admission Submission Endpoint (/api/admissions/apply)", valid, f"Generated: {test_app_no}")
            if not valid: all_passed = False
    except Exception as e:
        log_test("Public Admission Submission Endpoint (/api/admissions/apply)", False, str(e))
        all_passed = False

    # 8. Test Admissions Management Workflow (Fetch & Status Update)
    if admin_token and test_app_no:
        try:
            req = urllib.request.Request(
                f"{BASE_URL}/api/admissions/applications?search={test_app_no}",
                headers={"Authorization": f"Bearer {admin_token}"}
            )
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                apps = data.get("applications", [])
                target_app = next((a for a in apps if a.get("applicationNo") == test_app_no), None)
                found = target_app is not None
                log_test("Query Created Application in Admin API", found, f"Found app: {target_app.get('candidateName') if target_app else 'None'}")

                if target_app:
                    # Update status to CONTACTED
                    patch_req = urllib.request.Request(
                        f"{BASE_URL}/api/admissions/applications",
                        data=json.dumps({
                            "id": target_app["id"],
                            "status": "CONTACTED",
                            "internalNotes": "Verified intermediate memo. Candidate confirmed campus visit."
                        }).encode('utf-8'),
                        headers={"Content-Type": "application/json", "Authorization": f"Bearer {admin_token}"},
                        method="PATCH"
                    )
                    with urllib.request.urlopen(patch_req) as patch_resp:
                        patch_data = json.loads(patch_resp.read().decode('utf-8'))
                        updated_status = patch_data.get("application", {}).get("status", "")
                        log_test("Admissions Status Workflow Transition to CONTACTED", updated_status == "CONTACTED", f"New Status: {updated_status}")
        except Exception as e:
            log_test("Admissions Management Workflow", False, str(e))
            all_passed = False

    # 9. Test Canonical Pages Query API
    try:
        req = urllib.request.Request(f"{BASE_URL}/api/pages?search=cse&limit=5")
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get("pages", [])
            valid = resp.status == 200 and len(pages) > 0
            log_test("Canonical Pages Query & Filter API (/api/pages)", valid, f"Returned {len(pages)} matching pages")
            if not valid: all_passed = False
    except Exception as e:
        log_test("Canonical Pages Query & Filter API (/api/pages)", False, str(e))
        all_passed = False

    # 10. Test Audit Logs API (Verify recorded events)
    if admin_token:
        try:
            req = urllib.request.Request(
                f"{BASE_URL}/api/audit-logs?limit=10",
                headers={"Authorization": f"Bearer {admin_token}"}
            )
            with urllib.request.urlopen(req) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                logs = data.get("logs", [])
                total_logs = data.get("total", 0)
                actions = [l.get("action") for l in logs]
                has_mutations = "LOGIN_SUCCESS" in actions or "ADMISSION_SUBMITTED" in actions
                valid = resp.status == 200 and total_logs > 0 and has_mutations
                log_test("Security Audit Logs Ledger Verification", valid, f"Total Events: {total_logs}, Recent: {actions[:4]}")
                if not valid: all_passed = False
        except Exception as e:
            log_test("Security Audit Logs Ledger Verification", False, str(e))
            all_passed = False

    print("\n=======================================================")
    if all_passed:
        print("ALL PHASE 4 BACKEND & ADMIN CMS TESTS PASSED SUCCESSFULLY!")
    else:
        print("SOME TESTS FAILED! Review error outputs above.")
    print("=======================================================")

if __name__ == "__main__":
    run_tests()

