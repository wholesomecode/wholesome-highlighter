/**
 * Highlighter Colours.
 * 
 * Highlighter with a colour selector popover.
 */

// Import WordPress Components.
import { ColorPalette, RichTextToolbarButton, URLPopover } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';

// Import Styles.
import '../style.scss';

const name = 'wholesome/highlighter';
const cssClass = 'wholesome-highlight';

// Create Highlighter Button with Colour Selection Popover.
const HighlighterButton = ( props ) => {
    const { isActive, onChange, value } = props;
    const { activeFormats } = value;

    // Custom Icon SVG.
    const highlighterIcon = <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="m13.791 3.3624c-0.5017-0.48777-1.3098-0.48245-1.8049 0.01187l-3.9568 3.9507c-0.05791 0.05782-0.10897 0.11977-0.15319 0.18488l-1.9918 1.9887 4.6464 4.517 5.7335-5.7566 0.3683-0.36775c0.4951-0.49433 0.4897-1.2905-0.0121-1.7782l-2.8294-2.7506z"/>
        <path d="m5.2528 10.124 4.598 4.4799-1.1632 1.1589c-0.42886 0.4272-1.0916 0.4881-1.5872 0.1804l-0.67343-0.2397-0.94446 0.9259-2.2904-2.2678 0.95586-0.937-0.2139-0.5611c-0.32888-0.4861-0.27782-1.1489 0.15549-1.5806l1.1632-1.1589z"/>
        <path d="m3.2846 15.389 1.1836 1.1382-0.4962 0.4731-1.972-0.476 1.2846-1.1353z"/>
    </svg>;
    
    // State to show popover.
    const [ showPopover, setShowPopover ] = useState( false );

    // Custom highlighter colours.
    const colors = [
        { name: 'yellow', color: '#fff300' },
        { name: 'green', color: '#79fe0c' },
        { name: 'blue', color: '#4af1f2' },
        { name: 'purple', color: '#df00ff' },
        { name: 'red', color: '#ff2226' },
        { name: 'orange', color: '#ff7b19' },
        { name: 'pink', color: '#ff70c5' },
    ];

    return (
        <>
        <RichTextToolbarButton
            icon={highlighterIcon}
            title={ __( 'Highlight', 'wholesome-highlighter' ) }
            onClick={ () => { 
                let showPopover = true;
                if ( activeFormats ) {
                    // If the selection already has the format, remove it.
                    const formats = activeFormats.filter( format => name === format['type'] );
                    if ( formats.length > 0 ) {
                        onChange( toggleFormat( value, { type: name } ) ); // Remove format.
                        showPopover = false;
                    }
                }
                // Otherwise show the popover.
                if ( showPopover ) {
                    setShowPopover( true );
                }
            } }
            isActive={ isActive }
        />
        { showPopover && (
            <URLPopover
                className="components-popover components-inline-color-popover components-animate__appear is-from-top is-from-center is-without-arrow"
                onClose={ () => setShowPopover( false ) }
            >
                <ColorPalette
                    colors={ colors }
                    onChange={ ( color ) => {
                        setShowPopover( false );
                        if ( color ) {
                            const selectedColor = colors.filter( item => color === item.color );
                            const attributes  = {};
                            if ( selectedColor.length ) {
                                attributes.class = `${cssClass}--${selectedColor[0].name}`;
                            } else {
                                attributes.style = `background-color: ${color};`;
                            }
                            onChange( 
                                toggleFormat( value, {
                                    type: name,
                                    attributes,
                                } 
                            ));
                        }
                    } }
                />
            </URLPopover>
        ) }
        </>
    )
};

// Register the Format.
registerFormatType(
	name, {
        title: __( 'Highlight', 'wholesome-highlighter' ),
		tagName: 'mark',
		className: cssClass,
		edit: HighlighterButton,
	}
);