// TODO #import-html: use ES default imports to import game.html as template
import template from "../views/game.html";
import { Component } from "./component";
var CARD_TEMPLATE = ""
  .concat('<main class="card-cmp">')
  .concat('  <div class="card-wrapper">')
  .concat('    <img class="card front-face" alt="card" />')
  .concat('    <img class="card back-face" alt="card" />')
  .concat("  </div>")
  .concat("</main>");

// TODO #export-functions: remove the IIFE

  var environment = {
    api: {
      host: "http://localhost:8081",
    },
  };

  // TODO #export-functions: export function GameComponent
  import { parseUrl } from "./utils";
  // TODO #class: use the ES6 class keyword
  // TODO #extends: extend Component
  /* class GameComponent constructor */
  export class GameComponent extends Component{
    constructor(name) {
    // TODO #extends: call super(template)
    super(template);
    // gather parameters from URL
    var params = parseUrl();

    // TODO #import-html: assign template to this.template
    this.template = template;
    // save player name & game ize
    this._name = params.name;
    this._size = parseInt(params.size) || 9;
    this._flippedCard = null;
    this._matchedPairs = 0;
  }

  // TODO #export-functions: remove this line
  // put component in global scope, to be runnable right from the HTML.
  // enlever : window.GameComponent = GameComponent;

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.init */
   init() {
    // fetch the cards configuration from the server
    this.fetchConfig(
      // TODO #arrow-function: use arrow function instead.
      function (config) {
        this._config = config;
        this._boardElement = document.querySelector(".cards");

        // create cards out of the config
        this._cards = [];
        // TODO #functional-programming: use Array.map() instead.
        for (var i in this._config.ids) {
          this._cards[i] = new CardComponent(this._config.ids[i]);
        }

        // TODO #functional-programming: use Array.forEach() instead.
        // TODO #let-const: replace var with let.
        for (var i in this._cards) {
          var card = this._cards[i];

          // TODO #let-const: extract function _appendCard (ie: copy its body here and remove the function)
          this._appendCard(card);
        }

        this.start();
      }.bind(this)
    );
  };
  // TODO #class: turn function into a method of GameComponent

  /* method GameComponent._appendCard */
   _appendCard(card) {
    this._boardElement.appendChild(card.getElement());

    card.getElement().addEventListener(
      "click",
      // TODO #arrow-function: use arrow function instead.
      function () {
        this._flipCard(card);
      }.bind(this)
    );
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.start */
  start() {
    this._startTime = Date.now();
    var seconds = 0;
    // TODO #template-literals:  use template literals (backquotes)
    document.querySelector("nav .navbar-title").textContent =
      "Player: " + this._name + ". Elapsed time: " + seconds++;

    this._timer = setInterval(
      // TODO #arrow-function: use arrow function instead.
      function () {
        // TODO #template-literals:  use template literals (backquotes)
        document.querySelector("nav .navbar-title").textContent =
          "Player: " + this._name + ". Elapsed time: " + seconds++;
      }.bind(this),
      1000
    );
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.fetchConfig */
  fetchConfig(cb) {
    var xhr =
      typeof XMLHttpRequest != "undefined"
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");

    // TODO #template-literals:  use template literals (backquotes)
    xhr.open("get", environment.api.host + "/board?size=" + this._size, true);

    // TODO #arrow-function: use arrow function instead.
    xhr.onreadystatechange = function () {
      var status;
      var data;
      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) {
        // `DONE`
        status = xhr.status;
        if (status == 200) {
          data = JSON.parse(xhr.responseText);
          cb(data);
        } else {
          throw new Error(status);
        }
      }
    };
    xhr.send();
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent.goToScore */
  goToScore() {
    var timeElapsedInSeconds = Math.floor(
      (Date.now() - this._startTime) / 1000
    );
    clearInterval(this._timer);

    setTimeout(
      // TODO #arrow-function: use arrow function instead.
      function () {
        // TODO #spa: replace with './#score'
        var scorePage = "./#score";
        // TODO #template-literals:  use template literals (backquotes)
        window.location =
          scorePage +
          "?name=" +
          this._name +
          "&size=" +
          this._size +
          "&time=" +
          timeElapsedInSeconds;
      }.bind(this),
      750
    );
  };

  // TODO #class: turn function into a method of GameComponent
  /* method GameComponent._flipCard */
   _flipCard(card) {
    if (this._busy) {
      return;
    }

    if (card.flipped) {
      return;
    }

    // flip the card
    card.flip();

    // if flipped first card of the pair
    if (!this._flippedCard) {
      // keep this card flipped and wait for the second card of the pair
      this._flippedCard = card;
    } else {
      // second card of the pair flipped...

      // if cards are the same
      if (card.equals(this._flippedCard)) {
        this._flippedCard.matched = true;
        card.matched = true;
        this._matchedPairs += 1;

        // reset flipped card for the next turn.
        this._flippedCard = null;

        if (this._matchedPairs === this._size) {
          this.goToScore();
        }
      } else {
        this._busy = true;

        // cards did not match
        // wait a short amount of time before hiding both cards
        setTimeout(
          // TODO #arrow-function: use arrow function instead.
          function () {
            // hide the cards
            this._flippedCard.flip();
            card.flip();
            this._busy = false;

            // reset flipped card for the next turn.
            this._flippedCard = null;
          }.bind(this),
          500
        );
      }
    }
  };
}

  // TODO #card-component: Change images location to /app/components/game/card/assets/***.png
  // TODO #import-assets: use ES default import to import images.
import back from "../../assets/cards/back.png";
import card0 from "../../assets/cards/card-0.png";
import card1 from "../../assets/cards/card-1.png";
import card2 from "../../assets/cards/card-2.png";
import card3 from "../../assets/cards/card-3.png";
import card4 from "../../assets/cards/card-4.png";
import card5 from "../../assets/cards/card-5.png";
import card6 from "../../assets/cards/card-6.png";
import card7 from "../../assets/cards/card-7.png";
import card8 from "../../assets/cards/card-8.png";
import card9 from "../../assets/cards/card-9.png";

  var CARDS_IMAGE = [
    back,
    card0,
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
  ];  

  // TODO #class: use the ES6 class keyword
  // TODO #extends: extends Component
  /* class CardComponent constructor */
  class CardComponent extends Component{
    constructor(id) {
    // TODO #extends: call super(CARD_TEMPLATE)
    super(CARD_TEMPLATE);
    // is this card flipped?
    this._flipped = false;
    this.template = CARD_TEMPLATE;

    // has the matching card has been discovered already?
    this.matched = false;

    this._elt = document.createElement("div");
    this._elt.innerHTML = this.template;
    this._elt = this._elt.firstElementChild;
    this._id = id;

    this._imageElt = this.getElement().querySelector(".card-wrapper");
    this._imageElt.querySelector("img.front-face").src =
      CARDS_IMAGE[this._id + 1];
    this._imageElt.querySelector("img.back-face").src = CARDS_IMAGE[0];
  }

  /* method CardComponent.getElement */
 getElement() {
    return this._elt;
  };

  // TODO #class: turn function into a method of CardComponent
  /* method CardComponent.flip */
  flip() {
    this._imageElt.classList.toggle("flip");
    this._flipped = !this._flipped;
  };

  // TODO #class: turn function into a method of CardComponent
  /* method CardComponent.equals */
  equals(card) {
    return card._id === this._id;
  };

  // TODO #class: turn function into a method of CardComponent
  /* CardComponent.get flipped() */
 
      get flipped () {
        return this._flipped;
      }
    }

  

