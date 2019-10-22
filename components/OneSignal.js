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
        autoResubscribe: true,
        promptOptions: {
          actionMessage: '建议您订阅我们的通知，您有新动态时将通知您。',
          acceptButtonText: '订阅通知',
          cancelButtonText: '暂时不需要'
        }
      })
      navigator.serviceWorker.register('/OneSignalSDKWorker.js');
      // OneSignal.showNativePrompt();
    });
    ` }} />
  )
}
