
let userAddress = ""
document.querySelector(".b-1").addEventListener("click", () => {
  return  userAddress = document.querySelector(".i-1").value
})
console.log(userAddress)

if(userAddress !== "")
{
function startMap ()
{
  let newMap = new ymaps.Map("map",{
    "center":[55.74, 37.58],
    "zoom":10,controls: []})
  let searchControl = new ymaps.control.SearchControl({
    options: {
      provider: "yandex#search"
    }
  })
  newMap.controls.add(searchControl)
  searchControl.search(userAddress)
}

  ymaps.ready(startMap)

}
else console.log("some problem")








