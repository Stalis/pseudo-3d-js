import { Rect, Sprite } from "./render/components";

export interface SpriteLoaderQuery {
    imagePath: string;
    spriteAtlas: Rect[];
}

export class SpriteLoader {
    loadSprites(query: Record<string, SpriteLoaderQuery>): Promise<Record<string, Sprite[]>> {
        let res: Promise<{key: string, sprites: Sprite[]}>[] = [];

        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                const element = query[key];
                res.push(new Promise(resolve => {
                    this.loadSpriteAtlas(element)
                        .then(arr => {
                            resolve({ 
                                key: key, 
                                sprites: arr.map(v => new Sprite(v, { width: v.width, height: v.height })) 
                            }); 
                        });
                }));
            }
        }

        return new Promise(resolve => {
            Promise.all(res)
                .then(list => {
                    let record: Record<string, Sprite[]> = {};

                    for (const item of list) {
                        record[item.key] = item.sprites;
                    }

                    resolve(record);
                })
        })
    }

    loadSpriteAtlas(query: SpriteLoaderQuery): Promise<ImageBitmap[]> {
        return new Promise(resolve => {
            this.loadImage(query.imagePath)
                .then(img => {
                    Promise.all(
                        query.spriteAtlas
                            .map(v => createImageBitmap(img, v.x, v.y, v.width, v.height))    
                    ).then(resolve);
                });
        })
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
}