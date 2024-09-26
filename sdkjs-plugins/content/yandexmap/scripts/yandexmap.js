(function (window,undefined)
{
    let mapPlayer = null
    let mapZoom = null
    let windowStatus = false
    let mapCoords = null
    let mapSettings = {
      center:[55.74, 37.58],
      zoom:10,
      controls: ["zoomControl","typeSelector"]
    }
    let variation = {}
    let windowObject = null

    window.Asc.plugin.init = function (text) {

      let check = text
      if(check !== "")
      {
        document.getElementById("text_id").value = localStorage.getItem("text_key")

        if (!windowStatus) {
          let newWindow = document.getElementById("id_player")
          newWindow.innerHTML = "<div id=\"map\" style=\"position:absolute;padding:0;margin:0;left:0;top:0;width:100%;height:100%\"></div>"
          windowStatus = true
          window.Asc.plugin.resizeWindow(650, 550, 450, 450, 0, 0)
        }

        mapSettings.center[0] = Number(localStorage.getItem("key1").split(",")[0])
        mapSettings.center[1] = Number(localStorage.getItem("key1").split(",")[1])
        mapSettings.zoom = Number(localStorage.getItem("key2"))

        if (!mapPlayer) {
          function startMap() {
            mapPlayer = new ymaps.Map("map",mapSettings)
            document.getElementById("text_id").disabled = false

            mapPlayer.events.add("click",function (e)
            {
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
            })

            window.Asc.plugin.button = function (id) {

              if (id === 0 && mapPlayer) {

                if (true) {

                  const ApiKey = "2fc0fb41-8290-4ed4-a5f4-4b0ea93a9710"

                  mapCoords = mapPlayer.getCenter()
                  mapZoom = mapPlayer.getZoom()

                  localStorage.setItem("key1",mapCoords)
                  localStorage.setItem("key2",mapZoom)

                  const _url = "https://static-maps.yandex.ru/v1?ll=" + mapCoords[1] +","+mapCoords[0] +"&z=" +mapZoom+ "&apikey="+ ApiKey

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
                      data : check,
                      objectId : _info.objectId,
                      resize : _info.resize
                    }
                    window.Asc.plugin.executeMethod(_method, [_param], function() {
                      window.Asc.plugin.executeCommand("close","")
                    })
                  }
                  else { this.executeCommand("close", "")}
                }
              }
              else { this.executeCommand("close", "")}
            }
          }
          ymaps.ready(startMap)
        }
      }

      else {

        variation = {
          url: 'C:\\Users\\csgop\\WebstormProjects\\onlyoffice.github.io\\sdkjs-plugins\\content\\yandexmap\\index.html',
          description: 'YandexMaps',
          isVisual: true,
          isModal: true,
          "buttons": [
            {
              "text": "Ok",
              "primary": true,
            },
            {
              "text": "Cancel",
              "primary": false,
            }
          ],
          EditorsSupport: ['slide', 'word', 'cell'],
          "size": [ 350, 90 ]
        };

        windowObject = new window.Asc.PluginWindow()
        windowObject.show(variation)

        document.getElementById("text_id").onchange = function () {


          if (!windowStatus) {
            let newWindow = document.getElementById("id_player")
            newWindow.innerHTML = "<div id=\"map\" style=\"position:absolute;padding:0;margin:0;left:0;top:0;width:100%;height:100%\"></div>"
            windowStatus = true
            window.Asc.plugin.resizeWindow(650, 550, 450, 450, 0, 0)
          }

          const userAddress = document.getElementById("text_id").value

          localStorage.setItem("text_key", userAddress)

          if (!mapPlayer) {
            function startMap() {
              mapPlayer = new ymaps.Map("map", mapSettings)
              let searchControl = new ymaps.control.SearchControl({
                options: {
                  provider: "yandex#search"
                }
              })
              mapPlayer.controls.add(searchControl)
              searchControl.search(userAddress)
              document.getElementById("text_id").disabled = true


              window.Asc.plugin.button = function (id) {

                if (id === 0 && mapPlayer) {

                  if (true) {

                    const ApiKey = "2fc0fb41-8290-4ed4-a5f4-4b0ea93a9710"

                    mapCoords = mapPlayer.getCenter()
                    mapZoom = mapPlayer.getZoom()

                    localStorage.setItem("key1", mapCoords)
                    localStorage.setItem("key2", mapZoom)

                    const _url = "https://static-maps.yandex.ru/v1?ll=" + mapCoords[1] + "," + mapCoords[0] + "&z=" + mapZoom + "&apikey=" + ApiKey

                    if (ApiKey) {
                      let _info = window.Asc.plugin.info

                      let _method = (_info.objectId === undefined) ? "AddOleObject" : "EditOleObject"

                      let _param = {
                        guid: _info.guid,
                        widthPix: (_info.mmToPx * _info.width) >> 0,
                        heightPix: (_info.mmToPx * _info.height) >> 0,
                        width: _info.width ? _info.width : 100,
                        height: _info.height ? _info.height : 70,
                        imgSrc: _url,
                        data: userAddress,
                        objectId: _info.objectId,
                        resize: _info.resize
                      }

                      window.Asc.plugin.executeMethod(_method, [_param], function () {
                        window.Asc.plugin.executeCommand("close", "")
                      })
                    } else {
                      this.executeCommand("close", "")
                    }
                  }
                } else {
                  this.executeCommand("close", "")
                }
              }
            }

            ymaps.ready(startMap)
          }
        }
      }
    }
    window.Asc.plugin.button = function (id){
      windowObject.close()
    }

    window.Asc.plugin.onTranslate = function ()
    {
      let lab = document.querySelector("label")
      if(lab)
      {
        lab.innerHTML = window.Asc.plugin.tr("Enter your address")
      }
    }

})(window,undefined)


