import { Attributes, System } from "ecsy";
import { Player } from "../components";
import { Actor } from "../components/actor";
import { Action, ActionKind, Directions, Vector2 } from "../types";
import { Button, EventType, Panel, UIElement } from "../ui";

export class PartyUISystem extends System {
    static queries = {
        player: { components: [ Player, Actor ] }
    }

    canvas: HTMLCanvasElement;
    canvas_ctx: CanvasRenderingContext2D;
    screen_w: number;
    screen_h: number;
    panel_h: number;
    panel: UIElement;
    private mouseHandlers: Record<string, (ev: MouseEvent) => boolean>;

    init(attr: Attributes) {
        let canvasId = attr.canvas_id;
        if (!canvasId)
            throw new Error(`${PartyUISystem.name}: canvasId attribute is not available`);

        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!this.canvas)
            throw new Error(`${PartyUISystem.name}: can't find canvas '${canvasId}'`)

        this.canvas_ctx = this.canvas.getContext('2d');

        if (!!attr.screen_w) {
            this.canvas.width = attr.screen_w;
        }
        if (!!attr.screen_h) {
            this.canvas.height = attr.screen_h
        }

        this.screen_w = this.canvas.width;
        this.screen_h = this.canvas.height;

        if (!!attr.panel_h) {
            this.panel_h = attr.panel_h;
        } else {
            this.panel_h = this.screen_h / 5;
        }

        this.panel = this.createPanel(attr.textures);
        this.mouseHandlers = {
            'click': this.getMouseHandler(EventType.click),
            //'mousemove': this.getMouseHandler(EventType.move),
            //'mouseenter': this.getMouseHandler(EventType.hover),
            //'mouseleave': this.getMouseHandler(EventType.leave),
            //'mousedown': this.getMouseHandler(EventType.press),
            //'mouseup': this.getMouseHandler(EventType.unpress),
        };

        this.subscribeMouseEvents();
    }

    createPanel(textures?: Record<string, Record<string, ImageBitmap>>): UIElement {
        const panel_w = this.screen_w;
        const panel_h = this.screen_h / 5;

        const button_size = panel_h / 2;
        console.log(textures);
        let panel = new Panel({
            x: 0, y: this.screen_h - panel_h,
            width: panel_w, height: panel_w,
            fillStyle: 'slategray',
            children: [
                // Move forward button
                new Button({
                    x: panel_w - 2 * button_size, y: 0,
                    width: button_size, height: button_size,
                    fillStyle: 'dimgrey', strokeStyle: 'black',
                    texture: textures.move_buttons.forward,
                    hover: { fillStyle: 'yellow' }, pressed: { 'fillStyle': 'blue' },
                    onclick: this.actionHandler.bind(this, Action.createNew(ActionKind.walk, Directions.forward)),
                }),
                // Move backward button
                new Button({
                    x: panel_w - 2 * button_size, y: button_size,
                    width: button_size, height: button_size,
                    fillStyle: 'dimgrey', strokeStyle: 'black',
                    texture: textures.move_buttons.backward,
                    hover: { fillStyle: 'yellow' }, pressed: { 'fillStyle': 'blue' },
                    onclick: this.actionHandler.bind(this, Action.createNew(ActionKind.walk, Directions.backward)),
                }),
                // Move left button
                new Button({
                    x: panel_w - 3 * button_size, y: button_size,
                    width: button_size, height: button_size,
                    fillStyle: 'dimgrey', strokeStyle: 'black',
                    texture: textures.move_buttons.left,
                    hover: { fillStyle: 'yellow' }, pressed: { 'fillStyle': 'blue' },
                    onclick: this.actionHandler.bind(this, Action.createNew(ActionKind.walk, Directions.left)),
                }),
                // Move right button
                new Button({
                    x: panel_w - button_size, y: button_size,
                    width: button_size, height: button_size,
                    fillStyle: 'dimgrey', strokeStyle: 'black',
                    texture: textures.move_buttons.right,
                    hover: { fillStyle: 'yellow' }, pressed: { 'fillStyle': 'blue' },
                    onclick: this.actionHandler.bind(this, Action.createNew(ActionKind.walk, Directions.right)),
                }),
                // Rotate left button
                new Button({
                    x: panel_w - 3 * button_size, y: 0,
                    width: button_size, height: button_size,
                    fillStyle: 'dimgrey', strokeStyle: 'black',
                    texture: textures.move_buttons.turn_left,
                    hover: { fillStyle: 'yellow' }, pressed: { 'fillStyle': 'blue' },
                    onclick: this.actionHandler.bind(this, Action.createNew(ActionKind.rotate, Directions.left)),
                }),
                // Rotate right button
                new Button({
                    x: panel_w - button_size, y: 0,
                    width: button_size, height: button_size,
                    fillStyle: 'dimgrey', strokeStyle: 'black',
                    texture: textures.move_buttons.turn_right,
                    hover: { fillStyle: 'yellow' }, pressed: { 'fillStyle': 'blue' },
                    onclick: this.actionHandler.bind(this, Action.createNew(ActionKind.rotate, Directions.right)),
                }),
            ]
        });

        return panel;
    }

    execute(delta: number, time: number): void {
        this.panel.draw(this.canvas_ctx, new Vector2(0, 0));
    }

    actionHandler(action: Action) {
        let player = this.queries.player.results[0];
        if (!!player) {
            let actor = player.getMutableComponent(Actor);
            actor.nextAction = action;
        }
    }

    subscribeMouseEvents() {
        for (const ev in this.mouseHandlers) {
            if (Object.prototype.hasOwnProperty.call(this.mouseHandlers, ev)) {
                const handler = this.mouseHandlers[ev];
                this.canvas.addEventListener(ev, handler);
            }
        }
    }

    unsubscribeMouseEvents() {
        for (const ev in this.mouseHandlers) {
            if (Object.prototype.hasOwnProperty.call(this.mouseHandlers, ev)) {
                const handler = this.mouseHandlers[ev];
                this.canvas.removeEventListener(ev, handler);
            }
        }
    }

    getMouseHandler(toEmit: EventType) {
        return (ev: MouseEvent) => {
            ev.preventDefault();

            let clickPoint = new Vector2(ev.offsetX, ev.offsetY);
            this.panel.invokeEvent(clickPoint, toEmit);

            return false;
        }
    }
}