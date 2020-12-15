var calculateRatio = function(){
//extracting values from to object to the array
    var values = this.valuesAndPillarsContainer.map( (element) => {
        return element.value;
    });
    //finding the highest element and calculating the 'max' ratio to later devide every element by that ratio and normalize the value between 0 and maxPillarHight
    this.ratio = Math.max.apply(Math, values) / this.maxPillarHeight;
}

var randomInt = function(min, max) {
    return min + Math.floor((max - min) * Math.random());
}

//removes pillars and resets array Wraper object which keeps value:pillar pairs
var removePillars = function(doc){
    Array.from(doc.getElementsByClassName("pillar")).forEach((pillar) => { pillar.remove(); });
    this.arrayWrapper = {};
}

//method that resets array and removes all of the pillars from DOM
var refreshArray = function(doc){
    this.valuesAndPillarsContainer = [];
    this.removePillars(doc);
}

var delay = function(){
    return new Promise(resolve => setTimeout(resolve, this.currentDelayValue));
}

var calculateDefaultDelay = function(){
    console.log(434.75*Math.pow(0.97, this.numberOfElements));
    return 434.75*Math.pow(0.97, this.numberOfElements);
}

var adjustDelay = function(){
    this.currentDelayValue = this.defaultDelayValue / this.delayMultiplier;
    console.log(this.currentDelayValue);
    //adjust background color transition aswell as it is based on the current delay value
    this.valuesAndPillarsContainer.map( element => {
        element.pillar.style.transition = `background-color ${this.currentDelayValue}ms ease`;
        element.pillar.style.transitionProperty = 'background-color,background';
    });
    return this.delayMultiplier.toFixed(2);
}


var disableNavButtons = function(doc){
    var navButtons = doc.querySelectorAll('.nav-button');
    var navLabels = doc.querySelectorAll('.nav-label');
    console.log(navButtons);
    Array.from(navButtons).forEach( button => { button.disabled = true; });
    Array.from(navLabels).forEach( label => { label.classList.add('disabled'); });
}

var enableNavButtons = function(doc){
    var navButtons = doc.querySelectorAll('.nav-button');
    var navLabels = doc.querySelectorAll('.nav-label');
    Array.from(navButtons).forEach( button  =>   { button.disabled = false; });
    Array.from(navLabels).forEach ( label   =>   { label.classList.remove('disabled'); });
}

var accelerateExecution = function(doc){
    if(this.delayMultiplier < this.maxDelayMultiplier){
        //if backward button is disabled (only when we have reached the minimum possible multiplier value) enable it back
        if(doc.getElementById('backward-button').disabled) { doc.getElementById('backward-button').disabled = false; }
        this.delayMultiplier = this.delayMultiplier + this.delayMultiplierStep;
        console.log('accelerate: ', this.delayMultiplier);
        let strMultipier = this.adjustDelay();
        doc.getElementById('speed-value').innerHTML = strMultipier + 'x';
    }else{
        doc.getElementById('forward-button').disabled = true;
    }
}

var decelerateExecution = function(doc){
    if(this.delayMultiplier > this.minDelayMultiplier){
        //if forward button is disabled (only when we have reached the maximum possible multiplier value) enable it back
        if(doc.getElementById('forward-button').disabled) { doc.getElementById('forward-button').disabled = false; }
        //decrease multiplier by one step
        this.delayMultiplier = this.delayMultiplier - this.delayMultiplierStep;
        console.log('decelerate: ', this.delayMultiplier);
        let strMultipier = this.adjustDelay();
        doc.getElementById('speed-value').innerHTML = strMultipier + 'x';
    }else{
        doc.getElementById('backward-button').disabled = true;
    }
}

var resetSpeedControls = function(doc){
    this.delayMultiplier = 1;
    let strMultipier = this.adjustDelay();
    doc.getElementById('speed-value').innerHTML = strMultipier + 'x';
    doc.getElementById('backward-button').disabled = false;
    doc.getElementById('forward-button').disabled = false;
}

export {calculateRatio, randomInt, removePillars, refreshArray, delay, calculateDefaultDelay, adjustDelay, disableNavButtons, enableNavButtons, accelerateExecution, decelerateExecution, resetSpeedControls}