const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamInput = document.getElementById("teamSelect");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const team = teamInput.value;
    
    if (name === "") {
        alert("Please enter your name.");
        return;
    }
    
    if (team === "") {
        alert("Please select a team.");
        return;
    }
    
    alert(`Check-in successful!\nName: ${name}\nTeam: ${team}`);
    
    form.reset();
});