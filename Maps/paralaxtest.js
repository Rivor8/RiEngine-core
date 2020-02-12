Maps.paralaxtest = {
  l1: {
    visibility: true,
    parallax: { x: 0, y: 0 },
    obj1: {
      type: 'GameObject',
      image: 'fon1',
      position: { x: 0, y: 0 },
      size: { width: 4760, height: 1080 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  },
  l2: {
    visibility: true,
    parallax: { x: 0.2, y: 0.2 },
    obj1: {
      type: 'GameObject',
      image: 'fon2',
      position: { x: 0, y: 0 },
      size: { width: 4760, height: 1080 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  },
  l3: {
    visibility: true,
    parallax: { x: 0.3, y: 0.3 },
    obj1: {
      type: 'GameObject',
      image: 'fon3',
      position: { x: 0, y: 0 },
      size: { width: 4760, height: 1080 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  },
  l4: {
    visibility: true,
    parallax: { x: 0.5, y: 0.5 },
    obj1: {
      type: 'GameObject',
      image: 'fon4',
      position: { x: 0, y: 0 },
      size: { width: 4760, height: 1080 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  },
  l5: {
    visibility: true,
    parallax: { x: 0.6, y: 0.6 },
    obj1: {
      type: 'GameObject',
      image: 'fon5',
      position: { x: 0, y: 0 },
      size: { width: 4760, height: 1080 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  },
  l6: {
    visibility: true,
    parallax: { x: 0.2, y: 0.2 },
    obj1: {
      type: 'GameObject',
      image: 'fon6',
      position: { x: 0, y: 0 },
      size: { width: 4760, height: 1080 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  },
  l7: {
    visibility: true,
    parallax: { x: 0.4, y: 0.4 },
    obj1: {
      type: 'GameObject',
      image: 'fon7',
      position: { x: 0, y: 0 },
      size: { width: 4760, height: 1080 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  },
  l8: {
    visibility: true,
    parallax: { x: 0.6, y: 0.6 },
    obj1: {
      type: 'GameObject',
      image: 'fon8',
      position: { x: 0, y: 0 },
      size: { width: 4760, height: 1080 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: true
    }
  },
  lwm: {
    visibility: true,
    parallax: { x: 1, y: 1 },
    mouse: {
      type: 'GameObject',
      image: 'box',
      position: { x: 0, y: 0 },
      size: { width: 100, height: 100 },
      angle: 0,
      origin: { x: 50, y: 50 },
      opacity: 1,
      visibility: true,
      mouse: {
        update: (self, map) => {
          Ri.look(self, map.lwm.trig)
          self.position = Ri.mouse.position.inGame
          if (Ri.collisionObjects(map.lwm.trig, self)){
            map.lwm.obj.visibility = true
          }
          else {
            map.lwm.obj.visibility = false
          }
        }
      }
    },
    trig: {
      type: 'GameObject',
      image: 'box',
      position: { x: 400, y: 500 },
      size: { width: 100, height: 100 },
      angle: 0,
      origin: { x: 50, y: 50 },
      opacity: 1,
      visibility: true
    },
    obj: {
      type: 'GameObject',
      image: 'sample',
      position: { x: 100, y: 100 },
      size: { width: 100, height: 100 },
      angle: 0,
      origin: { x: 0, y: 0 },
      opacity: 1,
      visibility: false,
      mouse: {
        update: (self) => {
          if (Ri.mouse.onObject(self) && Ri.mouse.left) {
            Ri.loadMap('map1')
          }
        }
      }
    }
  },
}