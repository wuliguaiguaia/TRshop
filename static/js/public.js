function adaptiveRem() {
    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var width = docEl.getBoundingClientRect().width;
            if (width > 640) { // 最大宽度
                width = 640;
            }
            var rem = width / 6.4;
            docEl.style.fontSize = rem + 'px';

        };
    recalc();
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
}

function dataRender() {
    laydate.render({
        elem: '.input-data-second' //指定元素
            ,
        type: 'datetime'
    });
    laydate.render({
        elem: '.input-data-second1' //指定元素
            ,
        type: 'datetime'
    });
    laydate.render({
        elem: '.input-data-second2' //指定元素
            ,
        type: 'datetime'
    });
}

// 新增同人周边
let surroundArr = []
function addNewSurrounding(ele) {
    let index = ele.val();
    let selectedIndex = index - 1;
    let ulSurroundings = ele.parents(".ul-surroundings")
    let circleBar = $(".circle-bar .title");
    let cirInitText = circleBar.text();
    if($(".gird-li-template").is(":visible")){
        $(".gird-li-template").hide();
    }
    let nowText = ele.text()
    let seletedContent = $(".levelTop-grid-component").parent().children('ul').eq(selectedIndex).html();
    let navList = $('.levelTop-grid-component').html();
    let newSurrounds = $(`
        <li class="gird-li">
            <div class="circle-bar toggle-button-parent">
                <div class="title">${ele.text()}</div>
                <div class="toggle-button">收起</div>
                <div></div>
            </div>
            <div class="content-grid toggle-content">
                <div class="levelTop-grid-component row">
                ${navList}
                </div>
                <ul class="ul-show add-form-parent">
                ${seletedContent}
                </div>
            </div>
            <button class="btn btn-default delete-surroundings">删除${ele.text()}</>
        </li>
    `);
    if (!surroundArr.includes(nowText)) {
        surroundArr.push(ele.text());
        ulSurroundings.append(newSurrounds);
        newSurrounds.attr("id", 'gird-li-' + selectedIndex);
        newSurrounds.find('.add-new-surroundings:contains(' + nowText + ')').siblings('.checkbox-kind').addClass('green-bg');
    } else {
    }
}

function deleteSurrounding(ele) {
    let deleteContent = ele.parents(".gird-li");
    let index = surroundArr.indexOf(ele.siblings(".circle-bar").find(".title").text())
    deleteContent.remove();
    surroundArr.splice(index,1)
    if (surroundArr.length == 0 ) {
        $(".gird-li-template").show();
    }

}

// 二级
function chooseTwoLevel(ele) {
    let index = ele.val();
    let isHaveCLass = ele.siblings('.checkbox-kind').hasClass('green-bg');
    let selectedIndex = index - 1;

    if (isHaveCLass) {
        let isHaveCLass = ele.siblings('.checkbox-kind').removeClass('green-bg');
        ele.parents('.levelTop-grid').siblings('ul').eq('' + selectedIndex + '').hide();
    } else {
        let isHaveCLass = ele.siblings('.checkbox-kind').addClass('green-bg');
        ele.parents('.levelTop-grid').siblings('ul').eq('' + selectedIndex + '').show();
    }
}

function submitConfirm(flag, select) {

    let [flagMust, flagWrite, flagText, flagSelect, flagCheckbox, flagAgree, flagOther] = [true, true, true, true, true, true, true]
    // 必填之数量限制
    let mustRedArr = select.find('.must-red');
    for (let i = 0; i < mustRedArr.length; i++) {
        if (mustRedArr.eq(i).is(':visible')) {
            mustRedArr.eq(i).parents('.flex-layout').siblings('.must-red').show();
            flagMust = false;
        } else {}
    }
    // 必填选项
    let mustInputArr = select.find(".must-write").not(":disabled");
    for (let i = 0; i < mustInputArr.length; i++) {
        if (mustInputArr.eq(i).val() == '' || mustInputArr.eq(i).val() == 0) {
            mustInputArr.eq(i).parents('.flex-layout').siblings('.must-red').show();
            mustInputArr.eq(i).addClass("error-input")
            flagWrite = false;
        } else {
            mustInputArr.eq(i).parents('.flex-layout').siblings('.must-red').hide();
            mustInputArr.eq(i).removeClass("error-input")
        }
    };
    // input-text
    let inputTextArr = select.find("textarea.form-control,input[type=text]").not(":disabled");
    let inputTextVal = '';
    for (let i = 0; i < inputTextArr.length; i++) {
        if (inputTextArr.eq(i).siblings('label').text().search("选填") == -1) {
            inputTextVal = $.trim(inputTextArr.eq(i).val());
            if (inputTextArr.eq(i).parents().hasClass("input-other")) {
                if (inputTextArr.eq(i).is(":hidden")) {
                    inputTextArr.eq(i).removeClass("error-input")
                } else {
                    if (inputTextVal == '') {
                        inputTextArr.eq(i).addClass("error-input")
                        flagText = false;
                    }
                }
            } else {
                if (inputTextVal == '') {
                    inputTextArr.eq(i).addClass("error-input")
                    flagText = false;
                }
            }
        }
    }
    let formSelectArr = select.find("select");
    let dataDefault;
    let val = 0
    for (let i = 0; i < formSelectArr.length; i++) {
        dataDefault = formSelectArr.eq(i).data("default")
        val = formSelectArr.eq(i).val();
        if (val == dataDefault || 　val != 0) {
            formSelectArr.eq(i).addClass("success-input").removeClass("error-input")
        } else {
            formSelectArr.eq(i).addClass("error-input")
            flagSelect = false
        }
    }
    // checkbox
    let formCheckboxArr = select.find(".checkbox-chooser");
    let checkBoxVal = "";
    for (let i = 0; i < formCheckboxArr.length; i++) {
        if (formCheckboxArr.eq(i).hasClass("canCheck")) {
            checkBoxVal = $.trim(formCheckboxArr.eq(i).data("checkboxModel"))
            if (checkBoxVal == "") {
                formCheckboxArr.eq(i).prev('p').addClass("text-red")
                flagCheckbox = false;
            } else {
                formCheckboxArr.eq(i).prev('p').removeClass("text-red")
            }
        }
    }

    // 同意
    let saleAgree;
    if (select.children().hasClass("btn-agree-toggle")) {
        saleAgree = select.find(".btn-agree-toggle");
        if (saleAgree.hasClass("btn-agree")) {} else {
            flagAgree = false
        }
    }
    if (flagMust && flagWrite && flagText && flagSelect && flagOther && flagCheckbox && flagAgree) {
        flag = true
    } else {
        flag = false;
    }
    return flag;
}
