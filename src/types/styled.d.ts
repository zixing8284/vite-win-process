/* *\
* TypeScript definitions for styled-components.
* styled-components provides TypeScript definitions which empower your
* IDE to recognise the css prop on React components.
\* */

// import original module declarations
import "styled-components"

// add own declarations
declare module "styled-components" {
  // DefaultTheme is being used as an interface of props.theme
  export interface DefaultTheme {
    name: string
    anchor: string
    anchorVisited: string
    borderDark: string
    borderDarkest: string
    borderLight: string
    borderLightest: string
    canvas: string
    canvasText: string
    canvasTextDisabled: string
    canvasTextDisabledShadow: string
    canvasTextInvert: string
    checkmark: string
    checkmarkDisabled: string
    flatDark: string
    flatLight: string
    focusSecondary: string
    headerBackground: string
    headerNotActiveBackground: string
    headerNotActiveText: string
    headerText: string
    hoverBackground: string
    material: string
    materialDark: string
    materialText: string
    materialTextDisabled: string
    materialTextDisabledShadow: string
    materialTextInvert: string
    progress: string
    tooltip: string
  }
}
