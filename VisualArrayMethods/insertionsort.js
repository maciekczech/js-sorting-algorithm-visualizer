var insertionSort = async function(doc){
    if(!this.valuesAndPillarsContainer.length){
        alert(this.NoArrayAlertMessage);
        return;
    }
    this.disableNavButtons(doc);
    let length = this.valuesAndPillarsContainer.length;
    for(let keyIndex = 1; keyIndex < length; keyIndex++){
        const keyValue = this.valuesAndPillarsContainer[keyIndex].value;
        const keyPillarHeight = this.valuesAndPillarsContainer[keyIndex].pillar.style.height;
        const keyInnerHtml = this.valuesAndPillarsContainer[keyIndex].pillar.innerHTML;
        console.log(keyValue, keyPillarHeight, keyInnerHtml);
        let j = keyIndex - 1;
        //await this.delay();
        this.hightlightI(this.valuesAndPillarsContainer[keyIndex].pillar);
        while(j >= 0 && this.valuesAndPillarsContainer[j].value > keyValue){
            let previousColor = this.hightlightJ(this.valuesAndPillarsContainer[j].pillar);
            this.valuesAndPillarsContainer[j + 1].value = this.valuesAndPillarsContainer[j].value;
            this.valuesAndPillarsContainer[j + 1].pillar.style.height = this.valuesAndPillarsContainer[j].pillar.style.height;
            this.valuesAndPillarsContainer[j + 1].pillar.innerHTML = this.valuesAndPillarsContainer[j].pillar.innerHTML;
            j = j - 1;
            await this.delay();
            if(j>0){ this.makeAnyColor(this.valuesAndPillarsContainer[j+1].pillar, previousColor); }
        }
        this.valuesAndPillarsContainer[j + 1].value = keyValue;
        this.valuesAndPillarsContainer[j + 1].pillar.style.height = keyPillarHeight;
        this.valuesAndPillarsContainer[j + 1].pillar.innerHTML = keyInnerHtml;
        await this.delay();
        this.makeDefaultColor(this.valuesAndPillarsContainer[keyIndex].pillar);
        for(let i = 0; i <= keyIndex; i++){
            this.highlightLocallySorted(this.valuesAndPillarsContainer[i].pillar);
        }
    }
    this.enableNavButtons(doc);
    this.resetSpeedControls(doc);
}






export default insertionSort