module.exports = formatTemp;

function formatTemp(string){
  string = string.toString().slice(0, 2)
  if(string[1]=='.'){
    return string = string.slice(0,1);
  } else {
    return string;
  }
}
