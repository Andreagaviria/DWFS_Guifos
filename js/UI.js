var contenedorDeOpcionesDeBusqueda = document.querySelector(".contenedor-opciones-de-busqueda"),
  sugerencia1,
  sugerencia2,
  sugerencia3,
  botonBuscar;

var objetoGrabacion, stream;

class UI {
  displaySuggestions(gif) {
    var gifsResultados = document.querySelector("#resultados-busqueda");
    for (var i = 0; i < 4; i++) {
      let title = gif[i].title;
      gifsResultados.innerHTML += `<div class="sugerencias-gifs">
      <div class="contenedor-cabecera">
      <div class="cabecera">#${title.substring(0, title.indexOf("GIF")).replace(/ /g, "")}
      </div>
      <div><img class="boton-cerrar" src="./images/close.svg" alt="cerrar"></div>
      </div>
      <div class="contenedor-gif">
      <img src="${gif[i].images.original.url}" alt="${gif[i].title}">
      <a class="boton-vermas" href="#"><button>Ver mas...</button></a>
      </div>
     </div>`;
    }
  }

  displayTrends(gif) {
    var gifsResultados = document.querySelector("#tendencias");
    for (var i = 4; i < 24; i++) {
      let title = gif[i].title;
      let footer = title.substring(0, title.indexOf("GIF")).replace(/ /g, " #");
      gifsResultados.innerHTML += `<div class="tendencias-gifs"><img src="${gif[i].images.original.url}" alt="${
        gif[i].title
      }"><div class="cabecera">#${footer.substring(0, footer.length / 2)}</div></div>`;
    }
  }

  mostrarResultadoDeGifBuscado(gifsBuscados) {
    var gifsResultados = document.querySelector("#tendencias");
    gifsResultados.innerHTML = "";
    for (var i = 0; i < 20; i++) {
      let title = gifsBuscados[i].title;
      gifsResultados.innerHTML += `<div class="tendencias-gifs"><img src="${gifsBuscados[i].images.original.url}" alt="${
        gifsBuscados[i].title
      }"><div class="cabecera">#${title.substring(0, title.indexOf("GIF")).replace(/ /g, " #")}</div></div>`;
    }
  }

  //mostrar opciones de botones en el campo de busqueda

  mostrarOpcionesDeBusqueda() {
    console.log("mostrandobusquda");
    sugerencia1 = document.createElement("button");
    sugerencia1.classList.add("boton1");
    sugerencia2 = document.createElement("button");
    sugerencia2.classList.add("boton2");
    sugerencia3 = document.createElement("button");
    sugerencia3.classList.add("boton3");
    sugerencia1.appendChild(document.createElement("h3"));
    sugerencia2.appendChild(document.createElement("h3"));
    sugerencia3.appendChild(document.createElement("h3"));
    sugerencia1.firstElementChild.textContent = "Resultado de búsqueda sugerido";
    sugerencia2.firstElementChild.textContent = "Un resultado similar de búsqueda";
    sugerencia3.firstElementChild.textContent = "Y otro más";

    contenedorDeOpcionesDeBusqueda.appendChild(sugerencia1);
    contenedorDeOpcionesDeBusqueda.appendChild(sugerencia2);
    contenedorDeOpcionesDeBusqueda.appendChild(sugerencia3);
  }

  ocultarOpcionesDeBusqueda() {
    sugerencia1.remove();
    sugerencia2.remove();
    sugerencia3.remove();
  }

  VisualizacionEstiloResultadosDeBusqueda(gifEntrante) {
    botonesTagdeBusqueda.firstElementChild.innerHTML =
      "#" + gifEntrante.gif.data[0].title.substring(0, gifEntrante.gif.data[0].title.indexOf("GIF"));
    botonesTagdeBusqueda.firstElementChild.nextElementSibling.innerHTML =
      "#" + gifEntrante.gif.data[1].title.substring(0, gifEntrante.gif.data[1].title.indexOf("GIF"));
    botonesTagdeBusqueda.lastElementChild.innerHTML =
      "#" + gifEntrante.gif.data[2].title.substring(0, gifEntrante.gif.data[2].title.indexOf("GIF"));

    let titulo = document.getElementById("heading-resultado-busquedas");
    titulo.firstElementChild.innerHTML = `${document.querySelector("#palabraBusqueda").value} (resultados)`;
  }

  getStreamAndRecord() {
    var video = document.querySelector(".video-captura");
    console.log(video);
    stream = navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 832,
        height: 434,
      },
    });

    stream.then(function (mediaStream) {
      try {
        video.srcObject = mediaStream;
        objetoGrabacion = RecordRTC(mediaStream, {
          type: "gif",
          frameRate: 1,
          quality: 10,
          width: 832,
          hidden: 434,
          onGifRecordingStarted: function () {
            console.log("started");
            document.querySelectorAll(".listo")[0].style.display = "block";
            document.querySelectorAll(".listo")[1].style.display = "block";
          },
        });
      } catch (error) {
        video.src = window.URL.createObjectURL(mediaStream);
      }
      video.onloadedmetadata = function (e) {
        video.play();
      };
    });
  }
}
