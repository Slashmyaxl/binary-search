function mergeSort(list, length = list.length) {
    if (length <= 1) return list;

    let midIndex = Math.round(length / 2);
    let left = list.splice(0, midIndex);
    let right = list;

    // Recursive function for sorting left side of list, sorting right side of list, then merging left and right

    return merge(mergeSort(left), mergeSort(right));
}

function merge(listA, listB) {
    let sortedList = [];

    // While both lists have values to compare, move lowest value to beginning of sorted list

    while(listA.length && listB.length) {
        if (listA[0] < listB[0]) {
            sortedList.push(listA[0]);
            listA.shift();
        } else {
            sortedList.push(listB[0]);
            listB.shift();
        }        
    }

    // After comparison, while any remaining values remain in only one list, move values to sorted list

    while (listA.length) {
        sortedList.push(listA[0]);
        listA.shift();
    }

    while (listB.length) {
        sortedList.push(listB[0]);
        listB.shift();
    }

    return sortedList;
}

export { mergeSort, merge }