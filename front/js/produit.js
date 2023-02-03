let produitLocalStorage = JSON.parse(localStorage.getItem("Kanape"));
let params = new URLSearchParams(window.location.search);
//console.log(params)
const productId = params.get("id");
//console.log(productId)
const colorSelected = document.querySelector("#colors");
const quantiteSelected = document.querySelector("#quantity");
const urlProduct = `http://localhost:3000/api/products/${productId}`;
//console.log(urlProduct);
let cardsFetch = function () {
  fetch(urlProduct)
    .then((response) => response.json())
    .then((api) => {
      response = api;
      console.log(api);
      // get data img

      let img = document.createElement("img");
      document.querySelector(".item__img").appendChild(img);
      img.src = api.imageUrl;
      img.alt = api.altTxt;

      // Modification du titre "h1"
      let name = document.getElementById("title");
      name.innerHTML = api.name;

      // Modification du prix
      let price = document.getElementById("price");
      price.innerHTML = api.price;

      // Modification de la description
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

      //cardsFetch();
      //function addToCart() {
      let btn_envoyer = document.getElementById("addToCart");
      console.log(btn_envoyer);
      btn_envoyer.addEventListener("click", (e) => {
        e.preventDefault();
        if (
          quantiteSelected.value > 0 &&
          quantiteSelected.value <= 100 &&
          quantiteSelected.value != 0
        ) {
          //Recupération du choix de la couleur
          let couleur = colorSelected.value;

          //Recupération du choix de la quantité
          let quantite = quantiteSelected.value;

          let produitList = {
            id: `${productId}`,
            couleur: couleur,
            quantite: Number(quantite),
            prix: api.price,
            name: api.name,
            alt: api.altTxt,
            description: api.description,
            image: api.imageUrl,
          };

          console.log(produitList);
          produitLocalStorage = JSON.parse(localStorage.getItem("Kanape"));
          //fenêtre pop-up
          const popupConfirmation = () => {
            if (
              window.confirm(`Votre commande ${api.name}  ${api.price}$ est ajoutée au panier
      Pour consulter votre panier, cliquez sur OK`)
            ) {
              window.location.href = "cart.html";
            }
          };

          if (produitLocalStorage) {
            const found = produitLocalStorage.find(
              (element) =>
                element.id == produitList.id &&
                element.couleur == produitList.couleur
            );

            if (found) {
              let newQuantite =
                parseInt(produitList.quantite) + parseInt(found.quantite);
              found.quantite = newQuantite;

              localStorage.setItem(
                "Kanape",
                JSON.stringify(produitLocalStorage)
              );
              popupConfirmation();
              //SI PRODUIT AVEC MEME ID ET COULEUR AUGMENTER LA QUANTITE
            } else {
              produitLocalStorage.push(produitList);

              localStorage.setItem(
                "Kanape",
                JSON.stringify(produitLocalStorage)
              );
              popupConfirmation();
            }
          } else {
            produitLocalStorage = [];
            produitLocalStorage.push(produitList);
            localStorage.setItem("Kanape", JSON.stringify(produitLocalStorage));
            popupConfirmation();
          }
        }
        //localStorage.clear("kanape");
      });
      // }
    });
};
//localStorage.clear("kanape");
cardsFetch();
