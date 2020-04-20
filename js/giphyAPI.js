class gifosAPI {
  async getGif(amount) {
    const apiRespuesta = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=7107gIYllETNXLPM3ARVtGMcISbn6dCy&limit=${amount}&rating=G`
    );

    const gif = await apiRespuesta.json();
    console.log(gif);
    return {
      gif,
    };
  }

  async busquedaGifPorNombre(palabra) {
    const apiRespuesta = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=7107gIYllETNXLPM3ARVtGMcISbn6dCy&q=${palabra}&limit=20&offset=0&rating=G&lang=en`
    );

    const gif = await apiRespuesta.json();
    console.log("palabras busque " + gif);
    return {
      gif,
    };
  }

  async subirGuifo(formulario) {
    let key = "7107gIYllETNXLPM3ARVtGMcISbn6dCy";
    let objetoApi = {
      method: "POST",
      body: formulario,
      json: true,
    };
    const apiRespuesta = await this.peticionGuardar(`https://upload.giphy.com/v1/gifs?api_key=${key}`, objetoApi);
    //console.log(await apiRespuesta.data.id);
    let urlGetGifByID = await `https://api.giphy.com/v1/gifs/${apiRespuesta.data.id}?api_key=7107gIYllETNXLPM3ARVtGMcISbn6dCy`;
    //console.log(urlGetGifByID);
    return {
      urlGetGifByID,
    };
  }

  async peticionGuardar(url, parametros) {
    try {
      const apiRespuesta = await fetch(url, parametros);
      const gif = await apiRespuesta.json();
      return gif;
    } catch (error) {
      console.log("fallo peticion guardar");
    }
  }

  async GetMyGif(url) {
    const apiRespuesta = await fetch(url);
    const gif = await apiRespuesta.json();
    return { gif };
  }
}
