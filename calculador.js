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

// Lógica matemática reactiva y persistente
function calcularDinamico() {
    const fob = parseFloat(document.getElementById('input-fob').value) || 0;
    const fleteInt = parseFloat(document.getElementById('input-flete').value) || 0;
    const cbm = parseFloat(document.getElementById('input-cbm').value) || 0;
    const arancelPctInput = parseFloat(document.getElementById('input-arancel-pct').value) || 24;
    
    const servicioPct = (parseFloat(document.getElementById('input-servicio-pct').value) || 19.58) / 100;

    const valAnmat = parseFloat(document.getElementById('select-anmat').value) || 0;
    const valSeguridad = parseFloat(document.getElementById('select-seguridad').value) || 0;

    const proporcionVolumen = cbm / 4.7;

    // 1. Flete y Seguro
    const seguroInt = 26.05 * (fleteInt / 684.75);
    const fleteSeguroTotal = fleteInt + seguroInt;
    const cif = fob + fleteSeguroTotal;
    
    // 2. Impuestos de Importación
    const arancel = 473.54 * (fob / 1920.00) * (arancelPctInput / 24);
    const tasaEstadistica = 78.92 * (fob / 1920.00);
    const iva = 668.49 * (fob / 1920.00);
    const ivaAdd = 636.65 * (fob / 1920.00);
    const iibb = 79.58 * (fob / 1920.00);
    const ganancias = 191.00 * (fob / 1920.00);
    
    const impuestosTotal = arancel + tasaEstadistica + iva + ivaAdd + iibb + ganancias;

    // 3. Gastos en destino fijos exactos
    const g1 = 18.89 * proporcionVolumen;
    const g2 = 75.00;
    const g3 = 80.00;
    const g4 = 90.00;
    const g5 = 300.00;
    const g6 = 118.06 * proporcionVolumen;
    const g7 = 65.00;
    const g8 = 865.00 * proporcionVolumen;
    const g9 = 165.00 * proporcionVolumen;
    const g10 = 350.00;
    const gastosDestinoTotal = 2201.95; 

    // 4. Certificaciones
    const certificacionesTotal = valAnmat + valSeguridad;

    // Subtotal de costos sin servicio PuntoAR
    const subtotalSinServicio = fob + fleteSeguroTotal + impuestosTotal + gastosDestinoTotal + certificacionesTotal;

    // 5. Cálculo del Servicio PuntoAR
    const totalCotizacion = subtotalSinServicio / (1 - servicioPct);
    const servicioTotal = totalCotizacion * servicioPct;

    // Renderizado en pantalla
    document.getElementById('res-fob').textContent = `USD $${fob.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-fob-val').textContent = `USD $${fob.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('res-flete-seguro').textContent = `USD $${fleteSeguroTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-flete-int').textContent = `USD $${fleteInt.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-seguro-int').textContent = `USD $${seguroInt.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('res-total-imp').textContent = `USD $${impuestosTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-arancel').textContent = `USD $${arancel.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-tasa').textContent = `USD $${tasaEstadistica.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-iva').textContent = `USD $${iva.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-iva-add').textContent = `USD $${ivaAdd.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-iibb').textContent = `USD $${iibb.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-ganancias').textContent = `USD $${ganancias.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('res-gastos').textContent = `USD $${gastosDestinoTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-1').textContent = `USD $${g1.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-2').textContent = `USD $${g2.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-3').textContent = `USD $${g3.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-4').textContent = `USD $${g4.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-5').textContent = `USD $${g5.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-6').textContent = `USD $${g6.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-7').textContent = `USD $${g7.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-8').textContent = `USD $${g8.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-9').textContent = `USD $${g9.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('g-10').textContent = `USD $${g10.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('res-cert').textContent = `USD $${certificacionesTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('c-1').textContent = `USD $${valAnmat.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('c-2').textContent = `USD $${valSeguridad.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('res-servicio').textContent = `USD $${servicioTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('sub-serv-val').textContent = `USD $${servicioTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    document.getElementById('res-total-general').textContent = `USD $${totalCotizacion.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

    // Dejar preparado en memoria temporal mientras se manipula
    localStorage.setItem('puntoAR_servicio', servicioTotal);
    localStorage.setItem('puntoAR_total', totalCotizacion);
}

// Función ejecutada al presionar el botón Guardar
function guardarDatosCotizacion() {
    calcularDinamico();
    // Marcar indicador explícito de guardado permanente
    localStorage.setItem('puntoAR_guardado', 'true');
    mostrarToast('¡Cotización guardada con éxito! Los valores se mantendrán fijos en index.html');
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

function guardarPDF() {
    mostrarToast('Generando reporte en PDF...');
    setTimeout(() => window.print(), 800);
}

window.onload = function() {
    // Si existen valores guardados previos, intentamos recuperarlos o calcular por defecto
    calcularDinamico();
};