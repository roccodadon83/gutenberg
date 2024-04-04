/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';

export default function PublishButtonLabel() {
	const {
		isPublished,
		isBeingScheduled,
		isSaving,
		isPublishing,
		hasPublishAction,
		isAutosaving,
		hasNonPostEntityChanges,
	} = useSelect( ( select ) => {
		const {
			isCurrentPostPublished,
			isEditedPostBeingScheduled,
			isSavingPost,
			isPublishingPost,
			getCurrentPost,
			getCurrentPostType,
			isAutosavingPost,
		} = select( editorStore );
		return {
			isPublished: isCurrentPostPublished(),
			isBeingScheduled: isEditedPostBeingScheduled(),
			isSaving: isSavingPost(),
			isPublishing: isPublishingPost(),
			hasPublishAction:
				getCurrentPost()._links?.[ 'wp:action-publish' ] ?? false,
			postType: getCurrentPostType(),
			isAutosaving: isAutosavingPost(),
			hasNonPostEntityChanges:
				select( editorStore ).hasNonPostEntityChanges(),
		};
	}, [] );
	if ( isPublishing ) {
		/* translators: button label text should, if possible, be under 16 characters. */
		return __( 'Publishing' );
	} else if ( isPublished && isSaving && ! isAutosaving ) {
		/* translators: button label text should, if possible, be under 16 characters. */
		return __( 'Savining' );
	} else if ( isBeingScheduled && isSaving && ! isAutosaving ) {
		/* translators: button label text should, if possible, be under 16 characters. */
		return __( 'Scheduling' );
	}
	if ( ! hasPublishAction ) {
		return hasNonPostEntityChanges
			? __( 'Submit for Review…' )
			: __( 'Submit for Review' );
	}
	if ( isPublished || hasNonPostEntityChanges ) {
		return __( 'Save' );
	}
	if ( isBeingScheduled ) {
		return hasNonPostEntityChanges ? __( 'Save' ) : __( 'Schedule' );
	}
	return __( 'Publish' );
}
