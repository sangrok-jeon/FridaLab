Java.perform(() => {
    const Challenge01 = Java.use("uk.rossmarks.fridalab.challenge_01");
    const Challenge06 = Java.use("uk.rossmarks.fridalab.challenge_06");
    const Challenge07 = Java.use("uk.rossmarks.fridalab.challenge_07");
    const MainActivity = Java.use("uk.rossmarks.fridalab.MainActivity");

    Challenge01.getChall01Int.implementation = () => {
        console.log("[+] chall01 solved");
        return 1;
    };

    MainActivity.chall03.implementation = () => {
        console.log("[+] chall03 solved");
        return true;
    };

    MainActivity.chall05.overload("java.lang.String").implementation = function (str) {
        console.log("[+] chall05 original argument:", str);
        console.log('[+] chall05 argument replaced with "frida"');

        return this.chall05.overload("java.lang.String").call(this, "frida");
    };

    setTimeout(() => {
        Java.choose("uk.rossmarks.fridalab.MainActivity", {
            onMatch: (instance) => {
                console.log("[+] MainActivity instance found");

                instance.chall02();
                console.log("[+] chall02 solved");

                instance.chall04("frida");
                console.log('[+] chall04 solved with "frida"');

                instance.chall05("frida");
                console.log('[+] chall05 triggered with "frida"');

                let pin = Challenge07.chall07.value;

                if (pin === null) {
                    Challenge07.setChall07();
                    pin = Challenge07.chall07.value;
                }

                console.log("[+] chall07 pin:", pin);
                instance.chall07(pin);
                console.log("[+] chall07 solved");

                Java.scheduleOnMainThread(() => {
                    const Button = Java.use("android.widget.Button");
                    const StringClass = Java.use("java.lang.String");
                    const R_id = Java.use("uk.rossmarks.fridalab.R$id");

                    const checkButton = Java.cast(
                        instance.findViewById(R_id.check.value),
                        Button
                    );

                    const confirmText = StringClass.$new("Confirm");

                    checkButton.setText
                        .overload("java.lang.CharSequence")
                        .call(checkButton, confirmText);

                    console.log('[+] chall08 solved: button text changed to "Confirm"');
                });
            },
            onComplete: () => {
                console.log("[+] Java.choose complete");
            }
        });
    }, 1000);

    setTimeout(() => {
        Java.choose("uk.rossmarks.fridalab.MainActivity", {
            onMatch: (instance) => {
                const chall06Value = Challenge06.chall06.value;

                console.log("[+] MainActivity instance found for chall06");
                console.log("[+] chall06 value:", chall06Value);

                instance.chall06(chall06Value);

                console.log("[+] chall06 solved after 11 seconds");
            },
            onComplete: () => {
                console.log("[+] Java.choose complete for chall06");
            }
        });
    }, 11000);
});
