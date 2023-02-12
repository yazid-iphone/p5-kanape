function confirme() {
  const node = localStorage.getItem("orderId");
  console.log(node);
  const nodeId = document.getElementById("orderId");
  console.log(orderId);
  nodeId.innerText = node;
  //localStorage.clear("orderId");
}

confirme();
