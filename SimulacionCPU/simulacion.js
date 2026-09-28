let paso = 0;

const totalPasos = 8;

function iniciarSimulacion() {

    paso = 1;

    actualizar();

}


function siguientePaso() {

    if (paso < totalPasos) {

        paso++;

        actualizar();

    }

}


function actualizar() {

    limpiarActivos();


    const titulo =
        document.getElementById("tituloPaso");

    const descripcion =
        document.getElementById("descripcionPaso");


    const numero =
        document.getElementById("numeroPaso");


    const barra =
        document.getElementById("barraProgreso");


    numero.textContent =
        `Paso ${paso} de ${totalPasos}`;


    barra.style.width =
        `${(paso / totalPasos) * 100}%`;



    switch (paso) {


        /* PASO 1 */

        case 1:

            titulo.textContent =
                "1. FETCH — Buscar instrucción";


            descripcion.textContent =
                "El PC contiene la dirección 1000, que corresponde a la siguiente instrucción que debe obtener el CPU.";


            activar("registroPC");


            break;



        /* PASO 2 */

        case 2:

            document.getElementById("mar")
                .textContent = "1000";


            titulo.textContent =
                "2. PC → MAR";


            descripcion.textContent =
                "La dirección almacenada en el PC se copia al registro MAR (Memory Address Register).";


            activar("registroPC");

            activar("registroMAR");


            break;



        /* PASO 3 */

        case 3:

            titulo.textContent =
                "3. MAR → Bus de direcciones";


            descripcion.textContent =
                "El MAR coloca la dirección 1000 en el bus de direcciones para solicitar información a la RAM.";


            activar("registroMAR");

            activar("busDirecciones");

            crearParticula(
                "busDirecciones",
                "1000"
            );


            break;



        /* PASO 4 */

        case 4:

            document.getElementById("mdr")
                .textContent =
                "LOAD R1,2000";


            titulo.textContent =
                "4. RAM → MDR";


            descripcion.textContent =
                "La RAM encuentra la instrucción ubicada en la dirección 1000 y la envía al CPU mediante el bus de datos. La instrucción llega al MDR.";


            activar("ram");

            activar("registroMDR");

            activar("busDatos");


            crearParticula(
                "busDatos",
                "LOAD"
            );


            break;



        /* PASO 5 */

        case 5:

            document.getElementById("ir")
                .textContent =
                "LOAD R1,2000";


            titulo.textContent =
                "5. MDR → IR";


            descripcion.textContent =
                "La instrucción pasa del registro MDR al IR (Instruction Register), donde queda lista para ser decodificada.";


            activar("registroMDR");

            activar("registroIR");


            break;



        /* PASO 6 */

        case 6:

            titulo.textContent =
                "6. DECODE — Decodificación";


            descripcion.textContent =
                "La Unidad de Control interpreta la instrucción LOAD y determina que debe obtenerse el dato almacenado en la dirección 2000.";


            activar("registroIR");


            break;



        /* PASO 7 */

        case 7:

            titulo.textContent =
                "7. EXECUTE — Obtener el dato";


            descripcion.textContent =
                "El CPU solicita a la RAM el dato almacenado en la dirección 2000. La memoria contiene el valor 25.";


            activar("ram");

            activar("busDirecciones");

            activar("busDatos");


            crearParticula(
                "busDirecciones",
                "2000"
            );


            crearParticula(
                "busDatos",
                "25"
            );


            break;



        /* PASO 8 */

        case 8:

            titulo.textContent =
                "8. Resultado";


            descripcion.textContent =
                "El dato 25 llega al CPU mediante el bus de datos y puede almacenarse en un registro para continuar con el procesamiento.";


            activar("registroMDR");

            activar("busDatos");


            document.getElementById("mdr")
                .textContent = "25";


            crearParticula(
                "busDatos",
                "25"
            );


            break;

    }

}



function activar(id) {

    const elemento =
        document.getElementById(id);


    if (elemento) {

        elemento.classList.add("activo");

    }

}



function limpiarActivos() {

    document
        .querySelectorAll(".activo")
        .forEach(elemento => {

            elemento.classList.remove("activo");

        });

}



function crearParticula(busId, texto) {

    const bus =
        document.getElementById(busId);


    const particula =
        document.createElement("div");


    particula.className =
        "particula";


    particula.textContent =
        texto;


    bus.appendChild(particula);


    setTimeout(() => {

        particula.remove();

    }, 1500);

}



/* ENTRADA DESDE TECLADO */

function simularEntrada() {

    limpiarActivos();


    activar("puertos");

    activar("busDatos");


    document.getElementById("tituloPaso")
        .textContent =
        "Entrada desde teclado";


    document.getElementById("descripcionPaso")
        .textContent =
        "El teclado envía un dato al puerto de entrada/salida. El dato viaja mediante el bus de datos hasta el CPU.";


    crearParticula(
        "busDatos",
        "A"
    );

}



/* SALIDA */

function simularSalida() {

    limpiarActivos();


    activar("puertos");

    activar("busDatos");


    document.getElementById("tituloPaso")
        .textContent =
        "Salida hacia un dispositivo";


    document.getElementById("descripcionPaso")
        .textContent =
        "El CPU envía información mediante el bus de datos hacia un dispositivo de salida.";


    crearParticula(
        "busDatos",
        "SALIDA"
    );

}



/* REINICIAR */

function reiniciar() {

    paso = 0;


    document.getElementById("pc")
        .textContent = "1000";


    document.getElementById("mar")
        .textContent = "---";


    document.getElementById("mdr")
        .textContent = "---";


    document.getElementById("ir")
        .textContent = "---";


    document.getElementById("tituloPaso")
        .textContent =
        "Simulación lista";


    document.getElementById("descripcionPaso")
        .textContent =
        'Presiona "Iniciar" para comenzar el ciclo de instrucción.';


    document.getElementById("numeroPaso")
        .textContent =
        "Paso 0 de 8";


    document.getElementById("barraProgreso")
        .style.width = "0%";


    limpiarActivos();

}