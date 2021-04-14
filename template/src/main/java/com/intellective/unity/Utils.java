package com.intellective.unity;

import com.intellective.commons.security.CipherRegister;
import com.intellective.commons.security.CipherUtils;

public class Utils {
    private static final CipherUtils CIPHER = CipherRegister.getInstance()
            .getCipher(CipherUtils.ENCRYPTION_TYPE.ENCRYPT_3DES, null);
    public static final String ENCRYPTED_PREFIX = "{3DES}";

    public static String decrypt(String value) {
        if (value == null) {
            return null;
        }

        if (value.startsWith(ENCRYPTED_PREFIX)) {
            value = value.substring(ENCRYPTED_PREFIX.length());
            if (value.length() == 0) {
                return "";
            }
        }
        return CIPHER.decrypt(value);
    }
}
