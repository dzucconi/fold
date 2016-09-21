const prefixes = ['-webkit-', '-o-', '-moz-', ''];

export default (fromColor, toColor) => {
  const animation = document.createElement('style');
  animation.type = 'text/css';

  prefixes.forEach(prefix => {
    animation.appendChild(document.createTextNode(`
      @${prefix}keyframes fade {
        from {
          color: ${fromColor};
        }

        to {
          color: ${toColor};
        }
      }
    `));
  });

  document.getElementsByTagName('head')[0]
    .appendChild(animation);
};
