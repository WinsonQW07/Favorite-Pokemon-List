const template = document.createElement("template");
template.innerHTML = `
<style>
footer{
    color: white;
    background-color: hsl(0,0%,16%);
    padding: .5rem;
  }

h2
{
    padding-left: .5rem;
}
  
</style>

<footer>
<h2>2021 Winson Weng</h2>
</footer>
`;

class SWFooter extends HTMLElement{
    constructor(){
        super();

    //1 - attach a shadow DOM tree to this instance - this creates .shadowRoot for us
    this.attachShadow({mode: "open"});

    //2 - clone "template" and append it
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.h2 = this.shadowRoot.querySelector("h2");
    }
} // end class

customElements.define('my-footer', SWFooter);