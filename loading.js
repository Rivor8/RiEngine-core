Game.loading = () => {
  if (canvas.width / canvas.height < document.documentElement.clientWidth / document.documentElement.clientHeight) {
    canvas.style.height = String(document.documentElement.clientHeight) + 'px'
    canvas.style.width = String(document.documentElement.clientHeight * (canvas.width / canvas.height)) + 'px'
    canvas.style.marginLeft = String((document.documentElement.clientWidth - (document.documentElement.clientHeight * (canvas.width / canvas.height))) / 2) + 'px'
    canvas.style.marginTop = '0px'
  }
  if (canvas.width / canvas.height === document.documentElement.clientWidth / document.documentElement.clientHeight) {
    canvas.style.height = String(document.documentElement.clientHeight) + 'px'
    canvas.style.width = String(document.documentElement.clientHeight) + 'px'
    canvas.style.marginLeft = '0px'
    canvas.style.marginTop = '0px'
  }
  if (canvas.width / canvas.height > document.documentElement.clientWidth / document.documentElement.clientHeight) {
    canvas.style.height = String(document.documentElement.clientWidth * (canvas.height / canvas.width)) + 'px'
    canvas.style.width = String(document.documentElement.clientWidth) + 'px'
    canvas.style.marginLeft = '0px'
    canvas.style.marginTop = String((document.documentElement.clientHeight - (document.documentElement.clientWidth * (canvas.height / canvas.width))) / 2) + 'px'
  }
  canvasContext.fillStyle = Settings.loadingScreen.backgroundColor
  canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}