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
    let screenSize = Foundation.MediaQuery.current;
    const sizes = ['small', 'medium', 'large', 'xlarge', 'xxlarge'];
    const observerConfig = {
        root: null,
        rootMargin: "0px",
        threshold: [0]
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
            // show img tags
            if ($(img).hasClass('placeholderimage--tag')) {
                $(img).parent().addClass(screenSizeToLoad);
                $(img).parent().addClass('loaded');
                $(img).attr('src', imagePath);
            } else {
                // show background images
                $(img).addClass(screenSizeToLoad);
                $(img).addClass('loaded');
            }

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

        // add wrap for <img> tags
        if ($(img).hasClass('placeholderimage--tag')) {
            $(img).wrap('<span class="placeholderimage placeholderimage--span"  id="' + $(img).attr('id') + '"></span>');
        }
        // if observer function not available load images directly
        if (IntersectionObserver) {
            observer.observe(img);
        } else {
            loadAndDisplayImage(img);
        }
    });

    $(window).off('resize.zf.mediaquery').on('resize.zf.mediaquery', () => {

        if (screenSize === Foundation.MediaQuery._getCurrentSize()) return;

        screenSize = Foundation.MediaQuery._getCurrentSize();

        $('.placeholderimage.loaded').each(function (i, img) {
            $(img).removeClass('loaded small medium large xlarge xxlarge');

            if ($(img).hasClass('placeholderimage--span')) {
                img = $(img).find('img');
            }
            loadAndDisplayImage(img);
        });

    });

});
