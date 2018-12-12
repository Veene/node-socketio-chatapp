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

socket.on('newLocationMessage', function (message) {
  console.log('trying to get location and setting anchor');
  const ol = document.getElementById("render-message");
  const li = document.createElement('li');
  const a = document.createElement('a');
  li.textContent = `${message.from}: `;
  a.textContent = `My current location`;
  a.setAttribute('href', message.url);
  li.append(a);
  ol.appendChild(li);
});

const messageForm = document.getElementById("message-form")
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("input").value;
  socket.emit('createMessage', {
    from: 'User',
    text: inputValue
  }, function(data){
    console.log(data);
    document.getElementById("input").value = '';
  })

})
const locationButton = document.getElementById("send-location")
locationButton.addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Geolocation not support by your browser')
  }

  locationButton.setAttribute('disabled', 'disabled');
  locationButton.textContent = "Sending Location";


  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttribute('disabled')
    locationButton.textContent = "Send Location";
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    alert('unable fetch location.')
    locationButton.removeAttribute('disabled')
    locationButton.textContent = "Send Location";
  })
})
