(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Xiuli = factory());
}(this, (function () { 'use strict';

  /* global getComputedStyle */

  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;

  /**
   * Get CSS transform.
   *
   * @param {HTMLElement} el HTML element
   * @returns {string} transform
   */
  function getCSSStyles(el) {
    var style = getComputedStyle(el, null);
    var result = {};

    for (var _len = arguments.length, properties = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      properties[_key - 1] = arguments[_key];
    }

    properties.forEach(function (value) {
      var property = style.getPropertyValue('-webkit-' + value) || style.getPropertyValue('-moz-' + value) || style.getPropertyValue('-ms-' + value) || style.getPropertyValue('-o-' + value) || style.getPropertyValue('' + value) || 'none';
      result[value] = property;
    });
    return result;
  }

  /* eslint no-param-reassign: ["error", { "ignorePropertyModificationsFor": ["out"]}] */

  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */
  function fromValues(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }

  /**
   * Negates the components of a vec3
   *
   * @param {vec3} a vector to negate
   * @param {vec3} [out = new ARRAY_TYPE(3)] the receiving vector
   * @returns {vec3} out
   */
  function negate(a) {
    var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new ARRAY_TYPE(3);

    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }

  /* eslint no-param-reassign: ["error", {"ignorePropertyModificationsFor": ["out"]}] */

  /**
   * Creates a new 4 x 4 identity Matrix.
   * @return {Mat4} a new 4 x 4 identity Matrix.
   */
  function create() {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  }

  /**
  * Copy the values from one mat4 to another
  *
  * @param {mat4} a the source matrix
  * @param {mat4} [out = new ARRAY_TYPE(16)] the receiving matrix
  * @returns {mat4} out
  */
  function copy$1(a) {
    var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new ARRAY_TYPE(16);

    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }

  /**
   * Creates a matrix from a vector translation
   *
   * @param {vec3} v Translation vector
   * @param {mat4} [out = new ARRAY_TYPE(16)] out mat4 receiving operation result
   * @returns {mat4} out
   */
  function fromTranslation(v) {
    var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : create();

    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    return out;
  }

  /**
   * Multiplies two mat4s
   *
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @param {mat4} [out = new ARRAY_TYPE(16)] the receiving matrix
   * @returns {mat4} out
   */
  function multiply(a, b) {
    var out = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new ARRAY_TYPE(16);

    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    // Cache only the current line of the second matrix
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];

    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }

  /**
   * Inverts a mat4
   *
   * @param {mat4} a the source matrix
   * @param {mat4} [out = new ARRAY_TYPE(16)] the receiving matrix
   * @returns {mat4} out
   */
  function invert(a) {
    var out = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new ARRAY_TYPE(16);

    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
  }

  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
  function rotate(a, rad, axis) {
    var out = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new ARRAY_TYPE(16);

    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.sqrt(x * x + y * y + z * z);
    var s = void 0,
        c = void 0,
        t = void 0;
    var a00 = void 0,
        a01 = void 0,
        a02 = void 0,
        a03 = void 0;
    var a10 = void 0,
        a11 = void 0,
        a12 = void 0,
        a13 = void 0;
    var a20 = void 0,
        a21 = void 0,
        a22 = void 0,
        a23 = void 0;
    var b00 = void 0,
        b01 = void 0,
        b02 = void 0;
    var b10 = void 0,
        b11 = void 0,
        b12 = void 0;
    var b20 = void 0,
        b21 = void 0,
        b22 = void 0;

    if (Math.abs(len) < 0.000001) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
    a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
    a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }
    return out;
  }

  /**
   * Creates a new 4 x 4 Matrix from CSS transform.
   *
   * @param {string} transform CSS transform
   * @returns {Mat4} out
   */
  function fromCSSTransform(transform) {
    var re = /\(|\)|, |\s/g,
        values = transform.split(re),
        matrix = create();

    if (values[0] === 'matrix') {
      matrix[0] = parseFloat(values[1]);
      matrix[1] = parseFloat(values[2]);
      matrix[4] = parseFloat(values[3]);
      matrix[5] = parseFloat(values[4]);
      matrix[12] = parseFloat(values[5]);
      matrix[13] = parseFloat(values[6]);
    } else if (values[0] === 'matrix3d') {
      copy$1(values.slice(1, 17).map(function (v) {
        return parseFloat(v);
      }), matrix);
    }
    return matrix;
  }

  /**
   * Creates a new 4 x 4 Matrix from CSS transform.
   *
   * @param {HTMLElement} el CSS transform
   * @returns {Mat4} out
   */
  function fromElement(el) {
    var _getCSSStyles = getCSSStyles(el, 'transform'),
        transform = _getCSSStyles.transform,
        matrix = fromCSSTransform(transform);

    return matrix;
  }

  /**
   * Convert Mat4 to CSS transform.
   *
   * @param {Mat4} transform 4 x 4 Matrix
   * @returns {string} CSS transform
   */
  function toCssTransform(transform) {
    return 'matrix3d(' + transform.join(',') + ')';
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  /* global document */

  var Xiuli = function () {
    function Xiuli() {
      var _this = this;

      var mainContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'xiuli';
      var TFun = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      classCallCheck(this, Xiuli);

      this.main = document.getElementById(mainContainer);
      this.main.style.position = 'absolute';
      this.main.style.transformStyle = 'preserve-3d';

      var _getCSSStyles = getCSSStyles(this.main, 'transition', 'transition-duration'),
          transitionDuration = _getCSSStyles['transition-duration'];

      if (transitionDuration === '0s') {
        this.main.style.transitionDuration = '2s';
        this.main.style.WebkitTransitionDuration = '2s';
      }
      this.root = this.main.parentElement;
      this.callback = null;
      this.data = null;
      this.main.addEventListener('transitionend', function () {
        if (_this.callback) {
          _this.callback(_this.elementIds[_this.current], _this.data);
          _this.data = null;
        }
      }, false);
      this.mainTrans = fromElement(this.main);
      this.init(TFun);
    }

    createClass(Xiuli, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        var TFun = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        this.TFun = TFun;
        this.elementIds = [];
        this.current = -1;
        this.elements = {};
        this.xiulies = this.main.querySelectorAll('[data-xiuli]');
        if (this.TFun instanceof Function) {
          Array.prototype.forEach.call(this.xiulies, function (el, i, els) {
            var secTr = create();
            secTr = _this2.TFun(secTr, i, els);
            el.style.transform = toCssTransform(secTr);
          });
        }
        Array.prototype.forEach.call(this.xiulies, function (el, i) {
          var move = false;
          if (i === 0) {
            move = true;
          }
          _this2.add(el, move);
        });
      }
    }, {
      key: 'add',
      value: function add(el, move) {
        var _getCSSStyles2 = getCSSStyles(el, 'transform', 'transform-origin'),
            transform = _getCSSStyles2.transform,
            transformOrigin = _getCSSStyles2['transform-origin'];

        var re = /[-+]?[0-9]*\.?[0-9]+/g;

        var _transformOrigin$matc = transformOrigin.match(re),
            _transformOrigin$matc2 = slicedToArray(_transformOrigin$matc, 3),
            _transformOrigin$matc3 = _transformOrigin$matc2[0],
            x = _transformOrigin$matc3 === undefined ? 0.0 : _transformOrigin$matc3,
            _transformOrigin$matc4 = _transformOrigin$matc2[1],
            y = _transformOrigin$matc4 === undefined ? 0.0 : _transformOrigin$matc4,
            _transformOrigin$matc5 = _transformOrigin$matc2[2],
            z = _transformOrigin$matc5 === undefined ? 0.0 : _transformOrigin$matc5;

        var secTr = fromCSSTransform(transform);
        var TrVec = fromValues(x, y, z);
        var TrMat = fromTranslation(TrVec);
        multiply(TrMat, secTr, secTr);
        negate(TrVec, TrVec);
        var w = this.root.offsetWidth;
        var h = this.root.offsetHeight;
        TrVec[0] -= (w - el.offsetWidth) / 2;
        TrVec[1] -= (h - el.offsetHeight) / 2;
        fromTranslation(TrVec, TrMat);
        multiply(secTr, TrMat, secTr);

        invert(secTr, secTr);
        multiply(this.mainTrans, secTr, secTr);

        this.elements[el.id] = toCssTransform(secTr);
        this.elementIds.push(el.id);
        if (move) {
          this.goto(el.id, null);
        }
      }
    }, {
      key: 'onTransitionend',
      value: function onTransitionend(fn) {
        this.callback = fn;
      }
    }, {
      key: 'goto',
      value: function goto(tId, data) {
        var i = this.elementIds.indexOf(tId);
        if (i !== -1) {
          this.main.style.transform = this.elements[tId];
          this.data = data;
          this.current = i;
        }
      }
    }, {
      key: 'pre',
      value: function pre(data) {
        this.current -= 1;
        if (this.current < 0) {
          this.current = this.elementIds.length - 1;
        }
        var tId = this.elementIds[this.current];
        this.goto(tId, data);
      }
    }, {
      key: 'next',
      value: function next(data) {
        this.current += 1;
        if (this.current >= this.elementIds.length) {
          this.current = 0;
        }
        var tId = this.elementIds[this.current];
        this.goto(tId, data);
      }
    }]);
    return Xiuli;
  }();

  function steps(secTr, i) {
    var tr = secTr;
    tr[12] = 600;
    tr[13] = -400 * i;
    tr[14] = -400 * i;
    return tr;
  }

  function circular(secTr, i) {
    var thita = 6.28319 * i / 6;
    var tr = secTr;
    tr[12] = 600 * Math.sin(thita);
    tr[13] = 200;
    tr[14] = 800 * (Math.cos(thita) - 1);
    return tr;
  }

  function spiralSteps(secTr, i, els) {
    var tr = secTr;
    var thita = 6.28319 * i / els.length;
    rotate(secTr, thita - 1.5708, fromValues(0, 1, 0), secTr);
    tr[12] = 500 * Math.sin(thita);
    tr[13] = -400 * i;
    tr[14] = 500 * (Math.cos(thita) - 1);
    return tr;
  }

  function spiralRotated(secTr, i) {
    var tr = secTr;
    var thita = 6.28319 * i / 6;
    rotate(secTr, thita, fromValues(0, 1, 0), secTr);
    tr[12] = 600 * Math.sin(thita);
    tr[13] = 200 * i;
    tr[14] = 600 * (Math.cos(thita) - 1);
    return secTr;
  }

  function poly(secTr, i) {
    var tr = secTr;
    var thita = 6.28319 * i / 6;
    rotate(secTr, thita, fromValues(0, 1, 0), secTr);
    tr[12] = 600 * Math.sin(thita);
    tr[13] = 200;
    tr[14] = 600 * (Math.cos(thita) - 1);
    return secTr;
  }

  var initializers = /*#__PURE__*/Object.freeze({
    steps: steps,
    circular: circular,
    spiralSteps: spiralSteps,
    spiralRotated: spiralRotated,
    poly: poly
  });

  Xiuli.initializers = initializers;

  return Xiuli;

})));
//# sourceMappingURL=xiuli.js.map
