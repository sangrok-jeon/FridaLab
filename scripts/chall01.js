Java.perform(() => {
    const Challenge01 = Java.use("uk.rossmarks.fridalab.challenge_01");

    Challenge01.getChall01Int.implementation = () => {
        console.log("[+] chall01 solved");
        return 1;
    };
});
