(function (window,undefined)
{
  let userAddress = document.getElementById("userSearch").value
  let windowStatus = false

  function startMap ()
  {
    newMap = new ymap("map",{center:[55.74, 37.58],zoom:10},{searchControlProvider: "yandex#search"})
    newMap.controls.add(searchControl)
    searchControl.search(userAddress)
  }

  window.Asc.plugin.init = function () {
    ymap.ready(startMap)

    if (e.keyCode == 13) {
      document.getElementById("button_id").onclick
    }

    if (this.info.isViewMode) {
      document.getElementById("userSearch").disable = true
      document.getElementById("button_id").disable = true
    }

    if (!windowStatus) {
      let player = document.getElementById("id_player")
      player.innerHTML = "<div id=\"map\" style=\"width: 600px; height: 400px\"></div>";
      windowStatus = true;
      window.Asc.plugin.resizeWindow(620, 480, 390, 400, 0, 0)
    }
  }
})(window,undefined)

