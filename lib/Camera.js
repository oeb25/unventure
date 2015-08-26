export function create() {
  return {
    x: 0,
    y: 0
  };
}

export function update(cam, dest) {
  let moveX = (Math.min(0, ~~dest.x) - cam.x);
  let moveY = (Math.min(0, ~~dest.y) - cam.y);

  if (Math.abs(moveX) > 4) {
    cam.x += moveX > 0 ? 1 : -1;
  }


  if (Math.abs(moveY) > 4) {
    cam.y += moveY > 0 ? 1 : -1;
  }

  cam.x = Math.min(0, cam.x);
  cam.y = Math.min(0, cam.y);
}
