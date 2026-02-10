const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamInput = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

let count = 0;
const maxCount = 50;

function updateAttendanceUI() {
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
  if (count >= maxCount) {
    alert("Maximum number of check-ins reached.");
    count--;
    return;
  }
  count++;
  const name = nameInput.value.trim();
  const team = teamInput.value;
  const teamName = teamInput.selectedOptions[0].text;

  if (name === "") {
    alert("Please enter your name.");
    return;
  }

  if (team === "") {
    alert("Please select a team.");
    return;
  }

  console.log(`Checked in: ${name} from ${teamName}`);

  const teamCounter = document.getElementById(team + "Count");
  const current = parseInt(teamCounter.textContent);

  const newTotal = current + 1;
  teamCounter.textContent = newTotal;

  updateAttendanceUI();
  greetAttendee(name, teamName);

  form.reset();
});
