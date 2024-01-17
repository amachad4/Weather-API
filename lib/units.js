module.exports = unitSelection;

function unitSelection(unitType){
  const unit = (unitType === "Fahrenheit") ? 'imperial' : 'metric';
  const unitLetter = (unit === "imperial") ? "F" : "C";
  return [unit, unitLetter];
}
