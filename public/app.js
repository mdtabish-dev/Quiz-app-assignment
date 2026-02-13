function saveData() {
  var name = document.getElementsByName("username")[0].value;
  var email = document.getElementsByName("email")[0].value;
  var category = document.getElementsByName("category")[0].value;
  window.quizName = name;
  window.quizEmail = email;
  window.quizCategory = category;
}

var authForm = document.getElementById("authForm");
if (authForm) {
  authForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementsByName("username")[0].value.trim();
    var email = document.getElementsByName("email")[0].value.trim();
    var password = document.getElementsByName("password")[0].value;
    var category = document.getElementsByName("category")[0].value;
    var actionInput = document.getElementById("authAction");
    var action = actionInput ? actionInput.value : "login";

    saveData();

    var auth = firebase.auth();
    var db = firebase.database();

    var authPromise;
    if (action === "signup") {
      authPromise = auth.createUserWithEmailAndPassword(email, password);
    } else {
      authPromise = auth.signInWithEmailAndPassword(email, password);
    }

    authPromise
      .then(function (userCred) {
        return db.ref("users/" + userCred.user.uid).set({
          name: name,
          email: email,
          category: category,
          updatedAt: Date.now()
        });
      })
      .then(function () {
        window.location.href = "quiz.html";
      })
      .catch(function (err) {
        alert(err.message);
      });
  });
}

var score = 0;
var current = 0;
var cat = null;
var questions = [];

var questionsByCategory = {
  HTML: [
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "HighText Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
      answer: "HyperText Markup Language"
    },
    {
      question: "Which tag is used for headings in HTML?",
      options: ["head", "h1-h6", "header", "heading"],
      answer: "h1-h6"
    },
    {
      question: "Which tag is used for paragraphs in HTML?",
      options: ["p", "para", "paragraph", "pg"],
      answer: "p"
    },
    {
      question: "Which tag is used to create links in HTML?",
      options: ["link", "a", "href", "url"],
      answer: "a"
    },
    {
      question: "Which tag is used to insert images in HTML?",
      options: ["img", "image", "picture", "pic"],
      answer: "img"
    },
    {
      question: "Which tags are used for lists in HTML?",
      options: ["ul, ol, li", "list", "li only", "ol only"],
      answer: "ul, ol, li"
    },
    {
      question: "What is the basic structure of a table in HTML?",
      options: ["table, tr, td", "table, td, th", "table, tr, td, th", "table only"],
      answer: "table, tr, td, th"
    },
    {
      question: "How do you write comments in HTML?",
      options: ["<!-- comment -->", "// comment", "/* comment */", "# comment"],
      answer: "<!-- comment -->"
    },
    {
      question: "Which tag is used to create forms in HTML?",
      options: ["input", "form", "textarea", "button"],
      answer: "form"
    },
    {
      question: "Which tag is used for input fields in HTML?",
      options: ["input", "text", "field", "form-input"],
      answer: "input"
    }
  ],
  CSS: [
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "What does the color property do in CSS?",
      options: ["Sets text color", "Sets background color", "Sets both text and background color", "Sets font size"],
      answer: "Sets both text and background color"
    },
    {
      question: "What is the purpose of the font-size property in CSS?",
      options: ["Sets text size", "Sets text color", "Sets background", "Hides element"],
      answer: "Sets text size"
    },
    {
      question: "What is the purpose of background-color in CSS?",
      options: ["Sets text color", "Sets element background color", "Sets border color", "Hides element"],
      answer: "Sets element background color"
    },
    {
      question: "What is the difference between margin and padding in CSS?",
      options: ["Margin is outside space, padding is inside space", "Margin is inside, padding is outside", "Both are the same", "Margin is for text only"],
      answer: "Margin is outside space, padding is inside space"
    },
    {
      question: "How do you write a class selector in CSS?",
      options: [".classname { }", "#classname { }", "classname { }", "*classname { }"],
      answer: ".classname { }"
    },
    {
      question: "How do you write an id selector in CSS?",
      options: ["#idname { }", ".idname { }", "idname { }", "*idname { }"],
      answer: "#idname { }"
    },
    {
      question: "What is the purpose of the border property in CSS?",
      options: ["For text", "For element borders", "For background", "For positioning"],
      answer: "For element borders"
    },
    {
      question: "What does display: none do in CSS?",
      options: ["Hides the element", "Shows the element", "Changes text color", "Changes background"],
      answer: "Hides the element"
    },
    {
      question: "What is the purpose of the float property in CSS?",
      options: ["Floats the element left or right", "For text only", "For background only", "For border only"],
      answer: "Floats the element left or right"
    }
  ],
  JavaScript: [
    {
      question: "What is JavaScript used for?",
      options: ["For dynamic content on web pages", "For backend only", "For database only", "For HTML only"],
      answer: "For dynamic content on web pages"
    },
    {
      question: "How many ways are there to declare a variable in JavaScript?",
      options: ["var, let, const", "var only", "let only", "const only"],
      answer: "var, let, const"
    },
    {
      question: "What is the syntax of a function in JavaScript?",
      options: ["function name() { }", "fun name() { }", "def name() { }", "func name() { }"],
      answer: "function name() { }"
    },
    {
      question: "How do you create an array in JavaScript?",
      options: ["let arr = [1,2,3]", "let arr = {1,2,3}", "let arr = (1,2,3)", "let arr = <1,2,3>"],
      answer: "let arr = [1,2,3]"
    },
    {
      question: "How do you create an object in JavaScript?",
      options: ["let obj = { key: 'value' }", "let obj = [key:'value']", "let obj = (key:'value')", "let obj = <key:'value'>"],
      answer: "let obj = { key: 'value' }"
    },
    {
      question: "What is the use of console.log in JavaScript?",
      options: ["For output or debugging", "To hide elements", "To change color", "To change font size"],
      answer: "For output or debugging"
    },
    {
      question: "What is the syntax of an if statement in JavaScript?",
      options: ["if(condition) { } else { }", "if[condition] { }", "if(condition) : { }", "if condition then { }"],
      answer: "if(condition) { } else { }"
    },
    {
      question: "What is the syntax of a for loop in JavaScript?",
      options: ["for(let i=0;i<10;i++) { }", "for i in range(0,10) { }", "for(i=0;i<10;i++) : { }", "for i=0 to 10 { }"],
      answer: "for(let i=0;i<10;i++) { }"
    },
    {
      question: "What is the use of an event listener in JavaScript?",
      options: ["To detect user actions", "To change element color", "To hide/show text", "To create arrays"],
      answer: "To detect user actions"
    },
    {
      question: "What does DOM stand for in JavaScript?",
      options: ["Document Object Model", "Data Object Model", "Document Order Model", "Display Object Model"],
      answer: "Document Object Model"
    }
  ]
};

function showQuestion() {
  var questionBox = document.getElementById("ques");
  var btns = document.getElementsByClassName("option-btn");

  if (!questionBox || btns.length === 0) return;

  questionBox.innerText = questions[current].question;

  for (var i = 0; i < btns.length; i++) {
    btns[i].innerText = questions[current].options[i];
    btns[i].disabled = false;
    btns[i].dataset.index = i;
  }
  var nextBtn = document.getElementById("btn");
  if (nextBtn) nextBtn.disabled = true;
}

function checkAnswer(clickedBtn) {
  if (clickedBtn.innerText === questions[current].answer) {
    score++;
  }

  var btns = document.getElementsByClassName("option-btn");
  for (var j = 0; j < btns.length; j++) {
    btns[j].disabled = true;
  }

  var nextBtn = document.getElementById("btn");
  if (nextBtn) nextBtn.disabled = false;
}

function setupButtons() {
  var btns = document.getElementsByClassName("option-btn");
  for (var i = 0; i < btns.length; i++) {
    (function (index) {
      btns[index].onclick = function () { handleClick(index); };
    })(i);
  }
}

function handleClick(index) {
  var btns = document.getElementsByClassName("option-btn");
  checkAnswer(btns[index]);
}

var nextButton = document.getElementById("btn");
if (nextButton) {
  nextButton.onclick = nextQuestion;
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    var auth = firebase.auth();
    var db = firebase.database();
    var user = auth.currentUser;

    if (!user) {
      window.location.href = "index.html";
      return;
    }

    saveAttemptToDb(user, db);
  } else {
    showQuestion();
  }
}

function displayScoreFromDb() {
  var auth = firebase.auth();
  var db = firebase.database();

  auth.onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    var attemptId = getQueryParam("attemptId");
    if (!attemptId) {
      window.location.href = "index.html";
      return;
    }

    db.ref("attempts/" + user.uid + "/" + attemptId).get().then(function (snap) {
      if (!snap.exists()) {
        window.location.href = "index.html";
        return;
      }
      renderScore(snap.val());
    });
  });
}

function renderScore(attempt) {
  var usernameElem = document.getElementById("username");
  var categoryElem = document.getElementById("userCategory");
  var emailElem = document.getElementById("userEmail");
  var scoreElem = document.getElementById("userScore");
  var percentageElem = document.getElementById("scorePercentage");

  if (usernameElem) usernameElem.innerText = "Well done! " + attempt.name;
  if (categoryElem) categoryElem.innerText = "Category: " + attempt.category;
  if (emailElem) emailElem.innerText = "Email: " + attempt.email;
  if (scoreElem) scoreElem.innerText = "Score: " + attempt.score + " / " + attempt.total;
  if (percentageElem) percentageElem.innerText = attempt.percentage + "%";
}

function saveAttemptToDb(user, db) {
  db.ref("attempts/" + user.uid).push({
    name: window.quizName || "Guest",
    email: window.quizEmail || "No Email",
    category: cat || "No Category",
    score: score,
    total: questions.length,
    percentage: Math.round((score / questions.length) * 100),
    createdAt: Date.now()
  }).then(function (ref) {
    window.location.href = "score.html?attemptId=" + ref.key;
  });
}

function getQueryParam(key) {
  var url = new URL(window.location.href);
  return url.searchParams.get(key);
}

function loadQuizCategory() {
  var auth = firebase.auth();
  var db = firebase.database();

  auth.onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    db.ref("users/" + user.uid).get().then(function (snap) {
      if (!snap.exists()) {
        window.location.href = "index.html";
        return;
      }

      var profile = snap.val();
      cat = profile.category;
      window.quizName = profile.name;
      window.quizEmail = profile.email;
      window.quizCategory = profile.category;

      questions = questionsByCategory[cat] || [];
      if (questions.length === 0) {
        alert("No questions found for your category.");
        window.location.href = "index.html";
        return;
      }

      setupButtons();
      showQuestion();
    });
  });
}

window.onload = function () {
  if (document.getElementById("ques")) {
    loadQuizCategory();
  }

  if (document.getElementById("scorePercentage")) {
    displayScoreFromDb();
  }
};
