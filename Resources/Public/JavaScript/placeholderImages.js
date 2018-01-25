$(document).ready(function(){

    /* Without observer Feature display all images */
    if (!IntersectionObserver) {
        PlaceholderImages.cancel('No IntersectionObserver feature');
        return;
    }

    PlaceholderImages.init();

});


var PlaceholderImages = {

    observer: null,

    observerConfig: {
        root: null,
        rootMargin: "0px",
        threshold: [0.8]
    },


    cancel: function(reason){

        console.warn('PlaceholderImages.cancel()', reason);

        $('[data-lazy-interchange]').each(function(image){
            $(this).attr('data-interchange', $(this).attr('data-lazy-interchange'));
        });
    },


    init: function(){

        var self = this;

        // check for availability of Foundation Framework
        if(typeof Foundation === 'undefined' || typeof Foundation.Interchange === 'undefined') {
            self.cancel('Foundation not loaded');
            return;
        }

        // create the binding function factory for lazy images
        self.createObserverObj();

        // bind lazy images to observer
        $('[data-lazy-interchange]').each(function(image){
            self.observer.observe(this);
        });

    },

    createObserverObj: function(){

        var self = this;

        // to avoid reflow for every image, wait some time
        var timeoutBeforeReflow = false;

        self.observer = new IntersectionObserver(function(entries) {

            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    self.observer.unobserve(entry.target);
                    var dataInterchangeAttr = entry.target.getAttribute('data-lazy-interchange');
                    entry.target.setAttribute('data-interchange', dataInterchangeAttr);

                    if(!timeoutBeforeReflow){

                        setTimeout(function(){
                            $(document).foundation();
                            timeoutBeforeReflow = false;
                        }, 100);
                    }
                    timeoutBeforeReflow = true;

                }
            });
        }, self.observerConfig);

    }


}
