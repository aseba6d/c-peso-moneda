let InputGramos = document.getElementById("Input_Peso"),
    DenominacionMonedas = document.getElementById("Checkbox_Menu-Denominacion"),
    DenominacionMonedasLabel = document.getElementById("Select"),
    Resultado = document.getElementById("Answer-2"),
    Cantidad = document.getElementById("Answer-1"),
    modal = document.getElementById("Denominacion_Modal"),
    span = document.getElementById("Close_Denominacion"),
    Monedas = document.querySelectorAll('input[name=Moneda]'),
    Moneda = document.querySelector('input[name=Moneda]:checked');

InputGramos.addEventListener('input', cal);
DenominacionMonedas.addEventListener('click', () => {
    if (DenominacionMonedas.checked == true) {
        modal.style.display = "grid";
    } else {
        modal.style.display = "none";
    }
});

Monedas.forEach(rb=>rb.addEventListener("change", function() {
    rb.checked = true;
    Moneda = rb ;
    modal.style.display = "none";
    DenominacionMonedas.checked = false;
    Denominacion();
}));

span.addEventListener('click', () => {
    modal.style.display = "none";
    DenominacionMonedas.checked = false;
    Denominacion();
});

window.addEventListener('click', closemodal);
window.addEventListener('keydown', closemodal);
function closemodal(e) {
    if (e.target === modal || e.keyCode === 27) {
        modal.style.display = "none";
        DenominacionMonedas.checked = false;
        Denominacion();
    }
}
function Denominacion() {
    DenominacionMonedas.value = Moneda.value;
    InputGramos.step = Moneda.value;
    DenominacionMonedas.title = Moneda.title;
    if (8.9554 == Moneda.value) {
        DenominacionMonedasLabel.innerHTML = Moneda.title + '<span class="small-sup"> (Antigua)</span>';
    } else {
        DenominacionMonedasLabel.innerHTML = Moneda.title;
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