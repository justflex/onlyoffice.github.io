'use strict';

(function(window,undefined) {

  let userAddress = ''

  window.Asc.plugin.init = function () {}

  document.getElementById('text_id').oninput = document.getElementById('text_id').onpaste = function ()
  {
    document.getElementById('text_id').style.border = '1px solid grey';
    document.getElementById('label_error').style.display = 'none';
  }

  document.querySelector('input').addEventListener('keydown',function (e){
    if(e.key === 'Enter')
    {
      userAddress = document.getElementById("text_id").value;

      if(userAddress === '')
      {
        document.getElementById('text_id').style.borderColor = '#d9534f';
        document.getElementById('label_error').style.display = 'block';
        window.Asc.plugin.sendToPlugin("onWindowInputError");
      }
      else if(userAddress !== '')
      {
        localStorage.setItem("text_plugin_yandex_map_item", userAddress);
        window.Asc.plugin.sendToPlugin("onWindowReady");
      }
    }
  })

  localStorage.setItem('autoEnter_yandex_map_item','0')

  window.Asc.plugin.onTranslate = function ()
  {
    let lab = document.querySelector("label");
    let inp = document.querySelector("input");
    if(lab)
    {
      lab.innerHTML = window.Asc.plugin.tr("Your address");
    }
    if(inp)
    {
      inp.placeholder = window.Asc.plugin.tr("Enter your address and press Enter");
    }
  }


})(window,undefined);