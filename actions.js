    
    let turno = 1;
    let primeraCarta;
    let segundaCarta;
    let lockBoard = true;
    let intentos = 0;
    let contadorIntentosDisplay;
    let matched = 0;
    let contadorAciertosDisplay;
    let modalInstrucciones;
    let btnIniciarJuego;
    let segundos;
    let minutos;
    let hora;
    let timeInterval;
    let timeDisplay;

    

    function iniciarJuego(event){//esta función escucha evento click en botón para ocultar modal y desbloquear las cartas para iniciar juego.
        modalInstrucciones.classList.add('hidden');
        lockBoard = false;
        console.log("Juego Iniciado");

    }


    function startTimer() {//esta función es el cronómetro para contabilizar cuanto dura el reto.
        segundos++;

        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }
        console.log(minutos , segundos)

        // Actualizar el display
        timeDisplay.textContent = formatTime(minutos) + ":" + formatTime(segundos);
    }

    
    function flipCard(event) {//esta función escucha el evento click, y gira la carta, asigna valor al turno y llama a la siguiente función(CheckForMatch).
        const cardElement = event.currentTarget;
        if (lockBoard || cardElement.classList.contains('is-flipped')) {
            return; 
        }
        cardElement.classList.add('is-flipped');

        if (turno === 1) {
        primeraCarta = cardElement;
        turno = 2;         
        console.log(`[Turno 1] Primera carta: ID ${cardElement.dataset.id}`);
    
    } else if (turno === 2) {
        segundaCarta = cardElement;        
        console.log(`[Turno 2] Segunda carta: ID ${cardElement.dataset.id}`)
        checkForMatch(); 
    }    
    }

    function checkForMatch(){ //esta función convierte los ID en números enteros para realizar la operación y confirmar si son las mismas cartas.
        const id1 = primeraCarta.dataset.id;
        const id2 = segundaCarta.dataset.id;
        const num1 = parseInt(id1);
        const num2 = parseInt(id2);
        const resultado = Math.abs(num1 - num2);   

        intentos++; //conteo de los intentos realizados.
        console.log(`Llevas ${intentos} intentos.`);
        if (contadorIntentosDisplay) {
        contadorIntentosDisplay.textContent = intentos; 
        }

        if (resultado === 0){//conteo de los aciertos obtenidos.
            console.log("obtuviste un punto") 
            matched++;   
            contadorAciertosDisplay.textContent = matched;          
            console.log(matched)
            dejarFijasCards();           
            if (matched === 8) {
            Ganaste();
        }
        } else {
            console.log("No coinciden, vuelve a intentarlo");            
            girarCards();
        }
    }

    function dejarFijasCards() {//deshabilitar EventListeners para que no sean escuchados y cartas queden fijas
            primeraCarta.removeEventListener('click', flipCard);
            segundaCarta.removeEventListener('click', flipCard);
    resetearTurno(); 
    }

    function girarCards(){
    lockBoard = true; // Bloquea los clics
    setTimeout(() => {
        primeraCarta.classList.remove('is-flipped');
        segundaCarta.classList.remove('is-flipped');        
        resetearTurno();
    }, 1000); 
}


    function resetearTurno() { //borramos los IDs de los elementos seleccionados para volver a validar.
    [primeraCarta, segundaCarta] = [null, null];
    turno = 1; 
    lockBoard = false;
    }


   function reiniciarJuego() {//al darle click al botón REINICIAR todo vuelve a cero y su posición inicial.
    console.log("Juego Reiniciado");
    intentos = 0; 
    matched = 0;    
    if (contadorIntentosDisplay) {
        contadorIntentosDisplay.textContent = 0;
        console.log("intentos reiniciados");
    }
    if (contadorAciertosDisplay) {
        contadorAciertosDisplay.textContent = 0;
        console.log("aciertos reiniciados");
    }
    const cards = document.querySelectorAll('.card');    
    cards.forEach(card => {
        card.classList.remove('is-flipped');
        card.addEventListener('click', flipCard);
    });
    resetearTurno();
    console.log("Tablero y juego reseteados completamente.");
    modalInstrucciones.classList.remove('hidden');
}


    document.addEventListener('DOMContentLoaded', () => { 

    modalInstrucciones = document.querySelector('.modal-instrucciones');
    btnIniciarJuego = document.getElementById('btn-iniciar-juego');
    
    if (btnIniciarJuego) {
        btnIniciarJuego.addEventListener("click", iniciarJuego);    
    }    


    timeDisplay = document.getElementById('cronometer');

    if (timeDisplay) {    // Inicializar el display en 00:00
        timeDisplay.textContent = '00:00';
    }


    const cards = document.querySelectorAll('.card'); 
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
    
    contadorIntentosDisplay = document.getElementById('counter-attempts'); 
    if (contadorIntentosDisplay) {
        contadorIntentosDisplay.textContent = 0;    
    }
    
    btnReiniciar = document.querySelector(".btn-restart");
    if (btnReiniciar) {
        btnReiniciar.addEventListener('click', reiniciarJuego);
    } 

    contadorAciertosDisplay = document.getElementById('matched-attempts'); 
     if (contadorAciertosDisplay) {
        contadorAciertosDisplay.textContent = 0;     
    }

    btnIniciarJuego.addEventListener('click', iniciarJuego);


});

function Ganaste() {
   
}