const carrusel = document.getElementById('carrusel-proyectos');
const tarjetas = carrusel.querySelectorAll('.carrusel__item');
const botonActual = document.getElementById('boton-proyecto-actual');

function actualizarTarjetaActiva() {
    const centroCarrusel = carrusel.scrollLeft + carrusel.clientWidth / 2;
    let masCercana = null;
    let menorDistancia = Infinity;

    tarjetas.forEach((tarjeta) => {
        const centroTarjeta = tarjeta.offsetLeft + tarjeta.clientWidth / 2;
        const distancia = Math.abs(centroTarjeta - centroCarrusel);
        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            masCercana = tarjeta;
        }
        tarjeta.classList.remove('activa');
    });

    if (masCercana) {
        masCercana.classList.add('activa');
        botonActual.textContent = masCercana.dataset.nombre;
        botonActual.setAttribute('data-dialog-open', masCercana.dataset.dialog);
    }
}

carrusel.addEventListener('scroll', () => {
    window.requestAnimationFrame(actualizarTarjetaActiva);
});

let arrastrando = false;
let posicionInicialX = 0;
let scrollInicial = 0;

carrusel.addEventListener('pointerdown', (evento) => {
    arrastrando = true;
    carrusel.classList.add('arrastrando');
    posicionInicialX = evento.clientX;
    scrollInicial = carrusel.scrollLeft;
    carrusel.setPointerCapture(evento.pointerId);
});

carrusel.addEventListener('pointermove', (evento) => {
    if (!arrastrando) return;
    const distanciaRecorrida = evento.clientX - posicionInicialX;
    carrusel.scrollLeft = scrollInicial - distanciaRecorrida;
});

['pointerup', 'pointercancel', 'pointerleave'].forEach((evento) => {
    carrusel.addEventListener(evento, () => {
        arrastrando = false;
        carrusel.classList.remove('arrastrando');
    });
});

actualizarTarjetaActiva();