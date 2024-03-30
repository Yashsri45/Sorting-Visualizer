let array = [];

function generateArray() {
    array = [];
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 250) + 5);
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${array[i]}px`;
        arrayContainer.appendChild(bar);
    }
}

function sortUserInput() {
    const userInput = document.getElementById("inputArray").value;
    const inputArray = userInput.split(",").map(num => parseInt(num.trim()));
    if (validateInput(inputArray)) {
        array = inputArray;
        visualizeArray();
    } else {
        alert("Invalid input! Please enter numbers separated by commas.");
    }
}

function validateInput(inputArray) {
    return inputArray.every(num => !isNaN(num));
}

function visualizeArray() {
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.classList.add("array-bar");
        bar.style.height = `${array[i]}px`;
        arrayContainer.appendChild(bar);
    }
}

function resetArray() {
    generateArray();
    visualizeArray();
}

async function quickSort() {
    await _quickSort(array, 0, array.length - 1);
    await animateSortedArray();
}

async function _quickSort(arr, start, end) {
    if (start >= end) return;
    let index = await partition(arr, start, end);
    await Promise.all([
        _quickSort(arr, start, index - 1),
        _quickSort(arr, index + 1, end)
    ]);
}

async function partition(arr, start, end) {
    let pivotIndex = start;
    let pivotValue = arr[end];
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            await swapElements(arr, i, pivotIndex);
            pivotIndex++;
        }
    }
    await swapElements(arr, pivotIndex, end);
    return pivotIndex;
}

async function mergeSort() {
    await _mergeSort(array, 0, array.length - 1);
    await animateSortedArray();
}

async function _mergeSort(arr, start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await Promise.all([
        _mergeSort(arr, start, mid),
        _mergeSort(arr, mid + 1, end)
    ]);
    await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
    let tempArray = [];
    let p1 = start, p2 = mid + 1;
    while (p1 <= mid && p2 <= end) {
        if (arr[p1] < arr[p2]) {
            tempArray.push(arr[p1]);
            p1++;
        } else {
            tempArray.push(arr[p2]);
            p2++;
        }
    }
    while (p1 <= mid) {
        tempArray.push(arr[p1]);
        p1++;
    }
    while (p2 <= end) {
        tempArray.push(arr[p2]);
        p2++;
    }
    for (let i = start; i <= end; i++) {
        arr[i] = tempArray[i - start];
        await sleep(50);
        updateArrayBarHeight(i, arr[i]);
    }
}

async function selectionSort() {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
        }
        if (min !== i) {
            await swapElements(array, i, min);
        }
    }
    await animateSortedArray();
}

async function insertionSort() {
    const len = array.length;
    for (let i = 1; i < len; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            await sleep(50);
            updateArrayBarHeight(j + 1, array[j + 1]);
            j--;
        }
        array[j + 1] = key;
        await sleep(50);
        updateArrayBarHeight(j + 1, key);
    }
    await animateSortedArray();
}

async function bubbleSort() {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                await swapElements(array, j, j + 1);
            }
        }
    }
    await animateSortedArray();
}

async function swapElements(arr, i, j) {
    await sleep(50);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    updateArrayBarHeight(i, arr[i]);
    updateArrayBarHeight(j, arr[j]);
}

async function animateSortedArray() {
    for (let i = 0; i < array.length; i++) {
        await sleep(50);
        updateArrayBarHeight(i, array[i]);
    }
}

function updateArrayBarHeight(index, height) {
    const bars = document.getElementsByClassName('array-bar');
    bars[index].style.height = `${height}px`;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = generateArray;
