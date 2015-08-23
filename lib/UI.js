export function create(tiles, select) {
  let options = {
    x: 1,
    y: 1,

    //scale: [5, 5],

    children: tiles.map((tile, i) => {
      return {
        x: i * (16 + 2),
        src: tile
      };
    })
  };

  return {
    tiles: void 0,

    x: 10,
    y: 10,

    children: [{
      children: [{
        x: 90 * select,
        y: 0,

        width: 90 / 5, height: 90 / 5,

        fill: '#3ee'
      }, options]
    }]
  };
}

export function update(ui) { }
