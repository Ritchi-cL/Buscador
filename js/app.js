// Variables para seleccionar los "select" desde el HTML

const marca = document.querySelector("#marca"); // // Selecciona el select "year" del HTML
const year = document.querySelector("#year"); // // Selecciona el select "year" del HTML
const precioMin = document.querySelector("#minimo"); // // Selecciona el select "year" del HTML
const precioMax = document.querySelector("#maximo"); // // Selecciona el select "year" del HTML
const puertas = document.querySelector("#puertas"); // // Selecciona el select "year" del HTML
const transmision = document.querySelector("#transmision"); // // Selecciona el select "year" del HTML
const color = document.querySelector("#color"); // // Selecciona el select "year" del HTML

// Selecciona el div "resultado" del HTML
const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con los datos de búsqueda

const datosBusqueda = {
    marca: "",
    year: "",
    precioMin: "",
    precioMax: "",
    puertas: "",
    transmision: "",
    color: ""
}

// Al momento de cargar el DOM de HTML, se cargarán las siguientes funciones
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos); // Muestra los autos alcargar de "db.js"
    llenarSelect(); // Llena o carga los años
});

// Evento que escuche a los "select" de búsqueda
marca.addEventListener("change", e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
});

year.addEventListener("change", e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
});

precioMin.addEventListener("change", e => {
    datosBusqueda.precioMin = e.target.value;
    filtrarAuto();
});

precioMax.addEventListener("change", e => {
    datosBusqueda.precioMax = e.target.value;
    filtrarAuto();
});

puertas.addEventListener("change", e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
});

transmision.addEventListener("change", e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
});

color.addEventListener("change", e => {
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
});

// Función que imprime el HTML, cargando los autos de "db.js"
function mostrarAutos(autos) {
    
    limpiarHTML(); // Elimina el HTML previo
    autos.forEach(auto => {

        const {marca, modelo, year, puertas, transmision, precio, color } = auto
        const autoHTML = document.createElement("P");

        autoHTML.textContent = `
            Marca: ${marca} - Modelo: ${modelo} - Año: ${year} - Puertas: ${puertas} - Transmisión: ${transmision} - Precio: ${precio} -
            Color: ${color}
        `;

    // Insertar en el HTML lo que tenga "autoHTML"
    resultado.appendChild(autoHTML);

    })
}

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

// Función para generar los años
function llenarSelect() {

    for (let i = max; i > min; i--) { // Decrece en 1 para mostrar arriba el año más reciente
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = i;

        // Inserta en el HTML las "opciones"
        year.appendChild(opcion);
    }

}

//Función para filtrar en base a la búsqueda (reuniendo marca, año)
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor); //Filter soporta encadenamiento
    //console.log(resultado);
    mostrarAutos(resultado);

    if (resultado.length) {
        mostrarAutos(resultado);
    }

    else{
        noResultado();
    }
}

function noResultado() {
    limpiarHTML();
    const noResultado = document.createElement("div");
    noResultado.classList.add("alerta", "error");
    noResultado.textContent = "No hay resultados, intenta con otro parámetro de búsqueda";
    resultado.appendChild(noResultado);
}

//Función para filtrar por marca
function filtrarMarca(auto) {
    const {marca} = datosBusqueda;

    if (marca) {
        return auto.marca === marca;
    }

    return auto;
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;

    if (year) {
        return auto.year === year;
    }

    return auto;
    
}

function filtrarMinimo(auto) {
    const {precioMin} = datosBusqueda;

    if (precioMin) {
        return auto.precio >= precioMin;
    }

    return auto;
}

function filtrarMaximo(auto) {
    const {precioMax} = datosBusqueda;

    if (precioMax) {
        return auto.precio <= precioMax;
    }

    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;

    if (puertas) {
        return auto.puertas === puertas;
    }

    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;

    if (transmision) {
        return auto.transmision === transmision;
    }

    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;

    if (color) {
        return auto.color === color;
    }

    return auto;
}