function upload(option) {
    const xhr = new XMLHttpRequest();
    // 请求的url
    const action = option.action;
    // 上传的进度
    if (xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100;
        }
        option.onProgress(e);
      };
    }
  
    const formData = new FormData();
    // formData的参数
    if (option.data) {
      Object.keys(option.data).forEach(key => {
        formData.append(key, option.data[key]);
      });
    }
    // 默认将文件流添加到formData
    formData.append(option.filename, option.file, option.file.name);
    // 错误的回调
    xhr.onerror = function error(e) {
      option.onError(e);
    };
    
    // 上传成功的回调
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(action, option, xhr));
      }
      option.onSuccess(getBody(xhr));
    };
  
    xhr.open('post', action, true);
      
    // 不同源是够携带cookie
    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true;
    }
    
    // 添加请求头
    const headers = option.headers || {};
    for (let item in headers) {
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }
    xhr.send(formData);
    return xhr;
  }
  