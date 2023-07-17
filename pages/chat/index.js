/**
 * FrontEndeiros 1.0
 * /pages/view/index.js - Controller de view
 * By Luferat
 * MIT License 2023 
 **/

$(document).ready(myChat)

function myChat() {
console.log("chat on");
        
}
const form = document.querySelector("form")
const chatMessages = document.querySelector(".chat__messages")
const input = document.querySelector(".sendMessage")
const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
let activeTab = 1, allData;

const init = () => {
    showActiveTabBody();
    showActiveTabHead();
}

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
    hideAllTabBody();
    allTabsBody[activeTab - 1].classList.add('show-tab');
}

const hideAllTabBody = () => allTabsBody.forEach(singleTabBody => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach(singleTabHead => singleTabHead.classList.remove('active-tab'));


window.addEventListener('DOMContentLoaded', () => init());

allTabsHead.forEach(singleTabHead => {
    singleTabHead.addEventListener('click', () => {
        hideAllTabHead();
        activeTab = singleTabHead.dataset.id;
        showActiveTabHead();
        showActiveTabBody();
    });
});

const getInputValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllSuperHero(searchText);
}


//searchForm.addEventListener('submitt', getInputValue);


form.addEventListener("submit", sendMessage)

function sendMessage(e) {
    e.preventDefault()

    if(input.value !== "") {
        var messageDiv = document.createElement("div")
        messageDiv.className = "message"

        var avatar = document.createElement("img")
        avatar.src = "assets/user4.jpg"

        var messageInfo = document.createElement("div")
        messageInfo.className = "message__info"

        var userInfo = document.createElement("h4")
        userInfo.innerHTML = "Daniel"

        var messageTimestamp = document.createElement("span")
        messageTimestamp.className = "message__timestamp"

        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth()).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")

        messageTimestamp.innerHTML = month + "/" + day + "/" + year

        const message = document.createElement("p")
        message.innerHTML = input.value
        input.value = ""

        userInfo.appendChild(messageTimestamp)
        messageInfo.appendChild(userInfo)
        messageInfo.appendChild(message)

        messageDiv.appendChild(avatar)
        messageDiv.appendChild(messageInfo)

        chatMessages.appendChild(messageDiv)
        chatMessages.scrollBy(0, 10000)
    }
}