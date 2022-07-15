const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';
    // if (searchText == ''){
    //     //please write something to display
    //     console.log('write something')
    // }
    // else{
    //     //following code
    // }


    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data.meals);
    }
    catch(error){
        displayError(error)
    }

    const displayError = error =>{
        document.getElementById('error-message').style.display = 'block';
    }

    // fetch(url)
    // .then (res => res.json())
    // .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = (meals) =>{
    const searchResult = document.getElementById('search-result');
    //clear previous search
    //searchResult.innerHTML = ``;
    searchResult.textContent = '';
    // if(meals.length == 0){
    //     //show no result found
    //     console.log('no result')
    // }
    meals.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick ="loadMealDetail(${meal.idMeal})"  class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `
        searchResult.appendChild(div);
    })
}

const loadMealDetail = async mealID =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;

    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);

    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    console.log(meal)
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top p-3" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 500)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Get Recipe</a>
    </div>
    `;
    mealDetails.appendChild(div);
}