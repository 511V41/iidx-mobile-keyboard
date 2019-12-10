# IIDX Mobile keyboard

PCとスマホをUSBデバッグで繋げてPCのキーボードをIIDXコントローラにする実験。

詳細は[ブログ記事](https://511v41.github.io/2019/12/09/iidx)を。

バギーなので使わないほうが良いと思います。が、チャレンジングな人は以下の通りで実行できます。

## 使い方

config.jsonを書き換えてください。

x, yについては実際に弐寺モバイルを起動してターンテーブルと各鍵盤をタップする座標を手に入れて使ってください。開発者向けオプションから座標の表示ができるはずです。

keycodeについては環境によって変わります。デフォルトはMacのもの([参考](https://gist.github.com/eegrok/949034))で、キー配置は

- a: ターンテーブル
- z: 1鍵
- s: 2鍵
- x: 3鍵
- d: 4鍵
- c: 5鍵
- f: 6鍵
- v: 7鍵

となっています。

```sh
yarn
yarn start
```

すれば起動します。

Macだと使っているライブラリの `iohook` にバグがあるので僕の[ブログ記事](https://511v41.github.io/2019/12/10/iohook)を参考にして対応してください。

## 展望

[issue](https://github.com/511V41/iidx-mobile-keyboard)を見てください

## Licence

MIT
