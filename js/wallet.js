async function connectWallet() {
  if (window.ethereum) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("walletAddress").innerText = accounts[0];
  } else {
    alert("MetaMask is not installed.");
  }
}
