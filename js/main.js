var urltxtprase = function (urlstring) {
    urlarr = urlstring.split("\n");
    urlgroups = [];
    flag = "start";
    last = "";
    groupindex = -1;
    urlindex = -1;
    for (let index = 0; index < urlarr.length; index++) {
        const line = urlarr[index];
        // line to flag
        if (line.trim() == "") {
            continue;
        } else if (line.match("^#")) {
            continue;
        } else if (line.match("^====")) {
            flag = "newgroup";
        } else if (last == "newgroup") {
            flag = "groupname";
        } else if (last == "groupname" || last == "url") {
            flag = "urlname";
        } else if (last == "urlname") {
            flag = "url";
        } else {
            flag = "";
        }
        // flag to operation
        if (flag == "groupname") {
            groupindex++;
            urlindex = -1;
            urlgroups.push({ name: line.trim(), urls: [] });
        } else if (flag == "urlname") {
            urlindex++;
            urlgroups[groupindex].urls.push({ name: line.trim(), url: [] });
        } else if (flag == "url") {
            urlgroups[groupindex].urls[urlindex].url = line.trim();
        }
        last = flag;
        // console.log(flag + ' >> ' + line);
    }
    return urlgroups;
};
$(function(){
    $(window).scroll(function () {
        // console.log($('#body')[0].offsetTop - document.documentElement.scrollTop);
        if(($('#body')[0].offsetTop - document.documentElement.scrollTop)<=0){
            $('.tagbox').addClass('leftbox-fixed')
            // $('.tagbox').css('position','fixed')
        }else{
            $('.tagbox').removeClass('leftbox-fixed')
            // $('.tagbox').css('position','relative')
        }
        
    })
});


var getLocalStorage = function (key) {
    switch (localStorage.getItem('__'+key)) {
        case 'undefined':   return undefined;   break;
        case 'boolean':     return localStorage.getItem(key) == 'true' ? true : false;  break;
        case 'object':      return JSON.parse(localStorage.getItem(key));   break;
        case 'number':      return 1 * localStorage.getItem(key);   break;
        case 'string':      return JSON.parse(localStorage.getItem(key));       break;
        // case 'string':      return localStorage.getItem(key);       break;
        case null:          return localStorage.getItem(key);       break;
        default:            console.warn('undetected type');
                            return localStorage.getItem(key);       break;
    }
}
var setLocalStorage = function (key,value) {
    localStorage.setItem('__'+key,typeof value)
    // if(localStorage.getItem('__'+key)=='string'){
        // localStorage.setItem(key,value)
    // }else{
        localStorage.setItem(key,JSON.stringify(value))
    // }
}
// 初始 localstorage 无值的赋初始值
var initLocalStorage = function(obj){
    for (const key in obj) {
        // localStorage.getItem(key) == undefined && localStorage.setItem(key,obj[key]);
        // getLocalStorage(key) == undefined &&  setLocalStorage(key,obj[key]);
        getLocalStorage(key) || setLocalStorage(key,obj[key]);
    }
    return obj;
}