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
        console.log($('#body')[0].offsetTop - document.documentElement.scrollTop);
        if(($('#body')[0].offsetTop - document.documentElement.scrollTop)<=0){
            $('.tagbox').addClass('leftbox-fixed')
            // $('.tagbox').css('position','fixed')
        }else{
            $('.tagbox').removeClass('leftbox-fixed')
            // $('.tagbox').css('position','relative')
        }
        
    })
});