//  *dependant on ProcessingJS*

var SelectionSortCanvas = function(originX, originY){
  this.x = originX;
  this.y = originY;
  this.currentRow = 0;
  this.cellWidth = 25;
  this.cellHeight = 40;
  this.leftMargin = 10;
  this.topMargin = 30;
};

SelectionSortCanvas.prototype.drawSwapLine = function(swappedFromIndex, swappedToIndex){
  var x1 = ((swappedFromIndex * this.cellWidth) + this.leftMargin + 4) + this.x;
  var x2 = ((swappedToIndex * this.cellWidth) + this.leftMargin + 4) + this.x;
  var y1 = (((this.currentRow - 1) * this.cellHeight) + this.topMargin + 4) + this.y;
  var y2 = ((this.currentRow * this.cellHeight) + this.topMargin - 12) + this.y;
  line(x1, y1, x2, y2);
};

SelectionSortCanvas.prototype.display = function(array, swappedFromIndex, swappedToIndex){
  textFont(createFont("monospace"), 12);
  fill(0, 0, 0);
  var xPos;
  var yPos = this.topMargin + (this.currentRow * this.cellHeight) + this.y;
  for(var i = 0; i < array.length; i++){
    xPos = this.leftMargin + (i * this.cellWidth) + this.x;
    text(array[i], xPos, yPos);
  }
  if(swappedFromIndex > -1 && swappedToIndex > -1){
    this.drawSwapLine(swappedFromIndex, swappedToIndex);
  }
  this.currentRow += 1;
};
