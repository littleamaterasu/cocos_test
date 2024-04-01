import { _decorator, Button, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuButton')
export class MenuButton extends Component {

    @property({type: Node})
    camera: Node = null;

    @property({type: Node})
    nodeWithMovingComponent: Node = null;

    onLoad() {
        const button = this.node.getComponent(Button);
        if (button) {
            button.node.on('click', this.buttonClick, this);
        }
    }

    buttonClick(_event) {
        if (this.camera && this.nodeWithMovingComponent) {
            const cameraPos = this.camera.position.clone();
            cameraPos.y -= 220;

            tween(this.camera)
                .to(0.5, { position: cameraPos }, { easing: 'sineOut' }) 
                .call(() => {

                    const movingComponent = this.nodeWithMovingComponent.getComponent("Moving");
                    if (movingComponent) {
                        movingComponent.enabled = false;
                    }
                })
                .start(); 
        }
    }
}
