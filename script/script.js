// import { fetchData } from './modules/fetch.js';

const navButton = document.querySelector("body > button")
const header = document.querySelector("header")

navButton.addEventListener('click', () => {
    if (header.classList.contains("openNav")) {
        header.classList.remove('openNav');
        header.classList.add('closeNav');
        navButton.classList.remove('openNav');
    } else {
        header.classList.add('openNav');
        header.classList.remove('closeNav');
        navButton.classList.add('openNav');
    }
})


// define the function that runs the countdown
const runCountdown = () => {
    let circles = document.querySelectorAll(".clock svg circle:nth-of-type(2)");
    let clockCounter = 0;
    let countDownInt;

    const countDown = () => {
        for (let i = 0; i < circles.length; i++) {
            if (circles[i] === circles[0]) {
                if (clockCounter <= 40) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (circles[i] === circles[1]) {
                if (clockCounter <= 15) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (circles[i] === circles[2]) {
                if (clockCounter <= 20) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (circles[i] === circles[3]) {
                if (clockCounter <= 45) {
                    circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                }
                clockCounter++;
            } else if (clockCounter <= 25) {
                circles[i].style.cssText = `stroke-dashoffset: calc(817 - (817 * ${clockCounter}) / 100);`;
                clockCounter++;
            }
            if (clockCounter === 100) {
                clearInterval(countDownInt);
            }
        }
    };
    // handle clicking on the clock
    countDownInt = setInterval(countDown, 60);
};

// call the function when the page is loaded
window.addEventListener("load", runCountdown);


const API_URL = "https://api.github.com/users/SundousKanaan";
const repos_URL = "https://api.github.com/users/SundousKanaan/repos";
// const titelsAPI_URL = `https://api.github.com/repos/SundousKanaan/${repoTitel}`;

async function fetchData(link) {
    try {
        const response = await fetch(link);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const avatarImg = document.querySelector("main > div > article:first-of-type > section:first-of-type img");
const h1Element = document.querySelector("main > div > article:first-of-type > section:first-of-type div h1");
const company = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:first-of-type");
const location = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:nth-of-type(2)");
const bio = document.querySelector("main > div > article:first-of-type > section:first-of-type div p:nth-of-type(3)");
const email = document.querySelector("main > div > article:first-of-type > section:first-of-type div a");

async function fetchFunction() {
    const allData = await fetchData(API_URL);
    // console.log("allData", allData);

    h1Element.textContent = allData.name;
    location.textContent = allData.location;
    email.href = `mailto: ${allData.email}`;
    email.textContent = allData.email;
    company.textContent = allData.company;

    bio.textContent = allData.bio;
    avatarImg.src = allData.avatar_url;
    avatarImg.alt = allData.name + " avatar foto";
}

fetchFunction();


// projects


const reposData = [];
const projectList = document.querySelector("main>div>article:nth-of-type(2) ul")

async function fetchRepos() {
    const allData = await fetchData(repos_URL);
    // console.log(allData);

    for (let i = 0; i < allData.length; i++) {
        if (allData[i].stargazers_count === 1) {
            const languages_URL = `https://api.github.com/repos/SundousKanaan/${allData[i].name}/languages`;
            const languagesData = await fetchData(languages_URL);
            reposData.push({
                name: allData[i].name,
                repo: allData[i].html_url,
                languages: Object.keys(languagesData),
                site: allData[i].homepage,
                description: allData[i].description
            });
        }
    }
    // console.log(reposData);

    makeProject(reposData);
}

fetchRepos();

const topRepos = ["TiltShift"]
async function makeProject(reposData) {

    for (let i = 0; i < reposData.length; i++) {
        const liElement = document.createElement("li");
        liElement.innerHTML = `
            <div>
                <h3>${reposData[i].name}</h3>
                <img src="./projectsimages/${reposData[i].name}.png" alt="project ${reposData[i].name} foto">
            </div>
            <section>
                <p>${reposData[i].description}</p>
                <p>Project languages: ${reposData[i].languages}</p>
                <div>
                <a href="${reposData[i].repo}" target="_blank">To repo</a>
                <a href="${reposData[i].site}" target="_blank">To site</a>
                </div>
            </section>
        `

        liElement.tabIndex = 6;
        projectList.appendChild(liElement)

        if (topRepos.includes(reposData[i].name)) {
            liElement.classList.add("GDA");
        }
    }

}


// UX/UI

const uxList = document.querySelector("main>div>article:nth-of-type(3) ul")
const uxfiles = [{
    name: "G-Book",
    link: "gbook",
    description: "Program for multiple devices to learn how to draw manga characters. An application that can make drawing a Manga character easier for novice artists."
},
{
    name: "MAAS",
    link: "maas",
    description: "Studying the product (coffee maker from MAS), studying the problems of users, and providing advice to improve the product in the form of an A3 poster."
}
]


//  "maas", "noted", "yae"];

function makeUXCards() {
    for (let i = 0; i < uxfiles.length; i++) {
        const li = document.createElement("li")
        li.innerHTML = `
             <h3>${uxfiles[i].name}</h3>
             <img src="./projectsimages/BusinessCard.png" alt="${uxfiles[i].name} foto">
             <button></button>

            <section>
                <p>${uxfiles[i].description}</p>
                <button></button>
                <a href="./${uxfiles[i].link}.html" target="display-frame" >Details</a>
            </section>
        `
        uxList.appendChild(li)
    }
    console.log("hi", uxList);
}

makeUXCards();

const openCardButtons = document.querySelectorAll("main>div>article:nth-of-type(3) ul li > button")
const Cards = document.querySelectorAll("main>div>article:nth-of-type(3) ul li")

for (let i = 0; i < openCardButtons.length; i++) {
    openCardButtons[i].addEventListener("click", () => {
        for (let i = 0; i < openCardButtons.length; i++) {
            if (Cards[i].classList.contains("openCard")) {
                Cards[i].classList.add("closeCard");
                Cards[i].classList.remove("openCard");
            }
        }
        Cards[i].classList.add("openCard");
    });
}


const closeCardButtons = document.querySelectorAll("main>div>article:nth-of-type(3) ul li section button")

for (let i = 0; i < closeCardButtons.length; i++) {
    closeCardButtons[i].addEventListener("click", () => {
        Cards[i].classList.remove("openCard");
        Cards[i].classList.add("closeCard");
    });
}


