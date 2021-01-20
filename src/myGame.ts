import { Game, GameOptions } from "./engine/engine";
import { CanvasRender } from "./engine/render/render";
import { Size, Color, Path, Sprite } from "./engine/render/components/components";

import Colors from "./colors";
import { AnimatedSprite } from "./animatedSprite";

import mainlevbuild from '../assets/spritesheets/RF_Catacombs_v1.0/mainlevbuild.png';

import candleA_01 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_01.png';
import candleA_02 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_02.png';
import candleA_03 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_03.png';
import candleA_04 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_04.png';


export default class MyGame extends Game {
    images: Record<string, HTMLImageElement> = {};
    candleA: AnimatedSprite;
    candleB: AnimatedSprite;

    onload() {
        return Promise.all([
            this.loadImage('mainlevbuild', mainlevbuild),
            this.loadImage('candleA_01', candleA_01),
            this.loadImage('candleA_02', candleA_02),
            this.loadImage('candleA_03', candleA_03),
            this.loadImage('candleA_04', candleA_04),
        ]).then(_ => {
            this.candleA = new AnimatedSprite([
                new Sprite(this.images['candleA_01'], 0, 0, 7, 14),
                new Sprite(this.images['candleA_02'], 0, 1, 7, 14),
                new Sprite(this.images['candleA_03'], 0, 2, 7, 14),
                new Sprite(this.images['candleA_04'], 0, 0, 7, 14),
            ])
        });
    }

    ondraw(render: CanvasRender, dt: number) {
        render.drawClearRect(new Size(this.options.width, this.options.height), 0, 0);
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
    
        var sprite = new Sprite(this.images['mainlevbuild'], 0, 0, 256, 256);
        render.drawSprite(sprite, 15, 15);

        //render.drawClearRect(new Size(7, 16), 155, 155);
        render.drawSprite(this.candleA.next, 150, 155);
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