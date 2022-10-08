

const random = (max, min) => Math.floor(Math.random() * (max - min)) + min;

const createImageNode = () => {
  const id = random(122, 1);
  const container = document.createElement("div");
  container.className = "img";

  const imagen = document.createElement("img");
  imagen.dataset.src = `https://randomfox.ca/images/${id}.jpg`; //todo

  container.appendChild(imagen);
  return container;
};

const mountNode = document.getElementById("images");
const button = document.querySelector(".button");
const limpiar = document.querySelector(".limpiar");
let cont = 0;
let cont1 = 1;
// ESCUCHAR
//inIntersecting devuelve un boolean
const isIntersecting = (entry) => {
  return entry.isIntersecting; //si es visible
};

const loadImage = (entry) => {
  const container = entry.target; //div contianer de la imagen
  const imagen = container.firstChild;
  const url = imagen.dataset.src;

  //cargue imagen
  imagen.src = url;
  cont1++;
  //desregistrar la imagen (unobserve)
  observer.unobserve(container);
};

//RECIBE UNA FUNCION DE QUE HACER
//va a recibir todos las entradas(elements)
const observer = new IntersectionObserver((entries) => {
  //entries es un array
  //filtramos por cada iten que es intersectado
  if (entries.filter(isIntersecting)) {
    console.log("div intersectados: " + cont);
    console.log("imagenes cargadas: " + cont1);
    console.log("----------------------------");
  }
  entries
    .filter(isIntersecting)
    //porcadauno de los elementos que se encuentran en la pantalla
    //vamos a realizar una accion
    .forEach(loadImage);
});

//crear una funcion register
const registerImage = (img) => {
  //observador -> observe la img que recibimos
  observer.observe(img);
};
// ------------------------------
const addImage = () => {
  const newImage = createImageNode();
  mountNode.append(newImage);
  registerImage(newImage);
  cont++;
};

const deleting = () => {
  mountNode.innerHTML = "";
  cont = 0;
  cont1 = 1;
};

limpiar.onclick = () => deleting();
button.onclick = () => addImage();

// contenedor.append(nuevaImagen);
