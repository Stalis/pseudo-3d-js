class ImageLoader {
    constructor() {
        this.images = {};
    }

    loadImage(key, path) {
        return new Promise(resolve => {
            var res = new Image();
            res.src = path;
            
            res.onload = () => {
                resolve(res);
            };
        }).then(img => {
            this.images[key] = img
        });
    }
}

module.exports = ImageLoader;