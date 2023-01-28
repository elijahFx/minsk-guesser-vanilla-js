document.addEventListener("load", () => {
  const loader = document.querySelector(".loader-wrapper")
  loader.classList.remove("loader-wrapper")
  loader.remove()
})

setInterval(() => {
  const app = document.querySelector("#app")
  const HTMLymaps = app.querySelector("ymaps")
  const HTMLymaps2 = HTMLymaps.querySelector("ymaps")
  const HTMLymaps3 = HTMLymaps2.querySelectorAll("ymaps")[1]
  if(HTMLymaps3) {
  HTMLymaps2.removeChild(HTMLymaps3)
}
}, 100)

let distance
let coords
let panoramaCoords
let isPin = false
const submitBtn = document.querySelector(".submitBtn")

function init() {
  let map = new ymaps.Map("map", {
    center: [53.908393, 27.558943],
    controls: ['fullscreenControl', 'zoomControl'],
    zoom: 10
  })

  let cursor = map.cursors.push('arrow')

  map.events.add("dragstart", () => {
    cursor.push("drag")
  })

  map.events.add("click", function (e) {
    if(isPin) {
      map.geoObjects.remove(myPlacemark)
    } 
    
         coords = e.get('coords');
            
        
         myPlacemark = new ymaps.Placemark(coords, {
                  hintContent: 'Предположение'}, {
                
                  iconLayout: 'default#image',
    
                  iconImageHref: 'pin.png',

                  iconImageSize: [36, 36],
            
                  iconImageOffset: [-19, -34]
              }),
        
             
          isPin = true    
          map.geoObjects.add(myPlacemark)
          submitBtn.innerText = "УГАДАТЬ"  
          submitBtn.style.backgroundColor = "#7EB644"  

    }



  )

let isPinned = false
const containerElement = document.querySelector(".container")

const hideBtn = document.querySelector(".two")
const expandBtn = document.querySelector(".one")
const pinBtn = document.querySelector(".three")
const mapElement = document.querySelector("#map")
const shadowBox = document.querySelector(".shadowBox")

  containerElement.addEventListener("mouseenter", enter)
  
  containerElement.addEventListener("mouseleave", leave)


  pinBtn.addEventListener("click", () => {
    if(!isPinned) {
    containerElement.removeEventListener("mouseleave", leave)
    isPinned = true
    pinBtn.style.outline = "black solid 2px"
  } else {
    containerElement.addEventListener("mouseleave", leave)
    isPinned = false
    pinBtn.style.outline = "none"
  }
  })

  expandBtn.addEventListener("click", enter)

  hideBtn.addEventListener("click", leave)

  submitBtn.addEventListener("click", () => {
    if(isPin) {


    let truePlacemark = new ymaps.Placemark(panoramaCoords, {
        hintContent: `${panoramaCoords}`}, {
      
        iconLayout: 'default#image',

        iconImageHref: 'finish.png',

        iconImageSize: [30, 30],
  
        iconImageOffset: [-15, -30]
    })

    map.geoObjects.add(truePlacemark)


    let connectLine = [coords, panoramaCoords]

    let line = map.geoObjects.add(new ymaps.Polyline(connectLine))

    let lineStringGeometry = new ymaps.geometry.LineString(connectLine)
    let geoObj = new ymaps.GeoObject({ geometry: lineStringGeometry })
    map.geoObjects.add(geoObj);
    distance = Math.floor(geoObj.geometry.getDistance())
    alert(`Расстояние от заданной точки составляет: ${distance} метров`)

    
    

      let differenceX = Math.abs(coords[0] - panoramaCoords[0])
      let differenceY = Math.abs(coords[1] - panoramaCoords[1])
      let finalDifference = differenceX - differenceY
    } else {
      return
    }
  })

  setInterval(() => {
    map.container.fitToViewport()
  }, 500)

  function enter () {
    mapElement.classList.add("mapTouched")
    mapElement.classList.remove("mapNotTouched")
  }

  function leave () {
    mapElement.classList.add("mapNotTouched")
    mapElement.classList.remove("mapTouched")
  }

  



}


ymaps.ready(init)



ymaps.ready(function () {
  // Для начала проверим, поддерживает ли плеер браузер пользователя.
  if (!ymaps.panorama.isSupported()) {
      // Если нет, то просто ничего не будем делать.
      return;
  }
  // Ищем панораму в переданной точке.
 let Panorama = ymaps.panorama.locate(getRandomCoords()).done(
      function (panoramas) {
          // Убеждаемся, что найдена хотя бы одна панорама. АСНЛ = 53.851797, 27.551390
          if (panoramas.length > 0) {
              // Создаем плеер с одной из полученных панорам.
             var player = new ymaps.panorama.Player(
                      'app',
                      // Панорамы в ответе отсортированы по расстоянию
                      // от переданной в panorama.locate точки. Выбираем первую,
                      // она будет ближайшей.
                      panoramas[0],

                      // Зададим направление взгляда, отличное от значения
                      // по умолчанию.
                      { suppressMapOpenBlock: true,
                        direction: [256, 16],
                        suppressMapOpenBlock: true,
                        controls: ["panoramaName"],
                        hotkeysEnabled: true }

                  )
                  // Заставляет маркеры не работать 
            player.events.add("markerexpand", (marker) => {
                marker.remove()
            })     
            
            player.events.add("panoramachange", (pan) => {
              panoramaCoords = pan.originalEvent.target._engine._panorama._position.slice(0, 2).reverse()
              
            })

            // Получаю координаты панорамы (т.е. в каком именно месте мы находимся прямо сейчас)
            panoramaCoords = [panoramas[0]._position[0], panoramas[0]._position[1]].reverse()

          } else { window.location.reload() }
      }
  );

  function getRandomCoords () {
    let leftTop = [53.945763, 27.460391]
    let leftBottom = [53.849329, 27.460391]
    let rightBottom = [53.849329, 27.654925]
    let rightTop = [53.944513, 27.654925]

    let randomCoordX = 53.849329 + Math.random() * (53.945763 + 0.00001 - 53.849329)
    let randomCoordY = 27.460391 + Math.random() * (27.654925 + 0.00001 - 27.460391)

    let finalCoord = [randomCoordX, randomCoordY]
    return finalCoord
}

    })





// coords[0].toPrecision(6),
// coords[1].toPrecision(6)




      