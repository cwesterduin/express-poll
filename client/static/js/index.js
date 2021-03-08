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


