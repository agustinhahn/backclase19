const socket = io();

let user = null;

if (!user) {
    Swal.fire({
        title: "¡Welcome to chat!",
        input: "Insert your user:",
        input: "text",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return "Your user is required";
            }
        }
    }).then((input) => {
        user = input.value;
        socket.emit('newUser', user);
    })
}

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () => {
    socket.emit('chat:message', {
        user,
        message: message.value
    })
    message.value = '';
})

socket.on('messages', (data) => {
    console.log(data)
    actions.innerHTML = ''
    const chatRender = data.map((msg) => {
        return `<p><strong>${msg.user}</strong>: ${msg.message}</p>`
    }).join(' ')

    output.innerHTML = chatRender
})

socket.on('newUser', (user) => {
    Toastify({
        text: `${user} is logged in`,
        duration: 3000,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', user)
})

socket.on('chat:typing', (data) => {
    actions.innerHTML = `<p>${data} is writing a message...</p>`
})