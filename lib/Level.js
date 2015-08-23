import tegn from 'tegn';
import slicr from 'slicr';

let getImage = (img, i) => {
  switch (i) {
    case '.':
      return img[1];
    default:
      return img[0];
  }
};

let init = () => {
  return new Promise(res => {
    let tiles = slicr('/assets/tiles.png', { height: 16, width: 16 });

    tiles.then(res);
  });
};

let background = (img, tiles, layer) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  let cols = 0;

  let bg = layer.layout.map((row, y) => {
    let col = row.split('');

    cols = Math.max(col.length, cols);

    return col.map((tile, x) => ({
      x: x * 16,
      y: (y - 1) * 16,

      width: 16,
      height: 16,

      src: img[tiles[tile]]
    }));
    }).reduce((a, b) => a.concat(b));

  let value = false;

  canvas.width = cols * 16;
  canvas.height = layer.layout.length * 16;

  tegn(ctx, {
    children: bg
  });

  return canvas;
};

let getTileset = name => slicr(name, { width: 16, height: 16 });

let create = name => load(name)
  .then(level =>
    getTileset(level.tileset).then(tileset => ({ level, tileset })))
  .then(({ level, tileset, }) => {
    let layers = level.layers.map(layer => {
      if (layer.prerender == void 0 || layer.prerender) {
        return {
          src: background(tileset, level.tiles, layer)
        };
      } else {
        return  {
          children: layer.layout.map((row, y) => {
            let plzz = row.split('')
              .map((tile, x) => {
                return {
                  x: x * 16, y: y * 16,
                  src: tileset[level.tiles[tile]]
                };
              });

              if (!plzz.length)
                return false;

              return plzz;
            }).filter(a => a).reduce((a, b) => a.concat(b)).filter(a => a.src)
        }
      }
    });

    const out = middle => {

      return [layers[2],{
        children: middle.concat(layers[1].children).sort((a, b) => a.y - b.y)
      },{
        y: -5,
        children: [layers[0]]
      }]
    };

    out.tileset = tileset;

    return out;
  });

let fetchLevel = name => fetch(`../levels/${name}.json`).then(res => res.text());

let load = name => new Promise(res => {
  const item = `level-${name}`;
  const localItem = localStorage.getItem(item);

  if (false && localItem) {
    console.log('getting from localStorage');

    return res(JSON.parse(localItem));
  } else {
    console.log('fetching!');

    return res(fetchLevel(name).then(lvl => {
      localStorage.setItem(item, lvl);
      return JSON.parse(lvl);
    }));
  }
})

export { init, background, load, create };
