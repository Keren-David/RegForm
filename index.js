const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#entriesTable tbody");

function getStoredEntries() {
  return JSON.parse(localStorage.getItem("entries")) || [];
}

function saveEntry(entry) {
  const entries = getStoredEntries();
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));
}

function renderEntries() {
  tableBody.innerHTML = "";
  const entries = getStoredEntries();
  entries.forEach(entry => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    `;
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  const dob = form.dob.value;
  const acceptedTerms = form.acceptTerms.checked;

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const age = isValidAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTerms
  };

  saveEntry(entry);
  renderEntries();
  form.reset();
});

renderEntries(); // load entries on page load
