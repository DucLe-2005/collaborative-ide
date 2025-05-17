import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    const { email, password, name} = req.body;

    const existing = await prisma.user.findUnique({ where: { email }});
    if (existing) return res.status(400).json({ message: 'User already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    })

    res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email}});
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.satatus(401).json({ error: 'Invalid credentials'});

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials"});

    res.status(200).json({ message: 'Login sucessful', user: { id: user.id, email: user.email}});
}

export const deleteUser = async (req, res) => {
    const { email } = req.body;

    try {
        await prisma.user.delete({ where: { email }});
        res.status(200).json({ message: 'User deleted'});
    } catch (error) {
        res.status(400).json({ error: 'User not found'});
    }
}