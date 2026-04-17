Java.perform(() => {
    setTimeout(() => {
        Java.choose("uk.rossmarks.fridalab.MainActivity", {
            onMatch: (instance) => {
                console.log("[+] MainActivity instance found");

                instance.chall04("frida");

                console.log('[+] chall04 solved with "frida"');
            },
            onComplete: () => {
                console.log("[+] Java.choose complete");
            }
        });
    }, 1000);
});
