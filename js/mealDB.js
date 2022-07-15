// loading message/spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// clearing history while loading message/spinner is on
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //display spinner and hide previous result and previous error while loading
    toggleSpinner('block');
    toggleSearchResult('none');
    document.getElementById('error-message').style.display = 'none';
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
    fetch(url)
    .then (res => res.json())
    .then(data => displaySearchResult(data.meals))
    .catch(error => displayError(error));
}

const displayError = error =>{
    document.getElementById('error-message').style.display = 'block';
    toggleSpinner('none');
}

const displaySearchResult = (meals) =>{
    const searchResult = document.getElementById('search-result');
    //clear previous search
    //searchResult.innerHTML = ``;
    searchResult.textContent = '';
    document.getElementById('error-message').style.display = 'none';
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
    });
    //hide spinner and view result while loaded
    toggleSpinner('none');
    toggleSearchResult('block');
}

const loadMealDetail = mealID =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    console.log(meal)
    const mealDetails = document.getElementById('meal-details');
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