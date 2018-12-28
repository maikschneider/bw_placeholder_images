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
    const observerConfig = {
        root: null,
        rootMargin: "0px",
        threshold: [0.5]
    };


    function loadAndDisplayImage(img) {

        let imagePath = $(img).attr('data-placeholder-image-small');
        let screenSizeToLoad = 'small';

        // find the last greatest screen size to load
        for (let i = sizes.indexOf(screenSize); i >= 0; i = i - 1) {
            if ($(img).attr('data-placeholder-image-' + sizes[i])) {
                imagePath = $(img).attr('data-placeholder-image-' + sizes[i]);
                screenSizeToLoad = sizes[i];
                break;
            }
        }

        loadImages([imagePath]).then(function () {
            $(img).addClass(screenSizeToLoad);
            $(img).addClass('loaded');
        });
    }

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);

                loadAndDisplayImage(entry.target);
            }
        });

    }, observerConfig);

    // bind images
    $images.each(function (i, img) {
        // if observer function not available load images directly
        if (IntersectionObserver) {
            observer.observe(img);
        } else {
            loadAndDisplayImage(img);
        }
    });

});
