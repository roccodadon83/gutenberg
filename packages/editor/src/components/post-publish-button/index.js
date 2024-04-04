/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { Component, createRef } from '@wordpress/element';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import PublishButtonLabel from './label';
import { store as editorStore } from '../../store';

const noop = () => {};

export class PostPublishButton extends Component {
	constructor( props ) {
		super( props );
		this.buttonNode = createRef();

		this.createOnClick = this.createOnClick.bind( this );
		this.closeEntitiesSavedStates =
			this.closeEntitiesSavedStates.bind( this );

		this.state = {
			entitiesSavedStatesCallback: false,
		};
	}

	componentDidMount() {
		if ( this.props.focusOnMount ) {
			// This timeout is necessary to make sure the `useEffect` hook of
			// `useFocusReturn` gets the correct element (the button that opens the
			// PostPublishPanel) otherwise it will get this button.
			this.timeoutID = setTimeout( () => {
				this.buttonNode.current.focus();
			}, 0 );
		}
	}

	componentWillUnmount() {
		clearTimeout( this.timeoutID );
	}

	// TODO: we need when:
	// 1. we have changes in more entities
	// 2. changed status to `publish`
	// Open save changes and maybe then open the publish panel
	createOnClick( callback ) {
		return ( ...args ) => {
			const { hasNonPostEntityChanges, setEntitiesSavedStatesCallback } =
				this.props;
			// If a post with non-post entities is published, but the user
			// elects to not save changes to the non-post entities, those
			// entities will still be dirty when the Publish button is clicked.
			// We also need to check that the `setEntitiesSavedStatesCallback`
			// prop was passed. See https://github.com/WordPress/gutenberg/pull/37383
			if ( hasNonPostEntityChanges && setEntitiesSavedStatesCallback ) {
				// The modal for multiple entity saving will open,
				// hold the callback for saving/publishing the post
				// so that we can call it if the post entity is checked.
				this.setState( {
					entitiesSavedStatesCallback: () => callback( ...args ),
				} );

				// Open the save panel by setting its callback.
				// To set a function on the useState hook, we must set it
				// with another function (() => myFunction). Passing the
				// function on its own will cause an error when called.
				setEntitiesSavedStatesCallback(
					() => this.closeEntitiesSavedStates
				);
				return noop;
			}

			return callback( ...args );
		};
	}

	closeEntitiesSavedStates( savedEntities ) {
		const { postType, postId } = this.props;
		const { entitiesSavedStatesCallback } = this.state;
		this.setState( { entitiesSavedStatesCallback: false }, () => {
			if (
				savedEntities &&
				savedEntities.some(
					( elt ) =>
						elt.kind === 'postType' &&
						elt.name === postType &&
						elt.key === postId
				)
			) {
				// The post entity was checked, call the held callback from `createOnClick`.
				entitiesSavedStatesCallback();
			}
		} );
	}

	render() {
		const {
			forceIsDirty,
			hasPublishAction,
			isBeingScheduled,
			isOpen,
			isPostSavingLocked,
			isPublishable,
			isPublished,
			isSaveable,
			isSaving,
			isAutoSaving,
			isToggle,
			onSave,
			onStatusChange,
			onSubmit = noop,
			onToggle,
			visibility,
			hasNonPostEntityChanges,
			isSavingNonPostEntityChanges,
			postStatus,
		} = this.props;

		const isButtonDisabled =
			( isSaving ||
				! isSaveable ||
				isPostSavingLocked ||
				( ! isPublishable && ! forceIsDirty ) ) &&
			( ! hasNonPostEntityChanges || isSavingNonPostEntityChanges );

		const isToggleDisabled =
			( isPublished ||
				isSaving ||
				! isSaveable ||
				( ! isPublishable && ! forceIsDirty ) ) &&
			( ! hasNonPostEntityChanges || isSavingNonPostEntityChanges );

		// TODO: this needs changes...
		// and probably should be removed and get the status from the post..
		// let publishStatus = 'publish';
		// if ( ! hasPublishAction ) {
		// 	publishStatus = 'pending';
		// } else if ( visibility === 'private' ) {
		// 	publishStatus = 'private';
		// } else if ( isBeingScheduled ) {
		// 	publishStatus = 'future';
		// } else if ( postStatus === 'draft' ) {
		// 	publishStatus = postStatus;
		// }

		// TODO: Here we open the save panel, but we need
		// to also check if we have edited the status to
		// at least `publish`.
		// What do then? Open the publish panel at some point or
		// save/publish directly? Or something else?
		const onClickButton = () => {
			if ( isButtonDisabled ) {
				return;
			}
			onSubmit();
			// TODO: this needs changes...
			// onStatusChange( publishStatus );
			onSave();
		};

		// Callback to open the publish panel.
		const onClickToggle = () => {
			if ( isToggleDisabled ) {
				return;
			}
			onToggle();
		};

		const buttonProps = {
			'aria-disabled': isButtonDisabled,
			className: 'editor-post-publish-button',
			isBusy: ! isAutoSaving && isSaving,
			variant: 'primary',
			onClick: this.createOnClick( onClickButton ),
		};

		const toggleProps = {
			'aria-disabled': isToggleDisabled,
			'aria-expanded': isOpen,
			className: 'editor-post-publish-panel__toggle',
			isBusy: isSaving && isPublished,
			variant: 'primary',
			size: 'compact',
			onClick: this.createOnClick( onClickToggle ),
		};
		// TODO: properly check what is the difference with toggle(PostPublishButtonOrToggle)..
		const componentProps = isToggle ? toggleProps : buttonProps;
		// const componentChildren = isToggle ? toggleChildren : buttonChildren;
		const componentChildren = <PublishButtonLabel />;
		return (
			<>
				<Button
					ref={ this.buttonNode }
					{ ...componentProps }
					className={ `${ componentProps.className } editor-post-publish-button__button` }
					size="compact"
				>
					{ componentChildren }
				</Button>
			</>
		);
	}
}

export default compose( [
	withSelect( ( select ) => {
		const {
			isSavingPost,
			isAutosavingPost,
			isEditedPostBeingScheduled,
			getEditedPostVisibility,
			isCurrentPostPublished,
			isEditedPostSaveable,
			isEditedPostPublishable,
			isPostSavingLocked,
			getCurrentPost,
			getCurrentPostType,
			getCurrentPostId,
			hasNonPostEntityChanges,
			isSavingNonPostEntityChanges,
			getEditedPostAttribute,
		} = select( editorStore );
		return {
			isSaving: isSavingPost(),
			isAutoSaving: isAutosavingPost(),
			isBeingScheduled: isEditedPostBeingScheduled(),
			visibility: getEditedPostVisibility(),
			isSaveable: isEditedPostSaveable(),
			isPostSavingLocked: isPostSavingLocked(),
			isPublishable: isEditedPostPublishable(),
			isPublished: isCurrentPostPublished(),
			hasPublishAction:
				getCurrentPost()._links?.[ 'wp:action-publish' ] ?? false,
			postType: getCurrentPostType(),
			postId: getCurrentPostId(),
			postStatus: getEditedPostAttribute( 'status' ),
			hasNonPostEntityChanges: hasNonPostEntityChanges(),
			isSavingNonPostEntityChanges: isSavingNonPostEntityChanges(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost, savePost } = dispatch( editorStore );
		return {
			onStatusChange: ( status ) =>
				editPost( { status }, { undoIgnore: true } ),
			onSave: savePost,
		};
	} ),
] )( PostPublishButton );
