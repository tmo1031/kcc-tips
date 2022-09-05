# kcc-tips
慶應義塾大学通信教育課程(慶應通信)学生向けのお役立ちツール

# 概要
Markdown記法で書かれたテキストファイルを慶應通信のレポート書式に変換するやり方をまとめる

# 準備する物
## レポート内容（下記はサンプル）
* 本文:	sample.txt
* 文献:	sample.bib

## 変換用ファイル群 (Githubに格納)
* 変換スクリプト:
  * makereport.sh
* 設定ファイル:
  * MyDefaults.yaml
  * crossref_config.yaml
* PDF/Word用のひな形:
  * default.latex
  * MyReference.docx
* 参考文献リスト用のスタイルファイル
  * harvard.csl
  * mla.csl
  * myjecon.bst 

## インストール必要なソフトウェア
* homebrew ※Macの場合
* tex (mactex)
* pandoc
* pandoc-crossref

# 手順概要
## PCに必要なソフトウェア(tex, pandoc, pandoc-crossref)をインストールする
## レポートをMarkdown記法で書く
## 対象ファイル(レポート)と変換用ファイル群を同じディレクトリに置き、「ターミナル」でその作業ディレクトリを開く
## 変換用の実行ファイルを実行する

# 手順詳細
## インストール方法 （所要時間2時間以上かかる見込み）
※Mac で Homebrew を使う方法
* Xcode (CommandLineTools for Xcode) のインストール
「ターミナル」で下記コマンドを実行
xcode-select --install
参考リンク: https://qiita.com/DaikiSuyama/items/5a2a96859b44595cba76

* Homebrew のインストール
https://brew.sh に書いてある下記コマンドを確認して、「ターミナル」にコピー＆貼り付け、実行
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

* tex (mactex)のインストール
「ターミナル」で下記コマンドを順番に実行
brew install --cask mactex
export PATH
sudo tlmgr update --self -all
参考リンク: https://blog.wtsnjp.com/2020/07/07/about-mactex/

* pandoc と pandoc-crossref のインストール
「ターミナル」で下記コマンドを実行
brew install pandoc pandoc-crossref

## レポートをMarkdown記法で書く
Markdown記法の参考リンク: https://qiita.com/kamorits/items/6f342da395ad57468ae3
特に見出し、引用、注釈をよく使う

## 変換用ファイル群をダウンロードする
以下のリンクをブラウザにコピー＆貼り付けしてダウンロード、Zipファイルを展開して「bin」フォルダの中身を確認
https://github.com/tmo1031/kcc-tips/archive/refs/heads/main.zip

## 対象ファイル(レポート)と変換用ファイル群を同じディレクトリに置き、「ターミナル」でその作業ディレクトリを開く
参考リンク: https://www.webdesignleaves.com/pr/plugins/mac_terminal_basics_01.html

## 変換用の実行ファイルを実行する
* 例1 PDF形式で出力する場合
makereport.sh sample.txt pdf
* 例2 Word形式で出力する場合
makereport.sh sample.txt docx