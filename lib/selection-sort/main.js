//Dependent on having loaded selection_sort.js and selection_sort_canvas.js
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
