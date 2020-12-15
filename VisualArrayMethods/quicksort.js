
var quickSortWrapper = async function(doc){
    if(!this.valuesAndPillarsContainer.length){
        alert(this.NoArrayAlertMessage);
        return;
    }
    this.disableNavButtons(doc);
    var values = this.valuesAndPillarsContainer.map( (element) => element.value );
    var left = 0;
    var right = values.length - 1;
    await this.quickSortLomuto(this.valuesAndPillarsContainer, left, right);
    this.enableNavButtons(doc);
    this.resetSpeedControls(doc);
}

var quickSortWrapperHoare = async function(doc){
    if(!this.valuesAndPillarsContainer.length){
        alert(this.NoArrayAlertMessage);
        return;
    }
    this.disableNavButtons(doc);
    var values = this.valuesAndPillarsContainer.map( (element) => element.value );
    var left = 0;
    var right = values.length - 1;
    await this.quickSortHoare(this.valuesAndPillarsContainer, left, right);
    this.enableNavButtons(doc);
}

var quickSortLomuto = async function(items, left, right) {
    if(left < right) {
        var index = await this.partitionLomuto(items, left, right); //index returned from partition

        await this.quickSortLomuto(items, left, index - 1);
        for(var i = left; i <= index - 1; i++){
            if( !this.isGreen(this.valuesAndPillarsContainer[i].pillar) ){
                this.makeGreen(this.valuesAndPillarsContainer[i].pillar);
                await this.delay();
            }
        }
    

        await this.quickSortLomuto(items, index + 1, right);            
        for(var i = index + 1; i <= right; i++){
            if( !this.isGreen(this.valuesAndPillarsContainer[i].pillar) ){
                this.makeGreen(this.valuesAndPillarsContainer[i].pillar);
                await this.delay();
            }
        }
        
        return items;
    }
    

}

//quicksort algorithm from https://www.guru99.com/quicksort-in-javascript.html
var quickSortHoare = async function(items, left, right) {
    var index;
    if (items.length > 1) {
        index = await this.partitionHoare(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            await this.quickSortHoare(items, left, index - 1);
            for(var i = left; i <= index - 1; i++){
                if( !this.isGreen(this.valuesAndPillarsContainer[i].pillar) ){
                    this.makeGreen(this.valuesAndPillarsContainer[i].pillar);
                    await this.delay();
                }
            }
        }
        if (index < right) { //more elements on the right side of the pivot
            await this.quickSortHoare(items, index, right);
            for(var i = index; i <= right; i++){
                if( !this.isGreen(this.valuesAndPillarsContainer[i].pillar) ){
                    this.makeGreen(this.valuesAndPillarsContainer[i].pillar);
                    await this.delay();
                }
            }           
        }
    }
    return items;
}



var partitionLomuto = async function(items, left, right) {
    // Lomuto algorithm always uses the last element, items[right], for the pivot.
    let pivotIndex = right;
    let pivot = items[right].value;
    let i = left;
    this.highlightPivot(this.valuesAndPillarsContainer[pivotIndex].pillar);
    /*The logic under Lomuto is, we start from the leftmost element and keep track of index of smaller (or equal to) elements as j. While traversing, if we find a smaller element, we swap current element with arr[j]. Otherwise we ignore current element.*/
    for (var j = left; j < right; j++) {

        if(i === j){
            await this.highlightBothInTheSamePosForOneInterval(this.valuesAndPillarsContainer[j].pillar);
        }else{
            await this.highlightIandJForOneInterval(this.valuesAndPillarsContainer[i].pillar, this.valuesAndPillarsContainer[j].pillar);
        }
        if (items[j].value <= pivot) {
            this.swapPillars(this.valuesAndPillarsContainer[i].pillar, this.valuesAndPillarsContainer[j].pillar);
            this.quicksortSwap(items, i, j);
            await this.delay();
            i++;
        }
    }
    this.makeDefaultColor(this.valuesAndPillarsContainer[pivotIndex].pillar);
    this.swapPillars(this.valuesAndPillarsContainer[i].pillar, this.valuesAndPillarsContainer[j].pillar);
    this.quicksortSwap(items, i, j);
    this.makeGreen(this.valuesAndPillarsContainer[i].pillar);
    return i;
}


var partitionHoare = async function(items, left, right) {
    var pivotIndex   = Math.floor((right + left) / 2); //middle element
    var pivot = items[pivotIndex].value;
    var i = left; //left pointer
    var j = right; //right pointer

    var previousPivotColor = this.highlightPivot(this.valuesAndPillarsContainer[pivotIndex].pillar);

    while (i <= j) {
        await this.highlightIandJForOneInterval(this.valuesAndPillarsContainer[i].pillar, this.valuesAndPillarsContainer[j].pillar);
        while (items[i].value < pivot) {
            i++;
            await this.highlightIandJForOneInterval(this.valuesAndPillarsContainer[i].pillar, this.valuesAndPillarsContainer[j].pillar);
        }
        while (items[j].value > pivot) {
            j--;
            await this.highlightIandJForOneInterval(this.valuesAndPillarsContainer[i].pillar, this.valuesAndPillarsContainer[j].pillar);
        }
        if (i <= j) {
            if(i === pivotIndex || j === pivotIndex){
                previousPivotColor = this.makeAnyColor(this.valuesAndPillarsContainer[pivotIndex].pillar, previousPivotColor);
                pivotIndex = ((i === pivotIndex) ? j : i);
                previousPivotColor = this.highlightPivot(this.valuesAndPillarsContainer[pivotIndex].pillar);
                await this.delay();
            }
            this.quicksortSwap(items, i, j);
            this.swapPillars(this.valuesAndPillarsContainer[i].pillar, this.valuesAndPillarsContainer[j].pillar);
            i++;
            j--;
        }
    }

    this.makeAnyColor(this.valuesAndPillarsContainer[pivotIndex].pillar, previousPivotColor);

    return i;
}

var quicksortSwap = function(items, a, b){
    var temp = items[a].value;
    items[a].value = items[b].value;
    items[b].value = temp;
}

export {quickSortWrapper, quickSortWrapperHoare, quickSortLomuto, quickSortHoare, partitionLomuto, partitionHoare, quicksortSwap}