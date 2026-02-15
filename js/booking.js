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