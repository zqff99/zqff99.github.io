 //https://play.farmersworld.io/static/js/api/farmersworld.js
 var req_this = {}, account_info = {}, auto_clock = 0;
 var farm_account = "4q4jc.wam";
 var prize_obj = {
     "WOOD": {
         "shouyi": 0,
         "count": 0
     },
     "FOOD": {
         "shouyi": 0,
         "count": 0
     },
     "GOLD": {
         "shouyi": 0,
         "count": 0
     }
 }
     function get_time_format(timestamp = false, other = 0) {
         var ndate, Y, m, d, H, i, s;
         if (timestamp) {
             ndate = new Date(timestamp);
         } else {
             ndate = new Date();
         }
         Y = ndate.getFullYear();
         m = ndate.getMonth() + 1;
         d = ndate.getDate();
         H = ndate.getHours();
         i = ndate.getMinutes();
         s = ndate.getSeconds();
         if (m < 10) {
             m = '0' + m;
         }
         if (d < 10) {
             d = '0' + d;
         }
         if (H < 10) {
             H = '0' + H;
         }
         if (i < 10) {
             i = '0' + i;
         }
         if (s < 10) {
             s = '0' + s;
         }
         var t = H + ':' + i + ':' + s;
         if (other == 1) {
             return [H, i, s];
         } else {
             t = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s;
             return t;
         }
     }
 
     function send_request(send_data, res_fun) {
         // https://wax.cryptolions.io/v1/chain/get_table_rows
         fetch("https://api.wax.alohaeos.com/v1/chain/get_table_rows", {
             method: "POST",
             body: JSON.stringify(send_data)
         }).then(res => res_fun(res)); //返回值取的不对
     }
 
     function addzqDiyJs(url, callback) {
         var zqscript = document.createElement("script");
         zqscript.type = "text/javascript";
         if (typeof(callback) != "undefined") {
             if (zqscript.readyState) {
                 zqscript.onreadystatechange = function() {
                     if (zqscript.readyState == "loaded" || zqscript.readyState == "complete") {
                         zqscript.onreadystatechange = null;
                         callback();
                     }
                 };
             } else {
                 zqscript.onload = function() {
                     callback();
                 };
             }
         };
         zqscript.src = url;
         document.body.appendChild(zqscript);
     }
     /*成功
  var aa = req_this.__getTableRows({
  code: req_this.mainCollection,
  scope: req_this.mainCollection,
  table: "accounts",
  lower_bound: req_this.name,
  upper_bound: req_this.name,
  index_position: 1,
  key_type: "i64",
  limit: "100"
  }).then(function(res){
  console.log("测试1", res)
  })
  */
 var call_fun_name = "<select id='call_fun_name'>" +
     "<option value='getUsingItems'>获取工具</option>" +
     "<option value='getEquipConfigs'>获取工具配置</option>" +
     "<option value='mine' title='asset_id' selected='selected'>工具挖掘</option>" +
     "<option value='repair' title='asset_id'>修理工具</option>" +
     "<option value='getUsingBuilding'>获取建筑</option>" +
     "<option value='getBuildingConfig'>获取建筑配置</option>" +
     "<option value='claimBuilding' title='asset_id'>升级建筑</option>" +
     "<option value='getBreedings'>获取当前配种信息</option>" +
     "<option value='getBreedingConf'>获取交配配置</option>" +
     "<option value='breedingClaim' title='有较多参数'>配种</option>" +
     "<option value='getUsingPlants'>获取农作物</option>" +
     "<option value='cropClaim' title='asset_id'>农作物浇水</option>" +
     "<option value='getPlantsConfig'>农作物配置</option>" +
     "<option value='getUsingAnimals'>获取动物</option>" +
     "<option value='careAnimal' title='asset_id'>孵化动物</option>" +
     "<option value='feedAnimal' title='asset_id,consumed_card'>喂养动物</option>" +
     "<option value='getAnimalsConf'>动物配置</option>" +
     "<option value='getUsingBadge'>获取会员卡</option>" +
     "<option value='mbsClaim' title='asset_id'>使用会员卡</option>" +
     "<option value='mbsUnstake' title='asset_id'>解除会员卡质押</option>" +
     "<option value='getItemsBySchema' title='farmercoins,122'>获取农夫币</option>" +
     "<option value='getBadgeConfig'>获取会员配置</option>" +
     "<option value='getBadgeCraft'>获取可制作的会员卡</option>" +
     "<option value='mbsCraft' title='obj，暂无法使用'>制作会员卡，待修改</option>" +
     "<option value='getPlayerInfo'>获取体力，余额</option>" +
     "<option value='getConfig'>获取转出费用</option>" +
     "<option value='getMarketConf'>获取市场交易配置信息</option>" +
     "<option value='getExchangeConf'>获取可交换资源的物品</option>" +
     "<option value='exchangeRewards' title='asset_id'>物品兑换资源</option>" +
     "<option value='stake' title='asset_id,可能需要制作一个表，输出包裹物品的数据'>穿戴物品</option>" +
     "<option value='unstake' title='asset_id'>取下物品</option>" +
     "<option value='getItemsByTemplate' title='template_id，返回值res.data为包裹物品信息数组'>根据t_id获取物品</option>" +
     "<option value='countAssetByTemplate' title='template_id，返回值res.data为包裹物品数量'>根据t_id获取数量</option>" +
     "<option value='countAssetBySchema' title='schema_name:可选值有[plants,foods,farmanimals]，返回值res.data为包裹物品数量'>根据场景获取物品数量</option>" +
     "<option value='getTemplates' title='schema_name:可选值有[plants,foods,farmanimals]，返回值res.data为物品信息数组'>根据场景获取物品信息</option>" +
     "<option value='getItems' title='260676'>获取包裹物品</option>" +
     "</select>";
 var cssStr = "<style type='text/css'>" +
     ".button::-moz-focus-inner{border:0;padding:0;}.button{display:inline-block;*display:inline;zoom:1;padding:6px 20px;margin:0;cursor:pointer;border:1px solid#bbb;overflow:visible;font:bold 13px arial,helvetica,sans-serif;text-decoration:none;white-space:nowrap;color:#555;background-color:#ddd;background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,1)),to(rgba(255,255,255,0)));background-image:-webkit-linear-gradient(top,rgba(255,255,255,1),rgba(255,255,255,0));background-image:-moz-linear-gradient(top,rgba(255,255,255,1),rgba(255,255,255,0));background-image:-ms-linear-gradient(top,rgba(255,255,255,1),rgba(255,255,255,0));background-image:-o-linear-gradient(top,rgba(255,255,255,1),rgba(255,255,255,0));background-image:linear-gradient(top,rgba(255,255,255,1),rgba(255,255,255,0));-webkit-transition:background-color.2s ease-out;-moz-transition:background-color.2s ease-out;-ms-transition:background-color.2s ease-out;-o-transition:background-color.2s ease-out;transition:background-color.2s ease-out;background-clip:padding-box;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:0 1px 0 rgba(0,0,0,.3),0 2px 2px-1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.3)inset;-webkit-box-shadow:0 1px 0 rgba(0,0,0,.3),0 2px 2px-1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.3)inset;box-shadow:0 1px 0 rgba(0,0,0,.3),0 2px 2px-1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.3)inset;text-shadow:0 1px 0 rgba(255,255,255,.9);-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}.button:hover{background-color:#eee;color:#555;}.button:active{background:#e9e9e9;position:relative;top:1px;text-shadow:none;-moz-box-shadow:0 1px 1px rgba(0,0,0,.3)inset;-webkit-box-shadow:0 1px 1px rgba(0,0,0,.3)inset;box-shadow:0 1px 1px rgba(0,0,0,.3)inset;}.button[disabled],.button[disabled]:hover,.button[disabled]:active{border-color:#eaeaea;background:#fafafa;cursor:default;position:static;color:#999;-moz-box-shadow:none!important;-webkit-box-shadow:none!important;box-shadow:none!important;text-shadow:none!important;}.button.small{padding:2px 6px;}.button.purple,.button.red,.button.blue{color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.2);background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(255,255,255,.3)),to(rgba(255,255,255,0)));background-image:-webkit-linear-gradient(top,rgba(255,255,255,.3),rgba(255,255,255,0));background-image:-moz-linear-gradient(top,rgba(255,255,255,.3),rgba(255,255,255,0));background-image:-ms-linear-gradient(top,rgba(255,255,255,.3),rgba(255,255,255,0));background-image:-o-linear-gradient(top,rgba(255,255,255,.3),rgba(255,255,255,0));background-image:linear-gradient(top,rgba(255,255,255,.3),rgba(255,255,255,0));}.button.purple{background-color:#b40dbf;border-color:#d50ae2;}.button.purple:hover{background-color:#d50ae2;}.button.purple:active{background:#d50ae2;}.button.red{background-color:#ca3535;border-color:#c43c35;}.button.red:hover{background-color:#ee5f5b;}.button.red:active{background:#c43c35;}.button.blue{background-color:#269CE9;border-color:#269CE9;}.button.blue:hover{background-color:#70B9E8;}.button.blue:active{background:#269CE9;}.red[disabled],.red[disabled]:hover,.red[disabled]:active{border-color:#C43C35;background:#C43C35;color:#FFD3D3;}.blue[disabled],.blue[disabled]:hover,.blue[disabled]:active{border-color:#269CE9;background:#269CE9;color:#93D5FF;}" +
     "body{color:black;font-size:12px;font-family:'微软雅黑'} ::-webkit-scrollbar{width:12px;} " +
     ".pageArea{width:1560px;height:580px;margin-top:150px;z-index:9990;position:absolute} .msg_userName{color:blue;}" +
     ".page_head{font-size: 16px;font-weight: bold;background: wheat;width: 1473px;opacity: 0.85;}" +
     ".bigFont{font-size:14px;} .anchOpenAll{witdh:40px;}" +
     ".subArea,.userArea,.msgArea,.pay_Area{display:inline-block;vertical-align:top;}" +
     ".first_hr{margin-left:15px;width:}" +
     ".setwhitelist:hover{color:blue;font-weight:bold} .cancelwhitelist:hover{color:blue;font-weight:bold} .cancelwhitelist,.pay_btn_uid{margin-left:3px;padding:0 3px;} .setwhitelist{padding:0 3px;} .pay_btn_uid:hover{color:blue;font-weight:bold}" +
     ".removeMsg:hover{color:blue;font-weight:bold} .setAnchRemark:hover{color:blue;font-weight:bold}" +
     ".diyAnch,.areaAnchs,.areaGangs{height:30px;font-size:14px;}" +
     ".zq_item_stake_name{width:100px;} .load_gangList{margin-right:5px;}" +
     ".getAnchInfoBtn,.getAreaAnchInfoBtn,.getAreaGangInfoBtn{line-height:20px;width:120px;}" +
     ".anch_btnArea,.gang_btnArea{float:right;margin-right:10px;}" +
     ".msg_writeDiv,.anch_openAllDiv,.user_hisDiv,.pay_hisDiv{float:right;margin-right:1px;} .use_index{color:red;font-weight:bold} .delHistory,.clearHistory,.saveHistory,.userHistory,.anchOpenAll{width:80px;}" +
     ".newMsgShow{color:blue;} .leftLabel{margin-left:20px;}" +
     ".msg_textArea{height:220px;width:675px;display:inline-block;vertical-align:top;margin-top:-260px} .err_textInfo{margin-left:20px;}" +
     "#zq_result_text{width:650px;height:212px;margin-left:20px;font-size:13px;margin-top:5px;margin-right:10px;resize:none;}" +
     ".msg_btnArea{float:right;margin-right:10px;font-size:14px;}" +
     ".msg_response{color:#de2241;width:180px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-family:'楷体_GB2312';}" +
     ".msg_save{width:100px;line-height:17px;} .msg_replace{width:360px;line-height:17px;}" +
     ".firstLabel{margin-left:20px;color:blue;} .twoLabel{margin-left:20px;} .getAnchStatus{margin-left:20px;color:red;}" +
     ".subAreaTabel_Div,.userAreaTabel_Div,.payAreaTabel_Div,.msgAreaTabel_Div{background: #ece5bd}"+
     ".subAreaTabel_Div table.thead th,.userAreaTabel_Div table.thead th,.payAreaTabel_Div table.thead th,.msgAreaTabel_Div table.thead th{background: #403636;}"+
     ".subAreaTabel_Div{width:660px;border: 1px solid #EB8;margin-left:15px;margin-top:4px;font-size:14px;}" +//开始tool表格处理，设置固定表格样式
     ".subAreaTabel_Div table{border-collapse:collapse;}" +//统一设置两个table为细线表格
     ".subAreaTabel_Div table.thead{width:100%;}" +
     ".subAreaTabel_Div .col1{width:130px} .subAreaTabel_Div .col2{width:120px} .subAreaTabel_Div .col3{width:90px} .subAreaTabel_Div .col4{width:60px} .subAreaTabel_Div .col5{width:90px} .subAreaTabel_Div .col6{width:60px}" +//设置表格宽度
     ".subAreaTabel_Div table.thead th{border: 1px solid #EB8;border-right:#C96;color:#fff;}" +
     ".subAreaTabel_Div div{width:100%;height:180px;overflow:auto;scrollbar-face-color:#EB8;scrollbar-base-color:#ece9d8;scrollbar-arrow-color:#FF8C00;" +//设置表格高度
     "scrollbar-track-color:#ece9d8;scrollbar-highlight-color:#800040;scrollbar-shadow-color:#800040;scrollbar-3dlight-color: #EB8;scrollbar-darkshadow-Color:#EB8;}" +
     ".subAreaTabel_Div table.tbody{width:100%;border: 1px solid #C96;border-right:#B74;color:#666666;background: #ECE9D8;}" +
     ".subAreaTabel_Div table.tbody td{border:1px solid #C96;}" +//表格处理完成
     ".ulNevel,.utlevel{width:96px} .ulrankL{width:100px} .gang_min,.gang_max{width:58px}" +
     ".userAreaTabel_Div{width:780px;border: 1px solid #EB8;margin-left:15px;margin-top:4px;font-size:14px;}" +//开始crop表格处理，设置固定表格样式
     ".userAreaTabel_Div table{border-collapse:collapse;}" +
     ".userAreaTabel_Div table.thead{width:100%;}" +
     ".userAreaTabel_Div .col1{width:100px} .userAreaTabel_Div .col2{width:120px} .userAreaTabel_Div .col3{width:90px} .userAreaTabel_Div .col4{width:120px}" +//设置表格宽度
     ".userAreaTabel_Div .col5{width:150px} .userAreaTabel_Div .col6{width:60px} .userAreaTabel_Div .col7{width:70px}" +//设置表格宽度
     ".userAreaTabel_Div table.thead th{border: 1px solid #EB8;border-right:#C96;color:#fff;}" +
     ".userAreaTabel_Div div{width:100%;height:180px;overflow:auto;scrollbar-face-color:#EB8;scrollbar-base-color:#ece9d8;scrollbar-arrow-color:#FF8C00;" +//设置表格高度
     "scrollbar-track-color:#ece9d8;scrollbar-highlight-color:#800040;scrollbar-shadow-color:#800040;scrollbar-3dlight-color: #EB8;scrollbar-darkshadow-Color:#EB8;}" +
     ".userAreaTabel_Div table.tbody{width:100%;border: 1px solid #C96;border-right:#B74;color:#666666;background: #ECE9D8;}" +
     ".userAreaTabel_Div table.tbody td{border:1px solid #C96;}" +//表格处理完成
     ".payAreaTabel_Div{width:780px;border: 1px solid #EB8;margin-left:15px;margin-top:4px;font-size:14px;}" +//开始ani表格处理，设置固定表格样式
     ".payAreaTabel_Div table{border-collapse:collapse;}" +
     ".payAreaTabel_Div table.thead{width:100%;}" +
     ".payAreaTabel_Div .col1{width:100px} .payAreaTabel_Div .col2{width:120px} .payAreaTabel_Div .col3{width:90px} .payAreaTabel_Div .col4{width:120px}" +//设置表格宽度
     ".payAreaTabel_Div .col5{width:150px} .payAreaTabel_Div .col6{width:60px} .payAreaTabel_Div .col7{width:70px}" +//设置表格宽度
     ".payAreaTabel_Div table.thead th{border: 1px solid #EB8;border-right:#C96;color:#fff;}" +
     ".payAreaTabel_Div div{width:100%;height:400px;overflow:auto;scrollbar-face-color:#EB8;scrollbar-base-color:#ece9d8;scrollbar-arrow-color:#FF8C00;" +//设置表格高度
     "scrollbar-track-color:#ece9d8;scrollbar-highlight-color:#800040;scrollbar-shadow-color:#800040;scrollbar-3dlight-color: #EB8;scrollbar-darkshadow-Color:#EB8;}" +
     ".payAreaTabel_Div table.tbody{width:100%;border: 1px solid #C96;border-right:#B74;color:#666666;background: #ECE9D8;}" +
     ".payAreaTabel_Div table.tbody td{border:1px solid #C96;}" +//关注表格处理完成
     ".msgAreaTabel_Div{width:660px;border: 1px solid #EB8;margin-left:15px;margin-top:4px;font-size:14px;}" +//开始member表格处理，设置固定表格样式
     ".msgAreaTabel_Div table{border-collapse:collapse;}" +
     ".msgAreaTabel_Div table.thead{width:100%;}" +
     ".msgAreaTabel_Div .col1{width:120px} .msgAreaTabel_Div .col2{width:120px} .msgAreaTabel_Div .col3{width:90px} .msgAreaTabel_Div .col4{width:60px}" +//设置表格宽度
     ".msgAreaTabel_Div .col5{width:60px} .msgAreaTabel_Div .col6{width:150px}" +
     ".msgAreaTabel_Div table.thead th{border: 1px solid #EB8;border-right:#C96;color:#fff;}" +
     ".msgAreaTabel_Div div{width:100%;height:150px;overflow:auto;scrollbar-face-color:#EB8;scrollbar-base-color:#ece9d8;scrollbar-arrow-color:#FF8C00;" +//设置表格高度
     "scrollbar-track-color:#ece9d8;scrollbar-highlight-color:#800040;scrollbar-shadow-color:#800040;scrollbar-3dlight-color: #EB8;scrollbar-darkshadow-Color:#EB8;}" +
     ".msgAreaTabel_Div table.tbody{width:100%;border: 1px solid #C96;border-right:#B74;color:#666666;background: #ECE9D8;}" +
     ".msgAreaTabel_Div table.tbody td{border:1px solid #C96;}" +//表格处理完成
     "tr:hover{background-color:#87CEFA;} td{word-wrap:break-word;word-break:break-all;}" +
     ".table_desc{margin-left:15px;} .table_desc span{color:blue;}" +
     ".msg_userUid{width:100px;border:0px;color:#f00;margin-left:5px;}" +
     ".sendBtn{width:40px;} .getUserByAnchBtn,.setAnchRemark{width:40px;}" +
     "#history_div{ position: absolute; top: 61px;left:320px; width: 720px; z-index: 10;background-color: #E0E5E5; box-shadow:0px 0px 10px #000;}" +
     "#history_div div{width:100%;max-height: 405px;overflow-y: auto;overflow-x:hidden;}" +//设置表格高度
     "#history_div table{border-collapse:collapse;table-layout:fixed; }" +
     "#history_div table.thead{width:100%; font-size:14px;height:28px;font-family: Georgia; color: #f706cc; word-wrap:break-word;padding: 0; }" +
     "#history_div table.thead th{width:100%;border: 1px solid #494980;border-right:#494980;text-align:center;background-color:#fbdfdf}" +
     "#history_div table.tbody{width:100%;border: 1px solid #494980;border-right:#494980;}" +
     "#history_div table .col1{ width: 150px;} #history_div table .col2{ width: 180px;} #history_div table .col3{ width: 120px;}" +
     "#history_div table .col4{ width: 120px;} .his_nickname{color:red;margin-right:5px;float:right;}" +
     ".hisMsg_box tr td{padding:0px 5px;}" +
     ".hisImg{max-height: 100px;max-width: 405px;}" +
     ".his_right{text-align:right;color:#f13103;}" +
     "#history_div table tr:hover{background-color: #D9D9D9;} .pay_count{color:#f26559}" +
     "#history_div tr{border-bottom:1; width: 500px; margin-bottom: 0px; }" +
     "#imgBody{position: absolute;background:rgba(152,142,142,0.6); display: none;top:0px;left:0px;z-index:9999}" +
     "#maxImg{opacity:1;} .msg_errorInfo_test{word-wrap:break-word;width:100px;} .msg_errorInfo{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:160px}" +
     ".level_exp_div{position:relative;display:inline-block;vertical-align:top; background:#000; width:200px; height:20px;margin-left:10px;}" +
     ".exp_len{background:#e6b035;width:calc(0*200px);display:inline-block;vertical-align:top;height:20px}" +
     ".exp_font{position:absolute;top:0px;left:10px;color:#dd59f5;}" +
     "</style>";
 var bodyStr = "<div class='pageArea'>" +
     "<div class='page_head'>" +
     "<label class='leftLabel'>用户名称：</label><input type='text' class='msg_userUid' value='正在加载数据...'/>" +
     "<label class='leftLabel'>余额：</label><span class='msg_userName'></span>" +
     "<label class='leftLabel'>体力：</label><span class='newMsgShow'></span>" +
     "<br/><hr class='first_hr'/>" +
     "</div>" +
     "<div class='subArea'><div class='table_desc'><span class='subArea_desc'></span><span>工具列表(<span class='anch_count'></span>)：</span>" +
     "<div class='anch_openAllDiv'><input type='text' placeholder='物品名称' class='zq_item_stake_name' />" +
     "<input type='button' value='穿戴工具' class='zq_item_stake small purple button' /> " +
     "<input value='一键修理' type='button' class='zq_check_repair small purple button'> " +
     "<input type='button' value='扫描工具' class='zq_check_mining small purple button' /> " +
     "<input type='button' value='费用' class='zq_check_fee small red button' /> </div></div>" +
     "<div class='subAreaTabel_Div'>" +//加载tool表格
     "<table class='thead'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'></col><col class='col6'></col><col class='col7'><tbody>" +
     "<tr class='anch_Title'><th>工具名称</th><th>asset_id</th><th>template_id</th><th>类型</th><th>耐久</th><th>倒计时</th><th>操作</th></tr>" +
     "</tbody></table><div><table class='tbody'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'><col class='col5'></col><col class='col6'></col><col class='col7'></col><tbody class='subAreaTbody'>" +
     "</tbody></table></div></div></div>" +//开始加载crop表
     "<div class='userArea'><div class='table_desc'><span class='userArea_desc'></span><span>谷物列表(<span class='user_count'></span>)：</span>" +
     "<div class='user_hisDiv'><input value='Barley Seed' type='button' class='Barley_Seed_count small blue button'> <input value='Corn Seed' type='button' class='Corn_Seed_count small blue button'> " +
     "<input type='button' value='一键大麦' class='zq_quick_Barley small purple button' /> <input type='button' value='一键玉米' class='zq_quick_Corn small purple button' /> " +
     "<input value='一键种植' type='button' class='zq_quick_Crops small purple button' /> " +
     "<input type='button' value='扫描谷物' class='zq_check_crops small purple button' />" +
     "</div></div>" +
     "<div class='userAreaTabel_Div'>" +//加载crop表格
     "<table class='thead'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'></col><col class='col6'></col><col class='col7'></col><col class='col8'></col><tbody>" +
     "<tr><th>谷物名称</th><th>asset_id</th><th>template_id</th><th>场地ID</th><th>上次收割时间</th><th>倒计时</th><th>种植次数</th><th>操作</th></tr>" +
     "</tbody></table><div><table class='tbody'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'></col><col class='col6'></col><col class='col7'></col><col class='col8'></col><tbody class='userAreaTbody'>" +
     "</tbody></table></div></div>" +//crop表格加载完毕，开始加载会员表
     "</div><div class='msgArea'><div class='table_desc'><span class='msgArea_desc'></span><span>会员信息(<span class='msg_count'></span>)：</span>" +
     "<div class='msg_writeDiv'><input value='farmercoins' type='button' class='farmercoins small blue button'></div></div>" +//加载会员区域
     "<div class='msgAreaTabel_Div'>" +//加载member表格
     "<table class='thead'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'><col class='col6'></col><col class='col7'></col><tbody>" +
     "<tr><th>会员名称</th><th>asset_id</th><th>template_id</th><th>类型</th><th>倒计时</th><th>解锁时间</th><th>操作</th></tr>" +
     "</tbody></table><div><table class='tbody'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'><col class='col6'></col><col class='col7'></col><tbody class='msgAreaTbody'>" +
     "</tbody></table></div></div>" +//ani表格加载完毕
     "</div><div class='pay_Area'><div class='table_desc'><span class='payArea_desc'></span><span>动物列表(鸡窝：<span class='mypay_count'></span>)(牛棚：<span class='myfollow_count'></span>)</span>" +
     "<div class='pay_hisDiv'><input value='Baby Calf' type='button' class='Baby_Calf_count small blue button'> " +
     "<input value='Chicken Egg' type='button' class='Chicken_Egg_count small blue button'> " +
     "<input value='Milk' type='button' class='Milk_count small blue button'> " +
     "<input value='Barley' type='button' class='Barley_count small blue button' title=''> " +
     "<input value='Corn' type='button' class='Corn_count small blue button' /> <input type='button' value='扫描动物' class='zq_check_animals small purple button' /></div></div>" +
     "<div class='payAreaTabel_Div'>" +//加载动物表格
     "<table class='thead'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'></col><col class='col6'></col><col class='col7'></col></col><col class='col8'></col><tbody>" +
     "<tr><th>动物名称</th><th>asset_id</th><th>template_id</th><th>场地ID</th><th>喂养时间</th><th>倒计时</th><th>喂养次数</th><th>操作</th></tr>" +
     "</tbody></table><div><table class='tbody'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'></col><col class='col6'></col><col class='col7'></col></col><col class='col8'></col><tbody class='pay_listTbody'>" +
     "</tbody></table></div></div>" +
     "</div>" +
     "<div class='msg_textArea'><hr class='first_hr'><div><label class='firstLabel bigFont'>信息内容：</label>" +//加载包裹表格
     "<div class='msg_btnArea'><span>备注：</span><input type='text' class='msg_replace' placeholder='信息记录用'/> <input type='button' class='msg_save small blue button' value='保存记录'/></div></div>" +
     "<textarea id='zq_result_text'></textarea><br>" +
     "<div id='history_div'>" +
     "<table class='thead'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'></col><tbody>" +
     "<tr><th>name</th><th>asset_id</th><th>template_id</th><th>schema_name</th><th>tool<input value='X' type='button' class='his_nickname small red button'></th></tr>" +
     "</tbody></table>" +
     "<div id='his_scroll_div'><table class='tbody' border='1'>" +
     "<col class='col1'></col><col class='col2'></col><col class='col3'></col><col class='col4'></col><col class='col5'></col>" +
     "<tbody class='hisMsg_box'></tbody></table></div></div>" +//加载用户图片弹窗
     "<div id='imgBody'><img id='maxImg'/></div>" +
     "</div></div>";
 var stylestr = ".c_alert_dialog * {box-sizing: border-box;}.c_alert_dialog{-webkit-tap-highlight-color:rgba(0,0,0,0);color:#111;position:fixed;left:0px;top:0px;z-index:9998;width:100%;height:100%;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center}.c_alert_mask{position:absolute;left:0;top:0px;width:100%;height:100%;z-index:505;background:rgba(0,0,0,.78);opacity:0;visibility:hidden;-webkit-transition:all .5s ease}.dialog_open .c_alert_mask{opacity:1;visibility:initial}.c_alert_wrap{z-index:1200;max-width:400px;position:relative;background:#fff;height:auto;border-radius:10px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.25);font-size:15px;opacity:0}.c_alert_title{padding:17px 14px 0 14px;line-height:1;margin-bottom:-2px;text-align:left;font-weight:bold;font-size:16px;position:relative}.c_alert_con{text-align:left;font-size:15px;line-height:1.4;color: #444;padding:12px 14px}.c_alert_title.c_alert_con{padding:16px 14px}.c_alert_btn{border-top:1px solid #e7e7e7;overflow:hidden;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center}.c_alert_btn a{font-weight:bold;line-height:1;text-align:center;color:#228BFE;text-decoration:none;-webkit-appearance:none;-webkit-tap-highlight-color:rgba(0,0,0,0);display:block;padding:13px 0;font-size:16px;margin:0;background:0 0;border:none;border-radius:0;letter-spacing:1px;cursor:pointer;border-left:1px solid #e7e7e7;width:100%;transition:all .2s ease;-webkit-transition:all .2s ease}.c_alert_btn a:first-child{border-left:none}.c_alert_btn a:active{background:#eee}.dialog_open .c_alert_wrap,.dialog_close .c_alert_wrap{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.dialog_open .c_alert_wrap{-webkit-animation-name:anim-open;animation-name:anim-open}.dialog_close .c_alert_wrap{-webkit-animation-name:anim-close;animation-name:anim-close;-webkit-animation-duration:0.3s;animation-duration:0.3s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}.c_alert_width.c_alert_wrap{width:80%}@media screen and (max-width:800px){.c_alert_wrap{max-width:80%;border-radius:10px}}@-webkit-keyframes anim-open{0%{opacity:0;-webkit-transform:matrix3d(0.7,0,0,0,0,0.7,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.7,0,0,0,0,0.7,0,0,0,0,1,0,0,0,0,1)}2.083333%{-webkit-transform:matrix3d(0.75266,0,0,0,0,0.76342,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.75266,0,0,0,0,0.76342,0,0,0,0,1,0,0,0,0,1)}4.166667%{-webkit-transform:matrix3d(0.81071,0,0,0,0,0.84545,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.81071,0,0,0,0,0.84545,0,0,0,0,1,0,0,0,0,1)}6.25%{-webkit-transform:matrix3d(0.86808,0,0,0,0,0.9286,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.86808,0,0,0,0,0.9286,0,0,0,0,1,0,0,0,0,1)}8.333333%{-webkit-transform:matrix3d(0.92038,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.92038,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}10.416667%{-webkit-transform:matrix3d(0.96482,0,0,0,0,1.05202,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.96482,0,0,0,0,1.05202,0,0,0,0,1,0,0,0,0,1)}12.5%{-webkit-transform:matrix3d(1,0,0,0,0,1.08204,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1.08204,0,0,0,0,1,0,0,0,0,1)}14.583333%{-webkit-transform:matrix3d(1.02563,0,0,0,0,1.09149,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.02563,0,0,0,0,1.09149,0,0,0,0,1,0,0,0,0,1)}16.666667%{-webkit-transform:matrix3d(1.04227,0,0,0,0,1.08453,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.04227,0,0,0,0,1.08453,0,0,0,0,1,0,0,0,0,1)}18.75%{-webkit-transform:matrix3d(1.05102,0,0,0,0,1.06666,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.05102,0,0,0,0,1.06666,0,0,0,0,1,0,0,0,0,1)}20.833333%{-webkit-transform:matrix3d(1.05334,0,0,0,0,1.04355,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.05334,0,0,0,0,1.04355,0,0,0,0,1,0,0,0,0,1)}22.916667%{-webkit-transform:matrix3d(1.05078,0,0,0,0,1.02012,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.05078,0,0,0,0,1.02012,0,0,0,0,1,0,0,0,0,1)}25%{-webkit-transform:matrix3d(1.04487,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.04487,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}27.083333%{-webkit-transform:matrix3d(1.03699,0,0,0,0,0.98534,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.03699,0,0,0,0,0.98534,0,0,0,0,1,0,0,0,0,1)}29.166667%{-webkit-transform:matrix3d(1.02831,0,0,0,0,0.97688,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.02831,0,0,0,0,0.97688,0,0,0,0,1,0,0,0,0,1)}31.25%{-webkit-transform:matrix3d(1.01973,0,0,0,0,0.97422,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.01973,0,0,0,0,0.97422,0,0,0,0,1,0,0,0,0,1)}33.333333%{-webkit-transform:matrix3d(1.01191,0,0,0,0,0.97618,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.01191,0,0,0,0,0.97618,0,0,0,0,1,0,0,0,0,1)}35.416667%{-webkit-transform:matrix3d(1.00526,0,0,0,0,0.98122,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00526,0,0,0,0,0.98122,0,0,0,0,1,0,0,0,0,1)}37.5%{-webkit-transform:matrix3d(1,0,0,0,0,0.98773,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,0.98773,0,0,0,0,1,0,0,0,0,1)}39.583333%{-webkit-transform:matrix3d(0.99617,0,0,0,0,0.99433,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99617,0,0,0,0,0.99433,0,0,0,0,1,0,0,0,0,1)}41.666667%{-webkit-transform:matrix3d(0.99368,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99368,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}43.75%{-webkit-transform:matrix3d(0.99237,0,0,0,0,1.00413,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99237,0,0,0,0,1.00413,0,0,0,0,1,0,0,0,0,1)}45.833333%{-webkit-transform:matrix3d(0.99202,0,0,0,0,1.00651,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99202,0,0,0,0,1.00651,0,0,0,0,1,0,0,0,0,1)}47.916667%{-webkit-transform:matrix3d(0.99241,0,0,0,0,1.00726,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99241,0,0,0,0,1.00726,0,0,0,0,1,0,0,0,0,1)}50%{opacity:1;-webkit-transform:matrix3d(0.99329,0,0,0,0,1.00671,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99329,0,0,0,0,1.00671,0,0,0,0,1,0,0,0,0,1)}52.083333%{-webkit-transform:matrix3d(0.99447,0,0,0,0,1.00529,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99447,0,0,0,0,1.00529,0,0,0,0,1,0,0,0,0,1)}54.166667%{-webkit-transform:matrix3d(0.99577,0,0,0,0,1.00346,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99577,0,0,0,0,1.00346,0,0,0,0,1,0,0,0,0,1)}56.25%{-webkit-transform:matrix3d(0.99705,0,0,0,0,1.0016,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99705,0,0,0,0,1.0016,0,0,0,0,1,0,0,0,0,1)}58.333333%{-webkit-transform:matrix3d(0.99822,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99822,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}60.416667%{-webkit-transform:matrix3d(0.99921,0,0,0,0,0.99884,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99921,0,0,0,0,0.99884,0,0,0,0,1,0,0,0,0,1)}62.5%{-webkit-transform:matrix3d(1,0,0,0,0,0.99816,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,0.99816,0,0,0,0,1,0,0,0,0,1)}64.583333%{-webkit-transform:matrix3d(1.00057,0,0,0,0,0.99795,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00057,0,0,0,0,0.99795,0,0,0,0,1,0,0,0,0,1)}66.666667%{-webkit-transform:matrix3d(1.00095,0,0,0,0,0.99811,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00095,0,0,0,0,0.99811,0,0,0,0,1,0,0,0,0,1)}68.75%{-webkit-transform:matrix3d(1.00114,0,0,0,0,0.99851,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00114,0,0,0,0,0.99851,0,0,0,0,1,0,0,0,0,1)}70.833333%{-webkit-transform:matrix3d(1.00119,0,0,0,0,0.99903,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00119,0,0,0,0,0.99903,0,0,0,0,1,0,0,0,0,1)}72.916667%{-webkit-transform:matrix3d(1.00114,0,0,0,0,0.99955,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00114,0,0,0,0,0.99955,0,0,0,0,1,0,0,0,0,1)}75%{-webkit-transform:matrix3d(1.001,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.001,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}77.083333%{-webkit-transform:matrix3d(1.00083,0,0,0,0,1.00033,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00083,0,0,0,0,1.00033,0,0,0,0,1,0,0,0,0,1)}79.166667%{-webkit-transform:matrix3d(1.00063,0,0,0,0,1.00052,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00063,0,0,0,0,1.00052,0,0,0,0,1,0,0,0,0,1)}81.25%{-webkit-transform:matrix3d(1.00044,0,0,0,0,1.00058,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00044,0,0,0,0,1.00058,0,0,0,0,1,0,0,0,0,1)}83.333333%{-webkit-transform:matrix3d(1.00027,0,0,0,0,1.00053,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00027,0,0,0,0,1.00053,0,0,0,0,1,0,0,0,0,1)}85.416667%{-webkit-transform:matrix3d(1.00012,0,0,0,0,1.00042,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1.00012,0,0,0,0,1.00042,0,0,0,0,1,0,0,0,0,1)}87.5%{-webkit-transform:matrix3d(1,0,0,0,0,1.00027,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1.00027,0,0,0,0,1,0,0,0,0,1)}89.583333%{-webkit-transform:matrix3d(0.99991,0,0,0,0,1.00013,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99991,0,0,0,0,1.00013,0,0,0,0,1,0,0,0,0,1)}91.666667%{-webkit-transform:matrix3d(0.99986,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99986,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}93.75%{-webkit-transform:matrix3d(0.99983,0,0,0,0,0.99991,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99983,0,0,0,0,0.99991,0,0,0,0,1,0,0,0,0,1)}95.833333%{-webkit-transform:matrix3d(0.99982,0,0,0,0,0.99985,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99982,0,0,0,0,0.99985,0,0,0,0,1,0,0,0,0,1)}97.916667%{-webkit-transform:matrix3d(0.99983,0,0,0,0,0.99984,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(0.99983,0,0,0,0,0.99984,0,0,0,0,1,0,0,0,0,1)}100%{opacity:1;-webkit-transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);transform:matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}}@-webkit-keyframes anim-close{0%{opacity:1}100%{opacity:0;-webkit-transform:scale3d(0.8,0.8,1)}}";
 var htmlstr = "<style>" + stylestr + " .zq_postion_div{position:absolute;left:130px;top:3px;z-index:9990;}" +
     "#zq_kuozhan_div{position:absolute;left:130px;top:26px;width:1000px;z-index:9999;padding:5px;background:#ecd0d7}" +
     ".zq_kuozhan_msg_area,.zq_kuozhan_other_area{display:inline-block;vertical-align:top;}" +
     ".zq_kuozhan_kuozhan_area{width:328px} .energy_low_limit,.repair_low_limit,.req_limit_count{width:60px}</style>" +
     "<div class='zq_postion_div'><input type='button' value='扩展功能' class='zq_kuozhan_area small blue button'/> <input type='button' value='扫描建筑' class='zq_check_build small blue button' /> " +
     "<input type='button' value='补充体力' class='zq_check_health small blue button' /> " + call_fun_name +
     "<input type='text' class='saveHistory' placeholder='调用的方法'> <input type='text' class='delHistory' placeholder='参数1'> " +
     "<input type='text' class='clearHistory' placeholder='参数2'> <input value='发起请求' type='button' class='userHistory small red button' title='如不填第二个参数，则只发第一个参数的请求'> " +
     "<input type='button' value='载入数据' class='zq_load_data small blue button' /> <input type='button' value='查看数据' class='zq_show_conf small blue button' /> " +
     "<input type='button' value='打开包裹' class='zq_open_items_table small purple button' /> <input type='button' value='强制登录' class='zq_login_wallet small blue button' /></div>" +
     "<div id='zq_kuozhan_div'><div><div class='zq_kuozhan_msg_area'><textarea id='zq_info_show' style='width:660px;height:80px;'></textarea></div>" +
     "<div class='zq_kuozhan_other_area'><div class='zq_kuozhan_kuozhan_area'>" +
     "<div><input type='checkbox' checked class='map_check' value='tools'/><span>tools：</span> low_repair：<input type='text' class='repair_low_limit' value='0.1'/></div>" +
     "<div><input type='checkbox' checked class='map_check' value='crops'/><span>crops：</span> <input type='checkbox' checked class='map_check' value='auto_plot_crops'/>auto_crops</div>" +
     "<div><input type='checkbox' checked class='map_check' value='animals'/><span>animals：</span></div>" +
     "<div><input type='checkbox' class='map_check' value='buildings'/><span>buildings：</span></div>" +
     "<div><input type='checkbox' checked class='map_check' value='mbs'/><span>member：</span></div>" +
     "<div><input type='checkbox' checked class='map_check' value='config'/><span>fee：</span></div>" +
     "<div><input type='checkbox' checked class='map_check' value='auto_check_Items'/><span>check_Items：</span></div>" +
     "<div><input type='checkbox' checked class='map_check' value='accounts'/><span>energy：</span><input type='text' class='energy_low_limit' value='240'/></div>" +
     "<div><input type='checkbox' checked class='req_limit_check'/><span>req_limit_count：</span><input type='text' class='req_limit_count' value='2'/></div>" +
     "</div><textarea id='zq_result_desc' style='width:328px;height:80px;'></textarea></div></div>" +
     "<div><span>时间：</span><input type='text' class='zq_start_pos' style='width:100px;' value='0' title='计时器开始变化时，意味着脚本在运行中'/> " +
     "<span>金币：</span><input type='text' class='zq_tran_gold' style='width:60px;' value='0'/> " +
     "<span>食物：</span><input type='text' class='zq_tran_food' style='width:60px;' value='0'/> " +
     "<span>木头：</span><input type='text' class='zq_tran_wood' style='width:60px;' value='0'/> " +
     "<span>费用：</span><input type='text' class='zq_tran_fee' style='width:30px;' value='0'/> " +
     "<input type='button' id='zq_deposit' class='small purple button' value='转入资源'/> <input type='button' id='zq_withdraw' class='small purple button' value='转出资源'/> " +
     "<input type='button' id='zq_open_auto_script' class='small red button' value='启动脚本'/> <input type='button' id='zq_stop_auto_script' class='small blue button' value='停止脚本'/> " +
     "<input type='button' class='zq_zhiding_area small blue button' value='脚本配置'/>" +
     "</div></div>";
 var transaction_request = 0;
 var limit_req = 2;//限制每分钟最多2次请求，降低请求频率和CPU占用
 var limit_time_obj = {//存大于0的值，且最小的值，而limit_time存所有工具最小值,包含负值
    "tool" : 99999,
    "crop" : 99999,
    "member" : 99999,
    "animal" : 99999,
    "building" : 99999,
 };
 var data_fun = {
     "show_text": function(astr) {
         $("#zq_result_text").val($("#zq_result_text").val() + get_time_format() + " " + astr + "\n");
         document.getElementById("zq_result_text").scrollTop = document.getElementById("zq_result_text").scrollHeight;
     },
     "show_balance": function() {
         $("#zq_result_text").val($("#zq_result_text").val() + get_time_format() + " #账户余额：[" + account_info.accounts[0].balances.join("，") + " 体力：" + account_info.accounts[0].energy + "]\n");
         document.getElementById("zq_result_text").scrollTop = document.getElementById("zq_result_text").scrollHeight;
     },
     "get_prize": function() {
         var str = "";
         for (var k in prize_obj) {
             str += k + "：" + prize_obj[k].shouyi.toFixed(4) + "，收割次数：" + prize_obj[k].count + "\n";
         }
         $("#zq_result_desc").val(str);
     },
     "template_ids": {
         298593: "Milk",
         318606: "Barley",
         318607: "Corn",
     },
     "no_feed_list": {},
     "no_mine_list" : {},
     "get_conf": function() {
         var conf_data = {};
         for (var k in account_info) {
             if (k.indexOf("conf") != -1) {
                 for (var i = 0; i < account_info[k].length; i++) {
                     if (account_info[k][i].template_id != undefined) {
                         conf_data[account_info[k][i].template_id] = account_info[k][i];
                     } else {
                         conf_data["000000"] = account_info[k][i];
                     }
                 }
             }
         }
         return conf_data;
     },
     "balance_obj" : {},
     "energy" : 0,
     "item_count_obj" : {},
     "is_mine" : 0,
     "get_balance" : function(){
         if(account_info.accounts != undefined && account_info.accounts.length>0 && account_info.accounts[0].balances != undefined){
             var temp_arr, biandong_val, biandong_energy;
             var chushi_balance_obj = {}, chushi_energy = 0;
             for(var k in data_fun.balance_obj){
                 chushi_balance_obj[k] = data_fun.balance_obj[k];
             }
             chushi_energy = data_fun.energy;
             if(account_info.accounts[0].energy != undefined){
                 data_fun.energy = account_info.accounts[0].energy;
                 biandong_energy = data_fun.energy - chushi_energy;
                 if(biandong_energy != 0){
                     data_fun.show_text("【体力】：" + biandong_energy);
                 }
             }
             for(var i=0;i<account_info.accounts[0].balances.length;i++){
                 temp_arr = account_info.accounts[0].balances[i].replace(/(\d+\.\d+) ([A-Za-z]{4})/g,"$1#$2").split("#");
                 data_fun.balance_obj[temp_arr[1]] = parseFloat(temp_arr[0]);
                 if(chushi_balance_obj[temp_arr[1]] != undefined){
                     biandong_val = data_fun.balance_obj[temp_arr[1]] - chushi_balance_obj[temp_arr[1]];
                     if(biandong_val != 0){
                         $("#zq_info_show").val($("#zq_info_show").val() + get_time_format() + " 【" + temp_arr[1] + "】：" + biandong_val.toFixed(4) + "\n");
                         document.getElementById("zq_info_show").scrollTop = document.getElementById("zq_info_show").scrollHeight;
                         if(data_fun.is_mine >= 1 && biandong_val > 0){
                             prize_obj[temp_arr[1]].shouyi += parseFloat(biandong_val.toFixed(4));
                             prize_obj[temp_arr[1]].count++;
                             data_fun.show_text("#收获:" + biandong_val.toFixed(4) + " " + temp_arr[1]);
                             data_fun.get_prize();
                             data_fun.is_mine = 2;
                         }
                     }
                 }
             }
             if(data_fun.is_mine == 2){
                 data_fun.is_mine = 0;
             }
         }
     },
     "get_rewards": function(transaction_id) {
         if(transaction_request != 0){
             transaction_request(transaction_id).then(function(res){
                 for (var i = 0; i < res.actions.length; i++) {
                     if (res.processed.actions[i].act != undefined && res.processed.actions[i].act.data != undefined && res.processed.actions[i].act.data.rewards != undefined) {
                         var rws = res.processed.actions[i].act.data.rewards;
                         if (rws != undefined && rws.length > 0) {
                             var re_counts = rws[0].replace(/(\d+\.\d+) (.*)/g, "$1##$2").split("##");
                             if (parseFloat(re_counts[0]) > 0) {
                                 prize_obj[re_counts[1]].shouyi += parseFloat(re_counts[0]);
                                 prize_obj[re_counts[1]].count++;
                                 data_fun.show_text("#获得:" + rws[0]);
                                 data_fun.get_prize();
                             }
                         }
                     }
                 }
             })
         }
     },
 };
 var clock_time_fun = 1;
 var req_api = {
     "tools": {
         "check": function(repair_val = 0.1) {
             req_this.getUsingItems().then(function(res) {
                 req_api.tools.list();
                 for (var i = 0; i < account_info.tools.length; i++) {
                     if (account_info.tools[i].current_durability < account_info.tools[i].durability && account_info.tools[i].current_durability / account_info.tools[i].durability < repair_val) {
                         req_api.tools.repair(i);
                     }
                     if (account_info.tools[i].next_availability <= Number(new Date()) / 1000) {
                         req_api.tools.mine(i);
                     }
                 }
             });
         },
         "mine": function(index) {
             if (data_fun.no_mine_list[account_info.tools[index].asset_id] == undefined) {
                limit_req--;
                if(limit_req>=0){
                    req_this.mine(account_info.tools[index].asset_id).then(function(res) {
                        //console.log("返回值",res)
                        //console.log("交易编号",res.transaction_id);//有正常交易编号则成功
                        if (res.transaction_id != undefined && res.transaction_id != "") {
                            data_fun.show_text("#挖矿asset_id:" + account_info.tools[index].asset_id);
                            for (var i = 0; i < res.processed.action_traces.length; i++) {
                                if (res.processed.action_traces[i].inline_traces != undefined) {
                                    for (var j = 0; j < res.processed.action_traces[i].inline_traces.length; j++) {
                                        var rws = res.processed.action_traces[i].inline_traces[j].act.data.rewards;
                                        if (rws != undefined && rws.length > 0) {
                                            var re_counts = rws[0].replace(/(\d+\.\d+) (.*)/g, "$1##$2").split("##");
                                            if (parseFloat(re_counts[0]) > 0) {
                                                data_fun.is_mine = 1;
                                            }
                                        }
                                    }
                                }
                            }
                            setTimeout(function() {
                                req_this.getUsingItems().then(res => req_api.tools.list());
                            }, 2000);
                        } else {
                            req_this.getUsingItems().then(res => req_api.tools.list()); //如果请求失败，则更新account_info.tools数据
                        }
                    });
                }
             }
         },
         "repair": function(index) {
            limit_req--;
            if(limit_req>=0){
                req_this.repair(account_info.tools[index].asset_id).then(function(res) {
                    if (res.transaction_id != undefined && res.transaction_id != "") {
                        data_fun.show_text("#修复asset_id:" + account_info.tools[index].asset_id);
                        setTimeout(function() {
                            req_this.getUsingItems().then(res => req_api.tools.list());
                        }, 1000);
                    } else {
                        req_this.getUsingItems().then(res => req_api.tools.list());
                    }
                });
             }
         },
         "list": function(repair_val = 0.1) {
             var str = "";
             var tools_by_template_id = {};
             for (var i = 0; i < account_info.toolconfs.length; i++) {
                 tools_by_template_id[account_info.toolconfs[i].template_id] = account_info.toolconfs[i];
             }
             var cur_time = parseInt(new Date().getTime() / 1000);
             var re_time = 0;
             limit_time_obj.tool = 99999;
             for (var i = 0; i < account_info.tools.length; i++) {
                 re_time = account_info.tools[i].next_availability - cur_time;
                 if(re_time > 0 && re_time < limit_time_obj.tool){
                    limit_time_obj.tool = re_time;
                 }
                 if (re_time < 0) {
                     if (account_info.tools[i].current_durability < account_info.tools[i].durability && account_info.tools[i].current_durability / account_info.tools[i].durability < repair_val) {
                         req_api.tools.repair(i);
                     }
                     req_api.tools.mine(i);
                 }
                 str += "<tr><td>" + tools_by_template_id[account_info.tools[i].template_id].template_name +
                  "</td><td>" + account_info.tools[i].asset_id + "</td><td>" + account_info.tools[i].template_id +
                   "</td><td>" + account_info.tools[i].type + "</td><td>" + account_info.tools[i].current_durability +
                    "/ " + account_info.tools[i].durability + "</td><td class='tool_time'>" + re_time +
                     "秒</td><td><input value='修理' type='button' class='repair_buttons' /> <input type='checkbox' value='" +
                     account_info.tools[i].asset_id + "' tool_name='"+
                     tools_by_template_id[account_info.tools[i].template_id].template_name+
                     "' class='no_mine_list'><span>禁用</span></td></tr>";
             }
             $(".subAreaTbody").html(str);
             var repair_buttons = document.getElementsByClassName("repair_buttons");
             var no_mine_lists = document.getElementsByClassName("no_mine_list");
             for (var i = 0; i < repair_buttons.length; i++) {
                 repair_buttons[i].onclick = (function(k) {
                     return function() {
                         req_api.tools.repair(k);
                     }
                 })(i)
                 no_mine_lists[i].onclick = (function(k) {
                     return function() {
                         if (no_mine_lists[k].checked) {
                             data_fun.no_mine_list[no_mine_lists[k].value] = no_mine_lists[k].getAttribute("tool_name");
                         } else {
                             delete data_fun.no_mine_list[no_mine_lists[k].value];
                         }
                     }
                 })(i)
             }
         },
         "conf": function() {
             req_this.getEquipConfigs();
         }, //建造工具所需材料
     }, //我的工具信息
     "buildings": {
         "check": function() {
             req_this.getUsingBuilding().then(function(res) {
                 var re_time = 0;
                 limit_time_obj.building = 99999;
                 for (var i = 0; i < account_info.buildings.length; i++) {
                    re_time = account_info.buildings[i].next_availability - Number(new Date()) / 1000;
                    if(re_time>0){
                        if(re_time < limit_time_obj.building){
                            limit_time_obj.building = re_time;
                        }
                    }
                     if (account_info.buildings[i].is_ready != 1 && re_time <= 0) {
                         req_api.buildings.claim_Building(i);
                     }
                 }
             });
         },
         "auto_Farm_plot": function() {
             for (var i = 0; i < account_info.buildings.length; i++) {
                 if (account_info.buildings[i].is_ready == 1 && account_info.buildings[i].template_id == 298592 && account_info.buildings[i].name == "Farm Plot") {
                     req_api.stake.auto_wear_seed();
                     break;
                 }
             }
         },
         "claim_Building": function(index) {
            limit_req--;
            if(limit_req>=0){
                req_this.claimBuilding(account_info.buildings[index].asset_id).then(function(res) {
                    if (res.transaction_id != undefined && res.transaction_id != "") {
                        data_fun.show_text("#升级asset_id:" + account_info.buildings[index].asset_id + ":" + account_info.buildings[index].times_claimed);
                        setTimeout(function() {
                            req_this.getUsingBuilding();
                        }, 1000);
                    } else {
                        req_this.getUsingBuilding();
                    }
                });
             }
         },
         "conf": function() {
             req_this.getBuildingConfig();
         },
     }, //我的建筑信息,claimBuilding---bldclaim#asset_id,craftBuilding---mintbld#template_id
     "breedings": {
         "check": function() {
             req_this.getBreedings();
         },
         "conf": function() {
             req_this.getBreedingConf();
         }
     }, //配种信息,breedingStart--brdstart#partner_id#bearer_id，breedingClaim--#memo#memo#asset_ids（貌似是jiao配）
     "crops": {
         "check": function() {
             req_this.getUsingPlants().then(function(res) {
                 req_api.crops.list();
                 for (var i = 0; i < account_info.crops.length; i++) {
                     if (account_info.crops[i].next_availability <= Number(new Date()) / 1000) {
                         req_api.crops.water(i);
                     }
                 }
             });
         },
         "water": function(index) {
             //data_fun.show_balance();
             limit_req--;
            if(limit_req>=0){
                req_this.cropClaim(account_info.crops[index].asset_id).then(function(res) {
                    if (res.transaction_id != undefined && res.transaction_id != "") {
                        data_fun.show_text("#浇水asset_id:" + account_info.crops[index].asset_id);
                        setTimeout(function() {
                            req_this.getUsingPlants().then(res => req_api.crops.list());
                        }, 2000);
                    } else {
                        req_this.getUsingPlants().then(res => req_api.crops.list()); //如果请求失败，则更新account_info.tools数据
                    }
                });
             }
         },
         "list": function() {
             var str = "";
             var crops_by_template_id = {};
             for (var i = 0; i < account_info.cropconf.length; i++) {
                 crops_by_template_id[account_info.cropconf[i].template_id] = account_info.cropconf[i];
             }
             var cur_time = parseInt(new Date().getTime() / 1000);
             var re_time = 0;
             limit_time_obj.crop = 99999;
             for (var i = 0; i < account_info.crops.length; i++) {
                 re_time = account_info.crops[i].next_availability - cur_time;
                 if (re_time < 0) {
                     req_api.crops.water(i);
                 }else{
                     if(re_time < limit_time_obj.crop){
                        limit_time_obj.crop = re_time;
                     }
                 }
                 str += "<tr><td>" + account_info.crops[i].name + "</td><td>" + account_info.crops[i].asset_id + "</td><td>" + account_info.crops[i].template_id + "</td><td>" + account_info.crops[i].building_id + "</td><td>" + get_time_format(account_info.crops[i].last_claimed * 1000, 0) + "</td><td class='tool_time'>" + re_time + "秒</td><td>" + account_info.crops[i].times_claimed + "/ " + crops_by_template_id[account_info.crops[i].template_id].required_claims + "</td><td></td></tr>";
             }
             $(".userAreaTbody").html(str);
         },
         "conf": function() {
             req_this.getPlantsConfig();
         }, //谷物信息
     }, //我的农作物信息
     "animals": {
         "consumed_card": function(aindex) {
             for (var j = 0; j < account_info.anmconf.length; j++) {
                 if (account_info.animals[aindex].template_id == account_info.anmconf[j].template_id) {
                     if (account_info.anmconf[j].consumed_card == undefined) {
                         return 0;
                     } else {
                         return account_info.anmconf[j].consumed_card;
                     }
                 }
             }
             //return req_api.animals.check();
         },
         "check": function(atype = 0) {
             function check_animals() {
                 var cur_time = parseInt(new Date().getTime() / 1000);
                 for (var i = 0; i < account_info.animals.length; i++) {
                     if (account_info.animals[i].next_availability <= cur_time) {
                         for (var j = 0; j < account_info.anmconf.length; j++) {
                             if (account_info.animals[i].template_id == account_info.anmconf[j].template_id) {
                                 if (account_info.animals[i].times_claimed == account_info.anmconf[j].required_claims) {
                                     data_fun.show_text("#可升级:" + account_info.animals[i].asset_id);
                                 } else {
                                     if (account_info.animals[i].day_claims_at.length < account_info.anmconf[j].daily_claim_limit) {
                                         if (account_info.anmconf[j].consumed_card != undefined && account_info.anmconf[j].consumed_card > 0) {
                                             req_api.animals.feed(i, account_info.anmconf[j].consumed_card);
                                         } else {
                                             req_api.animals.care(i);
                                         }
                                     } else {
                                         if (cur_time - account_info.animals[i].day_claims_at[0] >= 86400) {
                                             if (account_info.anmconf[j].consumed_card != undefined && account_info.anmconf[j].consumed_card > 0) {
                                                 req_api.animals.feed(i, account_info.anmconf[j].consumed_card);
                                             } else {
                                                 req_api.animals.care(i);
                                             }
                                         }
                                     }
                                 }
                             }
                         }
                     }
                 }
             }
             if (atype == 0) {
                 req_this.getUsingAnimals().then(function(res) {
                     req_api.animals.list();
                     check_animals()
                 });
             } else {
                 check_animals();
             }
         },
         "feed": function(index, consumed_card) {
             var building_items = 0;
             /*if(data_fun.no_feed_list[account_info.animals[index].template_id] != undefined){
                 return false;
             }*/
             if (data_fun.no_feed_list[account_info.animals[index].asset_id] != undefined) {
                 return false;
             } //禁止喂食名单
             req_this.getItems("260676").then(function(res_food) { //获取背包内喂食动物的NFT
                 for (var ic = 0; ic < account_info.items.result.length; ic++) {
                     if (account_info.items.result[ic].template.template_id == consumed_card) {
                         building_items = account_info.items.result[ic].asset_id;
                     }
                 }
                 if (building_items == 0) {
                     data_fun.show_text("#:动物：" + account_info.animals[index].asset_id + " 缺少喂养道具: " + data_fun.template_ids[consumed_card]);
                     return false;
                 }
                 //account_info.animals[index].consumed_card
                 //account_info.animals[index].consumed_quantity
                 limit_req--;
                if(limit_req>=0){
                    req_this.feedAnimal(account_info.animals[index].asset_id, building_items).then(function(res) {
                        if (res.transaction_id != undefined && res.transaction_id != "") {
                            data_fun.show_text("#喂养asset_id:" + account_info.animals[index].asset_id);
                            setTimeout(function() {
                                req_this.getUsingAnimals().then(res => req_api.animals.list(), req_this.getItems("260676"));
                            }, 2000);
                        } else {
                            req_this.getUsingAnimals().then(res => req_api.animals.list()); //如果请求失败，则更新account_info.tools数据
                        }
                    });
                 }
             });
         },
         "care": function(index) {
             //data_fun.show_balance();
             limit_req--;
            if(limit_req>=0){
                req_this.careAnimal(account_info.animals[index].asset_id).then(function(res) {
                    if (res.transaction_id != undefined && res.transaction_id != "") {
                        data_fun.show_text("#孵鸡asset_id:" + account_info.animals[index].asset_id);
                        setTimeout(function() {
                            req_this.getUsingAnimals().then(res => req_api.animals.list());
                        }, 2000);
                    } else {
                        req_this.getUsingAnimals().then(res => req_api.animals.list()); //如果请求失败，则更新account_info.tools数据
                    }
                });
             }
         },
         "list": function(feed_val = 1) {
             var str = "";
             var anm_by_template_id = {};
             for (var i = 0; i < account_info.anmconf.length; i++) {
                 anm_by_template_id[account_info.anmconf[i].template_id] = account_info.anmconf[i];
             }
             var cur_time = parseInt(new Date().getTime() / 1000),
                 claim_str = "",
                 day_limit = 0,
                 re_time = 0,
                 max_day_count = 0;
             var cur_times_claimed = 0,
                 max_required_claims = 0,
                 cur_consumed_card;
             limit_time_obj.animal = 99999;
             for (var i = 0; i < account_info.animals.length; i++) {
                 claim_str = "";
                 day_limit = account_info.animals[i].day_claims_at.length;
                 max_day_count = anm_by_template_id[account_info.animals[i].template_id].daily_claim_limit;
                 re_time = account_info.animals[i].next_availability - cur_time;
                 cur_times_claimed = account_info.animals[i].times_claimed;
                 max_required_claims = anm_by_template_id[account_info.animals[i].template_id].required_claims;
                 if (re_time <= 0) {
                     if (cur_times_claimed == max_required_claims) {
                         re_time = "可升级";
                     } else {
                         if (day_limit == 0 || cur_time - account_info.animals[i].day_claims_at[0] >= 86400) {
                             cur_consumed_card = req_api.animals.consumed_card(i);
                             if (cur_consumed_card == 0) {
                                 req_api.animals.care(i);
                             } else if (feed_val == 1) {
                                 req_api.animals.feed(i, cur_consumed_card);
                             }
                         } else {
                             if (day_limit == max_day_count) {
                                 re_time = "达日限";
                             }
                         }
                     }
                 } else {
                     re_time += "秒";
                     if(re_time < limit_time_obj.animal){
                        limit_time_obj.animal = re_time;
                     }
                 }
                 for (var j = 0; j < day_limit; j++) {
                     claim_str += get_time_format(account_info.animals[i].day_claims_at[j] * 1000, 0) + "\n";
                 }
                 str += "<tr><td>" + account_info.animals[i].name + "</td><td>" + account_info.animals[i].asset_id + "</td><td>" + account_info.animals[i].template_id + "</td><td>" + account_info.animals[i].building_id + "</td><td>" + claim_str + "</td><td class='tool_time'>" + re_time + "</td><td>" + cur_times_claimed + "/ " + max_required_claims + ",D:" + max_day_count + "</td><td><input type='checkbox' animal_name='" + account_info.animals[i].name + "' asset_id='" + account_info.animals[i].asset_id + "' class='no_feed_check' " + (data_fun.no_feed_list[account_info.animals[i].asset_id] == undefined ? "" : "checked") + " /><span>禁食</span></td></tr>";
             }
             //data_fun.no_feed_list禁止喂食
             $(".pay_listTbody").html(str);
             var anilist = document.getElementsByClassName("no_feed_check");
             for (var i = 0; i < anilist.length; i++) {
                 anilist[i].onclick = (function(k) {
                     return function() {
                         if (anilist[k].checked) {
                             data_fun.no_feed_list[anilist[k].getAttribute("asset_id")] = anilist[k].getAttribute("animal_name");
                         } else {
                             delete data_fun.no_feed_list[anilist[k].getAttribute("asset_id")];
                         }
                     }
                 })(i)
             }
         },
         "conf": function() {
             req_this.getAnimalsConf()
         },
     }, //我的动物信息
     "mbs": {
         "check": function check_mbss() {
             req_this.getUsingBadge().then(function(res) {
                 req_api.mbs.list();
                 for (var i = 0; i < account_info.mbs.length; i++) {
                     if (account_info.mbs[i].next_availability <= Number(new Date()) / 1000) {
                         req_api.mbs.claim(i);
                     }
                 }
             });
         },
         "claim": function(index) {
            limit_req--;
            if(limit_req>=0){
                req_this.mbsClaim(account_info.mbs[index].asset_id).then(function(res) {
                    if (res.transaction_id != undefined && res.transaction_id != "") {
                        data_fun.show_text("#使用会员asset_id:" + account_info.mbs[index].asset_id);
                        setTimeout(function() {
                            req_this.getUsingBadge().then(res => req_api.mbs.list(), req_api.mbs.get_farmercoins());
                        }, 2000);
                    } else {
                        req_this.getUsingBadge().then(res => req_api.mbs.list()); //如果请求失败，则更新account_info.tools数据
                    }
                });
             }
         },
         "get_farmercoins": function() {
             req_this.getItemsBySchema("farmercoins", 122).then(function(res) {
                 $(".farmercoins").val(account_info.itemsBySchema.schema_name + ":" + account_info.itemsBySchema.result.length);
             });
         },
         "list": function() {
             var str = "";
             var mbsconf_by_template_id = {};
             for (var i = 0; i < account_info.mbsconf.length; i++) {
                 mbsconf_by_template_id[account_info.mbsconf[i].template_id] = account_info.mbsconf[i];
             }
             var cur_time = parseInt(new Date().getTime() / 1000);
             var re_time = 0;
             limit_time_obj.member = 99999;
             for (var i = 0; i < account_info.mbs.length; i++) {
                 re_time = account_info.mbs[i].next_availability - cur_time;
                 if (re_time < 0) {
                     req_api.mbs.claim(i);
                 }else{
                     if(re_time < limit_time_obj.member){
                        limit_time_obj.member = re_time;
                     }
                 }
                 str += "<tr><td>" + mbsconf_by_template_id[account_info.mbs[i].template_id].name + "</td><td>" + account_info.mbs[i].asset_id + "</td><td>" + account_info.mbs[i].template_id + "</td><td>" + account_info.mbs[i].type + "</td><td class='tool_time'>" + re_time + "秒</td><td>" + get_time_format(account_info.mbs[i].unstaking_time * 1000, 0) + "</td><td></td></tr>";
             }
             $(".msgAreaTbody").html(str);
         },
         "unstake": function(asset_id) {
             req_this.mbsUnstake(asset_id);
         },
         "conf": function() {
             req_this.getBadgeConfig()
         },
         "badge_craft_conf": function() {
             req_this.getBadgeCraft();
         }, //可以craft的会员卡列表
         "mbscraft": function(badge_obj = {}) {
             req_this.mbsCraft(badge_obj);
         }, //制作
     }, //我的会员卡信息,getUsingBadge,mbsClaimAsset
     "accounts": {
         "check": function(energy = 300) { //获取余额/增加体力
             function load_account_data() {
                 $(".msg_userName").html(account_info.accounts[0].balances.join("，"));
                 $(".newMsgShow").html(account_info.accounts[0].energy + " / " + account_info.accounts[0].max_energy);
                 $(".msg_userUid").val(account_info.accounts[0].account);
                 $(".farmercoins").val(account_info.itemsBySchema.schema_name + ":" + account_info.itemsBySchema.result.length);
                 if(data_fun.item_count_obj[account_info.itemsBySchema.schema_name] != undefined && account_info.itemsBySchema.result.length - data_fun.item_count_obj[account_info.itemsBySchema.schema_name] != 0){
                    var f_coin_biandong = item_counts[j] - data_fun.item_count_obj[j];
                    data_fun.show_text("【"+account_info.itemsBySchema.schema_name+"】：" + f_coin_biandong);
                }
                data_fun.item_count_obj[account_info.itemsBySchema.schema_name] = account_info.itemsBySchema.result.length;
                 req_api.Items.list();
             }
             req_this.getPlayerInfo().then(function(res) {
                 load_account_data();
                 if (account_info.accounts[0].energy <= energy) {
                     var needfood = (account_info.accounts[0].max_energy - account_info.accounts[0].energy) / 5;
                     if (needfood > 0) {
                        limit_req--;
                        if(limit_req>=0){
                            req_this.recover(needfood).then(function(res) {
                                if (res.transaction_id != undefined && res.transaction_id != "") {
                                    for (var i = 0; i < res.processed.action_traces.length; i++) {
                                        var rws = res.processed.action_traces[i].act.data.energy_recovered;
                                        if (rws != undefined) {
                                            data_fun.show_text("#恢复体力:" + rws);
                                        }
                                    }
                                    setTimeout(function() {
                                        req_this.getPlayerInfo().then(res => load_account_data());
                                    }, 1500);
                                }
                            });
                         }
                     }
                 }
             });
         }
     }, //账户信息，体力，余额等
     "config": {
         "check": function() {
             req_this.getConfig().then(function(res) {
                 $(".zq_tran_fee").val(account_info.config[0].fee);
                 $(".zq_check_fee").val("费用：" + account_info.config[0].fee);
             });
         }
     }, //系统配置信息，包含取出费用
     "mktconf": function() {
         req_this.getMarketConf();
     }, //市场交易配置信息,marketBuy--mktbuy#template_id#quantity
     "tokens": {}, //可以交换的token信息，FWW,FWG,FWF
     "retake": function() {
         req_this.getRefundItem();
     }, //未知，似乎是可退货物品列表,getRefund--getRefund#asset_ids数组
     "tassets": function() {
         req_this.mbsGetUnclaimedAsset();
     }, //未知
     "deposit" : function() {
        var zq_gold = parseFloat($(".zq_tran_gold").val());
        var zq_food = parseFloat($(".zq_tran_food").val());
        var zq_wood = parseFloat($(".zq_tran_wood").val());
        req_this.deposit(zq_gold, zq_food, zq_wood).then(function(res) {
            data_fun.show_text("：console中查看转入结果！");
            console.log("转入结果：", res);
        });
     },
     "withdraw" : function() {
        var zq_gold = parseFloat($(".zq_tran_gold").val());
        var zq_food = parseFloat($(".zq_tran_food").val());
        var zq_wood = parseFloat($(".zq_tran_wood").val());
        var zq_fee = parseInt($(".zq_tran_fee").val());
         req_this.withdraw(zq_gold, zq_food, zq_wood, zq_fee).then(function(res) {
             data_fun.show_text("：console中查看转出结果！");
             console.log("转出结果：", res);
         });
     }, //传递4个参数，金币数，食物数，木头数，费用
     "itemconf": function() {
         req_this.getExchangeConf();
     }, //这里有传递一个值，可以交换资源的物品
     "exchangeRewards": function(asset_ids) {
         req_this.exchangeRewards(asset_ids);
     }, //卖出
     "stake": {
         "wear": function(index) {
             req_this.stake(account_info.items.result[index].asset_id);
         },
         "stake_by_asset_id": function(asset_id) {
             req_this.stake(asset_id);
         },
         "auto_wear_seed": function(seed_name = "Seed") { //检测并使用全部可用种子
             var need_stake_crop_count = 8 - account_info.crops.length;
             if (need_stake_crop_count > 0) {
                 var template_id_list = data_fun.get_conf();
                 var seed_list = {}, seed_arr = [];
                 for (var k in template_id_list) {
                     if (template_id_list[k].name != undefined) {
                         if (template_id_list[k].name.indexOf(seed_name) != -1) {
                             seed_list[template_id_list[k].name] = k;
                         }
                     }
                 }
                 for (var k in seed_list) {
                     seed_arr.push(seed_list[k]);
                 }
                 for (var ic = 0; ic < account_info.items.result.length; ic++) {
                     if (need_stake_crop_count > 0) {
                         if (need_stake_crop_count > 0 && seed_arr.indexOf(account_info.items.result[ic].template.template_id) != -1) {
                             need_stake_crop_count--;
                             req_this.stake(account_info.items.result[ic].asset_id);
                         }
                     } else {
                         break;
                     }
                 }
                 setTimeout(() => req_this.getItems("260676"), 1000);
             }
         }
     }, //wear
     "unstake": function(asset_id) {
         req_this.unstake(asset_id);
     },
     "getItemsByTemplate": function(template_id) {
         req_this.getItemsByTemplate(template_id);
     },
     "countAssetByTemplate": function(template_id) {
         req_this.countAssetByTemplate(template_id);
     },
     "countAssetBySchema": function(schema_name) {
         req_this.countAssetBySchema(schema_name);
     },
     "getTemplates": function(schema_name) {
         req_this.getTemplates(schema_name);
     },
     "Items": {
         "check": function() {
             req_this.getItems("260676").then(function(res) {
                 req_api.Items.list();
             });
         },
         "load_table": function() {
             req_this.getItems("260676").then(function(res) {
                 var str = "";
                 var tools_by_template_id = {};
                 for (var i = 0; i < account_info.toolconfs.length; i++) {
                     tools_by_template_id[account_info.toolconfs[i].template_id] = account_info.toolconfs[i];
                 }
                 var cur_time = parseInt(new Date().getTime() / 1000);
                 var re_time = 0;
                 for (var i = 0; i < account_info.items.result.length; i++) {
                     str += "<tr><td>" + account_info.items.result[i].name + "</td><td>" + account_info.items.result[i].asset_id + "</td><td>" + account_info.items.result[i].template.template_id + "</td><td>" + account_info.items.result[i].schema.schema_name + "</td><td><input asset_id='"+account_info.items.result[i].asset_id+"' value='sell' type='button' class='sell_item_buttons' /></td></tr>";
                 }
                 $(".hisMsg_box").html(str);
                 var sell_item_buttons = document.getElementsByClassName("sell_item_buttons");
                 for (var i = 0; i < sell_item_buttons.length; i++) {
                     sell_item_buttons[i].onclick = (function(k) {
                         return function() {
                             req_this.exchangeRewards(sell_item_buttons[k].getAttribute("asset_id")).then(function(ares) {
                                 if (ares.transaction_id != undefined && ares.transaction_id != "") {
                                     sell_item_buttons[k].parentNode.append("sell out");
                                     sell_item_buttons[k].style.display = "none";
                                     //sell_item_buttons[k].parentNode.removeChild(sell_item_buttons[k]);//仅移除按钮本身
                                 }
                             });
                         }
                     })(i)
                 }
                 req_api.Items.list();
             });
         },
         "list": function() {
             var itemlist = account_info.items.result;
             var item_counts = {
                 "Milk": 0,
                 "Barley": 0,
                 "Corn": 0,
                 "Corn Seed": 0,
                 "Barley Seed": 0,
                 "Chicken Egg": 0,
                 "Baby Calf": 0
             };
             for (var i = 0; i < itemlist.length; i++) {
                 if (item_counts[itemlist[i].name] != undefined) {
                     item_counts[itemlist[i].name]++;
                 }
             }
             $(".Barley_Seed_count").val("Barley Seed:" + item_counts["Barley Seed"]);
             $(".Corn_Seed_count").val("Corn Seed:" + item_counts["Corn Seed"]);
             $(".Milk_count").val("Milk:" + item_counts.Milk);
             $(".Barley_count").val("Barley:" + item_counts.Barley);
             $(".Corn_count").val("Corn:" + item_counts.Corn);
             $(".Chicken_Egg_count").val("Chicken Egg:" + item_counts["Chicken Egg"]);
             $(".Baby_Calf_count").val("Baby Calf:" + item_counts["Baby Calf"]);
             var biandong_item_count = {};
             for(var j in item_counts){
                 if(data_fun.item_count_obj[j] != undefined && item_counts[j] - data_fun.item_count_obj[j] != 0){
                     biandong_item_count[j] = item_counts[j] - data_fun.item_count_obj[j];
                 }
                 data_fun.item_count_obj[j] = item_counts[j];
             }
             for(var k in biandong_item_count){
                 data_fun.show_text("【"+k+"】：" + biandong_item_count[k]);
             }
         }
     } //刷新包裹NFT卡牌
 };
 function sub_diy_event(){
    if(localStorage.token_time != undefined){
        $(".msg_replace").val(localStorage.token_time);
     }
     $(".pageArea").css("display", "none");
     $(".zq_kuozhan_kuozhan_area").css("display", "none");
     $("#zq_kuozhan_div").css("display", "none");
     $("#history_div").css("display", "none");
     $(".his_nickname").click(function() {
         $("#history_div").css("display", "none");
     });
     $(".zq_kuozhan_area").click(function() {
         if ($("#zq_kuozhan_div").css("display") === "none") {
             $("#zq_kuozhan_div").css("display", "");
             $(".pageArea").css("display", "");
             $(".zq_kuozhan_area").val("隐藏扩展");
         } else {
             $("#zq_kuozhan_div").css("display", "none");
             $(".pageArea").css("display", "none");
             $(".zq_kuozhan_area").val("扩展功能");
         }
     });
     $(".zq_zhiding_area").click(function() {
         if ($(".zq_zhiding_area").val() == "脚本配置") {
             $("#zq_kuozhan_div").css("z-index", "9991");
             $("#zq_info_show").css("height", "520px");
             $(".zq_kuozhan_kuozhan_area").css("display", "");
             $(".zq_zhiding_area").val("收起配置");
         } else {
             $(".zq_kuozhan_kuozhan_area").css("display", "none");
             $("#zq_kuozhan_div").css("z-index", "9990");
             $("#zq_info_show").css("height", "80px");
             document.getElementById("zq_info_show").scrollTop = document.getElementById("zq_info_show").scrollHeight;
             $(".zq_zhiding_area").val("脚本配置");
         }
     });
     $(".msg_save").click(function() {
         localStorage.token_time = $(".msg_replace").val();
         data_fun.show_text("保存当前记录成功！");
     });
     $(".userHistory").click(function() {
         var req_way = $(".saveHistory").val();
         if (req_way == "") {
             alert("请输入要请求的方法名称！");
             return false;
         }
         var req_canshu1 = $(".delHistory").val();
         var req_canshu2 = $(".clearHistory").val();
         if (req_canshu1 == "") {
             req_this[req_way]();
         } else {
             if (req_canshu2 == "") {
                 req_this[req_way](req_canshu1);
             } else {
                 req_this[req_way](req_canshu1, req_canshu2);
             }
         }
     });
     $("#call_fun_name").change(function() {
         $(".saveHistory").val($("#call_fun_name option:selected").val());
     });
     $(".zq_check_build").click(function() {
        limit_req = parseInt($(".req_limit_count").val());
         req_api.req_api.buildings.check();
         //$(".modal-wrapper").css("z-index","0");隐藏登录遮罩
     });
     $(".zq_check_mining").click(function() {
        limit_req = parseInt($(".req_limit_count").val());
         req_api.tools.check();
     });
     $(".zq_check_animals").click(function() {
        limit_req = parseInt($(".req_limit_count").val());
         req_api.animals.check();
     });
     $(".zq_check_crops").click(function() {
        limit_req = parseInt($(".req_limit_count").val());
         req_api.crops.check();
     });
     $(".zq_login_wallet").click(function() {
        document.getElementsByClassName("login-modal-button")[0].click();
     });
     $(".zq_check_fee").click(function() {
        limit_req = parseInt($(".req_limit_count").val());
         req_api.config.check();
     });
     $(".zq_check_repair").click(function() {
        limit_req = parseInt($(".req_limit_count").val());
         req_api.tools.check(0.99);
     });
     $(".zq_check_health").click(function() {
        limit_req = parseInt($(".req_limit_count").val());
         req_api.accounts.check(9999);
     });
     $(".zq_load_data").click(function() {
        limit_req = parseInt($(".req_limit_count").val());
         req_api.tools.list();
         req_api.crops.list();
         req_api.accounts.check();
         req_api.animals.list(0); //传递一个0值，这样就不会自动喂养
         req_api.mbs.list();
         req_api.config.check();
     });
     $(".Milk_count").click(function() {
         req_api.Items.check();
     });
     $(".Corn_count").click(function() {
         req_api.Items.check();
     });
     $(".Barley_count").click(function() {
         req_api.Items.check();
     });
     $(".Chicken_Egg_count").click(function() {
         req_api.Items.check();
     });
     $(".Baby_Calf_count").click(function() {
         req_api.Items.check();
     });
     $(".Barley_Seed_count").click(function() {
         req_api.Items.check();
     });
     $(".Corn_Seed_count").click(function() {
         req_api.Items.check();
     });
     $(".farmercoins").click(function() {
         req_api.mbs.get_farmercoins();
     });
     $(".zq_show_conf").click(function() {
         data_fun.show_text("：全局数据，data_fun，conf已输出到console！");
         console.log(account_info);
         console.log(data_fun);
         console.log(data_fun.get_conf());
     });
     $(".zq_open_items_table").click(function() {
         $("#history_div").css("display", "");
         req_api.Items.load_table();
     });
     $("#zq_withdraw").click(function() {
         req_api.withdraw();
     });
     $("#zq_deposit").click(function() {
        req_api.deposit();
    });
     $(".zq_quick_Barley").click(function() {
         req_api.stake.auto_wear_seed("Barley Seed");
     });
     $(".zq_quick_Corn").click(function() {
         req_api.stake.auto_wear_seed("Corn Seed");
     });
     $(".zq_item_stake").click(function() {
         req_api.stake.auto_wear_seed($(".zq_item_stake_name").val());
     });
     $(".zq_quick_Crops").click(function() {
         req_api.stake.auto_wear_seed();
     });
 };
 function add_diy_event() {
     sub_diy_event();
     //$("#zq_open_auto_script").click();//自动启动
     $("#zq_open_auto_script").click(function() {
         if (req_this.api == undefined) {
             data_fun.show_text("：没有获取到API接口，请尝试修复获取！");
             return false;
         }
         limit_req = parseInt($(".req_limit_count").val());
         function new_banben() {
             var stime = 0,
                 ftime = 0;
             clock_time_fun = 1;
             var map_checks = document.getElementsByClassName("map_check");
             var map_check_obj = {
                 "tools": req_api.tools.check(),
                 "crops": req_api.crops.check(),
                 "accounts": req_api.accounts.check(parseInt($(".energy_low_limit").val())),
                 "buildings": req_api.buildings.check(),
                 "animals": req_api.animals.check(),
                 "mbs": req_api.mbs.check(),
                 "config": req_api.config.check(),
                 "auto_plot_crops": req_api.buildings.auto_Farm_plot(),
             };
             console.log(map_checks);
             var max_lenth = map_checks.length;
 
             function clock_check() {
                 ftime = stime % max_lenth;
                 $(".zq_start_pos").val(get_time_format(new Date().getTime(), 1).join(":"));
                 if (map_checks[ftime].checked) {
                     req_api[map_checks[ftime].value].check();
                 }
                 stime++;
                 if (stime >= max_lenth) {
                     stime = 0;
                 }
                 if (clock_time_fun == 1) {
                     setTimeout(() => clock_check(), 1000);
                 }
             }
             clock_check();
         }
 
         function old_banben() {
             var stime = 0,
                 ftime = 0;
             clock_time_fun = 1;
             var startTime = new Date().getTime();
             var map_checks = document.getElementsByClassName("map_check");
             var map_check_obj = {
                 "tools": req_api.tools.list,
                 "crops": req_api.crops.list,
                 "accounts": req_api.accounts.check,
                 "buildings": req_api.buildings.check,
                 "animals": req_api.animals.list,
                 "mbs": req_api.mbs.list,
                 "config": req_api.config.check,
                 "auto_plot_crops": req_api.buildings.auto_Farm_plot,
                 "auto_check_Items": req_api.Items.check,
             };
             var r_limit_count = document.getElementsByClassName("req_limit_check")[0];
             var new_repair = parseFloat($(".repair_low_limit").val());
             var new_energy = parseInt($(".energy_low_limit").val());
             for (var i = 0; i < map_checks.length; i++) {
                 if (!map_checks[i].checked) {
                     map_check_obj[map_checks[i].value] = function() {};
                 }
             }
             function clock_check() {
                 stime++;
                 ftime++;
                 var offset = new Date().getTime() - (startTime + ftime * 1000);
                 var nextTime = 1000 - offset;
                 if (nextTime < 0) {
                     nextTime = 0
                 };
                 data_fun.get_balance();
                 $(".zq_start_pos").val(get_time_format(new Date().getTime(), 1).join(":") + " → " + limit_req);
                 if (ftime % 120 == 6) {
                     map_check_obj.config();
                     //req_api.config.check();
                 }
                 if (ftime % 1800 == 777) {//每半个小时从服务器获取一次信息，否则使用本地时间计算
                    req_api.tools.check(new_repair);
                    req_api.crops.check();
                    req_api.animals.check();
                    req_api.mbs.check();
                }
                 if (ftime % 90 == 11) {
                     map_check_obj.auto_check_Items();
                 }
                 if (ftime % 60 == 1) {
                    if(r_limit_count.checked){
                        limit_req = parseInt($(".req_limit_count").val());
                     }else{
                        limit_req = 99;
                     }
                 }
                 if (stime % 15 == 3) {
                    map_check_obj.accounts(new_energy);
                     //req_api.tools.check();
                 }
                 if (stime % 15 == 6) {
                     map_check_obj.tools(new_repair);
                     map_check_obj.auto_plot_crops();
                     //req_api.accounts.check(360);
                 }
                 if (stime % 15 == 9) {
                    map_check_obj.crops();
                     //req_api.accounts.check(300);
                 }
                 if (stime % 15 == 12) {
                     map_check_obj.animals();
                     map_check_obj.mbs();
                     map_check_obj.buildings();
                     //req_api.buildings.check();
                     //req_api.animals.check();
                     //req_api.mbs.check();
                 }
                 if (stime >= 15) {
                     stime = 0;
                 }
                 if (ftime >= 36000000) {
                    ftime = 0;
                }
                 if (clock_time_fun == 1) {
                     setTimeout(() => clock_check(), nextTime);
                 }
             }
             clock_check();
         }
         old_banben();
         data_fun.show_text("：开始运行！");
     });
     $("#zq_stop_auto_script").click(function() {
         //window.clearInterval(auto_clock);
         clock_time_fun = 0;
         data_fun.show_text("：停止运行！");
     });
 }
 addzqDiyJs("https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js", function() {
     $("body").before(htmlstr + cssStr + bodyStr);
     add_diy_event();
 });
  
  (this.webpackJsonpgame = this.webpackJsonpgame || []).push([
      [0], {
          229: function(e) {
              e.exports = JSON.parse('{"v":"4.6.0","fr":29.9700012207031,"ip":0,"op":61.0000024845809,"w":400,"h":400,"nm":"Comp 1","ddd":0,"assets":[{"id":"comp_0","layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Pre-comp 2","refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.372,"y":0.995},"o":{"x":0.333,"y":0},"n":"0p372_0p995_0p333_0","t":-1,"s":[-63.707,132,0],"e":[508.793,132,0],"to":[95.4166641235352,0,0],"ti":[-95.4166641235352,0,0]},{"t":65.0000026475043}]},"a":{"a":0,"k":[200,200,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":400,"h":400,"ip":-1.00000004073083,"op":899.000036617021,"st":-1.00000004073083,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":0,"nm":"Pre-comp 2","refId":"comp_1","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":1,"k":[{"i":{"x":0.663,"y":0.994},"o":{"x":0.333,"y":0},"n":"0p663_0p994_0p333_0","t":47,"s":[-120.707,132,0],"e":[480.293,132,0],"to":[100.166664123535,0,0],"ti":[-100.166664123535,0,0]},{"t":120.0000048877}]},"a":{"a":0,"k":[200,200,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"w":400,"h":400,"ip":47.0000019143492,"op":947.000038572101,"st":47.0000019143492,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Master","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[198,192,0]},"a":{"a":0,"k":[146.5,5.5,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-2.858,0],[0,0],[0,-2.858],[2.859,0],[0,0],[0,2.858]],"o":[[0,0],[2.859,0],[0,2.858],[0,0],[-2.858,0],[0,-2.858]],"v":[[-140.825,-5.175],[140.825,-5.175],[146,0.001],[140.825,5.175],[-140.825,5.175],[-146,0.001]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.8862745098039215,0.9490196078431372,0.07450980392156863,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[146.25,5.425],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"}],"ip":0,"op":900.000036657751,"st":0,"bm":0,"sr":1}]},{"id":"comp_1","layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Layer 5/progressbar-final Outlines","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[296,260,0]},"a":{"a":0,"k":[76.5,5.5,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-2.858,0],[0,0],[0,-2.859],[2.859,0],[0,0],[0,2.857]],"o":[[0,0],[2.859,0],[0,2.857],[0,0],[-2.858,0],[0,-2.859]],"v":[[-70.825,-5.175],[70.825,-5.175],[76,0],[70.825,5.175],[-70.825,5.175],[-76,0]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.7372549019607844,0.3607843137254902,0.00784313725490196,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[76.25,5.425],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"}],"ip":0,"op":900.000036657751,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":2,"ty":4,"nm":"Layer 4/progressbar-final Outlines","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[86,260,0]},"a":{"a":0,"k":[22.5,5.5,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-2.858,0],[0,0],[0,-2.859],[2.858,0],[0,0],[0,2.857]],"o":[[0,0],[2.858,0],[0,2.857],[0,0],[-2.858,0],[0,-2.859]],"v":[[-16.825,-5.175],[16.825,-5.175],[22,0],[16.825,5.175],[-16.825,5.175],[-22,0]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.7372549019607844,0.3607843137254902,0.00784313725490196,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[22.25,5.425],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"}],"ip":0,"op":900.000036657751,"st":0,"bm":0,"sr":1},{"ddd":0,"ind":3,"ty":4,"nm":"Layer 3/progressbar-final Outlines","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[164,260,0]},"a":{"a":0,"k":[40,5.5,0]},"s":{"a":0,"k":[100,100,100]}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ks":{"a":0,"k":{"i":[[-2.858,0],[0,0],[0,-2.859],[2.858,0],[0,0],[0,2.857]],"o":[[0,0],[2.858,0],[0,2.857],[0,0],[-2.858,0],[0,-2.859]],"v":[[-34.325,-5.175],[34.325,-5.175],[39.5,0],[34.325,5.175],[-34.325,5.175],[-39.5,0]],"c":true}},"nm":"Path 1","mn":"ADBE Vector Shape - Group"},{"ty":"fl","c":{"a":0,"k":[0.7372549019607844,0.3607843137254902,0.00784313725490196,1]},"o":{"a":0,"k":100},"r":1,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill"},{"ty":"tr","p":{"a":0,"k":[39.75,5.425],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"mn":"ADBE Vector Group"}],"ip":0,"op":900.000036657751,"st":0,"bm":0,"sr":1}]}],"layers":[{"ddd":0,"ind":1,"ty":0,"nm":"Pre-comp 1","refId":"comp_0","ks":{"o":{"a":0,"k":100},"r":{"a":0,"k":0},"p":{"a":0,"k":[202.032,208.014,0]},"a":{"a":0,"k":[200,200,0]},"s":{"a":0,"k":[99.979,100,100]}},"ao":0,"hasMask":true,"masksProperties":[{"inv":false,"mode":"a","pt":{"a":0,"k":{"i":[[4.821,0],[0,0],[0,-4.821],[-4.821,0],[0,0],[0,2.771]],"o":[[0,0],[-4.821,0],[0,4.821],[0,0],[4.821,0],[0,-2.417]],"v":[[337.122,186.522],[59.625,186.49],[52.02,192.229],[59.708,197.449],[337.205,197.481],[343.914,191.917]],"c":true}},"o":{"a":0,"k":100},"x":{"a":0,"k":0},"nm":"Mask 2"}],"w":400,"h":400,"ip":0,"op":900.000036657751,"st":0,"bm":0,"sr":1}]}')
          },
          230: function(e) {
              e.exports = JSON.parse('{"v":"5.5.7","meta":{"g":"LottieFiles AE 0.1.20","a":"","k":"","d":"","tc":""},"fr":30,"ip":0,"op":149,"w":641,"h":361,"nm":"вагонетика","ddd":0,"assets":[{"id":"image_0","w":65,"h":65,"u":"","p":"data:image/png;base64,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","e":1},{"id":"image_1","w":297,"h":252,"u":"","p":"data:image/png;base64,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","e":1}],"layers":[{"ddd":0,"ind":1,"ty":2,"nm":"баф лев 2","parent":5,"refId":"image_0","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":20,"s":[360]}],"ix":10,"x":"var $bm_rt;\\n$bm_rt = loopOut(\'cycle\', 0);"},"p":{"a":0,"k":[203.843,267.494,0],"ix":2},"a":{"a":0,"k":[32.121,32.123,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":0,"s":[100,104,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":6,"s":[100,100,100]},{"t":13,"s":[100,106,100]}],"ix":6,"x":"var $bm_rt;\\n$bm_rt = loopOut(\'cycle\', 0);"}},"ao":0,"ip":0,"op":153,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":2,"nm":"баф лев","parent":5,"refId":"image_0","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[0]},{"t":20,"s":[360]}],"ix":10,"x":"var $bm_rt;\\n$bm_rt = loopOut(\'cycle\', 0);"},"p":{"a":0,"k":[89.008,267.494,0],"ix":2},"a":{"a":0,"k":[32.121,32.123,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":0,"s":[100,105,100]},{"i":{"x":[0.833,0.833,0.833],"y":[0.833,0.833,0.833]},"o":{"x":[0.167,0.167,0.167],"y":[0.167,0.167,0.167]},"t":6,"s":[100,100,100]},{"t":13,"s":[100,106,100]}],"ix":6,"x":"var $bm_rt;\\n$bm_rt = loopOut(\'cycle\', 0);"}},"ao":0,"ip":0,"op":153,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":2,"nm":"верхушка 2","parent":5,"refId":"image_1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[148.5,126,0],"to":[-0.183,-1.053,0],"ti":[0.061,0.075,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":12,"s":[147.401,119.682,0],"to":[-0.061,-0.075,0],"ti":[-0.122,-0.978,0]},{"t":26,"s":[148.135,125.553,0]}],"ix":2,"x":"var $bm_rt;\\n$bm_rt = loopOut(\'cycle\', 0);"},"a":{"a":0,"k":[148.135,125.553,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"ef":[{"ty":5,"nm":"Glow","np":16,"mn":"ADBE Glo2","ix":1,"en":1,"ef":[{"ty":7,"nm":"Glow Based On","mn":"ADBE Glo2-0001","ix":1,"v":{"a":0,"k":2,"ix":1}},{"ty":0,"nm":"Glow Threshold","mn":"ADBE Glo2-0002","ix":2,"v":{"a":1,"k":[{"i":{"x":[0.546],"y":[0.766]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[255]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.336],"y":[0.352]},"t":7.827,"s":[240.816]},{"i":{"x":[0.316],"y":[0.758]},"o":{"x":[0.193],"y":[0.185]},"t":34,"s":[217.5]},{"i":{"x":[0.674],"y":[1.094]},"o":{"x":[0.506],"y":[0.666]},"t":60,"s":[249.967]},{"t":75,"s":[255]}],"ix":2,"x":"var $bm_rt;\\n$bm_rt = loopOut(\'cycle\', 0);"}},{"ty":0,"nm":"Glow Radius","mn":"ADBE Glo2-0003","ix":3,"v":{"a":0,"k":10,"ix":3}},{"ty":0,"nm":"Glow Intensity","mn":"ADBE Glo2-0004","ix":4,"v":{"a":0,"k":1,"ix":4}},{"ty":7,"nm":"Composite Original","mn":"ADBE Glo2-0005","ix":5,"v":{"a":0,"k":2,"ix":5}},{"ty":7,"nm":"Glow Operation","mn":"ADBE Glo2-0006","ix":6,"v":{"a":0,"k":3,"ix":6}},{"ty":7,"nm":"Glow Colors","mn":"ADBE Glo2-0007","ix":7,"v":{"a":0,"k":1,"ix":7}},{"ty":7,"nm":"Color Looping","mn":"ADBE Glo2-0008","ix":8,"v":{"a":0,"k":3,"ix":8}},{"ty":0,"nm":"Color Loops","mn":"ADBE Glo2-0009","ix":9,"v":{"a":0,"k":1,"ix":9}},{"ty":0,"nm":"Color Phase","mn":"ADBE Glo2-0010","ix":10,"v":{"a":0,"k":0,"ix":10}},{"ty":0,"nm":"A & B Midpoint","mn":"ADBE Glo2-0011","ix":11,"v":{"a":0,"k":0.5,"ix":11}},{"ty":2,"nm":"Color A","mn":"ADBE Glo2-0012","ix":12,"v":{"a":0,"k":[1,1,1,0],"ix":12}},{"ty":2,"nm":"Color B","mn":"ADBE Glo2-0013","ix":13,"v":{"a":0,"k":[0,0,0,0],"ix":13}},{"ty":7,"nm":"Glow Dimensions","mn":"ADBE Glo2-0014","ix":14,"v":{"a":0,"k":1,"ix":14}}]}],"ip":0,"op":153,"st":0,"bm":0},{"ddd":0,"ind":5,"ty":3,"nm":"верхушка","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[293.466,177.726,0],"to":[-0.083,-0.667,0],"ti":[0,0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":12,"s":[292.966,173.726,0],"to":[0,0,0],"ti":[-0.083,-0.667,0]},{"t":26,"s":[293.466,177.726,0]}],"ix":2,"x":"var $bm_rt;\\n$bm_rt = loopOut(\'cycle\', 0);"},"a":{"a":0,"k":[148.135,125.553,0],"ix":1},"s":{"a":0,"k":[68.141,68.141,100],"ix":6}},"ao":0,"ip":0,"op":153,"st":0,"bm":0}],"markers":[]}')
          },
          241: function(e, a, t) {},
          266: function(e, a) {},
          273: function(e, a) {},
          290: function(e, a) {},
          292: function(e, a) {},
          302: function(e, a) {},
          304: function(e, a) {},
          335: function(e, a) {},
          337: function(e, a) {},
          344: function(e, a) {},
          345: function(e, a) {},
          403: function(e, a) {},
          407: function(e, a, t) {},
          408: function(e, a, t) {},
          409: function(e, a, t) {},
          410: function(e, a, t) {},
          411: function(e, a, t) {},
          412: function(e, a, t) {},
          414: function(e, a, t) {},
          415: function(e, a, t) {
              "use strict";
              t.r(a);
              var n = t(3),
                  c = t.n(n),
                  r = t(28),
                  i = t.n(r),
                  s = (t(241), t(2)),
                  d = t.n(s),
                  o = t(6),
                  u = t(7),
                  l = t(13),
                  f = t(14),
                  b = t(142),
                  m = t.n(b),
                  p = t(12),
                  v = t(5),
                  g = t(10),
                  h = t(46),
                  j = t(228),
                  x = t(361),
                  O = t(142),
                  k = t(212).ExplorerApi,
                  w = t(209),
                  y = w.JsonRpc,
                  A = w.Api,
                  C = w.RpcError,
                  N = t(400).JsSignatureProvider,
                  S = new j.a,
                  E = "farmersasset",
                  B = {
                      type: "FWG",
                      image: "QmVz8PYSc6oqKU4kwL4WwLhsfA4TrK897Z5rGo9mW6syV6"
                  }, I = {
                      type: "FWF",
                      image: "QmUhj3917cFfEv8PACYRwVDkJt5zT8dYPsqzs2SfhDtq42"
                  }, U = {
                      type: "FWW",
                      image: "Qme1LRLyeDvZqHFgkdHXCzgZgyKGcWaqkH3NffsuQ4ccnD"
                  }, F = function() {
                      function e(a, t, n, c) {
                          if (Object(v.a)(this, e), c) {
                              var r = c.username,
                                  i = c.privateKey;
                              console.log(c);
                              var s = new N([i]),
                                  d = new y(a, {
                                      fetch: fetch
                                  });
                              this.api = new A({
                                  rpc: d,
                                  signatureProvider: s,
                                  textDecoder: new TextDecoder,
                                  textEncoder: new TextEncoder
                              }), this.privateAccount = c, this.rpc = d, this.name = r
                          } else {
                              this.wax = new x.WaxJS({
                                  rpcEndpoint: a,
                                  tryAutoLogin: !1
                              }), this.rpc = this.wax.rpc;
                              var o = new h.h({
                                  transport: S,
                                  chains: [{
                                      chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
                                      nodeUrl: a
                                  }]
                              });
                              this.link = o
                          }
                          try {
                              this.aapi = new k("https://wax.api.atomicassets.io", "atomicassets", {
                                  fetch: fetch
                              })
                          } catch (u) {
                              this.aapi = new k("https://wax.api.aa.atomichub.io", "atomicassets", {
                                  fetch: fetch
                              })
                          }
                          this.mainCollection = t, this.mintCollection = n, this.server = a
                      }
                      return Object(g.a)(e, [{
                          key: "anchorLogin",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.link.login("farmersworld");
                                          case 2:
                                              return a = e.sent, t = a.session, this.name = t.auth.actor, this.anchorSession = t, console.log("Logged in as ".concat(t.auth)), e.abrupt("return", t.auth);
                                          case 8:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "setSession",
                          value: function(e) {
                              var a;
                              this.wax = new x.WaxJS({
                                  rpcEndpoint: this.server,
                                  userAccount: e.userAccount,
                                  pubKeys: [e.pubKeys]
                              }), this.rpc = this.wax.rpc, this.api = (null === (a = this.wax) || void 0 === a ? void 0 : a.api) || this.api, this.name = e.userAccount
                          }
                      }, {
                          key: "setServer",
                          value: function(e) {
                              this.server = e, this.wax = new x.WaxJS({
                                  rpcEndpoint: e,
                                  tryAutoLogin: !1
                              }), this.rpc = this.wax.rpc;
                              var a = new h.h({
                                  transport: S,
                                  chains: [{
                                      chainId: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
                                      nodeUrl: e
                                  }]
                              });
                              this.link = a
                          }
                      }, {
                          key: "setPrivateAccount",
                          value: function(e) {
                              if (e) {
                                  var a = new y(this.server, {
                                      fetch: fetch
                                  }),
                                      t = e.username,
                                      n = e.privateKey,
                                      c = new N([n]),
                                      r = new A({
                                          rpc: a,
                                          signatureProvider: c,
                                          textDecoder: new TextDecoder,
                                          textEncoder: new TextEncoder
                                      });
                                  this.api = r, this.name = t, this.privateAccount = e, this.rpc = a
                              }
                          }
                      }, {
                          key: "login",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              if (!this.privateAccount) {
                                                  e.next = 2;
                                                  break
                                              }
                                              return e.abrupt("return");
                                          case 2:
                                              return e.prev = 2, e.next = 5, this.wax.loginViaEndpoint();
                                          case 5:
                                              this.name = e.sent, e.next = 13;
                                              break;
                                          case 8:
                                              return e.prev = 8, e.t0 = e.
                                              catch (2), e.next = 12, this.wax.login();
                                          case 12:
                                              this.name = e.sent;
                                          case 13:
                                              return this.api = (null === (a = this.wax) || void 0 === a ? void 0 : a.api) || this.api, e.abrupt("return", this.name);
                                          case 15:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this, [
                                      [2, 8]
                                  ])
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getTokens",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_currency_balance(this.mintCollection, this.name);
                                          case 2:
                                              return e.abrupt("return", e.sent);
                                          case 3:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getPlayerInfo",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, req_this=this, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "accounts",
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  index_position: 1,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.accounts = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getUsingBadge",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "mbs",
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  index_position: 2,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.mbs = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getBadgeConfig",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "mbsconf",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.mbsconf = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getBadgeCraft",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "mbscraft",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.mbscraft = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "mbsClaimAsset",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "claimasset",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      asset_owner: this.name,
                                                      asset_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return account_info.res = e.sent, e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "mbsGetUnclaimedAsset",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "tassets",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  key_type: "i64",
                                                  index_position: 2
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.tassets = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getBuildingConfig",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "bldconf",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.bldconf = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getUsingBuilding",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "buildings",
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  index_position: 2,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.buildings = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "claimBuilding",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "bldclaim",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      asset_id: a
                                                  }
                                              }], console.log("claim", t), e.next = 4, this.__transact(t);
                                          case 4:
                                              return account_info.res = e.sent, e.abrupt("return", e.sent);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "craftBuilding",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "mintbld",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      new_owner: this.name,
                                                      template_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return account_info.res = e.sent, e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getRefundItem",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: E,
                                                  scope: E,
                                                  table: "retake",
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  index_position: 1,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.retake = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getRefund",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n = this;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [], a.forEach((function(e) {
                                                  t.push({
                                                      account: "atomicassets",
                                                      name: "transfer",
                                                      authorization: [{
                                                          actor: n.name,
                                                          permission: "active"
                                                      }],
                                                      data: {
                                                          from: n.name,
                                                          to: E,
                                                          asset_ids: e,
                                                          memo: "refund"
                                                      }
                                                  })
                                              })), e.next = 4, this.__transact(t);
                                          case 4:
                                              return account_info.res = e.sent, e.abrupt("return", e.sent);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getUsingItems",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "tools",
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  index_position: 2,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.tools = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getItems",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.aapi.getAssets({
                                                  template_blacklist: a,
                                                  limit: 1e3,
                                                  collection_name: this.mainCollection,
                                                  owner: this.name
                                              });
                                          case 2:
                                              return t = e.sent, account_info.items = {"template_blacklist":a,"result":t}, e.abrupt("return", t);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getItemsBySchema",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a, t) {
                                  var n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.aapi.getAssets({
                                                  limit: t || 100,
                                                  collection_name: this.mainCollection,
                                                  owner: this.name,
                                                  schema_name: a
                                              });
                                          case 2:
                                              return n = e.sent, account_info.itemsBySchema = {"limit":t,"schema_name":a,"result":n}, e.abrupt("return", n);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a, t) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getItemsByTemplate",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.aapi.getAssets({
                                                  limit: 100,
                                                  collection_name: this.mainCollection,
                                                  owner: this.name,
                                                  template_id: a
                                              });
                                          case 2:
                                              return t = e.sent, account_info.itemsByTemplate = {"template_id":a,"result":t}, e.abrupt("return", t);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getTemplates",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.aapi.getTemplates({
                                                  limit: 100,
                                                  schema_name: a,
                                                  collection_name: this.mainCollection
                                              });
                                          case 2:
                                              return t = e.sent, account_info.Templates = {"schema_name":a,"result":t}, e.abrupt("return", t);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getTemplaasds",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.aapi.getTemplates({
                                                  limit: 100,
                                                  owner: this.name,
                                                  collection_name: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, e.abrupt("return", a);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "countAssetByTemplate",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.aapi.countAssets({
                                                  collection_name: this.mainCollection,
                                                  owner: this.name,
                                                  template_id: a
                                              });
                                          case 2:
                                              return t = e.sent, account_info.countAssetByTemplate = {"template_id":a,"result":t}, e.abrupt("return", t);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "countAssetBySchema",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.aapi.countAssets({
                                                  collection_name: this.mainCollection,
                                                  owner: this.name,
                                                  schema_name: a
                                              });
                                          case 2:
                                              return t = e.sent, account_info.countAssetBySchema = {"schema_name":a,"result":t}, e.abrupt("return", t);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getEquipConfigs",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "toolconfs",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.toolconfs = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getUsingAnimals",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "animals",
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  index_position: 2,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.animals = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "feedAnimal",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a, t) {
                                  var n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return n = [{
                                                  account: "atomicassets",
                                                  name: "transfer",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      to: this.mainCollection,
                                                      asset_ids: [t],
                                                      memo: "feed_animal:".concat(a)
                                                  }
                                              }], e.next = 3, this.__transact(n);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a, t) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "careAnimal",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "anmclaim",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      animal_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getAnimalsConf",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "anmconf",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.anmconf = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "breedingStart",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a, t) {
                                  var n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return n = [{
                                                  account: this.mainCollection,
                                                  name: "brdstart",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      bearer_id: t,
                                                      partner_id: a
                                                  }
                                              }], e.next = 3, this.__transact(n);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a, t) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "breedingClaim",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a, t, n) {
                                  var c;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return c = [{
                                                  account: "atomicassets",
                                                  name: "transfer",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      to: this.mainCollection,
                                                      asset_ids: [n],
                                                      memo: "breed_animal:".concat(t, ",").concat(a)
                                                  }
                                              }], console.log("交配参数",c), e.next = 3, this.__transact(c);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a, t, n) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "breedingCancel",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "unbreed",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      bearer_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getBreedingConf",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "breedconf",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.breedconf = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getBreedings",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "breedings",
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  index_position: 2,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.breedings = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "marketBuy",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a, t) {
                                  var n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return n = [{
                                                  account: this.mainCollection,
                                                  name: "mktbuy",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      template_id: a,
                                                      quantity: t
                                                  }
                                              }], console.log("marketBuy", n), e.next = 4, this.__transact(n);
                                          case 4:
                                              return  account_info.res = e.sent, e.abrupt("return", e.sent);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a, t) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getMarketConf",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "mktconf",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.mktconf = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "cropClaim",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "cropclaim",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      crop_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getPlantsConfig",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows({
                                                  table: "cropconf",
                                                  limit: 100,
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.cropconf = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getUsingPlants",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "crops",
                                                  lower_bound: this.name,
                                                  upper_bound: this.name,
                                                  index_position: 2,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.crops = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getReferral",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "partners",
                                                  lower_bound: a,
                                                  upper_bound: a,
                                                  index_position: 1,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return t = e.sent, n = t.rows, account_info.partners = t, e.abrupt("return", n);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "checkReferral",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.getReferral(a);
                                          case 2:
                                              if (n = e.sent, 1 !== (null === (t = n[0]) || void 0 === t ? void 0 : t.is_active)) {
                                                  e.next = 5;
                                                  break
                                              }
                                              return e.abrupt("return", !0);
                                          case 5:
                                              return e.abrupt("return", !1);
                                          case 6:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "register",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n, c;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.checkReferral(a);
                                          case 2:
                                              return t = e.sent, n = t ? a : "", c = [{
                                                  account: this.mainCollection,
                                                  name: "newuser",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      referral_partner: n
                                                  }
                                              }], e.next = 7, this.__transact(c);
                                          case 7:
                                              return e.abrupt("return", e.sent);
                                          case 8:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getAccountToken",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              if (this.name.includes(".wam") || this.name.includes(".waa")) {
                                                  e.next = 2;
                                                  break
                                              }
                                              return e.abrupt("return", !0);
                                          case 2:
                                              return e.next = 4, this.__getTableRows({
                                                  code: "wallet.wax",
                                                  scope: this.name,
                                                  table: "tokens",
                                                  limit: "100"
                                              });
                                          case 4:
                                              return a = e.sent, t = a.rows, e.abrupt("return", t);
                                          case 7:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "setAccountTokens",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n, c, r = this;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [], a.forEach((function(e) {
                                                  t.push({
                                                      account: "wallet.wax",
                                                      name: "tokenremove",
                                                      authorization: [{
                                                          actor: r.name,
                                                          permission: "active"
                                                      }],
                                                      data: {
                                                          from: r.name,
                                                          token_id: e
                                                      }
                                                  })
                                              })), n = [{
                                                  account: "wallet.wax",
                                                  name: "tokenset",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      contract: "farmerstoken",
                                                      token: "4," + B.type,
                                                      displayname: B.type,
                                                      image: B.image
                                                  }
                                              }, {
                                                  account: "wallet.wax",
                                                  name: "tokenset",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      contract: "farmerstoken",
                                                      token: "4," + U.type,
                                                      displayname: U.type,
                                                      image: U.image
                                                  }
                                              }, {
                                                  account: "wallet.wax",
                                                  name: "tokenset",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      contract: "farmerstoken",
                                                      token: "4," + I.type,
                                                      displayname: I.type,
                                                      image: I.image
                                                  }
                                              }], c = t.concat(n), e.next = 6, this.__transact(c);
                                          case 6:
                                              return e.abrupt("return", e.sent);
                                          case 7:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getWaxAccount",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return a = {
                                                  account_name: this.name
                                              }, e.next = 3, fetch("https://chain.wax.io/v1/chain/get_account", {
                                                  method: "POST",
                                                  body: JSON.stringify(a)
                                              });
                                          case 3:
                                              return t = e.sent, e.abrupt("return", t.json());
                                          case 6:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "buyRam",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: "eosio",
                                                  name: "buyram",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      payer: this.name,
                                                      receiver: this.name,
                                                      quant: parseFloat(a).toFixed(8) + " WAX"
                                                  }
                                              }], console.log("buyram", t), e.next = 4, this.__transact(t);
                                          case 4:
                                              return e.abrupt("return", e.sent);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "buyCpuNet",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n, c;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = 0, n = 0, a.net && (n = a.net), a.cpu && (t = a.cpu), c = [{
                                                  account: "eosio",
                                                  name: "delegatebw",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      receiver: this.name,
                                                      stake_net_quantity: parseFloat(n).toFixed(8) + " WAX",
                                                      stake_cpu_quantity: parseFloat(t).toFixed(8) + " WAX",
                                                      transfer: !1
                                                  }
                                              }], e.next = 7, this.__transact(c);
                                          case 7:
                                              return e.abrupt("return", e.sent);
                                          case 8:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "mbsCraft",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: "atomicassets",
                                                  name: "transfer",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      to: this.mainCollection,
                                                      asset_ids: a.coins_id,
                                                      memo: "mint_membership:".concat(a.name)
                                                  }
                                              }], console.log("mbsCraft", t), e.next = 4, this.__transact(t);
                                          case 4:
                                              return e.abrupt("return", e.sent);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "craft",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = a.template_name, n = [{
                                                  account: this.mainCollection,
                                                  name: "mintasset",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      memo: "".concat(t)
                                                  }
                                              }], console.log("action craft", n), e.next = 5, this.__transact(n);
                                          case 5:
                                              return e.abrupt("return", e.sent);
                                          case 6:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "repair",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "repair",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      asset_owner: this.name,
                                                      asset_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "recover",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "recover",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      energy_recovered: 5 * a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "stake",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: "atomicassets",
                                                  name: "transfer",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      to: this.mainCollection,
                                                      asset_ids: [a],
                                                      memo: "stake"
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "mbsUnstake",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "mbsunstake",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      asset_owner: this.name,
                                                      asset_id: a
                                                  }
                                              }], console.log("mbsunstake", t), e.next = 4, this.__transact(t);
                                          case 4:
                                              return e.abrupt("return", e.sent);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "unstake",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "unstake",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      asset_owner: this.name,
                                                      asset_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "mine",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "claim",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      asset_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "mbsClaim",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: this.mainCollection,
                                                  name: "mbsclaim",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      asset_id: a
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "deposit",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a, t, n) {
                                  var c, r;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return c = [{
                                                  name: "FWG",
                                                  value: a
                                              }, {
                                                  name: "FWF",
                                                  value: t
                                              }, {
                                                  name: "FWW",
                                                  value: n
                                              }].filter((function(e) {
                                                  return e.value > 0
                                              })).map((function(e) {
                                                  return "".concat(parseFloat(e.value).toFixed(4), " ").concat(e.name)
                                              })), r = [{
                                                  account: this.mintCollection,
                                                  name: "transfers",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      to: this.mainCollection,
                                                      quantities: c,
                                                      memo: "deposit"
                                                  }
                                              }], e.next = 5, this.__transact(r);
                                          case 5:
                                              return e.abrupt("return", e.sent);
                                          case 6:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a, t, n) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "withdraw",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a, t, n, c) {
                                  var r, i;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return r = [{
                                                  name: "GOLD",
                                                  value: a
                                              }, {
                                                  name: "FOOD",
                                                  value: t
                                              }, {
                                                  name: "WOOD",
                                                  value: n
                                              }].filter((function(e) {
                                                  return e.value > 0
                                              })).map((function(e) {
                                                  return "".concat(parseFloat(e.value).toFixed(4), " ").concat(e.name)
                                              })), i = [{
                                                  account: this.mainCollection,
                                                  name: "withdraw",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      owner: this.name,
                                                      quantities: r,
                                                      fee: c
                                                  }
                                              }], e.next = 6, this.__transact(i);
                                          case 6:
                                              return e.abrupt("return", e.sent);
                                          case 7:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a, t, n, c) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "openPack",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: "atomicassets",
                                                  name: "transfer",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      to: this.mainCollection,
                                                      asset_ids: [a],
                                                      memo: "openpack"
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "exchangeRewards",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return t = [{
                                                  account: "atomicassets",
                                                  name: "transfer",
                                                  authorization: [{
                                                      actor: this.name,
                                                      permission: "active"
                                                  }],
                                                  data: {
                                                      from: this.name,
                                                      to: this.mainCollection,
                                                      asset_ids: [a],
                                                      memo: "burn"
                                                  }
                                              }], e.next = 3, this.__transact(t);
                                          case 3:
                                              return e.abrupt("return", e.sent);
                                          case 4:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getExchangeConf",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "itemconf",
                                                  lower_bound: a,
                                                  upper_bound: a,
                                                  index_position: 1,
                                                  key_type: "i64",
                                                  limit: "100"
                                              });
                                          case 2:
                                              return t = e.sent, n = t.rows, account_info.itemconf = t, e.abrupt("return", n);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getConfig",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, t;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.__getTableRows({
                                                  code: this.mainCollection,
                                                  scope: this.mainCollection,
                                                  table: "config",
                                                  limit: "1"
                                              });
                                          case 2:
                                              return a = e.sent, t = a.rows, account_info.config = t, e.abrupt("return", t);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "getTransaction",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a, t) {
                                  var n, c;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, O.get(t, {
                                                  params: {
                                                      id: a
                                                  }
                                              });
                                          case 2:
                                              return n = e.sent, c = n.data, e.abrupt("return", c);
                                          case 5:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e)
                              })));
                              return function(a, t) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "__transact",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  var t, n;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              if (e.prev = 0, !this.anchorSession) {
                                                  e.next = 9;
                                                  break
                                              }
                                              return e.next = 4, this.anchorSession.transact({
                                                  actions: a
                                              });
                                          case 4:
                                              return t = e.sent, n = t.processed, e.abrupt("return", {
                                                  transaction_id: n.id
                                              });
                                          case 9:
                                              return e.next = 11, this.api.transact({
                                                  actions: a
                                              }, {
                                                  blocksBehind: 3,
                                                  expireSeconds: 90
                                              });
                                          case 11:
                                              return e.abrupt("return", e.sent);
                                          case 12:
                                              e.next = 21;
                                              break;
                                          case 14:
                                              if (e.prev = 14, e.t0 = e.
                                                  catch (0), !(e.t0 instanceof C)) {
                                                  e.next = 20;
                                                  break
                                              }
                                              throw JSON.stringify(e.t0.json, null, 2);
                                          case 20:
                                              throw e.t0;
                                          case 21:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this, [
                                      [0, 14]
                                  ])
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }, {
                          key: "__getTableRows",
                          value: function() {
                              var e = Object(o.a)(d.a.mark((function e(a) {
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              return e.next = 2, this.rpc.get_table_rows(Object(p.a)(Object(p.a)({
                                                  json: !0
                                              }, a), {}, {
                                                  reverse: !1,
                                                  show_payer: !1
                                              }));
                                          case 2:
                                              return e.abrupt("return", e.sent);
                                          case 3:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, this)
                              })));
                              return function(a) {
                                  return e.apply(this, arguments)
                              }
                          }()
                      }]), e
                  }(),
                  D = function(e, a, t) {
                      return Promise.race([e, new Promise((function(e, n) {
                          return setTimeout((function() {
                              return e(t)
                          }), a)
                      }))])
                  }, R = function() {
                      var e = Object(o.a)(d.a.mark((function e(a, t, n) {
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      return e.next = 2, Promise.all(a.map((function(e) {
                                          return D(e, t, n)
                                      })));
                                  case 2:
                                      return e.abrupt("return", e.sent);
                                  case 3:
                                  case "end":
                                      return e.stop()
                              }
                          }), e)
                      })));
                      return function(a, t, n) {
                          return e.apply(this, arguments)
                      }
                  }(),
                  q = ["https://api.wax.alohaeos.com", "https://wax.greymass.com", "https://api.waxsweden.org", "https://wax.pink.gg", "https://wax.dapplica.io", "https://wax.eosphere.io", "https://api.wax.greeneosio.com", "https://wax.cryptolions.io"],
                  K = new F("https://api.wax.alohaeos.com", "farmersworld", "farmerstoken", null),
                  V = Object(f.b)("auth/checkServersHealth", Object(o.a)(d.a.mark((function e() {
                      var a, t;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.prev = 0, e.next = 3, R(q.map(function() {
                                      var e = Object(o.a)(d.a.mark((function e(a) {
                                          var t;
                                          return d.a.wrap((function(e) {
                                              for (;;) switch (e.prev = e.next) {
                                                  case 0:
                                                      return e.next = 2, m.a.post(a + "/v1/chain/get_table_rows", {
                                                          json: !0,
                                                          code: "farmersworld",
                                                          scope: "farmersworld",
                                                          table: "config",
                                                          limit: "1"
                                                      }).
                                                      catch ((function(e) {
                                                          return null
                                                      }));
                                                  case 2:
                                                      return t = e.sent, e.abrupt("return", {
                                                          response: t,
                                                          server: a
                                                      });
                                                  case 4:
                                                  case "end":
                                                      return e.stop()
                                              }
                                          }), e)
                                      })));
                                      return function(a) {
                                          return e.apply(this, arguments)
                                      }
                                  }()), 7e3, null);
                              case 3:
                                  return a = e.sent, t = a.filter((function(e) {
                                      return !!(null === e || void 0 === e ? void 0 : e.response)
                                  })), e.abrupt("return", t);
                              case 8:
                                  e.prev = 8, e.t0 = e.
                                  catch (0), console.log("checkServersHealth", e.t0);
                              case 11:
                              case "end":
                                  return e.stop()
                          }
                      }), e, null, [
                          [0, 8]
                      ])
                  })))),
                  Q = Object(f.b)("auth/login", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.login();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  M = Object(f.b)("auth/register", Object(o.a)(d.a.mark((function e() {
                      var a, t;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return a = localStorage.getItem("referral"), e.next = 3, K.register(a);
                              case 3:
                                  return t = e.sent, e.abrupt("return", t);
                              case 5:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  T = Object(f.b)("auth/waxLogin", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.login();
                              case 2:
                                  return a = e.sent, console.log("login response", a), e.abrupt("return", a);
                              case 5:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  L = Object(f.b)("auth/anchorLogin", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.anchorLogin();
                              case 2:
                                  return a = e.sent, console.log("anchor login response", a), e.abrupt("return", a);
                              case 5:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  X = Object(f.c)({
                      name: "auth",
                      initialState: {
                          user: {
                              server: "https://wax.greymass.com",
                              accountCollection: "farmersworld",
                              mintCollection: "farmerstoken",
                              account: {
                                  name: "",
                                  key: ""
                              }
                          },
                          isLoggedIn: !1,
                          isRegisteredStatus: !1,
                          splash: !1,
                          error: null,
                          servers: [],
                          selectedServer: "",
                          status: ""
                      },
                      reducers: {
                          submitUser: function(e, a) {
                              e.user.account.name = a.payload.account, e.user.account.key = a.payload.key;
                              var t = e.user.account.name,
                                  n = e.user.account.key;
                              K.setPrivateAccount({
                                  username: t,
                                  privateKey: n
                              }), e.isLoggedIn = !0
                          },
                          setServer: function(e, a) {
                              e.selectedServer = e.servers[a.payload], K.setServer(e.selectedServer)
                          },
                          setRegisterStatus: function(e, a) {
                              e.isRegisteredStatus = a.payload
                          },
                          setSplahScreen: function(e, a) {
                              e.splash = a.payload
                          },
                          setLoginStatus: function(e, a) {
                              e.isLoggedIn = a.payload
                          }
                      },
                      extraReducers: function(e) {
                          e.addCase(Q.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Q.fulfilled, (function(e, a) {
                              e.status = "succeeded", e.isLoggedIn = !0, e.user.name = a.payload
                          })).addCase(Q.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(L.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(L.fulfilled, (function(e, a) {
                              e.status = "succeeded", e.isLoggedIn = !0, e.user.name = a.payload.actor
                          })).addCase(L.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(M.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(M.fulfilled, (function(e, a) {
                              e.status = "succeeded", e.isRegisteredStatus = !0
                          })).addCase(M.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(T.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(T.fulfilled, (function(e, a) {
                              e.status = "succeeded", e.isLoggedIn = !0, e.user.name = a.payload
                          })).addCase(T.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(V.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(V.fulfilled, (function(e, a) {
                              e.status = "succeeded", a.payload.forEach((function(a) {
                                  e.servers.push(a.server)
                              })), e.selectedServer = e.servers[0]
                          })).addCase(V.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  z = X.actions,
                  W = (z.submitUser, z.setRegisterStatus),
                  Y = z.setSplahScreen,
                  J = z.setLoginStatus,
                  P = z.setServer,
                  H = X.reducer,
                  G = Object(f.c)({
                      name: "modal",
                      initialState: {
                          isShowing: !1,
                          error: "",
                          isLoading: !1
                      },
                      reducers: {
                          toggleModal: function(e, a) {
                              e.isShowing = a.payload
                          },
                          setErrorMessage: function(e, a) {
                              e.error = a.payload
                          },
                          setLoadingModal: function(e, a) {
                              e.isLoading = a.payload
                          }
                      }
                  }),
                  Z = G.actions,
                  _ = Z.toggleModal,
                  $ = Z.setErrorMessage,
                  ee = (Z.setLoadingModal, G.reducer),
                  ae = t(0);
  
              function te(e) {
                  return Object(ae.jsx)("button", {
                      className: "button-section " + (null === e || void 0 === e ? void 0 : e.wrapperClassname) || !1,
                      onClick: function() {
                          return null === e || void 0 === e ? void 0 : e.handleClick()
                      },
                      children: Object(ae.jsx)("div", {
                          className: "plain-button " + (null === e || void 0 === e ? void 0 : e.atr) + " " + (null === e || void 0 === e ? void 0 : e.isDisabled) || !1,
                          children: e.text
                      })
                  })
              }
              var ne = function() {
                  var e = Object(u.b)(),
                      a = Object(u.c)((function(e) {
                          return e.modal.isShowing
                      })),
                      t = Object(u.c)((function(e) {
                          return e.modal.error
                      })),
                      r = Object(n.useRef)(null),
                      s = function(a) {
                          r.current && !r.current.contains(a.target) && e(_(!1))
                      };
                  Object(n.useEffect)((function() {
                      return document.addEventListener("click", s, !0),
                      function() {
                          document.removeEventListener("click", s, !0)
                      }
                  }));
                  return a ? i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "modal-wrapper",
                          tabIndex: -1,
                          role: "dialog",
                          children: Object(ae.jsxs)("div", {
                              style: {
                                  backgroundImage: "url(./img/big-board.png)"
                              },
                              className: "modal",
                              ref: r,
                              children: [Object(ae.jsx)("div", {
                                  className: "modal-content " + function() {
                                      if (t.length < 250) return "mid"
                                  }(),
                                  children: "".concat(t)
                              }), Object(ae.jsx)("div", {
                                  className: "modal__button-group",
                                  children: Object(ae.jsx)(te, {
                                      type: "button",
                                      atr: "short",
                                      "data-dismiss": "modal",
                                      text: "OK",
                                      handleClick: function() {
                                          return e(_(!1))
                                      }
                                  })
                              })]
                          })
                      })
                  }), document.body) : null
              }, ce = Object(f.b)("exchange/withdraw", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.withdraw(a.gold, a.food, a.wood, a.fee);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  re = Object(f.b)("exchange/deposit", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.deposit(a.gold, a.food, a.wood);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  ie = Object(f.b)("exchange/getConfigs", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getConfig();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  se = Object(f.b)("exchange/getTokens", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getTokens();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  de = function(e) {
                      return e.data[e.selectedTab]
                  }, oe = Object(f.c)({
                      name: "exchange",
                      initialState: {
                          tax: 0,
                          data: [{
                              gold: 0,
                              wood: 0,
                              food: 0
                          }, {
                              gold: 0,
                              wood: 0,
                              food: 0
                          }],
                          tokens: {},
                          newTaxTime: "",
                          status: "idle",
                          fetchdata: "idle",
                          error: "",
                          response: "",
                          selectedTab: 0
                      },
                      reducers: {
                          chooseTab: function(e, a) {
                              e.selectedTab = a.payload
                          },
                          changeData: function(e, a) {
                              var t = Object(p.a)(Object(p.a)({}, e.data[e.selectedTab]), a.payload);
                              e.data[e.selectedTab] = t
                          },
                          resetChange: function(e, a) {
                              e.data[e.selectedTab].food = 0, e.data[e.selectedTab].wood = 0, e.data[e.selectedTab].gold = 0
                          }
                      },
                      extraReducers: function(e) {
                          e.addCase(ce.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(ce.fulfilled, (function(e, a) {
                              e.status = "loaded", console.log("withdraw", a.payload)
                          })).addCase(ce.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(re.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(re.fulfilled, (function(e, a) {
                              e.status = "loaded", console.log("deposit", a.payload)
                          })).addCase(re.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(se.pending, (function(e, a) {
                              e.fetchdata = "loading"
                          })).addCase(se.fulfilled, (function(e, a) {
                              for (var t in e.fetchdata = "loaded", a.payload) {
                                  var n = a.payload[t].split(" ");
                                  e.tokens[n[1]] = n[0]
                              }
                          })).addCase(se.rejected, (function(e, a) {
                              e.fetchdata = "failed", e.error = a.error.message
                          })).addCase(ie.pending, (function(e, a) {
                              e.fetchdata = "loading"
                          })).addCase(ie.fulfilled, (function(e, a) {
                              e.fetchdata = "loaded", e.tax = a.payload[0].fee
                          })).addCase(ie.rejected, (function(e, a) {
                              e.fetchdata = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  ue = oe.actions,
                  le = ue.changeData,
                  fe = ue.chooseTab,
                  be = ue.resetChange,
                  me = oe.reducer,
                  pe = Object(f.b)("user/getPlayerInfo", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getPlayerInfo();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  ve = Object(f.b)("user/recover", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.recover(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  ge = Object(f.c)({
                      name: "user",
                      initialState: {
                          status: "idle",
                          balances: {},
                          user: {
                              energy: 0,
                              max_energy: 500
                          },
                          error: null
                      },
                      reducers: {
                          updateRepairMoney: function(e, a) {
                              e.balances.gold -= a.payload
                          },
                          updateBalance: function(e, a) {
                              void 0 !== a.payload && a.payload.split(" and ").forEach((function(a) {
                                  var t = a.split(" ");
                                  e.balances[t[1].toLowerCase()] = parseFloat(e.balances[t[1].toLowerCase()]) + parseFloat(t[0])
                              }))
                          },
                          UpdateHealth: function(e, a) {
                              var t;
                              "plus" === (null === (t = a.payload) || void 0 === t ? void 0 : t.type) ? e.user.energy = parseInt(e.user.energy) + parseInt(a.payload.value) : e.user.energy = parseInt(e.user.energy) - parseInt(a.payload)
                          }
                      },
                      extraReducers: function(e) {
                          e.addCase(pe.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(pe.fulfilled, (function(e, a) {
                              for (var t in e.status = "loaded", e.user = a.payload[0], null === (n = a.payload[0]) || void 0 === n ? void 0 : n.balances) {
                                  var n, c = a.payload[0].balances[t].split(" ");
                                  c[0].includes(".") && (e.balances[c[1].toLowerCase()] = parseFloat(c[0]).toFixed(4))
                              }
                          })).addCase(pe.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(ve.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(ve.fulfilled, (function(e, a) {
                              e.status = "loaded", e.response = a.payload
                          })).addCase(ve.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  he = function(e) {
                      return e.user.user
                  }, je = function(e) {
                      return e.user.balances
                  }, xe = ge.actions,
                  Oe = xe.updateRepairMoney,
                  ke = xe.updateBalance,
                  we = xe.UpdateHealth,
                  ye = ge.reducer,
                  Ae = t(27),
                  Ce = ["https://api.waxsweden.org/v2/history/get_transaction", "https://wax.eosphere.io/v2/history/get_transaction", "https://wax.blokcrafters.io/v2/history/get_transaction", "https://api.wax.greeneosio.com/v2/history/get_transaction", "https://wax.eu.eosamsterdam.net/v2/history/get_transaction", "https://api-wax.eosauthority.com/v2/history/get_transaction"],
                  Ne = "farmercoins";
  
              function Se(e) {
                  return new Promise((function(a) {
                      return setTimeout(a, e)
                  }))
              }
              var Ee = function(e, a, t) {
                  return Promise.race([e, new Promise((function(e, n) {
                      return setTimeout((function() {
                          return n(t)
                      }), a)
                  }))])
              }, Be = Object(f.b)("tools/getCraftTransaction", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i, s, o, u;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = {}, n = {}, c = !1, r = Object(Ae.a)(Ce), i = 0;
                                  case 5:
                                      if (!(i < 8 * Ce.length)) {
                                          e.next = 29;
                                          break
                                      }
                                      return e.next = 8, Se(1e3);
                                  case 8:
                                      return e.prev = 8, e.next = 11, Ee(K.getTransaction(a, r[i % r.length]), 2e3, null);
                                  case 11:
                                      if (!0 === (t = e.sent).executed) {
                                          e.next = 14;
                                          break
                                      }
                                      return e.abrupt("continue", 26);
                                  case 14:
                                      if (t.actions)
                                          for (s = "", o = 0; o < t.actions.length; o++) "logmintasset" === t.actions[o].act.name && (s = null === (u = t.actions[o].act) || void 0 === u ? void 0 : u.data.data, n = {
                                              claim: s
                                          }, s.discount && (c = !0));
                                      if (!1 === c) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.abrupt("return", n);
                                  case 17:
                                      e.next = 26;
                                      break;
                                  case 19:
                                      if (e.prev = 19, e.t0 = e.
                                          catch (8), r.splice(i % r.length, 1), i--, 0 !== r.length) {
                                          e.next = 25;
                                          break
                                      }
                                      throw new Error("Craft successfully!");
                                  case 25:
                                      return e.abrupt("continue", 26);
                                  case 26:
                                      i++, e.next = 5;
                                      break;
                                  case 29:
                                      throw new Error("Craft successfully!");
                                  case 30:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [8, 19]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  Ie = Object(f.b)("tools/getUsingItems", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getUsingItems();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Ue = Object(f.b)("tools/useItem", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.stake(a.asset_id);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().tools.requests.filter((function(a) {
                              return a === e.asset_id
                          })).length) return !1
                      }
                  }),
                  Fe = Object(f.b)("tools/removeItem", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.unstake(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().tools.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  De = Object(f.b)("tools/repairItem", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.repair(a.id);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().tools.requests.filter((function(a) {
                              return a === e.id
                          })).length) return !1
                      }
                  }),
                  Re = Object(f.b)("tools/mineItem", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.mine(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().tools.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  qe = Object(f.b)("tools/getTransaction", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i, s, o, u, l, f, b, m, p, v, g, h, j, x, O, k;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = {}, n = !1, c = Object(Ae.a)(Ce), r = 0;
                                  case 4:
                                      if (!(r < 5 * Ce.length)) {
                                          e.next = 39;
                                          break
                                      }
                                      return e.next = 7, Se(500);
                                  case 7:
                                      return e.prev = 7, e.next = 10, Ee(K.getTransaction(a, c[r % c.length]), 2e3, null);
                                  case 10:
                                      if (!0 === (t = e.sent).executed) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 36);
                                  case 13:
                                      if (!t.actions) {
                                          e.next = 25;
                                          break
                                      }
                                      if (O = "", k = "", t.actions.forEach((function(e) {
                                          "logbonus" === e.act.name && (O = e), "logclaim" === e.act.name && (k = e)
                                      })), t = {
                                          bonus: O,
                                          claim: k
                                      }, (null === (i = O.act) || void 0 === i || null === (s = i.data) || void 0 === s || null === (o = s.bonus_rewards) || void 0 === o ? void 0 : o.length) === (null === (u = k.act) || void 0 === u || null === (l = u.data) || void 0 === l || null === (f = l.rewards) || void 0 === f ? void 0 : f.length)) {
                                          e.next = 20;
                                          break
                                      }
                                      return e.abrupt("continue", 36);
                                  case 20:
                                      if (!("logbonus" === (null === (b = O.act) || void 0 === b ? void 0 : b.name) && (null === (m = O.act) || void 0 === m || null === (p = m.data) || void 0 === p || null === (v = p.bonus_rewards) || void 0 === v ? void 0 : v.length) > 0 || "logclaim" === (null === (g = k.act) || void 0 === g ? void 0 : g.name) && (null === (h = k.act) || void 0 === h || null === (j = h.data) || void 0 === j || null === (x = j.rewards) || void 0 === x ? void 0 : x.length) > 0)) {
                                          e.next = 24;
                                          break
                                      }
                                      n = !0, e.next = 25;
                                      break;
                                  case 24:
                                      return e.abrupt("continue", 36);
                                  case 25:
                                      if (!1 === n) {
                                          e.next = 27;
                                          break
                                      }
                                      return e.abrupt("return", t);
                                  case 27:
                                      e.next = 36;
                                      break;
                                  case 29:
                                      if (e.prev = 29, e.t0 = e.
                                          catch (7), c.splice(r % c.length, 1), r--, 0 !== c.length) {
                                          e.next = 35;
                                          break
                                      }
                                      throw new Error("Mined successfully. Your labors got you rewards");
                                  case 35:
                                      return e.abrupt("continue", 36);
                                  case 36:
                                      r++, e.next = 4;
                                      break;
                                  case 39:
                                      throw new Error("Mined successfully. Your labors got you rewards");
                                  case 40:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [7, 29]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  Ke = Object(f.b)("tools/getEquipConfigs", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getEquipConfigs();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Ve = Object(f.b)("craft/craftTool", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.craft(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().tools.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  Qe = {
                      GOLD: "gold_mint",
                      FOOD: "food_mint",
                      WOOD: "wood_mint"
                  }, Me = Object(f.c)({
                      name: "tools",
                      initialState: {
                          toolChest: [],
                          usingItems: [],
                          EquipConfigs: [],
                          EquipConfigsStatus: "idle",
                          usingItemsStatus: "idle",
                          itemListStatus: "idle",
                          status: "idle",
                          miningStatus: "idle",
                          response: "",
                          selectedCard: 0,
                          selectedUsingCard: 0,
                          requests: []
                      },
                      reducers: {
                          getCard: function(e, a) {
                              return e.card[a.payload]
                          },
                          chooseCard: function(e, a) {
                              e.selectedCard = a.payload
                          },
                          chooseUsingCard: function(e, a) {
                              e.selectedUsingCard = a.payload
                          },
                          repairCard: function(e, a) {
                              var t = e.usingItems.findIndex((function(e) {
                                  return e.asset_id === a.payload
                              }));
                              e.usingItems[t].current_durability = e.usingItems[t].durability
                          },
                          UpdateDurability: function(e, a) {
                              e.usingItems[a.payload.index].current_durability = parseInt(e.usingItems[a.payload.index].current_durability) - parseInt(a.payload.value)
                          },
                          UpdateTimestamp: function(e, a) {
                              e.usingItems[e.selectedUsingCard].next_availability = Date.now() / 1e3 + parseInt(e.usingItems[e.selectedUsingCard].charged_time)
                          },
                          chooseUsingCardById: function(e, a) {
                              e.selectedUsingCard = e.usingItems.findIndex((function(e) {
                                  return e.asset_id === a.payload
                              }))
                          }
                      },
                      extraReducers: function(e) {
                          e.addCase(Ke.pending, (function(e, a) {
                              e.EquipConfigsStatus = "loading"
                          })).addCase(Ke.fulfilled, (function(e, a) {
                              for (var t in e.EquipConfigsStatus = "loaded", e.EquipConfigs = a.payload, e.EquipConfigs) {
                                  var n = e.EquipConfigs[t].rewards[0].split(" ");
                                  for (var c in e.EquipConfigs[t].reward = parseFloat(n[0]), e.EquipConfigs[t].mints) {
                                      var r = e.EquipConfigs[t].mints[c].split(" ");
                                      e.EquipConfigs[t][Qe[r[1]]] = parseInt(r[0])
                                  }
                              }
                          })).addCase(Ke.rejected, (function(e, a) {
                              e.EquipConfigsStatus = "failed", e.error = a.error.message
                          })).addCase(Ie.pending, (function(e, a) {
                              e.usingItemsStatus = "loading"
                          })).addCase(Ie.fulfilled, (function(e, a) {
                              e.usingItemsStatus = "loaded";
                              var t = [],
                                  n = [],
                                  c = function(c) {
                                      var r = e.EquipConfigs.find((function(e) {
                                          return e.template_id === a.payload[c].template_id
                                      }));
                                      t.push(Object.assign(a.payload[c], r)), n.push(a.payload[c].asset_id)
                                  };
                              for (var r in a.payload) c(r);
                              e.usingItems = t
                          })).addCase(Ie.rejected, (function(e, a) {
                              e.usingItemsStatus = "failed", e.error = a.error.message
                          })).addCase(Ue.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(Ue.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Ue.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Fe.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(Fe.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Fe.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(De.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg.id)
                          })).addCase(De.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg.id);
                              e.requests.splice(t, 1)
                          })).addCase(De.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg.id);
                              e.requests.splice(t, 1)
                          })).addCase(Re.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(Re.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Re.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Ve.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg.template_id)
                          })).addCase(Ve.fulfilled, (function(e, a) {
                              e.status = "loaded", e.response = a.payload;
                              var t = e.requests.indexOf(a.meta.arg.template_id);
                              e.requests.splice(t, 1)
                          })).addCase(Ve.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg.template_id);
                              e.requests.splice(t, 1)
                          })).addCase(qe.pending, (function(e, a) {
                              e.miningStatus = "loading"
                          })).addCase(qe.fulfilled, (function(e, a) {
                              e.miningStatus = "loaded", e.response = a.payload
                          })).addCase(qe.rejected, (function(e, a) {
                              e.miningStatus = "failed", e.error = a.error.message
                          })).addCase(Be.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Be.fulfilled, (function(e, a) {
                              e.status = "loaded", e.response = a.payload
                          })).addCase(Be.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  Te = Me.actions,
                  Le = (Te.getCard, Te.chooseCard, Te.chooseUsingCard),
                  Xe = Te.repairCard,
                  ze = (Te.chooseCraft, Te.UpdateDurability, Te.UpdateTimestamp),
                  We = Te.chooseUsingCardById,
                  Ye = Me.reducer,
                  Je = function(e, a, t) {
                      return Promise.race([e, new Promise((function(e, n) {
                          return setTimeout((function() {
                              return n(t)
                          }), a)
                      }))])
                  };
  
              function Pe(e) {
                  return new Promise((function(a) {
                      return setTimeout(a, e)
                  }))
              }
              var He = Object(f.b)("badge/getUsingBadge", Object(o.a)(d.a.mark((function e() {
                  var a;
                  return d.a.wrap((function(e) {
                      for (;;) switch (e.prev = e.next) {
                          case 0:
                              return e.next = 2, K.getUsingBadge();
                          case 2:
                              return a = e.sent, e.abrupt("return", a);
                          case 4:
                          case "end":
                              return e.stop()
                      }
                  }), e)
              })))),
                  Ge = Object(f.b)("badge/getBadgeConfig", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getBadgeConfig();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Ze = Object(f.b)("badge/mbsUnstake", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      return e.next = 2, K.mbsUnstake(a);
                                  case 2:
                                      return t = e.sent, e.abrupt("return", t);
                                  case 4:
                                  case "end":
                                      return e.stop()
                              }
                          }), e)
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  _e = Object(f.b)("badge/mbsCraft", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.mbsCraft(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  $e = Object(f.b)("badge/mbsClaimAsset", function() {
                      var e = Object(o.a)(d.a.mark((function e(a, t) {
                          var n, c, r, i, s, o, u;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      n = t.getState, !1 === a && (c = n(), r = c.game, a = r.claimAssets), i = 0;
                                  case 3:
                                      if (!(i < 5)) {
                                          e.next = 23;
                                          break
                                      }
                                      e.prev = 4, e.t0 = d.a.keys(a);
                                  case 6:
                                      if ((e.t1 = e.t0()).done) {
                                          e.next = 12;
                                          break
                                      }
                                      return s = e.t1.value, e.next = 10, K.mbsClaimAsset(a[s]);
                                  case 10:
                                      e.next = 6;
                                      break;
                                  case 12:
                                      return e.abrupt("return", !0);
                                  case 15:
                                      if (e.prev = 15, e.t2 = e.
                                          catch (4), !(((null === (o = e.t2.message) || void 0 === o ? void 0 : o.includes("undefined")) || (null === (u = e.t2.message) || void 0 === u ? void 0 : u.includes("Failed to fetch"))) && i < 2)) {
                                          e.next = 19;
                                          break
                                      }
                                      return e.abrupt("continue", 20);
                                  case 19:
                                      throw e.t2;
                                  case 20:
                                      i++, e.next = 3;
                                      break;
                                  case 23:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [4, 15]
                          ])
                      })));
                      return function(a, t) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  ea = Object(f.b)("badge/getBadgeCraft", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getBadgeCraft();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  aa = Object(f.b)("badge/mbsClaim", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.mbsClaim(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  ta = Object(f.b)("badge/getMbsTransaction", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i, s, o, u;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = {}, n = !1, c = Object(Ae.a)(Ce), r = 0;
                                  case 4:
                                      if (!(r < 5 * Ce.length)) {
                                          e.next = 37;
                                          break
                                      }
                                      return e.next = 7, Pe(200);
                                  case 7:
                                      return e.prev = 7, e.next = 10, Je(K.getTransaction(a, c[r % c.length]), 2e3, null);
                                  case 10:
                                      if (!0 === (t = e.sent).executed) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 34);
                                  case 13:
                                      if (!t.actions) {
                                          e.next = 23;
                                          break
                                      }
                                      if (o = "", u = "", t.actions.forEach((function(e) {
                                          "logbonus" === e.act.name && (u = e), "logmbsclaim" === e.act.name && (o = e)
                                      })), t = {
                                          bonus: u,
                                          amount: o
                                      }, "logbonus" !== (null === (i = u.act) || void 0 === i ? void 0 : i.name) || "logmbsclaim" !== (null === (s = o.act) || void 0 === s ? void 0 : s.name)) {
                                          e.next = 22;
                                          break
                                      }
                                      n = !0, e.next = 23;
                                      break;
                                  case 22:
                                      return e.abrupt("continue", 34);
                                  case 23:
                                      if (!1 === n) {
                                          e.next = 25;
                                          break
                                      }
                                      return e.abrupt("return", t);
                                  case 25:
                                      e.next = 34;
                                      break;
                                  case 27:
                                      if (e.prev = 27, e.t0 = e.
                                          catch (7), c.splice(r % c.length, 1), r--, 0 !== c.length) {
                                          e.next = 33;
                                          break
                                      }
                                      throw new Error("Claim successfully. You got your rewards");
                                  case 33:
                                      return e.abrupt("continue", 34);
                                  case 34:
                                      r++, e.next = 4;
                                      break;
                                  case 37:
                                      throw new Error("Claim successfully. You got your rewards");
                                  case 38:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [7, 27]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  na = Object(f.b)("badge/getMbsCraftTransaction", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i, s;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = {}, n = !1, c = Object(Ae.a)(Ce), r = {}, i = 0;
                                  case 5:
                                      if (!(i < 5 * Ce.length)) {
                                          e.next = 29;
                                          break
                                      }
                                      return e.next = 8, Pe(200);
                                  case 8:
                                      return e.prev = 8, e.next = 11, Je(K.getTransaction(a, c[i % c.length]), 2e3, null);
                                  case 11:
                                      if (!0 === (t = e.sent).executed) {
                                          e.next = 14;
                                          break
                                      }
                                      return e.abrupt("continue", 26);
                                  case 14:
                                      if (null === (s = t) || void 0 === s || s.actions.forEach((function(e) {
                                          var a;
                                          "logmint" === (null === (a = e.act) || void 0 === a ? void 0 : a.name) && (r = e.act.data, n = !0)
                                      })), !1 === n) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.abrupt("return", r);
                                  case 17:
                                      e.next = 26;
                                      break;
                                  case 19:
                                      if (e.prev = 19, e.t0 = e.
                                          catch (8), c.splice(i % c.length, 1), i--, 0 !== c.length) {
                                          e.next = 25;
                                          break
                                      }
                                      throw new Error("There might be an error. Try Refreshing your Browser to claim your Membership.");
                                  case 25:
                                      return e.abrupt("continue", 26);
                                  case 26:
                                      i++, e.next = 5;
                                      break;
                                  case 29:
                                      throw new Error("There might be an error. Try Refreshing your Browser to claim your Membership.");
                                  case 30:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [8, 19]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  ca = Object(f.c)({
                      name: "Badge",
                      initialState: {
                          usingBadges: [],
                          badgeChest: [],
                          badgeConfigs: [],
                          badgeCraft: [],
                          isCrafting: !1,
                          status: "idle",
                          error: ""
                      },
                      reducers: {
                          getMbsTemplate: function(e, a) {
                              var t = Object(Ae.a)(e.badgeConfigs);
                              for (var n in t)
                                  if (t[n].template_id === a.payload) return t[n];
                              return null
                          }
                      },
                      extraReducers: function(e) {
                          e.addCase(He.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(He.fulfilled, (function(e, a) {
                              var t = [];
                              a.payload.forEach((function(a) {
                                  var n = e.badgeConfigs.find((function(e) {
                                      return e.template_id === a.template_id
                                  }));
                                  t.push(Object(p.a)(Object(p.a)({}, n), a))
                              })), e.usingBadges = t, e.status = "loaded"
                          })).addCase(He.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(Ge.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Ge.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = [];
                              for (var n in a.payload) t.push(a.payload[n]), t[n].golds_mint = parseFloat(t[n].golds_mint.split(" ")[0]);
                              e.badgeConfigs = t
                          })).addCase(Ge.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(ea.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(ea.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = [];
                              for (var n in a.payload) a.payload[n].reward = a.payload[n].rewards_rate, delete a.payload[n].rewards_rate, t.push(a.payload[n]), t[n].golds_mint = parseFloat(t[n].golds_mint.split(" ")[0]);
                              e.badgeCraft = t
                          })).addCase(ea.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(_e.pending, (function(e, a) {
                              e.isCrafting = "loading"
                          })).addCase(_e.fulfilled, (function(e, a) {
                              e.isCrafting = "loaded", console.log("mbsCraft.fulfilled", a.payload)
                          })).addCase(_e.rejected, (function(e, a) {
                              e.isCrafting = "failed", e.error = a.error.message
                          })).addCase(aa.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(aa.fulfilled, (function(e, a) {
                              e.status = "loaded", console.log("mbsClaim.fulfilled", a.payload)
                          })).addCase(aa.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase($e.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase($e.fulfilled, (function(e, a) {
                              e.status = "loaded"
                          })).addCase($e.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(ta.pending, (function(e, a) {
                              e.isCrafting = "loading"
                          })).addCase(ta.fulfilled, (function(e, a) {
                              e.isCrafting = "loaded", e.response = a.payload
                          })).addCase(ta.rejected, (function(e, a) {
                              e.isCrafting = "failed", e.error = a.error.message
                          })).addCase(na.pending, (function(e, a) {
                              e.isCrafting = "loading"
                          })).addCase(na.fulfilled, (function(e, a) {
                              e.isCrafting = "loaded", e.response = a.payload
                          })).addCase(na.rejected, (function(e, a) {
                              e.isCrafting = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  ra = (ca.actions.getMbsTemplate, ca.reducer),
                  ia = {
                      GOLD: "gold_mint",
                      FOOD: "food_mint",
                      WOOD: "wood_mint"
                  }, sa = Object(f.b)("builds/getBuildingTransaction", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i, s, o, u;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = {}, n = {}, c = !1, r = Object(Ae.a)(Ce), i = 0;
                                  case 5:
                                      if (!(i < 8 * Ce.length)) {
                                          e.next = 29;
                                          break
                                      }
                                      return e.next = 8, Se(1e3);
                                  case 8:
                                      return e.prev = 8, e.next = 11, Ee(K.getTransaction(a, r[i % r.length]), 2e3, null);
                                  case 11:
                                      if (!0 === (t = e.sent).executed) {
                                          e.next = 14;
                                          break
                                      }
                                      return e.abrupt("continue", 26);
                                  case 14:
                                      if (t.actions)
                                          for (s = "", o = 0; o < t.actions.length; o++) "logmintasset" === t.actions[o].act.name && (s = null === (u = t.actions[o].act) || void 0 === u ? void 0 : u.data.data, n = {
                                              claim: s
                                          }, s.discount && (c = !0));
                                      if (!1 === c) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.abrupt("return", n);
                                  case 17:
                                      e.next = 26;
                                      break;
                                  case 19:
                                      if (e.prev = 19, e.t0 = e.
                                          catch (8), r.splice(i % r.length, 1), i--, 0 !== r.length) {
                                          e.next = 25;
                                          break
                                      }
                                      throw new Error("Craft successfully!");
                                  case 25:
                                      return e.abrupt("continue", 26);
                                  case 26:
                                      i++, e.next = 5;
                                      break;
                                  case 29:
                                      throw new Error("Craft successfully!");
                                  case 30:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [8, 19]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  da = Object(f.b)("builds/claimBuilding", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.claimBuilding(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().builds.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  oa = Object(f.b)("builds/craftBuilding", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.craftBuilding(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().builds.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  ua = Object(f.b)("builds/getBuildingConfig", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getBuildingConfig();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  la = Object(f.b)("builds/getUsingBuilding", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getUsingBuilding();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  fa = Object(f.c)({
                      name: "builds",
                      initialState: {
                          usingBuilds: [{}, {}, {}, {}],
                          buildConfig: [],
                          mapConfig: [1, 0, 0, 0],
                          requests: [],
                          status: "idle",
                          error: ""
                      },
                      reducers: {},
                      extraReducers: function(e) {
                          e.addCase(la.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(la.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = [],
                                  n = function(n) {
                                      var c = a.payload.find((function(a) {
                                          return a.template_id === e.buildConfig[n].template_id
                                      }));
                                      t.push(Object.assign(e.buildConfig[n], c))
                                  };
                              for (var c in e.buildConfig) n(c);
                              var r = [{}, {}, {}, {}];
                              t.forEach((function(e) {
                                  "Cowshed" === e.name ? r[3] = e : "Coop" === e.name ? r[1] = e : "Farm Plot" === e.name && (r[2] = e)
                              })), e.usingBuilds = r
                          })).addCase(la.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          })).addCase(ua.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(ua.fulfilled, (function(e, a) {
                              for (var t in e.status = "loaded", e.buildConfig = a.payload, e.buildConfig)
                                  for (var n in e.buildConfig[t].charged_time = e.buildConfig[t].charge_time, delete e.buildConfig[t].charge_time, e.buildConfig[t].craft_cost) {
                                      var c = e.buildConfig[t].craft_cost[n].split(" ");
                                      e.buildConfig[t][ia[c[1]]] = parseInt(c[0])
                                  }
                          })).addCase(ua.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          })).addCase(da.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(da.fulfilled, (function(e, a) {
                              e.status = "loaded", console.log("laod using buidling", e.usingBuilds)
                          })).addCase(da.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          })).addCase(oa.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(oa.fulfilled, (function(e, a) {
                              e.status = "loaded"
                          })).addCase(oa.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          })).addCase(sa.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(sa.fulfilled, (function(e, a) {
                              e.status = "loaded"
                          })).addCase(sa.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          }))
                      }
                  }).reducer;
  
              function ba(e) {
                  return new Promise((function(a) {
                      return setTimeout(a, e)
                  }))
              }
              var ma = function(e, a, t) {
                  return Promise.race([e, new Promise((function(e, n) {
                      return setTimeout((function() {
                          return n(t)
                      }), a)
                  }))])
              }, pa = Object(f.b)("animals/getUsingAnimals", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getUsingAnimals();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  va = Object(f.b)("animals/feedAnimal", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.feedAnimal(a.animal, a.food[t % a.food.length]);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || e.t0.includes("Sender doesn't ") || (null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().animals.requests.filter((function(a) {
                              return a === e.animal
                          })).length) return !1
                      }
                  }),
                  ga = Object(f.b)("animals/careAnimal", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.careAnimal(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().animals.requests.filter((function(a) {
                              return a === e.animal
                          })).length) return !1
                      }
                  }),
                  ha = Object(f.b)("animals/getTransaction", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i, s, o, u;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = {}, n = {}, c = !1, r = Object(Ae.a)(Ce), i = 0;
                                  case 5:
                                      if (!(i < 8 * Ce.length)) {
                                          e.next = 29;
                                          break
                                      }
                                      return e.next = 8, ba(1e3);
                                  case 8:
                                      return e.prev = 8, e.next = 11, ma(K.getTransaction(a, r[i % r.length]), 2e3, null);
                                  case 11:
                                      if (!0 === (t = e.sent).executed) {
                                          e.next = 14;
                                          break
                                      }
                                      return e.abrupt("continue", 26);
                                  case 14:
                                      if (t.actions)
                                          for (s = "", o = 0; o < t.actions.length; o++) "logclaimrs" === t.actions[o].act.name && (s = null === (u = t.actions[o].act) || void 0 === u ? void 0 : u.data.data, n = {
                                              claim: s
                                          }, s.reward_card && s.quantity && (c = !0));
                                      if (!1 === c) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.abrupt("return", n);
                                  case 17:
                                      e.next = 26;
                                      break;
                                  case 19:
                                      if (e.prev = 19, e.t0 = e.
                                          catch (8), r.splice(i % r.length, 1), i--, 0 !== r.length) {
                                          e.next = 25;
                                          break
                                      }
                                      throw new Error("You got your harvest!");
                                  case 25:
                                      return e.abrupt("continue", 26);
                                  case 26:
                                      i++, e.next = 5;
                                      break;
                                  case 29:
                                      throw new Error("You got your harvest!");
                                  case 30:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [8, 19]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  ja = Object(f.b)("animals/getAnimalsConf", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getAnimalsConf();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  xa = [298597, 298599, 298600, 298607, 298611, 298598],
                  Oa = [298612, 298613, 298614],
                  ka = Object(f.c)({
                      name: "animals",
                      initialState: {
                          animalsConfig: [],
                          cowUsing: [],
                          chickenUsing: [],
                          status: "idle",
                          requests: [],
                          error: ""
                      },
                      reducers: {
                          UpdateTimestamp: function(e, a) {
                              e.cowUsing.map((function(e) {
                                  return e.asset_id === a.payload && (e.next_availability = Date.now() / 1e3 + parseInt(e.charge_time)), !0
                              })), e.chickenUsing.map((function(e) {
                                  return e.asset_id === a.payload && (e.next_availability = Date.now() / 1e3 + parseInt(e.charge_time)), !0
                              }))
                          }
                      },
                      extraReducers: function(e) {
                          e.addCase(ja.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(ja.fulfilled, (function(e, a) {
                              e.status = "loaded", e.animalsConfig = a.payload
                          })).addCase(ja.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(pa.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(pa.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = a.payload.filter((function(e) {
                                  return xa.includes(e.template_id)
                              })),
                                  n = a.payload.filter((function(e) {
                                      return Oa.includes(e.template_id)
                                  })),
                                  c = [],
                                  r = [],
                                  i = function(a) {
                                      var n = e.animalsConfig.find((function(e) {
                                          return e.template_id === t[a].template_id
                                      }));
                                      c.push(Object.assign(t[a], n))
                                  };
                              for (var s in t) i(s);
                              var d = function(a) {
                                  var t = e.animalsConfig.find((function(e) {
                                      return e.template_id === n[a].template_id
                                  }));
                                  r.push(Object.assign(n[a], t))
                              };
                              for (var o in n) d(o);
                              e.cowUsing = c, e.chickenUsing = r
                          })).addCase(pa.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(va.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(va.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(va.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(ga.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(ga.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(ga.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(ha.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(ha.fulfilled, (function(e, a) {
                              e.status = "loaded", e.response = a.payload
                          })).addCase(ha.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  wa = ka.actions.UpdateTimestamp,
                  ya = ka.reducer,
                  Aa = Object(f.b)("market/marketBuy", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i, s;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = a.template_id, n = a.quantity, c = 0;
                                  case 2:
                                      if (!(c < 3)) {
                                          e.next = 18;
                                          break
                                      }
                                      return e.prev = 3, e.next = 6, K.marketBuy(t, n);
                                  case 6:
                                      return r = e.sent, e.abrupt("return", r);
                                  case 10:
                                      if (e.prev = 10, e.t0 = e.
                                          catch (3), !(((null === e.t0 || void 0 === e.t0 || null === (i = e.t0.message) || void 0 === i ? void 0 : i.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (s = e.t0.message) || void 0 === s ? void 0 : s.includes("Failed to fetch"))) && c < 2)) {
                                          e.next = 14;
                                          break
                                      }
                                      return e.abrupt("continue", 15);
                                  case 14:
                                      throw e.t0;
                                  case 15:
                                      c++, e.next = 2;
                                      break;
                                  case 18:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [3, 10]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().market.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  Ca = Object(f.b)("market/getMarketConf", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getMarketConf();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Na = Object(f.c)({
                      name: "market",
                      initialState: {
                          marketConfig: [],
                          requests: [],
                          status: "idle",
                          error: ""
                      },
                      reducers: {},
                      extraReducers: function(e) {
                          e.addCase(Ca.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Ca.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = [];
                              a.payload.forEach((function(e, a) {
                                  var n = parseFloat(e.cost[0].split(" ")[0]).toFixed();
                                  t.push(e), t[a].price = n
                              })), e.marketConfig = t
                          })).addCase(Ca.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          })).addCase(Aa.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Aa.fulfilled, (function(e, a) {
                              e.status = "loaded"
                          })).addCase(Aa.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          }))
                      }
                  }).reducer;
  
              function Sa(e) {
                  return new Promise((function(a) {
                      return setTimeout(a, e)
                  }))
              }
              var Ea = function(e, a, t) {
                  return Promise.race([e, new Promise((function(e, n) {
                      return setTimeout((function() {
                          return n(t)
                      }), a)
                  }))])
              }, Ba = Object(f.b)("plants/getUsingPlants", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getUsingPlants();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Ia = Object(f.b)("plants/getTransaction", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i, s, o;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = {}, n = !1, c = Object(Ae.a)(Ce), r = 0;
                                  case 4:
                                      if (!(r < 8 * Ce.length)) {
                                          e.next = 29;
                                          break
                                      }
                                      return e.next = 7, Sa(1e3);
                                  case 7:
                                      return e.prev = 7, e.next = 10, Ea(K.getTransaction(a, c[r % c.length]), 2e3, null);
                                  case 10:
                                      if (!0 === (t = e.sent).executed) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 26);
                                  case 13:
                                      if (t.actions)
                                          for (i = "", s = 0; s < t.actions.length; s++) "logclaimrs" === t.actions[s].act.name && (i = null === (o = t.actions[s].act) || void 0 === o ? void 0 : o.data.data, t = {
                                              claim: i
                                          }, i.reward_card && i.quantity && (n = !0));
                                      if (!1 === n) {
                                          e.next = 16;
                                          break
                                      }
                                      return e.abrupt("return", t);
                                  case 16:
                                      e.next = 26;
                                      break;
                                  case 18:
                                      if (e.prev = 18, e.t0 = e.
                                          catch (7), c.splice(r % c.length, 1), r--, console.error(e.t0.message), 0 !== c.length) {
                                          e.next = 25;
                                          break
                                      }
                                      throw new Error("You got your harvest!");
                                  case 25:
                                      return e.abrupt("continue", 26);
                                  case 26:
                                      r++, e.next = 4;
                                      break;
                                  case 29:
                                      throw new Error("You got your harvest!");
                                  case 30:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [7, 18]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  Ua = Object(f.b)("plants/cropClaim", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 18;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.cropClaim(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), console.log("error ", e.t0), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 14;
                                          break
                                      }
                                      return e.abrupt("continue", 15);
                                  case 14:
                                      throw e.t0;
                                  case 15:
                                      t++, e.next = 1;
                                      break;
                                  case 18:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().plants.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  Fa = Object(f.b)("plants/getPlantsConfig", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getPlantsConfig();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Da = Object(f.c)({
                      name: "plants",
                      initialState: {
                          plantsTemplate: [],
                          plantsConfig: [],
                          plantsUsing: [],
                          status: "idle",
                          response: "",
                          requests: [],
                          error: ""
                      },
                      reducers: {
                          UpdateTimestamp: function(e, a) {
                              e.plantsUsing.forEach((function(e) {
                                  e.asset_id === a.payload && (e.next_availability = Date.now() / 1e3 + parseInt(e.charge_time))
                              }))
                          }
                      },
                      extraReducers: function(e) {
                          e.addCase(Fa.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Fa.fulfilled, (function(e, a) {
                              e.status = "loaded", e.plantsConfig = a.payload
                          })).addCase(Fa.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(Ba.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Ba.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = [],
                                  n = function(n) {
                                      var c = e.plantsConfig.find((function(e) {
                                          return e.template_id === a.payload[n].template_id
                                      }));
                                      t.push(Object.assign(a.payload[n], c))
                                  };
                              for (var c in a.payload) n(c);
                              e.plantsUsing = t
                          })).addCase(Ba.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(Ua.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(Ua.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Ua.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Ia.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Ia.fulfilled, (function(e, a) {
                              e.status = "loaded", e.response = a.payload
                          })).addCase(Ia.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  Ra = Da.actions.UpdateTimestamp,
                  qa = Da.reducer,
                  Ka = Object(f.b)("coins/getCoin", Object(o.a)(d.a.mark((function e() {
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getItemsBySchema(Ne, 122);
                              case 2:
                                  return e.abrupt("return", e.sent);
                              case 3:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Va = Object(f.b)("coins/getTotalCoin", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.countAssetBySchema(Ne);
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Qa = Object(f.c)({
                      name: "coins",
                      initialState: {
                          coinConfig: {
                              total: 0,
                              isWearable: !1
                          },
                          coinsId: [],
                          totalCoin: 0,
                          status: "idle",
                          error: ""
                      },
                      reducers: {
                          getCard: function(e, a) {}
                      },
                      extraReducers: function(e) {
                          e.addCase(Ka.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Ka.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.coinConfig.total;
                              e.coinConfig = a.payload[0] || {}, e.coinConfig.asset_id ? (e.coinConfig.isWearable = !1, e.coinConfig.total = t, e.coinsId = a.payload.map((function(e) {
                                  return e.asset_id
                              }))) : e.coinConfig = []
                          })).addCase(Ka.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(Va.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Va.fulfilled, (function(e, a) {
                              e.status = "loaded", Array.isArray(e.coinConfig) || (e.coinConfig.total = a.payload, e.totalCoin = a.payload)
                          })).addCase(Va.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  Ma = Qa.actions,
                  Ta = (Ma.getCard, Ma.chooseCard, Ma.chooseUsingCard, Ma.repairCard, Ma.chooseCraft, Ma.UpdateDurability, Ma.UpdateTimestamp, Ma.chooseUsingCardById, Qa.reducer);
  
              function La(e) {
                  return new Promise((function(a) {
                      return setTimeout(a, e)
                  }))
              }
              var Xa = function(e, a, t) {
                  return Promise.race([e, new Promise((function(e, n) {
                      return setTimeout((function() {
                          return n(t)
                      }), a)
                  }))])
              }, za = Object(f.b)("foods/getTransaction", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r, i;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = {}, n = !1, c = Object(Ae.a)(Ce), r = 0;
                                  case 4:
                                      if (!(r < 5 * Ce.length)) {
                                          e.next = 36;
                                          break
                                      }
                                      return e.next = 7, La(800);
                                  case 7:
                                      return e.prev = 7, e.next = 10, Xa(K.getTransaction(a, c[r % c.length]), 2e3, null);
                                  case 10:
                                      if (!0 === (t = e.sent).executed) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 33);
                                  case 13:
                                      if (!t.actions) {
                                          e.next = 22;
                                          break
                                      }
                                      if (i = "", t.actions.forEach((function(e) {
                                          var a;
                                          "logburnrs" === e.act.name && (i = null === (a = e.act.data) || void 0 === a ? void 0 : a.rewards)
                                      })), t = {
                                          burn: i
                                      }, !Array.isArray(i)) {
                                          e.next = 21;
                                          break
                                      }
                                      n = !0, e.next = 22;
                                      break;
                                  case 21:
                                      return e.abrupt("continue", 33);
                                  case 22:
                                      if (!1 === n) {
                                          e.next = 24;
                                          break
                                      }
                                      return e.abrupt("return", t);
                                  case 24:
                                      e.next = 33;
                                      break;
                                  case 26:
                                      if (e.prev = 26, e.t0 = e.
                                          catch (7), c.splice(r % c.length, 1), r--, 0 !== c.length) {
                                          e.next = 32;
                                          break
                                      }
                                      throw new Error("Exchanged successfully");
                                  case 32:
                                      return e.abrupt("continue", 33);
                                  case 33:
                                      r++, e.next = 4;
                                      break;
                                  case 36:
                                      throw new Error("Exchanged successfully");
                                  case 37:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [7, 26]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  Wa = Object(f.b)("foods/exchangeRewards", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.exchangeRewards(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().foods.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  Ya = Object(f.b)("foods/getExchangeConf", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getExchangeConf();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  Ja = function(e, a) {
                      return e.foodsConfig.find((function(e) {
                          return e.template_id === a ? e.name : ""
                      }))
                  }, Pa = Object(f.c)({
                      name: "foods",
                      initialState: {
                          foodsConfig: [],
                          requests: [],
                          status: "idle",
                          response: "",
                          error: ""
                      },
                      reducers: {},
                      extraReducers: function(e) {
                          e.addCase(za.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(za.fulfilled, (function(e, a) {
                              e.status = "loaded", e.response = a.payload
                          })).addCase(za.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(Ya.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Ya.fulfilled, (function(e, a) {
                              e.status = "loaded", e.foodsConfig = a.payload
                          })).addCase(Ya.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          })).addCase(Wa.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(Wa.fulfilled, (function(e, a) {
                              e.status = "loaded", console.log("laod using buidling", e.usingBuilds)
                          })).addCase(Wa.rejected, (function(e, a) {
                              e.status = "rejected", e.error = a.error.message
                          }))
                      }
                  }),
                  Ha = (Pa.actions.reOrderCard, Pa.reducer),
                  Ga = Object(f.b)("breeding/startBreeding", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.breedingStart(a.dad, a.mother);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().breeding.requests.filter((function(a) {
                              return a === e.animal
                          })).length) return !1
                      }
                  }),
                  Za = Object(f.b)("breeding/feedBreeding", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.breedingClaim(a.dad, a.mother, a.food[t % a.food.length]);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || e.t0.includes("Sender doesn't ") || (null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().breeding.requests.filter((function(a) {
                              return a === e.animal
                          })).length) return !1
                      }
                  }),
                  _a = Object(f.b)("breeding/cancelBreeding", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 18;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.breedingCancel(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), console.log("error ", e.t0), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 14;
                                          break
                                      }
                                      return e.abrupt("continue", 15);
                                  case 14:
                                      throw e.t0;
                                  case 15:
                                      t++, e.next = 1;
                                      break;
                                  case 18:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }(), {
                      condition: function(e, a) {
                          var t = a.getState;
                          a.extra;
                          if (0 !== t().breeding.requests.filter((function(a) {
                              return a === e
                          })).length) return !1
                      }
                  }),
                  $a = Object(f.b)("breeding/getBreedingConf", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getBreedingConf();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  et = Object(f.b)("breeding/getBreedings", Object(o.a)(d.a.mark((function e() {
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getBreedings();
                              case 2:
                                  return e.abrupt("return", e.sent);
                              case 3:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  at = Object(f.c)({
                      name: "breeding",
                      initialState: {
                          breedingConfig: [],
                          breedings: [],
                          status: "idle",
                          isShowing: !1,
                          requests: [],
                          error: ""
                      },
                      reducers: {
                          setShow: function(e, a) {
                              e.isShowing = a.payload
                          }
                      },
                      extraReducers: function(e) {
                          e.addCase($a.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase($a.fulfilled, (function(e, a) {
                              e.status = "loaded", e.breedingConfig = a.payload
                          })).addCase($a.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(et.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(et.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = [],
                                  n = function(n) {
                                      var c = e.breedingConfig.find((function(e) {
                                          return e.name === a.payload[n].name
                                      }));
                                      t.push(Object.assign(a.payload[n], c))
                                  };
                              for (var c in a.payload) n(c);
                              e.breedings = t
                          })).addCase(et.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(Za.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(Za.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Za.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Ga.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(Ga.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(Ga.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(_a.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(_a.fulfilled, (function(e, a) {
                              e.status = "loaded";
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          })).addCase(_a.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          }))
                      }
                  }),
                  tt = (at.actions.setShow, at.reducer),
                  nt = ["87f8ffd6a97c5b6662756a009c1212fa631c1ff6a681523bba10662030148ff5", "149484e0616fd22e49440a2af850adc59c6d359bcfe5b20b36bc21eeab123199", "6cf3bbd87f3a8470ee83e15d10dca708ec671982a4992c0421a215de014b33c1", "3226f4d9952ad0bdfc0e3980d79f21928377daa4246ea6b00d196ddb3096f41a", "ab0e1178eaf4f78b2e71e4fbda06d106d68b9e9150c12c68919fee3c80aa64c2", "f0e709ba2e7767246e685d5cabfbda2e670171a276eb807afb5aae076df48eb9", "64be6aacb65c5aaff9b309105c629b1afb43d827e70776370c3deeaa846ccb22", "5450b50ce4f4cf2dfc8dd8aa0fd2b3cb28d3b0ef2a2336c92735302a63445515", "31ddcf001acd773ce4c5558e83f153e2d217a765a59bf975472681d8e61c2683", "06e71cfae26e0ecc6a852509ef0ffcaa6738b85a55cda220fe2f98357dd311ae", "18f3545234ed631d4023315f06e803a908e830f0a60d746e0c56ffa65732b9a4", "b988882f2a7c8a4bb3ae3bf5169d7d2de0917952f87b3c819e2ac7cf66e0d8e4", "10726bdad4c89e978401247de9935eb9d42dc37185ed96af8116eda28f8df281", "69cc06ab8d28310b39932398d50f873afcb2b6e00b5b7d1be367bd2b03965886", "85c28da8c50ef332af28bd1a5c42615205353e1f6a21fd553089097e217fdfec", "f99036a74bd582c095f723b096524610d748dde8d46db4df70f1e00b0836a233", "d8e9a7d1eda2e7dbb8fc131df506e81062fc3c05643cc084b4c28d57885b03ee", "33dd035d01fcfccb1cea52e3cef84ae67327da50f9f9ef8cd0c8a086690515ab", "de473284c5a083d08db0c55d96f4e56a9d18b531ea060d1bc2c0d4bc31a0ed1e", "626a50c4d4949224838099fe89a666a0d0c076845dd6c6ecaf2f41356731fac9", "c955372995408df21468ea71caf392e09c4334c8cd5640e4391849aa9b765bb6", "6684f5c1f12fab5ae44a4b04b387c58c9ebd758b799d464d66c07d5ec44681f5", "45b6210cbf705ddd6bf31fb09305d341857ba0d23aa09794c1cb2f2dfb1eaa6f", "7802cef1383fe3bd056187ae507f06fd94f2b9f56c244abfceda1bfd9a0f16af", "88b0c7a9926c7b6100280a167bb661c016a76270f3882504708853c89c003ba8", "bdf0ee505733a192f23facc3a1035365c109ed2cdc71b7cf1d14cd76cb842d64", "a0496361891dde5aed2914a55747c9666d675e3512910b8c63dbe17fe4ffd72b", "ebc4499cc8de6dcdf4865410a7a081769877de62762c254dfaffb542c1ef3e93", "9acda8d321c56c7ee4ae8d857eff009caaa1cd1f5b580089592a8a87be451077", "6be34849180b06cf5764ab93474129e49aee73f82f5b25584af2ddf0c29e0337", "1f24ce70d26892dd362a500cf2cf7889b1baea2ffb3572fdbc2ded70b831213d", "0953fa546be1ccf84696eb4cac430608319c8610ab59bde937eed84138ba3a02", "e7194f9114129d67f26d881f6f44bba984caabf233fc2186af4821bc3042725c", "f12ee33cfb9b850b899644fc54072b26870c7e0418a6fd8c4bbf4e3c2ba3a52a", "6684f5c1f12fab5ae44a4b04b387c58c9ebd758b799d464d66c07d5ec44681f5", "82a55c28e96522db011dfba6f7bae67307539bec898040baa277e89dd7da4d19", "970f271cc453b2d862bb3595667a57cf26634ebad7652ed9285db87add1b8463", "253c4a17c891533ce49ed82f0410165ae36c36bc0efb2a5b4d189da4b7523a11", "15a895cefa7a9dd3a3e4dce0adbc090e60dc5d6852a66b914923567a59ad2d04", "da0759ec8a6977227d12c07148d33868a8d55ff08b99747289a64a24e8f966f6", "6dacbb470e0c1376dc2c6b4ceb83464cd4b9f26fae24cb5630fb9a696932f297", "a08ab5a7c0ccb93c1e937d3c37430a77f353c427bcec88c6e2367e6aeaacfc90", "ba7f223ba2183777861d4841f83f7529780306ae174137bdce3fe75c95842e3c", "00fe31ec7ae4da8d07308644a71dbb791d8050265ddcf355bf8d683749b1b77c", "bd2aa959ff3e15f3c41d00c42c17592ee37a7d7aab72268544ccd773a67f8996", "f99036a74bd582c095f723b096524610d748dde8d46db4df70f1e00b0836a233", "2720be7061a362ae83eca55368c252034c4d9c182f63b0ad7d89e28cb444d515", "5ff0760ea105d2ec2b06dbd74219b76b8552697ca5edb211487a1e5886e62996", "f50c25296ecde5126ec207b84c8919010bceaa4cd6797d27942e397d482e74a5", "3f4a7a526c575275ddbcfc1bb5536ebc022e67fb9ac25e506137d6a0fa49e89c", "42bc29e5bbb81bf5faf949827a8147cadda60b9942332fb708d5d4590af626ee", "08b9b21b4dd400f1304422b144d101d01ceb67b6b6d78234fe908d8e8484e947", "c5a5aff6767d9a762457e01c5166095efd28c7e595bab4c441bcc6e96a46e3a2", "22feee974e747ec8a8ae12d18b8384d83ef3ec78b2b5ebcd21ba8d0f20b0fcd9", "ebce47605341df584c5808bb03daf08d66553112fade7a49c2959b065dc9eafd", "16624a05a53e53782c55e498b6bfa00ec4cf1cd2427ccbf3a77c79f984aa37c6", "2836c36034e73338f30b307c92788bc74fbf497df407cdcbd5b2a7032ec2cf6d", "dcf9424c02919ae9770d7129b0929d656c04a56dae29d155a537abe617c05d62", "c3381bd66408fc7df405a9574b3c388b4bb7623a36465e012d3b9f57f5cfb22b", "9155fe728220801ccf5bfe1d6f57245f861ff7976b7c91ba73677a3c37b8be25", "c122d9b75a01ab14e927009e91c0a8cacf94ec6e3add1c85b8fc3f93f556ea86", "1676d580097f36ad19140364ab336fcea4c8e22f408c6f4ae1f1d498731c5a9d", "44ec45b9c5105d00631536c270dd878793caee1560d780291876f20ceeaa306f", "c582a9855c61acdbd48142bececae08d3af7a26961422786327c17fee309151d", "e9e46786600667d16ffcef9b9934193478b9beb54aca77c367c0f24a3e1e5766", "63e20fc411ef53f215642f451aa421cb49307f3a02016a88e9f1145b90bda166", "579d3d158e88b403c4032e88ad0866787fe5d4bae5766fa7f34736952134991b", "ed99febd8ce2c1014c63da3a2303824c48a43d2ac924c96834e73263e5a60756", "ee1ab0361f093cebc07f76e84f9e3f8c4a99377374dee31987d59a68bd62c821", "bcb2be347918f031904aa231f19cde50cd48711f6b90410187f6a0dc630367f0", "4585e33a87113c84b596816046f8d3396041d364b9ec7016046d34baff926a0c", "30889b588a973f02260a0a0134f193161e907cd85ec66376b22c34ec46c0f8d5", "c75020ab1c39f318de081006af1ff8c3d18f5df353ff408f9e160914c67926e2", "f93429d7e5b6b03b19ea14ba3f71843e63be67bd43dff62411c809a5dd41139a", "d51ba7b3d28f499fe63452abc5c2762c70c2d97d9daa1dfd45f11812ab260c04", "43729bc0af9ca9982217fb91d594351157dd39f3055212f34d4e85764fdc7737", "6e42116c67e120ae534153ca6a6a97b5b8ce4ea767392a4518f13fb6df0f40e3", "8c3dda5a68b9ad1ca934a9f61f2349f7064ffe8cdb2af6bc6c9815f5c794c06e", "f782d3790d780c6e5ecb2d1412ed12ca0e2b6eede5432e403f6eed2743e9f338", "910272c1ad4a86f0b8b13d9f79b83a884e11fa33df42840fa314cc9165c505cd", "e9348fc06ea537f1b7d29ed629ecab24ed7dc34829882e03be9a3ae8b1ca42e9", "b33e63c3b729fd0b9fa97430313f98cd52d6c8c82d9bd646898cde685917ae5a", "df0a3c39b2b4db5311022ac6164bef9d1c689f69e598318b9bdbf17881ed6887", "90a099eca2804d0e3a7d800bb52a0e04540df1b22d9fddd06845b2effe6692dd", "248bb80b7f1ede1ef61b290ee6b596658fdaf8129779631a9057faaee971bdff", "213e65fd0d04798055c5f038ad5c9944e9ca340eb20e4b7f67e43792b08e5f4b", "637e8c29cc79577a763e9fde3994a4bc7b010af5e43839dad9e2357a5b054dc9", "670a693d77980e0406565beb193451aaef2c4aa70f7c9064a20e80448e5c2a0b", "41541e96bc10e62b255b0e95a2f453f0df1080ddcc52c87df881b45094884d3f", "0d8d0b7984e77039bacc115e6bde32edc4b5359a25e60728e542e1a5d6452dc6", "bb178d3b11ef07fd2e5f98d23cc67efd54af8e0da1da8fa0da8268a9d6b4b4c3", "79d107ec2d8652d94225521d2cb17196b42db89ec7b3c29d0191f532f64a5645", "bd344b56eeda1d9d5fcb344b06f83735d77817f2706caaafb9beb64ebb23fdfa", "de1e3b3ef5876f2dfb7562000adcb8729983b1f2f59c37a1a20f7259c2a9bebe", "9e9d7505ccf0b7601d7d860f49c5698606c8fd6e37df73060171554faa0cd482", "967e31a1cc78284bb025467aff92699b7be6882a882ecd5361cbf038c9b1779f", "3aa29e594eab1785cd65474a8782a77535c56bf464d4f061921f8b3424bd79ee", "c5334d5d0db78bdaf46ee1ab405290279fe4d00a3d120112bb66f5aa242643e4", "7ab6639ef9d4cdbfab7498178f243aa0173d806c135070dec560022150c7cc3d", "4ade9b1a22f2221f282461156a4dc8c96ba59db091193daffff38ba8c8aaa3ed", "367df942a8867c469ac1e262bcdf5ed2287a12c525fdb96fafd62d4d4e05bab8", "cbf4afdef0c616f2eb13ecee30e0c087482440353e212de1ca2e01498c049061", "6c45cdce62f5668fa5725204d04cd3525fb7d50f78b563eedb33c1b4ae8b5b2c", "3434da40a1d3101e3c01cd24a6f6844c262e3881cec7f9767b60ec3a8c128c74", "85e48b3d82e97f9372536710ab5c4e17dbeccc4248219506960211ed8d2421f9", "4aa3c935386631cfdba99c221e17e332b582bd28dfc358280aa34294f108c1ba", "1d2ec3c1e51e44f3075358ffeaba2b1a73f106cb30d88c54c719945d7e30902d", "5f8b7b4d25b0df569cae0dcdeee93c30d0e4c46d4ff5c3f1bf1ee46ff4d1a219", "ac82af67bd9c54a22c5f257764bfeec8f1914d342dbc536ab60e0f09e5984e32", "788706b4cd96ed5205ff94c5d9037ad5f2ae88caa3f81cbf93cdcf6687d432e3", "99a09895a9c807f0e06aa4a295c268f8df482d6e173eae27d5f8654e81906ab3", "619db963b529f29fc18bf84ea991a1bd348d0ac75d10671ca33d0bf2f139ac93", "ef2d11cb62ee326e4ce3bfc5bf4f17975b3acec2918a319435a6a0cae183bb11", "c1ba24b12cb848857be00fbc344f924dd5e22d91c65512ebec6387a48d33ac0f", "319589cd5b2f022205e7ac594c061a38cc1e381f97b0e5d6a763d1810aea73a0", "04b38ab516e15861e0bfcb75f10e747dcc16a20937abe45fee626fc8ae2e94d3", "056bb3f5a7cc8af9e508511b519d61d23b611b4a72943ad2671255349cb800d4", "a130bd8333889b56a6640a42ba0490dde8ba40bf2e269d0c381f9d739ba6ffae", "c9fccd5aec155d4bfa5c6ecb38a0321a9dc7ede7f259bbe1de444e39ffaa7d89", "d4a4e9c154ae687c7e3e5b620428e4b0920520ef7725afa29745a497cdee932f", "16aacbfb16d8656dc3fede2d84ad2185ca9c6d42276f44d7f5d525830f96a276", "a316d8ec1c24897176b499ccaaabfb0459472386556244f848efebbad0d9e54b", "b589369cd811ca96f6c4c2f4d73e74ae632b1d10d8a83d5a6322338d5aefe40c", "22e8c53b6d26da4221a641947729a51efc49fb5c6478021cf63d827bc2ae7e84", "5e4318a55c664af47fb0f78b59ede392e764bddec45101ba417443b47a6a5c5e", "8868a237917f47f9c97098abbd6d7ea4b90516008ead8b1f981e57e57862ec10", "46a0ec5a86a77e0f5ad7340c0572f86fb9312f150610f977971721dd5ba65732", "9dcdbc12a9328a75af6eb2093405b8a3902a518c2c65bbbb313f7814c1454fe3", "c610e10dd300523144ad3ebca950110ff8d209d446e13af7b37b8a6b4db2772b", "d0bbddab634b28eff0eeb4d995b6c916f663dcbe1bff91459a46d424daf979bd", "d176132e9dfd9291171f602bf3df7dfd883ba6679cefb36b7888df216ba7f733", "fb3194c825c9f48cc5516b68145d1814c8b974cab105a8ca462a3ffe4d81d2dd", "4143e3b2bce7f2c8bb521961d21d584115d107577cab460c8851e36ab1d16402", "a52a49a777d429e3882115730339d9931d916c508e39766a0a2afcf680c2a813", "a8621b93dcf0a59a310e5647697966afc807b203efd70f3412e5b1fd4510ff43", "dadc054f19b5fa34f449c59c43ee1014d630b1f8c74bd56e3c853b0fb631eca0", "23d003eb7c051a3634b0ae4681f21e318ea3017b3679161641b9325b46e20e9f", "2640b4ecf27724522bf22ef11ae65b7de3ce2f98dd54672e948a85e1bcc6566d", "9f3758e37901761cac96f68a87492dbf3168d0d8a91aeb1caec9c35a2c8a36d7", "ed251d62e7568132456cd173f5daf8c689439db1bd9d52594c5e59a26588223d", "4e2f5ea02611bf719c21c19454a010bfd38efc56d4f55c233808d3413f4f571d", "d4bb4cff1e01c7e87823a311f330ebd92cec6275dce36f336a47a85c5a395593", "9ae16344cbacfda264d57e888248361f9f45d2c476dd2dac9755604192a7cdef", "79c411e960b0a12734c5313d1f33c7c031d2a8d73a36159bf6fb29dd335a628c", "1abfca0b750a085b845f4f2dc5e930a7c8c21f702e5dc23f6f1ec2c55c05a720", "68cfc71b689add6daeda35a492139899d4d1791c8927d9489a580542174f2d34", "0d100f66ac365a023d4809cb116f39bbbbcd651023965100fd76d0e5bad89d05", "24f28cbec90adad429f5dc6454dff287efe08f30b86ba88eee18e1ac1a9ad321", "b82709e0a1140e173a6fa5748fb1d21095acb8e4a3632683e278166453239aaf", "fa611ba99bf1c0b54b562496619e20e4bbd46c81023088d8989c927a6698ace5", "acb3becc67ca27389a4fa59b9f427c2fb127b60fc3e949dff584f123da87d572", "a6b40f2cbdbd01107f6cfc360fee82e2d71350cd2c670df0e9b17c93ec3dcbfd", "42dfa5277b55eefd4b964499bd6ec5db575f7b7a3755ad3724dd609fb0db6ec4", "e5c0ad25fe755aad353fa6709f26384ff3477803129802ee11eec4552bd5437f", "91885650f4814d096e4e027403b1d56927ab78e56a2c2da4e85a76ca7223db89", "c6ba962010953432cc0aa571fac41fc8ffa5b107ea118201b2b648b9884b9727", "f3f15f9f72d3159a0ee7527362cabd695cebcbea7aa2009a64e79abfc1e6ffb4", "705195e7de075e1e310972b1e8e689cd5bf13deaef7b0936f62a0003d15a5c13", "98021a841bb0b448824ed18bc45c1fcf5d2b11e3cec43dc16317bbd8e2564085", "c1a22f073318888226c91f48bfbd71c27a003d8782677a5ef76af307f8afe203", "2cf2d47c0ef755e3a29db1ce4de9c27f6e70dfa5b16bdf2fe8bcdff2e3c7b782", "f5b281ebd232b86e3c239787f0cbac78b8b66e810ea0cd5bb5409949826e74c3", "8c5f207fd1da6d16a766ef0de0a44e95216b638d45b783558dda34670769b2a2", "1ad8ba10d86e1d8a646c38ed7df8a00873ac1b95f87d415e11ccdb550d1e3b25", "9440d060d0ce4386be1a129c4e8b9bc465a3139840b212e1949d3c18e62a3529", "fa0f54a51bc2cb17e94050d040564487b705d75182eeb2afa1f972ec5da21db4", "ab606ec4365f09f10fa669f831fbe2112dd7dec59629d291d2a20bbd0f5ddf63", "e748716f3a8d8ad243780aa2cac42d3326462b553b93faf41a7913fca71a015e", "1aa1170c1be2e39c76a8259d8ff782e78e86b13be64dd9b134dfe381f8e48b24", "656b56fbd6e0eb0168f14ad6b38bbab37194b451af03e0a082edc8178b3544c6", "ea0a380a5fbab63176cf5458d125be22154442402ff3c1280e798023f97620ab", "aaed79d6de32c9919d983d4142e2d5a2580545c2b0120115938a945ed0d7beb1", "8e5bf2878fa21d74a82fb18d3f75f880bc3b1bf76ca2e2c52095c627eb3d9f14", "fa344546a8318df5fb6d600548a63888ba6eedf3690f5848f6b7e0299fc23ea1", "b7db52903a300b76eada82b8d46545edfc804230c3e7597a04fd32fbe24bb5f7", "6873297eca4358db6a869b48e2ca3a48224c079a4f34e70a5d377f804873d688", "48cf2cebfe518b21778303ce2f87e96cc090038f2a7f74c7be420169a60f3d96", "451980376f2953f05e85abbdd8d725db0efc60759f3a57eaa71fd1a8def4728c", "40665409385ffda4a2f9b4f5467349d16c68bf7e59e442d397d3f38981dedf38", "c74c4bd0d038180b2fca0b9618a5355c8a3b7e6ab02d51c7eb6e820293e43d79", "af98f02a61a09dae6948b5459fa9d99153d8aa4ad2613cea5d62103c2605905e", "ab7ec288e245d797ad5efd3197202cd996b14220bfa81b5a9c0943a135aead8c", "49ecf9abf86c47f6de31b1ea9e3f0f5e6ecb285b3a8f7e38e78b9e20a44a1762", "a1c5cf88c769c605cefae63ddeed5e0b56bf89d996be635eaaa71d7a781625f7", "96f4fa741f8476b81b1540a5e448b6fde0f2046bc756d409ddc3e05f5b4b2167", "2660055eba07d1071f1001dac05f90e251caca8a78e803b89d38181f78b92693", "4301dc61a30a1e1efdfb58d76075731b1087093a9ffc3f4a683e81ff3f28ebae", "625ab67178c7e07bfb1c66e802ccbdce7e7c93f08bfadccbd6caf57e91830977", "e80c7392902043e9fa91929b79ffcaac87b8979bdb67269a7aa6fd93fb2c3893", "508f969cee273556eddb85e343785297b6af88592678e9bcf1f85c494691e55f", "fe43c95867906377a11036941c7959297c965781401b9610f54c539f5e623a71", "59307463c8767606e784aba5499b9fa3e4f8dc939cadbf122ea2408b4fdb9382", "6ab0e675c4e8d33dc423bb149916f962b80b681456408f2f88344a9d72cfb8f5", "ac2000bcad3c160c57a7945b6759e52085753cd31b700182d7d8f93f69ce2ec5", "0087ff509ff1d8fa637018689343e09f150120a0f2ee171e501760468053c32b", "e7cc4905bbf6e7a009d69a3cd92b6984423ba22326937cb79cb05b49538ce46b", "66ec25b36559bbc3f5aac2e167f77d9f147dd76d8dc92224d198e84c18ab5bba", "5346df237db3553cd054b7af6914fb2211f80ed55aed37d5ce1b3a6cea85d145", "3a732f065f8061481bc8d9050b1b6eaa344ebed89c882e39721dd0ba48c12dd3", "965a3d72e4495bb7f9c63e13fcead549d57575421c4030fb2eba800844c848c4", "1b9ff6515b4163172a942b3d9ec78cf4bb63d42975a3bdeca804a17b1f767f42", "5fb1d0c78b38749256691a6cda4bf92009b69d44877a0b928accca2bf49c186e", "c0d28db57b19ddf8c6028f8d406147fe61f86c8703b61810e9a6cf38bd9aabe9", "2b8726f8ffb4f4ae9bd3be762909f9ecae337e2496bc2ac7fdc83f229d7a68b7", "89ddd2cbcff2af8c357ea7984e7d0242b214f2faa86b394e5b0564e8e2695a2e", "19f9ec2c08525de9b45b22d4c32143bb6103033a72b3ecf97d647ac35b220258", "5d75dbd3906dc836df53c3a54258306116a2e3546d7f01fc9af211c29e684e3d", "ce392f2bf5c22eef0701757c00ff8e8148dc8f4a43cf515f1612dcbc2bb1a9a5", "b2bab479fc2a81f4327fff3fc15b5958533d503f351609939b508484453fbcf2", "1091d6d70f9e6c85417fdbea77864e433250bde846051a7644b11a2a51271225", "c0e1376bc90f958d48382c60ccc0d5fa29473b787aeacc46e3880254239be586", "5405ab147c6b21b704e245ff1924b15ab11a442aabc2cde04cad95b3709e7f35", "33d5f70491dc9da2fd9343361ffe842a575c784e603bcd0e8f8f9eb198eecb8c", "5f2a1799e6fc27703d81d645237059a9866c40800297b42f5d09e96330ee4e6c", "78d8917954be28590873455dc5e7abd09f5639f505a8c331653a09a5810235f8", "3c669dec4408f92e6ebf04ba679496ba4bb149bb9f4c581fee5cbe5a2a53427d", "a12c371327bcd3f1b139d956104b490e56f1f64788296b0f929723023ddf0288", "d700a074d65324a8e33b22962b47df945e05983ba0fb6d493b45abea9cd3b4f9", "d351839372bf9a35e31b70c16ce5ff9c15a9d6a64a1705228f3940efa4eccc84", "b37bc3750a999c72468172a9f2a632255aaa1abff57ed0170f13f6946622beb3", "c4491c6cda61690872ae121a98e972741361bc70d2f3aef4a4886535dfbe14fe", "3baa61b15408419c591f296cde14644da101cf24997968dd6e95b81fc583c93a", "f0edb1f5e0579eb3b7283af28b54b86ef7e99fee776affa0e45e9ad1f47c554b", "9509e8b9d88ce6649378b0a9984083bc6d8c531e6f79817459c957ee4e983daf", "f0edb1f5e0579eb3b7283af28b54b86ef7e99fee776affa0e45e9ad1f47c554b", "623bfa4f5604a109127c19da7399eaed58de0a5b50ae7f94c868c80282db7eb8", "37ff65decf1c00c362fa8e36c20b3d8768d808e38e64ba06b8f28b5126d6b685", "e5d56e9066c5f1ce847de53e3973d03ac55af6498f19bce95fac35d2ce4ffbd0", "e7b60765de50da0ddb0237b8bb3805136299319497cb7326b8d2ac01073382b7", "25e6c40dc52c614a205e5b7d00bbc74fe3d18fcd223077cec498bad0b3dd655e", "9b650b776679ab1a61280b60f8c6ce3f8d819887ef3887015f25aa7fd898858a", "ee03a38f5baf26aa70f26a9e76783b5030eb6883e21ce38bac4b8c63ddd95375", "29d9afb35e4eab31c43e01579b05e8bff9f4575de27ce842f005f27a00783eb6", "e10c0db42b6bc39f47b7bf14063a5150683fa209a449feed7dcde5c783381b78", "859399318362a0635fc5f44fd7fb8791ee78b5af135b5ef617f4766de533117b", "0a87846ebdd6e0638b52adbe948b26afe9e1f422fe6726ebdf11de352bcbe66b", "89c3f0586f46436d2d8115154d8a5c676eacce6c2dd6dbfd0a1ea8040a37676a", "a8619d3c96cd87468cf8922d81e6f9322ee90b875d5048de4e22bfcf52cbd0b2", "79077b540f42bb275c49141cb39841ada80c752bd627497c93e99f6dc3ecc304", "aa4e239d60a2d1379b1231c3aff88064f27f927889207d09c885c02797a6bc2d", "69a8b87d662d94d65e5bc33d31ad0540be9006aad6454bd27baf3c7c5e86eee1", "9b38feeca0774746302fc68f61c71e8835a29ae5f254042b0c9b6e224eff941f", "aed685be69aebb126a1539304d09915b51255af29c84764c8a13baf0317adba9", "e600d74d4c26d1bf733aa99c7d0be2ea72bda0b153c0b7d199aa1de4645428a5", "03ae6775ff361aabccff486c93afda2ef10d4d233a0757139b62d190f8a8930b", "ef9a505faf2da121f4ab7e1f9c9430f3840734237cd651a4204e675fcec179fd", "f0edb1f5e0579eb3b7283af28b54b86ef7e99fee776affa0e45e9ad1f47c554b", "1e61b6d3efe023ff6893f4fdf10f0f8b79a76bd09d33b86bbf1154821b913397", "e318dd036d7bd03b5ac05fffe399d4c659f5e10b315b12820e842921105971ac", "87b7cf0bc6b4cfc461d62f0c0391e6f2c6a1090e0dbd407901c1322241423436", "8d0c6ae6dfbbf7b0a77e2114a5c128a7ba87a410ec0006f8e16902dccd346b17", "1692f4a91f0a21aee88451e4b1f84ea63f9c5c0b8753cc58ceb7105bd7cc2d0f", "5289ea270537422f0e444392d49663faa029c9baae341f779dc8114877460363", "af7e3e0b19f5f8db8242aa2a16c2f5ebda941d923b32dbda15a17d1338f677a9", "98d188aa900dcbe48fd124f672e081757f067193391ea1c89b97664b36c037e0", "7e398f85a9a4c04fa11900553fdb47781740917f01308d6bb37f53aafdab02a5", "be8959c9afa2be276b6a2aee0cf85b616d74c9c380e737a976ee36804d8fefd6", "9dc1a531bea3664b6f1dd93acb03d9654d22d755371096136c544f56ca02cda7", "eaff455e97f32a493557d69283fb771054ff4b5f1c38d5f04cf0e7203690ae88", "2c2c970e369ed038227239421441b8ec4d6448374bcbf86d9a59dd2d24658c1f", "743301679a0a4b1056c1f7221dc642ac6cf347852c986de85641f8c74f7d16ec", "dcc709a51f2ff0d897e333618c48dada3b52a206d1e765b71f09b01ac54a40d0", "7297f7cf6873b1392ab3f90d304beb2b847156dae396a0948a59eafa1e8176c6", "156c9ae5e207f533692325ce3600573966628af928a59374ccd31f72b696350f", "27b4d8f616ce55bf9db205fd4c864f1aaa51e116730e68865709d4b7ae5b77da", "9ddda2cde53696cf87b04c29f08388d355cf35854493c3a677100b3d6369c6e0", "5409b2e271df1889ef028dc8ee09428e708622fc0df31c06c0bae3f27ebf0163", "505bf4e679ff3a93904bb5f1b6773fcdc3561db0383c65e680ce1e553cb0f52c", "ed534ad1bb118050f4fa61c095412fc6946de8947f26614d6b96621c20e1725c", "17e5104209ca0520f77b3a566fdcfc974c2f8cd4dfbba008c43edeceefeff847", "58c648d380bd4370080928d3854ba951b5e1ff8aec71770b94473d6199ce0519", "f5465a79fcc1f182a242c8af071eaab42a8090432821309d40379b99fbc2bbe4", "3858daa29d4ede25adf6d04213a5e05d62b80fd309a4fd02f45cae162b4f8d59", "b6e84bc66dcfbb1eaec4649df2310716e772d1d1c006c3085d34b7c0c4e7a3cd", "2330a824b4d82307da4ce5300397650cd1bef0b838a68d94e6a375ef09aa5d29", "3f0e632afeeb12bf047d85b85f7e1165a6e71b3803fb9b3081fd33e9aefdc5ae", "0146b302fc5c8130a50f6ed0a07e242dc352164955896abdcbc2c82a108dd5e9", "54f0bcea6fb91ab6390858f73506e18c02c7317955ba36da79ed34b5caad6fc8", "9199e07145f960a522452b99bc20e9839fb612722e20e1d9d16b4002327b9a7e", "b152c8c696c479f0d6fad70e27a7f768a08f5a16b65d637b2bc697def3bea16a", "152eefccd51d9df37333534348fc421ca295ccd25cb73ad019b0f0f77fd9f377", "14fcf7d0addad275326be45d4dcafbe6eb8e0e876dc2f93c197e6e0299794daa", "d1f38689da97f6c3fb1558f73d4f332a9f506546df62f8fb7f5207b5fc19f4f8", "f1ac8b0e7ad427cb113f192a8b31e2625953167735deac04d678f8e7ae2fc458", "e9b75c4ea394756b2980be05c02277e29afbb876110c12920f37f49ff1c60b85", "f662f2620b9552892bef08137fcf47e5a9ee6b703de4f0fd1f280ac8cf880cc4", "05a3e5107461385223a4db7dcd0542c8806436af1bbee130b6d6227b87d02307", "46da229dc9236a79f430777eb88dac30db0e7e2a328ef55e1c5ca773645d4bea", "8ef5a3c2ebd26d56820d8574a9232105f074470ef7787b72c7801122b68ee301", "1f730d521f1ecce48267f9f6d76b54a69a89ce9a346da424739253e5aba730ff", "00bf201cb04a8065a923f827eaaf0126563c4c43f23f71252efe2fd678505e10", "ff3dc195528698536d9649df206c71ec7a54f866f2bad1534f92c834a60fed06", "bb479458e6f6ec85d016ab3928c56b3c33ead170dd417dd1d2784348958a9127", "ed5380443cb4915dcda46b28d4fd5054b883f169dfbed822e86a852e299aa9d8", "4fde0b2dc70cadabb5820a9834296e97e1f0c234d1eb18d9ebdda0d93f7d1b79", "f97f4a9f89be20c57b3d10dfd0e544e9065064aa0f83c52bf72a11746eaacc4e", "894d66c80e32068fb70fae42c11d82b6b559b932e5d01055178a570e3b538534", "8ebd6dcae9faad51bc4ec0f414e792db71106d261f6921879b6bf23ec008654d", "0b8f68cba00015b757e09bae96cf15e9dacc10dcd73f0ba14e23fe3c416f5001", "0803557c039546565b0184d2c095048c3051f65dbe6d9e200f5f023575dad540", "cc6aa0f17356879c7f903a547d5e953af4c97f143fd47cbecb7d4c4746b6a3aa", "50f7c00f2380a06663585e893f838250eaf3d1804dd1a8cb658cb978f9091a34", "f7c8eaa730949cdbb745c2a92fb8e945e6dc6a4d73b26f2dea3b737cca47a29d", "fdd5556672b20f1a9e89e9deab9c52ac81dd46d9f9ba3aade7246d8dbb3fe294", "893508a5479258605c21309b4d5e94570e5510918b33a943b71de679cd719c01", "0b12326a960e044ccf8feda4017e343513d55574ece5ebbfd1a9f5d75e244e89", "678bea97e3908cf54f6c7ff2cc9d3769f5c30fcc879986f900fe38f8442bc366", "3f45b70e3d53b4da1429bca0440a6dafee83687036d76492e564b8daddc0d87f", "d42481c5199de6c4fee38779ab02298a47425b297de6e41f5fcde5543dc54aae", "db46db861366567bd82f1a096ee0a4e5249648acaf943095bc7a9c0dd2e7b559", "6430da425c965b49fe662e10bbfc8af1e5a2ea2ee1f370e5c9fa456e7051e0b6", "a631590a70b3d52c015bfcac41250fc1011dceefbbfa5215ff035346bb230651", "8f95aa2c713c39dc0ea09ac4b305bbc5675a09eec335f4b21fe7241db2f38658", "cf63581494ba0d60799d607015a09ab889f04721efac7afa737fbeb8a760a073", "cd19dfb08a81a89557dd983908e7b9d2d2faaa71217a9108b2b38316a62c6e29", "c506d574fa7a2ecd2c6986a303363efdf1333d40ab58aade47ebf1c14b5968f6", "98e7ab5230dee5e072f7cf364da033cc45c4fb0a2daf628cd591c5c06a743f01", "70e4ce48e8caa80fb9a68e0ecddfcb4408100e6b2d91f0dc38a658fe5e1488ad", "84a6e2ed6a619a8ca520e3655a52dfbfca2694b966681a2818fbbafead124e17", "d159949c1392f8d242a5b3b1d5640423b01ee81977b964fe60b60e69c679edcb", "29cc1b2b92523320c89500fba6822dbb31f873c04bcb4d30f9723c745156501b", "9861ad4c3b591eb6eb56a4fdd27bdc9c6e0152affd4fdb6985fc0de6aed2ef8f", "da137184103fc61f4dbceaeb1d2429151e462af21bc87a43fa64bbfe284775ab", "5e4d3cab371f41dc329d33293a414b519f923dd78899c1d78d08013368a9eaf6", "ac920eb8a8018e709dcd05be0888b10efeedd03dcfa6a2ff339bbf7fe47bdabf", "b9c15428fca6dc8fe00861cdbd541f056d832b1e11e3a127a468ac78f8de585c", "fb0c4a691c0e5ccdbb862b82908b9c96c75175db140bbf3094680b6b174a5592", "efa4f68ba22ef8a12100f59638b56284228fb403d2cf308ce7581bb14aada1a7", "8ba6dd14f31a7ec30babd47812f2b44a8c4398b7e6ea36c4c5837a26b33a865c", "33ea2d642cf96f5a482c158d90bdd4d9a6103ebeeb794c68c9d9d7c1d931fa96", "332cff37f5909cb504492da8c2c8cf48b90088ebccb505d098e8b3471f1a687e", "779c15e60bb7da19487e05a4e35218fe81684f18311e51d125fff8bfc33efc2a", "607b71b4895444d287b1606edf447ec6ce8c36d36f521f6d022e8fe903147c8d", "bd8df793a59afda5f1b55e6e88d01a4074aa2a23779b69ddbaf26362340367a6", "efa4f68ba22ef8a12100f59638b56284228fb403d2cf308ce7581bb14aada1a", "287f23a632161b4d9fca3d67ed582b8b33b6fab746d27ab9e17ca2acc6819672", "bee47d1507584587bc3ae8edbf8321e99be6fae2e48774f3b977b936bb7415bb", "70639b1e0989c8e7ef24c07ef63c207d376d631cd3692a4238d28ef561907f05", "e39bd7d089f87efbfc66a93dfb1de074513350d0c6e83b0805a12297b6fa94f8", "f3705cbc341cf443dbe3425a2723e98b7a430f15b31f3db4ed517bd87f568211", "9886be0266b65c014ffe457107bfc6a2c4536c0db70eba1616a758f3a7ac57f2", "06efd0b35bfabfc5942b5e8c2ba1614d19f48898ac5d795923af141c78e9322e", "50b203e8eed99a43198bf49830534be2862e7cae5ae5925ff74510a672b21f99", "ae39bc89ebf5f73e9b5c2fd17c64cf3003a5c2b558a7856af2c606be25a2c86a", "7c09240152bdff788ad6a25beefa2d15c0712c5e11e8b6040a3dff6f9d24b107", "5e22ec4a60a3a19a38b15cac45b3d94dac5535c621567b061a3aa92c599f750c", "22e260152f00a77579c9ec264105c264633918a011f0e12fb48dc89558b580b2", "25a7f18664ae77d680ab742312f8c5d0cf44ecc6f044e3a80287707217986b76", "6fe9d6bab77e43b3a5c4bb10da5b6d59b848622dbc8ea04b803dffaf728ef85b", "08500b0dda72fca051e7a06feb153478ae896a6a37d932da1f6441f034ce930b", "2fb535799af21029dac61a93e8664e3a6c1f3db7f59b12f6cd5dd49ea81471ee", "4151017b044d15bc8c39d0b765f8fbccb804e1c6887cb8a4f88a5ce17b35c369", "a3c7dc003200f6c0c62a5ef35454d00c007c6ccdd14f1897040b1b79776befaa", "491382d2a6d0b804c0b57db1ffc5dd77ee7cc557ec53c362305d124b7db1ee33", "c17e0470854d82699efea224d421089b6b4e492a7208e5098f87bc56b4b46b45", "4b79f0336c4387b0446778d26ac199cf7ce9b68cfd8be6ea581a18b8ecc5cc65", "2d6c767875c5adec6d949b5ba235f16391b383bfd8607e7caffb3a686c47631b", "a51a5c990893bc94483b69444c5678ec708caae7495d38e4c87a579322a0ad32", "5dbb42433cf32084b458ddd16c8b8c430320e955ae4bf7bf2592e6cc9db921fa", "537db809fae3e0439b97cf7ccb52d53fb1a28a00d15d209d305262e145f11275", "1d02db04370793f25a8872f3033a93a6167e7f7ec09eb0242501fd6f87c2bc9f", "c08e61a8fe307c353e54663d477ee0eff4de4c92aa69320fe79e6172df27d3a7", "a22ca66fa4f0857ac400184b0b8cb8ea4a98d4fd9557cec7c0e4610bcb6ffef8", "053143a1fcec34e1725739ac12db7da127e29c06a3f7f87564df9e1379210634", "80445b0ec6cb74f3d30a39c4fa8d2c52b1be958f9332c718e7cd45277c8fdbc6", "0ae6ade4e4a9a8a87fb2536a6949e85c075c28467accc8ccf9012369c5e13c62", "142078798d34a0b2de42c40da73aa41b615cdb7205ef05a9d6e3b0c75f61ee27", "b47793d2690e79a33949b7e319d4badbbeed32e51a0580c62ea0f2f24710c7ec", "f3fbadd567a15eba048105519c4a6937918301000371556ba70d9f0fa3c52eaf", "8f73767fdfbe283cd6f118dcb99b325898becd2f2cca9cd002bcd60a8ef3b029", "f2ede6b7b24b6194c3c15ec1c9e6d599275fd4250acf67316440ee62f7197cdb", "e66ac4cb218d51b8ae685f644a7b52fa5e13545b05e7bdeee96824544cc669d1", "318eebef4e234cac8b314330f9b7f91123e69c484c773caad79ac17985661bd1", "91b3cb2d387c1160a51f383416a35cb95f0abaa64b7e1853bf1b4689d5d40240", "343534467e083abc938f79f2d9963a4dce87ff50414dd997f846e882c24af2a6", "d677a4bdf7693950d95e51ca2d6e761ff03de3f7844f3ac28f5097871bcdf787", "830826afe55c8bc96fcf3bd15d9a432a1e336361d75587775fef9abd5faf567b", "8f73767fdfbe283cd6f118dcb99b325898becd2f2cca9cd002bcd60a8ef3b029", "2850532ccb6119c3bbcd3b72dbe5cb699b16492a8bd5c5e42e1779cf7f75f338", "5cb077a105195d565534a687a644b68c09b4e1e04e821f128385bba4abbe7524", "0d17b0239db6f6fb5526de2b835644f9b82a809e2549a48d866db431e6eee399", "5957f588528f6984807d176ee9241e5d8f6038653145668ce589d97692346fb3", "c0f2dafc66a6436db329706e30643d8d024c4a5ef23aa8fbde7ea09654599d44", "1570fe8bbbec601fbe2870ac14ab60d67775b09457ddbaf3c98db016b4e33dfb", "1d361faf504ceaf7694f9dc4ce155973528df0ca3f2d55833b5aafaac90c2f20", "a3ffb5e7b71880689d98fa1f1189e6902e3fa03a33e679a3999db5e478f4f82b", "10dad237b0dde3181b92dff177aff3cd71f8a1b5ef3272b57ec3f8701bf8f7c0", "e3d05832dadd6021b2035b7d7956342f12322c6013f620535aa6712aa683ebf5", "7151bf87d3327c3929cd8d688f039764e1f813c0c4ffab9291a660399dedf08b", "f30ff59c77d73866819f4ceb0fe2fbc8cd361d682e9bde15de7287e94ecb23f6", "6fda83d7be857db407c1d949504f6e90fd13622c6be423a865e9861ec31ee694", "6f90f67245de57480397b04d8f70163a165cb0163c2923d500996db5c7eccef6", "77bd3ecbebc51dd304cec2891689c9ed18d778b437e9a5ea4ca29038e0bb2b55", "611e005d9b8bbf6b284c375b9d1e6d18f663ef2721490b748f5fa1db075a7385", "03ee0fbfbbed396766aab6ec8206fbb4a9531022b66993b122e21909e12131ac", "f75c5dc10cc936f1e168790cd8cafe6d4c2740579f848b878933cbc4eda52f77", "a05dad620f52c9b23b2229a1daf4e1fe4171f354ac0bc3c302c6371f4abf581c", "fe9f5c5b958f23297164b7035b0b1082edf992c979b74f6bf459f23974be9d2a", "f300b503ef2b209f35b5dc4b3ebb17e072baa6755809a70d785d6e90202f60ac", "c2b43b6fff93af753173d9f8b0ff5c3570e27b9db62f6ee0817e5b30bc7bf194", "18756d331be9d2ea3f9d0ec718a2fb36d52d939eeb6cac3410c6b9c7de12816b", "17a78f51abe4f920ed03a0da0a938d78f7f3c829525f774be4664caeb03da92e", "806ab4acb6010b20681b0adc03c6f83666fc4c32ba12d04bbabc23fb100284c9", "45290eff727a1a617b248e1c3f5263526d4ff71b706797c4432c0f365dcdade8", "f1858007e8dfa655845b15e49db44d8c7fe17947366de7a55da037b13f5da986", "00fbd47af43e2ca276c11dc4e8dc17b887e41879ca02f9d759aee0172732f868", "9b300f0ed2949195848eb7d03af37e76b4570ca2af6d52e7044b77eab1a776eb", "6ebd034cc17dfa01efa303f1cfe7098ad7a01b7a0d7fb8218575dd715fbf8ad8", "c116cdbaccaecb561f5d29cec4582d834a0d25e7d61843c94a2d21d619b9c39d", "8f1679b9ca7e25415a4fa17af1f15bef2c382533824ed6bd9aa1747bf83d1797", "2348c851525f70de42a142613806a3d7d911bae89e13ba181fa8f8d37f3c52d1", "6ed8706206ec5bcbac42389d02faab3baa993eaa78f5d2e95de0d63065c6b74b", "61dd709501df7a9009b23e425acdcb675e9fd543e866a68b6b82e790dddac0df", "1fbd3eab050d2213a514f1fcaafb693370ec2a12b866080d4cab1a85658f3d62", "95b13e21534ff0b95428ec6bbed3c2775dff27d185f3bd3d3de6311a771f6f6e", "e07cc7b1f1b654c885609c30431616854ec9547816b310c3e03518bdfd8b09a9", "a059f18c760b05fc449d496af022ff5a4c9c07d5f492b24635f27ef8cbf85317", "c28e7e83434dacb4879c07870f043a7d3e8d368231b6bd92fe5531ef3b74d4e1", "2b85e4f35f2dd1bbb67118361c9176772ff2987a2cee3ec44978dea8302e9973", "9e20f6f8a39d1cac87d90ac5bdc88d047f938c1932b7714f491cca239166cdc5", "a4428a2104f175485047f3d1322b5c10a9ab1b94fade805a3fa77d8a3dd0e62c", "5dac7bb678a9f78ec3d40d64d17f6b2f5a2b13e2832642a041de7c08e4054aac", "a45913eadac97c8682499290de3e16722f40e39b2b5967f72d6a218888002ebc", "2a90fe4d2939f2b561b3eccf63d7e82e4e74e7a43cb0bd543becfc4cf6e7d8b6", "e286129b28521ffaddb87150d779274be3e43140f52d8d9dcee671b2f1ba1c75", "2281c632f145d8bad7d431ee7689d39399ad7ce5dd62077037decffb5b1030e8", "b22f51abcade742a565bb1bbefe80c28265b04889bb3858e1ee1828057902542", "cdca421d24e37200657b0f33796531b230f1d3891fce38b918e930ec7c339cda", "8f22768bc10635a8c4a6ac5a0cd87eb832a0a2a99ced69517e196effa730da28", "0556256b93c26f79550fd44a1317bca93ba6fbe29cd186c58ccac1a2395d8e28", "68127537f188208cf587078303b7a6cc871edbc3980406686dfaca637749a243", "689f2e8579263906b58f88f1c0a9d76a29d0329776feda310baadfb6cde1b78d", "1fdfa931d0cb8778f80a0f32c12e1e0a560484fabed615ea849b66ee242aab2d", "812baaf1dbc8e42835e67c1a62421e536d0b5c55972ad87184afc050c52522ae", "c2a09b58177f7bfd374babc0522e3f749020d94dd07b1450dd9950375620d908", "bade7bb1294bb8c3d9ba5ae25a21feed2096193153507ddb6e47d5b9c3f113d1", "2657346c59374e53cc005fcde6006b30a868da6ee7ee1caf704de906c693aa7c", "2fafcc882b8f2f99b39ddd7bf5b76c2a2b2beb73b083b369bc88128c051f2805", "30a68ec61fa542b6b5f76994632cb16f7076860e94e28ff99d0b296c9938df4b", "948957d2757e7103942156e622c0becbf79c46344cd484d42c8882846c2d133e", "0454f840c88cdc9df1c25b793ab9e6eac9a896e667ffd15ba377c444d08d2dc7", "0eda49892756c8c0b854e4faecd5994d614997b4e6142d6bf93adfc1d9ff1d89", "1428a0c323fc8564f6ec97f4c9904cf59964053f13c665dacab5f6a041eb62da", "a2656ff27134addc5384450072e4d0aa87b894c1b6e3c945fe6cadce5336cab2", "5c9168d51b35bb9a70cd218eb88256bd46a862ec88feeadb8d220c21352fb182", "4067e067115151f72135449d0e7c1895cfc4b4fae00ed318bc2cc486f7cd9089", "17ae92f938fb9859a93b1e927ca77d5b098f9b47ebc3cd4a9c5c578613ddaaa3", "b8fdc57aa9e1039337ec94a933d8bc71fac15ac019465ef9f8aa46507c148e8e", "142793089bd3078fba1656c5590cdbb0afba87b89ca7accc727f50eb7979bc78", "221abe9548ef8ed47714c474341d77d2b451edb6a1889a4a2b842b08c2d789dc", "b00862e780759282594eb55c763a4b60b16384a47c3e940241ba541be36d3daf", "b29911948d3b86f56ebd8b30bcfb00b62d4739dbb10e76e34643766598512af2", "39dbea119f9ee25455c84737767b7a57ff0168218dc71a047e1d044a8a8c2f80", "a008f7103369898ff4b548464a253a51330f91fdeeaa8968c52485315b592ffc", "3fed6beeb1ee94a96fb71c9e05a031c8ddf23e4ad93fc380d571c97dafbf52c7", "4f81c0b36f8e364bc9bc9dd783868de71c44bd52ad09ee959e0a0180b47427f5", "6f415568366f48700fbf751e08b7df5ac879258d46f564f07851effa9fa5c7f8", "de0f424f26a7b22488a2c9c34181fe19a2be68581943c4ccde63007a5310ede9", "c6fce481c64d867444d3aed4d6f673829ae4773eb243f9d0f2accf14b5bab4ca", "b6fc53789b8f7af3fe99e59a89ff5f2c4c0b0406574262b58e525cd3593c7f3d", "ec0c81648c9fa2e4e8147a6883389e0fd90050dca36fe2b8ea4ffc302b08599a", "0c37b8ff091cd70351632688b9767bd9eb5ec5ed245435284ae1f5402a352425", "04add1af7095e9ebcd2e14b86a861b599dc454ec8b1429398ab262bf8b645413", "ff5dd474a915e4a712d9ae29f62d26fba9bbfaeb1e5da0c157df9058f520389c", "ebb13ef62ce7f3a9819ba2af6eeb21debbdff65a7c737dc7661c4030dcf8d353", "8c42dbca5971533d3042d381de020bf0fe70afca356e269a44e687dadf663410", "f0e3ce93732b9e5035b612571a364b5997f6efc58a16641b8fcb9e228481d01a", "a9a253af1b440fa351b36260f2b49db6243828a3881769c24a45ee28866b4cb0", "5c1677e438852f113610a1e21f41919247bfe7d72799bc9ee77225b924e1d99e", "be9ae748d315c03cef75e46e0ba4c6bbeb52f791d1a27ea574bc4eadb5f3e703", "f235a205589aa03f6ef41740a985fa0e6e38fafbec767c554b1713914dd0ddac", "cae1dbe5269a64f585a90b0c47d9c51ed310ab4029c3054b08bc622745aa8df9", "887307e51d490e1fb4818aa5d9c080c73e9836817aef5fe0c1e3d01cc1e4e2c5", "ba4b478bd2ff3128c2fac76c7bf9a744231f32a9f84dfa9d54ce515d10714663", "941aeba6bee5559242b2acd8984d7a3894b7967afa5c0253e816e6ab8621338d", "1c92b5a69699f2a9886bda6c44d144a6568149934d33ecae528b15afaaf78d4e", "1fa0d44e7371de455ae93896f58023601dc78a919d90a44a0340c0c851cc26c8", "01094fd7b2640ce686e3c2f6cb9cc5b4efb029a5b5aff188257c65d55ca35f52", "d4210b5dcad9a6c2c6f0dbb8a246a951ad49d2e11fb7d674af0e8e8b2d971d15", "a6eb6dd2ed322e21a371c0864d9746d14c14426473afb02a295e695edbbadc63", "fb2a5bb5a1eb7fcd3d83a0273b66aa05f0428b033c644ba9ca09e66adad8b203", "d65e12fe9f41a28192db5340eb36970f7c3adadbe71992dcb1a729a4d0462dff", "85e48b3d82e97f9372536710ab5c4e17dbeccc4248219506960211ed8d2421f9", "3434da40a1d3101e3c01cd24a6f6844c262e3881cec7f9767b60ec3a8c128c74", "27b1c176d9e22f40d70de90ebc53eda0f612ea21e81f067140f7a4f7ed41b4a5", "659020341e2c25efb985d469760833fa936d36baa886958bbe85ed296e6d1961", "eac8ead1c6e528e35ba2d2858df02f701f2904f99706538075f6deee3e26d2f9", "eacf2bede6656fdf6a335e9d73dd3dc594a9018341c3b2a086dfbb581a6501ea", "3f514c3b0196af722db799d3c9f2bb6c4b21802fa1099520ab0d745c77bd3c8b", "8781f4ce0b1e2ffc84131147652adbea59e7c0e8226a29d0d4fef4405a71df91", "a353bae657b3fa67451466e50fc1da410ffe98da3129dfcb024afa83ea00230a", "ce7e3b09909f8e02e05e50c1fce6bd5a052ce1e0a46c76080899e6d3d0f6096f", "c17e0470854d82699efea224d421089b6b4e492a7208e5098f87bc56b4b46b45", "491382d2a6d0b804c0b57db1ffc5dd77ee7cc557ec53c362305d124b7db1ee33", "5da242c814dc864175af6418d6bc80e144169432566db1425e3753e8289d1e45", "4151017b044d15bc8c39d0b765f8fbccb804e1c6887cb8a4f88a5ce17b35c369", "64be6aacb65c5aaff9b309105c629b1afb43d827e70776370c3deeaa846ccb22", "554128884ec4834c2c6a2afe9b56207c31fe4590c49e2d2a6dfe839af4da9ebb", "fb7a08db1e6cefaec2f7a702bdb9b46efa4d01d28d7acacb963f11e4f1e48457", "ea315c97bdc01946c673bc9d4edb2a89f566cda268777a8922cf987185361df1", "e4f400fd763561e110d5d426e0f55f7c047c72ea3fa0c1d3d259d1422dc64213", "f42e71332cb07ae2b2f3b69631f184b61c66767120c8de4f6c210a904e363db1", "23a56ceeace2888da9939fc93f26ca450f159c892ce31c96b2da0b144f4cce76", "15a895cefa7a9dd3a3e4dce0adbc090e60dc5d6852a66b914923567a59ad2d04", "a529fe81a422bdace502754c5706a574e6b15b27f38ee58ef63b5198f3e2e8db", "d80dc20f1e859bad063011bd1f99b0f693f2d311b3018fe1663059ea8eecdb93", "dd794426e328c3ba5ad20f6f788e0c09bcb699d6ac394bd3ee461418df72ca93", "f7d2d8da8900ffc4f64c1ec65d38d3256b45f417df341b37d5a3bfeaa1bd017c", "b147268cf2ef0701e82d7c82709557fb383a66d758d010d3f8d2e3757a8c8727", "22bccaf95396a9a92a5000c2c6bd1f97a5c3491a5d9e855df0837871fffb19d9", "21364555eef48e17def602cce677fd78d02b3a3a8684adaf464a706a6d105f58", "8285edbcc985f7270156756f512617dc7107f13bb8cb3a80149024b432b36dff", "37b879607bdf1b778df21ac633b3ff4a32f71009e9b377f7cf26868f1310cbc4", "1e9156f3a3b42b53aaaf3adf9993184d06586e43b1f60ff027ddc62fb00e85cf", "5f549c764a9f1ac6d7694b8d3faafe6a2357f715408569a05e3f911c07929cf6", "9587d3aac61bcc4892f0a8ff1986fa51ce4b75e1ac15e134c7e4a801c9ac19c3", "1a2af7455e9f235929627f5fb4c50b5f2831ccabb0201070fbc8dc59469f69dd", "4de7f214dfaf835995441b3603c9db14c872e278edc1c02ffe7a16a92affb6a4", "1efef7e3e4de5dbfc9d920156531bee3752e792421dc185b95d6133ea6960573", "f98132c37361b27cf744153b830cb4b97bba2414f8922ff995a30d48f86083ae", "1b0c16c40e31cb5412f447498c7f3779e700ec8fd3fe3220f88e55e0f1b7b048", "fc4a262d5c6285a14f647320b57f548316760b88090a06b8753825a36a8503ca", "9b3fc7295ecace4689b1f963cb93405ecd6070a18443eca78886240a7a8a5ab3", "7c08940028eb4f51a6979477697fe366ab6e147b689d8c06ec11ccafab8ba64a", "32fc8cfad5aedbdd8a80c2ffe44024521640a849f343d1ab334ff8b5fc3a5082", "25824447165321d0f4741374350b7eb36d44fcea166a615d041673f32c429431", "edb093e119c4350ad9356a10b2ec2f9476b346d1aafe6ab719edb3ad4d55516e", "c87f8305c3d4194db91b46720d155064b78cefc4b930dc0a3065c7876d5bcbdb", "9c649135a82008463e061d4e1e961058f8a77d9107f0d89ce650d9ab18163610", "968aa1e142951436a6c65340abd240406fc42d198bf0865f593b32de80a0bb81", "8c6dc8eb711d008792fa9775b04fde3bda2a2dfc00f84e4662466d8f0238cf97", "6511eeafe78b896363a395ecd41bee2fffa9ef893bfac940d91731f4b1dbf7b8", "c4160b16b1a769a0f70ef45033cc2cf6339a795cae0d8848fdb68364bc3dbcd9", "d68dad3b3223a1e0b031235745c74e34cd70f5ee51a5b78d375961664315637f", "0692f8b7e2c5bd540f57c2d748fa77ae48d4d290e527789bcf60dd2954b0034b", "72eeeb4bff833504fc52d6332108c197a4e58bebfbcc4b4997fe0cad6820fd12", "70a956cd9d42d358e5303e4ecd509f91545fd4216edfaef576711d2416578964", "f74bf50e20a7f04b07ef466fef477cd3b242b2d80ba45c4c430f4fa34c9e8c2b", "69bf129351e12b7c49c65107ce6b46ce96b9e1d8074cd1195759b153bd91a415", "500c63603c93eb52c31c14b9db1cac6beed7563a1b879836beff45e13514b241", "8e40ac14dace2e1bfdac52b5fafac01ac80c0ca2a55adc1cd3db106455241c33", "63d710cbca3e989f6617ec08efc2a28c6666f73595068d0ea9eb6c7f7f69ab08", "5b7af8083910e4b529ef43d41787e1f5ce91e02fe711a822f9881e0dcda4ded2", "6456f64a40a4db7403ec98ec22677c4928dfb38ea8814cab5f7847c2e164a13d", "64720ce4c0ca92efe7d1324f87afb13a8f5d6fbabbe69f32096f80456096b396", "6abc4301165870f8d7af62800863b9d88c5d40c3ab8184a17f738d42047a4215", "f64aec2e5cc1f0b0e44b66916540252fea6e874b35c603a736d31089df9a6b68", "7f8ae6e9ea415a61c5dc645863a95a13f1a6c1b494f48f10133003e06dd8dc72", "410621ff13667bb8ffeacb2861c3a1f6e201d07e2826e262e3bc560ada042b71", "3791437141860bd62b473d652b4d4f7aa897fb984afbed459819b0aef1b92c13", "f24f85f59921e95ef6a99f6c335a3af53ddc82d09cf0dd43c41b3678d342183f", "b6a4ab7ecc68a7c62c3be7d13f093fa7b8ec9bed72bdbadf6e2d2f524d7f073c", "de433b8febdb3aabcc19b17b4fa718289a06fe12dfa6dadbcf51de648cd37a50", "953a000e0913cb0258d801b7f5b84bbb0b882930e7588d39132600d17bd182a2", "3cceaf937e1a0f49e0e8478286629ba4bc1c559b424c9f9f96064753a42909a6", "7d5f2fb5c2769591692acabf05b91713c073e86583d6d1ff49198cbcae71c499", "5b578d2eeb145ca015c92d523cb687c98b4fab81b09f950057131a6054d7c2a1", "1f31635e1ee0baf71baa9dadd34d37149cd80e4e093b2591cb38205c3469f29e", "eb5be4ed3f7b0ddf7149d5f50bc00f879ff4aedfa1bc02b62a2e6b1babca9ceb", "f285260ce78b20479f16d306037f3bd69a00c480a604f1927ca12aabb9dba0a7", "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4", "d0606fb66b634403738ff9df97a09769e63884ad8cf1075b910db723258923e9", "4a1a9099e2e07216fe1c65f4dad31bd49643059719140e85194fbb1716fe0a6b", "f59bbf6ca92a516a75f437b83061c942a9a201c0781b26014f1e67e871e54516", "ce0d31be02ea5476969ed3bd9daf48478796d6dd9b6b966b117813ced67b8b2f", "d1dd500aa8ec23986564a1a8f83affd3f2aef2e86c8dee9dcffc0d934d0f6505", "a48e1fa2be071b70970c2e3239988a278227a3e9e08e33aa80185eab83ebb7f2", "39c013d5cf94d68e5dd6a8487f27eaa232cb84145338734ab45f4390c8085ff8", "2c2c970e369ed038227239421441b8ec4d6448374bcbf86d9a59dd2d24658c1f", "3273b9405f1863476ea08fafb96f0d5e63069fc230cb3b8aa8b837f57fdbcdab", "bd93c0ce23afebaad7a2491aa341bff51b748349b1310c63d796e8c46fe234d7", "c1a22f073318888226c91f48bfbd71c27a003d8782677a5ef76af307f8afe203", "e4c60fc4fa7277bfe83af6628efb090db5869e211e530157c904e44835cc6a4f", "f2f0662c1686728f39d756faae6007f33bf51a01682603081a9795faac7d70ff", "841483c1a9d42945afd448af9cb25f69747a8aa0536545568bd6bd8421fdbc11", "044ab9fc85effa654dc0b2ff6d7b1ab832c28f7234089333709d5717531e5f0f", "eac96c277ea31551982f1d72074a52c541cfe52a05b6fafc5669afa0a0083a6a", "7f041cfaa7635fc6bf5dbd6a4e1620befc82eaa1f37376d5fec55ac091953d98", "6425a8e252e81900cb95407fa897962267fcb27dec0e943dbce25f3a22c8da82", "e1bf9338366e1ed29fa1bc3b56e50f3bd43e410b48c9e29164e4919bf18400ef", "4689bccbbbe574c330b3d708036b6b651d0f260c082e604272f635b679f8144b", "979af53a5fc400f654d6b3586c7eb0f4a7df9b165b3a4000de406a0d497f196e", "ba6a9c69038f233eb3449108892862668cd7bbd1e52ccaead86df6e5a63a8275", "29faf04e6151309935fccd7779bc9e5a69dfe0abf7c879cb232f0ec7c95c92f5", "9e2b4494fdbb26c8034112b371b3e9b6de212128351cdce03ebee0ce14ad1b3d", "b0890441c183b0e9fd9b33b5b8b980934e940ca0082f43c2f33c404f3f1bce12", "4115a410d446726356089cbc90bc43690910a276a6262a115c9650c76f15569d", "3b5eb1d3b7cf61d6f33c399aeb78e1554440195636da99baa565a0bfe2c64c95", "9aa6c7ea206d8afb7e0a0508359b90e99cf7d31de5f79ddfd93220f128c1d36a", "0467540614e2e8eb9a037f131c2b8fc992c6cc7d118910bf5519177cbc7b8293", "410a1b24440d500544aa7425ae5274a00d81493f98d0a5fa1df1f07941eb6bc9", "7fd18b12bef729b380eac608cc21dbd73358e7e9b51149323ee6af1b5f7761fa", "3cfd2d6a77d325456b2d3d121f58df47e556e39f5e15c3da347dc5fd820fed44", "9c23e0d4eabe596abb6f6aa4a42b32b8a52aeea22e167611d83a4df6183f300a", "d65b6a8de8f7261307a7a0e90d3ee3e253d84a7bdf59a27ae92314dc32b14a46", "6e87ba787771a4ba2f21bed54f42e51969a87a593ff0f087aaa54e06e3511be4", "d45705e3c4dde51265a966f3a36fcb6ea95dc81e7639aee8d6423e4e0e00a8a4", "df38b0f0c7808078f2cd0429c6afb677b5c9f4a87041447bba76802edc73239e", "9a7816cc98b78e0fb4e51fb168327c02020bc7a61fca95bc945d083cf4b232a0", "be1fbb6e94b9edc9b890a488f76ea6212def715685fe6664cefa741f3d47bf4e", "7c0aae96817d1f8d48494e18902c0c4fa0d9a481ee97070d6d632bcf8bde32ce", "9d89bb7d9d99d38f35b15615e3980a13b92ce52caff47a84f739b4489cd35d4c", "8581bcc110998edcc1af02639ba52299a17f06cd53f557e822a37b9319dadc3a", "3a4fe031eb25b7b7778f88f19a4a246b5f1537dcf8ff213dad00c5b06b4c95ab", "e2295e21aa13467ee2fd2f64a5b695d5c7049fa16298130e2e36e3f5d40232f7", "dad80bcdde8fbc43c29d9feaa00eef3c9d8e1d263267ddd7849fb6786d22178d", "b38eb453a4939f0504229ae1eaa292d9db5f73c62c5eeed244815f7ff409f902", "c86032744ef68f848536d6ae0283d98c280f0cd8d26b959fba439d4c41ecb056", "5f125e3afffdcc6c43f674d3ebe565c7991c55e5c6207a6ab4a8993ba099afcc", "b3bc11f03e32fbb88ec4f47b112891005244d620f8dac2ec167128b53fb2d10c", "1a9c3a1618d2c92710d4a1ef1574dc5d70b12cf714205dbf696aba916d1138c3", "1436c55d97b2982de597f249d93e071164572e9aac9e6133b53729d4c66d1f92", "fe2a03d69e54cbdfc31b10069d0fe54d40d7bc800df6a423987e40c8426c8cfc", "48ea72e5fece648cd786b746bf6f714278a2c45ed4bb6f4b918a0898c0a58e06", "0ea9980cae3ada6d0d8807ae0f37f63beb90a13006d1a1dee3dad985961bda03", "fe2a03d69e54cbdfc31b10069d0fe54d40d7bc800df6a423987e40c8426c8cfc", "58c0862570b7eb480164cfd62c96c7168f1eafd73a0501944e1b8a619efdbcc6", "4513dbb05cafdf5856f7732305f6afa6ea95c59194f50dc63e633858701a4d6b", "4059292aaf9f282d6d26f18c44ccf6a6e77babc1d446280d14c93a6cc2b49251", "8299126ec047770f983559d227c7b2ff45780dedc9da05a1c8aa13e5008371a9", "d74b53c9d599af9eae31fc475c32b57de75bef428281c7e17ce4a01a9b5c493b", "11cde4ac7bfd211c5f6c171e23e59437c1dcd71d86bbe155d27a7a0a93414b43", "3cde22eda3eacc59181df6ea570f580879d644dd274d7015fd410f82c421698e", "d4b8edff2b266d9790091cbf11de75923b00107200459b0691125a554a2c50e2", "f12194e7b5d98146319e0b78980dbbe6ff53e2b5306801e97f5730b7edea6c05", "9ecaa0b99970c16e21da90d69e70a53f02cf6f93e3fc9df5d315dcf0639a0940", "22158d935fc055437833f924ae54d486c067a6607120bb71f2fbde020bf25773", "160f64e5b1a89fdb4398f23c7be6d70b3ec7207be29def36b96e04920cae7084", "80b38e5b992b613bc49c7e11b55d456fa5590e222a12ff0b6557cc8157f09e3d", "af00f14b1837c7a01d1bd354f41bb936ec3ecac329db57f7433c718d54257032"],
                  ct = function(e, a, t) {
                      return Promise.race([e, new Promise((function(e, n) {
                          return setTimeout((function() {
                              return n(t)
                          }), a)
                      }))])
                  };
              Object.defineProperty(Array.prototype, "chunk_inefficient", {
                  value: function(e) {
                      var a = this;
                      return [].concat.apply([], a.map((function(t, n) {
                          return n % e ? [] : [a.slice(n, n + e)]
                      })))
                  }
              });
              var rt = Object(f.b)("atomic/getRefundItem", Object(o.a)(d.a.mark((function e() {
                  return d.a.wrap((function(e) {
                      for (;;) switch (e.prev = e.next) {
                          case 0:
                              return e.next = 2, K.getRefundItem();
                          case 2:
                              return e.abrupt("return", e.sent);
                          case 3:
                          case "end":
                              return e.stop()
                      }
                  }), e)
              })))),
                  it = Object(f.b)("atomic/getRefund", function() {
                      var e = Object(o.a)(d.a.mark((function e(a, t) {
                          var n, c, r, i, s, o, u;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      n = t.getState, c = 0;
                                  case 2:
                                      if (!(c < 3)) {
                                          e.next = 19;
                                          break
                                      }
                                      return e.prev = 3, r = n(), i = r.atomic, e.next = 7, K.getRefund(i.refundChest.idList.chunk_inefficient(5));
                                  case 7:
                                      return s = e.sent, e.abrupt("return", s);
                                  case 11:
                                      if (e.prev = 11, e.t0 = e.
                                          catch (3), !(((null === e.t0 || void 0 === e.t0 || null === (o = e.t0.message) || void 0 === o ? void 0 : o.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (u = e.t0.message) || void 0 === u ? void 0 : u.includes("Failed to fetch"))) && c < 2)) {
                                          e.next = 15;
                                          break
                                      }
                                      return e.abrupt("continue", 16);
                                  case 15:
                                      throw e.t0;
                                  case 16:
                                      c++, e.next = 2;
                                      break;
                                  case 19:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [3, 11]
                          ])
                      })));
                      return function(a, t) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  st = Object(f.b)("atomic/getExchangeTransactions", Object(o.a)(d.a.mark((function e() {
                      var a, t, n, c, r, i, s;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  a = {}, t = Object(Ae.a)(Ce), n = [], e.t0 = d.a.keys(nt);
                              case 4:
                                  if ((e.t1 = e.t0()).done) {
                                      e.next = 34;
                                      break
                                  }
                                  c = e.t1.value, r = nt[c], i = 0;
                              case 8:
                                  if (!(i < 5 * Ce.length)) {
                                      e.next = 32;
                                      break
                                  }
                                  return e.prev = 9, e.next = 12, ct(K.getTransaction(r, t[i % t.length]), 2e3, null);
                              case 12:
                                  if (!0 === (a = e.sent).executed) {
                                      e.next = 15;
                                      break
                                  }
                                  return e.abrupt("continue", 29);
                              case 15:
                                  if (!a.actions) {
                                      e.next = 20;
                                      break
                                  }
                                  return s = "", a.actions.forEach((function(e) {
                                      var a, t, n;
                                      "logburnrs" !== e.act.name || (s = (null === (a = e.act.data) || void 0 === a ? void 0 : a.data.owner) + "|" + (null === (t = e.act.data) || void 0 === t ? void 0 : t.data.asset_id) + "|" + (null === (n = e.act.data) || void 0 === n ? void 0 : n.data.rewards) || 0)
                                  })), n.push(s), e.abrupt("break", 32);
                              case 20:
                                  e.next = 29;
                                  break;
                              case 22:
                                  if (e.prev = 22, e.t2 = e.
                                      catch (9), t.splice(i % t.length, 1), i--, 0 !== t.length) {
                                      e.next = 28;
                                      break
                                  }
                                  throw new Error("Exchange successfully!");
                              case 28:
                                  return e.abrupt("continue", 29);
                              case 29:
                                  i++, e.next = 8;
                                  break;
                              case 32:
                                  e.next = 4;
                                  break;
                              case 34:
                                  console.log(n);
                              case 35:
                              case "end":
                                  return e.stop()
                          }
                      }), e, null, [
                          [9, 22]
                      ])
                  })))),
                  dt = Object(f.b)("atomic/getAtomicChest", Object(o.a)(d.a.mark((function e() {
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getItems("260676");
                              case 2:
                                  return e.abrupt("return", e.sent);
                              case 3:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  ot = (Object(f.b)("atomic/getCoin", Object(o.a)(d.a.mark((function e() {
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getTemplaasds();
                              case 2:
                                  return e.abrupt("return", e.sent);
                              case 3:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))), ["plants", "tools", "farmbuilding"]),
                  ut = function(e, a) {
                      var t;
                      return null === (t = e.foods.filter((function(e) {
                          return e.template.template_id === a + ""
                      }))[0]) || void 0 === t ? void 0 : t.idList
                  }, lt = Object(f.c)({
                      name: "atomic",
                      initialState: {
                          plants: [],
                          memberships: [],
                          farmanimals: [],
                          tools: [],
                          packs: [],
                          farmercoins: [],
                          farmbuilding: [],
                          foods: [],
                          refundConf: [],
                          refundChest: {
                              idList: []
                          },
                          refundAmount: 0,
                          status: "idle",
                          response: "",
                          error: ""
                      },
                      reducers: {
                          getCard: function(e, a) {}
                      },
                      extraReducers: function(e) {
                          e.addCase(dt.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(dt.fulfilled, (function(e, a) {
                              var t = [],
                                  n = {}, c = [];
                              e.refundChest = [], a.payload.forEach((function(a) {
                                  if (e.refundConf.includes(a.asset_id)) return e.refundChest = a, c.push(a.asset_id), void(e.refundChest.isRefundable = !0);
                                  n[a.schema.schema_name] || (n[a.schema.schema_name] = {}), n[a.schema.schema_name][a.template.template_id] || (n[a.schema.schema_name][a.template.template_id] = Object.assign({}, a), ot.includes(a.schema.schema_name) && (n[a.schema.schema_name][a.template.template_id].isWearable = !0), a.data.unpack && ("in game" === a.data.unpack.toLowerCase() ? n[a.schema.schema_name][a.template.template_id].isOpenable = !0 : n[a.schema.schema_name][a.template.template_id].isOpenLink = !0), a.data.type && "Random" !== a.data.type && (n[a.schema.schema_name][a.template.template_id].isWearable = !0), "farmanimals" === a.schema.schema_name && ("Random" !== a.data.sex ? n[a.schema.schema_name][a.template.template_id].isWearable = !0 : n[a.schema.schema_name][a.template.template_id].isOpenLink = !0), "memberships" === a.schema.schema_name && "Random" === a.data.type && (n[a.schema.schema_name][a.template.template_id].isOpenLink = !0)), n[a.schema.schema_name][a.template.template_id].idList || (n[a.schema.schema_name][a.template.template_id].idList = []), n[a.schema.schema_name][a.template.template_id].idList.push(a.asset_id), t.includes(a.schema.schema_name) || t.push(a.schema.schema_name)
                              })), t.forEach((function(a) {
                                  e[a] = [], Object.keys(n[a]).forEach((function(t, c) {
                                      e[a].push(n[a][t]), e[a][c].total = n[a][t].idList.length
                                  }))
                              })), e.refundChest.idList = c, e.refundChest.total = c.length, e.status = "loaded"
                          })).addCase(dt.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(rt.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(rt.fulfilled, (function(e, a) {
                              a.payload[0] && (e.refundConf = a.payload[0].asset_ids, e.refundAmount = a.payload[0].reward), e.status = "loaded"
                          })).addCase(rt.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          })).addCase(st.pending, (function(e, a) {
                              e.status = "loading"
                          })).addCase(st.fulfilled, (function(e, a) {
                              e.status = "loaded"
                          })).addCase(st.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message
                          }))
                      }
                  }),
                  ft = lt.actions,
                  bt = (ft.getCard, ft.chooseCard, ft.chooseUsingCard, ft.repairCard, ft.chooseCraft, ft.UpdateDurability, ft.UpdateTimestamp, ft.chooseUsingCardById, lt.reducer),
                  mt = Object(f.b)("game/thunkUpdater", function() {
                      var e = Object(o.a)(d.a.mark((function e(a, t) {
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      return e.next = 2, t.dispatch(rt());
                                  case 2:
                                      return e.next = 4, Promise.all([t.dispatch(Ke()), t.dispatch(dt()), t.dispatch(Ya()), t.dispatch($a()), t.dispatch(ua()), t.dispatch(Ge()), t.dispatch(ja()), t.dispatch(ie()), t.dispatch(Ca()), t.dispatch(Fa()), t.dispatch(ea()), t.dispatch(vt()), t.dispatch(ht()), t.dispatch(pe()), t.dispatch(Ka()), t.dispatch(gt())]);
                                  case 4:
                                      return e.next = 6, Promise.all([t.dispatch(He()), t.dispatch(se()), t.dispatch(Ie()), t.dispatch(la()), t.dispatch(pa()), t.dispatch(Va()), t.dispatch(Ba()), t.dispatch(et())]);
                                  case 6:
                                  case "end":
                                      return e.stop()
                              }
                          }), e)
                      })));
                      return function(a, t) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  pt = Object(f.b)("game/backgroundUpdate", function() {
                      var e = Object(o.a)(d.a.mark((function e(a, t) {
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      return e.next = 2, Promise.all([t.dispatch(dt()), t.dispatch(pe()), t.dispatch(Ie()), t.dispatch(He()), t.dispatch(la()), t.dispatch(se()), t.dispatch(Ba()), t.dispatch(pa()), t.dispatch(Ka()), t.dispatch(et()), t.dispatch(Va())]);
                                  case 2:
                                      return e.abrupt("return", e.sent);
                                  case 3:
                                  case "end":
                                      return e.stop()
                              }
                          }), e)
                      })));
                      return function(a, t) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  vt = Object(f.b)("game/getWaxAccount", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getWaxAccount();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  gt = Object(f.b)("gae/mbsGetUnclaimedAsset", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.mbsGetUnclaimedAsset();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  ht = Object(f.b)("game/getAccountToken", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getAccountToken();
                              case 2:
                                  return a = e.sent, e.abrupt("return", a);
                              case 4:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  jt = Object(f.b)("game/getSchemas", Object(o.a)(d.a.mark((function e() {
                      var a;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  return e.next = 2, K.getSchemas();
                              case 2:
                                  return a = e.sent, console.log(a), e.abrupt("return", a);
                              case 5:
                              case "end":
                                  return e.stop()
                          }
                      }), e)
                  })))),
                  xt = Object(f.b)("game/setAccountToken", function() {
                      var e = Object(o.a)(d.a.mark((function e(a, t) {
                          var n, c, r, i, s, o;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      n = t.getState, c = n(), r = c.game, i = 0;
                                  case 3:
                                      if (!(i < 3)) {
                                          e.next = 18;
                                          break
                                      }
                                      return e.prev = 4, e.next = 7, K.setAccountTokens(r.removeToken);
                                  case 7:
                                      return e.abrupt("return", !0);
                                  case 10:
                                      if (e.prev = 10, e.t0 = e.
                                          catch (4), !(((null === (s = e.t0.message) || void 0 === s ? void 0 : s.includes("undefined")) || (null === (o = e.t0.message) || void 0 === o ? void 0 : o.includes("Failed to fetch"))) && i < 2)) {
                                          e.next = 14;
                                          break
                                      }
                                      return e.abrupt("continue", 15);
                                  case 14:
                                      throw e.t0;
                                  case 15:
                                      i++, e.next = 3;
                                      break;
                                  case 18:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [4, 10]
                          ])
                      })));
                      return function(a, t) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  Ot = Object(f.b)("game/buyCpuNet", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.buyCpuNet(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }()),
                  kt = Object(f.b)("game/buyRam", function() {
                      var e = Object(o.a)(d.a.mark((function e(a) {
                          var t, n, c, r;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      t = 0;
                                  case 1:
                                      if (!(t < 3)) {
                                          e.next = 17;
                                          break
                                      }
                                      return e.prev = 2, e.next = 5, K.buyRam(a);
                                  case 5:
                                      return n = e.sent, e.abrupt("return", n);
                                  case 9:
                                      if (e.prev = 9, e.t0 = e.
                                          catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                          e.next = 13;
                                          break
                                      }
                                      return e.abrupt("continue", 14);
                                  case 13:
                                      throw e.t0;
                                  case 14:
                                      t++, e.next = 1;
                                      break;
                                  case 17:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [2, 9]
                          ])
                      })));
                      return function(a) {
                          return e.apply(this, arguments)
                      }
                  }());
  
              function wt(e) {
                  return !("farmerstoken" !== e.contract || !e.token.includes("4"))
              }
  
              function yt(e) {
                  return !("farmerstoken" !== e.contract || !e.token.includes("8"))
              }
              var At = Object(f.c)({
                  name: "game",
                  initialState: {
                      status: "idle",
                      waxAccountInfo: {
                          ram_quota: 0,
                          net_weight: 0,
                          cpu_weight: 0,
                          net_limit: {
                              used: 0,
                              available: 0,
                              max: 0
                          },
                          cpu_limit: {
                              used: 0,
                              available: 0,
                              max: 0
                          },
                          ram_usage: 3164,
                          total_resources: {
                              owner: "",
                              net_weight: "0.00000000 WAX",
                              cpu_weight: "0.00000000 WAX",
                              ram_bytes: 0
                          }
                      },
                      selectedMap: 0,
                      update: !1,
                      backgroundStatus: "idle",
                      backgroundUpdateStatus: !1,
                      isCanceled: !1,
                      isGameLoaded: !1,
                      isSetToken: !0,
                      lackingResource: "",
                      removeToken: [],
                      claimAssets: [],
                      lackingValue: "",
                      error: ""
                  },
                  reducers: {
                      setUpdate: function(e, a) {
                          e.update = a.payload
                      },
                      setClearAsset: function(e) {
                          e.claimAssets = []
                      },
                      setBackgroundUpdate: function(e, a) {
                          e.backgroundUpdateStatus = a.payload
                      },
                      cancelLoading: function(e, a) {
                          e.isCanceled = a.payload
                      },
                      setTokenModal: function(e, a) {
                          e.isSetToken = a.payload
                      },
                      setLackResource: function(e, a) {
                          e.lackingResource = a.payload, e.lackingValue = ""
                      },
                      setLackingValue: function(e, a) {
                          e.lackingValue = a.payload
                      },
                      setSelectedMap: function(e, a) {
                          e.selectedMap = a.payload
                      }
                  },
                  extraReducers: function(e) {
                      e.addCase(mt.pending, (function(e, a) {
                          e.status = "loading"
                      })).addCase(mt.fulfilled, (function(e, a) {
                          e.status = "succeeded", e.isGameLoaded = "loaded", e.update = !1
                      })).addCase(mt.rejected, (function(e, a) {
                          e.status = "failed", e.error = a.error.message
                      })).addCase(jt.pending, (function(e, a) {
                          e.status = "loading"
                      })).addCase(jt.fulfilled, (function(e, a) {
                          e.status = "succeeded"
                      })).addCase(jt.rejected, (function(e, a) {
                          e.status = "failed", e.error = a.error.message
                      })).addCase(pt.pending, (function(e, a) {
                          e.backgroundStatus = "loading"
                      })).addCase(pt.fulfilled, (function(e, a) {
                          e.backgroundStatus = "succeeded", e.backgroundUpdateStatus = !1
                      })).addCase(pt.rejected, (function(e, a) {
                          e.backgroundStatus = "failed", e.error = a.error.message
                      })).addCase(vt.pending, (function(e, a) {
                          e.status = "pending"
                      })).addCase(vt.fulfilled, (function(e, a) {
                          e.status = "succeeded", e.waxAccountInfo = a.payload
                      })).addCase(vt.rejected, (function(e, a) {
                          e.status = "failed", e.error = a.error.message
                      })).addCase(ht.pending, (function(e, a) {
                          e.status = "loading"
                      })).addCase(ht.fulfilled, (function(e, a) {
                          if (!0 === a.payload) e.isSetToken = !0;
                          else {
                              var t = a.payload.filter(wt),
                                  n = a.payload.filter(yt),
                                  c = !1,
                                  r = !0;
                              if (n.length >= 1) {
                                  var i = [];
                                  n.forEach((function(e) {
                                      i.push(e.key)
                                  })), e.removeToken = i, c = !0
                              }
                              3 === t.length && (r = !1), e.isSetToken = !c && !r
                          }
                          e.status = "loaded"
                      })).addCase(ht.rejected, (function(e, a) {
                          e.status = "failed", e.error = a.error.message
                      })).addCase(gt.pending, (function(e, a) {
                          e.status = "loading"
                      })).addCase(gt.fulfilled, (function(e, a) {
                          var t = [];
                          a.payload.forEach((function(e) {
                              t.push(e.asset_id)
                          })), e.claimAssets = t
                      })).addCase(gt.rejected, (function(e, a) {
                          e.status = "failed", e.error = a.error.message
                      })).addCase(xt.pending, (function(e, a) {
                          e.status = "loading"
                      })).addCase(xt.fulfilled, (function(e, a) {
                          e.isSetToken = a.payload, e.status = "loaded"
                      })).addCase(xt.rejected, (function(e, a) {
                          e.status = "failed", e.error = a.error.message
                      })).addCase(Ot.pending, (function(e, a) {
                          e.status = "loading"
                      })).addCase(Ot.fulfilled, (function(e, a) {
                          e.status = "loaded"
                      })).addCase(Ot.rejected, (function(e, a) {
                          e.status = "failed", e.error = a.error.message
                      })).addCase(kt.pending, (function(e, a) {
                          e.status = "loading"
                      })).addCase(kt.fulfilled, (function(e, a) {
                          e.status = "loaded"
                      })).addCase(kt.rejected, (function(e, a) {
                          e.status = "failed", e.error = a.error.message
                      }))
                  }
              }),
                  Ct = At.actions,
                  Nt = Ct.setUpdate,
                  St = Ct.setBackgroundUpdate,
                  Et = Ct.cancelLoading,
                  Bt = Ct.setTokenModal,
                  It = Ct.setLackResource,
                  Ut = (Ct.setLackingValue, Ct.setSelectedMap),
                  Ft = Ct.setClearAsset,
                  Dt = At.reducer;
  
              function Rt(e, a, t, n) {
                  try {
                      var c, r, i, s, d, o, u = JSON.parse(e.message);
                      if (null === u || void 0 === u || null === (c = u.error) || void 0 === c || null === (r = c.details[0]) || void 0 === r || null === (i = r.message) || void 0 === i ? void 0 : i.includes("transaction net")) a(It("NET"));
                      else if (null === u || void 0 === u || null === (s = u.error) || void 0 === s || null === (d = s.details[0]) || void 0 === d || null === (o = d.message) || void 0 === o ? void 0 : o.includes("billed CPU")) a(It("CPU"));
                      else {
                          var l, f;
                          a(t((null === u || void 0 === u || null === (l = u.error) || void 0 === l || null === (f = l.details[0]) || void 0 === f ? void 0 : f.message) || e.message || e)), a(n(!0))
                      }
                  } catch (v) {
                      var b, m, p;
                      (null === e || void 0 === e || null === (b = e.message) || void 0 === b ? void 0 : b.includes("of undefined")) ? a(t("A moment to relax these hard days! Try again later!")) : (null === e || void 0 === e || null === (m = e.message) || void 0 === m ? void 0 : m.includes("to fetch")) ? a(t("Today is a hard day! Try again later!")) : (null === e || void 0 === e || null === (p = e.message) || void 0 === p ? void 0 : p.includes("Aborted due")) ? a(t("Your labors are doing their best. Don't push too hard")) : a(t(e.message || e)), a(n(!0))
                  }
              }
  
              function qt() {
                  var e = Object(u.b)(),
                      a = Object(u.c)((function(e) {
                          return e.auth.isLoggedIn
                      })),
                      t = Object(u.c)((function(e) {
                          return e.auth.servers
                      })),
                      c = Object(n.useState)(!1),
                      r = Object(l.a)(c, 2),
                      i = r[0],
                      s = r[1],
                      f = function() {
                          var t = Object(o.a)(d.a.mark((function t(n) {
                              return d.a.wrap((function(t) {
                                  for (;;) switch (t.prev = t.next) {
                                      case 0:
                                          if (n.preventDefault(), t.prev = 1, !a) {
                                              t.next = 7;
                                              break
                                          }
                                          e(J(!1)), setTimeout((function() {
                                              return e(J(!0))
                                          }), 1e3), t.next = 9;
                                          break;
                                      case 7:
                                          return t.next = 9, e(L()).unwrap();
                                      case 9:
                                          e(Y(!0)), t.next = 16;
                                          break;
                                      case 12:
                                          t.prev = 12, t.t0 = t.
                                          catch (1), Rt(t.t0, e, $), e(_(!0));
                                      case 16:
                                      case "end":
                                          return t.stop()
                                  }
                              }), t, null, [
                                  [1, 12]
                              ])
                          })));
                          return function(e) {
                              return t.apply(this, arguments)
                          }
                      }(),
                      b = function() {
                          var t = Object(o.a)(d.a.mark((function t(n) {
                              return d.a.wrap((function(t) {
                                  for (;;) switch (t.prev = t.next) {
                                      case 0:
                                          if (n.preventDefault(), t.prev = 1, !a) {
                                              t.next = 7;
                                              break
                                          }
                                          e(J(!1)), setTimeout((function() {
                                              return e(J(!0))
                                          }), 1e3), t.next = 9;
                                          break;
                                      case 7:
                                          return t.next = 9, e(T()).unwrap();
                                      case 9:
                                          t.next = 15;
                                          break;
                                      case 11:
                                          t.prev = 11, t.t0 = t.
                                          catch (1), Rt(t.t0, e, $), e(_(!0));
                                      case 15:
                                          e(Y(!0));
                                      case 16:
                                      case "end":
                                          return t.stop()
                                  }
                              }), t, null, [
                                  [1, 11]
                              ])
                          })));
                          return function(e) {
                              return t.apply(this, arguments)
                          }
                      }();
                  return Object(ae.jsxs)("div", {
                      className: "login-container",
                      style: {
                          backgroundImage: "url(./img/login-background.jpg)"
                      },
                      children: [Object(ae.jsx)(ne, {}), Object(ae.jsxs)("div", {
                          className: "login-content",
                          children: [Object(ae.jsx)("label", {
                              htmlFor: "RPC-Endpoint",
                              children: 0 === t.length ? "No servers found" : "Rpc Endpoint Available"
                          }), Object(ae.jsxs)("select", {
                              id: "RPC-Endpoint",
                              onChange: function(a) {
                                  return e(P(a.target.value))
                              },
                              children: [Object(ae.jsx)("option", {
                                  disabled: !0,
                                  value: "none",
                                  name: "none",
                                  style: {
                                      textAlign: "center"
                                  },
                                  children: "Select RPC Endpoint"
                              }), t.map((function(e, a) {
                                  return Object(ae.jsx)("option", {
                                      value: a,
                                      name: e,
                                      children: e
                                  }, a)
                              }))]
                          }), Object(ae.jsx)("button", {
                              className: "login-button",
                              onClick: function() {
                                  return s(!0)
                              },
                              children: "Login"
                          })]
                      }), i && Object(ae.jsxs)("div", {
                          children: [Object(ae.jsx)("div", {
                              className: "modal-wrapper",
                              onClick: function() {
                                  return s(!1)
                              }
                          }), Object(ae.jsxs)("div", {
                              className: "login-modal-container",
                              children: [Object(ae.jsx)("p", {
                                  className: "login-modal-header",
                                  children: "Select Wallet"
                              }), Object(ae.jsxs)("button", {
                                  className: "login-modal-button",
                                  disabled: 0 === t.length,
                                  onClick: function(e) {
                                      return b(e)
                                  },
                                  children: [Object(ae.jsx)("img", {
                                      className: "login-button--img",
                                      src: "./img/wax-primary-logo.png",
                                      alt: "wax-cloud-wallet"
                                  }), Object(ae.jsx)("p", {
                                      className: "login-button--text",
                                      children: "Wax Wallet Account"
                                  })]
                              }), Object(ae.jsxs)("button", {
                                  className: "login-modal-button",
                                  disabled: 0 === t.length,
                                  onClick: function(e) {
                                      return f(e)
                                  },
                                  children: [Object(ae.jsx)("img", {
                                      className: "login-button--img",
                                      src: "./img/anchor.png",
                                      alt: "anchor"
                                  }), Object(ae.jsx)("p", {
                                      className: "login-button--text",
                                      children: "Anchor"
                                  })]
                              })]
                          })]
                      })]
                  })
              }
              var Kt = t(109),
                  Vt = Object(f.c)({
                      name: "flash",
                      initialState: {
                          flashes: [{
                              id: "",
                              content: "",
                              timeout: 5e3
                          }]
                      },
                      reducers: {
                          setFlash: function(e, a) {
                              e.flashes.push(a.payload)
                          },
                          deleteFlash: function(e, a) {
                              for (var t = 0; t < e.flashes.length; t++) e.flashes[t].id === a.payload && e.flashes.splice(t, 1)
                          }
                      }
                  }),
                  Qt = Vt.actions,
                  Mt = Qt.deleteFlash,
                  Tt = Qt.setFlash,
                  Lt = Vt.reducer;
  
              function Xt(e) {
                  var a = Object(u.b)();
                  return Object(n.useEffect)((function() {
                      var t = setTimeout((function() {
                          a(Mt(e.id))
                      }), e.timeout);
                      return function() {
                          clearTimeout(t)
                      }
                  }), [e.timeout, a, e.id]), Object(ae.jsx)("div", {
                      className: "flash-message-wrapper",
                      children: Object(ae.jsx)("div", {
                          className: "flash-message-content",
                          children: e.content
                      })
                  })
              }
  
              function zt() {
                  var e = Object(u.c)((function(e) {
                      return e.flash.flashes
                  }));
                  return 0 !== e.length && Object(ae.jsx)("div", {
                      className: "flash-container",
                      children: e.map((function(e, a) {
                          return Object(ae.jsx)(Xt, Object(p.a)({}, e), a)
                      }))
                  })
              }
              var Wt = "data:image/png;base64,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",
                  Yt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAxCAYAAAClOZt5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAt1SURBVHgB5VlpbFTXFT7vvdk83o0N2AY8DosDaRy7KbRAm1hpSErTpEUBEqkkJVHVtElLWnWRqkaxadVWpUlKaYOC1ELUtBRktiAUKUAaQooBsSdgDLXHBsYwg+3xMNubeWvPuW+ePWNm7Bkg5EeOdPWWect3v/fd75x7h4NPMbpbWkrAanWBrjdhKwFVfbO2paUnm3s5+BRCX9zQBKB9EzgOQWslADwEJs6C/rKpDRabY2XtSy+tHusZtxW4vuTu5aDDd/C1Tel+FzkBrlTfC/G8op/M+v1ro4IX4DYEMdwyc/z7CHg5Nlem66zYq+LIVYgVVn1trjMU3OLuP5zp2k+Ucf3JBhco+gbca8rlPsWWD6dLZ8Ch91s//4P26El61MhrePgEIvDIlFL98frVoGjduYKmsEgRmGLRYVxlzXbIgPGWAtcXf65JX1z/ZnFeiR+/5YtwE+G81gsVlVNrVs+0Loc0OC1wC8JwCbU506AzQ7lvIfTW1kGI58HBC1AdCkDero0A0ch111qkKEysaYSzJ3b/CA//0dLSAtg08/eb0jhzCY1rxqe4xrpWfOAxOOJwgBgODoOz2WEOb4HC3VvT3nOhYSm827oKroTidS3ueBeeUofuhRsErGtcCw6Zmqy6Xj4BumqmgdjVnnJakeLgnT4jXNg4t2CIw3ETAKbcYewfv8Q2BTatCTc9uo5v5Tg9J+B4E8SW3lPr0PX1oHNNXC7fqmEe+H2eoUNN08Lu3r4tf968d2vbv//+Gzj3UUOKXLCjyt1fwh07KHIMjYnZNo+gSeskFz1b4BwsvWeFQ4cW3C2BXGMyMugz2JNkxbtm0+4X9x457d3/zttLyvdtb7hO4/0+kI4fgWDpNHYY1yEMRs5RzEuycRVOXVzfjLKgTJY7aGQP5i+Amprp7PAvm/esiIAt2PHezhe+cm7/D+HEwbS3icWTIOj3sf1gXKOeCbNmzRrCO+oHR3lwsKQR3UJrhhsJAv3zVQA7/8mcw3/XF8JWWblSKAanw97tad2EQhOscKXuYdj/4dbQoK+78IV2aXJpaWlocHAwhj9LMJpUCLS8uP7HVo67MdB19QDP/hRg/auAGmanyk604SCE6WPdGqyYASFZAgId0+AInUPQRLLZ9ExS4a4uuvsOBP0a5Bomy9RIBgnQ2Qal+0hZLZw703aFjn0SUPYEZJzcRCc/p0jHOPWIL+f5lyGXIIYfW2ZsSQLULnZBrnFt4l2M7d7Oo5WqDpdXe2B7Xl6ejowDapyAZ7RD7tI3Zt6Bye3prN6UDJjYfX2lwTSdc+ZDLkFsh8tccP7Q2+y4O6Kt4zhBFUVRraioUNvb24eKrZHA+aamJn6CbWDFmG8hSTyDGp48FdhAI8DJg43OvYDDY+8OyDZiBRUgRgLgcZ8i777yp4vKDofDQhao9PX1EWhNp8GHSSRF46Sfffv2CQIH9436hgcXGRpu2wOw4vEh10iJDI4xWpC2z5w9SmUsdIuwzmazybFYTCkpKSHwKsmE44zUl8w4h6D5t+6tKcMUVZ/2yfTpicVLqN2Vz48NDhMJuyeLTpBMiPFon7uB2F7dI5FelPz8fNlisVCNoiX0zeSSzDjn8XiEeRXORhgNNLG8aV12jF5yY+0xEbIJAs06IMUgrMBR3JWxSYIgSP39/QpKmKV68/oU4J2dnbyo6emncwSaAB/YA1kHfZnGuVldSjIxI6RAh91ul5xOpxQMBqkDKqpBS74+BTgdy1oabyeH2PCqASSXIJehwTuGu1CmNBl3FuCKBQdqPB6XotFoHIxSVku0VOCoHZ7qgLKyMiH25YcE9jIzHvyWYW/9PrihIGk99tSol0SLq1OOnYI+EdkmppmjJE8gRgIH9EjO7/dzkcMHecYwFkbw5HMAA77cmU6OE20AefmGz2eIZJlQWHiuENlW0LsZ083Nzekny+SN06axEpLz2EuDsOEVgBn4onkP0beDm47NbxgWSt4/IqS8kiGZUFzzewkUA4zezWY85uThOuDkjTgwAf0SHOOmFIejUgfT9K+fNzrQ/LpRMKV5cVZBDkRkPPH9654xWD1sYsGAl00cYrruKSoqMuWhpXuk6SCcy+WyeL1eS311tb1xfOlTTnGwkL3wJOr7g3eAjd3HnwW4s96wuVwTjIySPYMut3CpsY8SpCowXD48njpOvgfBQR9ciHFr9vuibjAsMcUGzRiSCpq8ThXYy7t2efrH1fWquh5KuZK0+sdfGIXTz1YZYyDXoM6SpaLela9/mxVUZlCqH/BdAFWDy2t6pEOFhYWjPooxTnO5bdu28ZhebXhoe2LOF12cGJhWosWuv9vdgTb3McD3folrZracy1YK6eJF8BbV4dxz+Fz78XfBf/UCDMj6W/v8WpvD4YhXVlbKCxYs0JKLqxTgaO7MwxPH1gsDAz0L5z/w3dLARTunp5FYcNDogKn7DNOvdEHy6KudD7o6tNIA3R2HoKu9DaiM/dcl+JVP0YLo4/FAICAj6LQaN5ONnrTV/nP+fOB8ILqOXpAxiOlN6BbzFhgJaoygJDNY3cBaSkcGvcj2brZ/LKiv/EiUA2AkHWp6cn2SHMnpnUscU+Fl3XjkSMfTTQvmOCyWKke4Lz0aYp1S+pym4c6kiVjBeLg69X4Qi1LrFo/7JBw/sA0lo8DluP63Ny7DDly6oHmlObdURqb6kcC5JUuWcJSE0IYsqHmLoijWU729B78694GHBaujwB4dgLSy8XqMgUoJhmST5DjEcqCqHvyT72X7yfG/jz9gTBPo3pi+/ndueR2CphQvJgOHMeyQMifrAEpLQNB0XvCGw9rVcPjA7Po590vjXAW8KoNNDKQ+gTKrCZpKBUw0mutOCCL2/vH1jO3kIPc4tn8zeLpPISI9fDbCvfJaj7zRarXGEbiYBFymVI+M66MCT7AOWI1x2Hgc1YIkSfzp3l6xLxI5ML9u5v1y6eSCCE6tVKydTfY1wQZa11lQptZDpMcDgYNHwX+6C2K8E6fiw4+XMbG42w9gWtgJkdAAxDXo3HxZW7HNp9AsXkqAjppsIxZl7dq1aUEzsCOOabBaysvL7TjPc0YiESrrqDnmFQtTfrto0V9rpzVkV2AnAe7pOIzD4TDLisSyJwatf3DLG8BIMHGc6YhIUhS9OxIKhcTEeZJJ1sCJdb61tZUGaF6iFSS2Dlc+lK5a+PCLU6smLxw33pUWpIwTAT8mEkrflFDINShMwK292paLKhdEOTLQYDBMTEcnTJggTpo0SXr00UfVTG6SCTgFnzhPyciBzUkNWclDVtBkLNbnqvhHZuTDM0UFJUPsSwiYGE0OSQdvWIaTnaLy3w/7uRPuuEprzBrqWcaI42QhhmNKRKZFLGNFn88nI3EqEqfCGJF2Cc6YSHMC9t6K07nrwINhmcLSSmtjtQOm2zkoIGriqhaRdC7kFvXO8xHwuqMqKxtozogM06Bgk17qE4IWEXQMXUzEMUXMM3kklpLhhoBT0OSCJs/YiHk7Lso4UfemfOzEPIKhr2N+IQKo4znW98RjtKSmJMCRzZkSiWFal6qqquRjx46pifsyyiMr4CZ4bGZSIqYdyFQesuJA5smY8atbhcRzdJmqvuGXm4DNLCihU9Fyg2SCx4pU7unpYV6dWC/JCvSYwBNhskrg7WCwb0f7suGnJvACSojDjnC4ZS/G/SGWEaxCayO4zKCgS5luIZkdSv6XIZfI9n8FEzwrwsyGA8qCUyz2bwEC5BAgq51prQ/BqDzPq7jV0OIIpIJjRsExkzz5zVoaNxNmLWNFAKZNFoGx2F+KrSyxpePixG+UA9iYoPtwbcQCSWPidgYHqcUYG7ioVQc13Hfg3JXJCYyvYklce8vB5voHrflpzQFHmpWXL18uzZ49mznGsmXLZNStWSCZ16Wdfn0m4/92DoLYgS2rpgAAAABJRU5ErkJggg==",
                  Jt = "data:image/png;base64,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",
                  Pt = function(e) {
                      var a = e.isShowing,
                          t = e.hide,
                          r = Object(n.useState)(0),
                          s = Object(l.a)(r, 2),
                          f = s[0],
                          b = s[1],
                          m = Object(u.c)((function(e) {
                              return e.user.user
                          })),
                          p = Object(u.c)((function(e) {
                              return e.user.balances.food
                          })),
                          v = Object(n.useState)(0),
                          g = Object(l.a)(v, 2),
                          h = g[0],
                          j = g[1];
                      Object(n.useEffect)((function() {
                          ((null === m || void 0 === m ? void 0 : m.max_energy) - (null === m || void 0 === m ? void 0 : m.energy)) / 5 <= p ? j((null === m || void 0 === m ? void 0 : m.max_energy) - (null === m || void 0 === m ? void 0 : m.energy)) : j(5 * p)
                      }), [m, p]);
                      var x = Object(u.b)(),
                          O = function() {
                              var e = Object(o.a)(d.a.mark((function e() {
                                  var a, n, c, r;
                                  return d.a.wrap((function(e) {
                                      for (;;) switch (e.prev = e.next) {
                                          case 0:
                                              if (e.prev = 0, x(Et(!1)), "disabled" === y) {
                                                  e.next = 10;
                                                  break
                                              }
                                              return a = f / 5, e.next = 6, x(ve(a)).unwrap();
                                          case 6:
                                              null !== (null === (n = e.sent) || void 0 === n ? void 0 : n.transaction_id) && (c = Date.now(), r = {
                                                  id: c,
                                                  content: "Eating your ".concat(a, " food"),
                                                  timeout: 5e3
                                              }, x(Tt(r)), x(we({
                                                  type: "plus",
                                                  value: f
                                              })), x(ke("-".concat(a, " food"))), x(St(!0))), e.next = 12;
                                              break;
                                          case 10:
                                              x(_(!0)), x($("You can not exchange stuff like this!"));
                                          case 12:
                                              e.next = 18;
                                              break;
                                          case 14:
                                              e.prev = 14, e.t0 = e.
                                              catch (0), Rt(e.t0, x, $, _), x(St(!0));
                                          case 18:
                                              return e.prev = 18, b(0), t(), e.finish(18);
                                          case 22:
                                          case "end":
                                              return e.stop()
                                      }
                                  }), e, null, [
                                      [0, 14, 18, 22]
                                  ])
                              })));
                              return function() {
                                  return e.apply(this, arguments)
                              }
                          }(),
                          k = Object(n.useRef)(null),
                          w = function(e) {
                              k.current && !k.current.contains(e.target) && t()
                          };
                      Object(n.useEffect)((function() {
                          return document.addEventListener("click", w, !0),
                          function() {
                              document.removeEventListener("click", w, !0)
                          }
                      }));
                      var y = 0 !== f ? "" : "disabled";
                      return a ? i.a.createPortal(Object(ae.jsxs)(c.a.Fragment, {
                          children: [Object(ae.jsx)(ne, {}), Object(ae.jsx)("div", {
                              className: "modal-wrapper",
                              "aria-modal": !0,
                              "aria-hidden": !0,
                              tabIndex: -1,
                              role: "dialog",
                              children: Object(ae.jsxs)("div", {
                                  style: {
                                      backgroundImage: "url(./img/big-board.png)"
                                  },
                                  className: "modal exchange-modal",
                                  ref: k,
                                  children: [Object(ae.jsxs)("div", {
                                      className: "modal-header",
                                      children: [Object(ae.jsx)("img", {
                                          src: Wt,
                                          alt: "Energy Icon",
                                          style: {
                                              width: "54px",
                                              height: "54px"
                                          }
                                      }), Object(ae.jsx)("img", {
                                          src: Jt,
                                          alt: "Close",
                                          className: "image-button close-modal",
                                          onClick: t
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "modal-body",
                                      children: [Object(ae.jsx)("img", {
                                          src: "data:image/png;base64,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",
                                          alt: "Minus Icon",
                                          value: f,
                                          onClick: function() {
                                              return b(f <= 5 ? 0 : f - 5)
                                          },
                                          className: "image-button"
                                      }), Object(ae.jsx)("input", {
                                          type: "number",
                                          min: 0,
                                          max: h,
                                          className: "modal-input",
                                          value: f,
                                          onChange: function(e) {
                                              return function(e) {
                                                  e.target.value <= 0 ? b(0) : e.target.value >= h ? b(h) : b(e.target.value), e.preventDefault()
                                              }(e)
                                          }
                                      }), Object(ae.jsx)("img", {
                                          src: "data:image/png;base64,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",
                                          alt: "Plus Icon",
                                          onClick: function() {
                                              return b(f + 5 <= h ? f + 5 : h)
                                          },
                                          className: "image-button"
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "modal-close-button tooltip",
                                      children: [Object(ae.jsx)(te, {
                                          type: "button",
                                          "data-dismiss": "modal",
                                          text: "Exchange",
                                          atr: "long",
                                          wrapperClassname: "full-width",
                                          isDisabled: y,
                                          handleClick: O
                                      }), "disabled" === y && Object(ae.jsxs)("span", {
                                          className: "tooltiptext tooltip-bottom",
                                          children: [Object(ae.jsx)("i", {
                                              className: "arrow-up"
                                          }), "Enter a Valid Amount"]
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "modal-footer",
                                      children: [Object(ae.jsx)("div", {
                                          className: "modal-footer-text",
                                          children: f / 5 || 1
                                      }), Object(ae.jsx)("img", {
                                          src: Yt,
                                          alt: "Meat Icon",
                                          className: "exchange-icon"
                                      }), Object(ae.jsx)("div", {
                                          style: {
                                              padding: "0 2px"
                                          },
                                          children: "="
                                      }), Object(ae.jsx)("div", {
                                          className: "modal-footer-text",
                                          children: f || 5
                                      }), Object(ae.jsx)("img", {
                                          src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAApCAYAAAC/QpA/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAc7SURBVHgBvVh7TFvXHf7OvbZJDBgIbZRAALeLBMkyNm2lIY9VJpkWomnFTNvSNYoWlG6V0mlLun+6rlOYtKVMilQitkx7SKXr9k81aS5Tm6qCFEW0VYPaJqgStFWw24aHUh4X87Dvvb739HfOBWoMBmLcfgKdy7UP/u7v8f2+Y4Y7wF+rNvlNxQowMD+yBMa4Zlpm6OwAImw9G57xo9DjdT0LKMGc/ELklVbI+0ZUw0ZhTE9Bn9Y0mLzOtZ4Ngkh+yT3BQ+f/jJKaXHBM0t04MoKlL14OGcUos4pw+ckLheHOjuY1yfxlt/skBTPY0P4CcktfhS2JbACqs0xbm9A/GkNZzg3cVVmNSOeLBcpaeznDr6qCJyg1H9JfGySSBKYZ+C67AfgCGHjxeRicimC1DW1VrgDj7BuVwe9Tat5BttA/vhUF01FJpPe5VzE99BHGTTa1KhlFYT8tqXkA22sMZAU8gf7oXSiPjgCuYgxcnUPvpT9AMzlM8FDamnmmCn4K5smq4I8oKmFkAm7Q0yfm6HdWtB6tNsrjHD53HtVMA17/Uz2iCU7XuNgyaLanJeNR3OfySypQGfwWFe1/1/PZ4KJTdKorfcIhYScWX7tlbcMWYxt80OnDjyP0s2OIapNEBpG4ndsMaFiRzEJUah57ioh0Yc2nFx8uSCS1bSrej+/HEeUDYMsP8HLTzzF56yNMGizCbaWuNaJJwVqRzEJUttfkYaUO4uKpBYG50SVPnw7D+lcdIoVH0XPpJXza34cxah/LRmNLJB5ZeN8yMvNRCZTe/wDyS8epXhYZOFEQBMS6TnTGvoN60B5vNXr/8zb6nm/DBNUJ/Zx9OmJeT37vMjIUlQAt/vtOnyIiHQ4JQWCdUUjGUKIMezh1orsYw+Ey6pxfyIKNWez3LYNGa+r7V0gTOydFbtsg7OkIqf7YHZMQiNo+VCS8RITJzun63TFaOaIm724Jm80r7VmiM470w1/98I9hj/0zo2hIIjwPo7H7KKpu6K5DsnNEwUZNKljuakq3L0X02DkhclvK3sVGMKxXY7dyWxbslfNtksinBtds6pzkgk1LRkg/Lf6qBxthG9eRKWaMCqqTeamngg13dcj7d3uYVua1AqvtXSQjpF+K3NF7SS9GkQluWaVQyBJwdz5092HqRj9qTj+FfaRXexpP+Cnyz17alXMm3X5ZwMkiZ80+h0yxQx0CNg/Bomt1rhFb9/ooygewWyVd8h6Fh4xZ37/aAvRya1oyCyLn3+/JOCqpGDB2oTBRjN3sE2oCL6antiN8pQMWT+9D5tPkiJzb/Raygc7YEZQn8rCDkcp7dmAsWo/QoyedQjZRlG6fq22XGqTVX/nIaXROXiUztR0+JYooPHRtwMdmsNdzY10kxDAciVejXqF0CXdNRdzXcRO9f3tIDsVxkwJvqavUDFMCop1LC8Iojd507i7MAFqjWJdNlmrrMnZgnzJM8fZCV/eh9+89Uv6FX5mxuAZbaVqtteUnjQ/0SbOzEvI8EZrcq+Na/ADKbZXSMiH/j1DcUJMjdJNERLdwncSucTUiAmqtT63PsfTasXAUufceg2HvhLrlAFwFX6NXXdQZ6etIKG3P7FHUsRFKZ4yY78XAGzl45fFTmLw9iglKCw3ni3Ge23QhMrNmZ7Df+NXgZrfyvwIXgyvpFCW663jot7Bn2lfcOJQowaxe5SitAPkUYQ9EWsQMmjK5xhk723LTbMc6ofZofGBvoVI0a6F2xpJPAq/KcPCJCygqeYXqZmbZpmt6LYoSd+Mryth8WoIIPfZrDHb9H2OUltmETEtdS9joxh1AtnbLYOIMt3mdTR4jV2URqcRHti7THJGWa7HD2GNZTn2QRxns34UXHm7ECBmm2/QkcRsXYzy3bq36WAlLjrdCiT2K57VDf/yHf+fBy0vIiLSM6N9ErRJxbmQhLalY0rfCWFFU/KlK3Bmrw35q8gpBRKRFP4iuX57HrWtXMZVYTEtjJtFIS0ZYiHsOPyiVWBg0kRYxhfdT3fgYme1NOzE8WI6u5tOybYWPNZ1uaV4w1Vkhs2isjn2biLRKp/ZB7AClhWaLaFvyJsIS9F56SKZl2oRmMZwV5x1xzMgGkiIzbzeLB/CmVoMKK8chItR08w9x+cyTMi3Cw1LX0RFDrdtoWlIhC1gYK0VRXmt4+R0aqe2kpswRMTHkJu7H5ccflWkZp7RIEbOzk5ZUyMioKjtX2XACfPPH2DMX/3zIvTSMnpZ6zMpugUZjgVy92ZqttCwjI9qZcxb4+k+OIzbbTcwoLZ7v4Upzm7SMzpCjr7jowJV6zsk6GTdzy6/Giv10rIh6KS0BSssji2kxbd4d43mNX0RalpFZuBh+bxJDbxvo+3eS9+B02JJnnC+ch0NmhORjK31RGDrVAFv4l0Sy9zBC+BLh4ja6R3Wu0cQuFL7FtrOjpplAtvYT/k1+KImTzObXn45YX2o0kvEZ+/6Q945aHgsAAAAASUVORK5CYII=",
                                          alt: "Energy Icon",
                                          className: "exchange-icon"
                                      })]
                                  })]
                              })
                          })]
                      }), document.body) : null
                  }, Ht = function() {
                      var e = Object(n.useState)(!1),
                          a = Object(l.a)(e, 2),
                          t = a[0],
                          c = a[1];
                      return {
                          isShowing: t,
                          toggle: function() {
                              c(!t)
                          }
                      }
                  }, Gt = t(21);
  
              function Zt(e) {
                  var a = Ht(),
                      t = a.isShowing,
                      c = a.toggle,
                      r = Object(n.useState)(0),
                      i = Object(l.a)(r, 2),
                      s = i[0],
                      d = i[1];
                  Object(n.useEffect)((function() {
                      d(parseFloat((null === e || void 0 === e ? void 0 : e.amount) || 0).toFixed(5))
                  }), [null === e || void 0 === e ? void 0 : e.amount]);
                  var o = Object(n.useState)(0),
                      u = Object(l.a)(o, 2),
                      f = u[0],
                      b = u[1];
                  Object(n.useEffect)((function() {
                      b(parseInt(e.energy || 0))
                  }), [null === e || void 0 === e ? void 0 : e.energy]);
                  var m = Object(Gt.useSpring)({
                      width: (e.energy || 1) / (e.max_energy || 1) * 184 * .7,
                      backgroundColor: "#F1D900",
                      config: {
                          duration: 1e3
                      }
                  }),
                      p = Object(Gt.useSpring)({
                          number: "energy" === e.name ? parseInt(f) : parseFloat(s).toFixed(4),
                          config: {
                              duration: 500,
                              reset: !1
                          }
                      });
                  return Object(ae.jsxs)("div", {
                      className: "resource__group",
                      children: [Object(ae.jsx)("i", {
                          className: "resource-icon",
                          children: Object(ae.jsx)("img", {
                              src: e.icon,
                              alt: "Resource Icon",
                              className: "resource-icon--image "
                          })
                      }), "energy" === e.name && Object(ae.jsx)(Gt.animated.div, {
                          className: "fill-yellow",
                          style: m
                      }), Object(ae.jsxs)(Gt.animated.div, {
                          className: "resource-number",
                          style: {
                              fontSize: function() {
                                  var e = (null === s || void 0 === s ? void 0 : s.toString().length) || (null === f || void 0 === f ? void 0 : f.toString().length);
                                  return e < 4 ? "2.2rem" : e < 8 ? "1.8rem" : "1.6rem"
                              }()
                          },
                          children: [Object(ae.jsx)(Gt.animated.div, {
                              children: p.number.to((function(a) {
                                  return "energy" === e.name ? parseInt(a) : parseFloat(a).toFixed(5).slice(0, -1)
                              }))
                          }), "energy" === e.name && " /".concat(null === e || void 0 === e ? void 0 : e.max_energy)]
                      }), "energy" === e.name && Object(ae.jsx)("div", {
                          className: "resource-energy",
                          children: Object(ae.jsx)("img", {
                              src: "./img/plus.png",
                              alt: "plus",
                              className: "resource-energy--plus",
                              onClick: c
                          })
                      }), Object(ae.jsx)(Pt, {
                          isShowing: t,
                          hide: c
                      })]
                  })
              }
              var _t = ["MINE", "CHICKEN", "CROP", "COW"];
  
              function $t() {
                  var e = [{
                      name: "GOLD",
                      icon: "data:image/png;base64,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"
                  }, {
                      name: "WOOD",
                      icon: "data:image/png;base64,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"
                  }, {
                      name: "FOOD",
                      icon: "data:image/png;base64,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"
                  }, {
                      name: "energy",
                      icon: Wt
                  }],
                      a = Object(u.c)((function(e) {
                          return e.navBar.selectedTab
                      })),
                      t = Object(u.c)((function(e) {
                          return e.navBar.tabs[a]
                      })),
                      n = Object(u.c)(je),
                      c = Object(u.c)(he),
                      r = Object(u.c)((function(e) {
                          return e.game.selectedMap
                      }));
                  return Object(ae.jsxs)("section", {
                      className: "container__header",
                      children: [Object(ae.jsx)(Zt, Object(p.a)(Object(p.a)({}, e[0]), {}, {
                          amount: n.gold || 0
                      })), Object(ae.jsx)(Zt, Object(p.a)(Object(p.a)({}, e[1]), {}, {
                          amount: n.wood || 0
                      })), Object(ae.jsx)("div", {
                          style: {
                              backgroundImage: "url(./img/border-button.png)"
                          },
                          className: "container__header--tilte",
                          children: (null === t || void 0 === t ? void 0 : t.name) || _t[r]
                      }), Object(ae.jsx)(Zt, Object(p.a)(Object(p.a)({}, e[2]), {}, {
                          amount: n.food || 0
                      })), Object(ae.jsx)(Zt, Object(p.a)(Object(p.a)({}, e[3]), c || 0))]
                  })
              }
              var en = Object(f.c)({
                  name: "navBar",
                  initialState: {
                      tabs: [{
                          name: "Home",
                          icon: "/Home.png"
                      }, {
                          name: "Chest",
                          icon: "/Chest.png"
                      }, {
                          name: "Smithy",
                          icon: "/Smithy.png"
                      }, {
                          name: "Exchange",
                          icon: "/Exchange.png"
                      }, {
                          name: "Map",
                          icon: "/Map.png"
                      }, {
                          name: "Market",
                          icon: "/Market.png"
                      }, {
                          name: "Atomic",
                          icon: "/Shop.png"
                      }],
                      selectedTab: 0
                  },
                  reducers: {
                      ChooseTab: function(e, a) {
                          e.selectedTab = a.payload
                      }
                  }
              }),
                  an = en.actions.ChooseTab,
                  tn = en.reducer;
  
              function nn() {
                  var e = Object(u.c)((function(e) {
                      return e.navBar.selectedTab
                  })),
                      a = Object(u.c)((function(e) {
                          return e.navBar.tabs
                      })),
                      t = Object(u.b)();
                  return Object(ae.jsx)("section", {
                      className: "navbar-container",
                      children: a.map((function(a, n) {
                          return 6 !== n ? Object(ae.jsxs)("div", {
                              className: n === e ? "navbar-group active" : "navbar-group",
                              onClick: function() {
                                  return function(a) {
                                      t(an(e === a ? 7 : a))
                                  }(n)
                              },
                              children: [Object(ae.jsx)("img", {
                                  src: a.icon,
                                  alt: a.name,
                                  className: "navbar-group--icon"
                              }), Object(ae.jsx)("div", {
                                  className: "navbar-group--tilte",
                                  children: a.name
                              })]
                          }, n) : Object(ae.jsx)("a", {
                              className: "link",
                              target: "_blank",
                              rel: "noopener noreferrer",
                              type: "image",
                              href: "https://wax.atomichub.io/market?collection_name=farmersworld&order=desc&sort=created&symbol=WAX",
                              children: Object(ae.jsxs)("div", {
                                  className: "navbar-group link",
                                  children: [Object(ae.jsx)("img", {
                                      src: a.icon,
                                      alt: a.name,
                                      className: "navbar-group--icon"
                                  }), Object(ae.jsx)("div", {
                                      className: "navbar-group--tilte",
                                      children: a.name
                                  })]
                              }, n)
                          }, n)
                      }))
                  })
              }
              t(407);
  
              function cn(e) {
                  var a;
                  return Object(ae.jsx)("section", {
                      className: "vertical-carousel-container",
                      children: null === (a = e.data) || void 0 === a ? void 0 : a.map((function(a, t) {
                          return (null === a || void 0 === a ? void 0 : a.img) && Object(ae.jsx)("img", {
                              src: "https://mypinata.cloud/ipfs/" + (null === a || void 0 === a ? void 0 : a.img),
                              alt: t,
                              className: t === e.selected ? "carousel__img--item active" : "carousel__img--item",
                              onClick: function() {
                                  return e.HandleChoose(t)
                              }
                          }, t)
                      }))
                  })
              }
  
              function rn(e) {
                  var a = Object(n.useState)(0),
                      t = Object(l.a)(a, 2),
                      c = t[0],
                      r = t[1];
                  Object(n.useEffect)((function() {
                      var a = setTimeout((function() {
                          ! function() {
                              if (null === e || void 0 === e ? void 0 : e.next_availability) {
                                  var a = 1e3 * (null === e || void 0 === e ? void 0 : e.next_availability) - Date.now();
                                  a <= 0 && (null === e || void 0 === e || e.handleFinish(!0), e.handleStoreMining(!0), a = 0), r(a)
                              }
                          }()
                      }), 100);
                      return function() {
                          clearTimeout(a)
                      }
                  }));
                  var i = Math.floor(c / 36e5) || 0,
                      s = Math.floor(c % 36e5 / 6e4) || 0,
                      d = Math.floor(c / 1e3 - (3600 * i + 60 * s)) || 0,
                      o = (i < 10 ? "0" + i : i) + ":" + (s < 10 ? "0" + s : s) + ":" + (d < 10 ? "0" + d : d);
                  return Object(ae.jsx)("div", {
                      className: "card-container--time",
                      children: o
                  })
              }
              var sn = {
                  Wood: "./img/WOOD-type-icon.svg",
                  Gold: "./img/GOLD-type-icon.svg",
                  Food: "./img/FOOD-type-icon.svg"
              };
  
              function dn(e) {
                  var a, t, c, r, i, s, f, b, m, p, v = Object(u.b)(),
                      g = Object(n.useState)(0),
                      h = Object(l.a)(g, 2),
                      j = h[0],
                      x = h[1],
                      O = Object(n.useState)(!1),
                      k = Object(l.a)(O, 2),
                      w = k[0],
                      y = k[1],
                      A = e.storeMining,
                      C = Object(n.useState)("disabled"),
                      N = Object(l.a)(C, 2),
                      S = N[0],
                      E = N[1],
                      B = parseFloat(null === (a = e.data) || void 0 === a ? void 0 : a.durability) - parseFloat(null === (t = e.data) || void 0 === t ? void 0 : t.current_durability),
                      I = 0 !== B && B / 5 <= e.gold ? "" : "disabled",
                      U = (null === (c = e.data) || void 0 === c ? void 0 : c.current_durability) >= (null === (r = e.data) || void 0 === r ? void 0 : r.durability_consumed) * j,
                      F = e.userEnergy >= (null === (i = e.data) || void 0 === i ? void 0 : i.energy_consumed) * j,
                      D = F ? !0 === S ? U ? "Mine" : "Damaged" : "Countdown" : "No Energy",
                      R = "Mine" === D ? "" : "disabled",
                      q = Object(Gt.useSpring)({
                          width: ((null === (s = e.data) || void 0 === s ? void 0 : s.current_durability) || 0) / ((null === (f = e.data) || void 0 === f ? void 0 : f.durability) || 1) * 165,
                          backgroundColor: "#B06A38",
                          config: {
                              duration: 1e3
                          }
                      });
                  Object(n.useEffect)((function() {
                      var a, t = Math.floor((Math.floor(Date.now()) / 1e3 - e.data.next_availability) / e.data.charged_time);
                      return x(t < 0 ? 0 : t < A ? t + 1 : A), E(1e3 * (null === (a = e.data) || void 0 === a ? void 0 : a.next_availability) < Date.now() || "disabled"),
                      function() {
                          E(!0), y(!1)
                      }
                  }), [e.data.next_availability, S, w, e.data.charged_time, A]);
                  var K = function() {
                      var a = Object(o.a)(d.a.mark((function a() {
                          var t, n, c, r, i, s, o, u, l, f, b, m, p, g, h, j;
                          return d.a.wrap((function(a) {
                              for (;;) switch (a.prev = a.next) {
                                  case 0:
                                      if (a.prev = 0, v(Et(!1)), "disabled" === R) {
                                          a.next = 27;
                                          break
                                      }
                                      return t = Date.now(), a.next = 6, v(Re(e.data.asset_id)).unwrap();
                                  case 6:
                                      if (n = a.sent, c = {
                                          id: t,
                                          content: "Using your ".concat(e.data.template_name, " to mine"),
                                          timeout: 3e4
                                      }, v(Tt(c)), a.prev = 9, null === (null === n || void 0 === n ? void 0 : n.transaction_id)) {
                                          a.next = 18;
                                          break
                                      }
                                      return v(ze()), a.next = 14, v(qe(null === n || void 0 === n ? void 0 : n.transaction_id)).unwrap();
                                  case 14:
                                      m = a.sent, p = (null === (r = m.bonus) || void 0 === r || null === (i = r.act) || void 0 === i || null === (s = i.data) || void 0 === s || null === (o = s.bonus_rewards) || void 0 === o ? void 0 : o.join(", ")) || 0, g = null === (u = m.claim) || void 0 === u || null === (l = u.act) || void 0 === l || null === (f = l.data) || void 0 === f || null === (b = f.rewards) || void 0 === b ? void 0 : b.join(", "), m && (v($("You've just mined " + g + " and Membership Bonus: " + (p || 0))), v(_(!0)), v(St(!0)), v(Mt(t)));
                                  case 18:
                                      a.next = 25;
                                      break;
                                  case 20:
                                      a.prev = 20, a.t0 = a.
                                      catch (9), v($("Your got your rewards!")), v(Mt(t)), v(St(!0));
                                  case 25:
                                      a.next = 29;
                                      break;
                                  case 27:
                                      !0 !== S ? v($("".concat(e.data.template_name, " is being used!"))) : (null === (h = e.data) || void 0 === h ? void 0 : h.current_durability) >= (null === (j = e.data) || void 0 === j ? void 0 : j.durability_consumed) ? v($("Your ".concat(e.data.template_name, " is too low to continue"))) : v($("You don't have enough energy to mine use this tool.")), v(_(!0));
                                  case 29:
                                      a.next = 35;
                                      break;
                                  case 31:
                                      a.prev = 31, a.t1 = a.
                                      catch (0), Rt(a.t1, v, $, _), v(St(!0));
                                  case 35:
                                  case "end":
                                      return a.stop()
                              }
                          }), a, null, [
                              [0, 31],
                              [9, 20]
                          ])
                      })));
                      return function() {
                          return a.apply(this, arguments)
                      }
                  }(), transaction_request = K.getTransaction,
                      V = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              var t, n, c, r, i;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          if (t = Date.now(), a.prev = 1, v(Et(!1)), "disabled" === I) {
                                              a.next = 12;
                                              break
                                          }
                                          return n = {
                                              id: t,
                                              content: "Repairing your ".concat(e.data.template_name),
                                              timeout: 5e3
                                          }, v(Tt(n)), c = e.data.asset_id, r = {
                                              id: c,
                                              lost: B
                                          }, a.next = 10, v(De(r)).unwrap();
                                      case 10:
                                          null !== (null === (i = a.sent) || void 0 === i ? void 0 : i.transaction_id) && (v(Oe(parseFloat(B / 5))), v(Xe(c)));
                                      case 12:
                                          a.next = 17;
                                          break;
                                      case 14:
                                          a.prev = 14, a.t0 = a.
                                          catch (1), Rt(a.t0, v, $, _);
                                      case 17:
                                          return a.prev = 17, v(St(!0)), v(Mt(t)), a.finish(17);
                                      case 21:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [1, 14, 17, 21]
                              ])
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }();
                  return Object(ae.jsxs)("div", {
                      className: "home__card-container",
                      children: [Object(ae.jsxs)("div", {
                          className: "card-section",
                          children: [Object(ae.jsx)("div", {
                              className: "card-img",
                              children: Object(ae.jsx)("img", {
                                  src: "https://mypinata.cloud/ipfs/" + e.data.img,
                                  alt: "card",
                                  className: "card-img--item"
                              })
                          }), Object(ae.jsxs)("div", {
                              className: "card-number",
                              children: [Object(ae.jsx)(Gt.animated.div, {
                                  className: "fill",
                                  style: q
                              }), Object(ae.jsxs)(Gt.animated.div, {
                                  className: "content",
                                  children: [e.data.current_durability || 0, "/ ", e.data.durability || 0]
                              })]
                          })]
                      }), Object(ae.jsxs)("div", {
                          className: "info-section",
                          children: [Object(ae.jsxs)("div", {
                              className: "info-text__section",
                              children: [Object(ae.jsxs)("div", {
                                  className: "info-title",
                                  children: [Object(ae.jsx)("div", {
                                      className: "info-type-icon",
                                      style: {
                                          backgroundImage: "url(".concat(sn[e.data.type], ")")
                                      }
                                  }), Object(ae.jsx)("div", {
                                      className: "info-title-name",
                                      children: e.data.template_name
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-title-level",
                                      children: [j, "/", A]
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "info-content",
                                  children: [Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Rarity:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: e.data.rarity || null
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Reward Rate:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: e.data.reward
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Charge Time:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (b = e.data) || void 0 === b ? void 0 : b.charged_time) / 60 > 60 ? (null === (m = e.data) || void 0 === m ? void 0 : m.charged_time) / 60 / 60 + " hours" : (null === (p = e.data) || void 0 === p ? void 0 : p.charged_time) / 60 + " mins" || !1
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Energy Consumed:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: e.data.energy_consumed || 0
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Durability Consumed:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: e.data.durability_consumed || null
                                      })]
                                  })]
                              })]
                          }), Object(ae.jsx)("div", {
                              className: "info-time",
                              children: Object(ae.jsx)(rn, {
                                  next_availability: e.data.next_availability + e.data.charged_time * (j < A && j),
                                  handleFinish: E,
                                  charged_time: e.data.charged_time,
                                  storeMiningMaximum: A,
                                  handleStoreMining: y
                              })
                          }), Object(ae.jsxs)("div", {
                              className: "home-card-button__group",
                              children: [Object(ae.jsxs)("div", {
                                  className: "tooltip home-card-button--item",
                                  children: [Object(ae.jsx)(te, {
                                      className: "repair-btn",
                                      text: D,
                                      atr: "semi-short",
                                      isDisabled: R,
                                      wrapperClassname: "set-height",
                                      handleClick: K
                                  }), !U && Object(ae.jsxs)("span", {
                                      className: "tooltiptext tooltip-bottom",
                                      children: [Object(ae.jsx)("i", {
                                          className: "arrow-up"
                                      }), "Need", " ", (null === e || void 0 === e ? void 0 : e.data.durability_consumed) * j - (null === e || void 0 === e ? void 0 : e.data.current_durability), " ", "durability consumed to mine.", " "]
                                  }), !F && Object(ae.jsxs)("span", {
                                      className: "tooltiptext tooltip-bottom",
                                      children: [Object(ae.jsx)("i", {
                                          className: "arrow-up"
                                      }), "Need", " ", e.data.energy_consumed * j - e.userEnergy, " energy to mine.", " "]
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "tooltip home-card-button--item",
                                  children: [Object(ae.jsx)(te, {
                                      className: "repair-btn",
                                      text: "Repair",
                                      atr: "semi-short",
                                      isDisabled: I,
                                      wrapperClassname: "set-height",
                                      handleClick: V
                                  }), "disabled" !== I && Object(ae.jsxs)("span", {
                                      className: "tooltiptext tooltip-bottom",
                                      children: [Object(ae.jsx)("i", {
                                          className: "arrow-up"
                                      }), "You need ", B / 5, " Golds to repair"]
                                  })]
                              })]
                          })]
                      })]
                  })
              }
  
              function on(e) {
                  var a = Object(n.useState)(0),
                      t = Object(l.a)(a, 2),
                      c = t[0],
                      r = t[1];
                  Object(n.useEffect)((function() {
                      var a = setTimeout((function() {
                          ! function() {
                              if (null === e || void 0 === e ? void 0 : e.next_availability) {
                                  var a = 1e3 * (null === e || void 0 === e ? void 0 : e.next_availability) - Date.now();
                                  a <= 0 && (null === e || void 0 === e || e.handleFinish(!0), a = 0), r(a)
                              }
                          }()
                      }), 100);
                      return function() {
                          clearTimeout(a)
                      }
                  }));
                  var i = Math.floor(c / 36e5) || 0,
                      s = Math.floor(c % 36e5 / 6e4) || 0,
                      d = Math.floor(c / 1e3 - (3600 * i + 60 * s)) || 0,
                      o = (i < 10 ? "0" + i : i) + ":" + (s < 10 ? "0" + s : s) + ":" + (d < 10 ? "0" + d : d);
                  return Object(ae.jsx)("div", {
                      className: "card-container--time",
                      children: o
                  })
              }
              var un = function(e) {
                  var a = e.HandleCancel,
                      t = e.type,
                      r = e.name,
                      s = e.asset_id,
                      l = Object(u.b)(),
                      f = Object(n.useRef)(null),
                      b = function(e) {
                          f.current && !f.current.contains(e.target) && a()
                      };
                  Object(n.useEffect)((function() {
                      return document.addEventListener("click", b, !0),
                      function() {
                          document.removeEventListener("click", b, !0)
                      }
                  }));
                  var m = function() {
                      var e = Object(o.a)(d.a.mark((function e() {
                          var n, c;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      return e.prev = 0, e.next = 3, l(Fe(s)).unwrap();
                                  case 3:
                                      n = Date.now(), c = {
                                          id: n,
                                          content: "Removing your ".concat(r),
                                          timeout: 5e3
                                      }, l(Tt(c)), t && l(Ut(0)), a(), e.next = 13;
                                      break;
                                  case 10:
                                      e.prev = 10, e.t0 = e.
                                      catch (0), Rt(e.t0, l, $, _);
                                  case 13:
                                      return e.prev = 13, l(Nt(!0)), e.finish(13);
                                  case 16:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [0, 10, 13, 16]
                          ])
                      })));
                      return function() {
                          return e.apply(this, arguments)
                      }
                  }();
                  return i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "modal-wrapper",
                          tabIndex: -1,
                          role: "dialog",
                          children: Object(ae.jsxs)("div", {
                              style: {
                                  backgroundImage: "url(./img/big-board.png)"
                              },
                              className: "modal",
                              ref: f,
                              children: [Object(ae.jsxs)("div", {
                                  className: "modal-content mid",
                                  children: ["Do you want to remove this ", r, "? All your hard work on this ", r, " ", "will be lost."]
                              }), Object(ae.jsxs)("div", {
                                  className: "modal__button-group token",
                                  children: [Object(ae.jsx)(te, {
                                      type: "button",
                                      atr: "short",
                                      "data-dismiss": "modal",
                                      text: "Accept",
                                      handleClick: m
                                  }), Object(ae.jsx)(te, {
                                      type: "button",
                                      atr: "short",
                                      "data-dismiss": "modal",
                                      text: "Cancel",
                                      handleClick: a
                                  })]
                              })]
                          })
                      })
                  }), document.body)
              };
  
              function ln(e) {
                  return e + 86400 > Date.now() / 1e3
              }
  
              function fn(e) {
                  var a, t, c, r, i, s, f, b, m, p, v, g, h, j, x, O, k, w, y, A, C, N, S, E, B, I, U, F, D, R = Object(u.b)(),
                      q = e.userEnergy >= (null === (a = e.data) || void 0 === a ? void 0 : a.energy_consumed),
                      K = Object(n.useState)("disabled"),
                      V = Object(l.a)(K, 2),
                      Q = V[0],
                      M = V[1],
                      T = Object(n.useState)((null === (t = e.data) || void 0 === t ? void 0 : t.day_claims_at.filter(ln)) || []),
                      L = Object(l.a)(T, 2),
                      X = L[0],
                      z = L[1],
                      W = Object(n.useState)(!1),
                      Y = Object(l.a)(W, 2),
                      J = Y[0],
                      P = Y[1],
                      H = Object(n.useState)(0),
                      G = Object(l.a)(H, 2),
                      Z = G[0],
                      ee = G[1],
                      ne = Object(u.c)((function(e) {
                          return ut(e.atomic, "318606")
                      })),
                      ce = e.data.required_claims === e.data.times_claimed && (null === ne || void 0 === ne ? void 0 : ne.length) > 0 || !e.data.name.includes("Baby Calf") && !e.data.name.includes("Egg"),
                      re = Object(u.c)((function(a) {
                          return ut(a.atomic, e.data.consumed_card + "")
                      })),
                      ie = Object(u.c)((function(a) {
                          return Ja(a.foods, e.data.reward_card)
                      })),
                      se = re && re.length > 0 || (e.data.name.includes("Baby Calf") || e.data.name.includes("Egg")) && ce,
                      de = (null === (c = e.data) || void 0 === c ? void 0 : c.required_claims) === (null === (r = e.data) || void 0 === r ? void 0 : r.times_claimed),
                      oe = (null === (i = e.data) || void 0 === i || null === (s = i.name) || void 0 === s ? void 0 : s.includes("Egg")) ? "Hatch" : "Feed",
                      ue = !0 === Q ? se || e.data.consumed_card < 1 ? q ? de ? ce ? "Evolve" : "No Barley" : oe : "No Energy" : "No Food" : "Countdown",
                      le = Date.now() - 1e3 * Z >= 0 && ue === oe || "Evolve" === ue ? "" : "disabled",
                      fe = e.userEnergy >= 200 ? "Remove" : "No Energy",
                      be = "Remove" === fe && !0 === Q || "disabled",
                      me = Object(Gt.useSpring)({
                          width: ((null === (f = e.data) || void 0 === f ? void 0 : f.times_claimed) || 0) / ((null === (b = e.data) || void 0 === b ? void 0 : b.required_claims) || 1) * 165,
                          backgroundColor: "#B06A38",
                          config: {
                              duration: 1e3
                          }
                      });
                  Object(n.useEffect)((function() {
                      var a;
                      return X.length === (null === (a = e.data) || void 0 === a ? void 0 : a.daily_claim_limit) ? ee(X[0] + 86400) : ee(0),
                      function() {
                          M(!0)
                      }
                  }), [e.data.next_availability, null === (m = e.data) || void 0 === m ? void 0 : m.daily_claim_limit, X]), Object(n.useEffect)((function() {
                      var a;
                      z(null === (a = e.data) || void 0 === a ? void 0 : a.day_claims_at.filter(ln))
                  }), [null === (p = e.data) || void 0 === p ? void 0 : p.day_claims_at]);
                  var pe = function() {
                      var a = Object(o.a)(d.a.mark((function a() {
                          var t, n, c, r, i, s, o, u;
                          return d.a.wrap((function(a) {
                              for (;;) switch (a.prev = a.next) {
                                  case 0:
                                      if (t = Date.now(), R(Et(!1)), n = {
                                          id: t,
                                          content: "".concat(oe, "ing your ").concat(e.data.name),
                                          timeout: 3e4
                                      }, c = e.data.asset_id, a.prev = 4, r = {}, "disabled" === le) {
                                          a.next = 46;
                                          break
                                      }
                                      if (R(Tt(n)), !(e.data.consumed_card > 0)) {
                                          a.next = 26;
                                          break
                                      }
                                      if (!ce) {
                                          a.next = 21;
                                          break
                                      }
                                      if (!e.data.name.includes("Calf (Male)") || !de) {
                                          a.next = 16;
                                          break
                                      }
                                      return a.next = 13, R(ga(c)).unwrap();
                                  case 13:
                                      r = a.sent, a.next = 19;
                                      break;
                                  case 16:
                                      return a.next = 18, R(va({
                                          animal: c,
                                          food: ne
                                      })).unwrap();
                                  case 18:
                                      r = a.sent;
                                  case 19:
                                      a.next = 24;
                                      break;
                                  case 21:
                                      return a.next = 23, R(va({
                                          animal: c,
                                          food: re
                                      })).unwrap();
                                  case 23:
                                      r = a.sent;
                                  case 24:
                                      a.next = 35;
                                      break;
                                  case 26:
                                      if (!ce) {
                                          a.next = 32;
                                          break
                                      }
                                      return a.next = 29, R(va({
                                          animal: c,
                                          food: ne
                                      })).unwrap();
                                  case 29:
                                      r = a.sent, a.next = 35;
                                      break;
                                  case 32:
                                      return a.next = 34, R(ga(c)).unwrap();
                                  case 34:
                                      r = a.sent;
                                  case 35:
                                      if (null === (null === (i = r) || void 0 === i ? void 0 : i.transaction_id)) {
                                          a.next = 46;
                                          break
                                      }
                                      if (R(wa(c)), R(we(e.data.energy_consumed)), s = {
                                          id: t,
                                          content: "".concat(oe, "ing your ").concat(e.data.name, " successfully"),
                                          timeout: 5e3
                                      }, R(Tt(s)), !(e.data.times_claimed + 1 >= e.data.required_claims && e.data.reward_card)) {
                                          a.next = 46;
                                          break
                                      }
                                      return a.next = 43, R(ha(r.transaction_id)).unwrap();
                                  case 43:
                                      (o = a.sent).claim ? (u = "You've just harvested " + o.claim.quantity + " " + ie.name, R($(u))) : R($("You got your rewards")), R(_(!0));
                                  case 46:
                                      a.next = 51;
                                      break;
                                  case 48:
                                      a.prev = 48, a.t0 = a.
                                      catch (4), Rt(a.t0, R, $, _);
                                  case 51:
                                      return a.prev = 51, R(Mt(t)), R(St(!0)), a.finish(51);
                                  case 55:
                                  case "end":
                                      return a.stop()
                              }
                          }), a, null, [
                              [4, 48, 51, 55]
                          ])
                      })));
                      return function() {
                          return a.apply(this, arguments)
                      }
                  }();
                  return Object(ae.jsxs)("div", {
                      className: "home__card-container",
                      children: [!0 === J && Object(ae.jsx)(un, {
                          HandleCancel: function() {
                              return P(!1)
                          },
                          asset_id: e.data.asset_id,
                          name: e.data.name
                      }), Object(ae.jsxs)("div", {
                          className: "card-section",
                          children: [Object(ae.jsx)("div", {
                              className: "card-img",
                              children: (null === (v = e.data) || void 0 === v ? void 0 : v.img) && Object(ae.jsx)("img", {
                                  src: "https://mypinata.cloud/ipfs/" + (null === (g = e.data) || void 0 === g ? void 0 : g.img),
                                  alt: "card",
                                  className: "card-img--item"
                              })
                          }), Object(ae.jsxs)("div", {
                              className: "card-number",
                              children: [Object(ae.jsx)(Gt.animated.div, {
                                  className: "fill",
                                  style: me
                              }), Object(ae.jsxs)(Gt.animated.div, {
                                  className: "content",
                                  children: [(null === (h = e.data) || void 0 === h ? void 0 : h.times_claimed) || 0, "/ ", (null === (j = e.data) || void 0 === j ? void 0 : j.required_claims) || 0]
                              })]
                          })]
                      }), Object(ae.jsxs)("div", {
                          className: "info-section",
                          children: [Object(ae.jsxs)("div", {
                              className: "info-text__section",
                              children: [Object(ae.jsxs)("div", {
                                  className: "info-title",
                                  children: [Object(ae.jsx)("div", {
                                      className: "info-type-icon",
                                      style: {
                                          backgroundImage: "url(/img/livestock-icon.svg)"
                                      }
                                  }), Object(ae.jsx)("div", {
                                      className: "info-title-name",
                                      children: null === (x = e.data) || void 0 === x ? void 0 : x.name
                                  }), (null === (O = e.data) || void 0 === O ? void 0 : O.daily_claim_limit) && (null === (k = e.data) || void 0 === k ? void 0 : k.daily_claim_limit) > 0 && Object(ae.jsxs)("div", {
                                      className: "info-title-level tooltip",
                                      children: [X.length || 0, "/", null === (w = e.data) || void 0 === w ? void 0 : w.daily_claim_limit, X.length === (null === (y = e.data) || void 0 === y ? void 0 : y.daily_claim_limit) && Object(ae.jsx)("span", {
                                          className: "tooltiptext tooltip-bottom",
                                          children: Object(ae.jsx)(on, {
                                              next_availability: Z,
                                              handleFinish: M
                                          })
                                      })]
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "info-content",
                                  children: [Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Reward:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === ie || void 0 === ie ? void 0 : ie.name) || "None"
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Charge Time:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (A = e.data) || void 0 === A ? void 0 : A.charge_time) / 60 > 60 ? ((null === (C = e.data) || void 0 === C ? void 0 : C.charge_time) / 3600).toFixed(2) + " hours" : ((null === (N = e.data) || void 0 === N ? void 0 : N.charge_time) / 60).toFixed(2) + " mins" || !1
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Daily Claim Limit", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (S = e.data) || void 0 === S ? void 0 : S.daily_claim_limit) || 0
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Required ", oe, Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (E = e.data) || void 0 === E ? void 0 : E.required_claims) || 0
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Energy Consumed:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (B = e.data) || void 0 === B ? void 0 : B.energy_consumed) || 0
                                      })]
                                  })]
                              })]
                          }), Object(ae.jsx)("div", {
                              className: "info-time",
                              children: Object(ae.jsx)(on, {
                                  next_availability: null === (I = e.data) || void 0 === I ? void 0 : I.next_availability,
                                  handleFinish: M
                              })
                          }), Object(ae.jsxs)("div", {
                              className: "home-card-button__group",
                              children: [(null === (U = e.data) || void 0 === U ? void 0 : U.required_claims) > 0 && Object(ae.jsxs)("div", {
                                  className: "tooltip home-card-button--item",
                                  children: [Object(ae.jsx)(te, {
                                      className: "repair-btn",
                                      text: ue,
                                      atr: "semi-short",
                                      isDisabled: le,
                                      wrapperClassname: "set-height",
                                      handleClick: pe
                                  }), !q && Object(ae.jsxs)("span", {
                                      className: "tooltiptext tooltip-bottom",
                                      children: [Object(ae.jsx)("i", {
                                          className: "arrow-up"
                                      }), "Need ", null === (F = e.data) || void 0 === F ? void 0 : F.energy_consumed, " ", "energy to ", oe]
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "tooltip home-card-button--item",
                                  children: [Object(ae.jsx)(te, {
                                      className: "repair-btn",
                                      text: fe,
                                      atr: "semi-short",
                                      isDisabled: be,
                                      wrapperClassname: "set-height",
                                      handleClick: function() {
                                          P(!0)
                                      }
                                  }), !q && Object(ae.jsxs)("span", {
                                      className: "tooltiptext tooltip-bottom",
                                      children: [Object(ae.jsx)("i", {
                                          className: "arrow-up"
                                      }), "Need ", null === (D = e.data) || void 0 === D ? void 0 : D.energy_consumed, " ", "energy to feed", " "]
                                  })]
                              })]
                          })]
                      })]
                  })
              }
              var bn = {
                  Wood: "./img/WOOD-type-icon.svg",
                  Gold: "./img/GOLD-type-icon.svg",
                  Food: "./img/FOOD-type-icon.svg"
              };
  
              function mn(e) {
                  var a, t, c, r, i = Object(u.b)(),
                      s = Object(n.useState)("disabled"),
                      f = Object(l.a)(s, 2),
                      b = f[0],
                      m = f[1],
                      p = e.userEnergy >= 100 ? !0 === b ? "Claim" : "Countdown" : "No Energy",
                      v = "Claim" === p || "disabled";
                  Object(n.useEffect)((function() {
                      var a;
                      return m(1e3 * (null === (a = e.data) || void 0 === a ? void 0 : a.next_availability) < Date.now() || "disabled"),
                      function() {
                          m(!0)
                      }
                  }), [e.data.next_availability]);
                  var g = function() {
                      var a = Object(o.a)(d.a.mark((function a() {
                          var t, n, c, r, s, o, u, l, f, m, p, g, h;
                          return d.a.wrap((function(a) {
                              for (;;) switch (a.prev = a.next) {
                                  case 0:
                                      if (a.prev = 0, i(Et(!1)), "disabled" === v) {
                                          a.next = 28;
                                          break
                                      }
                                      return a.next = 5, i(aa(e.data.asset_id)).unwrap();
                                  case 5:
                                      if (t = a.sent, n = Date.now(), a.prev = 7, null === (null === t || void 0 === t ? void 0 : t.transaction_id)) {
                                          a.next = 19;
                                          break
                                      }
                                      return m = {
                                          id: n,
                                          content: "Using your ".concat(e.data.name, " to get rewards"),
                                          timeout: 3e4
                                      }, i(Tt(m)), a.next = 13, i(ta(null === t || void 0 === t ? void 0 : t.transaction_id)).unwrap();
                                  case 13:
                                      p = a.sent, g = null === (c = p.bonus) || void 0 === c || null === (r = c.act) || void 0 === r || null === (s = r.data) || void 0 === s ? void 0 : s.bonus_rewards.join(", "), h = null === (o = p.amount) || void 0 === o || null === (u = o.act) || void 0 === u || null === (l = u.data) || void 0 === l || null === (f = l.data) || void 0 === f ? void 0 : f.amounts.join(", "), p && (i($("You've just got " + h + " Farmer Coin.Membership Bonus: " + (g || 0))), i(_(!0))), i(Mt(n)), i(St(!0));
                                  case 19:
                                      a.next = 26;
                                      break;
                                  case 21:
                                      a.prev = 21, a.t0 = a.
                                      catch (7), i($("You got your rewards!")), i(Mt(n)), i(St(!0));
                                  case 26:
                                      a.next = 30;
                                      break;
                                  case 28:
                                      i($(!0 === b ? "Don't push to hard! Try again later" : "Your membership card is under countdown. Try again later")), i(_(!0));
                                  case 30:
                                      a.next = 37;
                                      break;
                                  case 32:
                                      throw a.prev = 32, a.t1 = a.
                                      catch (0), Rt(a.t1, i, $, _), i(St(!0)), a.t1;
                                  case 37:
                                  case "end":
                                      return a.stop()
                              }
                          }), a, null, [
                              [0, 32],
                              [7, 21]
                          ])
                      })));
                      return function() {
                          return a.apply(this, arguments)
                      }
                  }();
                  return console.log("props membership", e), Object(ae.jsxs)("div", {
                      className: "home__card-container",
                      children: [Object(ae.jsx)("div", {
                          className: "card-section",
                          children: Object(ae.jsx)("div", {
                              className: "card-img",
                              children: Object(ae.jsx)("img", {
                                  src: "https://mypinata.cloud/ipfs/" + e.data.img,
                                  alt: "card",
                                  className: "card-img--item"
                              })
                          })
                      }), Object(ae.jsxs)("div", {
                          className: "info-section",
                          children: [Object(ae.jsxs)("div", {
                              className: "info-text__section",
                              children: [Object(ae.jsxs)("div", {
                                  className: "info-title",
                                  children: [Object(ae.jsx)("div", {
                                      className: "info-type-icon",
                                      style: {
                                          backgroundImage: "url(".concat(bn[e.data.type], ")")
                                      }
                                  }), Object(ae.jsx)("div", {
                                      className: "info-title-name",
                                      children: e.data.name
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "info-content",
                                  children: [Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Extra Slots:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: e.data.additional_slots || 0
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Extra Energy:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: e.data.additional_energy || 0
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Stored Mining:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: e.data.saved_claims || 0
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Reward Rate:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: e.data.rewards_rate
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Charge Time:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (a = e.data) || void 0 === a ? void 0 : a.charged_time) / 60 > 60 ? (null === (t = e.data) || void 0 === t ? void 0 : t.charged_time) / 60 / 60 + " hours" : (null === (c = e.data) || void 0 === c ? void 0 : c.charged_time) / 60 + " mins" || !1
                                      })]
                                  })]
                              })]
                          }), Object(ae.jsx)("div", {
                              className: "info-time",
                              children: Object(ae.jsx)(on, {
                                  next_availability: null === (r = e.data) || void 0 === r ? void 0 : r.next_availability,
                                  handleFinish: m
                              })
                          }), Object(ae.jsx)("div", {
                              className: "home-card-button__group",
                              children: Object(ae.jsx)("div", {
                                  className: " home-card-button--item",
                                  children: Object(ae.jsx)(te, {
                                      className: "repair-btn",
                                      text: p,
                                      atr: "semi-short",
                                      isDisabled: v,
                                      wrapperClassname: "set-height",
                                      handleClick: g
                                  })
                              })
                          })]
                      })]
                  })
              }
  
              function pn(e) {
                  var a, t, c, r, i, s, f, b, m, p, v, g, h, j, x, O, k, w, y, A = Object(u.b)(),
                      C = Object(n.useState)("disabled"),
                      N = Object(l.a)(C, 2),
                      S = N[0],
                      E = N[1],
                      B = Object(n.useState)(!1),
                      I = Object(l.a)(B, 2),
                      U = I[0],
                      F = I[1],
                      D = e.userEnergy >= (null === (a = e.data) || void 0 === a ? void 0 : a.energy_consumed),
                      R = D && !0 === S || "disabled",
                      q = Object(u.c)((function(a) {
                          return Ja(a.foods, e.data.reward_card)
                      })),
                      K = !0 === S ? D ? "Water" : "No Energy" : "CountDown",
                      V = e.userEnergy >= 200 ? "Remove" : "No Energy",
                      Q = "Remove" === V && !0 === S || "disabled",
                      M = parseInt((Date.now() / 1e3 - e.data.next_availability) / (e.data.miss_claim_limit * e.data.charge_time));
                  Object(n.useEffect)((function() {
                      var a;
                      return E(1e3 * (null === (a = e.data) || void 0 === a ? void 0 : a.next_availability) < Date.now() || "disabled"),
                      function() {
                          E(!0)
                      }
                  }), [e.data.next_availability]);
                  var T = Object(Gt.useSpring)({
                      width: ((null === (t = e.data) || void 0 === t ? void 0 : t.times_claimed) || 0) / ((null === (c = e.data) || void 0 === c ? void 0 : c.required_claims) || 1) * 165,
                      backgroundColor: "#B06A38",
                      config: {
                          duration: 1e3
                      }
                  }),
                      L = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              var t, n, c, r, i, s;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          if (t = Date.now(), a.prev = 1, A(Et(!1)), "disabled" === R) {
                                              a.next = 20;
                                              break
                                          }
                                          return n = {
                                              id: t,
                                              content: "Watering your ".concat(e.data.name, "."),
                                              timeout: 3e4
                                          }, A(Tt(n)), a.next = 8, A(Ua(e.data.asset_id)).unwrap();
                                      case 8:
                                          if (!(c = a.sent).transaction_id) {
                                              a.next = 20;
                                              break
                                          }
                                          if (A(Ra(e.data.asset_id)), A(we(e.data.energy_consumed)), r = {
                                              id: t,
                                              content: "Watering your ".concat(e.data.name, " successfully"),
                                              timeout: 5e3
                                          }, A(Tt(r)), !(e.data.times_claimed + 1 - M >= e.data.required_claims)) {
                                              a.next = 20;
                                              break
                                          }
                                          return a.next = 17, A(Ia(c.transaction_id)).unwrap();
                                      case 17:
                                          (i = a.sent).claim ? (s = "You've just harvested " + i.claim.quantity + " " + q.name, A($(s))) : A($("You got your rewards")), A(_(!0));
                                      case 20:
                                          a.next = 25;
                                          break;
                                      case 22:
                                          a.prev = 22, a.t0 = a.
                                          catch (1), Rt(a.t0, A, $, _);
                                      case 25:
                                          return a.prev = 25, A(St(!0)), A(Mt(t)), a.finish(25);
                                      case 29:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [1, 22, 25, 29]
                              ])
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }();
                  return Object(ae.jsxs)("div", {
                      className: "home__card-container",
                      children: [!0 === U && Object(ae.jsx)(un, {
                          HandleCancel: function() {
                              return F(!1)
                          },
                          name: e.data.name,
                          asset_id: e.data.asset_id
                      }), Object(ae.jsxs)("div", {
                          className: "card-section",
                          children: [Object(ae.jsx)("div", {
                              className: "card-img",
                              children: (null === (r = e.data) || void 0 === r ? void 0 : r.img) && Object(ae.jsx)("img", {
                                  src: "https://mypinata.cloud/ipfs/" + (null === (i = e.data) || void 0 === i ? void 0 : i.img),
                                  alt: "card",
                                  className: "card-img--item"
                              })
                          }), Object(ae.jsxs)("div", {
                              className: "card-number",
                              children: [Object(ae.jsx)(Gt.animated.div, {
                                  className: "fill",
                                  style: T
                              }), Object(ae.jsxs)(Gt.animated.div, {
                                  className: "content",
                                  children: [(null === (s = e.data) || void 0 === s ? void 0 : s.times_claimed) || 0, "/ ", (null === (f = e.data) || void 0 === f ? void 0 : f.required_claims) || 0]
                              })]
                          })]
                      }), Object(ae.jsxs)("div", {
                          className: "info-section",
                          children: [Object(ae.jsxs)("div", {
                              className: "info-text__section",
                              children: [Object(ae.jsxs)("div", {
                                  className: "info-title",
                                  children: [Object(ae.jsx)("div", {
                                      className: "info-type-icon",
                                      style: {
                                          backgroundImage: "url(/img/crop-icon.svg)"
                                      }
                                  }), Object(ae.jsx)("div", {
                                      className: "info-title-name",
                                      children: null === (b = e.data) || void 0 === b ? void 0 : b.name
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-title-level",
                                      children: ["Missed: ", M || 0]
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "info-content",
                                  children: [(null === (m = e.data) || void 0 === m ? void 0 : m.rarity) && Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Rarity:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (p = e.data) || void 0 === p ? void 0 : p.rarity) || null
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Reward", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: q.name
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Charge Time:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (v = e.data) || void 0 === v ? void 0 : v.charge_time) / 60 > 60 ? ((null === (g = e.data) || void 0 === g ? void 0 : g.charge_time) / 3600).toFixed(2) + " hours" : ((null === (h = e.data) || void 0 === h ? void 0 : h.charge_time) / 60).toFixed(2) + " mins" || !1
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Miss Claim Limit", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (j = e.data) || void 0 === j ? void 0 : j.miss_claim_limit) || 0
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Required Claim", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (x = e.data) || void 0 === x ? void 0 : x.required_claims) || 0
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "info-label",
                                      children: ["Consumed Energy:", Object(ae.jsx)("div", {
                                          className: "info-description",
                                          children: (null === (O = e.data) || void 0 === O ? void 0 : O.energy_consumed) || 0
                                      })]
                                  })]
                              })]
                          }), Object(ae.jsx)("div", {
                              className: "info-time",
                              children: Object(ae.jsx)(on, {
                                  next_availability: null === (k = e.data) || void 0 === k ? void 0 : k.next_availability,
                                  handleFinish: E
                              })
                          }), Object(ae.jsxs)("div", {
                              className: "home-card-button__group",
                              children: [Object(ae.jsxs)("div", {
                                  className: "tooltip home-card-button--item",
                                  children: [Object(ae.jsx)(te, {
                                      className: "repair-btn",
                                      text: K,
                                      atr: "semi-short",
                                      isDisabled: R,
                                      wrapperClassname: "set-height",
                                      handleClick: L
                                  }), !D && Object(ae.jsxs)("span", {
                                      className: "tooltiptext tooltip-bottom",
                                      children: [Object(ae.jsx)("i", {
                                          className: "arrow-up"
                                      }), "Need ", null === (w = e.data) || void 0 === w ? void 0 : w.energy_consumed, " ", "energy to mine", " "]
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "tooltip home-card-button--item",
                                  children: [Object(ae.jsx)(te, {
                                      className: "repair-btn",
                                      text: V,
                                      atr: "semi-short",
                                      isDisabled: Q,
                                      wrapperClassname: "set-height",
                                      handleClick: function() {
                                          F(!0)
                                      }
                                  }), !D && Object(ae.jsxs)("span", {
                                      className: "tooltiptext tooltip-bottom",
                                      children: [Object(ae.jsx)("i", {
                                          className: "arrow-up"
                                      }), "Need ", null === (y = e.data) || void 0 === y ? void 0 : y.energy_consumed, " ", "energy to mine", " "]
                                  })]
                              })]
                          })]
                      })]
                  })
              }
  
              function vn(e) {
                  var a, t, n, c, r, i;
                  return (null === (a = e.data) || void 0 === a ? void 0 : a.schema_name) && "Gold" === (null === e || void 0 === e ? void 0 : e.data.type) ? Object(ae.jsx)(dn, {
                      data: e.data,
                      storeMining: e.storeMining[0] + 1,
                      userEnergy: e.userEnergy,
                      gold: e.gold
                  }) : (null === (t = e.data) || void 0 === t ? void 0 : t.schema_name) && "Food" === (null === e || void 0 === e ? void 0 : e.data.type) ? Object(ae.jsx)(dn, {
                      data: e.data,
                      storeMining: e.storeMining[1] + 1,
                      userEnergy: e.userEnergy,
                      gold: e.gold
                  }) : (null === (n = e.data) || void 0 === n ? void 0 : n.schema_name) && "Wood" === (null === e || void 0 === e ? void 0 : e.data.type) ? Object(ae.jsx)(dn, {
                      data: e.data,
                      storeMining: e.storeMining[2] + 1,
                      userEnergy: e.userEnergy,
                      gold: e.gold
                  }) : (null === (c = e.data) || void 0 === c ? void 0 : c.gender) >= 0 ? Object(ae.jsx)(fn, Object(p.a)({}, e)) : (null === (r = e.data) || void 0 === r ? void 0 : r.miss_claim_limit) ? Object(ae.jsx)(pn, Object(p.a)({}, e)) : (null === (i = e.data) || void 0 === i ? void 0 : i.saved_claims) ? Object(ae.jsx)(mn, Object(p.a)({}, e)) : null
              }
  
              function gn() {
                  var e = Object(u.b)();
                  return Object(ae.jsx)("section", {
                      className: "empty-container",
                      children: Object(ae.jsx)("div", {
                          className: "empty-content",
                          children: Object(ae.jsxs)("div", {
                              className: "empty-content-wrapper",
                              children: [Object(ae.jsx)("img", {
                                  src: "./img/noitems.png",
                                  alt: "Go For Cardssssssss"
                              }), Object(ae.jsx)("div", {
                                  className: "empty-text",
                                  children: "You need NFT game cards to start minning !"
                              }), Object(ae.jsxs)("div", {
                                  className: "empty-group__button",
                                  children: [Object(ae.jsx)("a", {
                                      className: "link",
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      href: "https://wax.atomichub.io/market?collection_name=farmersworld&order=desc&sort=created&symbol=WAX",
                                      children: Object(ae.jsx)(te, {
                                          text: "Go to Atomic",
                                          atr: "semi-long ",
                                          wrapperClassname: "full-width",
                                          handleClick: function() {
                                              return e(an(1))
                                          }
                                      })
                                  }), Object(ae.jsx)(te, {
                                      text: "Go to Smithy",
                                      atr: "semi-long ",
                                      wrapperClassname: "full-width",
                                      handleClick: function() {
                                          return e(an(2))
                                      }
                                  })]
                              })]
                          })
                      })
                  })
              }
  
              function hn() {
                  var e = Object(u.c)((function(e) {
                      return e.game.selectedMap
                  })),
                      a = Object(u.c)((function(e) {
                          return e.tools.usingItems
                      })),
                      t = Object(u.c)((function(e) {
                          return e.badge.usingBadges
                      })),
                      n = Object(u.c)((function(e) {
                          return e.animals.cowUsing
                      })),
                      c = Object(u.c)((function(e) {
                          return e.animals.chickenUsing
                      })),
                      r = Object(u.c)((function(e) {
                          return e.plants.plantsUsing
                      })),
                      i = Object(u.c)((function(e) {
                          return e.user.user.energy
                      })),
                      s = Object(u.c)((function(e) {
                          return e.user.balances.gold
                      })),
                      d = Object(u.c)((function(e) {
                          return e.tools.selectedUsingCard
                      })),
                      o = Object(u.b)(),
                      l = function() {
                          switch (e) {
                              case 0:
                                  return null === a || void 0 === a ? void 0 : a.concat(t);
                              case 1:
                                  return c;
                              case 2:
                                  return r;
                              case 3:
                                  return n
                          }
                      }(),
                      f = d,
                      b = (null === l || void 0 === l ? void 0 : l.length) > 0,
                      m = [l.reduce((function(e, a) {
                          return a.saved_claims && "Gold" === a.type ? e + a.saved_claims : e
                      }), 0), l.reduce((function(e, a) {
                          return a.saved_claims && "Food" === a.type && (e += a.saved_claims), e
                      }), 0), l.reduce((function(e, a) {
                          return a.saved_claims && "Wood" === a.type && (e += a.saved_claims), e
                      }), 0)];
                  return b ? Object(ae.jsx)("section", {
                      className: "home-container",
                      children: Object(ae.jsxs)("div", {
                          className: "home-content",
                          children: [Object(ae.jsx)(cn, {
                              data: l,
                              selected: f,
                              HandleChoose: function(e) {
                                  o(Le(e))
                              }
                          }), Object(ae.jsx)(vn, {
                              data: l[f],
                              userEnergy: i,
                              gold: s,
                              storeMining: m
                          })]
                      })
                  }) : Object(ae.jsx)(gn, {})
              }
              t(408);
              var jn = Object(f.b)("pack/openPack", function() {
                  var e = Object(o.a)(d.a.mark((function e(a) {
                      var t, n, c, r;
                      return d.a.wrap((function(e) {
                          for (;;) switch (e.prev = e.next) {
                              case 0:
                                  t = 0;
                              case 1:
                                  if (!(t < 3)) {
                                      e.next = 17;
                                      break
                                  }
                                  return e.prev = 2, e.next = 5, K.openPack(a);
                              case 5:
                                  return n = e.sent, e.abrupt("return", n);
                              case 9:
                                  if (e.prev = 9, e.t0 = e.
                                      catch (2), !(((null === e.t0 || void 0 === e.t0 || null === (c = e.t0.message) || void 0 === c ? void 0 : c.includes("undefined")) || (null === e.t0 || void 0 === e.t0 || null === (r = e.t0.message) || void 0 === r ? void 0 : r.includes("Failed to fetch"))) && t < 2)) {
                                      e.next = 13;
                                      break
                                  }
                                  return e.abrupt("continue", 14);
                              case 13:
                                  throw e.t0;
                              case 14:
                                  t++, e.next = 1;
                                  break;
                              case 17:
                              case "end":
                                  return e.stop()
                          }
                      }), e, null, [
                          [2, 9]
                      ])
                  })));
                  return function(a) {
                      return e.apply(this, arguments)
                  }
              }(), {
                  condition: function(e, a) {
                      var t = a.getState;
                      a.extra;
                      if (0 !== t().packs.requests.filter((function(a) {
                          return a === e
                      })).length) return !1
                  }
              }),
                  xn = Object(f.c)({
                      name: "packs",
                      initialState: {
                          status: "idle",
                          receivedOpenedPack: "",
                          requests: []
                      },
                      reducers: {},
                      extraReducers: function(e) {
                          e.addCase(jn.pending, (function(e, a) {
                              e.status = "loading", e.requests.push(a.meta.arg)
                          })).addCase(jn.fulfilled, (function(e, a) {
                              var t, n, c;
                              e.status = "loaded", null === (t = a.payload) || void 0 === t || null === (n = t.processed) || void 0 === n || null === (c = n.action_traces) || void 0 === c || c.forEach((function(a) {
                                  a.inline_traces.forEach((function(a) {
                                      var t, n;
                                      e.receivedOpenedPack = null === (t = a.act.data) || void 0 === t || null === (n = t.points) || void 0 === n ? void 0 : n.join(" and ")
                                  }))
                              }));
                              var r = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(r, 1)
                          })).addCase(jn.rejected, (function(e, a) {
                              e.status = "failed", e.error = a.error.message;
                              var t = e.requests.indexOf(a.meta.arg);
                              e.requests.splice(t, 1)
                          }))
                      }
                  }).reducer;
  
              function On(e) {
                  var a, t, c, r, i, s = Object(u.b)(),
                      f = parseInt(e.durability || 0) - parseInt(e.current_durability || 0),
                      b = 0 !== f && f <= 5 * e.gold || "disabled",
                      m = Object(n.useState)("disabled"),
                      p = Object(l.a)(m, 2),
                      v = (p[0], p[1]),
                      g = Object(n.useState)([]),
                      h = Object(l.a)(g, 2),
                      j = h[0],
                      x = h[1];
                  e.next_availability, Date.now();
                  Object(n.useEffect)((function() {
                      x(e.canBurn)
                  }), [e.canBurn]), Object(n.useEffect)((function() {
                      return v(e.unstaking_time || e.next_availability < Date.now() / 1e3 || "disabled"),
                      function() {
                          v("disabled")
                      }
                  }), [e.unstaking_time, e.next_availability]);
                  var O = function() {
                      var a = Object(o.a)(d.a.mark((function a() {
                          var t, n, c, r, i;
                          return d.a.wrap((function(a) {
                              for (;;) switch (a.prev = a.next) {
                                  case 0:
                                      if (a.prev = 0, s(Et(!1)), "disabled" === b) {
                                          a.next = 11;
                                          break
                                      }
                                      return t = e.asset_id, n = {
                                          id: t,
                                          lost: f
                                      }, a.next = 7, s(De(n)).unwrap();
                                  case 7:
                                      null !== (null === (c = a.sent) || void 0 === c ? void 0 : c.transaction_id) && (r = Date.now(), i = {
                                          id: r,
                                          content: "Repairing your ".concat(e.template_name),
                                          timeout: 5e3
                                      }, s(Tt(i)), s(Oe(parseFloat(f / 5))), s(Xe(e.asset_id)), s(St(!0))), a.next = 13;
                                      break;
                                  case 11:
                                      f / 5 <= e.gold ? s($("This tool is full Durability!")) : s($("We need ".concat(f / 5, " golds to repair sir!"))), s(_(!0));
                                  case 13:
                                      a.next = 19;
                                      break;
                                  case 15:
                                      a.prev = 15, a.t0 = a.
                                      catch (0), Rt(a.t0, s, $, _), s(St(!0));
                                  case 19:
                                  case "end":
                                      return a.stop()
                              }
                          }), a, null, [
                              [0, 15]
                          ])
                      })));
                      return function() {
                          return a.apply(this, arguments)
                      }
                  }(),
                      k = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              var t, n, c, r, i;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          return a.prev = 0, s(Et(!1)), a.next = 4, s(Wa(e.asset_id)).unwrap();
                                      case 4:
                                          if (t = a.sent, n = Date.now(), c = {
                                              id: n,
                                              content: "Exchanging your  ".concat(e.name),
                                              timeout: 5e3
                                          }, s(Tt(c)), !t.transaction_id) {
                                              a.next = 15;
                                              break
                                          }
                                          return a.next = 11, s(za(t.transaction_id)).unwrap();
                                      case 11:
                                          (r = a.sent).burn.length > 0 ? (i = "You've just got " + r.burn.join(", "), s($(i))) : s($("You dont get anythings. Better Luck next time!")), s(_(!0)), s(St(!0));
                                      case 15:
                                          a.next = 21;
                                          break;
                                      case 17:
                                          a.prev = 17, a.t0 = a.
                                          catch (0), Rt(a.t0, s, $, _), s(St(!0));
                                      case 21:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [0, 17]
                              ])
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }(),
                      w = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              var t, n, c;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          return a.prev = 0, s(Et(!1)), a.next = 4, s(Ue({
                                              asset_id: e.asset_id
                                          })).unwrap();
                                      case 4:
                                          (null === (t = a.sent) || void 0 === t ? void 0 : t.transaction_id) && (n = Date.now(), c = {
                                              id: n,
                                              content: "Wearing your ".concat(e.data.name || e.data.template_name),
                                              timeout: 5e3
                                          }, s(Tt(c))), a.next = 12;
                                          break;
                                      case 8:
                                          throw a.prev = 8, a.t0 = a.
                                          catch (0), Rt(a.t0, s, $, _), a.t0;
                                      case 12:
                                          return a.prev = 12, s(Nt(!0)), a.finish(12);
                                      case 15:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [0, 8, 12, 15]
                              ])
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }(),
                      y = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              var t, n, c;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          return a.prev = 0, s(Et(!1)), a.next = 4, s(it()).unwrap();
                                      case 4:
                                          t = a.sent, n = Date.now(), c = {
                                              id: n,
                                              content: "Refunding your ".concat(e.data.name || e.data.template_name),
                                              timeout: 5e3
                                          }, s(Tt(c)), (null === t || void 0 === t ? void 0 : t.transaction_id) && (s($("You have been refunded successfully. Thank you for your cooperation!")), s(_(!0))), a.next = 14;
                                          break;
                                      case 11:
                                          a.prev = 11, a.t0 = a.
                                          catch (0), Rt(a.t0, s, $, _);
                                      case 14:
                                          return a.prev = 14, s(Nt(!0)), a.finish(14);
                                      case 17:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [0, 11, 14, 17]
                              ])
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }(),
                      A = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              var t, n, c;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          if (a.prev = 0, s(Et(!1)), n = {}, !e.name) {
                                              a.next = 9;
                                              break
                                          }
                                          return a.next = 6, s(Ze(e.asset_id)).unwrap();
                                      case 6:
                                          n = a.sent, a.next = 12;
                                          break;
                                      case 9:
                                          return a.next = 11, s(Fe(e.asset_id)).unwrap();
                                      case 11:
                                          n = a.sent;
                                      case 12:
                                          null !== (null === (t = n) || void 0 === t ? void 0 : t.transaction_id) && (c = Date.now(), s(Tt({
                                              id: c,
                                              content: "Removing your tool...!!!",
                                              timeout: 5e3
                                          })), s(Nt(!0))), a.next = 19;
                                          break;
                                      case 15:
                                          a.prev = 15, a.t0 = a.
                                          catch (0), s(Nt(!0)), Rt(a.t0, s, $, _);
                                      case 19:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [0, 15]
                              ])
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }(),
                      C = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              var t, n, c;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          if (a.prev = 0, void 0 === e.asset_id) {
                                              a.next = 9;
                                              break
                                          }
                                          return s(Et(!1)), a.next = 5, s(jn(e.asset_id)).unwrap();
                                      case 5:
                                          null !== (null === (t = a.sent) || void 0 === t ? void 0 : t.transaction_id) && (n = Date.now(), s(Tt({
                                              id: n,
                                              content: "A few seconds and resources will be add !!!",
                                              timeout: 5e3
                                          })), c = 0, null === t || void 0 === t || t.processed.action_traces.forEach((function(e) {
                                              e.inline_traces.forEach((function(e) {
                                                  var a, t;
                                                  c = null === (a = e.act.data) || void 0 === a || null === (t = a.points) || void 0 === t ? void 0 : t.join(" and ")
                                              }))
                                          })), s($("You are about to get " + c)), s(_(!0)), s(St(!0))), a.next = 12;
                                          break;
                                      case 9:
                                          s($("Please try again later")), s(_(!0)), s(St(!0));
                                      case 12:
                                          a.next = 18;
                                          break;
                                      case 14:
                                          a.prev = 14, a.t0 = a.
                                          catch (0), s(St(!0)), Rt(a.t0, s, $, _);
                                      case 18:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [0, 14]
                              ])
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }();
                  return Object(ae.jsxs)("div", {
                      className: "card-container",
                      children: [Object(ae.jsx)("div", {
                          className: "card-wrapper",
                          children: ((null === (a = e.data) || void 0 === a ? void 0 : a.img) || e.img) && Object(ae.jsx)("img", {
                              src: "https://mypinata.cloud/ipfs/" + ((null === e || void 0 === e || null === (t = e.data) || void 0 === t ? void 0 : t.img) || (null === e || void 0 === e ? void 0 : e.img)),
                              alt: (null === (c = e.data) || void 0 === c ? void 0 : c.name) || e.template_name,
                              className: "card-container__image",
                              width: "135",
                              height: "190"
                          })
                      }), (null === e || void 0 === e ? void 0 : e.total) && Object(ae.jsxs)("div", {
                          className: "card-container--amount coin",
                          children: [null === e || void 0 === e ? void 0 : e.total, " ", null === (r = e.data) || void 0 === r ? void 0 : r.name]
                      }), (null === e || void 0 === e ? void 0 : e.unstaking_time) && Object(ae.jsx)(on, {
                          next_availability: e.unstaking_time,
                          handleFinish: v
                      }), (null === e || void 0 === e ? void 0 : e.current_durability) >= 0 && Object(ae.jsxs)("div", {
                          className: "card-container--number",
                          children: [null === e || void 0 === e ? void 0 : e.current_durability, "/", null === e || void 0 === e ? void 0 : e.durability]
                      }), Object(ae.jsxs)("div", {
                          className: "card-group__button ",
                          children: [(null === e || void 0 === e ? void 0 : e.current_durability) >= 0 && Object(ae.jsx)(te, {
                              text: "Repair",
                              isDisabled: b,
                              handleClick: O,
                              atr: "short small",
                              wrapperClassname: "full-width"
                          }), ((null === e || void 0 === e ? void 0 : e.charged_time) >= 0 || (null === e || void 0 === e ? void 0 : e.current_durability)) && Object(ae.jsx)(te, {
                              text: "Remove",
                              handleClick: A,
                              atr: "short small",
                              wrapperClassname: "full-width"
                          }), e.isOpenable && Object(ae.jsx)(te, {
                              text: "Open",
                              handleClick: C,
                              atr: "long small",
                              wrapperClassname: "full-width"
                          }), e.isOpenLink && Object(ae.jsx)(te, {
                              text: "Nefty",
                              handleClick: function() {
                                  window.open("https://neftyblocks.com/c/farmersworld/packs", "_blank").focus(), s($("Only Token Pack can be opened in game!")), s(_(!0))
                              },
                              atr: "long small",
                              wrapperClassname: "full-width"
                          }), e.isRefundable && Object(ae.jsx)(te, {
                              text: "Refund",
                              handleClick: y,
                              atr: "long small",
                              wrapperClassname: "full-width"
                          }), e.isWearable && Object(ae.jsx)(te, {
                              text: "Wear",
                              handleClick: w,
                              atr: "short small",
                              wrapperClassname: "full-width"
                          }), j.includes(null === (i = e.template) || void 0 === i ? void 0 : i.template_id) && Object(ae.jsx)(te, {
                              text: "Exchange",
                              handleClick: k,
                              atr: "short small",
                              wrapperClassname: "full-width"
                          })]
                      })]
                  })
              }
  
              function kn() {
                  var e, a, t, c, r, i, s, d, o, l = Object(u.c)((function(e) {
                          return e.tools.usingItems
                      })),
                      f = Object(u.c)((function(e) {
                          return e.badge.usingBadges
                      })),
                      b = Object(u.c)((function(e) {
                          return e.atomic.tools
                      })),
                      m = Object(u.c)((function(e) {
                          return e.atomic.memberships
                      })),
                      v = Object(u.c)((function(e) {
                          return e.atomic.farmanimals
                      })),
                      g = Object(u.c)((function(e) {
                          return e.atomic.farmbuilding
                      })),
                      h = Object(u.c)((function(e) {
                          return e.atomic.plants
                      })),
                      j = Object(u.c)((function(e) {
                          return e.atomic.foods
                      })),
                      x = Object(u.c)((function(e) {
                          return e.atomic.packs
                      })),
                      O = Object(u.c)((function(e) {
                          return e.atomic.refundChest
                      })),
                      k = Object(u.c)((function(e) {
                          return e.coin.coinConfig
                      })),
                      w = Object(u.c)((function(e) {
                          return e.user.balances.gold
                      })),
                      y = Object(u.c)((function(e) {
                          return function(e, a) {
                              return e.foodsConfig.map((function(e) {
                                  return e.template_id + ""
                              }))
                          }(e.foods)
                      })),
                      A = null === f || void 0 === f || null === (e = f.concat(l)) || void 0 === e || null === (a = e.concat(O)) || void 0 === a || null === (t = a.concat(h)) || void 0 === t || null === (c = t.concat(m)) || void 0 === c || null === (r = c.concat(v)) || void 0 === r || null === (i = r.concat(g)) || void 0 === i || null === (s = i.concat(j)) || void 0 === s || null === (d = s.concat(k)) || void 0 === d || null === (o = d.concat(b)) || void 0 === o ? void 0 : o.concat(x);
                  return A.length > 0 ? Object(ae.jsx)(ae.Fragment, {
                      children: Object(ae.jsx)("section", {
                          className: "chest-container",
                          children: Object(ae.jsx)("div", {
                              className: "chest-content",
                              children: Object(ae.jsx)("div", {
                                  className: "chest-card-list",
                                  children: A.map((function(e, a) {
                                      return e.asset_id && Object(n.createElement)(On, Object(p.a)(Object(p.a)({}, e), {}, {
                                          key: a,
                                          index: a,
                                          gold: w,
                                          canBurn: y
                                      }))
                                  }))
                              })
                          })
                      })
                  }) : Object(ae.jsx)(gn, {})
              }
              t(409), t(410);
  
              function wn(e) {
                  return Object(ae.jsx)("div", {
                      className: "card-section",
                      children: Object(ae.jsx)("div", {
                          className: "card-img",
                          style: {
                              width: "70%"
                          },
                          children: Object(ae.jsx)("img", {
                              src: "https://mypinata.cloud/ipfs/" + (null === e || void 0 === e ? void 0 : e.img),
                              alt: e.template_name,
                              className: "card-img--item"
                          })
                      })
                  })
              }
              var yn = {
                  Wood: t.p + "static/media/WOOD-type-icon.0b9f8e5f.svg",
                  Gold: t.p + "static/media/GOLD-type-icon.45aa5a02.svg",
                  Food: t.p + "static/media/FOOD-type-icon.8c5e8d7c.svg"
              };
  
              function An() {
                  var e, a = Object(n.useState)(0),
                      t = Object(l.a)(a, 2),
                      c = t[0],
                      r = t[1],
                      i = Object(u.c)((function(e) {
                          return e.tools.EquipConfigs
                      })),
                      s = Object(u.c)((function(e) {
                          return e.builds.buildConfig
                      })),
                      f = Object(u.c)((function(e) {
                          return e.badge.badgeCraft
                      })),
                      b = null === i || void 0 === i || null === (e = i.concat(s)) || void 0 === e ? void 0 : e.concat(f),
                      m = Object(u.c)((function(e) {
                          return e.user.balances
                      })),
                      v = Object(u.c)((function(e) {
                          return e.coin.totalCoin
                      })),
                      g = Object(u.c)((function(e) {
                          return e.coin.coinsId
                      })),
                      h = b[c],
                      j = Object(u.b)(),
                      x = ((null === m || void 0 === m ? void 0 : m.wood) >= (null === h || void 0 === h ? void 0 : h.wood_mint) || v >= (null === h || void 0 === h ? void 0 : h.coins_mint)) && (null === m || void 0 === m ? void 0 : m.gold) >= ((null === h || void 0 === h ? void 0 : h.gold_mint) || (null === h || void 0 === h ? void 0 : h.golds_mint)) ? null : "disabled",
                      O = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var a, t, n, c;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          if (e.prev = 0, j(Et(!1)), null !== x) {
                                              e.next = 9;
                                              break
                                          }
                                          return e.next = 5, j(Ve(h)).unwrap();
                                      case 5:
                                          null !== (null === (a = e.sent) || void 0 === a ? void 0 : a.transaction_id) && (t = Date.now(), n = {
                                              id: t,
                                              content: "".concat(h.template_name, " is on the way sir!"),
                                              timeout: 5e3
                                          }, j(Tt(n)), c = "You have craft ".concat(h.template_name, " successfully"), j($(c)), j(_(!0)), j(Mt(t))), e.next = 11;
                                          break;
                                      case 9:
                                          j($("You dont' have enough resources to craft ".concat(h.template_name, "!"))), j(_(!0));
                                      case 11:
                                          e.next = 16;
                                          break;
                                      case 13:
                                          e.prev = 13, e.t0 = e.
                                          catch (0), Rt(e.t0, j, $, _);
                                      case 16:
                                          return e.prev = 16, j(St(!0)), e.finish(16);
                                      case 19:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [0, 13, 16, 19]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }(),
                      k = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var a, t, n, c, r, i;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          if (e.prev = 0, j(Et(!1)), null !== x) {
                                              e.next = 23;
                                              break
                                          }
                                          return a = g.slice(0, null === h || void 0 === h ? void 0 : h.coins_mint), e.next = 6, j(_e({
                                              name: h.name,
                                              coins_id: a
                                          })).unwrap();
                                      case 6:
                                          if (null === (null === (t = e.sent) || void 0 === t ? void 0 : t.transaction_id)) {
                                              e.next = 21;
                                              break
                                          }
                                          return n = Date.now(), c = {
                                              id: n,
                                              content: "".concat(h.name, " is on the way sir!"),
                                              timeout: 5e3
                                          }, j(Tt(c)), e.next = 13, j(na(null === t || void 0 === t ? void 0 : t.transaction_id)).unwrap();
                                      case 13:
                                          if (!(r = e.sent)) {
                                              e.next = 21;
                                              break
                                          }
                                          return (i = []).push(r.asset_id), e.next = 19, j($e(i)).unwrap();
                                      case 19:
                                          e.sent && ("You have craft successfully.", j($("You have craft successfully.")), j(_(!0)), j(St(!0)), j(Mt(n)));
                                      case 21:
                                          e.next = 25;
                                          break;
                                      case 23:
                                          j($("You dont' have enough tokens to craft this tool!")), j(_(!0));
                                      case 25:
                                          e.next = 31;
                                          break;
                                      case 27:
                                          e.prev = 27, e.t0 = e.
                                          catch (0), Rt(e.t0, j, $, _), j(St(!0));
                                      case 31:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [0, 27]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }(),
                      w = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var a, t, n, c;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          if (e.prev = 0, j(Et(!1)), null !== x) {
                                              e.next = 9;
                                              break
                                          }
                                          return e.next = 5, j(oa(h.template_id)).unwrap();
                                      case 5:
                                          null !== (null === (a = e.sent) || void 0 === a ? void 0 : a.transaction_id) && (t = Date.now(), n = {
                                              id: t,
                                              content: "".concat(h.name, " is on the way sir!"),
                                              timeout: 5e3
                                          }, j(Tt(n)), c = "You have craft ".concat(h.name, " successfully!"), j($(c)), j(_(!0)), j(Mt(t))), e.next = 11;
                                          break;
                                      case 9:
                                          j($("You dont' have enough resources to craft ".concat(h.name, "!"))), j(_(!0));
                                      case 11:
                                          e.next = 16;
                                          break;
                                      case 13:
                                          e.prev = 13, e.t0 = e.
                                          catch (0), Rt(e.t0, j, $, _);
                                      case 16:
                                          return e.prev = 16, j(St(!0)), e.finish(16);
                                      case 19:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [0, 13, 16, 19]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }();
                  return Object(ae.jsx)("section", {
                      className: "home-container",
                      children: Object(ae.jsxs)("div", {
                          className: "home-content",
                          children: [Object(ae.jsx)(cn, {
                              data: b,
                              selected: c,
                              HandleChoose: function(e) {
                                  r(e)
                              }
                          }), Object(ae.jsxs)("div", {
                              className: "home__card-container",
                              children: [Object(ae.jsx)(wn, Object(p.a)({}, h)), Object(ae.jsxs)("div", {
                                  className: "smithy-info-container",
                                  children: [Object(ae.jsxs)("div", {
                                      className: "info-section",
                                      children: [Object(ae.jsx)("div", {
                                          className: "info-text__section",
                                          children: Object(ae.jsxs)("div", {
                                              className: "info-title",
                                              children: [(null === h || void 0 === h ? void 0 : h.type) && Object(ae.jsx)("div", {
                                                  className: "info-type-icon",
                                                  style: {
                                                      backgroundImage: "url(".concat(yn[null === h || void 0 === h ? void 0 : h.type], ")")
                                                  }
                                              }), (null === h || void 0 === h ? void 0 : h.num_slots) && Object(ae.jsx)("div", {
                                                  className: "info-type-icon",
                                                  style: {
                                                      backgroundImage: 'url("/img/buidling-icon.svg")'
                                                  }
                                              }), Object(ae.jsx)("div", {
                                                  className: "info-title-name",
                                                  children: (null === h || void 0 === h ? void 0 : h.template_name) || (null === h || void 0 === h ? void 0 : h.name)
                                              }), (null === h || void 0 === h ? void 0 : h.level) && Object(ae.jsxs)("div", {
                                                  className: "info-title-level",
                                                  children: ["LV: ", (null === h || void 0 === h ? void 0 : h.level) || null]
                                              })]
                                          })
                                      }), Object(ae.jsxs)("div", {
                                          className: "info-content",
                                          children: [(null === h || void 0 === h ? void 0 : h.rarity) && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Rarity:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: (null === h || void 0 === h ? void 0 : h.rarity) || null
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.additional_slots) >= 0 && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Extra Slots:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: (null === h || void 0 === h ? void 0 : h.additional_slots) || 0
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.additional_energy) >= 0 && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Extra Energy:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: (null === h || void 0 === h ? void 0 : h.additional_energy) || 0
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.saved_claims) >= 0 && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Stored Mining:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: (null === h || void 0 === h ? void 0 : h.saved_claims) || 0
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.reward) && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Reward Rate:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: null === h || void 0 === h ? void 0 : h.reward
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.required_claims) >= 0 && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Required Builds:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: h.required_claims
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.num_slots) >= 0 && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Number of Slots:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: h.num_slots
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.charged_time) >= 0 && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Charge Time:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: h.charged_time / 60 > 60 ? h.charged_time / 3600 + " hours" : parseFloat(h.charged_time / 60).toFixed(2) + " mins" || !1
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.energy_consumed) >= 0 && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Energy Consumed:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: (null === h || void 0 === h ? void 0 : h.energy_consumed) || 0
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.durability_consumed) && Object(ae.jsxs)("div", {
                                              className: "info-label",
                                              children: ["Durability Consumed:", Object(ae.jsx)("div", {
                                                  className: "info-description",
                                                  children: (null === h || void 0 === h ? void 0 : h.durability_consumed) || null
                                              })]
                                          })]
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "forge__resource-section",
                                      children: [Object(ae.jsx)("div", {
                                          className: "forge__resource--tilte ",
                                          children: "COST"
                                      }), Object(ae.jsxs)("div", {
                                          className: "forge__resource-container",
                                          children: [Object(ae.jsxs)("div", {
                                              className: "forge__resource-group",
                                              children: [Object(ae.jsx)("img", {
                                                  src: "./img/plain-gold-icon.png",
                                                  alt: "GOLD",
                                                  className: "forge__resource--image"
                                              }), Object(ae.jsx)("div", {
                                                  className: "forge__resource--text " + ((null === m || void 0 === m ? void 0 : m.gold) >= ((null === h || void 0 === h ? void 0 : h.gold_mint) || (null === h || void 0 === h ? void 0 : h.golds_mint)) ? "" : "fail"),
                                                  children: (null === h || void 0 === h ? void 0 : h.gold_mint) || (null === h || void 0 === h ? void 0 : h.golds_mint) || 0
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.wood_mint) && Object(ae.jsxs)("div", {
                                              className: "forge__resource-group",
                                              children: [Object(ae.jsx)("img", {
                                                  src: "./img/plain-wood-icon.png",
                                                  alt: "WOOD",
                                                  className: "forge__resource--image",
                                                  style: {
                                                      transform: "rotate(-2.27deg)"
                                                  }
                                              }), Object(ae.jsx)("div", {
                                                  className: "forge__resource--text " + ((null === m || void 0 === m ? void 0 : m.wood) >= (null === h || void 0 === h ? void 0 : h.wood_mint) ? "" : "fail"),
                                                  children: (null === h || void 0 === h ? void 0 : h.wood_mint) || 0
                                              })]
                                          }), (null === h || void 0 === h ? void 0 : h.coins_mint) && Object(ae.jsxs)("div", {
                                              className: "forge__resource-group",
                                              children: [Object(ae.jsx)("img", {
                                                  src: "./img/Farmer-coin.png",
                                                  height: 40,
                                                  width: 40,
                                                  alt: "COIN",
                                                  className: "forge__resource--image"
                                              }), Object(ae.jsx)("div", {
                                                  className: "forge__resource--text " + (v >= (null === h || void 0 === h ? void 0 : h.coins_mint) ? "" : "fail"),
                                                  children: (null === h || void 0 === h ? void 0 : h.coins_mint) || 0
                                              })]
                                          })]
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "smithy-forge--button tooltip",
                                      children: [Object(ae.jsx)(te, {
                                          text: "Craft",
                                          atr: "long",
                                          isDisabled: x,
                                          handleClick: function() {
                                              h.num_slots ? w() : h.saved_claims ? k() : O()
                                          }
                                      }), "disabled" === x && Object(ae.jsxs)("span", {
                                          className: "tooltiptext tooltip-bottom",
                                          children: [Object(ae.jsx)("i", {
                                              className: "arrow-up"
                                          }), "Look like you don't have enough resources"]
                                      })]
                                  })]
                              })]
                          })]
                      })
                  })
              }
              t(411);
              var Cn = t(53),
                  Nn = {
                      FWG: "gold",
                      FWW: "wood",
                      FWF: "food"
                  };
  
              function Sn(e) {
                  var a = Object(u.b)(),
                      t = Object(n.useState)(0),
                      c = Object(l.a)(t, 2),
                      r = c[0],
                      i = c[1],
                      s = Object(n.useState)(0),
                      d = Object(l.a)(s, 2),
                      o = d[0],
                      f = d[1],
                      b = Object(u.c)((function(e) {
                          return e.exchange.tax
                      }));
                  Object(n.useEffect)((function() {
                      "straight" === e.type ? (i(null === e || void 0 === e ? void 0 : e.exchangeValue), f(parseFloat((null === e || void 0 === e ? void 0 : e.initialResource) || 0))) : (i(e.exchangeValue * (100 - b) / 100), f(parseFloat((null === e || void 0 === e ? void 0 : e.initialResource) || 0)))
                  }), [e.exchangeValue, e.type, b, e.initialResource]);
                  return Object(ae.jsxs)("div", {
                      className: "exchange-input-container",
                      children: [Object(ae.jsx)("input", {
                          type: "number",
                          min: 0,
                          max: o,
                          value: r,
                          lang: "en",
                          inputMode: "decimal",
                          className: "exchange-input",
                          onChange: function(t) {
                              return function(t) {
                                  if ("straight" === e.type) t.target.value > parseFloat(e.initialResource) ? a(le(Object(Cn.a)({}, Nn[e.resource] || e.resource, parseFloat(e.initialResource)))) : t.target.value < 0 ? a(le(Object(Cn.a)({}, Nn[e.resource] || e.resource, 0))) : a(le(Object(Cn.a)({}, Nn[e.resource] || e.resource, t.target.value)));
                                  else {
                                      var n = 100 * t.target.value / (100 - b);
                                      n > parseFloat(e.initialResource) ? a(le(Object(Cn.a)({}, Nn[e.resource] || e.resource, o))) : a(le(n < 0 ? Object(Cn.a)({}, Nn[e.resource], 0) : Object(Cn.a)({}, Nn[e.resource], n)))
                                  }
                                  t.preventDefault()
                              }(t)
                          }
                      }), Object(ae.jsxs)("div", {
                          className: "input-append",
                          children: [Object(ae.jsx)("img", {
                              src: e.image,
                              alt: e.resource,
                              className: "input-resource--image"
                          }), Object(ae.jsx)("div", {
                              className: "input-resource",
                              children: e.resource
                          })]
                      })]
                  })
              }
  
              function En(e) {
                  return Object(ae.jsxs)("div", {
                      className: "resource-balance-wrapper",
                      children: [Object(ae.jsx)("div", {
                          className: "resource-balance-amount",
                          children: parseFloat((null === e || void 0 === e ? void 0 : e.resource) || 0).toFixed(2)
                      }), Object(ae.jsx)("img", {
                          src: null === e || void 0 === e ? void 0 : e.image,
                          alt: "Resource Balance Icon",
                          className: (null === e || void 0 === e ? void 0 : e.type) && "resource-balance-icon"
                      }), (null === e || void 0 === e ? void 0 : e.type) && Object(ae.jsx)("div", {
                          className: "resource-balance-metrics",
                          children: e.type
                      })]
                  })
              }
              var Bn = "data:image/png;base64,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",
                  In = "data:image/png;base64,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",
                  Un = t.p + "static/media/GOLD-dark-type-icon.82c36b75.svg",
                  Fn = t.p + "static/media/WOOD-dark-type-icon.ccaba441.svg",
                  Dn = t.p + "static/media/FOOD-dark-type-icon.d8521e3b.svg",
                  Rn = [In, Bn, Yt, Un, Fn, Dn];
  
              function qn() {
                  var e = Object(u.c)((function(e) {
                      return e.exchange.tokens
                  })),
                      a = Object(u.c)((function(e) {
                          return de(e.exchange)
                      })),
                      t = a.wood > 0 || a.gold > 0 || a.food > 0 ? null : "disabled",
                      n = !((null === e || void 0 === e ? void 0 : e.FWF) > 0 || (null === e || void 0 === e ? void 0 : e.FWW) > 0 || (null === e || void 0 === e ? void 0 : e.FWG) > 0),
                      c = Object(u.b)(),
                      r = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var r;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          if (e.prev = 0, c(Et(!1)), "disabled" === t) {
                                              e.next = 9;
                                              break
                                          }
                                          return e.next = 5, c(re(Object(p.a)({}, a))).unwrap();
                                      case 5:
                                          null !== (null === (r = e.sent) || void 0 === r ? void 0 : r.transaction_id) && (c(Nt(!0)), c($("Transaction completed successfully")), c(_(!0)), c(be())), e.next = 11;
                                          break;
                                      case 9:
                                          c($(n ? "Seem like you dont have any tokens to deposit." : "You should enter positive values")), c(_(!0));
                                      case 11:
                                          e.next = 17;
                                          break;
                                      case 13:
                                          e.prev = 13, e.t0 = e.
                                          catch (0), Rt(e.t0, c, $, _), c(Nt(!0));
                                      case 17:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [0, 13]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }();
                  return Object(ae.jsx)("div", {
                      className: "withdrawTab-container",
                      children: Object(ae.jsxs)("div", {
                          className: "exchange-container",
                          children: [Object(ae.jsxs)("div", {
                              className: "exchange-content",
                              children: [Object(ae.jsxs)("div", {
                                  className: "exchange-group",
                                  children: [Object(ae.jsx)("div", {
                                      className: "exchange-content-title",
                                      children: "Tokens"
                                  }), Object(ae.jsx)(En, {
                                      resource: null === e || void 0 === e ? void 0 : e.FWG,
                                      image: Rn[3],
                                      type: "FWG"
                                  }), Object(ae.jsx)(En, {
                                      resource: null === e || void 0 === e ? void 0 : e.FWW,
                                      image: Rn[4],
                                      type: "FWW"
                                  }), Object(ae.jsx)(En, {
                                      resource: null === e || void 0 === e ? void 0 : e.FWF,
                                      image: Rn[5],
                                      type: "FWF"
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "exchange-group",
                                  children: [Object(ae.jsx)("div", {
                                      className: "exchange-content-title",
                                      children: "Deposit Amount"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.gold,
                                      initialResource: null === e || void 0 === e ? void 0 : e.FWG,
                                      image: Rn[3],
                                      resource: "FWG",
                                      type: "straight"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.wood,
                                      initialResource: null === e || void 0 === e ? void 0 : e.FWW,
                                      image: Rn[4],
                                      resource: "FWW",
                                      type: "straight"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.food,
                                      initialResource: null === e || void 0 === e ? void 0 : e.FWF,
                                      image: Rn[5],
                                      resource: "FWF",
                                      type: "straight"
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "exchange-group",
                                  children: [Object(ae.jsx)("div", {
                                      className: "exchange-content-title",
                                      children: "Total Resource"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.gold,
                                      initialResource: null === e || void 0 === e ? void 0 : e.FWG,
                                      image: Rn[0],
                                      resource: "gold",
                                      type: "straight"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.wood,
                                      initialResource: null === e || void 0 === e ? void 0 : e.FWW,
                                      image: Rn[1],
                                      resource: "wood",
                                      type: "straight"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.food,
                                      initialResource: null === e || void 0 === e ? void 0 : e.FWF,
                                      image: Rn[2],
                                      resource: "food",
                                      type: "straight"
                                  })]
                              })]
                          }), Object(ae.jsxs)("div", {
                              className: "withdraw-button tooltip",
                              children: [Object(ae.jsx)(te, {
                                  text: "Deposit",
                                  handleClick: r,
                                  atr: "long small",
                                  isDisabled: t,
                                  wrapperClassname: "full-width"
                              }), "disabled" === t && Object(ae.jsxs)("span", {
                                  className: "tooltiptext tooltip-bottom",
                                  children: [Object(ae.jsx)("i", {
                                      className: "arrow-up"
                                  }), "You have to enter Deposit amount", " "]
                              })]
                          })]
                      })
                  })
              }
              var Kn = [In, Bn, Yt, Un, Fn, Dn];
  
              function Vn() {
                  var e = Object(u.c)((function(e) {
                      return e.user.balances
                  })),
                      a = Object(u.c)((function(e) {
                          return de(e.exchange)
                      })),
                      t = Object(u.c)((function(e) {
                          return e.exchange.tax
                      })),
                      n = a.wood > 0 || a.gold > 0 || a.food > 0 ? null : "disabled",
                      c = Object(u.b)(),
                      r = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var r;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          return e.next = 2, c(ie());
                                      case 2:
                                          if (e.prev = 2, c(Et(!1)), "disabled" === n) {
                                              e.next = 11;
                                              break
                                          }
                                          return e.next = 7, c(ce(Object(p.a)(Object(p.a)({}, a), {}, {
                                              fee: t
                                          }))).unwrap();
                                      case 7:
                                          null !== (null === (r = e.sent) || void 0 === r ? void 0 : r.transaction_id) && (c(Nt(!0)), c($("Transaction completed successfully")), c(_(!0)), c(be())), e.next = 13;
                                          break;
                                      case 11:
                                          c($("Oh you want to withdraw nothing? No way!")), c(_(!0));
                                      case 13:
                                          e.next = 19;
                                          break;
                                      case 15:
                                          e.prev = 15, e.t0 = e.
                                          catch (2), Rt(e.t0, c, $, _), c(Nt(!0));
                                      case 19:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [2, 15]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }();
                  return Object(ae.jsxs)("div", {
                      className: "withdrawTab-container",
                      children: [Object(ae.jsxs)("div", {
                          className: "withdraw-tax",
                          children: [Object(ae.jsxs)("div", {
                              className: "withdraw-tax-tag",
                              children: ["Fee: ", t, "%"]
                          }), Object(ae.jsx)("div", {
                              className: "withdraw-tax-text",
                              children: "Fee will be updated every hour"
                          })]
                      }), Object(ae.jsxs)("div", {
                          className: "exchange-container",
                          children: [Object(ae.jsxs)("div", {
                              className: "exchange-content",
                              children: [Object(ae.jsxs)("div", {
                                  className: "exchange-group",
                                  children: [Object(ae.jsx)("div", {
                                      className: "exchange-content-title",
                                      children: "Balances"
                                  }), Object(ae.jsx)(En, {
                                      resource: null === e || void 0 === e ? void 0 : e.gold,
                                      image: Kn[0]
                                  }), Object(ae.jsx)(En, {
                                      resource: null === e || void 0 === e ? void 0 : e.wood,
                                      image: Kn[1]
                                  }), Object(ae.jsx)(En, {
                                      resource: null === e || void 0 === e ? void 0 : e.food,
                                      image: Kn[2]
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "exchange-group",
                                  children: [Object(ae.jsx)("div", {
                                      className: "exchange-content-title",
                                      children: "Withdrawal Amount"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.gold,
                                      initialResource: (null === e || void 0 === e ? void 0 : e.gold) || 0,
                                      image: Kn[0],
                                      resource: "gold",
                                      type: "straight"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.wood,
                                      initialResource: (null === e || void 0 === e ? void 0 : e.wood) || 0,
                                      image: Kn[1],
                                      resource: "wood",
                                      type: "straight"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.food,
                                      initialResource: (null === e || void 0 === e ? void 0 : e.food) || 0,
                                      image: Kn[2],
                                      resource: "food",
                                      type: "straight"
                                  })]
                              }), Object(ae.jsxs)("div", {
                                  className: "exchange-group",
                                  children: [Object(ae.jsx)("div", {
                                      className: "exchange-content-title",
                                      children: "Total Token"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.gold,
                                      initialResource: (null === e || void 0 === e ? void 0 : e.gold) || 0,
                                      image: Kn[3],
                                      resource: "FWG",
                                      type: "reverse"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.wood,
                                      initialResource: (null === e || void 0 === e ? void 0 : e.wood) || 0,
                                      image: Kn[4],
                                      resource: "FWW",
                                      type: "reverse"
                                  }), Object(ae.jsx)(Sn, {
                                      exchangeValue: a.food,
                                      initialResource: (null === e || void 0 === e ? void 0 : e.food) || 0,
                                      image: Kn[5],
                                      resource: "FWF",
                                      type: "reverse"
                                  })]
                              })]
                          }), Object(ae.jsxs)("div", {
                              className: "withdraw-button tooltip",
                              children: [Object(ae.jsx)(te, {
                                  text: "Withdraw",
                                  handleClick: r,
                                  atr: "long small",
                                  isDisabled: n,
                                  wrapperClassname: "full-width"
                              }), "disabled" === n && Object(ae.jsxs)("span", {
                                  className: "tooltiptext tooltip-bottom",
                                  children: [Object(ae.jsx)("i", {
                                      className: "arrow-up"
                                  }), "Enter Withdraw Amount Please!!!!"]
                              })]
                          })]
                      })]
                  })
              }
  
              function Qn() {
                  var e = Object(u.c)((function(e) {
                      return e.exchange.selectedTab
                  })),
                      a = Object(u.b)();
                  return Object(n.useEffect)((function() {
                      var e = setInterval((function() {
                          a(ie()), a(se())
                      }), 5e3);
                      return function() {
                          return clearInterval(e)
                      }
                  })), Object(ae.jsx)("section", {
                      className: "home-container",
                      children: Object(ae.jsxs)("div", {
                          className: "home-content",
                          children: [Object(ae.jsxs)("div", {
                              className: "exchange-navbar",
                              children: [Object(ae.jsx)("div", {
                                  style: {
                                      backgroundImage: "url(./img/small-paper.png)"
                                  },
                                  className: "exchange-navbar--item " + (0 === e && "selected"),
                                  onClick: function() {
                                      return a(fe(0))
                                  },
                                  children: "Withdraw"
                              }), Object(ae.jsx)("div", {
                                  style: {
                                      backgroundImage: "url(./img/small-paper.png)"
                                  },
                                  className: "exchange-navbar--item " + (1 === e && "selected"),
                                  onClick: function() {
                                      return a(fe(1))
                                  },
                                  children: "Deposit"
                              })]
                          }), 0 === e ? Object(ae.jsx)(Vn, {}) : Object(ae.jsx)(qn, {})]
                      })
                  })
              }
  
              function Mn(e) {
                  var a = Object(n.useState)([]),
                      t = Object(l.a)(a, 2),
                      c = t[0],
                      r = t[1],
                      i = Object(n.useState)(12),
                      s = Object(l.a)(i, 2),
                      d = s[0],
                      o = s[1],
                      u = Object(n.useRef)();
                  return Object(n.useEffect)((function() {
                      for (var a = [], t = 0; t < e.times_claimed; t++) a.push("/img/progress-stack.png");
                      if (r(a), u.current) {
                          var n = u.current.getBoundingClientRect();
                          o(.73 * (null === n || void 0 === n ? void 0 : n.width) / e.required_claims)
                      }
                  }), [e.times_claimed, e.required_claims]), Object(ae.jsxs)("div", {
                      className: "progress-bar-container",
                      ref: u,
                      children: [Object(ae.jsx)("div", {
                          className: "progress-bar-stack__wrapper",
                          children: c.map((function(a, t) {
                              return Object(ae.jsx)("img", {
                                  src: a,
                                  alt: "stack",
                                  className: "progress-bar-stack--item",
                                  style: {
                                      width: d + "px",
                                      height: (null === e || void 0 === e ? void 0 : e.height) + "rem"
                                  }
                              }, t)
                          }))
                      }), Object(ae.jsx)("span", {
                          className: "progress-bar-track",
                          style: {
                              backgroundImage: "url(/img/progress-track.png)"
                          }
                      }), Object(ae.jsx)("div", {
                          className: "progress-bar-countdown",
                          children: Object(ae.jsx)(on, {
                              handleFinish: e.handleFinish,
                              next_availability: e.next_availability
                          })
                      })]
                  })
              }
  
              function Tn(e) {
                  var a, t, c, r, i, s, f, b, m, v, g, h, j, x = Object(u.b)(),
                      O = (null === (a = e.build) || void 0 === a ? void 0 : a.is_ready) || "disabled",
                      k = Object(n.useState)("disabled"),
                      w = Object(l.a)(k, 2),
                      y = w[0],
                      A = w[1],
                      C = Object(u.c)((function(a) {
                          var t;
                          return function(e, a) {
                              var t;
                              return null === (t = e.farmbuilding) || void 0 === t ? void 0 : t.find((function(e) {
                                  var t;
                                  return (null === (t = e.template) || void 0 === t ? void 0 : t.template_id) + "" === a
                              }))
                          }(a.atomic, (null === (t = e.build) || void 0 === t ? void 0 : t.template_id) + "")
                      })),
                      N = 0 === e.usingItems || "disabled",
                      S = Object(n.useState)(!1),
                      E = Object(l.a)(S, 2),
                      B = E[0],
                      I = E[1],
                      U = "disabled" !== y ? "Build" : (null === (t = e.build) || void 0 === t ? void 0 : t.asset_id) ? "Countdown" : "Build",
                      F = "Build" === U || "disabled";
                  Object(n.useEffect)((function() {
                      var a;
                      return A(1e3 * (null === (a = e.build) || void 0 === a ? void 0 : a.next_availability) < Date.now() || "disabled"),
                      function() {
                          A(!0)
                      }
                  }), [e.build.next_availability]);
                  var D = function() {
                      !0 === y && I(!0)
                  }, R = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              var t;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          if ("disabled" === F) {
                                              a.next = 9;
                                              break
                                          }
                                          if (!((null === (t = e.build) || void 0 === t ? void 0 : t.is_ready) < 1)) {
                                              a.next = 6;
                                              break
                                          }
                                          return a.next = 4, q();
                                      case 4:
                                          a.next = 9;
                                          break;
                                      case 6:
                                          if (!C) {
                                              a.next = 9;
                                              break
                                          }
                                          return a.next = 9, K();
                                      case 9:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a)
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }(),
                      q = function() {
                          var a = Object(o.a)(d.a.mark((function a(t) {
                              var n;
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          return a.prev = 0, a.next = 3, x(da(t || e.build.asset_id)).unwrap();
                                      case 3:
                                          (null === (n = a.sent) || void 0 === n ? void 0 : n.transaction_id) && x(we(e.build.energy_consumed)), a.next = 10;
                                          break;
                                      case 7:
                                          a.prev = 7, a.t0 = a.
                                          catch (0), Rt(a.t0, x, $, _);
                                      case 10:
                                          return a.prev = 10, x(Nt(!0)), a.finish(10);
                                      case 13:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [0, 7, 10, 13]
                              ])
                          })));
                          return function(e) {
                              return a.apply(this, arguments)
                          }
                      }(),
                      K = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var a;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          return e.prev = 0, x(Et(!1)), e.next = 4, x(Ue({
                                              asset_id: C.asset_id,
                                              template_id: C.template_id
                                          })).unwrap();
                                      case 4:
                                          if (null === (null === (a = e.sent) || void 0 === a ? void 0 : a.transaction_id)) {
                                              e.next = 8;
                                              break
                                          }
                                          return e.next = 8, q(C.asset_id);
                                      case 8:
                                          e.next = 14;
                                          break;
                                      case 10:
                                          throw e.prev = 10, e.t0 = e.
                                          catch (0), Rt(e.t0, x, $, _), e.t0;
                                      case 14:
                                          return e.prev = 14, x(Nt(!0)), e.finish(14);
                                      case 17:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [0, 10, 14, 17]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }();
                  return Object(ae.jsxs)("div", {
                      className: "map-container",
                      children: [!0 === B && Object(ae.jsx)(un, {
                          HandleCancel: function() {
                              return I(!1)
                          },
                          type: "build",
                          asset_id: e.build.asset_id,
                          name: e.build.name
                      }), Object(ae.jsx)("span", {
                          className: "map-container-bg",
                          onClick: function(a) {
                              return t = e.index, void("disabled" === O && 0 !== t || (x(Ut(t)), x(an(0)), x(Le(0))));
                              var t
                          },
                          style: {
                              backgroundImage: "url(".concat(e.bgImage, ")"),
                              filter: "grayscale(".concat("disabled" !== O || 0 === e.index ? 0 : 1, ")")
                          }
                      }), Object(ae.jsx)("div", {
                          className: "map-component-container",
                          children: Object(ae.jsxs)("div", {
                              className: "map-component__content",
                              children: [Object(ae.jsxs)("div", {
                                  className: "map-title",
                                  children: [Object(ae.jsx)("span", {
                                      children: e.title || "Title"
                                  }), " ", 0 !== e.index && Object(ae.jsxs)("span", {
                                      className: "map-title__count",
                                      children: [e.usingItems || 0, "/", null === (c = e.build) || void 0 === c ? void 0 : c.num_slots]
                                  })]
                              }), 0 !== e.index && Object(ae.jsx)("div", {
                                  className: "map-note",
                                  children: Object(ae.jsx)("img", {
                                      className: "map-note__button image-button",
                                      src: "/img/note-icon.png",
                                      alt: "info"
                                  })
                              }), Object(ae.jsxs)("div", {
                                  className: "map-note__content",
                                  children: [Object(ae.jsx)("div", {
                                      className: "note-title",
                                      children: Object(ae.jsx)("div", {
                                          className: "note-title__name",
                                          children: null === (r = e.build) || void 0 === r ? void 0 : r.name
                                      })
                                  }), Object(ae.jsxs)("div", {
                                      className: "note-content",
                                      children: [Object(ae.jsxs)("div", {
                                          className: "note-content-info-label",
                                          children: [Object(ae.jsx)("span", {
                                              children: "Charge Time"
                                          }), Object(ae.jsxs)("div", {
                                              className: "info-description",
                                              children: [(null === (i = e.build) || void 0 === i ? void 0 : i.charged_time) / 60, " mins"]
                                          })]
                                      }), Object(ae.jsxs)("div", {
                                          className: "note-content-info-label",
                                          children: [Object(ae.jsx)("span", {
                                              children: "Energy Consumed"
                                          }), Object(ae.jsx)("div", {
                                              className: "info-description",
                                              children: null === (s = e.build) || void 0 === s ? void 0 : s.energy_consumed
                                          })]
                                      }), Object(ae.jsxs)("div", {
                                          className: "note-content-info-label",
                                          children: [Object(ae.jsx)("span", {
                                              children: "Required Build"
                                          }), Object(ae.jsx)("div", {
                                              className: "info-description",
                                              children: null === (f = e.build) || void 0 === f ? void 0 : f.required_claims
                                          })]
                                      }), Object(ae.jsxs)("div", {
                                          className: "note-content-info-label",
                                          children: [Object(ae.jsx)("span", {
                                              children: "Number of Slots"
                                          }), Object(ae.jsx)("div", {
                                              className: "info-description",
                                              children: null === (b = e.build) || void 0 === b ? void 0 : b.num_slots
                                          })]
                                      })]
                                  })]
                              }), 1 === (null === (m = e.build) || void 0 === m ? void 0 : m.is_ready) && Object(ae.jsxs)("div", {
                                  className: "map-button tooltip",
                                  children: [Object(ae.jsx)(te, {
                                      text: "Remove",
                                      isDisabled: N,
                                      handleClick: D,
                                      atr: "short small",
                                      wrapperClassname: "full-width"
                                  }), "disabled" === N && Object(ae.jsxs)("span", {
                                      className: "tooltiptext tooltip-bottom left",
                                      children: [Object(ae.jsx)("i", {
                                          className: "arrow-up left"
                                      }), "This building is currently in use"]
                                  })]
                              }), (null === (v = e.build) || void 0 === v ? void 0 : v.times_claimed) && !(1 === (null === (g = e.build) || void 0 === g ? void 0 : g.is_ready)) && Object(ae.jsx)("div", {
                                  className: "map-component-progress",
                                  children: Object(ae.jsx)(Mn, Object(p.a)(Object(p.a)({}, e.build), {}, {
                                      handleFinish: A,
                                      height: 1.5
                                  }))
                              }), ((null === C || void 0 === C ? void 0 : C.asset_id) || (null === (h = e.build) || void 0 === h ? void 0 : h.asset_id)) && !(null === (j = e.build) || void 0 === j ? void 0 : j.is_ready) && Object(ae.jsxs)("div", {
                                  className: "build-btn__wrapper",
                                  children: [Object(ae.jsx)(te, {
                                      text: U,
                                      isDisabled: F,
                                      handleClick: R,
                                      atr: "short small",
                                      wrapperClassname: "full-width"
                                  }), e.build.asset_id && Object(ae.jsx)(te, {
                                      text: "Remove",
                                      isDisabled: y,
                                      handleClick: D,
                                      atr: "short small",
                                      wrapperClassname: "full-width"
                                  })]
                              })]
                          })
                      })]
                  })
              }
              t(412);
              var Ln = [{
                  title: "Mining",
                  bgImage: "./img/home-map-bg.jpg"
              }, {
                  name: "Coop",
                  title: "Chicken",
                  bgImage: "/img/chicken-map.jpg"
              }, {
                  name: "Farm Plot",
                  title: "Plant",
                  bgImage: "./img/crop-map.jpg"
              }, {
                  name: "Cowshed",
                  title: "Cow",
                  bgImage: "./img/cow-map.jpg"
              }];
  
              function Xn() {
                  var e = Object(u.b)(),
                      a = Object(u.c)((function(e) {
                          return e.builds.usingBuilds
                      })),
                      t = Object(u.c)((function(e) {
                          return e.animals.cowUsing
                      })),
                      r = Object(u.c)((function(e) {
                          return e.animals.chickenUsing
                      })),
                      s = Object(u.c)((function(e) {
                          return e.plants.plantsUsing
                      })),
                      d = [0, r.length, s.length, t.length],
                      o = Object(n.useRef)(null),
                      f = Object(n.useState)(),
                      b = Object(l.a)(f, 2),
                      m = b[0],
                      v = b[1],
                      g = function() {
                          v("map-container-down"), setTimeout((function() {
                              e(an(0))
                          }), 500)
                      };
                  return i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "modal-wrapper",
                          tabIndex: -1,
                          role: "dialog",
                          children: Object(ae.jsxs)("div", {
                              className: "modal-content",
                              style: {
                                  margin: "auto"
                              },
                              children: [Object(ae.jsxs)("section", {
                                  className: "modal-map-container ".concat(m),
                                  style: {
                                      backgroundImage: "url(/img/Board.png)"
                                  },
                                  ref: o,
                                  children: [Object(ae.jsx)("div", {
                                      className: "modal-map-title__wrapper",
                                      children: Object(ae.jsx)("div", {
                                          className: "modal-map-title",
                                          style: {
                                              backgroundImage: "url(/img/border-button.png)"
                                          },
                                          children: "MAP"
                                      })
                                  }), Object(ae.jsx)("div", {
                                      className: "modal-header",
                                      children: Object(ae.jsx)("img", {
                                          src: Jt,
                                          alt: "Close",
                                          className: "close-map-modal image-button",
                                          onClick: function() {
                                              return g()
                                          }
                                      })
                                  }), Object(ae.jsx)("div", {
                                      className: "modal-map-content",
                                      children: Ln.map((function(e, t) {
                                          return Object(ae.jsx)(Tn, Object(p.a)(Object(p.a)({
                                              index: t,
                                              usingItems: d[t]
                                          }, e), {}, {
                                              build: a[t]
                                          }), t)
                                      }))
                                  })]
                              }), Object(ae.jsx)("div", {
                                  className: "click-out-side",
                                  onClick: function() {
                                      return g()
                                  }
                              })]
                          })
                      })
                  }), document.body)
              }
  
              function zn(e) {
                  return Object(ae.jsx)("div", {
                      className: "badge",
                      children: Object(ae.jsx)("img", {
                          src: "https://mypinata.cloud/ipfs/" + e.badge_img,
                          alt: e.name,
                          className: "badge-img"
                      })
                  })
              }
  
              function Wn() {
                  var e = Object(u.c)((function(e) {
                      return e.game.selectedMap
                  })),
                      a = Object(u.c)((function(e) {
                          return e.badge.usingBadges
                      }));
                  return 0 === e && Object(ae.jsx)("div", {
                      className: "badge-container",
                      children: Object(ae.jsx)("div", {
                          className: "badge-section",
                          children: null === a || void 0 === a ? void 0 : a.map((function(e, a) {
                              return Object(ae.jsx)(zn, Object(p.a)({}, e), a)
                          }))
                      })
                  })
              }
              var Yn = function() {
                  var e = Object(u.b)(),
                      a = Object(u.c)((function(e) {
                          return e.game.isSetToken
                      })),
                      t = Object(n.useRef)(null),
                      r = function(a) {
                          t.current && !t.current.contains(a.target) && e(_(!1))
                      };
                  Object(n.useEffect)((function() {
                      return document.addEventListener("click", r, !0),
                      function() {
                          document.removeEventListener("click", r, !0)
                      }
                  }));
                  var s = function() {
                      var a = Object(o.a)(d.a.mark((function a() {
                          return d.a.wrap((function(a) {
                              for (;;) switch (a.prev = a.next) {
                                  case 0:
                                      return a.prev = 0, e(Et(!1)), a.next = 4, e(xt()).unwrap();
                                  case 4:
                                      a.next = 11;
                                      break;
                                  case 6:
                                      a.prev = 6, a.t0 = a.
                                      catch (0), Rt(a.t0, e, $, _), e(_(!0)), e(St(!0));
                                  case 11:
                                  case "end":
                                      return a.stop()
                              }
                          }), a, null, [
                              [0, 6]
                          ])
                      })));
                      return function() {
                          return a.apply(this, arguments)
                      }
                  }();
                  return a ? null : i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "modal-wrapper",
                          tabIndex: -1,
                          role: "dialog",
                          children: Object(ae.jsxs)("div", {
                              style: {
                                  backgroundImage: "url(./img/big-board.png)"
                              },
                              className: "modal",
                              ref: t,
                              children: [Object(ae.jsx)("div", {
                                  className: "modal-content mid",
                                  children: "Do you want to add FarmersWorld Tokens to your Wax Cloud Wallet now?"
                              }), Object(ae.jsxs)("div", {
                                  className: "modal__button-group token",
                                  children: [Object(ae.jsx)(te, {
                                      type: "button",
                                      atr: "short",
                                      "data-dismiss": "modal",
                                      text: "Accept",
                                      handleClick: function() {
                                          return s()
                                      }
                                  }), Object(ae.jsx)(te, {
                                      type: "button",
                                      atr: "short",
                                      "data-dismiss": "modal",
                                      text: "Cancel",
                                      handleClick: function() {
                                          return e(Bt(!0))
                                      }
                                  })]
                              })]
                          })
                      })
                  }), document.body)
              }, Jn = t(110);
              t(413);
  
              function Pn(e) {
                  var a, t = e.lackingResource,
                      r = Object(u.b)(),
                      s = Object(n.useState)(0),
                      f = Object(l.a)(s, 2),
                      b = f[0],
                      m = f[1],
                      p = Object(n.useState)(t),
                      v = Object(l.a)(p, 2),
                      g = v[0],
                      h = v[1],
                      j = Object(u.c)((function(e) {
                          return e.game.waxAccountInfo
                      })),
                      x = Object(n.useRef)(null),
                      O = function(e) {
                          x.current && !x.current.contains(e.target) && r(It(""))
                      };
                  Object(n.useEffect)((function() {
                      var e = setTimeout(Object(o.a)(d.a.mark((function e() {
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      return e.next = 2, r(vt()).unwrap();
                                  case 2:
                                  case "end":
                                      return e.stop()
                              }
                          }), e)
                      }))), 5e3);
                      return function() {
                          clearTimeout(e)
                      }
                  })), Object(n.useEffect)((function() {
                      return document.addEventListener("click", O, !0),
                      function() {
                          document.removeEventListener("click", O, !0)
                      }
                  }));
                  var k = function() {
                      var e = Object(o.a)(d.a.mark((function e() {
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      if (e.prev = 0, "RAM" !== g) {
                                          e.next = 6;
                                          break
                                      }
                                      return e.next = 4, r(kt(b)).unwrap();
                                  case 4:
                                      e.next = 8;
                                      break;
                                  case 6:
                                      return e.next = 8, r(Ot(Object(Cn.a)({}, g.toLowerCase(), b))).unwrap();
                                  case 8:
                                      return e.next = 10, r(vt()).unwrap();
                                  case 10:
                                      e.next = 14;
                                      break;
                                  case 12:
                                      e.prev = 12, e.t0 = e.
                                      catch (0);
                                  case 14:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [0, 12]
                          ])
                      })));
                      return function() {
                          return e.apply(this, arguments)
                      }
                  }();
                  return i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "modal-wrapper",
                          tabIndex: -1,
                          role: "dialog",
                          children: Object(ae.jsxs)("div", {
                              className: "modal-stake",
                              style: {
                                  backgroundImage: "url(./img/big-board.png)"
                              },
                              ref: x,
                              children: [Object(ae.jsx)("div", {
                                  className: "modal-stake-close",
                                  children: Object(ae.jsx)("img", {
                                      src: "./img/close-button.png",
                                      alt: "Close",
                                      className: "image-button close-modal",
                                      onClick: function() {
                                          return r(It(""))
                                      }
                                  })
                              }), Object(ae.jsxs)("div", {
                                  className: "modal-stake-header",
                                  children: ["You dont have enough ", t, " to create transaction. Please stake WAX on ", t, " to continue."]
                              }), Object(ae.jsxs)("div", {
                                  className: "modal-stake-content",
                                  children: [Object(ae.jsxs)("div", {
                                      className: "modal-stake-circle",
                                      children: [Object(ae.jsxs)("div", {
                                          className: "modal-circular-group",
                                          children: [Object(ae.jsx)("div", {
                                              className: "circular-progress",
                                              children: Object(ae.jsxs)(Jn.a, {
                                                  value: 100 * ((null === j || void 0 === j ? void 0 : j.cpu_limit.used) / (null === j || void 0 === j ? void 0 : j.cpu_limit.max) || 1),
                                                  strokeWidth: 12,
                                                  styles: {
                                                      path: {
                                                          stroke: "#5338A9"
                                                      }
                                                  },
                                                  children: [Object(ae.jsx)("div", {
                                                      style: {
                                                          fontSize: 20
                                                      },
                                                      children: Object(ae.jsxs)("strong", {
                                                          children: [(100 * ((null === j || void 0 === j ? void 0 : j.cpu_limit.used) / (null === j || void 0 === j ? void 0 : j.cpu_limit.max) || 1)).toFixed(2), "%"]
                                                      })
                                                  }), Object(ae.jsx)("div", {
                                                      style: {
                                                          fontSize: 11
                                                      },
                                                      children: Object(ae.jsx)("strong", {
                                                          children: "used"
                                                      })
                                                  })]
                                              })
                                          }), Object(ae.jsx)("div", {
                                              className: "modal-resource-header",
                                              children: "CPU"
                                          }), Object(ae.jsxs)("div", {
                                              className: "modal-resource-detail",
                                              children: [((null === j || void 0 === j ? void 0 : j.cpu_limit.used) / 1024).toFixed(2), "ms/", ((null === j || void 0 === j ? void 0 : j.cpu_limit.max) / 1024).toFixed(2), "ms"]
                                          }), Object(ae.jsxs)("div", {
                                              className: "modal-resource-detail",
                                              children: ["Total Staked:", " ", parseFloat(null === j || void 0 === j ? void 0 : j.total_resources.cpu_weight.split(" ")[0]), " ", "WAX"]
                                          })]
                                      }), Object(ae.jsxs)("div", {
                                          className: "modal-circular-group",
                                          children: [Object(ae.jsx)("div", {
                                              className: "circular-progress",
                                              children: Object(ae.jsxs)(Jn.a, {
                                                  value: 100 * ((null === j || void 0 === j ? void 0 : j.net_limit.used) / (null === j || void 0 === j ? void 0 : j.net_limit.max) || 1),
                                                  strokeWidth: 12,
                                                  styles: {
                                                      path: {
                                                          stroke: "#4F8C38"
                                                      }
                                                  },
                                                  children: [Object(ae.jsx)("div", {
                                                      style: {
                                                          fontSize: 20
                                                      },
                                                      children: Object(ae.jsxs)("strong", {
                                                          children: [(100 * ((null === j || void 0 === j ? void 0 : j.net_limit.used) / (null === j || void 0 === j ? void 0 : j.net_limit.max) || 1)).toFixed(2), "%"]
                                                      })
                                                  }), Object(ae.jsx)("div", {
                                                      style: {
                                                          fontSize: 11
                                                      },
                                                      children: Object(ae.jsx)("strong", {
                                                          children: "used"
                                                      })
                                                  })]
                                              })
                                          }), Object(ae.jsx)("div", {
                                              className: "modal-resource-header",
                                              children: "NET"
                                          }), Object(ae.jsxs)("div", {
                                              className: "modal-resource-detail",
                                              children: [parseInt((null === j || void 0 === j ? void 0 : j.net_limit.used) / 1024), "Kb/", parseInt((null === j || void 0 === j ? void 0 : j.net_limit.max) / 1024), "Kb"]
                                          }), Object(ae.jsxs)("div", {
                                              className: "modal-resource-detail",
                                              children: ["Total Staked:", " ", parseFloat(null === j || void 0 === j ? void 0 : j.total_resources.net_weight.split(" ")[0]).toFixed(2), " ", "WAX"]
                                          })]
                                      }), Object(ae.jsxs)("div", {
                                          className: "modal-circular-group",
                                          children: [Object(ae.jsx)("div", {
                                              className: "circular-progress",
                                              children: Object(ae.jsxs)(Jn.a, {
                                                  value: 100 * ((null === j || void 0 === j ? void 0 : j.ram_usage) / (null === j || void 0 === j ? void 0 : j.ram_quota) || 1),
                                                  strokeWidth: 12,
                                                  styles: {
                                                      path: {
                                                          stroke: "#F178B6"
                                                      }
                                                  },
                                                  children: [Object(ae.jsx)("div", {
                                                      style: {
                                                          fontSize: 20
                                                      },
                                                      children: Object(ae.jsxs)("strong", {
                                                          children: [(100 * ((null === j || void 0 === j ? void 0 : j.ram_usage) / (null === j || void 0 === j ? void 0 : j.ram_quota) || 1)).toFixed(2), "%"]
                                                      })
                                                  }), Object(ae.jsx)("div", {
                                                      style: {
                                                          fontSize: 11
                                                      },
                                                      children: Object(ae.jsx)("strong", {
                                                          children: "used"
                                                      })
                                                  })]
                                              })
                                          }), Object(ae.jsx)("div", {
                                              className: "modal-resource-header",
                                              children: "RAM"
                                          }), Object(ae.jsxs)("div", {
                                              className: "modal-resource-detail",
                                              children: [parseInt((null === j || void 0 === j ? void 0 : j.ram_usage) / 1024), "Kb/", parseInt((null === j || void 0 === j ? void 0 : j.ram_quota) / 1024), "Kb"]
                                          })]
                                      })]
                                  }), Object(ae.jsxs)("div", {
                                      className: "modal-stake-input",
                                      children: [Object(ae.jsxs)("select", {
                                          value: g || "CPU",
                                          onChange: function(e) {
                                              return h(e.target.value)
                                          },
                                          children: [Object(ae.jsx)("option", {
                                              value: "CPU",
                                              children: "CPU"
                                          }), Object(ae.jsx)("option", {
                                              value: "RAM",
                                              children: "RAM"
                                          }), Object(ae.jsx)("option", {
                                              value: "NET",
                                              children: "NET"
                                          })]
                                      }), Object(ae.jsxs)("div", {
                                          className: "input-wrapper",
                                          children: [Object(ae.jsx)("input", {
                                              type: "number",
                                              placeholder: "Amount of wax",
                                              value: b,
                                              onChange: function(e) {
                                                  return m(e.target.value)
                                              },
                                              min: 0,
                                              max: parseFloat(null === j || void 0 === j || null === (a = j.core_liquid_balance) || void 0 === a ? void 0 : a.split(" ")[0]).toFixed(8),
                                              className: "input-stake"
                                          }), Object(ae.jsxs)("button", {
                                              className: "btn-stake",
                                              onClick: function(e) {
                                                  return k()
                                              },
                                              children: [" ", "Stake"]
                                          })]
                                      })]
                                  })]
                              }), Object(ae.jsx)("div", {
                                  className: "modal-stake-footer",
                                  children: "CPU and NET automatically recover every 24 hours. When you don't need CPU or NET, you can unstake WAX later"
                              })]
                          })
                      })
                  }), document.body)
              }
  
              function Hn(e) {
                  var a = Object(n.useState)(0),
                      t = Object(l.a)(a, 2),
                      c = t[0],
                      r = t[1];
                  Object(n.useEffect)((function() {
                      setTimeout((function() {
                          ! function() {
                              if (null === e || void 0 === e ? void 0 : e.next_availability) {
                                  var a = 1e3 * (null === e || void 0 === e ? void 0 : e.next_availability) - Date.now();
                                  a < 0 && (a = 0), r(a)
                              }
                          }()
                      }), 100)
                  }));
                  var i = Math.floor(c / 36e5) || 0,
                      s = Math.floor(c % 36e5 / 6e4) || 0,
                      d = Math.floor(c / 1e3 - (3600 * i + 60 * s)) || 0,
                      o = (i < 10 ? "0" + i : i) + ":" + (s < 10 ? "0" + s : s) + ":" + (d < 10 ? "0" + d : d);
                  return Object(ae.jsx)("div", {
                      className: "satellite__card-container",
                      children: Object(ae.jsx)("div", {
                          className: "satellite__card-time",
                          children: o
                      })
                  })
              }
              var Gn = t(61),
                  Zn = function(e) {
                      return {
                          x: -15 * (e < 3 ? e : 0),
                          y: 20 * (e < 3 ? e : 0),
                          scale: 1,
                          rot: -10,
                          delay: 100 * (e < 3 ? e : 0),
                          zIndex: e < 3 ? e : 0,
                          immediate: function(e) {
                              return "zIndex" === e
                          }
                      }
                  }, _n = function(e, a) {
                      return "perspective(900px) rotateX(0deg) rotateY(".concat(1.5 * -e, "deg) rotateZ(", 0, "deg) scale(").concat(a, ")")
                  };
  
              function $n(e) {
                  var a = Object(u.b)(),
                      t = e.cards,
                      c = Object(n.useState)((function() {
                          return new Set
                      })),
                      r = Object(l.a)(c, 1)[0],
                      i = Object(Gt.useSprings)(t.length, (function(e) {
                          return Object(p.a)(Object(p.a)({}, Zn(e)), {}, {
                              from: {
                                  x: 0,
                                  rot: 0,
                                  scale: 1.5,
                                  y: -1e3
                              }
                          })
                      })),
                      s = Object(l.a)(i, 2),
                      d = s[0],
                      o = s[1],
                      f = Object(Gn.a)((function(e) {
                          var n = Object(l.a)(e.args, 1)[0],
                              c = e.down,
                              i = Object(l.a)(e.movement, 1)[0],
                              s = Object(l.a)(e.direction, 1)[0],
                              d = e.velocity;
                          if (e.tap) t.length > 1 && o.start((function(e) {
                              return Zn((t.length - e + n) % t.length)
                          })), a(We(t[n].asset_id)), a(an(0));
                          else {
                              var u = s < 0 ? -1 : 1;
                              !c && d > .2 && r.add(n), o.start((function(e) {
                                  if (n === e) {
                                      var a = r.has(n);
                                      return {
                                          x: a ? (200 + window.innerWidth) * u : c ? i : 0,
                                          rot: i / 100 + (a ? 10 * u * d : 0),
                                          scale: c ? 1.2 : 1,
                                          delay: void 0,
                                          config: {
                                              friction: 50,
                                              tension: c ? 800 : a ? 200 : 500
                                          }
                                      }
                                  }
                              }))
                          }
                          c || r.size !== t.length || setTimeout((function() {
                              return r.clear() || o.start((function(e) {
                                  return Zn(e)
                              }))
                          }), 600)
                      }), {
                          filterTaps: !0
                      });
                  return Object(ae.jsx)("div", {
                      className: "gold__cards-container",
                      children: Object(ae.jsx)("div", {
                          className: "slide-container",
                          children: d.map((function(e, a) {
                              var c = e.x,
                                  r = e.y,
                                  i = e.rot,
                                  s = e.scale,
                                  d = e.zIndex;
                              return Object(ae.jsx)(Gt.animated.div, {
                                  style: {
                                      zIndex: d,
                                      transform: Object(Gt.to)([c, r], (function(e, a) {
                                          return "translate3d(".concat(e, "px,").concat(a, "px,0)")
                                      }))
                                  },
                                  children: Object(ae.jsx)(Gt.animated.div, Object(p.a)(Object(p.a)({}, f(a)), {}, {
                                      style: {
                                          transform: Object(Gt.to)([i, s], _n),
                                          backgroundImage: "url(".concat("https://mypinata.cloud/ipfs/" + t[a].img, ")")
                                      },
                                      children: Object(n.createElement)(Hn, Object(p.a)(Object(p.a)({}, t[a]), {}, {
                                          key: a
                                      }))
                                  }))
                              }, a)
                          }))
                      })
                  })
              }
              var ec = function(e) {
                  return {
                      x: 15 * (e < 3 ? e : 0),
                      y: 20 * (e < 3 ? e : 0),
                      scale: 1,
                      rot: 10,
                      delay: 100 * (e < 3 ? e : 0),
                      zIndex: e < 3 ? e : 0,
                      immediate: function(e) {
                          return "zIndex" === e
                      }
                  }
              }, ac = function(e, a) {
                      return "perspective(900px) rotateX(".concat(0, "deg) rotateY(", 2 * -e, "deg) rotateZ(", 0, "deg) scale(").concat(a, ")")
                  };
  
              function tc(e) {
                  var a = e.cards,
                      t = Object(u.b)(),
                      c = Object(n.useState)((function() {
                          return new Set
                      })),
                      r = Object(l.a)(c, 1)[0],
                      i = Object(Gt.useSprings)(a.length, (function(e) {
                          return Object(p.a)(Object(p.a)({}, ec(e)), {}, {
                              from: {
                                  x: 0,
                                  rot: 0,
                                  scale: 1.5,
                                  y: -1e3
                              }
                          })
                      })),
                      s = Object(l.a)(i, 2),
                      d = s[0],
                      o = s[1],
                      f = Object(Gn.a)((function(e) {
                          var n = Object(l.a)(e.args, 1)[0],
                              c = e.down,
                              i = Object(l.a)(e.movement, 1)[0],
                              s = Object(l.a)(e.direction, 1)[0],
                              d = e.velocity;
                          if (e.tap) a.length > 1 && o.start((function(e) {
                              return ec((a.length - e + n) % a.length)
                          })), t(We(a[n].asset_id)), t(an(0));
                          else {
                              var u = s < 0 ? -1 : 1;
                              !c && d > .2 && r.add(n), o.start((function(e) {
                                  if (n === e) {
                                      var a = r.has(n);
                                      return {
                                          x: a ? (200 + window.innerWidth) * u : c ? i : 0,
                                          rot: i / 100 + (a ? 10 * u * d : 0),
                                          scale: c ? 1.2 : 1,
                                          delay: void 0,
                                          config: {
                                              friction: 50,
                                              tension: c ? 800 : a ? 200 : 500
                                          }
                                      }
                                  }
                              }))
                          }
                          c || r.size !== a.length || setTimeout((function() {
                              return r.clear() || o.start((function(e) {
                                  return ec(e)
                              }))
                          }), 600)
                      }), {
                          filterTaps: !0
                      });
                  return Object(ae.jsx)("div", {
                      className: "wood__cards-container",
                      children: Object(ae.jsx)("div", {
                          className: "slide-container",
                          children: d.map((function(e, t) {
                              var c = e.x,
                                  r = e.y,
                                  i = e.rot,
                                  s = e.scale,
                                  d = e.zIndex;
                              return Object(n.createElement)(Gt.animated.div, Object(p.a)(Object(p.a)({}, f(t)), {}, {
                                  key: t,
                                  style: {
                                      zIndex: d,
                                      transform: Object(Gt.to)([c, r], (function(e, a) {
                                          return "translate3d(".concat(e, "px,").concat(a, "px,0)")
                                      }))
                                  }
                              }), Object(ae.jsx)(Gt.animated.div, {
                                  style: {
                                      transform: Object(Gt.to)([i, s], ac),
                                      backgroundImage: "url(".concat("https://mypinata.cloud/ipfs/" + a[t].img, ")")
                                  },
                                  children: Object(n.createElement)(Hn, Object(p.a)(Object(p.a)({}, a[t]), {}, {
                                      key: t
                                  }))
                              }))
                          }))
                      })
                  })
              }
              var nc = function(e) {
                  return {
                      x: -15 * (e < 3 ? e : 0),
                      y: 20 * (e < 3 ? e : 0),
                      scale: 1,
                      rot: -10,
                      delay: 100 * (e < 3 ? e : 0),
                      zIndex: e < 3 ? e : 0,
                      immediate: function(e) {
                          return "zIndex" === e
                      }
                  }
              }, cc = function(e, a) {
                      return "perspective(900px) rotateX(0deg) rotateY(".concat(1.5 * -e, "deg) rotateZ(", 0, "deg) scale(").concat(a, ")")
                  };
  
              function rc(e) {
                  var a = Object(u.b)(),
                      t = e.cards,
                      c = Object(n.useState)((function() {
                          return new Set
                      })),
                      r = Object(l.a)(c, 1)[0],
                      i = Object(Gt.useSprings)(t.length, (function(e) {
                          return Object(p.a)(Object(p.a)({}, nc(e)), {}, {
                              from: {
                                  x: 0,
                                  rot: 0,
                                  scale: 1.5,
                                  y: -1e3
                              }
                          })
                      })),
                      s = Object(l.a)(i, 2),
                      d = s[0],
                      o = s[1],
                      f = Object(Gn.a)((function(e) {
                          var n = Object(l.a)(e.args, 1)[0],
                              c = e.down,
                              i = Object(l.a)(e.movement, 1)[0],
                              s = Object(l.a)(e.direction, 1)[0],
                              d = e.velocity;
                          if (e.tap) t.length > 1 && o.start((function(e) {
                              return nc((t.length - e + n) % t.length)
                          })), a(We(t[n].asset_id)), a(an(0));
                          else {
                              var u = s < 0 ? -1 : 1;
                              !c && d > .2 && r.add(n), o.start((function(e) {
                                  if (n === e) {
                                      var a = r.has(n);
                                      return {
                                          x: a ? (200 + window.innerWidth) * u : c ? i : 0,
                                          rot: i / 100 + (a ? 10 * u * d : 0),
                                          scale: c ? 1.2 : 1,
                                          delay: void 0,
                                          config: {
                                              friction: 50,
                                              tension: c ? 800 : a ? 200 : 500
                                          }
                                      }
                                  }
                              }))
                          }
                          c || r.size !== t.length || setTimeout((function() {
                              return r.clear() || o.start((function(e) {
                                  return nc(e)
                              }))
                          }), 600)
                      }), {
                          filterTaps: !0
                      });
                  return Object(ae.jsx)("div", {
                      className: "food__cards-container",
                      children: Object(ae.jsx)("div", {
                          className: "slide-container",
                          children: d.map((function(e, a) {
                              var c = e.x,
                                  r = e.y,
                                  i = e.rot,
                                  s = e.scale,
                                  d = e.zIndex;
                              return Object(n.createElement)(Gt.animated.div, Object(p.a)(Object(p.a)({}, f(a)), {}, {
                                  key: a,
                                  style: {
                                      zIndex: d,
                                      transform: Object(Gt.to)([c, r], (function(e, a) {
                                          return "translate3d(".concat(e, "px,").concat(a, "px,0)")
                                      }))
                                  }
                              }), Object(ae.jsx)(Gt.animated.div, {
                                  style: {
                                      transform: Object(Gt.to)([i, s], cc),
                                      backgroundImage: "url(".concat("https://mypinata.cloud/ipfs/" + t[a].img, ")")
                                  },
                                  children: Object(n.createElement)(Hn, Object(p.a)(Object(p.a)({}, t[a]), {}, {
                                      key: a
                                  }))
                              }))
                          }))
                      })
                  })
              }
  
              function ic() {
                  var e = Object(u.c)((function(e) {
                      return e.game.selectedMap
                  })),
                      a = Object(u.c)((function(e) {
                          return e.tools.usingItems
                      })),
                      t = a.filter((function(e) {
                          return "Wood" === e.type
                      })),
                      n = a.filter((function(e) {
                          return "Food" === e.type
                      })),
                      c = a.filter((function(e) {
                          return "Gold" === e.type
                      }));
                  return 0 === e && Object(ae.jsx)("section", {
                      className: "satellite_cards-container",
                      children: Object(ae.jsxs)("div", {
                          className: "satellite_cards-content",
                          children: [Object(ae.jsx)(rc, {
                              cards: n
                          }), Object(ae.jsx)($n, {
                              cards: c
                          }), Object(ae.jsx)(tc, {
                              cards: t
                          })]
                      })
                  })
              }
              var sc = ["./img/anchor.png", "./img/arrow-bar.png", "./img/big-board.png", "./img/board-layout.png", "./img/border-button.png", "./img/card-overlay.png", "./img/chicken-background.jpg", "./img/chicken-map.jpg", "./img/chicken.png", "./img/close-button.png", "./img/cow-female.png", "./img/cow-male.png", "./img/cow-map.jpg", "./img/cow.png", "./img/cows-bg.jpg", "./img/crop-corn.png", "./img/crop-map.jpg", "./img/crops-bg.jpg", "./img/down.png", "./img/dropdown.svg", "./img/egg-nest.png", "./img/energy-icon.png", "./img/Farmer-coin.png", "./img/FOOD-dark-type-icon.svg", "./img/FOOD-type-icon.svg", "./img/GOLD-dark-type-icon.svg", "./img/gold-icon.png", "./img/GOLD-type-icon.svg", "./img/home-background.jpg", "./img/home-map-bg.jpg", "./img/home-map.jpg", "./img/chicken-map.jpg", "./img/cows-bg.jpg", "./img/crops-bg.jpg", "./img/login-background.jpg", "./img/long-arrow-bar.png", "./img/meat-icon.png", "./img/minus.png", "./img/next.png", "./img/noitems.png", "./img/note-icon.png", "./img/paper.png", "./img/plain-button.png", "./img/plain-energy.png", "./img/plain-gold-icon.png", "./img/plain-meat.png", "./img/plain-wood-icon.png", "./img/plus.png", "./img/prev.png", "./img/small-board.png", "./img/small-paper.png", "./img/small-plain-button.png", "./img/small-thumb.png", "./img/tall-card-border.png", "./img/thumb.png", "./img/time-border.png", "./img/track.png", "./img/up.png", "./img/vertical-track.png", "./img/wax-primary-logo.png", "./img/WOOD-dark-type-icon.svg", "./img/wood-icon.png", "./img/WOOD-type-icon.svg"],
                  dc = function(e) {
                      var a = e.HandleCancel,
                          t = e.cowMale,
                          r = e.cowFemale,
                          s = (e.handelCowMale, e.handelCowFeMale, e.handleCowBreeding, Object(u.b)()),
                          l = Object(n.useRef)(null),
                          f = function(e) {
                              l.current && !l.current.contains(e.target) && a()
                          };
                      Object(n.useEffect)((function() {
                          return document.addEventListener("click", f, !0),
                          function() {
                              document.removeEventListener("click", f, !0)
                          }
                      }));
                      var b = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var n, c;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          return n = Date.now(), e.prev = 1, c = {
                                              id: n,
                                              content: "Canceling breeding your ".concat(null === t || void 0 === t ? void 0 : t.name, " and ").concat(null === r || void 0 === r ? void 0 : r.name),
                                              timeout: 3e4
                                          }, s(Tt(c)), e.next = 6, s(_a(null === r || void 0 === r ? void 0 : r.asset_id)).unwrap();
                                      case 6:
                                          return e.next = 8, a();
                                      case 8:
                                          return e.next = 10, s(Et(!1));
                                      case 10:
                                          e.next = 15;
                                          break;
                                      case 12:
                                          e.prev = 12, e.t0 = e.
                                          catch (1), Rt(e.t0, s, $, _);
                                      case 15:
                                          return e.prev = 15, s(Mt(n)), s(St(!0)), e.finish(15);
                                      case 19:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [1, 12, 15, 19]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }();
                      return i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                          children: Object(ae.jsx)("div", {
                              className: "modal-wrapper",
                              tabIndex: -1,
                              role: "dialog",
                              children: Object(ae.jsxs)("div", {
                                  style: {
                                      backgroundImage: "url(./img/big-board.png)"
                                  },
                                  className: "modal",
                                  ref: l,
                                  children: [Object(ae.jsx)("div", {
                                      className: "modal-content mid",
                                      children: "Do you want to cancel this breeding?"
                                  }), Object(ae.jsxs)("div", {
                                      className: "modal__button-group token",
                                      children: [Object(ae.jsx)(te, {
                                          type: "button",
                                          atr: "short",
                                          "data-dismiss": "modal",
                                          text: "Accept",
                                          handleClick: b
                                      }), Object(ae.jsx)(te, {
                                          type: "button",
                                          atr: "short",
                                          "data-dismiss": "modal",
                                          text: "Cancel",
                                          handleClick: a
                                      })]
                                  })]
                              })
                          })
                      }), document.body)
                  }, oc = "https://mypinata.cloud/ipfs/";
  
              function uc(e) {
                  var a = Object(n.useRef)(),
                      t = Object(n.useRef)(),
                      r = Object(n.useState)(!0),
                      s = Object(l.a)(r, 2),
                      f = s[0],
                      b = s[1],
                      m = Object(u.c)((function(e) {
                          return e.breeding.breedings
                      })),
                      v = Object(n.useState)(null),
                      g = Object(l.a)(v, 2),
                      h = g[0],
                      j = g[1],
                      x = Object(n.useState)(null),
                      O = Object(l.a)(x, 2),
                      k = O[0],
                      w = O[1],
                      y = Object(n.useState)(!1),
                      A = Object(l.a)(y, 2),
                      C = A[0],
                      N = A[1],
                      S = Object(n.useState)(),
                      E = Object(l.a)(S, 2),
                      B = E[0],
                      I = E[1],
                      U = Object(n.useState)(!1),
                      F = Object(l.a)(U, 2),
                      D = F[0],
                      R = F[1],
                      q = Object(n.useState)(e.data),
                      K = Object(l.a)(q, 2),
                      V = K[0],
                      Q = K[1],
                      M = Object(u.c)((function(e) {
                          return e.breeding.breedingConfig
                      })),
                      T = Object(u.c)((function(e) {
                          return ut(e.atomic, M[0].consumed_card + "")
                      })),
                      L = Object(u.b)(),
                      X = (null === T || void 0 === T ? void 0 : T.length) > 0,
                      z = h && k,
                      W = z ? !0 === f ? X ? "Breed" : "No Food" : "Countdown" : "No Pair",
                      Y = "Breed" === W || "disabled",
                      J = m.length >= 1 && z && !0 === f || "disabled";
                  Object(n.useEffect)((function() {
                      Q(e.data), e.cowBreeding.length > 0 && e.cowBreeding.length <= 2 ? (N(!0), e.cowBreeding.forEach((function(e) {
                          1 === e.gender ? j(e) : 2 === e.gender && w(e)
                      }))) : (N(!1), j(null), w(null))
                  }), [e.cowBreeding, m, e.data]), Object(n.useEffect)((function() {
                      var e;
                      return b(Date.now() - 1e3 * ((null === (e = m[0]) || void 0 === e ? void 0 : e.next_availability) || 0) >= 0 || "disabled"),
                      function() {
                          b(!0)
                      }
                  }), [m]);
                  var P = function() {
                      var e = Object(o.a)(d.a.mark((function e() {
                          var a, t, n;
                          return d.a.wrap((function(e) {
                              for (;;) switch (e.prev = e.next) {
                                  case 0:
                                      return a = Date.now(), e.prev = 1, L(Et(!1)), t = {
                                          id: a,
                                          content: "Start Breeding your ".concat(h.name, " and ").concat(k.name, " "),
                                          timeout: 3e4
                                      }, L(Tt(t)), n = {
                                          dad: h.asset_id,
                                          mother: k.asset_id
                                      }, e.next = 8, L(Ga(n)).unwrap();
                                  case 8:
                                      e.sent.transaction_id && ("Pairing your Bull and Dairy Cow successfully. After this Countdown, you can breed them!", L($("Pairing your Bull and Dairy Cow successfully. After this Countdown, you can breed them!")), L(_(!0))), e.next = 15;
                                      break;
                                  case 12:
                                      e.prev = 12, e.t0 = e.
                                      catch (1), Rt(e.t0, L, $, _);
                                  case 15:
                                      return e.prev = 15, L(Mt(a)), L(St(!0)), e.finish(15);
                                  case 19:
                                  case "end":
                                      return e.stop()
                              }
                          }), e, null, [
                              [1, 12, 15, 19]
                          ])
                      })));
                      return function() {
                          return e.apply(this, arguments)
                      }
                  }(),
                      H = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var a, t, n, c, r, i, s;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          if (a = Date.now(), e.prev = 1, L(Et(!1)), "disabled" === Y) {
                                              e.next = 19;
                                              break
                                          }
                                          return t = {
                                              id: a,
                                              content: "Breeding your ".concat(h.name, " and ").concat(k.name, " "),
                                              timeout: 3e4
                                          }, L(Tt(t)), n = {
                                              dad: h.asset_id,
                                              mother: k.asset_id,
                                              food: T
                                          }, e.next = 9, L(Za(n)).unwrap();
                                      case 9:
                                          if (!(c = e.sent).transaction_id) {
                                              e.next = 19;
                                              break
                                          }
                                          if (L(Tt({
                                              id: a,
                                              content: "Successfull breeding",
                                              timeout: 1500
                                          })), !(m[0] && (null === (r = m[0]) || void 0 === r ? void 0 : r.times_claimed) + 1 >= M[0].required_claims)) {
                                              e.next = 19;
                                              break
                                          }
                                          return e.next = 16, L(ha(c.transaction_id)).unwrap();
                                      case 16:
                                          (i = e.sent).claim ? (s = "You've just harvested " + i.claim.quantity + " Baby Caft", L($(s))) : L($("You got your rewards")), L(_(!0));
                                      case 19:
                                          e.next = 24;
                                          break;
                                      case 21:
                                          e.prev = 21, e.t0 = e.
                                          catch (1), Rt(e.t0, L, $, _);
                                      case 24:
                                          return e.prev = 24, L(Mt(a)), L(St(!0)), e.finish(24);
                                      case 28:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [1, 21, 24, 28]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }(),
                      G = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          "disabled" !== J && R(!0);
                                      case 1:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e)
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }(),
                      Z = Object(Gt.useSprings)(V.length, (function(e) {
                          return Object(p.a)(Object(p.a)({}, {
                              x: 0,
                              y: 0,
                              scale: 1
                          }), {}, {
                              from: {
                                  x: 0,
                                  rot: 0,
                                  scale: 1,
                                  y: 0
                              }
                          })
                      })),
                      ee = Object(l.a)(Z, 2),
                      ne = ee[0],
                      ce = ee[1],
                      re = Object(Gn.a)((function(n) {
                          var c, r, i, s, d, o, u = Object(l.a)(n.args, 1)[0];
                          if (n.tap) {
                              var f = document.getElementById("cows-select-".concat(u));
                              null != f && (c = f.getBoundingClientRect()), a.current && t.current && (r = a.current.getBoundingClientRect(), i = t.current.getBoundingClientRect()), ce.start((function(a) {
                                  if (u === a) {
                                      if (2 === e.data[a].gender) {
                                          if (null !== k && k !== e.data[a]) return;
                                          var t, n, l, f, b, m, p, v;
                                          if (k === e.data[a]) w(null), o = 1, s = 1 * ((null === (t = c) || void 0 === t ? void 0 : t.x) - (null === (n = i) || void 0 === n ? void 0 : n.x)), d = 1 * ((null === (l = c) || void 0 === l ? void 0 : l.y) - (null === (f = i) || void 0 === f ? void 0 : f.y));
                                          else w(e.data[a]), o = 1.4, s = -1 * ((null === (b = c) || void 0 === b ? void 0 : b.x) - (null === (m = i) || void 0 === m ? void 0 : m.x)), d = -1 * ((null === (p = c) || void 0 === p ? void 0 : p.y) - (null === (v = i) || void 0 === v ? void 0 : v.y))
                                      } else if (1 === e.data[a].gender) {
                                          if (null !== h && h !== e.data[a]) return;
                                          var g, x, O, y, A, C, N, S;
                                          if (h === e.data[a]) o = 1, j(null), s = 1 * ((null === (g = c) || void 0 === g ? void 0 : g.x) - (null === (x = r) || void 0 === x ? void 0 : x.x)), d = 1 * ((null === (O = c) || void 0 === O ? void 0 : O.y) - (null === (y = r) || void 0 === y ? void 0 : y.y));
                                          else o = 1.4, j(e.data[a]), s = -1 * ((null === (A = c) || void 0 === A ? void 0 : A.x) - (null === (C = r) || void 0 === C ? void 0 : C.x)), d = -1 * ((null === (N = c) || void 0 === N ? void 0 : N.y) - (null === (S = r) || void 0 === S ? void 0 : S.y))
                                      }
                                      return {
                                          x: s,
                                          y: d,
                                          scale: o,
                                          delay: void 0
                                      }
                                  }
                              }))
                          }
                      })),
                      ie = Object(n.useRef)(null),
                      se = function() {
                          I("cows-breeding-down"), setTimeout((function() {
                              e.isClose(), I(null)
                          }), 500)
                      };
                  return i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsxs)("div", {
                          className: "modal-wrapper",
                          tabIndex: -1,
                          role: "dialog",
                          children: [!0 === D && Object(ae.jsx)(dc, {
                              HandleCancel: function() {
                                  return R(!1)
                              },
                              cowMale: h,
                              cowFemale: k,
                              handelCowMale: function() {
                                  return j(null)
                              },
                              handelCowFeMale: function() {
                                  return w(null)
                              },
                              handleCowBreeding: function() {
                                  return N(!1)
                              }
                          }), Object(ae.jsxs)("div", {
                              className: "cows-breeding ".concat(B),
                              style: {
                                  backgroundImage: "url(/img/Board.png)"
                              },
                              ref: ie,
                              children: [Object(ae.jsx)("div", {
                                  className: "cows-breeding__header--tilte",
                                  style: {
                                      backgroundImage: "url(./img/border-button.png)"
                                  },
                                  children: "Breeding"
                              }), Object(ae.jsx)("img", {
                                  src: Jt,
                                  alt: "Close",
                                  className: "close-cows-modal image-button",
                                  onClick: function() {
                                      return se()
                                  }
                              }), Object(ae.jsx)("div", {
                                  className: "cows-breeding__list",
                                  children: Object(ae.jsxs)("section", {
                                      className: "cows-vertical-carousel-container",
                                      children: [Object(ae.jsxs)("div", {
                                          className: "cows-breeding__drop",
                                          style: {
                                              backgroundImage: "url(/img/market-paper.png)"
                                          },
                                          children: [Object(ae.jsxs)("div", {
                                              className: "cows-breeding__drop--type",
                                              children: [Object(ae.jsxs)("div", {
                                                  className: "cows-breeding__drop--img",
                                                  ref: t,
                                                  children: [C ? Object(ae.jsx)(ae.Fragment, {
                                                      children: k ? Object(ae.jsx)("img", {
                                                          className: "cows-breeding__drop--icon",
                                                          src: oc + k.img,
                                                          style: {
                                                              transform: "scale(1.9)"
                                                          },
                                                          alt: "",
                                                          id: "cow-female"
                                                      }) : Object(ae.jsx)("img", {
                                                          className: "cows-breeding__drop--icon",
                                                          src: "./img/female.png",
                                                          alt: "",
                                                          id: "cow-female"
                                                      })
                                                  }) : Object(ae.jsx)(ae.Fragment, {
                                                      children: !k && Object(ae.jsx)("img", {
                                                          className: "cows-breeding__drop--icon",
                                                          src: "./img/female.png",
                                                          alt: "",
                                                          id: "cow-female"
                                                      })
                                                  }), Object(ae.jsx)("img", {
                                                      className: "cows-breeding__drop--frames",
                                                      src: "./img/tall-card-border.png",
                                                      alt: ""
                                                  })]
                                              }), Object(ae.jsxs)("div", {
                                                  className: "cows-breeding__drop--img",
                                                  ref: a,
                                                  children: [C ? Object(ae.jsx)(ae.Fragment, {
                                                      children: h ? Object(ae.jsx)("img", {
                                                          className: "cows-breeding__drop--icon",
                                                          src: oc + h.img,
                                                          alt: "",
                                                          style: {
                                                              transform: "scale(1.9)"
                                                          },
                                                          id: "cow-female"
                                                      }) : Object(ae.jsx)("img", {
                                                          className: "cows-breeding__drop--icon",
                                                          src: "./img/male.png",
                                                          alt: "",
                                                          id: "male"
                                                      })
                                                  }) : Object(ae.jsx)(ae.Fragment, {
                                                      children: !h && Object(ae.jsx)("img", {
                                                          className: "cows-breeding__drop--icon",
                                                          src: "./img/male.png",
                                                          alt: "",
                                                          id: "male"
                                                      })
                                                  }), Object(ae.jsx)("img", {
                                                      className: "cows-breeding__drop--frames",
                                                      src: "./img/tall-card-border.png",
                                                      alt: ""
                                                  })]
                                              })]
                                          }), Object(ae.jsx)("div", {
                                              className: "breeding-progress",
                                              children: Object(ae.jsx)(Mn, Object(p.a)(Object(p.a)({}, m[0]), {}, {
                                                  handleFinish: b,
                                                  height: 1.8
                                              }))
                                          }), Object(ae.jsxs)("div", {
                                              className: "cows-breeding__drop-button",
                                              children: [Object(ae.jsx)(te, {
                                                  text: W,
                                                  atr: "semi-short",
                                                  isDisabled: Y,
                                                  wrapperClassname: "full-width",
                                                  handleClick: function() {
                                                      m.length >= 1 ? H() : P()
                                                  }
                                              }), Object(ae.jsx)(te, {
                                                  text: "Cancel",
                                                  atr: "semi-short red",
                                                  isDisabled: J,
                                                  wrapperClassname: "full-width",
                                                  handleClick: G
                                              })]
                                          })]
                                      }), ne.map((function(e, a) {
                                          var t = e.x,
                                              c = e.y,
                                              r = e.scale;
                                          return Object(n.createElement)(Gt.animated.div, Object(p.a)(Object(p.a)({}, re(a)), {}, {
                                              key: a,
                                              style: {
                                                  transform: Object(Gt.to)([t, c, r], (function(e, a, t) {
                                                      return "translate3d(".concat(e, "px,").concat(a, "px,0)")
                                                  })),
                                                  position: "relative",
                                                  height: "max-content"
                                              },
                                              id: "cows-select-".concat(a)
                                          }), Object(ae.jsx)(Gt.animated.img, {
                                              style: {
                                                  transform: Object(Gt.to)([t, c, r], (function(e, a, t) {
                                                      return "scale(".concat(t, ") ").concat(1.4 === t ? "translate3d(13%,14%,0)" : "translate3d(0,0,0)")
                                                  }))
                                              },
                                              src: oc + V[a].img,
                                              alt: a,
                                              className: "cows-select"
                                          }, a))
                                      }))]
                                  })
                              })]
                          }), Object(ae.jsx)("div", {
                              className: "click-out-side",
                              onClick: function() {
                                  return se()
                              }
                          })]
                      })
                  }), document.body)
              }
              var lc = ["./img/babyCaft-1.png", "./img/babyCaft-2.png"],
                  fc = ["./img/caft-1.png", "./img/caft-2.png"],
                  bc = ["./img/cow-1.png", "./img/cow-2.png"];
  
              function mc(e) {
                  var a = Object(u.c)((function(e) {
                      return e.animals.cowUsing
                  })),
                      t = Object(u.c)((function(e) {
                          return e.breeding.breedings
                      })),
                      c = Object(n.useState)(),
                      r = Object(l.a)(c, 2),
                      i = r[0],
                      s = r[1],
                      d = Object(n.useState)(!1),
                      o = Object(l.a)(d, 2),
                      f = o[0],
                      b = o[1],
                      m = a.filter((function(e) {
                          return e.name.includes("Bull") || e.name.includes("Dairy")
                      })).filter((function(e) {
                          var a, n;
                          return (null === (a = t[0]) || void 0 === a ? void 0 : a.bearer_id) !== e.asset_id && (null === (n = t[0]) || void 0 === n ? void 0 : n.partner_id) !== e.asset_id
                      })),
                      p = a.filter((function(e) {
                          var a, n;
                          return e.asset_id.includes(null === (a = t[0]) || void 0 === a ? void 0 : a.bearer_id) || e.asset_id.includes(null === (n = t[0]) || void 0 === n ? void 0 : n.partner_id)
                      })),
                      v = Object(u.b)(),
                      g = function(e) {
                          s(e)
                      }, h = function() {
                          s(-1)
                      }, j = function(e) {
                          v(an(0)), v(Le(e))
                      };
                  return Object(ae.jsxs)(ae.Fragment, {
                      children: [Object(ae.jsxs)("div", {
                          className: "game-container__image",
                          children: [Object(ae.jsx)("div", {
                              className: "button-cow-breeding",
                              children: Object(ae.jsx)(te, {
                                  text: "Breeding",
                                  handleClick: function() {
                                      return b(!0)
                                  },
                                  atr: "semi-long"
                              })
                          }), a.map((function(a, t) {
                              return a.name.includes("Baby") ? Object(ae.jsx)("img", {
                                  className: "".concat(t === i ? "cow cow-hover" : null, " cows-").concat((t + e.xRandom) % 6 + 1),
                                  src: lc[(t + e.xRandom) % 3],
                                  alt: t,
                                  onMouseEnter: function() {
                                      return g(t)
                                  },
                                  onMouseLeave: function() {
                                      return h()
                                  },
                                  onClick: function() {
                                      return j(t)
                                  }
                              }, t) : a.name.includes("Calf") ? Object(ae.jsx)("img", {
                                  className: "".concat(t === i ? "cow cow-hover" : null, " cows-").concat((t + e.xRandom) % 6 + 1),
                                  src: fc[(t + e.xRandom) % 2],
                                  alt: t,
                                  onMouseEnter: function() {
                                      return g(t)
                                  },
                                  onMouseLeave: function() {
                                      return h()
                                  },
                                  onClick: function() {
                                      return j(t)
                                  }
                              }, t) : a.name.includes("Bull") || a.name.includes("Dairy") ? Object(ae.jsx)("img", {
                                  className: "".concat(t === i ? "cow cow-hover" : null, " cows-").concat((t + e.xRandom) % 6 + 1),
                                  src: bc[(t + e.xRandom) % 2],
                                  alt: t,
                                  onMouseEnter: function() {
                                      return g(t)
                                  },
                                  onMouseLeave: function() {
                                      return h()
                                  },
                                  onClick: function() {
                                      return j(t)
                                  }
                              }, t) : null
                          }))]
                      }), f && Object(ae.jsx)(uc, {
                          isClose: function() {
                              return b(!1)
                          },
                          data: m,
                          breedings: t,
                          cowBreeding: p
                      })]
                  })
              }
              var pc = ["./img/chicken-1.png", "./img/chicken-2.png", "./img/chicken-3.png"],
                  vc = ["./img/chick-1.png", "./img/chick-2.png", "./img/chick-3.png"],
                  gc = ["./img/egg-nest.png"];
  
              function hc(e) {
                  var a = Object(u.c)((function(e) {
                      return e.animals.chickenUsing
                  })),
                      t = Object(n.useState)(),
                      c = Object(l.a)(t, 2),
                      r = c[0],
                      i = c[1],
                      s = Object(u.b)(),
                      d = function(e) {
                          i(e)
                      }, o = function() {
                          i(-1)
                      }, f = function(e) {
                          s(an(0)), s(Le(e))
                      };
                  return Object(ae.jsx)(ae.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "game-container__image",
                          children: a.map((function(a, t) {
                              switch (a.template_id) {
                                  case 298614:
                                      return Object(ae.jsx)("img", {
                                          className: "chicken ".concat(t === r ? "chicken-hover" : null, " chicken-").concat((t + e.xRandom) % 3 + 1),
                                          src: pc[(t + e.xRandom) % 3],
                                          alt: t,
                                          onMouseEnter: function() {
                                              return d(t)
                                          },
                                          onMouseLeave: function() {
                                              return o()
                                          },
                                          onClick: function() {
                                              return f(t)
                                          }
                                      }, t);
                                  case 298613:
                                      return Object(ae.jsx)("img", {
                                          className: "chicken ".concat(t === r ? "chicken-hover" : null, " chick-").concat((t + e.xRandom) % 3 + 1),
                                          src: vc[(t + e.xRandom) % 3],
                                          alt: t,
                                          onMouseEnter: function() {
                                              return d(t)
                                          },
                                          onMouseLeave: function() {
                                              return o()
                                          },
                                          onClick: function() {
                                              return f(t)
                                          }
                                      }, t);
                                  case 298612:
                                      return Object(ae.jsx)("img", {
                                          className: "egg-nest chicken ".concat(t === r ? "chicken-hover" : null),
                                          src: gc[0],
                                          alt: t,
                                          onMouseEnter: function() {
                                              return d(t)
                                          },
                                          onMouseLeave: function() {
                                              return o()
                                          },
                                          onClick: function() {
                                              return f(t)
                                          }
                                      }, t)
                              }
                              return null
                          }))
                      })
                  })
              }
              var jc = ["./img/corn.png", "./img/barley.png"];
  
              function xc() {
                  var e = Object(u.c)((function(e) {
                      return e.plants.plantsUsing
                  })),
                      a = Object(u.b)(),
                      t = function(e) {
                          a(an(0)), a(Le(e))
                      };
                  return Object(ae.jsx)(ae.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "game-container__image--rice",
                          children: null === e || void 0 === e ? void 0 : e.map((function(e, a) {
                              return Object(ae.jsxs)(ae.Fragment, {
                                  children: [e.name.includes("Corn") && Object(ae.jsx)("img", {
                                      className: "rice",
                                      src: jc[0],
                                      alt: a,
                                      onClick: function() {
                                          return t(a)
                                      }
                                  }, a), e.name.includes("Barley") && Object(ae.jsx)("img", {
                                      className: "rice",
                                      src: jc[1],
                                      alt: a,
                                      onClick: function() {
                                          return t(a)
                                      }
                                  }, a)]
                              })
                          }))
                      })
                  })
              }
              var Oc = "https://mypinata.cloud/ipfs/";
  
              function kc(e) {
                  var a, t = Object(u.c)(je),
                      c = parseFloat(null === t || void 0 === t ? void 0 : t.gold),
                      r = Object(n.useRef)(null),
                      i = Object(n.useState)(0),
                      s = Object(l.a)(i, 2),
                      f = s[0],
                      b = s[1],
                      m = Object(n.useState)(c > e.data[f].price ? 1 : 0),
                      p = Object(l.a)(m, 2),
                      v = p[0],
                      g = p[1],
                      h = Object(n.useState)(),
                      j = Object(l.a)(h, 2),
                      x = j[0],
                      O = j[1],
                      k = Object(u.b)(),
                      w = v > 0 || "disabled",
                      y = Object(n.useState)(0),
                      A = Object(l.a)(y, 2),
                      C = A[0],
                      N = A[1];
                  Object(n.useEffect)((function() {
                      N(v ? v * e.data[f].price : 0)
                  }), [v, f, e.data]);
                  var S = function() {
                      var a = Object(o.a)(d.a.mark((function a() {
                          var t, n, c, r;
                          return d.a.wrap((function(a) {
                              for (;;) switch (a.prev = a.next) {
                                  case 0:
                                      if (a.prev = 0, k(Et(!1)), "disabled" === w) {
                                          a.next = 8;
                                          break
                                      }
                                      return t = {
                                          quantity: v,
                                          template_id: e.data[f].template_id
                                      }, a.next = 6, k(Aa(t)).unwrap();
                                  case 6:
                                      null !== (null === (n = a.sent) || void 0 === n ? void 0 : n.transaction_id) && (c = Date.now(), r = {
                                          id: c,
                                          content: "Buying ".concat(e.data[f].name),
                                          timeout: 5e3
                                      }, k(Tt(r)));
                                  case 8:
                                      a.next = 13;
                                      break;
                                  case 10:
                                      a.prev = 10, a.t0 = a.
                                      catch (0), Rt(a.t0, k, $, _);
                                  case 13:
                                      return a.prev = 13, k(Nt(!0)), a.finish(13);
                                  case 16:
                                  case "end":
                                      return a.stop()
                              }
                          }), a, null, [
                              [0, 10, 13, 16]
                          ])
                      })));
                      return function() {
                          return a.apply(this, arguments)
                      }
                  }(),
                      E = function() {
                          O("market-container-down"), setTimeout((function() {
                              e.handleClose()
                          }), 350)
                      };
                  return Object(ae.jsxs)(ae.Fragment, {
                      children: [Object(ae.jsxs)("section", {
                          className: "market-container ".concat(x),
                          style: {
                              backgroundImage: "url(/img/Board.png)"
                          },
                          ref: r,
                          children: [Object(ae.jsx)("div", {
                              className: "cows-market__header--tilte",
                              style: {
                                  backgroundImage: "url(./img/border-button.png)"
                              },
                              children: "Market"
                          }), Object(ae.jsx)("img", {
                              src: Jt,
                              alt: "Close",
                              className: "close-market-modal image-button",
                              onClick: function() {
                                  return E()
                              }
                          }), Object(ae.jsxs)("div", {
                              className: "market-item__wrapper",
                              style: {
                                  backgroundImage: "url(/img/market-paper.png)"
                              },
                              children: [Object(ae.jsx)("div", {
                                  className: "market-item",
                                  children: Object(ae.jsx)("img", {
                                      src: Oc + e.data[f].img,
                                      className: "market-item__img",
                                      alt: "sale"
                                  })
                              }), Object(ae.jsxs)("div", {
                                  className: "market-input-container",
                                  children: [Object(ae.jsx)("img", {
                                      src: "/img/minus.png",
                                      alt: "minus",
                                      onClick: function() {
                                          return g(v - 1 >= 0 ? v - 1 : 0)
                                      },
                                      className: "market-input--img"
                                  }), Object(ae.jsx)("input", {
                                      type: "number",
                                      min: 1,
                                      value: v,
                                      onChange: function(e) {
                                          return a = e.target.value, void g(parseInt(a));
                                          var a
                                      },
                                      className: "market-input"
                                  }), Object(ae.jsx)("img", {
                                      src: "/img/plus.png",
                                      alt: "plus",
                                      onClick: function() {
                                          c > (v + 1) * parseFloat(e.data[f].price) ? g(v + 1) : (k($("Your gold balance is not enough!")), k(_(!0)))
                                      },
                                      className: "market-input--img"
                                  })]
                              }), Object(ae.jsx)("div", {
                                  className: "market-btn__wrapper",
                                  children: Object(ae.jsxs)("button", {
                                      className: "buy-btn__wrapper",
                                      onClick: function() {
                                          return S()
                                      },
                                      children: [Object(ae.jsx)("span", {
                                          children: C
                                      }), Object(ae.jsx)("img", {
                                          src: "/img/plain-gold-icon.png",
                                          alt: ""
                                      })]
                                  })
                              }), Object(ae.jsx)("div", {
                                  className: "market-update__wrapper",
                                  children: "Market is updated at 00:00 UTC every Sunday."
                              })]
                          }), Object(ae.jsx)("div", {
                              className: "market-list__wrapper",
                              children: null === (a = e.data) || void 0 === a ? void 0 : a.map((function(a, t) {
                                  return Object(ae.jsxs)("div", {
                                      className: "market-item",
                                      children: [Object(ae.jsxs)("div", {
                                          className: "market-item__img",
                                          children: [(null === a || void 0 === a ? void 0 : a.charge_time) && Object(ae.jsxs)("div", {
                                              className: "market-note tooltip",
                                              children: [Object(ae.jsxs)("div", {
                                                  className: "market-note__content tooltiptext tooltip-bottom",
                                                  children: [Object(ae.jsx)("div", {
                                                      className: "note-title",
                                                      children: Object(ae.jsx)("div", {
                                                          className: "note-title__name",
                                                          children: a.name
                                                      })
                                                  }), Object(ae.jsxs)("div", {
                                                      className: "note-content ",
                                                      children: [Object(ae.jsxs)("div", {
                                                          className: "note-content-info-label",
                                                          children: [Object(ae.jsx)("span", {
                                                              children: "Charge Time"
                                                          }), Object(ae.jsx)("div", {
                                                              className: "info-description",
                                                              children: a.charge_time
                                                          })]
                                                      }), Object(ae.jsxs)("div", {
                                                          className: "note-content-info-label",
                                                          children: [Object(ae.jsx)("span", {
                                                              children: "Energy Consumed"
                                                          }), Object(ae.jsx)("div", {
                                                              className: "info-description",
                                                              children: a.energy_consumed
                                                          })]
                                                      }), Object(ae.jsxs)("div", {
                                                          className: "note-content-info-label",
                                                          children: [Object(ae.jsx)("span", {
                                                              children: "Required Claim"
                                                          }), Object(ae.jsx)("div", {
                                                              className: "info-description",
                                                              children: a.required_claims
                                                          })]
                                                      })]
                                                  })]
                                              }), Object(ae.jsx)("img", {
                                                  className: "market-note__button image-button",
                                                  src: "/img/note-icon.png",
                                                  alt: "info"
                                              })]
                                          }), Object(ae.jsx)("img", {
                                              onClick: function() {
                                                  return function(a) {
                                                      b(a), c > parseFloat(e.data[a].price) ? g(1) : g(0)
                                                  }(t)
                                              },
                                              src: Oc + a.img,
                                              alt: t,
                                              className: t === f ? "market-item__img active" : "market-item__img"
                                          })]
                                      }), Object(ae.jsxs)("div", {
                                          className: "market-item__price",
                                          children: [Object(ae.jsx)("span", {
                                              children: a.price
                                          }), Object(ae.jsx)("img", {
                                              src: "/img/plain-gold-icon.png",
                                              alt: "gold"
                                          })]
                                      })]
                                  }, t)
                              }))
                          })]
                      }), Object(ae.jsx)("div", {
                          className: "click-out-side",
                          onClick: function() {
                              return E()
                          }
                      })]
                  })
              }
  
              function wc(e) {
                  var a = Object(u.b)(),
                      t = Object(u.c)((function(e) {
                          return e.market.marketConfig
                      })),
                      n = Object(u.c)((function(e) {
                          return e.plants.plantsConfig
                      })),
                      r = Object(u.c)((function(e) {
                          return e.animals.animalsConfig
                      })),
                      s = null === n || void 0 === n ? void 0 : n.concat(r),
                      d = [];
                  return t.forEach((function(e) {
                      var a = s.find((function(a) {
                          return a.template_id === e.template_id
                      })),
                          t = Object.assign({}, e),
                          n = Object.assign({}, a),
                          c = Object.assign(t, n);
                      d.push(c)
                  })), i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "modal-wrapper",
                          tabIndex: -1,
                          role: "dialog",
                          children: Object(ae.jsx)(kc, {
                              data: d,
                              handleClose: function() {
                                  return a(an(0))
                              }
                          })
                      })
                  }), document.body)
              }
              var yc = function() {
                  var e = Object(u.b)(),
                      a = Object(u.c)((function(e) {
                          return e.game.claimAssets
                      })),
                      t = a.length > 0,
                      r = function() {
                          var a = Object(o.a)(d.a.mark((function a() {
                              return d.a.wrap((function(a) {
                                  for (;;) switch (a.prev = a.next) {
                                      case 0:
                                          return a.prev = 0, a.next = 3, e($e(!1)).unwrap();
                                      case 3:
                                          a.sent && (e($("You get your Membership successfully!")), e(_(!0))), a.next = 10;
                                          break;
                                      case 7:
                                          a.prev = 7, a.t0 = a.
                                          catch (0), Rt(a.t0, e, $, _);
                                      case 10:
                                          return a.prev = 10, e(St(!0)), a.finish(10);
                                      case 13:
                                      case "end":
                                          return a.stop()
                                  }
                              }), a, null, [
                                  [0, 7, 10, 13]
                              ])
                          })));
                          return function() {
                              return a.apply(this, arguments)
                          }
                      }(),
                      s = Object(n.useRef)(null),
                      l = function(a) {
                          s.current && !s.current.contains(a.target) && e(_(!1))
                      };
                  return Object(n.useEffect)((function() {
                      return document.addEventListener("click", l, !0),
                      function() {
                          document.removeEventListener("click", l, !0)
                      }
                  })), t && i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsx)("div", {
                          className: "modal-wrapper",
                          tabIndex: -1,
                          role: "dialog",
                          children: Object(ae.jsxs)("div", {
                              style: {
                                  backgroundImage: "url(./img/big-board.png)"
                              },
                              className: "modal",
                              ref: s,
                              children: [Object(ae.jsxs)("div", {
                                  className: "modal-content mid",
                                  children: ["You are having ", a.length, " Membership stuck in Farmers World. Do you want to take it?"]
                              }), Object(ae.jsxs)("div", {
                                  className: "modal__button-group token",
                                  children: [Object(ae.jsx)(te, {
                                      type: "button",
                                      atr: "short",
                                      "data-dismiss": "modal",
                                      text: "Accept",
                                      handleClick: function() {
                                          return r()
                                      }
                                  }), Object(ae.jsx)(te, {
                                      type: "button",
                                      atr: "short",
                                      "data-dismiss": "modal",
                                      text: "Cancel",
                                      handleClick: function() {
                                          return e(Ft())
                                      }
                                  })]
                              })]
                          })
                      })
                  }), document.body)
              }, Ac = "https://mypinata.cloud/ipfs/";
              var Cc, Nc = (Cc = 4, Math.floor(Math.random() * Cc));
              var Sc = Object(Kt.withOrientationChange)((function(e) {
                  var a, t, c, r, i, s = Object(u.c)((function(e) {
                          return e.game.lackingResource
                      })),
                      f = Object(u.c)((function(e) {
                          return e.auth.splash
                      })),
                      b = Object(u.c)((function(e) {
                          return e.navBar.selectedTab
                      })),
                      m = Object(u.c)((function(e) {
                          return e.auth.isLoggedIn
                      })),
                      p = Object(u.c)((function(e) {
                          return e.game.status
                      })),
                      v = Object(u.c)((function(e) {
                          return e.game.update
                      })),
                      g = Object(u.c)((function(e) {
                          return e.game.backgroundUpdateStatus
                      })),
                      h = Object(u.c)((function(e) {
                          return e.game.selectedMap
                      })),
                      j = Object(u.c)((function(e) {
                          return e.tools.usingItems
                      })),
                      x = Object(u.c)((function(e) {
                          return e.badge.usingBadges
                      })),
                      O = j.concat(x),
                      k = Object(u.c)((function(e) {
                          return e.atomic.refundAmount
                      })),
                      w = Object(u.c)((function(e) {
                          return e.atomic.tools
                      })),
                      y = Object(u.c)((function(e) {
                          return e.atomic.memberships
                      })),
                      A = Object(u.c)((function(e) {
                          return e.atomic.farmanimals
                      })),
                      C = Object(u.c)((function(e) {
                          return e.atomic.farmbuilding
                      })),
                      N = Object(u.c)((function(e) {
                          return e.atomic.plants
                      })),
                      S = Object(u.c)((function(e) {
                          return e.atomic.foods
                      })),
                      E = Object(u.c)((function(e) {
                          return e.coin.coinConfig
                      })),
                      B = null === w || void 0 === w || null === (a = w.concat(A)) || void 0 === a || null === (t = a.concat(y)) || void 0 === t || null === (c = t.concat(C)) || void 0 === c || null === (r = c.concat(N)) || void 0 === r || null === (i = r.concat(E)) || void 0 === i ? void 0 : i.concat(S),
                      I = Object(u.c)((function(e) {
                          return e.tools.EquipConfigs
                      })),
                      U = Object(n.useState)(0),
                      F = Object(l.a)(U, 2),
                      D = F[0],
                      R = F[1],
                      q = Object(u.c)((function(e) {
                          return e.atomic.refundConf
                      })),
                      K = Object(u.c)((function(e) {
                          return e.game.isGameLoaded
                      })),
                      V = Object(u.b)(),
                      Q = Object(n.useRef)(h);
                  Object(n.useEffect)((function() {
                      function e() {
                          return (e = Object(o.a)(d.a.mark((function e() {
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          return e.next = 2, Se(200);
                                      case 2:
                                          Q.current = h;
                                      case 3:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e)
                          })))).apply(this, arguments)
                      }! function() {
                          e.apply(this, arguments)
                      }()
                  }), [h]), Object(n.useEffect)((function() {
                      var e = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          if (e.prev = 0, !m || "idle" !== p) {
                                              e.next = 4;
                                              break
                                          }
                                          return e.next = 4, V(mt()).unwrap();
                                      case 4:
                                          e.next = 9;
                                          break;
                                      case 6:
                                          e.prev = 6, e.t0 = e.
                                          catch (0), Rt(e.t0, V, $, _);
                                      case 9:
                                          return e.prev = 9, V(Nt(!1)), V(St(!1)), e.finish(9);
                                      case 13:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [0, 6, 9, 13]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }();
                      e()
                  }), [m, p, V]), Object(n.useEffect)((function() {
                      var e = [];
                      "loaded" === K && !0 === f && function() {
                          I.forEach((function(a) {
                              if (void 0 !== e[Ac + a.img]) return null;
                              var t = new Image;
                              t.src = Ac + a.img, window[t.src] = t, e.push(t.src)
                          })), B.forEach((function(a) {
                              var t;
                              if (void 0 !== e[Ac + (null === a || void 0 === a || null === (t = a.data) || void 0 === t ? void 0 : t.img)]) return null;
                              var n, c = new Image;
                              c.src = Ac + (null === a || void 0 === a || null === (n = a.data) || void 0 === n ? void 0 : n.img), window[c.src] = c, e.push(c.src)
                          }));
                          var a = 0;
                          e.forEach((function(t) {
                              window[t].onload = function() {
                                  (a += 1) === e.length - 5 && R(D + 1)
                              }
                          }))
                      }()
                  }), [I, B, K, D, f, V]), Object(n.useEffect)((function() {
                      var e = [];
                      ! function() {
                          sc.forEach((function(a) {
                              if (void 0 !== e[a]) return null;
                              var t = new Image;
                              t.src = a, window[t.src] = t, e.push(t.src)
                          }));
                          var a = 0;
                          e.forEach((function(t) {
                              window[t].onload = function() {
                                  ++a === e.length && R(D + 1)
                              }
                          }))
                      }()
                  }), []), Object(n.useEffect)((function() {
                      (v || g) && Se(3e3).then((function() {
                          V(!0 === g ? pt() : mt()), V(St(!1)), V(Nt(!1))
                      }))
                  }), [v, g, V]), Object(n.useEffect)((function() {
                      2 === D && V(Y(!1))
                  }), [D, V]), Object(n.useEffect)((function() {
                      return 0 === O.length && (null === w || void 0 === w ? void 0 : w.length) > 0 && "loaded" === K ? V(an(1)) : V(an(0)),
                      function() {}
                  }), [K]), Object(n.useEffect)((function() {
                      var e = function() {
                          var e = Object(o.a)(d.a.mark((function e() {
                              var a;
                              return d.a.wrap((function(e) {
                                  for (;;) switch (e.prev = e.next) {
                                      case 0:
                                          return e.prev = 0, e.next = 3, V(it()).unwrap();
                                      case 3:
                                          if (!(null === (a = e.sent) || void 0 === a ? void 0 : a.transaction_id)) {
                                              e.next = 9;
                                              break
                                          }
                                          return V($("You have been refunded ".concat(k, " successfully. Thank you for your cooperation!"))), V(_(!0)), e.next = 9, V(rt()).unwrap();
                                      case 9:
                                          e.next = 15;
                                          break;
                                      case 11:
                                          e.prev = 11, e.t0 = e.
                                          catch (0), Rt(e.t0, V, $), V(_(!0));
                                      case 15:
                                          return e.prev = 15, V(Nt(!0)), e.finish(15);
                                      case 18:
                                      case "end":
                                          return e.stop()
                                  }
                              }), e, null, [
                                  [0, 11, 15, 18]
                              ])
                          })));
                          return function() {
                              return e.apply(this, arguments)
                          }
                      }();
                      "loaded" === K && !1 === f && q.length > 0 && e()
                  }), [K, f, q, k, V]);
                  var M = function() {
                      switch (h) {
                          case 1:
                              return Object(ae.jsx)(hc, {
                                  xRandom: Nc
                              });
                          case 2:
                              return Object(ae.jsx)(xc, {});
                          case 3:
                              return Object(ae.jsx)(mc, {
                                  xRandom: Nc
                              })
                      }
                  }, T = function(e) {
                          switch (e) {
                              case 0:
                                  return Object(ae.jsx)("div", {
                                      className: "wapper",
                                      children: Object(ae.jsx)(hn, {})
                                  });
                              case 1:
                                  return Object(ae.jsxs)("div", {
                                      className: "wapper",
                                      children: [Object(ae.jsx)(kn, {}), ";"]
                                  });
                              case 2:
                                  return Object(ae.jsx)("div", {
                                      className: "wapper",
                                      children: Object(ae.jsx)(An, {})
                                  });
                              case 3:
                                  return Object(ae.jsx)("div", {
                                      className: "wapper",
                                      children: Object(ae.jsx)(Qn, {})
                                  });
                              case 4:
                                  return Object(ae.jsx)(Xn, {});
                              case 5:
                                  return Object(ae.jsx)(wc, {});
                              case 7:
                                  return Object(ae.jsx)("div", {
                                      className: "wapper wapper-none"
                                  })
                          }
                      }, L = e.isLandscape;
                  return !f && Object(ae.jsxs)("div", {
                      className: "game-container ",
                      style: {
                          backgroundImage: "url(".concat(e.background, ")")
                      },
                      children: [" ", Q.current !== h ? Object(ae.jsx)("div", {
                          className: "fade-container"
                      }) : null, Kt.isDesktop ? Object(ae.jsx)(ic, {}) : null, Kt.isDesktop || L ? Object(ae.jsx)(ae.Fragment, {
                          children: Object(ae.jsxs)("div", {
                              className: "game-content",
                              children: [Object(ae.jsx)($t, {}), T(b), Object(ae.jsx)(nn, {}), Object(ae.jsx)(Wn, {}), M()]
                          })
                      }) : Object(ae.jsx)("div", {
                          children: "Rotate you Phone to have the best experience."
                      }), "" !== s && Object(ae.jsx)(Pn, {
                          lackingResource: s
                      }), Object(ae.jsx)(ne, {}), Object(ae.jsx)(Yn, {}), Object(ae.jsx)(yc, {}), Object(ae.jsx)(zt, {})]
                  })
              })),
                  Ec = Sc,
                  Bc = t(107),
                  Ic = t.n(Bc),
                  Uc = t(229);
  
              function Fc() {
                  var e = Object(u.c)((function(e) {
                      return e.auth.splash
                  }));
                  return Object(n.useEffect)((function() {
                      Ic.a.loadAnimation({
                          container: document.querySelector("#splash-container"),
                          animationData: Uc,
                          renderer: "svg",
                          loop: !0,
                          autoplay: !0
                      })
                  })), e ? i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                      children: Object(ae.jsx)("div", {
                          style: {
                              backgroundImage: "url(./img/login-background.jpg)"
                          },
                          className: "login-container",
                          children: Object(ae.jsx)("div", {
                              className: "splash-content",
                              id: "splash-container",
                              style: {
                                  width: "20%",
                                  height: "100%"
                              }
                          })
                      })
                  }), document.body) : null
              }
              var Dc = t(230),
                  Rc = function() {
                      var e = Object(u.c)((function(e) {
                          return e.game.status
                      })),
                          a = Object(u.c)((function(e) {
                              return e.tools.status
                          })),
                          t = Object(u.c)((function(e) {
                              return e.tools.usingItemsStatus
                          })),
                          r = Object(u.c)((function(e) {
                              return e.tools.itemListStatus
                          })),
                          s = Object(u.c)((function(e) {
                              return e.user.status
                          })),
                          d = Object(u.c)((function(e) {
                              return e.modal.isLoading
                          })),
                          o = Object(u.c)((function(e) {
                              return e.exchange.status
                          })),
                          l = Object(u.c)((function(e) {
                              return e.game.backgroundStatus
                          })),
                          f = Object(u.c)((function(e) {
                              return e.badge.status
                          })),
                          b = Object(u.c)((function(e) {
                              return e.game.isCanceled
                          })),
                          m = Object(u.c)((function(e) {
                              return e.auth.status
                          })),
                          p = Object(u.c)((function(e) {
                              return e.badge.isCrafting
                          })),
                          v = Object(u.c)((function(e) {
                              return e.animals.status
                          })),
                          g = Object(u.c)((function(e) {
                              return e.plants.status
                          })),
                          h = Object(u.c)((function(e) {
                              return e.market.status
                          })),
                          j = Object(u.c)((function(e) {
                              return e.foods.status
                          })),
                          x = Object(u.c)((function(e) {
                              return e.builds.status
                          })),
                          O = Object(u.c)((function(e) {
                              return e.breeding.status
                          })),
                          k = Object(u.c)((function(e) {
                              return e.atomic.status
                          })),
                          w = "loading" === m || "loading" === p,
                          y = ("loading" === m || "loading" === k || "loading" === o || "loading" === g || "loading" === h || "loading" === x || "loading" === O || "loading" === j || "loading" === f || "loading" === v || "loading" === e || "loading" === s || "loading" === a || "loading" === t || "loading" === r || d) && "loading" !== l && !b,
                          A = Object(u.b)();
                      return Object(n.useEffect)((function() {
                          Ic.a.loadAnimation({
                              container: document.querySelector("#loadingModal"),
                              animationData: Dc,
                              renderer: "svg",
                              loop: !0,
                              autoplay: !0
                          })
                      }), [y]), y ? i.a.createPortal(Object(ae.jsx)(c.a.Fragment, {
                          children: Object(ae.jsx)("div", {
                              className: "modal-wrapper",
                              "aria-modal": !0,
                              "aria-hidden": !0,
                              tabIndex: -1,
                              role: "dialog",
                              children: Object(ae.jsxs)("div", {
                                  className: "modal loading-modal",
                                  children: [!w && Object(ae.jsx)("div", {
                                      className: "modal-header",
                                      children: Object(ae.jsx)("img", {
                                          src: "./img/close-button.png",
                                          alt: "Close",
                                          className: "image-button close-modal",
                                          onClick: function() {
                                              return A(Et(!0))
                                          }
                                      })
                                  }), Object(ae.jsx)("div", {
                                      className: "modal-body",
                                      id: "loadingModal",
                                      style: {
                                          width: "300",
                                          height: "300"
                                      }
                                  }), Object(ae.jsx)("div", {
                                      className: "loading-modal--overlay"
                                  })]
                              })
                          })
                      }), document.body) : null
                  }, qc = (t(414), ["./img/home-background.jpg", "./img/chicken-background.jpg", "./img/crops-bg.jpg", "./img/cows-bg.jpg"]);
  
              function Kc() {
                  var e = Object(u.c)((function(e) {
                      return e.auth.isLoggedIn
                  })),
                      a = Object(u.c)((function(e) {
                          return e.auth.isRegisteredStatus
                      })),
                      t = Object(u.c)((function(e) {
                          return e.game.selectedMap
                      })),
                      r = Object(u.b)();
                  return Object(n.useEffect)((function() {
                      var e = window.location.search,
                          a = new URLSearchParams(e).get("ref");
                      localStorage.getItem("referral") || localStorage.setItem("referral", a || "")
                  }), []), Object(n.useEffect)((function() {
                      var t = function() {
                          var t = Object(o.a)(d.a.mark((function t() {
                              var n;
                              return d.a.wrap((function(t) {
                                  for (;;) switch (t.prev = t.next) {
                                      case 0:
                                          if (t.prev = 0, !1 !== a || !0 !== e) {
                                              t.next = 20;
                                              break
                                          }
                                          return t.next = 4, r(pe()).unwrap();
                                      case 4:
                                          if (n = t.sent, t.prev = 5, 0 !== n.length) {
                                              t.next = 11;
                                              break
                                          }
                                          return t.next = 9, r(M()).unwrap();
                                      case 9:
                                          t.next = 12;
                                          break;
                                      case 11:
                                          r(W(!0));
                                      case 12:
                                          r(Nt(!0)), t.next = 20;
                                          break;
                                      case 15:
                                          throw t.prev = 15, t.t0 = t.
                                          catch (5), Rt(t.t0, r, $, _), r(J(!1)), t.t0;
                                      case 20:
                                          t.next = 27;
                                          break;
                                      case 22:
                                          throw t.prev = 22, t.t1 = t.
                                          catch (0), Rt(t.t1, r, $, _), r(J(!1)), t.t1;
                                      case 27:
                                      case "end":
                                          return t.stop()
                                  }
                              }), t, null, [
                                  [0, 22],
                                  [5, 15]
                              ])
                          })));
                          return function() {
                              return t.apply(this, arguments)
                          }
                      }();
                      try {
                          t()
                      } catch (n) {
                          throw Rt(n, r, $, _), n
                      }
                  }), [e, a, r]), Object(n.useEffect)((function() {}), [e]), Object(n.useEffect)((function() {
                      r(V())
                  }), [r]), Object(ae.jsxs)("div", {
                      className: "body-container",
                      style: {
                          background: "".concat(e && a ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)) no-repeat top, url(".concat(qc[t], ") no-repeat top") : "white")
                      },
                      children: [e && a ? Object(ae.jsxs)(c.a.Fragment, {
                          children: [Object(ae.jsx)(Fc, {}), Object(ae.jsx)(Ec, {
                              background: qc[t]
                          })]
                      }) : Object(ae.jsx)(qt, {}), Object(ae.jsx)(Rc, {})]
                  })
              }
              var Vc = function(e) {
                  e && e instanceof Function && t.e(3).then(t.bind(null, 423)).then((function(a) {
                      var t = a.getCLS,
                          n = a.getFID,
                          c = a.getFCP,
                          r = a.getLCP,
                          i = a.getTTFB;
                      t(e), n(e), c(e), r(e), i(e)
                  }))
              }, Qc = Object(f.a)({
                      reducer: {
                          flash: Lt,
                          navBar: tn,
                          modal: ee,
                          tools: Ye,
                          auth: H,
                          user: ye,
                          game: Dt,
                          badge: ra,
                          exchange: me,
                          builds: fa,
                          animals: ya,
                          market: Na,
                          plants: qa,
                          coin: Ta,
                          foods: Ha,
                          packs: xn,
                          breeding: tt,
                          atomic: bt
                      },
                      middleware: Object(f.d)({
                          serializableCheck: !1
                      })
                  }),
                  Mc = t(422),
                  Tc = t(233);
              Mc.a({
                  dsn: "https://1dc75f01ef284d52a2569bc210f75dcd@o946368.ingest.sentry.io/5895298",
                  integrations: [new Tc.a.BrowserTracing],
                  tracesSampleRate: 1
              }), i.a.render(Object(ae.jsx)(c.a.StrictMode, {
                  children: Object(ae.jsx)(u.a, {
                      store: Qc,
                      children: Object(ae.jsx)(Kc, {})
                  })
              }), document.getElementById("root")), Vc()
          }
      },
      [
          [415, 1, 2]
      ]
  ]);