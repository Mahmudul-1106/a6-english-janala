console.log('js file added.')

function loadSearch() {
    const url = 'https://openapi.programming-hero.com/api/words/all';
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data.data));
}


function pronounceWord(word) {
    console.log(word);
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; // English
    window.speechSynthesis.speak(utterance);
}

function loadWordDetails(id) {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayWordDetails(data.data));
}



function showLoaderLearn() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('learn-section').classList.add('hidden');

}

function hideLoaderLearn() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('learn-section').classList.remove('hidden');
}

function showLoader() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('word-section').classList.add('hidden');
    // document.getElementById('lesson-message').classList.add('hidden');

}

function hideLoader() {
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('word-section').classList.remove('hidden');
    // document.getElementById('lesson-message').classList.add('hidden');

}



function hideBanner() {
    document.getElementById('nav-1').classList.remove('hidden');
    document.getElementById('banner').classList.add('hidden');
    document.getElementById('learn-section').classList.remove('hidden');

}

function showBanner() {
    document.getElementById('nav-1').classList.add('hidden');
    document.getElementById('banner').classList.remove('hidden');
    document.getElementById('learn-section').classList.add('hidden');
    document.getElementById('word-section').classList.add('hidden');
}



function removeActive() {
    const activeClass = document.getElementsByClassName('active');
    for (let active of activeClass) {
        active.classList.remove('active');
    }
}

function getStart() {
    let name = document.getElementById('input-name').value;
    const password = document.getElementById('input-password').value;
    if (name != '' && password === '12345') {
        hideBanner();
        loadLearn();
    }

    else {
        alert('Please provide correct Name Or Password');
        return;
    }
}

function loadLearn() {
    showLoaderLearn();
    document.getElementById('learn').innerHTML = '';
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
        .then(res => res.json())
        .then(data => displayLearn(data.data))
    document.getElementById('lesson-message').classList.remove('hidden');
}

function loadWordsLebels(id) {
    document.getElementById('lesson-message').classList.add('hidden');
    showLoader();
    const url = (`https://openapi.programming-hero.com/api/level/${id}`);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            document.getElementById(`btn-${id}`).classList.add('active');
            displayWordsLebel(data.data)
            //   test(data.data);  
        })
}

const displayLearn = (info) => {
    const learnContainer = document.getElementById('learn');
    for (let button of info) {
        let btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
           <button id="btn-${button.level_no}" onclick="loadWordsLebels(${button.level_no})" class="btn btn-outline btn-sm btn-primary"> <img src="./assets/fa-book-open.png" alt="">Lesson-${button.level_no}</button>
           `
        learnContainer.appendChild(btnDiv);
    }
    hideLoaderLearn();
}

const displayWordsLebel = (words) => {
    // document.getElementById('word-section').classList.remove('hidden')
    const wordSection = document.getElementById('word-section');
    wordSection.innerHTML = '';

    if (words.length === 0) {
        hideLoader();
        wordSection.innerHTML = `
                <div class=" py-5 rounded-lg col-span-full flex flex-col text-center justify-center">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="font-normal text-sm  text-[#79716B]">
                    এই Lesson এ কোন Vocabulary যুক্ত করা হয়নি।
                </p>
                <p class="text-[#292524] font-bold text-2xl">
                    নেক্সট Lesson এ যান।
                </p>
            </div>
            `
        console.log('It is empty')
        return;
    }

    for (let word of words) {
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
        <div class="card w-full bg-base-100 card-lg shadow-sm">
                <div class="card-body gap-3">
                    <h2 class="text-2xl font-semibold text-center ">${word.word}</h2>
                    <p class="text-center">Meaning / Pronounciation</p>
                    <p class="text-sm text-center">${word.meaning == null ?
                'অর্থ পাওয়া যায় নি' : `${word.meaning}`} 
                        / ${word.pronunciation}</p>
                    <div class="justify-between card-actions pt-5">
                        <button onclick="loadWordDetails(${word.id})" class="btn btn-primary bg-[#1A91FF10] shadow border-0"> <img class="w-5 h-5" src="./assets/details.png" alt=""></button>
                        <button onclick = "pronounceWord('${word.word}')" class="btn btn-primary bg-[#1A91FF10] shadow border-0"> <img class="w-5 h-5" src="./assets/icons8-sound-50.png" alt=""></button>
                    </div>
                </div>
            </div>
        `
        wordSection.appendChild(wordCard);
    }
    hideLoader();
}

const displayWordDetails = (data) => {
    document.getElementById('word_details').showModal();
    document.getElementById('word-contant').innerHTML = `
        <h3 class="text-xl font-bold flex items-center ">${data.word} (<img class="w-4 h-4" src="./assets/imicrophone-.png" alt=""> : ${data.pronunciation})</h3>
        <h5 class="text-lg font-semibold pt-5">Meaning</h5>
        <p>${data.meaning}</p>

        <h5 class="text-lg font-semibold pt-5">Example</h5>
        <p>${data.sentence}</p>

        <h5 class="text-lg font-semibold pt-5">সমার্থক শব্দ গুলো</h5>
                     
  `

    const synonymsContainer = document.getElementById('synonyms');
    synonymsContainer.innerHTML = '';

    if (data.synonyms.length === 0) {
        synonymsContainer.innerHTML = `<p>সমার্থক শব্দ পাওয়া যায় নি</p>`;
        return;
    }

    data.synonyms.map(element => {
        const synonyms = document.createElement('div');
        synonyms.classList.add('bg-amber-100', 'px-2');
        synonyms.innerHTML = `
            <p>${element}</P
        `
        synonymsContainer.appendChild(synonyms);
    })
}

function displaySearch(words) {
    let search = document.getElementById('search-input').value;
    if (search == '') {
        alert('Please entry word.')
        return;
    }

    for (let word of words) {
        if (word.word.toLowerCase() === search.toLowerCase()) {
            loadWordDetails(word.id);
            document.getElementById('search-input').value = '';
            return;
        }
    }

    alert('Sorry, Word not found');
    document.getElementById('search-input').value = '';
}

// loadLearn();
// loadWordsLebels(5);