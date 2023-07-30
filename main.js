function calcularInteresCompuesto(principal, tasaInteres, tiempo, pais) {
  // Código de cálculo del interés compuesto y retención de impuestos
  const montoFinal = principal * Math.pow((1 + tasaInteres), tiempo);
  const interes = montoFinal - principal;
  let retencionImpuestos = 0;

  const impuestosPorPais = {
    "Argentina": 0.15,
    "Estados Unidos": 0.06,
    "Chile": 0.12,
  };

  if (impuestosPorPais.hasOwnProperty(pais)) {
    retencionImpuestos = montoFinal * impuestosPorPais[pais];
  }

  return {
    montoFinal,
    interes,
    retencionImpuestos,
    pais
  };
}

function obtenerResultado(inversiones) {
  let inversionTotal = 0;
  let interesTotal = 0;
  let impuestosTotal = 0;
  const resultados = [];

  inversiones.forEach(inversion => {
    const resultado = calcularInteresCompuesto(inversion.principal, inversion.tasaInteres, inversion.tiempo, inversion.pais);
    resultados.push(resultado);
    inversionTotal += resultado.montoFinal;
    interesTotal += resultado.interes;
    impuestosTotal += resultado.retencionImpuestos;
  });

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <p>Total invertido en todo el mundo: $${inversionTotal.toFixed(2)}</p>
    <p>Interés acumulado en todo el mundo: $${interesTotal.toFixed(2)}</p>
    <p>Impuestos pagados en todo el mundo: $${impuestosTotal.toFixed(2)}</p>
  `;

  // Mostrar resultados almacenados en la tabla
  const tablaResultados = document.getElementById("tablaResultados");
  tablaResultados.innerHTML = ""; // Limpia la tabla antes de mostrar los nuevos resultados

  if (resultados.length > 0) {
    resultados.forEach((calculo, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>$${calculo.montoFinal.toFixed(2)}</td>
        <td>$${calculo.interes.toFixed(2)}</td>
        <td>$${calculo.retencionImpuestos.toFixed(2)}</td>
      `;
      tablaResultados.appendChild(fila);
    });
  }
}

function agregarInversion() {
  const inversionesDiv = document.getElementById("inversiones");
  const numPaises = inversionesDiv.childElementCount + 1;

  const investmentDiv = document.createElement("div");
  investmentDiv.innerHTML = `
    <h2>Inversión en el país ${numPaises}</h2>
    <label for="principal${numPaises}">Monto principal:</label>
    <input type="number" id="principal${numPaises}" required>
    <label for="interestRate${numPaises}">Tasa de interés (como decimal):</label>
    <input type="number" id="interestRate${numPaises}" required step="0.01">
    <label for="years${numPaises}">Tiempo en años:</label>
    <input type="number" id="years${numPaises}" required>
    <label for="country${numPaises}">País (Argentina, Estados Unidos o Chile):</label>
    <select id="country${numPaises}" required>
      <option value="" disabled selected>Seleccionar país</option>
      <option value="Argentina">Argentina</option>
      <option value="Estados Unidos">Estados Unidos</option>
      <option value="Chile">Chile</option>
    </select>
  `;

  inversionesDiv.appendChild(investmentDiv);
}

document.getElementById("agregarInversion").addEventListener("click", agregarInversion);

document.getElementById("calculateBtn").addEventListener("click", () => {
  const inversionesDiv = document.getElementById("inversiones");
  const inversiones = Array.from(inversionesDiv.children).map(investmentDiv => {
    const principal = parseFloat(investmentDiv.querySelector("input[id^='principal']").value);
    const tasaInteres = parseFloat(investmentDiv.querySelector("input[id^='interestRate']").value);
    const tiempo = parseInt(investmentDiv.querySelector("input[id^='years']").value);
    const pais = investmentDiv.querySelector("select").value;

    return { principal, tasaInteres, tiempo, pais };
  });

  obtenerResultado(inversiones);
});

document.getElementById("verCalculosAnteriores").addEventListener("click", () => {
  const calculosAnteriores = JSON.parse(localStorage.getItem("calculosAnteriores")) || [];

  if (calculosAnteriores.length > 0) {
    const tablaResultados = document.getElementById("tablaResultados");
    tablaResultados.innerHTML = ""; // Limpia la tabla antes de mostrar los nuevos resultados

    calculosAnteriores.forEach((calculo, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>$${calculo.montoFinal.toFixed(2)}</td>
        <td>$${calculo.interes.toFixed(2)}</td>
        <td>$${calculo.retencionImpuestos.toFixed(2)}</td>
      `;
      tablaResultados.appendChild(fila);
    });
  } else {
    alert("No hay cálculos anteriores.");
  }
});
