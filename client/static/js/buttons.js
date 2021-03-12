const PollForm = require('./models/pollForm')


function submitPollFormButton(parent) {
    const button = document.createElement('button')
    button.name = "submitPollForm"
    button.type = "button"
    button.textContent = "+"
    button.addEventListener("click", () => savePollForm(parent))
    parent.append(button)
}

function editPollFormButton(parent) {
    const button = document.createElement('button')
    button.name = "editPollForm"
    button.type = "button"
    button.textContent = "?"
    button.addEventListener("click", () => editPollForm(parent))
    parent.append(button)
}

function deletePollFormButton(parent) {
    const button = document.createElement('button')
    button.name = "deletePollForm"
    button.type = "button"
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
    let createPollButton = document.getElementById('submit-poll')
    if (pollForms.length < 2) {createPollButton.remove()}
}

function savePollForm(parent){
    try {
        console.log(parent)
        const form = parent.getElementsByClassName('response-input')[0]
        if (form.value.length < 1) throw new RangeError("input value empty");
        const myPoll = new PollForm({response: form.value, number: parent.dataset.number})
        const newPollEle = myPoll.html
        document.getElementById('root').replaceChild(newPollEle, parent)
        editPollFormButton(newPollEle)
        deletePollFormButton(newPollEle)
    } catch (err) {
        console.log(err)
        throw err
    }
}

function editPollForm(parent){
    const myPoll = new PollForm({response: parent.children[0].textContent, number: parent.dataset.number})
    parent.innerHTML = myPoll.formHtml
    parent.dataset.number = parent.dataset.number
    submitPollFormButton(parent)
    deletePollFormButton(parent)
}

module.exports = {
    submitPollFormButton,
    editPollFormButton,
    deletePollFormButton,
    ammendPollForms,
    savePollForm,
    editPollForm
}