//

var clickedBubbles = [];
var startTime = Date.now();
var canvas = "";
var ctx = "";

// variables for drawing
var isDrawing = false;
var prevX, prevY;



function playAudio(audioId){
    var audio = document.getElementById(audioId);
    if(audio){
        audio.play();
    }
}

function stopAudio(audioId){
    var audio = document.getElementById(audioId);
    if(audio){
        audio.pause();
    }
}


 //adding functionality to bubbles...
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
    playAudio("ex1 part1 bubbles");    

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
    stopAudio("ex1 part1 bubbles");
    var timeUsed = Date.now() - startTime;
    var text = clickedBubbles.join(', ') + '\nTime: ' + timeUsed + 'ms';

    downloadtxt("bubbles", text);
    
    document.getElementById("exercise1-part1").style.display = "none";
    document.getElementById("exercise1-part2").style.display = "block";
    
    canvas = document.getElementById("canvas1part2");
    ctx = canvas.getContext("2d");

    drawCube();

    enableDrawing(canvas);
    playAudio("ex1 part2 cube");
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
    var link = document.createElement('a');
    link.download = text +'.jpg';
    link.href = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
    link.click();
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
    stopAudio("ex1 part2 cube");

    downloadCanvas("cube");
    document.getElementById("exercise1-part2").style.display = "none";
    document.getElementById("exercise1-part3").style.display = "block";
    
    canvas = document.getElementById("canvas1part3")
    ctx = canvas.getContext("2d");
    enableDrawing(canvas);  

    playAudio("ex1 part3 clock");
}

function showexercise2(){
    stopAudio("ex1 part3 clock");

    downloadCanvas("clock");
    document.getElementById("exercise1-part3").style.display = "none";
    document.getElementById("exercise2").style.display = "block";
    playAudio("ex2 animals");
}



function showexercise3part1(){
    stopAudio("ex2 animals");

    var contenido1 = document.getElementById("textLion").value;
    var contenido2 = document.getElementById("textRhino").value;
    var contenido3 = document.getElementById("textCamel").value;
    
    var text = "Lion: " + contenido1 + "\nRhino: " + contenido2 + "\nCamel: " + contenido3;

    downloadtxt("animals", text);
    
    document.getElementById("exercise2").style.display = "none";
    document.getElementById("exercise3-part1").style.display = "block";
    
    const startbutton = document.getElementById('start-exercise3-part1');
    const stopbutton = document.getElementById('stop-exercise3-part1');
    const nextbutton = document.getElementById('next-exercise3-part1');
    const transcriptDisplay = document.getElementById('recordingStatus');
    const audio = document.getElementById("ex3 part1 memory");

    audio.addEventListener("ended", function() {
        startbutton.style.display = "block"; 
        console.log("audio finished. showing startbutton...");
    });
    setupAudioRecording(startbutton, stopbutton, nextbutton, transcriptDisplay); //buttons to stop recording and next are managed here
    
    playAudio("ex3 part1 memory");
    
}

let recognizedText = ""; //global variables so qe can access them
let audioBlob = null;
let mediaRecorder;
let audioChunks = [];
let stream;

function setupAudioRecording(startbutton, stopbutton, nextbutton, transcriptDisplay){
      
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (window.SpeechRecognition){
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = false;

        startbutton.addEventListener("click", async() => {
            try{
                audioChunks = [];
                recognizedText = "";
                transcriptDisplay.textContent = "Recording...";

                recognition.start();

                //start recording audio...
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });

                startbutton.style.display="none";
                stopbutton.style.display="block";

                stopbutton.addEventListener("click", () => {
                    console.log("Stopping recording...");
        
                    recognition.stop(); // Stop voice recognition
                    if (mediaRecorder && mediaRecorder.state !== "inactive") {
                        mediaRecorder.stop(); // Stop recording only if it's still active
                    }
        
                    transcriptDisplay.textContent = "Recording stopped.";
        
                    stopbutton.style.display = "none";
                    nextbutton.style.display = "block"; // Show next button
        
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                    }
                });
        
                recognition.onresult = (event) => {
                    let transcript = "";
                    for (let i = 0; i < event.results.length; i++) {
                        transcript += event.results[i][0].transcript + " ";
                    }
                    recognizedText = transcript.trim();
                    console.log("Texto reconocido:", recognizedText);
                };
                
        
                mediaRecorder.addEventListener('stop', () => {
                    audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    console.log("Audio recorded successfully")
                });
                    
                
                recognition.onerror = (event) => {
                    console.error("Speech recognition error:", event.error);
                    transcriptDisplay.textContent = "Error in recognition.";
                };
            }catch(error){
                console.error("Error accessing the microphone: ", error);
                alert("Could not access the microphone.");
            }
        });

        
        
        } else {
            alert("Your browser does not support Speech Recognition. Please use Chrome or Edge."); //TODO: try with safari to check that the alert works
        }
            
        
    }



function showexercise3part2(){
    stopAudio("ex3 part1 memory");

    const expectedWords = ["face", "velvet", "church", "daisy", "red"];
    //download text and audio
    if(recognizedText){  
        const textContext = "Expected words: " + expectedWords.join(", ") + "\nRecognized text: " + recognizedText;
        downloadtxt("memory_try1", textContext);
    }
    if(audioBlob){
        downloadaudio("memory_try1", audioBlob);
    }
    //check words
    
    recognizedText = recognizedText.toLowerCase().split("");
    //const containsAllwords = expectedWords.every(word => recognizedText.includes(word));
    
    document.getElementById("exercise3-part1").style.display = "none"; //hide current exercise
    const containsAllwords = true; //TODO remove this and uncomment line 356
    if(containsAllwords){ //exercise performed successfully
        recognizedText = null;
        audioBlob = null;
        showexercise4part11(); //TODO: check this works
    }else{ //exercise with mistakes --> second try
        document.getElementById("exercise3-part2").style.display = "block";
        const startbutton = document.getElementById('start-exercise3-part2');
        const stopbutton = document.getElementById('stop-exercise3-part2');
        const nextbutton = document.getElementById('next-exercise3-part2');
        const transcriptDisplay = document.getElementById('recordingStatus');
        const audio = document.getElementById("ex3 part2 memory");

        audio.addEventListener("ended", function() {
            startbutton.style.display = "block"; 
            console.log("audio finished. showing startbutton...");
        });
        recognizedText = ""; //global variables so qe can access them
        audioBlob = null;
        mediaRecorder;
        audioChunks = [];
        stream;
        setupAudioRecording(startbutton, stopbutton, nextbutton, transcriptDisplay);   //buttons to stop recording and next are managed here
    
        playAudio("ex3 part2 memory");
    }
    

}

function showexercise4part11(){
    stopAudio("ex3 part2 memory");

    playAudio("ex3 part3 memory");

    const expectedWords = ["face", "velvet", "church", "daisy", "red"];
    //download text and audio
    if(recognizedText){
        const textContext = "Expected words: "+ expectedWords.join(", ") + "\nRecognized text: " + recognizedText;
        downloadtxt("memory_try2", textContext);        
    }
    if(audioBlob){
        downloadaudio("memory_try2", audioBlob);
    }

    recognizedText = null; // empty for next exercises
    audioBlob = null;

    const audio1 = document.getElementById("ex3 part3 memory");
    audio1.addEventListener("ended", function(){
        document.getElementById("exercise3-part2").style.display = "none";
        document.getElementById("exercise4-part1-1").style.display = "block";
        playAudio("ex4 part1 forward");
    })
     
   

    const audio2 = document.getElementById("ex4 part1 forward");
    const writeHere = document.getElementById("forwardNumbers");
    const nextbutton = document.getElementById("next-exercise4-part11");
    audio2.addEventListener("ended", function() {
        writeHere.style.display = "block";
        nextbutton.style.display = "block";  
        console.log("audio finished. showing writeHere and nextbutton...");
    });


}

function downloadtxt(name, text){   
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    link.setAttribute('download', name);
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadaudio(name, audioBlob){
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioLink = document.createElement('a');
    audioLink.style.display = 'none';
    audioLink.href = audioUrl;
    audioLink.download = name + '.wav';
    document.body.appendChild(audioLink);
    audioLink.click();
    document.body.removeChild(audioLink);
    URL.revokeObjectURL(audioUrl);

}

function showexercise4part12(){
    stopAudio("ex4 part1 forward");
    var forwardNumbersValue = document.getElementById("forwardNumbers").value;
    downloadtxt("forwardNumbers", forwardNumbersValue);
    document.getElementById("exercise4-part1-1").style.display = "none";
    document.getElementById("exercise4-part1-2").style.display = "block";

    playAudio("ex4 part1 backward");

    const audio2 = document.getElementById("ex4 part1 backward");
    const writeHere = document.getElementById("backwardNumbers");
    const nextbutton = document.getElementById("next-exercise4-part12");
    audio2.addEventListener("ended", function() {
        writeHere.style.display = "block";
        nextbutton.style.display = "block";  
        console.log("audio finished. showing writeHere and nextbutton...");
    });

}

var startTime = null;
var clickedTimes = [];

function showexercise4part2(){
    stopAudio("ex4 part1 backward");

    var backwardNumbersValue = document.getElementById("backwardNumbers").value;
    downloadtxt("backwardNumbers", backwardNumbersValue);
    document.getElementById("exercise4-part1-2").style.display = "none";
    document.getElementById("exercise4-part2").style.display = "block";

    playAudio("ex4 part2 clickedAs");
    clickedTimes.push(Date.now());

    //functionality of ex 4 part 2
    const colors = [
        "lightsalmon", "lightblue", "lightgreen", "lightcoral", "lightpink",
        "lightgoldenrodyellow", "mediumorchid", "darkorange", "deepskyblue",
        "palevioletred", "springgreen"
    ];
    let colorIndex = 0;

    function handleClick(event){
        var timeClicked = Date.now()/1000;
        clickedTimes.push(timeClicked);
        colorIndex = (colorIndex + 1) % colors.length; // Alternar colores
        event.target.style.backgroundColor = colors[colorIndex];
    }

    var bubble = document.getElementById('bubbleA'); //using same bubbles as in first exercise
    bubble.addEventListener('click', handleClick);
    
}


function showexercise4part3(){
    stopAudio("ex4 part2 clickedAs");
    var clickedA = []
    for (i = 0; i< clickedTimes.length -1; i++){
        clickedA[i] = clickedTimes[i+1] - clickedTimes[0]
    }
    var text =  clickedA.join(', ') ;
    text = text + '\nOrientative correct answers: 12.303, 17.299, 18.708, 24.854, 27.113, 32.522, 34.029, 35.081, 37.553, 42.449, 43.821';
    downloadtxt("clickedAs", text);

    document.getElementById("exercise4-part2").style.display = "none";
    document.getElementById("exercise4-part3").style.display = "block";

    playAudio("ex4 part3 substraction");

    
}

var substractionValues = [];
function saveSubstraction(){
    var substraction = document.getElementById("substraction").value;
    if (substractionValues.length<5){
        substractionValues.push(substraction);
        document.getElementById("substraction").value = ""; // empty input box
        if(substractionValues.length == 5){
            showexercise5part11();
        }
    }
}

function showexercise5part11(){
    stopAudio("ex4 part3 substraction");
    downloadtxt("substraction", substractionValues);

    document.getElementById("exercise4-part3").style.display = "none";
    document.getElementById("exercise5-part11").style.display = "block";

    const startbutton = document.getElementById("start-exercise5-part11");
    const stopbutton = document.getElementById("stop-exercise5-part11");
    const nextbutton = document.getElementById("next-exercise5-part11");
    const transcriptDisplay = document.getElementById("recordingStatus");
    
    playAudio("ex5 part1 sentence1");
    console.log("play audio ex5 part1 sentence2");

    const audio = document.getElementById("ex5 part1 sentence1");
    audio.addEventListener("ended", function() {
        startbutton.style.display = "block";
        console.log("audio finished. showing startbutton...");
    });

    setupAudioRecording(startbutton, stopbutton, nextbutton, transcriptDisplay);
}


function showexercise5part12(){
    stopAudio("ex5 part1 sentence1");
    console.log("stop audio ex5 part1 sentence1");

    //download text and audio
    if(recognizedText){
        const expectedText = "Expected text: I only know that John is the one to help today.";
        const textContext = expectedText + "\nRecognized text: " + recognizedText;
        downloadtxt("sentence1", textContext);
    }
    if(audioBlob){
        downloadaudio("sentence1", audioBlob);
    }

    recognizedText = null; // empty for next exercises
    audioBlob = null;

    document.getElementById("exercise5-part11").style.display = "none";
    document.getElementById("exercise5-part12").style.display = "block";

    const startbutton = document.getElementById('start-exercise5-part12');
    const stopbutton = document.getElementById('stop-exercise5-part12');
    const nextbutton = document.getElementById('next-exercise5-part12');
    const transcriptDisplay = document.getElementById('recordingStatus');


    playAudio("ex5 part1 sentence2");
    console.log("play audio ex5 part1 sentence2");

    const audio = document.getElementById("ex5 part1 sentence2");
    audio.addEventListener("ended", function() {
        startbutton.style.display = "block";
        console.log("audio finished. showing startbutton...");
    });
    
    setupAudioRecording(startbutton, stopbutton, nextbutton, transcriptDisplay);
}

let timerInterval;
let timer ;
function startTimer(duration, display, callback) {
    let timer = duration;
    
    function updateDisplay() {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
    }

    updateDisplay(); // Mostrar tiempo inicial antes de iniciar el intervalo

    timerInterval = setInterval(() => {
        timer--;
        updateDisplay();

        if (timer < 0) {
            clearInterval(timerInterval);
            if (typeof callback === "function") {
                callback(); // Llamar a la función de finalización cuando termine el tiempo
            }
        }
    }, 1000);
}


function setupAudioRecordingTimer(startbutton, nextbutton, transcriptDisplay, timerElement){
    console.log("entered function setupAudioRecordingTimer");
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (window.SpeechRecognition){
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = false;
        console.log("before startbutton.addEventListener");

        startbutton.addEventListener("click", async() => {
            try{
                audioChunks = [];
                recognizedText = "";
                
                //start recording audio...
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                console.log("Microhpne has been activated");

                recognition.start();
                console.log("Voice recognition started");

                startTimer(60, timerElement, ()=>{
                    console.log("timer ended");

                    clearInterval(timerInterval);
                    console.log("interval cleared");

                    recognition.stop(); // Stop voice recognition
                    console.log("Recognition stopped");

                    if (mediaRecorder && mediaRecorder.state !== "inactive") {
                        mediaRecorder.stop(); // Stop recording only if it's still active to avoid errors
                        console.log("mediaRecorder stopped");
                    }
        
                    transcriptDisplay.textContent = "Recording stopped.";
                    nextbutton.style.display = "block"; // Show next button
        
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        console.log("stream stopped");
                    }

                    
                });
                console.log("timer started");

                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                transcriptDisplay.textContent = "Recording...";
                console.log("mediaRecorder started");

                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });
                console.log("mediaRecorder.addEventListener");

                startbutton.style.display="none";
                console.log("startbutton hidden");


                recognition.onresult = (event) => {
                    let transcript = "";
                    for (let i = 0; i < event.results.length; i++) {
                        transcript += event.results[i][0].transcript + " ";
                    }
                    recognizedText = transcript.trim();
                    console.log("Texto reconocido:", recognizedText);
                };
                
        
                mediaRecorder.addEventListener('stop', () => {
                    audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    console.log("Audio recorded successfully")
                });
                    
                
                recognition.onerror = (event) => {
                    console.error("Speech recognition error:", event.error);
                    transcriptDisplay.textContent = "Error in recognition.";
                };
            }catch(error){
                console.error("Error accessing the microphone: ", error);
                alert("Could not access the microphone.");
            }
        });

        
        
        } else {
            alert("Your browser does not support Speech Recognition. Please use Chrome or Edge."); //TODO: try with safari to check that the alert works
        }

}

function showexercise5part2(){
    stopAudio("ex5 part1 sentence2");
    console.log("stop audio ex5 part1 sentence2");

    //download text and audio
    if(recognizedText){
        const expectedText = "Expected text: The cat always hid under the couch when dogs were in the room.";
        const textContext = expectedText + "\nRecognized text: " + recognizedText;
        downloadtxt("sentence2", textContext);
    }
    if(audioBlob){
        downloadaudio("sentence2", audioBlob);
    }

    recognizedText = null; // empty for next exercises
    audioBlob = null;

    document.getElementById("exercise5-part12").style.display = "none";
    document.getElementById("exercise5-part2").style.display = "block";

    //functionality
    const startbutton = document.getElementById("start-exercise5-part2");
    const nextbutton = document.getElementById("next-exercise5-part2");
    const status = document.getElementById("recordingStatus");
    const timerElement = document.getElementById("timer");
    playAudio("ex5 part2 fwords");
    setupAudioRecordingTimer(startbutton, nextbutton, status, timerElement);
    

}


function showexercise6(){
    stopAudio("ex5 part2 fwords");
    playAudio("ex6 abstraction");
    if(recognizedText){
        downloadtxt("fwords", recognizedText);
    }
    if(audioBlob){
        downloadaudio("fwords", audioBlob);
    }
    document.getElementById("exercise5-part2").style.display = "none";
    document.getElementById("startButton").style.display = "none"; //TODO QUITAR
    document.getElementById("exercise6").style.display = "block";
}

function showexercise7part1(){
    stopAudio("ex6 abstraction");

    var transport = document.getElementById("textTransport").value;
    var measuring = document.getElementById("textMeasuring").value;
    
    var abstraction = "Train - Bycicle: " + transport + "\nRuler - Watch: " + measuring ;

    downloadtxt("abstraction", abstraction);
    playAudio("ex7 part1 delayedrecall");

    document.getElementById("exercise6").style.display = "none";
    document.getElementById("exercise7-part1").style.display = "block";
}

function showexercise7part2(){
    stopAudio("ex7 part1 delayedrecall");
    
    var word1 = document.getElementById("ex7part1word1").value;
    var word2= document.getElementById("ex7part1word2").value;
    var word3= document.getElementById("ex7part1word3").value;
    var word4= document.getElementById("ex7part1word4").value;
    var word5= document.getElementById("ex7part1word5").value;
    
    const introducedWords = word1 + ", " + word2 + ", " + word3 + ", " + word4 + ", " + word5;
    const expectedWords = ["face", "velvet", "church", "daisy", "red"];
    const containsAllwords = expectedWords.every(word => introducedWords.includes(word));
    
    var delayedrecall1 = "Expected words: "+ expectedWords.join(", ") + "\nIntroduced words: " + introducedWords;
    downloadtxt("delayedrecall1", delayedrecall1);

    document.getElementById("exercise7-part1").style.display = "none";

    if(containsAllwords){ // all words are correct
        showexercise8part1();
    }else{ // some words are not right
        document.getElementById("exercise7-part2").style.display = "block";
        playAudio("ex7 part2 delayedrecall");
    }
}

function showexercise7part3(){
    stopAudio("ex7 part2 delayedrecall");
    
    var word1 = document.getElementById("ex7part2word1").value;
    var word2= document.getElementById("ex7part2word2").value;
    var word3= document.getElementById("ex7part2word3").value;
    var word4= document.getElementById("ex7part2word4").value;
    var word5= document.getElementById("ex7part2word5").value;
    
    const introducedWords = word1 + ", " + word2 + ", " + word3 + ", " + word4 + ", " + word5;
    const expectedWords = ["face", "velvet", "church", "daisy", "red"];
    const containsAllwords = expectedWords.every(word => introducedWords.includes(word));
    
    var delayedrecall2 = "Expected words: "+ expectedWords.join(", ") + "\nIntroduced words: " + introducedWords;
    downloadtxt("delayedrecall2", delayedrecall2);

    document.getElementById("exercise7-part2").style.display = "none";

    if(containsAllwords){ // all words are correct
        showexercise8part1();
    }else{ // some words are not right
        document.getElementById("exercise7-part3").style.display = "block";
        playAudio("ex7 part3 delayedrecall");
    }

}

function showexercise8part1(){
    stopAudio("ex7 part3 delayedrecall");

    var word1 = document.getElementById("ex7part3word1").value;
    var word2= document.getElementById("ex7part3word2").value;
    var word3= document.getElementById("ex7part3word3").value;
    var word4= document.getElementById("ex7part3word4").value;
    var word5= document.getElementById("ex7part3word5").value;
    
    const introducedWords = word1 + ", " + word2 + ", " + word3 + ", " + word4 + ", " + word5;
    const expectedWords = ["face", "velvet", "church", "daisy", "red"];
    
    var delayedrecall3 = "Expected words: "+ expectedWords.join(", ") + "\nIntroduced words: " + introducedWords;
    downloadtxt("delayedrecall3", delayedrecall3);

    document.getElementById("exercise7-part3").style.display = "none";
    document.getElementById("exercise8-part1").style.display = "block";
    playAudio("ex8 part1 date");
}

function showexercise8part2(){
    stopAudio("ex8 part1 date");

    var date = document.getElementById("ex8part1date").value;
    var year = document.getElementById("ex8part1year").value;
    var month = document.getElementById("ex8part1month").value;
    var day = document.getElementById("ex8part1day").value;
    
    var correctAnswer = new Date();
    
    var dateexercise = "Date: " + date + "\nYear: " + year + "\nMonth: " + month + "\nDay of the week: " + day + "\nRight answer: " + correctAnswer;
    downloadtxt("date", dateexercise);

    document.getElementById("exercise8-part1").style.display = "none";
    document.getElementById("exercise8-part2").style.display = "block";

    playAudio("ex8 part2 place");
    cityLocated = "";
    detectUserCity();
}

var cityLocated = "";

function finishTest(){
    stopAudio("ex8 part2 place");
    
    var place = document.getElementById("ex8part2place").value;
    var city = document.getElementById("ex8part2city").value;

    var placeexercise = "Place: " + place + "\nCity: " + city + "\nRight answer: " + cityLocated;
    downloadtxt("place", placeexercise);

    document.getElementById("exercise8-part2").style.display = "none";
    document.getElementById("finishTest").style.display = "block";

}



function detectUserCity() {
    console.log("inside detectUsercity")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Llamada a Nominatim
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
            headers: {
                'User-Agent': 'MocaApp/1.0' // Requerido por Nominatim
            }
        })
        .then(response => response.json())
        .then(data => {
            const address = data.address;
            cityLocated = address.city || address.town || address.village || address.state || "Unknown location";

        })
        .catch(err => {
            console.error("Error fetching city:", err);
        });
    }

    function error(err) {
        console.error("Location error:", err.message);
    }
}








