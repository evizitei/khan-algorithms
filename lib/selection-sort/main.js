
//Create a canvas wrapper,
//  all view logic will happen in this
//  object, and it's based on an origin point
//  so it can be moved anywhere on the canvas
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
//**********************END SelectionSortCanvas***************************



//Build a wrapper object for handling the sort logic
var SelectionSort = function(callback){
  this.sortStepCallback = callback;
};

SelectionSort.prototype.swap = function(array, firstIndex, secondIndex){
  var temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

SelectionSort.prototype.indexOfMinimum = function(array, startIndex){
  var minValue = array[startIndex];
  var minIndex = startIndex;

  for(var i = minIndex + 1; i < array.length; i++) {
    if(array[i] < minValue) {
      minIndex = i;
      minValue = array[i];
    }
  }
  return minIndex;
};

SelectionSort.prototype.execute = function(array) {
  this.sortStepCallback.call(this, array, -1, -1);
  for(var i = 0; i < array.length; i++){
    var minIndex = this.indexOfMinimum(array, i);
    if(minIndex !== i){
      this.swap(array, i, minIndex);
    }
    this.sortStepCallback.call(this, array, minIndex, i);
  }
  return array;
};
//**********************END SelectionSort***************************

//Actual program for combining the two modules
var buildQuadrantOrigin = function(index){
  var quadrantOffset = 200;
  if(index === 1){
    return {x: 0, y: 0};
  }else if(index === 2){
    return {x: quadrantOffset, y: 0};
  }else if(index === 3){
    return {x: quadrantOffset, y: quadrantOffset};
  }else if(index === 4){
    return {x: 0, y: quadrantOffset};
  }
};

var sortInQuadrant = function(quadrantIndex, array){
  var quadrantCoordinates = buildQuadrantOrigin(quadrantIndex);
  var sortingCanvas = new SelectionSortCanvas(quadrantCoordinates.x, quadrantCoordinates.y);
  var sortingObject = new SelectionSort(function(arrayStep, swappedFrom, swappedTo){
    sortingCanvas.display(arrayStep, swappedFrom, swappedTo);
  });
  sortingObject.execute(array);
};

sortInQuadrant(1, [2, 1, 4]);
sortInQuadrant(2, [4, 2, 1]);
sortInQuadrant(3, [3, 3, 2]);
sortInQuadrant(4, [1, 3, 2]);
