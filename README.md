# user-dashboard
ユーザーの情報を管理するダッシュボード
## Server
### 起動する前にすること
データベースの初期化
~~~
cd server
node init_db.js
~~~
### 起動方法
~~~
cd server
node index.js
~~~
あるいは
~~~
cd server
npm start
~~~
上はホットリロードなし、下はホットリロードあり
## Client
### 起動する前にすること
パッケージのインストール
~~~
cd user-dashboard-client
npm install
~~~
### 起動方法
~~~
cd user-dashboard-client
npm start
~~~
