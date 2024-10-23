/*===POPUP===*/

import { productoActivo, setproductoActivo } from "../../main";
import { handleDeleteProduct } from "../services/products";

const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", ()=>{
    closeModal();
});

//Funciones Abrir y Cerrar MODAL
export const openModal = ()=>{
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "flex";
    const buttonDelete = document.getElementById("deleteButton");
    
    if(productoActivo){
        buttonDelete.style.display = "block"; 

    }else{
        buttonDelete.style.display = "none";
    }

    if(productoActivo) {
        const nombre = document.getElementById("nombre"),
            imagen = document.getElementById("img"),
            precio = document.getElementById("precio"),
            categorias = document.getElementById("categoria");
        imagen.value = productoActivo.imagen;
        categorias.value = productoActivo.categorias;
        precio.value = productoActivo.precio;
        nombre.value = productoActivo.nombre;  
    }
};

export const closeModal = ()=>{
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "none";
    setproductoActivo(null);
    resetModal();
};

const resetModal = () =>{
    const nombre = document.getElementById("nombre"),
        imagen = document.getElementById("img"),
        precio = document.getElementById("precio"),
        categorias = document.getElementById("categoria");
    nombre.value = "";
    imagen.value = "";
    precio.value = 0;
    categorias.value = "Seleccione una categoria"
};

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener('click', ()=> {
    handleDeleteProduct();
});

const buttonDelete = () => {
    handleDeleteProduct();
}

