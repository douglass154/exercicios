const form = document.querySelector('form');
const fields = document.querySelectorAll('input');
const message = document.querySelector('textarea');
const btnSubmit = document.querySelector('#btn-submit');
const error = document.querySelectorAll('.error');

const modal = document.querySelector('.modal');
const btnModal = document.querySelector('#btn-modal');

const addOrRemoveError = (index, adiciona) => {
   if (adiciona === true) {
      error[index].classList.add('active');
   } else {
      error[index].classList.remove('active');
   }
};

const emailIsValid = email => {
   let isValid = /\S+@\S+\.\S+/;
   return isValid.test(email);
};

btnSubmit.addEventListener('click', event => {
   event.preventDefault();

   let isValid = true;

   // Validate names
   for (let i = 0; i < 2; i++) {
      if (fields[i].value === '') {
         addOrRemoveError(i, true);
         isValid = false;
      } else {
         addOrRemoveError(i, false);
      }
   }

   // Validate emails
   if (fields[2].value === '') {
      addOrRemoveError(2, true);
      addOrRemoveError(3, true);
      isValid = false;
   } else if (!emailIsValid(fields[2].value)) {
      addOrRemoveError(2, false);
      addOrRemoveError(3, true);
      isValid = false;
   } else {
      addOrRemoveError(2, false);
      addOrRemoveError(3, false);
   }

   // Validate querys
   if (fields[3].checked || fields[4].checked) {
      addOrRemoveError(4, false);
   } else {
      addOrRemoveError(4, true);
      isValid = false;
   }

   // Validate textarea
   if (message.value === '') {
      addOrRemoveError(5, true);
      isValid = false;
   } else {
      addOrRemoveError(5, false)
   }

   // Validate contacted by team
   if (!fields[5].checked) {
      addOrRemoveError(6, true);
      isValid = false;
   } else {
      addOrRemoveError(6, false);
   }

   // Open modal
   if (isValid === true) {
      modal.classList.add('active');

      btnModal.addEventListener('click', () => {
         fields.forEach((field) => {
            field.value = '';
            field.checked = false;
            message.value = '';
            modal.classList.remove('active');
         })

         fields[6].value = "Submit";
      })
   }
});
