import test from 'tape';

test('runs as ESM', (t) => {
  t.doesNotThrow(async () => {
    await import('../index.js');
  }, 'should not throw');
  t.end();
});
