import bubbleSort from './VisualArrayMethods/bubblesort.js'
import * as quickSort from './VisualArrayMethods/quicksort.js'
import insertionSort from './VisualArrayMethods/insertionsort.js'
import * as manageValues from './VisualArrayMethods/manageValues.js'
import * as managePillars from './VisualArrayMethods/managePillars.js'
import * as manageColors from './VisualArrayMethods/manageColors.js'
import * as helpers from './VisualArrayMethods/helpers.js'
import * as mergesort from './VisualArrayMethods/mergesort.js'

var VisualArray = class{

    constructor(doc){
    
        //assign methods exported from other files
        this.bubbleSort = bubbleSort.bind(this, doc);

        this.insertionSort = insertionSort.bind(this, doc);

        this.quickSortWrapper = quickSort.quickSortWrapper.bind(this, doc);
        this.quickSortWrapperHoare = quickSort.quickSortWrapperHoare.bind(this, doc);
        this.quickSortLomuto = quickSort.quickSortLomuto.bind(this);
        this.quickSortHoare = quickSort.quickSortHoare.bind(this);
        this.partitionLomuto = quickSort.partitionLomuto.bind(this);
        this.partitionHoare = quickSort.partitionHoare.bind(this);
        this.quicksortSwap = quickSort.quicksortSwap.bind(this);

        this.merge = mergesort.merge.bind(this);
        this.mergeSort = mergesort.mergeSort.bind(this);
        this.mergeSortWrapper = mergesort.mergeSortWrapper.bind(this);

        this.generateValues = manageValues.generateValues.bind(this, doc);
        this.changeLengthOfArray = manageValues.changeLengthOfArray.bind(this, doc);
        this.swapValues = manageValues.swapValues.bind(this);

        this.generatePillars = managePillars.generatePillars.bind(this);
        this.createPillar = managePillars.createPillar.bind(this);
        this.swapPillars = managePillars.swapPillars.bind(this);
        this.normalizePillarHeight = managePillars.normalizePillarHeight.bind(this);

        this.makeRed = manageColors.makeRed.bind(this);
        this.makePairRed = manageColors.makePairRed.bind(this);
        this.makePairRedForOneInterval = manageColors.makePairRedForOneInterval.bind(this);
        this.makeGreen = manageColors.makeGreen.bind(this);
        this.makePairGreen = manageColors.makePairGreen.bind(this);
        this.makePairGreenForOneInterval = manageColors.makePairGreenForOneInterval.bind(this);
        this.makeAllGreen = manageColors.makeAllGreen.bind(this);
        this.makeDefaultColor = manageColors.makeDefaultColor.bind(this);
        this.makeAllDefaultColor = manageColors.makeAllDefaultColor.bind(this);
        this.makePurple = manageColors.makePurple.bind(this);
        this.isGreen = manageColors.isGreen.bind(this);

        this.calculateRatio = helpers.calculateRatio.bind(this);
        this.randomInt = helpers.randomInt.bind(this);
        this.removePillars = helpers.removePillars.bind(this);
        this.refreshArray = helpers.refreshArray.bind(this);
        this.delay = helpers.delay.bind(this);
        this.calculateDefaultDelay = helpers.calculateDefaultDelay.bind(this);
        this.adjustDelay = helpers.adjustDelay.bind(this);
        this.disableNavButtons = helpers.disableNavButtons.bind(this);
        this.enableNavButtons = helpers.enableNavButtons.bind(this);
        this.accelerateExecution = helpers.accelerateExecution.bind(this);
        this.decelerateExecution = helpers.decelerateExecution.bind(this);
        this.resetSpeedControls = helpers.resetSpeedControls.bind(this);
        

        //array that keeps values to be sorted
        this.valuesAndPillarsContainer = [];

        this.numberOfElements = doc.getElementById('array-length-slider').value;
        //max&min height given in %
        this.maxPillarHeight = 80;
        this.minPillarHeight = 10;
        this.delayMultiplier = 1;
        this.defaultDelayValue = this.calculateDefaultDelay();
        this.currentDelayValue = this.defaultDelayValue;

        this.minDelayMultiplier = 0.25;
        this.maxDelayMultiplier = 4;

        //speed control single step
        this.delayMultiplierStep = 0.25;

        this.yellow = '#f5dd90';
        this.blue = '#586ba4';
        this.navyBlue = '#324376';
        this.orange = '#f68e5f';
        this.green = '#74c69d';
        this.red = '#f76c5e';

/*         this.yellow = '#FFBE0B';
        this.blue = '#3A86FF';
        this.orange = '#FB5607';
        this.green = '#80ed99';
        this.red = '#FF006E'; */

        //ratio is used to normalize the pillars height - it is calculated based on the highest value being sorted and maxPillarHeight constant value
        this.ratio = null;
        this.NoArrayAlertMessage = "First generate your array using Generate New Array button in the top left corner";
    }


    makeAnyColor(element, color){
        var previousColor = element.style.backgroundColor;
        element.style.backgroundColor = color;
        return previousColor;
    }

    highlightPivot(element){
        var previousColor = element.style.backgroundColor;
        element.style.backgroundColor = this.navyBlue;
        return previousColor;
    }

    hightlightI(element){
        var previousColor = element.style.backgroundColor;
        element.style.backgroundColor = this.yellow;
        return previousColor;
    }

    hightlightJ(element){
        var previousColor = element.style.backgroundColor;
        element.style.backgroundColor = this.blue;
        return previousColor;
    }

    highlightLocallySorted(element){
        var previousColor = element.style.backgroundColor;
        element.style.backgroundColor = this.orange;
        return previousColor;
    }

    async highlightBothInTheSamePosForOneInterval(element){
        var temp = element.style.backgroundColor;
        element.style.background = `linear-gradient(to right, ${this.yellow} 0%, ${this.yellow} 50%, ${this.blue} 50%, ${this.blue} 100%)`
        await this.delay();
        element.style.background = '';
        element.style.backgroundColor = temp;
    }

     async highlightIandJForOneInterval(elementI, elementJ){
        var tempI = elementI.style.backgroundColor;
        var tempJ = elementJ.style.backgroundColor;
        elementI.style.backgroundColor = this.yellow;
        elementJ.style.backgroundColor = this.blue;
        await this.delay();
        elementI.style.backgroundColor = tempI;
        elementJ.style.backgroundColor = tempJ;
    }


    /*async highlightIForOneInterval(element){
        var temp = element.style.backgroundColor;
        element.style.backgroundColor = '#FFD166';
        await this.delay();
        element.style.backgroundColor = temp;
    }

    async highlightJForOneInterval(element){
        var temp = element.style.backgroundColor;
        element.style.backgroundColor = '#118AB2';
        await this.delay();
        element.style.backgroundColor = temp;
    }

    async highlightBothInTheSamePosForOneInterval(element){
        var temp = element.style.backgroundColor;
        element.style.background = 'linear-gradient(to right, #FFD166 0%, #FFD166 50%, #118AB2 50%, #118AB2 100%)'
        await this.delay();
        element.style.background = '';
        element.style.backgroundColor = temp;
    }

    async highlightLessThanPivot(element, pivot){
        var temp = element.style.backgroundColor;
        element.style.backgroundColor = '#EF476F';
        //pivot.style.backgroundColor = '#EF476F';
        await this.delay();
        //this.highlightPivot(pivot);
        element.style.backgroundColor = temp;
    }
    async highlightMoreThanPivot(element, pivot){
        var temp = element.style.backgroundColor;
        element.style.backgroundColor = '#06D6A0';
        //pivot.style.backgroundColor = '#06D6A0';
        await this.delay();
        //this.highlightPivot(pivot);
        element.style.backgroundColor = temp;
    } */
}

export default VisualArray;
