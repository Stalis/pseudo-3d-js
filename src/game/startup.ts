import { World } from "ecsy";
import { Camera, GameMap, MapCell, Moving, Player, Position, ResourceVault, TextureBox, Rotation } from "./components";
import { KeyboardSystem, MovingSystem, RaycasterSystem } from "./systems";
import { Matrix, Vector2 } from "./types";

import missing_256 from '../../assets/textures/missing_256.png';
import bricks from '../../assets/textures/bricks.png';
import grass from '../../assets/textures/grass.png';
import wood from '../../assets/textures/wood.png';

const TestMap = [
    [0, 4, 1, 2, 3, 0, 3, 2, 1, 4],
    [0, 1, 0, 0, 0, 2, 0, 0, 0, 1],
    [0, 4, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 4, 0, 0, 0, 2, 0, 0, 0, 4],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 4, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 4, 0, 0, 3, 0, 3, 0, 0, 4],
    [0, 1, 0, 0, 3, 0, 3, 0, 0, 1],
    [0, 4, 0, 0, 3, 0, 3, 0, 0, 4],
    [0, 1, 0, 0, 3, 0, 3, 0, 0, 1],
    [0, 4, 0, 0, 3, 0, 3, 0, 0, 4],
    [0, 1, 0, 0, 3, 0, 3, 0, 0, 1],
    [0, 4, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 4, 1, 2, 2, 2, 2, 2, 1, 4],
];

const cell_size = 256;

async function load_textures(paths: string[]) {
    return Promise.all(paths.map(loadImage).map(v => v.then(createImageBitmap)));
}

async function loadImage(imagePath: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        var img = new Image();
        img.onload = () => {
            resolve(img);
        }
        img.src = imagePath;
    });
}

export async function Startup(world: World, canvas: HTMLCanvasElement) {
    let textures = await load_textures([ missing_256, bricks, grass, wood ]);

    world
        .registerComponent(Player)
        .registerComponent(Position)
        .registerComponent(Rotation)
        .registerComponent(Camera)
        .registerComponent(ResourceVault)
        .registerComponent(GameMap)
        .registerComponent(MapCell)
        .registerComponent(TextureBox)
        .registerComponent(Moving)
        .registerSystem(KeyboardSystem)
        .registerSystem(MovingSystem)
        .registerSystem(RaycasterSystem, { 
            canvas_id: canvas.id,
            screen_w: 800,
            screen_h: 600,
            ray_depth_step: 1,
        });

    let resorces = world.createEntity("resources")
        .addComponent(ResourceVault, { textures: textures });

    let map = world.createEntity("map")
        .addComponent(GameMap, { 
            cell_size: cell_size,
            cells: new Matrix<number>().set(TestMap)
        });

    let player = world.createEntity("player")
        .addComponent(Player)
        .addComponent(Position, { value: new Vector2().set(5, 7).mul(cell_size) })
        .addComponent(Rotation, { value: 90 })
        .addComponent(Moving)
        .addComponent(Camera, { 
            pov: 60, 
            drawDistance: 16 * cell_size,
        });

    return world;
}