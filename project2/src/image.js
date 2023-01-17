let rand = document.querySelector("#randButton");
let images = document.querySelector("#images");
let response = document.querySelector("#response")

let imgArr = [];

addImg(0, "bug");
addImg(1, "dark");
addImg(2, "dragon");
addImg(3, "electric");
addImg(4, "fairy");
addImg(5, "fighting");
addImg(6, "fire");
addImg(7, "flying");
addImg(8, "ghost");
addImg(9, "ground");
addImg(10, "ice");
addImg(11, "normal");
addImg(12, "poison");
addImg(13, "psychic");
addImg(14, "rock");
addImg(15, "steel");
addImg(16, "water");
addImg(17, "grass");

let img = document.createElement('img');
//console.log(imgArr);
//everytime the random button is clicked, a random type image will be created
rand.onclick = () => {
    //console.log("button clicked");
    rand.className += " is-loading";
    response.innerHTML = "Loading";
    images.innerHTML = "";
  
    //creates a loading spinner for the type pictures
    createType("https://cdn.dribbble.com/users/172519/screenshots/3520576/dribbble-spinner-800x600.gif", 700, 700);

    let value = genNum();
   // console.log(value);

   setTimeout(
    function() {
        for(let i = 0; i < imgArr.length; i++)
        {
            if(i == value)
            {
                createType(imgArr[i].source, 700, 700);
               // console.log(img.src);
            }
        }
        rand.className = "button is-rounded is-normal mb-4 is-warning";
    }, 200);
   
}
//default type image
createType("img/normal.jpg", 700, 700);

//creates and adds a type image
function createType(src, w, h)
{
    img.src = src;
    img.alt = "type art"
    img.width = w;
    img.height = h;
    images.appendChild(img);
    response.innerHTML = "";
}
//generates a random number from 0-17
function genNum()
{
    return Math.floor(Math.random() * 18);

}
//adds images to the array
function addImg(value, source)
{
    let typeImg = {
        "value": value,
        "source": "img/" + source + ".jpg"
      }
    imgArr.push(typeImg);
}