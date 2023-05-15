function triangle(num1, num2){
    var x = parseInt(document.getElementById(num1).value);
    var y = parseInt(document.getElementById(num2).value);
    var area;
    area = 0.5* x *y;
    document.getElementById("show").innerHTML += 'Triangle : ' + area + '<br>';
}
function rectangle(num3, num4){
    var x = parseInt(document.getElementById(num3).value);
    var y = parseInt(document.getElementById(num4).value);
    var area;
    area = x *y;
    document.getElementById("show1").innerHTML+= 'Rectangle : ' + area + '<br>';
}

let boxes = document.querySelectorAll('.box');
        
boxes.forEach(function(box) {
    box.addEventListener('mousemove', function() {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        box.style.backgroundColor = "#" + randomColor;
    });
});

// function calculate(operation,x, y){
//     var area;
//     if(operation == 'triangle'){
//         area = 0.5* x.value *y.value;
//     }
//     else if(operation == 'rectangle'){
//         area = x.value * y.value;
//     }
//     document.getElementById('show').innerHTML += `${operation} ${area}cm <br>`;
// }
// function rectangle(num1, num2){
//     var x = parseInt(document.getElementById(num1).value);
//     var y = parseInt(document.getElementById(num2).value);
//     var area;
//     area = x*y;
//     document.getElementById("show").innerHTML=area;
// }
// function rectangle(num1, num2){
//     var x = parseInt(document.getElementById(num1).value);
//     var y = parseInt(document.getElementById(num2).value);
//     var area;
//     area = x*y;
//     document.getElementById("show").innerHTML=area;
// }
// function rectangle(num1, num2){
//     var x = parseInt(document.getElementById(num1).value);
//     var y = parseInt(document.getElementById(num2).value);
//     var area;
//     area = x*y;
//     document.getElementById("show").innerHTML=area;
// }