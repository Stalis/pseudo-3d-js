import { World } from "ecsy";
import { Camera, GameMap, MapCell, Moving, Player, Position, ResourceVault, TextureBox, Rotation, Actor, Character, PlayerCharacter } from "./components";
import { KeyboardSystem, MovingSystem, RaycasterSystem, ActionSystem, PartyUISystem } from "./systems";
import { Matrix, Vector2 } from "./types";
import { Rect } from "../engine";

import missing_256 from '../../assets/textures/missing_256.png';
import bricks from '../../assets/textures/bricks.png';
import grass from '../../assets/textures/grass.png';
import wood from '../../assets/textures/wood.png';

import move_buttons from "../../assets/ui/move_buttons.png";
import portraits from "../../assets/ui/portraits.png";

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

const screen_w = 800;
const screen_h = 600;

const panel_h = screen_h / 5;

async function load_textures_atlas(query: Record<string, { imagePath: string, sprites: Record<string, Rect>}>) {    
    let res: object = Object.create(query);

    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            const element = query[key];
            let img = await load_image(element.imagePath);

            let keys = Object.keys(element.sprites);

            let atlas: Record<string, ImageBitmap> = {};
            for (let i = 0; i < keys.length; i++) {
                let bitmap = await load_texture_part(img, element.sprites[keys[i]]);
                atlas[keys[i]] = bitmap;
            }

            res[key] = atlas;
        }
    }

    return res;
}

async function load_texture_part(img: HTMLImageElement, area: Rect) {
    return await createImageBitmap(img, area.x, area.y, area.width, area.height);
}

async function load_textures_dict(query: Record<string, string>) {
    let keys = Object.keys(query);
    let values = Object.values(query);

    let tex = await load_textures(values);

    let res: Record<string, ImageBitmap> = {};
    for (let i = 0; i < keys.length && i < tex.length; i++) {
        res[keys[i]] = tex[i];
    }

    return res;
}

async function load_textures(paths: string[]) {
    return Promise.all(paths.map(load_image).map(v => v.then(createImageBitmap)));
}

async function load_image(imagePath: string): Promise<HTMLImageElement> {
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

    let ui_textures = await load_textures_atlas({
        move_buttons: {
            imagePath: move_buttons,
            sprites: {
                turn_left:  { x: 0,   y: 0,  width: 64, height: 64 },
                forward:    { x: 64,  y: 0,  width: 64, height: 64 },
                turn_right: { x: 128, y: 0,  width: 64, height: 64 },
                left:       { x: 0,   y: 64, width: 64, height: 64 },
                backward:   { x: 64,  y: 64, width: 64, height: 64 },
                right:      { x: 128, y: 64, width: 64, height: 64 },
            }
        },
        portraits: {
            imagePath: portraits,
            sprites: {
                '1':  { x: 0,   y: 0,   width: 128, height: 198 },
                '2':  { x: 128, y: 0,   width: 128, height: 198 },
                '3':  { x: 256, y: 0,   width: 128, height: 198 },
                '4':  { x: 384, y: 0,   width: 128, height: 198 },
                '5':  { x: 512, y: 0,   width: 128, height: 198 },
                '6':  { x: 0,   y: 198, width: 128, height: 198 },
                '7':  { x: 128, y: 198, width: 128, height: 198 },
                '8':  { x: 256, y: 198, width: 128, height: 198 },
                '9':  { x: 384, y: 198, width: 128, height: 198 },
                '10': { x: 512, y: 198, width: 128, height: 198 },
            }
        },
    });

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
        .registerComponent(Actor)
        .registerComponent(PlayerCharacter)
        .registerComponent(Character)
        .registerSystem(KeyboardSystem)
        .registerSystem(ActionSystem)
        .registerSystem(MovingSystem)
        .registerSystem(RaycasterSystem, { 
            canvas_id: canvas.id,
            screen_w: screen_w,
            screen_h: screen_h,
            ray_depth_step: 1,
            vertical_offset: panel_h / 2,
        })
        .registerSystem(PartyUISystem, {
            canvas_id: 'party_ui',
            screen_w: screen_w,
            screen_h: screen_h,
            panel_h: panel_h,
            textures: ui_textures,
        });

    let resources = world.createEntity("resources")
        .addComponent(ResourceVault, { textures: textures });

    let map = world.createEntity("map")
        .addComponent(GameMap, { 
            cell_size: cell_size,
            cells: new Matrix<number>().set(TestMap)
        });

    let player = world.createEntity("player")
        .addComponent(Player)
        .addComponent(Position, { value: new Vector2(5, 7).mul(cell_size) })
        .addComponent(Rotation, { value: 90 })
        .addComponent(Moving)
        .addComponent(Actor, { actionPoints: 1024 })
        .addComponent(Character)
        .addComponent(Camera, { 
            pov: 60, 
            drawDistance: 16 * cell_size,
        });
    
    let char1 = world.createEntity("character1")
        .addComponent(PlayerCharacter)
        .addComponent(Character, { portrait: '1', hp: Math.random() * 100, mp: Math.random() * 50 });
    
    let char2 = world.createEntity("character2")
        .addComponent(PlayerCharacter)
        .addComponent(Character, { portrait: '2', hp: Math.random() * 100, mp: Math.random() * 50 });

    let char3 = world.createEntity("character3")
        .addComponent(PlayerCharacter)
        .addComponent(Character, { portrait: '3', hp: Math.random() * 100, mp: Math.random() * 50 });

    let char4 = world.createEntity("character4")
        .addComponent(PlayerCharacter)
        .addComponent(Character, { portrait: '4', hp: Math.random() * 100, mp: Math.random() * 50 });

    return world;
}