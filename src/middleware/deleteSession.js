export const deleteSession = (req, res) => {
    if (!req.session) {
        return res.status(400).json({ message: "No session to destroy" });
    }
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ message: "Failed to log out" });
        }
        res.clearCookie('connect.sid'); // Xóa cookie phiên
        console.log("Logged out successfully")
        res.status(200).json({ message: "Logged out successfully" });
    });
};

