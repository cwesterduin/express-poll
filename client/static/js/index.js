const PollForm = require('./models/pollForm')
const PollButtons = require('./buttons')
const root = document.getElementById('root')

document.getElementById('add-content').addEventListener("click", () => {
    const myNumber = document.getElementsByClassName('myPollEle').length + 1
    const myPoll = new PollForm({response: '', number: myNumber})
    const myPollElement = document.createElement('div')
    myPollElement.className = 'myPollEle'
    myPollElement.dataset.number = myNumber
    myPollElement.innerHTML = myPoll.formHtml
    root.append(myPollElement)
    myPollElement.append
    PollButtons.submitPollFormButton(myPollElement)
    PollButtons.deletePollFormButton(myPollElement)
})


