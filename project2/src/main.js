
// import "./favorites.js"
// import "./my-footer.js"
// import "./my-header.js"
// import "./my-card.js"
import "./app.js"

import {getTypeUrl} from "./app.js"

let select = document.querySelector("#type-select");
//let pokemonSel = document.querySelector("#pokemon-select");
let textResponse = document.querySelector("#response");

loadFetch();

function loadFetch()
{
  fetch('https://pokeapi.co/api/v2/type/')
  .then(response => {
    //If the response is successful, return the JSON
    if(response.ok)
    {
      return response.json();
    }

    //else throw an error that will be caught below
    return response.text().then(text =>{
      throw text;
    });
  }) //send the response.json() promise to the next .then()
  .then(json => { // the second promise is resolved, and "json" is a JSON object
      console.log(json);

      // const keys = Object.keys(json);
      // let html = "";

      //creates an option for each Pokemon type
      for(let i = -1; i < 18; i++)
      {
        let option = document.createElement("option");
        //gives a default starting option
        if(i == -1)
        {
          option.value = "default";
          option.innerHTML = "Choose a Type";
          select.appendChild(option);
          continue;
        }
        let typeName = json.results[i].name;
        option.value = typeName;
        //Capitalizes the first letter of each type
        let capType = typeName.charAt(0).toUpperCase() + typeName.slice(1);

       // console.log(json.results[i].url);
    
        option.innerHTML = capType;
        select.appendChild(option);
      }

      const prefix = "wqw7732-";
      const typeKey = prefix + "type";
      const storedType = localStorage.getItem(typeKey);

      if(storedType)
      {
        select.value = storedType;
      }
      else
      {
        select.value = "default";
      }

      getList(json);

      select.addEventListener("change", () => {
        //console.log(select.value);
        //console.log(pokemonSel.value);
        localStorage.setItem(typeKey, select.value);
        textResponse.innerHTML = "Created a list for " + select.value + " types.";

        getList(json);
      })
    }).catch(error => {
    //error
    console.log(error);
  });
}
//Returns data about the pokemon type selected
function getList(array)
{
  for(let i = 0; i < array.count; i++)
  {
    if(array.results[i].name == select.value)
    {
      let typeUrl = array.results[i].url;
      getTypeUrl(typeUrl);
    }
  }
}