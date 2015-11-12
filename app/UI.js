/**
 * 
 * @author Алексей
 * {global P}
 */
function UI() {
    var self = this
            , form = P.loadForm(this.constructor.name);
    
    self.show = function () {
        form.show();
    };
    
    var sMod = new P.ServerModule('Serv');
    
    form.button.onActionPerformed = function(event) {
        sMod.setLedState(form.textField.text, function(res) {
			form.textField.text = res;
            console.log(res);
			//alert(res);
        }, function(anErr) {
			console.log(anErr);
           // alert(anErr);
        });
    };
}
