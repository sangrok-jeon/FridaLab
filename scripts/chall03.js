Java.perform(() => {
    const MainActivity = Java.use("uk.rossmarks.fridalab.MainActivity");

    MainActivity.chall03.implementation = () => {
        console.log("[+] chall03 solved");
        return true;
    };
});
