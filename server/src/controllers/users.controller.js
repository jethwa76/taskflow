import { z } from 'zod'

const profileSchema = z.object({ name: z.string().trim().min(2).max(80), email: z.string().email(), profileImage: z.string().url().optional().or(z.literal('')) })
export function getProfile(req, res) { res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, profileImage: req.user.profileImage } }) }
export async function updateProfile(req, res) { const data = profileSchema.parse(req.body); Object.assign(req.user, data); await req.user.save(); res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, profileImage: req.user.profileImage } }) }
