import { World } from 'ecsy';
import { Startup } from './game';

window.onload = function () {
    const canvas = document.getElementById('screen');

    if (canvas.getContext) {

        Startup(new World(), canvas)
            .then(world => {
                world.play();
                world.execute();
            });

    } else {
        console.error('Canvas does not supported');
    }
}