function generateRandomNumber(cant) {
  const counts = {};
  const randomNumbers = [];
  for (let i = 1; i <= cant; i++) {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    randomNumbers.push(randomNumber);
  }
  randomNumbers.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  return (counts);
}

process.on("message", (cant) => {
  const response = generateRandomNumber(cant)
  process.send(response)
  process.exit()
})

process.send("done")