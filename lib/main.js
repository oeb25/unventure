import tast, { KEYS } from 'tast';
import tegn, { init } from 'tegn';
import slicr from 'slicr';
import * as Level from './Level';
import * as NPC from './NPC';
import * as Camera from './Camera';
import * as UI from './UI';
import * as Dialogue from './Dialogue';
import 'array.from';
import * as Text from './Text';

//import story from '../dialouge/index';
import { another } from '../dialouge/stories.coffee';

/*while (!story['random'].ended) {
  console.log('Next\'d!', story['random'].type);

  story['random'].next(2);
}*/

let step = (story, i) => {
  if (!story.story) return story;

  let out;

  out = story.story.progress(i);

  return out;
};

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
  rest: [],
  story: another.progress(),
  lastKeyboard: keyboard.save()
};

Promise.all([
  Level.init(),
  Level.load('world'),
  slicr('assets/player.png', { width: 16, height: 16 }),
  slicr('assets/priest.png', { width: 16, height: 16 }),
  slicr('assets/font2.png', { width: 4, height: 5 }),
  Level.create('world')
]).then(([img, _world, player, priest, font, world]) => {
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
  state.text = Text.init(font);

  state.player =  NPC.create(player, 64, 16);
  state.priest =  NPC.create(priest, 64, 16);

  state.priest.offset = 0;

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

  if (s.story.story) {
    if (s.story.current.type == 'question') {
      if (keyboard.down(49)) {
        s.story = step(s.story, 0)
      } else if (keyboard.down(50)) {
        s.story = step(s.story, 1)
      }
    } else {
      if (keyboard.down(32) && s.lastKeyboard.up(32)) s.story = step(s.story);
    }
  }

  s.mouse.click = false;
  s.lastKeyboard = keyboard.save();

  tegn(ctx, {
    width: ctx.canvas.width,
    height: ctx.canvas.width,

    pixelate: true,

    fill: 'white',

    children: [{
      x: s.cam.x,
      y: s.cam.y,

      children: s.currentLevel([...s.rest, s.player, s.priest, s.follower])
    }, s.story.story ? Dialogue.display(s.text, s.story, s.priest.image[0], s.player.image[4]) : {}]
  });

  setTimeout(() => loop(ctx, s), 1000 / 40);
}
