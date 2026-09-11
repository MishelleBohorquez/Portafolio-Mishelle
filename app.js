document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CARRUSEL DE PROYECTOS
       ===================================================== */

    const carrusel = document.getElementById("carrusel-proyectos");

    if (!carrusel) return;

    const items = Array.from(
        carrusel.querySelectorAll(".carrusel__item")
    );


    /* =====================================================
       ABRIR DIALOG
       ===================================================== */

    function abrirDialog(id) {

        const dialog = document.getElementById(id);

        if (!dialog) return;

        if (typeof dialog.showModal === "function") {
            dialog.showModal();
        }
    }


    /* =====================================================
       CALCULAR QUÉ TARJETA ESTÁ EN EL CENTRO
       ===================================================== */

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


    /* =====================================================
       ACTUALIZAR ESTADOS VISUALES
       ===================================================== */

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


    /* =====================================================
       CENTRAR UNA TARJETA
       ===================================================== */

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


    /* =====================================================
       CLICK EN LAS TARJETAS
       ===================================================== */

    items.forEach(item => {

        item.addEventListener("click", (event) => {

            /*
                Si el usuario hizo click directamente
                en el botón, no volvemos a centrar.
            */
            if (
                event.target.closest(".proyecto__boton")
            ) {
                return;
            }

            centrarItem(item);
        });
    });


    /* =====================================================
       BOTONES DE LOS PROYECTOS
       ===================================================== */

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


    /* =====================================================
       DETECTAR SCROLL
       ===================================================== */

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


    /* =====================================================
       ARRASTRAR CON MOUSE
       ===================================================== */

    let arrastrando = false;

    let inicioX = 0;

    let scrollInicial = 0;


    carrusel.addEventListener("mousedown", (event) => {

        /*
            Si se pulsa un botón,
            no iniciamos el drag.
        */
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


    /* =====================================================
       TOUCH / CELULAR
       ===================================================== */

    /*
        El navegador ya permite el desplazamiento
        horizontal con touch gracias a overflow-x.
        Solo nos aseguramos de actualizar el estado.
    */

    carrusel.addEventListener("touchend", () => {

        setTimeout(() => {

            const itemCentral =
                obtenerItemCentral();

            centrarItem(itemCentral);

        }, 50);
    });


    /* =====================================================
       INICIAR CON HAPPY BREAK EN EL CENTRO
       ===================================================== */

    const proyectoInicial =
        items.find(
            item => item.dataset.nombre === "HAPPY BREAK"
        );

    if (proyectoInicial) {

        /*
            Esperamos a que el navegador haya calculado
            correctamente los tamaños.
        */

        requestAnimationFrame(() => {

            centrarItem(proyectoInicial);

            actualizarCarrusel();

        });

    } else {

        actualizarCarrusel();

    }

});