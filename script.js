import VisualArray from './VisualArray.js'



var visualArr = new VisualArray(document);

//get all the nav buttons and assign them to the variables 
var generateArrayButton = document.getElementById("generate-array-button");

var changeArrayLengthButton = document.getElementById("array-length-slider");

var accelerateExecutionButton = document.getElementById("forward-button");
var decelerateExecutionButton = document.getElementById("backward-button");

var bubbleSortButton = document.getElementById("bubble-sort-button");
var mergeSortButton = document.getElementById("merge-sort-button");
var quickSortButton = document.getElementById("quick-sort-button");
var quickSortButtonHoare = document.getElementById("hoare-quick-sort-button");
var insertionSortButton = document.getElementById("insertion-sort-button");


//binding to visualArr to use 'this' the way I want. By default 'this' points to the button being listened
generateArrayButton.addEventListener('click', visualArr.generateValues.bind(visualArr, document));

changeArrayLengthButton.addEventListener('input', visualArr.changeLengthOfArray.bind(visualArr, document));

accelerateExecutionButton.addEventListener('click', visualArr.accelerateExecution.bind(visualArr, document));
decelerateExecutionButton.addEventListener('click', visualArr.decelerateExecution.bind(visualArr, document));


bubbleSortButton.addEventListener('click', visualArr.bubbleSort.bind(visualArr, document));
quickSortButton.addEventListener('click', visualArr.quickSortWrapper.bind(visualArr, document));
quickSortButtonHoare.addEventListener('click', visualArr.quickSortWrapperHoare.bind(visualArr, document));
insertionSortButton.addEventListener('click', visualArr.insertionSort.bind(visualArr, document));
mergeSortButton.addEventListener('click', visualArr.mergeSortWrapper.bind(visualArr, document));