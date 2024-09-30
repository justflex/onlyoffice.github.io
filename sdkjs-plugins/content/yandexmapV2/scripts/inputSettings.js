(function(window,undefined) {

  let windowStatus = false

  window.Asc.plugin.init = function () {

    document.getElementById("text_id").onchange = function () {

      if (!windowStatus) {
        let newWindow = document.getElementById("id_player")
        newWindow.innerHTML = "<div id=\"map\" style=\"position:absolute;padding:0;margin:0;left:0;top:0;width:100%;height:100%\"></div>"
        windowStatus = true
      }

      const userAddress = document.getElementById("text_id").value

      localStorage.setItem("text_key", userAddress)

    }
  }

  window.Asc.plugin.onTranslate = function ()
  {
    let lab = document.querySelector("label")
    if(lab)
    {
      lab.innerHTML = window.Asc.plugin.tr("Enter your address")
    }
  }


})(window,undefined);