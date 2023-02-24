//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("Kanape"));
// Récupération de la chaîne de requête dans l'URL du navigateur et Extraction de l'ID de l'URL
let params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const colorSelected = document.querySelector("#colors");
const quantiteSelected = document.querySelector("#quantity");
// Si on a bien récupéré un id on récupère les données de l'API correspondant à cet id
const urlProduct = `http://localhost:3000/api/products/${productId}`;
let cardsFetch = function () {
  fetch(urlProduct)
    .then((response) => response.json())
    // Répartition des données de l'API dans le DOM
    .then((api) => {
      response = api;
      // Insertion du data img
      let img = document.createElement("img");
      document.querySelector(".item__img").appendChild(img);
      img.src = api.imageUrl;
      img.alt = api.altTxt;
      // Insertion du titre "h1"
      let name = document.getElementById("title");
      name.innerHTML = api.name;
      // Insertion du prix
      let price = document.getElementById("price");
      price.innerHTML = api.price;
      // Insertion de la description
      let description = document.getElementById("description");
      description.innerHTML = api.description;
      // Insertion des options de couleurs
      for (let colors of api.colors) {
        //console.log(colors);
        let color = document.createElement("option");
        document.querySelector("#colors").appendChild(color);
        color.value = colors;
        color.innerHTML = colors;
      }
      //Gestion du panier
      let btn_envoyer = document.getElementById("addToCart");
      //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
      btn_envoyer.addEventListener("click", (e) => {
        e.preventDefault();
        if (
          quantiteSelected.value > 0 &&
          quantiteSelected.value <= 100 &&
          quantiteSelected.value != 0 &&
          colorSelected.value !== ""
        ) {
          //Recupération du choix de la couleur
          let couleur = colorSelected.value;
          //Recupération du choix de la quantité
          let quantite = quantiteSelected.value;
          //Récupération des options de l'article à ajouter au panier
          let produitList = {
            _id: `${productId}`,
            couleur: couleur,
            quantite: Number(quantite),
          };
          //fenêtre pop-up
          const popupConfirmation = () => {
            if (
              window.confirm(`Votre commande ${api.name}  ${api.price}$ est ajoutée au panier
      Pour consulter votre panier, cliquez sur OK`)
            ) {
              window.location.href = "cart.html";
            }
          };
          //Importation dans le local storage
          //Si le panier comporte déjà au moins 1 article
          if (produitLocalStorage) {
            const found = produitLocalStorage.find(
              (element) =>
                element.id == produitList.id &&
                element.couleur == produitList.couleur
            );
            //SI PRODUIT AVEC MEME ID ET COULEUR AUGMENTER LA QUANTITE
            if (found) {
              let newQuantite =
                parseInt(produitList.quantite) + parseInt(found.quantite);
              found.quantite = newQuantite;
              localStorage.setItem(
                "kanape",
                JSON.stringify(produitLocalStorage)
              );
              popupConfirmation();
              //SI PRODUIT AVEC MEME ID ET COULEUR AUGMENTER LA QUANTITE
            } else {
              produitLocalStorage.push(produitList);
              localStorage.setItem(
                "kanape",
                JSON.stringify(produitLocalStorage)
              );
              popupConfirmation();
            }
            //Si le panier est vide
          } else {
            produitLocalStorage = [];
            produitLocalStorage.push(produitList);
            localStorage.setItem("kanape", JSON.stringify(produitLocalStorage));
            popupConfirmation();
          }
        } else {
          alert("veuiller choisir une qtt et une couleur");
        }
      });
    });
};
cardsFetch();
