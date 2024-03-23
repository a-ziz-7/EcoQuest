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

function gameLoop() {
    console.log('Game loop started');
    // console.log(questions);
}