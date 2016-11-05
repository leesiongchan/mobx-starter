import test from 'ava';

import AppStore from '../AppStore';

test('AppStore', (t) => {
  const appStore = new AppStore();

  t.is(appStore.timer, 0);

  appStore.timer = 999;

  t.is(appStore.timer, 999);
});
