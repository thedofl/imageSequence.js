ImageSequence.js
==================

Simple but powerful Image Sequence Engine. This would provides self-image loading handler and the most thinkable animation controls.


Setup
---------------

### 1. Setup an instance of image sequence sprite

```javascript
var imgTagID = "aniHolder1";
var imgFilePath = "images/sample1_x.jpg"; // image number counts from '0'
var imgTotal = 60;
var frameRate = 30;

var mAni = new ImageSequence(imgTagID, imgFilePath, imgTotal, frameRate);
```

### 2. Setup Event Callbacks

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

### 3. Load image sequences and play

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

Properties
-----------------
```javascript
// Frame Rate
.frameRate
.currentNum

```

Animation Control
-----------------

```javascript
// Play
.play();
// Pause
.pause();
// Pause and move to 1st frame
.stop();
// Seek to a certain frame and keep playing
.gotoAndPlay(10);
// Seek to a certain frame and pause
.gotoAndStop(10);
// Seek to next frame
.nextFrame();
// Seek to previous frame
.prevFrame();
```



Kill image sequence instance
-----------------
 
```javascript
mAni.dispose();
delete mAni;
```


Quick Usage
-----------
Here is a simple code to use quickly. 
```javascript
var imgTagID = "aniHolder1";
var imgFilePath = "images/sample1_x.jpg";
var imgTotal = 60;
var frameRate = 30;
var mAni = new ImageSequence(imgTagID, imgFilePath, imgTotal, frameRate);
mAni.loadSeq();
```



Author
---------------
Dofl Y.H. Yun | www.thedofl.com | thedofl@thedofl.com



License
---------------
License under MIT.
