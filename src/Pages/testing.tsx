// EncryptTest.tsx

import React, { useState } from 'react';
import { enc, AES } from 'crypto-js';
import sha256 from 'crypto-js/sha256';

export default function Test() {
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [hashinput, setHashInput] = useState<string | null>(null);
    const [hashoutput, setHashOutput] = useState<string | null>(null);
    const [encryptedText, setEncryptedText] = useState<string | null>(null);
    const [decryptedText, setDecryptedText] = useState<string | null>(null);

    const handleEncrypt = () => {
        if (text && password) {
            const encrypted = AES.encrypt(text, password).toString();
            setEncryptedText(encrypted);
        } else {
            alert('Please enter text and password.');
        }
    };

    const hashed = sha256("wasd").toString()
    const handleDecrypt = () => {
        if (encryptedText && password) {
            try {

                const decrypted = AES.decrypt(encryptedText, password).toString(enc.Utf8);
                setDecryptedText(decrypted);
            } catch (error) {
                alert('Error decrypting. Please check your password.');
            }
        } else {
            alert('Please enter encrypted text and password.');
        }
    };


    function handleHash() {
        hash.update(hashinput);
         setHashOutput(hash.digest('hex'))
    }
    return (
        <div>
            <h2>Encryption Test</h2>
            <div>
                <label>
                    Text to Encrypt:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <div>
                <button onClick={handleEncrypt}>Encrypt</button>
            </div>
            {encryptedText && (
                <div>
                    <strong>Encrypted Text:</strong> {encryptedText}
                </div>
            )}
            <div>
                <button onClick={handleDecrypt}>Decrypt</button>
            </div>
            {decryptedText && (
                <div>
                    <strong>Decrypted Text:</strong> {decryptedText}
                </div>
            )}



            <button onClick={handleHash} >Create Sha 256 hash</button>
            <input type="text" placeholder='pasword to hash' onChange={(e) => setHashInput(e.target.value)}
            />
            {hashed}
        </div>
    );
};

