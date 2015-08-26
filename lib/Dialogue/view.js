import { rect } from '../drawHelpers';
import Text from '../Text';

let gameWidth = 151;

let cache = {};

let scale = .6;

function speaker(src, right = false, talking, ani, i) {
  let offset = talking ? Math.round(-(Math.sin(ani / 3) + 1) * 1) * .5 : 0;

  return {
    x: right ? (20 + i * 100) : (-2 + i * 5),
    y: offset - 11,

    scale: [3, 3],

    src: src[right ? 4 : 0]
  };
}

export function view(assets, /* dialogue */ dialogue) {
  let { participants, current, selection, time } = dialogue;
  let q = current.type == 'question';

  let totalHeight = 0;

  let h = amt => {
    totalHeight += amt;
    return amt;
  };

  let speed = 2;
  let message = current.text.substr(0, time / speed);

  let content = [
    ...participants[0].map((p, i) => speaker(assets[p], false, current.name == i, time, i)),
    ...participants[1].map((p, i) => speaker(assets[p], true, current.name == i + participants[0].length, time, i)),

    rect(-2, 0, (gameWidth - 4) / scale, h(Math.ceil(Math.max(1, message.length) / 40) * 7), 'cornflowerblue'),

    current.choices ? {
      y: 2,

      children: current.choices.map((c, i) => {
        let height = Math.ceil(c.text.length / 40) * 7;

        let textY = totalHeight;

        return {
          children: [{
            x: -2,
            y: totalHeight - 2,

            width: (gameWidth - 4) / scale,
            height: h(height),

            fill: i == 0 ? 'yellow' : 'red'
          }, Text(0, textY - 1, c.text), selection == i && {
            src: assets.arrow,
            x: (gameWidth - 4) / scale + Math.round(Math.cos((time + 2) / 5)),
            y: textY - 2
          }]
        };
      })
    } : {}, Text(0, 1, message)
  ];

  dialogue.offsetTop += dialogue.offsetTop < totalHeight ? 1 : dialogue.offsetTop > totalHeight ? -1 : 0;

  return {
    x: 4,
    y: 112 - Math.max(0, dialogue.offsetTop * scale + 0 - 7),

    children: [{
      scale: [scale, scale],
      children: content
    }]
  }
}
