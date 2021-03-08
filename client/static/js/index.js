const PollForm = require('./models/pollForm')
const PollButtons = require('./buttons')
const postData = require('./api')

const root = document.getElementById('root')
const form = document.querySelector('form')

document.getElementById('add-content').addEventListener("click", () => {
    try {
        if (document.getElementsByClassName('myPollEle').length >= 9) throw new RangeError('max 9 responses')
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
    } catch(err) {
        alert(err)
        throw err
    }
})

document.getElementById('add-content').addEventListener("click", () => {
    if (document.getElementsByClassName('myPollEle').length > 1
    && !document.getElementById('submit-poll')) {
        const submit = document.createElement('input')
        submit.type = 'submit'
        submit.id = 'submit-poll'
        submit.value = 'submit poll'
        document.getElementById('root-end').append(submit)
        form.addEventListener("submit", event => addNewForm(event))
    }
})

function addNewForm(e){
    let formData = { responses: [] }
    try {
        e.preventDefault()
        formData.name = e.target.pollName.value
        if (formData.name.length < 1) throw new Error('name your form')
        let responseList = e.target.getElementsByClassName('myPollEle')
        for (let i=0; i<responseList.length; i++) {
            if (responseList[i].children[0].nodeName === 'INPUT') throw new Error('you have empty inputs')
            formData.responses.push({id: responseList[i].dataset.number, title: responseList[i].children[0].textContent, votes: []})
        }
        postData('http://localhost:3000/polls', formData)
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
          })
    } catch(err) {
        alert(err)
        throw err
    }
}

const testData = {
    name: "testPoll",
    responses: [
      {
        id: 1,
        title: "Test 1",
        votes: []
      },
      {
        id: 2,
        title: "Test 2",
        votes: []
      }
    ]
  }


