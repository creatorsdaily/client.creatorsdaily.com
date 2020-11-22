const BaiduTongji = ({ id }) => {
  if (!id) return null
  if (process.env.NODE_ENV !== 'production') return null
  return (
    <script dangerouslySetInnerHTML={{
      __html: `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${id}";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    }}
    />
  )
}

export default BaiduTongji
