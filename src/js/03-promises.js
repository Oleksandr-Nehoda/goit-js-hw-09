import Notiflix from 'notiflix';

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  btnCreatePromise: document.querySelector('[type="submit"]'),
}

refs.btnCreatePromise.addEventListener('click', onCreatePromise);

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

   if (shouldResolve) {
      resolve({position, delay})
    } else {
      reject({position, delay})
    }
  });
}

function onCreatePromise(event) {
  event.preventDefault();

  let position = null;
  let delay = Number(refs.delay.value);
  let delayStep = Number(refs.step.value);
  let amount = Number(refs.amount.value);
  
  console.log(delay);
  console.log(delayStep);
  console.log(amount);
  
   const timerTimeout = setTimeout(() => {

    position += 1; 
    if (position <= amount) {

      createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => {

        delay = delay + delayStep;
      })

    } else {
      clearTimeout(timerTimeout);
    }

    const timerInterval = setInterval ( () => {
       position += 1; 
       if (position <= amount) {
   
         createPromise(position, delay)
         .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
         })
         .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
         })
         .finally(() => {
           delay = delay + delayStep;
         })
   
       } else {
         clearInterval(timerInterval);
       }
      
     },delayStep);
    
   }, delay);
}









