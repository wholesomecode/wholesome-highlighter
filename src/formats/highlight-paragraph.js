/**
 * Highlighter Paragraph.
 * 
 * Highlighter that is limited to a single block.
 */

// Import WordPress Components.
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { ifCondition  } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
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

// Limit the format to the `core/paragraph` block.
var HighlighterButtonContainer = ifCondition( ( props ) => {
	const selectedBlock = useSelect( (select) => select('core/block-editor').getSelectedBlock() );
	return (
		selectedBlock &&
		selectedBlock.name === 'core/paragraph'
	); 
} )( HighlighterButton );

// Register the Format.
registerFormatType(
	'wholesome/highlighter', {
		className: 'wholesome-highlight',
		edit: HighlighterButtonContainer,
		tagName: 'mark',
        title: __( 'Highlight', 'wholesome-highlighter' ),
	}
);