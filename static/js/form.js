$(function () {
    dataRender()
    $('body').on('change', '.form-class-b select', function () {
        let isCLass = $(this).hasClass('levelTop');
        let index = $(this).val();
        let selectedIndex;
        if (isCLass && index == 3) {
            $(this).siblings('ul').eq(0).show();
            $(this).siblings('ul').eq(1).show();
        } else {
            selectedIndex = $(this).val() - 1;
            $(this).siblings('ul').hide();
            $(this).find('ul').hide();
            $(this).siblings('ul').eq('' + selectedIndex + '').show().find(".checkbox-chooser").addClass("canCheck").parents("ul").siblings("ul").find(".checkbox-chooser").removeClass("canCheck")
        }
    });

    // 二级
    $('body').on('click', '.choose-twoLevel', function () {
        chooseTwoLevel($(this))
    }).on("click", ".checkbox-kind", function () {
        let proxy = $(this).next("button");
        if (proxy.hasClass("choose-twoLevel")) {
            chooseTwoLevel(proxy)
        }
        if (proxy.hasClass("add-new-surroundings")) {
            addNewSurrounding(proxy)
        }
    })


    // 新增周边
    $('body').on('click', '.add-new-surroundings', function () {
        addNewSurrounding($(this))
    })
    // 删除周边
    $('body').on('click', '.delete-surroundings', function () {
        deleteSurrounding($(this))
    })

    // 一级 
    $('body').on('click', '.choose-oneLevel', function () {
        let index = $(this).val();
        let isHaveCLass = $(this).hasClass('green-box');
        let selectedIndex = $(this).val() - 1;

        if (isHaveCLass) {
            if (index == 3) {
                $(this).parents('.levelTop-grid').siblings('ul').eq(0).hide();
                $(this).parents('.levelTop-grid').siblings('ul').eq(1).hide();
                $(this).removeClass('green-box');
            } else {
                // normal
                $(this).parents('.levelTop-grid').siblings('ul').eq('' + selectedIndex + '').hide();
                $(this).removeClass('green-box');
            }
        } else {
            if (index == 3) {
                $(this).parents('.levelTop-grid').siblings('ul').eq(0).show();
                $(this).parents('.levelTop-grid').siblings('ul').eq(1).show();
            } else {
                $(this).parents('.levelTop-grid').siblings('ul').hide();
                $(this).parents('.levelTop-grid').find('ul').hide();
                $(this).parents('.levelTop-grid').siblings('ul').eq('' + selectedIndex + '').show();
            }

            $(this).addClass('green-box').siblings().removeClass("green-box");
        }
    });

    // Consignment-top-box 寄卖点击
    $('body').on('click', '.Consignment-top-box', function () {
        let isHaveCLass = $(this).hasClass('green-box');
        if (isHaveCLass) {
            $(this).removeClass('green-box')
        } else {
            $(this).addClass('green-box').siblings().removeClass("green-box")
        }
    });



    // 收起展开
    // toggle-content
    // toggle-button-parent
    // toggle-button
    $('body').on('click', '.toggle-button', function (e) {
        if ($(e.target).hasClass('btn-agree-toggle')) {
            if (!$(e.target).hasClass('btn-agree')) {
                $(this).addClass("btn-agree")
                $(this).parents('.toggle-content').hide();
                $(this).parent().siblings(".toggle-button-parent").children(".toggle-button").html("展开")
            } else {
                $(this).removeClass("btn-agree")
            }
            return false
        }

        let status = $(this).parents('.toggle-button-parent').siblings('.toggle-content').is(":hidden");
        if (status) {
            $(this).parents('.toggle-button-parent').siblings('.toggle-content').show();
            $(this).html("收起")
        } else {
            $(this).parents('.toggle-button-parent').siblings('.toggle-content').hide();
            $(this).html("展开")
        }
    })
    
    //复选框选择 其他的时候弹出 用户自己填写的输入框
    $('body').on('click', '.checkbox-other', function () {
        let showEle = $(this).parents('.checkbox-other-grid').siblings('.input-other')

        if ($(this).is(":checked")) {
            showEle.show().find('input').focus();
        } else {
            showEle.hide().find('input').blur();;
        }
    })
    // select
    $('body').on('click', '.select-other-grid', function () {
        let showEle = $(this).siblings('.input-other');
        if (showEle.is(":hidden")) {
            if ($(this).find(":selected").hasClass("select-other")) {
                showEle.show().focus()
            } else {
                showEle.hide();
            }
        } else {
            showEle.hide();
        }
    })

    // 新增删除新的表单
    $('body').on('click ', '.add-form-button', function () {
        let parent = $(this).parents(".add-form-parent").eq(0);
        let content = $(this).parents(".add-form-content").html();
        $content = $(`
        <li class=" add-form-content ">
            ${content}
        </li>
        `)
        // reset
        $content.find("select.form-control").val("0").removeClass("success-input error-input").prop("disabled", false).end()
            .find("textarea.form-control,input[type=text]").val("").removeClass("success-input error-input").prop("disabled", false).end()
            .find(".lock-input").prop("disabled", true).end()
            .find(".text-red").removeClass("text-red").end()
            .find('.must-red').hide().end()
            .find('.input-other').hide();
        let specialInput = $content.find('.default-input');
        for(let i = 0 ; i < specialInput.length;i++){
            specialInput.eq(i).val(specialInput.eq(i).data('default'))
        }
        dataRender()
        parent.append($content);

    });
    $('body').on('click', '.reduce-form-button', function () {
        let len = $(this).parents(".add-form-parent").eq(0).children(".add-form-content").length;
        if (len > 1) {
            $(this).parents('.add-form-content').remove();
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    // 1.focus blur change   error-input success-input
    $('body').on('blur', '.form-control', function (e) { //input text
        let target = e.target.tagName.toLowerCase();
        let val = $(this).val();
        if (target == 'select') {} else {
            if ($.trim(val) == '') {
                $(this).removeClass("error-input").removeClass("success-input");

            } else {
                $(this).removeClass("error-input").addClass("success-input");
            }
        }
    }).on('click blur', 'select.form-control', function (e) { //select
        let val = $(this).val();
        let dataDefault = $(this).attr("default")
        if (val != "0" || val == dataDefault) {
            $(this).removeClass("error-input").addClass("success-input")

        } else {
            $(this).removeClass("success-input error-input")
        }
        $(this).parents('.flex-layout').siblings(".lock-parent").find("textarea.form-control,input[type=text]").removeClass("success-input error-input");
    }).on("keyup", ".form-control", function () { //num
        let hasClass = $(this).hasClass("input-num")
        let val;
        if (hasClass) {
            val = $(this).val().replace(/\D/g, ' ');
            $(this).val($.trim(val))
        }
    }).on("click", ":checkbox", function () { //checkbox-chooser
        let parent = $(this).parents(".checkbox-chooser");
        let checkboxArr = parent.data("checkboxModel");
        let val = $(this).val()
        if (checkboxArr.indexOf(val) != -1) {
            checkboxArr = checkboxArr.replace(new RegExp(val), ' ')
        } else {
            checkboxArr += ` ${val} `;
        }
        parent.data("checkboxModel", checkboxArr)
    })


    // 锁 
    // lock-control-name lock-content-name lock-parent-name lockValue  disabled  180,239,265，4597自定义
    $("body").on("click blur", "select", function (e) {
        let newVal = $(this).val()
        let id = 0;
        if (/lock\-control\-\d/g.test($(this).attr('class'))) {
            id = $(this).attr('class').match(/lock\-control\-\d/g)[0].slice(-1);
        }
        let lockValue = $(this).data("lockValue");
        let unLockValue = $(this).data("unlockValue");
        let lockContent = $(this).parents('.flex-layout').siblings(`.lock-parent-${id}`).find(`.lock-content-${id}`);
        if (lockValue) {
            if (newVal == lockValue) {
                lockContent.prop('disabled', true).addClass("normal-border").removeClass("success-input").val("")
            } else {
                lockContent.prop('disabled', false)
            }
            return false;
        } else {

            if (newVal == unLockValue) {
                lockContent.prop('disabled', false)
            } else {
                lockContent.prop('disabled', true).val("").removeClass("success-input");
            }
            return false;
        }
    })

    // submit details
    $('body').on('blur', '.num-limit', function (e) {
        let min = $(e.target).attr('class').match(/most-\d{3}/g)[0].slice(-3);
        let val = Number($(this).val());
        if (val) {
            if (val < min) {
                $(this).parents('.flex-layout').siblings('.must-red').show();
            } else {
                $(this).parents('.flex-layout').siblings('.must-red').hide();
            }
        }
    })


    $('#submit-form').click(function (e) {
        let flag = true;

        let [flagInfo, flagConfirm, flagEnd] = [true, true, true]
        // 用户信息
        let formClassA = $('.form-class-a').is(':hidden');
        if (!formClassA) {
            // let 
            let isShow = $('.must-top-input');
            for (let j = 0; j < isShow.length; j++) {
                if (isShow[j].value == '') {
                    isShow.eq(j).addClass("error-input")
                    flagInfo = false;
                }
            }
        }

        let formConfirm = $('body').find(".form-confirm-box");
        for (let i = 0; i < formConfirm.length; i++) {
            if (formConfirm.eq(i).is(":visible")) {
                flagConfirm = submitConfirm(flag, $('.form-confirm-box'));
            }
        }
        let chooseEndLevel = $("body").find(".choose-end-level");
        let chooseEndLevelArr = []
        for (let i = 0; i < chooseEndLevel.length; i++) {
            if (chooseEndLevel.eq(i).siblings(".checkbox-kind").hasClass("green-bg")) {
                chooseButtonIndex = chooseEndLevel.eq(i).val() - 1;
                chooseContent = chooseEndLevel.eq(i).parent().parent().siblings('ul')
                if (chooseContent.length == 1) {
                    chooseContent = chooseContent
                } else {
                    chooseContent = chooseContent.eq(chooseButtonIndex)
                }
                flagEnd = submitConfirm(flag, chooseContent);
                chooseEndLevelArr.push(flagEnd)
            }
        }
        if (chooseEndLevelArr.includes(false)) {
            flagEnd = false;
        }
        if (flagInfo && flagConfirm && flagEnd) {
            alert('可以提交');
        } else {
            alert('不可以提交');
        }
    });

    $('body').on('click', '.levelTop', function () {
        let name = $(this).val();
        if (name == 2 || name == 4 || name == 5) {
            $('.form-class-a').hide();
        } else {
            $('.form-class-a').show();
        }
    });
})



