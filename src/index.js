import { World } from 'ecsy';
import { Startup } from './game';

let lastTime = 0;

function run(world) {
    // Compute delta and elapsed time
    var time = performance.now();
    var delta = time - lastTime;

    // Run all the systems
    world.execute(delta, time);

    lastTime = time;
    requestAnimationFrame(run.bind(this, world));
}

window.onload = function () {
    const canvas = document.getElementById('screen');

    if (canvas.getContext) {

        Startup(new World(), canvas)
            .then(world => {
                world.play();

                lastTime = performance.now();
                run(world);
            });

    } else {
        console.error('Canvas does not supported');
    }
}

