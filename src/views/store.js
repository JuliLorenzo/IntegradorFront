//===STORE===

import { setproductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { openModal } from "./modal";
//funcion que se encarga de traer elementos y llamar al render
export const handleGetProductsToStore = ()=> {
    const products = handleGetProductLocalStorage();
    handleRenderList(products);
};

//Se encarga de filtrar y renderizar la seccion con todos sus respectibos elementos 
export const handleRenderList = (productsIn) => {
    //Filtrado de Arrays por Cateogrias
    const wraps = productsIn.filter((el) => el.categorias == "Wraps");
    const ensaladas = productsIn.filter((el) => el.categorias == "Ensaladas");
    const bebidas = productsIn.filter((el) => el.categorias == "Bebidas");

    //Renderiza los elementos de la seccion
    const renderProductGroup = (productos, title) => {
        if(productos.length > 0) {
            const productosHTML = productos.map((producto, index) =>{
                return `<div 
                class='containerTargetItem'
                id='product-${producto.categorias}-${index}'>
                <div>
                <img src='${producto.imagen}'/>
                <div>
                <h2>${producto.nombre}</h2>
                </div>
                <div class='targetProps'>
                <p><b>Precio:</b> $ ${producto.precio}</p>
                </div>

                </div>
                </div>
                `;
            });
            //Retorna la seccion con todos los elementos dentro 
            return `
                <section class='sectionStore'>
                <div class='containerTitleSection'>
                <h3>${title}</h3>
                </div>
                <div class='containerProductStore'>
                ${productosHTML.join("")}                
                </div>
               
                </section>
            `;
        }else{
            return "";
        }
    };

    //Renderizar cada uno de los productos dentro de su categoria
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
    ${renderProductGroup(wraps, "Wraps")}
    ${renderProductGroup(ensaladas, "Ensaladas")}
    ${renderProductGroup(bebidas, "Bebidas")}

    `;
    
    //Añaden los eventos de manera dinamica
    const addEvents = (productsIn)=> {
        if (productsIn) {
            productsIn.forEach((element, index) => {
                const productContainer = document.getElementById(
                    `product-${element.categorias}-${index}`
                );
                productContainer.addEventListener("click", () => {
                    setproductoActivo(element);
                    openModal();

                });
            });
        }
    };
    addEvents(wraps);
    addEvents(ensaladas);
    addEvents(bebidas);
};