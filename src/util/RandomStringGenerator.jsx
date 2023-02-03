export function randomStringGenerator(num) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let name = [];

  for (let i = 0; i < num; i++) {
    name.push(characters[Math.floor(Math.random() * 36)]);
  }
  return name.join("");
}
