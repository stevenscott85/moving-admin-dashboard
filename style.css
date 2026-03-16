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

function normalisePostcode(postcode) {
  return postcode.trim().toUpperCase();
}

function isValidUkPostcode(postcode) {
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
  return regex.test(postcode.trim());
}

function encodeQuery(text) {
  return encodeURIComponent(text);
}

function getChecklistItems(hasCar, isRenter) {
  const items = [
    {
      text: "Update bank accounts",
      note: "Change your registered address with all bank accounts and credit cards.",
      link: "",
      type: "manual"
    },
    {
      text: "Update HMRC records",
      note: "Update your address through your HMRC Personal Tax Account.",
      link: "https://www.gov.uk/tell-hmrc-change-address",
      type: "official"
    },
    {
      text: "Update council tax",
      note: "Tell your local council you are moving in or out.",
      link: "https://www.gov.uk/council-tax",
      type: "official"
    },
    {
      text: "Update electoral roll",
      note: "Register to vote again at your new address.",
      link: "https://www.gov.uk/register-to-vote",
      type: "official"
    },
    {
      text: "Update GP / NHS details",
      note: "Contact your GP surgery or register with a new GP if needed.",
      link: "https://www.nhs.uk/nhs-services/gps/how-to-register-with-a-gp-surgery/",
      type: "official"
    },
    {
      text: "Update insurance policies",
      note: "Update home, contents, life, and any other insurance policies.",
      link: "https://www.comparethemarket.com/home-insurance/",
      type: "partner"
    },
    {
      text: "Update energy supplier",
      note: "Contact your gas and electricity supplier and provide meter readings.",
      link: "https://www.uswitch.com/gas-electricity/",
      type: "partner"
    },
    {
      text: "Update broadband provider",
      note: "Tell your broadband provider your move date and new address.",
      link: "https://www.uswitch.com/broadband/",
      type: "partner"
    },
    {
      text: "Update Amazon delivery address",
      note: "Update your default address in Amazon account settings.",
      link: "https://www.amazon.co.uk/",
      type: "official"
    },
    {
      text: "Update PayPal billing address",
      note: "Change your billing and delivery addresses in PayPal.",
      link: "https://www.paypal.com/uk/home",
      type: "official"
    },
    {
      text: "Update subscriptions",
      note: "Update magazine, streaming, membership, and subscription services.",
      link: "",
      type: "manual"
    },
    {
      text: "Update employer records",
      note: "Tell payroll and HR your new address.",
      link: "",
      type: "manual"
    },
    {
      text: "Arrange Royal Mail redirection",
      note: "Redirect mail from your old address to your new one.",
      link: "https://www.royalmail.com/personal/receiving-mail/redirection",
      type: "official"
    }
  ];

  if (hasCar) {
    items.unshift({
      text: "Update DVLA driving licence",
      note: "Update the address on your driving licence.",
      link: "https://www.gov.uk/change-address-driving-licence",
      type: "official"
    });

    items.unshift({
      text: "Update vehicle logbook (V5C)",
      note: "Update the address on your vehicle registration certificate.",
      link: "https://www.gov.uk/change-address-v5c",
      type: "official"
    });

    items.push({
      text: "Update car insurance address",
      note: "Your insurer needs your new address immediately.",
      link: "https://www.comparethemarket.com/car-insurance/",
      type: "partner"
    });
  }

  if (isRenter) {
    items.push({
      text: "Notify landlord / letting agent",
      note: "Confirm move-out, final inspection, and handover details.",
      link: "",
      type: "manual"
    });

    items.push({
      text: "Confirm deposit and tenancy end arrangements",
      note: "Make sure meter readings, keys, and deposit return process are clear.",
      link: "",
      type: "manual"
    });
  } else {
    items.push({
      text: "Check buildings and contents insurance for new property",
      note: "Make sure the new property is covered from move-in day.",
      link: "https://www.comparethemarket.com/home-insurance/",
      type: "partner"
    });
  }

  return items;
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

function getOffers(hasCar, isRenter) {
  const offers = [
    {
      title: "Compare Broadband Deals",
      text: "Check broadband packages for your new home.",
      link: "https://www.uswitch.com/broadband/"
    },
    {
      title: "Compare Energy Deals",
      text: "Review gas and electricity tariffs after your move.",
      link: "https://www.uswitch.com/gas-electricity/"
    },
    {
      title: "Mail Redirection",
      text: "Redirect post from your old address to your new one.",
      link: "https://www.royalmail.com/personal/receiving-mail/redirection"
    }
  ];

  if (hasCar) {
    offers.push({
      title: "Compare Car Insurance",
      text: "Your car insurance premium may change when you move.",
      link: "https://www.comparethemarket.com/car-insurance/"
    });
  }

  offers.push({
    title: "Compare Home Insurance",
    text: isRenter
      ? "Check contents insurance for your new home."
      : "Check buildings and contents insurance for your new home.",
    link: "https://www.comparethemarket.com/home-insurance/"
  });

  return offers;
}

function getPostcodeTools(newPostcode) {
  const cleaned = normalisePostcode(newPostcode);

  return [
    {
      title: "Find Your Local Council",
      text: `Search for the council covering ${cleaned}.`,
      link: `https://www.gov.uk/find-local-council?postcode=${encodeQuery(cleaned)}`
    },
    {
      title: "Check Broadband Options",
      text: `Search broadband availability for ${cleaned}.`,
      link: `https://www.uswitch.com/broadband/postcode-checker/?postcode=${encodeQuery(cleaned)}`
    },
    {
      title: "Get Removals Quotes",
      text: `Compare removal companies for ${cleaned}.`,
      link: "https://www.comparemymove.com/removals"
    },
    {
      title: "Check Ofcom Broadband & Mobile Coverage",
      text: `View mobile and broadband coverage for ${cleaned}.`,
      link: "https://checker.ofcom.org.uk/en-gb/broadband-coverage"
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

function getBadge(type) {
  if (type === "official") return `<span class="badge badge-official">Official</span>`;
  if (type === "partner") return `<span class="badge badge-partner">Partner</span>`;
  return `<span class="badge badge-manual">Manual</span>`;
}

function getActionButton(item) {
  if (item.type === "official" && item.link) {
    return `<a class="link-btn" href="${item.link}" target="_blank" rel="noopener noreferrer">Official link</a>`;
  }

  if (item.type === "partner" && item.link) {
    return `<a class="link-btn partner-btn" href="${item.link}" target="_blank" rel="noopener noreferrer">Compare options</a>`;
  }

  return `<span class="no-link">Manual update</span>`;
}

function renderChecklist(items, checkedItems = []) {
  const checklist = document.getElementById("checklist");
  checklist.innerHTML = "";
  checklist.className = "checklist-list";

  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "checklist-item";

    const checked = checkedItems[index] ? "checked" : "";

    row.innerHTML = `
      <div class="check-left">
        <input type="checkbox" class="task-checkbox" data-index="${index}" ${checked}>
        <div>
          <div class="check-text">${item.text}</div>
          <div class="check-note">${item.note}</div>
        </div>
      </div>
      <div class="check-actions">
        ${getBadge(item.type)}
        ${getActionButton(item)}
      </div>
    `;

    checklist.appendChild(row);
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

function renderOffers(offers) {
  const offersBox = document.getElementById("offers");
  offersBox.innerHTML = "";

  offers.forEach(offer => {
    const card = document.createElement("div");
    card.className = "offer-card";

    card.innerHTML = `
      <h3>${offer.title}</h3>
      <p>${offer.text}</p>
      <a href="${offer.link}" target="_blank" rel="noopener noreferrer">View option</a>
    `;

    offersBox.appendChild(card);
  });
}

function renderPostcodeTools(tools) {
  const toolsBox = document.getElementById("postcodeTools");
  toolsBox.innerHTML = "";

  tools.forEach(tool => {
    const card = document.createElement("div");
    card.className = "offer-card";

    card.innerHTML = `
      <h3>${tool.title}</h3>
      <p>${tool.text}</p>
      <a href="${tool.link}" target="_blank" rel="noopener noreferrer">Open tool</a>
    `;

    toolsBox.appendChild(card);
  });
}

function fillSummary(oldAddress, oldPostcode, newAddress, newPostcode, moveDate) {
  document.getElementById("summaryOld").textContent = oldAddress.replace(/\n/g, " ");
  document.getElementById("summaryOldPostcode").textContent = oldPostcode;
  document.getElementById("summaryNew").textContent = newAddress.replace(/\n/g, " ");
  document.getElementById("summaryNewPostcode").textContent = newPostcode;
  document.getElementById("summaryDate").textContent = formatDate(moveDate);
  document.getElementById("summaryCountdown").textContent = daysUntilMove(moveDate);

  document.getElementById("printMoveDate").textContent = formatDate(moveDate);
  document.getElementById("printOldPostcode").textContent = oldPostcode;
  document.getElementById("printNewPostcode").textContent = newPostcode;
}

function buildPlanner() {
  const oldAddress = document.getElementById("oldAddress").value.trim();
  const oldPostcode = normalisePostcode(document.getElementById("oldPostcode").value);
  const newAddress = document.getElementById("newAddress").value.trim();
  const newPostcode = normalisePostcode(document.getElementById("newPostcode").value);
  const moveDate = document.getElementById("moveDate").value;
  const hasCar = document.getElementById("hasCar").checked;
  const isRenter = document.getElementById("isRenter").checked;

  if (!oldAddress || !oldPostcode || !newAddress || !newPostcode || !moveDate) {
    alert("Please fill in old address, old postcode, new address, new postcode, and move date.");
    return;
  }

  if (!isValidUkPostcode(oldPostcode) || !isValidUkPostcode(newPostcode)) {
    alert("Please enter valid UK postcodes.");
    return;
  }

  const checklistItems = getChecklistItems(hasCar, isRenter);
  const timelineData = getTimelineData();
  const offers = getOffers(hasCar, isRenter);
  const postcodeTools = getPostcodeTools(newPostcode);

  fillSummary(oldAddress, oldPostcode, newAddress, newPostcode, moveDate);
  renderChecklist(checklistItems, []);
  renderTimeline(timelineData);
  renderOffers(offers);
  renderPostcodeTools(postcodeTools);

  document.getElementById("results").classList.remove("hidden");

  savePlannerData({
    oldAddress,
    oldPostcode,
    newAddress,
    newPostcode,
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
  document.getElementById("oldPostcode").value = saved.oldPostcode || "";
  document.getElementById("newAddress").value = saved.newAddress || "";
  document.getElementById("newPostcode").value = saved.newPostcode || "";
  document.getElementById("moveDate").value = saved.moveDate || "";
  document.getElementById("hasCar").checked = !!saved.hasCar;
  document.getElementById("isRenter").checked = !!saved.isRenter;

  fillSummary(
    saved.oldAddress || "",
    saved.oldPostcode || "",
    saved.newAddress || "",
    saved.newPostcode || "",
    saved.moveDate || ""
  );

  renderChecklist(saved.checklistItems || [], saved.checkedItems || []);
  renderTimeline(getTimelineData());
  renderOffers(getOffers(saved.hasCar, saved.isRenter));

  if (saved.newPostcode) {
    renderPostcodeTools(getPostcodeTools(saved.newPostcode));
  }

  document.getElementById("results").classList.remove("hidden");
}

function clearPlanner() {
  localStorage.removeItem(STORAGE_KEY);

  document.getElementById("oldAddress").value = "";
  document.getElementById("oldPostcode").value = "";
  document.getElementById("newAddress").value = "";
  document.getElementById("newPostcode").value = "";
  document.getElementById("moveDate").value = "";
  document.getElementById("hasCar").checked = false;
  document.getElementById("isRenter").checked = false;

  document.getElementById("checklist").innerHTML = "";
  document.getElementById("timeline").innerHTML = "";
  document.getElementById("offers").innerHTML = "";
  document.getElementById("postcodeTools").innerHTML = "";
  document.getElementById("results").classList.add("hidden");

  document.getElementById("progressText").textContent = "0%";
  document.getElementById("progressFill").style.width = "0%";
}

function runPrintMode(mode) {
  document.body.classList.remove("print-checklist-only", "print-full-plan");
  document.body.classList.add(mode);

  window.print();

  setTimeout(() => {
    document.body.classList.remove("print-checklist-only", "print-full-plan");
  }, 300);
}

function printChecklistOnly() {
  runPrintMode("print-checklist-only");
}

function printFullPlan() {
  runPrintMode("print-full-plan");
}

window.addEventListener("load", restorePlanner);
