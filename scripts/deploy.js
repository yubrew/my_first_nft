async function main() {
  const MyFirstNFT = await ethers.getContractFactory("MyFirstNFT")

  // Start deployment, returning a promise that resolves to a contract object
  const myFirstNFT = await MyFirstNFT.deploy()
  console.log("Contract deployed to address:", myFirstNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

