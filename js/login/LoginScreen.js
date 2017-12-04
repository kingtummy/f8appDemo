/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */
'use strict';

var Animated = require('Animated');
/** 
 * Animated库可以让开发者非常容易并且非常高效的性能实现各种的动画以及交互的方式。使用Animated的时候，
 * 我们只需要关注设置动画的实现和结束即可，然后在里边设置一个动画可配置的函数。间接着通过start/stop的
 * 方法来控制动画按照顺序执行 
 */
var Dimensions = require('Dimensions');
var F8Colors = require('F8Colors');
var Image = require('Image');
var React = require('React');
var StatusBar = require('StatusBar');
var StyleSheet = require('StyleSheet');
var View = require('View');
var { Text } = require('F8Text');
var LoginButton = require('../common/LoginButton');

/**
 * LoginButton这是一个自动以的button，source 作为函数参数传递给LoginButton组件函数
 */
var TouchableOpacity = require('TouchableOpacity');
/** 
 * 本组件(TouchableOpacity)用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。
 * 这个过程并不会真正改变视图层级，大部分情况下很容易添加到应用中而不会带来一些奇怪的副作用。
 *（译注：此组件与TouchableHighlight的区别在于并没有额外的颜色变化，更适于一般场景）
**/

/**
 * StatusBar
 * StatusBar组件可以同时加载多个。此时属性会按照加载顺序合并（后者覆盖前者）。一个典型的用法就是在使用Navigator时，
 * 针对不同的路由指定不同的状态栏样式
 * StatusBar:  barStyle设置状态栏文本的颜色。
 */


/**
 * accessibilityLabel:无障碍标签
 * 当一个视图启用无障碍属性后，最好再加上一个accessibilityLabel（无障碍标签），这样可以让使用VoiceOver的人们清楚地
 * 知道自己选中了什么。VoiceOver会读出选中元素的无障碍标签。
 */

/**
 * accessibilityTraits:辅助功能
 * 辅助功能特征告诉人们他们在使用 VoiceOver 的时候选择了什么元素。此元素是一个标签？一个按钮？还是标头？
 * accessibilityTraits 将会回答这些问题。
 */

 
 /**
  * React创建组件的三种方式及其区别
  * 2  React.createClass
  * 3  React.Component  
  */


var { skipLogin } = require('../actions');
var { connect } = require('react-redux');

class LoginScreen extends React.Component {
  state = {
    anim: new Animated.Value(0),//rn的动画库
  };
  /**
   * componentDidMount()
   * 在组件挂载之前调用一次。如果在这个函数里面调用setState，本次的render函数可以看到更新后的state，并且只渲染一次
   *
   * Animated.timing:
   * 最基本的一个动画使用方式是创建一个Animated.Value,将该动画绑定到一个或者多个样式属性到动画组件中，
   * 然后通过开启动画运行
   * View,Text和Image这三个组件都可以提供动画效果
   * toValue:属性目标值
   * start(): 开始执行动画
   * 三种动画类型：
   * spring 基础的单次弹跳物理模型
   * decay 以一个初始速度开始并且按一定的衰减比逐渐减慢直至停止
   * timing 时间和变量线性变化
   */
  componentDidMount() { 
    Animated.timing(this.state.anim, {toValue: 3000, duration: 3000}).start();
  }

  render() {
    return (
      <Image
        style={styles.container}
        //StatusBar  barStyle(ios)设置状态栏文本的颜色。
        source={require('./img/login-background.png')}> 
        <StatusBar barStyle="default" />
        <TouchableOpacity
          accessibilityLabel="Skip login" //accessibilityLabel:无障碍标签         
          accessibilityTraits="button"    //accessibilityTraits:辅助功能
          style={styles.skip}
          /**
           * React中的每一个组件，都包含有一个属性（props）属性主要是从父组件传递给子组件的，
           * 在组件内部，我们可以通过this.props获取属性对象
           */
          onPress={() => this.props.dispatch(skipLogin())}> 
          <Animated.Image   //rn的动画库
            style={this.fadeIn(2800)}//淡入效果,函数在下面
            source={require('./img/x.png')}//透明叉号
          />
        </TouchableOpacity>
        <View style={styles.section}>
          <Animated.Image
            style={this.fadeIn(0)}
            source={require('./img/devconf-logo.png')}
          />
        </View>
        <View style={styles.section}>
          <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
            code to
          </Animated.Text>
          <Animated.Text style={[styles.h1, {marginTop: -30}, this.fadeIn(700, 20)]}>
            connect
          </Animated.Text>
          <Animated.Text style={[styles.h2, this.fadeIn(1000, 10)]}>
            April 12 + 13 / Fort Mason Center
          </Animated.Text>
          <Animated.Text style={[styles.h3, this.fadeIn(1200, 10)]}>
            SAN FRANCISCO, CALIFORNIA
          </Animated.Text>
        </View>
        <Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
          <Text style={styles.loginComment}>
            Use Facebook to find your friends at F8.
          </Text>          
          <LoginButton source="First screen"  />
        </Animated.View>
      </Image>
    );
  }

  fadeIn(delay, from = 0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [{
        translateY: anim.interpolate({
          inputRange: [delay, Math.min(delay + 500, 3000)],
          outputRange: [from, 0],
          extrapolate: 'clamp',
        }),
      }],
    };
  }
}

const scale = Dimensions.get('window').width / 375;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  last: {
    justifyContent: 'flex-end',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.round(74 * scale),
    color: F8Colors.darkText,
    backgroundColor: 'transparent',
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    color: F8Colors.darkText,
    marginVertical: 20,
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    color: F8Colors.lightText,
    letterSpacing: 1,
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    color: F8Colors.darkText,
    textAlign: 'center',
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15,
  },
});

module.exports = connect()(LoginScreen);
