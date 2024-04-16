document.addEventListener("DOMContentLoaded", function() {
  const selectedTags = []; //creer un tableau pour mettre les resultas de buttons 
  const filterValues = [];//pour mettre les valeur filtre
  let uniqueTags =[];//creer un tableau pour mettre les resultas tags
  const selectTag = document.querySelector(".filter");
  //**************************************************************************//
                  //function search bar/
  //**************************************************************************//
   function searchBar(recipes, inputValue) {
    const messageError = document.querySelector(".message-error");
    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!regex.test(inputValue) && inputValue) {
      messageError.textContent = "Le champ doit contenir uniquement des lettres.";
     } else {
      const searchResults = recipes.filter(recipe => {
        console.log((
         //chaque tags soit dans ing ou app ou ust 
         uniqueTags.every(tag=>recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) ||
         recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase())) ||
         recipe.appliance.toLowerCase().includes(tag.toLowerCase()) )
       ) );
        return (
          recipe.name.toLowerCase().includes(inputValue) ||
          recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputValue)) ||
          recipe.ustensils.some(utensil => utensil.toLowerCase().includes(inputValue)) ||
          recipe.appliance.toLowerCase().includes(inputValue) 
         ) && (
           //chaque tags soit dans ing ou app ou ust 
           uniqueTags.every(tag=>recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())) ||
           recipe.ustensils.some(utensil => utensil.toLowerCase().includes(tag.toLowerCase())) ||
           recipe.appliance.toLowerCase().includes(tag.toLowerCase()))
         ) 
       });
       console.log(searchResults);
       console.log(uniqueTags);
       if (searchResults.length === 0) {
          messageError.textContent = "Aucune recette trouvée pour cette recherche.";
         } else {
        messageError.textContent = "";
        const recipeNames = searchResults.map(recipe => recipe.name);
        displaySearchResults(recipeNames, "choix-recette");
        afficherListes("",searchResults);
      }
     }
    //  displayFilterValues(searchResults);
   }
   //**************************************************************************//
            //fuction pour les inputs ing/app/ust
   //**************************************************************************//
  function searchInput(inputElement, result) {
    const inputValue = inputElement.value.trim().toLowerCase();
    const searchResults = result.filter(item => item.toLowerCase().includes(inputValue));
    // displayOptions(searchResults, inputElement.resultset.container);
    afficherListesUniques(searchResults ,inputElement.resultset.container);
   }
  const inputs = document.querySelectorAll('.search-input');
  if (inputs) {
    inputs.forEach(input => {
      input.addEventListener('keyup', function() {
       const result = input.resultset.type === 'ingredients' ? ingredients :
                      ingredients;
                      input.resultset.type === 'appliances' ? appliances :
                      appliances;
                      input.resultset.type === 'utensils' ? utensils :
                      utensils;
       searchInput(input, result);
      });
     });
   }
  //***********************************************************//
                         //function displaySearchResults//
  //***********************************************************//
  function displaySearchResults(results, containerClass) {
    const container = document.querySelector("." + containerClass);
    if (container) {
       // Supprimer uniquement les éléments enfants de container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        if (containerClass === "choix-recette") {
           results.forEach(result => {
             const recipe = recipes.find(recipe => recipe.name === result);
             if (recipe) {
               const recipeCard = recettTemplate(recipe);
               const userCardDOM = recipeCard.getUserCardDOM();
               container.appendChild(userCardDOM);
              }
            });
            // Mettre à jour le nombre de recettes affichées
            const recipeCountElement = document.getElementById('nb');
            recipeCountElement.textContent = results.length;
          } else {
            // Si aucun résultat n'est trouvé, afficher le nombre par défaut (0 ou autre valeur souhaitée)
            const defaultRecipeCount =50;
            const recipeCountElement = document.getElementById('nb');
            recipeCountElement.textContent = defaultRecipeCount;
          }
        }
      }
      //function search 
     const btnSearch = document.getElementById('btn-search');
     if (btnSearch) {
       btnSearch.addEventListener('click', function() {
         const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
         searchBar(recipes, inputValue);
        });
      }
    //**************************************************************************//
               // Appeler la fonction avec le terme de recherche ""//
   //**************************************************************************//
   afficherListes("",recipes);
    //****************************************************************//
    // Fonction pour afficher les listes d'ingrédients et d'appareils //
    //correspondant au terme de recherche//
    //**************************************************************//
    function afficherListes(term,recipes) {
      // Créer des ensembles pour stocker les ingrédients, les appareils et les ustensiles uniques
       const ingredientsUniques = new Set();
       const appareilsUniques = new Set();
      const ustensilesUniques = new Set();
      
      // Parcourir les recettes pour extraire les ingrédients, les appareils et les ustensiles correspondant au terme de recherche
      recipes.forEach(recipe => {
          if (recipe.name.toLowerCase().includes(term)) {
              recipe.ingredients.forEach(ingredient => ingredientsUniques.add(ingredient.ingredient));
              appareilsUniques.add(recipe.appliance);
              recipe.ustensils.forEach(utensil => ustensilesUniques.add(utensil));
          }
      });
     // Afficher les listes d'ingrédients, d'appareils et d'ustensiles
     console.log("Ingrédients correspondant au terme de recherche :");
     console.log(recipes.length);
     ingredientsUniques.forEach(ingredient => console.log(ingredient));
     console.log(ingredientsUniques);
     appareilsUniques.forEach(appareil => console.log(appareil));
     console.log(appareilsUniques);
     ustensilesUniques.forEach(ustensil => console.log(ustensil));
     console.log(ustensilesUniques);
     
     //mettre les valeurs dans les classes pour l'afficher 

     const listIng= document.querySelector('.liste-choix-Ing');
     listIng.innerHTML = ''; // Effacer le contenu actuel de la liste
     const listApp = document.querySelector('.liste-choix-App');
     listApp.innerHTML = '';
     const listUst =document.querySelector('.liste-choix-Ust');
     listUst.innerHTML = '';
     //***************************************************************************//
     //appeler les functions ingredientsUniques,appareilsUniques, pour l'afficher//
     //**************************************************************************//
     function afficherListesUniques(ingredients, ustensiles, appareils) {
      afficherListeUnique(ingredients, '.liste-choix-Ing', '.option-choix-Ing');//er 
      afficherListeUnique(ustensiles, '.liste-choix-Ust', '.option-choix-Ust');
      afficherListeUnique(appareils, '.liste-choix-App', '.option-choix-App');
     }
     function afficherListeUnique(elements, containerClass, optionClass) {
      const listContainer = document.querySelector(containerClass);
      if (listContainer) {
             const input = document.createElement("input");
              input.setAttribute("type", "search"); // Définir le type d'entrée comme texte
              
              const resultList = document.createElement("ul");
              elements.forEach(element => {
               // Définir la valeur de l'entrée avec l'élément actuel du tableau
               const listItem = document.createElement("li");
              listItem.classList.add("liste");
              listItem.textContent = element;
              input.value = " ";
              resultList.appendChild(listItem); // Ajouter l'élément d'entrée au listItem
              listItem.addEventListener("click", function() {
                let inputElement;
                if (containerClass === "option-choix-Ing") {
                    inputElement = document.getElementById("myInput-ing");
                } else if (containerClass === "option-choix-App") {
                    inputElement = document.getElementById("myInput-App");
                } else if (containerClass === "option-choix-Ust") {
                    inputElement = document.getElementById("myInput-Ust");
                } else {
                    inputElement = null; // Affecter null plutôt que la chaîne vide
                }
                  listItem.classList.toggle('highlight');
                  const isDifferent = !uniqueTags.includes(element);
                  if (isDifferent) {
                      uniqueTags.push(element);
                      const filterElement = document.createElement('div');
                      filterElement.classList.add('tag');
                      const btnX = document.createElement("i");
                      btnX.className = "fa-solid fa-xmark close-tag";
                      btnX.addEventListener('click', function(event) {
                          event.stopPropagation();
                          closetag(btnX);
                        });
                      filterElement.textContent = element;
                      selectTag.appendChild(filterElement);
                      filterElement.appendChild(btnX);
                      const inputValue = document.getElementById('myInput').value.trim().toLowerCase();
                      searchBar(recipes, inputValue);
                    }
                });
             
              resultList.appendChild(listItem);
              
          });
          listContainer.appendChild(input); // Ajouter l'élément d'entrée à l'élément de liste
          listContainer.appendChild(resultList);
      }
     }
    // Utilisation de la fonction pour afficher les listes uniques
     afficherListesUniques(Array.from(ingredientsUniques), Array.from(ustensilesUniques), Array.from(appareilsUniques));
   
  //***********************************************************//
              //fuction pour fermeture//
  //***********************************************************//
  function closetag(btnX) {
    btnX.parentNode.remove();
    searchBar(recipes, inputValue);

  }
  //***********************************************************//
  // Fonction pour rétablir les tags supprimés dans les listes//
  //*********************************************************//


  

 //***********************************************************//
   // Modifier la fonction closetag pour rétablir les tags//
 //***********************************************************//
    function closetag(btnX) {
     const tag = btnX.parentNode.textContent.trim();
     btnX.parentNode.remove();
     restoreTag(tag);
    }
 //***********************************************************//
 // Fonction pour rétablir le tag dans la liste correspondante
 //***********************************************************//
 function restoreTag(tag) {
     if (ingredients.includes(tag)) {
      const listIng = document.querySelector('.liste-choix-Ing');
      appendTagToList(tag, listIng);
     } else if (appliances.includes(tag)) {
      const listApp = document.querySelector('.liste-choix-App');
      appendTagToList(tag, listApp);
     } else if (utensils.includes(tag)) {
      const listUst = document.querySelector('.liste-choix-Ust');
      // appendTagToList(tag, listUst);
     }
    }
//     //***********************************************************//
//    // Fonction pour ajouter le tag à la liste correspondante//
//    //***********************************************************//
  //  function appendTagToList(tag, list) {
  //  const listItem = document.createElement('li');
  //  listItem.textContent = tag;
  //  listItem.classList.add('liste');
  //  listItem.addEventListener('click', function() {
  //     addTagToList(tag); // Ajouter le tag à la liste des filtres sélectionnés
  //     list.removeChild(listItem); // Supprimer le tag de la liste
  //  });
  //  list.appendChild(listItem);
  //  }
   //***********************************************************//
   //function  de tag de filter pour afficher les cards//
   //***********************************************************//
  //  function displayFilterValues(listItem){
  //    listItem.forEach(element => {
  //      filterValues.push(element);
  //     });
  //     //supprime les repetitions de tag
  //     const filterValuesTags = Array.from(new Set(filterValues));
  //     console.log("lire fonction filter");
  //     console.log(filterValuesTags); // Affiche les valeurs dans la console
  //     return filterValuesTags;
  //   } 
   //***********************************************************//
   //fuction pour eliminer la repitition dans le filter//
   //***********************************************************//
   const ingredients = [];
   const appliances = [];
   const utensils = [];
   recipes.forEach(recipe => {
    recipe.ingredients.forEach(ingredient => {
      if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
      }
    });
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }
    recipe.ustensils.forEach(utensil => {
      if (!utensils.includes(utensil)) {
        utensils.push(utensil);
      }
    });
   });
   
  }
   });
  