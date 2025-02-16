 /********************************************************************
     * PREGUNTAS DEL MUNDIAL 2022 (Ejemplo con 10 preguntas difíciles)
     ********************************************************************/
 let questions = [
  {
    question: "¿Qué jugador fue el que más faltas cometió en el Mundial?",
    image: "images/imagesquiz/mundial2022/imagenote/Sin título(2).webp",
    options: ["Luka Modrić (Croacia)", "Achraf Hakimi (Marruecos)", "Casemiro (Brasil)", "Rodrigo De Paul (Argentina)"],
    answer: "Rodrigo De Paul (Argentina)",
    note: "Según las estadísticas oficiales de la FIFA, el jugador que más faltas cometió en el Mundial de Catar 2022 fue el mediocampista brasileño Casemiro, con un total de 19 faltas.",
    noteImage: "images/imagesquiz/mundial2022/Sin título.webp"
  },
  {
    question: "¿En qué país se celebró el Mundial 2022?",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Qatar-Flag.svg",
    options: ["Qatar", "Rusia", "Arabia Saudita", "Emiratos Árabes"],
    answer: "Qatar",
    note: "¡Correcto! El torneo se disputó en Qatar.",
    noteImage: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lusail_Iconic_Stadium.jpg"
  },
  {
    question: "¿Cuántos equipos participaron en el Mundial 2022?",
    image: "https://via.placeholder.com/400x220?text=Equipos",
    options: ["32", "24", "16", "20"],
    answer: "32",
    note: "¡Correcto! Participaron 32 equipos.",
    noteImage: "https://via.placeholder.com/400x220?text=32+Equipos"
  },
];

/********************************************************************
 * FUNCIÓN PARA MEZCLAR EL ARREGLO DE PREGUNTAS (Fisher-Yates)
 ********************************************************************/
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
// Baraja las preguntas
questions = shuffleArray(questions);

/********************************************************************
 * REFERENCIAS A LOS ELEMENTOS DEL DOM
 ********************************************************************/
const questionTitleElem = document.getElementById("question-title");
const questionCountElem = document.getElementById("question-count");
const questionImageElem = document.getElementById("question-image");
const optionsContainerElem = document.getElementById("options-container");
const questionNoteElem = document.getElementById("question-note");
const googleButtonElem = document.getElementById("google-button");
const nextButtonElem = document.getElementById("next-button");
const discoverMoreButtonElem = document.getElementById("discover-more-button");
const finalButtonsElem = document.getElementById("final-buttons");
const mainButtonsElem = document.getElementById("main-buttons");
const restartButtonElem = document.getElementById("restart-button");
const homeButtonElem = document.getElementById("home-button");
const discoverMoreFinalElem = document.getElementById("discover-more-final");

/********************************************************************
 * VARIABLES DEL QUIZ
 ********************************************************************/
let currentQuestionIndex = 0;
let score = 0;

/********************************************************************
 * ACTUALIZA EL CONTADOR DE PREGUNTAS
 ********************************************************************/
function updateQuestionCount() {
  questionCountElem.textContent = "Pregunta " + (currentQuestionIndex + 1) + " de " + questions.length;
}

/********************************************************************
 * CARGA LA PREGUNTA ACTUAL
 ********************************************************************/
function loadQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showFinalMessage();
    return;
  }
  updateQuestionCount();
  const q = questions[currentQuestionIndex];
  questionTitleElem.textContent = q.question;
  questionImageElem.src = q.image;
  questionImageElem.onerror = function() {
    questionImageElem.src = "https://via.placeholder.com/400x220?text=Imagen+no+disponible";
  };
  optionsContainerElem.innerHTML = "";
  questionNoteElem.style.display = "none";
  nextButtonElem.disabled = true;
  nextButtonElem.classList.add("disabled");
  
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "option";
    btn.onclick = () => handleAnswer(option, btn);
    optionsContainerElem.appendChild(btn);
  });
}

/********************************************************************
 * MANEJA LA RESPUESTA DE UNA PREGUNTA
 ********************************************************************/
function handleAnswer(selectedOption, btn) {
  const q = questions[currentQuestionIndex];
  if (selectedOption === q.answer) {
    score++;
    btn.style.backgroundColor = "#16a34a";
  } else {
    btn.style.backgroundColor = "#dc2626";
  }
  questionNoteElem.textContent = q.note;
  questionNoteElem.style.display = "block";
  if (q.noteImage) {
    questionImageElem.src = q.noteImage;
    questionImageElem.onerror = function() {
      questionImageElem.src = "https://via.placeholder.com/400x220?text=Imagen+no+disponible";
    };
  }
  document.querySelectorAll(".option").forEach(b => {
    b.disabled = true;
    b.classList.add("disabled");
  });
  nextButtonElem.disabled = false;
  nextButtonElem.classList.remove("disabled");
}

/********************************************************************
 * MUESTRA EL MENSAJE FINAL
 ********************************************************************/
function showFinalMessage() {
  questionTitleElem.textContent = "¡Quiz terminado! Tu puntaje es " + score + " de " + questions.length + ".";
  questionImageElem.src = "https://upload.wikimedia.org/wikipedia/commons/e/ec/Trophy_Soccer.jpg";
  questionImageElem.onerror = function() {
    questionImageElem.src = "https://via.placeholder.com/400x220?text=Imagen+no+disponible";
  };
  optionsContainerElem.innerHTML = "";
  questionNoteElem.style.display = "none";
  mainButtonsElem.style.display = "none";
  finalButtonsElem.style.display = "flex";
}

/********************************************************************
 * EVENTOS DE LOS BOTONES
 ********************************************************************/
nextButtonElem.onclick = function() {
  currentQuestionIndex++;
  loadQuestion();
};
googleButtonElem.onclick = function() {
  window.open("https://www.google.com", "_blank");
};
discoverMoreButtonElem.onclick = function() {
  window.open("https://www.ejemplo.com", "_blank");
};
discoverMoreFinalElem.onclick = function() {
  window.open("https://www.ejemplo.com", "_blank");
};
restartButtonElem.onclick = function() {
  currentQuestionIndex = 0;
  score = 0;
  mainButtonsElem.style.display = "flex";
  finalButtonsElem.style.display = "none";
  loadQuestion();
};
homeButtonElem.onclick = function() {
  window.location.href = "index.html";
};

/********************************************************************
 * INICIO: Cargar la primera pregunta
 ********************************************************************/
loadQuestion();