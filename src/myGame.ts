import { Game } from "./engine/engine";
import { CanvasRender } from "./engine/render/render";
import { Size, Color, Path, Sprite } from "./engine/render/components/components";

import Colors from "./colors";

import decorative from '../assets/spritesheets/RF_Catacombs_v1.0/decorative.png';

export default class MyGame extends Game {
    images: Record<string, HTMLImageElement>;

    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
        this.images = {};
    }

    onload() {
        return Promise.all([
            this.loadImage('decorative', decorative),
        ]);
    }

    ondraw(render: CanvasRender) {
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
    
        var sprite = new Sprite(this.images['decorative'], 0, 0, 256, 256);
        render.drawSprite(sprite, 15, 15);
    }

    loadImage(key: string, imagePath: string) {
        return new Promise(resolve => {
            var res = new Image();
            res.src = imagePath;
            this.images[key] = res;
            
            res.onload = () => {
                resolve(res);
            };
        });
    }
}