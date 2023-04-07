"use strict";

class Field {
  constructor() {
    this.step = 0; //step counter
    this.parent = document.createElement("div"); //main parent div
    this.setParentStyle();
  }
  get Parent() {
    return this.parent;
  }

  setParentStyle() {
    this.parent.style.cssText = `
            background : #1e4952;
            border-radius:10px;
            max-width : 640px;
            min-width : 640px;
            display:flex;
            flex-wrap: wrap;
            padding:5px;
            
        `;
    this.parent.setAttribute("id", "field");
    this.addToPage("body", this.parent);
  }
  //change step (player is changing)
  changeStep() {
    return this.step++;
  }
  //add element to page
  addToPage(parent, element) {
    document.querySelector(parent).append(element);
  }
  //check winner after step
  checkWinners() {
    const currentField = document.querySelectorAll(`.field_item`);
    let rA = [];
    let message = "";
    currentField.forEach((item) => {
      if (item.classList.contains("tac")) {
        rA.push("x");
      } else if (item.classList.contains("tic")) {
        rA.push("o");
      } else {
        rA.push("");
      }
    });

    if (
      (rA[0] == rA[1] && rA[0] == rA[2] && rA[0] != "") ||
      (rA[0] == rA[3] && rA[0] == rA[6] && rA[0] != "") ||
      (rA[0] == rA[4] && rA[0] == rA[8] && rA[0] != "") ||
      (rA[2] == rA[4] && rA[2] == rA[6] && rA[2] != "") ||
      (rA[2] == rA[5] && rA[2] == rA[8] && rA[2] != "") ||
      (rA[8] == rA[7] && rA[8] == rA[6] && rA[8] != "") ||
      (rA[1] == rA[4] && rA[1] == rA[7] && rA[1] != "") ||
      (rA[3] == rA[4] && rA[3] == rA[5] && rA[3] != "")
    ) {
      this.stopFieldClicks();

      message = `The winner is ${
        this.step % 2 === 0 ? "Player 2" : "Player 1"
      }`;
    } else if (this.step === 9) {
      this.stopFieldClicks();
      message = `No winners!`;
    } else {
      message = `Game continues... Next step ${
        this.step % 2 === 0 ? "Player 1" : "Player 2"
      }`;
    }

    this.gameOver(message);
  }
    //stop all fiel click events
  stopFieldClicks() {
    this.parent.addEventListener(
      "click",
      function (event) {
        event.stopImmediatePropagation();
      },
      true
    );
  }
  //Game over
  gameOver(message) {
    result.innerHTML = message;
    header.append(result);
  }
}
class Child extends Field {
  constructor() {
    super();

    this.child = [
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
      document.createElement("div"),
    ];
    this.setChildStyle();
  }
  setChildStyle() {
    for (let i = 0; i < this.child.length; i++) {
      this.child[i].style.cssText = `
            background : #00ffd0;
            width : 200px;
            height : 200px;
            border-radius:10px;
            margin:5px;
            padding:5px;
            display:flex;
            align-items: center;
            justify-content: center;
            cursor:pointer;

        `;
      this.child[i].setAttribute("class", "field_item");
      this.child[i].setAttribute("id", `field_item_${i}`);
      this.childClick(this.child[i]);
      this.addToPage(`#${super.Parent.getAttribute("id")}`, this.child[i]);
    }
  }
  //Click on field child
  childClick(child) {
    child.addEventListener(
      "click",
      () => {
        if (super.changeStep() % 2 === 0) {
          child.append(this.createTac());
          child.classList.add("tac");
        } else {
          child.append(this.createTic());
          child.classList.add("tic");
        }
        super.checkWinners();
      },
      { once: true }
    );
  }
  //Create tac
  createTac() {
    const tac = document.createElement("div");
    tac.style.cssText = `
            width : 100%;
            height : 100%;
            display:flex;
            align-items: center;
            justify-content: center;
            position:relative;
        `;
    const lineLeft = document.createElement("span");
    lineLeft.style.cssText = `
            background : #6772bd;
            width : 200px;
            height : 20px;
            position:absolute;
            left:0px;
            border-radius:10px;
            transform: rotate(45deg);
        `;
    const lineRight = document.createElement("span");
    lineRight.style.cssText = `
            background : #6772bd;
            width : 200px;
            height : 20px;
            position:absolute;
            left:0px;
            border-radius:10px;
            transform: rotate(-45deg);
        `;
    tac.append(lineLeft);
    tac.append(lineRight);

    return tac;
  }
  //Create tic
  createTic() {
    const tic = document.createElement("div");
    tic.style.cssText = `
            background : #6772bd;
            width : 140px;
            height : 140px;
            border-radius:50%;
            display:flex;
            align-items: center;
            justify-content: center;
        `;
    const ticEmpty = document.createElement("div");
    ticEmpty.style.cssText = `
            background : #00ffd0;
            width : 100px;
            height : 100px;
            border-radius:50%;
        `;
    tic.append(ticEmpty);
    return tic;
  }
}
//Header with button and result div
const styleBox = document.createElement("style");
styleBox.innerHTML = `
* {
    box-sizing: border-box;
}
`;
document.head.append(styleBox);
const header = document.createElement("div");
header.style.display = "flex";
const startGame = document.createElement("button");
startGame.innerText = "Start game";
startGame.style.cssText = `
            background : #6772bd;
            width : 200px;
            height : 80px;
            border-radius:5px;
            font-size:32px;
            color:#5addb3;
            cursor:pointer;
            margin-bottom:10px;
        `;
startGame.addEventListener("click", () => {
  if (document.querySelector("#field")) {
    document.querySelector("#field").remove();
  }
  result.innerHTML = "New game... Next step Player 1";
  new Child();
});

const result = document.createElement("div");
result.style.cssText = `
            font-size:32px;
            color:#194a3a;
            margin-bottom:10px;
            display:flex;
            align-items: center;
            justify-content: center;
            padding:10px;
        `;

document.body.append(header);
header.append(startGame);
header.append(result);
