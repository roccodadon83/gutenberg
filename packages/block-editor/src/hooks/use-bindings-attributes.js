/**
 * WordPress dependencies
 */
import { getBlockType, store as blocksStore } from '@wordpress/blocks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { useLayoutEffect, useCallback, useRef } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { RichTextData } from '@wordpress/rich-text';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../store';
import { unlock } from '../lock-unlock';

/** @typedef {import('@wordpress/compose').WPHigherOrderComponent} WPHigherOrderComponent */
/** @typedef {import('@wordpress/blocks').WPBlockSettings} WPBlockSettings */

/**
 * Given a binding of block attributes, returns a higher order component that
 * overrides its `attributes` and `setAttributes` props to sync any changes needed.
 *
 * @return {WPHigherOrderComponent} Higher-order component.
 */

const BLOCK_BINDINGS_ALLOWED_BLOCKS = {
	'core/paragraph': [ 'content' ],
	'core/heading': [ 'content' ],
	'core/image': [ 'url', 'title', 'alt' ],
	'core/button': [ 'url', 'text', 'linkTarget' ],
};

/**
 * Based on the given block name,
 * check if it is possible to bind the block.
 *
 * @param {string} blockName - The block name.
 * @return {boolean} Whether it is possible to bind the block to sources.
 */
export function canBindBlock( blockName ) {
	return blockName in BLOCK_BINDINGS_ALLOWED_BLOCKS;
}

/**
 * Based on the given block name and attribute name,
 * check if it is possible to bind the block attribute.
 *
 * @param {string} blockName     - The block name.
 * @param {string} attributeName - The attribute name.
 * @return {boolean} Whether it is possible to bind the block attribute.
 */
export function canBindAttribute( blockName, attributeName ) {
	return (
		canBindBlock( blockName ) &&
		BLOCK_BINDINGS_ALLOWED_BLOCKS[ blockName ].includes( attributeName )
	);
}

/**
 * Return the attribute value to be used in the binding.
 * It handles the case when the attribute instance is a RichTextData.
 *
 * @param {*} value - Attribute value instance,
 * @return {string}   String raw value.
 */
function getAttributeValue( value ) {
	if ( value instanceof RichTextData ) {
		return value.toHTMLString();
	}

	return value;
}

/**
 * Create a new attribute value instance,
 * based on the original value type.
 *
 * @param {string} value    - The attribute value.
 * @param {*}      original - The original attribute instance.
 * @return {*}                The new attribute value instance.
 */
function castValue( value, original ) {
	if ( original instanceof RichTextData ) {
		return RichTextData.fromHTMLString( value );
	}

	return value;
}

/**
 * This component is responsible for detecting and
 * propagating data changes from the source to the block.
 *
 * @param {Object}   props                   - The component props.
 * @param {string}   props.attrName          - The attribute name.
 * @param {Object}   props.blockProps        - The block props with bound attribute.
 * @param {Object}   props.source            - Source handler.
 * @param {Object}   props.args              - The arguments to pass to the source.
 * @param {Function} props.onPropValueChange - The function to call when the attribute value changes.
 * @return {null}                              Data-handling component. Render nothing.
 */
const BindingConnector = ( {
	args,
	attrName,
	blockProps,
	source,
	onPropValueChange,
} ) => {
	const {
		placeholder,
		value: propValue,
		updateValue: updatePropValue,
	} = source.useSource( blockProps, args );

	const { name: blockName } = blockProps;
	const attrValue = blockProps.attributes[ attrName ];

	const updateBoundAttibute = useCallback(
		( newAttrValue ) => {
			onPropValueChange( {
				[ attrName ]: castValue( newAttrValue, attrValue ),
			} );
		},
		[ attrName, attrValue, onPropValueChange ]
	);

	// Get the raw attribute value.
	const rawAttrValue = getAttributeValue( attrValue );
	const prevAttrValue = useRef( rawAttrValue );

	const prevPropValue = useRef(); // intially undefined for the initial sync.

	useLayoutEffect( () => {
		if ( typeof propValue !== 'undefined' ) {
			// Sync from external source propery to block attribute.
			if ( propValue !== prevPropValue.current ) {
				prevPropValue.current = propValue;
				return updateBoundAttibute( propValue ); // close the loop.
			}
		} else if ( placeholder ) {
			/*
			 * Placeholder fallback.
			 * If the attribute is `src` or `href`,
			 * a placeholder can't be used because it is not a valid url.
			 * Adding this workaround until
			 * attributes and metadata fields types are improved and include `url`.
			 */
			const htmlAttribute =
				getBlockType( blockName ).attributes[ attrName ].attribute;

			if ( htmlAttribute === 'src' || htmlAttribute === 'href' ) {
				updateBoundAttibute( null );
				return;
			}

			return updateBoundAttibute( placeholder );
		}

		// Sync from block attribute to external source property.
		if ( rawAttrValue !== prevAttrValue.current ) {
			prevAttrValue.current = rawAttrValue;
			updatePropValue( rawAttrValue );
		}
	}, [
		updateBoundAttibute,
		propValue,
		rawAttrValue,
		placeholder,
		blockName,
		attrName,
		updatePropValue,
	] );

	return null;
};

/**
 * BlockBindingBridge acts like a component wrapper
 * that connects the bound attributes of a block
 * to the source handlers.
 * For this, it creates a BindingConnector for each bound attribute.
 *
 * @param {Object} props            - The component props.
 * @param {Object} props.blockProps - The BlockEdit props object.
 * @param {Object} props.bindings   - The block bindings settings.
 * @return {null}                     Data-handling component. Render nothing.
 */
function BlockBindingBridge( { blockProps, bindings } ) {
	const blockBindingsSources = unlock(
		useSelect( blocksStore )
	).getAllBlockBindingsSources();

	const { syncDerivedUpdates } = unlock( useDispatch( blockEditorStore ) );

	const { setAttributes } = blockProps;

	/**
	 * Update the bound attributes with the new values,
	 * marking every change as "non-persistent".
	 *
	 * @param {Object} newAttributes - The new attributes to set.
	 * @return {void}
	 */
	const setBoundAttributes = useCallback(
		( newAttributes ) =>
			syncDerivedUpdates( () => setAttributes( newAttributes ) ),
		[ setAttributes, syncDerivedUpdates ]
	);

	return (
		<>
			{ Object.entries( bindings ).map(
				( [ attrName, boundAttribute ] ) => {
					// Bail early if the block doesn't have a valid source handler.
					const source =
						blockBindingsSources[ boundAttribute.source ];
					if ( ! source?.useSource ) {
						return null;
					}

					return (
						<BindingConnector
							key={ attrName }
							attrName={ attrName }
							source={ source }
							args={ boundAttribute.args }
							blockProps={ blockProps }
							onPropValueChange={ setBoundAttributes }
						/>
					);
				}
			) }
		</>
	);
}

const withBlockBindingSupport = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		/*
		 * Create binding object filtering
		 * only the attributes that can be bound.
		 */
		const bindings = Object.fromEntries(
			Object.entries( props.attributes.metadata?.bindings || {} ).filter(
				( [ attrName ] ) => canBindAttribute( props.name, attrName )
			)
		);

		return (
			<>
				{ Object.keys( bindings ).length > 0 && (
					<BlockBindingBridge
						blockProps={ props }
						bindings={ bindings }
					/>
				) }

				<BlockEdit { ...props } />
			</>
		);
	},
	'withBlockBindingSupport'
);

/**
 * Filters a registered block's settings to enhance a block's `edit` component
 * to upgrade bound attributes.
 *
 * @param {WPBlockSettings} settings - Registered block settings.
 * @param {string}          name     - Block name.
 * @return {WPBlockSettings} Filtered block settings.
 */
function shimAttributeSource( settings, name ) {
	if ( ! canBindBlock( name ) ) {
		return settings;
	}

	return {
		...settings,
		edit: withBlockBindingSupport( settings.edit ),
	};
}

addFilter(
	'blocks.registerBlockType',
	'core/editor/custom-sources-backwards-compatibility/shim-attribute-source',
	shimAttributeSource
);
