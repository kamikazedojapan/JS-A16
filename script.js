// Função para buscar raças de cachorros
async function fetchBreeds() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!response.ok) throw new Error("Erro ao buscar raças");
        const data = await response.json();
        const breeds = Object.keys(data.message);
        displayBreedButtons(breeds);
    } catch (error) {
        displayError(error.message);
    }
}

function displayBreedButtons(breeds) {
    const breedButtonsContainer = document.getElementById('breed-buttons');
    breedButtonsContainer.innerHTML = '';
    breeds.forEach(breed => {
        const button = document.createElement('button');
        button.textContent = breed;
        button.onclick = () => fetchImages(breed);
        breedButtonsContainer.appendChild(button);
    });
}

async function fetchImages(breed) {
    displayLoading(true);
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`);
        if (!response.ok) throw new Error ("Erro ao buscar imagens");
        const data = await response.json();
        displayImages(data.message);
    } catch (error) {
        displayError(error.message);
    } finally {
        displayLoading(false);
    }
}

function displayImages(images) {
    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = '';
    images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        imagesContainer.appendChild(img);
    });
}

function displayLoading(isLoading) {
    const loadingMessage = document.getElementById('loading');
    loadingMessage.style.display = isLoading ? 'block' : 'none';
}

function displayError(message) {
    const errorMessageContainer = document.getElementById('error-message');
    errorMessageContainer.textContent = message;
    errorMessageContainer.style.display = 'block';
}

fetchBreeds();
