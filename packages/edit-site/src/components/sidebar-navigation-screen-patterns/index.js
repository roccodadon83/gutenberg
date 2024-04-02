/**
 * WordPress dependencies
 */
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
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

function CategoriesGroup( {
	templatePartAreas,
	patternCategories,
	currentCategory,
	currentType,
} ) {
	const [ allPatterns, ...otherPatterns ] = patternCategories;

	return (
		<ItemGroup className="edit-site-sidebar-navigation-screen-patterns__group">
			{ allPatterns && (
				<CategoryItem
					key={ allPatterns.name }
					count={ allPatterns.count }
					label={ allPatterns.label }
					icon={ file }
					id={ allPatterns.name }
					type="pattern"
					isActive={
						currentCategory === `${ allPatterns.name }` &&
						( currentType === PATTERN_TYPES.theme ||
							currentType === PATTERN_TYPES.user )
					}
				/>
			) }
			{ Object.entries( templatePartAreas ).map(
				( [ area, { label, templateParts } ] ) => (
					<CategoryItem
						key={ area }
						count={ templateParts?.length }
						icon={ getTemplatePartIcon( area ) }
						label={ label }
						id={ area }
						type={ TEMPLATE_PART_POST_TYPE }
						isActive={
							currentCategory === area &&
							currentType === TEMPLATE_PART_POST_TYPE
						}
					/>
				)
			) }
			{ otherPatterns.map( ( category ) => (
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
							<CategoriesGroup
								templatePartAreas={ templatePartAreas }
								patternCategories={ patternCategories }
								currentCategory={ currentCategory }
								currentType={ currentType }
							/>
						</>
					) }
				</>
			}
		/>
	);
}
