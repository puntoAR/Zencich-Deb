// Configuración de valores base y costos de la cotización PuntoAR
const CONFIG = {
    cantidadInicial: 4,
    precioUnitarioFOB: 480.00,
    servicioPuntoARBase: parseFloat(localStorage.getItem('puntoAR_servicio')) || 2138.238,
    fleteSeguroBase: 710.80,
    gastosDestinoBase: 2201.95,
    certificacionesBase: 1900.00,
    anticipoInicial: 300.00,
    tipoCambioARS: 1530
};
