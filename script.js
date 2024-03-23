var questions = []; 
answer_id = "a";
correct_answer = "a";
fun_fact = "";
let turn = 0; // Initialize the turn counter
let usedIndices = [];

console.log('Hello from EcoQuest game.html!')

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    questions = data.questions; 
    // console.log(questions);
    gameLoop();
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error);
});

function generateQuestion() {
	data = questions[generateUniqueRandomIndex()];
	document.getElementById('question').textContent = data.question;
	
	const answersContainer = document.getElementById('ans');
	answersContainer.innerHTML = ''; // Clear the answers container before adding new answers
	answersContainer.id = 'ans';
	// console.log(data.options);
	for (let key in data.options) {
		const answerDiv = document.createElement('div');
		answerDiv.textContent = key + ") " + data.options[key];
		answerDiv.className = 'answer';
		answerDiv.id = ""+key;
		answerDiv.addEventListener('click', function() {
			// console.log('Selected answer:', this.textContent);
			answer_id = this.id;
			correct_answer = data.correct_answer;
			fun_fact = data.fun_fact;
			this.style.backgroundColor = 'cyan';
			const allAnswers = document.querySelectorAll('.answer');
			allAnswers.forEach(answer => {
				if (answer !== this) {
					answer.style.backgroundColor = '#e0e0e0'; // Reset background color to default
				}
  			});
			
		});
		answersContainer.appendChild(answerDiv);
	}
}

// Function to handle game loop
function gameLoop() {
  console.log('Game loop started');
  generateQuestion(); // Generate the first question for testing
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
			console.log('Correct answer!');
			document.getElementById(answer_id).style.backgroundColor = '#7FFF00';
		} else {
			console.log('Incorrect answer!');
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
		console.log('Next question!');
		document.getElementById('fact').textContent = '';
		// const allAnswers = document.querySelectorAll('.answer');
		// console.log(allAnswers);
		// allAnswers.forEach(answer => {
		// 	answer.classList.remove('unselectable');
		// });

		b.textContent = 'Submit';
		generateQuestion(questions[0]);
	}
}

function generateUniqueRandomIndex() {
    let index = Math.floor(Math.random() * questions.length); // Generate a random index within the range of the questions array

    // Check if the index has already been used
    while (usedIndices.includes(index)) {
        index = Math.floor(Math.random() * questions.length); // Regenerate the index
    }
	answer_id = "e";
    usedIndices.push(index); // Add the index to the list of used indices
    return index;
}