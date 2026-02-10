const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamInput = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

const maxCount = 50;
const storageKey = "sustainabilityCheckInData";

const teamLabels = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};

let attendees = [];

function getTeamCounts() {
  const teamCounts = { water: 0, zero: 0, power: 0 };
  for (let i = 0; i < attendees.length; i++) {
    const attendee = attendees[i];
    if (teamCounts.hasOwnProperty(attendee.team)) {
      teamCounts[attendee.team]++;
    }
  }
  return teamCounts;
}

function updateTeamCounts(teamCounts) {
  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;
}

function saveData() {
  localStorage.setItem(storageKey, JSON.stringify(attendees));
}

function loadData() {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        attendees = parsed;
      }
    } catch (error) {
      attendees = [];
    }
  }
  updateTeamCounts(getTeamCounts());
  updateAttendanceUI();
}

function updateAttendanceUI() {
  const count = attendees.length;
  attendeeCount.textContent = count;
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;
}

function greetAttendee(name, teamName) {
  const greeting = document.getElementById("greeting");
  greeting.textContent = `🎉 Welcome, ${name} from team ${teamName}! 🎉`;
  greeting.classList.add("success-message");
  greeting.style.display = "block";
  setTimeout(() => {
    greeting.classList.remove("success-message");
    greeting.style.display = "none";
  }, 5000);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const team = teamInput.value;
  const teamName = teamLabels[team];

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  if (team === "") {
    alert("Please select a team.");
    return;
  }

  if (attendees.length >= maxCount) {
    alert("Maximum number of check-ins reached.");
    return;
  }

  console.log(`Checked in: ${name} from ${teamName}`);

  attendees.push({ name: name, team: team, teamName: teamName });
  saveData();

  updateTeamCounts(getTeamCounts());

  updateAttendanceUI();
  greetAttendee(name, teamName);

  form.reset();
});

loadData();
