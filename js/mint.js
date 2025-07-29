const fighterCoreAddress = "0x4f27c698949347De9B7206c36342656949A6E3AA";
const fighterCoreABI = [
  "function mintFighter(string,string,string,uint8,uint8,uint8) public returns (uint256)"
];

async function mintFighter() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(fighterCoreAddress, fighterCoreABI, signer);

  const tx = await contract.mintFighter("Echo Vanta", "Shadow", "Assassin", 10, 12, 8);
  await tx.wait();
  alert("Fighter Minted!");
}
