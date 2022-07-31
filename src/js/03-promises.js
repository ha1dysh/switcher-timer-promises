import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

let step = null;
let delay = null;
let amount = null;
let ct = null;

function onSubmit(e) {
  e.preventDefault();

  delay = Number(form[0].value);
  step = Number(form[1].value);
  amount = Number(form[2].value);
  ct = 1

  setTimeout(() => createPromise(), delay);
  form.reset();
}

function createPromise() {
  const myPromise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${ct} in ${delay}ms`);
    }
    reject(`❌ Rejected promise ${ct} in ${delay}ms`);
  });

  myPromise
    .then(res => {
      console.log(res);
      Notify.success('Sol lucet omnibus');
    })
    .then(callAgain())
    .catch(error => {
      console.log(error);
      Notify.failure('Please, choose date in the future');
    });
}

function callAgain() {
  delay += step;
  ct += 1;
  if (ct <= amount) {
    setTimeout(() => createPromise(), delay);
  }
}
