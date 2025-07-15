import apiKey from './apiKey.js';

let searchButton = document.getElementById('search-button');
let inputUser = document.getElementById('input-user');
let loadingSpinner = document.getElementById('loading-spinner');
let mainSection = document.getElementById('main-section');

function loading(ms) {
	return new Promise(resolve => {
		loadingSpinner.className = 'loadingSpinner';
		setTimeout(resolve, ms);
	});
}

searchButton.addEventListener('click', async function (event){
	event.preventDefault();
	const response = await fetch(`https://www.omdbapi.com/?s=${inputUser.value}&apikey=${apiKey}`)
    const data = await response.json();
	mainSection.innerHTML = '';

	if (data.Search) {
		data.Search.forEach(movie => {
			const article = document.createElement('article');
			const image = document.createElement('img');
			const title = document.createElement('h3');

			image.src = movie.Poster !== "N/A" ? movie.Poster : "";
			image.alt = movie.Title;
			title.textContent = movie.Title;

			article.appendChild(image);
			article.appendChild(title);
			mainSection.appendChild(article);
		});
	} else {
		mainSection.textContent = 'No results found.';
		mainSection.textContent = 'No se encontraron resultados.';
	}
});