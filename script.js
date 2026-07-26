const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const offer = document.getElementById("offer").value;
    const quantity = document.getElementById("quantity").value;
    const college = document.getElementById("college").value;
    const department = document.getElementById("department").value;

    const otherCollege = document.getElementById("otherCollege").value.trim();
    const otherDepartment = document.getElementById("otherDepartment").value.trim();

    // Google Sign-In
    if (email === "") {
        alert("Please Sign in with Google first.");
        return;
    }

    // Basic Validation
    if (
        name === "" ||
        phone === "" ||
        offer === "" ||
        quantity === "" ||
        college === "" ||
        department === ""
    ) {
        alert("Please fill all details.");
        return;
    }

    // College - Others
    if (college === "Others" && otherCollege === "") {
        alert("Please enter your college name.");
        return;
    }

    // Department - Other
    if (department === "Other" && otherDepartment === "") {
        alert("Please enter your Branch & Degree.");
        return;
    }

    // Gmail Validation
    if (!email.endsWith("@gmail.com")) {
        alert("Only Gmail accounts are allowed.");
        return;
    }

    // Phone Validation
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // Reject repeated numbers
    if (/^(\d)\1{9}$/.test(phone)) {
        alert("Repeated numbers like 1111111111 are not allowed.");
        return;
    }

    // Reject fake numbers
    const fakeNumbers = [
        "1234567890",
        "7345678902",
        "9123456780",
        "1122222222",
        "1222222222",
        "0122222222",
        "8234567891",
        "1234444444",
        "0123456789",
        "9876543210"
    ];

    if (fakeNumbers.includes(phone)) {
        alert("Please enter a genuine mobile number.");
        return;
    }

    // Reject numbers with same digit repeated 8+ times
    const digitCount = {};

    for (const digit of phone) {
        digitCount[digit] = (digitCount[digit] || 0) + 1;
    }

    if (Math.max(...Object.values(digitCount)) >= 8) {
        alert("Please enter a genuine mobile number.");
        return;
    }

    // Save Data
    localStorage.setItem("odrsName", name);
    localStorage.setItem("odrsEmail", email);
    localStorage.setItem("odrsPhone", phone);
    localStorage.setItem("odrsOffer", offer);
    localStorage.setItem("odrsQuantity", quantity);

    if (college === "Others") {
        localStorage.setItem("odrsCollege", otherCollege);
    } else {
        localStorage.setItem("odrsCollege", college);
    }

    if (department === "Other") {
        localStorage.setItem("odrsDept", otherDepartment);
    } else {
        localStorage.setItem("odrsDept", department);
    }

    // Redirect
    window.location.href = "/payment";
});


// ==========================
// College Toggle
// ==========================
function toggleCollege() {
    const college = document.getElementById("college");
    const otherGroup = document.getElementById("otherCollegeGroup");
    const otherCollege = document.getElementById("otherCollege");

    if (college.value === "Others") {
        otherGroup.style.display = "block";
        otherCollege.required = true;
    } else {
        otherGroup.style.display = "none";
        otherCollege.required = false;
        otherCollege.value = "";
    }
}


// ==========================
// Department Toggle
// ==========================
function toggleDepartment() {
    const department = document.getElementById("department");
    const otherGroup = document.getElementById("otherDepartmentGroup");
    const otherDepartment = document.getElementById("otherDepartment");

    if (department.value === "Other") {
        otherGroup.style.display = "block";
        otherDepartment.required = true;
    } else {
        otherGroup.style.display = "none";
        otherDepartment.required = false;
        otherDepartment.value = "";
    }
}


// Make functions available to HTML onchange
window.toggleCollege = toggleCollege;
window.toggleDepartment = toggleDepartment;


// Back Button
const backBtn = document.getElementById("backBtn");

if (backBtn) {
    backBtn.addEventListener("click", function () {
        history.back();
    });
}
