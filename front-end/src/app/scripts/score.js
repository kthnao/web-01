// TODO #import-html: use ES default imports to import game.html as template
import template from "../views/score.html";
import { Component } from "./component";

  // TODO #export-functions: export function ScoreComponent
  import { parseUrl } from "./utils";
  // TODO #class: use the ES6 class keyword
  /* class ScoreComponent constructor */
  export class ScoreComponent extends Component{
    constructor(name) {
    // TODO #extends: call super(template)
    super(template);
    var params = parseUrl();
    // TODO #import-html: assign template to this.template
    this.template = template;
    this.name = params.name;
    this.size = parseInt(params.size);
    this.time = parseInt(params.time);
  }

  // TODO #export-functions: remove this line
  // put component in global scope, to be runnable right from the HTML.
  // remove ? window.ScoreComponent = ScoreComponent;

  // TODO #class: turn function into a method of ScoreComponent
  /* method ScoreComponent.init */
   init() {
    document.getElementById("name").innerText = this.name;
    document.getElementById("size").innerText = this.size;
    document.getElementById("time").innerText = this.time;
  };
}

