//Déclaration de la variable "productRegisterInLocalStorage" dans laquelle on met les keys et les values qui sont dans le local Storage
//JSON.parse c'est pour convertir les données au format JSON qui sont dans le localStorage en objet javascript
let produitLocalStorage = JSON.parse(localStorage.getItem("kanape"));
let cart = document.getElementById("cart__items");

let panier = [];
//Si le panier  vide alors, on affiche le message contenu vide
function getCart() {
  if (produitLocalStorage === null || produitLocalStorage == 0) {
    let empty = `<h1>Votre panier est vider ajouter des articles</1>`;
    cart.innerHTML += empty;
  } else {
    //Si le panier n'est pas vide alors, on affiche le contenu du localStorage
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < produitLocalStorage.length; i++) {
          // on récupère la couleur, la quantité et l'id de tous les produits contenus dans le localstorage et on les met dans des variables
          let colorPanier = produitLocalStorage[i].couleur;
          let idPanier = produitLocalStorage[i].id;
          let quantityPanier = produitLocalStorage[i].quantite;
          //on ne récupère que les données des canapés dont _id (de l'api) correspondent à l'id dans le localStorage
          let panier = data.find((element) => element._id == idPanier);
          // Insertion de l'élément "article"
          let article = document.createElement("article");
          document.querySelector("#cart__items").appendChild(article);
          article.className = "cart__item";
          article.setAttribute("data-id", `${idPanier}`);
          article.setAttribute("data-color", `${colorPanier}`);
          // Insertion de l'élément "div"
          let divImg = document.createElement("div");
          article.appendChild(divImg);
          divImg.className = "cart__item__img";
          // Insertion de l'image
          let productImg = document.createElement("img");
          divImg.appendChild(productImg);
          productImg.src = panier.imageUrl;
          productImg.alt = panier.altTxt;
          // Insertion de l'élément "div"
          let itemContent = document.createElement("div");
          article.appendChild(itemContent);
          itemContent.className = "cart__item__content";
          // Insertion de l'élément "div"
          let itemContentDescription = document.createElement("div");
          itemContent.appendChild(itemContentDescription);
          itemContentDescription.className = "cart__item__content__description";
          // Insertion du titre h3
          let title = document.createElement("h2");
          itemContentDescription.appendChild(title);
          title.innerHTML = panier.name;
          // Insertion de la couleur
          let color = document.createElement("p");
          title.appendChild(color);
          color.innerHTML = `${colorPanier}`;
          color.style.fontSize = "20px";
          // Insertion du prix
          let price = document.createElement("p");
          itemContentDescription.appendChild(price);
          price.innerHTML = panier.price * `${quantityPanier}` + "$";
          price.style.fontSize = "20px";
          // Insertion de l'élément "div"
          let itemContentSettings = document.createElement("div");
          itemContent.appendChild(itemContentSettings);
          itemContentSettings.className = "cart__item__content__settings";
          // Insertion de l'élément "div"
          let itemContentSettingsQuantity = document.createElement("div");
          itemContentSettings.appendChild(itemContentSettingsQuantity);
          itemContentSettingsQuantity.className =
            "cart__item__content__settings__quantity";
          // Insertion de "Qté : "
          let productQte = document.createElement("p");
          itemContentSettingsQuantity.appendChild(productQte);
          productQte.innerHTML = "Qté : ";
          // Insertion de la quantité
          let quantity = document.createElement("input");
          itemContentSettingsQuantity.appendChild(quantity);
          quantity.value = produitLocalStorage[i].quantite;
          quantity.className = "itemQuantity";
          quantity.setAttribute("type", "number");
          quantity.setAttribute("min", "1");
          quantity.setAttribute("max", "100");
          quantity.setAttribute("name", "itemQuantity");
          quantity.setAttribute("value", `${quantityPanier}`);
          // Insertion de l'élément "div"
          let settingsDelete = document.createElement("div");
          itemContentSettings.appendChild(settingsDelete);
          settingsDelete.className = "cart__item__content__settings__delete";
          // Insertion de "p" supprimer
          let supprimer = document.createElement("p");
          settingsDelete.appendChild(supprimer);
          supprimer.className = "deleteItem";
          supprimer.innerHTML = "Supprimer";
        }
        //Fonction Suppression d'un article du panier
        function btnSupprimer() {
          let supprimer = document.querySelectorAll(".deleteItem");
          supprimer.forEach((supprimer) => {
            supprimer.addEventListener("click", (event) => {
              event.preventDefault();
              // On pointe le parent hiérarchique <article> du lien "supprimer"
              let myArticle = supprimer.closest("article");
              // on filtre les éléments du localStorage pour ne garder que ceux qui sont différents de l'élément qu'on supprime
              produitLocalStorage = produitLocalStorage.filter(
                (element) =>
                  element.id !== myArticle.dataset.id ||
                  element.couleur !== myArticle.dataset.color
              );
              // On met à jour le localStorage
              localStorage.setItem(
                "kanape",
                JSON.stringify(produitLocalStorage)
              );
              //Alerte produit supprimé
              alert("Ce produit va être supprimé du panier.");
              window.location.reload();
            });
          });
        }
        btnSupprimer(); ///fin de la fonction Suppression d'un article du panier
        //Fonction calcul du montant total du panier
        function calculPrice() {
          let newPrice = 0;
          // On fait une boucle sur le produitLocalStorage
          for (let m = 0; m < produitLocalStorage.length; m++) {
            const idStorage = produitLocalStorage[m].id;
            const quantityStorage = produitLocalStorage[m].quantite;
            // on vérifie si l'id correspond
            const findProducts = data.find(
              (element) => element._id === idStorage
            );
            // et si c'est le cas, on récupère le prix.
            if (findProducts) {
              const pricePanier = findProducts.price * quantityStorage;
              newPrice += pricePanier;
            }
            //On affichage le nouveau prix total du panier dans le html
            document.getElementById("totalPrice").innerText = newPrice;
          }
        }
        calculPrice(); //----------Fin de la fonction calcul du montant total du panier
        //fonction calcul de la quantité total d'articles dans le panier
        function totalQuantite() {
          let newQuantity = 0;
          for (let k = 0; k < produitLocalStorage.length; k++) {
            //On calcul le nombre de quantité total de produits dans le localStorage
            newQuantity += parseInt(produitLocalStorage[k].quantite);
          }
          //On affichage la nouvelle quantité totale de produits dans le html
          document.getElementById("totalQuantity").innerText = newQuantity;
        }
        totalQuantite(); //fin de la fonction calcul de la quantité total d'articles dans le panier
        //Fonction Modifier la quantité d'un article du panier
        function moreAndLess() {
          // On sélectionne l'élément html (input) dans lequel la quantité est modifiée
          let changeQuantity = document.querySelectorAll(".itemQuantity");
          changeQuantity.forEach((input) => {
            //On écoute le changement sur l'input "itemQuantity"
            input.addEventListener("change", (event) => {
              event.preventDefault();
              changeQuantity = input.valueAsNumber;
              // On pointe le parent hiérarchique <article> de l'input "itemQuantity"
              let myArticle = input.closest("article");
              // On récupère dans le localStorage l'élément (même id et même couleur) dont on veut modifier la quantité
              let selectMyArticle = produitLocalStorage.find(
                (element) =>
                  element.id === myArticle.dataset.id &&
                  element.couleur === myArticle.dataset.color
              );
              if (changeQuantity > 0 && changeQuantity <= 100) {
                let result = parseInt(changeQuantity);
                selectMyArticle.quantite = result;
                //...on met à jour la quantité dans le localStorage et le DOM
                localStorage.setItem(
                  "kanape",
                  JSON.stringify(produitLocalStorage)
                );
                // Sinon, on remet dans le DOM la quantité indiquée dans le localStorage et on indique un message d'erreur
              } else {
                input.value = selectMyArticle.quantite;
              }
              window.location.reload();
            });
          });
        }
        moreAndLess(); // FIN de la Fonction Modifier la quantité d'un article du panier
      });
  }
}
getCart(); //fin

//function getForm() {
//Récupération des coordonnées du formulaire client et mise en variable
const firstName = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
//Création des expressions régulières pour contrôler les infos entrées par l'utilisateur
const regexName = /^[a-zA-Z-\s]+$/;
const regexAddress = /^[a-zA-Z-\s]+[0-9]$/;
const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
let form = document.querySelector(".cart__order__form");
// Ecoute du contenu du champ "firstname",  et affichage d'un message si celui-ci n'est pas correct
form.firstName.addEventListener("change", function () {
  validFirstName(this);
});
const validFirstName = function () {
  let firstNameErrorMsg = firstName.nextElementSibling;
  if (regexName.test(firstName.value)) {
    firstNameErrorMsg.innerHTML = "";
  } else {
    firstNameErrorMsg.innerHTML = "Entrez un prenom valide.";
    firstNameErrorMsg.style.color = "red";
  }
};
// Ecoute du contenu du champ "lastname",  et affichage d'un message si celui-ci n'est pas correct
form.lastName.addEventListener("change", function () {
  validLastName(this);
});
const validLastName = function (nom) {
  let lastNameErrorMsg = lastName.nextElementSibling;
  if (regexName.test(lastName.value)) {
    lastNameErrorMsg.innerHTML = "";
  } else {
    lastNameErrorMsg.innerHTML = "Entrez un nom valide.";
    lastNameErrorMsg.style.color = "red";
  }
};
// Ecoute du contenu du champ "address",  et affichage d'un message si celui-ci n'est pas correct
form.address.addEventListener("change", function () {
  validAdress(this);
});
const validAdress = function (adresse) {
  let adressErrorMsg = address.nextElementSibling;
  if (regexAddress.test(address.value)) {
    adressErrorMsg.innerHTML = "";
  } else {
    adressErrorMsg.innerHTML = "Entrez uue adresse valide.";
    adressErrorMsg.style.color = "red";
  }
};
// Ecoute du contenu du champ "city",  et affichage d'un message si celui-ci n'est pas correct
form.city.addEventListener("change", function () {
  validCity(this);
});
const validCity = function (ville) {
  let cityErrorMsg = city.nextElementSibling;
  if (regexName.test(city.value)) {
    cityErrorMsg.innerHTML = "";
  } else {
    cityErrorMsg.innerHTML = "Entrez un prenom valide.";
    cityErrorMsg.style.color = "red";
  }
};
// Ecoute du contenu du champ "email",  et affichage d'un message si celui-ci n'est pas correct
form.email.addEventListener("change", function () {
  validEmail(this);
});
const validEmail = function (mail) {
  let emailErrorMsg = email.nextElementSibling;

  if (regexMail.test(email.value)) {
    emailErrorMsg.innerHTML = "";
  } else {
    emailErrorMsg.innerHTML = "Entrez un prenom valide.";
    emailErrorMsg.style.color = "red";
  }
};
//Envoi des //Envoi des informations client au localstorage au localstorage
const btn_commander = document.getElementById("order");
//Ecouter le btn envoyer les  informations client au localstorage
btn_commander.addEventListener("click", (event) => {
  event.preventDefault();
  // si les champs sont vide
  if (
    !firstName.value ||
    !lastName.value ||
    !address.value ||
    !city.value ||
    !email.value
  ) {
    // un message d'alerte qui nous indique de remplire tout les champs
    alert("Vous devez renseigner tous les champs !");
    event.preventDefault();
  } else {
    //Construction d'un array depuis le local storage
    idProducts = [];
    //Construction d'un array depuis le local storage
    for (let i = 0; i < produitLocalStorage.length; i++) {
      idProducts.push(produitLocalStorage[i].id);
    }
    // On cré un objet dans lequel on met les infos "Contact" et les infos "Produits du panier" (l'id)
    const form = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: idProducts,
    };
    // on envoie les données Contact et l'id des produits à l'API par la methode "POST"
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //On vide le localStorage
        localStorage.clear("kanape");
        localStorage.setItem("orderId", data.orderId);
        // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  }
});
