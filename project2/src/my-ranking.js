const template = document.createElement("template");
template.innerHTML = `
<style>
div{
    height: 380px;
    width: 245px;
    border: 5px solid black;
    border-radius: 20px;
    padding: .5rem;
    background: linear-gradient(to bottom right, #FFF, #FFDF32, #FFF);
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

p{
    font-size: .9rem;
    font-family: 'pokemon_classicregular';
    color: white;
    text-transform: capitalize;
    text-align: center;
    background: linear-gradient(to right, #4D4D4D, #000000, #4D4D4D);
    padding: 2px;
}

#likes
{
    padding: 5px;
}

</style>

<div>
    <h2></h2>
    <img alt="pokeArt">
    <p id = "likes">Favorited Times: </p>

</div>
`;

class PKRanking extends HTMLElement{
    constructor(){
        super();

    //1 - attach a shadow DOM tree to this instance - this creates .shadowRoot for us
    this.attachShadow({mode: "open"});

    //2 - clone "template" and append it
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.h2 = this.shadowRoot.querySelector("h2");
    this.img = this.shadowRoot.querySelector("img");

    this.p1 = this.shadowRoot.querySelector("#likes");
    }

    connectedCallback(){
        this.render();
    }

    // disconnectedCallback(){

    // }

    render(){
        //grab the attribute values and assign a value if necessary
        const name = this.getAttribute('data-name') ? this.getAttribute('data-name') : "<i>...pokemon name...</i>";
        const imageUrl = this.getAttribute('data-image') ? this.getAttribute('data-image') : "https://th.bing.com/th/id/R.ef87b2e921e4c102a3ae1eaf3b645504?rik=OoXJRYZQ9mZJ5g&riu=http%3a%2f%2frunean.com%2fwp-runsoftwareblog%2fwp-content%2fuploads%2f2013%2f07%2fquestion-mark-320x320.png&ehk=wDEH0i789eDYDp5mnb3ghMTvARlS2NWssq6CDOEIPcE%3d&risl=&pid=ImgRaw&r=0";
        const likes = this.getAttribute('data-likes') ? this.getAttribute('data-likes') : "Unknown";
        const rank = this.getAttribute('data-rank') ? this.getAttribute('data-rank') : "Unknown";
        
        this.h2.innerHTML = `${"#" + rank + ". " + name}`;
        this.img.src = imageUrl;
        this.p1.innerHTML = `Favorited Times: ${likes}`;
    }
} //class

customElements.define('my-ranking', PKRanking);