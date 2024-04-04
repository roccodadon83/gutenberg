/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
	Button,
	CheckboxControl,
	Dropdown,
	__experimentalTruncate as Truncate,
	__experimentalText as Text,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	TextControl,
	RadioControl,
	Icon,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	useState,
	useMemo,
	createInterpolateElement,
} from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import { dateI18n, getDate, humanTimeDiff } from '@wordpress/date';
import { key } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

function PostStatusLabel() {
	const { status, date, isProtected } = useSelect( ( select ) => {
		const { getEditedPostAttribute } = select( editorStore );
		return {
			status: getEditedPostAttribute( 'status' ),
			date: getEditedPostAttribute( 'date' ),
			isProtected: !! getEditedPostAttribute( 'password' ),
		};
	}, [] );
	const relateToNow = humanTimeDiff( date );
	let statusLabel;
	switch ( status ) {
		case 'publish':
			statusLabel = createInterpolateElement(
				sprintf(
					/* translators: %s: is the relative time when the post was published. */
					__( 'Published <time>%s</time>' ),
					relateToNow
				),
				{ time: <time dateTime={ date } /> }
			);
			break;
		case 'future':
			const formattedDate = dateI18n( 'F j', getDate( date ) );
			statusLabel = date
				? createInterpolateElement(
						sprintf(
							/* translators: %s: is the formatted date and time on which the post is scheduled to be published. */
							__( 'Scheduled to publish in <time>%s</time>' ),
							formattedDate
						),
						{ time: <time dateTime={ date } /> }
				  )
				: __( 'Scheduled' );
			break;
		case 'draft':
			statusLabel = __( 'Draft' );
			break;
		case 'pending':
			statusLabel = __( 'Pending review' );
			break;
		case 'private':
			statusLabel = createInterpolateElement(
				sprintf(
					/* translators: %s: is the relative time when the post was published. */
					__( 'Published privately <time>%s</time>' ),
					relateToNow
				),
				{ time: <time dateTime={ date } /> }
			);
			break;
	}
	// TODO: this needs style adjustments to truncate properly..
	return (
		<HStack
			expanded={ false }
			spacing={ 0 }
			justify="flex-start"
			className={ classnames( 'editor-post-status-label', {
				[ ` has-status-${ status }` ]: !! status,
				'has-password': isProtected,
			} ) }
		>
			<Truncate>{ statusLabel }</Truncate>
			{ isProtected && <Icon icon={ key } /> }
		</HStack>
	);
}

const STATUS_OPTIONS = [
	{
		label: (
			<>
				{ __( 'Draft' ) }
				<Text variant="muted" size={ 12 }>
					{ __( 'Not ready to publish.' ) }
				</Text>
			</>
		),
		value: 'draft',
	},
	{
		label: (
			<>
				{ __( 'Pending' ) }
				<Text variant="muted" size={ 12 }>
					{ __( 'Waiting for review before publishing.' ) }
				</Text>
			</>
		),
		value: 'pending',
	},
	{
		label: (
			<>
				{ __( 'Private' ) }
				<Text variant="muted" size={ 12 }>
					{ __( 'Only visible to site admins and editors.' ) }
				</Text>
			</>
		),
		value: 'private',
	},
	{
		label: (
			<>
				{ __( 'Scheduled' ) }
				<Text variant="muted" size={ 12 }>
					{ __( 'Publish automatically on a chosen date.' ) }
				</Text>
			</>
		),
		value: 'future',
	},
	{
		label: (
			<>
				{ __( 'Published' ) }
				<Text variant="muted" size={ 12 }>
					{ __( 'Visible to everyone.' ) }
				</Text>
			</>
		),
		value: 'publish',
	},
];

export default function PostStatus() {
	const { status, date, password, postId, postType } = useSelect(
		( select ) => {
			const {
				getEditedPostAttribute,
				getCurrentPostId,
				getCurrentPostType,
			} = select( editorStore );
			// const post = select( editorStore ).getCurrentPost();
			return {
				status: getEditedPostAttribute( 'status' ),
				date: getEditedPostAttribute( 'date' ),
				password: getEditedPostAttribute( 'password' ),
				postId: getCurrentPostId(),
				postType: getCurrentPostType(),
			};
		},
		[]
	);
	const [ showPassword, setShowPassword ] = useState( !! password );
	const passwordInputId = useInstanceId(
		PostStatus,
		'editor-change-status__password-input'
	);
	const { editEntityRecord } = useDispatch( coreStore );
	const { createErrorNotice } = useDispatch( noticesStore );
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );
	// Memoize popoverProps to avoid returning a new object every time.
	const popoverProps = useMemo(
		() => ( {
			// Anchor the popover to the middle of the entire row so that it doesn't
			// move around when the label changes.
			anchor: popoverAnchor,
			'aria-label': __( 'Status & visibility' ),
			headerTitle: __( 'Status & visibility' ),
			placement: 'left-start',
			offset: 36,
			shift: true,
		} ),
		[ popoverAnchor ]
	);

	const updatePost = async ( {
		status: newStatus = status,
		password: newPassword = password,
		date: newDate = date,
	} ) => {
		try {
			await editEntityRecord( 'postType', postType, postId, {
				status: newStatus,
				date: newDate,
				password: newPassword,
			} );
		} catch ( error ) {
			const errorMessage =
				error.message && error.code !== 'unknown_error'
					? error.message
					: __( 'An error occurred while updating the status' );

			createErrorNotice( errorMessage, {
				type: 'snackbar',
			} );
		}
	};

	const handleTogglePassword = ( value ) => {
		setShowPassword( value );
		if ( ! value ) {
			updatePost( { password: '' } );
		}
	};

	const handleStatus = ( value ) => {
		let newDate = date;
		let newPassword = password;
		if ( [ 'publish', 'draft' ].includes( value ) ) {
			if ( new Date( date ) > new Date() ) {
				newDate = new Date();
			}
		} else if ( value === 'future' ) {
			if ( ! date || new Date( date ) < new Date() ) {
				newDate = new Date();
				newDate.setDate( newDate.getDate() + 7 );
			}
		} else if ( value === 'private' && password ) {
			setShowPassword( false );
			newPassword = '';
		}
		updatePost( {
			status: value,
			date: newDate,
			password: newPassword,
		} );
	};

	return (
		<Dropdown
			className="editor-post-status"
			contentClassName="editor-change-status__content"
			popoverProps={ popoverProps }
			focusOnMount
			ref={ setPopoverAnchor }
			renderToggle={ ( { onToggle } ) => (
				<Button
					className="editor-post-status-trigger"
					onClick={ onToggle }
				>
					<PostStatusLabel />
				</Button>
			) }
			renderContent={ ( { onClose } ) => (
				<>
					<InspectorPopoverHeader
						title={ __( 'Status & visibility' ) }
						onClose={ onClose }
					/>
					<form>
						<VStack spacing={ 4 }>
							<RadioControl
								className="editor-change-status__options"
								hideLabelFromVision
								label={ __( 'Status' ) }
								options={ STATUS_OPTIONS }
								onChange={ handleStatus }
								selected={ status }
							/>
							{ status !== 'private' && (
								<VStack
									as="fieldset"
									spacing={ 4 }
									className="editor-change-status__password-fieldset"
								>
									<CheckboxControl
										__nextHasNoMarginBottom
										label={ __( 'Password protected' ) }
										help={ __(
											'Only visible to those who know the password'
										) }
										checked={ showPassword }
										onChange={ handleTogglePassword }
									/>
									{ showPassword && (
										<div className="editor-change-status__password-input">
											<TextControl
												label={ __( 'Password' ) }
												onChange={ ( value ) =>
													updatePost( {
														password: value,
													} )
												}
												value={ password }
												placeholder={ __(
													'Use a secure password'
												) }
												type="text"
												id={ passwordInputId }
												__next40pxDefaultSize
												__nextHasNoMarginBottom
											/>
										</div>
									) }
								</VStack>
							) }
						</VStack>
					</form>
				</>
			) }
		/>
	);
}
