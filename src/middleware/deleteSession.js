// export const deleteSession = (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error("Error destroying session:", err);
//             res.status(500).send("Failed to log out.");
//         }
//     });
// }
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
        res.status(200).json({ message: "Logged out successfully" });
    });
};

