module.exports = {
  integer: {
    mask: Number,
    signed: true,
  },
  positiveInteger: {
    mask: Number,
    scale: 0,
    signed: false,
  },
  usd: {
    mask: 'value USD',
    lazy: false, // make placeholder always visible
    blocks: {
      value: {
        mask: Number,
        signed: false, // disallow negative
        scale: 4, // digits after point, 0 for integers
        padFractionalZeros: true, // if true, then pads zeros at end to the length of scale
        thousandsSeparator: '',
        radix: '.',
        min: 1,
      },
    },
  },
  tlos: {
    mask: 'value TLOS',
    lazy: false, // make placeholder always visible
    blocks: {
      value: {
        mask: Number,
        signed: false, // disallow negative
        scale: 4, // digits after point, 0 for integers
        padFractionalZeros: true, // if true, then pads zeros at end to the length of scale
        thousandsSeparator: '',
        radix: '.',
        min: 0.0001,
      },
    },
  },
};
