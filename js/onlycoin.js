const onlyCoinAddress = "0xC0912c990fe376Bc74776b79BAf28456dAdDC055";
const onlyCoinABI = [
  "function approve(address spender, uint256 amount) public returns (bool)"
];

async function stakeToPlay() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const onlyCoin = new ethers.Contract(onlyCoinAddress, onlyCoinABI, signer);

  const amount = ethers.utils.parseUnits("10", 18);
  const tx = await onlyCoin.approve("0x4f27c698949347De9B7206c36342656949A6E3AA", amount);
  await tx.wait();
  alert("10 ONLY staked! You can now enter the match.");
}
