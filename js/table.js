/*
TITLE: 2048 Game in JS - Table CLass
AUTHOR: Riccardo Carissimi (https://github.com/MrRiky54)
*/
class Table{

  constructor(){
    this.tab =  [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    this.points = 0;
  }

  display(){
    var out = "";

    for(var i = 0;i<this.tab.length;i++){
      for(var j = 0;j<this.tab[0].length;j++){
        out+=this.tab[i][j];
      }
      out+="<br>";
    }

    return out;

  }

  randomEmptySquare(){
	  
	  
	if(!this.isFull()){
		do{
		  var x = Math.floor(Math.random() * 4);
		  var y = Math.floor(Math.random() * 4);
		}while(this.tab[x][y]!=0);
	}else{
		var x = -1;
		var y = -1;
	}

    return [x, y];

  }

  initialize(){

    const startFill = 2;

    this.addBlock(startFill);

  }

  addBlock(fill){

    for(var i = 0; i<fill;i++){
      var pos = this.randomEmptySquare();
	  if(pos[0]!=-1){
		this.tab[pos[0]][pos[1]]=(Math.round(Math.random()) * 2)+2;
	  }
    }

  }

  won(){

    var hasWon = false;

    for(var i = 0; i<this.tab.length;i++){
      for(var j = 0; j<this.tab[0].length;j++){
        if(this.tab[i][j]>=2048){
          hasWon = true;
        }
      }
    }

    return hasWon;

  }

  isFull(){
    var isFull = false;
    var count = 0;

    for(var i = 0; i<this.tab.length;i++){
      for(var j = 0; j<this.tab[0].length;j++){
        if(this.isEmpty(i,j)){
          count++;
        }
      }
    }

    if(count == 0){
      isFull = true;
    }

    return isFull;
  }

  hasCollisions(i, j){

    var collisions = false;

    for(var a = i-1 ; a<i+2 ; a++){
      for(var b = j-1 ; b<j+2 ; b++){
        if(a>=0 && a<this.tab.length && b>=0 && b<this.tab[0].length){
          if((a==i || b==j) && (a!=i || b!=j) && this.tab[a][b]==this.tab[i][j]){
            collisions=true;
          }
        }
      }
    }

    return collisions;

  }

  lost(){

    /*var collisions;
    var i, j;

    i = -1;
    do{
      j = -1;
      i++;
      do{
        j++;
        collisions = this.hasCollisions(i, j);
      }while(j < this.tab[0].length-1 && collisions == false);
    }while(i<this.tab.length-1 && collisions==false);

    return !collisions;*/

    var collisions = false;

    for(var i = 0; i<this.tab.length;i++){
      for(var j = 0; j<this.tab[0].length;j++){
        collisions = this.hasCollisions(i, j);
      }
    }

    if(this.isFull() && !collisions){
      return true;
    }else{
      return false;
    }

  }

  continue(){
    return !(this.won()||this.lost());
  }

  canCollide(x1, y1, x2, y2){

    var collision = false;

    if(this.tab[x1][y1] == this.tab[x2][y2]){
      collision = true;
    }

    return collision;
  }

  collide(x1, y1, x2, y2){
    this.tab[x1][y1] += this.tab[x2][y2];
    this.points += this.tab[x1][y1];
    this.tab[x2][y2] = 0;
  }

  isEmpty(i, j){
    if(this.tab[i][j]==0){
      return true;
    }else{
      return false;
    }
  }

  replaceBlocks(x1, y1, x2, y2){
    var tmp = this.tab[x1][y1];
    this.tab[x1][y1]=this.tab[x2][y2];
    this.tab[x2][y2]=tmp;
  }

  moveBlockUp(i, j){

    do{
      if(this.isEmpty((i-1), j)){
        this.replaceBlocks((i-1), j, i, j);
      }
      i--;
    }while(i>0 && this.isEmpty(i-1, j));

  }

  moveUp(){

    for(var i = 1; i<this.tab.length;i++){
      for(var j = 0; j<this.tab[0].length;j++){

        this.moveBlockUp(i, j);

      }
    }

  }

  collideUp(){

    for(var i = this.tab.length-1; i>0 ;i--){
      for(var j = 0; j<this.tab[0].length;j++){

        if(this.canCollide((i-1), j, i, j)){
          this.collide((i-1), j, i, j);
        }

      }
    }

  }

  up(){
    this.moveUp();
    this.collideUp();
    this.moveUp();
  }

  moveBlockLeft(i, j){

    do{
      if(this.isEmpty(i, (j-1))){
        this.replaceBlocks(i, (j-1), i, j);
      }
      j--;
    }while(j>0 && this.isEmpty(i, (j-1)));

  }

  moveLeft(){

    for(var i = 0; i<this.tab.length;i++){
      for(var j = 1; j<this.tab[0].length;j++){

        this.moveBlockLeft(i, j);

      }
    }

  }

  collideLeft(){

    for(var i = 0; i<this.tab.length;i++){
      for(var j = this.tab[0].length-1; j>0;j--){

        if(this.canCollide(i, (j-1), i, j)){
          this.collide(i, (j-1), i, j);
        }

      }
    }

  }

  left(){
    this.moveLeft();
    this.collideLeft();
    this.moveLeft();
  }

  moveBlockDown(i, j){
    do{
      if(this.isEmpty((i+1), j)){
        this.replaceBlocks((i+1), j, i, j);
      }
      i++;
    }while(i<this.tab.length-1&&this.isEmpty(i+1, j));
  }

  moveDown(){

    for(var i = this.tab.length-2; i>=0 ;i--){
      for(var j = 0; j<this.tab[0].length;j++){

        this.moveBlockDown(i, j);

      }
    }

  }

  collideDown(){

    for(var i = 1; i<this.tab.length;i++){
      for(var j = 0; j<this.tab[0].length;j++){

        if(this.canCollide(i, j, i-1, j)){
          this.collide(i, j, i-1, j);
        }

      }
    }

  }

  down(){
    this.moveDown();
    this.collideDown();
    this.moveDown();
  }

  moveBlockRight(i, j){

    do{
      if(this.isEmpty(i, (j+1))){
        this.replaceBlocks(i, (j+1), i, j);
      }
      j++;
    }while(j<this.tab[0].length && this.isEmpty(i, (j+1)));

  }

  moveRight(){

    for(var i = 0; i<this.tab.length;i++){
      for(var j = this.tab[0].length-2; j>=0;j--){

        this.moveBlockRight(i, j);

      }
    }

  }

  collideRight(){

    for(var i = 0; i<this.tab.length;i++){
      for(var j = 1; j<this.tab[0].length;j++){

        if(this.canCollide(i, j, i, (j-1))){
          this.collide(i, j, i, (j-1));
        }

      }
    }

  }

  right(){
    this.moveRight();
    this.collideRight();
    this.moveRight();
  }

  reset() {
    this.tab =  [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    this.points = 0;
  }

}
