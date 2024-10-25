let deleteSession = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Failed to log out.");
        }
    });
}

export default deleteSession;