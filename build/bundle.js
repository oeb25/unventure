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

	var _dialougeIndexJs = __webpack_require__(9);

	var _dialougeIndexJs2 = _interopRequireDefault(_dialougeIndexJs);

	while (!_dialougeIndexJs2['default']['random'].ended) {
	  console.log('Next\'d!', _dialougeIndexJs2['default']['random'].type);

	  _dialougeIndexJs2['default']['random'].next(2);
	}

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
	  rest: []
	};

	Promise.all([Level.init(), Level.load('world'), (0, _slicr2['default'])('/assets/player.png', { width: 16, height: 16 }), (0, _slicr2['default'])('/assets/priest.png', { width: 16, height: 16 }), Level.create('world')]).then(function (_ref) {
	  var _ref2 = _slicedToArray(_ref, 5);

	  var img = _ref2[0];
	  var _world = _ref2[1];
	  var player = _ref2[2];
	  var priest = _ref2[3];
	  var world = _ref2[4];

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

	  state.player = NPC.create(player);
	  state.priest = NPC.create(priest);

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

	  s.select += keyboard.down(_tast.KEYS.RIGHT) ? 1 : keyboard.down(_tast.KEYS.LEFT) ? -1 : 0;
	  s.select = s.select % (s.tileset.length * 10);

	  if (keyboard.down(_tast.KEYS.SPACE)) {
	    var placeX = Math.round(s.player.x / 16) * 16;
	    var placeY = Math.round(s.player.y / 16) * 16;

	    s.rest.push({
	      x: placeX,
	      y: placeY,

	      src: s.tileset[~ ~(s.select * 0.1)]
	    });
	    //console.log(~~(s.select * 0.1), placeX, placeY);
	  }

	  //console.log(Math.round(s.player.x / 16) * 16, Math.floor(((s.mouse.x / s.zoom) - s.cam.x) / 16) * 16);

	  if (keyboard.down(_tast.KEYS.R)) {
	    (function () {
	      var placeX = Math.round(s.player.x / 16) * 16;
	      var placeY = Math.round(s.player.y / 16) * 16;

	      s.rest = s.rest.filter(function (a) {
	        return a.x !== placeX || a.y !== placeY;
	      });

	      //console.log(~~(s.select * 0.1), placeX, placeY);
	    })();
	  }

	  s.mouse.click = false;

	  (0, _tegn2['default'])(ctx, {
	    width: ctx.canvas.width,
	    height: ctx.canvas.width,

	    pixelate: true,

	    fill: 'white',

	    children: [{
	      x: s.cam.x,
	      y: s.cam.y,

	      //scale: [8/16, 8/16],

	      //src: s.currentLevel[0],

	      children: s.currentLevel([].concat(_toConsumableArray(s.rest), [s.player, s.priest, s.follower]))
	    }]
	  });

	  //UI.create(s.tileset, ~~(s.select * 0.1))
	  setTimeout(function () {
	    return loop(ctx, s);
	  }, 1000 / 30);
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
	    var tiles = (0, _slicr2['default'])('/assets/tiles.png', { height: 16, width: 16 });

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
	  return fetch('../levels/' + name + '.json').then(function (res) {
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

	    x: 0, y: 0,
	    src: img[0]
	  };
	}

	;

	var speed = 1;

	function update(npc, move) {
	  npc.time += 0.2;
	  npc.src = npc.animate ? npc.image[Math.floor(npc.time) % 4 + npc.right] : npc.image[npc.right];

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
/***/ function(module, exports, __webpack_require__) {

	//import { m, q, a, r } from '../lib/Dialog';
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _Persons = __webpack_require__(10);

	// Ignore everything above this!

	var storys = {

	  /*
	    'enter church': [
	      m(priest, "Welcome to my church! What can I do for you?"),
	      m(boy, "I have sined father :'("),
	      m(priest, "YOU BASTERD! WHAT HAVE YOU DONE!?!!"),
	      m(boy, "I.. I.. I have stolen.."),
	      q(priest, "What have you stolen my child?", boy, [
	        a("I have stolen fish my lord!", 0),
	        a("FISH! JUST FISH! HELP ME LORD!", 0)
	      ],[
	        r("Fish you say?? Tell me, was it any good?")
	      ]),
	      m(boy, "What? What are you talking about?")
	    ]
	  */

	  'enter church alternative version': new _Persons.Conversation([_Persons.priest.says("Welcome to my church! What can I do for you?"), _Persons.boy.says("I have sined father :'("), _Persons.priest.says("YOU BASTERD! WHAT HAVE YOU DONE!?!!"), _Persons.boy.says("I... I.. I have stolen.."), _Persons.priest.asks(_Persons.boy, "What have you stolen my child?").awnsers(_Persons.boy.says("I have stolen fish my lord!", 0), _Persons.boy.says("FISH! JUST FISH! HELP ME LORD!", 0), _Persons.boy.says("Two bananas.. I haven't eaten for days!", 1)).responses(_Persons.priest.says("Fish you say?? Tell me, was it any good?"), _Persons.priest.says("Nobody likes bananas anyway :S")), _Persons.boy.says("What? What are you talking about?")]),

	  'random': new _Persons.Conversation([_Persons.priest.asks(_Persons.boy, "What do you want to do?").awnsers(_Persons.boy.says("Go swimming!", 0), _Persons.boy.says("Finish this game!", 1), _Persons.boy.says("Eat two and a half bananas!", 2)).responses(_Persons.priest.says("Aright! Let's head to the sea!"), _Persons.priest.says("Well then... Go to it!"), _Persons.priest.asks(_Persons.boy, "Can I have one??").awnsers(_Persons.boy.says("HELL NO!", 0), _Persons.boy.says("Sure thing! Go ahead and follow!", 1), _Persons.boy.says("Go to hell you bastard!")).responses(_Persons.priest.says("Calm down love, I'm not trying to be rude!"), _Persons.priest.says("Well then, on the road!"))), _Persons.boy.says("What? What are you talking about?")])

	};

	// Ignore everything below this

	exports['default'] = storys;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Person = (function () {
	  function Person(name) {
	    _classCallCheck(this, Person);

	    this.name = name;
	  }

	  _createClass(Person, [{
	    key: 'says',
	    value: function says(msg, action) {
	      return new Message(this, msg, action);
	    }
	  }, {
	    key: 'asks',
	    value: function asks(to, question) {
	      var _this = this;

	      return {
	        awnsers: function awnsers() {
	          for (var _len = arguments.length, _awnsers = Array(_len), _key = 0; _key < _len; _key++) {
	            _awnsers[_key] = arguments[_key];
	          }

	          console.log(_awnsers);
	          return {
	            responses: function responses() {
	              for (var _len2 = arguments.length, _responses = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                _responses[_key2] = arguments[_key2];
	              }

	              console.log(_responses);
	              return new Question(_this, question, _awnsers, _responses);
	            }
	          };
	        }
	      };
	    }
	  }]);

	  return Person;
	})();

	var Conversation = (function () {
	  function Conversation(content) {
	    _classCallCheck(this, Conversation);

	    this.content = content;

	    this.step = 0;

	    console.log(this);
	  }

	  _createClass(Conversation, [{
	    key: 'next',
	    value: function next() {
	      var _content$step;

	      this.step += (_content$step = this.content[this.step]).handle.apply(_content$step, arguments) ? 1 : 0;
	    }
	  }, {
	    key: 'display',
	    value: function display() {
	      return {
	        x: 100,
	        y: 100,

	        width: 100,
	        height: 100,

	        fill: 'red'
	      };
	    }
	  }, {
	    key: 'type',
	    get: function get() {
	      return this.content[this.step].type;
	    }
	  }, {
	    key: 'ended',
	    get: function get() {
	      return this.step == this.content.length;
	    }
	  }]);

	  return Conversation;
	})();

	exports.Conversation = Conversation;

	var Message = (function () {
	  function Message(owner, msg) {
	    var action = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

	    _classCallCheck(this, Message);

	    this.owner = owner;
	    this.msg = msg;
	    this.action = action;

	    this.type = 'say';
	  }

	  _createClass(Message, [{
	    key: 'handle',
	    value: function handle() {
	      console.log(this.owner.name + ': ' + this.msg);

	      return typeof this.action == 'function' ? this.action() : this.action;
	    }
	  }]);

	  return Message;
	})();

	var Question = (function (_Message) {
	  _inherits(Question, _Message);

	  function Question(owner, msg, awnsers, responses) {
	    _classCallCheck(this, Question);

	    _get(Object.getPrototypeOf(Question.prototype), 'constructor', this).call(this, owner, msg);

	    this.type = 'question';
	    this.awnsers = awnsers;
	    this.responses = responses;

	    this.choice = void 0;
	    this.step = 0;

	    console.log(this);
	  }

	  _createClass(Question, [{
	    key: 'handle',
	    value: function handle(choice) {
	      switch (this.step) {
	        case 0:
	          console.log(this.owner.name + ': ' + this.msg);

	          this.step += 1;

	          return false;
	        case 1:
	          this.choice = this.awnsers[choice].handle();

	          this.step += 1;

	          return false;
	        default:
	          console.log('plz', this.responses[this.choice]);

	          var a = this.responses[this.choice].handle(1);

	          console.log(a, 'WUP WUP!');

	          if (a) this.step += 1;

	          return a;
	      }
	    }
	  }]);

	  return Question;
	})(Message);

	var boy = new Person('Boy');
	exports.boy = boy;
	var priest = new Person('Priest');
	exports.priest = priest;

/***/ }
/******/ ]);