(function (window,undefined)
{
  let userAddress = ""
  let windowStatus = false

  function startMap ()
  {
   let newMap = new ymaps.Map("map",{center:[55.74, 37.58],zoom:10},{searchControlProvider: "yandex#search"})
    newMap.controls.add(searchControl)
    searchControl.search(userAddress)
  }

  const getUserAddress = (add_id) => {
    document.getElementById("button_id").onclick
    {
      add_id = document.getElementById("userSearch").value
    }
  }

  window.Asc.plugin.init = function () {
    getUserAddress(userAddress)
    ymaps.ready(startMap)

    if (e.keyCode == 13) {
      document.getElementById("button_id").onclick
    }
    //
    // if (this.info.isViewMode) {
    //   document.getElementById("userSearch").disable = true
    //   document.getElementById("button_id").disable = true
    // }

    if (!windowStatus) {
      let player = document.getElementById("id_player")
      player.innerHTML = "<div id=\"map\" style=\"width: 600px; height: 400px\"></div>";
      windowStatus = true;
      window.Asc.plugin.resizeWindow(620, 480, 390, 400, 0, 0)
    }
  }
  window.Asc.plugin.button = function(id)
  {
    this.executeCommand("close", "");
  }

})(window,undefined)

