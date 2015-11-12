/**
 * 
 * @author Алексей
 * @public 
 * @constructor
 */
function Serv() {
    var self = this;
	
    var mraa = Java.type('mraa.mraa');
	var GPIO = Java.type('mraa.Gpio');
	var myDigitalPin5 = new GPIO(5); //setup digital read on Digital pin #5 (D5)
	var DIR = Java.type('mraa.Dir');
	myDigitalPin5.dir(DIR.DIR_OUT); //set the gpio direction to output
	
	var myDigitalPin2 = new GPIO(2); //setup digital read on Digital pin #5 (D5)
	myDigitalPin2.dir(DIR.DIR_OUT); //set the gpio direction to output
	
	var AIO = Java.type('mraa.Aio');
	var a0 = new AIO(0);
	var a1 = new AIO(1);
	
    self.initMRA = function(aClass) {
        var stage = 0;
		stage = 1;
		try {
			var cl = Java.type(aClass);
			stage = 2;
			//var system = Java.type('java.lang.System');
			//system.loadLibrary("mraajava");
			stage = 3;
			//mraa.init();
			stage = 4;
			return ('MRAA Version: ' + cl.getVersion());
		} catch (e) {
			return 'Stage ' + stage + ', error ' + e;// + (fl ? ', library found: ' + fl : '');
		}
    };
	
	self.setLedState = function(aState) {
		try {
			//var ledState = true; //Boolean to hold the state of Led
			myDigitalPin5.write(aState ? 1 : 0);
			return true;
		} catch (e) {
			return 'Stage ' + stage + ', error ' + e;
		}
	}
	
	self.startFlash = function() {
		var bs = false;
		function blueFlash() {
			bs = !bs;
			myDigitalPin5.write(bs);
			var delay = a0.read();
			P.invokeDelayed(delay, blueFlash);
		}
		
		blueFlash();
	}
	
	self.getA0Value = function() {
		return 'IntValue: ' + a0.read();// + '; float value: ' + a0.readFloat();
	}
	
	self.setA1Value = function(aValue) {
		a1.setBit(+aValue);
	}
}
