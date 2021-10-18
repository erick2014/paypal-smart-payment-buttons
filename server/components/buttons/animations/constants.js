/* @flow */
// eslint-disable-next-line import/no-cycle
import { ButtonStyleMap } from './types';

export const CLASS = {
    CONTAINER:      ('paypal-button-container' : 'paypal-button-container'),
    BUTTON_LABEL:   ('paypal-button-label-container' : 'paypal-button-label-container'),
    DOM_READY:      ('dom-ready' : 'dom-ready')
};

export const BUTTON_SIZE = {
    TINY:       ('tiny' : 'tiny'),
    SMALL:      ('small' : 'small'),
    MEDIUM:     ('medium' : 'medium'),
    LARGE:      ('large' : 'large'),
    HUGE:       ('huge' : 'huge'),
    RESPONSIVE: ('responsive' : 'responsive')
};

export const LOGO_CLASS = {
    LOGO:       ('paypal-logo' : 'paypal-logo'),
    CARD:       ('paypal-logo-card' : 'paypal-logo-card'),
    LOGO_COLOR: ('paypal-logo-color' : 'paypal-logo-color')
};

export const BUTTON_SIZE_STYLE : ButtonStyleMap = {

    [ BUTTON_SIZE.TINY ]: {
        defaultWidth:    75,
        defaultHeight:   25,
        minWidth:        75,
        maxWidth:        150,
        minHeight:       25,
        maxHeight:       30
    },

    [ BUTTON_SIZE.SMALL ]: {
        defaultWidth:    150,
        defaultHeight:   25,
        minWidth:        150,
        maxWidth:        200,
        minHeight:       25,
        maxHeight:       55
    },

    [ BUTTON_SIZE.MEDIUM ]: {
        defaultWidth:      250,
        defaultHeight:     35,
        minWidth:          200,
        maxWidth:          300,
        minHeight:         35,
        maxHeight:         55
    },

    [ BUTTON_SIZE.LARGE ]: {
        defaultWidth:      350,
        defaultHeight:     45,
        minWidth:          300,
        maxWidth:          500,
        minHeight:         30,
        maxHeight:         55
    },

    [ BUTTON_SIZE.HUGE ]: {
        defaultWidth:  500,
        defaultHeight: 55,
        minWidth:      500,
        maxWidth:      750,
        minHeight:     40,
        maxHeight:     55
    }
};
