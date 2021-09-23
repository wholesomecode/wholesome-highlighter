import { RichTextToolbarButton } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';

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

registerFormatType(
	'wholesome/highlighter', {
        title: __( 'Highlight', 'wholesome-highlighter' ),
		tagName: 'mark',
		className: 'wholesome-highlight',
		edit: HighlighterButton,
	}
);