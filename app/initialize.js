const CONFIG = {
  amount: 20,
  speed: 100,
  offset: 100,
  length: 5000,
  message: 'THE GREAT EDUCATIONAL VALUE OF THE WAR AGAINST CHRISTENDOM LIES IN THE ABSOLUTE TRUTHLESSNESS OF THE PRIEST. SUCH PURITY IS RARE ENOUGH. THE “MAN OF GOD” IS ENTIRELY INCAPABLE OF HONESTY, AND ONLY ARISES AT THE POINT WHERE TRUTH IS DEFACED BEYOND ALL LEGIBILITY. LIES ARE HIS ENTIRE METABOLISM, THE AIR HE BREATHES, HIS BREAD AND HIS WINE. HE CANNOT COMMENT UPON THE WEATHER WITHOUT A SECRET AGENDA OF DECEIT. NO WORD, GESTURE, OR PERCEPTION IS SLIGHT ENOUGH TO ESCAPE HIS EXTRAVAGANT REFLEX OF FALSIFICATION, AND OF THE LIES IN CIRCULATION HE WILL INSTINCTIVELY SEIZE ON THE GROSSEST, THE MOST OBSCENE AND OPPRESSIVE TRAVESTY. ANY PROPOSITION PASSING THE LIPS OF A PRIEST IS NECESSARILY TOTALLY FALSE, EXCEPTING ONLY INSIDIOUSES WHOSE MESSAGE IS MOMENTARILY MISUNDERSTOOD. IT IS IMPOSSIBLE TO DENY HIM WITHOUT DISCOVERING SOME BURIED FRAGMENT OR REALITY. THERE IS NO TRUTH THAT IS NOT WAR AGAINST THEOLOGY, AND EVEN THE WORD “TRUTH” HAS BEEN PLASTERED BY THE SPITTLE OF PRIESTCRAFT. IT CANNOT BE ATTACHMENT TO SOME ALTERNATIVE CONVICTION THAT CUTS HERE, BUT ONLY RELENTLESS REFUSAL OF WHAT HAS BEEN TOLD. THE DANGEROUS INFIDELS BYPASS DIALECTICS. IT IS THE SCEPTIC WHO ASSASSINATES THE LIE. WHENEVER ITS NAME HAS BEEN ANYTHING BUT A JEST, PHILOSOPHY HAS BEEN HAUNTED BY A SUBTERRANEAN QUESTION: WHAT IF KNOWLEDGE WERE A MEANS TO DEEPEN UNKNOWING? IT IS THIS THOUGHT ALONE THAT HAS DIFFERENTIATED IT FROM THE SHALLOW THINGS OF THE EARTH.',
};

const STATE = {
  current: [0, 0],
  previous: [0, 0],
  message: [],
};

const img = ({ width, height, src, name }) => {
  const i = new Image(width, height);
  i.src = src;
  i.className = name;
  return i;
};

const next = ([top, left], angle) => ([
  Math.round(Math.sin(angle * Math.PI / 180) * CONFIG.amount + top),
  Math.round(Math.cos(angle * Math.PI / 180) * CONFIG.amount + left),
]);

const rand = (min, max) =>
  Math.random() * (max - min) + min;

const start = () => ([
  Math.floor(rand(0, window.innerHeight - CONFIG.offset)),
  Math.floor(rand(0, window.innerWidth - CONFIG.offset)),
]);

const isOutOfBounds = () => (
  (STATE.previous[0] >= (window.innerHeight - CONFIG.offset) || STATE.previous[0] <= CONFIG.offset) ||
  (STATE.previous[1] >= (window.innerWidth - CONFIG.offset) || STATE.previous[1] <= CONFIG.offset)
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
    STATE.message = CONFIG.message.split('');
  }

  return STATE.message.shift();
};

const render = () => {
  const letter = document.createElement('div');
  letter.className = 'letter';
  letter.style.top = `${STATE.current[0]}px`;
  letter.style.left = `${STATE.current[1]}px`;
  // letter.style.transform = `rotate(${STATE.angle + 90}deg)`;
  letter.innerHTML = take();
  document.body.appendChild(letter);
  setTimeout(() => {
    document.body.removeChild(letter)
  }, CONFIG.length);
};

document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    STATE.previous = STATE.current;
    step();
    render();
  }, CONFIG.speed);
});
