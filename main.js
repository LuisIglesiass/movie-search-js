import apiKey from './apiKey.js';

let searchButton = document.getElementById('search-button');
let inputUser = document.getElementById('input-user');
let loading = document.getElementById('loading');
let mainSection = document.getElementById('main-section');

function showLoader() {
	loading.className = 'loading-animation';
}

function hideLoader() {
	loading.className = '';
}

searchButton.addEventListener('click', async function (event) {
	event.preventDefault();
	showLoader();
	mainSection.innerHTML = '';
	try {
		const response = await fetch(`https://www.omdbapi.com/?s=${inputUser.value}&apikey=${apiKey}`);
		const data = await response.json();
		setTimeout(() => {
			hideLoader();
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
			}
		}, 800);
	} catch {
		hideLoader();
		alert('Something went wrong.');
		mainSection.innerText = 'Something went wrong';
	}
});