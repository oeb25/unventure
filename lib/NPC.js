export function create(img) {
  return {
    image: img,
    time: Math.random() * 10,
    right: 0,
    animate: false,
    prev: [],

    x: 0, y: 0,
    src: img[0],
  };
};

let speed = 1;

export function update(npc, move) {
  npc.time += 0.2;
  npc.src = npc.animate ? npc.image[(Math.floor(npc.time) % 4) + npc.right] : npc.image[npc.right];

  if (move && (move.x || move.y)) {
    npc.x += move.x * speed;
    npc.y += move.y * speed;

    npc.right = move.x == -1 ? 4 : move.x == 1 ? 0 : npc.right;

    npc.animate = true;
    npc.prev = [{...npc}, ...npc.prev].slice(0, limit + 1);
  } else {
    npc.animate = false;
  }
}

let limit = 10;

export function follow(a, b) {
  b.animate = a.animate;

  if (a.prev[limit]) {
    let pp = a.prev[limit];

    if (Math.round(pp.x * 2) == Math.round(b.x * 2) && Math.round(pp.y * 2) == Math.round(b.y * 2)) {
      return;
    }

    b.x = pp.x;
    b.y = pp.y - .1;
    b.right = pp.right;

    b.prev = [{...b}, ...b.prev].slice(0, limit + 1);
  }
}
