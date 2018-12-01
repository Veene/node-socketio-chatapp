var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});

socket.emit('createMessage', {
  from: 'Frank',
  text: 'Hi'
}, function (data) {
  console.log('got it', data)
})

const messageForm = document.getElementById("message-form")
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("input").value;
  socket.emit('createMessage', {
    from: 'User',
    text: inputValue
  })
})