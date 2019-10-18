export default () => {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        appId: '${process.env.ONE_SIGNAL_APP_ID}',
        notifyButton: {
          enable: false,
        },
        welcomeNotification: {
          disable: false,
          title: '${process.env.NAME}',
          message: '感谢订阅！'
        },
        persistNotification: true,
        autoRegister: false,
        autoResubscribe: true
      })
      OneSignal.showNativePrompt();
    });
    ` }} />
  )
}
