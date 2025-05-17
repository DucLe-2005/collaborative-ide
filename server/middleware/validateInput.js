export const validateRegister = (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) return res.status(400).json({ error: 'Missing fields'});
    
    if (!email.includes('@')) return res.status(400).json({ error: 'Invalid email'});
    if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters long'});

    next();
};

export const validateLogin = (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields'});

    next();
};



