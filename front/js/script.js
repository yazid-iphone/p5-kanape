
//const promise = fetch("http://localhost:3000/api/products")


//promise.then((response) => {console.log(response)
 // const yazid = response.json();
 // console.log(yazid);

 // yazid.then((product) => {
      //data = product;
      
      
  //for (i = 0; i < data.length; i++){ 
 // console.log(data.length)
  //let display =document.getElementById("items");
  //console.log(display)
   //display.innerHTML+=                            
  //`
  //<a href="./product.html?id=${data[i]._id}">
    //<article>
     // <img
        //src="${data[i].imageUrl}"
        //alt="${data[i].altTxt}"
      ///>
     // <h3 class="productName">${data[i].name}</h3>
     // <p class="productDescription">
      //  ${data[i].description}
      //</p>
    //</article>
  //</a>
//`;
  //console.log(display)
  

//}
//})

//});
main()
 async function main(){

  const produit = await fetchProduis()
  console.log(produit)
  for (i = 0; i < produit.length; i++)
  //for(let produit in produits)
  {
  display(produit)}

}
function fetchProduis(){
 return fetch("http://localhost:3000/api/products")
.then(function(response){
return response.json()
})
//console.log(response.json)

.then(function(produit){
  return produit
  //console.log(prod)
})
.catch(function(err){
  alert(err)
}
);
}
function display(produit){
 

  document.getElementById("items").innerHTML+=                            
  `
  <a href="./product.html?id=${produit[i]._id}">
    <article>
      <img
        src="${produit[i].imageUrl}"
        alt="${produit[i].altTxt}"
      >
      <h3 class="productName">${produit[i].name}</h3>
      <p class="productDescription">
        ${produit[i].description}
      </p>
    </article>
  </a>
`;
}