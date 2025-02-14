Mila.Modulo({
  define:"Milaventuras.Juego",
  usa:["milaventuras"],
  necesita:["/milascript/tipo"]
});

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

Milaventuras.Juego._Juego = function() {

};

Milaventuras.Juego.nuevo = function(dataJuego) {
  Mila.Contrato({
    Proposito:"Describe un nuevo juego de Milaventuras a partir de la información en {dataJuego}",
    Precondiciones: "-",
    // Parametros:[dataJuego,DataJuego]
  });
  const juego = new Milaventuras.Juego._Juego();
  const bloquesDeComandos = Object.keys(dataJuego.bloques.comandos);
  const bloquesDeExpresiones = Object.keys(dataJuego.bloques.expresiones);
  const roles = dataJuego.roles.map(x => x.id);
  Mila.Bloques.DefinirBloque_({
    id:"Comando",
    estilo:"math_blocks",
    forma:"Comando",
    texto:"%{Comando}",
    campos: {
      Comando: Mila.Bloques.definicionEtiqueta()
    },
    mutador: Mila.Bloques.definicionMutador({
      comando: {
        tipo: "string",
        inicial: "Correr",
        funcion: Mila.Bloques.funcionAlteraCampo_("Comando")
      }
    }),
    variantes: bloquesDeComandos.map(x => { return {comando:x}; })
  });
  Mila.Bloques.DefinirBloque_({
    id:"Expresion",
    estilo:"loop_blocks",
    forma:"Expresion",
    texto:"%{Expresion}",
    campos: {
      Expresion: Mila.Bloques.definicionEtiqueta()
    },
    mutador: Mila.Bloques.definicionMutador({
      expresion: {
        tipo: "string",
        inicial: "Correr",
        funcion: Mila.Bloques.funcionAlteraCampo_("Expresion")
      }
    }),
    variantes: bloquesDeExpresiones.map(x => { return {expresion:x}; })
  });
    Mila.Bloques.DefinirBloque_({
    id:"Definicion",
    estilo:"procedure_blocks",
    texto:"%{Rol}\n%{Cuerpo}",
    campos: {
      Rol: Mila.Bloques.definicionDesplegable(roles),
      Cuerpo: Mila.Bloques.definicionCuerpo()
    }
  })
   
  juego.paleta = {
    kind: "categoryToolbox",
    contents:[{
        kind:"category",
        name:"primitivas",
        contents: [{"kind":"block","type":"Definicion"}].concat(Mila.Bloques.variantesDe_("Comando").map(variante => {
          return {"kind":"block","type":"Comando","extraState":variante};
        }).concat(Mila.Bloques.variantesDe_("Expresion").map(variante => {
          return {"kind":"block","type":"Expresion","extraState":variante};
        })))
      },{
        kind:"category",
        name:"variables",
        contents:[{"kind":"block","type":"math_number"}]
      },{
        kind:"category",
        name:"control",
        contents:[{"kind":"block","type":"math_number"}]
      }
    ]
  };

  return juego;
};

Milaventuras.Juego.CargarCodigo = function(dataCodigo) {
  Mila.Contrato({
    Proposito:"Carga los códigos de {dataCodigo} en los autómatas del juego, según su rol",
    Precondiciones: "-",
    // Parametros:[dataCodigo,DataCodigo]
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