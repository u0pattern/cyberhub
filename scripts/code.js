// bypass WhatsApp expiration date/version error
Java.perform(function() {
	var sharedPreferencesEditor = Java.use("android.app.SharedPreferencesImpl$EditorImpl");
	sharedPreferencesEditor.putString.overload('java.lang.String', 'java.lang.String').implementation = function(name, value) {
		if(name == 'version'){
			var editor = this.putString(name, "2.22.22.81");
			console.log("[+] Whatsapp version is patched with the new one [+]");
		}else{
			var editor = this.putString(name, value);
		}
		return editor;
	}
});

Interceptor.attach(Module.findExportByName('libdl.so', 'android_get_exported_namespace'), {
	onLeave: function () {
		Interceptor.attach(Module.findExportByName('libwhatsapp.so', 'Java_com_whatsapp_util_WhatsAppLibLoader_getJNICodeVersion'), {
			onLeave: function (retval) {
				console.log("[+] Whatsapp version is patched with the new one natively [+]");
				retval.replace(Java.vm.getEnv().newStringUtf("2.22.22.81"));
			}
		});
	}
});
