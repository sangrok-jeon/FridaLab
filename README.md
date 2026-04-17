# FridaLab Write-up

Android dynamic instrumentation practice using FridaLab and Frida.

This repository documents my FridaLab practice as a portfolio project. The focus is not only on solving each challenge, but also on explaining how the target logic was identified from the decompiled code and how Frida was used to manipulate runtime behavior.

## Environment

- Host OS: Windows
- Target: Android Emulator / Android Device
- Tools: ADB, Frida, frida-server, JADX / JADX-GUI
- Target app: FridaLab

## Basic Frida Commands

List connected Frida devices:

```bash
frida-ls-devices
```

List installed applications on a USB-connected device:

```bash
frida-ps -Uai
```

Run the target app and load a Frida script:

```bash
frida -U -f uk.rossmarks.fridalab -l scripts/chall01.js
```

Attach to an already running process:

```bash
frida -U -n FridaLab -l scripts/chall01.js
```

## Frida Option Notes

| Option | Meaning |
| --- | --- |
| `-U` | Use a USB-connected device |
| `-a` | Show applications |
| `-i` | Include installed applications |
| `-f` | Spawn an app by package identifier |
| `-n` | Attach to a running process by process name |
| `-l` | Load a JavaScript hook script |

## Challenge 01 - Static Field / Return Value Manipulation

### Goal

Change class `challenge_01`'s variable `chall01` to `1`.

### Decompiled Code

The `challenge_01` class has a static integer field and a getter method.

```java
public class challenge_01 {
    static int chall01;

    public static int getChall01Int() {
        return chall01;
    }
}
```

In `MainActivity`, the app checks whether `getChall01Int()` returns `1`.

```java
if (challenge_01.getChall01Int() == 1) {
    MainActivity.this.completeArr[0] = 1;
}
```

### Analysis

The static integer `chall01` is not explicitly initialized, so its default value is `0`.

The challenge is completed only when `challenge_01.getChall01Int()` returns `1`. Therefore, the target can be solved by changing the static field value or by hooking the getter method and replacing its return value at runtime.

For this solution, I used Frida to hook `getChall01Int()` and force it to return `1`.

### Frida Script

```javascript
Java.perform(() => {
    const Challenge01 = Java.use("uk.rossmarks.fridalab.challenge_01");

    Challenge01.getChall01Int.implementation = () => {
        console.log("[+] chall01 solved");
        return 1;
    };
});
```

The same script is available at [`scripts/chall01.js`](scripts/chall01.js).

### Run

```bash
frida -U -f uk.rossmarks.fridalab -l scripts/chall01.js
```

After loading the script, pressing the `CHECK` button makes Challenge 01 pass.

## Notes

This project is for educational Android dynamic analysis practice. No real service or third-party production application was targeted.
