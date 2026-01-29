function saveData(){
  const name = document.getElementsByName("username")[0].value;
  const email = document.getElementsByName("email")[0].value;
  const category = document.getElementsByName("category")[0].value;   
  localStorage.setItem("quizName", name);
  localStorage.setItem("quizEmail", email);
  localStorage.setItem("quizCategory", category);  
}



    let score = 0;
    let current = 0;

    const cat = localStorage.getItem("quizCategory");
    let questions = [];

    if(cat === "HTML") {
         questions = [
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
];

}
    else if(cat === "CSS"){
         questions = [
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
];

    }
    else if(cat === "JavaScript"){
         questions = [
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
];

    }

    function showQuestion() {
    let questionBox = document.getElementById("ques");
    let btns = document.getElementsByClassName("option-btn");

    questionBox.innerText = questions[current].question;

    for (let i = 0; i < btns.length; i++) {
        btns[i].innerText = questions[current].options[i];
        btns[i].disabled = false;
        btns[i].dataset.index = i; 
    }
    document.getElementById("btn").disabled = true; 
}

 function checkAnswer(clickedBtn) {
    if (clickedBtn.innerText === questions[current].answer) {
        score++;
    }

    let btns = document.getElementsByClassName("option-btn");
    for (let j = 0; j < btns.length; j++) {
        btns[j].disabled = true; 
    }

    document.getElementById("btn").disabled = false;
}

function setupButtons() {
    let btns = document.getElementsByClassName("option-btn");
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function() { handleClick(i); }
    }
}

function handleClick(index) {
    let btns = document.getElementsByClassName("option-btn");
    checkAnswer(btns[index]);
}
document.getElementById("btn").onclick = nextQuestion;

function nextQuestion() {
    current++;
    if (current >= questions.length) {
        localStorage.setItem("quizScore", score);
        localStorage.setItem("quizCategory", cat);
        window.location.href = "score.html";
    } else {
        showQuestion();
    }
}

window.onload = function() {
    setupButtons();
    showQuestion();
};

localStorage.setItem("totalQuestions", questions.length);


function displayScore() {
    try {
        let scoreValue = parseInt(localStorage.getItem("quizScore")) || 0;
        let totalQuestions = parseInt(localStorage.getItem("totalQuestions")) || 1;
        
        let percentage = Math.round((scoreValue / totalQuestions) * 100);
        
        let usernameElem = document.getElementById("username");
        let categoryElem = document.getElementById("userCategory");
        let emailElem = document.getElementById("userEmail");
        let scoreElem = document.getElementById("userScore");
        let percentageElem = document.getElementById("scorePercentage");
        
        if (usernameElem && categoryElem && emailElem && scoreElem && percentageElem) {

            usernameElem.innerText = "Well done! "+localStorage.getItem("quizName") || "Guest";
            categoryElem.innerText = "Category: "+localStorage.getItem("quizCategory") || "No Category";
            emailElem.innerText = "Email: "+localStorage.getItem("quizEmail") || "No Email";
            scoreElem.innerText = "Score: "+scoreValue + " / " + totalQuestions;
            percentageElem.innerText = percentage + "%";
            
        }
    } catch (error) {
        console.error("Error displaying score:", error);
    }
}








    
