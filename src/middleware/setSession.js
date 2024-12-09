// export const setSession = (req, res, next) =>{
//     req.session.user = {username: req.body.Username, password: req.body.Password};
//     next();
// }
export const setSession = (req, res, next) => {
    const { Username } = req.body;
    if (!Username) {
        return res.status(400).json({ error: "Username is required" });
    }
    req.session.user = { username: Username }; // Không lưu mật khẩu
    next();
};
