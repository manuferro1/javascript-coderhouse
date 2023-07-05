function calcularInteresCompuesto(principal, tasaInteres, tiempo, pais) {
    let montoFinal = principal * Math.pow((1 + tasaInteres), tiempo);
    let interes = montoFinal - principal;
    let retencionImpuestos = 0;
  
    if (pais === "Argentina") {
      retencionImpuestos = montoFinal * 0.15;
    } else if (pais === "Estados Unidos") {
      retencionImpuestos = montoFinal * 0.06;
    } else if (pais === "Chile") {
      retencionImpuestos = montoFinal * 0.12;
    }
  
    return {
      montoFinal,
      interes,
      retencionImpuestos
    };
  }
  
  function simuladorInteresCompuesto() {
    alert("Bienvenido al simulador de interés compuesto.");
  
    let continuar = true;
  
    while (continuar) {
      let principal = parseFloat(prompt("Ingrese el monto principal:"));
      let tasaInteres = parseFloat(prompt("Ingrese la tasa de interés (como decimal):"));
      let tiempo = parseInt(prompt("Ingrese el tiempo en años:"));
  
      let pais = prompt("Ingrese el país (Argentina, Estados Unidos o Chile):");
  
      let resultado = calcularInteresCompuesto(principal, tasaInteres, tiempo, pais);
  
      alert("El monto final es: " + resultado.montoFinal.toFixed(2));
      alert("El interés acumulado es: " + resultado.interes.toFixed(2));
  
      if (resultado.retencionImpuestos > 0) {
        alert("Se aplicó una retención de impuestos del " + (resultado.retencionImpuestos / resultado.montoFinal * 100).toFixed(2) + "%: " + resultado.retencionImpuestos.toFixed(2));
      }
  
      let opcion = confirm("¿Desea realizar otra calculación de interés compuesto?");
  
      if (!opcion) {
        continuar = false;
      }
    }
  }
  
  simuladorInteresCompuesto();
  