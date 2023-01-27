document.addEventListener("load", () => {
  const loader = document.querySelector(".loader-wrapper")
  loader.classList.remove("loader-wrapper")
  loader.remove()
})

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
    if(!map.balloon.isOpen()) {
      
      let coords = e.get('coords');
            
        
         myPlacemark = new ymaps.Placemark(coords, {
                  hintContent: 'Предположение'}, {
                
                  iconLayout: 'default#image',
    
                  iconImageHref: 'pin.png',

                  iconImageSize: [40, 40],
            
                  iconImageOffset: [-21, -38]
              }),
        
             
        
          map.geoObjects.add(myPlacemark)
          submitBtn.innerText = "УГАДАТЬ"  
          submitBtn.style.backgroundColor = "#7EB644"  

    } else {
      map.geoObjects.remove()
    }



  })

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
  ymaps.panorama.locate(getRandomCoords()).done(
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
              //marker.remove()
            })      

          }
      },
      function (error) {
          // Если что-то пошло не так, сообщим об этом пользователю.
          alert(error.message);
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





    
setInterval(() => {
  const app = document.querySelector("#app")
  const HTMLymaps = app.querySelector("ymaps")
  const HTMLymaps2 = HTMLymaps.querySelector("ymaps")
  const HTMLymaps3 = HTMLymaps2.querySelectorAll("ymaps")[1]
  if(HTMLymaps3) {
  HTMLymaps2.removeChild(HTMLymaps3)
}
}, 100)




// coords[0].toPrecision(6),
// coords[1].toPrecision(6)




      