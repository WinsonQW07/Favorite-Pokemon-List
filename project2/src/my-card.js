const template = document.createElement("template");
template.innerHTML = `
<style>
div{
    height: 680px;
    width: 245px;
    border: 2px solid black;
    padding: .5rem;
    background: linear-gradient(to bottom right, #FFFFFF, #C0C0C0, #FFFFFF);
    font-size: .7rem;
    position: relative;
    margin-bottom: 2rem;
}
  
h2{
    font-size: 1.2rem;
    font-family: 'pokemon_classicregular';
    letter-spacing: .67px;
    line-height: 1.2;
    margin-top: 0;
    color: white;
    text-transform: capitalize;
    text-align: center;
    background: linear-gradient(to right, #4D4D4D, #000000, #4D4D4D);
    padding: 4px;
}
  
img{
    width: 200px;
    height: 200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 30px 0
}

button {
    border-radius: 2px;
    padding: 2px;
    position: absolute;
    top: 10px;
    right: 8px;
    opacity: 0.5;
    background-color: #FF0000;
}

button:hover {
    opacity: 1;
    font-size: 16px;
}

p{
    font-size: .9rem;
    font-family: 'pokemon_classicregular';
    color: white;
    text-transform: capitalize;
    text-align: center;
    background: linear-gradient(to right, #4D4D4D, #000000, #4D4D4D);
    padding: 2px;
}

#stats
{
    text-align: left;
    padding: 5px;
    padding-right: 12px;
}

#types
{
    font-size: .7rem;
    padding: 5px;
}
</style>

<div>
    <h2></h2>
    <p id = "types">Types: </p>
    <button>X</button>
    <img alt="pokeArt">
    <p id = "stats">Stats: </p>

</div>
`;
const arr = localStorage.getItem("array");

const parsedArr = JSON.parse(arr);

class PKCard extends HTMLElement{
    constructor(){
        super();

    //1 - attach a shadow DOM tree to this instance - this creates .shadowRoot for us
    this.attachShadow({mode: "open"});

    //2 - clone "template" and append it
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.h2 = this.shadowRoot.querySelector("h2");
    this.img = this.shadowRoot.querySelector("img");

    this.p1 = this.shadowRoot.querySelector("#types");
    this.p2 = this.shadowRoot.querySelector("#stats")

    this.button = this.shadowRoot.querySelector("button");
    }

    connectedCallback(){
        //this.button.onclick = () => this.remove();

        this.button.onclick = () => {
            //console.log(this.h2.innerHTML);
            for(let i = 0; i < parsedArr.length; i++)
            {
                if(parsedArr[i].name == this.h2.innerHTML)
                {
                   // console.log("FOUND");
                   //removes the specified card
                    parsedArr.splice(i, 1);
                   // console.log(parsedArr);

                    const expArray = JSON.stringify(parsedArr);
                    localStorage.setItem("array", expArray);
                }
            }
            this.remove();
          }
        this.render();
    }

    disconnectedCallback(){
        this.button.onclick = null;
    }

    render(){
        //grab the attribute values and assign a value if necessary
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...pokemon name...</i>";
        const imageUrl = this.getAttribute('data-image') ? this.getAttribute('data-image') : "https://th.bing.com/th/id/R.ef87b2e921e4c102a3ae1eaf3b645504?rik=OoXJRYZQ9mZJ5g&riu=http%3a%2f%2frunean.com%2fwp-runsoftwareblog%2fwp-content%2fuploads%2f2013%2f07%2fquestion-mark-320x320.png&ehk=wDEH0i789eDYDp5mnb3ghMTvARlS2NWssq6CDOEIPcE%3d&risl=&pid=ImgRaw&r=0";
        const types = this.getAttribute('data-types') ? this.getAttribute('data-types') : "<i>Unknown</i>";
        const stats = this.getAttribute('data-stats') ? this.getAttribute('data-stats') : "<i>Unknown</i>";

        const statArr = stats.split(",");
        
        this.h2.innerHTML = `${name}`;
        this.img.src = imageUrl;

        this.p1.innerHTML = `Type: ${types}`;
        this.p2.innerHTML = `Stats:`;

        for(let i = 0; i < statArr.length; i++)
        {
            const obj = statArr[i];
            this.p2.innerHTML += `<ol>${obj}</ol>`;
        }
    }
} //class

customElements.define('my-card', PKCard);