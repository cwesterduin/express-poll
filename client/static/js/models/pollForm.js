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