import React, { useContext, useEffect, useRef } from 'react'
import { Button, View, Text, Dimensions } from 'react-native'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import WebView from 'react-native-webview'

import HTML from "react-native-render-html"
import iframe from '@native-html/iframe-plugin'
import table, {
  IGNORED_TAGS, defaultTableStylesSpecs,
  cssRulesFromSpecs
} from '@native-html/table-plugin'

const MainTabs = ({ navigation, route }) => {
  return <View style={{ marginTop: 100 }}>
    <Button title="Detail" onPress={() => navigation.push('TopicDetail')} />
  </View>
}


const cssRules =
  cssRulesFromSpecs(defaultTableStylesSpecs) +
  `
    img {
        width: 100%
    }
    figure.image th,figure.image td {
        padding: 0px !important;
        margin: 0px !important;
        background-color: transparent !important;
        border-bottom: 0px !important;
    }
    figure.image {
        padding:0px !important;
        margin:0px !important;
    }
    `
const tableConfig = {
  cssRules
}
const dw = Dimensions.get('window').width

const TopicDetail = () => {
  return <View><HTML
    baseFontStyle={{ fontSize: 16, lineHeight: 22 }}
    renderersProps={{
      iframe: {
        scalesPageToFit: true,
        webViewProps: {}
      },
      table: tableConfig
    }}
    WebView={WebView}
    source={{
      html: `a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/>a<br/><table><tr><td>123123</td></tr></table>`
    }}
    contentWidth={dw}
    staticContentMaxWidth={dw}
    ignoredTags={IGNORED_TAGS}
    alterChildren={node => {
      if (node.name === "iframe" || node.name === "img") {
        delete node.attribs.width;
        delete node.attribs.height;
      }
      return node.children;
    }}
    tagsStyles={{
      h2: {
        fontSize: 16,
        fontWeight: 'normal'
      },
      iframe: {
        opacity: 0.99
      },
      // If you are using @native-html/table-plugin
      figure: {
        opacity: 0.99
      },
      table: {
        opacity: 0.99
      },
      tbody: {
        opacity: 0.99
      }
    }}
    containerStyle={{ padding: 10 }}
    // defaultTextProps={{ padding: 10, backgroundColor: 'blue' }}
    renderers={{
      figcaption: (htmlAttribs, children, convertedCSSStyles, passProps) => (
        <View style={{
          position: 'relative', flex: 1
        }}><View style={{ width: dw, position: 'relative', marginLeft: -10, marginRight: -10, marginBottom: -15, backgroundColor: "#f5f5f5", textAlign: 'center', alignItems: 'center', padding: 5 }}>{children}</View></View>
      ),
      // figcaption: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      //     <View style={{
      //         marginBottom: 5
      //     }}>{children}</View>
      // ),
      h2: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        const { key } = passProps
        return <View key={`h2-${key}`} style={{ backgroundColor: "#f5f5f5", padding: 5, margin: 5 }}>{children}</View>
      },
      iframe,
      table
    }}
  />
  </View>
}

const StackNav = createStackNavigator()
export default () => {
  return <NavigationContainer><StackNav.Navigator headerMode={"none"}>
    <StackNav.Screen name="MainTabs" component={MainTabs} />
    <StackNav.Screen
      name="TopicDetail"
      component={TopicDetail}
    />
  </StackNav.Navigator></NavigationContainer>
}

