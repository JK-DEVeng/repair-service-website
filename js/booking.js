const emergencyCheck = document.getElementById("emergencyCheck");
const timeInput = document.getElementById("timeInput");
const totalPriceElement = document.getElementById("totalPrice");

let basePrice = 1000;
let emergencyCharge = 500;
let nightCharge = 300;

function calculateTotal() {
    let total = basePrice;
    if (emergencyCheck.checked) {
        total += emergencyCharge;
    }
    const selectedTime = timeInput.value;

    if (selectedTime) {
        const hour = parseInt(selectedTime.split(":")[0]);

        if (hour >= 20 || hour < 6) {
            total += nightCharge;
        }

    }
    totalPriceElement.textContent =  "₹" + total;
}
emergencyCheck.addEventListener("change", calculateTotal);
timeInput.addEventListener("change", calculateTotal);
calculateTotal();

const bookingForm = document.getElementById("bookingForm");
const successMessage = document.getElementById("successMessage");

bookingForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const bookingData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        device: document.getElementById("deviceType").value,
        issue: document.getElementById("issue").value,
        date: document.getElementById("date").value,
        time: document.getElementById("timeInput").value,
        emergency: document.getElementById("emergencyCheck").checked,
        total: totalPriceElement.textContent.replace("₹", "")
    };

    try {
        const response = await fetch("http://localhost:5000/api/book-service", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });
        const result = await response.json();
        if (result.success) {
            successMessage.textContent = "Booking submitted successfully!";
            successMessage.style.display = "block";
            successMessage.style.textAlign = "center"
            bookingForm.reset();
            calculateTotal();
        } else {
            alert("Failed to submit booking.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server error. Please try again.");
    }

});