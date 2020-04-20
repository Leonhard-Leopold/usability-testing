var startTime,endTime,taskTimeout,tester_id,current_task,task_completion_array,re_counter=0;function getTimeOffset(){var t=(endTime=new Date)-startTime;return t/=1e3,Math.round(t)}function addCancelButton(){$(".logo > img").attr("src",window.browser.runtime.getURL("img/icon_big_white.png")),$("#usability_testing_addon_cancel").click(function(){confirm("Do you really want to cancel this usability test? Your results will not saved! Continue?")&&(clearTimeout(taskTimeout),removeOverlay(),window.browser.runtime.sendMessage({reason:"endCountdown",cancelTest:!0},function(t){}))})}function displayToast(t,i,e){console.log("display toast",i),$("#usability_testing_addon_overlay_toast").attr("style","").html("<h3>"+t+"</h3><p>"+i+"</p>"),setTimeout(function(){$("#usability_testing_addon_overlay_toast").attr("style","transform: scale(1) !important; opacity: 1 !important"),e>0&&setTimeout(function(){$("#usability_testing_addon_overlay_toast").attr("style","transform: scale(0) !important; opacity: 0 !important")},e)},0)}function removeOverlay(){$("#usability_testing_addon_overlay").remove()}function reinstateTask(t,i,e,n){var a;($("<button class='logo_button medium usability_testing_addon_cancel_task' id='usability_testing_addon_cancel_task_"+t.id+"' style='color: #ffffff !important; padding: 5px 7px !important; z-index: 16777271 !important; position: fixed !important; text-align: right !important;width: 125px !important; height: 30px !important; top: 10px !important; right: 9px !important; font-size: 15px !important;'><img src='"+window.browser.runtime.getURL("img/cancel.svg")+"' alt=''><span>Cancel Task!</span></button>").appendTo("body"),setTimeout(function(){$(".usability_testing_addon_cancel_task").click(function(){$(this).remove(),task_completion_array[t.id]=!0,clearTimeout(taskTimeout),n(!1,0)})},1e3),re_counter++,startTime=null!=e?new Date(e):new Date,"no_limit"!==t.time)&&(null!=e?(startTime=new Date(e),a=getTimeOffset()):a=0,a<0&&(a=0),console.log("offset = ",a," remaining secs",1e3*(parseInt(t.time)-a)),taskTimeout=setTimeout(function(){console.log("Out of time"),task_completion_array[t.id]?n(null,0,!0):(window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),task_completion_array[t.id]=!0,$("#usability_testing_addon_cancel_task_"+t.id).remove(),task_completion_array[t.id]=!0,n(!1,0))},1e3*(parseInt(t.time)-a)));if("css_id"===t.target.target_type)$("#"+t.target.target_css_ids.join(", #")).bind("click.usabilityTestHandler",function(){if(task_completion_array[t.id])n(null,0,!0);else{$("#usability_testing_addon_cancel_task_"+t.id).remove();let i=getTimeOffset();window.broswser.runtime.sendMessage({reason:"endCountdown"},function(t){}),clearTimeout(taskTimeout),task_completion_array[t.id]=!0,n(!0,i)}});else if("both"===t.target.target_type&&t.target.target_urls.includes(window.location.href))$("#"+t.target.target_css_ids.join(", #")).bind("click.usabilityTestHandler",function(){if(task_completion_array[t.id])n(null,0,!0);else{$("#usability_testing_addon_cancel_task_"+t.id).remove(),window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),clearTimeout(taskTimeout);let i=getTimeOffset();task_completion_array[t.id]=!0,n(!0,i)}});else if("url"===t.target.target_type&&t.target.target_urls.includes(window.location.href))if(task_completion_array[t.id])n(null,0,!0);else{let i=getTimeOffset();console.log("final calcs",i,e),window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),clearTimeout(taskTimeout),task_completion_array[t.id]=!0,n(!0,i)}}function displayStart(t){$("<div id='usability_testing_addon_overlay' style='opacity: 0  !important; background-color: rgba(50, 50, 50, 0.97) !important;  z-index: 16777270 !important; position: fixed !important; width: 100vw !important; height: 100vh !important; top: 0 !important; left: 0 !important;'><div class='usability_testing_addon_logo'><img src='"+window.browser.runtime.getURL("img/icon_big_white.png")+"' alt='logo'><span>Usability Test</span></div><div style='font-size: 24px  !important; position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; text-align: center !important; width: 80% !important;color:white!important;'>Enter your Name or Identification below:<br/><input type='text' placeholder='Name or Identification' id='usability_testing_addon_identification'><br/><br/><button id='usability_testing_addon_take_test' class='logo_button'> <img alt='' src='"+window.browser.runtime.getURL("img/next.svg")+"'/><span>Start Usability Test!</span></button></div><span id='usability_testing_addon_cancel' style='padding: 6px 7px !important; z-index: 16777271 !important; position: fixed !important; text-align: right !important; width: 50px !important; height: 50px !important; top: 15px !important; right: 30px !important; font-size: 50px !important;'>X</span></div>").appendTo("body"),addCancelButton(),setTimeout(function(){$("#usability_testing_addon_overlay").css("transition","opacity 0.25s ease-out").css("opacity","1")},0),$("#usability_testing_addon_take_test").click(function(){tester_id=$("#usability_testing_addon_identification").val(),removeOverlay(),t()})}function displayTask(t,i,e){console.log("the remaining time is ",i),$("<div id='usability_testing_addon_overlay' style='background-color: rgba(50, 50, 50, 0.97) !important; z-index: 16777270 !important; position: fixed !important; width: 100vw !important; height: 100vh !important; top: 0 !important; left: 0 !important;'><div class='usability_testing_addon_logo'><img src='"+window.browser.runtime.getURL("img/icon_big_white.png")+"' alt='logo'><span>Usability Test</span></div><div style='font-size: 24px !important; position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; text-align: center !important; width: 80% !important;color:white!important;'><p class='usability_testing_addon_task_instruction'>"+t.instruction+"</p>"+("no_limit"===t.time?"":"<p class='usability_testing_addon_task_time_limit'>("+t.time+" seconds)</p>")+"<br/><br/><button class='usability_testing_addon_start_task logo_button' id='usability_testing_addon_start_task_"+t.id+"'><img alt='' src='"+window.browser.runtime.getURL("img/next.svg")+"'/><span>Start!</span></button></div><span id='usability_testing_addon_cancel' style='padding: 6px 7px !important; z-index: 16777271 !important; position: fixed !important; text-align: right !important; width: 50px !important; height: 50px !important; top: 15px !important; right: 50px !important; font-size: 50px !important;'>X</span></div>").appendTo("body"),addCancelButton(),$("#usability_testing_addon_start_task_"+t.id).click(function(){var n;("css_id"===t.target.target_type?$("#"+t.target.target_css_ids.join(", #")).bind("click.usabilityTestHandler",function(){if(task_completion_array[t.id])e(null,0,!0);else{window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),$(this).unbind("click.usabilityTestHandler"),$("#usability_testing_addon_cancel_task_"+t.id).remove(),task_completion_array[t.id]=!0;let i=getTimeOffset();e(!0,i),clearTimeout(taskTimeout)}}):"both"===t.target.target_type&&t.target.target_urls.includes(window.location.href)?$("#"+t.target.target_css_ids.join(", #")).bind("click.usabilityTestHandler",function(){if(task_completion_array[t.id])e(null,0,!0);else{window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),$(this).unbind("click.usabilityTestHandler"),$("#usability_testing_addon_cancel_task_"+t.id).remove(),task_completion_array[t.id]=!0;let i=getTimeOffset();e(!0,i),clearTimeout(taskTimeout)}}):"url"===t.target.target_type&&t.target.target_urls.includes(window.location.href)&&(task_completion_array[t.id]?e(null,0,!0):setTimeout(function(){window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),$("#usability_testing_addon_cancel_task_"+t.id).remove(),$(".usability_testing_addon_cancel_task").remove(),task_completion_array[t.id]=!0,clearTimeout(taskTimeout),e(!0,0)},250)),t.target.target_urls.includes(window.location.href),removeOverlay(),$("<button class='logo_button medium usability_testing_addon_cancel_task' id='usability_testing_addon_cancel_task_"+t.id+"' style='color: #ffffff !important; padding: 5px 7px !important; z-index: 16777271 !important; position: fixed !important; text-align: right !important;width: 125px !important; height: 30px !important; top: 10px !important; right: 9px !important; font-size: 15px !important;'><img src='"+window.browser.runtime.getURL("img/cancel.svg")+"' alt=''><span>Cancel Task!</span></button>").appendTo("body"),$("#usability_testing_addon_cancel_task_"+t.id).click(function(){window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),$("#usability_testing_addon_cancel_task_"+t.id).remove(),clearTimeout(taskTimeout),task_completion_array[t.id]=!0,e(!1,0)}),clearTimeout(taskTimeout),"no_limit"!==t.time)&&(null!=i?(startTime=new Date(i),n=getTimeOffset()):(window.browser.runtime.sendMessage({reason:"startCountdown"},function(t){}),n=0),n<0&&(window.browser.runtime.sendMessage({reason:"startCountdown"},function(t){}),n=0),console.log("offset = ",n," remaining secs",1e3*(parseInt(t.time)-n)),taskTimeout=setTimeout(function(){task_completion_array[t.id]?e(null,0,!0):(window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),$("#usability_testing_addon_cancel_task_"+t.id).remove(),task_completion_array[t.id]=!0,e(!1,0))},1e3*(parseInt(t.time)-n)))})}function displayTaskResult(t,i,e,n){setTimeout(function(){$("#usability_testing_addon_cancel_task_"+t.id).remove()},10),clearTimeout(taskTimeout),$("<div id='usability_testing_addon_overlay' style='opacity; 0  !important; background-color: rgba(50, 50, 50, 0.97) !important; z-index: 16777270 !important; position: fixed !important; width: 100vw !important; height: 100vh !important; top: 0 !important; left: 0 !important;'><div class='usability_testing_addon_logo'><img src='"+window.browser.runtime.getURL("img/icon_big_white.png")+"' alt='logo'><span>Usability Test</span></div><div style='font-size: 24px !important; position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; text-align: center !important; width: 80% !important;color:white!important;'>"+(i?"<p class='usability_testing_addon_task_success'>Task was completed successfully!</p> It took you "+e+" seconds to complete the task!<br/>":"<p class='usability_testing_addon_task_success'>Task was not completed!</p>")+"<br/>Where there any issues with the task? Was it too easy or too hard?<br/> Please comment:<br/><textarea style='width: 474px !important; height: 164px !important; margin-bottom: 15px !important; margin-top: 20px !important; background-color: white !important; text-align: left !important; border-radius: 5px !important;' id='usability_testing_addon_comment'></textarea><br/><button class='usability_testing_addon_conclude_task logo_button' id='usability_testing_addon_conclude_task_"+t.id+"'><img alt='' src='"+window.browser.runtime.getURL("img/next.svg")+"'/><span>Conclude this task!</span></button></div><span id='usability_testing_addon_cancel' style='padding: 6px 7px !important; z-index: 16777271 !important; position: fixed !important; text-align: right !important; width: 50px !important; height: 50px !important; top: 15px !important; right: 30px !important; font-size: 50px !important;'>X</span></div>").appendTo("body"),setTimeout(function(){$("#usability_testing_addon_overlay").css("transition","opacity 0.25s ease-out").css("opacity","1")},0),$("#usability_testing_addon_conclude_task_"+t.id).click(function(){n($("#usability_testing_addon_comment").val()),removeOverlay()}),$(".usability_testing_addon_cancel_task").remove(),addCancelButton()}function displayResults(t,i,e,n,a){if(clearTimeout(taskTimeout),setTimeout(function(){$(".usability_testing_addon_cancel_task").remove(),$("#usability_testing_addon_cancel").remove()},250),t.length!==i.length&&alert("An unexpected error occurred! Please try again."),n){var o="<table id='usability_testing_addon_results_table'><tr><th>Task</th><th>Successful</th><th>Time Taken</th><th>Time Limit</th><th>Comment</th></tr>";for(let e=0;e<i.length;e++)o+="<tr><td>"+t[e].task+"</td><td>"+(t[e].success?"Yes":"No")+"</td><td>"+(t[e].success?t[e].timeTaken:"-")+"</td><td>"+("no_limit"===i[e].time?"None":i[e].time)+"</td><td>"+(void 0===t[e].comment?"-":t[e].comment)+"</td></tr>";o+="</table>",$("<section id=\"usability_testing_addon_overlay_toast\">\n    <h3>Message sent!</h3>\n    <p>Thanks for getting in touch with me!<br/>\n        I will get back to you as soon possible.</p>\n</section><div id='usability_testing_addon_overlay' style='background-color: rgba(50, 50, 50, 0.97) !important;  z-index: 16777270 !important; position: fixed !important; width: 100vw !important; height: 100vh !important; top: 0 !important; left: 0 !important;'><div class='usability_testing_addon_logo'><img src='"+window.browser.runtime.getURL("img/icon_big_white.png")+"' alt='logo'><span>Usability Test</span></div><div style='overflow-x: auto !important; font-size: 24px !important; position: fixed !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; text-align: center !important; width: 80% !important; color:white!important;'>"+o+"<button id='usability_testing_addon_send_result_email' class='logo_button'><img alt='' src='"+window.browser.runtime.getURL("img/cursor.svg")+"'/><span>Send Result to Owner</span></button><button id='usability_testing_addon_download_result' class='logo_button'><img alt='' src='"+window.browser.runtime.getURL("img/download-1.svg")+"'/><span>Download Result</span></button><button id='usability_testing_addon_end_test' class='logo_button'><img alt='' src='"+window.browser.runtime.getURL("img/cancel.svg")+"'/><span>End Usability Test!</span></button></div><span id='usability_testing_addon_cancel' style='padding: 6px 7px !important; z-index: 16777271 !important; position: fixed !important; text-align: right !important; width: 50px !important; height: 50px !important; top: 15px !important; right: 30px !important; font-size: 50px !important;' >X</span></div>").appendTo("body")}$("#usability_testing_addon_overlay_toast").click(function(){$(this).attr("style","transform: scale(0) !important; opacity: 0 !important")}),$("#usability_testing_addon_download_result").click(function(){a("download")}),"none"!==e?$("#usability_testing_addon_send_result_email").click(function(){a("send")}):$("#usability_testing_addon_send_result_email").remove(),$("#usability_testing_addon_end_test").click(function(){removeOverlay()})}window.browser=window.msBrowser||window.browser||window.chrome,window.browser.extension.onRequest.addListener(function(t,i,e){switch(("end"!==t.messageType||!1!==t.first&&void 0!==t.first)&&"getURL"!==t.messageType&&"cancelTask"!==t.messageType&&removeOverlay(),t.messageType){case"start":window.onbeforeunload=function(t){e({task:0})},task_completion_array=new Array(t.taskCount).fill(!1),displayStart(function(){removeOverlay(),e({task:0,tester_id:tester_id})});break;case"reinstate":window.onbeforeunload=function(i){let n=getTimeOffset();("css_id"===t.task.target_type||"both"===t.task.target.target_type&&t.task.target.target_urls.includes(window.location.href))&&$("#"+t.task.target.target_css_ids.join(", #")).unbind("click.usabilityTestHandler"),setTimeout(function(){e({task:-2,timeOffset:n,tester_id:tester_id,current_task:t.task,task_completion_array:task_completion_array})},0)},tester_id=t.tester_id,task_completion_array=t.task_completion_array,current_task=t.task,console.log("abc",task_completion_array,current_task),(t=>t.every(t=>!0===t))(task_completion_array)||task_completion_array[t.task.id]?e():(console.log("got reinstate packet",t.startTime),reinstateTask(t.task,t.timeOffset,t.startTime,function(i,n,a=!1){a?e():((null==n||isNaN(n))&&(n=0),("css_id"===t.task.target_type||"both"===t.task.target.target_type&&t.task.target.target_urls.includes(window.location.href))&&$("#"+t.task.target.target_css_ids.join(", #")).unbind("click.usabilityTestHandler"),removeOverlay(),console.log("12345"),e({currenttask:t.task,task:-3,success:i,timeTaken:n}))}));break;case"task":task_completion_array=t.task_completion_array,window.onbeforeunload=function(i){let n=getTimeOffset();e({task:-2,timeOffset:n,tester_id:tester_id,current_task:t.task,task_completion_array:task_completion_array})},current_task=t.task,displayTask(t.task,t.startTime,function(i,n,a=!1){a?e():(window.browser.runtime.sendMessage({reason:"endCountdown"},function(t){}),(null==n||isNaN(n))&&(n=0),("css_id"===t.task.target_type||"both"===t.task.target.target_type&&t.task.target.target_urls.includes(window.location.href))&&$("#"+t.task.target.target_css_ids.join(", #")).unbind("click.usabilityTestHandler"),$(".usability_testing_addon_cancel_task").remove(),e({currenttask:t.task,task:-3,success:i,timeTaken:n}))});break;case"displayTaskResult":displayTaskResult(t.task,t.success,t.timeTaken,function(i,n=!1){n?e():e({currenttask:t.task,task:parseInt(current_task.id)+1,success:t.success,timeTaken:t.timeTaken,comment:i,task_completion_array:task_completion_array})});break;case"cancelTask":let i=$(".usability_testing_addon_cancel_task");0!==i.length&&i.click(),e();break;case"getCSSID":$("body").bind("mousemove.selectTargetHandlerBody",function(t){$(".usability_extension_highlighted").removeClass("usability_extension_highlighted"),$(t.target).addClass("usability_extension_highlighted"),setTimeout(function(){$(".usability_extension_highlighted").bind("click.selectTargetHandler",function(t){for(var i=t.target||t.srcElement,n=!0;i&&!i.id;)n=!1,i=i.parentNode;var a=i.id;$(".usability_extension_highlighted").unbind("click.selectTargetHandler").removeClass("usability_extension_highlighted"),$("body").unbind("mousemove.selectTargetHandlerBody"),n||$("#"+a).addClass("usability_extension_highlighted"),e({id:a,original:n})})},0)});break;case"getURL":e({url:window.location.href});break;case"end":$("#usability_testing_addon_cancel").remove(),displayResults(t.testResults,t.tasks,t.transfer_type,t.first,function(t){e({task:-1,returnVal:t,tester_id:tester_id})}),!0===t.success?displayToast("Your results were send successfully!","Your test results have been successfully transferred to the creator of this test. Thank you!",7e3):!1===t.success&&displayToast("Error while sending result!","An error occurred while sending your result to the creator of this test. Please download the result and send it manually!",1e4),window.onbeforeunload=function(t){e()};break;default:alert("unknown request"),e()}});