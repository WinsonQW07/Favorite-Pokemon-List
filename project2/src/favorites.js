
let favBody = document.querySelector("#favBody");
let delButton = document.querySelector("#delButton");
let nextButton = document.querySelector("#nextButton");
let prevButton = document.querySelector("#prevButton");

let favList = document.querySelector(".fav-list");
let response = document.querySelector("#response");
let pageNum = document.querySelector("#pageNum");

const arr = localStorage.getItem("array");

const parsedArr = JSON.parse(arr);

let count = 0;

let num = 0;
let currentPage = 1;

let maxPage;

if(parsedArr)
{
    maxPage = Math.ceil(parsedArr.length / 10);
}
else
{
    maxPage = 1;

}

pageNum.innerHTML = "Page " + currentPage + " of " + maxPage;
//console.log(parsedArr);
//deletes the user's favorite list from the local storage
delButton.onclick = () => {
    delButton.className += " is-loading";
    setTimeout(
        function() {
            window.localStorage.removeItem("array");
            if(parsedArr)
            {
                parsedArr.length = 0;
            }
            favList.innerHTML = "";
            response.innerHTML = "You have deleted your favorites list";
            delButton.className = "button is-rounded is-warning mx";

        }, 200);
    //console.log("button clicked");

  
}
//views the next ten favorite pokemon in the array
nextButton.onclick = () => {
    if(parsedArr)
    {
        if(num < parsedArr.length - 10)
        {
            //console.log("button clicked");
            count = 0;
            num = num + 10;
            favList.innerHTML = "";
            showPokemon(parsedArr, num);
            currentPage++;
            pageNum.innerHTML = "Page " + currentPage  + " of " + maxPage;
            //console.log(num + " and " + parsedArr.length);
            
        }
    }
   
}
//views the previous 10 favorite pokemon
prevButton.onclick = () => {
    if(num > 0)
    {
        //console.log("button clicked");
        count = 0;
        num = num - 10;
        favList.innerHTML = "";
        showPokemon(parsedArr, num);
        currentPage--;
        pageNum.innerHTML = "Page " + currentPage  + " of " + maxPage;
        //console.log(num + " and " + parsedArr.length);
    }
}

//creates 
showPokemon(parsedArr, num);
//creates cards of each pokemon in the user's favorites list
function showPokemon(array, num)
{
    //displays if the user's list does not have any Pokemon
    if(parsedArr == null)
    {
        response.innerHTML = "You have not favorited any Pokemon yet";
    }
    if(parsedArr != null)
    {
        for(let i = num; i < parsedArr.length; i++)
        {
            //displays only 10 cards at once
            if(count == 10)
            {
                break;
            }
            //creates the card
            let pkCard = document.createElement("my-card");
            pkCard.dataset.name = parsedArr[i].name;
            pkCard.dataset.image = parsedArr[i].img;
            pkCard.dataset.types = parsedArr[i].types;
            pkCard.dataset.stats = parsedArr[i].stats;

            //console.log(pkCard.dataset);
            document.querySelector(".fav-list").appendChild(pkCard);
            count++;
        }
    }
}