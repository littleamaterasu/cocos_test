import { _decorator, Button, Component, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelButton')
export class LevelButton extends Component {

    @property
    levelName: number = 0;

    onLoad() {
        const button = this.node.getComponent(Button);
        console.log(localStorage.getItem('Max_level'));
        if (button) {
            button.node.on('click', this.buttonClick, this);
        }
    }

    buttonClick(_event) {
        const maxLevel = parseInt(localStorage.getItem('Max_level')) || 1;

        if (this.levelName > maxLevel) {
            console.warn("Chưa mở khóa màn chơi");
        } else {
            if (this.levelName) {
                director.loadScene("game_" + this.levelName);
            } else {
                console.warn("Level name is not set for this LevelButton.");
            }
        }
    }
}
