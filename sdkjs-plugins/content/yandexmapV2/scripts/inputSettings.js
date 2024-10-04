'use strict';

(function(window,undefined) {

  window.Asc.plugin.init = function () {

    document.getElementById("text_id").onchange = function () {

      const userAddress = document.getElementById("text_id").value;

      localStorage.setItem("text_plugin_yandex_map_item", userAddress);
    }
  }

  document.querySelector('input').addEventListener('keydown',function (e){
    if(e.key === 'Enter')
    {
      window.Asc.plugin.sendToPlugin("onWindowReady");
    }
  })

  localStorage.setItem('autoEnter_yandex_map_item','0')

  window.Asc.plugin.onTranslate = function ()
  {
    let lab = document.querySelector("label");
    if(lab)
    {
      lab.innerHTML = window.Asc.plugin.tr("Enter your address");
    }
  }


})(window,undefined);