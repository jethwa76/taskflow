import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { User } from '../models/User.js'

const authSchema = z.object({ name: z.string().trim().min(2).max(80).optional(), email: z.string().email(), password: z.string().min(6).max(100) })
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, profileImage: user.profileImage })
const tokenFor = (user) => jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' })

export async function register(req, res) {
  const data = authSchema.extend({ name: z.string().trim().min(2).max(80) }).parse(req.body)
  const exists = await User.findOne({ email: data.email.toLowerCase() })
  if (exists) return res.status(409).json({ message: 'An account with that email already exists' })
  const password = await bcrypt.hash(data.password, 12)
  const user = await User.create({ ...data, email: data.email.toLowerCase(), password })
  res.status(201).json({ user: publicUser(user), token: tokenFor(user) })
}

export async function login(req, res) {
  const data = authSchema.omit({ name: true }).parse(req.body)
  const user = await User.findOne({ email: data.email.toLowerCase() }).select('+password')
  if (!user || !(await bcrypt.compare(data.password, user.password))) return res.status(401).json({ message: 'Email or password is incorrect' })
  res.json({ user: publicUser(user), token: tokenFor(user) })
}

export async function logout(req, res) { res.json({ message: 'Signed out successfully' }) }
export async function forgotPassword(req, res) { z.object({ email: z.string().email() }).parse(req.body); res.json({ message: 'If the account exists, reset instructions will be sent shortly' }) }
export async function resetPassword(req, res) { z.object({ token: z.string(), password: z.string().min(6) }).parse(req.body); res.json({ message: 'Password reset flow is ready for email delivery integration' }) }
