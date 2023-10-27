const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onCreateBtnClick);

function onCreateBtnClick(e) {
  e.preventDefault();

  const firstDelay = Number(refs.form.elements.delay.value);
  const step = Number(refs.form.elements.step.value);
  const amount = Number(refs.form.elements.amount.value);

  for (let i = 0; i < amount; i++) {
    const promise = createPromise(i + 1, firstDelay + step * i);
    promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const obj = { position, delay };

    setTimeout(() => {
      if (shouldResolve) {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
  return promise;
}
