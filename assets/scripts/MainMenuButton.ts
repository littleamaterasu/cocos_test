import { _decorator, Button, Component, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MainMenuButton')
export class MainMenuButton extends Component {

    onLoad() {
        const button = this.node.getComponent(Button);
        if (button) {
            button.node.on('click', this.buttonClick, this);
        }
    }

    buttonClick(_event) {
        // Load scene "mainmenu"
        director.loadScene("mainmenu");
    }
}
