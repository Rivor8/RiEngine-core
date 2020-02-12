Scripts.freeCamera = {
  update: function (map) {
    if (Ri.keyboard.pressed('D')) Game.camera.position.x += 30
    if (Ri.keyboard.pressed('A')) Game.camera.position.x -= 30
    if (Ri.keyboard.pressed('S')) Game.camera.position.y += 30
    if (Ri.keyboard.pressed('W')) Game.camera.position.y -= 30
    if (Ri.keyboard.pressed('Z')) Game.camera.size += 0.02
    if (Ri.keyboard.pressed('X')) Game.camera.size -= 0.02
  }
}