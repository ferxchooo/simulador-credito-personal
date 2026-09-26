document
    .getElementById('btn-calcular')
    .addEventListener('click', procesarSimulacion);


function procesarSimulacion() {

    const montoInput =
        parseFloat(document.getElementById('monto').value);

    const tasaAnualInput =
        parseFloat(document.getElementById('tasa').value) / 100;

    const plazoMeses =
        parseInt(document.getElementById('plazo').value);

    const IVA_VALOR = 0.16;


    // Validación de datos
    if (
        isNaN(montoInput) ||
        isNaN(tasaAnualInput) ||
        montoInput <= 0
    ) {

        alert(
            "Ingrese parámetros numéricos válidos e intente nuevamente."
        );

        return;
    }


    // Capital fijo que se paga cada mes
    const amortizacionCapital =
        montoInput / plazoMeses;


    // Convertir tasa anual a tasa mensual
    const tasaMensualEquivalente =
        tasaAnualInput / 12;


    // Saldo inicial del crédito
    let saldoInsoluto = montoInput;


    // Obtener el cuerpo de la tabla
    const tablaBody =
        document.querySelector('#tabla-amortizacion tbody');


    // Limpiar resultados anteriores
    tablaBody.innerHTML = '';


    // Acumulador del total de pagos
    let acumuladoPagos = 0;


    // Generar cada periodo del crédito
    for (
        let periodo = 1;
        periodo <= plazoMeses;
        periodo++
    ) {

        // Calcular interés sobre el saldo pendiente
        const interesDelPeriodo =
            saldoInsoluto * tasaMensualEquivalente;


        // Calcular IVA sobre los intereses
        const ivaSobreInteres =
            interesDelPeriodo * IVA_VALOR;


        // Calcular pago total del mes
        const pagoMensualTotal =
            amortizacionCapital +
            interesDelPeriodo +
            ivaSobreInteres;


        // Acumular pagos
        acumuladoPagos += pagoMensualTotal;


        // Restar capital pagado al saldo
        saldoInsoluto -= amortizacionCapital;


        // Evitar saldos negativos por redondeo
        if (saldoInsoluto < 0) {
            saldoInsoluto = 0;
        }


        // Crear una nueva fila
        const fila =
            document.createElement('tr');


        fila.innerHTML = `
            <td>${periodo}</td>

            <td>
                $${amortizacionCapital.toFixed(2)}
            </td>

            <td>
                $${interesDelPeriodo.toFixed(2)}
            </td>

            <td>
                $${ivaSobreInteres.toFixed(2)}
            </td>

            <td>
                $${pagoMensualTotal.toFixed(2)}
            </td>

            <td>
                $${saldoInsoluto.toFixed(2)}
            </td>
        `;


        tablaBody.appendChild(fila);
    }


    // Mostrar resumen del crédito
    document.getElementById('resultado').innerHTML = `

        <h2>Resumen del Crédito</h2>

        <p>
            <strong>Monto solicitado:</strong>
            $${montoInput.toFixed(2)}
        </p>

        <p>
            <strong>Tasa anual:</strong>
            ${(tasaAnualInput * 100).toFixed(2)}%
        </p>

        <p>
            <strong>Plazo:</strong>
            ${plazoMeses} meses
        </p>

        <p>
            <strong>Total de pagos:</strong>
            $${acumuladoPagos.toFixed(2)}
        </p>

    `;
}