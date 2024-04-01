import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Manager')
export class Manager extends Component {
    start() {
        localStorage.setItem('MAX', '3');
    }
}


