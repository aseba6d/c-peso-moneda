let InputGramos = document.getElementById("Input_Peso"),
    DenominacionMonedas = document.getElementById("Checkbox_Menu-Denominacion"),
    DenominacionMonedasLabel = document.getElementById("Text_Select-1"),
    Resultado = document.getElementById("Answer-2"),
    Cantidad = document.getElementById("Answer-1"),
    TemasOk = document.getElementById("Checkbox-Themes"),
    TemasOkLabel = document.getElementById("Text_Select-2");

function cal() {
    let a = parseFloat(InputGramos.value),
        b = parseFloat(DenominacionMonedas.value),
        c = parseInt(DenominacionMonedas.title),
        d = 0;

    if (isNaN(a)) { a = 0 }
    d = Math.round(a / b);
    Cantidad.innerHTML = c + ' x ' + d;
    Resultado.innerHTML = d * c;
}
function Denominacion(y) {
    DenominacionMonedas.value = y.value;
    InputGramos.step =  y.value;
    DenominacionMonedas.title = y.title;
    if (8.9554 == y.value) {
        DenominacionMonedasLabel.innerHTML = y.title + '<span class="small-sup"> (Antigua)</span>';
    } else {
        DenominacionMonedasLabel.innerHTML = y.title;
    }
    cal();
    CheckedOff();
}
function CheckedOff() {
    DenominacionMonedas.checked = true;
    UnidadPeso.checked = true;
    TemasOk.checked = true;
    TemasOk.checked = true;
}
function Themes(z) {
    TemasOk.value = z.value;
    TemasOk.dataset.value = z.dataset.value;
    TemasOk.title =  z.title;
    TemasOkLabel.innerHTML = z.title;
    document.getElementById("csstheme").href="resources/css/themes"+ TemasOk.value + TemasOk.dataset.value +".css";
    TemasOk.checked = true;
}