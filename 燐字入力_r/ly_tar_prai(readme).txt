１　安裝法　How to install　インストール方法　

下載「中州韻輸入法引擎」于 http://rime.im。安裝之，而複製三 .yaml 檔案（paige.schema、paige.dict、default.custom）於資料夾。

Download “Rime IME” from http://rime.im. Install it, then copy three .yaml files (paige.schema, paige.dict, default.custom) to the settings folder.

「中州韻輸入法引擎」を http://rime.im からダウンロードしてインストールしたのち，設定フォルダへ３つの .yaml ファイル（paige.schema、paige.dict、default.custom）をコピーしてください。

*資料夾在　settings folder is at　設定フォルダの場所は
(Mac) ~/Library/Rime
(Windows) %APPDATA%\Rime
(Linux) ~/.config/ibus/rime


２　開始使用法　How to start　使用開始方法

按 Ctrl+` 換輸入法，按 Ctrl+Shift+` 重新部署。

Enter Ctrl+` to choose the imput method. Enter Ctrl+Shift+` to deploy the data if it is the first time or after an update.

「Ctrl+`」で入力方式を選択し，「Ctrl+Shift+`」でデータを更新します（初回および更新時のみ）。ただし，日本語キーボードに於いては「`」キーそのものの入力にシフトキーが必須なため，入力方式を選択することができません。解決法は現在不明ですが，default.custom.yaml を書き換えることによって姑息的に方式を変えることができます。
なお，WindowsとLinuxではF4キーで「Ctrl+`」の代わりをすることが可能です。


３　輸入法　How to input　入力法　

入力後の候補選択は数字キーまたは上下キーでおこない，スペースキーで確定します。リターン（エンター）キーは入力したキー（≠拼音）をそのまま出力します。シフト＋エンターキーで入力中の拼音をそのまま出力します。

（例）
prai＋スペースキー→我
prai＋リターンキー→prai
prai→シフトキー＋エンターキー→prai

声調は，母音の前にrを置いて変声，主母音の後にrを置いて平声となります。



