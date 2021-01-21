import { Game, GameOptions } from "./engine/engine";
import { CanvasRender } from "./engine/render/render";
import { Size, Color, Path, Sprite, Point } from "./engine/render/components/components";

import Colors from "./colors";
import { AnimatedSprite } from "./animatedSprite";

import mainlevbuild from '../assets/spritesheets/RF_Catacombs_v1.0/mainlevbuild.png';

import candleA_01 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_01.png';
import candleA_02 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_02.png';
import candleA_03 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_03.png';
import candleA_04 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_04.png';
import { Rect } from "./engine/render/components/rect";


export default class MyGame extends Game {
    images: Record<string, ImageBitmap> = {};
    candleA: AnimatedSprite;
    candleB: AnimatedSprite;

    async onload() {
        await Promise.all([
            this.loadImageBitmap(mainlevbuild, 0, 0, 1024, 640)
                .then(img => this.images['mainlevbuild'] = img),
            this.loadImageBitmap(candleA_01, 0, -2, 7, 16)
                .then(img => this.images['candleA_01'] = img),
            this.loadImageBitmap(candleA_02, 0, -1, 7, 16)
                .then(img => this.images['candleA_02'] = img),
            this.loadImageBitmap(candleA_03, 0, 0, 7, 16)
                .then(img => this.images['candleA_03'] = img),
            this.loadImageBitmap(candleA_04, 0, -2, 7, 16)
                .then(img => this.images['candleA_04'] = img),
        ]);
        this.candleA = new AnimatedSprite([
            new Sprite(this.images['candleA_01'], 0, 0, 7, 16),
            new Sprite(this.images['candleA_02'], 0, 0, 7, 16),
            new Sprite(this.images['candleA_03'], 0, 0, 7, 16),
            new Sprite(this.images['candleA_04'], 0, 0, 7, 16),
        ]);
    }

    ondraw(render: CanvasRender, dt: number) {
        render.drawClearRect({ x: 0, y: 0, width: this.options.width, height: this.options.height });
        let redRect = { width: 55, height: 50 };
        let blueRect = { width: 55, height: 50 };
    
        render.setFillColor(Colors.red);
        render.drawFilledRect({x: 10, y: 10}, redRect);
    
        render.setFillColor(new Color(0, 0, 200, 0.5));
        render.drawFilledRect({x:30, y:30}, blueRect)
    
        let triangle = new Path();
        triangle.addPoint(25, 25);
        triangle.addPoint(25, -25);
        render.drawFilledPath(175, 50, triangle);
    
        var sprite = new Sprite(this.images['mainlevbuild'], 0, 0, 256, 256);
        render.drawSprite(sprite, 15, 15);

        render.drawSprite(this.candleA.next, 150, 155);
    }

    loadImage(imagePath: string): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            var img = new Image();
            img.onload = () => {
                resolve(img);
            }
            img.src = imagePath;
        });
    }

    loadImageBitmap(imagePath: string, sx: number, sy: number, swidth: number, sheight: number): Promise<ImageBitmap> {
        return new Promise(resolve => {
            this.loadImage(imagePath)
            .then(img => {
                createImageBitmap(img, sx, sy, swidth, sheight)
                    .then(bitmap => {
                        resolve(bitmap);
                    });
            });
        });
    }
}