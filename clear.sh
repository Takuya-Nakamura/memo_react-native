# watchmanのキャッシュを削除
watchman watch-del-all

# iosのビルドファイルを削除
rm -rf ios/build

# androidのビルドファイルを削除
rm -rf android/app/build

# node_modulesを削除
rm -rf node_modules

# Podsファイルを削除
rm -rf ios/Pods

# Xcodeのキャッシュを削除
rm -rf ~/Library/Developer/Xcode/DerivedData

# yarnをインストール
yarn install

# podをインストール
cd ios
pod install

