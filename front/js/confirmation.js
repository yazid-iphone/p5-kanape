function confirme() {
  // Sélection de l'élément html dans lequel on veut afficher le numéro de commande
  const node = localStorage.getItem("orderId");
  // On insère le numéro de commande dans le html
  const nodeId = document.getElementById("orderId");
  nodeId.innerText = node;
  //localStorage.clear("orderId");
}
confirme();
