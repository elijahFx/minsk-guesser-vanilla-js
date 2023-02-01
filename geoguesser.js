const loader = document.querySelector(".loader-wrapper")
const body = document.querySelector("body")

document.addEventListener("load", () => {
  loader.style.zIndex = "15"
})

document.addEventListener("loadstart", () => {
  loader.style.zIndex = "15"
})

loader.style.zIndex = "15"

setTimeout(() => {
  loader.style.zIndex = "2"
}, 1000)

setInterval(() => {
  const app = document.querySelector("#app")
  const HTMLymaps = app.querySelector("ymaps")
  const HTMLymaps2 = HTMLymaps.querySelector("ymaps")
  const HTMLymaps3 = HTMLymaps2.querySelectorAll("ymaps")[1]
  if(HTMLymaps3) {
  HTMLymaps2.removeChild(HTMLymaps3)
}
}, 100)


let average
let finalGrade = 0
let i = 0
let grades = []
let round = 0
let distance
let coords
let panoramaCoords
let isPin = false
let notificationContainer = document.createElement("div")
    notificationContainer.classList.add("notificationContainer")
    body.appendChild(notificationContainer)
const submitBtn = document.querySelector(".submitBtn")
const roundElement = document.querySelector("#roundElement")
const pointsElement = document.querySelector("#pointsElement")

const infoBox = document.querySelector(".infoBox")


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

  map.panTo([53.908396, 27.558948])


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

    if(isPin && round < 5) {

    round = round + 1 

    let truePlacemark = new ymaps.Placemark(panoramaCoords, {
        hintContent: `${panoramaCoords}`}, {
      
        iconLayout: 'default#image',

        iconImageHref: 'finish.png',

        iconImageSize: [30, 30],
  
        iconImageOffset: [-15, -30]
    })

    map.geoObjects.add(truePlacemark)


    let connectLine = [coords, panoramaCoords]

  

    let line = new ymaps.Polyline(connectLine)
 



    map.geoObjects.add(line)

    let lineStringGeometry = new ymaps.geometry.LineString(connectLine)
    let geoObj = new ymaps.GeoObject({ geometry: lineStringGeometry })
    map.geoObjects.add(geoObj);
    distance = Math.floor(geoObj.geometry.getDistance())
    map.panTo(panoramaCoords)

    if(distance <= 150) {
      grades.push(10)
    } else if(distance > 150 && distance <= 350) {
      grades.push(9)
    } else if(distance > 350 && distance <= 550) {
      grades.push(8)
    } else if(distance > 550 && distance <= 1000) {
      grades.push(7)
    } else if(distance > 1000 && distance <= 1700) {
      grades.push(6)
    } else if(distance > 1700 && distance <= 2700) {
      grades.push(5)
    } else if(distance > 2700 && distance <= 4000) {
      grades.push(4)
    } else if(distance > 4000 && distance <= 6000) {
      grades.push(3)
    } else if(distance > 6000 && distance <= 8000) {
      grades.push(2)
    } else if(distance > 8000 && distance <= 9000) {
      grades.push(1)
    } else {
      grades.push(0)
    }

    evaluate()
    endGame()
    
    submitBtn.innerText = "ПОПРОБОВАТЬ ДРУГУЮ ЛОКАЦИЮ"  
    submitBtn.style.backgroundColor = "rgba(0,0,0,0.5)" 

    
    isPin = false
    roundElement.innerText = `${round} / 5`
    
    containerElement.removeEventListener("mouseleave", leave)
    isPinned = true
    pinBtn.style.outline = "black solid 2px"

    createNotification(distance)
    

    } else {
      return
    }
  })

  

   setInterval(() => {
    map.container.fitToViewport()
  }, 1)

  function enter () {
    mapElement.classList.add("mapTouched")
    mapElement.classList.remove("mapNotTouched")
  }

  function leave () {
    mapElement.classList.add("mapNotTouched")
    mapElement.classList.remove("mapTouched")
  }

  function evaluate () {
    let sum = 0
    for(let i = 0; i<grades.length; i++) {
      sum = sum + grades[i]
    }
    average = (Math.floor((sum / grades.length) * 100) / 100)
    if(average === 1) {
        pointsElement.style.color = "white"
        finalGrade = `${average} балл`
    } else if(average >= 2 && average <= 4) {
        finalGrade = `${average} балла`
        pointsElement.style.color = "white"
    } else if(average >= 9.5) {
        pointsElement.style.color = "gold"
        finalGrade = `${average} баллов`
    } else if(average >= 8.5) {
        pointsElement.style.color = "silver"
        finalGrade = `${average} баллов`
    } else if(average >= 7.5) {
        finalGrade = `${average} баллов`
        pointsElement.style.color = "bronze"
    } else {
        finalGrade = `${average} баллов`
       pointsElement.style.color = "white"
    }
    pointsElement.innerText = finalGrade
  }

  function endGame () {
    if(round >= 5) {
      let progressElement = document.createElement("div")
      progressElement.classList.add("myProgress")
      let progress = document.createElement("div")
      progress.classList.add("myBar")
      progress.innerHTML = "0%"
      progressElement.appendChild(progress)
      let logoElement = document.createElement("img")
      logoElement.setAttribute("src", "/geo/geo/yandexGeoguesser/minsk-logo-220.png")
      logoElement.classList.add("logo")
      let blackScreen1 = document.createElement("div")
      blackScreen1.appendChild(logoElement)
      let blackScreen2 = document.createElement("div")
      blackScreen2.appendChild(progressElement)
      blackScreen1.classList.add("blackScreen1")
      blackScreen2.classList.add("blackScreen2")
      let percentElement = document.createElement("h6")
      let restartButton = document.createElement("span")
      restartButton.classList.add("material-symbols-outlined")
      restartButton.innerHTML = "restart_alt"
      blackScreen1.appendChild(restartButton)
      percentElement.classList.add("beautyFont")
      percentElement.innerText = "Процент правильности ваших ответов составляет..."
      blackScreen2.appendChild(percentElement)
      body.appendChild(blackScreen1)
      body.appendChild(blackScreen2)
      submitBtn.remove()
      shadowBox.remove()
      infoBox.remove()
      containerElement.classList.remove("container")
      containerElement.classList.add("containerEnd")
      mapElement.classList.remove("mapTouched")
      mapElement.classList.remove("mapNotTouched")
      mapElement.classList.add("mapEnd")
      let widthEl = floatToInt(average)
      move(widthEl)
      restartButton.addEventListener("click", () => {
        window.location.reload()
      })
      let notifications = Array.from(notificationContainer.querySelectorAll(".notification"))
      for(let i = 0; i < notifications.length + 1; i++) {
        notifications[i].remove()
      }
      
    }}

  function createNotification(distance) {
    let notification = document.createElement("div")
    notification.classList.add("notification")
    let x = document.createElement("span")
    x.classList.add("material-symbols-outlined")
    x.innerHTML = "check"
    x.addEventListener("click", () => {
      notification.remove()
    })
    let textContent = document.createElement("h5")
    textContent.classList.add("textContent")
    textContent.innerHTML = `Вы оказались в <span class="outlineText">${distance} м.</span> от заданной точки`
    notification.appendChild(x)
    notification.appendChild(textContent)
    notificationContainer.appendChild(notification)
    setTimeout(() => {
      notification.remove()
    }, 15000)
  }

  function move(widthUp) {
    if (i == 0) {
      i = 1;
      let parent = document.querySelector(".myProgress")
      let elem = parent.querySelector(".myBar");
      let width = 0;
      let id = setInterval(frame, 10);
      function frame() {
        if (width >= widthUp) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
          elem.innerHTML = width + "%";
        }
      }
    }
  }

  // 10
  // 9
  // 9.2
  // 9.33

  function floatToInt(num) {
    let textNum = num.toString().length
  if(textNum === 1) {
    return num * 10
  } else if(textNum === 2 || textNum === 3) {
    while(num % 1 !== 0) {
      num = num * 10
  }
  return num
  } else if(textNum >= 4) {
    while(num % 1 !== 0) {
      num = num * 10
  }
    return parseInt(Math.round(num).toString().slice(0,2))
    }
  }  
  
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
              // Получаю координаты панорамы (т.е. в каком именно месте мы находимся прямо сейчас)
              player.events.add("panoramachange", (pan) => {
                panoramaCoords = pan.originalEvent.target._engine._panorama._position.slice(0, 2).reverse()
              })
  
              // Получаю координаты панорамы
              panoramaCoords = [panoramas[0]._position[0], panoramas[0]._position[1]].reverse()


              function panoramaMove() {
                if(round < 5) {
                  loader.style.zIndex = "13"
                  setTimeout(() => {
                  loader.style.zIndex = "0"  
                  }, 1000)
                  
                  player.moveTo(getRandomCoords())
                    if(panoramas.length > 1) {
                      player.moveTo(getRandomCoords())
                    } else {
                      player.moveTo(getRandomCoords())
                      return
                    }
                } else {
                  return
                }
              }

              submitBtn.addEventListener("click", panoramaMove)
  
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


}


ymaps.ready(init)      