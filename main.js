import { setInLocalStorage } from "./src/persistence/localstorage";
import { renderCategories } from "./src/services/categories";
import { handleSearchProductByName } from "./src/services/searchBar";
import { openModal } from "./src/views/modal";
import { handleGetProductsToStore } from "./src/views/store";
import './style.css';

/*===APLICACION===*/

export let categoriaActiva = null;
export const setCategoriaActiva = (categoriaIn) => {
    categoriaActiva = categoriaIn;
};

export let productoActivo = null;
export const setproductoActivo = (productoIn) => {
    productoActivo = productoIn;
};

//Traer todos los productos y mostrarlos en Store
handleGetProductsToStore();
//Hacer el render de las categorias
renderCategories();

//HEADER 
//Evento Agregar un Producto
const buttonAdd= document.getElementById("buttonAddElement");
buttonAdd.addEventListener("click", ()=>{
    openModal();
});

//buttonSearch
const buttonSearch = document.getElementById("buttonSearch");
buttonSearch.addEventListener("click", () => {
handleSearchProductByName();
});

