/* @flow */

import { setupDivideLogoAnimation } from './divide-logo-animation';
import type { ButtonAnimationOutputParams, ButtonAnimationEmptyOutput } from './types';


export function getButtonAnimation(buttonAnimation) : ButtonAnimationOutputParams | ButtonAnimationEmptyOutput {
    const animationId = (buttonAnimation && buttonAnimation.id) || '';
    const animationLabelText = (buttonAnimation && buttonAnimation.text) || 'Pay now or pay later';
    let configuration = {
        animationContainerClass: null,
        animationScript:         null,
        animationComponent:      null
    };

    if (animationId && animationId === '1') {
        configuration =  setupDivideLogoAnimation(animationLabelText);
    }

    return configuration;
}
