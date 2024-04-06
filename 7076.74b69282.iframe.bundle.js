"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[7076],{"./packages/components/build-module/unit-control/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{ZP:()=>unit_control});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),build_module=__webpack_require__("./packages/deprecated/build-module/index.js"),i18n_build_module=__webpack_require__("./packages/i18n/build-module/index.js"),unit_control_styles=__webpack_require__("./packages/components/build-module/unit-control/styles/unit-control-styles.js"),utils=__webpack_require__("./packages/components/build-module/unit-control/utils.js");const unit_select_control=(0,react.forwardRef)((function UnitSelectControl({className,isUnitSelectTabbable:isTabbable=!0,onChange,size="default",unit="px",units=utils.Ui,...props},ref){if(!(0,utils.wW)(units)||1===units?.length)return(0,react.createElement)(unit_control_styles.Vh,{className:"components-unit-control__unit-label",selectSize:size},unit);const classes=classnames_default()("components-unit-control__select",className);return(0,react.createElement)(unit_control_styles.mY,{ref,className:classes,onChange:event=>{const{value:unitValue}=event.target,data=units.find((option=>option.value===unitValue));onChange?.(unitValue,{event,data})},selectSize:size,tabIndex:isTabbable?void 0:-1,value:unit,...props},units.map((option=>(0,react.createElement)("option",{value:option.value,key:option.value},option.label))))}));var use_controlled_state=__webpack_require__("./packages/components/build-module/utils/hooks/use-controlled-state.js"),strings=__webpack_require__("./packages/components/build-module/utils/strings.js"),use_deprecated_props=__webpack_require__("./packages/components/build-module/utils/use-deprecated-props.js");const unit_control=(0,react.forwardRef)((function UnforwardedUnitControl(unitControlProps,forwardedRef){const{__unstableStateReducer,autoComplete="off",children,className,disabled=!1,disableUnits=!1,isPressEnterToChange=!1,isResetValueOnUnitChange=!1,isUnitSelectTabbable=!0,label,onChange:onChangeProp,onUnitChange,size="default",unit:unitProp,units:unitsProp=utils.Ui,value:valueProp,onFocus:onFocusProp,...props}=(0,use_deprecated_props.s)(unitControlProps);"unit"in unitControlProps&&(0,build_module.Z)("UnitControl unit prop",{since:"5.6",hint:"The unit should be provided within the `value` prop.",version:"6.2"});const nonNullValueProp=null!=valueProp?valueProp:void 0,[units,reFirstCharacterOfUnits]=(0,react.useMemo)((()=>{const list=(0,utils.e_)(nonNullValueProp,unitProp,unitsProp),[{value:firstUnitValue=""}={},...rest]=list,firstCharacters=rest.reduce(((carry,{value})=>{const first=(0,strings.hr)(value?.substring(0,1)||"");return carry.includes(first)?carry:`${carry}|${first}`}),(0,strings.hr)(firstUnitValue.substring(0,1)));return[list,new RegExp(`^(?:${firstCharacters})$`,"i")]}),[nonNullValueProp,unitProp,unitsProp]),[parsedQuantity,parsedUnit]=(0,utils.hy)(nonNullValueProp,unitProp,units),[unit,setUnit]=(0,use_controlled_state.Z)(1===units.length?units[0].value:unitProp,{initial:parsedUnit,fallback:""});(0,react.useEffect)((()=>{void 0!==parsedUnit&&setUnit(parsedUnit)}),[parsedUnit,setUnit]);const classes=classnames_default()("components-unit-control","components-unit-control-wrapper",className);let handleOnKeyDown;!disableUnits&&isUnitSelectTabbable&&units.length&&(handleOnKeyDown=event=>{props.onKeyDown?.(event),!event.metaKey&&reFirstCharacterOfUnits.test(event.key)&&refInputSuffix.current?.focus()});const refInputSuffix=(0,react.useRef)(null),inputSuffix=disableUnits?null:(0,react.createElement)(unit_select_control,{ref:refInputSuffix,"aria-label":(0,i18n_build_module.__)("Select unit"),disabled,isUnitSelectTabbable,onChange:(nextUnitValue,changeProps)=>{const{data}=changeProps;let nextValue=`${null!=parsedQuantity?parsedQuantity:""}${nextUnitValue}`;isResetValueOnUnitChange&&void 0!==data?.default&&(nextValue=`${data.default}${nextUnitValue}`),onChangeProp?.(nextValue,changeProps),onUnitChange?.(nextUnitValue,changeProps),setUnit(nextUnitValue)},size:["small","compact"].includes(size)||"default"===size&&!props.__next40pxDefaultSize?"small":"default",unit,units,onFocus:onFocusProp,onBlur:unitControlProps.onBlur});let step=props.step;if(!step&&units){var _activeUnit$step;const activeUnit=units.find((option=>option.value===unit));step=null!==(_activeUnit$step=activeUnit?.step)&&void 0!==_activeUnit$step?_activeUnit$step:1}return(0,react.createElement)(unit_control_styles.Ke,{...props,autoComplete,className:classes,disabled,spinControls:"none",isPressEnterToChange,label,onKeyDown:handleOnKeyDown,onChange:(nextQuantityValue,changeProps)=>{if(""===nextQuantityValue||null==nextQuantityValue)return void onChangeProp?.("",changeProps);const onChangeValue=(0,utils.Gl)(nextQuantityValue,units,parsedQuantity,unit).join("");onChangeProp?.(onChangeValue,changeProps)},ref:forwardedRef,size,suffix:inputSuffix,type:isPressEnterToChange?"text":"number",value:null!=parsedQuantity?parsedQuantity:"",step,onFocus:onFocusProp,__unstableStateReducer})}))},"./packages/components/build-module/unit-control/styles/unit-control-styles.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Ke:()=>ValueInput,Vh:()=>UnitLabel,mY:()=>UnitSelect});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_emotion_react__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),_utils__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/build-module/utils/colors-values.js"),_utils__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./packages/components/build-module/utils/rtl.js"),_utils__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./packages/components/build-module/utils/config-values.js"),_number_control__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/build-module/number-control/index.js"),_input_control_styles_input_control_styles__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/build-module/input-control/styles/input-control-styles.js"),_utils_space__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./packages/components/build-module/utils/space.js");const ValueInput=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)(_number_control__WEBPACK_IMPORTED_MODULE_1__.Z,{target:"e1bagdl32"})("&&&{input{display:block;width:100%;}",_input_control_styles_input_control_styles__WEBPACK_IMPORTED_MODULE_2__.Kg,"{transition:box-shadow 0.1s linear;}}"),baseUnitLabelStyles=({selectSize})=>({small:(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)("box-sizing:border-box;padding:2px 1px;width:20px;color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.gray[800],";font-size:8px;line-height:1;letter-spacing:-0.5px;text-transform:uppercase;text-align-last:center;","","",""),default:(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)("box-sizing:border-box;min-width:24px;max-width:48px;height:24px;margin-inline-end:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_5__.D)(2),";padding:",(0,_utils_space__WEBPACK_IMPORTED_MODULE_5__.D)(1),";color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.theme.accent,";font-size:13px;line-height:1;text-align-last:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;","","","")}[selectSize]),UnitLabel=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("div",{target:"e1bagdl31"})("&&&{pointer-events:none;",baseUnitLabelStyles,";color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.gray[900],";}"),unitSelectSizes=({selectSize="default"})=>({small:(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)("height:100%;border:1px solid transparent;transition:box-shadow 0.1s linear,border 0.1s linear;",(0,_utils__WEBPACK_IMPORTED_MODULE_6__.b)({borderTopLeftRadius:0,borderBottomLeftRadius:0})()," &:not(:disabled):hover{background-color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.gray[100],";}&:focus{border:1px solid ",_utils__WEBPACK_IMPORTED_MODULE_4__.D.ui.borderFocus,";box-shadow:inset 0 0 0 ",_utils__WEBPACK_IMPORTED_MODULE_7__.Z.borderWidth+" "+_utils__WEBPACK_IMPORTED_MODULE_4__.D.ui.borderFocus,";outline-offset:0;outline:2px solid transparent;z-index:1;}","","",""),default:(0,_emotion_react__WEBPACK_IMPORTED_MODULE_3__.iv)("display:flex;justify-content:center;align-items:center;&:hover{color:",_utils__WEBPACK_IMPORTED_MODULE_4__.D.ui.borderFocus,";box-shadow:inset 0 0 0 ",_utils__WEBPACK_IMPORTED_MODULE_7__.Z.borderWidth+" "+_utils__WEBPACK_IMPORTED_MODULE_4__.D.ui.borderFocus,";outline:",_utils__WEBPACK_IMPORTED_MODULE_7__.Z.borderWidth," solid transparent;}&:focus{box-shadow:0 0 0 ",_utils__WEBPACK_IMPORTED_MODULE_7__.Z.borderWidthFocus+" "+_utils__WEBPACK_IMPORTED_MODULE_4__.D.ui.borderFocus,";outline:",_utils__WEBPACK_IMPORTED_MODULE_7__.Z.borderWidthFocus," solid transparent;}","","","")}[selectSize]),UnitSelect=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("select",{target:"e1bagdl30"})("&&&{appearance:none;background:transparent;border-radius:2px;border:none;display:block;outline:none;margin:0;min-height:auto;font-family:inherit;",baseUnitLabelStyles,";",unitSelectSizes,";&:not( :disabled ){cursor:pointer;}}")},"./packages/components/build-module/unit-control/utils.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Gl:()=>getValidParsedQuantityAndUnit,Ui:()=>CSS_UNITS,YX:()=>parseQuantityAndUnitFromRawValue,e_:()=>getUnitsWithCurrentUnit,hy:()=>getParsedQuantityAndUnit,nj:()=>useCustomUnits,wW:()=>hasUnits});var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./packages/i18n/build-module/index.js");const isWeb="web"===__webpack_require__("./packages/element/build-module/platform.js").Z.OS,allUnits={px:{value:"px",label:isWeb?"px":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pixels (px)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pixels (px)"),step:1},"%":{value:"%",label:isWeb?"%":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Percentage (%)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Percent (%)"),step:.1},em:{value:"em",label:isWeb?"em":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Relative to parent font size (em)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)("ems","Relative to parent font size (em)"),step:.01},rem:{value:"rem",label:isWeb?"rem":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Relative to root font size (rem)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)("rems","Relative to root font size (rem)"),step:.01},vw:{value:"vw",label:isWeb?"vw":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport width (vw)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport width (vw)"),step:.1},vh:{value:"vh",label:isWeb?"vh":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport height (vh)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport height (vh)"),step:.1},vmin:{value:"vmin",label:isWeb?"vmin":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport smallest dimension (vmin)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport smallest dimension (vmin)"),step:.1},vmax:{value:"vmax",label:isWeb?"vmax":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport largest dimension (vmax)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport largest dimension (vmax)"),step:.1},ch:{value:"ch",label:isWeb?"ch":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Width of the zero (0) character (ch)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Width of the zero (0) character (ch)"),step:.01},ex:{value:"ex",label:isWeb?"ex":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("x-height of the font (ex)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("x-height of the font (ex)"),step:.01},cm:{value:"cm",label:isWeb?"cm":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Centimeters (cm)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Centimeters (cm)"),step:.001},mm:{value:"mm",label:isWeb?"mm":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Millimeters (mm)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Millimeters (mm)"),step:.1},in:{value:"in",label:isWeb?"in":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Inches (in)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Inches (in)"),step:.001},pc:{value:"pc",label:isWeb?"pc":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Picas (pc)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Picas (pc)"),step:1},pt:{value:"pt",label:isWeb?"pt":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Points (pt)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Points (pt)"),step:1},svw:{value:"svw",label:isWeb?"svw":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport width (svw)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport width (svw)"),step:.1},svh:{value:"svh",label:isWeb?"svh":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport height (svh)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport height (svh)"),step:.1},svi:{value:"svi",label:isWeb?"svi":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport smallest size in the inline direction (svi)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport width or height (svi)"),step:.1},svb:{value:"svb",label:isWeb?"svb":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Viewport smallest size in the block direction (svb)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport width or height (svb)"),step:.1},svmin:{value:"svmin",label:isWeb?"svmin":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport smallest dimension (svmin)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport smallest dimension (svmin)"),step:.1},lvw:{value:"lvw",label:isWeb?"lvw":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport width (lvw)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport width (lvw)"),step:.1},lvh:{value:"lvh",label:isWeb?"lvh":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport height (lvh)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport height (lvh)"),step:.1},lvi:{value:"lvi",label:isWeb?"lvi":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport width or height (lvi)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport width or height (lvi)"),step:.1},lvb:{value:"lvb",label:isWeb?"lvb":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport width or height (lvb)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport width or height (lvb)"),step:.1},lvmin:{value:"lvmin",label:isWeb?"lvmin":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport smallest dimension (lvmin)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport smallest dimension (lvmin)"),step:.1},dvw:{value:"dvw",label:isWeb?"dvw":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport width (dvw)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport width (dvw)"),step:.1},dvh:{value:"dvh",label:isWeb?"dvh":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport height (dvh)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport height (dvh)"),step:.1},dvi:{value:"dvi",label:isWeb?"dvi":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport width or height (dvi)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport width or height (dvi)"),step:.1},dvb:{value:"dvb",label:isWeb?"dvb":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport width or height (dvb)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport width or height (dvb)"),step:.1},dvmin:{value:"dvmin",label:isWeb?"dvmin":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport smallest dimension (dvmin)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport smallest dimension (dvmin)"),step:.1},dvmax:{value:"dvmax",label:isWeb?"dvmax":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport largest dimension (dvmax)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Dynamic viewport largest dimension (dvmax)"),step:.1},svmax:{value:"svmax",label:isWeb?"svmax":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport largest dimension (svmax)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Small viewport largest dimension (svmax)"),step:.1},lvmax:{value:"lvmax",label:isWeb?"lvmax":(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport largest dimension (lvmax)"),a11yLabel:(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Large viewport largest dimension (lvmax)"),step:.1}},ALL_CSS_UNITS=Object.values(allUnits),CSS_UNITS=[allUnits.px,allUnits["%"],allUnits.em,allUnits.rem,allUnits.vw,allUnits.vh],DEFAULT_UNIT=allUnits.px;function getParsedQuantityAndUnit(rawValue,fallbackUnit,allowedUnits){return parseQuantityAndUnitFromRawValue(fallbackUnit?`${null!=rawValue?rawValue:""}${fallbackUnit}`:rawValue,allowedUnits)}function hasUnits(units){return Array.isArray(units)&&!!units.length}function parseQuantityAndUnitFromRawValue(rawValue,allowedUnits=ALL_CSS_UNITS){let trimmedValue,quantityToReturn;if(void 0!==rawValue||null===rawValue){trimmedValue=`${rawValue}`.trim();const parsedQuantity=parseFloat(trimmedValue);quantityToReturn=isFinite(parsedQuantity)?parsedQuantity:void 0}const unitMatch=trimmedValue?.match(/[\d.\-\+]*\s*(.*)/),matchedUnit=unitMatch?.[1]?.toLowerCase();let unitToReturn;if(hasUnits(allowedUnits)){const match=allowedUnits.find((item=>item.value===matchedUnit));unitToReturn=match?.value}else unitToReturn=DEFAULT_UNIT.value;return[quantityToReturn,unitToReturn]}function getValidParsedQuantityAndUnit(rawValue,allowedUnits,fallbackQuantity,fallbackUnit){const[parsedQuantity,parsedUnit]=parseQuantityAndUnitFromRawValue(rawValue,allowedUnits),quantityToReturn=null!=parsedQuantity?parsedQuantity:fallbackQuantity;let unitToReturn=parsedUnit||fallbackUnit;return!unitToReturn&&hasUnits(allowedUnits)&&(unitToReturn=allowedUnits[0].value),[quantityToReturn,unitToReturn]}const useCustomUnits=({units=ALL_CSS_UNITS,availableUnits=[],defaultValues})=>{const customUnitsToReturn=function filterUnitsWithSettings(allowedUnitValues=[],availableUnits){return Array.isArray(availableUnits)?availableUnits.filter((unit=>allowedUnitValues.includes(unit.value))):[]}(availableUnits,units);return defaultValues&&customUnitsToReturn.forEach(((unit,i)=>{if(defaultValues[unit.value]){const[parsedDefaultValue]=parseQuantityAndUnitFromRawValue(defaultValues[unit.value]);customUnitsToReturn[i].default=parsedDefaultValue}})),customUnitsToReturn};function getUnitsWithCurrentUnit(rawValue,legacyUnit,units=ALL_CSS_UNITS){const unitsToReturn=Array.isArray(units)?[...units]:[],[,currentUnit]=getParsedQuantityAndUnit(rawValue,legacyUnit,ALL_CSS_UNITS);return currentUnit&&!unitsToReturn.some((unit=>unit.value===currentUnit))&&allUnits[currentUnit]&&unitsToReturn.unshift(allUnits[currentUnit]),unitsToReturn}},"./packages/components/build-module/utils/hooks/use-controlled-state.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_values__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/build-module/utils/values.js");const defaultOptions={initial:void 0,fallback:""};const __WEBPACK_DEFAULT_EXPORT__=function useControlledState(currentState,options=defaultOptions){const{initial,fallback}={...defaultOptions,...options},[internalState,setInternalState]=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(currentState),hasCurrentState=(0,_values__WEBPACK_IMPORTED_MODULE_1__.Jf)(currentState);return(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{hasCurrentState&&internalState&&setInternalState(void 0)}),[hasCurrentState,internalState]),[(0,_values__WEBPACK_IMPORTED_MODULE_1__.Me)([currentState,internalState,initial],fallback),(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((nextState=>{hasCurrentState||setInternalState(nextState)}),[hasCurrentState])]}},"./packages/components/build-module/utils/strings.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{GL:()=>kebabCase,eK:()=>normalizeTextString,hr:()=>escapeRegExp});var remove_accents__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/remove-accents/index.js"),remove_accents__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(remove_accents__WEBPACK_IMPORTED_MODULE_0__),change_case__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/param-case/dist.es2015/index.js");const ALL_UNICODE_DASH_CHARACTERS=new RegExp(`[${["-","~","­","֊","־","᐀","᠆","‐","‑","‒","–","—","―","⁓","⁻","₋","−","⸗","⸺","⸻","〜","〰","゠","︱","︲","﹘","﹣","－"].join("")}]`,"g"),normalizeTextString=value=>remove_accents__WEBPACK_IMPORTED_MODULE_0___default()(value).toLocaleLowerCase().replace(ALL_UNICODE_DASH_CHARACTERS,"-");function kebabCase(str){var _str$toString;let input=null!==(_str$toString=str?.toString?.())&&void 0!==_str$toString?_str$toString:"";return input=input.replace(/['\u2019]/,""),(0,change_case__WEBPACK_IMPORTED_MODULE_1__.o)(input,{splitRegexp:[/(?!(?:1ST|2ND|3RD|[4-9]TH)(?![a-z]))([a-z0-9])([A-Z])/g,/(?!(?:1st|2nd|3rd|[4-9]th)(?![a-z]))([0-9])([a-z])/g,/([A-Za-z])([0-9])/g,/([A-Z])([A-Z][a-z])/g]})}function escapeRegExp(string){return string.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&")}},"./packages/element/build-module/platform.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={OS:"web",select:spec=>"web"in spec?spec.web:spec.default,isWeb:!0}}}]);