function coinFlip(){
    if (random()<0.5){
        return true;
    }else{
        return false;
    }
}

function percentge(x){
    if(random()<x){
        return true;
    }else{
        return false;
    }
}

function plusMinus(x){
    if (random()<0.5){
        return x;
    }else{
        return -x;
    }
}

function shuffleCut(arr){
    var halfArr = [];
    var len = arr.length;
    for(var i = 0;i<len;i++){
        if(random()<0.5){
            halfArr.push(arr[i]);
        }
    }
    return halfArr;
}

function combineTwo(arr1,arr2){
    var newArr = [];
    var len;
    if (arr1.length>arr2.length){
        len = arr1.length;
    }else{
        len = arr2.length;
    }
    for(var i = 0; i<len; i++){
        if(coinFlip() && arr1[i]){
            newArr[i] = arr1[i];
        }else if(arr2[i]){
            newArr[i] = arr2[i];
        }
    }
    return newArr;
}

function shuffleTwo(arr1,arr2){
    var newArr = arr1.concat(arr2);
    var j, x, i;
    var len = newArr.length;
    for (i = len; i>=0; i--) {
        j = Math.floor(Math.random() * i);
        x = newArr[i - 1];
        newArr[i - 1] = newArr[j];
        newArr[j] = x;
    }
    return newArr;
}

function myshuffle(arr) {
    var j, x, i;
    var len = arr.length;
    for (i = len; i>=0; i--) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
    return arr;
}
