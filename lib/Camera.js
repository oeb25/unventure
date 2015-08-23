export function create() {
  return {
    x: 0,
    y: 0
  };
}

export function update(cam, dest) {
  let amt = 1;

  let moveX = (Math.min(0, ~~dest.x) - cam.x);
  let moveY = (Math.min(0, ~~dest.y) - cam.y);

  if (Math.abs(moveX) > 4) {
    if (moveX > 0)
      cam.x += 1;//moveX * amt;
    else
      cam.x -= 1;
  }


  if (Math.abs(moveY) > 4) {
    if (moveY > 0)
      cam.y += 1;//moveX * amt;
    else
      cam.y -= 1;
  }

  cam.x = Math.min(0, cam.x);
  cam.y = Math.min(0, cam.y);
}
