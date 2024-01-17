module.exports = getDateAndTime;

function getDateAndTime(){
  const year = new Date().getFullYear();
  let time = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  if(time[0]=='0'){
    time = time.slice(1);
  }
  return [year, time];
}
