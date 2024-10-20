'use strict';

(function (window, undefined) {

  let mapPlayer = null;
  let mapZoom = null;
  let windowStatus = false;
  let mapCoords = null;
  let mapSettings = {
    center: [55.74, 37.58],
    zoom: 10,
    controls: ["zoomControl", "typeSelector"]
  };
  let userAddress = '';

  function setMapLayer(map, map_type) {
    const MAP = 'custom#' + map_type;
    ymaps.layer.storage.add(MAP, function mapLayer() {
      return new ymaps.Layer('https://core-renderer-tiles.maps.yandex.net/tiles?l=map' + ((map_type == 'dark') ? ('&theme=dark') : ('')) + '&%c&%l');
    });
    ymaps.mapType.storage.add(MAP, new ymaps.MapType(map_type, [MAP]));
    map.setType(MAP);
  }

  if (Number(localStorage.getItem('theme_yandex_map_plugin')))
  {
    document.getElementById('text_id').style.backgroundColor = '#2a2a2a';
    document.getElementById('text_id').style.color = 'whitesmoke';
  }

  document.getElementById('text_id').oninput = document.getElementById('text_id').onpaste = function () {
    document.getElementById('text_id').style.border = '1px solid grey';
    document.getElementById('label_error').style.display = 'none';
  }

  window.Asc.plugin.init = function () {

    document.getElementById("text_id").value = localStorage.getItem("text_plugin_yandex_map_item");

    if (!windowStatus) {
      let newWindow = document.getElementById("id_player");
      newWindow.innerHTML = "<div id=\"map\" style=\"position:absolute;padding:0;margin:0;left:0;top:0;width:100%;height:100%\"></div>";
      windowStatus = true;
    }

    if (localStorage.getItem('coords_plugin_yandex_map_item') !== null && localStorage.getItem('zoom_plugin_yandex_map_item') !== null) {
      mapSettings.center[0] = Number(localStorage.getItem("coords_plugin_yandex_map_item").split(",")[0])
      mapSettings.center[1] = Number(localStorage.getItem("coords_plugin_yandex_map_item").split(",")[1])
      mapSettings.zoom = Number(localStorage.getItem("zoom_plugin_yandex_map_item"))
    }

    if (!mapPlayer) {
      function startMap() {
        mapPlayer = new ymaps.Map("map", mapSettings);
        document.getElementById("text_id").disabled = false;

        if (Number(localStorage.getItem('theme_yandex_map_plugin'))) {
          setMapLayer(mapPlayer, 'dark');
        }

        document.querySelector('input').addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {

            userAddress = document.getElementById("text_id").value;

            if (userAddress === '') {
              document.getElementById('label_error').style.display = 'block';
              document.getElementById('text_id').style.border = '1px solid #d9534f';
            }
            if (userAddress !== '') {
              localStorage.setItem("text_plugin_yandex_map_item", userAddress);
              let searchControl = new ymaps.control.SearchControl({
                options: {
                  provider: "yandex#search"
                }
              });
              mapPlayer.controls.add(searchControl);
              searchControl.search(userAddress);
              setTimeout(function () {
                mapPlayer.controls.remove(searchControl)
              }, 1000)
            }
          }
        });

        if (localStorage.getItem('autoEnter_yandex_map_item') !== null) {
          if (!Number(localStorage.getItem('autoEnter_yandex_map_item'))) {
            document.querySelector('input').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
            localStorage.autoEnter_yandex_map_item = 1;
          }
        }

        mapPlayer.events.add("mousemove", function (e) {
          mapCoords = mapPlayer.getCenter();
          mapZoom = mapPlayer.getZoom();

          localStorage.setItem("coords_plugin_yandex_map_item", mapCoords);
          localStorage.setItem("zoom_plugin_yandex_map_item", mapZoom);
        })

      }

      ymaps.ready(startMap);
    }
  }

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