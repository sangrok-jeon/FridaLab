Java.perform(() => {
    setTimeout(() => {
        Java.choose("uk.rossmarks.fridalab.MainActivity", {
            onMatch: (instance) => {
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
});
