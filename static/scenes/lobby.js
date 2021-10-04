export class LobbyScene {
    constructor(data) {
        this.rid = data["rid"];
        this.drawn = false;
    }

    update(ratio, keyboard, mouse) {
    }

    draw(ctx, drawSprite) {
        if (this.drawn) {return}
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "28pt Sans";
        let text;
        if (!this.rid) {
            text = "Could not connect to server"
        } else {
            text = `Room Code: ${this.rid}`;
        }
        ctx.fillText(text, ctx.canvas.width/2-(ctx.measureText(text).width/2), ctx.canvas.height/2);
        this.drawn = true;
    }
}