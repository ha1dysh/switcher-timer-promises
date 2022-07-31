const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

let step = null;
let delay = null;
let amount = null;
let ct = 1;

function onSubmit(e) {
  e.preventDefault();

  delay = Number(form[0].value);
  step = Number(form[1].value);
  amount = Number(form[2].value);

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
    })
    .then(callAgain())
    .catch(error => {
      console.log(error);
    });
}

function callAgain() {
  delay += step;
  ct += 1;
  if (ct <= amount) {
    setTimeout(() => createPromise(), delay);
  }
}
