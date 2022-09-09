function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),
  }

refs.btnStart.addEventListener('click', onChangeColor);
refs.btnStop.addEventListener('click', onStopChangeColor);

let timerId = null;

function onChangeColor (evt) {

     timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
   
  evt.target.setAttribute('disabled', 'true');
  refs.btnStop.removeAttribute('disabled');
}

function onStopChangeColor (evt) {
   clearInterval(timerId);
   evt.target.setAttribute('disabled', 'true');
   refs.btnStart.removeAttribute('disabled')

}