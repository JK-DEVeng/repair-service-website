document.addEventListener("DOMContentLoaded", () => {
const device = document.getElementById("device");
const issue = document.getElementById("issue");
const price = document.getElementById("priceValue");

const issues = {
  phone: {
    Screen: "₹2,500 – ₹4,000",
    Battery: "₹1,500 – ₹2,500",
    Charging: "₹1,000 – ₹2,000"
  },
  laptop: {
    OS: "₹2,000 – ₹3,500",
    Hardware: "₹3,000 – ₹6,000",
    Performance: "₹2,500 – ₹5,000"
  },
  appliance: {
    Diagnosis: "₹1,000 – ₹2,000",
    Repair: "₹2,500 – ₹6,000"
  }
};

device.addEventListener("change", () => {
  issue.innerHTML = `<option value="">Select issue</option>`;
  price.textContent = "-";

  const selected = issues[device.value];
  if (!selected) return;

  Object.keys(selected).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = key;
    issue.appendChild(opt);
  });
});

issue.addEventListener("change", () => {
  const deviceIssues = issues[device.value];
  if (!deviceIssues) {
    price.textContent = "-";
    return;
  }
  price.textContent = deviceIssues[issue.value] || "-";
});
})
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
const form = document.getElementById("contactForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault(); 
  const formData = new FormData(form);
  const data = {
    first_name: formData.get('first_name'),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };
  try{
    
    const response = await fetch("http://127.0.0.1:5000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    alert(result.message);
    form.reset();
  } catch (error) {
    alert("Something went wrong.");
  }
});