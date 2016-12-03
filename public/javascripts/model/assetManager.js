class AssetManager {
   var assets = [
    {name: "back"}
  ];



  // var Asset = {
  //   assets = [
  //       {type: "image", name: "back", src:"../images/back.png"}
  //   ];
  // };
  //
  // AssetManager {
  // }
  // //アセットの定義
  // // var Asset.assets = [
  // //     {type: "image", name: "back", src:"../images/back.png"}
  // // ];
  //
  // //読み込んだ画像
  // var Asset.images = {};
  //
  // //アセットの読み込み
  // loadAssets(onComplete) {
  //     var total = Asset.assets.length;    //アセットの合計数
  //     var loadCount = 0;  //読み込みが完了したアセット数
  //
  //     //アセットが読み込み終わった時に呼ばれるコールバック関数
  //     var onLoad = function() {
  //         loadCount++;    //読み込み完了数を1つ足すKr
  //         if(loadCount >= total){
  //             //全てのアセットの読み込みが終わった
  //             onComplete();
  //         }
  //     };
  //
  //     //全てアセットを読み込み
  //     Asset.assets.forEach(function(asset) {
  //        switch(asset.type) {
  //            case "image":
  //                Asset._loadImage(asset, onLoad);
  //                break;
  //            default:
  //                break;
  //        }
  //     });
  // };
  //
  // //画像の読み込み
  // _loadImage(asset, onLoad) {
  //     var image = new Image();
  //     image.src = asset.src;
  //     image.onload = onLoad;
  //     Asset.images[asset.name] = image;
  // };
}
