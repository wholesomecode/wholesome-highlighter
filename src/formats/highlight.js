/**
 * Highlighter.
 * 
 * Simple Highlighter that inserts a <mark> into the markup.
 */

// Import WordPress Components.
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';

// Create Highlighter Button.
const HighlighterButton = ( { isActive, onChange, value} ) => {
    return ( 
        <RichTextToolbarButton
            icon='edit'
            isActive={ isActive }
            onClick={ () => {
                onChange(
                    toggleFormat( value, {
                        type: 'wholesome/highlighter',
                    } )
                );
            } }
            title={ __( 'Highlight', 'wholesome-highlighter' ) }
        />
    )
};

// Register the Format.
registerFormatType(
	'wholesome/highlighter', {
        className: 'wholesome-highlight',
		edit: HighlighterButton,
        tagName: 'mark',
        title: __( 'Highlight', 'wholesome-highlighter' ),
	}
);