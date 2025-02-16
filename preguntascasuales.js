
    /********************************************************************
     * CONFIGURACIÓN DE PREGUNTAS
     * Cada objeto en el arreglo "questions" tiene:
     *   - question: Texto de la pregunta.
     *   - image: URL de la imagen inicial.
     *   - options: Arreglo de opciones.
     *   - answer: Respuesta correcta.
     *   - note: Texto que se muestra al responder.
     *   - noteImage: URL de la imagen que reemplaza la imagen inicial al responder.
     *
     * Para agregar más preguntas, simplemente añade más objetos a este arreglo.
     ********************************************************************/
    const questions = [
      {
        question: "¿Quién ganó la Copa Mundial de la FIFA 2018?",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Russia_2018_World_Cup_Trophy.jpg",
        options: ["Francia", "Croacia", "Alemania", "Brasil"],
        answer: "Francia",
        note: "Francia ganó la Copa Mundial de 2018, venciendo a Croacia en la final 4-2.",
        noteImage: "https://upload.wikimedia.org/wikipedia/commons/7/7b/France_2018_World_Cup_Champions.jpg"
      },
      {
        question: "¿En qué equipo jugó Diego Maradona en 1986?",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Diego_Maradona_1986.jpg",
        options: ["Napoli", "Barcelona", "Boca Juniors", "Real Madrid"],
        answer: "Napoli",
        note: "En 1986, Diego Maradona jugó en el Napoli y llevó a Argentina a ganar el Mundial.",
        noteImage: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Maradona_Napoli.jpg"
      },
      {
        question: "¿Quién tiene más Balones de Oro?",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ballon_d%27Or_2021.jpg",
        options: ["Lionel Messi", "Cristiano Ronaldo", "Pelé", "Johan Cruyff"],
        answer: "Lionel Messi",
        note: "Lionel Messi tiene el récord de Balones de Oro, con 7 (hasta 2023).",
        noteImage: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Lionel_Messi_2021_Ballon_d%27Or.jpg"
      },
      {
        question: "¿Quién tiene más Balones de Oro?",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Ballon_d%27Or_2021.jpg",
        options: ["Lionel Messi", "Cristiano Ronaldo", "Pelé", "Johan Cruyff"],
        answer: "Lionel Messi",
        note: "Lionel Messi tiene el récord de Balones de Oro, con 7 (hasta 2023).",
        noteImage: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Lionel_Messi_2021_Ballon_d%27Or.jpg"
      }
      // Puedes agregar más preguntas aquí.
    ];

    /********************************************************************
     * FUNCIONES PARA MANEJO DE COOKIES
     ********************************************************************/
    function setCookie(name, value, days) {
      const d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    function getCookie(name) {
      const cname = name + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
          return c.substring(cname.length, c.length);
        }
      }
      return "";
    }
    function deleteCookie(name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    /********************************************************************
     * VARIABLES DEL QUIZ
     ********************************************************************/
    let currentQuestion = parseInt(getCookie("currentQuestion")) || 0;
    let score = parseInt(getCookie("score")) || 0;

    /********************************************************************
     * REFERENCIAS A LOS ELEMENTOS DEL DOM
     ********************************************************************/
    const questionTitle = document.getElementById("question-title");
    const questionImage = document.getElementById("question-image");
    const optionsContainer = document.getElementById("options-container");
    const questionNote = document.getElementById("question-note");
    const googleButton = document.getElementById("google-button");
    const nextButton = document.getElementById("next-button");
    const discoverMoreButton = document.getElementById("discover-more-button");
    const finalButtons = document.getElementById("final-buttons");
    const mainButtons = document.getElementById("main-buttons");
    const restartButton = document.getElementById("restart-button");
    const homeButton = document.getElementById("home-button");
    const discoverMoreFinal = document.getElementById("discover-more-final");

    /********************************************************************
     * MANEJO DE ERRORES EN LAS IMÁGENES
     ********************************************************************/
    function setupImageErrorHandler(imgElement) {
      imgElement.onerror = function() {
        console.error("Error cargando la imagen:", imgElement.src);
        imgElement.src = "https://via.placeholder.com/400x200?text=Imagen+no+disponible";
      };
    }
    setupImageErrorHandler(questionImage);

    /********************************************************************
     * CARGA DE LA PREGUNTA ACTUAL
     ********************************************************************/
    function loadQuestion() {
      // Si ya se han mostrado todas las preguntas, muestra el mensaje final.
      if (currentQuestion >= questions.length) {
        showFinalMessage();
        return;
      }
      const question = questions[currentQuestion];
      // Actualiza el título y la imagen principal (imagen inicial)
      questionTitle.textContent = question.question;
      questionImage.src = question.image;
      setupImageErrorHandler(questionImage);
      // Limpia las opciones previas y oculta el mensaje de nota
      optionsContainer.innerHTML = "";
      questionNote.style.display = "none";
      // Deshabilita el botón "Siguiente" hasta que se responda
      nextButton.disabled = true;
      nextButton.classList.add("disabled");
      // Crea los botones de opciones
      question.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "option";
        button.onclick = () => handleAnswer(option, button);
        optionsContainer.appendChild(button);
      });
      // Guarda el progreso en cookies
      setCookie("currentQuestion", currentQuestion, 7);
      setCookie("score", score, 7);
    }

    /********************************************************************
     * FUNCION QUE SE EJECUTA AL RESPONDER UNA PREGUNTA
     ********************************************************************/
    function handleAnswer(selectedOption, button) {
      const question = questions[currentQuestion];
      // Verifica la respuesta (suma puntaje si es correcta)
      if (selectedOption === question.answer) {
        score++;
        button.style.backgroundColor = "#16a34a";
      } else {
        button.style.backgroundColor = "#dc2626";
      }
      // Muestra el mensaje de nota
      questionNote.textContent = question.note;
      questionNote.style.display = "block";
      // Reemplaza la imagen principal por la imagen definida en noteImage
      if (question.noteImage) {
        questionImage.src = question.noteImage;
        setupImageErrorHandler(questionImage);
      }
      // Deshabilita todas las opciones para evitar múltiples respuestas
      document.querySelectorAll(".option").forEach(btn => {
        btn.disabled = true;
        btn.classList.add("disabled");
      });
      // Activa el botón "Siguiente"
      nextButton.disabled = false;
      nextButton.classList.remove("disabled");
      // Guarda el puntaje
      setCookie("score", score, 7);
    }

    /********************************************************************
     * FUNCION QUE MUESTRA EL MENSAJE FINAL
     ********************************************************************/
    function showFinalMessage() {
      questionTitle.textContent = `¡Quiz terminado! Tu puntaje es ${score} de ${questions.length}.`;
      // Asigna una imagen final (por ejemplo, de trofeo)
      questionImage.src = "https://upload.wikimedia.org/wikipedia/commons/e/ec/Trophy_Soccer.jpg";
      setupImageErrorHandler(questionImage);
      optionsContainer.innerHTML = "";
      questionNote.style.display = "none";
      // Oculta los botones principales y muestra los botones finales
      mainButtons.style.display = "none";
      finalButtons.style.display = "flex";
      // Borra las cookies ya que el quiz terminó
      deleteCookie("currentQuestion");
      deleteCookie("score");
    }

    /********************************************************************
     * EVENTOS DE LOS BOTONES
     ********************************************************************/
    nextButton.onclick = () => {
      currentQuestion++;
      loadQuestion();
    };
    googleButton.onclick = () => {
      window.open("https://www.google.com", "_blank");
    };
    discoverMoreButton.onclick = () => {
      window.open("https://www.ejemplo.com", "_blank"); // Cambia esta URL según tus necesidades
    };
    discoverMoreFinal.onclick = () => {
      window.open("https://www.ejemplo.com", "_blank");
    };
    restartButton.onclick = () => {
      currentQuestion = 0;
      score = 0;
      mainButtons.style.display = "flex";
      finalButtons.style.display = "none";
      loadQuestion();
    };
    homeButton.onclick = () => {
      window.location.href = "index.html";
    };

    /********************************************************************
     * INICIO: Carga la primera pregunta (o la que se recupere de las cookies)
     ********************************************************************/
    loadQuestion();