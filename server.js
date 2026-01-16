const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Thư mục chứa giao diện web

// Thuật toán làm rối đơn giản cho Lua (Custom)
function obfuscateLua(code) {
    const header = "--[[ OBFUSCATOR BY ANSCRIPT VN ]]\n\n";
    
    // Bước 1: Chuyển code sang dạng Bytecode giả lập hoặc Hex
    let encoded = "";
    for (let i = 0; i < code.length; i++) {
        encoded += "\\" + code.charCodeAt(i);
    }

    // Bước 2: Bọc trong một hàm giải mã thực thi ngay lập tức
    const protectedCode = `${header}loadstring("${encoded}")()`;
    return protectedCode;
}

app.post('/obfuscate', (req, res) => {
    const sourceCode = req.body.code;
    if (!sourceCode) return res.status(400).send({ error: "Không có code!" });

    const result = obfuscateLua(sourceCode);
    res.send({ result: result });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
 
