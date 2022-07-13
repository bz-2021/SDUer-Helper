// ==UserScript==
// @name        SDUer Helper
// @name:zh     山东大学信息化公共服务平台助手

// @namespace   https://service.sdu.edu.cn/

// @description 一键查询成绩、一键查看未修学分、解决非兼容模式下无法查看平时分的问题

// @author      bz2021
// @version     1.0

// @match       https://service.sdu.edu.cn/*
// @grant       GM_xmlhttpRequest
// @connect     *
// ==/UserScript==

(function () {

    //在主菜单添加一个名为“我的成绩”的按钮
    function AddMenuButton() {

        //复制一个Menu里的元素
        var element = document.querySelector("#mobile_header_container > div > div:nth-child(2)");
        var copy = element.cloneNode(true);
        var dest = document.querySelector("#mobile_header_container > div");
        dest.insertBefore(copy, dest.children[4]);

        //将复制的元素内容改为‘我的成绩’
        var New_tit = document.querySelector("#mobile_header_container > div > div:nth-child(5) > a > span.tit");
        New_tit.textContent = "我的成绩";

        //禁用原标签点击后的链接跳转
        var New_a = document.querySelector("#mobile_header_container > div > div:nth-child(5) > a");
        New_a.href = "javascript:void(0);";

        //添加点击事件
        var New_button = document.querySelector("#mobile_header_container > div > div:nth-child(5)");
        New_button.addEventListener("click", function () {
            LoginRequst();
            SiteRequst();
        });

    };

    //进行‘教务管理（威海）’页面的登陆请求
    function LoginRequst() {
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://jwxt.wh.sdu.edu.cn/jsxsd/caslogin.jsp',
            data: 'typeName=XXX&content=XXX&options=XXX',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            onload: function (r) {
            }
        });
    };

    function parseToDOM(str) {
        var div = document.createElement("div");
        if (typeof str == "string")
            div.innerHTML = str;
        return div.childNodes;
    }

    function CopyOneDiv() {
        var element = document.querySelector("#page-content > div > ul:nth-child(3) > li:nth-child(1)")
        var copy = element.cloneNode(true);
        var dest = document.querySelector("#page-content > div > ul:nth-child(3)");
        dest.insertBefore(copy, dest.children[1]);
    }

    //进行成绩单页面的请求，执行成绩单的重要内容解析
    function SiteRequst() {
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://jwxt.wh.sdu.edu.cn/jsxsd/kscj/cjcx_list',
            data: 'typeName=XXX&content=XXX&options=XXX',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            onload: function (r) {
                CopyOneDiv();
                document.querySelector("#swiper_db_content > div > div").innerHTML = '<div id = "999888"></div>';

                //document.querySelector("#page-content > div > ul:nth-child(3) > li:nth-child(1) > div > compress:html > div").innerHTML = '<div id = "999888"></div>';
                //$("#page-content > div > ul:nth-child(3)").append('<li></li>');
                //$("#page-content > div > ul:nth-child(3) > li:nth-child(1) > div > compress:html > div").append(r.responseText);
                //$("#page-content > div > ul:nth-child(3) > li:nth-child(1)").append(r.responseText);
                $("#999888").html('');
                $("#999888").append(r.responseText);

                document.querySelector("#\\39 99888").parentElement.parentElement.parentElement.parentElement.parentElement.previousElementSibling.children[0].textContent = "我的成绩";

                document.querySelector("#\\39 99888 > div:nth-child(17) > div > div.Nsb_top_logo").remove
                document.querySelector("#Top1_divLoginName").remove
                document.querySelector("#\\39 99888 > div:nth-child(17) > div > div.Nsb_top_menu > ul > li:nth-child(1)").remove
                document.querySelector("#divFirstMenuClass > ul").remove
                document.querySelector("#\\39 99888 > div:nth-child(19) > div").remove
                document.querySelector("#btn_back").remove
                document.querySelector("#\\39 99888 > div:nth-child(19) > br:nth-child(4)").remove
                //GetInfo(res);
                //var temp = r.responseText;
                //var res = parseToDOM(r);
                // $(res).ready(function () {
                //     alert("我的第一个jQuery代码!");
                // });
                //console.log(r);
                //$(res);
                //var a1 = $(res)("#dataList > tbody > tr:nth-child(3) > td:nth-child(4)").textContent;
                //alert(`${a1}`);
            }
        });
    };

    //成绩单内容读入，提取关键信息并生成一个html文件
    function GetInfo(res) {
        var t = [];
        for (var i = 2; ; i++) {
            t[i - 2] = res.querySelector(`#dataList > tbody > tr:nth-child(${i}) > td:nth-child(4)`);
            if (t == null) {
                break;
            }
            else {
                console.log(t);
            }

        }
    };





    $(document).ready(function () {

        AddMenuButton();

    });


})();