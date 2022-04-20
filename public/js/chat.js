const socket = io()
const messages = document.querySelector('#messages')
const form = document.querySelector('#messageForm')
const username = document.querySelector('#username').value
const typing = document.querySelector('#typing')
const users = document.querySelector('#users')
const userElement = document.querySelectorAll('.userEl')
const chatId = document.querySelector('#chatId')
const joinButton = document.querySelector('#joinRoom')
const roomId = document.querySelector('#roomId').value

let input = document.querySelector('#message')

window.addEventListener('load', () => {
    messages.scrollTop = messages.scrollHeight
})

form.addEventListener('submit', e => {
    e.preventDefault()

    if (input.value) {
        socket.emit('new message', {
            message: input.value,
            date: new Date(),
            username: username,
            id: chatId.value
        })
        input.value = ''
    }
})

input.addEventListener('keypress', () => {
    if (input.value) {
        socket.emit('typing', { username })
    }
})

socket.on('new user', data => {
    data.forEach(user => {
        let userEl = document.createElement('li')
        userEl.classList.add('.userEl')

        console.log(userElement)

        userEl.setAttribute('data-username', user.username)

        if (user.username === username) {
            userEl.textContent = `You: ${user.username}`
        } else {
            userEl.textContent = user.username
        }

        users.appendChild(userEl)

        userElement.forEach(element => {
            console.log(element)
        })

        
    })
    console.log(data)
})

socket.on('new message', data => {
    input.value = ''

    let item = document.createElement('li')

    if (data.username === username) {
        item.classList.add('outgoing')
    } else {
        item.classList.add('incoming')
    }

    item.innerHTML = `
    <div class="metadata">
        <span class="author">${
            data.username == username ? 'You' : data.username
        }</span>
        <span class="date">${data.date}</span>
    </div>
    <p>${data.message}</p>
    `

    messages.appendChild(item)
    messages.scrollTop = messages.scrollHeight
})

socket.on('typing', data => {
    setTimeout(() => {
        typing.textContent = ''
    }, 3000)
    typing.textContent = data.username + ' is typing...'
})