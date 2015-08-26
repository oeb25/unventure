import slicr from 'slicr';

let limit = 40;
let font = [];
slicr.async('assets/font3.png', { width: 5, height: 5 }).then(f => font = f);

export default function Text(x, y, text = '') {
  let reduce = 0;

  let imgs = text.toLowerCase().split('')
    .map((char, i) => {
      if (char == ' ' && (i % limit) == 0) {
        reduce += 1;

        return false;
      }

      return {
        x: ((i - reduce) % limit) * 6,
        y: 6 * Math.floor((i - reduce)/limit),
        src: font[letters[char]] || font[Math.floor(Math.random() * 44) % 44]
      };
    }).filter(a => a);

  return {
    x: x,
    y: y,

    children: imgs
  };
}

const letters = {
  a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11,
  m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, s: 18, t: 19, u: 20, v: 21, w: 22,
  x: 23, y: 24, z: 25, '?': 26, '!': 27, ':': 28, '1': 29, '2': 30, '3': 31,
  '4': 32, '5': 33, '6': 34, '7': 35, '8': 36, '9': 37, '0': 38, ' ': 39,
  '.': 40, ',': 41, "'": 42, '-': 43, '(': 44, ')': 45,
};
