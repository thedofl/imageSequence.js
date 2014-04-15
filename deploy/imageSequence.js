/*
 * ImageSequence v0.1
 * Copyright (c) 2014 Dofl Yun, thedofl.com
 * MIT License [http://www.opensource.org/licenses/mit-license.php]




 //    TODO
 //    Used Interval for now but
 //    Change to use 'requestanimationframe' later ????





 // Init instance of DImageSequence
 var imgTagID = "seqHolder"; // <img> tag id to display sequence images
 var imgFilePath = "assets/seq/jpeg/male_with_alpha_x.jpg"; // image number starts from '0'
 var imgTotal = 100; // total image number.
 var fps = 60;

 mAni = new DImageSequence(imgTagID, imgFilePath, imgTotal, fps);


 // Load Sequence images
 var autoPlay = true; // If set 'false' then call 'play()' manually
 mAni.loadSeq(onSequenceIsReady, onFinishedLoadSeq, onUpdateLoadSeq, autoPlay);


 // Control animation
 mAni.play();
 mAni.pause();
 mAni.stop();
 mAni.gotoAndPlay(10);
 mAni.gotoAndStop(10);



 // Kill DImageSequence
 mAni.dispose();
 delete mAni;


 */




var ImageSequence = function(inImgTagID, inImageFilePath, inImageTotal, inFrameRate)
{
    this.imgTagID = inImgTagID;
    this.$imgTag = $('#' + this.imgTagID);

    var imageFilePath = inImageFilePath.split(".");
    this.imageFileName = imageFilePath[0].split("x")[0];
    this.imageFileFormat = imageFilePath[1];
    this.imageTotal = inImageTotal;
    this.frameRate = typeof inFrameRate !== 'undefined' ? inFrameRate : 24;



    this.$dummyTag;

    this.prerenderedImageID = this.imgTagID;
    this.imageW, this.imageH;
    this.timer;
    this.currentNum = 0;

    this.isFirstLoop = true;
    this.isAnimationOn = false;





    // Play properties
    this.autoAplay = true;
    this.autoLoop = true;



    // Event Callbacks
    this.sequenceIsReadyFunc = $.noop;
    this.finishedLoadFunc = $.noop;
    this.updateLoadFunc = $.noop;
    //this.finishedAnimationFunc = $.noop;


};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// PUBLIC METHODS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

ImageSequence.prototype.loadSeq = function()
{

    // Generate Tag
    var dummyTagId = this.imgTagID + "-dummy";
    var dummyTag = '<div id="' + dummyTagId + '" ></div>';
    $('body').append(dummyTag);
    this.$dummyTag = $('#' + dummyTagId);
    this.$dummyTag.css({"position":"absolute", "visibility":"hidden", "top":"-9000px"});



    // Generate Image Loader tag
    var imgLoaderTagID = this.imgTagID + "_loader";
    var imgLoaderTag = '<div id="' + imgLoaderTagID + '" ></div>';
    this.$dummyTag.append(imgLoaderTag);

    this.$imgLoader = $('#' + imgLoaderTagID);
    this.$imgLoader.css({"position":"absolute", "visibility":"hidden", "top":"-9000px"});


    var id;
    for(var i = 0; i< this.imageTotal; i++)
    {
        var imgPath = this.imageFileName + i + "." +this.imageFileFormat;
        id = this.prerenderedImageID + i;
        this.$imgLoader.append('<img src=' + imgPath + ' id=' + id + ' style="position:absolute;">');

    }

    psyImageLoader.loadByContainer( this.$imgLoader, $.proxy(this.onLoadedSequence, this),$.proxy(this.onUpdateLoadSequence, this));


};



ImageSequence.prototype.play = function()
{
    if(this.isAnimationOn) return;
    this.loop();


    this.isAnimationOn = true;
//
    var self = this;
    this.timer = setInterval( function ()
    {
        self.loop();

    }, 1000 / this.frameRate );

};

ImageSequence.prototype.pause = function()
{
    if(!this.isAnimationOn) return;


    this.isAnimationOn = false;


    if(!this.timer) return;
    clearInterval( this.timer );
}
ImageSequence.prototype.stop = function()
{
    if(!this.isAnimationOn) return;

    this.pause();
    this.currentNum = 0;
};


ImageSequence.prototype.nextFrame = function()
{
    this.currentNum++;
    if(this.currentNum >= this.imageTotal) this.currentNum = this.imageTotal;

    this.drawCurrentFrame();
};

ImageSequence.prototype.prevFrame = function()
{
    this.currentNum--;
    if(this.currentNum < 0) this.currentNum = 0;

    this.drawCurrentFrame();
};


ImageSequence.prototype.gotoAndPlay = function(inNum)
{

    this.pause();

    this.currentNum = inNum;
    this.play();
}

ImageSequence.prototype.gotoAndStop = function(inNum)
{
    this.pause();

    this.currentNum = inNum;
    this.drawCurrentFrame();


}



ImageSequence.prototype.getCurrentFrameNum = function()
{
    return this.currentNum;
}


/* ---------------------------------------------------------------------------------
 *
 * DISPOSE
 *
 --------------------------------------------------------------------------------- */
ImageSequence.prototype.dispose = function(inRemoveImgTag)
{
    this.pause();


    this.$imgLoader.remove();
    this.$dummyTag.remove();

    if(inRemoveImgTag)
        this.$imgTag.remove();

};






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// PRIVATE METHODS
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


ImageSequence.prototype.onUpdateLoadSequence = function(inLoadedImages, inTotalImages)
{
    this.updateLoadFunc(inLoadedImages, inTotalImages);

};

ImageSequence.prototype.onLoadedSequence = function()
{


    // Call finished callback
    this.finishedLoadFunc();


    // Check Image Size
    var dummyImgTag = document.getElementById(this.prerenderedImageID + 0);
    this.imageW = dummyImgTag.clientWidth;
    this.imageH = dummyImgTag.clientHeight;




    var self = this;
    setTimeout(function(){

            if(self.autoAplay)
                self.play();

            //self.setImageTagSize();
            self.sequenceIsReadyFunc(); // Call ready callback


    },10);


};


/*
ImageSequence.prototype.setImageTagSize = function()
{
    $(this.$imgTag).attr({
        width: this.imageW + "px",
        height: this.imageH + "px"
    });
}
*/


/* ---------------------------------------------------------------------------------
 *
 * LOOP ANIMATION
 *
 --------------------------------------------------------------------------------- */
ImageSequence.prototype.loop = function()
{

    this.drawCurrentFrame();


    this.currentNum++;
    if(this.currentNum >= this.imageTotal)
    {
        if(this.autoLoop) this.currentNum = 0;
        else this.pause();



        // TODO - check if still need or set first time
        // Set 'Display' as 'none' to get better performance
        // It makes slow animation if set first time so handle end of animation
        if(this.isFirstLoop)
        {
            this.isFirstLoop = false;
            this.$imgLoader.css({"display": "none"});
            this.$dummyTag.css({"display": "none"});
        }
    }





};

ImageSequence.prototype.drawCurrentFrame = function()
{
    var src = this.imageFileName + this.currentNum + "." +this.imageFileFormat;
    $(this.$imgTag).attr("src", src);

};



//
//
// IMAGE LOADER
//
//

var psyImageLoader = psyImageLoader || ( function () {
    function loadByContainer($obj, finishedFunc, eachFunc){
        var lists = [];
        var totalUnloadedImages = 0;
        var completedImages;

        finishedFunc = finishedFunc || $.noop;
        eachFunc = eachFunc || $.noop;

        $obj.find('*').each(function(i){
            var url;
            if($(this).attr('src') && this.nodeName == "IMG"){
                url = $(this).attr('src');
            }else if($(this).css('backgroundImage')){
                url = $(this).css('backgroundImage');
            }
            if(url && url != 'none'){
                url = url.replace('url(', '');
                url = url.replace(')', '');
                url = url.replace(/"/g, '');
                lists[totalUnloadedImages++] = url;
            }
        });

        if(totalUnloadedImages == 0){
            eachFunc(1, 1);
            finishedFunc();
            return;
        }
        var date = new Date();
        var loaderID = date.getTime();
        $obj.attr('loaderID', loaderID);
        completedImages = totalUnloadedImages;
        function loadCompletedHandler(){
            completedImages--;
            eachFunc(totalUnloadedImages - completedImages, totalUnloadedImages);
            if(completedImages == 0){
                $obj.removeAttr('loaderID');
                finishedFunc();
            }
        }
        for(var i=0; i<totalUnloadedImages; i++){
            var $img = $('<img src="' + lists[i] + '"></img>');
//	        psyTracer("lists[i]" + lists[i]);
            $img.bind('load', function(){
//	            psyTracer('load', $(this)[0].width, $(this).attr('src'));
                loadCompletedHandler();
            }).error(function(){
                    loadCompletedHandler();
                    console.log('error');
                    //psyTracer('error');
                });
        }
    }

    return {
        loadByContainer:loadByContainer
    }
} )();







