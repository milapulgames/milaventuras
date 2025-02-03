Mila.UsaModulo("Milaventuras");

Mila.RegistrarModulo("Milaventuras.Juego");

Mila.RegistrarTipo('DataJuego',{
  //roles: [Rol]
  //objetos: ...
  //mapas: ...
  //bloques: ...
  //comportamiento: ...
});

Mila.RegistrarTipo('Automata',{
  //interprete
  //posicion
  //rol
});

Milaventuras.Juego.automatas = [];

Milaventuras.Juego.nuevo = function(dataJuego) {
  Mila.Contrato({
    Proposito:"Describe un nuevo juego de Milaventuras a partir de la información en {dataJuego}",
    Precondiciones: "-",
    Parametros:[dataJuego,DataJuego]
  });
  // ...
};

Milaventuras.Juego.CargarCodigo = function(dataCodigo) {
  Mila.Contrato({
    Proposito:"Carga los códigos de {dataCodigo} en los autómatas del juego, según su rol",
    Precondiciones: "-",
    Parametros:[dataCodigo,DataCodigo]
  });
  for (let automata of Milaventuras.Juego.automatas) {
    automata.interprete = Milaventuras.Interprete.nuevo(dataCodigo[automata.rol]);
  }
};

Milaventuras.Juego.pulso = function() {
  Mila.Contrato({
    Proposito:"Notificar la ocurrencia de un pulso a cada autómata del juego",
    Precondiciones: "-"
  });
  for (let automata of Milaventuras.Juego.automatas) {
    automata.interprete.Pulso();
  }
};