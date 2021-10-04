import { LobbyScene } from "./lobby.js";
import { Button } from "../button.js";

const SERVER = "";

export class MenuScene {
    constructor(game) {
        this.game = game;
        this.button = new StartButton(game, game.ctx.canvas.width / 2 - 128, game.ctx.canvas.height / 2 - 32);
    }

    update(ratio, keyboard, mouse) {
        let requestNewRoom = function(self) {
            fetch(
                `${SERVER}/newroom`
            ).then(
                response => response.ok ? response.json() : null
            ).then(
                data => self.game.changeScene(new LobbyScene(data))
            )
        };
        this.button.update(ratio, keyboard, mouse, requestNewRoom, this);
    }

    draw(ctx, drawSprite) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.button.draw(ctx, drawSprite);
    }
}

class StartButton extends Button {
    constructor(game, x, y) {
        let outline = "rgba(0, 0, 0, 1.0)";
        let colour = "rgba(0, 55, 145, 1.0)";
        super(x, y, 256, 48, "Start Game", outline, colour);
        this.game = game;
    }
}