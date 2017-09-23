({
    doInit : function(cmp, ev) {
        this.addTimer(cmp);
        cmp.set('v.startTime', new Date());
        this.displayToast(cmp, 'success', 'Come with me if you want to live.');
    },
    addTimer : function(cmp) {
        var self=this;
        var timeoutRef = window.setInterval($A.getCallback(function() {
                if (cmp.isValid()) {
                    self.timerFired(cmp, self);
                }
        }), 60000);
    },
    timerFired : function(cmp, helper) {
        var now=new Date();
        var startTime=cmp.get('v.startTime');
        var diffMillis=now-startTime;
        var diffMins=Math.floor(diffMillis/60000);
        var msg='';
        var templateData=[];

        var offset=(diffMins+60)%60;
        switch (offset) {
            case 20:
            case 40:
                msg='20 minutes : Look at an object 20 feet away from your screen for 20 seconds ({0})';
                templateData.push({label:'link',
                        url:'https://challenge.meyouhealth.com/2010/09/21/follow-the-20-20-20-rule-by-looking-away-from-your-computer-screen-every-20-minutes-at-a-spot-20-feet-away-for-20-seconds'
                    });
                break;
            case 22:
            case 42:
                msg='20 minutes : Blink 10 times ({0})';
                templateData.push({label:'link',
                        url:'https://www.swisscoat.com/computer-vision-syndrome'
                    });
                break;
            case 59:
                msg='60 minutes : Get up and walk around for 5 minutes ({0})';
                templateData.push({label:'link',
                        url:'https://www.nytimes.com/2016/12/28/well/move/work-walk-5-minutes-work.html'
                    });
                break;
        }
        console.log('Msg = ' + msg);
        if (''!=msg) {
            helper.displayToast(cmp, 'info', 'Empty message', msg, templateData);
        }
    },
    displayToast: function(cmp, type, message, messageTemplate, templateData) {
        var toastEvent = $A.get('e.force:showToast');
        toastEvent.setParams({
            type: type,
            message: message,
            messageTemplate: messageTemplate,
            messageTemplateData: templateData
        });
        toastEvent.fire();
    }
})