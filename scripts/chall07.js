Java.perform(() => {
    const Challenge07 = Java.use("uk.rossmarks.fridalab.challenge_07");

    setTimeout(() => {
        Java.choose("uk.rossmarks.fridalab.MainActivity", {
            onMatch: (instance) => {
                let pin = Challenge07.chall07.value;

                if (pin === null) {
                    Challenge07.setChall07();
                    pin = Challenge07.chall07.value;
                }

                console.log("[+] chall07 pin:", pin);

                instance.chall07(pin);

                console.log("[+] chall07 solved");
            },
            onComplete: () => {
                console.log("[+] Java.choose complete");
            }
        });
    }, 1000);
});
