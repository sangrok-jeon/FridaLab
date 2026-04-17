Java.perform(() => {
    setTimeout(() => {
        Java.choose("uk.rossmarks.fridalab.MainActivity", {
            onMatch: (instance) => {
                console.log("[+] MainActivity instance found");

                instance.chall02();

                console.log("[+] chall02 solved");
            },
            onComplete: () => {
                console.log("[+] Java.choose complete");
            }
        });
    }, 1000);
});
