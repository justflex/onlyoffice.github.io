(function(window,undefined) {

  let mapPlayer = null
  let mapZoom = null
  let windowStatus = false
  let mapCoords = null
  let mapSettings = {
    center:[55.74, 37.58],
    zoom:10,
    controls: ["zoomControl","typeSelector"]
  }


  window.Asc.plugin.init = function() {

    document.getElementById("text_id").value = localStorage.getItem("text_key")

    if (!windowStatus) {
      let newWindow = document.getElementById("id_player")
      newWindow.innerHTML = "<div id=\"map\" style=\"position:absolute;padding:0;margin:0;left:0;top:0;width:100%;height:100%\"></div>"
      windowStatus = true
    }

    mapSettings.center[0] = Number(localStorage.getItem("key1").split(",")[0])
    mapSettings.center[1] = Number(localStorage.getItem("key1").split(",")[1])
    mapSettings.zoom = Number(localStorage.getItem("key2"))

    if (!mapPlayer) {
      function startMap() {
        mapPlayer = new ymaps.Map("map",mapSettings)
        document.getElementById("text_id").disabled = false

        document.querySelector('input').addEventListener('keydown' ,function (e){
          if(e.key === 'Enter') {
            const userAddress = document.getElementById("text_id").value
            localStorage.setItem("text_key", userAddress)
            let searchControl = new ymaps.control.SearchControl({
              options: {
                provider: "yandex#search"
              }
            })
            mapPlayer.controls.add(searchControl)
            searchControl.search(userAddress)
            document.getElementById("text_id").disabled = true
          }
        })

        mapPlayer.events.add("mousemove", function (e) {
          mapCoords = mapPlayer.getCenter()
          mapZoom = mapPlayer.getZoom()

          localStorage.setItem("key1", mapCoords)
          localStorage.setItem("key2", mapZoom)

        })

      }
      ymaps.ready(startMap)
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