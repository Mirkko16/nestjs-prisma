import { User } from '../src/user/user.model'; // Ajusta la ruta según la ubicación de tu modelo User

declare global {
  namespace Express {
    interface Request {
      user?: User; // O la interfaz que representaría a tu usuario
    }
  }
}
