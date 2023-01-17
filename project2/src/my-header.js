const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

<nav class="navbar is-dark">
<!-- logo / brand -->
<img src="img/ultraBall.png" alt="ultra ball logo"  style="max-height: 70px" class="py-2 px-4">
<h1 class="is-size-2 px-2">Favorite Pokemon List</h1>

<div class="navbar-grand">

  <a class="navbar-burger" id="burger">
    <span></span>
    <span></span>
    <span></span>
  </a>
</div>

<div class="navbar-menu" id="nav-links">
  <div class="navbar-end">
    <a href="about.html" id="about" class="navbar-item">Home</a>
    <a href="app.html" id="app" class="navbar-item">App</a>
    <a href="favorites.html" id="fav" class="navbar-item">Favorites</a>
    <a href="community.html" id="comm" class="navbar-item">Community</a>
    <a href="sources.html" id="source" class="navbar-item">Documentation</a>
  </div>
</div>
</nav>

<style>

h1 {
  font-family: 'pokemon_solidnormal';
  color: #FAFFCF;
  text-shadow:
  -1px -1px 0 #000,
  1px -1px 0 #000,
  -1px 1px 0 #000,
  1px 1px 0 #000;
  padding: 5px;
}

.navbar-item {
    font-family: 'retroicaregular';
}

.current {
  color: red;
}

</style>
`;

class SWHeader extends HTMLElement{
    constructor(){
        super();

    //1 - attach a shadow DOM tree to this instance - this creates .shadowRoot for us
    this.attachShadow({mode: "open"});

    //2 - clone "template" and append it
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.h1 = this.shadowRoot.querySelector("h1");
    this.span = this.shadowRoot.querySelector("span");
    
    this.burger = this.shadowRoot.querySelector("#burger");
    this.nav = this.shadowRoot.querySelector("#nav-links")

    this.about = this.shadowRoot.querySelector("#about")
    this.app = this.shadowRoot.querySelector("#app")
    this.fav = this.shadowRoot.querySelector("#fav")
    this.comm = this.shadowRoot.querySelector("#comm");
    this.sources = this.shadowRoot.querySelector("#source")

    this.end = this.shadowRoot.querySelector(".navbar-end");
    }

    connectedCallback(){
      //mobile menu
      this.burger.onclick = () => {
        this.nav.classList.toggle("is-active");
    };

    let href = window.location.href;
    // //highlights the current page
    for(let i = 0; i < this.end.childElementCount; i++)
    {
      let pageName = "#" + this.end.children[i].id;
      if(href.includes(this.end.children[i].id))
      {
        let page = this.shadowRoot.querySelector(pageName);
        //console.log(page);
        this.activePage(page);
      }
    }
      //this.render();
    }

    // disconnectedCallback(){
    //     this.onclick = null;
    // }

    //highlights and bolds the active page
    activePage(ref)
    {
      ref.innerHTML = ref.innerHTML.bold();
      ref.innerHTML = ref.innerHTML.fontcolor("#FF3860");
    }

    // render(){
    //     //grab the attribute values, and assign a default value if neccessary
    //     const title = this.dataset.title ? this.dataset.title : "Favorite Pokemon";
    //     this.h1.innerHTML = `${title}`;
    // }

} // end class

customElements.define('my-header', SWHeader);
