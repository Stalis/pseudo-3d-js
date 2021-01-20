// ctx.fillRect(x, y, width, height) - залитый прямоугольник
// ctx.clearRect(x, y, width, height) - прямоугольник цвета фона
// ctx.strokeRect(x, y, width, height) - прямоугольник, но не залитый(только рамка)
const CanvasRender = require('./render/canvasRender')
const Color = require('./render/components/color');
const Size = require('./render/components/size');
const Path = require('./render/components/path');
const Colors = require('./colors');
const Sprite = require('./render/components/sprite');
const ImageLoader = require('./imageLoader');

import decorative from '../assets/spritesheets/RF_Catacombs_v1.0/decorative.png';

function loadImage(imagePath) {
    return new Promise(resolve => {
        var res = new Image();
        res.src = imagePath;
        var loaded = false;
        res.onload = () => {
            resolve(res);
        };
    });
}

let images = new ImageLoader();

function load(onload) {
    images.loadImage('decorative', decorative)
        .then(onload);
}


function draw(render) {
    let redRect = new Size(55, 50);
    let blueRect = new Size(55, 50);

    render.setFillColor(Colors.red);
    render.drawFilledRect(redRect, 10, 10);

    render.setFillColor(new Color(0, 0, 200, 0.5));
    render.drawFilledRect(blueRect, 30, 30)

    let triangle = new Path();
    triangle.addPoint(25, 25);
    triangle.addPoint(25, -25);
    render.drawFilledPath(triangle, 175, 50);

    loadImage(decorative).then(img => {
        var sprite = new Sprite(img, 0, 0, 256, 256);
        render.drawSprite(sprite, 15, 15);
    });
}


//==================================================================

window.onload = _ => {
    var canvas = document.getElementById('screen');

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        let render = new CanvasRender(ctx);
        load(draw(render));
    } else {
        console.error('Canvas does not supported');
    }
};