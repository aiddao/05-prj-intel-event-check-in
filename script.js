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

form.addEventListener("submit", function (event) {
  event.preventDefault();
  count++;
  if (count >= maxCount) {
    alert("Maximum number of check-ins reached.");
    count--;
    return;
  }
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

  const message = `Welcome, ${name} from team ${teamName}!`;
  console.log(message);

  updateAttendanceUI();

  form.reset();
});
