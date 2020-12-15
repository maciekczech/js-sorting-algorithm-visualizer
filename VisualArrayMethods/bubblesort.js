var bubbleSort = async function(doc){
    if(!this.valuesAndPillarsContainer.length){
        alert(this.NoArrayAlertMessage);
        return;
    }
    this.disableNavButtons(doc);
    var len = this.numberOfElements;
    for(var i = 0; i < this.numberOfElements; i++){
        for(let j = 0 ; j < len - i - 1; j++){
            if(j != 0){
                this.makeDefaultColor(this.valuesAndPillarsContainer[j - 1].pillar); 
            }
            this.hightlightI(this.valuesAndPillarsContainer[j].pillar);
            this.hightlightJ(this.valuesAndPillarsContainer[j + 1].pillar);
            await this.delay();
            if (this.valuesAndPillarsContainer[j].value > this.valuesAndPillarsContainer[j + 1].value) {
                //make pillars being compared red
                //swap graphical representation of the value
                this.makeRed(this.valuesAndPillarsContainer[j].pillar);
                this.makeRed(this.valuesAndPillarsContainer[j + 1].pillar);
                await this.delay();

                this.swapPillars(this.valuesAndPillarsContainer[j].pillar, this.valuesAndPillarsContainer[j+1].pillar);
                // swap values
                var temp = this.valuesAndPillarsContainer[j].value;
                this.valuesAndPillarsContainer[j].value = this.valuesAndPillarsContainer[j+1].value;
                this.valuesAndPillarsContainer[j + 1].value = temp;
                this.makeGreen(this.valuesAndPillarsContainer[j].pillar);
                this.makeGreen(this.valuesAndPillarsContainer[j + 1].pillar); 
            }else{
                this.makeGreen(this.valuesAndPillarsContainer[j].pillar);
                this.makeGreen(this.valuesAndPillarsContainer[j + 1].pillar);
            }
            await this.delay();
        }
        if(i < this.numberOfElements - 1 ){
            this.makeDefaultColor(this.valuesAndPillarsContainer[len - i - 2].pillar);
        }
    }
    //var pillars = this.valuesAndPillarsContainer.map( (element) => element.pillar);
    this.makeAllGreen(this.valuesAndPillarsContainer.map( (element) => element.pillar));
    this.enableNavButtons(doc);
    this.resetSpeedControls(doc);
    return this.valuesAndPillarsContainer;
}

export default bubbleSort;