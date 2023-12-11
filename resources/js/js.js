const InputGramos = document.getElementById("Input-Number"),
BoxOption = document.getElementById("Option-Box"),
BoxVisualMonedaImg = document.getElementById("Box-VisualMoneda");
let InputMoneda = document.getElementById("Input-Text"),
Resultado = document.getElementById("Answer-Text"),
LabelOption = document.getElementById("Label-Option");

function cal() {
    let a = parseInt(InputGramos.value),
        b = parseFloat(InputMoneda.value),
        c = parseInt(InputMoneda.name);

    if (isNaN(a)) { a = 0 }
    Resultado.innerHTML = Math.round(a / b) * c;
};
function ButtonOnOff() {
    BoxOption.classList.toggle("Option-Off");
}
function ButtonOff() {
    BoxOption.classList.add("Option-Off");
}
function OptionDatos(x, y) {
    InputMoneda.value = x.value;
    InputMoneda.name = y;
    if (y == 100 && x.value == 8.9554) {
        LabelOption.innerHTML = y + '<span class="small-sup"> (Antigua)</span>';
    } else {
        LabelOption.innerHTML = y;
    }
    BoxOption.classList.add("Option-Off");
    cal();
}
