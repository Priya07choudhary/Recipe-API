const searchBox=document.querySelector('.searchBox');
const searchbtn=document.querySelector('.searchbtn');
const recipedetailscontent=document.querySelector('.recipe-details-content');
const recipeclosebtn=document.querySelector('.recipe-closeBtn');
const recipeContainer=document.querySelector('.recipe-container');
 const fetchRecipes=async(query)=>{
   recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>";
   
      try {
         
      
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
     const recipeDiv=document.createElement('div');
     recipeDiv.classList.add('recipe');
     recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
     <h3>${meal.strMeal}</h3>
     <p><span>${meal.strArea}</span> Dish</p>
     <p>Belongs to <span>${meal.strCategory}</span> Category</p>`;


     const button= document.createElement('button');
     button.textContent="View Recipe";
     recipeDiv.appendChild(button);
     //Adding Eventlistener to recipe button
     button.addEventListener('click', () => {
      openRecipePopup(meal);
     });
     recipeContainer.appendChild(recipeDiv);
    });}
   /* catch (error) {
         recipeContainer.innerHTML="Error in fetching Recipes...";
         
    }*/
         catch (error) {
            recipeContainer.innerHTML = ""; // Clear previous content
            const errorImage = document.createElement('img');
            errorImage.src = "sad-face.png" ; 
            
            errorImage.style.width = '50%'; // Optional: Set width or any other styles
            errorImage.style.height = 'auto'; // Optional: Maintain aspect ratio
        
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "Error in fetching Recipes...";
        
            recipeContainer.appendChild(errorImage);
            recipeContainer.appendChild(errorMessage);
        }
 }

 //function to fetch ingredients
 const fetchIngredients=(meal)=>{
  let ingredientsList="";
   for(let i=1;i<=20;i++)
      {
   const ingredient=meal[`strIngredient${i}`];
   if (ingredient)
      {
      const measure=meal[`strMeasure${i}`];
      ingredientsList+=`<li>${ingredient} - ${measure}</li>`;
   }
   else{
      break;
   }
 }
 return ingredientsList;
}
const openRecipePopup=(meal)=>{
 recipedetailscontent.innerHTML=`
 <h2 class="recipeName">${meal.strMeal}</h2>
 <h3>Ingredients:</h3>
 <ul class="ingredientList">${fetchIngredients(meal)}</ul>

 <div class="recipeInstructions"> <h3>Instructions:</h3>
 <p >${meal.strInstructions}</p></div>`
 recipedetailscontent.parentElement.style.display="block";
}

recipeclosebtn.addEventListener('click',()=>{
   recipedetailscontent.parentElement.style.display="none";
});
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchinput=searchBox.value.trim();
    if(!searchinput){
      recipeContainer.innerHTML="<h2>Type the meal in the search box.<h2/>";
      return;
    }
    fetchRecipes(searchinput);
   
});
 