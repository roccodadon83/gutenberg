"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[4185],{"./packages/components/src/utils/config-values.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _space__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/utils/space.ts"),_colors_values__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/components/src/utils/colors-values.js");const CONTROL_PROPS={controlSurfaceColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,controlTextActiveColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.theme.accent,controlPaddingX:"12px",controlPaddingXLarge:"calc(12px * 1.3334)",controlPaddingXSmall:"calc(12px / 1.3334)",controlBackgroundColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,controlBorderRadius:"2px",controlBoxShadow:"transparent",controlBoxShadowFocus:`0 0 0 0.5px ${_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.theme.accent}`,controlDestructiveBorderColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.alert.red,controlHeight:"36px",controlHeightXSmall:"calc( 36px * 0.6 )",controlHeightSmall:"calc( 36px * 0.8 )",controlHeightLarge:"calc( 36px * 1.2 )",controlHeightXLarge:"calc( 36px * 1.4 )"},TOGGLE_GROUP_CONTROL_PROPS={toggleGroupControlBackgroundColor:CONTROL_PROPS.controlBackgroundColor,toggleGroupControlBorderColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.ui.border,toggleGroupControlBackdropBackgroundColor:CONTROL_PROPS.controlSurfaceColor,toggleGroupControlBackdropBorderColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.ui.border,toggleGroupControlButtonColorActive:CONTROL_PROPS.controlBackgroundColor},__WEBPACK_DEFAULT_EXPORT__=Object.assign({},CONTROL_PROPS,TOGGLE_GROUP_CONTROL_PROPS,{colorDivider:"rgba(0, 0, 0, 0.1)",colorScrollbarThumb:"rgba(0, 0, 0, 0.2)",colorScrollbarThumbHover:"rgba(0, 0, 0, 0.5)",colorScrollbarTrack:"rgba(0, 0, 0, 0.04)",elevationIntensity:1,radiusBlockUi:"2px",borderWidth:"1px",borderWidthFocus:"1.5px",borderWidthTab:"4px",spinnerSize:16,fontSize:"13px",fontSizeH1:"calc(2.44 * 13px)",fontSizeH2:"calc(1.95 * 13px)",fontSizeH3:"calc(1.56 * 13px)",fontSizeH4:"calc(1.25 * 13px)",fontSizeH5:"13px",fontSizeH6:"calc(0.8 * 13px)",fontSizeInputMobile:"16px",fontSizeMobile:"15px",fontSizeSmall:"calc(0.92 * 13px)",fontSizeXSmall:"calc(0.75 * 13px)",fontLineHeightBase:"1.4",fontWeight:"normal",fontWeightHeading:"600",gridBase:"4px",cardBorderRadius:"2px",cardPaddingXSmall:`${(0,_space__WEBPACK_IMPORTED_MODULE_1__.D)(2)}`,cardPaddingSmall:`${(0,_space__WEBPACK_IMPORTED_MODULE_1__.D)(4)}`,cardPaddingMedium:`${(0,_space__WEBPACK_IMPORTED_MODULE_1__.D)(4)} ${(0,_space__WEBPACK_IMPORTED_MODULE_1__.D)(6)}`,cardPaddingLarge:`${(0,_space__WEBPACK_IMPORTED_MODULE_1__.D)(6)} ${(0,_space__WEBPACK_IMPORTED_MODULE_1__.D)(8)}`,popoverShadow:"0 0.7px 1px rgba(0, 0, 0, 0.1), 0 1.2px 1.7px -0.2px rgba(0, 0, 0, 0.1), 0 2.3px 3.3px -0.5px rgba(0, 0, 0, 0.1)",surfaceBackgroundColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,surfaceBackgroundSubtleColor:"#F3F3F3",surfaceBackgroundTintColor:"#F5F5F5",surfaceBorderColor:"rgba(0, 0, 0, 0.1)",surfaceBorderBoldColor:"rgba(0, 0, 0, 0.15)",surfaceBorderSubtleColor:"rgba(0, 0, 0, 0.05)",surfaceBackgroundTertiaryColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,surfaceColor:_colors_values__WEBPACK_IMPORTED_MODULE_0__.D.white,transitionDuration:"200ms",transitionDurationFast:"160ms",transitionDurationFaster:"120ms",transitionDurationFastest:"100ms",transitionTimingFunction:"cubic-bezier(0.08, 0.52, 0.52, 1)",transitionTimingFunctionControl:"cubic-bezier(0.12, 0.8, 0.32, 1)"})},"./packages/icons/build-module/icon/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((function Icon({icon,size=24,...props},ref){return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon,{width:size,height:size,...props,ref})}))},"./packages/icons/build-module/library/chevron-down.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/primitives/build-module/svg/index.js");const __WEBPACK_DEFAULT_EXPORT__=(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Wj,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.y$,{d:"M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"}))},"./packages/components/src/utils/space.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{D:()=>space});const GRID_BASE="4px";function space(value){if(void 0===value)return;if(!value)return"0";const asInt="number"==typeof value?value:Number(value);return"undefined"!=typeof window&&window.CSS?.supports?.("margin",value.toString())||Number.isNaN(asInt)?value.toString():`calc(${GRID_BASE} * ${value})`}},"./packages/components/src/custom-select-control-v2/stories/default.story.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomSelectedValue:()=>CustomSelectedValue,Default:()=>Default,MultipleSelection:()=>MultipleSelection,default:()=>default_story});var react=__webpack_require__("./node_modules/react/index.js"),FMVHAVXA=__webpack_require__("./node_modules/@ariakit/react-core/esm/__chunks/FMVHAVXA.js"),custom_select=__webpack_require__("./packages/components/src/custom-select-control-v2/custom-select.tsx"),item=__webpack_require__("./packages/components/src/custom-select-control-v2/item.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function CustomSelectControlV2(props){const{defaultValue,onChange,value,...restProps}=props,store=FMVHAVXA.I({setValue:nextValue=>onChange?.(nextValue),defaultValue,value});return(0,jsx_runtime.jsx)(custom_select.Z,{...restProps,store})}CustomSelectControlV2.displayName="CustomSelectControlV2",CustomSelectControlV2.Item=item.C;const default_component=CustomSelectControlV2;try{CustomSelectControlV2.displayName="CustomSelectControlV2",CustomSelectControlV2.__docgenInfo={description:"",displayName:"CustomSelectControlV2",props:{children:{defaultValue:null,description:"The child elements. This should be composed of `CustomSelectItem` components.",name:"children",required:!0,type:{name:"ReactNode"}},hideLabelFromVision:{defaultValue:{value:"false"},description:"Used to visually hide the label. It will always be visible to screen readers.",name:"hideLabelFromVision",required:!1,type:{name:"boolean"}},label:{defaultValue:null,description:"Accessible label for the control.",name:"label",required:!0,type:{name:"string"}},defaultValue:{defaultValue:null,description:"An optional default value for the control when used in uncontrolled mode.\nIf left `undefined`, the first non-disabled item will be used.",name:"defaultValue",required:!1,type:{name:"string | string[]"}},onChange:{defaultValue:null,description:"A function that receives the new value of the input.",name:"onChange",required:!1,type:{name:"(newValue: string | string[]) => void"}},value:{defaultValue:null,description:"The value of the control when used in uncontrolled mode.",name:"value",required:!1,type:{name:"string | string[]"}},renderSelectedValue:{defaultValue:null,description:"Can be used to render select UI with custom styled values.",name:"renderSelectedValue",required:!1,type:{name:"(selectedValue: string | string[]) => ReactNode"}},size:{defaultValue:{value:"'default'"},description:"The size of the control.",name:"size",required:!1,type:{name:"enum",value:[{value:'"default"'},{value:'"compact"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/custom-select-control-v2/default-component/index.tsx#CustomSelectControlV2"]={docgenInfo:CustomSelectControlV2.__docgenInfo,name:"CustomSelectControlV2",path:"packages/components/src/custom-select-control-v2/default-component/index.tsx#CustomSelectControlV2"})}catch(__react_docgen_typescript_loader_error){}const default_story={title:"Components (Experimental)/CustomSelectControl v2/Default",component:default_component,subcomponents:{"CustomSelectControlV2.Item":default_component.Item},argTypes:{children:{control:{type:null}},value:{control:{type:null}}},tags:["status-wip"],parameters:{sourceLink:"packages/components/src/custom-select-control-v2",badges:["wip"],actions:{argTypesRegex:"^on.*"},controls:{expanded:!0},docs:{source:{excludeDecorators:!0}}},decorators:[Story=>(0,jsx_runtime.jsx)("div",{style:{minHeight:"150px"},children:(0,jsx_runtime.jsx)(Story,{})})]},Template=props=>{const[value,setValue]=(0,react.useState)();return(0,jsx_runtime.jsx)(default_component,{...props,onChange:nextValue=>{setValue(nextValue),props.onChange?.(nextValue)},value})};Template.displayName="Template";const Default=Template.bind({});Default.args={label:"Label text",defaultValue:"Select a color...",children:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(default_component.Item,{value:"Blue",children:(0,jsx_runtime.jsx)("span",{style:{color:"blue"},children:"Blue"})}),(0,jsx_runtime.jsx)(default_component.Item,{value:"Purple",children:(0,jsx_runtime.jsx)("span",{style:{color:"purple"},children:"Purple"})}),(0,jsx_runtime.jsx)(default_component.Item,{value:"Pink",children:(0,jsx_runtime.jsx)("span",{style:{color:"deeppink"},children:"Pink"})})]})};const MultipleSelection=Template.bind({});MultipleSelection.args={label:"Select Colors",defaultValue:["lavender","tangerine"],children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:["amber","aquamarine","flamingo pink","lavender","maroon","tangerine"].map((item=>(0,jsx_runtime.jsx)(default_component.Item,{value:item,children:item},item)))})};const renderItem=gravatar=>{const avatar=`https://gravatar.com/avatar?d=${gravatar}`;return(0,jsx_runtime.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[(0,jsx_runtime.jsx)("img",{style:{maxHeight:"75px",marginRight:"10px"},src:avatar,alt:""}),(0,jsx_runtime.jsx)("span",{children:gravatar})]})};renderItem.displayName="renderItem";const CustomSelectedValue=Template.bind({});CustomSelectedValue.args={label:"Default Gravatars",renderSelectedValue:renderItem,children:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:["mystery-person","identicon","wavatar","retro"].map((option=>(0,jsx_runtime.jsx)(default_component.Item,{value:option,children:renderItem(option)},option)))})},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"props => {\n  const [value, setValue] = useState<string | string[]>();\n  return <CustomSelectControlV2 {...props} onChange={(nextValue: string | string[]) => {\n    setValue(nextValue);\n    props.onChange?.(nextValue);\n  }} value={value} />;\n}",...Default.parameters?.docs?.source}}},MultipleSelection.parameters={...MultipleSelection.parameters,docs:{...MultipleSelection.parameters?.docs,source:{originalSource:"props => {\n  const [value, setValue] = useState<string | string[]>();\n  return <CustomSelectControlV2 {...props} onChange={(nextValue: string | string[]) => {\n    setValue(nextValue);\n    props.onChange?.(nextValue);\n  }} value={value} />;\n}",...MultipleSelection.parameters?.docs?.source},description:{story:"Multiple selection can be enabled by using an array for the `value` and\n`defaultValue` props. The argument type of the `onChange` function will also\nchange accordingly.",...MultipleSelection.parameters?.docs?.description}}},CustomSelectedValue.parameters={...CustomSelectedValue.parameters,docs:{...CustomSelectedValue.parameters?.docs,source:{originalSource:"props => {\n  const [value, setValue] = useState<string | string[]>();\n  return <CustomSelectControlV2 {...props} onChange={(nextValue: string | string[]) => {\n    setValue(nextValue);\n    props.onChange?.(nextValue);\n  }} value={value} />;\n}",...CustomSelectedValue.parameters?.docs?.source},description:{story:"The `renderSelectedValue` prop can be used to customize how the selected value\nis rendered in the dropdown trigger.",...CustomSelectedValue.parameters?.docs?.description}}};try{MultipleSelection.displayName="MultipleSelection",MultipleSelection.__docgenInfo={description:"Multiple selection can be enabled by using an array for the `value` and\n`defaultValue` props. The argument type of the `onChange` function will also\nchange accordingly.",displayName:"MultipleSelection",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/custom-select-control-v2/stories/default.story.tsx#MultipleSelection"]={docgenInfo:MultipleSelection.__docgenInfo,name:"MultipleSelection",path:"packages/components/src/custom-select-control-v2/stories/default.story.tsx#MultipleSelection"})}catch(__react_docgen_typescript_loader_error){}try{CustomSelectedValue.displayName="CustomSelectedValue",CustomSelectedValue.__docgenInfo={description:"The `renderSelectedValue` prop can be used to customize how the selected value\nis rendered in the dropdown trigger.",displayName:"CustomSelectedValue",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/custom-select-control-v2/stories/default.story.tsx#CustomSelectedValue"]={docgenInfo:CustomSelectedValue.__docgenInfo,name:"CustomSelectedValue",path:"packages/components/src/custom-select-control-v2/stories/default.story.tsx#CustomSelectedValue"})}catch(__react_docgen_typescript_loader_error){}}}]);