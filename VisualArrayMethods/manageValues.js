var generateValues = function(doc){
    //reset the array if it's not empty
    if(this.valuesAndPillarsContainer){
        this.refreshArray(doc);
    }
    //push random elements to the array
    for(var i = 0; i < this.numberOfElements; i++){
        //draw random value and create pillar representation of that value
        var value = this.randomInt(5, 1000);
        
        //first fill the container with random values
        this.valuesAndPillarsContainer.push({
            "value" : value
        });
    }
    //calculate hight ratio based on the values in Container
    this.calculateRatio();
    //generate pillar for each value
    this.generatePillars(doc);
    //reset speed control value and buttons
    this.resetSpeedControls(doc);
}

var changeLengthOfArray = function(doc){

    this.numberOfElements = doc.getElementById('array-length-slider').value;

    //exponential function that I estimated used to calculate the delay - the lower the number of the elements is then higher the delay but it quickly drops.
    this.defaultDelayValue = this.calculateDefaultDelay();
    //calculate current delay based on default delay and the speed multiplier
    this.adjustDelay();
    //generate the array of new length if the array is already created - if not then only change the length.
    if(this.valuesAndPillarsContainer.length){
        this.generateValues(doc);
    }
}

var swapValues = function(a, b){
    var temp = a;
    a = b;
    b = temp;
}

export {generateValues, changeLengthOfArray, swapValues};