//Copyright
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ano").textContent = new Date().getFullYear();
});

const questions = [
    {
      type: 'multiple',
      question: '1. Qual é o tipo de serviço que está a procurar?',
      options: [
        'Sistemas de videovigilância',
        'Alarmes e monitorização',
        'Controlo de acessos',
        'Deteção térmica e incêndios',
        'Outros (especifique abaixo)'
      ]
    },
    {
      type: 'text',
      question: '2. Qual é o nome da sua empresa? (Se aplicável)'
    },
    {
      type: 'text',
      question: '3. Qual é o seu nome?'
    },
    {
      type: 'text',
      question: '4. Qual é o seu número de telefone?'
    },
    {
      type: 'text',
      question: '5. Qual é o seu email?'
    },
    {
      type: 'multiple',
      question: '6. Em que área pretende implementar a solução de segurança?',
      options: [
        'Residencial',
        'Comercial',
        'Industrial',
        'Outro (especifique abaixo)'
      ]
    },
    {
      type: 'multiple',
      question: '7. Qual é a sua principal preocupação de segurança?',
      options: [
        'Prevenção de incêndios',
        'Monitorização de ambientes internos',
        'Monitorização de áreas externas',
        'Controle de acesso de pessoal',
        'Outro (especifique abaixo)'
      ]
    },
    {
      type: 'multiple',
      question: '8. Quais os produtos ou soluções que pretende incluir no orçamento?',
      options: [
        'Câmaras de videovigilância',
        'Alarmes e sensores',
        'Controlo de acessos',
        'Sistema de deteção de incêndios',
        'Outro (especifique abaixo)'
      ]
    },
    {
      type: 'multiple',
      question: '9. Como podemos ajudar?',
      options: [
        'Preciso de um orçamento detalhado',
        'Preciso de informações sobre produtos',
        'Outras necessidades (especifique abaixo)'
      ]
    }
  ];

  let currentIndex = 0;
  const collectedAnswers = [];
  const questionText = document.getElementById('question-text');
  const answersContainer = document.getElementById('answers-container');

  function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = (currentIndex / questions.length) * 100;
    progressBar.style.width = progress + "%";
  }

  function loadQuestion(index) {
    if (index >= questions.length) {
      console.log("Todas as perguntas respondidas. Enviando email...");
      updateProgressBar(); // Garantir 100% antes de enviar
      sendMail();
      return;
    }

    document.getElementById('question-container').classList.add('hidden');

    setTimeout(() => {
      answersContainer.innerHTML = '';
      questionText.textContent = questions[index].question;
      updateProgressBar();

      if (questions[index].type === 'multiple') {
        questions[index].options.forEach(option => {
          const btn = document.createElement('button');
          btn.className = 'option-btn';
          btn.textContent = option;

          btn.addEventListener('click', () => {
            if (option.includes("(especifique abaixo)")) {
              createSpecifyInput(option);
            } else {
              collectedAnswers.push(option);
              nextQuestion();
            }
          });

          answersContainer.appendChild(btn);
        });
      } else if (questions[index].type === 'text') {
        const input = document.createElement('input');
        input.className = 'text-input';
        input.type = 'text';
        input.placeholder = 'Digite sua resposta aqui';
        answersContainer.appendChild(input);

        const submitBtn = document.createElement('button');
        submitBtn.className = 'option-btn';
        submitBtn.textContent = 'Enviar';
        submitBtn.addEventListener('click', () => {
          if (input.value.trim() !== '') {
            collectedAnswers.push(input.value);
            nextQuestion();
          } else {
            alert('Por favor, preencha este campo.');
          }
        });
        answersContainer.appendChild(submitBtn);
      }

      document.getElementById('question-container').classList.remove('hidden');
    }, 500);
  }

  function createSpecifyInput(option) {
    if (!document.getElementById("specify-input")) {
      const specifyInput = document.createElement("input");
      specifyInput.type = "text";
      specifyInput.placeholder = "Especifique abaixo...";
      specifyInput.id = "specify-input";
      specifyInput.className = "text-input";
      answersContainer.appendChild(specifyInput);

      const confirmBtn = document.createElement("button");
      confirmBtn.className = 'option-btn';
      confirmBtn.textContent = "Confirmar";
      confirmBtn.addEventListener("click", () => {
        if (specifyInput.value.trim() !== '') {
          collectedAnswers.push(option.replace(" (especifique abaixo)", "") + ": " + specifyInput.value);
          nextQuestion();
        } else {
          alert('Por favor, preencha este campo.');
        }
      });

      answersContainer.appendChild(confirmBtn);
    }
  }

  function nextQuestion() {
    currentIndex++;
    console.log(`Avançando para a pergunta ${currentIndex}`);
    loadQuestion(currentIndex);
  }

  function sendMail(){
    let parms = {
      service_type: collectedAnswers[0] || "",
      company: collectedAnswers[1] || "",
      name: collectedAnswers[2] || "",
      phone: collectedAnswers[3] || "",
      email: collectedAnswers[4] || "",
      implementation_area: collectedAnswers[5] || "",
      main_concern: collectedAnswers[6] || "",
      products: collectedAnswers[7] || "",
      assistance: collectedAnswers[8] || "",
      all_answers: collectedAnswers.join("\n")
    };

    emailjs.send("service_v7ylwcr", "template_fgh8olh", parms)
      .then(function(response) {
        console.log("Email enviado!", response);
        document.getElementById('question-container').innerHTML = `
          <h2>Entraremos em contacto!</h2>
          <p>Obrigado por responder. Em breve entraremos em contacto.</p>
        `;
      })
      .catch(function(error) {
        console.error("Erro ao enviar email", error);
        alert("Ocorreu um erro ao enviar o email.");
      });
  }

  // Inicia o fluxo de perguntas e a progress bar
  updateProgressBar();
  loadQuestion(currentIndex);

