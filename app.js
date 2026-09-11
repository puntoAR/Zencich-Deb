// Sistema de Notificaciones Toast
function mostrarToast(mensaje) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✓</span> ${mensaje}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Estado actual basado en CONFIG
let cantidadUnidades = CONFIG.cantidadInicial;

function cambiarCantidad(cambio) {
    if (cambio !== 0) {
        cantidadUnidades += cambio;
        if (cantidadUnidades < 1) cantidadUnidades = 1;
    }

    document.getElementById('input-qty').value = cantidadUnidades;
    
    // Proporción basada en la cantidad de unidades
    const proporcion = cantidadUnidades / CONFIG.cantidadInicial;
    
    const nuevoFOB = cantidadUnidades * CONFIG.precioUnitarioFOB;
    
    // Valores base de impuestos fijos para mantener la suma exacta
    const nuevoArancel = 473.54 * proporcion;
    const nuevaTasaEst = 78.92 * proporcion;
    const nuevoIVA = 668.49 * proporcion;
    const nuevoIVAAdd = 636.65 * proporcion;
    const nuevaPercepcionIIBB = 79.58 * proporcion;
    const nuevoGanancias = 191.00 * proporcion;
    const nuevosImpuestos = nuevoArancel + nuevaTasaEst + nuevoIVA + nuevoIVAAdd + nuevaPercepcionIIBB + nuevoGanancias;
    
    // Costos de importación totales (Flete + Impuestos + Gastos + Certificaciones + Servicio)
    const nuevoCostoImportacion = CONFIG.fleteSeguroBase + nuevosImpuestos + CONFIG.gastosDestinoBase + CONFIG.certificacionesBase + CONFIG.servicioPuntoARBase;
    const nuevoTotal = nuevoFOB + nuevoCostoImportacion;
    
    // Recupero fiscal
    const recuperoImpuestosTotal = nuevoIVA + nuevoIVAAdd + nuevaPercepcionIIBB + nuevoGanancias;
    const nuevoCostoRealImportacion = nuevoCostoImportacion - recuperoImpuestosTotal;

    // Liquidación final del plan de pagos (Paso 5)
    const restoServicioPuntoAR = CONFIG.servicioPuntoARBase - CONFIG.anticipoInicial;
    const liquidacionFinal = CONFIG.fleteSeguroBase + CONFIG.gastosDestinoBase + restoServicioPuntoAR;

    // Actualizar pantalla (Página 1)
    document.getElementById('val-fob-item').textContent = `USD $${nuevoFOB.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('val-fob-total').textContent = `USD $${nuevoFOB.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('val-ars-fob').textContent = `≈ $ ${(nuevoFOB * CONFIG.tipoCambioARS).toLocaleString('es-AR')}`;
    
    document.getElementById('val-import-total').textContent = `USD $${nuevoCostoImportacion.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('val-ars-import').textContent = `≈ $ ${(nuevoCostoImportacion * CONFIG.tipoCambioARS).toLocaleString('es-AR')}`;
    
    document.getElementById('val-real-import').textContent = `Tu costo de importación real es USD $${nuevoCostoRealImportacion.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    // Actualizar desglose (Página 2)
    document.getElementById('acc-fob').textContent = `USD $${nuevoFOB.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-item-desc').textContent = `Silla de estética E019-2 (${cantidadUnidades} uds)`;
    document.getElementById('sub-item-val').textContent = `USD $${nuevoFOB.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    document.getElementById('acc-imp').textContent = `USD $${nuevosImpuestos.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('imp-1').textContent = `USD $${nuevoArancel.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('imp-2').textContent = `USD $${nuevaTasaEst.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('imp-3').textContent = `USD $${nuevoIVA.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('imp-4').textContent = `USD $${nuevoIVAAdd.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('imp-5').textContent = `USD $${nuevaPercepcionIIBB.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('imp-6').textContent = `USD $${nuevoGanancias.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('acc-serv').textContent = `USD $${CONFIG.servicioPuntoARBase.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('serv-val').textContent = `USD $${CONFIG.servicioPuntoARBase.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('val-total-general').textContent = `USD $${nuevoTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    
    // Plan de pagos (Página 3)
    document.getElementById('t-step-2').textContent = `USD $${nuevoFOB.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('pay-item-desc').textContent = `Silla de estética E019-2 (${cantidadUnidades} uds)`;
    document.getElementById('pay-item-val').textContent = `USD $${nuevoFOB.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('t-step-4').textContent = `USD $${nuevosImpuestos.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('p-imp-1').textContent = `USD $${nuevoArancel.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('p-imp-2').textContent = `USD $${nuevaTasaEst.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('p-imp-3').textContent = `USD $${nuevoIVA.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('p-imp-4').textContent = `USD $${nuevoIVAAdd.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('p-imp-5').textContent = `USD $${nuevaPercepcionIIBB.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('p-imp-6').textContent = `USD $${nuevoGanancias.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('t-step-5').textContent = `USD $${liquidacionFinal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('p-serv-rest').textContent = `USD $${restoServicioPuntoAR.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('t-total-general').textContent = `USD $${nuevoTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    if (cambio !== 0) {
        mostrarToast(`Cantidad actualizada a ${cantidadUnidades} unidades`);
    }
}

function toggleAccordion(id, btn) {
    const content = document.getElementById(id);
    const arrow = btn.querySelector('.accordion-arrow');
    if (content.style.display === 'block') {
        content.style.display = 'none';
        if (arrow) arrow.textContent = '▼';
    } else {
        content.style.display = 'block';
        if (arrow) arrow.textContent = '▲';
    }
}

// Función interactiva para el plan de pagos ("Ver qué incluye" / "Ocultar detalles")
function togglePaymentDetail(id, btn) {
    const content = document.getElementById(id);

    if (content.style.display === 'block') {
        content.style.display = 'none';
        btn.innerHTML = `Ver qué incluye <span>▼</span>`;
    } else {
        content.style.display = 'block';
        btn.innerHTML = `Ocultar detalles <span>▲</span>`;
    }
}

function guardarPDF() {
    mostrarToast('Generando documento PDF...');
    setTimeout(() => window.print(), 800);
}

// Ejecutar al cargar la página para establecer los valores iniciales correctos
window.onload = function() {
    cambiarCantidad(0);
};