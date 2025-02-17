Mila.Modulo({
  define:"Milaventuras.Generador",
  usa:["milaventuras"]
});

Milaventuras.Generador.codigosGenerados = function(escritorio) {
  const codigos = {};
  for (let bloque of escritorio.bloquesSuperiores()) {
    codigos[bloque.getFieldValue("Rol")] = Blockly.JavaScript.blockToCode(bloque);
  }
  return codigos;
};