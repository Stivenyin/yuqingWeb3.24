"use strict";
CQ.mainApp.msgController
    .controller("showController",["$scope","$state","$stateParams","msgService",
        function($scope,$state,$stateParams,msgService) {
        $scope.selectList = [];
        $scope.view = 'View All';
        $scope.kong = false;
        $scope.getShowData = function () {
            var cons = {
                // userid:1
            };
            msgService.pushMsg(cons).then(function(res) {
                // console.log(res[0]['is_read'])

                res.sort(function (a,b) {
                    if(a.is_read==false && b.is_read==true)
                        return -1;
                    if(a.is_read==true && b.is_read==false)
                        return 1;

                    return b.send_time>a.send_time?1:-1;
                })
                $scope.showdata=(res);
                $scope.kong=false;
                // $scope.showdata = res;
                console.log('+++++++',$scope.showdata);
            });
            $scope.view = 'View All';
            $("i#All").addClass('fa-circle');
            $("i#Unread").removeClass('fa-circle');
        };
        $scope.getShowData();
        $scope.select = function(item){
            console.log(item);
            if($scope.selectList.indexOf(item._id)==-1)
            $scope.selectList.push(item._id);
            else{
                var index = ($scope.selectList.indexOf(item._id));
                $scope.selectList.splice(index,1);
            }
            console.log($scope.selectList);
        }
        $scope.delmsg = function () {
            console.log("deleting something")
            var cons = {
                _id : $scope.selectList
            }
            msgService.deluserMsg(cons).then(function (res) {
                console.log(res);
                }
            )
        }
        $scope.unreadmsg = function () {

            for(var i=$scope.showdata.length-1;i>=0;i--){
                if($scope.showdata[i]['is_read']==true)
                    $scope.showdata.pop();
                else{
                    break;
                }
            }
            if($scope.showdata.length==0)
                $scope.kong=true;
            $("i#Unread").addClass('fa-circle');
            $("i#All").removeClass('fa-circle');
            $scope.view = 'Unread';
            console.log('----------',$scope.showdata)
        }
        var handleEmailActionButtonStatus=function(){
                if($("[data-checked=email-checkbox]:checked").length!==0)
                {$("[data-email-action]").removeClass("hide")}
                else{$("[data-email-action]").addClass("hide")}};
        var handleEmailCheckboxChecked=function(){
                $("[data-checked=email-checkbox]").live("click",function(){
                var e=$(this).closest("label");
                var t=$(this).closest("li");
                if($(this).prop("checked")){
                    $(e).addClass("active");
                    $(t).addClass("selected")}
                else{$(e).removeClass("active");
                    $(t).removeClass("selected")}handleEmailActionButtonStatus()}
                    )};
        var handleEmailAction=function(){
            $("[data-email-action]").live("click",function(){
                var e="[data-checked=email-checkbox]:checked";
                if($(e).length!==0)
                {
                    $(e).closest("li").slideToggle(function()
                    {
                        $(this).remove();
                        handleEmailActionButtonStatus()
                    })
                }
            })};
        $scope.showdetail = function(msgid)
            {
                $state.go("detailController",{msgid:msgid});
            }
        handleEmailCheckboxChecked();
        handleEmailAction();
    }]);