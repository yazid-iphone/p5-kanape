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
}
getCart();

function Supprimer() {
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
      alert("Ce produit a bien été supprimé du panier");
      //location.reload();
    });
  }
  //}
}
Supprimer();
//}
//getCart();
function totals() {
  let ttq = document.getElementById("totalQuantity");
  let totalQtt = [];
  for (let m = 0; m < produitLocalStorage.length; m++) {
    let produitQtt = parseInt(produitLocalStorage[m].quantite);
    totalQtt.push(produitQtt);
    console.log(totalQtt);
    const initialValue = 0;
    let qttProduit = totalQtt.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );
    ttq.innerHTML = qttProduit;
    console.log(qttProduit);
  }

  let final = document.querySelector("#totalPrice");
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

    final.innerHTML = qttFinal;
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
      let qttModif = produitLocalStorage[k].quantite;
      console.log(qttModif);
      let qttModifValue = input[k].valueAsNumber;
      console.log(qttModifValue);
      const result = produitLocalStorage.find(
        (el) => el.qttModifValue !== qttModif
      );
      console.log(result);
      result.quantite = qttModifValue;
      produitLocalStorage[k].quantite = result.quantite;
      let recalculer = document.getElementById("totalQuantity");
      recalculer.innerHTML += result.quantite;
      localStorage.setItem("kanape", JSON.stringify(produitLocalStorage));
      //location.reload();
    });
  }
}

moreAndLess();
function getForm() {
  const regexName = /^[a-zA-Z-\s]+$/;
  const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let form = document.querySelector(".cart__order__form");

  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });
  const validFirstName = function (prenom) {
    let firstNameErrorMsg = prenom.nextElementSibling;

    if (regexName.test(prenom.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Entrez un prenom valide.";
      firstNameErrorMsg.style.color = "red";
    }
  };
  ///////////////
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });
  const validLastName = function (nom) {
    let lastNameErrorMsg = nom.nextElementSibling;

    if (regexName.test(nom.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Entrez un nom valide.";
      lastNameErrorMsg.style.color = "red";
    }
  };
  //////////////////////
  form.address.addEventListener("change", function () {
    validAdress(this);
  });
  const validAdress = function (adresse) {
    let adressErrorMsg = adresse.nextElementSibling;

    if (regexName.test(adresse.value)) {
      adressErrorMsg.innerHTML = "";
    } else {
      adressErrorMsg.innerHTML = "Entrez un prenom valide.";
      adressErrorMsg.style.color = "red";
    }
  };
  ////////////////////
  form.city.addEventListener("change", function () {
    validCity(this);
  });
  const validCity = function (ville) {
    let cityErrorMsg = ville.nextElementSibling;

    if (regexName.test(ville.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Entrez un prenom valide.";
      cityErrorMsg.style.color = "red";
    }
  };
  /////////////////////////
  form.email.addEventListener("change", function () {
    validEmail(this);
  });
  const validEmail = function (mail) {
    let emailErrorMsg = mail.nextElementSibling;

    if (regexMail.test(mail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Entrez un prenom valide.";
      emailErrorMsg.style.color = "red";
    }
  };
}
getForm();
const btn_commander = document.getElementById("order");

//Ecouter le panier
btn_commander.addEventListener("click", (event) => {
  event.preventDefault();
  const prenom = document.getElementById("firstName");
  const nom = document.getElementById("lastName");
  const adresse = document.getElementById("address");
  const ville = document.getElementById("city");
  const mail = document.getElementById("email");
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
      localStorage.clear("kanape");
      localStorage.setItem("orderId", data.orderId);
       document.location.href = "confirmation.html";
    })
    .catch((err) => {
      alert("Problème avec fetch : " + err.message);
    });
});
