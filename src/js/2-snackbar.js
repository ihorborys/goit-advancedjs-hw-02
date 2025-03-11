import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form')
const delayInput = document.querySelector('.delay-input')


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = Number(delayInput.value)
  const stateValue = document.querySelector('input[name="state"]:checked')


  const fulfilledMessage = (delay) => {
    iziToast.success({
      title: `✅ Fulfilled promise in ${delay} ms`,
      message: '',
      position: 'topRight',
      color: 'green',
      icon: "",
    });
  };

  const rejectedMessage = (delay) => {
    iziToast.error({
      title: `❌ Rejected promise in ${delay} ms`,
      message: '',
      position: 'topRight',
      color: 'red',
      icon: ""
    });
  };


  const promiseGenerator = new Promise((resolve, reject) =>  {

    setTimeout(() => {

      if (stateValue.value === 'fulfilled') {
        resolve(delay);

      } else {
        reject(delay);
      }

    }, delay);

  });

  promiseGenerator
    .then((delay) => fulfilledMessage(delay))
    .catch((delay) => rejectedMessage(delay));

  form.reset()

})