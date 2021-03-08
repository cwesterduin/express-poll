class PollForm {
    constructor(data) {
        this.number = data.number
        this.response = data.response
    }

    get formHtml() {
        const html =  
        `<label for="response"></label>
        <input type="text" name="response" placeholder="${ this.response ? this.response : 'enter response text...'}" />`
        return html
    } 

    get html() {
        const html =  
        `<div>${this.number}.${this.response}</div>`
        return html
    } 
}

module.exports = PollForm