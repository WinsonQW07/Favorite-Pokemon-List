
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAJ3whwF_sB_Cdxx_6zbPC78rsFAwgczCw",
    authDomain: "fav-pokemon-d65d4.firebaseapp.com",
    projectId: "fav-pokemon-d65d4",
    storageBucket: "fav-pokemon-d65d4.appspot.com",
    messagingSenderId: "1049287505628",
    appId: "1:1049287505628:web:be7d81a94c6f4e34082619"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import { getDatabase, ref, set, push, onValue, increment } from  "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

  console.log(app);

  //writes the data to the firebase
  export function writeFavoriteData(name, url) {
    const db = getDatabase();
    const favoritesRef = ref(db, 'favorites/' + name);

    set(favoritesRef, {
        name,
        url,
        favorited: increment(1)
    });
  };

  const db = getDatabase();
  const favoritesRef = ref(db, 'favorites');

  let commList = document.querySelector(".comm-list");
  let response = document.querySelector("#response");

  const commArr = [];

  //updates the list
  function favChanged(snapshot){
    commArr.length = 0;

    snapshot.forEach(favorite => {
      //const favKey = favorite.key;
      const favData = favorite.val();
      //creates an object for each pokemon
     let pokemon = {
        "name": favData.name,
        "favorited": favData.favorited,
        "url": favData.url
      }

      commArr.push(pokemon);
    });

    //sorts the array by number and in reverse order
    commArr.sort(function(a, b){return a.favorited - b.favorited});
    commArr.reverse();

    showPokemon(commArr);
  }

  //creates the images of the pokemon
  function showPokemon(array)
  {
    try{
      commList.innerHTML = "";
      response.innerHTML = "";
    }
    catch{
      console.log("");
    }

    if(array == null)
    {
        response.innerHTML = "There are no Pokemon favorited";
    }
    if(array != null)
    {
      //displays the top 10 pokemon
      for(let i = 0; i < 10; i++)
      {
        //creates the images
        let pkRanking = document.createElement("my-ranking");
        //console.log(pkRanking);
        pkRanking.dataset.name = array[i].name;
        pkRanking.dataset.image = array[i].url;
        pkRanking.dataset.likes = array[i].favorited;
        pkRanking.dataset.rank = (i + 1);
        //console.log(pkRanking.dataset);
        try
        {
          commList.appendChild(pkRanking);
        }
        catch{
          console.log("");
        }
      }
    }
  }
  onValue(favoritesRef,favChanged);