(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const PollForm = require('./models/pollForm')
const root = document.getElementById('root')

function submitPollFormButton(parent) {
    const button = document.createElement('button')
    button.name = "submitPollForm"
    button.textContent = "+"
    button.addEventListener("click", () => savePollForm(parent))
    parent.append(button)
}

function editPollFormButton(parent) {
    const button = document.createElement('button')
    button.name = "editPollForm"
    button.textContent = "?"
    button.addEventListener("click", () => editPollForm(parent))
    parent.append(button)
}

function deletePollFormButton(parent) {
    const button = document.createElement('button')
    button.name = "deletePollForm"
    button.textContent = "-"
    button.addEventListener("click", () => ammendPollForms(parent))
    parent.append(button)
}

 function ammendPollForms(parent){
    let pollForms = document.getElementsByClassName('myPollEle')
    for (let i=0; i<pollForms.length; i++) {
        if (pollForms[i].dataset.number > parent.dataset.number) { 
            pollForms[i].dataset.number--
        }

    }
    parent.remove()
}

function savePollForm(parent){
    const form = parent.children[1]
    const myPoll = new PollForm({response: form.value, number: parent.dataset.number})
    parent.innerHTML = myPoll.html
    parent.dataset.number = parent.dataset.number
    editPollFormButton(parent)
    deletePollFormButton(parent)
}

function editPollForm(parent){
    const myPoll = new PollForm({response: parent.children[0].textContent, number: parent.dataset.number})
    parent.innerHTML = myPoll.formHtml
    parent.dataset.number = parent.dataset.number
    submitPollFormButton(parent)
    deletePollFormButton(parent)
}


document.getElementById('add-content').addEventListener("click", () => {
    const myNumber = document.getElementsByClassName('myPollEle').length + 1
    const myPoll = new PollForm({response: '', number: myNumber})
    const myPollElement = document.createElement('div')
    myPollElement.className = 'myPollEle'
    myPollElement.dataset.number = myNumber
    myPollElement.innerHTML = myPoll.formHtml
    root.append(myPollElement)
    myPollElement.append
    submitPollFormButton(myPollElement)
    deletePollFormButton(myPollElement)
})



},{"./models/pollForm":2}],2:[function(require,module,exports){
class PollForm {
    constructor(data) {
        this.number = data.number
        this.response = data.response
    }

    get formHtml() {
        const html =  
        `<label for="response"></label>
        <input type="text" name="response" placeholder="enter response text..." value="${this.response}": />`
        return html
    } 

    get html() {
        const html =  
        `<span>${this.response}</span>`
        return html
    } 
}

module.exports = PollForm
},{}]},{},[1]);
