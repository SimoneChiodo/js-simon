// Testo Esercizio:
//
// Descrizione:
// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// Potete usare liste, input e bottoni non stilizzati, mettendo stampe di debug in console e risultato finale in un alert.
// Solo una volta finito, a piacere e facoltativamente, potete aggiungete lo stile.
//
// NOTA:  non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.
//
// BONUS
//
// Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
// Se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.

const remainingSeconds = document.getElementById("remainingSeconds");
const actualNumber = document.getElementById("actualNumber");
const numerLabel = document.getElementById("numerLabel");
const formNumber = document.getElementById("numberForm");
const inputNumber1 = document.getElementById("Number1");
const inputNumber2 = document.getElementById("Number2");
const inputNumber3 = document.getElementById("Number3");
const inputNumber4 = document.getElementById("Number4");
const inputNumber5 = document.getElementById("Number5");
const inputGuessedNumbers = document.getElementById("guessedNumbers");
const inputWrongNumbers = document.getElementById("wrongNumbers");
const submitButton = document.getElementById("submitButton");
const retryButton = document.getElementById("retryButton");

//Genero i numeri
const numbers = [];
for (let i = 0; i < 5; i++) {
    // Salvo il nuovo numero in una nuova variabile
    let newNumber = generateNumber(10, 99);

    // Controllo che il nuovo numero non sia già stato inserito
    if (!numbers.includes(newNumber)) numbers.push(newNumber);
}

//Mostro i numeri all'utente
actualNumber.textContent = numbers.join(" - ");

// Avvio il timer di 30 secondi
setTimeout(hideNumbersCountdown, 30000);

// Creo una variabile per contare i secondi rimanenti
let countdownSeconds = 29;
// Funzione per aggiornare i secondi rimanenti
const updateCountdown = () => {
    remainingSeconds.textContent = `${countdownSeconds--}s`;

    // Quando arriva a 0 lo elimino
    if (countdownSeconds === -1) {
        // Blocco l'aggiornamento della funzione
        clearInterval(countdown);

        // Rendo invisibile i secondi
        remainingSeconds.classList.add("invisible");
    }
};
// Aggiorno i secondi rimanenti
const countdown = setInterval(updateCountdown, 1000);

// Nascondo i numeri all'utente
function hideNumbersCountdown() {
    //Rendo invisibile i numeri da indovinare
    actualNumber.classList.add("invisible");

    //Cambio il testo della label
    numerLabel.textContent = `Inserisci tutti i numeri che ricordi (l'ordine non è importante)`;

    //Mostro gli input field
    inputNumber1.classList.remove("invisible");
    inputNumber2.classList.remove("invisible");
    inputNumber3.classList.remove("invisible");
    inputNumber4.classList.remove("invisible");
    inputNumber5.classList.remove("invisible");

    //Mostro il pulsante conferma
    submitButton.classList.remove("invisible");
}

// Funzione Submit del Form
formNumber.addEventListener("submit", (e) => {
    // Prevengo l'invio dei dati ed il reload della pagina
    e.preventDefault();

    //Prelevo i numeri dell'utente
    const userNumbers = [];
    userNumbers[0] = inputNumber1.value;
    userNumbers[1] = inputNumber2.value;
    userNumbers[2] = inputNumber3.value;
    userNumbers[3] = inputNumber4.value;
    userNumbers[4] = inputNumber5.value;

    //Modifico i valori
    for (let i = 0; i < 5; i++) {
        numbers[i] = parseInt(numbers[i]);
        userNumbers[i] = parseInt(userNumbers[i]);
    }

    // Variabili per il controllo
    let correctCounter = 0;
    let correctNumbers = [];
    let wrongNumbers = [];

    // Controllo i numeri
    for (let i = 0; i < 5; i++) {
        // Se l'utente ha indovinato un numero
        if (numbers.includes(userNumbers[i])) {
            correctCounter++;
            correctNumbers.push(userNumbers[i]);
        }
        // Se l'utente ha sbagliato un numero
        if (!userNumbers.includes(numbers[i])) wrongNumbers.push(numbers[i]);
    }

    // Mostro il risultato all'utente
    if (correctCounter !== 0) {
        // Scrivo i numeri corretti
        inputGuessedNumbers.textContent = `Hai indovinato ${correctCounter} numeri! (${correctNumbers.join(
            ", "
        )})`;

        //Scrivo i numeri errati (se ce ne sono)
        if (wrongNumbers != 0) {
            inputWrongNumbers.textContent = `(Sbagliati: ${wrongNumbers.join(
                ", "
            )})`;
        }
    } else {
        inputGuessedNumbers.textContent = `Non hai indovinato neanche un numero!`;
    }

    // Mostro il pulsante riprova
    retryButton.classList.remove("invisible");
});

// Funzioe generatrice di numeri
function generateNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
