/*
    Homework 3)
        Found length of array on which QuickSort starts working faster then BubbleSort (you should implement sorts by your own).
        For sorting use 3 types of arrays
            Sorted
            Sorted Backward
            With random placement of element
        You can start with 2 elements and than increment number of element.
        When you reach result, run it few times to check different random on arrays.
        After you found result you can check few more length to compare how fast time growth on BubbleSort comparing to QuickSort.
*/

function bubbleSort(array){
    let top = array.length - 1;
    let lastSwappedPos;

    do{
        lastSwappedPos = 0
        for(let j=0; j < top; j++){
            if(array[j] > array[j+1]){
                [array[j], array[j+1]] = [array[j+1], array[j]];
                lastSwappedPos = j;
            }
        }
        top = lastSwappedPos;
    } while (lastSwappedPos > 0);

    return array;
}

function quickSort(array){
    if(array.length <= 1){
        return array;

    } else {
        const pivot = array.splice(array.length/2, 1);
        const leftArray = array.filter(x => x < pivot);
        const rightArray = array.filter(x => x > pivot);

        return (quickSort(leftArray).concat(pivot, quickSort(rightArray)));
    }
}

function generateArrays(sorted, reverseSorted, random, n){
    for(let i=0; i<n; i++){
        sorted.push(i+1);
        reverseSorted.push(n-i);
        random.push(Math.floor(Math.random() * 30));
    }

    return {sorted, reverseSorted, random};
}

const sort = () => {
    let sorted = [];
    let reverseSorted = [];
    let random = [];
    let n = 2;

    generateArrays(sorted, reverseSorted, random, n);

    console.log("sorted:", sorted);
    console.log("reverseSorted:", reverseSorted);
    console.log("random:", random);

    //Sorted
    console.time("BubbleSort/Sorted");
    bubbleSort([...sorted]);
    console.timeEnd("BubbleSort/Sorted");

    console.time("QuickSort/Sorted");
    quickSort([...sorted]);
    console.timeEnd("QuickSort/Sorted");

    //ReverseSorted
    console.time("BubbleSort/reverseSorted");
    bubbleSort([...reverseSorted]);
    console.timeEnd("BubbleSort/reverseSorted");

    console.time("QuickSort/reverseSorted");
    quickSort([...reverseSorted]);
    console.timeEnd("QuickSort/reverseSorted");

    //Random
    console.time("BubbleSort/random");
    bubbleSort([...random]);
    console.timeEnd("BubbleSort/random");

    console.time("QuickSort/random");
    quickSort([...random]);
    console.timeEnd("QuickSort/random");
}

sort();

/*
    CONCLUSION:
        Honestly, I couldn't find an N value in which BS stops being faster than QS (like it was supposed to) because the result timings 
        were different depending on how was the array sorted, but this is what I saw when trying many times from N=2 to N=+50:

        Sorted Array -> BS always faster than QS.
        Reverse Sorted Array -> QS always faster than BS (except with N = 2 -> equally faster).
        Random Array -> It depends on how elements were sorted in the array when generated.
*/