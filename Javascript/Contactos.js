//Copyright
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ano").textContent = new Date().getFullYear();
});

// Prevent the default form submission and handle validation manually
document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission (page reload)
  validateForm(); // Call the validation function
});

function validateForm() {
  // Clear all previous errors
  clearAllErrors();

  // Flag to track if the form is valid
  let isValid = true;

  // Validates the Name   
  var Nome = document.getElementById('Nome');
  if (Nome.value.length < 2) {
      isValid = false;
      showError("Nome", "Insira o nome completo");
  }

  // Validates the Email
  var Email = document.getElementById("Email");
  if (!validateEmail(Email.value)) {
      isValid = false;
      showError("Email", "Insira um email válido");
  }

  // Validates the Phone Number
  var Telemovel = document.getElementById("Telemovel");
  if (!validateTelemovel(Telemovel.value)) {
      isValid = false;
      showError("Telemovel", "Insira um telemovel válido");
  }

  // Validates the Subject
  var Mensagem = document.getElementById("Assunto");
  if (Mensagem.value.length < 5) {
      isValid = false;
      showError("Assunto", "Insira assunto");
  }

  // Validates the Message
  var Mensagem = document.getElementById("Mensagem");
  if (Mensagem.value.length < 5) {
      isValid = false;
      showError("Mensagem", "Insira mensagem");
  }

  // Validates the Terms and Conditions
  var Termos = document.getElementById("Termos");
  if (!Termos.checked) {
      isValid = false;
      showError("Termos", "Aceite os termos e condições");
  }

  // If the form is valid, proceed to submit and refresh the page
  if (isValid) {
      alert("Formulário enviado com sucesso!");
      // Refreshs the page
      location.reload();
  }

  if (isValid) {
    sendMail();
  }
}

//Shows the errors of validations
function showError(campoID, mensagem) {
  var elemento = document.getElementById(campoID);
  if (elemento) {
      elemento.classList.add("is-invalid");
      var feedbackdiv = document.querySelector(`#${campoID} ~ .invalid-feedback`);
      if (feedbackdiv) {
          feedbackdiv.textContent = mensagem;
          feedbackdiv.style.display = "block";
      }
  }
}

//Hides the errors from validation
function clearAllErrors() {
  // Remove the "is-invalid" class from all inputs
  var inputs = document.querySelectorAll(".is-invalid");
  inputs.forEach(function(input) {
      input.classList.remove("is-invalid");
  });

  // Hide all feedback messages
  var feedbacks = document.querySelectorAll(".invalid-feedback");
  feedbacks.forEach(function(feedback) {
      feedback.style.display = "none";
      feedback.textContent = "";
  });
}

//Validtes if is an Email
function validateEmail(Email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(Email);
}

//Validates if it is a Phone Number
function validateTelemovel(Telemovel) {
  var regex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
  return regex.test(Telemovel);
}


//Pega os dados e envia para o EmailJS
function sendMail(){
    let parms ={
        nome : document.getElementById("Nome").value,
        email :  document.getElementById("Email").value,
        telemovel : document.getElementById("Telemovel").value,
        assunto :document.getElementById("Assunto").value,
        mensagem : document.getElementById("Mensagem").value,
        reply_to: document.getElementById("Email").value
    }
    emailjs.send("service_v7ylwcr", "template_fgh8olh", parms)
    .then(function(response) {
      console.log("Email enviado!", response);
      alert("Email enviado com sucesso!");
    })
    .catch(function(error) {
      console.error("Erro ao enviar email", error);
      alert("Ocorreu um erro ao enviar o email.");
    });
}

