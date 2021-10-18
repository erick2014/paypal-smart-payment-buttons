/* @flow */

import { setupFadeOutLogoAndShowLabelText } from './fadeout-logo-and-show-label-text';
import type { ButtonAnimationOutputParams, ButtonAnimationEmptyOutput } from './types';


export function getButtonAnimation(buttonAnimation) : ButtonAnimationOutputParams | ButtonAnimationEmptyOutput {
    const animationId = (buttonAnimation && buttonAnimation.id) || '';
    const animationLabelText = (buttonAnimation && buttonAnimation.text) || 'Pay now or pay later';
    let configuration = {
        animationContainerClass: null,
        animationScript:         null,
        animationComponent:      null
    };

    if (animationId && animationId === 'run-fadeout-logo-and-show-label-text') {
        configuration =  setupFadeOutLogoAndShowLabelText(animationLabelText);
    }

    return configuration;
}
