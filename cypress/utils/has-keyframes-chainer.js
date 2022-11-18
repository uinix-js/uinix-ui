export const hasKeyframesChainer = ($element) => {
  const animationName = window
    .getComputedStyle($element[0])
    .getPropertyValue('animation-name');
  let hasKeyframes = false;
  for (const styleSheet of document.styleSheets) {
    for (const cssRule of styleSheet.cssRules) {
      if (cssRule.name === animationName) {
        hasKeyframes = true;
        break;
      }
    }
  }

  expect(hasKeyframes).to.equal(true);
};
