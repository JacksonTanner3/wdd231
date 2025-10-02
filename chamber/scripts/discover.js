// Fetch and display Discover cards
async function loadDiscoverCards() {
    try {
        const response = await fetch("data/discover.json");
        if (!response.ok) throw new Error("Failed to load discover.json");
        const items = await response.json();
        const container = document.getElementById("discover-cards");

        items.forEach(item => {
            const card = document.createElement("section");
            card.classList.add("discover-card");

            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button>Learn More</button>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading discover cards:", error);
    }
}

// Handle visit message with localStorage
function displayVisitMessage() {
    const visitMessage = document.getElementById("visitMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetween = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysBetween < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

// Run both functions
document.addEventListener("DOMContentLoaded", () => {
    loadDiscoverCards();
    displayVisitMessage();
});
