(function (window,undefined)
{
  try {

    let mapPlayer = null
    let _mapPlayer = null
    let windowStatus = false
    let mapCoords = null
    let mapSettings = {
      center:[55.74, 37.58],
      zoom:10,
      controls: ["zoomControl","typeSelector"]
    }

    window.Asc.plugin.init = function () {

      document.getElementById("text_id").onchange = function () {

        if (!windowStatus) {
          let newWindow = document.getElementById("id_player")
          newWindow.innerHTML = "<div id=\"map\" style=\"position:absolute;padding:0;margin:0;left:0;top:0;width:100%;height:100%\"></div>"
          windowStatus = true
          window.Asc.plugin.resizeWindow(650, 550, 450, 450, 0, 0)
        }

        const userAddress = document.getElementById("text_id").value

        if (!mapPlayer) {
          function startMap() {
            mapPlayer = new ymaps.Map("map",mapSettings)
            let searchControl = new ymaps.control.SearchControl({
              options: {
                provider: "yandex#search"
              }
            })
            mapPlayer.controls.add(searchControl)
            searchControl.search(userAddress)
            let mapGeocoder = ymaps.geocode(userAddress)
            mapGeocoder.then(
              function (res) {
                console.log(res.geoObjects.get(0).geometry.getCoordinates())
              }
            )
            document.getElementById("text_id").disabled = true
            document.getElementById("button_id").disabled = true
            document.getElementById("button_id").style.visibility = "hidden"
          }
          ymaps.ready(startMap)
        }
      }
    }

      window.Asc.plugin.button = function (id) {

        if (id === 0 && mapPlayer) {

          const _data = document.getElementById("text_id").value

          if (!_mapPlayer) {
            ymaps.ready(startMap)
            function startMap() {
              _mapPlayer = new ymaps.Map("map",mapSettings)
              let mapGeocoder = ymaps.geocode(_data)
              mapGeocoder.then(
                function (res) {
                  mapCoords = res.geoObjects.get(0).geometry.getCoordinates()

                  const ApiKey = "2fc0fb41-8290-4ed4-a5f4-4b0ea93a9710"

                  const _url = "https://static-maps.yandex.ru/v1?ll=" + mapCoords[1] +","+mapCoords[0] +"&z=12&apikey="+ ApiKey

                  if(ApiKey) {
                    let _info = window.Asc.plugin.info

                    let _method = (_info.objectId === undefined)?"AddOleObject" : "EditOleObject"

                    let _param = {
                      guid : _info.guid,
                      widthPix : (_info.mmToPx * _info.width) >> 0,
                      heightPix : (_info.mmToPx * _info.height) >> 0,
                      width : _info.width ? _info.width : 100,
                      height : _info.height ? _info.height : 70,
                      imgSrc : _url,
                      data : _data,
                      objectId : _info.objectId,
                      resize : _info.resize
                    }
                    window.Asc.plugin.executeMethod(_method, [_param], function() {
                      window.Asc.plugin.executeCommand("close","")
                    })
                  }
                  else { this.executeCommand("close", "")}
                }
              )
            }
          }
        }
        else { this.executeCommand("close", "")}
      }
  }
  catch (err)
  {
    console.log("NOT WORKING")
  }

})(window,undefined)

