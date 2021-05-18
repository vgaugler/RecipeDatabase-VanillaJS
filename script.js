const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
const randomMeal = document.getElementById('randomMeal');
const banner = document.querySelector('.banner');
const bannerBox = document.querySelector('.bannerBox');
const searchBox = document.querySelector('.searchBox');
const searchIcon = document.getElementById('searchIcon');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const body = document.querySelector('body');

recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.parentElement.classList.remove('showRecipe');
});

let search = '';

window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

function toggleMenu() {
  var menuToggle = document.querySelector('.toggle');
  var menu = document.querySelector('.menu');
  menuToggle.classList.toggle('active');
  menu.classList.toggle('active');
}

searchInput.addEventListener('focus', function (event) {
  banner.style.backgroundImage = "url('banner2.jpg')";
  banner.style.transform = 'scale(1.1)';
  bannerBox.style.transform = 'translateX(350px)';
  event.preventDefault();
  event.stopPropagation();
});

searchIcon.addEventListener('click', function () {
  bannerBox.style.transform = 'translateX(-5px)';
});

searchInput.addEventListener('focusout', function (event) {
  banner.style.backgroundImage = "url('banner.jpg')";
  banner.style.transform = 'scale(1)';

  event.preventDefault();
  event.stopPropagation();
});

var topOffset;

$(window).scroll(function () {
  if ($(this).scrollTop() < 1) {
    topOffset = 55;
  } else {
    topOffset = 50;
  }
});

$('body a[href^="#"]').on('click', function (event) {
  $('.active').removeClass('active');
  $(this).addClass('active');

  var target = $(this.getAttribute('href'));
  if (target.length) {
    event.preventDefault();
    $('html, body').animate(
      {
        scrollTop: target.offset().top - topOffset,
      },
      1000
    );
  }
});

const fetchSearch = async (url) => {
  meals = await fetch(`https://www.themealdb.com/api/json/v1/1/${url}`)
    .then((res) => res.json())
    .then((res) => res.meals);
  console.log(meals);
};

const searchDisplay = async () => {
  await fetchSearch(search);
  if (meals == null) {
    results.innerHTML = '<span class="noResult">No results</span>';
  }

  results.innerHTML = meals
    .map(
      (meal) =>
        `
            <div class="searchContainer">
                
                <img id="photo" src='${meal.strMealThumb}'/>

                
                <div class="infos">
                <h2>${meal.strMeal}</h2>
                <div>origin : ${meal.strArea}</div> 
                <button id="${meal.idMeal}" class="button-recipe">En savoir plus</button>
                <div class="boxTextRecette" id="boxResize-${meal.idMeal}">
                <p class="textRecette">${meal.strInstructions}</p>
               
                </div>
                </div>
                  
                
            </div>
            `
    )
    .join('');
};
results.addEventListener('click', getMealRecipe);

function getMealRecipe(e) {
  console.log(e.target.id);
  e.preventDefault();
  if (e.target.classList.contains('button-recipe')) {
    let mealItem = e.target;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
      .then((response) => response.json())
      .then((response) => mealRecipeModal(response.meals[0]));
  }
}

// create a modal
function mealRecipeModal(meal) {
  const ingredients = [];
  // Get all ingredients from the object. Up to 20
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    }
  }
  console.log(ingredients);
  console.log(meal);

  let html = `
    <div class="detailHeader">
    <div class="boxTitleHeader">
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
    </div>
        <h3 class= "title-ingredients">Ingredients:</h3>
        <div class = "boxIngredient">
				<ul class = "ingredients" >
					${ingredients
            .map(
              (ingredient) =>
                `<li class="ingredientsDetail"> ${ingredient}</li>`
            )
            .join('')}
				</ul>
        </div>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.parentElement.classList.add('showRecipe');
}

searchInput.addEventListener('input', (e) => {
  search = `search.php?s=${e.target.value}`;

  searchDisplay();
});

// GET RANDOM MEAL
const randomMealDisplay = async () => {
  await fetchSearch('random.php');

  results.innerHTML = meals.map(
    (meal) =>
      `
      <div class="searchContainer">
                
      <img id="photo" src='${meal.strMealThumb}'/>

      
      <div class="infos">
      <h2>${meal.strMeal}</h2>
      <div>origin : ${meal.strArea}</div> 
      <button id="${meal.idMeal}" class="button-recipe">En savoir plus</button>
      <div class="boxTextRecette" id="boxResize-${meal.idMeal}">
      <p class="textRecette">${meal.strInstructions}</p>
     
      </div>
      </div>
        
      
  </div>
  
      `
  );
};

randomMeal.addEventListener('click', randomMealDisplay);
randomMealDisplay();
