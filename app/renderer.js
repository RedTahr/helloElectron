"use strict";
var os = require("os");
console.log("renderer fired.");
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('platform-info').innerHTML = os.platform();
});
//# sourceMappingURL=renderer.js.map
