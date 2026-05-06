Mila.Módulo({
  define:"Milaventuras.Generador"
});

Milaventuras.Generador.codigosGenerados = function(escritorio) {
  const codigos = {};
  for (let bloque of escritorio.bloquesSuperiores()) {
    codigos[bloque.getFieldValue("Rol")] = Blockly.JavaScript.blockToCode(bloque);
  }
  return codigos;
};