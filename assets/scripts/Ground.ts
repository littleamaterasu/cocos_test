import { _decorator, Component, Node, quat, Quat, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    @property({ type: SpriteFrame })
    origin: SpriteFrame; // Sprite frame để chỉnh sửa từ bên ngoài

    @property
    someInteger: number = 0; // Một số nguyên cần thiết, có thể chỉnh sửa từ bên ngoài

    @property
    isGround: boolean = false;

    setOrigin() {
        // Đặt SpriteFrame mới cho origin
        if (this.node.getComponent(Sprite)) {
            this.node.getComponent(Sprite).spriteFrame = this.origin;
        }
    }

    setChange(after: SpriteFrame) {
        // Đặt SpriteFrame mới cho after
        if (this.node.getComponent(Sprite)) {
            this.node.getComponent(Sprite).spriteFrame = after;
        }
    }

    Pos() {
        return this.node.position; 
    }
}
