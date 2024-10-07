'use strict';

(function (window,undefined)
{
    let mapWindow = null;
    let displayMap = 'displayMap';
    let displayInput = 'displayInput';
    let currentObjectId = undefined;
    let _url = '';

  window.Asc.plugin.onThemeChanged = function (theme) {

    if(theme.type === "dark") {
      localStorage.setItem('theme_yandex_map_plugin', '1');
    } else {
      localStorage.setItem('theme_yandex_map_plugin', '0');
    }
  };


  function addOleObj() {

    const ApiKey = "2fc0fb41-8290-4ed4-a5f4-4b0ea93a9710";

    let mapCoords = localStorage.getItem("coords_plugin_yandex_map_item").split(",");
    let mapZoom = localStorage.getItem("zoom_plugin_yandex_map_item");

    if(Number(localStorage.getItem('theme_yandex_map_plugin')))
    {
      _url = "https://static-maps.yandex.ru/v1?ll=" + mapCoords[1] + "," + mapCoords[0] + "&z=" + mapZoom +'&theme=dark' +"&apikey=" + ApiKey;
    }
    else
    {
      _url = "https://static-maps.yandex.ru/v1?ll=" + mapCoords[1] + "," + mapCoords[0] + "&z=" + mapZoom +"&apikey=" + ApiKey;
    }

    if (ApiKey) {
      let _info = window.Asc.plugin.info;

      currentObjectId = _info.objectId;

      let _method = (_info.objectId === undefined) ? "AddOleObject" : "EditOleObject";

      let _param = {
        guid: _info.guid,
        widthPix: (_info.mmToPx * _info.width) >> 0,
        heightPix: (_info.mmToPx * _info.height) >> 0,
        width: _info.width ? _info.width : 100,
        height: _info.height ? _info.height : 70,
        imgSrc: _url,
        data: localStorage.getItem("text_plugin_yandex_map_item"),
        objectId: currentObjectId,
        resize: true,
        recalculate: true
      };

      window.Asc.plugin.executeMethod(_method, [_param]);
    }
  }

  function CreateWindow(obj) {

    let location = window.location;
    let start = location.pathname.lastIndexOf('/') + 1;
    let file = location.pathname.substring(start);
    let variation = {};

    switch (obj) {

      case 'displayMap': {
        variation
          = {
          url: location.href.replace(file, 'mapSettings.html'),
          description: 'YandexMaps',
          descriptionLocale: {
            "ru": "ЯндексКарты",
            "fr": "YandexMaps",
            "es": "YandexMaps",
            "pt-BR": "YandexMaps",
            "de": "YandexMaps",
            "si": "YandexMaps"
          },
          isViewer: true,
          isDisplayedInViewer: false,
          EditorsSupport: ["word", "cell", "slide"],
          isVisual: true,
          isModal: true,
          isInsideMode: false,
          initDataType: "ole",
          isUpdateOleOnResize: false,

          buttons: [
            {
              text: 'OK',
              primary: true,
              isViewer: false

            },
            {
              text: 'Cancel',
              primary: false,
              isViewer: true,
              textLocale: {
                "ru": "Отмена",
                "fr": "Annuler",
                "es": "Cancelar",
                "de": "Abbrechen",
                "si": "අවලංගු"
              }
            }
          ],
          size: [650, 550]
        };


        mapWindow = new window.Asc.PluginWindow();
        mapWindow.show(variation);


        window.Asc.plugin.button = function (id, windowId) {
          if(id === 0 ) {
            mapWindow.close();
            mapWindow = null;
            addOleObj();
            currentObjectId = undefined;
          }
          else if (windowId) {
            window.Asc.plugin.executeMethod('CloseWindow', [windowId], function () {
              window.Asc.plugin.executeCommand("close", "");
            })
          }
        }
        break;
      }
      case 'displayInput':
      {
        variation
          = {
          url: location.href.replace(file, 'inputSettings.html'),
          description: 'YandexMaps',
          descriptionLocale: {
            "ru": "ЯндексКарты",
            "fr": "YandexMaps",
            "es": "YandexMaps",
            "pt-BR": "YandexMaps",
            "de": "YandexMaps",
            "si": "YandexMaps"
          },
          isViewer: true,
          isDisplayedInViewer: false,
          EditorsSupport: ["word", "cell", "slide"],
          isVisual: true,
          isModal: true,
          isInsideMode: false,
          initDataType: "ole",
          isUpdateOleOnResize: false,

          buttons: [
            {
              text: 'OK',
              primary: true,
              isViewer: false

            },
            {
              text: 'Cancel',
              primary: false,
              isViewer: true,
              textLocale: {
                "ru": "Отмена",
                "fr": "Annuler",
                "es": "Cancelar",
                "de": "Abbrechen",
                "si": "අවලංගු"
              }
            }
          ],
          size: [350, 90]
        };


        mapWindow = new window.Asc.PluginWindow();
        mapWindow.show(variation);

        mapWindow.attachEvent('onWindowReady',function ()
        {
          mapWindow.close();
          mapWindow = null;
          CreateWindow(displayMap);
        })


        window.Asc.plugin.button = function (id, windowId) {
          if(id === 0 ) {
            mapWindow.close();
            mapWindow = null;
            CreateWindow(displayMap);
          }
          else if (windowId) {
            window.Asc.plugin.executeMethod('CloseWindow', [windowId], function () {
              window.Asc.plugin.executeCommand("close", "");
            })
          }
        }
        break;
      }
    }
  }


    window.Asc.plugin.init = function (text) {

      let check = text;
      if (check !== "") {
          CreateWindow(displayMap);
      }
      else
      {
        CreateWindow(displayInput);
      }
    }

  window.Asc.plugin.onTranslate = function ()
  {
    let lab = document.querySelector("label");
    if(lab)
    {
      lab.innerHTML = window.Asc.plugin.tr("Enter your address");
    }
  }


})(window,undefined)


