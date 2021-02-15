import mainlevbuild from '../assets/spritesheets/RF_Catacombs_v1.0/mainlevbuild.png';

import candleA_01 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_01.png';
import candleA_02 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_02.png';
import candleA_03 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_03.png';
import candleA_04 from '../assets/spritesheets/RF_Catacombs_v1.0/candleA_04.png';

import missing_256 from '../assets/textures/missing_256.png';
import bricks from '../assets/textures/bricks.png';
import image from '../assets/textures/grass.png';
import wood from '../assets/textures/wood.png';

export default {
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
    'missing': {
        imagePath: missing_256,
        spriteAtlas: [ { x: 0, y: 0, width: 256, height: 256 } ]
    },
    'bricks': {
        imagePath: bricks,
        spriteAtlas: [ { x: 0, y: 0, width: 256, height: 256 } ],
    },
    'grass': {
        imagePath: image,
        spriteAtlas: [ { x: 0, y: 0, width: 256, height: 256 } ],
    },
    'wood': {
        imagePath: wood,
        spriteAtlas: [ { x: 0, y: 0, width: 256, height: 256 } ],
    },
};