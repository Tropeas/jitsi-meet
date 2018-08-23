// @flow

import { StyleSheet } from 'react-native';

import { BoxModel, ColorPalette, createStyleSheet } from '../../base/styles';

/**
 * The styles of the React {@code Components} of the feature subtitles.
 */
export default createStyleSheet({

    /**
     * Style for the subtitles container.
     */
    subtitlesContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        margin: BoxModel.margin,
        marginBottom: 2 * BoxModel.margin
    },

    /**
     * Style for subtitle paragraph.
     */
    subtitle: {
        borderRadius: BoxModel.margin / 4,
        backgroundColor: ColorPalette.black,
        color: ColorPalette.white,
        marginTop: BoxModel.margin,
        padding: BoxModel.padding / 2
    }
});
