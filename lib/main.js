import tast, { KEYS } from 'tast';
import tegn, { init } from 'tegn';
import slicr from 'slicr';
import * as Level from './Level';
import * as NPC from './NPC';
import * as Camera from './Camera';
import * as UI from './UI';
import dialogue from './Dialogue/state';
import * as Dialogue from './Dialogue/view';
import * as Assets from './Assets';
import 'array.from';
import 'whatwg-fetch';

import { another } from '../dialogues/stories.coffee';

let step = (story, i) => story.story ? story.story.progress(i) : story;

let scale = 10;

let keyboard = new tast().listen();

let initGame = async function() {
  let world = await Level.create('world');
  let assets = await Assets.load('assets/', {
    boy: 'boy.png',
    priest: 'priest.png',
    tiles: 'tiles.png',
    watermelon: 'watermelon.png',
    arrow: 'arrow.png',
  }).then(assets => ({
    boy: slicr(assets.boy, { width: 16, height: 16 }),
    priest: slicr(assets.priest, { width: 16, height: 16 }),
    watermelon: slicr(assets.watermelon, { width: 16, height: 16 }),
    arrow: assets.arrow,
    tiles: slicr(assets.tiles, { width: 16, height: 16 })
  }));


  let state = {
    assets,
    cam: Camera.create(),
    wasd: { x: 0, y: 0 },
    mouse: { x: 0, y: 0, click: false },
    rest: [],
    select: 0,
    story: another.progress(),
    lastKeyboard: keyboard.save(),
    boy: NPC.create(assets.boy, 64, 16),
    priest: NPC.create(assets.priest, 64, 16),
    dialogue: dialogue(void 0, { type: 'begin', name: 'watermelon' }),
    followers: [
      NPC.create(assets.watermelon, 64, 16),
    ],
    currentLevel: world
  };

  let ctx = init(170 * scale, 120 * scale);
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

  state.priest.offset = 0;

  loop(ctx, state);
};

let loop = (ctx, s) => {
  s.wasd = {
    x: keyboard.down(KEYS.A) ? -1 : keyboard.down(KEYS.D) ? 1 : 0,
    y: keyboard.down(KEYS.W) ? -1 : keyboard.down(KEYS.S) ? 1 : 0
  };

  Camera.update(s.cam, {
    x: ctx.canvas.width / scale / 2 - (s.boy.x + 8),
    y: ctx.canvas.height / scale / 2 - (s.boy.y + 8)
  });

  if (!s.dialogue.active) {
    NPC.update(s.boy, s.wasd);
    NPC.update(s.priest);

    NPC.follow(s.boy, s.priest);

    s.followers.reduce((a, b) => {
      NPC.update(b);
      NPC.follow(a, b);

      return b;
    }, s.priest);
  }

  UI.update(s.ui);

  if (keyboard.down(32) && s.lastKeyboard.up(32)) {
    s.dialogue = dialogue(s.dialogue, {
      type: 'progress'
    });
  }

  if (keyboard.down(KEYS.UP)) {
    s.dialogue = dialogue(s.dialogue, {
      type: 'select',
      n: -1
    });
  }

  if (keyboard.down(KEYS.DOWN)) {
    s.dialogue = dialogue(s.dialogue, {
      type: 'select',
      n: 1
    });
  }

  s.dialogue = dialogue(s.dialogue, {
    type: 'tick'
  });

  s.mouse.click = false;
  s.lastKeyboard = keyboard.save();

  tegn(ctx, {
    width: ctx.canvas.width,
    height: ctx.canvas.width,

    fill: 'white',

    scale: [scale, scale],

    pixelate: true,

    children: [{
      x: s.cam.x,
      y: s.cam.y,

      children: s.currentLevel([...s.rest, s.boy, s.priest, ...s.followers])
    }, s.dialogue.active && Dialogue.view(s.assets, s.dialogue)
    ]
  });

  setTimeout(() => loop(ctx, s), 1000 / 40);
}

initGame();
