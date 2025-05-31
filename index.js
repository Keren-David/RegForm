const form = document.getElementById("registration-form");
const tableBody = document.querySelector("#user-table tbody");

// Load saved data
window.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach(user => addToTable(user));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const terms = document.getElementById("terms").checked;

  if (!isValidEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  if (!isValidDOB(dob)) {
    alert("You must be between 18 and 55 years old.");
    return;
  }

  const user = { name, email, password, dob, terms };

  // Save to localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  addToTable(user);
  form.reset();
});

function isValidEmail(email) {
  // Basic email pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDOB(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  const isBeforeBirthday = m < 0 || (m === 0 && today.getDate() < birthDate.getDate());

  const finalAge = isBeforeBirthday ? age - 1 : age;
  return finalAge >= 18 && finalAge <= 55;
}

function addToTable(user) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.dob}</td>
    <td>${user.terms}</td>
  `;
  tableBody.appendChild(row);
}
