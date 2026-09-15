// Menú flotante de navegación
document.addEventListener("DOMContentLoaded", () => {
    const botonMenu = document.getElementById("boton-menu");
    const menuSecciones = document.getElementById("menu-secciones");

    if (!botonMenu || !menuSecciones) return;

    function abrirMenu() {
        menuSecciones.classList.add("abierto");
        botonMenu.setAttribute("aria-expanded", "true");
    }

    function cerrarMenu() {
        menuSecciones.classList.remove("abierto");
        botonMenu.setAttribute("aria-expanded", "false");
    }

    botonMenu.addEventListener("click", () => {
        const estaAbierto = menuSecciones.classList.contains("abierto");
        estaAbierto ? cerrarMenu() : abrirMenu();
    });

    menuSecciones.querySelectorAll("a").forEach((enlace) => {
        enlace.addEventListener("click", cerrarMenu);
    });

    document.addEventListener("click", (evento) => {
        if (!evento.target.closest(".menu-flotante")) {
            cerrarMenu();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") cerrarMenu();
    });
});

// Carrusel
document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.getElementById("carrusel-proyectos");
    if (!carrusel) return;
    const items = Array.from(
        carrusel.querySelectorAll(".carrusel__item")
    );
    function abrirDialog(id) {
        const dialog = document.getElementById(id);
        if (!dialog) return;
        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        }
    }

    function obtenerItemCentral() {
        const centroCarrusel =
            carrusel.scrollLeft +
            carrusel.clientWidth / 2;

        let itemCentral = null;
        let distanciaMinima = Infinity;

        items.forEach(item => {
            const centroItem =
                item.offsetLeft +
                item.offsetWidth / 2;
            const distancia =
                Math.abs(centroCarrusel - centroItem);
            if (distancia < distanciaMinima) {
                distanciaMinima = distancia;
                itemCentral = item;
            }
        });

        return itemCentral;
    }

    function actualizarCarrusel() {
        const itemCentral = obtenerItemCentral();
        if (!itemCentral) return;
        const indiceCentral =
            items.indexOf(itemCentral);
        items.forEach((item, indice) => {
            item.classList.remove(
                "activa",
                "anterior",
                "siguiente"
            );
            if (indice === indiceCentral) {
                item.classList.add("activa");
            } else if (indice < indiceCentral) {
                item.classList.add("anterior");
            } else {
                item.classList.add("siguiente");
            }
        });
    }

    function centrarItem(item) {
        if (!item) return;
        const posicion =
            item.offsetLeft -
            (carrusel.clientWidth / 2) +
            (item.offsetWidth / 2);
        carrusel.scrollTo({
            left: posicion,
            behavior: "smooth"
        });
    }

    items.forEach(item => {

        item.addEventListener("click", (event) => {
            if (
                event.target.closest(".proyecto__boton")
            ) {
                return;
            }

            centrarItem(item);
        });
    });

    const botones =
        carrusel.querySelectorAll(
            ".proyecto__boton"
        );

    botones.forEach(boton => {

        boton.addEventListener("click", (event) => {

            event.stopPropagation();

            const dialogId =
                boton.dataset.dialogOpen;

            abrirDialog(dialogId);
        });
    });


    let scrollTimer;

    carrusel.addEventListener("scroll", () => {
        actualizarCarrusel();
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (!carrusel.classList.contains("arrastrando")) {
                const itemCentral =
                    obtenerItemCentral();
                centrarItem(itemCentral);
            }
        }, 120);
    });

    let arrastrando = false;
    let inicioX = 0;
    let scrollInicial = 0;


    carrusel.addEventListener("mousedown", (event) => {
        if (
            event.target.closest(".proyecto__boton")
        ) {
            return;
        }
        arrastrando = true;
        carrusel.classList.add("arrastrando");
        inicioX = event.pageX;
        scrollInicial = carrusel.scrollLeft;
    });


    window.addEventListener("mousemove", (event) => {
        if (!arrastrando) return;
        event.preventDefault();
        const desplazamiento =
            event.pageX - inicioX;
        carrusel.scrollLeft =
            scrollInicial - desplazamiento;
    });


    window.addEventListener("mouseup", () => {
        if (!arrastrando) return;
        arrastrando = false;
        carrusel.classList.remove("arrastrando");
        const itemCentral =
            obtenerItemCentral();

        centrarItem(itemCentral);
    });

    carrusel.addEventListener("touchend", () => {
        setTimeout(() => {
            const itemCentral =
                obtenerItemCentral();
            centrarItem(itemCentral);
        }, 50);
    });

    const proyectoInicial =
        items.find(
            item => item.dataset.nombre === "HAPPY BREAK"
        );

    if (proyectoInicial) {
        requestAnimationFrame(() => {
            centrarItem(proyectoInicial);
            actualizarCarrusel();
        });

    } else {

        actualizarCarrusel();

    }

});

// Contacto
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-dialog-open]:not(.proyecto__boton)").forEach((boton) => {
        boton.addEventListener("click", () => {
            const dialog = document.getElementById(boton.getAttribute("data-dialog-open"));
            if (dialog && typeof dialog.showModal === "function") {
                dialog.showModal();
            }
        });
    });

});

// Contacto
document.addEventListener("DOMContentLoaded", () => {

    document
        .querySelectorAll("[data-dialog-open]:not(.proyecto__boton)")
        .forEach((boton) => {
            boton.addEventListener("click", () => {
                const dialog = document.getElementById(
                    boton.getAttribute("data-dialog-open")
                );
                if (dialog && typeof dialog.showModal === "function") {
                    dialog.showModal();
                }
            });
        });
});