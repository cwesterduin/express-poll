const buttonHandlers = require('../static/js/buttons.js')

describe ('dom functions', () => {

    describe('functions for formatting the buttons for each input section', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = `<div class="myPollEle" data-number="1"><input type="text" name="response" class="response-input" placeholder="enter response text..." value="" :=""></div>`
            global.responseSection = document.getElementsByName('response')[0]
            global.responseEle = document.getElementsByClassName('myPollEle')[0]
        })

        it('should append the submit button', () => {
            buttonHandlers.submitPollFormButton(responseEle)
            expect(responseEle.innerHTML).toBe('<input type=\"text\" name=\"response\" class=\"response-input\" placeholder=\"enter response text...\" value=\"\" :=\"\"><button name=\"submitPollForm\" type=\"button\">+</button>')
        })
        it('should append the edit button', () => {
            buttonHandlers.editPollFormButton(responseEle)
            expect(responseEle.innerHTML).toBe('<input type=\"text\" name=\"response\" class=\"response-input\" placeholder=\"enter response text...\" value=\"\" :=\"\"><button name=\"editPollForm\" type=\"button\">?</button>')
        })
        it('should append the delete button', () => { 
            buttonHandlers.deletePollFormButton(responseEle)
            expect(responseEle.innerHTML).toBe('<input type=\"text\" name=\"response\" class=\"response-input\" placeholder=\"enter response text...\" value=\"\" :=\"\"><button name=\"deletePollForm\" type=\"button\">-</button>')
        })
  
    })

    describe('functions for button actions on input', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = `<div id="root">
                                                <div class="myPollEle" data-number="1">
                                                <input type="text" name="response" class="response-input" placeholder="enter response text..." value="test response": />
                                                "<button name="submitPollForm" type="button">+</button>
                                                <button name="deletePollForm" type="button">-</button>
                                                </div></div>`
            global.responseEle = document.getElementsByClassName('myPollEle')[0]
            global.form = document.getElementsByName('response')[0]
            global.root = document.getElementById('root')

        })
        it('should lock in the form on submit click', () => { 
            buttonHandlers.savePollForm(responseEle)
            expect(root.innerHTML).toContain(`<div class="myPollEle" data-number="1"><span>test response</span><button name="editPollForm" type="button">?</button><button name="deletePollForm" type="button">-</button></div>`)
            expect(root.innerHTML).not.toContain(`<input type="text"`)
        })
        it('should throw an error on submit click if form is empty', () => { 
            form.value = ""
            expect( () => {buttonHandlers.savePollForm(responseEle);
            }).toThrow();    
            
        })

    })

    describe('functions for button actions on input2', () => {
        beforeEach(() => {
            document.documentElement.innerHTML = `<div id="root"><div class="myPollEle" data-number="1"><span>test response</span><button name="editPollForm" type="button">?</button><button name="deletePollForm" type="button">-</button></div><button id="submit-poll"></button></div>`
            global.responseEle = document.getElementsByClassName('myPollEle')[0]
            global.form = document.getElementsByName('response')[0]
            global.root = document.getElementById('root')

        })
            it('should reformat the element for editing response', () => { 
                buttonHandlers.editPollForm(responseEle)
                expect(root.innerHTML).toBe(`<div class=\"myPollEle\" data-number=\"1\"><input type=\"text\" name=\"response\" class=\"response-input\" placeholder=\"enter response text...\" value=\"test response\" :=\"\"><button name=\"submitPollForm\" type=\"button\">+</button><button name=\"deletePollForm\" type=\"button\">-</button></div><button id=\"submit-poll\"></button>`)
            })

        
        it('should delete a poll response object and ammend data-num of other elements on delete click', () => {
                buttonHandlers.ammendPollForms(responseEle)
                expect(root).not.toContain(`<div class=\"myPollEle\"`)
        })
    })

 

})