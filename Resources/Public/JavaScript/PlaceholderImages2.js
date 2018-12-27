function loadImages(images) {
    // each image will be loaded by this function.
    // it returns a Promise that will resolve once
    // the image has finished loading
    let loader = function (src) {
        return new Promise(function (resolve, reject) {
            let img = new Image();
            img.onload = function () {
                // resolve the promise with our url so it is
                // returned in the result of Promise.all
                resolve(src);
            };
            img.onerror = function (err) {
                reject(err);
            };
            img.src = src;
        });
    };

    // create an image loader for each url
    let loaders = [];
    images.forEach(function (image) {
        loaders.push(loader(image));
    });

    // Promise.all will return a promise that will resolve once all of of our
    // image loader promises resolve
    return Promise.all(loaders);
}

$(function () {

    const $images = $('.placeholderimage');

    const screenSize = Foundation.MediaQuery.current;
    const sizes = ['small', 'medium', 'large', 'xlarge', 'xxlarge'];

    $images.each(function (i, img) {


        let imagePath = $(img).attr('data-placeholder-image-small');
        let screenSizeToLoad = 'small';

        // find the last greatest screen size to load
        for (let i = sizes.indexOf(screenSize); i>=0; i=i-1) {
            console.log($(img).attr('data-placeholder-image-' + sizes[i]));
            if($(img).attr('data-placeholder-image-' + sizes[i])){
                imagePath = $(img).attr('data-placeholder-image-' + sizes[i]);
                screenSizeToLoad = sizes[i];
                break;
            }
        }

        loadImages([imagePath]).then(function () {
            $(img).addClass(screenSizeToLoad);
            $(img).addClass('loaded');
        });

    });


    // load the images and start cycling through them after they are loaded
    /*
    loadImages(myImages).then(cycleImages).catch(function (err) {
        console.error(err);
    });
    */
});
