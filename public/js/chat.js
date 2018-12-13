var socket = io();

function scrollToBottom () {
  //Selectors
  let messages = document.getElementById('render-message')
  let newMessage = messages.lastElementChild;
  // console.log('newMessage', newMessage)
  //Heights
  let clientHeight = messages.clientHeight;
  // console.log('clientHeight', clientHeight)
  let scrollTop = messages.scrollTop;
  // console.log('ScrollTop', scrollTop)
  let scrollHeight = messages.scrollHeight;
  // console.log('scrollHeight', scrollHeight)
  let newMessageHeight = newMessage.clientHeight;
  // console.log('newMessageHeight', newMessageHeight)
  let lastMessageHeight;
  if(newMessage.previousSibling) {
    lastMessageHeight = newMessage.previousSibling.clientHeight;
  } else {
    lastMessageHeight = 0;
  }
  
  // console.log('lastMessageHeight', lastMessageHeight)

  if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight) {
    // console.log('should autoscroll');
    messages.scrollTop = scrollHeight;
  }
}

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.getElementById('message-template').innerHTML
  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  const ol = document.getElementById("render-message")
  const div = document.createElement('div');
  div.innerHTML = html;
  ol.appendChild(div);
  scrollToBottom();


  
  // console.log('newMessage', message);
  // const ol = document.getElementById("render-message")
  // const li = document.createElement('li');
  // li.textContent = `${message.from} ${formattedTime}: ${message.text}`;
  // ol.appendChild(li)
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.getElementById('location-message-template').innerHTML
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime 
  });
  const ol = document.getElementById("render-message")
  const div = document.createElement('div');
  div.innerHTML = html;
  ol.appendChild(div);
  scrollToBottom();

  // console.log('trying to get location and setting anchor');
  // const formattedTime = moment(message.createdAt).format('h:mm a');
  // const ol = document.getElementById("render-message");
  // const li = document.createElement('li');
  // const a = document.createElement('a');
  // li.textContent = `${message.from} ${formattedTime}: `;
  // a.textContent = `My current location`;
  // a.setAttribute('href', message.url);
  // li.append(a);
  // ol.appendChild(li);
});

const messageForm = document.getElementById("message-form")
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = document.getElementById("input").value;
  socket.emit('createMessage', {
    from: 'User',
    text: inputValue
  }, function(data){
    // console.log('data', data);
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
