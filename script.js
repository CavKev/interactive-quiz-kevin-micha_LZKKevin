function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

  //Definition der Konstanten
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const createPDFButton = document.getElementById("create-pdf-btn");

let currentQuestionIndex = 0;
let score = 0;
let question = {}

function startQuiz() { //Beim Rundenstart von vorne zählenj
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    question = JSON.parse(httpGet("https://apimocha.com/quizkevin/question1"));
    showQuestion();
}

function showQuestion() { //Initialisieren der Fragen
  resetState ();
    let currentQuestion = question;
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      button.dataset.correct = answer.correct;
      /* button.type = "hidden" */
      answerButtons.appendChild(button);
      
      if (button.correct) { //Bei richtiger Antwort nächste Frage
            button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });      
}



function resetState(){
    nextButton.style.display = "none";
    createPDFButton.style.display = "none";
    while(answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer (e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct;
  console.log(isCorrect); 
  
  if (isCorrect === "true") {
    selectedBtn.classList.add("correct"); //correct klasse hinzufügen
    score++; //bei richtiger antwort Score um 1 erhöhen
  }else{
    selectedBtn.classList.add("incorrect"); //incorrect klasse hinzufügen
    /* alert("Falsche Antwort"); */
    }
    Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
            button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }

   function showScore() {
    resetState();
    questionElement.innerHTML = `Du hast ${score} von ${questions.
    length} Fragen zum ID. 7 richtig beantwortet!`;
    nextButton.innerHTML = "Nochmal versuchen";
    nextButton.style.display = "block"; //button nur im end-screen anzeigen
    createPDFButton.innerHTML = "Ergebnis als PDF speichern";
    createPDFButton.style.display = "block"; //button nur im end-screen anzeigen
  } 
  
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) { //überprüfen ob das quiz schon vorbei ist
      showQuestion ();
    } else {
      showScore ();
    }
  }
  
  nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex < questions.length) {
      handleNextButton(); //next button anzeigen, damit er nicht im end-screen erscheint
    } else {
      startQuiz ();
    }
  });


startQuiz();