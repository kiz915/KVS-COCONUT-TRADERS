/* === js/form.js === */
/* ================================================
   KVS COCONUT TRADERS — CONTACT FORM JAVASCRIPT
   Validates required fields, checks formatting, handles
   error messages, and presents a success message card.
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFormHandler();
});

/**
 * Attaches submit listeners, coordinates checks, and displays success feedback.
 */
function initFormHandler() {
  const form = document.getElementById('enquiryForm');
  const successMsg = document.getElementById('successMessage');

  if (!form || !successMsg) return;

  // Form Fields
  const nameInput = document.getElementById('formName');
  const phoneInput = document.getElementById('formPhone');
  const emailInput = document.getElementById('formEmail');
  const productSelect = document.getElementById('formProduct');
  const messageText = document.getElementById('formMessage');

  // Error Containers
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');
  const productError = document.getElementById('productError');
  const messageError = document.getElementById('messageError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset previous error states
    clearErrors();

    // Run validations
    let isValid = true;

    // 1. Name validation
    const nameVal = nameInput.value.trim();
    if (!nameVal) {
      setError(nameInput, nameError, 'Please enter your full name.');
      isValid = false;
    } else if (nameVal.length < 2) {
      setError(nameInput, nameError, 'Name must be at least 2 characters.');
      isValid = false;
    }

    // 2. Phone validation (10-digit Indian mobile number format)
    const phoneVal = phoneInput.value.trim().replace(/\s+/g, '');
    const cleanPhone = phoneVal.replace(/^[+91]+/g, ''); // strip prefix if added by user
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneVal) {
      setError(phoneInput, phoneError, 'Please enter your phone number.');
      isValid = false;
    } else if (!phoneRegex.test(cleanPhone)) {
      setError(phoneInput, phoneError, 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    }

    // 3. Email validation (Optional, validate format only if filled)
    const emailVal = emailInput.value.trim();
    if (emailVal) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        setError(emailInput, emailError, 'Please enter a valid email address.');
        isValid = false;
      }
    }

    // 4. Product Select validation
    const productVal = productSelect.value;
    if (!productVal) {
      setError(productSelect, productError, 'Please select a product of interest.');
      isValid = false;
    }

    // 5. Message validation
    const messageVal = messageText.value.trim();
    if (!messageVal) {
      setError(messageText, messageError, 'Please enter details of your enquiry.');
      isValid = false;
    } else if (messageVal.length < 10) {
      setError(messageText, messageError, 'Message must be at least 10 characters.');
      isValid = false;
    }

    // If all inputs pass validation, show success state
    if (isValid) {
      // Smoothly hide form
      form.style.opacity = '0';

      setTimeout(() => {
        form.style.display = 'none';

        // Display success response card
        successMsg.style.display = 'flex';

        // Optional scroll to top of form wrap for user visibility
        const formWrap = form.closest('.contact-form-wrap');
        if (formWrap) {
          formWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 300);
    }
  });

  // Dynamic clear error states on user input focus/change
  const inputFields = [
    { input: nameInput, err: nameError },
    { input: phoneInput, err: phoneError },
    { input: emailInput, err: emailError },
    { input: productSelect, err: productError },
    { input: messageText, err: messageError }
  ];

  inputFields.forEach(field => {
    const clearFieldHandler = () => {
      field.input.classList.remove('is-invalid');
      field.err.textContent = '';
    };

    field.input.addEventListener('input', clearFieldHandler);
    if (field.input.tagName === 'SELECT') {
      field.input.addEventListener('change', clearFieldHandler);
    }
  });

  /**
   * Clears all validation errors and states.
   */
  function clearErrors() {
    inputFields.forEach(field => {
      field.input.classList.remove('is-invalid');
      field.err.textContent = '';
    });
  }

  /**
   * Sets error border on field and loads custom message into target error container.
   */
  function setError(inputEl, errorEl, message) {
    inputEl.classList.add('is-invalid');
    errorEl.textContent = message;
  }
}
