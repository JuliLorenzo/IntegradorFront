//===CATEGORIA===

import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

const handleFilterProductsByCategory = (categoryIn) => {
    const products = handleGetProductLocalStorage();

    switch(categoryIn) {
        case categoriaActiva:
            handleRenderList(products);
            break;
        case "Todo":
            handleRenderList(products);
            break;
        case "Wraps":
        case "Ensaladas":
        case "Bebidas":
            const result = products.filter((el) => el.categorias == categoryIn)
            handleRenderList(result);
        default:
            break;
        case "mayorPrecio":
            const resultPrecioMAyor = products.sort((a,b) => b.precio - a.precio);
            handleRenderList(resultPrecioMAyor);
            break;
        case "menorPrecio":
            const resultPrecioMenor = products.sort((a,b) => a.precio - b.precio);
            handleRenderList(resultPrecioMenor);
            break;        
    }
};

//render de la vista categorias

export const renderCategories = ()=> {
    //Tomamos elementos de la lista
    const ulList = document.getElementById("listFilter");
    
    //Creamos esos elementos dentro de la lista
    ulList.innerHTML = `
    <li id="Todo">Todos los productos</li>
    <li id="Wraps">Wraps</li>
    <li id="Ensaladas">Ensaladas</li>
    <li id="Bebidas">Bebidas</li>
    <li id="mayorPrecio">Mayor precio</li>
    <li id="menorPrecio">Menor Precio</li>
    `;
    
    //Añadimos dinamicamente el evento click a cada elemento de la lista
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement)=>{
        liElement.addEventListener("click", ()=> {
            handleClick(liElement);            
        });
    });

    //Verificamos si algun elemento de la lista tiene liActive y lo removemos
    //Si el (donde hice click) es igual a algun elemento de la lista, se agrega el liActive
    const handleClick = (elemento)=> {
        handleFilterProductsByCategory(elemento.id);
        liElements.forEach((el) => {
            if (el.classList.contains("liActive")) {
                el.classList.remove("liActive");
            } else {
                if (elemento==el) {
                    el.classList.add("liActive");
                }
            }

        })
    }
};