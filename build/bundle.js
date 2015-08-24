/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _tast = __webpack_require__(1);

	var _tast2 = _interopRequireDefault(_tast);

	var _tegn = __webpack_require__(3);

	var _tegn2 = _interopRequireDefault(_tegn);

	var _slicr = __webpack_require__(4);

	var _slicr2 = _interopRequireDefault(_slicr);

	var _Level = __webpack_require__(5);

	var Level = _interopRequireWildcard(_Level);

	var _NPC = __webpack_require__(6);

	var NPC = _interopRequireWildcard(_NPC);

	var _Camera = __webpack_require__(7);

	var Camera = _interopRequireWildcard(_Camera);

	var _UI = __webpack_require__(8);

	var UI = _interopRequireWildcard(_UI);

	var _Dialogue = __webpack_require__(12);

	var Dialogue = _interopRequireWildcard(_Dialogue);

	__webpack_require__(9);

	var _Text = __webpack_require__(10);

	var Text = _interopRequireWildcard(_Text);

	//import story from '../dialouge/index';

	var _dialougeStoriesCoffee = __webpack_require__(11);

	/*while (!story['random'].ended) {
	  console.log('Next\'d!', story['random'].type);

	  story['random'].next(2);
	}*/

	var step = function step(story, i) {
	  if (!story.story) return story;

	  var out = undefined;

	  out = story.story.progress(i);

	  return out;
	};

	var keyboard = new _tast2['default']().listen();

	var state = {
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
	  story: _dialougeStoriesCoffee.another.progress(),
	  lastKeyboard: keyboard.save()
	};

	Promise.all([Level.init(), Level.load('world'), (0, _slicr2['default'])('assets/player.png', { width: 16, height: 16 }), (0, _slicr2['default'])('assets/priest.png', { width: 16, height: 16 }), (0, _slicr2['default'])('assets/font2.png', { width: 4, height: 5 }), Level.create('world')]).then(function (_ref) {
	  var _ref2 = _slicedToArray(_ref, 6);

	  var img = _ref2[0];
	  var _world = _ref2[1];
	  var player = _ref2[2];
	  var priest = _ref2[3];
	  var font = _ref2[4];
	  var world = _ref2[5];

	  //const level = Level.background(img, world.layout);

	  var ctx = (0, _tegn.init)(256 / 2, 240 / 2);
	  ctx.canvas.addEventListener('mousemove', function (e) {
	    state.mouse.x = e.offsetX;
	    state.mouse.y = e.offsetY;
	  });
	  ctx.canvas.addEventListener('mousedown', function (e) {
	    state.mouse.click = true;
	  });
	  ctx.canvas.addEventListener('mouseup', function (e) {
	    state.mouse.click = false;
	  });

	  state.tileset = world.tileset;
	  state.text = Text.init(font);

	  state.player = NPC.create(player);
	  state.priest = NPC.create(priest);

	  state.priest.offset = 0;

	  state.currentLevel = world;

	  loop(ctx, state);
	});

	var limit = 18;

	var loop = function loop(ctx, s) {
	  s.wasd = {
	    x: keyboard.down(_tast.KEYS.A) ? -1 : keyboard.down(_tast.KEYS.D) ? 1 : 0,
	    y: keyboard.down(_tast.KEYS.W) ? -1 : keyboard.down(_tast.KEYS.S) ? 1 : 0
	  };

	  s.zoom *= keyboard.down(_tast.KEYS.UP) ? 1.01 : keyboard.down(_tast.KEYS.DOWN) ? 0.99 : 1;

	  var wantedX = ctx.canvas.width / 2 - (s.player.x + 8);
	  var wantedY = ctx.canvas.height / 2 - (s.player.y + 8);

	  Camera.update(s.cam, { x: wantedX, y: wantedY });

	  NPC.update(s.player, s.wasd);
	  NPC.update(s.priest);

	  NPC.follow(s.player, s.priest);

	  UI.update(s.ui);

	  if (s.story.story) {
	    if (s.story.current.type == 'question') {
	      if (keyboard.down(49)) {
	        s.story = step(s.story, 0);
	      } else if (keyboard.down(50)) {
	        s.story = step(s.story, 1);
	      }
	    } else {
	      if (keyboard.down(32) && s.lastKeyboard.up(32)) s.story = step(s.story);
	    }
	  }

	  s.mouse.click = false;
	  s.lastKeyboard = keyboard.save();

	  (0, _tegn2['default'])(ctx, {
	    width: ctx.canvas.width,
	    height: ctx.canvas.width,

	    pixelate: true,

	    fill: 'white',

	    children: [{
	      x: s.cam.x,
	      y: s.cam.y,

	      children: s.currentLevel([].concat(_toConsumableArray(s.rest), [s.player, s.priest, s.follower]))
	    }, s.story.story ? Dialogue.display(s.text, s.story, s.priest.image[0], s.player.image[4]) : {}]
	  });

	  setTimeout(function () {
	    return loop(ctx, s);
	  }, 1000 / 40);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj['default'] = obj;return newObj;
	  }
	}

	function _defaults(obj, defaults) {
	  var keys = Object.getOwnPropertyNames(defaults);for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];var value = Object.getOwnPropertyDescriptor(defaults, key);if (value && value.configurable && obj[key] === undefined) {
	      Object.defineProperty(obj, key, value);
	    }
	  }return obj;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var Tast = (function () {
	  function Tast(state) {
	    _classCallCheck(this, Tast);

	    this.state = state || [];
	  }

	  _createClass(Tast, [{
	    key: 'listen',
	    value: function listen() {
	      var _this = this;

	      var elm = arguments[0] === undefined ? window : arguments[0];

	      var handleKey = function handleKey(e) {
	        _this.state[e.which] = e.type === 'keydown';
	      };

	      elm.addEventListener('keydown', handleKey);
	      elm.addEventListener('keyup', handleKey);

	      return this;
	    }
	  }, {
	    key: 'down',
	    value: function down(id) {
	      if (Array.isArray(id)) {
	        for (var i = 0; i < id.length; i++) {
	          if (this.state[id[i]] === true) {
	            return true;
	          }
	        }
	      }

	      return !!this.state[id];
	    }
	  }, {
	    key: 'up',
	    value: function up(id) {
	      return !this.down(id);
	    }
	  }, {
	    key: 'save',
	    value: function save() {
	      return new Tast(this.state.slice());
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      this.state = [];
	    }
	  }]);

	  return Tast;
	})();

	exports['default'] = Tast;
	var KEYS = {
	  UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39,

	  SPACE: 32,

	  A: 65, B: 66, C: 67, D: 68,
	  E: 69, F: 70, G: 71, H: 72,
	  I: 73, J: 74, K: 75, L: 76,
	  M: 77, N: 78, O: 79, P: 80,
	  Q: 81, R: 82, S: 83, T: 84,
	  U: 85, V: 86, W: 87, X: 88,
	  Y: 89, Z: 90
	};

	exports.KEYS = KEYS;

	var _KeyLayout = __webpack_require__(2);

	_defaults(exports, _interopRequireWildcard(_KeyLayout));

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.KeyLayout = KeyLayout;

	function KeyLayout(state, options) {
	  var layout = {
	    setState: function setState(newState) {
	      state = newState;
	    }
	  };

	  var _loop = function _loop(key) {
	    Object.defineProperty(layout, key, {
	      get: function get() {
	        return state.down(options[key]);
	      }
	    });
	  };

	  for (var key in options) {
	    _loop(key);
	  }

	  return layout;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = tegn;
	exports.init = init;
	var cache = {};

	function tegn(ctx, state) {
	  var offset = arguments.length <= 2 || arguments[2] === undefined ? [0, 0] : arguments[2];
	  var scale = arguments.length <= 3 || arguments[3] === undefined ? [1, 1] : arguments[3];
	  var pixelate = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	  if (!state) return false;

	  if (Array.isArray(state)) {
	    state.map(function (child) {
	      return tegn(ctx, child, offset);
	    });

	    return state;
	  }

	  var p = !(state.pixelate !== void 0 ? state.pixelate : pixelate);

	  ctx['imageSmoothingEnabled'] = p;
	  ctx['mozImageSmoothingEnabled'] = p;
	  ctx['oImageSmoothingEnabled'] = p;
	  ctx['webkitImageSmoothingEnabled'] = p;
	  ctx['msImageSmoothingEnabled'] = p;

	  var s = state.scale || [1, 1];

	  var sx = scale[0] * (s[0] || 1);
	  var sy = scale[1] * (s[1] || 1);

	  var x = offset[0] + (state.x || 0) * sx;
	  var y = offset[1] + (state.y || 0) * sy;

	  if (x < ctx.canvas.width && y < ctx.canvas.height) {
	    if (state.fill) {
	      if (state.fill === 'clear') {
	        ctx.clearRect(x, y, state.width * sx || 0, state.height * sy || 0);
	      } else {
	        if (ctx.fillStyle !== state.fill) {
	          ctx.fillStyle = state.color || state.fill;
	        }
	        ctx.fillRect(x, y, state.width * sx || 0, state.height * sy || 0);
	      }
	    }

	    if (state.stroke) {
	      ctx.strokeStyle = state.stroke;
	      ctx.strokeRect(x, y, state.width * sx || 0, state.height * sy || 0);
	    }

	    if (state.src) {
	      var img = image(state.src);

	      if (state.width && state.height) {
	        ctx.drawImage(image(state.src), x, y, state.width * sx, state.height * sy);
	      } else {
	        ctx.drawImage(image(state.src), x, y, img.width * sx, img.height * sy);
	      }
	    }

	    if (state.text) {
	      if (state.font) {
	        ctx.font = state.font;
	      }
	      if (state.color) {
	        ctx.fillStyle = state.color;
	      }

	      ctx.fillText(state.text, x, y);
	    }
	  }

	  if (state.children) {
	    var len = state.children.length;

	    for (var i = 0; i < len; i++) {
	      tegn(ctx, state.children[i], [x, y], [sx, sy], !p);
	    }
	  }

	  return state;
	}

	function init(width, height) {
	  var elm = arguments.length <= 2 || arguments[2] === undefined ? document.body : arguments[2];

	  var canvas = document.createElement('canvas');

	  canvas.width = width;
	  canvas.height = height;

	  document.body.appendChild(canvas);

	  var ctx = canvas.getContext('2d');

	  ctx.offscreenCanvas = document.createElement('canvas');
	  ctx.offscreenCtx = ctx.offscreenCanvas.getContext('2d');

	  ctx.offscreenCanvas.width = width;
	  ctx.offscreenCanvas.height = height;

	  return ctx;
	}

	function image(src) {
	  if (typeof src !== 'string') return src;

	  if (cache[src]) return cache[src];

	  var img = document.createElement('img');
	  img.src = src;

	  return cache[src] = img;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	// slicr :: ((String|Image), (Object|Number)) -> Promise([Image])
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = slicr;
	exports.slicrAll = slicrAll;

	function slicr(img, ops) {
	  if (typeof img === 'string') {
	    return loadImage(img).then(function (img) {
	      return slicr(img, ops);
	    });
	  }

	  if (!img.width) {
	    throw new Error('Image is not yet loaded, or has a width of 0');
	  }

	  if (typeof ops == 'number') {
	    ops = { slices: ops };
	  }

	  var width = ops.slices ? Math.floor(img.width / ops.slices) : ops.width || img.width;

	  var height = ops.height || img.height;

	  var hslices = ops.slices || Math.floor(img.width / width);
	  var vslices = Math.floor(img.height / height);

	  var canvases = new Array(vslices * hslices).join(',').split(',').map(function (_, i) {
	    var canvas = document.createElement('canvas');
	    var ctx = canvas.getContext('2d');

	    canvas.width = width;
	    canvas.height = height;

	    var x = i % hslices * width;
	    var y = Math.floor(i / hslices) * height;

	    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

	    return canvas;
	  });

	  return new Promise(function (resolve) {
	    resolve(canvases);
	  });
	}

	// loadImage :: String -> Promise(Image)
	function loadImage(url) {
	  var img = document.createElement('img');
	  var didResolve = false;

	  return new Promise(function (resolve, reject) {
	    var notFound = setTimeout(function () {
	      if (didResolve) return;

	      reject('Error in loading image');
	    }, 3000);;

	    img.addEventListener('load', function () {
	      didResolve = true;

	      clearTimeout(notFound);

	      resolve(img);
	    });

	    img.src = url;
	  });
	}

	// slicrAll :: [Object] -> Promise([[Image]])

	function slicrAll(arr) {
	  return Promise.all(arr.map(function (a) {
	    return slicr(a.src, a);
	  }));
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _tegn = __webpack_require__(3);

	var _tegn2 = _interopRequireDefault(_tegn);

	var _slicr = __webpack_require__(4);

	var _slicr2 = _interopRequireDefault(_slicr);

	var getImage = function getImage(img, i) {
	  switch (i) {
	    case '.':
	      return img[1];
	    default:
	      return img[0];
	  }
	};

	var init = function init() {
	  return new Promise(function (res) {
	    var tiles = (0, _slicr2['default'])('assets/tiles.png', { height: 16, width: 16 });

	    tiles.then(res);
	  });
	};

	var background = function background(img, tiles, layer) {
	  var canvas = document.createElement('canvas');
	  var ctx = canvas.getContext('2d');

	  var cols = 0;

	  var bg = layer.layout.map(function (row, y) {
	    var col = row.split('');

	    cols = Math.max(col.length, cols);

	    return col.map(function (tile, x) {
	      return {
	        x: x * 16,
	        y: (y - 1) * 16,

	        width: 16,
	        height: 16,

	        src: img[tiles[tile]]
	      };
	    });
	  }).reduce(function (a, b) {
	    return a.concat(b);
	  });

	  var value = false;

	  canvas.width = cols * 16;
	  canvas.height = layer.layout.length * 16;

	  (0, _tegn2['default'])(ctx, {
	    children: bg
	  });

	  return canvas;
	};

	var getTileset = function getTileset(name) {
	  return (0, _slicr2['default'])(name, { width: 16, height: 16 });
	};

	var create = function create(name) {
	  return load(name).then(function (level) {
	    return getTileset(level.tileset).then(function (tileset) {
	      return { level: level, tileset: tileset };
	    });
	  }).then(function (_ref) {
	    var level = _ref.level;
	    var tileset = _ref.tileset;

	    var layers = level.layers.map(function (layer) {
	      if (layer.prerender == void 0 || layer.prerender) {
	        return {
	          src: background(tileset, level.tiles, layer)
	        };
	      } else {
	        return {
	          children: layer.layout.map(function (row, y) {
	            var plzz = row.split('').map(function (tile, x) {
	              return {
	                x: x * 16, y: y * 16,
	                src: tileset[level.tiles[tile]]
	              };
	            });

	            if (!plzz.length) return false;

	            return plzz;
	          }).filter(function (a) {
	            return a;
	          }).reduce(function (a, b) {
	            return a.concat(b);
	          }).filter(function (a) {
	            return a.src;
	          })
	        };
	      }
	    });

	    var out = function out(middle) {

	      return [layers[2], {
	        children: middle.concat(layers[1].children).sort(function (a, b) {
	          return a.y - b.y;
	        })
	      }, {
	        y: -5,
	        children: [layers[0]]
	      }];
	    };

	    out.tileset = tileset;

	    return out;
	  });
	};

	var fetchLevel = function fetchLevel(name) {
	  return fetch('levels/' + name + '.json').then(function (res) {
	    return res.text();
	  });
	};

	var load = function load(name) {
	  return new Promise(function (res) {
	    var item = 'level-' + name;
	    var localItem = localStorage.getItem(item);

	    if (false) {
	      console.log('getting from localStorage');

	      return res(JSON.parse(localItem));
	    } else {
	      console.log('fetching!');

	      return res(fetchLevel(name).then(function (lvl) {
	        localStorage.setItem(item, lvl);
	        return JSON.parse(lvl);
	      }));
	    }
	  });
	};

	exports.init = init;
	exports.background = background;
	exports.load = load;
	exports.create = create;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.create = create;
	exports.update = update;
	exports.follow = follow;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function create(img) {
	  return {
	    image: img,
	    time: Math.random() * 10,
	    right: 0,
	    animate: false,
	    prev: [],
	    offset: 0,

	    x: 0, y: 0,
	    src: img[0]
	  };
	}

	;

	var speed = 1;

	function update(npc, move) {
	  npc.time += 0.2;
	  npc.src = npc.animate ? npc.image[Math.floor(npc.time) % 4 + npc.right + npc.offset] : npc.image[npc.right + npc.offset];

	  if (move && (move.x || move.y)) {
	    npc.x += move.x * speed;
	    npc.y += move.y * speed;

	    npc.right = move.x == -1 ? 4 : move.x == 1 ? 0 : npc.right;

	    npc.animate = true;
	    npc.prev = [_extends({}, npc)].concat(_toConsumableArray(npc.prev)).slice(0, limit + 1);
	  } else {
	    npc.animate = false;
	  }
	}

	var limit = 10;

	function follow(a, b) {
	  b.animate = a.animate;

	  if (a.prev[limit]) {
	    var pp = a.prev[limit];

	    if (Math.round(pp.x * 2) == Math.round(b.x * 2) && Math.round(pp.y * 2) == Math.round(b.y * 2)) {
	      return;
	    }

	    b.x = pp.x;
	    b.y = pp.y - .1;
	    b.right = pp.right;

	    b.prev = [_extends({}, b)].concat(_toConsumableArray(b.prev)).slice(0, limit + 1);
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.create = create;
	exports.update = update;

	function create() {
	  return {
	    x: 0,
	    y: 0
	  };
	}

	function update(cam, dest) {
	  var amt = 1;

	  var moveX = Math.min(0, ~ ~dest.x) - cam.x;
	  var moveY = Math.min(0, ~ ~dest.y) - cam.y;

	  if (Math.abs(moveX) > 4) {
	    if (moveX > 0) cam.x += 1; //moveX * amt;
	    else cam.x -= 1;
	  }

	  if (Math.abs(moveY) > 4) {
	    if (moveY > 0) cam.y += 1; //moveX * amt;
	    else cam.y -= 1;
	  }

	  cam.x = Math.min(0, cam.x);
	  cam.y = Math.min(0, cam.y);
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.create = create;
	exports.update = update;

	function create(tiles, select) {
	  var options = {
	    x: 1,
	    y: 1,

	    //scale: [5, 5],

	    children: tiles.map(function (tile, i) {
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

	function update(ui) {}

/***/ },
/* 9 */
/***/ function(module, exports) {

	/*! http://mths.be/array-from v0.2.0 by @mathias */
	'use strict';

	if (!Array.from) {
		(function () {
			'use strict';
			var defineProperty = (function () {
				// IE 8 only supports `Object.defineProperty` on DOM elements.
				try {
					var object = {};
					var $defineProperty = Object.defineProperty;
					var result = $defineProperty(object, object, object) && $defineProperty;
				} catch (error) {}
				return result || function put(object, key, descriptor) {
					object[key] = descriptor.value;
				};
			})();
			var toStr = Object.prototype.toString;
			var isCallable = function isCallable(fn) {
				// In a perfect world, the `typeof` check would be sufficient. However,
				// in Chrome 1–12, `typeof /x/ == 'object'`, and in IE 6–8
				// `typeof alert == 'object'` and similar for other host objects.
				return typeof fn == 'function' || toStr.call(fn) == '[object Function]';
			};
			var toInteger = function toInteger(value) {
				var number = Number(value);
				if (isNaN(number)) {
					return 0;
				}
				if (number == 0 || !isFinite(number)) {
					return number;
				}
				return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
			};
			var maxSafeInteger = Math.pow(2, 53) - 1;
			var toLength = function toLength(value) {
				var len = toInteger(value);
				return Math.min(Math.max(len, 0), maxSafeInteger);
			};
			var from = function from(arrayLike) {
				var C = this;
				if (arrayLike == null) {
					throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
				}
				var items = Object(arrayLike);
				var mapping = arguments.length > 1;

				var mapFn, T;
				if (arguments.length > 1) {
					mapFn = arguments[1];
					if (!isCallable(mapFn)) {
						throw new TypeError('When provided, the second argument to `Array.from` must be a function');
					}
					if (arguments.length > 2) {
						T = arguments[2];
					}
				}

				var len = toLength(items.length);
				var A = isCallable(C) ? Object(new C(len)) : new Array(len);
				var k = 0;
				var kValue, mappedValue;
				while (k < len) {
					kValue = items[k];
					if (mapFn) {
						mappedValue = typeof T == 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
					} else {
						mappedValue = kValue;
					}
					defineProperty(A, k, {
						'value': mappedValue,
						'configurable': true,
						'enumerable': true
					});
					++k;
				}
				A.length = len;
				return A;
			};
			defineProperty(Array, 'from', {
				'value': from,
				'configurable': true,
				'writable': true
			});
		})();
	}

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.init = init;
	var letters = {
	  a: 0,
	  b: 1,
	  c: 2,
	  d: 3,
	  e: 4,
	  f: 5,
	  g: 6,
	  h: 7,
	  i: 8,
	  j: 9,
	  k: 10,
	  l: 11,
	  m: 12,
	  n: 13,
	  o: 14,
	  p: 15,
	  q: 16,
	  r: 17,
	  s: 18,
	  t: 19,
	  u: 20,
	  v: 21,
	  w: 22,
	  x: 23,
	  y: 24,
	  z: 25,
	  '?': 26,
	  '!': 27,
	  ':': 28,
	  '1': 29,
	  '2': 30,
	  '3': 31,
	  '4': 32,
	  '5': 33,
	  '6': 34,
	  '7': 35,
	  '8': 36,
	  '9': 37,
	  '0': 38,
	  ' ': 39,
	  '.': 40,
	  ',': 41,
	  "'": 42,
	  '-': 43
	};

	var limit = 24;

	function init(font) {
	  return function (x, y) {
	    var text = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	    var reduce = 0;

	    var imgs = text.toLowerCase().split('').map(function (char, i) {
	      if (char == ' ' && i % 24 == 0) {
	        reduce += 1;

	        return false;
	      }

	      return {
	        x: (i - reduce) % 24 * 5,
	        y: 6 * Math.floor((i - reduce) / 24),
	        src: font[letters[char]] || font[26]
	      };
	    }).filter(function (a) {
	      return a;
	    });

	    return {
	      x: x,
	      y: y,

	      scale: [1, 1],

	      children: imgs
	    };
	  };
	}

	;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var Dialogue, Person, action, asks, awnsers, boy, but, c, gameover, maybe, priest, ref, says, stealFish, stories;

	ref = __webpack_require__(12), says = ref.says, asks = ref.asks, maybe = ref.maybe, but = ref.but, awnsers = ref.awnsers, Dialogue = ref.Dialogue, action = ref.action;

	Person = function(name) {
	  return function(a) {
	    a.args.owner = name;
	    return a;
	  };
	};

	boy = Person('Boy');

	priest = Person('Priest');

	c = priest(says("Aww.. Too bad, I know the best place to find fish tho!")).then(boy(says("Are you serious?"))).then(priest(says("Yes!"))).then(boy(says("Can I change my mind? ;)")));

	stealFish = priest(says("FISH! Omg i luv fish! Can i have some!?!?"));

	gameover = action('game over');

	stories = {
	  another: boy(says("Hello there!")).then(priest(says("Why welcome son!"))).then(boy(says("I've sined father!"))).then(priest(asks("You have? Oh, that's too bad! What's the matter?", maybe("I've eaten 10 bananas").then(priest(asks("That's aright, nobody like bananas any way!", maybe("Ah...okay...then I go back home").then(gameover), maybe("Ikr? Bananas are awful. I stole fish, no kidding now.").then(stealFish)))), maybe("I've stolen fish").then(stealFish)))).then(boy(says("You want to steal fish?"))).then(priest(asks("YES! Will you teach me?", maybe("Well...").then(priest(asks("Come on, please!", maybe("Aright then...").then(priest(says("WUHU! ADVENTURE LIES AHEAD!"))), maybe("What the heck, come along!").then(priest(says("WUHU! ADVENTURE LIES AHEAD!")))))), maybe("No way! Not gonna happen!").then(c)))).then(priest(says("Follow me! I know the greatest place to get the freashest fish!"))).then(priest(says("Follow me! I know the greatest place to get the freashest fish!")))
	};

	module.exports = stories;


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Dialogue = Dialogue;
	exports.says = says;
	exports.maybe = maybe;
	exports.asks = asks;
	exports.action = action;
	exports.display = display;

	function Dialogue(type, args) {
	  if (type === undefined) type = 'say';

	  var self = {
	    type: type, args: args,
	    next: false,

	    then: function then(a) {
	      var out = Dialogue(self.type, self.args);
	      var nx = self;
	      var outNx = out;

	      while (nx.next) {
	        outNx.next = Dialogue(nx.next.type, nx.next.args);
	        outNx = outNx.next;

	        nx = nx.next;
	      }

	      outNx.next = a;

	      return out;
	    },

	    progress: function progress(i) {
	      switch (type) {
	        case 'say':
	          return {
	            story: self.next,
	            current: {
	              owner: args.owner,
	              type: type,
	              text: args.msg
	            }
	          };
	        case 'question':
	          return {
	            story: Dialogue('choice', args.choices).then(self.next),
	            current: {
	              owner: args.owner,
	              type: type,
	              choices: args.choices,
	              text: args.question
	            }
	          };
	        case 'choice':
	          return {
	            story: args[i].next.then(self.next),
	            current: {
	              owner: args.owner,
	              type: type,
	              text: args[i].text
	            }
	          };
	        case 'action':
	          return {
	            story: false
	          };
	      }

	      return self.next;
	    }
	  };

	  return self;
	}

	function says(msg) {
	  //console.log(...args, 'say');

	  return Dialogue('say', { msg: msg });
	}

	function maybe(text) {
	  return {
	    then: function then(next) {
	      return { next: next, text: text };
	    }
	  };
	}

	function asks() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return Dialogue('question', {
	    question: args[0],
	    choices: args.slice(1)
	  });
	}

	function action(str) {
	  return Dialogue('action', str);
	}

	var awnsers = says;
	exports.awnsers = awnsers;

	var story = says("Hello there!").then(says("sup dude!")).then(asks("Are you cool?", maybe("Nope!").then(says("shit")), maybe("I guess so").then(says("good good!").then(says("fuck you"))))).then(says("End!"));

	function display(text, story, priest, boy) {
	  var q = story.current.type == 'question';

	  var totalHeight = 0;
	  var l = 0;

	  var h = function h(amt) {
	    totalHeight += amt;
	    return amt;
	  };

	  var y = 0;

	  var content = {
	    children: [{
	      x: story.current.owner === 'Priest' ? -6 : -7.5,
	      y: -9,

	      scale: [3, 3],

	      src: priest
	    }, {
	      x: story.current.owner !== 'Priest' ? 32 : 33.5,
	      y: -9,

	      scale: [3, 3],

	      src: boy
	    }, {
	      width: 128 - 4,
	      height: h(Math.ceil(story.current.text.length / 24) * 7),
	      x: 0,
	      y: 0,

	      fill: 'cornflowerblue'
	    }, story.current.choices ? {
	      x: 2,
	      y: 2,

	      children: story.current.choices.map(function (c, i) {
	        var height = Math.ceil(c.text.length / 24) * 7;

	        y += height;

	        return {
	          children: [{
	            x: -2,
	            y: y - height + 12,

	            width: 124 + i,
	            height: h(height),

	            fill: i == 0 ? 'yellow' : 'red'
	          }, text(0, y - height + 13, c.text)]
	        };
	      })
	    } : {}, text(2, 1, story.current.text)]
	  };

	  return {
	    x: 2,
	    y: 119 - totalHeight,

	    children: [content]
	  };
	}

/***/ }
/******/ ]);