import assign from 'object-assign';
import params from './lib/params';
import animate from './lib/animate';

const CONFIG = {
  amount: 15,
  speed: 10,
  offset: 1,
  length: 15000,
  message: '123456789'
};

const STYLE = {
  background_color: 'white',
  color_start: 'black',
  color_end: 'black',
  font_style: 'normal',
  font_weight: 'normal',
  font_family: 'serif',
  font_size: '16px',
  animation_duration: '5s',
};

const PARAMS = params(assign({}, STYLE, CONFIG));

const STATE = {
  current: [0, 0],
  previous: [0, 0],
  message: [],
};

const next = ([top, left], angle) => ([
  Math.round(Math.sin(angle * Math.PI / 180) * PARAMS.amount + top),
  Math.round(Math.cos(angle * Math.PI / 180) * PARAMS.amount + left),
]);

const rand = (min, max) =>
  Math.random() * (max - min) + min;

const start = () => ([
  Math.floor(rand(0, window.innerHeight - PARAMS.offset)),
  Math.floor(rand(0, window.innerWidth - PARAMS.offset)),
]);

const isOutOfBounds = () => (
  (STATE.previous[0] >= (window.innerHeight - PARAMS.offset) || STATE.previous[0] <= PARAMS.offset) ||
  (STATE.previous[1] >= (window.innerWidth - PARAMS.offset) || STATE.previous[1] <= PARAMS.offset)
);

const step = () => {
  if (isOutOfBounds()) {
    STATE.previous = start();
    STATE.angle = rand(0, 360);
  }

  STATE.current = next(STATE.previous, STATE.angle);
};

const take = () => {
  if (STATE.message.length === 0) {
    STATE.message = PARAMS.message.split('');
  }

  return STATE.message.shift();
};

const render = () => {
  const letter = document.createElement('div');
  letter.className = 'letter';
  letter.style.top = `${STATE.current[0]}px`;
  letter.style.left = `${STATE.current[1]}px`;
  letter.style.animationDuration = STYLE.animation_duration;

  if (PARAMS.rotate) letter.style.transform = `rotate(${STATE.angle + 90}deg)`;

  letter.innerHTML = take();
  document.body.appendChild(letter);
  setTimeout(() => {
    document.body.removeChild(letter);
  }, PARAMS.length);
};

document.addEventListener('DOMContentLoaded', () => {
  if (PARAMS.debug) {
    document.body.innerHTML = JSON.stringify(PARAMS, undefined, 2);
    return;
  }

  document.body.style.backgroundColor = PARAMS.background_color;
  document.body.style.color = PARAMS.color_end;
  document.body.style.fontFamily = PARAMS.font_family;
  document.body.style.fontStyle = PARAMS.font_style;
  document.body.style.fontWeight = PARAMS.font_weight;
  document.body.style.fontSize = PARAMS.font_size;

  animate(PARAMS.color_start, PARAMS.color_end);

  setInterval(() => {
    STATE.previous = STATE.current;
    step();
    render();
  }, PARAMS.speed);
});
