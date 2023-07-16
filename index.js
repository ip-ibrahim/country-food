let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");


$(document).ready(() => {
    searchByName("").then(() => {
        $("body").css("overflow", "visible")

    })
})

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 400)




    for (let i = 0; i < 6; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 6) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 400)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 250
    }, 400)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})




function displayMeals(zz) {
    let contain = "";

    for (let i = 0; i < zz.length; i++) {
        contain += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${zz[i].idMeal}')" class="meal position-relative overflow-hidden ">
                    <img class="w-100" src="${zz[i].strMealThumb}">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black ">
                        <h3>${zz[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = contain
}



async function getCategories() {
    rowData.innerHTML = ""
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories);
    
}

function displayCategories(zz) {
    let contain = "";

    for (let i = 0; i < zz.length; i++) {
        contain += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${zz[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${zz[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${zz[i].strCategory}</h3>
                        <p>${zz[i].strCategoryDescription.split(" ").slice(0,22).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = contain
}


async function getArea() {
    rowData.innerHTML = ""
    
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    x = await x.json()
    console.log(x.meals);

    displayArea(x.meals)
    

}


function displayArea(zz) {
    let contain = "";

    for (let i = 0; i < zz.length; i++) {
        contain += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${zz[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${zz[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = contain
}


async function getIngredients() {
    rowData.innerHTML = ""
    

    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    x = await x.json()
    console.log(x.meals);

    displayIngredients(x.meals.slice(0, 20))
    

}


function displayIngredients(zz) {
    let contain = "";

    for (let i = 0; i < zz.length; i++) {
        contain += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${zz[i].strIngredient}')" class="rounded-2 text-center ">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${zz[i].strIngredient}</h3>
                        <p>${zz[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = contain
}


async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    

}



async function getAreaMeals(area) {
    rowData.innerHTML = ""
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    
}


async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    

}

async function getMealDetails(mealID) {
    closeSideNav()
    rowData.innerHTML = ""
    

    searchContainer.innerHTML = "";
    let x = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    x = await x.json();

    displayMealDetails(x.meals[0])
    

}


function displayMealDetails(meal) {
    
    


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let contain = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                

                
            </div>`

    rowData.innerHTML = contain
}


function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control text-white" type="text" placeholder="SearchName">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)"  class="form-control text-white" type="text" placeholder="Search F Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])

}

async function searchByFLetter(term) {
    closeSideNav()
    rowData.innerHTML = ""
    

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    

}


function showContacts() {
    rowData.innerHTML = `<div class="contact vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"class="form-control" placeholder="Name">
                
            </div>
            <div class="col-md-6">
                <input id="emailInput"class="form-control" placeholder="Email">
                
            </div>
            <div class="col-md-6">
                <input id="phoneInput"class="form-control"placeholder="Phone">
                
            </div>
            <div class="col-md-6">
                <input id="ageInput"class="form-control"placeholder="Age">
                
            </div>
            <div class="col-md-6">
                <input  id="passwordInput"class="form-control" placeholder="Password">
                
            </div>
            
        </div>
        <button id="submitBtn" class="btn btn-outline-warning px-2 mt-3">Submit</button>
    </div>
</div> `
    
    
}




