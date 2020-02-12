'use strict'
//Global
const Scripts = {},
      Maps    = {},
      Ri      = {},
      Time    = {},
      Game    = {}

Game.images = {}
Game.audio  = {}
Game.canvasSize = {
    width: 0,
    height: 0
}

/*Ri*/
//General
Ri.loadMap = (map) => {
  Game.map = Maps[map]
  Game.start()
  Game.camera.position = Ri.vector()
  Game.camera.size = 1
}

Ri.createObject = (name, layer, object) => {
  Game.map[layer][name] = object
  for (let property in Game.map[layer][name])
    if (Game.map[layer][name][property].start != undefined)
      Game.map[layer][name][property].start()
}

Ri.collisionObjects = (obj1, obj2) => {
  let x1 = obj1.position.x - obj1.origin.x,
      y1 = obj1.position.y - obj1.origin.y,
      w1 = obj1.size.width,
      h1 = obj1.size.height,
      x2 = obj2.position.x - obj2.origin.x,
      y2 = obj2.position.y - obj2.origin.y,
      w2 = obj2.size.width,
      h2 = obj2.size.height
    
  return (x1 < x2 && y1 < y2) && (x1 + w1 > x2 && y1 + h1 > y2) ||
    (x1 < x2 + w2 && y1 < y2) && (x1 + w1 > x2 + w2 && y1 + h1 > y2) ||
    (x1 < x2 + w2 && y1 < y2 + h2) && (x1 + w1 > x2 + w2 && y1 + h1 > y2 + h2) ||
    (x1 < x2 && y1 < y2 + h2) && (x1 + w1 > x2 && y1 + h1 > y2 + h2)
}

Ri.look = (obj1, obj2) => {
  if (obj2.position.x >= obj1.position.x)
    obj1.angle = Math.atan((obj2.position.y - obj1.position.y) / (obj2.position.x - obj1.position.x)) * 180 / Math.PI
  else
    obj1.angle = 180 + (Math.atan((obj2.position.y - obj1.position.y) / (obj2.position.x - obj1.position.x)) * 180 / Math.PI)
}

//Math
Ri.vector = (x = 0, y = 0) => {
  return { x: x, y: y }
}
Ri.vectorMagnitude = (vector) => {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
}

//Input
//Keyboard
Ri.keyboard = {}
Ri.keyboard.key = {
  'LEFT': 37, 'RIGHT': 39, 'UP': 38, 'DOWN': 40, 'SPACE': 32, 'CTRL': 17, 'SHIFT': 16, 'ALT': 18,
  'ESC': 27, 'ENTER': 13, 'MINUS': 189, 'PLUS': 187, 'CAPS_LOCK': 20, 'BACKSPACE': 8, 'TAB': 9,
  'Q': 81, 'W': 87, 'E': 69, 'R': 82, 'T': 84, 'Y': 89, 'U': 85, 'I': 73, 'O': 79, 'P': 80, 'A': 65,
  'S': 83, 'D': 68, 'F': 70, 'G': 71, 'H': 72, 'J': 74, 'K': 75, 'L': 76, 'Z': 90, 'X': 88, 'V': 86,
  'B': 66, 'N': 78, 'M': 77, '0': 48, '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55,
  '8': 56, 'C': 67, '9': 57, 'F1': 112, 'F2': 113, 'F3': 114, 'F4': 115, 'F5': 116, 'F6': 117, 'F7': 118,
  'F8': 119, 'F9': 120, 'F10': 121, 'F11': 122, 'F12': 123
}
Ri.keyboard.pressed = (key) => {
  return Ri.keyboard.pressedKeys.indexOf(Ri.keyboard.key[key]) !== -1
}
Ri.keyboard.pressedKeys = []
window.onkeydown = (e) =>{
  if (Ri.keyboard.pressedKeys.indexOf(e.keyCode) === -1) {
    Ri.keyboard.pressedKeys.push(e.keyCode)
  }
}
window.onkeyup = (e) =>{
  if (Ri.keyboard.pressedKeys.indexOf(e.keyCode) !== -1) {
    Ri.keyboard.pressedKeys.splice(Ri.keyboard.pressedKeys.indexOf(e.keyCode), 1)
  }
}

//Mouse
Ri.mouse = {}
Ri.mouse.left = false
Ri.mouse.middle = false
Ri.mouse.right = false
Ri.mouse.position = {}
Ri.mouse.position.inGameWindow = Ri.vector()
Ri.mouse.position.inGame = Ri.vector()
Ri.mouse.onObject = (object) => {
  const x = object.position.x - object.origin.x,
        y = object.position.y - object.origin.y,
        w = object.size.width,
        h = object.size.height
  return (x < Ri.mouse.position.inGame.x && y < Ri.mouse.position.inGame.y)
  && (x + w > Ri.mouse.position.inGame.x && y + h > Ri.mouse.position.inGame.y)
}
window.onmousedown = (e) => {
  if (e.which === 1) Ri.mouse.left = true
  if (e.which === 2) Ri.mouse.middle = true
  if (e.which === 3) Ri.mouse.right = true
}
window.onmouseup = (e) => {
  if (e.which === 1) Ri.mouse.left = false
  if (e.which === 2) Ri.mouse.middle = false
  if (e.which === 3) Ri.mouse.right = false
}
window.onmousemove = (e) => {
  Ri.mouse.position.inGameWindow = Ri.vector(
    e.pageX - (document.documentElement.clientWidth - Game.canvasSize.width) / 2,
    e.pageY - (document.documentElement.clientHeight - Game.canvasSize.height) / 2
  )
  Ri.mouse.position.inGame = Ri.vector(
    (e.pageX - (document.documentElement.clientWidth - Game.canvasSize.width) / 2) * (canvas.width / Game.canvasSize.width / Game.camera.size) + Game.camera.position.x,
    (e.pageY - (document.documentElement.clientHeight - Game.canvasSize.height) / 2) * (canvas.height / Game.canvasSize.height / Game.camera.size) + Game.camera.position.y
  )
}

/*Game*/
Game.camera = {
  position: {
    x: 0,
    y: 0
  },
  size: 1
}

Game.update = () => {
  //Objects
  for (let layer in Game.map) // Перебор слоёв
    for (let object in Game.map[layer]) // Перебор объектов
      if (Game.map[layer][object].type === 'GameObject') {
        for (let property in Game.map[layer][object]) // Перебор свойств
          if (Game.map[layer][object][property].update != undefined)
            Game.map[layer][object][property].update(Game.map[layer][object], Game.map)
      }
  //Scripts
  for (let script in Scripts)
    if (Scripts[script].update != undefined)
      Scripts[script].update(Game.map)
}

Game.start = () => {
  //Objects
  for (let layer in Game.map) // Перебор слоёв
    for (let object in Game.map[layer]) // Перебор объектов
      if (Game.map[layer][object].type === 'GameObject') {
        for (let property in Game.map[layer][object]) // Перебор свойств
          if (Game.map[layer][object][property].start != undefined)
            Game.map[layer][object][property].start(Game.map[layer][object], Game.map)
      }
  //Scripts
  for (let script in Scripts)
    if (Scripts[script].start != undefined)
      Scripts[script].start(Game.map)

}

//Render
Game.render = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
  for (let layer in Game.map) { // Перебор слоёв
    if (Game.map[layer].visibility === true) {
      let lParallax = Game.map[layer].parallax
      for (let object in Game.map[layer]) { // Перебор объектов
        if (Game.map[layer][object].type === 'GameObject') {
          let cameraObject = {}
          cameraObject.position = Game.camera.position
          cameraObject.size = {width: canvas.width, height: canvas.height}
          cameraObject.origin = Ri.vector()
          if (Game.map[layer][object].visibility === true/* && Ri.collisionObjects(cameraObject, Game.map[layer][object])*/) {
            let oImage = Game.images[Game.map[layer][object].image]
            let oPos = Game.map[layer][object].position
            let oSize = Game.map[layer][object].size
            let oAngle = Game.map[layer][object].angle
            let oOrigin = Game.map[layer][object].origin
            let oOpacity = Game.map[layer][object].opacity
            let camPos = Game.camera.position
            let camSize = Game.camera.size
            let withCamPos = {
              x: oPos.x - camPos.x * lParallax.x,
              y: oPos.y - camPos.y * lParallax.y
            }
            canvasContext.scale(camSize, camSize)
            canvasContext.translate(withCamPos.x, withCamPos.y)
            canvasContext.rotate(oAngle * Math.PI / 180)
            canvasContext.globalAlpha = oOpacity
            canvasContext.drawImage(oImage, - oOrigin.x, - oOrigin.y, oSize.width, oSize.height)
            canvasContext.setTransform(1, 0, 0, 1, 0, 0)
          }
        }
      }
    }
  }
}

//Game loop
Game.gameLoop = () => {
  Time.now = performance.now()
  Time.deltaTime += Math.min(1, (Time.now - Time.last) / 1000)
  while (Time.deltaTime > Time.step) {
    Time.deltaTime = Time.deltaTime - Time.step
    Game.update()
  }

  //Resize
  if (canvas.width / canvas.height < document.documentElement.clientWidth / document.documentElement.clientHeight) {
    canvas.style.height = String(document.documentElement.clientHeight) + 'px'
    canvas.style.width = String(document.documentElement.clientHeight * (canvas.width / canvas.height)) + 'px'
    canvas.style.marginLeft = String((document.documentElement.clientWidth - (document.documentElement.clientHeight * (canvas.width / canvas.height))) / 2) + 'px'
    canvas.style.marginTop = '0px'
    Game.canvasSize.height = document.documentElement.clientHeight
    Game.canvasSize.width = document.documentElement.clientHeight * (canvas.width / canvas.height)
  }
  if (canvas.width / canvas.height === document.documentElement.clientWidth / document.documentElement.clientHeight) {
    canvas.style.height = String(document.documentElement.clientHeight) + 'px'
    canvas.style.width = String(document.documentElement.clientHeight) + 'px'
    canvas.style.marginLeft = '0px'
    canvas.style.marginTop = '0px'
    Game.canvasSize.height = document.documentElement.clientHeight
    Game.canvasSize.width = document.documentElement.clientHeight
  }
  if (canvas.width / canvas.height > document.documentElement.clientWidth / document.documentElement.clientHeight) {
    canvas.style.height = String(document.documentElement.clientWidth * (canvas.height / canvas.width)) + 'px'
    canvas.style.width = String(document.documentElement.clientWidth) + 'px'
    canvas.style.marginLeft = '0px'
    canvas.style.marginTop = String((document.documentElement.clientHeight - (document.documentElement.clientWidth * (canvas.height / canvas.width))) / 2) + 'px'
    Game.canvasSize.height = document.documentElement.clientWidth * (canvas.height / canvas.width)
    Game.canvasSize.width = document.documentElement.clientWidth
  }

  Time.last = Time.now
  Game.render()
  requestAnimationFrame(Game.gameLoop)
}

//Canvas init
document.body.style = 'margin: 0; padding: 0'
let canvas = document.createElement('canvas')
let canvasContext = canvas.getContext('2d')
canvas.width = Settings.resolution.width
canvas.height = Settings.resolution.height
canvas.style.backgroundColor = Settings.gameBackgroundColor
document.body.style.backgroundColor = Settings.pageBackgroundColor
canvas.style.display = 'block'
document.body.appendChild(canvas)