let InputGramos = document.getElementById("Input_Peso"),
    DenominacionMonedas = document.getElementById("Checkbox_Menu-Denominacion"),
    DenominacionMonedasLabel = document.getElementById("Select"),
    Resultado = document.getElementById("Answer-2"),
    Cantidad = document.getElementById("Answer-1"),
    modal = document.getElementById("Denominacion_Modal"),
    span = document.getElementById("Close_Denominacion");

InputGramos.addEventListener('input', cal);
DenominacionMonedas.addEventListener('input', Denominacion);
DenominacionMonedas.addEventListener('input', cal);
DenominacionMonedas.addEventListener('click', () => {
    if (DenominacionMonedas.checked == true) {
        modal.style.display = "grid";
    } else {
        modal.style.display = "none";
    }
});
span.addEventListener('click', () => {
    modal.style.display = "none";
    DenominacionMonedas.checked = false;
    Denominacion();
});

window.addEventListener('click', e => {
    if (e.target == modal) {
        modal.style.display = "none";
        DenominacionMonedas.checked = false;
    }
    Denominacion();
});
function Denominacion() {
    const y = document.querySelector('input[name="Moneda"]:checked');
    DenominacionMonedas.value = y.value;
    InputGramos.step = y.value;
    DenominacionMonedas.title = y.title;
    if (8.9554 == y.value) {
        DenominacionMonedasLabel.innerHTML = y.title + '<span class="small-sup"> (Antigua)</span>';
    } else {
        DenominacionMonedasLabel.innerHTML = y.title;
    }
    cal();
}
function cal() {
    let a,
        x = InputGramos,
        b = DenominacionMonedas.value,
        c = DenominacionMonedas.title,
        d = 0;
    if (x.value >= parseInt(x.max)) {
        x.value = parseInt(x.max);
    }
    if (x.value.length > x.maxLength) {
        x.value = x.value.slice(0, x.maxLength);
    }
    a = x.value;
    if (isNaN(a)) { a = 0 }
    d = Math.round(a / b);
    Cantidad.innerHTML = c + ' x ' + d;
    Resultado.innerHTML = d * c;
}