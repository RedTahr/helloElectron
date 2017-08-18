import * as os from "os"; // native node.js module

console.log("renderer fired.");

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('platform-info').innerHTML = os.platform();
});
