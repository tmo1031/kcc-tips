# Readme
txt/md ファイルを慶應通信の指定形式レポートに変換する自動化スクリプト

## 使い方
1. Github上にこのリポジトリを複製する
2. Markdown 形式で文書を作って 複製後のリポジトリの　Documents(サブディレクトリも可) にpush する
3. PDF/Docx ファイルができる
4. ローカル環境に pull する

以下、リポジトリの複製の仕方についてchatGPTからの回答を転記

## リポジトリの複製

GitHub上でリポジトリを複製し、新しいリポジトリに格納する手順は以下の通りです。

1. GitHub上で新しいリポジトリを作成します。
2. ターミナルまたはコマンドプロンプトを開き、次のコマンドを入力します。
   
   ```
   git clone https://github.com/tmo1031/kcc-tips.git
   ```

   これにより、指定したリポジトリがローカルに複製されます。

3. ターミナルで次のコマンドを入力して、ローカルリポジトリのディレクトリに移動します。

   ```
   cd kcc-tips
   ```

4. 新しいリポジトリに関連付けるために、次のコマンドを入力します。

   ```
   git remote rename origin upstream
   ```

5. 新しいリポジトリのURLをコピーし、次のコマンドを入力して新しいリポジトリとローカルリポジトリを関連付けます。

   ```
   git remote add origin [新しいリポジトリのURL]
   ```

6. ローカルで変更を加え、新しいリポジトリにプッシュします。

   ```
   git push -u origin master
   ```

これで、指定したリポジトリが新しいリポジトリに複製され、変更が反映されます。
