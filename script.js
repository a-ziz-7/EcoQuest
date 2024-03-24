var questions = []; // Initialize the questions array
answer_id = "a"; // Initialize the answer dummy variable
correct_answer = "a"; // Initialize the correct answer dummy variable
fun_fact = ""; // Initialize the fun fact dummy variable
turns = 6; // Number of questions in the quiz
correct = 0; // Initialize the correct answers counter
let turn = 0; // Initialize the turn counter
let usedIndices = []; // Initialize the array of used indices

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    questions = data.questions; 
    gameLoopStart();
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
});

function generateQuestion() {
	data = questions[generateUniqueRandomIndex()];
	document.getElementById('question').textContent = data.question;
	
	const answersContainer = document.getElementById('ans');
	answersContainer.innerHTML = '';
	answersContainer.id = 'ans';
	for (let key in data.options) {
		const answerDiv = document.createElement('div');
		answerDiv.textContent = key + ") " + data.options[key];
		answerDiv.className = 'answer';
		answerDiv.id = ""+key;
		answerDiv.addEventListener('click', function() {
			answer_id = this.id;
			correct_answer = data.correct_answer;
			fun_fact = data.fun_fact;
			this.style.backgroundColor = 'cyan';
			const allAnswers = document.querySelectorAll('.answer');
			allAnswers.forEach(answer => {
				if (answer !== this) {
					answer.style.backgroundColor = '#e0e0e0';
				}
  			});
			
		});
		answersContainer.appendChild(answerDiv);
	}
}

function gameLoopStart() {
//   console.log('Game loop started');
  generateQuestion(); 
}

function button() {
	x = document.getElementById('ans');
	b = document.getElementById('main_button');
	if (b.innerText == 'Submit') {
		if (answer_id === "e") {
			alert('Please select an answer!');
			return;
		}
		if (answer_id === correct_answer) {
			document.getElementById(answer_id).style.backgroundColor = '#7FFF00';
			correct++;
		} else {
			document.getElementById(answer_id).style.backgroundColor = 'red';
			document.getElementById(correct_answer).style.backgroundColor = '#7FFF00';
		}
		document.getElementById('fact').textContent = fun_fact;
		const allAnswers = document.querySelectorAll('.answer');
		allAnswers.forEach(answer => {
			answer.classList.add('unselectable');
		});
		b.innerText = 'Next';
	} else {
		// console.log('Next question!');
		document.getElementById('fact').textContent = '';
		turn++;
		if (turn == turns) {
			alert('Congratulations on completing the quiz!\nYou got ' + correct + ' out of ' + turns + ' questions correct.\nKeep learning and exploring the wonders of our natural world!');
			window.location.href = 'index.html';
			return;
		}
		b.textContent = 'Submit';
		generateQuestion(questions[0]);
	}
}

function generateUniqueRandomIndex() {
    let index = Math.floor(Math.random() * questions.length);
    while (usedIndices.includes(index)) {
        index = Math.floor(Math.random() * questions.length);
    }
	answer_id = "e";
    usedIndices.push(index);
    return index;
}