const search = document.querySelector('input');
const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

document.querySelector('#img-forecast').style.display = 'none';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = `/weather?address=${search.value}`;

  document.querySelector('#img-forecast').style.display = 'none';
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(url).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        document.querySelector('#img-forecast').style.display = 'block';
        document
          .querySelector('#img-forecast')
          .setAttribute('src', data.imgURL);
      }
    });
  });
});
