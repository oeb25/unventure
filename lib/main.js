import tast, { KEYS } from 'tast';
import tegn, { init } from 'tegn';
import slicr from 'slicr';
import * as Level from './Level';
import * as NPC from './NPC';
import * as Camera from './Camera';
import * as UI from './UI';

import story from '../dialouge/index.js';

while (!story['random'].ended) {
  console.log('Next\'d!', story['random'].type);

  story['random'].next(2);
}

let keyboard = new tast().listen();

let state = {
  x: 0, y: 0,
  cam: Camera.create(),
  px: 0, py: 0,
  bg: void 0,
  wasd: { x: 0, y: 0 },
  zoom: 10,
  player: void 0,
  priest: void 0,
  tileset: void 0,
  mouse: { x: 0, y: 0, click: false },
  select: 0,
  rest: []
};

Promise.all([
  Level.init(),
  Level.load('world'),
  slicr('/assets/player.png', { width: 16, height: 16 }),
  slicr('/assets/priest.png', { width: 16, height: 16 }),
  Level.create('world')
]).then(([img, _world, player, priest, world]) => {
  //const level = Level.background(img, world.layout);

  let ctx = init(256/2, 240/2);
  ctx.canvas.addEventListener('mousemove', e => {
    state.mouse.x = e.offsetX;
    state.mouse.y = e.offsetY;
  });
  ctx.canvas.addEventListener('mousedown', e => {
    state.mouse.click = true;
  });
  ctx.canvas.addEventListener('mouseup', e => {
    state.mouse.click = false;
  });

  state.tileset = world.tileset;

  state.player =  NPC.create(player);
  state.priest =  NPC.create(priest);

  state.currentLevel = world;

  loop(ctx, state);
});

let limit = 18;

let loop = (ctx, s) => {
  s.wasd = {
    x: keyboard.down(KEYS.A) ? -1 : keyboard.down(KEYS.D) ? 1 : 0,
    y: keyboard.down(KEYS.W) ? -1 : keyboard.down(KEYS.S) ? 1 : 0
  };

  s.zoom *= keyboard.down(KEYS.UP) ? 1.01 : keyboard.down(KEYS.DOWN) ? 0.99 : 1;

  let wantedX = (ctx.canvas.width) / 2 - (s.player.x + 8);
  let wantedY = (ctx.canvas.height) / 2 - (s.player.y + 8);

  Camera.update(s.cam, { x: wantedX, y: wantedY });

  NPC.update(s.player, s.wasd);
  NPC.update(s.priest);

  NPC.follow(s.player, s.priest);

  UI.update(s.ui);

  s.select += keyboard.down(KEYS.RIGHT) ? 1 : keyboard.down(KEYS.LEFT) ? -1 : 0;
  s.select = s.select % (s.tileset.length * 10);

  if (keyboard.down(KEYS.SPACE)) {
    let placeX = Math.round(s.player.x / 16) * 16;
    let placeY = Math.round(s.player.y / 16) * 16;

    s.rest.push({
      x: placeX,
      y: placeY,

      src: s.tileset[~~(s.select * 0.1)]
    });
    //console.log(~~(s.select * 0.1), placeX, placeY);
  }

  //console.log(Math.round(s.player.x / 16) * 16, Math.floor(((s.mouse.x / s.zoom) - s.cam.x) / 16) * 16);


  if (keyboard.down(KEYS.R)) {
    let placeX = Math.round(s.player.x / 16) * 16;
    let placeY = Math.round(s.player.y / 16) * 16;

    s.rest = s.rest.filter(a => a.x !== placeX || a.y !== placeY);

    //console.log(~~(s.select * 0.1), placeX, placeY);
  }

  s.mouse.click = false;

  tegn(ctx, {
    width: ctx.canvas.width,
    height: ctx.canvas.width,

    pixelate: true,

    fill: 'white',

    children: [{
      x: s.cam.x,
      y: s.cam.y,

      //scale: [8/16, 8/16],

      //src: s.currentLevel[0],

      children: s.currentLevel([...s.rest, s.player, s.priest, s.follower])
    },
    //UI.create(s.tileset, ~~(s.select * 0.1))
    ]
  });

  setTimeout(() => loop(ctx, s), 1000 / 30);
}
