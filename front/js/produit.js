let params = new URLSearchParams(window.location.search);
console.log(params)
const productId = params.get("id");
console.log(productId)
const urlProduct = `http://localhost:3000/api/products/${productId}`;
console.log(urlProduct);
let cardsFetch = function () {
    fetch(urlProduct)
    
      .then((response) => response.json())
      .then((api) => { response = api;
       console.log(api);
        // get data image
        let img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${api.imageUrl}" alt="${api.altTxt}">`;
        // data.name and title
       // let name = document.getElementById("title");
        //name.innerHTML = data.name;
        let title = document.querySelector("title");
        title.innerHTML = `${api.name}`;
        // price
        let price = document.getElementById("price");
       price.innerHTML = `${api.price}`;
        
        // description
        let description = document.getElementById("description");
        description.innerHTML = `${api.description}`;
        // colors
        let color = document.getElementById("colors");
        for (i = 0; i < api.colors.length; i++) {
          color.innerHTML += `<option value="${api.colors[i]}">${api.colors[i]}</option>`;
        }
        let selectedQuantity = document.getElementById("quantity");
        selectedQuantity.setAttribute("value" ,"1");
        //console.log(selectedQuantity)
//}
      //);
//}   
produitLocalStorage = JSON.parse(localStorage.getItem("kanape"));
//localStorage.setItem("Kanape", JSON.stringify(ProduitLocalStorage));
 
  
//cardsFetch();
//function addToCart() {
     let btn_envoyer=document.getElementById("addToCart");
     console.log(btn_envoyer)
     btn_envoyer.addEventListener('click', (e) => {
        e.preventDefault();
       
       let produitList = {
            id: `${productId}`,
            couleur:color.value,
            quantite:selectedQuantity.value,
            prix:`${api.price}`,
            name:`${api.name}`,
            alt:`${api.altTxt}`,
            description:`${api.description}`,
            image:`${api.imageUrl}`,
        } 

    console.log(produitList)
   // produitLocalStorage = JSON.parse(localStorage.getItem("Kanape"));
    //fenêtre pop-up
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande ${api.name}  ${api.price}$ est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

       //let produitLocalStorage = JSON.parse(localStorage.getItem("Kanape"));
       if ( produitLocalStorage ) {
        const found = produitLocalStorage.find(element => element.id == produitList.id && element.couleur == produitList.couleur);
       // if (found == undefined) 
            if (found )                   {
              let newQuantite =
              parseInt(produitList.quantite) + parseInt(found.quantite);
            found.quantite = newQuantite;
            //produitLocalStorage.push(produitList);
            localStorage.setItem("Kanape", JSON.stringify(produitLocalStorage));
            popupConfirmation();
      //SI PRODUIT AVEC MEME ID ET COULEUR AUGMENTER LA QUANTITE
            } else {
            produitLocalStorage.push(produitList);
            //found.quantite += produitList.quantite;
            localStorage.setItem("Kanape", JSON.stringify(produitLocalStorage));
            popupConfirmation();
            }
      
            } else {
            produitLocalStorage= [];
            produitLocalStorage.push(produitList);
            localStorage.setItem("Kanape", JSON.stringify(produitLocalStorage));
            popupConfirmation();
            } 
      
    
 //localStorage.clear("kanape"); 

});
      });

}
//localStorage.clear("kanape"); 
cardsFetch()
