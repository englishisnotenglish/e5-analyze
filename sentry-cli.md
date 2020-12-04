### sentry 配置指南

#### 1.异常上报
- 可以参考sentry的get start。
- 一般步骤
    * 引入sentry的包
    * 初始化dsn
````
Sentry.init({
  dsn: '',
  release: version,
  beforeSend(event) {
    if (event.exception) {
      event.exception.values.forEach((value) => {
        if (value.stacktrace) {
          value.stacktrace.frames.forEach((frame) => {
            // eslint-disable-next-line no-param-reassign
            frame.filename = (frame.filename || '').replace(/^.*(\/web-mobile\/.*\.js)$/, '$1')
          })
        }
      })
    }
  },
})
dsn: The DSN tells the SDK where to send the events.
release: 版本号跟发布版本同步，当错误被上报的时候会跟根据这个配置的版本号匹配发布版本号，找到发布版本后输出sourcemap代码。
beforeSend: 


````

文档地址 https://docs.sentry.io/platforms/javascript/configuration/options/

#### 2.配置source-map

* create a release
````
sentry-cli releases new <release_name>
// release_name 一般可以使用版本号做为版本，这样好找。
````
* upload
````
sentry-cli releases files <release_name> upload-sourcemaps <path>
// release_name同上
// path 就是含有js和js.map的那个目录，sentry自动扫描这个关系上传一般打包目录就是build 可以写 ./build
````
