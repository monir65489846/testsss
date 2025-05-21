 const input = document.getElementById("inputText1994");

    input.addEventListener("input", () => {
      const text = input.value;

      // UTF-8 Decimal
      const utf8Bytes = new TextEncoder().encode(text);
      document.getElementById("utf8Decimal1994").value = Array.from(utf8Bytes).join(',');

      // UTF-8 Hexadecimal
      document.getElementById("utf8Hex1994").value = Array.from(utf8Bytes)
        .map(b => '\\x' + b.toString(16).padStart(2, '0')).join('');

      // UTF-16
      document.getElementById("utf161994").value = Array.from(text)
        .map(c => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0')).join('');

      // Base64
      document.getElementById("base641994").value = btoa(unescape(encodeURIComponent(text)));

      // Base32
      document.getElementById("base321994").value = base32Encode(text);

      // Base58
      document.getElementById("base581994").value = base58Encode(text);

      // ROT13
      document.getElementById("rot131994").value = text.replace(/[a-zA-Z]/g, c =>
        String.fromCharCode(c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)));

      // ROT47
      document.getElementById("rot471994").value = text.replace(/[\x21-\x7E]/g, c =>
        String.fromCharCode(33 + ((c.charCodeAt(0) + 14) % 94)));
    });

    function base32Encode(str) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      let binary = "";
      for (let i = 0; i < str.length; i++) {
        binary += str.charCodeAt(i).toString(2).padStart(8, '0');
      }
      let output = "";
      for (let i = 0; i < binary.length; i += 5) {
        const chunk = binary.substring(i, i + 5);
        output += alphabet[parseInt(chunk.padEnd(5, '0'), 2)];
      }
      return output;
    }

    function base58Encode(str) {
      const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
      let bytes = Array.from(new TextEncoder().encode(str));
      let value = BigInt("0x" + bytes.map(b => b.toString(16).padStart(2, '0')).join(""));
      let result = "";
      while (value > 0) {
        let mod = value % 58n;
        result = alphabet[Number(mod)] + result;
        value = value / 58n;
      }
      return result || "1";
    }