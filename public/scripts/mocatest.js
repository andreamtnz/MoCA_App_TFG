//

var clickedBubbles = [];
var startTime = Date.now();
var canvas = "";
var ctx = "";

// variables for drawing
var isDrawing = false;
var prevX, prevY;


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('click', function () {
            var bubbleNumber = this.getAttribute('data-number');
            if (!clickedBubbles.includes(bubbleNumber)) {
                clickedBubbles.push(bubbleNumber);
                this.style.backgroundColor = 'lightgreen';
            } else {
                clickedBubbles = clickedBubbles.filter(num => num !== bubbleNumber);
                this.style.backgroundColor = 'lightsalmon';
            }
        });
    });
});

function showexercise1part1(){
    document.getElementById("startButton").style.display = "none";
    document.getElementById("exercise1-part1").style.display = "block";    
}

// Función para dibujar una línea
function drawLine(x1, y1, x2, y2) {
    if(!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function showexercise1part2() {
    var timeUsed = Date.now() - startTime;
    var text = clickedBubbles.join(', ') + '\nTime: ' + timeUsed + 'ms';

    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    link.setAttribute('download', 'results_test1_part1.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    document.getElementById("exercise1-part1").style.display = "none";
    document.getElementById("exercise1-part2").style.display = "block";
    
    canvas = document.getElementById("canvas1part2");
    ctx = canvas.getContext("2d");

    drawCube();

    enableDrawing(canvas);
}


function enableDrawing(canvas){
    // Evento de inicio del dibujo
    canvas.addEventListener("mousedown", function(e) {
        isDrawing = true;
        let rect = canvas.getBoundingClientRect();
        prevX = e.clientX - rect.left; // Coordenadas relativas al canvas
        prevY = e.clientY - rect.top;
    });

    // Evento de dibujo
    canvas.addEventListener("mousemove", function(e) {
        if (isDrawing) {
            let rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left; // Coordenadas relativas al canvas
            var y = e.clientY - rect.top;
            drawLine(prevX, prevY, x, y);
            prevX = x;
            prevY = y;
        }
    });

    // Evento de fin del dibujo
    canvas.addEventListener("mouseup", function() {
        isDrawing = false;
    });
}




// Función para descargar el dibujo
function downloadCanvas(text) {
    if(!canvas) return;
    var link = document.createElement('a')
    link.download = text +'.jpg'
    link.href = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream")
    link.click()      
}




function drawCube(){

    if (!canvas || !ctx) return; // in case there is no canvas or ctx

    ctx.clearRect(0, 0, canvas.width, canvas.height); // get a clean canvas

    var c = canvas
    var line1 = c.getContext("2d");
    line1.moveTo(250, 20);
    line1.lineTo(350, 20);
    line1.stroke();

    var line2 = c.getContext("2d");
    line2.moveTo(250, 20);
    line2.lineTo(250, 120);
    line2.stroke();

    var line3 = c.getContext("2d");
    line3.moveTo(250, 120);
    line3.lineTo(350, 120);
    line3.stroke();

    var line4 = c.getContext("2d");
    line4.moveTo(350, 20);
    line4.lineTo(350, 120);
    line4.stroke();

    var line11 = c.getContext("2d");
    line11.moveTo(230, 40);
    line11.lineTo(330, 40);
    line11.stroke();

    var line22 = c.getContext("2d");
    line22.moveTo(230, 40);
    line22.lineTo(230, 140);
    line22.stroke();

    var line33 = c.getContext("2d");
    line33.moveTo(330, 40);
    line33.lineTo(330, 140);
    line33.stroke();

    var line44 = c.getContext("2d");
    line44.moveTo(230, 140);
    line44.lineTo(330, 140);
    line44.stroke();

    var line5 = c.getContext("2d");
    line5.moveTo(250, 20);
    line5.lineTo(230, 40);
    line5.stroke();

    var line6 = c.getContext("2d");
    line6.moveTo(350, 20);
    line6.lineTo(330, 40);
    line6.stroke();

    var line7 = c.getContext("2d");
    line7.moveTo(250, 120);
    line7.lineTo(230, 140);
    line7.stroke();

    var line8 = c.getContext("2d");
    line7.moveTo(350, 120);
    line7.lineTo(330, 140);
    line7.stroke();
}

function showexercise1part3(){
    downloadCanvas("cube");
    document.getElementById("exercise1-part2").style.display = "none";
    document.getElementById("exercise1-part3").style.display = "block";
    
    canvas = document.getElementById("canvas1part3")
    ctx = canvas.getContext("2d");
    enableDrawing(canvas);  
}

function showexercise2(){
    downloadCanvas("clock");
    document.getElementById("exercise1-part3").style.display = "none";
    document.getElementById("exercise2").style.display = "block";
}



function showexercise3part1(){

    var contenido1 = document.getElementById("textLion").value;
    var contenido2 = document.getElementById("textRhino").value;
    var contenido3 = document.getElementById("textCamel").value;
    
    var text = "Lion: " + contenido1 + "\nRhino: " + contenido2 + "\nCamel: " + contenido3;

    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    link.setAttribute('download', 'animals.txt');
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    //document.getElementById("exercise3-part1").style.display = "none";
    //document.getElementById("exercise3-part2").style.display = "block";

    //button functionality for exercise 3 part 1
    /*let mediaRecorder;
    let audioChunks = [];
    const startbutton = document.getElementById('start-exercise3-part1');
    const stopbutton = document.getElementById('stop-exercise3-part1');
    const nextbutton = document.getElementById('next-exercise3-part1');*/

    /*startbutton.addEventListener('click', async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
            nextbutton.disabled = false;
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            nextbutton.href = audioUrl;
            nextbutton.style.display = 'block';
            nextbutton.textContent = 'Next'; /* se puede quitar */
/*
            nextbutton.addEventListener('click', () => {
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = audioUrl;
                a.download = 'memory_try1.wav';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                });
            });

            startbutton.disabled = true;
            stopbutton.disabled = false;
    });*/

   /* stopbutton.addEventListener('click', () => {
        mediaRecorder.stop();
        startbutton.disabled = true;
        stopbutton.disabled = true;
        nextbutton.disabled = false;

        audioChunks = [];
    });*/
    
}

function showexercise3part2(){
    


    

}







