// ctx.fillRect(x, y, width, height) - залитый прямоугольник
// ctx.clearRect(x, y, width, height) - прямоугольник цвета фона
// ctx.strokeRect(x, y, width, height) - прямоугольник, но не залитый(только рамка)

import MyGame from './myGame';

window.onload = _ => {
    const canvas = document.getElementById('screen');

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');

        let game = new MyGame(ctx);
        game.start();
    } else {
        console.error('Canvas does not supported');
    }
};