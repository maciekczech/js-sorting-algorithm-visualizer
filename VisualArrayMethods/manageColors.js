var makeRed = function(element){
    element.style.backgroundColor = this.red;
}

var makePairRed = function(a, b){
    a.style.backgroundColor = this.red;
    b.style.backgroundColor = this.red;      
}

var makePairRedForOneInterval = async function(a, b){
    var tempA = a.style.backgroundColor;
    var tempB = b.style.backgroundColor;
    a.style.backgroundColor = this.red;
    b.style.backgroundColor = this.red;
    await this.delay();
    a.style.backgroundColor = tempA;
    b.style.backgroundColor = tempB;
}

var makeGreen = function(element){
    element.style.backgroundColor = this.green;
}

var makePairGreen = function(a, b){
    a.style.backgroundColor = this.green;
    b.style.backgroundColor = this.green;
}

var makePairGreenForOneInterval = async function(a, b){
    var tempA = a.style.backgroundColor;
    var tempB = b.style.backgroundColor;
    a.style.backgroundColor = this.green;
    b.style.backgroundColor = this.green;
    await this.delay();
    a.style.backgroundColor = tempA;
    b.style.backgroundColor = tempB;
}

var makeAllGreen = function(elements){
    elements.forEach( async (element) => { element.style.backgroundColor = this.green ;
        await this.delay();
    });
}

var makeDefaultColor = function(element){
    element.style.backgroundColor = '#d3d3d3';
}

var makeAllDefaultColor = function(elements){
    elements.forEach(this.makeDefaultColor);
}

var makePurple = function(element){
    element.style.backgroundColor = '#6103ce';
}

var isGreen = function(element){ 
    //purple in rgb - element.style.backgroundColor returns rgb by default;
    return element.style.backgroundColor == 'rgb(116, 198, 157)';
}

export {makeRed, makePairRed, makePairRedForOneInterval, makeGreen, makePairGreen, makePairGreenForOneInterval, makeAllGreen, makeDefaultColor, makeAllDefaultColor, makePurple, isGreen}