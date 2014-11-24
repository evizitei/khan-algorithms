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
