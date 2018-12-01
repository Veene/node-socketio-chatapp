var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  const ol = document.getElementById("render-message")
  const li = document.createElement('li');
  li.textContent = `${message.from}: ${message.text}`;
  ol.appendChild(li)
});

const messageForm = document.getElementById("message-form")
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("input").value;
  socket.emit('createMessage', {
    from: 'User',
    text: inputValue
  })
})
