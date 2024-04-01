import { _decorator, Component, Node, EventKeyboard, input, Input, KeyCode, director, tween, math, Quat, SpriteFrame, Sprite, Vec3, QuatKeyframeValue, Camera } from 'cc';
import { Ground } from './Ground';
const { ccclass, property } = _decorator;

@ccclass('Moving')
export class Moving extends Component {
    @property({ type: Ground })
    grid: Ground[] = [];

    @property({ tooltip: 'The width of the grid' })
    private width: number;

    @property({ tooltip: 'The height of the grid' })
    private height: number;

    @property({ tooltip: 'Number of blocks need to be filled' })
    private numfill: number = 0;

    @property
    originPos: number = 0;

    @property
    curX: number = 0;

    @property
    curFill: number = 0;

    @property({ type: Node })
    charater: Node;

    @property({ type: SpriteFrame })
    LU: SpriteFrame;

    @property({ type: SpriteFrame })
    DL: SpriteFrame;

    @property({ type: SpriteFrame })
    LD: SpriteFrame;

    @property({ type: SpriteFrame })
    RD: SpriteFrame;

    @property({ type: SpriteFrame })
    L: SpriteFrame;

    @property({ type: SpriteFrame })
    U: SpriteFrame;

    currentMove: number = 0;

    @property
    level: number = 0;

    @property({ type: Node })
    camera: Node = null;

    outOfMove = false;
    finishGame = false;
    moveTime = 0.2;

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A:
                input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                this.moveLeft();
                input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                break;
            case KeyCode.ARROW_RIGHT:
            case KeyCode.KEY_D:
                input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                this.moveRight();
                input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                break;
            case KeyCode.ARROW_UP:
            case KeyCode.KEY_W:
                input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                this.moveUp();
                input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                break;
            case KeyCode.ARROW_DOWN:
            case KeyCode.KEY_S:
                input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                this.moveDown();
                input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                break;
        }
    }

    moveLeft() {

        var targetPosition: Readonly<math.Vec3>;
        let delay = 0;
        for (let i = this.curX - 1; i >= 0; i--) {
            if (this.grid[i].someInteger != 1) {
                this.curFill++;
                this.curX = i;
                targetPosition = this.grid[i].node.position;
                tween(this.charater)
                    .delay(delay)
                    .call(() => {
                        if (this.currentMove === 1) this.grid[i + 1].setChange(this.L);
                        else if (this.currentMove === 3) this.grid[i + 1].setChange(this.RD);
                        else if (this.currentMove === 4) this.grid[i + 1].setChange(this.DL);
                        else this.grid[i + 1].setChange(this.L);
                        this.currentMove = 1;
                        this.grid[i + 1].someInteger = 1;
                    })
                    .to(this.moveTime, { position: targetPosition })

                    .start();

                delay += this.moveTime
            }
            else {
                break;
            }
        }

    }

    moveRight() {

        var targetPosition: Readonly<math.Vec3>;

        let delay = 0;
        for (let i = this.curX + 1; i < this.grid.length; i++) {
            if (this.grid[i].someInteger !== 1) {
                this.curFill++;
                this.curX = i;
                targetPosition = this.grid[i].node.position;
                tween(this.charater)
                    .delay(delay)
                    .call(() => {
                        if (this.currentMove === 2) this.grid[i - 1].setChange(this.L);
                        else if (this.currentMove === 3) this.grid[i - 1].setChange(this.LD);
                        else if (this.currentMove === 4) this.grid[i - 1].setChange(this.LU);
                        else this.grid[i - 1].setChange(this.L);
                        this.currentMove = 2;
                        this.grid[i - 1].someInteger = 1;
                    })
                    .to(this.moveTime, { position: targetPosition })

                    .start();
                delay += this.moveTime;
            } else {
                break;
            }
        }
    }

    moveUp() {
        let delay = 0
        var targetPosition: Readonly<math.Vec3>;
        for (let i = this.curX + this.width; i < this.grid.length; i += this.width) {
            if (this.grid[i].someInteger !== 1) {
                this.curX = i;
                this.curFill++;
                targetPosition = this.grid[i].node.position;
                tween(this.charater)
                    .delay(delay)
                    .call(() => {
                        if (this.currentMove === 3) this.grid[i - this.width].setChange(this.U);
                        else if (this.currentMove === 1) this.grid[i - this.width].setChange(this.LU);
                        else if (this.currentMove === 2) this.grid[i - this.width].setChange(this.DL);
                        else this.grid[i - this.width].setChange(this.U);
                        this.currentMove = 3;
                        this.grid[i - this.width].someInteger = 1;
                    })
                    .to(this.moveTime, { position: targetPosition })

                    .start();
                delay += this.moveTime
            } else {
                break;
            }
        }

    }

    moveDown() {
        let delay = 0;
        var targetPosition: Readonly<math.Vec3>;
        for (let i = this.curX - this.width; i >= 0; i -= this.width) {
            if (this.grid[i].someInteger !== 1) {
                this.curX = i;
                this.curFill++;
                targetPosition = this.grid[i].node.position;
                tween(this.charater)
                    .delay(delay)
                    .call(() => {
                        if (this.currentMove === 4) this.grid[i + this.width].setChange(this.U);
                        else if (this.currentMove === 1) this.grid[i + this.width].setChange(this.LD);
                        else if (this.currentMove === 2) this.grid[i + this.width].setChange(this.RD);
                        else this.grid[i + this.width].setChange(this.U);
                        this.currentMove = 4;
                        this.grid[i + this.width].someInteger = 1;
                    })
                    .to(this.moveTime, { position: targetPosition })

                    .start();
                delay += this.moveTime;
            } else {
                break;
            }
        }
    }

    resetGame() {
        this.curFill = 0;
        this.curX = this.originPos;

        setTimeout(() => {
            this.grid.forEach(element => {
                if (element.isGround) {
                    element.setOrigin();
                    element.someInteger = 0;
                }
            });
            this.charater.setPosition(this.grid[this.originPos].node.position);
            input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        }, 1000);

        this.outOfMove = false;
    }

    checkEnd() {
        if (this.grid[this.curX - 1].someInteger != 1 ||
            this.grid[this.curX + 1].someInteger != 1 ||
            this.grid[this.curX + this.width].someInteger != 1 ||
            this.grid[this.curX - this.width].someInteger != 1
        ) {
            return;
        } else {
            if (this.curFill != this.numfill) {
                input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                // đợi 1s rồi mới di chuyển
                this.outOfMove = true;
                if (this.camera) {
                    const cameraPos = this.camera.position.clone();
                    cameraPos.y -= 220;
                    tween(this.camera)
                        .delay(1)
                        .call(() => {
                            console.log("lost");
                        })
                        .to(0.5, { position: cameraPos }, { easing: 'sineOut' })
                        .start();
                }
            } else {
                input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
                this.finishGame = true;
                const nextLevel = this.level + 1;
                const maxLevelString = localStorage.getItem("Max_level");
                const maxLevel = maxLevelString ? parseInt(maxLevelString) : 0;

                if (nextLevel > maxLevel && nextLevel <= parseInt(localStorage.getItem('MAX'))) {
                    localStorage.setItem('Max_level', nextLevel.toString());
                }

                if (this.camera) {
                    const cameraPos = this.camera.position.clone();
                    cameraPos.y -= 220;
                    tween(this.camera)
                        .delay(1)
                        .call(() => {
                            console.log("win");
                        })
                        .to(0.5, { position: cameraPos }, { easing: 'sineOut' })
                        .start();
                }
            }
        }
    }

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    update(deltaTime: number) {
        if (!this.finishGame && !this.outOfMove) this.checkEnd();
    }
}
