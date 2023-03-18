getData()
$("document").ready(function () {
    $(".lds-roller").fadeOut(700, function () {
      $(".loader").fadeOut(300);
      $("body").css("overflow", "auto");
});
});

// NavBar Functions //

$(".nav-white i:first").click(function(){
    let widthInner = $(".nav-content").outerWidth(true)
    let sideNav = $(".side-nav");
    if(sideNav.css("left")=="-"+widthInner+'px'){
       openNavBar() 
    }else{
        closeNavBar()
    }
})
function closeNavBar(){
    let widthInner = $(".nav-content").outerWidth(true)
    $(".side-nav").animate({left:-widthInner+`px`},1000)
        $("#search").animate(
            { opacity: "0", paddingTop: "100px" },
            { duration: 100, function() {} }
          );
          $("#categories").animate(
            { opacity: "0", paddingTop: "100px" },
            { duration: 100, function() {} }
          );
          $("#area").animate(
            { opacity: "0", paddingTop: "100px" },
            { duration: 100, function() {} }
          );
          $("#ingredients").animate(
            { opacity: "0", paddingTop: "100px" },
            { duration: 100, function() {} }
          );
          $("#contact").animate(
            { opacity: "0", paddingTop: "100px" },
            { duration: 100, function() {} }
          );
          $(".open-close-icon").removeClass("fa-x");
}
function openNavBar(){
    $(".side-nav").animate({left:0+"px"},500)
    $(".nav-content").animate({ left: 0 }, 200, function () {
        $("#search").animate(
          { opacity: "1", paddingTop: "25px" },
          { duration: 300, function() {} }
        );
        $("#categories").animate(
          { opacity: "1", paddingTop: "25px" },
          { duration: 500, function() {} }
        );
        $("#area").animate(
          { opacity: "1", paddingTop: "25px" },
          { duration: 700, function() {} }
        );
        $("#ingredients").animate(
          { opacity: "1", paddingTop: "25px" },
          { duration: 900, function() {} }
        );
        $("#contact").animate(
          { opacity: "1", paddingTop: "25px" },
          { duration: 1100, function() {} }
        );
      });
      $(".open-close-icon").addClass("fa-x");
}

// NavBar Functions //

// Get Data //

async function getData(){
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let meal = await meals.json()
    getMeals(meal.meals)}
  async function getMeals(meal){
    let myDiv = ""
    meal.forEach(el => {
        myDiv+=`<div class="col-md-3">
        <div class="meal position-relative mb-4 overflow-hidden rounded-2 cursor-pointer" onclick="getMealDetails('${el.idMeal}')">
            <img src="${el.strMealThumb}" class="w-100" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${el.strMeal}</h3>
            </div>
        </div>
    </div>`
    });
    $("#myRow").html(myDiv)
  }

// Get Data //


// Show Search //
function showSearch(){
$("#searchContainer").html(`<div class="row py-4">
<div class="col-md-6">
  <input
    id="byName"
    type="text"
    onkeyup="searchByName(this.value)"
    class="form-control bg-transparent text-white"
    placeholder="Search by zeft"
  />
</div>
<div class="col-md-6">
  <input
    id="byLetter"
    type="text"
    onkeyup="searchByLetter(this.value)"
    class="form-control bg-transparent text-white"
    maxlength="1"
    placeholder="Search by first letter"
  />
</div>
</div>`)
$("#myRow").html("")
}
// Show Search //

// Search Functions //

async function searchByName(searchValue) {
  closeNavBar()
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
  let res = await myData.json()
  res.meals ? getMeals(res.meals) : getMeals([])
  $(".loading-screen").fadeOut(300)
}

async function searchByLetter(searchValue) {
  closeNavBar()
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  searchValue == "" ? searchValue = "a" : "";
  let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`)
  let res = await myData.json()
  res.meals ? getMeals(res.meals) : getMeals([])
  $(".loading-screen").fadeOut(300)
}

// Search Functions //


// Get All Categories //

async function getCategories(){
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  $("#searchContainer").html("")
  let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let res = await myData.json()
  displayCategories(res.categories)
  $(".loading-screen").fadeOut(300)
}

async function displayCategories(arr){
  let myDiv = ""
    arr.forEach(el => {
        myDiv+=`<div class="col-md-3">
        <div class="meal position-relative mb-4 overflow-hidden rounded-2 cursor-pointer" onclick="getCategoryMeals('${el.strCategory}')">
            <img src="${el.strCategoryThumb}" class="w-100" alt="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${el.strCategory}</h3>
                <p>${el.strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
    </div>`
    });
    $("#myRow").html(myDiv)
}
// Get All Categories // 

// Filter Category Meals //

async function getCategoryMeals(category){
  closeNavBar()
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  $("#searchContainer").html("")
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  let res = await meals.json()
  filterCategory(res.meals)
  $(".loading-screen").fadeOut(300)
}

async function filterCategory(arr){
  getMeals(arr)
}
// Filter Category Meals //


// Get Meal Details //

async function getMealDetails(id){
  closeNavBar()
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  $("#searchContainer").html("")
  let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let res = await myData.json()
  displayMealDetails(res.meals[0])
  $(".loading-screen").fadeOut(300)
}

async function displayMealDetails(meal){
  let ingredients = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info mt-2 me-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
  var tags = meal.strTags;
  if (tags !== null){
  let tagsArr = tags.split(",");
  var tagsStr = ""
  for (let i = 0; i < tagsArr.length; i++) {
    tagsStr += `<li class="alert myTagColor my-2 me-2 p-1">${tagsArr[i]}</li>`
    }
  }else{
    tagsStr = ""
  }
  let myDiv =`<div class="text-end"> <i class="fa-solid fa-xmark mb-3 fs-1" onclick="closeNavBar(); getData();"></i></div>
  <div class="col-md-4">
  <img src="${meal.strMealThumb}"  class="w-100 rounded-3" alt="">
  <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8">
  <h2>Instructions</h2>
  <p>${meal.strInstructions}</p>
  <h3>
    <span class="fw-bolder">Area : </span>
    ${meal.strArea}
  </h3>
  <h3>
    <span class="fw-bolder">Category : </span>
    ${meal.strCategory}
  </h3>
  <h3 class="fw-bolder">Recipes :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">${ingredients}</ul>
  <h3 class="tagH3">Tags :</h3>
  <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsStr}</ul>
  <a target="_blank" href="${meal.strSource}" class="btn me-2 btn-success"> <i class="fa-solid fa-link"></i> Source</a>
  <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger"> <span> <i class="fa-brands fa-youtube"></i> </> Youtube</a>
  </div>`
$("#myRow").html(myDiv)
}
// Get Meal Details //


// Get All Area Countries //

async function getArea(){
  closeNavBar()
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  $("#searchContainer").html("")
  let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let res = await myData.json()
  displayArea(res.meals)
  $(".loading-screen").fadeOut(300)
}

async function displayArea(arr){
  let myDiv = ""
  arr.forEach(el=>{
    myDiv+= `<div class="col-md-3">
    <div class="flag rounded-2 text-center cursor-pointer bg-white text-black my-2 py-2" onclick="getAreaMeals('${el.strArea}');">
    <img src="imgs/flags/${el.strArea}.png" alt="">
    <h3>${el.strArea}</h3>
    </div>
  </div>` 
  })
  $("#myRow").html(myDiv)
}

// Get All Area Countries //


// Filter By Area //

async function getAreaMeals(area){
  closeNavBar()
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  $("#searchContainer").html("")
  let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let res =await myData.json()
  filterArea(res.meals)
  $(".loading-screen").fadeOut(300)
}

async function filterArea(meals){
  getMeals(meals)
}

// Filter By Area //


// Get All Ingredients // 

async function getIngredients(){
  closeNavBar()
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  $("#searchContainer").html("")
  let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let res = await myData.json()
  displayIngredients(res.meals.slice(0, 20))
  $(".loading-screen").fadeOut(300)
} 
async function displayIngredients(Ingredients){
  let myDiv= ""
  Ingredients.forEach(el=>{
    myDiv+=`<div class="col-md-3">
    <div class="ing p-3 rounded-2 text-center cursor-pointer" onclick="getIngredientMeals('${el.strIngredient}')">
      <i class="fa-solid fa-utensils fa-3x"></i>
      <h3>${el.strIngredient}</h3>
      <p>${el.strDescription.split(" ").slice(0,20).join(" ")}</p>
    </div>
  </div>`
  })
  $("#myRow").html(myDiv)
}
// Get All Ingredients // 


// Filter By Ingredient //

async function getIngredientMeals(Ingredient){
  closeNavBar()
  $("#myRow").html("")
  $(".loading-screen").fadeIn(300)
  $("#searchContainer").html("")
  let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)
  let res = await myData.json()
  filterByIngredient(res.meals)
  $(".loading-screen").fadeOut(300)
}
async function filterByIngredient(meals){
  getMeals(meals)
}

// Filter By Ingredient //


// Contact Section //

function showContact(){
  $("#myRow").html(`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid : example@email.com
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid phone number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Minimum eight characters, at least one letter and one number
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Password doesn't match
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `)
  $("#searchContainer").html("")
$("#nameInput").focus(function(){
    nameInputTouched = true;
})
$("#emailInput").focus(function(){
    emailInputTouched = true;
})
$("#ageInput").focus(function(){
    ageInputTouched = true;
})
$("#phoneInput").focus(function(){
    phoneInputTouched = true;
})
$("#passwordInput").focus(function(){
    passwordInputTouched = true;
})
$("#repasswordInput").focus(function(){
    repasswordInputTouched = true;
})
}

let nameInputTouched = false;
let emailInputTouched = false;
let ageInputTouched = false;
let phoneInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

// Contact Section //

// Regex //

var nameRegex = /^[a-zA-Z]+$/;

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var phoneRegex = /^01[0-9]{9}$/;

var ageRegex = /^(1[8-9]|[2-9][0-9]|1[01][0-9]|120)$/;

var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// Regex //


// Validation //

function nameValidation(){
    let nameValue = $('#nameInput').val();
   return nameRegex.test(nameValue)
}
function emailValidation(){
    let emailValue = $('#emailInput').val();
   return emailRegex.test(emailValue)
}
function phoneValidation(){
    let phoneValue = $('#phoneInput').val();
   return phoneRegex.test(phoneValue)
}
function ageValidation(){
    let ageValue = $('#ageInput').val();
   return ageRegex.test(ageValue)
}
function passwordValidation(){
    let passwordValue = $('#passwordInput').val();
   return passwordRegex.test(passwordValue)
}
function repasswordValidation(){
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block")
    }
}
if (emailInputTouched) {
    if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")
    }
}

if (phoneInputTouched) {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
    }
}

if (ageInputTouched) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")
    }
}

if (passwordInputTouched) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")
    }
}
if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
    }
}
  if (nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
      $('#submitBtn').prop('disabled', false);
      }else {
      $('#submitBtn').prop('disabled', true);
}
}

// Validation //