#imageSequence.js
================

Simple but powerful Image Sequence Engine.


Setup
---------------

### Setup a sequence sprite

```javascript
var imgTagID = "aniHolder1";
var imgFilePath = "images/sample1_x.jpg";
var imgTotal = 60;
var frameRate = 30;

var mAni = new ImageSequence(imgTagID, imgFilePath, imgTotal, frameRate);
```

### Setup Event Callbacks

```javascript 
mAni.updateLoadFunc = onUpdateLoadSeq;
mAni.finishedLoadFunc = onFinishedLoadSeq;
mAni.sequenceIsReadyFunc = onSequenceIsReady;

function onUpdateLoadSeq(inLoadedImages, inTotalImages)
{
  console.log(" -- loaded : " + inLoadedImages + " / " + inTotalImages);
}

function onFinishedLoadSeq()
{
  console.log(" -- onFinishedLoadSeq");
}

 function onSequenceIsReady()
 {
    console.log(" -- onSequenceIsReady");
 }
```

### Start to load image sequences

```javascript 
// As soon as loaded all seq, play automatically and loop as default
mAni.loadSeq();

// Or you can set autoplay,1st parameter, and autoLoop, manually
mAni.loadSeq(false, false);

// or you can set each parameter directly before calling loadSeq().
mAni.autoAplay = false;
mAni.autoLoop = false;
mAni.loadSeq();
```


### Control animation

```javascript
mAni.play();
mAni.pause();
mAni.stop();
mAni.gotoAndPlay(10);
mAni.gotoAndStop(10);
```



### Kill imageSequence instance
 
```javascript
mAni.dispose();
delete mAni;
```


Author
---------------
Dofl Y.H. Yun | www.thedofl.com | thedofl@thedofl.com



License
---------------
License under MIT.
