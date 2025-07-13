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
    const calculationMethodRadios = document.querySelectorAll('input[name="calculation-method"]');
    const pesoLegend = document.getElementById('peso-legend');

    const MAX_DISPLAY_NUMBER_CHARS = 9;
    const MAX_NUMERIC_VALUE_CURRENCY = 999999999;
    const MAX_NUMERIC_VALUE_WEIGHT = 999999999.9999;

    const formatNumberForDisplay = (num, maxDecimals = 4) => parseFloat(num.toFixed(maxDecimals)).toString();

    const resetResultDisplay = (method) => {
        const resetValues = {
            'weight-to-value': { cantidad: '0 monedas', total: '$0' },
            'value-to-weight': { cantidad: '0 monedas', total: '0 g' },
            'quantity-to-value': { cantidad: '$0', total: '0 g' }
        };
        resultadoCantidad.textContent = resetValues[method].cantidad;
        resultadoTotal.textContent = resetValues[method].total;
    };

    const updatePesoInputStep = () => {
        const monedaSeleccionada = document.querySelector('input[name="moneda"]:checked');
        const selectedMethod = document.querySelector('input[name="calculation-method"]:checked').value;
        
        if (monedaSeleccionada && selectedMethod === 'weight-to-value') {
            pesoInput.step = parseFloat(monedaSeleccionada.value).toFixed(4);
        } else {
            pesoInput.step = '1';
        }
    };

    const calcular = () => {
        const selectedMethod = document.querySelector('input[name="calculation-method"]:checked').value;
        let inputValue = parseFloat(pesoInput.value);

        if (isNaN(inputValue) || inputValue < 0) {
            resetResultDisplay(selectedMethod);
            return;
        }

        const monedaSeleccionada = document.querySelector('input[name="moneda"]:checked');
        if (!monedaSeleccionada) {
            resetResultDisplay(selectedMethod);
            return;
        }

        const pesoMoneda = parseFloat(monedaSeleccionada.value);
        const denominacionMatch = monedaSeleccionada.dataset.denominacion.match(/[\d\.]+/);
        const denominacion = denominacionMatch ? parseFloat(denominacionMatch[0]) : 0;

        if (pesoMoneda <= 0 && selectedMethod !== 'quantity-to-value') {
            resetResultDisplay(selectedMethod);
            return;
        }

        let cantidadMonedas = 0;
        let valorTotal = 0;
        let pesoCalculado = 0;

        switch (selectedMethod) {
            case 'weight-to-value':
                cantidadMonedas = Math.round(inputValue / pesoMoneda);
                valorTotal = cantidadMonedas * denominacion;
                resultadoCantidad.textContent = `${cantidadMonedas} monedas`;
                resultadoTotal.textContent = (valorTotal > MAX_NUMERIC_VALUE_CURRENCY || valorTotal.toString().length > MAX_DISPLAY_NUMBER_CHARS) ? `Error` : `$${valorTotal}`;
                break;
            case 'value-to-weight':
                valorTotal = inputValue;
                cantidadMonedas = Math.floor(valorTotal / denominacion);
                pesoCalculado = cantidadMonedas * pesoMoneda;
                resultadoCantidad.textContent = `${cantidadMonedas} monedas`;
                const formattedPesoForDisplayValue = formatNumberForDisplay(pesoCalculado);
                resultadoTotal.textContent = (pesoCalculado > MAX_NUMERIC_VALUE_WEIGHT || formattedPesoForDisplayValue.length > MAX_DISPLAY_NUMBER_CHARS) ? `Error` : `${formattedPesoForDisplayValue} g`;
                break;
            case 'quantity-to-value':
                cantidadMonedas = Math.floor(inputValue);
                valorTotal = cantidadMonedas * denominacion;
                pesoCalculado = cantidadMonedas * pesoMoneda;
                resultadoCantidad.textContent = `$${valorTotal}`;
                const formattedPesoForDisplayQuantity = formatNumberForDisplay(pesoCalculado);
                resultadoTotal.textContent = (pesoCalculado > MAX_NUMERIC_VALUE_WEIGHT || formattedPesoForDisplayQuantity.length > MAX_DISPLAY_NUMBER_CHARS) ? `Error` : `${formattedPesoForDisplayQuantity} g`;
                break;
        }
    };

    const updateVisibleCoins = () => {
        const currentSelectedRadio = document.querySelector('input[name="moneda"]:checked');
        let isSelectedCoinVisible = false;
        let firstVisibleCoin = null;

        const toggle100Normal = document.querySelector('.coin-visibility-toggle[value="100"]');
        const toggle100_100y = document.querySelector('.coin-visibility-toggle[value="100-100y"]');
        const toggle100Antigua = document.querySelector('.coin-visibility-toggle[value="100-antigua"]');
        
        const show100Normal = toggle100Normal && toggle100Normal.checked;
        const show100_100y = toggle100_100y && toggle100_100y.checked;
        const show100Antigua = toggle100Antigua && toggle100Antigua.checked;
        const showCombined100 = show100Normal && show100_100y;

        let visibleCoinCount = 0;

        document.querySelectorAll('.modal-body .coin-option').forEach(option => {
            const coinId = option.dataset.coinId;
            let shouldBeVisible = false;

            if (coinId === '100-100y-combo') {
                shouldBeVisible = showCombined100;
            } else if (coinId === '100') {
                shouldBeVisible = show100Normal && !showCombined100;
            } else if (coinId === '100-100y') {
                shouldBeVisible = show100_100y && !showCombined100;
            } else if (coinId === '100-antigua') {
                shouldBeVisible = show100Antigua;
            } else {
                const toggle = document.querySelector(`.coin-visibility-toggle[value="${coinId}"]`);
                shouldBeVisible = toggle && toggle.checked;
            }

            option.style.display = shouldBeVisible ? 'block' : 'none';

            if (shouldBeVisible) {
                visibleCoinCount++;
                if (!firstVisibleCoin) {
                    firstVisibleCoin = option;
                }
                if (currentSelectedRadio && option.contains(currentSelectedRadio)) {
                    isSelectedCoinVisible = true;
                }
            }
        });

        if (!isSelectedCoinVisible) {
            if (firstVisibleCoin) {
                const newRadio = firstVisibleCoin.querySelector('input[type="radio"]');
                newRadio.checked = true;
                selectedCoinText.textContent = `$${newRadio.dataset.denominacion}`;
            } else {
                selectedCoinText.textContent = `Ninguna`;
            }
        } else if (currentSelectedRadio) {
            selectedCoinText.textContent = `$${currentSelectedRadio.dataset.denominacion}`;
        }

        if (window.innerWidth >= 1280) {
            modalBody.style.gridTemplateColumns = visibleCoinCount > 6 ? 'repeat(4, minmax(0, 1fr))' : 'repeat(3, minmax(0, 1fr))';
            modal.querySelector('.modal-content').style.maxWidth = visibleCoinCount > 6 ? '64rem' : '48rem';
        } else if (window.innerWidth >= 1024) {
            modalBody.style.gridTemplateColumns = visibleCoinCount > 6 ? 'repeat(3, minmax(0, 1fr))' : 'repeat(2, minmax(0, 1fr))';
            modal.querySelector('.modal-content').style.maxWidth = '48rem';
        } else {
            modalBody.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
            modal.querySelector('.modal-content').style.maxWidth = '24rem';
        }
        calcular();
    };

    const updateInputAdornmentAndLegend = () => {
        const selectedMethod = document.querySelector('input[name="calculation-method"]:checked').value;
        
        const methodProperties = {
            'weight-to-value': { adornment: 'g', legend: 'Peso', placeholder: '0', adornmentClass: '' },
            'value-to-weight': { adornment: '$', legend: 'Valor', placeholder: '0', adornmentClass: 'adornment-left' },
            'quantity-to-value': { adornment: 'cantidad', legend: 'Cantidad', placeholder: '0', adornmentClass: '' }
        };

        const props = methodProperties[selectedMethod];

        pesoInput.value = '';
        inputAdornment.textContent = props.adornment;
        pesoLegend.textContent = props.legend;
        pesoInput.placeholder = props.placeholder;

        inputAdornment.classList.toggle('adornment-left', props.adornmentClass === 'adornment-left');
        
        calcular();
        updatePesoInputStep();
    };

    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
            settingsDropdown.classList.remove('open');
        }
    });

    calculationMethodRadios.forEach(radio => {
        radio.addEventListener('change', updateInputAdornmentAndLegend);
    });

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
        if (!['100', '100-100y', '100-antigua', '100-100y-combo'].includes(toggle.value)) {
            toggle.addEventListener('change', updateVisibleCoins);
        }
    });

    pesoInput.addEventListener('input', () => {
        let value = pesoInput.value;
        const selectedMethod = document.querySelector('input[name="calculation-method"]:checked').value;

        if (value.length > MAX_DISPLAY_NUMBER_CHARS) {
            value = value.slice(0, MAX_DISPLAY_NUMBER_CHARS);
            pesoInput.value = value;
        }

        if (value === '') {
            calcular();
            return;
        }
        
        let numericValue = parseFloat(value);
        if (isNaN(numericValue) || numericValue < 0) numericValue = 0;

        if (selectedMethod === 'value-to-weight' || selectedMethod === 'quantity-to-value') {
            numericValue = Math.floor(numericValue);
        }

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

    updateInputAdornmentAndLegend();
    updatePesoInputStep();
    updateVisibleCoins();
    calcular();

    window.addEventListener('resize', updateVisibleCoins);
});