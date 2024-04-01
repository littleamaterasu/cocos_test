import { _decorator, Button, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResumeButton')
export class ResumeButton extends Component {
    @property({ type: Node })
    camera: Node = null;

    @property({ type: Node })
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
            cameraPos.y += 220;

            // Sử dụng tween để di chuyển camera đến vị trí mới trong thời gian nhất định
            tween(this.camera)
                .to(0.5, { position: cameraPos }, { easing: 'sineOut' }) // Tween đến vị trí mới trong 0.5 giây
                .call(() => {
                    // Vô hiệu hóa component Moving trên nodeWithMovingComponent
                    const movingComponent = this.nodeWithMovingComponent.getComponent("Moving");
                    if (movingComponent) {
                        movingComponent.enabled = true;
                    }
                })
                .start(); // Bắt đầu tween
        }
    }
}



