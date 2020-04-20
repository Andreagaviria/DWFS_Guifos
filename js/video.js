///////////////////////////////////instanciacion de clases//////////////////////////
let ui = new UI();
let gif = new gifosAPI();

////////////////////////////////variables/////////////////////////////////////////
let botonComenzar = document.querySelector("#comenzar-boton-crearguifo");
let botonCapturar = document.querySelector(".capturar-boton");
let camaraIcon = document.querySelector(".camarita");
let botonListo;
let urlMyGifo;
////////////////////////////////eventos/////////////////////////////////////////
botonComenzar.addEventListener("click", abrirVideo);
botonCapturar.addEventListener("click", capturarGif);

////////////////////////////////funciones/////////////////////////////////////////
function terminarGif() {
  console.log("holaTerminarGif");
  document.querySelector(".vista-previa-botones").style.display = "flex";
  listoClasses = document.querySelectorAll(".listo");
  //listoClasses[0].style.display = "none";
  //listoClasses[1].style.display = "none";
  for (let i = 0; i < 2; i++) {
    listoClasses[i].style.display = "none";
  }
}

function abrirVideo(e) {
  e.preventDefault();
  document.querySelector("#creacion-gif").style.display = "none";
  document.querySelector("#antes-de-empezar").style.display = "block";
  document.querySelector(".tendencias-section").style.display = "none";
  ui.getStreamAndRecord();
}

function capturarGif(e) {
  e.preventDefault();
  if (botonCapturar.classList.contains("listo")) {
    objetoGrabacion.stopRecording(function (blobURL) {
      document.querySelector(".imagen-previa").src = blobURL;
      document.querySelector(".video-captura").style.display = "none";
      document.querySelector(".imagen-previa").style.display = "block";
      terminarGif();
      document.querySelector(".subir-guifo-boton").addEventListener("click", subirGuifo);
      document.querySelector("#banner-antesDeEmpezar").innerHTML = "Vista Previa";
    });

    // -----------------------------------------PARAR VIDEO-------------------------------
    // stream.getTracks().forEach((track) => {
    //   track.stop();
    // });
    // objetoGrabacion.reset();
    // objetoGrabacion.destroy();
    // stream.reset();
    // stream.destroy();
    // objetoGrabacion = null;
    // stream = null;
  } else {
    botonCapturar.classList.add("listo");
    camaraIcon.classList.add("listo");
    camaraIcon.src = "./images/recording.svg";
    botonCapturar.innerHTML = "Listo";
    objetoGrabacion.startRecording();
    document.querySelector(".timing").style.display = "block";
    document.querySelector("#banner-antesDeEmpezar").innerHTML = "Capturando Tu Guifo";
    listoClasses = document.querySelectorAll(".listo");
    for (let i = 0; i < 2; i++) {
      listoClasses[i].style.display = "none";
    }
  }
}

function subirGuifo() {
  document.querySelector(".contenedor-imagen-previa").style.display = "none";
  document.querySelector(".subiendo-guifo").style.display = "block";
  document.querySelector(".botones-timing-capturar").style.display = "none";
  document.querySelector("#banner-antesDeEmpezar").innerHTML = "Subiendo Guifo";
  document.querySelector(".boton-final-dos").style.display = "flex";
  let formulario = new FormData();
  formulario.append("file", objetoGrabacion.getBlob(), "guardar.gif");
  gif.subirGuifo(formulario).then(function (guardado) {
    console.log(guardado);
    gif.GetMyGif(guardado.urlGetGifByID).then(function (retornado) {
      urlMyGifo = retornado.gif.data.url;
      console.log(retornado.gif.data.url);
      document.querySelector("#banner-antesDeEmpezar").innerHTML = "Guifo Subido Con Éxito";
      document.querySelector(".guifo-subido").style.display = "block";
      document.querySelector(".prueba-captura").style.width = "371px";
      document.querySelector(".prueba-captura").style.height = "196px";
      document.querySelector(".prueba-captura").style.marginLeft = "24px";
      document.querySelector(".prueba-captura").style.marginTop = "27px";
      document.querySelector(".contenedor-imagen-previa img").style.width = "365px";
      document.querySelector(".contenedor-imagen-previa img").style.height = "191px";
      document.querySelector(".subiendo-guifo").style.display = "none";
      document.querySelector(".boton-final-dos").style.display = "none";
      document.querySelector(".contenedor-imagen-previa").style.display = "block";
    });
  });
}

function GetGifs(amount, tipoDePeticion) {
  let serverResponse = gif.getGif(amount);

  serverResponse.then((gifEntrantes) => {
    if (tipoDePeticion === "s") {
      ui.displaySuggestions(gifEntrantes.gif.data);
    } else {
      ui.displayTrends(gifEntrantes.gif.data);
    }
  });
}

GetGifs(24, "t");