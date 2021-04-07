import test from 'tape';

// skipped because dependencies are still using faux-ESM.
test.skip('runs as es', (t) => {
  t.doesNotThrow(async () => {
    await import('../index.js');
  }, 'should not throw');
  t.end();
});
