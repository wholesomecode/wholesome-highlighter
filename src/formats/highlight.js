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
            title={ __( 'Highlight', 'wholesome-highlighter' ) }
            onClick={ () => {
                onChange(
                    toggleFormat( value, {
                        type: 'wholesome/highlighter',
                    } )
                );
            } }
            isActive={ isActive }
        />
    )
};

// Register the Format.
registerFormatType(
	'wholesome/highlighter', {
        title: __( 'Highlight', 'wholesome-highlighter' ),
		tagName: 'mark',
		className: 'wholesome-highlight',
		edit: HighlighterButton,
	}
);