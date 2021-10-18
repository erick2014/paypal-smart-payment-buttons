/* @flow */
/** @jsx node */
import { node, Fragment, type ChildType } from 'jsx-pragmatic';

import { BUTTON_SIZE_STYLE, CLASS, LOGO_CLASS } from './constants';
import  type { ButtonAnimationOutputParams, ResizeButtonAnimationDomElementPositions, ButtonSizes } from './types';

export const ANIMATION = {
    CONTAINER:     ('fadeout-logo-and-show-label-animation' : 'fadeout-logo-and-show-label-animation'),
    ELEMENT:       ('fadeout-logo-and-show-label-animation-element' : 'fadeout-logo-and-show-label-animation-element')
};

export function createComponent(animationLabelText : string) : ChildType {
    return (
        <Fragment>
            <span class={ ANIMATION.ELEMENT } >{ animationLabelText }</span>
            <style innerHTML={ `
                .${ CLASS.DOM_READY } .${ ANIMATION.CONTAINER } img.${ LOGO_CLASS.LOGO }{
                    position: relative;
                }
                
                .${ ANIMATION.CONTAINER } .${ ANIMATION.ELEMENT } {
                    display: block;
                    position: absolute;
                    opacity: 0; 
                    color: #142C8E;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    font-size: 11px;
                    top: -1px;
                }
            ` } />;
        </Fragment>
    );
}

const getPositionsOfElementsForAnimation = function(document, configuration) : ResizeButtonAnimationDomElementPositions | null {
    const { ANIMATION_CONTAINER, PAYPAL_BUTTON_LABEL, PAYPAL_LOGO } = configuration.cssClasses;
    // get the animation main container to force specificity( in css ) and make sure we are running the right animation
    const animationContainer = (document && document.querySelector(`.${ ANIMATION_CONTAINER }`)) || null;
    // get the label container element having into account the animation container to force specificity in css
    const paypalLabelContainerElement = (animationContainer && animationContainer.querySelector(`.${ PAYPAL_BUTTON_LABEL }`)) || null;

    if (!animationContainer) {
        return null;
    }
    
    // get paypal label container's width to calculate initial and final translate positions
    const paypalLabelContainerElementWith  = (paypalLabelContainerElement &&  paypalLabelContainerElement.offsetWidth) || 0;

    // find label text element
    const textElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector('span')) || 0;
    // find label text dom element to help to calculate initial and final translate position
    const textElementWidth = (textElement && textElement.offsetWidth) || 0;
    // calculate initial translate position to start the animation with the text in that position
    const initialTranslateXTextPosition = (paypalLabelContainerElementWith - textElementWidth) / 2;
    
    // get the logo image element from dom to get the left position
    const logoElement = (paypalLabelContainerElement && paypalLabelContainerElement.querySelector(`.${ PAYPAL_LOGO }`)) || null;
    // get the left position of the logo element to later calculate the translate position
    const logoElementLeftPosition = (logoElement && logoElement.getBoundingClientRect().left) || 0;

    // get margin of paypal label container as an integer to later calculate logo translate position
    let marginPaypalLabelContainer = document.defaultView.getComputedStyle(paypalLabelContainerElement).getPropertyValue('margin-left');
    marginPaypalLabelContainer = marginPaypalLabelContainer ? parseInt(marginPaypalLabelContainer.replace('px', ''), 10) : 0;
    // calculate translate position based on the logo left position and margin of paypal label container
    const logoTranslateXPosition = logoElementLeftPosition - marginPaypalLabelContainer;
    return {
        initialTranslateXTextPosition,
        paypalLabelContainerElement,
        logoTranslateXPosition
    };
};

function animationConfiguration () : ButtonSizes {
    return {
        large:      { min: BUTTON_SIZE_STYLE.large.minWidth },
        huge:       { max: BUTTON_SIZE_STYLE.huge.maxWidth },
        cssClasses: {
            DOM_READY:                  CLASS.DOM_READY,
            ANIMATION_CONTAINER:        ANIMATION.CONTAINER,
            ANIMATION_LABEL_ELEMENT:    ANIMATION.ELEMENT,
            PAYPAL_BUTTON_LABEL:        CLASS.BUTTON_LABEL,
            PAYPAL_LOGO:                LOGO_CLASS.LOGO
        }
    };
}

export function createAnimation() : Function {
    return (params, cssClasses) : void => {
        const { initialTranslateXTextPosition, paypalLabelContainerElement, logoTranslateXPosition } = params;
        const { ANIMATION_LABEL_ELEMENT, ANIMATION_CONTAINER, PAYPAL_LOGO } = cssClasses;
        const animations = `
            .${ ANIMATION_CONTAINER }:hover img.${ PAYPAL_LOGO } {
                animation: move-logo-to-left 3s linear both;
            }
            
            .${ ANIMATION_CONTAINER }:hover .${ ANIMATION_LABEL_ELEMENT } {
                animation: fadein-label-text 1s linear both;
            }

            @keyframes move-logo-to-left {
                0% {
                    transform: translateX(-${ logoTranslateXPosition }px);
                }
                10%{
                    opacity: 0;
                }
                100%{
                    opacity: 0;
                    transform: translateX(-${ logoTranslateXPosition }px);
                }
            }

            @keyframes fadein-label-text {
                0%{
                    visibility: hidden;
                    opacity: 0;
                    transform: translateX(${ initialTranslateXTextPosition }px);
                }
                100% {
                    visibility: visible;
                    opacity: 1;
                    transform: translateX(${ initialTranslateXTextPosition }px);
                }
            }
        `;

        if (paypalLabelContainerElement) {
            const style = document.createElement('style');
            paypalLabelContainerElement.appendChild(style);
            style.type = 'text/css';
            style.appendChild(document.createTextNode(animations));
        }
    };
}

export function setupFadeOutLogoAndShowLabelText (animationLabelText : string) : ButtonAnimationOutputParams {
    let animationScript = '';
    const animationFn = createAnimation();
    const animationConfig = animationConfiguration();
    animationScript = `
        const elementPositionsForAnimation = ${ getPositionsOfElementsForAnimation.toString() }( document, ${ JSON.stringify(animationConfig) })
        if (elementPositionsForAnimation) {
            const animation = ${ animationFn.toString() }
            animation(elementPositionsForAnimation, ${ JSON.stringify(animationConfig.cssClasses) })
        }
    `;
    return {
        animationContainerClass: ANIMATION.CONTAINER,
        animationScript,
        animationComponent:      (createComponent(animationLabelText))
    };
}
