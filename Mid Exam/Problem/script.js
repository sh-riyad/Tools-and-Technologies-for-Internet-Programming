// function temperatureConverter(f){
//     let c;
//     c = (f-32)/1.8;
    
//     return c.toFixed(2);
// }
// console.log(temperatureConverter(103));
// console.log(temperatureConverter(50));


function countZeros(str){
    let cnt =0;
    let f =0;
    for(let i=0;i<str.length;i++){
        if(str[i]=='0')
        cnt++;
        if(str[i]>'1'){
            f=1;
            break;
        }
    }
    if(f)
    return "Invalid input";
    else
    return cnt;
}

console.log(countZeros("101012"));
console.log(countZeros("10101"));