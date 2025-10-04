console.log('js file added.')

function getStart(){
    let name = document.getElementById('input-name').value;
    const password = document.getElementById('input-password').value;
    if(name != '' && password === '12345'){
        document.getElementById('nav-1').classList.remove('hidden');
    }

    else{
        alert('Please provide correct Name Or Password');
        return;
    }
}

function loadLearn  (){
    const url = 'https://openapi.programming-hero.com/api/levels/all';
    fetch(url)
    .then(res => res.json())
    .then(data => displayLearn(data.data))
}

const displayLearn =(info) =>{
    console.log(info)
    // const learnSection = document.getElementById('learn-section');
    // learnSection.innerHTML = `
                
    // `
    const learnContainer = document.getElementById('learn');
    for(let button of info){
        let btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
           <button class="btn btn-outline btn-primary"> <img src="./assets/fa-book-open.png" alt="">Lesson-${button.level_no}</button>
           `
           learnContainer.appendChild(btnDiv);
    }
    

}

loadLearn();