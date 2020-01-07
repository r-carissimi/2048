/*
TITLE: 2048 Game in JS - Square
AUTHOR: Federico Falcone (https://github.com/Chitogee)
*/

class Square {

  fontColor = "#FFF";
  fontSize = "50px";
  fontFamily = "Roboto";

  constructor(value, xPos, yPos) {
    this.value = value;
    this.xPos = xPos;
    this.yPos = yPos;
  }

  getSquareColor() {
   for(var i = 0; i < colors.length; i++)
    if(colors[i].value == this.value)
      return colors[i].colorSquare;
    return otherValue;
  }

}
