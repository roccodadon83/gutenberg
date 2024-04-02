/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
	__experimentalHeading as Heading,
} from '@wordpress/components';
import { getTemplatePartIcon } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import { getQueryArgs } from '@wordpress/url';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { file } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import AddNewPattern from '../add-new-pattern';
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import CategoryItem from './category-item';
import {
	PATTERN_DEFAULT_CATEGORY,
	PATTERN_TYPES,
	TEMPLATE_PART_POST_TYPE,
} from '../../utils/constants';
import usePatternCategories from './use-pattern-categories';
import useTemplatePartAreas from './use-template-part-areas';

function TemplatePartGroup( { areas, currentArea, currentType } ) {
	return (
		<>
			<div className="edit-site-sidebar-navigation-screen-patterns__group-header">
				<Heading level={ 2 }>{ __( 'Template parts' ) }</Heading>
			</div>
			<ItemGroup className="edit-site-sidebar-navigation-screen-patterns__group">
				{ Object.entries( areas ).map(
					( [ area, { label, templateParts } ] ) => (
						<CategoryItem
							key={ area }
							count={ templateParts?.length }
							icon={ getTemplatePartIcon( area ) }
							label={ label }
							id={ area }
							type={ TEMPLATE_PART_POST_TYPE }
							isActive={
								currentArea === area &&
								currentType === TEMPLATE_PART_POST_TYPE
							}
						/>
					)
				) }
			</ItemGroup>
		</>
	);
}

function PatternCategoriesGroup( {
	categories,
	currentCategory,
	currentType,
} ) {
	return (
		<>
			<ItemGroup className="edit-site-sidebar-navigation-screen-patterns__group">
				{ categories.map( ( category ) => (
					<CategoryItem
						key={ category.name }
						count={ category.count }
						label={ category.label }
						icon={ file }
						id={ category.name }
						type="pattern"
						isActive={
							currentCategory === `${ category.name }` &&
							( currentType === PATTERN_TYPES.theme ||
								currentType === PATTERN_TYPES.user )
						}
					/>
				) ) }
			</ItemGroup>
		</>
	);
}

export default function SidebarNavigationScreenPatterns() {
	const { categoryType, categoryId } = getQueryArgs( window.location.href );
	const currentCategory = categoryId || PATTERN_DEFAULT_CATEGORY;
	const currentType = categoryType || PATTERN_TYPES.theme;

	const { templatePartAreas, hasTemplateParts, isLoading } =
		useTemplatePartAreas();
	const { patternCategories, hasPatterns } = usePatternCategories();
	const isBlockBasedTheme = useSelect(
		( select ) => select( coreStore ).getCurrentTheme()?.is_block_theme,
		[]
	);

	return (
		<SidebarNavigationScreen
			isRoot={ ! isBlockBasedTheme }
			title={ __( 'Patterns' ) }
			description={ __(
				'Manage what patterns are available when editing the site.'
			) }
			actions={ <AddNewPattern /> }
			content={
				<>
					{ isLoading && __( 'Loading patterns…' ) }
					{ ! isLoading && (
						<>
							{ ! hasTemplateParts && ! hasPatterns && (
								<ItemGroup className="edit-site-sidebar-navigation-screen-patterns__group">
									<Item>
										{ __(
											'No template parts or patterns found'
										) }
									</Item>
								</ItemGroup>
							) }
							{ hasPatterns && (
								<PatternCategoriesGroup
									categories={ patternCategories }
									currentCategory={ currentCategory }
									currentType={ currentType }
								/>
							) }
							{ hasTemplateParts && (
								<TemplatePartGroup
									areas={ templatePartAreas }
									currentArea={ currentCategory }
									currentType={ currentType }
								/>
							) }
						</>
					) }
				</>
			}
		/>
	);
}
