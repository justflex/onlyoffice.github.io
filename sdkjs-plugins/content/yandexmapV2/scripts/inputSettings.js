'use strict';

let userAddress = '';

(function (window, undefined) {

  window.Asc.plugin.init = function () {
  }

  if (Number(localStorage.getItem('theme_yandex_map_plugin'))) {
    document.getElementById('text_id').style.backgroundColor = '#2a2a2a';
    document.getElementById('text_id').style.color = 'whitesmoke';
  }

  document.getElementById('text_id').oninput = document.getElementById('text_id').onpaste = function () {
    document.getElementById('text_id').style.border = '1px solid grey';
    document.getElementById('label_error').style.display = 'none';
  }

  document.querySelector('input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      userAddress = document.getElementById("text_id").value;

      if (userAddress === '') {
        document.getElementById('label_error').style.display = 'block';
        document.getElementById('text_id').style.border = '1px solid #d9534f';
      } else if (userAddress !== '') {
        localStorage.setItem("text_plugin_yandex_map_item", userAddress);
        window.Asc.plugin.sendToPlugin("onWindowReady");
      }
    }
  });

  localStorage.setItem('autoEnter_yandex_map_item', '0')

  window.Asc.plugin.onTranslate = function ()
  {
    let lab = document.querySelector("label");
    let inp = document.querySelector("input");
    let lab_err = document.getElementById('label_error');
    if(lab)
    {
      lab.innerHTML = window.Asc.plugin.tr("Your address");
    }
    if(inp)
    {
      inp.placeholder = window.Asc.plugin.tr("Enter your address and press Enter");
    }
    if(lab_err)
    {
      lab_err.innerHTML = window.Asc.plugin.tr("The field is empty");
    }
  }


})(window, undefined);