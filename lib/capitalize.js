module.exports = capitalize;

function capitalize(string){
  string = string.toString().split(" ");
  for (let i = 0; i < string.length; i++) {
    string[i] = string[i][0].toUpperCase() + string[i].substr(1);
  }
  string = string.join(" ");
  return string;
}
