const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
const randomMeal = document.getElementById('randomMeal');
const banner = document.querySelector('.banner');
const bannerBox = document.querySelector('.bannerBox');
const searchBox = document.querySelector('.searchBox');
const searchIcon = document.getElementById('searchIcon');

let search = '';

window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
})


function toggleMenu(){
var menuToggle = document.querySelector('.toggle');
var menu = document.querySelector('.menu');
menuToggle.classList.toggle('active');
menu.classList.toggle('active');

}




searchInput.addEventListener('focus',function(event){
    banner.style.backgroundImage = "url('banner2.jpg')";
    banner.style.transform = 'scale(1.1)';
    bannerBox.style.transform = "translateX(350px)";
    event.preventDefault();
    event.stopPropagation();
   

});

searchIcon.addEventListener('click', function(){
    bannerBox.style.transform = "translateX(-5px)";
});

searchInput.addEventListener('focusout', function(event){
    banner.style.backgroundImage = "url('banner.jpg')";
    banner.style.transform =  'scale(1)';
    
    event.preventDefault();
    event.stopPropagation();
  
});

var topOffset;

$(window).scroll(function() {
	if($(this).scrollTop() < 1) {
	 topOffset = 55;
	} else {
	 topOffset = 50;
  }
});

$('body a[href^="#"]').on('click', function(event) {
    $('.active').removeClass('active');
    $(this).addClass('active');

  var target = $(this.getAttribute('href'));
  if( target.length ) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - topOffset
      }, 1000);
  }
});

const fetchSearch = async() => {
    meals = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
        .then(res => res.json())
        .then(res => res.meals);
        console.log(meals);
}

const searchDisplay = async () => {
    await fetchSearch();
    if (meals == null){
        results.innerHTML = '<span class="noResult">No results</span>';
    }
    
   results.innerHTML = ( 

        meals.map(meal => (
           
            `
            <div class="searchContainer" id="boxResize-${meal.idMeal}">
                
                <img id="photo" src='${meal.strMealThumb}'/>

                
                <div class="infos">
                <h2>${meal.strMeal}</h2>
                <div>origin : ${meal.strArea}</div>
                <p class="textRecette">"${meal.strInstructions}"</p>
                <button id="${meal.idMeal}"> En savoir plus </button>
                </div>
                  
                
            </div>
            ` 
        )).join('')
    ); 

   for ( let i = 0; i<meals.length; i++){
        const btn = document.getElementById(meals[i].idMeal);
      
        btn.addEventListener('click', (event) => {
            const boxResizeSelect = document.getElementById(`boxResize-${event.target.id}`);
            boxResizeSelect.classList.toggle('bigContainer');
           /* const textRecette= document.getElementById('textRecette');
            const instructionRecette = document.createElement('p');
            textRecette.classList.toggle('active');
            textRecette.textContent= meal.idMeal;
             ${meal.strInstructions}*/
        });
 }
};
/*<a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>*/
/* <div>category : ${meal.strCategory}</div>*/
searchInput.addEventListener('input', (e) => {
    search = e.target.value
    searchDisplay();
});


/*function myFunction() {
    element = document.querySelector(".searchContainer");
    element.classList.toggle("bigContainer");
 }*/



  

