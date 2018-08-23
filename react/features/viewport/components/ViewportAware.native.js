// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FILMSTRIP_SIZE, isFilmstripVisible } from '../../filmstrip';

// FIXME There seems to be cyclic dependency - importing directly fixes
// the problem. Think about the viewport feature on how could it be moved into
// the base/responsive-ui. Another way would be to have a viewport container
// which is relative to other components taking up conference view's space.
import { HANGUP_BUTTON_SIZE } from '../../toolbox/constants';
import { ASPECT_RATIO_NARROW } from '../../base/responsive-ui';

/**
 * The properties added to a component when wrapped into
 * the {@code ViewportAware}.
 */
export type ViewportAwareProps = {

    /**
     * This is the area of the conference view not obstructed neither by
     * the toolbox nor the filmstrip.
     */
    viewport: {
        bottom: number,
        left: number,
        right: number,
        top: number
    }
}

/**
 * The function figures out what's the area that's not obstructed by filmstrip
 * nor toolbox if any is displayed.
 *
 * @param {Object} state - The whole Redux state.
 * @returns {{
 *     bottom: number,
 *     left: number,
 *     right: number,
 *     top: number
 * }}
 * @private
 */
export function _figureOutConferenceViewport(state: Object) {
    const aspectRatio = state['features/base/responsive-ui'].aspectRatio;
    const filmstripVisible = isFilmstripVisible(state);
    const toolboxVisible = state['features/toolbox'].visible;

    const narrow = aspectRatio === ASPECT_RATIO_NARROW;

    let bottom = 0;
    let right = 0;

    filmstripVisible && !narrow && (right += FILMSTRIP_SIZE);
    filmstripVisible && narrow && (bottom += FILMSTRIP_SIZE);
    toolboxVisible && (bottom += HANGUP_BUTTON_SIZE);

    return {
        bottom,
        left: 0,
        right,
        top: 0
    };
}

/**
 * Decorates a specific React {@code Component} class into an
 * {@link ViewportAware} which provides the React prop {@code viewport}. It
 * provides the boundaries for the conference view's area not obstructed by any
 * of the transient components (filmstrip, toolbox etc.). It automagically
 * checks if filmstrip/toolbox is currently displayed and updates the
 * {@code viewport} property.
 *
 * @param {Class<React$Component>} WrappedComponent - A React {@code Component}
 * class to be wrapped.
 * @returns {ViewportAware}
 */
export function makeViewportAware(
        WrappedComponent: Class<React$Component<*>>
): Class<React$Component<*>> {
    /**
     * Renders {@code WrappedComponent} with the React prop {@code viewport}.
     */
    class ViewportAware extends Component<ViewportAwareProps> {
        /**
         * Implement's React render method to wrap the nested component.
         *
         * @returns {React$Element}
         */
        render(): React$Element<*> {
            return <WrappedComponent { ...this.props } />;
        }
    }

    // $FlowFixMe
    return connect(_mapStateToProps)(ViewportAware);
}

/**
 * Maps (parts of) the redux state to {@link ViewportAware} props.
 *
 * @param {Object} state - The whole redux state.
 * @private
 * @returns {{
 *     bottom: number,
 *     left: number,
 *     right: number,
 *     top: number
 * }}
 */
function _mapStateToProps(state) {
    return {
        viewport: _figureOutConferenceViewport(state)
    };
}
