const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token không hợp lệ hoặc không tồn tại" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "secret_key"); // hoặc secret của bạn
        req.user = decoded; // lưu thông tin user vào req
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token hết hạn hoặc không hợp lệ" });
    }
};
