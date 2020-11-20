'use strict';
import acfunMain from './acfun';
import Notification from './notification';

// scf run
exports.main_handler = async (event, context, callback) => {
    try {
        acfunMain();
        return "done";
    } catch (err) {
        new Notification().push({
            title: 'main_handler error',
            content: 'sfc main_handler error',
            callStack: err.stack,
        })
    }
};

// dev env run
if (process.env.RUNTIME_ENV !== 'scf') {
    acfunMain();
}
