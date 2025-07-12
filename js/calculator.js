document.addEventListener('DOMContentLoaded', () => {
    const pesoInput = document.getElementById('input-peso');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('denominacion-modal');
    const modalBody = document.querySelector('.modal-body');
    const selectedCoinText = document.getElementById('selected-coin-text');
    const radios = document.querySelectorAll('input[name="moneda"]');
    const resultadoCantidad = document.getElementById('resultado-cantidad');
    const resultadoTotal = document.getElementById('resultado-total');
    const inputAdornment = document.getElementById('input-adornment');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsDropdown = document.getElementById('settings-dropdown');
    const coinVisibilityToggles = document.querySelectorAll('.coin-visibility-toggle');
    // Nuevas constantes para los radios del método de cálculo
    const calculationMethodRadios = document.querySelectorAll('input[name="calculation-method"]');
    const pesoLegend = document.getElementById('peso-legend'); // Referencia al legend del input

    function updatePesoInputStep() {
        const monedaSeleccionada = document.querySelector('input[name="moneda"]:checked');
        const selectedMethod = document.querySelector('input[name="calculation-method"]:checked').value;
        if (monedaSeleccionada) {
            const pesoMoneda = parseFloat(monedaSeleccionada.value);
            // const denominacion = parseFloat(monedaSeleccionada.dataset.denominacion.match(/[\d\.]+/)[0]); // No se usa aquí

            if (selectedMethod === 'weight-to-value') {
                pesoInput.step = pesoMoneda.toFixed(4);
            } else if (selectedMethod === 'value-to-weight') {
                // Para el valor, el paso debe ser 1 (números enteros)
                pesoInput.step = '1';
            } else if (selectedMethod === 'quantity-to-value') {
                // Para la cantidad, el paso debe ser 1 (monedas enteras)
                pesoInput.step = '1';
            }
        } else {
            pesoInput.step = 'any';
        }
    }

    function calcular() {
        const selectedMethod = document.querySelector('input[name="calculation-method"]:checked').value;
        let inputValue = parseFloat(pesoInput.value);

        if (isNaN(inputValue) || inputValue < 0) {
            resultadoCantidad.textContent = `0 monedas`;
            resultadoTotal.textContent = '$0';
            return;
        }

        const monedaSeleccionada = document.querySelector('input[name="moneda"]:checked');
        if (!monedaSeleccionada) {
            resultadoCantidad.textContent = `0 monedas`;
            resultadoTotal.textContent = '$0';
            return;
        }

        const pesoMoneda = parseFloat(monedaSeleccionada.value);
        const denominacion = parseFloat(monedaSeleccionada.dataset.denominacion.match(/[\d\.]+/)[0]);

        if (pesoMoneda <= 0 && selectedMethod !== 'quantity-to-value') { // Solo si el peso es relevante para el cálculo
            resultadoCantidad.textContent = `0 monedas`;
            resultadoTotal.textContent = '$0';
            return;
        }

        let cantidadMonedas = 0;
        let valorTotal = 0;
        let pesoCalculado = 0;

        if (selectedMethod === 'weight-to-value') {
            // Método 1: Peso a Cantidad/$ (actual)
            cantidadMonedas = Math.round(inputValue / pesoMoneda);
            valorTotal = cantidadMonedas * denominacion;
            resultadoCantidad.textContent = `${cantidadMonedas} monedas`; // Se elimina toLocaleString para no añadir formato de miles
            resultadoTotal.textContent = `$${valorTotal}`; // Se elimina toLocaleString para no añadir formato de miles
        } else if (selectedMethod === 'value-to-weight') {
            // Método 2: $ a Cantidad/Peso
            valorTotal = inputValue;
            cantidadMonedas = Math.floor(valorTotal / denominacion); // Cantidad de monedas enteras
            pesoCalculado = parseFloat((cantidadMonedas * pesoMoneda).toFixed(4)); // Peso hasta 4 decimales, luego parseFloat para eliminar ceros al final

            resultadoCantidad.textContent = `${cantidadMonedas} monedas`; // Se elimina toLocaleString para no añadir formato de miles
            resultadoTotal.textContent = `${pesoCalculado} g`; // Se elimina toLocaleString para no añadir formato de miles
        } else if (selectedMethod === 'quantity-to-value') {
            // Método 3: Cantidad a $/Peso
            cantidadMonedas = Math.floor(inputValue); // Cantidad de monedas enteras
            valorTotal = cantidadMonedas * denominacion;
            pesoCalculado = parseFloat((cantidadMonedas * pesoMoneda).toFixed(4)); // Peso hasta 4 decimales, luego parseFloat para eliminar ceros al final

            resultadoCantidad.textContent = `$${valorTotal}`; // Se elimina toLocaleString para no añadir formato de miles
            resultadoTotal.textContent = `${pesoCalculado} g`; // Se elimina toLocaleString para no añadir formato de miles
        }
    }

    function updateVisibleCoins() {
        let isSelectedCoinVisible = false;
        const currentSelectedRadio = document.querySelector('input[name="moneda"]:checked');
        let visibleCoinCount = 0;
        let firstVisibleCoin = null; // Variable para la primera moneda visible

        // Obtener referencias a los toggles y opciones de monedas de 100 pesos
        const toggle100Normal = document.querySelector('.coin-visibility-toggle[value="100"]');
        const toggle100_100y = document.querySelector('.coin-visibility-toggle[value="100-100y"]');
        const toggle100Antigua = document.querySelector('.coin-visibility-toggle[value="100-antigua"]');
        const coinOption100Normal = document.querySelector('.coin-option[data-coin-id="100"]');
        const coinOption100_100y = document.querySelector('.coin-option[data-coin-id="100-100y"]');
        const coinOption100Combo = document.querySelector('.coin-option[data-coin-id="100-100y-combo"]');
        const coinOption100Antigua = document.querySelector('.coin-option[data-coin-id="100-antigua"]');

        // 1. Ocultar todas las opciones de monedas inicialmente
        document.querySelectorAll('.modal-body .coin-option').forEach(option => {
            option.style.display = 'none';
        });

        // 2. Manejar las variantes de 100 pesos según su lógica específica
        if (toggle100Normal && toggle100_100y && toggle100Normal.checked && toggle100_100y.checked) {
            // Si ambas (nueva y 100 años) están marcadas, mostrar la opción combinada
            if (coinOption100Combo) coinOption100Combo.style.display = 'block';
        } else {
            // De lo contrario, mostrarlas individualmente si están marcadas
            if (toggle100Normal && toggle100Normal.checked && coinOption100Normal) coinOption100Normal.style.display = 'block';
            if (toggle100_100y && toggle100_100y.checked && coinOption100_100y) coinOption100_100y.style.display = 'block';
        }
        // Siempre manejar la moneda de 100 antigua por separado
        if (toggle100Antigua && toggle100Antigua.checked && coinOption100Antigua) coinOption100Antigua.style.display = 'block';

        // 3. Manejar todas las demás monedas según sus toggles individuales
        coinVisibilityToggles.forEach(toggle => {
            const coinId = toggle.value;
            // Solo procesar si NO es una de las variantes de 100 pesos, ya que esas se manejan arriba
            if (!['100', '100-100y', '100-antigua', '100-100y-combo'].includes(coinId)) {
                const coinOption = document.querySelector(`.coin-option[data-coin-id="${coinId}"]`);
                if (coinOption) {
                    coinOption.style.display = toggle.checked ? 'block' : 'none';
                }
            }
        });

        // El resto de la función permanece igual
        document.querySelectorAll('.modal-body .coin-option').forEach(coinOption => {
            if (coinOption.style.display === 'block') {
                visibleCoinCount++;
                if (!firstVisibleCoin) firstVisibleCoin = coinOption;
                if (currentSelectedRadio && coinOption.contains(currentSelectedRadio)) {
                    isSelectedCoinVisible = true;
                }
            }
        });
        if (!isSelectedCoinVisible) {
            if (toggle100Normal.checked && coinOption100Normal && coinOption100Normal.style.display === 'block') {
                const radio100Normal = coinOption100Normal.querySelector('input[type="radio"]');
                radio100Normal.checked = true;
                selectedCoinText.textContent = `$${radio100Normal.dataset.denominacion}`;
            } else if (firstVisibleCoin) {
                const newRadio = firstVisibleCoin.querySelector('input[type="radio"]');
                newRadio.checked = true;
                selectedCoinText.textContent = `$${newRadio.dataset.denominacion}`;
            } else {
                selectedCoinText.textContent = `Ninguna`;
            }
        } else {
            if (currentSelectedRadio) {
                selectedCoinText.textContent = `$${currentSelectedRadio.dataset.denominacion}`;
            }
        }

        // Lógica para cambiar el número de columnas basado en el ancho de la ventana y la cantidad de monedas visibles
        if (window.innerWidth >= 1280) { // Desktop
            modalBody.style.gridTemplateColumns = visibleCoinCount > 6 ? 'repeat(4, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))';
            modal.querySelector('.modal-content').style.maxWidth = visibleCoinCount > 6 ? '64rem' : '48rem';
        } else if (window.innerWidth >= 1024) { // Laptop
            modalBody.style.gridTemplateColumns = visibleCoinCount > 6 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))';
            modal.querySelector('.modal-content').style.maxWidth = '48rem'; // Mantener el ancho para 2 o 3 columnas
        } else { // Mobile (default)
            modalBody.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
            modal.querySelector('.modal-content').style.maxWidth = '24rem';
        }
        calcular();
    }

    // Función para actualizar el adorno del input y el legend
    function updateInputAdornmentAndLegend() {
        const selectedMethod = document.querySelector('input[name="calculation-method"]:checked').value;
        
        // Borrar el input al cambiar de método
        pesoInput.value = ''; 

        if (selectedMethod === 'weight-to-value') {
            inputAdornment.textContent = 'g';
            pesoLegend.textContent = 'Peso';
            pesoInput.placeholder = '0';
        } else if (selectedMethod === 'value-to-weight') {
            inputAdornment.textContent = '$';
            pesoLegend.textContent = 'Valor';
            pesoInput.placeholder = '0';
        } else if (selectedMethod === 'quantity-to-value') {
            inputAdornment.textContent = 'cantidad';
            pesoLegend.textContent = 'Cantidad';
            pesoInput.placeholder = '0';
        }
        // Llamar a calcular para actualizar los resultados con el nuevo método
        calcular();
        // También actualizar el paso del input
        updatePesoInputStep();
    }

    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsDropdown.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
        if (!settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
            settingsDropdown.classList.remove('open');
        }
    });

    // Listener para los cambios en el método de cálculo
    calculationMethodRadios.forEach(radio => {
        radio.addEventListener('change', updateInputAdornmentAndLegend);
    });

    inputAdornment.textContent = 'g'; // Valor inicial por defecto

    const toggle100Normal = document.querySelector('.coin-visibility-toggle[value="100"]');
    const toggle100_100y = document.querySelector('.coin-visibility-toggle[value="100-100y"]');
    const toggle100Antigua = document.querySelector('.coin-visibility-toggle[value="100-antigua"]');
    const ensureOne100Selected = () => {
        if (!toggle100Normal.checked && !toggle100_100y.checked && !toggle100Antigua.checked) {
            toggle100Normal.checked = true;
        }
        updateVisibleCoins();
    };
    if (toggle100Normal) toggle100Normal.addEventListener('change', ensureOne100Selected);
    if (toggle100_100y) toggle100_100y.addEventListener('change', ensureOne100Selected);
    if (toggle100Antigua) toggle100Antigua.addEventListener('change', ensureOne100Selected);
    coinVisibilityToggles.forEach(toggle => {
        // La condición se ha movido dentro del bloque para asegurar que solo se aplique a las monedas no-100
        if (!['100', '100-100y', '100-antigua', '100-100y-combo'].includes(toggle.value)) {
            toggle.addEventListener('change', updateVisibleCoins);
        }
    });
    pesoInput.addEventListener('input', () => {
        let value = pesoInput.value;
        const selectedMethod = document.querySelector('input[name="calculation-method"]:checked').value;

        // Limitar la longitud del input a 9 caracteres
        if (value.length > 9) {
            value = value.slice(0, 9);
            pesoInput.value = value;
        }

        if (value === '') {
            calcular();
            return;
        }
        
        let numericValue = parseFloat(value);
        if (isNaN(numericValue) || numericValue < 0) numericValue = 0;

        if (selectedMethod === 'weight-to-value') {
            if (numericValue > 9999.9999) numericValue = 9999.9999;
            const parts = value.split('.');
            if (!isNaN(parseFloat(value)) && parts.length > 1 && parts[1].length > 4) {
                numericValue = parseFloat(numericValue.toFixed(4));
            }
        } else if (selectedMethod === 'value-to-weight') {
            // Para el valor, solo permitir números enteros (sin decimales)
            numericValue = Math.floor(numericValue);
            if (numericValue > 9999999) numericValue = 9999999;
        } else if (selectedMethod === 'quantity-to-value') {
            // Para la cantidad, solo permitir números enteros (sin decimales)
            numericValue = Math.floor(numericValue);
            if (numericValue > 9999) numericValue = 9999;
        }

        // Al asignar el valor de vuelta al input, se usa .toString() para evitar cualquier formato de miles.
        // Si el navegador aún muestra puntos, es un comportamiento de formato automático del input de tipo "number".
        pesoInput.value = numericValue.toString();
        calcular();
    });
    openModalBtn.addEventListener('click', () => modal.classList.add('is-open'));
    closeModalBtn.addEventListener('click', () => modal.classList.remove('is-open'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('is-open');
    });
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            selectedCoinText.textContent = `$${radio.dataset.denominacion}`;
            updatePesoInputStep();
            calcular();
            setTimeout(() => modal.classList.remove('is-open'), 150);
        });
    });
    // Inicializar el adorno del input y el legend al cargar la página
    updateInputAdornmentAndLegend();
    updatePesoInputStep();
    updateVisibleCoins();
    calcular();
    window.addEventListener('resize', () => {
        updateVisibleCoins();
    });
});