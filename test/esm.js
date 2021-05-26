import test from 'tape';

test('runs as ESM', (t) => {
  t.doesNotThrow(async () => {
    await import('../index.js'); // eslint-disable-line node/no-unsupported-features/es-syntax
  }, 'should not throw');
  t.end();
});
