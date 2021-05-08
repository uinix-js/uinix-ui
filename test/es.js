import test from 'tape';

// Skipped because dependencies are still using faux-ESM.
test.skip('runs as es', (t) => {
  t.doesNotThrow(async () => {
    await import('../index.js'); // eslint-disable-line node/no-unsupported-features/es-syntax
  }, 'should not throw');
  t.end();
});
