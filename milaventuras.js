Mila.RegistrarModulo("Milaventuras");

Mila.alIniciar(function() {
  Mila.Contrato({
    Proposito:"Inicializar el módulo principal de Milaventuras, creando la panalla principal y los submódulos",
    Precondiciones: "-"
  });
  Milaventuras.lienzo = Mila.Lienzo.nuevo();
  Milaventuras.escritorio = Mila.Bloques.nuevoEscritorio();
  Milaventuras.temporizador = Mila.Temporizador.nuevo(10, Milaventuras.Pulso);
  let botonEjecutar = Mila.Pantalla.nuevoBoton({
    texto: "Ejecutar",
    funcion: Milaventuras.botonEjecutarPresionado
  });
  let botonReiniciar = Mila.Pantalla.nuevoBoton({
    texto: "Reiniciar",
    funcion: Milaventuras.Reiniciar
  });
  let botonPulso = Mila.Pantalla.nuevoBoton({
    texto: "Pulso",
    funcion: Milaventuras.Pulso
  });
  let menuSuperior = Mila.Pantalla.nuevoDisposicionHorizontal({
    elementos:[botonEjecutar,botonDetener,botonReiniciar,botonPulso]
  });
  let areaDeTrabajo = Mila.Pantalla.nuevoDisposicionHorizontal({
    elementos:[lienzo,escritorio]
  });
  Milaventuras.pantallaPrincipal = Mila.Pantalla.nueva({
    disposicion: 'vertical',
    elementos:[
      menuSuperior,
      areaDeTrabajo
    ]
  });

  let dataJuego = Mila.Archivo.contenidoDe_('juegos/pong');
  Milaventuras.juegoActual = Milaventuras.Juego.nuevo(dataJuego);
});

Milaventuras.botonEjecutarPresionado = function() {
  if (Milaventuras.temporizador.estaEnEjecucion()) {
    Milaventuras.Detener();
  } else {
    Milaventuras.Ejecutar();
  }
};

Milaventuras.Ejecutar = function() {
  Mila.Contrato({
    Proposito:"Poner a ejecutar el juego actual a partir de los códigos definidos en el escritorio",
    Precondiciones: [
      "El juego no está en ejecución",
      !Milaventuras.temporizador.estaEnEjecucion()
    ]
  });
  // Cambiar el texto del botón a "Detener"
  let codigos = Milaventuras.Generador.codigosGenerados(Milaventuras.escritorio);
  Milaventuras.juegoActual.CargarCodigo(codigos);
  Milaventuras.temporizador.Ejecutar();
};

Milaventuras.Detener = function() {
  Mila.Contrato({
    Proposito:"Detener la ejecución del juego actual",
    Precondiciones: [
      "El juego está en ejecución",
      Milaventuras.temporizador.estaEnEjecucion()
    ]
  });
  // Cambiar el texto del botón a "Ejecutar"
  Milaventuras.temporizador.Detener();
};

Milaventuras.Reiniciar = function() {
  Mila.Contrato({
    Proposito:"Reiniciar la ejecución del juego actual a su estado inicial. Si está en ejecución, lo detiene",
    Precondiciones: "-"
  });
  Milaventuras.juegoActual.Reiniciar();
  Milaventuras.temporizador.Detener();
  Milaventuras.lienzo.Limpiar();
};

Milaventuras.Pulso = function() {
  Mila.Contrato({
    Proposito:"Notificar la ocurrencia de un pulso en el juego actual",
    Precondiciones: "-"
  });
  Milaventuras.juegoActual.Pulso();
  Milaventuras.lienzo.Dibujar();
};