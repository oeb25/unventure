export async function load(path, files) {
  let names = [];
  let out = [];

  for (var name in files) {
    names.push(name);
    out.push(loadImage(path + files[name]));
  }

  let output = {};
  let images = await Promise.all(out);

  images.forEach((a, i) => output[names[i]] = a);

  return output;
}

function loadImage(path) {
  return new Promise(res => {
    let img = new Image();
    img.onload = () => res(img);
    img.src = path;
  })
}
