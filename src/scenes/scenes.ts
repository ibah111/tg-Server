import { Markup, Scenes } from 'telegraf';

const testScene = new Scenes.BaseScene('test-scene');

testScene.enter((ctx) => {
  ctx.reply(
    'TEST SCENE ENTER',
    Markup.inlineKeyboard([
      Markup.button.callback('text1', 'data1'),
      Markup.button.callback('text2', 'data2'),
    ]),
  );
});
