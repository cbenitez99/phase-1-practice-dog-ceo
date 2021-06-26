//Gets data from URL then applies json to use the data.
function fetchData(url){
    return fetch(url).then(res => res.json());
}
//Deletes child elements of a selected element.
function deleteElement(element) {
    let child = element.firstChild
    do {
        element.removeChild(child);
        child = element.lastElementChild;
    }
    while (child);
  }
//Loads Initial data (images, dog breeds, extra dropdown letters)
document.addEventListener('DOMContentLoaded', () => {
  dogImages("https://dog.ceo/api/breeds/image/random/4");
  breedList('https://dog.ceo/api/breeds/list/all');
  addDropDownLetters();
});
//Returns dog images
function dogImages(imgUrl) {
  fetchData(imgUrl)
    .then(data => {
      data.message.forEach(image => addImage(image))
    });
}
//Returns dog breeds
function breedList(breedUrl) {
    fetchData(breedUrl)
      .then(data => {  
        breeds = Object.keys(data.message);
        updateList(breeds);
        breedDropdownFunc();
    });
}
//Adds images to DOM
function addImage(dogPics) {
  const dogImgContainer = document.getElementById('dog-image-container');
  const img = document.createElement('img');
  img.src = dogPics;
  dogImgContainer.appendChild(img);
}
//Updates list of dog breeds
function updateList(breeds) {
  const ul = document.getElementById('dog-breeds');
  deleteElement(ul);
  breeds.forEach(breed => addBreed(breed));
}
//Filters dog breeds by first letter
function filterBreeds(letter) {
  updateList(breeds.filter(breed => breed.startsWith(letter)));
}
//Allows dropdown arrow functionality (change)
function breedDropdownFunc() {
  const breedDropdown = document.getElementById('breed-dropdown');
  breedDropdown.addEventListener('change', (e) => {
    filterBreeds(e.target.value);
  });
}
//Adds dog breed(<li>) to the <ul>_..<li>.._</ul> and a click event to change color.
function addBreed(breed) {
  const ul = document.getElementById('dog-breeds');
  const li = document.createElement('li');
  li.innerText = breed;
  ul.appendChild(li);
  li.addEventListener('click', changeColor);
}
//Changes color of breed names when clicked ^
function changeColor(e) {
  e.target.style.color = e.target.style.color === 'red' ? "black" : "red"
}
 //Adds Extra letters to dropdown menu
function addDropDownLetters(){
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let breedDropdown = document.getElementById('breed-dropdown');
    alphabet.forEach(letter => {
        const opt = document.createElement('option');
        opt.value = letter;
        opt.text = letter.toUpperCase();
        breedDropdown.appendChild(opt)
    });
}