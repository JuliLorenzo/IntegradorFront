//====LOCALSTORAGE===//

//Traer todos los productos del localStorage
export const handleGetProductLocalStorage = () =>{
    const products = JSON.parse(localStorage.getItem("products"));
    if(products) {
        return products;
    }else{
        return [];
    }
};

//Guardar en LocalStorage
//recibir un producto
export const setInLocalStorage = (productIn)=>{
    //Traer los elementos
    let productsInLocal = handleGetProductLocalStorage();
    
    const existingIndex = productsInLocal.findIndex((productsLocal) =>
    productsLocal.id == productIn.id
    )
    //Verificr si el elemento existe
    if(existingIndex !== -1){
        //Si existe debe reemplazarse
        productsInLocal[existingIndex] = productIn;
    }else{
        //Sino agregrarse
        productsInLocal.push(productIn);
    }
    //setear el nuevo array con los productos modificados o con un nuevo elemento
    localStorage.setItem('products', JSON.stringify(productsInLocal));

};