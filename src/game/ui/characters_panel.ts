import { Point } from "../../engine";
import { Character } from "../components";
import { CharacterCard } from "./character_card";
import { UIElement, UIElementAttributes } from "./ui_element";

export type CharacterPanelAttributes = UIElementAttributes & {
    portraits: Record<string, ImageBitmap>,
    characters_count: number;
    card_width: number;
    spacing: number;
};

export class CharactersPanel extends UIElement {
    model: Array<Character>;

    constructor(attr: Partial<CharacterPanelAttributes>) {
        super(attr);

        this.model = [];
        let characters_count = attr.characters_count ?? 4;

        const spacing = attr.spacing ?? (this.width / 24);
        const card_width = attr.card_width ?? ((this.width - ((characters_count - 1) * spacing)) / characters_count);

        for (let i = 0; i < characters_count; i++) {
            this.addChild(new CharacterCard({
                x: i * (card_width + spacing), y: 0,
                width: card_width, height: this.height,
                model: null,
                portraits: attr.portraits,
            }));
        }
    }

    update(model: Character[]) {
        let iter = 0;
        for (const item of this.children) {
            if (item instanceof CharacterCard) {
                item.update(model[iter]);
                iter++;
            }
        }
    }

    drawOwn(ctx: CanvasRenderingContext2D, anchor: Point): void {
        return;
    }
}