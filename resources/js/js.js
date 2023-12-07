const InputGramos = document.getElementById("Input-Number");
let InputMoneda = document.getElementById("Input-Text");
let Resultado = document.getElementById("Answer-Text");
const BoxOption = document.getElementById("Option-Box");
const ButtonOnOff = document.getElementById("Box-Select");
const RadioBox = document.getElementById("Box-Option");
let MonedaOk = document.querySelectorAll('input[name="Moneda"]');
const MonedasLista = [[3.5, 10], [6.988, 50], [7.56, 100], [8.9554, 100], [6.505, 500]]

InputGramos.addEventListener("keyup", cal);
InputGramos.addEventListener("change", cal);
InputMoneda.addEventListener("change", cal);
ButtonOnOff.addEventListener("click", SelectBox);
RadioBox.addEventListener("click", OptionDatos);

function cal() {
    let a = parseInt(InputGramos.value),
        b = parseFloat(InputMoneda.value),
        c = parseInt(InputMoneda.name);

    if (isNaN(a)) { a = 0 }
    Resultado.innerHTML = Math.round(a / b) * c;
};
function SelectBox() {
    BoxOption.classList.toggle("Option-Off");
}
function OptionDatos() {
    for (let i = 0; i < MonedaOk.length; i++) {
        if (MonedaOk[i].checked) {
            InputMoneda.value = MonedaOk[i].value;
            for (let y = 0; y < MonedasLista.length; y++) {
                if (MonedasLista[y][0] == InputMoneda.value) {
                    if (MonedasLista[3][0] == MonedasLista[y][0]) {
                        document.getElementById("Label-Option").innerHTML = MonedasLista[y][1] + '<span class="small-sup"> (Antigua)</span>';
                        InputMoneda.name = MonedasLista[y][1];
                        BoxOption.classList.add("Option-Off");
                        cal();

                    } else {
                        document.getElementById("Label-Option").innerHTML = MonedasLista[y][1]
                        InputMoneda.name = MonedasLista[y][1];
                        BoxOption.classList.add("Option-Off");
                        cal();

                    }
                    break;
                }
            }
            break;
        }
    }
}