/**
 * Highlighter Paragraph.
 * 
 * Highlighter that is limited to a single block.
 */

// Import WordPress Components.
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { compose, ifCondition  } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
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

// Limit the format to the `core/paragraph` block.
var HighlighterButtonContainer = compose(
	withSelect( function( select ) {
		const blocks = select( 'core/block-editor' ).getBlocks()
		return {
			selectedBlock: select('core/block-editor').getSelectedBlock(),
		}
	} ),
	ifCondition( function( props ) {
		return (
			props.selectedBlock &&
			props.selectedBlock.name === 'core/paragraph'
		); 
	} )
)( HighlighterButton );

// Register the Format.
registerFormatType(
	'wholesome/highlighter', {
        title: __( 'Highlight', 'wholesome-highlighter' ),
		tagName: 'mark',
		className: 'wholesome-highlight',
		edit: HighlighterButtonContainer,
	}
);