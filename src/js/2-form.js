const form = {
  feedbackForm: document.querySelector('.feedback-form')
}

let formData = {
  email: "",
  message: ""
}

const fillFormFields = (feedbackForm) => {
  try {
    const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));

    if (formDataFromLS === null) {
      return;
    }

    formData = formDataFromLS;

    const formDataKeys = Object.keys(formDataFromLS);

    formDataKeys.forEach(key => {
      feedbackForm.elements[key].value = formDataFromLS[key];

    })

  } catch (error) {
    console.log(error);
  }
}

fillFormFields(form.feedbackForm);

const onFieldInput = (event) => {
  const formField = event.target;
  const formFieldValue = formField.value;
  const formFieldName = formField.name;

  formData[formFieldName] = formFieldValue.trim();

  localStorage.setItem("feedback-form-state", JSON.stringify(formData))
};

const onfeedbackFormSubmit = event => {
  event.preventDefault();

  if (!form.feedbackForm.elements.email.value ||
    !form.feedbackForm.elements.message.value) {

    alert('Fill please all fields');

  } else {

    console.log(formData);

    form.feedbackForm.reset();
    localStorage.removeItem('feedback-form-state');

    formData = {
      email: "",
      message: ""
    }
  }
}

form.feedbackForm.addEventListener('input', onFieldInput);
form.feedbackForm.addEventListener('submit', onfeedbackFormSubmit);
