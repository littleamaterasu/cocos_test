import { _decorator, Button, Component, Node, tween, Vec3, Label, director } from 'cc';
import { Moving } from './Moving';
const { ccclass, property } = _decorator;

@ccclass('ResetButton')
export class ResetButton extends Component {
    @property({ type: Node })
    camera: Node = null;

    @property({ type: Moving })
    moving: Moving = null;

    onLoad() {
        this.node.on('click', this.buttonClick, this);
    }

    buttonClick(event) {
        if (this.moving.finishGame) {
            // If finishGame is true, load the next level scene
            const next = this.moving.level + 1;
            if(next > parseInt(localStorage.getItem('MAX'))){
                director.loadScene("mainmenu");
            }
            else{
                director.loadScene("game_" + next.toString());
            }
        } else if (this.moving.outOfMove) {
            // If outOfMove is true, reset the game
            this.moving.resetGame();
            if (this.camera) {
                const cameraPos = this.camera.position.clone();
                cameraPos.y += 220;
                tween(this.camera)
                    .to(0.5, { position: cameraPos }, { easing: 'sineOut' })
                    .call(() => {
                        this.moving.resetGame();
                    })
                    .start();
            }
        }
    }
}

export function getSceneAsset(sceneName: string) {
    throw new Error('Function not implemented.');
}

