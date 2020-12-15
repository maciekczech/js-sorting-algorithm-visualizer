var generatePillars = function(doc){
    for(var i = 0; i < this.numberOfElements; i++){
        var value = this.valuesAndPillarsContainer[i].value;
        var pillar = this.createPillar(doc, value, i);
        this.valuesAndPillarsContainer[i].pillar = pillar;
    }
}


//create a single div element which visually represents an element to be sorted.
var createPillar = function(doc, item, index){
    var div = doc.createElement('div');

    //set arrtibutes and styles
    div.className = 'pillar';
    div.id = "pillar-"+index;
    div.setAttribute('value', item);
    div.style.height= this.normalizePillarHeight(item) + "%";
    //add transition to a color of a delay duration
    div.style.transition = `background ${this.currentDelayValue}ms ease`;
    div.style.transitionProperty = 'background-color,background';
    //if there are less than 28 pillars then display the values on top of each pillar
    if(this.numberOfElements < 28){
        div.innerHTML = item;
    }

    //append div to the array-container element
    doc.getElementById("array-container").appendChild(div);

    return div;
}

var swapPillars = function(a, b){
    //swap innerHTML (value) of the pillars
    if(a.innerHTML && b.innerHTML){
        var temp1 = a.innerHTML
        a.innerHTML = b.innerHTML;
        b.innerHTML = temp1;
    }
    //swap height value of the pillars
    var temp2 = a.style.height;
    a.style.height = b.style.height;
    b.style.height = temp2; 
}

   //returns height of the pillar in % based on the given value
var normalizePillarHeight = function(value){
    if ( this.ratio ) { return Math.ceil(value/this.ratio) + this.minPillarHeight; }
    else { throw "Ratio in equal to " + this.ratio };
}

export {generatePillars, createPillar, swapPillars, normalizePillarHeight}