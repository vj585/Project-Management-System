"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getMe = exports.login = exports.register = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const types_1 = require("../types");
const prisma = new client_1.PrismaClient();
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists with this email' });
        }
        // Hash password
        const salt = await bcrypt_1.default.genSalt(10);
        const passwordHash = await bcrypt_1.default.hash(password, salt);
        // Create user
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                passwordHash
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error during registration' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        // Verify password
        const isMatch = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        // Generate token
        const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_for_development_only';
        const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
        const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, { expiresIn });
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email
                }
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error during login' });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                fullName: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error fetching user profile' });
    }
};
exports.getMe = getMe;
const logout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map