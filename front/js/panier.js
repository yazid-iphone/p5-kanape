let produitLocalStorage = JSON.parse(localStorage.getItem("Kanape"));


let cart = document.getElementById("cart__items");

function getCart() {
  if (produitLocalStorage === null || produitLocalStorage == 0) {
    let empty = `<h1>Votre panier est vider ajouter des articles</1>`;
    cart.innerHTML += empty;
  } else {
    for (let i = 0; i < produitLocalStorage.length; i++) {
      let article = document.createElement("article");
      document.querySelector("#cart__items").appendChild(article);
      article.className = "cart__item";
      article.setAttribute("data-id", produitLocalStorage[i].id);
      article.setAttribute("data-color", produitLocalStorage[i].couleur);
      // Insertion de l'élément "div"
      let divImg = document.createElement("div");
      article.appendChild(divImg);
      divImg.className = "cart__item__img";

      // Insertion de l'image
      let productImg = document.createElement("img");
      divImg.appendChild(productImg);
      productImg.src = produitLocalStorage[i].image;
      productImg.alt = produitLocalStorage[i].alt;

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
      title.innerHTML = produitLocalStorage[i].name;

      // Insertion de la couleur
      let color = document.createElement("p");
      title.appendChild(color);
      color.innerHTML = produitLocalStorage[i].couleur;
      color.style.fontSize = "20px";

      // Insertion du prix
      let price = document.createElement("p");
      itemContentDescription.appendChild(price);
      price.innerHTML =
        produitLocalStorage[i].prix * produitLocalStorage[i].quantite + "$";
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
  }
  //}
  //}
  //getCart()

  //function Supprimer() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");
   
    for (let l = 0; l < btn_supprimer.length; l++) {
      btn_supprimer[l].addEventListener("click", (event) => {
        event.preventDefault();
       

        let idDelete = produitLocalStorage[l].id;
      
        let colorDelete = produitLocalStorage[l].couleur;
       

        produitLocalStorage = produitLocalStorage.filter(
          (el) => el.id !== idDelete && el.couleur !== colorDelete
        );
        console.log(produitLocalStorage);

        localStorage.setItem("kanape", JSON.stringify(produitLocalStorage));

        //Alerte produit supprimé et refresh
        //alert("Ce produit a bien été supprimé du panier");
        //location.reload();
      });
    }
    //}
  //}
  //Supprimer();
}
getCart();
function totals() {
  let totalQtt = [];
  ////////////////let inputte = document.querySelectorAll('.itemQuantity');
  for (let m = 0; m < produitLocalStorage.length; m++) {
    let produitQtt = parseInt(produitLocalStorage[m].quantite);
    totalQtt.push(produitQtt);
    console.log(totalQtt);
    const initialValue = 0;
    let qttProduit = totalQtt.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    document.getElementById("totalQuantity").innerHTML = qttProduit;
    console.log(qttProduit);
  }

  let priceTotal = [];
  for (let j = 0; j < produitLocalStorage.length; j++) {
    let qttNumber = parseInt(
      produitLocalStorage[j].prix * produitLocalStorage[j].quantite
    );
    priceTotal.push(qttNumber);
    console.log(priceTotal);

    const initialValue = 0;
    let qttFinal = priceTotal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );

    console.log(qttFinal);

    let final = (document.querySelector("#totalPrice").innerHTML = qttFinal);
    console.log(final);
  }
}
totals();
function moreAndLess() {
  let input = document.querySelectorAll(".itemQuantity");
  console.log(input);
  for (let k = 0; k < input.length; k++) {
    input[k].addEventListener("change", (event) => {
      event.preventDefault();
      console.log(event);

      let qttModif = produitLocalStorage[k].quantite; //quantite+produitLocalStorage[k].prix;
      console.log(qttModif);
      let qttModifValue = input[k].value;

      console.log(qttModifValue);

      const result = produitLocalStorage.find(
        (el) => el.qttModifValue !== qttModif
      );
      console.log(result);

      result.quantite = qttModifValue;
      produitLocalStorage[k].quantite = result.quantite;
      document.getElementById("totalQuantity").innerHTML += qttModifValue;
      localStorage.setItem("kanape", JSON.stringify(produitLocalStorage));
      location.reload();
    });
  }
}

moreAndLess();
function getForm() {
  const prenom = document.getElementById("firstName");
  const nom = document.getElementById("lastName");
  const adresse = document.getElementById("address");
  const ville = document.getElementById("city");
  const mail = document.getElementById("email");

  const btn_commander = document.getElementById("order");

  //Ecouter le panier
  btn_commander.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    //////////////////////////////////////////////////////////////////////////yazid////////
    const regexName = /^[a-zA-Z-\s]+$/;

    const firstNameError = document.getElementById("firstNameErrorMsg");
    if (prenom.value == "") {
      firstNameError.innerHTML = "le champs et requis.";
      firstNameError.style.color = "red";
      event.stopPropagation();
    } else if (regexName.test(prenom.value) == false) {
      firstNameError.innerHTML = "Entrez un prenom  valide.";
      firstNameError.style.color = "orange";
      event.stopPropagation();
    }

    const lastNameError = document.getElementById("lastNameErrorMsg");
    if (nom.value == "") {
      lastNameError.innerHTML = "le champs et requis.";
      lastNameError.style.color = "red";
      event.stopPropagation();
    } else if (regexName.test(nom.value) == false) {
      lastNameError.innerHTML = "Entrez un nom valide.";
      lastNameError.style.color = "orange";
      event.stopPropagation();
    }

    const adressError = document.getElementById("addressErrorMsg");
    if (adresse.value.trim() == "") {
      adressError.innerHTML = "le champs et requis.";
      adressError.style.color = "red";
      event.stopPropagation();
    } else if (regexName.test(adresse.value) == false) {
      adressError.innerHTML = "Entrez une addresse valide.";
      adressError.style.color = "orange";
      event.stopPropagation();
    }
    const cityError = document.getElementById("cityErrorMsg");
    if (city.value.trim() == "") {
      cityError.innerHTML = "le champs et requis.";
      cityError.style.color = "red";
      event.stopPropagation();
    } else if (regexName.test(city.value) == false) {
      cityError.innerHTML = "Entrez une ville valide.";
      cityError.style.color = "orange";
      event.stopPropagation();
    }
    const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emailError = document.getElementById("emailErrorMsg");
    if (mail.value.trim() == "") {
      emailError.innerHTML = "le champs et requis.";
      emailError.style.color = "red";
      event.stopPropagation();
    } else if (regexMail.test(mail.value) == false) {
      emailError.innerHTML = "Entrez une addresse mail valide.";
      emailError.style.color = "orange";
      event.stopPropagation();
    }

    idProducts = [];
    for (let i = 0; i < produitLocalStorage.length; i++) {
      idProducts.push(produitLocalStorage[i].id);
    }

    console.log(idProducts);

    const form = {
      contact: {
        firstName: prenom,
        lastName: nom,
        address: adresse,
        city: ville,
        email: mail,
      },
      products: idProducts,
    };
    console.log(form);
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
        console.log(data);
        //localStorage.clear("kanape");
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Problème avec fetch : " + err.message);
      });
  });
}
getForm();
