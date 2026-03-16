function formatDate(dateValue) {
  if (!dateValue) return "Not provided";
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function buildPlanner() {
  const oldAddress = document.getElementById("oldAddress").value.trim();
  const newAddress = document.getElementById("newAddress").value.trim();
  const moveDate = document.getElementById("moveDate").value;
  const hasCar = document.getElementById("hasCar").checked;
  const isRenter = document.getElementById("isRenter").checked;

  if (!oldAddress || !newAddress || !moveDate) {
    alert("Please fill in old address, new address, and move date.");
    return;
  }

  const checklistItems = [
    "Update bank accounts",
    "Update HMRC records",
    "Update council tax",
    "Update electoral roll",
    "Update GP / NHS details",
    "Update insurance policies",
    "Update energy supplier",
    "Update broadband provider",
    "Update Amazon delivery address",
    "Update PayPal billing address",
    "Update subscriptions",
    "Update employer records",
    "Arrange Royal Mail redirection"
  ];

  if (hasCar) {
    checklistItems.unshift("Update DVLA driving licence");
    checklistItems.unshift("Update vehicle logbook (V5C)");
    checklistItems.push("Update car insurance address");
  }

  if (isRenter) {
    checklistItems.push("Notify landlord / letting agent");
    checklistItems.push("Confirm deposit and tenancy end arrangements");
  } else {
    checklistItems.push("Check buildings and contents insurance for new property");
  }

  const timelineData = [
    {
      title: "4 weeks before move",
      tasks: [
        "Book removals or van hire",
        "Start decluttering",
        "Notify landlord / agent if renting",
        "Arrange mail redirection"
      ]
    },
    {
      title: "2 weeks before move",
      tasks: [
        "Contact energy supplier",
        "Arrange broadband at new property",
        "Start updating banks and key accounts",
        "Gather important documents"
      ]
    },
    {
      title: "1 week before move",
      tasks: [
        "Pack essentials box",
        "Confirm key collection",
        "Update council tax arrangements",
        "Notify employer and subscriptions"
      ]
    },
    {
      title: "Moving day",
      tasks: [
        "Take gas / electric / water meter readings",
        "Photograph meter readings",
        "Check all keys received",
        "Confirm move completion"
      ]
    },
    {
      title: "After moving",
      tasks: [
        "Update electoral roll",
        "Update NHS / GP records",
        "Update DVLA and V5C if needed",
        "Check all address changes completed"
      ]
    }
  ];

  document.getElementById("summaryOld").textContent = oldAddress;
  document.getElementById("summaryNew").textContent = newAddress;
  document.getElementById("summaryDate").textContent = formatDate(moveDate);

  const checklist = document.getElementById("checklist");
  checklist.innerHTML = "";

  checklistItems.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="checkbox"> ${item}</label>`;
    checklist.appendChild(li);
  });

  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  timelineData.forEach(block => {
    const div = document.createElement("div");
    div.className = "timeline-block";

    const tasksHtml = block.tasks.map(task => `<li>${task}</li>`).join("");

    div.innerHTML = `
      <h3>${block.title}</h3>
      <ul>${tasksHtml}</ul>
    `;

    timeline.appendChild(div);
  });

  document.getElementById("results").classList.remove("hidden");
}
