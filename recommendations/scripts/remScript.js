const html = document.querySelector("html");
const body = document.querySelector("body");
const main = document.querySelector(".main");
const nav = document.querySelector(".sidenav");
const button = document.querySelector(".main button");
const closer = document.querySelector(".sidenav .fa-xmark");

let disable = document.createElement("div");
disable.classList.toggle("disabled");

button.addEventListener("click", openNav);
closer.addEventListener("click", closeNav);

function openNav() {
  nav.style.width = "50%";
  main.style.marginLeft = "50%";
}

function closeNav() {
  nav.style.width = "0";
  main.style.marginLeft = "0";
}

// medications page
const medication = document.querySelector(".medication");
const meds = document.querySelector(".meds-page");
const select = document.querySelector("select");
const frequency = document.querySelectorAll(".frequency input");
const backArrow = document.querySelector(".meds-page .fa-arrow-left");
const nextButton = document.querySelector(".meds-page button");

const rem = document.createElement("p");
rem.classList.toggle("rem");

medication.addEventListener("click", openMedsMenu);
backArrow.addEventListener("click", () => {
  closeMedsMenu();
  select.selectedIndex = -1;
  frequency.forEach((choice) => (choice.checked = false));
});
nextButton.addEventListener("click", () => {
  if (unit == "" && freq == "") {
    rem.textContent = "please add medication frequency and unit.";
    meds.appendChild(rem);
  } else if (unit == "") {
    rem.textContent = "please add medication unit.";
    meds.appendChild(rem);
  } else if (freq == "") {
    rem.textContent = "please add medication frequency.";
    meds.appendChild(rem);
  } else openAddMeds();
});

function openMedsMenu() {
  meds.style.display = "block";
  html.appendChild(disable);
}

function closeMedsMenu() {
  meds.style.display = "none";
  html.removeChild(disable);
}

select.addEventListener("change", () => {
  unit = select.value;
  if (meds.contains(rem)) {
    meds.removeChild(rem);
  }
});

frequency.forEach((choice) => {
  choice.addEventListener("click", () => {
    freq = choice.value;
    if (meds.contains(rem)) {
      meds.removeChild(rem);
    }
  });
});

const addMeds = document.querySelector(".add-meds");
const medsUnit = document.querySelector(".meds-unit");
const medsFreq = document.querySelector(".meds-freq");
const closeMark = document.querySelector(".add-meds .fa-xmark");
const onceDaily = document.querySelector(".once-daily");
const medSaveButton = document.querySelector(".add-meds .save");
const addTime = document.querySelector(".add-time");
const addDose = document.querySelector(".add-dose");

const medsrecordsArray = [];
let unit = "";
let freq = "";
let medsrecord;

function openAddMeds() {
  if (unit != "" && freq != "") {
    addMeds.style.display = "block";
  }

  medsUnit.textContent = `unit: ${unit}`;

  if (freq === "once") {
    medsFreq.textContent = `Frequency: ${freq} daily`;
    addMeds.insertBefore(onceDaily, medSaveButton);
    onceDaily.style.display = "block";
  } else if (freq === "twice") {
    medsFreq.textContent = `Frequency: ${freq} daily`;
  } else if (freq === "needed") {
    medsFreq.textContent = `Frequency: As ${freq}`;
  } else if (freq === "other") {
    medsFreq.textContent = `Frequency: ${freq} frequency`;
  }
}

addTime.addEventListener("click", () => {
  wrapper.style.display = "flex";
});

addDose.addEventListener("click", () => {
  dosage.style.display = "flex";
  doseUnit.textContent = unit;
});

closeMark.addEventListener("click", () => {
  let warning = document.createElement("div");
  warning.classList.add("warning");
  warning.textContent = "Are you sure you want to discard your changes? ";

  let cancel = document.createElement("button");
  cancel.textContent = "cancel";

  let accept = document.createElement("button");
  accept.textContent = "yes, discard";

  warning.appendChild(cancel);
  warning.appendChild(accept);
  addMeds.appendChild(warning);

  cancel.addEventListener("click", () => {
    addMeds.removeChild(warning);
  });

  accept.addEventListener("click", () => {
    addMeds.removeChild(warning);
    addMeds.style.display = "none";
    select.selectedIndex = -1;
    frequency.forEach((choice) => (choice.checked = false));
  });
});

medSaveButton.addEventListener("click", medSaveRecord);

function medSaveRecord(time, pres) {
  time = alarmTime;
  pres = doseValue;
  if (time != null && pres != "0") {
    addMeds.style.display = "none";
    meds.style.display = "none";
    html.removeChild(disable);
    nav.style.width = "0";
    main.style.marginLeft = "0";
    select.selectedIndex = -1;
    frequency.forEach((choice) => (choice.checked = false));
    medsrecord = [doseValue, alarmTime];
    medsrecordsArray.push(medsrecord);
    console.log(medsrecordsArray);
    medstemplate();
  } else if (time == null && pres == "0") {
    let remind = document.createElement("p");
    remind.classList.toggle("rem");
    remind.textContent = "please select the time and dose for your medication ";
    addMeds.appendChild(remind);
  } else if (time == null) {
    let remind = document.createElement("p");
    remind.classList.toggle("rem");
    remind.textContent = "please select a time for your medication ";
    addMeds.appendChild(remind);
  } else if (pres == "0") {
    let remind = document.createElement("p");
    remind.classList.toggle("rem");
    remind.textContent = "please select the dose for your medication ";
    addMeds.appendChild(remind);
  }
}

function medstemplate() {
  console.log(medsrecord);
  const tab = document.createElement("div");
  tab.style.cssText =
    "color:blue; width:30%; border:1px solid red; border-radius: 5px; width: 50%; margin: 1em auto; text-align: center;";
  tab.textContent = medsrecord;
  body.appendChild(tab);
}

//alarm clock
const wrapper = document.querySelector(".wrapper");
const content = document.querySelector(".content"),
  selectMenu = document.querySelectorAll(".column select"),
  exitAlarm = document.querySelector(".cancel"),
  setAlarmBtn = document.querySelector(".set");

let time;

let alarmTime,
  isAlarmSet,
  ringtone = new Audio("./files/ringtone.mp3");

for (let i = 12; i > 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? `0${i}` : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
  if (h >= 12) {
    h = h - 12;
    ampm = "PM";
  }
  h = h == 0 ? (h = 12) : h;
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  time = `${h}:${m}:${s} ${ampm}`;

  if (alarmTime === `${h}:${m} ${ampm}`) {
    ringtone.play();
    ringtone.loop = true;
  }
});

function setAlarm() {
  if (isAlarmSet) {
    alarmTime = "";
    ringtone.pause();
    content.classList.remove("disable");
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }

  let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    return alert("Please, select a valid time to set Alarm!");
  }
  alarmTime = time;
  isAlarmSet = true;
  content.classList.add("disable");
  setAlarmBtn.innerText = "Clear Alarm";
  console.log(alarmTime);
}

setAlarmBtn.addEventListener("click", () => {
  setAlarm();
  wrapper.style.display = "none";
});

exitAlarm.addEventListener("click", () => {
  wrapper.style.display = "none";
});

//alarm clock end

//dosage setting
const dosage = document.querySelector(".container");
const doseSelect = document.querySelector(".dosage select");
const doseUnit = document.querySelector(".dosage-text");
const setDoseButton = document.querySelector(".set-dose");
const cancelDoseButton = document.querySelector(".cancel-dose");

let dose;
let doseValue = 0;

for (let i = 10; i > 0; i--) {
  let option = `<option value="${i}">${i}</option>`;
  doseSelect.firstElementChild.insertAdjacentHTML("afterend", option);
}
function setDose() {
  if (doseSelect.value == "0") {
    return alert("Please, select a valid dose for your medication!");
  }
  dose = doseSelect.value;
  doseValue = `${dose} ${unit}`;
  console.log(doseValue);
}

setDoseButton.addEventListener("click", () => {
  setDose();
  dosage.style.display = "none";
});
cancelDoseButton.addEventListener("click", () => {
  dosage.style.display = "none";
});

//dosage setting end

// activities page
const activity = document.querySelector(".activity");
const acts = document.querySelector(".activities-page");
const returnArrow = document.querySelector(".activities-page .fa-arrow-left");

activity.addEventListener("click", openActivityMenu);
returnArrow.addEventListener("click", closeActivityMenu);

function openActivityMenu() {
  acts.style.display = "block";
  html.appendChild(disable);
}

function closeActivityMenu() {
  acts.style.display = "none";
  html.removeChild(disable);
}

const activities =
  "https://gist.githubusercontent.com/cpendo/ca3caf6ffe75118121301d9e07655e51/raw/2f0496a95d2477786b93d5bf89b53642e67b45b9/activities.json";

const exercise = [];

fetch(activities)
  .then((blob) => blob.json())
  .then((data) => exercise.push(...data));

const showAllActivities = document.querySelector(".show-all");
const activitiesList = document.querySelector(".all-activities");
const addActivities = document.querySelector(".add-activities");
const closePage = document.querySelector(".add-activities .fa-xmark");
const activityName = document.querySelector(".activity-name");
const activityTime = document.querySelector(".activity-time");
const activitySaveButton = document.querySelector(".add-activities .save");

let selection;
let activitiesRecord;

showAllActivities.addEventListener("click", () => {
  exercise.forEach((element) => {
    let li = document.createElement("li");
    li.innerHTML = element;
    activitiesList.appendChild(li);
  });
});

function openAddActivities() {
  addActivities.style.display = "block";
}
function closeAddActivities() {
  addActivities.style.display = "none";
}

closePage.addEventListener("click", closeAddActivities);

const list = document.querySelectorAll("li");

list.forEach((input) =>
  input.addEventListener("click", (e) => {
    selection = e.target.textContent;
    activityName.textContent = selection;
    openAddActivities();
  })
);

activitiesList.addEventListener("click", (e) => {
  selection = e.target.textContent;
  activityName.textContent = selection;
  openAddActivities();
});

activityTime.addEventListener("click", () => {
  wrapper.style.display = "flex";
});

activitySaveButton.addEventListener("click", () => {
  acts.style.display = "none";
  addActivities.style.display = "none";
  html.removeChild(disable);
  nav.style.width = "0";
  main.style.marginLeft = "0";
  activitiesRecord = [alarmTime, selection];
  console.log(activitiesRecord);
  activitiesTemplate();
});

function activitiesTemplate() {
  console.log(activitiesRecord);
  const tab = document.createElement("div");
  tab.style.cssText =
    "color:blue; width:30%; border:1px solid red; border-radius: 5px; width: 50%; margin: 1em auto; text-align: center;";
  tab.textContent = activitiesRecord;
  body.appendChild(tab);
}
