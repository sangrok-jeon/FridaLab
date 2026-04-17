Java.perform(() => {
    const MainActivity = Java.use("uk.rossmarks.fridalab.MainActivity");

    MainActivity.chall05.overload("java.lang.String").implementation = function (str) {
        console.log("[+] chall05 original argument:", str);
        console.log('[+] chall05 argument replaced with "frida"');

        return this.chall05.overload("java.lang.String").call(this, "frida");
    };

    setTimeout(() => {
        Java.choose("uk.rossmarks.fridalab.MainActivity", {
            onMatch: (instance) => {
                console.log("[+] MainActivity instance found");

                instance.chall05("frida");

                console.log('[+] chall05 triggered with "frida"');
            },
            onComplete: () => {
                console.log("[+] Java.choose complete");
            }
        });
    }, 1000);
});
