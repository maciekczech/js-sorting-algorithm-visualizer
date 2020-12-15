var mergeSortWrapper = async function(doc){
    if(!this.valuesAndPillarsContainer.length){
        alert(this.NoArrayAlertMessage);
        return;
    }
    this.disableNavButtons(doc);
    var valuesArray = this.valuesAndPillarsContainer.map( element => element.value );
    await this.mergeSort.call(this, this.valuesAndPillarsContainer, 0, valuesArray.length);
    this.makeAllGreen(this.valuesAndPillarsContainer.map( (element) => element.pillar));
    this.enableNavButtons(doc);
    this.resetSpeedControls(doc);
}

var mergeSort = async function(array, leftIndex, rightIndex) {
    length = rightIndex - leftIndex;
    if (length < 2) {
        return array;
    }
    var mid = leftIndex + Math.floor(length / 2);

    await this.mergeSort.call(this, array, leftIndex, mid);
    await this.mergeSort.call(this, array, mid, rightIndex);    
    await this.merge.call(this, array, leftIndex, mid, rightIndex);
}

var merge = async function(array, leftIndex, mid, rightIndex) {
    var result = [];    //temporary array which holds onto the values sorted in a single merge invocation
    var l = leftIndex;  
    var r = mid;

    while (l < mid && r < rightIndex) {
        await this.delay();
        this.hightlightI(this.valuesAndPillarsContainer[l].pillar);
        this.hightlightJ(this.valuesAndPillarsContainer[r].pillar);

        if (array[l].value < array[r].value) {
            await this.delay();
            this.makeDefaultColor(this.valuesAndPillarsContainer[l].pillar); 
            result.push({"value": array[l].value, "pillarHeight": array[l].pillar.style.height, "pillarInnerHTML": array[l].pillar.innerHTML});
            l++;
        } else {
            await this.delay();
            this.makeDefaultColor(this.valuesAndPillarsContainer[r].pillar);
            result.push({"value": array[r].value, "pillarHeight": array[r].pillar.style.height, "pillarInnerHTML": array[r].pillar.innerHTML});
            r++;
        }

    }
    //rewrite first piece of the main array into result
    for (let i = l; i < mid; i++){
        result.push({"value": array[i].value, "pillarHeight": array[i].pillar.style.height, "pillarInnerHTML": array[i].pillar.innerHTML});
    }
    //rewrite second piece of the main array into result
    for (let i = r; i < rightIndex; i++){
        result.push({"value": array[i].value, "pillarHeight": array[i].pillar.style.height, "pillarInnerHTML": array[i].pillar.innerHTML});
    }

    //change our main array with results from current merge invokation
    for (let i = 0; i < rightIndex - leftIndex; i++) {
        await this.delay();
        array[leftIndex + i].value = result[i].value;
        array[leftIndex + i].pillar.style.height = result[i].pillarHeight;
        array[leftIndex + i].pillar.innerHTML = result[i].pillarInnerHTML;
        this.highlightLocallySorted(array[leftIndex + i].pillar);
    }
}



export {merge, mergeSort, mergeSortWrapper};