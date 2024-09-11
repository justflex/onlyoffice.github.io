(function (window,undefined)
{
  window.Asc.plugin.init = function ()
  {
    function startMap ()
    {
      newMap = new ymap("map",{center:[55,45],zoom:10},{searchControlProvider: "yandex#search"})
    }
    ymap.ready(startMap)
  }
})(window,undefined)

