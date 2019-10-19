//fetch网络请求简单封装，支持超时入口
class FetchUtil {
  //初始化工具类
  init(){
    this.url           = '';
    this.method        = 'GET';
    this.headers       = {};
    this.body_type     = 'form';
    this.bodys         = {};
    this.credentials   = 'omit';
    this.return_type   = 'json';
    this.overtime      = 0;
    this.firstThen     = undefined;
    return this;
  }
  //设置请求URL
  setUrl(url){
      this.url = url;
      return this;
  }
  //设置请求方式，默认为GET请求（POST,PUT,DELETE）
  setMethod(val){
      this.method = val;
      return this;
  }
  //设置请求body类型，默认为for也可以是file/json,
  setBodyType(val){
      this.body_type = val;
      return this;
  }
  //设置返回data类型，默认为json，也可以是text,blob,formData/arryBuffer
  setReturnType(val){
      this.return_type = val;
      return this;
  }
  //设置超时时间，单位毫秒
  setOvertime(val){
      this.overtime = val;
      return this;
  }
  //设置Header,name若为字符串，则name和value为Header键值对数据；若name为object,则name为header键值对对象
  setHeader(name, val=null){
      if(typeof name == 'string'){
          this.headers[name] = val;
      }else if(typeof name == 'object'){
          Object.keys(name).map((index)=>{
              this.headers[index] = name[index];
          });
      }
      return this;
  }
  //设置请求body,name若为字符串，则name和value为Header键值对数据；若name为object,则name为header键值对对象
  setBody(name, val=null){
      if(typeof name == 'string'){
          this.bodys[name] = val;
      }else if(typeof name == 'object'){
          Object.keys(name).map((index)=>{
              this.bodys[index] = name[index];
          });
      }
      return this;
  }
  setCookieOrigin(){
      this.credentials = 'same-origin';
      return this;
  }
  setCookieCors(){
      this.credentials = 'include';
      return this;
  }
  //设置请求成功后第一个毁调方法，通常用于网络返回的第一笔数据，需要将此对象return出去，交由后面的then处理
  thenStart(then) {
      this.firstThen = then;
      return this;
  }
  //执行请求函数
  dofetch(){
    let options         = {};
    options.method      = this.method;
    options.credentials = this.credentials;
    options.headers = this.headers;
    if({} != this.bodys && this.method != 'GET'){
        if('form' == this.body_type){
            this.setHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
            let data = '';
            Object.keys(this.bodys).map((index) => {
                let param = encodeURI(this.bodys[index]);
                data += `${index}=${param}&`;
            });
            options.body = data;
        }else if('file' == this.body_type){
            let data = new FormData();
            Object.keys(this.bodys).map((index) => {
                data.append(index, this.bodys[index]);
            });
            options.body = data;
        }else if('json' == this.body_type){
            options.body = JSON.stringify(this.bodys);
       }
    } 
    return Promise.race([
      fetch(this.url,options),
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('request timeout')), this.overtime ? this.overtime : 30 * 1000);
        })
    ]).then(
      (response) => {
        if (this.firstThen) {
          let tempResponse = this.firstThen(response);
          if (tempResponse) {
            return tempResponse;
          }
        }
        return response;
      }
    ).then(
      (response) => {
        if('json' == this.return_type){
          return response.json();
        }else if('text' == this.return_type){
          return response.text();
        }else if('blob' == this.return_type){
          return response.blob();
        }else if('formData' == this.return_type){
          return response.formData();
        }else if('arrayBuffer' == this.return_type){
          return response.arrayBuffer();
        }
      }
    );
  }
}
module.exports = FetchUtil;