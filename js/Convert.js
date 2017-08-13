function FtoHex(x){
    var hex =floor(map(x,0,1,0,16));
    switch(hex){
        case 10:
            hex = 'a';
        case 11:
            hex = 'b';
        case 12:
            hex = 'c';
        case 13:
            hex = 'd';
        case 14:
            hex = 'e';
        case 15:
            hex = 'f';
        default:
            hex = hex;
    }
    return hex
}

function Fto255(x){
    return floor(map(x,0,1,0,256));
}
function Fto360(x){
    return floor(map(x,0,1,0,360));
}

function Fto10(x){
    return floor(map(x,0,1,0,10));
}

function FtoCust(x,y){
    return floor(map(x,0,1,0,y));
}

function FtoCent(x){
    return floor(map(x,0,1,0,10001))/10000;
}

function randIndex(x,arr){
    return floor(map(x,0,1,0,arr.length-1));
}
