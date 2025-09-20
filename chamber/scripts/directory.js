const currentyear = document.querySelector('#currentyear');
const today = new Date();
currentyear.textContent = today.getFullYear();

const lastmodified = document.querySelector('#lastmodified');
lastmodified.textContent = "Last Modified: " + document.lastModified;

const getMembersData = async () => {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const displayMembers = (members) => {
    const cardsContainer = document.querySelector('#cards-container');
    if (!cardsContainer) {
        console.log("Not on the directory page. Skipping member display.");
        return;
    }
    members.forEach((member) => {
        const memberCard = document.createElement("section");
        memberCard.classList.add("member-card");
        const image = document.createElement("img");
        image.src = member.logo;
        image.alt = member.name;
        memberCard.appendChild(image);
        const fullName = document.createElement("h2");
        fullName.textContent = member.name;
        memberCard.appendChild(fullName);
        const address = document.createElement("p");
        address.textContent = member.address;
        memberCard.appendChild(address);
        const phoneNumber = document.createElement("p");
        phoneNumber.textContent = member.phone;
        memberCard.appendChild(phoneNumber);
        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = member.website;
        memberCard.appendChild(website);
        cardsContainer.appendChild(memberCard);
    });
};

const modeButton = document.querySelector("#mode-button");
if (modeButton) {
    const cardsContainer = document.querySelector("#cards-container");
    modeButton.addEventListener("click", () => {
        if (cardsContainer.classList.contains("list")) {
            cardsContainer.classList.remove("list");
            modeButton.textContent = "Switch to List View";
        } else {
            cardsContainer.classList.add("list");
            modeButton.textContent = "Switch to Grid View";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector('#cards-container')) {
        getMembersData();
    }
});