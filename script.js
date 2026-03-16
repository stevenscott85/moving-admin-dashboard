const STORAGE_KEY = "movingAdminPlannerData";

function formatDate(dateValue) {
  if (!dateValue) return "Not provided";
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function daysUntilMove(dateValue) {
  if (!dateValue) return "Not provided";

  const today = new Date();
  const moveDate = new Date(dateValue);

  today.setHours(0, 0, 0, 0);
  moveDate.setHours(0, 0, 0, 0);

  const diffMs = moveDate - today;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `${diffDays} day(s)`;
  if (diffDays === 0) return "Moving today";
  return `${Math.abs(diffDays)} day(s) ago`;
}

function getChecklistItems(hasCar, isRenter) {
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

  return checklistItems;
}

function getTimelineData() {
  return [
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
}

function savePlannerData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadPlannerData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

function updateProgress() {
  const checkboxes = document.querySelectorAll(".task-checkbox");
  const total = checkboxes.length;

  if (total === 0) {
    document.getElementById("progressText").textContent = "0%";
    document.getElementById("progressFill").style.width = "0%";
    return;
  }

  let checked = 0;
  checkboxes.forEach(box => {
    if (box.checked) checked++;
  });

  const percent = Math.round((checked / total) * 100);
  document.getElementById("progressText").textContent = `${percent}% (${checked}/${total})`;
  document.getElementById("progressFill").style.width = `${percent}%`;

  const saved = loadPlannerData();
  if (saved) {
    saved.checkedItems = Array.from(checkboxes).map(box => box.checked);
    savePlannerData(saved);
  }
}

function renderChecklist(items, checkedItems = []) {
  const checklist = document.getElementById("checklist");
  checklist.innerHTML = "";

  items.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <label class="check-item">
        <input type="checkbox" class="task-checkbox" data-index="${index}" ${checkedItems[index] ? "checked" : ""}>
        ${item}
      </label>
    `;

    checklist.appendChild(li);
  });

  document.querySelectorAll(".task-checkbox").forEach(box => {
    box.addEventListener("change", updateProgress);
  });

  updateProgress();
}

function renderTimeline(timelineData) {
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
}

function fillSummary(oldAddress, newAddress, moveDate) {
  document.getElementById("summaryOld").textContent = oldAddress.replace(/\n/g, " ");
  document.getElementById("summaryNew").textContent = newAddress.replace(/\n/g, " ");
  document.getElementById("summaryDate").textContent = formatDate(moveDate);
  document.getElementById("summaryCountdown").textContent = daysUntilMove(moveDate);
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

  const checklistItems = getChecklistItems(hasCar, isRenter);
  const timelineData = getTimelineData();

  fillSummary(oldAddress, newAddress, moveDate);
  renderChecklist(checklistItems, []);
  renderTimeline(timelineData);

  document.getElementById("results").classList.remove("hidden");

  savePlannerData({
    oldAddress,
    newAddress,
    moveDate,
    hasCar,
    isRenter,
    checklistItems,
    checkedItems: new Array(checklistItems.length).fill(false)
  });
}

function restorePlanner() {
  const saved = loadPlannerData();
  if (!saved) return;

  document.getElementById("oldAddress").value = saved.oldAddress || "";
  document.getElementById("newAddress").value = saved.newAddress || "";
  document.getElementById("moveDate").value = saved.moveDate || "";
  document.getElementById("hasCar").checked = !!saved.hasCar;
  document.getElementById("isRenter").checked = !!saved.isRenter;

  fillSummary(saved.oldAddress, saved.newAddress, saved.moveDate);
  renderChecklist(saved.checklistItems || [], saved.checkedItems || []);
  renderTimeline(getTimelineData());

  document.getElementById("results").classList.remove("hidden");
}

function clearPlanner() {
  localStorage.removeItem(STORAGE_KEY);

  document.getElementById("oldAddress").value = "";
  document.getElementById("newAddress").value = "";
  document.getElementById("moveDate").value = "";
  document.getElementById("hasCar").checked = false;
  document.getElementById("isRenter").checked = false;

  document.getElementById("checklist").innerHTML = "";
  document.getElementById("timeline").innerHTML = "";
  document.getElementById("results").classList.add("hidden");
}

window.addEventListener("load", restorePlanner);
