import { ColorPalette, RichTextToolbarButton, URLInput, URLPopover } from '@wordpress/block-editor';
import { IconButton } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';

const HighlighterButton = ( props ) => {
    const { isActive, onChange, value } = props;
    const { activeFormats } = value;
    const [ showPopover, setShowPopover ] = useState( false );
    const [ activeColor, setActiveColor ] = useState( '#ffffff' );
    return (
        <>
        <RichTextToolbarButton
            icon='edit'
            title={ __( 'Highlight', 'wholesome-highlighter' ) }
            onClick={ () => { 
                let showPopover = false;
                if ( activeFormats ) {
                    const formats = activeFormats.filter( format => 'wholesome/highlighter' === format['type'] );
                    if ( formats.length > 0 ) {
                        onChange( 
                            toggleFormat( value, {
                                type: 'wholesome/highlighter',
                            } 
                        ));
                    } else {
                        showPopover = true;
                    }
                } else {
                    showPopover = true;
                }
                if ( showPopover ) {
                    setShowPopover( true );
                }
            } }
            isActive={ isActive }
        />
        { showPopover && (
            <URLPopover
                onClose={ () => setShowPopover( false ) }
            >
                <ColorPalette
                    value={ activeColor } 
                    onChange={ ( color ) => {
                        console.log;
                        setActiveColor( color );
                        setShowPopover( false );
                        onChange( 
                            toggleFormat( value, {
                                type: 'wholesome/highlighter',
                                attributes: { style: `background: ${color};` },
                            } 
                        ));
                    } }
                />
            </URLPopover>
        ) }
        </>
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