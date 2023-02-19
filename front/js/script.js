// Sélection de l'emplacement dans lequel on va afficher nos produits, sur la page d'accueil. Ici dans la section avec l'id "items".
const items = document.querySelector("#items");
// On récupère toutes les données de l'api que l'on met dans un constante listProducts
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) => {
    for (const listProducts of data) {
      console.log(listProducts);
      // on cré les éléments html manquants de la page index.html et on y insère les données de l'api
       // Insertion de l'élément "a"
      let newLink = document.createElement("a");
      newLink.setAttribute("href", `./product.html?id=${listProducts._id}`);
      items.appendChild(newLink);
 // Insertion de l'élément "article"
      let newArticle = document.createElement("article");
      newLink.appendChild(newArticle);
  // Insertion de l'image
      let newImg = document.createElement("img");
      newImg.setAttribute("src", listProducts.imageUrl);
      newImg.setAttribute("alt", listProducts.altTxt);
      newArticle.appendChild(newImg);
// Insertion du titre "h3"
      let newH3 = document.createElement("h3");
      newH3.setAttribute("class", "productName");
      newH3.innerText = listProducts.name;
      newArticle.appendChild(newH3);
// Insertion de la description "p"
      let newP = document.createElement("p");
      newP.setAttribute("class", "productDescription");
      newP.innerText = listProducts.description;
      newArticle.appendChild(newP);
    }
  })
  .catch((err) => {
    alert(
      `Une erreur s'est produite et ne permet pas d'afficher les produits de notre catalogue. Veuillez nous en excuser !`
    );
    console.log("Erreur Fetch script.js", err);
  });
