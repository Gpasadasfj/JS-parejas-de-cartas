// Función para desordenar (mezclar) aleatoriamente un array (algoritmo Fisher–Yates)
function shuffle(array) {
  let currentIndex = array.length;

  // Mientras queden elementos por mezclar...
  while (currentIndex != 0) {
    // Selecciona un índice aleatorio entre 0 y currentIndex
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Intercambia el elemento actual con el aleatorio
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export { shuffle }