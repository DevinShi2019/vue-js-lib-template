/* * Copyright © 2019-2021 DevinShi */
var assetsLoader = {
  requireAllSvg: function requireAllSvg() {
    var requireAll = function requireAll(requireContext) {
      return requireContext.keys().map(requireContext);
    };

    var req = require.context('./assets/icon', true, /\.svg$/);

    console.log(req);
    requireAll(req);
  }
};

export default assetsLoader;if (window) { window.document.addEventListener('DOMContentLoaded', function(){ var div = document.createElement('div'); div.setAttribute('style', 'position: absolute; height:0; width: 0; overflow: hidden;');  div.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><defs><style>\n    .sprite-symbol-usage {display: none;}\n    .sprite-symbol-usage:target {display: inline;}\n  </style></defs></svg>";  window.document.body.appendChild(div) }); }
