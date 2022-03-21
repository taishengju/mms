//监听页面 URL 变化，切换子应用
// 当 location.pathname 以 /vue 为前缀时切换到 vue 子应用
// https://www.example.com/vue/xxx
// 当 location.pathname 以 /react 为前缀时切换到 react 子应用
// https://www.example.com/react/xxx
/**
 * 
 * 重写 window.history.pushState()
// 重写 window.history.replaceState()
// 监听 popstate 事件
// 监听 hashchange 事件
 */
// 执行下面代码后，浏览器的 URL 将从 https://www.xxx.com 变为 https://www.xxx.com/vue
// window.history.pushState(null, '', '/vue')import { loadApps } from '../application/apps'

const originalPushState = window.history.pushState
const originalReplaceState = window.history.replaceState

export default function overwriteEventsAndHistory() {
    window.history.pushState = function (state: any, title: string, url: string) {
        const result = originalPushState.call(this, state, title, url)
        // 根据当前 url 加载或卸载 app
        loadApps()
        return result
    }
    
    window.history.replaceState = function (state: any, title: string, url: string) {
        const result = originalReplaceState.call(this, state, title, url)
        loadApps()
        return result
    }
    
    window.addEventListener('popstate', () => {
        loadApps()
    }, true)
    
    window.addEventListener('hashchange', () => {
        loadApps()
    }, true)
}
