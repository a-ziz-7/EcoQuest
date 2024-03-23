var questions = []; // Initialize an empty array to store the questions

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

function generateQuestion(data) {
	document.getElementById('question').textContent = data.question;
	
	const answersContainer = document.getElementById('answers');
	answersContainer.innerHTML = ''; // Clear the answers container before adding new answers
	console.log(data.options);
	for (let key in data.options) {
		const answerDiv = document.createElement('div');
		answerDiv.textContent = key + ") " + data.options[key];
		answerDiv.className = 'answer';
		answerDiv.id = ""+key;
		answerDiv.addEventListener('click', function() {
			console.log('Selected answer:', this.textContent);
			// console.log('Selected answer id:', this.id);
			// console.log('Correct answer:', data.correct_answer);
			if (this.id === data.correct_answer) {
				console.log('Correct answer!');
				console.log(data.fun_fact);
			} else {
				console.log('Incorrect answer!');
				console.log(data.fun_fact);
			}
		});
		answersContainer.appendChild(answerDiv);
	}
}

// Function to handle game loop
function gameLoop() {
  console.log('Game loop started');
  let turn = 0; // Initialize the turn counter
  let index = questions.length - 1; // Get the last index of the questions array
  generateQuestion(questions[0]); // Generate the first question for testing
}

// // Start the game loop when the page loads
// window.onload = function() {
//   gameLoop();
// };