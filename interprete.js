Mila.Modulo({
  define:"Milaventuras.Interprete",
  usa:["milaventuras"],
  necesita:["/milascript/tipo"]
});

Mila.RegistrarTipo('Interprete',{
});

Milaventuras.Interprete.nuevo = function(codigo) {
  Mila.Contrato({
    Proposito:"Describir un nuevo intérprete de Milaventuras",
    Precondiciones: "-"
  });
  return {
    _codigo: codigo,
    Ejecutar: function() { Milaventuras.Interprete.Ejecutar(this); },
    Detener: function() { Milaventuras.Interprete.Detener(this); },
    Reiniciar: function() { Milaventuras.Interprete.Reiniciar(this); },
    Paso: function() { Milaventuras.Interprete.Paso(this); },
    Pulso: function() { Milaventuras.Interprete.Pulso(this); }
  };
};

Milaventuras.Interprete.Ejecutar = function(interprete) {
  Mila.Contrato({
    Proposito:"Poner a ejecutar el código del intérprete {interprete}",
    Precondiciones: "-",
    Parametros: [interprete, "Interprete"]
  });
};

Milaventuras.Interprete.Detener = function(interprete) {
  Mila.Contrato({
    Proposito:"Detener la ejecución del intérprete {interprete}",
    Precondiciones: "-",
    Parametros: [interprete, "Interprete"]
  });
};

Milaventuras.Interprete.Reiniciar = function(interprete) {
  Mila.Contrato({
    Proposito:"Reiniciar la ejecución del intérprete {interprete} a su estado inicial. Si está en ejecución, lo detiene",
    Precondiciones: "-",
    Parametros: [interprete, "Interprete"]
  });
};

Milaventuras.Interprete.Paso = function(interprete) {
  Mila.Contrato({
    Proposito:"Ejecutar una instrucción en el interprete {interprete}",
    Precondiciones: "El interprete {interprete} no finalizó su ejecución",
    Parametros: [interprete, "Interprete"]
  });
};

Milaventuras.Interprete.Pulso = function(interprete) {
  Mila.Contrato({
    Proposito:"Notificar la ocurrencia de un pulso en el interprete {interprete}",
    Precondiciones: "-",
    Parametros: [interprete, "Interprete"]
  });
};