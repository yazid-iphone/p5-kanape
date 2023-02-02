
let produitLocalStorage = JSON.parse(localStorage.getItem("Kanape"));

console.log(produitLocalStorage)
//console.log(ProduitLocalStorage)
let cart = document.getElementById("cart__items");
//console.log(cart)
// Si le panier est vide
function getCart(){
  
if (produitLocalStorage === null || produitLocalStorage == 0){
    produitLocalStorage =[]

  //let yazid = document.getElementById("cart__items");
//alert(
 // "panier vide, veuillez ajouter des produits au panier pour continuer"
//);
//document.getElementById("cart__items").innerHTML += `Votre panier et vide`;
    let empty = `<h1>Votre panier est vider ajouter des articles</1>`;
    cart.innerHTML += empty;
   //console.log(yazid)

} else {
  //document.getElementById("cart__items").innerHTML+= `<h1>votre panier</h1>`
  //console.log(ProduitLocalStorage)
  // productLocalStorage = JSON.parse(localStorage.getItem("kanape"));
  //localStorage.setItem("Kanape", JSON.stringify(productLocalStorage));

 for (let i = 0 ; i < produitLocalStorage.length; i++) {
//const cart = document.getElementById("cart__items");
//let cart = document.getElementById("cart__items").innerHTML += `Votre panier remplis`;
 cart.innerHTML += `<article class="cart__item" data-id="${produitLocalStorage[i].id}" data-color="${produitLocalStorage[i].couleur}">
 <div class="cart__item__img">
   <img src="${produitLocalStorage[i].image}" alt="${produitLocalStorage[i].alt}">
 </div>
 <div class="cart__item__content">
   <div class="cart__item__content__description">
     <h2>PRODUIS:   ${produitLocalStorage[i].name}</h2>
     <p>COLOR:   ${produitLocalStorage[i].couleur}</p>
     <p>PRICE:   ${produitLocalStorage[i].prix*produitLocalStorage[i].quantite}</p>
   </div>
   <div class="cart__item__content__settings">
     <div class="cart__item__content__settings__quantity">
       <p>QTT:</p>
       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[i].quantite}">
     </div>
     <div class="cart__item__content__settings__delete">
     <p class="deleteItem" idDelete="${produitLocalStorage[i].id}" 
     colorDelete="${produitLocalStorage[i].couleur}" >Supprimer</p>
     </div>
   </div>
 </div>
</article>`;
//idDelete="${produitLocalStorage[i].id}" colorDelete="${produitLocalStorage[i].couleur}     
     //console.log(cart)
    
}
}
//}
//getCart() 


    
   
  function Supprimer() {
        let btn_supprimer = document.querySelectorAll(".deleteItem");
    console.log(btn_supprimer)
        for (let l = 0;  l < btn_supprimer.length; l++){
            btn_supprimer[l].addEventListener("click" , (event) => {
                event.preventDefault();
                console.log(event);
                
                let idDelete = produitLocalStorage[l].id;
                console.log(idDelete)
                let colorDelete = produitLocalStorage[l].couleur;
                console.log(colorDelete)

                 produitLocalStorage = produitLocalStorage.filter(element => element.id !== idDelete &&el.couleur !== colorDelete );
            console.log(produitLocalStorage);
            
            localStorage.setItem("kanape", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé et refresh
            //alert("Ce produit a bien été supprimé du panier");
            //location.reload();
        })
    }
//}
}
Supprimer()
}
getCart()
function totals(){

 let totalQtt=[];
 ////////////////let inputte = document.querySelectorAll('.itemQuantity');
for (let m = 0; m < produitLocalStorage.length; m++){
let produitQtt =parseInt(produitLocalStorage[m].quantite);
totalQtt.push(produitQtt)
console.log(totalQtt);
const initialValue = 0;
let qttProduit = totalQtt.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
 document.getElementById('totalQuantity').innerHTML = qttProduit;
console.log(qttProduit);
 
}

  
  

let priceTotal=[];
for (let j = 0; j < produitLocalStorage.length; j++){
let qttNumber = parseInt(produitLocalStorage[j].prix*produitLocalStorage[j].quantite);
priceTotal.push(qttNumber);
console.log(priceTotal)

const initialValue = 0;
let qttFinal = priceTotal.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
    
    console.log(qttFinal);

    
   let final = document.querySelector("#totalPrice").innerHTML = qttFinal;
    console.log(final)
}
}
totals()
function  moreAndLess () {
  
    let input = document.querySelectorAll('.itemQuantity');
        console.log(input)
    for (let k = 0; k < input.length; k++){
            input[k].addEventListener("change" , (event) => {
            event.preventDefault();
          console.log(event)
            
            let qttModif = produitLocalStorage[k].quantite;//quantite+produitLocalStorage[k].prix;
            console.log(qttModif);
            let qttModifValue = input[k].value;

            console.log(qttModifValue);
            
            const result = produitLocalStorage.find((el) => el.qttModifValue !== qttModif);
console.log(result)
            
            
            result.quantite = qttModifValue;
           produitLocalStorage[k].quantite=result.quantite;
           document.getElementById('totalQuantity').innerHTML += qttModifValue;
            localStorage.setItem("kanape", JSON.stringify(produitLocalStorage));
            location.reload();
            
         
        })
    }}
   
moreAndLess();
function getForm(){
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const mail = document.getElementById("email");


const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click" , (event)=>  {
       event.preventDefault();
      event.stopPropagation();
  
//////////////////////////////////////////////////////////////////////////yazid////////        
const regexName = /^[a-zA-Z-\s]+$/;

const firstNameError = document.getElementById("firstNameErrorMsg");
  if (prenom.value =="") {
    firstNameError.innerHTML = "le champs et requis.";
    firstNameError.style.color="red";
    event.stopPropagation()
    
  }
  else if (regexName.test(prenom.value)==false){
    
  firstNameError.innerHTML = 'Entrez un prenom  valide.';
    firstNameError.style.color="orange"; 
    event.stopPropagation();

  }

  const lastNameError = document.getElementById("lastNameErrorMsg");
  if (nom.value=="") {
    
    lastNameError.innerHTML = "le champs et requis.";
    lastNameError.style.color="red";
    event.stopPropagation();
    
  } else if(regexName.test(nom.value)==false){
   
    lastNameError.innerHTML = 'Entrez un nom valide.';
    lastNameError.style.color="orange"; 
    event.stopPropagation();

  }
    
  const adressError = document.getElementById("addressErrorMsg");
  if (adresse.value.trim()=="") {
   
    adressError.innerHTML = "le champs et requis.";
    adressError.style.color="red";
    event.stopPropagation();
    
  } else if(regexName.test(adresse.value)==false){
    
    adressError.innerHTML = 'Entrez une addresse valide.';
    adressError.style.color="orange"; 
    event.stopPropagation();

  }
  const cityError = document.getElementById("cityErrorMsg");
  if (city.value.trim()=="") {
    
    cityError.innerHTML = "le champs et requis.";
    cityError.style.color="red";
    event.stopPropagation();
    
  } else if(regexName.test(city.value)==false){
    
   cityError.innerHTML = 'Entrez une ville valide.';
    cityError.style.color="orange"; 
    event.stopPropagation();

  }
  const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const emailError = document.getElementById("emailErrorMsg");
  if (mail.value.trim()=="") {
   
    emailError.innerHTML = "le champs et requis.";
    emailError.style.color="red";
    event.stopPropagation();
    
  } else if(regexMail.test(mail.value)==false){
   
    emailError.innerHTML = 'Entrez une addresse mail valide.';
    emailError.style.color="orange"; 
    event.stopPropagation();

  }


     idProducts = [];
     for (let i = 0; i<produitLocalStorage.length;i++) {
     idProducts.push(produitLocalStorage[i].id)
     };

     console.log(idProducts)

        const form = {
          contact : {
              firstName:prenom,
              lastName: nom,
              address:adresse,
              city: ville,
              email:mail,
          },
          products: idProducts,
      } 
       console.log(form);
               fetch("http://localhost:3000/api/products/order",{
             method: 'POST',
              body: JSON.stringify(form),
              headers: {
                   
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
             },
              

  })

.then((response) => response.json())
.then((data) => {
    console.log(data);
    //localStorage.clear("kanape"); 
    localStorage.setItem("orderId", data.orderId);
    document.location.href = "confirmation.html";
  })
    .catch((err) => {
                alert ("Problème avec fetch : " + err.message);
          });
  
          });
    }
    getForm()
