class PollForm {
    constructor(data) {
        this.number = data.number
        this.response = data.response
    }

    get formHtml() {
        const html =  
        `<input type="text" name="response" class="response-input" placeholder="enter response text..." value="${this.response}": />`
        return html
    } 

    get html() {
        const html = document.createElement('div')
        const htmlInner = document.createElement('span')
        html.className = 'myPollEle'
        html.dataset.number = this.number
        html.append(htmlInner)
        htmlInner.textContent = this.response
        return html
    } 
}

module.exports = PollForm