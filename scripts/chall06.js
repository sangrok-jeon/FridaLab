Java.perform(() => {
    const Challenge06 = Java.use("uk.rossmarks.fridalab.challenge_06");

    setTimeout(() => {
        Java.choose("uk.rossmarks.fridalab.MainActivity", {
            onMatch: (instance) => {
                const chall06Value = Challenge06.chall06.value;

                console.log("[+] MainActivity instance found");
                console.log("[+] chall06 value:", chall06Value);

                instance.chall06(chall06Value);

                console.log("[+] chall06 solved after 11 seconds");
            },
            onComplete: () => {
                console.log("[+] Java.choose complete");
            }
        });
    }, 11000);
});
