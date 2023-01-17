import { writeFavoriteData } from "./community.js";
const arr = localStorage.getItem("array");

const parsedArr = JSON.parse(arr);

//console.log(parsedArr);

let favArray = [];

//If the local storage has a favorites list already created
//saves and uses the same array
if(parsedArr != null)
{
  favArray = parsedArr;
}

let body = document.querySelector("#body");
let response = document.querySelector("#response");

let pokemonSel = document.querySelector("#pokemon-select");
let typeSel = document.querySelector("#type-select");

let applyButton = document.querySelector("#applyButton");

let singleButton = document.querySelector("#single");
let dualButton = document.querySelector("#dual");
let allButton = document.querySelector("#all");

let qImg = "https://th.bing.com/th/id/R.ef87b2e921e4c102a3ae1eaf3b645504?rik=OoXJRYZQ9mZJ5g&riu=http%3a%2f%2frunean.com%2fwp-runsoftwareblog%2fwp-content%2fuploads%2f2013%2f07%2fquestion-mark-320x320.png&ehk=wDEH0i789eDYDp5mnb3ghMTvARlS2NWssq6CDOEIPcE%3d&risl=&pid=ImgRaw&r=0"

let radioValue = 1;

const prefix = "wqw7732-";
const searchMon = prefix + "pokemon";
const storedMon = localStorage.getItem(searchMon);

const searchRad = prefix + "radio";
const storedRad = localStorage.getItem(searchRad);

let initial = true;

//uses the stored radio value
if(storedRad)
{
  radioValue = storedRad;
  changeRad(radioValue);
}

//changes the value based on which radio button is selected
allButton.onclick = () => {
  radioValue = 1;
  localStorage.setItem(searchRad, radioValue);
}
singleButton.onclick = () => {
  radioValue = 2;
  localStorage.setItem(searchRad, radioValue);
}
dualButton.onclick = () => {
  radioValue = 3;
  localStorage.setItem(searchRad, radioValue);
}
applyButton.onclick = () => {
  response.innerHTML = "Please select a type first";
}
favButton.onclick = () => {
  response.innerHTML = "Please select a Pokemon first";
}

//Gets the data found from a user chosen pokemon type
export function getTypeUrl(url)
{
  fetch(url)
  .then(response => {
    if(response.ok)
    {
      return response.json();
    }

    return response.text().then(text =>{
      throw text;
    });
  }) 
  .then(json => { 
      console.log(json);
      // const keys = Object.keys(json);
      // let html = "";
      genPokemon(json);

      //makes it so the initial image dosen't change until the user selects another pokemon
      if(storedMon && initial == true)
      {
        getImage(json, storedMon);
        initial = false;
      }

      //generates a list of pokemon everytime the button gets clicked
      applyButton.onclick = () => {
        applyButton.className += " is-loading";
        setTimeout(
          function() {
            genPokemon(json);
              applyButton.className = "button is-rounded is-normal is-warning mx-4";
          }, 200);
      }

      //gets the data for the pokemon that the user selected
      pokemonSel.addEventListener("change", () => {

        if(pokemonSel.value != "Default")
        {
          localStorage.setItem(searchMon, pokemonSel.value);
        }

       getImage(json, pokemonSel.value);
      })

    }).catch(error => {
    //error
    console.log(error);
  });
}
//creates an image of a pokemon
function getImage(json, value)
{
  let pokeVal = value;
  response.innerHTML = "";
  //creates a loading spinner while the image is loading
  body.innerHTML = "Loading...";
  response.innerHTML = "Searching for " + pokeVal;
  createImg("https://cdn.dribbble.com/users/172519/screenshots/3520576/dribbble-spinner-800x600.gif", 500, 200);

  let foundPoke = false;

  for(let i = 0; i < json.pokemon.length; i++)
  {
      if(json.pokemon[i].pokemon.name == pokeVal)
      {
        foundPoke = true;
        getPokeInfo(json.pokemon[i].pokemon.url);
      }
  }

  if(foundPoke == false)
  {
    body.innerHTML = "";
    response.innerHTML = "";
    createImg(qImg, 200, 200);
  }
}
//creates a list of pokemon
function genPokemon(json)
{
   //resets the pokemon selection list
   pokemonSel.length = 0;
   //creates a select option for each pokemon in the given type
   for(let i = -1; i < json.pokemon.length; i++)
   {
     let pokeOption = document.createElement("option");
     if(i == -1)
     {
       pokeOption.innerHTML = "Choose a Pokemon";
       pokeOption.value = "Default";
       pokemonSel.appendChild(pokeOption);
       continue;
     }
     //filters based on which radio button is selected
     if(radioValue == 1)
     {
       let pokeName = json.pokemon[i].pokemon.name;
       addOption(pokeOption, pokeName, pokemonSel);
     }
     else if(radioValue == 2)
     {
       if(json.pokemon[i].slot == 1)
       {
         let pokeName = json.pokemon[i].pokemon.name;
         addOption(pokeOption, pokeName, pokemonSel);
       }
     }
     else if(radioValue == 3)
     {
       if(json.pokemon[i].slot == 2)
       {
         let pokeName = json.pokemon[i].pokemon.name;
         addOption(pokeOption, pokeName, pokemonSel);
       }
     }
   }
}

//gets the data for the individual pokemon
export function getPokeInfo(url)
{
    fetch(url)
    .then(response => {
      if(response.ok)
      {
        return response.json();
      }
  
      return response.text().then(text =>{
        throw text;
      });
    }) 
    .then(json => { 
        console.log(json);
        // const keys = Object.keys(json);
        // let html = "";
  
        let imgUrl = json.sprites.other.dream_world.front_default;
  
        body.innerHTML = "";
        response.innerHTML = "";

        if(imgUrl == null)
        {
          imgUrl = qImg;
        }
 
        createImg(imgUrl, 200, 200);

        let favButton = document.querySelector("#favButton");
        favButton.onclick = () => {
          //writes firebase data
          writeFavoriteData(json.name, json.sprites.other.dream_world.front_default);
          favButton.className += " is-loading";
          let inArray = false;

          setTimeout(
            function() {
                //checks to see is a pokemon is already in the favorite list
            for(let i = 0; i < favArray.length; i++)
            {
                if(favArray[i].name == pokemonSel.value)
                {
                    inArray = true;
                    break;
                }
            }
    
            //adds a pokemon into the list if they are not already in it
            if(inArray == false)
            {
                response.innerHTML = "You have added this Pokemon to your Favorites list";
    
              let typeArr = [];
              let statArr = [];
              //adds the pokemon's types to an array
              for(let i = 0; i < json.types.length; i++)
              {
                typeArr.push(json.types[i].type.name);
              }
              //adds the pokemon's stats to an array
              for(let i = 0; i < json.stats.length; i++)
              {
                let stat = json.stats[i].stat.name + ": " + json.stats[i].base_stat;
                statArr.push(stat);
              }
              
                //creates a pokemon object
                let pokemon = {
                  "name": json.name,
                  "img": imgUrl,
                  "types": typeArr,
                  "stats": statArr
                }
    
                favArray.push(pokemon);
                //saves the favorites array into local storage
                const expArray = JSON.stringify(favArray);
                localStorage.setItem("array", expArray);
            }
            else
            {
                response.innerHTML = "This Pokemon is already in your favorites list";
            }
                favButton.className = "button is-rounded is-normal mx-4 is-warning";
              }, 200);
          
        }
      }).catch(error => {
      //error
      console.log(error);
    });
}
//capitalizes the first letter of a string
function capitalize(string)
{
  let capString = string.charAt(0).toUpperCase() + string.slice(1);
  return capString;
}
//adds options into a selection list
function addOption(option, name, selection)
{
  option.innerHTML = capitalize(name);
  option.value = name;
  selection.appendChild(option);
}

createImg(qImg, 200, 200);
//creates a pokemon image
function createImg(url, w, h)
{
  var img = document.createElement("img");
  img.alt = "pokemon art";
  img.src = url;
  img.width = w;
  img.height = h;

  body.appendChild(img);
}

//chaanges the checked value of 3 radio buttons
function switchRadio(b1, b2, b3)
{
  b1.checked = true;
  b2.checked = false;
  b3.checked = false;
}

//uses the stored radio value
function changeRad(radioValue)
{
  if(radioValue == 1)
  {
    switchRadio(allButton, singleButton, dualButton);
  }
  if(radioValue == 2)
  {
    switchRadio(singleButton, allButton, dualButton);
  }
  if(radioValue == 3)
  {
    switchRadio(dualButton, singleButton, allButton);
  }
}
