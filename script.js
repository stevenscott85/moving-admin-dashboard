function startPlanner() {
  const services = [
    "DVLA",
    "Bank Accounts",
    "HMRC",
    "Council Tax",
    "Electoral Roll",
    "GP / NHS",
    "Insurance Policies",
    "Energy Supplier",
    "Broadband Provider",
    "Amazon",
    "PayPal",
    "Subscriptions",
    "Employer",
    "Mobile Phone Provider"
  ];

  const planner = document.getElementById("planner");
  const checklist = document.getElementById("checklist");

  planner.classList.remove("hidden");
  checklist.innerHTML = "";

  services.forEach(service => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> ${service}`;
    checklist.appendChild(li);
  });
}
