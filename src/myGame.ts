import { Game, GameOptions, SpriteLoader } from "./engine/engine";
import { CanvasRender } from "./engine/render/render";
import { Size, Color, Path, Sprite, Point } from "./engine/render/components/components";

import Colors from "./colors";
import { AnimatedSprite } from "./animatedSprite";

import mainlevbuild from '../assets/spritesheets/RF_Catacombs_v1.0/mainlevbuild.png';

import candleA_01 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_01.png';
import candleA_02 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_02.png';
import candleA_03 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_03.png';
import candleA_04 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_04.png';

export default class MyGame extends Game {
    images: Record<string, ImageBitmap> = {};
    sprites: Record<string, Sprite[]> = {};
    candleA: AnimatedSprite;
    candleB: AnimatedSprite;
    playerPosition: Point = { x: 0, y: 0};

    async onload() {
        await this.loadSprites();
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
    
        var sprite = this.sprites['mainlevbuild'][0];
        render.drawSprite(sprite, 15, 15);

        render.drawSprite(this.candleA.next, 150 + this.playerPosition.x, 155 + this.playerPosition.y);
    }

    async loadSprites() {
        const spriteLoader = new SpriteLoader();
        this.sprites = await spriteLoader.loadSprites({
            'mainlevbuild': {
                imagePath: mainlevbuild,
                spriteAtlas: [ { x: 0, y: 0, width: 1024, height: 640 } ],
            },
            'candleA_01': {
                imagePath: candleA_01,
                spriteAtlas: [ { x: 0, y: -2, width: 7, height: 16 } ],
            },
            'candleA_02': {
                imagePath: candleA_02,
                spriteAtlas: [ { x: 0, y: -1, width: 7, height: 16 } ],
            },
            'candleA_03': {
                imagePath: candleA_03,
                spriteAtlas: [ { x: 0, y: 0, width: 7, height: 16 } ],
            },
            'candleA_04': {
                imagePath: candleA_04,
                spriteAtlas: [ { x: 0, y: -2, width: 7, height: 16 } ],
            },
        })

        this.candleA = new AnimatedSprite([
            this.sprites['candleA_01'][0],
            this.sprites['candleA_02'][0],
            this.sprites['candleA_03'][0],
            this.sprites['candleA_04'][0],
        ]);
    }

    onkeydown(event: KeyboardEvent) {
        const keyName = event.key;

        if (keyName === 'w') {
            this.playerPosition.y -= 5;
        } else if (keyName === 's') {
            this.playerPosition.y += 5;
        } else if (keyName === 'a') {
            this.playerPosition.x -= 5;
        } else if (keyName === 'd') {
            this.playerPosition.x += 5;
        }
    }
}