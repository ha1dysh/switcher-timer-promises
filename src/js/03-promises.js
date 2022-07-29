const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

let step = null;
let delay = null;
let position = null;

function onSubmit(e) {
  e.preventDefault();

  step = Number(form[0].value);
  delay = Number(form[1].value);
  amount = Number(form[2].value);

  for (let i = 0; i < amount; i++) {
    const createPromise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      setTimeout(() => {
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${i} in ${delay}ms`);
        }
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }, delay);
    });
    createPromise.then((res) => console.log(res)).catch((error) => console.log(error))
    delay+=step
  }
}
