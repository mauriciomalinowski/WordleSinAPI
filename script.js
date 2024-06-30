let intentos = 6;
let palabras = [
    "APPLE", "BANJO", "CRISP", "DRIVE", "EAGLE",
    "FLUTE", "GRAPE", "HONEY", "IGLOO", "JUMPY",
    "KRAUT", "LEMON", "MANGO", "NOBLE", "OPERA",
    "PLUMB", "QUART", "RAVEN", "SHINE", "TRUST",
    "UNITY", "VIVID", "WAVES", "XENON", "YEAST",
    "ZEBRA"
];

let palabra = palabras[Math.floor(Math.random() * palabras.length)];

let button = document.getElementById("guess-button");
let retryButton = document.getElementById("retry-button");

function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO.length !== 5) {
        alert("LA PALABRA DEBE TENER 5 LETRAS.");
        return;
    }

    const grid = document.getElementById("grid");
    const row = document.createElement("div");
    row.className = "row";

    if (INTENTO === palabra) {
        terminar("🎉 ¡GANASTE! 🎉");
        return;
    }

    for (let i = 0; i < palabra.length; i++) {
        const span = document.createElement("span");
        span.className = "letter";

        if (INTENTO[i] === palabra[i]) {
            span.classList.add("correct");
        } else if (palabra.includes(INTENTO[i])) {
            span.classList.add("present");
        } else {
            span.classList.add("absent");
        }

        span.textContent = INTENTO[i];
        row.appendChild(span);
    }

    grid.appendChild(row);
    intentos--;

    if (intentos === 0) {
        terminar("😢 ¡PERDISTE! 😢");
        retryButton.style.display = "inline"; 
    }
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value.trim().toUpperCase();
    return intento;
}

button.addEventListener("click", intentar);

retryButton.addEventListener("click", () => {
    intentos = 6;
    document.getElementById("grid").innerHTML = ""; 
    document.getElementById("guesses").innerHTML = ""; 
    document.getElementById("guess-input").value = "";
    retryButton.style.display = "none";
    document.getElementById("guess-input").disabled = false; 
    button.disabled = false; 
});

function terminar(mensaje) {
    const input = document.getElementById("guess-input");
    input.disabled = true;
    button.disabled = true;
    const contenedor = document.getElementById("guesses");
    contenedor.innerHTML = `<h1>${mensaje}</h1>`;
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⬅️', '🆗']
    ];

    rows.forEach(row => {
        const rowElement = document.createElement("div");
        rowElement.className = "keyboard-row";

        row.forEach(key => {
            const keyElement = document.createElement("div");
            keyElement.className = "key";
            keyElement.textContent = key;
            if (key === '⬅️') {
                keyElement.classList.add("wide");
                keyElement.addEventListener("click", () => {
                    const input = document.getElementById("guess-input");
                    input.value = input.value.slice(0, -1);
                });
            } else if (key === '🆗') {
                keyElement.classList.add("wide");
                keyElement.addEventListener("click", intentar);
            } else {
                keyElement.addEventListener("click", () => {
                    const input = document.getElementById("guess-input");
                    if (input.value.length < 5) {
                        input.value += key;
                    }
                });
            }
            rowElement.appendChild(keyElement);
        });

        keyboard.appendChild(rowElement);
    });
}

createKeyboard();


