Maps.map1 = {
  Layer1: {
    visibility: true,
    parallax: { x: 1, y: 1 },
    player: {
      type: 'GameObject',
      image: 'sample',
      position: { x: 0, y: 0 },
      size: { width: 200, height: 200 },
      angle: 0,
      origin: { x: 100, y: 100 },
      opacity: 1,
      visibility: true,
      mouseScripts: {
        update: (self) => {
          self.position = Ri.mouse.position.inGame
        }
      }
    },
    Object2: {
      type: 'GameObject',
      image: 'sample',
      position: { x: 0, y: 800 },
      size: { width: 100, height: 100 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  }
}
