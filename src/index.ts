import express, { Request, Response } from 'express';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());


type User = { id: number; name: string; email: string };
let users: User[] = [];
let nextId = 1;

app.get('/hi', (_req: Request, res: Response) => {
  res.json({ message: 'Simple TypeScript CRUD API is running' });
});

// Read all users
app.get('/api/users', (_req: Request, res: Response) => {
  res.json({ success: true, data: users });
});

// Read one user
app.get('/api/users/:id', (req: Request, res: Response) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
});

// Create user
app.post('/api/users', (req: Request, res: Response) => {
  const { name, email } = req.body as Partial<User>;
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ success: false, message: 'name and email are required' });
  }
  const user: User = { id: nextId++, name: name.trim(), email: email.trim() };
  users.push(user);
  res.status(201).json({ success: true, data: user });
});


// Update user
app.put('/api/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });
  const { name, email } = req.body as Partial<User>;
  if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
    return res.status(400).json({ success: false, message: 'name must be a non-empty string' });
  }
  if (email !== undefined && (typeof email !== 'string' || !email.trim())) {
    return res.status(400).json({ success: false, message: 'email must be a non-empty string' });
  }
  users[index] = {
    ...users[index],
    ...(name !== undefined ? { name: name.trim() } : {}),
    ...(email !== undefined ? { email: email.trim() } : {})
  };
  res.json({ success: true, data: users[index] });
});

// Delete user
app.delete('/api/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const initialLength = users.length;
  users = users.filter((u) => u.id !== id);
  if (users.length === initialLength) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, message: 'User deleted' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
