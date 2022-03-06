// VARIABLES
const imgSkullUrl = "./public/exercise-4/skull.png";
const imgChestUrl = "./public/exercise-4/chest.png";
const imgXUrl = "./public/exercise-4/x.png";
let intentos = 0;
let target = 0;
const columnTable = parseInt(prompt("CUANTAS COLUMNAS VA A TENER EL TABLERO? (Rec. 5)"));
const rowTable = parseInt(prompt("POR ULTIMO DIME, CUANTAS FILAS? (Rec. 5)"));
const board$$ = document.querySelector('[data-function = "board"]');
// creamos un numero aleatorio para posicionar el tesoro
const randomNumber = random(1, columnTable * rowTable);
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/* valido que la variable sea un numero comprendido entre 5 y 10 
 para que no sea un tablero enorme
 */
if (isNaN(columnTable) || isNaN(rowTable) || columnTable < 5 ||  columnTable > 10 ||
  rowTable < 5 || rowTable > 10) {
  alert("SOLO PUEDES PONER NUMEROS.. entre 5 y 10");
  location.reload();
}
// le creo una clase al board para darle estilos( flex etc...)
board$$.classList.add("board");
// construyo una tabla con las filas y columnas que el usuario ha pedido
for (let row = 1; row <= rowTable; row++) {
  const tr$$ = document.createElement("tr");
  for (let col = 1; col <= columnTable; col++) {
    const td$$ = document.createElement("td");
    td$$.classList.add("clickable");
    target++;
    td$$.setAttribute("data-function", "b-" + target);
    const img$$ = document.createElement("img");
    img$$.classList.add('.clickable')
    img$$.src = imgXUrl;
    td$$.appendChild(img$$);
    tr$$.appendChild(td$$);
  }
  board$$.appendChild(tr$$);
}
const card$$ = document.querySelectorAll(".clickable"); // selecciono todas las cartas con clase clickeable para comparar
// itero el array de elementos (nodos) para añadir a cada uno el eventLinstner
for (const cart of card$$) {
  // evento de escucha del click
  cart.addEventListener("click", () => {
    mostrarcara(cart); // le paso a la funcion el valor del nodo del elemento
    //    para modifiarlo
  });
}
function mostrarcara(cart) {
  intentos++; //incremento el contador
  const attempts$$ = document.querySelector('[data-function="attempts"');
  attempts$$.innerHTML = intentos; // actualizo intentos
  let fnTarget = cart.getAttribute("data-function");
  let rdTarget = "b-" + randomNumber; //comparo el elemento con el num. aleatorio
  if (fnTarget === rdTarget) {
    // si coincide pongo foto del tesoro
    cart.children[0].src = imgChestUrl;

    setTimeout(() => {
      alert(`¡¡¡ENHORABUENA LO LOGRASTE!!! EN ${intentos} INTENTOS`);
      const jugarOtra = confirm("¿Quieres jugar de nuevo?");
      if (jugarOtra) {
        location.reload();
      }
    }, 200);
  } else {
    // no coincide pongo foto calavera
    //console.log(cart.children[0]);
    cart.children[0].src = imgSkullUrl;
  }
}
