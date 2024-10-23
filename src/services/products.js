import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { handleGetProductLocalStorage, setInLocalStorage } from "../persistence/localstorage";
import { openModal, closeModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";

//===PRODUCTOS===

//Guardar o Modificar Elementos 
const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener("click", () => {
    handleSaveOrModifyElements();
});

//funcion de guardar
const handleSaveOrModifyElements = ()=>{
    const nombre = document.getElementById("nombre").value,
        imagen = document.getElementById("img").value,
        precio = document.getElementById("precio").value,
        categorias = document.getElementById("categoria").value;
    let object = null;    
    
    if(productoActivo){
        //Si hay un producto activo, se guardan los valores modificados
        object = {
            ... productoActivo,
            nombre,
            imagen,
            precio,
            categorias
        };
    }else{
        //En el caso de que no, se guarda un nuevo producto
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categorias
        };
    }
    Swal.fire({
        title: "Correcto!",
        text: "Producto guardado correctamente!",
        icon: "success"
      });
      
    //guardamos en el localStorage
    setInLocalStorage(object);
    //volvemos a traer los productos del localStorage
    handleGetProductsToStore();
    closeModal();
};

//ELiminar elemento 

export const handleDeleteProduct = () => {
    Swal.fire({
        title: "Desea eliminar elemento?",
        text: "Si lo eliminas sera permanentemente!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
            //setear el nuevo array con los productos modificados o con un nuevo elemento
            localStorage.setItem('products', JSON.stringify(result));
            const newProducts = handleGetProductLocalStorage();
            handleRenderList(newProducts);
            closeModal();
        }else{
            closeModal();
        }
      });
    };
    