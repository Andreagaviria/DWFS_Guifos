///////////////////////////////////elementos////////////////////////////////////////
let botonDesplegable = document.querySelector("#flecha-dropdown");
let sailorDay = document.querySelector("#light");
let sailorNight = document.querySelector("#dark");
let campoBuscar = document.querySelector("#palabraBusqueda");
botonBuscar = document.querySelector("#boton-buscador-palabras");
let botonesTagdeBusqueda;
let clickUsuario;
////////////////////////////////variables///////////////////////////////////////////
var Estado;
//////////////////////////////////event listeners//////////////////////////////////
botonDesplegable.addEventListener("click", mostrarSubmenu);

sailorDay.addEventListener("click", temaClaro);
sailorNight.addEventListener("click", temaOscuro);

campoBuscar.addEventListener("keyup", cambiarEstiloBotonDeBusqueda);
botonBuscar.addEventListener("click", busquedaDeGifs);
document.querySelector(".crear").addEventListener("click", function () {
  localStorage.setItem("click", "crearGifo");
});
document.querySelector(".link").addEventListener("click", function () {
  localStorage.setItem("click", "IrAMisGifs");
});
///////////////////////////////////instanciacion de clases//////////////////////////
let ui = new UI();
let gif = new gifosAPI();
////////////////////////////////funciones/////////////////////////////////////////
function verMasBoton(e) {
  // let tituloDeCadaGif = document.querySelector(".cabecera").textContent.replace("#", "");
  let cabeceraDeCadaGif = e.target.parentElement.parentElement.firstElementChild.firstElementChild.textContent;
  let palabraCamelcase = unCamelCase(cabeceraDeCadaGif.replace("#", ""));
  busquedaDeGifsBotonVerMas(palabraCamelcase);
}

function unCamelCase(str) {
  return (
    str
      // insert a space between lower & upper
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // space before last upper in a sequence followed by lower
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
}

function GetGifs(amount, tipoDePeticion) {
  let serverResponse = gif.getGif(amount);

  serverResponse.then((gifEntrantes) => {
    if (tipoDePeticion === "s") {
      ui.displaySuggestions(gifEntrantes.gif.data);
      setTimeout(function () {
        let botonesVerMas = document.querySelectorAll(".boton-vermas");
        for (let botonsitoAzul of botonesVerMas) {
          botonsitoAzul.addEventListener("click", verMasBoton);
        }
      }, 1000);
    } else {
      ui.displayTrends(gifEntrantes.gif.data);
    }
  });
}

function mostrarSubmenu() {
  let botonDesplegable = document.querySelector("#flecha-dropdown");
  let submenu = document.querySelector(".buttons .submenu");
  console.log(submenu);
  if (botonDesplegable.classList.contains("NoEsVisible")) {
    botonDesplegable.classList.remove("NoEsVisible");
    submenu.style.display = "flex";
  } else {
    botonDesplegable.classList.add("NoEsVisible");
    submenu.style.display = "none";
  }
}

function temaClaro() {
  let estiloDef = document.querySelector(".estiloDefinido"),
    logo = document.querySelector(".logo"),
    lupa = document.querySelector(".lupa");
  estiloDef.href = "./styles/light-theme.css";
  logo.firstElementChild.src = "./images/gifOF_logo.png";
  lupa.firstElementChild.src = "./images/lupa_inactive.svg";
}

function temaOscuro() {
  let estiloDef = document.querySelector(".estiloDefinido");
  (logo = document.querySelector(".logo")), (lupa = document.querySelector(".lupa"));
  estiloDef.href = "./styles/dark-theme.css";
  logo.firstElementChild.src = "./images/gifOF_logo_dark.png";
  lupa.firstElementChild.src = "./images/CombinedShape.svg";
}

function cambiarEstiloBotonDeBusqueda() {
  let estiloDef = document.querySelector(".estiloDefinido");
  if (campoBuscar.value.length > 0) {
    // ui.mostrarOpcionesDeBusqueda();
    if (!contenedorDeOpcionesDeBusqueda.classList.contains("active")) {
      contenedorDeOpcionesDeBusqueda.classList.add("active");
      contenedorDeOpcionesDeBusqueda.classList.remove("inactive");
      ui.mostrarOpcionesDeBusqueda();
      document.querySelector(".buscar").style.marginBottom = "0px";
      document.querySelector(".te-sugerimos").style.display = "none";
    }
    if (estiloDef.href.includes("light")) {
      let botonBuscarEspecifico = botonBuscar.firstElementChild.firstElementChild;
      botonBuscarEspecifico.style.background = "#F7C9F3";
      botonBuscarEspecifico.style.boxShadow = "inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF";
      botonBuscarEspecifico.style.border = "1px solid #110038";
      botonBuscarEspecifico.lastElementChild.firstElementChild.style.color = " #110038";
      botonBuscarEspecifico.firstElementChild.firstElementChild.src = "./images/lupa.svg";
    } else {
      let botonBuscarEspecifico = botonBuscar.firstElementChild.firstElementChild;
      botonBuscarEspecifico.style.background = "#EE3EFE";
      botonBuscarEspecifico.style.boxShadow = "inset -1px -1px 0 0 #A72CB3, inset 1px 1px 0 0 #FFFFFF";
      botonBuscarEspecifico.style.border = "1px solid #110038";
      botonBuscarEspecifico.lastElementChild.firstElementChild.style.color = "white";
      botonBuscarEspecifico.firstElementChild.firstElementChild.src = "./images/lupa_light.svg";
    }
  } else {
    contenedorDeOpcionesDeBusqueda.classList.remove("active");
    contenedorDeOpcionesDeBusqueda.classList.add("inactive");
    botonesTagdeBusqueda = document.querySelector(".botones-tag");
    botonesTagdeBusqueda.style.display = "none";
    botonesTagdeBusqueda.style.marginBottom = "";
    botonesTagdeBusqueda.style.marginTop = "";
    ui.ocultarOpcionesDeBusqueda();
    document.querySelector(".te-sugerimos").style.display = "block";
    document.querySelector(".buscar").style.marginBottom = "64px";
    if (estiloDef.href.includes("light")) {
      let botonBuscarEspecifico = botonBuscar.firstElementChild.firstElementChild;
      botonBuscarEspecifico.style.background = "#E6E6E6";
      botonBuscarEspecifico.style.boxShadow = "inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF;";
      botonBuscarEspecifico.style.border = "1px solid #808080";
      botonBuscarEspecifico.lastElementChild.firstElementChild.style.color = " #B4B4B4";
      botonBuscarEspecifico.firstElementChild.firstElementChild.src = "./images/lupa_inactive.svg";
    } else {
      let botonBuscarEspecifico = botonBuscar.firstElementChild.firstElementChild;
      botonBuscarEspecifico.style.background = "#B4B4B4";
      botonBuscarEspecifico.style.boxShadow = " inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF";
      botonBuscarEspecifico.style.border = "1px solid #808080";
      botonBuscarEspecifico.lastElementChild.firstElementChild.style.color = "#8F8F8F";
      botonBuscarEspecifico.firstElementChild.firstElementChild.src = "./images/CombinedShape.svg";
    }
  }
}

function busquedaDeGifs() {
  console.log(campoBuscar.value);
  let respuestaServidor = gif.busquedaGifPorNombre(campoBuscar.value);
  let seccionSugerencias = document.querySelector(".sugerencias-section");
  contenedorDeOpcionesDeBusqueda.style.display = "none";
  botonesTagdeBusqueda = document.querySelector(".botones-tag");
  botonesTagdeBusqueda.style.display = "block";
  botonesTagdeBusqueda.style.marginBottom = "54px";
  botonesTagdeBusqueda.style.marginTop = "12px";
  seccionSugerencias.style.display = "none";
  respuestaServidor.then((gifEntrante) => {
    ui.mostrarResultadoDeGifBuscado(gifEntrante.gif.data);

    ui.VisualizacionEstiloResultadosDeBusqueda(gifEntrante);
  });
}
function busquedaDeGifsBotonVerMas(palabraClave) {
  // console.log(campoBuscar.value);
  let respuestaServidor = gif.busquedaGifPorNombre(palabraClave);
  let seccionSugerencias = document.querySelector(".sugerencias-section");
  contenedorDeOpcionesDeBusqueda.style.display = "none";
  botonesTagdeBusqueda = document.querySelector(".botones-tag");
  botonesTagdeBusqueda.style.display = "block";
  botonesTagdeBusqueda.style.marginBottom = "54px";
  botonesTagdeBusqueda.style.marginTop = "12px";
  seccionSugerencias.style.display = "none";
  respuestaServidor.then((gifEntrante) => {
    ui.mostrarResultadoDeGifBuscado(gifEntrante.gif.data);

    ui.VisualizacionEstiloResultadosDeBusqueda(gifEntrante);
  });
}
//////////////////////////////////llamado a funciones///////////////////////////////////////
GetGifs(4, "s");
GetGifs(24, "t");
